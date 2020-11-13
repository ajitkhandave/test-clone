import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { take } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { QtyPipe } from '../../pipes/qty.pipe';
import { DateRange } from '../../models/date-range';
import { SegmentChartConfig, UtilService, MonthChartConfig } from '../../services/util.service';

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
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  masterData: any[];
  qtyPipe: QtyPipe = new QtyPipe();
  readonly PrintedColumn = { prop: 'total_quantity', name: 'No Of Printed', sortable: true, draggable: false, resizeable: false, width: 105, minWidth: 105, maxWidth: 105, pipe: this.qtyPipe };
  readonly OrderColumn = { prop: 'totalOrders', name: 'No Of Orders', sortable: true, draggable: false, resizeable: false, width: 105, minWidth: 105, maxWidth: 105, pipe: this.qtyPipe };
  filterForm: FormGroup;
  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();
  activeCol: string = this.OrderColumn.prop;
  monthlyOrderMasterData: any[];
  byBusinessSegmentMasterData: any[];
  byMonthChart: any[];
  byBusinessSegmentChart: any[];

  constructor(
    private reportService: ReportService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'product', name: 'Product Name', sortable: true, draggable: false, resizeable: false },
      {
        prop: 'year',
        name: 'Year Of Order Date',
        sortable: true,
        draggable: false,
        resizeable: false,
        width: 135,
        minWidth: 135,
        maxWidth: 135
      },
      { ...this.OrderColumn }
    ];

    this.sorts = [];
    this.filterForm = new FormGroup({
      product: new FormControl(''),
      dataBy: new FormControl(this.OrderColumn.prop),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
    this.fetchData();
  }

  fetchData() {
    this.reportService.fetchOnboardingDashboard()
      .pipe(take(1))
      .subscribe(resp => {
        this.masterData = [].concat(resp.BY_PRODUCT);
        this.monthlyOrderMasterData = [].concat(resp.STD_BY_MONTH);
        this.byBusinessSegmentMasterData = [].concat(resp.STD_BY_SEGMENT);
        this.generateData();
        this.generateByMonth();
        this.prepareBusinessChart();
      });
  }

  ngAfterViewInit() {
    const val = {
      startDate: moment().add(-1, 'year').startOf('y').format('YYYY-MM-DD'),
      endDate: moment().endOf('y').format('YYYY-MM-DD')
    };
    this.filterForm.patchValue(val);
    this.dateRange.next(val);
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    const { dataBy } = this.filterForm.value;
    this.activeCol = dataBy;
    const activeColumn = this.columns.find(col => col.prop === dataBy);
    if (!activeColumn) {
      if (dataBy === this.OrderColumn.prop) {
        this.setOrderColumn();
      }

      if (dataBy === this.PrintedColumn.prop) {
        this.setPrintedColumn();
      }
    }
    this.generateData();
    this.generateByMonth();
    this.prepareBusinessChart();
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      product: '',
      dataBy: this.OrderColumn.prop
    });
    const isPrintedColumn = this.columns.find(col => col.prop === this.OrderColumn.prop);
    if (!isPrintedColumn) {
      this.setOrderColumn();
    }
    this.ngAfterViewInit();
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
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
    const { product } = this.filterForm.value;
    if (product) {
      isProduct = row.product.toLowerCase().includes(product.toLowerCase());
    }
    return isProduct;
  }

  generateData() {
    if (!this.masterData) { return; }
    const products = [].concat(this.masterData);
    const { startDate, endDate } = this.filterForm.value;
    const rows = [];
    const filteredRows = products.filter((row) => {
      if (row && row.standardBrochuresIdentity) {
        const isInRange = moment(row.standardBrochuresIdentity.order_date).isBetween(startDate, endDate, 'day', '[]');
        const isStandardProduct = row.standardBrochuresIdentity.product.includes('Standard');
        return isInRange && isStandardProduct;
      }
      return false; // To ignore the null data.
    });

    filteredRows.forEach(row => {
      const year = moment(row.standardBrochuresIdentity.order_date).format('YYYY');
      const product = rows.find(p => row.standardBrochuresIdentity.product === p.product && year === p.year);
      if (product) {
        product.total_quantity += Number(row.total_quantity);
        product.totalOrders += Number(row.totalOrders);
        return;
      }
      rows.push({
        product: row.standardBrochuresIdentity.product,
        total_quantity: Number(row.total_quantity),
        totalOrders: Number(row.totalOrders),
        year
      });
    });
    this.dataSource$.next(rows);
  }

  generateByMonth() {
    if (!this.monthlyOrderMasterData) { return; }
    const byMonth = [].concat(this.monthlyOrderMasterData);
    const { startDate, endDate } = this.filterForm.value;
    const chartConfig: MonthChartConfig = {
      startDate,
      endDate,
      monthKey: 'order_month',
      yearKey: 'order_year',
      qtyKey: this.activeCol
    };
    this.byMonthChart = this.util.generateMonthsChartData(chartConfig, byMonth);
  }

  prepareBusinessChart() {
    if (!this.byBusinessSegmentMasterData) { return; }
    const { startDate, endDate } = this.filterForm.value;
    const data: SegmentChartConfig = {
      startDate,
      endDate,
      qtyKey: this.activeCol
    };

    this.byBusinessSegmentChart = this.util.generateBusinessChartData(data, [].concat(this.byBusinessSegmentMasterData));
  }

}
