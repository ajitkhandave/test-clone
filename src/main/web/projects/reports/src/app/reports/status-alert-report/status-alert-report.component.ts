import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { CommonDatePipe } from '../../pipes/common-date.pipe';

@Component({
  selector: 'app-status-alert-report',
  templateUrl: './status-alert-report.component.html',
  styleUrls: ['./status-alert-report.component.scss']
})
export class StatusAlertReportComponent implements OnInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    scrollbarH: true,
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchStatusAlertReport(),
    query: (row) => this.applyQuery(row)
  };
  filterForm: FormGroup;
  datePipe = new CommonDatePipe();

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'identity.sbsOrderId', name: 'SBS Order ID', sortable: false, draggable: false, resizeable: false, width: 230, minWidth: 230 },
      { prop: 'clientOrderId', name: 'Client Order ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'customerProductId', name: 'Customer Product ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'customerName', name: 'Customer Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'shipToCompanyName', name: 'Ship To Company Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'destinationId', name: 'Destination ID', sortable: true, draggable: false, resizeable: false },
      { prop: 'address1', name: 'Address 1', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'address2', name: 'Address 2', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'address3', name: 'Address 3', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'city', name: 'City', sortable: false, draggable: false, resizeable: false, cellClass: 'text-capitalized' },
      { prop: 'state', name: 'State', sortable: false, draggable: false, resizeable: false, cellClass: 'text-uppercase' },
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
        pipe: {
          transform: (val) => this.datePipe.transform(val, 'MM/DD/YY HH:mm A')
        }
      },
      { prop: 'printVendor', name: 'Print Vendor', sortable: false, draggable: false, resizeable: false }
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      clientOrderId: new FormControl(''),
      customerProductId: new FormControl(''),
      status: new FormControl('')
    }, { validators: FilterSelectedValidator });
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      clientOrderId: '',
      customerProductId: '',
      status: ''
    });
    this.tableConfig.filters.next(false);
  }

  applyQuery(row) {
    let isClientOrderId = true;
    let isCustomerProductId = true;
    let isStatus = true;
    const { status, clientOrderId, customerProductId } = this.filterForm.value;

    if (status) {
      isStatus = row.status === status;
    }

    if (clientOrderId) {
      isClientOrderId = (row.clientOrderId || '').toLowerCase().includes(clientOrderId.toLowerCase());
    }

    if (customerProductId) {
      isCustomerProductId = (row.customerProductId || '').toLowerCase().includes(customerProductId.toLowerCase());
    }

    return isClientOrderId && isCustomerProductId && isStatus;
  }

}
