import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-savers-report',
  templateUrl: './all-savers-report.component.html',
  styleUrls: ['./all-savers-report.component.scss']
})
export class AllSaversReportComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchAllSaversReport().pipe(
      map(this.filterMasterRows.bind(this))
    ),
    query: (row) => this.applyQuery(row)
  };

  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sku', name: 'SKU', sortable: true, draggable: false },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, width: 360, minWidth: 360, maxWidth: 360 },
      { prop: 'quantity', name: 'Printed', sortable: true, draggable: false },
      { prop: 'ordersPerSku', name: 'Orders', sortable: true, draggable: false },
      { prop: 'kitsCount', name: 'Kits', sortable: true, draggable: false },
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      sku: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
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
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.get('sku').patchValue(null);
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

  /**
   * Method to write the query and conditions based on the filter.
   * @param row Row data object.
   * @return Boolean values, this will be used for filter.
   */
  applyQuery(row: any): boolean {
    let isInRange = true;
    let isSku = true;
    const { startDate, endDate, sku } = this.filterForm.value;
    if (startDate && endDate) {
      isInRange = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');
    }

    if (sku) {
      isSku = (row.sku || '').includes(sku.toLowerCase());
    }
    return isInRange && isSku;
  }

  filterMasterRows(resp) {
    return resp.BY_SKU;
  }

}
