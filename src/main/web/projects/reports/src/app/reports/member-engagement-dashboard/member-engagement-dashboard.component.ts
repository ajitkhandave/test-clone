import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { MonthChartConfig, SegmentChartConfig, UtilService } from '../../services/util.service';

@Component({
  selector: 'app-member-engagement-dashboard',
  templateUrl: './member-engagement-dashboard.component.html',
  styleUrls: ['./member-engagement-dashboard.component.scss']
})
export class MemberEngagementDashboardComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };

  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  bySkuMasterRecords: any[] = [];
  byMonthMasterData: any[];
  chartByMonth: any[];
  byBusinessSegmentMasterData: any[];
  chartByBusiness: any[];

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sku', name: 'SKU', sortable: true, draggable: false },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, width: 240, minWidth: 240, maxWidth: 240 },
      { prop: 'quantity', name: 'Printed', sortable: true, draggable: false },
      { prop: 'ordersPerSku', name: 'Orders', sortable: true, draggable: false },
      { prop: 'kitsCount', name: 'Kits', sortable: true, draggable: false, minWidth: 100 },
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      sku: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
    this.fetchRecords();
  }

  ngAfterViewInit() {
    const val = {
      startDate: moment().startOf('y').format('YYYY-MM-DD'),
      endDate: moment().endOf('y').format('YYYY-MM-DD')
    };
    this.filterForm.patchValue(val);
    this.dateRange.next(val);
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    this.generateRows();
    this.prepareByMonthChart();
    this.prepareBusinessChart();
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.get('sku').patchValue(null);
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

  /**
   * Method to write the query and conditions based on the filter.
   * @param row Row data object.
   * @return Boolean values, this will be used for filter.
   */
  applyQuery(row: any): boolean {
    let isSku = true;
    const { sku } = this.filterForm.value;
    if (sku) {
      isSku = (row.sku || '').toLowerCase().includes(sku.toLowerCase());
    }
    return isSku;
  }

  fetchRecords() {
    this.reportService.fetchMemberEngagementReport().pipe(
      take(1)
    ).subscribe(resp => {
      this.bySkuMasterRecords = [].concat(resp.BY_SKU);
      this.byMonthMasterData = [].concat(resp.BY_MONTH);
      this.byBusinessSegmentMasterData = [].concat(resp.BY_SEGMENT);
      this.onSearch();
    });
  }

  generateRows() {
    const { startDate, endDate } = this.filterForm.value;
    const filteredRows = this.bySkuMasterRecords.filter(row => moment(row.identity.order_date).isBetween(startDate, endDate, 'day', '[]'));
    const rows = [];
    filteredRows.forEach((row) => {
      let existingRow = rows.find(r => r.sku === row.identity.product);
      if (!existingRow) {
        existingRow = {
          kitsCount: Number(row.kitsCount),
          ordersPerSku: Number(row.ordersPerSku),
          quantity: Number(row.quantity),
          p3Segment: row.p3Segment,
          productName: row.productName,
          lineItemId: row.lineItemId,
          lineComponentId: row.lineComponentId,
          sku: row.identity.product
        };
        rows.push(existingRow);
      } else {
        existingRow.kitsCount += Number(row.kitsCount);
        existingRow.ordersPerSku += Number(row.ordersPerSku);
        existingRow.quantity += Number(row.quantity);
      }
    });
    this.dataSource$.next(rows);
  }

  prepareByMonthChart() {
    if (!this.byMonthMasterData) { return; }
    const { startDate, endDate } = this.filterForm.value;
    const rows = [].concat(this.byMonthMasterData) || [];
    const chartConfig: MonthChartConfig = {
      startDate,
      endDate,
      monthKey: 'order_month',
      yearKey: 'order_year',
      qtyKey: 'total_quantity'
    };
    this.chartByMonth = this.util.generateMonthsChartData(chartConfig, rows);
  }

  prepareBusinessChart() {
    if (!this.byBusinessSegmentMasterData) { return; }
    const { startDate, endDate } = this.filterForm.value;
    const data: SegmentChartConfig = {
      startDate,
      endDate,
      qtyKey: 'total_quantity'
    };

    this.chartByBusiness = this.util.generateBusinessChartData(data, [].concat(this.byBusinessSegmentMasterData));
  }
}
