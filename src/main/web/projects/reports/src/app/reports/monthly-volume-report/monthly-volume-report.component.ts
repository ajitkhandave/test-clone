import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { QtyPipe } from '../../pipes/qty.pipe';

@Component({
  selector: 'app-monthly-volume-report',
  templateUrl: './monthly-volume-report.component.html',
  styleUrls: ['./monthly-volume-report.component.scss']
})
export class MonthlyVolumeReportComponent implements OnInit, AfterViewInit {
  filterForm: FormGroup;
  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    scrollbarH: true,
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchMonthlyVolume().pipe(
      map(this.filterMasterRows.bind(this))
    ),
    query: (row) => this.applyQuery(row)
  };

  years: string[] = [];
  qtyPipe: QtyPipe = new QtyPipe();

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'itemNumber', name: 'Item Number', sortable: true, draggable: false, resizeable: false },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, resizeable: false, minWidth: 300, width: 300 },
      { prop: 'itemRevisionNumber', name: 'Item Revision Number', sortable: false, draggable: false, resizeable: false, minWidth: 150, width: 150, maxWidth: 150, cellClass: 'text-right', headerClass: 'text-right' },
      { prop: 'jan', name: 'January', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'feb', name: 'February', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'mar', name: 'March', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'apr', name: 'April', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'may', name: 'May', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'jun', name: 'June', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'jul', name: 'July', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'aug', name: 'August', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'sep', name: 'September', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', pipe: this.qtyPipe },
      { prop: 'oct', name: 'October', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', pipe: this.qtyPipe },
      { prop: 'nov', name: 'November', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', pipe: this.qtyPipe },
      { prop: 'dec', name: 'December', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', pipe: this.qtyPipe }
    ];

    const currentYear = moment().year();
    this.filterForm = new FormGroup({
      productName: new FormControl(''),
      itemNumber: new FormControl(''),
      selectYear: new FormControl(currentYear)
    }, { validators: FilterSelectedValidator });

    this.years = new Array(5).fill(0).map((val, index) => String(currentYear - index));
  }

  ngAfterViewInit() {
    this.tableConfig.filters.next(true);
    this.cdr.detectChanges();
  }

  clearFilter() {
    const currentYear = moment().year();
    this.filterForm.patchValue({
      productName: '',
      itemNumber: '',
      selectYear: currentYear
    });
    this.tableConfig.filters.next(true);
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  applyQuery(row): boolean {
    const { selectYear, itemNumber, productName } = this.filterForm.value;
    let isYear = true;
    let isItemNumber = true;
    let isProductName = true;

    if (selectYear) {
      isYear = row.year == selectYear;
    }

    if (itemNumber) {
      isItemNumber = (row.itemNumber || '').toLowerCase().includes(itemNumber.toLowerCase());
    }

    if (productName) {
      isProductName = (row.productName || '').toLowerCase().includes(productName.toLowerCase());
    }
    return isYear && isItemNumber && isProductName;
  }

  filterMasterRows(resp): any[] {
    /** Generating the table rows */
    const rows = [];
    resp.forEach(row => {
      const orderMonth = Number(row.orderMonth) - 1; // momentJS counts from 0;
      const orderedQty = Number(row.orderedQty || 0);
      const monthName = this.getMonthName(orderMonth);
      let existingRow = rows.find(item =>
        item.productName === row.productName &&
        item.itemRevisionNumber === row.itemRevisionNumber &&
        item.itemNumber === row.itemNumber &&
        item.year == row.orderYear
      );
      // Record doesn't exist let's create one and apply value to that month.
      if (!existingRow) {
        existingRow = this.prepareRowData(row);
        existingRow[monthName] += orderedQty;
        rows.push(existingRow);
        return;
      }
      // Record exist than apply value to relevant month.
      existingRow[monthName] += orderedQty;
    });
    return rows;
  }

  /** Utility method to generate the row signature with empty values. */
  prepareRowData(order) {
    const { productName, itemRevisionNumber, itemNumber, orderYear } = order;
    const emptyRow = {
      productName,
      itemRevisionNumber,
      itemNumber,
      year: orderYear
    };
    for (let i = 0; i < 12; i++) {
      emptyRow[this.getMonthName(i)] = 0;
    }
    return emptyRow;
  }

  /** Utility method to generate the keyName of the month based on the number. */
  getMonthName(monthNumber: number): string {
    return moment().month(monthNumber).format('MMM').toLowerCase();
  }

}
