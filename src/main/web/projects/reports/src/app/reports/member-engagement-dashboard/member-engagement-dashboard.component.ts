import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';

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
    private cdr: ChangeDetectorRef
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
    const data: any[] = [];
    const momentStartDate = moment(startDate).startOf('M');
    const momentEndDate = moment(endDate).endOf('M');
    const interim = momentStartDate.clone();
    const endYear = Number(momentEndDate.format('YYYY'));
    let startYear = Number(momentStartDate.format('YYYY'));
    const allowedYears = [];
    do {
      allowedYears.push('' + startYear);
      startYear = startYear + 1;
    } while (startYear <= endYear);

    while (momentEndDate > interim || interim.format('M') === momentEndDate.format('M')) {
      const monthNo = interim.format('M');
      const monthName = interim.format('MMMM');
      const row = rows.filter(r => r.order_month == monthNo && allowedYears.includes(r.order_year));
      const qty = row.reduce((prev, curr) => prev + Number(curr.total_quantity), 0);
      data.push({
        name: monthName,
        value: qty
      });
      interim.add(1, 'M');
    }
    this.chartByMonth = data;
  }

  prepareBusinessChart() {
    if (!this.byBusinessSegmentMasterData) { return; }
    const { startDate, endDate } = this.filterForm.value;
    const rows = this.byBusinessSegmentMasterData.filter(row => moment(row.segmentIdentity.order_date).isBetween(startDate, endDate, 'day', '[]'));
    const data: any[] = [];
    rows.forEach(row => {
      let existingRow = data.find(r => r.name === row.segmentIdentity.p3Segment);
      if (!existingRow) {
        existingRow = {
          name: row.segmentIdentity.p3Segment,
          value: Number(row.total_quantity)
        };
        data.push(existingRow);
      } else {
        existingRow.value += Number(row.total_quantity);
      }
    });
    this.chartByBusiness = data;
  }
}
