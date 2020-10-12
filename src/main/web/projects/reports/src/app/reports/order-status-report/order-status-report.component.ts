import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { DateRange } from '../../models/date-range';

@Component({
  selector: 'app-order-status-report',
  templateUrl: './order-status-report.component.html',
  styleUrls: ['./order-status-report.component.scss']
})
export class OrderStatusReportComponent implements OnInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    headerHeight: 80,
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchOrderStatus(),
    query: (row) => this.applyQuery(row)
  };
  filterForm: FormGroup;
  dateRange: Subject<DateRange> = new Subject();

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sbsOrderId', name: 'SBS Order ID', sortable: false, draggable: false, resizeable: false, width: 80, minWidth: 80 },
      { prop: 'clientOrderId', name: 'Client Order ID', sortable: false, draggable: false, resizeable: false, width: 95, minWidth: 95 },
      { prop: 'destinationId', name: 'Destination ID', sortable: true, draggable: false, resizeable: false, width: 90, minWidth: 90 },
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
        pipe: { transform: this.datePipe }
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
        comparator: this.dateSort.bind(this),
        draggable: false,
        resizeable: false,
        pipe: { transform: this.datePipe }
      },
      {
        prop: 'modifiedDate',
        name: 'Last Modified Date',
        sortable: true,
        comparator: this.dateSort.bind(this),
        draggable: false,
        resizeable: false,
        pipe: { transform: this.datePipe }
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
    }, { validators: this.filterSelectedValidator });
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
      isClientOrderId = row.clientOrderId.includes(clientOrderId);
    }

    if (printVendor) {
      isPrintVendor = row.printVendor.includes(printVendor);
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

  datePipe(value: any) {
    return moment(value).format('MM/DD/YY');
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

  filterSelectedValidator(formGroup: FormGroup): ValidationErrors | null {
    const { controls } = formGroup;
    const isFormValid = Object.values(controls).some(control => !!control.value);
    return isFormValid ? null : { filterNotSelected: true };
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
  }

  dateSort(valueA, valueB) {
    return moment(valueA).unix() > moment(valueB).unix() ? 1 : -1;
  }
}
