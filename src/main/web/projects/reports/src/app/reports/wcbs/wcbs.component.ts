import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { map } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { QtyPipe } from '../../pipes/qty.pipe';

@Component({
  selector: 'app-wcbs',
  templateUrl: './wcbs.component.html',
  styleUrls: ['./wcbs.component.scss']
})
export class WcbsComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchOnboardingDashboard().pipe(
      map(this.generateData.bind(this))
    ),
    query: (row) => this.applyQuery(row)
  };

  qtyPipe: QtyPipe = new QtyPipe();
  readonly PrintedColumn = { prop: 'total_quantity', name: 'No Of Printed', sortable: true, draggable: false, resizeable: false, width: 340, minWidth: 340, pipe: this.qtyPipe };
  readonly OrderColumn = { prop: 'totalOrders', name: 'No Of Orders', sortable: true, draggable: false, resizeable: false, width: 340, minWidth: 340, pipe: this.qtyPipe };
  filterForm: FormGroup;

  years: string[] = [];

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'programs', name: 'Programs', sortable: true, draggable: false, resizeable: false },
      { prop: 'modules', name: 'Modules', sortable: true, draggable: false, resizeable: false },
      { ...this.OrderColumn }
    ];

    this.sorts = [];

    const currentYear = moment().year();
    this.filterForm = new FormGroup({
      programs: new FormControl(''),
      dataBy: new FormControl(this.OrderColumn.prop),
      selectYear: new FormControl(currentYear)
    }, { validators: FilterSelectedValidator });
    this.years = new Array(5).fill(0).map((val, index) => String(currentYear - index));
  }

  ngAfterViewInit() {
    this.tableConfig.filters.next(true);
    this.cdr.detectChanges();
  }

  onSearch() {
    const { dataBy } = this.filterForm.value;
    const activeColumn = this.columns.find(col => col.prop === dataBy);
    if (!activeColumn) {
      if (dataBy === this.OrderColumn.prop) {
        this.setOrderColumn();
      }

      if (dataBy === this.PrintedColumn.prop) {
        this.setPrintedColumn();
      }
    }
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    const currentYear = moment().year();
    this.filterForm.patchValue({
      programs: '',
      dataBy: this.OrderColumn.prop,
      selectYear: currentYear
    });
    const isPrintedColumn = this.columns.find(col => col.prop === this.OrderColumn.prop);
    if (!isPrintedColumn) {
      this.setOrderColumn();
    }
    this.tableConfig.filters.next(true);
  }

  setOrderColumn() {
    const columns = this.columns.filter(col => col.prop !== this.PrintedColumn.prop);
    columns.push({ ...this.OrderColumn });
    this.columns = columns;
  }

  setPrintedColumn() {
    const columns = this.columns.filter(col => col.prop !== this.OrderColumn.prop);
    columns.push({ ...this.PrintedColumn });
    this.columns = columns;
  }

  applyQuery(row) {
    let isProgram = true;
    let isYear = true;
    const { programs, selectYear } = this.filterForm.value;
    if (programs) {
      isProgram = row.programs.toLowerCase().includes(programs.toLowerCase());
    }

    if (selectYear) {
      isYear = row.year == selectYear;
    }
    return isProgram && isYear;
  }

  generateData(resp) {
    const skuQtyByYear = {};
    const skuOrdersByYear = {};
    resp.BY_PROGRAM.forEach(row => {
      if (!row.identity || !row.identity.modules) { return; }
      const year = moment(row.identity.order_date).format('YYYY');

      if (!skuQtyByYear[year]) {
        skuQtyByYear[year] = {};
        skuOrdersByYear[year] = {};
      }

      if (row.identity.modules && !skuQtyByYear[year][row.identity.modules]) {
        skuQtyByYear[year][row.identity.modules] = 0;
        skuOrdersByYear[year][row.identity.modules] = 0;
      }

      skuQtyByYear[year][row.identity.modules] += Number(row.total_quantity);
      skuOrdersByYear[year][row.identity.modules] += Number(row.totalOrders);
    });
    const rows = [];
    this.years.forEach(year => {
      if (!skuQtyByYear[year]) { return; }
      Object.keys(skuQtyByYear[year]).forEach(modules => {
        const program = resp.BY_PROGRAM.find(p => p.identity.modules === modules);
        rows.push({
          programs: program.identity.programs,
          modules,
          total_quantity: skuQtyByYear[year][modules],
          totalOrders: skuOrdersByYear[year][modules],
          year
        });
      });
    });
    return rows;
  }

}
