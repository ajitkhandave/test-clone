import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { take } from 'rxjs/operators';
import { CommonDatePipe } from '../../pipes/common-date.pipe';

@Component({
  selector: 'app-order-details-order-level',
  templateUrl: './order-details-order-level.component.html',
  styleUrls: ['./order-details-order-level.component.scss']
})
export class OrderDetailsOrderLevelComponent implements OnInit, AfterViewInit {

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


  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'p3OrderId', name: 'P3 Order Id', sortable: true, draggable: false, resizeable: false },
      { prop: 'clientOrderId', name: 'Order Number', sortable: true, draggable: false, resizeable: false },
      {
        prop: 'orderDate', name: 'Order Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 100, maxWidth: 100, width: 100,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      { prop: 'mptApprover', name: 'Approved By (MPT User)', sortable: true, draggable: false, resizeable: false, minWidth: 175 },
      {
        prop: 'mptApprovedDate', name: 'Date Approved (MPT User)', sortable: true, draggable: false, resizeable: false, minWidth: 180,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'needByDate', name: 'Need By Date', sortable: true, draggable: false, resizeable: false,
        minWidth: 115, maxWidth: 115, width: 115,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'oeStartDate', name: 'OE Start Date', sortable: true, draggable: false, resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'oeEndDate', name: 'OE End Date', sortable: true, draggable: false, resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'eventDate', name: 'Event Date', sortable: true, draggable: false, resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      {
        prop: 'completeShipDate', name: 'Shipped Date', sortable: true, draggable: false, resizeable: false,
        pipe: this.datePipe,
        comparator: this.datePipe.sort.bind(this)
      },
      { prop: 'eventType', name: 'Event Type', sortable: true, draggable: false, resizeable: false },
      { prop: 'segment', name: 'Segment', sortable: false, draggable: false, resizeable: false },
      { prop: 'plansAndProducts', name: 'Plans And Products', sortable: false, draggable: false, resizeable: false },
      { prop: 'numberOfEmployees', name: 'Employees', sortable: false, draggable: false, resizeable: false },
      // { prop: '', name: 'Purchaser', sortable: true, draggable: false, resizeable: false }, // Todo: Query to ask Platform team.
      { prop: 'userEmail', name: 'Purchaser Email', sortable: true, draggable: false, resizeable: false },
      { prop: 'customerName', name: 'Customer Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'shipToCompanyName', name: 'Ship To Company Name', sortable: true, draggable: false, resizeable: false, minWidth: 170 },
      { prop: 'firstName', name: 'Ship To First Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'lastName', name: 'Ship To Last Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'address1', name: 'Address 1', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'address2', name: 'Address 2', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'city', name: 'City', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'state', name: 'State', sortable: false, draggable: false, resizeable: false, cellClass: 'text-uppercase' },
      { prop: 'zipCode', name: 'Zip Code', sortable: false, draggable: false, resizeable: false },
      { prop: 'shipMethod', name: 'Ship Method', sortable: true, draggable: false, resizeable: false },
      { prop: 'printProcurementTeam', name: 'Print Procurement Team', sortable: true, draggable: false, resizeable: false, minWidth: 170 },
      { prop: 'printVendor', name: 'Print Vendor', sortable: true, draggable: false, resizeable: false },
      { prop: 'orderStatus', name: 'Order Status', sortable: true, draggable: false, resizeable: false },
      { prop: 'glCode', name: 'GL Code', sortable: true, draggable: false, resizeable: false },
      { prop: 'productAmount', name: 'Product Amount', sortable: true, draggable: false, resizeable: false },
      { prop: 'taxAmount', name: 'Tax Amount', sortable: true, draggable: false, resizeable: false },
      { prop: 'totalAmount', name: 'Total Amount', sortable: true, draggable: false, resizeable: false }
    ];

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
    this.reportService.fetchOrderDetails(startDate, endDate).pipe(
      take(1)
    ).subscribe(rows => {
      this.dataSource$.next(rows);
      this.onSearch();
    });
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      p3OrderId: '',
      orderNumber: '',
      orderStatus: ''
    });
    this.tableConfig.filters.next(null);
  }

  applyQuery(row) {
    const { orderStatus, orderNumber, p3OrderId } = this.filterForm.value;
    let isOrderStatus = true;
    let isOrderNumber = true;
    let isP3OrderId = true;

    if (orderNumber) {
      isOrderNumber = row.clientOrderId.toLowerCase().includes(orderNumber.toLowerCase());
    }

    if (p3OrderId) {
      isP3OrderId = row.p3OrderId.toLowerCase().includes(p3OrderId.toLowerCase());
    }

    if (orderStatus) {
      isOrderStatus = row.orderStatus === orderStatus;
    }
    return isOrderStatus && isOrderNumber && isP3OrderId;
  }

}
