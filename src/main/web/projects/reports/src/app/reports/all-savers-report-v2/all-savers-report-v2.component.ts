import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { QtyPipe } from '../../pipes/qty.pipe';
import { ReportService } from '../../services/report.service';
import { UtilService } from '../../services/util.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { take } from 'rxjs/operators';
import { DateRange } from '../../models/date-range';

@Component({
  selector: 'app-all-savers-report-v2',
  templateUrl: './all-savers-report-v2.component.html',
  styleUrls: ['./all-savers-report-v2.component.scss']
})
export class AllSaversReportV2Component implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    rowHighlightOnClick: true,
    rowHighlightQuery: (row) => this.rowHighlightQuery(row)
  };

  qtyPipe = new QtyPipe();
  filterForm: FormGroup;
  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();

  masterData: any[];
  bySegmentChart: any[];
  byMonthChart: any[];

  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  clearSelection$: Subject<void> = new Subject();

  public readonly OrderType = {
    orders: 'orders',
    printed: 'printed',
    kits: 'kits'
  };
  activeType: string = this.OrderType.printed;
  totalChart = {
    printed: 0,
    orders: 0,
    kits: 0
  };

  public readonly chartFilter = {
    selectedMonth: 'selectedMonth',
    p3Segment: 'p3Segment',
    dataRow: 'dataRow'
  };

  constructor(
    private reportService: ReportService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'sku', name: 'SKU', sortable: true, draggable: false },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, width: 240, minWidth: 240, maxWidth: 240 },
      { prop: 'printed', name: 'Printed', sortable: true, draggable: false, pipe: this.qtyPipe },
      { prop: 'orders', name: 'Orders', sortable: true, draggable: false, pipe: this.qtyPipe },
      { prop: 'kits', name: 'Kits', sortable: true, draggable: false, minWidth: 100, pipe: this.qtyPipe },
    ];

    this.filterForm = new FormGroup({
      sku: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      type: new FormControl(this.OrderType.printed),
      [this.chartFilter.p3Segment]: new FormControl(''),
      [this.chartFilter.selectedMonth]: new FormControl(''),
      [this.chartFilter.dataRow]: new FormControl('')
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

  onSearch(skipFilter?: string) {
    if (!this.masterData) { return; }
    const { type } = this.filterForm.value;
    this.activeType = type;
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));
    const totaledRows = this.masterData.filter(row => this.applyQueryWithAndClause(row));

    Object.keys(this.chartFilter)
      .filter(formControlName => !this.filterForm.get(formControlName).value && skipFilter !== formControlName)
      .forEach(filterName => this.generateCharts(filterName, [].concat(totaledRows)));

    this.appliedFilters
      .filter(formControlName => skipFilter !== formControlName)
      .forEach(filterName => this.generateCharts(filterName, [].concat(filteredRows)));

    this.prepareTotals(totaledRows);
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.get('type').patchValue(this.OrderType.printed);
    Object.keys(this.chartFilter).forEach(filterName => {
      this.filterForm.get(filterName).patchValue(null);
    });
    this.clearSelection$.next();
    this.ngAfterViewInit();
  }

  fetchRecords() {
    this.reportService.fetchAllSaversReportV2().pipe(
      take(1)
    ).subscribe(resp => {
      this.masterData = [].concat(resp);
      this.onSearch();
    });
  }

  generateRows(rows: any[]) {
    const data = [];
    const uniqueSkus = Array.from(new Set(rows.map(row => row.sku)));
    uniqueSkus.forEach(sku => {
      const filteredSkuData = rows.filter(row => row.sku === sku);
      const uniqueProducts = Array.from(new Set(filteredSkuData.map(row => row.productName)));
      uniqueProducts.forEach(productName => {
        const filteredData = filteredSkuData.filter(row => row.productName === productName);
        const orders = this.activeCount(filteredData, this.OrderType.orders);
        const kits = this.activeCount(filteredData, this.OrderType.kits);
        const printed = this.activeCount(filteredData, this.OrderType.printed);
        data.push({
          sku,
          productName,
          orders,
          kits,
          printed
        });
      });
    });
    this.dataSource$.next(data);
  }

  prepareByMonthChart(rows: any[]) {
    const { startDate, endDate } = this.filterForm.value;
    const { baseData, format } = this.util.generateMonthList(startDate, endDate);
    baseData.forEach(chart => {
      const filteredData = rows.filter(row => moment(row.orderDate).format(format) === chart.name);
      chart.value = this.activeCount(filteredData);
    });

    this.reApplyFilterValue(this.chartFilter.selectedMonth, baseData, rows);
    this.byMonthChart = baseData;
  }

  prepareBusinessChart(rows: any[]) {
    const uniqueSegmentList = Array.from(new Set(rows.map(row => row.p3Segment)));
    const chart = [];
    uniqueSegmentList.forEach(segmentName => {
      const filteredData = rows.filter(row => row.p3Segment === segmentName);
      chart.push({
        name: segmentName,
        value: this.activeCount(filteredData)
      });
    });

    this.reApplyFilterValue(this.chartFilter.p3Segment, chart, rows);
    this.bySegmentChart = chart.sort((a, b) => b.value - a.value);
  }

  prepareTotals(rows: any[]) {
    this.totalChart = {
      orders: this.activeCount(rows, this.OrderType.orders),
      printed: this.activeCount(rows, this.OrderType.printed),
      kits: this.activeCount(rows, this.OrderType.kits)
    };
  }

  /** Generic Key Getter for picking dataBy selected value. */
  activeCount(rows: any[], type: string = this.activeType): number {
    switch (type) {
      case this.OrderType.orders: // Rule: Use COUNT DISTINCT on “po_id” to get Orders
        return Array.from(new Set(rows.map(row => row.platformOrderId).filter(i => !!i))).length;

      case this.OrderType.kits: // Rule: Use COUNT DISTINCT on “li_id” to get Kits (also filter on flier_identifier = 1)
        let count = 0;
        const checkedList = [];
        rows.forEach(row => {
          // Filtering the records with lineItemId and flierIdentifier count
          const isKit = !!row.kitIdentifier;
          if (!checkedList.includes(row.lineItemId) && isKit) {
            count++;
            checkedList.push(row.lineItemId);
          }
        });
        return count;

      case this.OrderType.printed: // Rule: SUM(quantityOrdered) for Quantity
        return rows
          .map(row => Number(row.quantity || 0))
          .reduce((prev, curr) => prev + curr, 0);
    }
    return 0;
  }

  /**
   * Method to write the query and conditions based on the filter.
   * @param row Row data object.
   * @return Boolean values, this will be used for filter.
   */
  applyQuery(row: any, skipFilter: boolean = false): boolean {
    const { startDate, endDate, p3Segment, selectedMonth, dataRow, sku } = this.filterForm.value;
    const isSegment = (p3Segment ? row.p3Segment === p3Segment : false);
    let isInRange = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');
    let isMonthRange = false;
    let isDataRow = false;

    if (selectedMonth) {
      const selectedMonthStartDate = moment().month(selectedMonth).startOf('M'); // Todo Revisit for multi Series.
      const selectedMonthEndDate = selectedMonthStartDate.clone().endOf('M');
      isMonthRange = (selectedMonth ? moment(row.orderDate).isBetween(selectedMonthStartDate, selectedMonthEndDate, 'day', '[]') : false);
    }

    if (dataRow) {
      isDataRow = row.sku === sku && row.productName === dataRow;
    }

    if (!(selectedMonth || p3Segment || dataRow)) {
      skipFilter = true;
    }
    return isInRange && (skipFilter || isSegment || isMonthRange || isDataRow);
  }

  applyQueryWithAndClause(row: any) {
    const { startDate, endDate, p3Segment, selectedMonth, dataRow, sku } = this.filterForm.value;
    const isInRange = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');

    let isP3Segment = true;
    let isSelectedRange = true;
    let isDataRow = true;

    if (p3Segment) {
      isP3Segment = row.p3Segment === p3Segment;
    }

    if (selectedMonth) {
      const selectedMonthStartDate = moment().month(selectedMonth).startOf('M'); // Todo Revisit for multi Series.
      const selectedMonthEndDate = selectedMonthStartDate.clone().endOf('M');
      isSelectedRange = moment(row.orderDate).isBetween(selectedMonthStartDate, selectedMonthEndDate, 'day', '[]');
    }

    if (dataRow) {
      isDataRow = (row.sku === sku && row.productName === dataRow);
    }
    return isInRange && isP3Segment && isSelectedRange && isDataRow;
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
  }

  applyBusinessChartFilter(row?: any) {
    const type = this.chartFilter.p3Segment;
    this.applyFilters(type, row);
    this.bySegmentChart = this.bySegmentChart.sort((a, b) => b.value - a.value);
  }

  applyMonthChartFilter(row?: any) {
    const type = this.chartFilter.selectedMonth;
    this.applyFilters(type, row);
  }

  applySkuTotalFilter(event: any) {
    const { sku, dataRow } = this.filterForm.value;
    const skuControl = this.filterForm.get('sku');
    if (sku === event.row.sku && dataRow === event.row.productName) {
      skuControl.patchValue(null);
      this.applyFilters(this.chartFilter.dataRow);
    } else {
      skuControl.patchValue(event.row.sku);
      event.row.name = event.row.productName;
      this.applyFilters(this.chartFilter.dataRow, event.row);
    }
  }

  applyFilters(type: string, row?: any) {
    this.filterForm.get(type).patchValue((row && row.name) || null);
    if (row) { // Filter is applied skip that filter and refresh the charts.
      this.onSearch(type);
      const filteredRows = this.masterData.filter(row => this.applyQueryWithAndClause(row));
      if (type === this.chartFilter.dataRow) {
        row.orders = this.activeCount(filteredRows, this.OrderType.orders);
        row.kits = this.activeCount(filteredRows, this.OrderType.kits);
        row.printed = this.activeCount(filteredRows, this.OrderType.printed);
      }
    } else {
      if (this.appliedFilters.length === 1) {
        this.onSearch(this.appliedFilters[0]);
        const filteredRows = this.masterData.filter(row => this.applyQuery(row, true));
        this.generateCharts(this.appliedFilters[0], filteredRows);
        return;
      }
      this.onSearch();
    }
  }

  get appliedFilters(): string[] {
    return Object.keys(this.chartFilter)
      .filter((keyName) => this.filterForm.get(keyName).value);
  }

  /**
   * Utility Method to store and will be used for evaluation.
   * @param filterType Type of the filter `p3Segment`, `userName`
   * @param chart Array of the chart, use to find the value
   */
  reApplyFilterValue(filterType: string, chart: { name: string, value: number }[], rawData: any[]) {
    const value = this.filterForm.get(filterType).value;
    if (value) {
      const chartItem = chart.find(row => row.name === value);
      const filterRows = rawData.filter(row => this.applyQueryWithAndClause(row));
      chartItem.value = this.activeCount(filterRows);
    }
  }

  generateCharts(filterName: string, rows: any[]) {
    const { selectedMonth, p3Segment, dataRow } = this.chartFilter;
    switch (filterName) {
      case dataRow:
        this.generateRows(rows);
        break;
      case p3Segment:
        this.prepareBusinessChart(rows);
        break;
      case selectedMonth:
        this.prepareByMonthChart(rows);
        break;
    }
  }

  rowHighlightQuery(row): boolean {
    const { sku, dataRow } = this.filterForm.value;
    if (sku === row.sku && dataRow === row.productName) {
      return true;
    }
    return false;
  }
}
