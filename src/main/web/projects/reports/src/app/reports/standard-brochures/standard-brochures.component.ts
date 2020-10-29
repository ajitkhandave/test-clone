import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { map } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { QtyPipe } from '../../pipes/qty.pipe';
import { CommonDatePipe } from '../../pipes/common-date.pipe';

@Component({
  selector: 'app-standard-brochures',
  templateUrl: './standard-brochures.component.html',
  styleUrls: ['./standard-brochures.component.scss']
})
export class StandardBrochuresComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchOnboardingDashboard().pipe(
      map(this.generateData)
    ),
    query: (row) => this.applyQuery(row)
  };

  datePipe: CommonDatePipe = new CommonDatePipe();
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
      { prop: 'standardBrochuresIdentity.product', name: 'Product Name', sortable: true, draggable: false, resizeable: false },
      {
        prop: 'standardBrochuresIdentity.order_date',
        name: 'Year Of Order Date',
        sortable: true,
        draggable: false,
        resizeable: false,
        comparator: this.datePipe.sort.bind(this),
        pipe: {
          transform: (val) => moment(val).format('YYYY')
        }
      },
      { ...this.OrderColumn }
    ];

    this.sorts = [];

    const currentYear = moment().year();
    this.filterForm = new FormGroup({
      product: new FormControl(''),
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
      product: '',
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
    let isProduct = true;
    let isYear = true;
    const { product, selectYear } = this.filterForm.value;
    if (product) {
      isProduct = row.standardBrochuresIdentity.product.toLowerCase().includes(product.toLowerCase());
    }

    if (selectYear) {
      const year = moment(row.standardBrochuresIdentity.order_date).format('YYYY');
      isYear = year == selectYear;
    }
    return isProduct && isYear;
  }

  generateData(resp) {
    return resp.BY_PRODUCT.filter(item => {
      if (item && item.standardBrochuresIdentity && item.standardBrochuresIdentity.product) {
        return item.standardBrochuresIdentity.product.includes('Standard');
      }
      return false;
    });
  }

}
