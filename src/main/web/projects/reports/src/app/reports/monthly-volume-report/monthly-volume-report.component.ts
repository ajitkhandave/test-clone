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
      { prop: 'march', name: 'March', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'april', name: 'April', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'may', name: 'May', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'jun', name: 'June', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'july', name: 'July', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'aug', name: 'August', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', width: 110, maxWidth: 110, minWidth: 110, pipe: this.qtyPipe },
      { prop: 'sept', name: 'September', sortable: true, draggable: false, resizeable: false, cellClass: 'text-right', headerClass: 'text-right', pipe: this.qtyPipe },
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

    /** Creating the array of itemNumbers */
    const itemNumbers: string[] = resp.map(row => row.monthlyVolumeIdentity.itemNumber);

    /** Creating uniqueItemNumber array and looping through each. */
    const uniquItemNumbers = [...Array.from(new Set(itemNumbers))];
    uniquItemNumbers.forEach(itemNumber => {
      /** Filter data with ItemNumber to operate */
      const rowsWithItemNumber = resp.filter(row => row.monthlyVolumeIdentity.itemNumber == itemNumber);

      /** Prepare rows for EachYears */
      this.years.forEach(year => {
        const dataForYear = rowsWithItemNumber.filter(item => item.orderYear == year);
        /** If no data found we'll skip the rowEntry */
        if (!dataForYear.length) { return null; }

        /** If any Entry found prepare the Object and Push to the row. */
        rows.push(this.prepareRowData(year, dataForYear, rowsWithItemNumber[0]));
      });
    });
    return rows;
  }

  prepareRowData(year, dataForYear, order) {
    const { productName, itemRevisionNumber, monthlyVolumeIdentity } = order;
    const getQtyForMonth = (month) => {
      const data = dataForYear.find(item => item.orderMonth == month);
      if (data) { return Number(data.orderedQty); }
      return 0;
    };
    return {
      productName,
      itemRevisionNumber,
      itemNumber: monthlyVolumeIdentity.itemNumber,
      year,
      jan: getQtyForMonth(1),
      feb: getQtyForMonth(2),
      march: getQtyForMonth(3),
      april: getQtyForMonth(4),
      may: getQtyForMonth(5),
      jun: getQtyForMonth(6),
      july: getQtyForMonth(7),
      aug: getQtyForMonth(8),
      sept: getQtyForMonth(9),
      oct: getQtyForMonth(10),
      nov: getQtyForMonth(11),
      dec: getQtyForMonth(12)
    };
  }

}
