import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '../../models/date-range';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { CommonDatePipe } from '../../pipes/common-date.pipe';

@Component({
  selector: 'app-order-status-report',
  templateUrl: './order-status-report.component.html',
  styleUrls: ['./order-status-report.component.scss']
})
export class OrderStatusReportComponent implements OnInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    scrollbarH: true,
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchOrderStatusReports(),
    query: (row) => this.applyQuery(row)
  };
  filterForm: FormGroup;
  dateRange: Subject<DateRange> = new Subject();
  datePipe = new CommonDatePipe();

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sbsOrderId', name: 'SBS Order ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'clientOrderId', name: 'Client Order ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'destinationId', name: 'Destination ID', sortable: true, draggable: false, resizeable: false },
      { prop: 'address1', name: 'Address 1', sortable: false, draggable: false, resizeable: false },
      { prop: 'address2', name: 'Address 2', sortable: false, draggable: false, resizeable: false },
      { prop: 'address3', name: 'Address 3', sortable: false, draggable: false, resizeable: false },
      { prop: 'city', name: 'City', sortable: false, draggable: false, resizeable: false },
      { prop: 'state', name: 'State', sortable: false, draggable: false, resizeable: false },
      { prop: 'zipCode', name: 'Zip Code', sortable: false, draggable: false, resizeable: false },
      {
        prop: 'needByDate',
        name: 'Need By Date',
        sortable: false,
        draggable: false,
        resizeable: false,
        pipe: this.datePipe
      },
      {
        prop: 'status',
        name: 'Status',
        sortable: true,
        draggable: false,
        resizeable: false,
        pipe: { transform: (value) => value.split('_').join(' ') }
      },
      {
        prop: 'orderDate',
        name: 'Order Date',
        sortable: true,
        comparator: this.datePipe.sort.bind(this),
        draggable: false,
        resizeable: false,
        pipe: this.datePipe
      },
      {
        prop: 'modifiedDate',
        name: 'Last Modified Date',
        sortable: true,
        comparator: this.datePipe.sort.bind(this),
        draggable: false,
        resizeable: false,
        pipe: this.datePipe
      },
      { prop: 'printVendor', name: 'Print Vendor', sortable: false, draggable: false, resizeable: false }
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      clientOrderId: new FormControl(''),
      printVendor: new FormControl(''),
      status: new FormControl(''),
      selectADate: new FormControl('orderDate'),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
  }

  /**
   * Method to write the query and conditions based on the filter.
   * @param row Row data object.
   * @return Boolean values, this will be used for filter.
   */
  applyQuery(row: any): boolean {
    let isClientOrderId = true;
    let isPrintVendor = true;
    let isStatus = true;
    let isInRange = true;
    const { clientOrderId, printVendor, status, selectADate, startDate, endDate } = this.filterForm.value;
    if (clientOrderId) {
      isClientOrderId = (row.clientOrderId || '').toLowerCase().includes(clientOrderId.toLowerCase());
    }

    if (printVendor) {
      isPrintVendor = (row.printVendor || '').toLowerCase().includes(printVendor.toLowerCase());
    }

    if (status) {
      isStatus = row.status.includes(status);
    }

    if (selectADate && startDate && endDate) {
      isInRange = moment(row.needByDate).isBetween(startDate, endDate, 'day', '[]');
      if (selectADate === 'orderDate') {
        isInRange = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');
      }
    }
    return isClientOrderId && isPrintVendor && isStatus && isInRange;
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      clientOrderId: '',
      printVendor: '',
      selectADate: 'orderDate',
      status: '',
      startDate: '',
      endDate: ''
    });
    this.dateRange.next({
      startDate: null,
      endDate: null
    });
    this.tableConfig.filters.next(false);
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
