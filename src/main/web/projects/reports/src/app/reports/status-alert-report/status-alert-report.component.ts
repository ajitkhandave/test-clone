import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

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

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sbsOrderId', name: 'SBS Order ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'clientOrderId', name: 'Client Order ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'customerProductId', name: 'Customer Product ID', sortable: false, draggable: false, resizeable: false },
      { prop: 'customerName', name: 'Customer Name', sortable: false, draggable: false, resizeable: false },
      { prop: 'shipToCompanyName', name: 'Ship To Company Name', sortable: false, draggable: false, resizeable: false },
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
      }
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      clientOrderId: new FormControl(''),
      customerProductId: new FormControl(''),
      status: new FormControl('')
    }, { validators: this.filterSelectedValidator });
  }

  datePipe(value: any) {
    return moment(value).format('MM/DD/YY');
  }

  dateSort(valueA, valueB) {
    return moment(valueA).unix() > moment(valueB).unix() ? 1 : -1;
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

  filterSelectedValidator(formGroup: FormGroup): ValidationErrors | null {
    const { controls } = formGroup;
    const isFormValid = Object.values(controls).some(control => !!control.value);
    return isFormValid ? null : { filterNotSelected: true };
  }

  applyQuery(row) {
    let isClientOrderId = true;
    let isCustomerProductId = true;
    let isStatus = true;
    const { status, clientOrderId, customerProductId } = this.filterForm.value;

    if (status) {
      isStatus = row.status.includes(status);
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
