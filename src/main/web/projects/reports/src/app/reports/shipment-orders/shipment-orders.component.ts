import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { CommonDatePipe } from '../../pipes/common-date.pipe';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';

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
    api: () => this.reportService.fetchShipmentOrders(),
    query: (row) => this.applyQuery(row)
  };
  datePipe = new CommonDatePipe();
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
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
      { prop: 'shipments', name: 'Shipments', sortable: false, draggable: false, resizeable: false, width: 80, maxWidth: 80, minWidth: 80 }
    ];

    this.filterForm = new FormGroup({
      clientOrderId: new FormControl(''),
      orderStatus: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      filterBy: new FormControl('shipmentOrderDate')
    }, { validators: FilterSelectedValidator });
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

}
