import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { CommonDatePipe } from '../../pipes/common-date.pipe';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';

@Component({
  selector: 'app-invoice-report-item-count',
  templateUrl: './invoice-report-item-count.component.html',
  styleUrls: ['./invoice-report-item-count.component.scss']
})
export class InvoiceReportItemCountComponent implements OnInit, AfterViewInit {

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

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'p3OrderId', name: 'P3 Order ID', sortable: true, draggable: false, resizeable: false },
      { prop: 'client_order_id', name: 'Order Number', sortable: true, draggable: false, resizeable: false },
      {
        prop: 'order_date',
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
        prop: 'order_need_by_date',
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
        prop: 'complete_ship_date',
        name: 'Shipped Date',
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
        prop: 'customer_product_id',
        name: 'Customer Product ID',
        sortable: true,
        draggable: false,
        resizeable: false,
        width: 240,
        maxWidth: 240,
        minWidth: 240
      },
      {
        prop: 'items_in_kit', name: 'Count', sortable: true, draggable: false, resizeable: false,
        width: 120,
        maxWidth: 120,
        minWidth: 120
      }
    ];
    this.filterForm = new FormGroup({
      p3OrderId: new FormControl(''),
      clientOrderId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.sorts = [];
  }

  fetchData() {
    const { startDate, endDate } = this.filterForm.value;
    this.reportService.fetchItemCountInKit(startDate, endDate)
      .pipe(take(1))
      .subscribe(resp => {
        this.dataSource$.next(resp);
        this.onSearch();
      });
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

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      p3OrderId: '',
      clientOrderId: ''
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
    if (date) {
      this.fetchData();
    }
  }

  applyQuery(row) {
    const { p3OrderId, clientOrderId } = this.filterForm.value;
    let isP3OrderId = true;
    let isClientOrderId = true;

    if (p3OrderId) {
      isP3OrderId = (row.p3OrderId || '').includes(p3OrderId.toLowerCase());
    }

    if (clientOrderId) {
      isClientOrderId = (row.client_order_id || '').includes(clientOrderId.toLowerCase());
    }
    return isP3OrderId && isClientOrderId;
  }

}
