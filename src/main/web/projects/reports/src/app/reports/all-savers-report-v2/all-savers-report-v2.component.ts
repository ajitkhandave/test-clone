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

  onSearch() {
    if (!this.masterData) { return; }
    const { type } = this.filterForm.value;
    this.activeType = type;
    const totaledRows = this.masterData.filter(row => this.applyQueryWithAndClause(row));
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));
    this.generateRows(filteredRows);
    this.prepareBusinessChart(filteredRows);
    this.prepareByMonthChart(filteredRows);
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
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.dataRow);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));
    const table = [];
    const uniqueSkus = Array.from(new Set(filteredRows.map(row => row.sku)));
    uniqueSkus.forEach(sku => {
      const filteredSkuData = filteredRows.filter(row => row.sku === sku);
      const uniqueProducts = Array.from(new Set(filteredSkuData.map(row => row.productName)));
      uniqueProducts.forEach(productName => {
        const filteredData = filteredSkuData.filter(row => row.productName === productName);
        const orders = this.activeCount(filteredData, this.OrderType.orders);
        const kits = this.activeCount(filteredData, this.OrderType.kits);
        const printed = this.activeCount(filteredData, this.OrderType.printed);
        table.push({
          sku,
          productName,
          orders,
          kits,
          printed
        });
      });
    });

    //
    this.dataSource$.next(table);
  }

  prepareByMonthChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.selectedMonth);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const { startDate, endDate } = this.filterForm.value;
    const { baseData, format } = this.util.generateMonthList(startDate, endDate);
    baseData.forEach(chart => {
      const filteredData = filteredRows.filter(row => moment(row.orderDate).format(format) === chart.name);
      chart.value = this.activeCount(filteredData);
    });
    this.byMonthChart = baseData;
  }

  prepareBusinessChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.p3Segment);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const uniqueSegmentList = Array.from(new Set(filteredRows.map(row => row.p3Segment)));
    const chart = [];
    uniqueSegmentList.forEach(segmentName => {
      const filteredData = filteredRows.filter(row => row.p3Segment === segmentName);
      chart.push({
        name: segmentName,
        value: this.activeCount(filteredData)
      });
    });
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
  applyQuery(row: any): boolean {
    const { startDate, endDate } = this.filterForm.value;
    return moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');
  }

  applyQueryWithAndClause(row: any) {
    const { p3Segment, selectedMonth, dataRow, sku } = this.filterForm.value;
    const isInRange = this.applyQuery(row);

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
    this.applyFilters(this.chartFilter.selectedMonth, row);
  }

  applySkuTotalFilter(event: any) {
    event.row.name =  event.row.productName;
    this.applyFilters(this.chartFilter.dataRow, event.row);
  }

  applyFilters(type: string, row?: any) {
    this.filterForm.get(type).patchValue((row && row.name) || null);
    if (type === this.chartFilter.dataRow) {
      this.filterForm.get('sku').patchValue((row && row.sku) || null);
    }
    this.onSearch();
  }

  generateDataWithFilters(filters: string[], row: any): boolean {
    return filters.map(filterName => {
      const value = this.filterForm.get(filterName).value;
      switch (filterName) {
        case this.chartFilter.selectedMonth:
          const selectedMonthStartDate = moment().month(value).startOf('M'); // Todo Revisit for multi Series.
          const selectedMonthEndDate = selectedMonthStartDate.clone().endOf('M');
          return moment(row.orderDate).isBetween(selectedMonthStartDate, selectedMonthEndDate, 'day', '[]');

        case this.chartFilter.p3Segment:
          return row.p3Segment === value;

        case this.chartFilter.dataRow:
          const sku = this.filterForm.get('sku').value;
          return (row.sku === sku && row.productName === value)
      }
    }).filter(i => !!i).length === filters.length; // IF every Filter is true, it should
  }

  rowHighlightQuery(row): boolean {
    const { sku, dataRow } = this.filterForm.value;
    if (sku === row.sku && dataRow === row.productName) {
      return true;
    }
    return false;
  }
}
