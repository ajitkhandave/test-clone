import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { CommonDatePipe } from '../../pipes/common-date.pipe';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { RowClickEvent } from '../../models/row-click-event';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shipment-orders',
  templateUrl: './shipment-orders.component.html',
  styleUrls: ['./shipment-orders.component.scss']
})
export class ShipmentOrdersComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  datePipe = new CommonDatePipe();
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  isAddressView: boolean = false;
  shipmentData: any[] = [];
  orderStatuses: string[] = [];

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.displayShipmentReport();
    this.filterForm = new FormGroup({
      clientOrderId: new FormControl(''),
      orderStatus: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      filterBy: new FormControl('shipmentOrderDate')
    }, { validators: FilterSelectedValidator });
    this.sorts = [{ prop: 'clientOrderId', dir: 'desc' }];
    this.fetchShipmentOrders();
  }

  displayShipmentReport() {
    this.columns = [
      { prop: 'p3OrderId', name: 'P3 Order ID', sortable: true, draggable: false, resizeable: false },
      { prop: 'clientOrderId', name: 'Order Number', sortable: true, draggable: false, resizeable: false, width: 220, minWidth: 220 },
      {
        prop: 'orderDate',
        name: 'Order Date',
        sortable: true,
        draggable: false,
        resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this),
        width: 130,
        minWidth: 130,
        maxWidth: 130
      },
      {
        prop: 'needByDate',
        name: 'Need By Date',
        sortable: true,
        draggable: false,
        resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this),
        width: 130,
        minWidth: 130,
        maxWidth: 130
      },
      {
        prop: 'shipmentDate',
        name: 'Ship Date',
        sortable: true,
        draggable: false,
        resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this),
        width: 130,
        minWidth: 130,
        maxWidth: 130
      },
      { prop: 'orderStatus', name: 'Order Status', sortable: true, draggable: false, resizeable: false, minWidth: 160, width: 160, maxWidth: 160 },
      { prop: 'printVendor', name: 'Print Vendor', sortable: true, draggable: false, resizeable: false },
      { prop: 'shipments', name: 'Shipments', sortable: false, draggable: false, resizeable: false, width: 80, maxWidth: 80, minWidth: 80, cellClass: 'text-center' }
    ];
    this.isAddressView = false;
  }

  fetchShipmentOrders() {
    this.reportService.fetchShipmentOrders()
      .pipe(take(1))
      .subscribe(resp => {
        this.shipmentData = [].concat(resp);
        this.dataSource$.next([].concat(this.shipmentData));
        this.orderStatuses = Array.from(new Set(resp.map(r => r.orderStatus))).sort() as string[];
        this.onSearch();
      });
  }

  ngAfterViewInit() {
    const date = moment().add(-1, 'M').startOf('M');
    const val = {
      startDate: date.format('YYYY-MM-DD'),
      endDate: date.endOf('M').format('YYYY-MM-DD')
    };
    this.filterForm.patchValue(val);
    this.dateRange.next(val);
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      orderStatus: '',
      clientOrderId: '',
      filterBy: 'shipmentOrderDate'
    });
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

  applyQuery(row) {
    if (this.isAddressView) { return true; }
    let isInRange = true;
    let isOrderStatus = true;
    let isOrderId = true;
    const { startDate, endDate, orderStatus, clientOrderId, filterBy } = this.filterForm.value;
    const calcInRange = (date: string): boolean => moment(date).isBetween(startDate, endDate, 'day', '[]');

    if (startDate && endDate) {
      if (filterBy === 'shipmentOrderDate') {
        isInRange = calcInRange(row.orderDate);
      }

      if (filterBy === 'shipmentShipDate') {
        isInRange = calcInRange(row.shipmentDate);
      }
    }

    if (clientOrderId) {
      isOrderId = (row.clientOrderId || '').includes(clientOrderId.toLowerCase());
    }

    if (orderStatus) {
      isOrderStatus = row.orderStatus === orderStatus;
    }
    return isInRange && isOrderStatus && isOrderId;
  }

  onRowClick(event: RowClickEvent) {
    if (event.row.addresses && !this.isAddressView) {
      const rows = event.row.addresses.map(item => {
        item.p3OrderId = event.row.p3OrderId;
        return item;
      });
      this.displayAddressReport(rows);
    }
  }

  displayAddressReport(rows: any[]) {
    this.isAddressView = true;
    this.columns = [
      { prop: 'identity.platformOrderId', name: 'PO_ID', sortable: true, draggable: false, resizeable: false },
      { prop: 'identity.clientOrderId', name: 'Order Number', sortable: true, draggable: false, resizeable: false, width: 220, minWidth: 220 },
      { prop: 'address1', name: 'Address 1', sortable: true, draggable: false, resizeable: false },
      { prop: 'address2', name: 'Address 2', sortable: true, draggable: false, resizeable: false },
      { prop: 'address3', name: 'Address 3', sortable: true, draggable: false, resizeable: false },
      { prop: 'city', name: 'City', sortable: true, draggable: false, resizeable: false },
      { prop: 'state', name: 'State', sortable: true, draggable: false, resizeable: false, cellClass: 'text-uppercase' },
      { prop: 'identity.zipCode', name: 'Zip Code', sortable: true, draggable: false, resizeable: false },
    ];
    this.sorts = [{ prop: 'identity.clientOrderId', dir: 'desc' }];
    this.filterForm.get('filterBy').setValue('addressOrderDate');
    this.dataSource$.next(rows);
  }

  goBack() {
    this.displayShipmentReport();
    this.dataSource$.next([].concat(this.shipmentData));
    setTimeout(() => { // To bring the HTML back on the screen and apply the values.
      this.clearFilter();
    });
  }

}
