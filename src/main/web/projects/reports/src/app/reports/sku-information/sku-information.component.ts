import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import * as moment from 'moment';

import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { QtyPipe } from '../../pipes/qty.pipe';
import { ReportService } from '../../services/report.service';
import { take } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { CommonCurrencyPipe } from '../../pipes/common-currency.pipe';

@Component({
  selector: 'app-sku-information',
  templateUrl: './sku-information.component.html',
  styleUrls: ['./sku-information.component.scss']
})
export class SkuInformationComponent implements OnInit, AfterViewInit {

  formFactorColumns: any[];
  formFactorSorts: any[];
  skuTotalsColumns: any[];
  skuTotalsSorts: any[];

  dataSource1$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  dataSource2$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  formFactorTableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource1$
  };

  skuTotalsTableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource2$
  };

  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  qtyPipe = new QtyPipe();
  currencyPipe = new CommonCurrencyPipe();

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formFactorColumns = [
      { prop: 'finish', name: 'FINISH', sortable: true, draggable: false, resizeable: false },
      { prop: '8.5 x 11', name: '8.5 x 11', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      { prop: '11 x 17', name: '11 x 17', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      { prop: '13 x 12.5', name: '13 x 12.5', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      { prop: '21 x 16.5', name: '21 x 16.5', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      { prop: '21.25 x 18.13', name: '21.25 x 18.13', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe },
      { prop: 'noSize', name: '', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe, headerClass: 'ml-3' },
      {
        name: 'Grand Total', sortable: true, draggable: false, resizeable: false,
        headerClass: 'text-center', cellClass: 'text-center', pipe: this.currencyPipe
      } // Todo: Fields are missig
    ];
    this.skuTotalsColumns = [
      { prop: 'identity.customer_sku', name: 'SKU', sortable: true, draggable: false, resizeable: false },
      { prop: 'identity.finish', name: 'Finish', sortable: true, draggable: false, resizeable: false },
      { prop: 'identity.size', name: 'Size', sortable: true, draggable: false, resizeable: false },
      { prop: 'identity.productName', name: 'Product Name', sortable: true, draggable: false, resizeable: false },
      { prop: 'quantityOrdered', name: 'Quantity', sortable: true, draggable: false, resizeable: false, pipe: this.qtyPipe }
    ];
    this.formFactorSorts = [];
    this.skuTotalsSorts = [];
    this.filterForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
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
    const api1$ = this.reportService.fetchFormFactorTotals(startDate, endDate);
    const api2$ = this.reportService.fetchSkuInformation(startDate, endDate);
    forkJoin(api1$, api2$).pipe(
      take(1)
    ).subscribe(([resp1, resp2]) => {
      this.generateFormFactorTotals(resp1);
      this.generateSKUTotals(resp2);
      this.onSearch();
    });
  }

  generateFormFactorTotals(rows: any[]) {
    rows = rows.filter(row => !!row.identity); // Ignore empty identity rows / null values.
    const data = [];
    const noSize = 'noSize';
    const sizes = ['8.5 x 11', '11 x 17', '13 x 12.5', '21 x 16.5', '21.25 x 18.13', noSize];
    const uniqueFinishList = Array.from(new Set(rows.map(row => row.identity.finish)));
    uniqueFinishList.forEach((finish) => {
      const sizeData = {};
      sizes.forEach(size => sizeData[size] = 0);
      const filteredRows = rows.filter(row => row.identity.finish === finish);
      filteredRows.forEach(row => {
        const size = row.identity.size.toLowerCase();
        if (!size) {
          sizeData[noSize] += Number(row.quantityOrdered);
          return;
        }
        sizeData[size] += Number(row.quantityOrdered);
      });
      data.push({
        finish,
        ...sizeData
      });
    });
    this.dataSource1$.next(data);
  }

  generateSKUTotals(rows: any[]) {
    rows = rows.filter(row => !!row.identity); // Ignore empty identity rows / null values.
    this.dataSource2$.next(rows);
  }

  onSearch() {
    this.formFactorTableConfig.filters.next(true);
    this.skuTotalsTableConfig.filters.next(true);
  }

  clearFilter() {
    this.onSearch();
  }
}
