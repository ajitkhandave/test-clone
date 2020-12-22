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
    api: () => this.dataSource$
  };

  qtyPipe = new QtyPipe();
  filterForm: FormGroup;
  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();

  masterData: any[];
  bySegmentChart: any[];
  byMonthChart: any[];

  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);

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
      type: new FormControl(this.OrderType.printed)
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
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));
    this.generateRows(filteredRows);
    this.prepareByMonthChart(filteredRows);
    this.prepareBusinessChart(filteredRows);
    this.prepareTotals(filteredRows);
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.get('sku').patchValue(null);
    this.filterForm.get('type').patchValue(this.OrderType.printed);
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
    this.byMonthChart = baseData;
  }

  prepareBusinessChart(rows: any[]) {
    const uniqueSegmentList = Array.from(new Set(rows.map(row => row.p3Segment)));
    const data = [];
    uniqueSegmentList.forEach(segmentName => {
      const filteredData = rows.filter(row => row.p3Segment === segmentName);
      data.push({
        name: segmentName,
        value: this.activeCount(filteredData)
      });
    });
    this.bySegmentChart = data.sort((a, b) => b.value - a.value);
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
    const { sku, startDate, endDate } = this.filterForm.value;
    let isSku = true;
    let isInRange = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');

    if (sku) {
      isSku = (row.sku || '').toLowerCase().includes(sku.toLowerCase());
    }
    return isSku && isInRange;
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
  }

}
