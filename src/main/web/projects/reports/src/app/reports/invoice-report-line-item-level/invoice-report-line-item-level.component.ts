import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { CommonCurrencyPipe } from '../../pipes/common-currency.pipe';
import { CommonDatePipe } from '../../pipes/common-date.pipe';
import { QtyPipe } from '../../pipes/qty.pipe';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-report-line-item-level',
  templateUrl: './invoice-report-line-item-level.component.html',
  styleUrls: ['./invoice-report-line-item-level.component.scss']
})
export class InvoiceReportLineItemLevelComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  tableConfig: TableConfig = {
    scrollbarH: true,
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };

  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  datePipe = new CommonDatePipe();
  qtyPipe = new QtyPipe();
  currencyPipe = new CommonCurrencyPipe();

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'p3_order_id', name: 'P3 Order Id', sortable: true, draggable: false, resizeable: false },
      { prop: 'clientOrderId', name: 'Order Number', sortable: true, draggable: false, resizeable: false },
      { prop: 'p3Segment', name: 'Segment', sortable: true, draggable: false, resizeable: false },
      {
        prop: 'oeStartDate', name: 'OE Start Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 120, maxWidth: 120, width: 120,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'oeEndDate', name: 'OE End Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 100, maxWidth: 100, width: 100,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'order_date', name: 'Order Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 100, maxWidth: 100, width: 100,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'needByDate', name: 'Need By Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 120, maxWidth: 120, width: 120,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'shipDate', name: 'Shipped Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 120, maxWidth: 120, width: 120,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      { prop: 'shipToCompanyName', name: 'Customer Name', sortable: true, draggable: false, resizeable: false },
      { prop: 'customer_product_id', name: 'Customer Product Id', sortable: true, draggable: false, resizeable: false },
      { prop: 'product_name', name: 'Product Name', sortable: true, draggable: false, resizeable: false },
      { prop: 'sku', name: 'SKU', sortable: true, draggable: false, resizeable: false },
      { prop: 'pageCount', name: 'Page Count', sortable: true, draggable: false, resizeable: false },
      { prop: 'finish', name: 'Finish', sortable: true, draggable: false, resizeable: false },
      { prop: 'size', name: 'Size', sortable: true, draggable: false, resizeable: false },
      { prop: 'blackColor', name: 'Black/Color', sortable: true, draggable: false, resizeable: false },
      { prop: 'tracking_number', name: 'Tracking Number', sortable: true, draggable: false, resizeable: false },
      { prop: 'printVendor', name: 'Print Vendor', sortable: true, draggable: false, resizeable: false },
      { prop: 'lineItemStatus', name: 'Line Item Status', sortable: true, draggable: false, resizeable: false, minWidth: 150, width: 150 },
      { prop: 'glCode', name: 'GLCode', sortable: false, draggable: false, resizeable: false, minWidth: 150, width: 150 },
      { prop: 'quantityOrdered', name: 'Qty Ordered', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      {
        prop: 'productPrice', name: 'Product Price', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 115, width: 115
      },
      {
        prop: 'kittingPrice', name: 'Kitting Price', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 115, width: 115
      },
      {
        prop: 'labeAndCartonPrice', name: 'Label & Small Carton Price', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 185, width: 185
      },
      {
        prop: 'staplePrice', name: 'Staple Price', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 100, width: 100
      },
      {
        prop: 'taxAmount', name: 'Tax Amount', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 110, width: 110
      },
      {
        prop: 'totalAmount', name: 'Total Amount', sortable: true, draggable: false, resizeable: false,
        pipe: this.currencyPipe, minWidth: 120, width: 120
      }
    ];
    this.sorts = [];
    this.filterForm = new FormGroup({
      p3OrderId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      orderNumber: new FormControl(''),
      orderStatus: new FormControl('')
    }, { validators: FilterSelectedValidator });
  }

  ngAfterViewInit() {
    const val = {
      startDate: moment().add(-1, 'M').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    };
    this.startDateChange(val.startDate);
    this.endDateChange(val.endDate);
    this.dateRange.next(val);
    this.cdr.detectChanges();
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
    if (date) {
      this.fetchRows();
    }
  }

  fetchRows() {
    const { startDate, endDate } = this.filterForm.value;
    this.reportService.fetchInvoiceLineItemReport(startDate, endDate).pipe(
      take(1)
    ).subscribe(resp => {
      this.dataSource$.next(resp);
      this.onSearch();
    });
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      p3OrderId: '',
      orderNumber: ''
    });
    this.tableConfig.filters.next(null);
  }

  applyQuery(row) {
    const { orderNumber, p3OrderId } = this.filterForm.value;
    let isOrderNumber = true;
    let isP3OrderId = true;

    if (orderNumber) {
      isOrderNumber = row.clientOrderId.toLowerCase().includes(orderNumber.toLowerCase());
    }

    if (p3OrderId) {
      isP3OrderId = row.p3_order_id.toLowerCase().includes(p3OrderId.toLowerCase());
    }

    return isOrderNumber && isP3OrderId;
  }
}
