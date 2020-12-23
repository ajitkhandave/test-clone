import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sort } from '../../models/sort';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import * as XLSX from 'xlsx';
import { RowClickEvent } from '../../models/row-click-event';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() sorts: Sort[] = [];
  @Input() set columns(cols: TableColumn[]) {
    const select = {
      prop: 'selected',
      name: '',
      sortable: false,
      canAutoResize: false,
      resizable: false,
      checkboxable: true,
      headerCheckboxable: true,
      width: 35,
      maxWidth: 35
    };
    if (!cols.find(col => col.prop === select.prop)) {
      cols.splice(0, -1, select);
    }
    this._columns = cols;
  }
  @Input() tableConfig: TableConfig;
  @Input() clearSelection: Subject<void>;
  @ViewChild(DatatableComponent) tableCmp: DatatableComponent;
  @Output() rowClick: EventEmitter<RowClickEvent> = new EventEmitter();
  selectionType = SelectionType.checkbox;
  _columns: TableColumn[] = [];
  setPage$: EventEmitter<number> = new EventEmitter();
  pageOffset: number = 0;
  totalCount: number;
  unsub$: Subject<void> = new Subject();
  activeFilters;
  masterOrders = [];
  rows: any[] = [];
  selected: any[] = [];
  tableSelectionClick: boolean = false;
  activeRowElement: HTMLElement;

  constructor(
    private service: ReportService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (this.tableConfig) {
      this.tableConfig.headerHeight = this.tableConfig.headerHeight || 50;
      if (this.tableConfig.filters) {
        this.tableConfig.filters.pipe(
          takeUntil(this.unsub$)
        ).subscribe(filters => {
          this.activeFilters = filters;
          this.applyFilters();
        });
      }

      if (this.tableConfig.api) {
        this.tableConfig.api().pipe(
          takeUntil(this.unsub$)
        ).subscribe(resp => {
          this.masterOrders = resp;
          this.applyFilters();
        });
      }
    }
    this.excelExport();

    if (this.clearSelection) {
      this.clearSelection.pipe(
        takeUntil(this.unsub$)
      ).subscribe(() => this.removeActiveRow());
    }
  }

  applyFilters() {
    let rows = [].concat(this.masterOrders);
    if (this.activeFilters && this.tableConfig.query) {
      rows = this.masterOrders.filter(this.tableConfig.query);
    }
    this.totalCount = rows.length;
    this.rows = rows;
    this.resetHeaderPosition();
    this.setPage$.next(1);
  }

  /**
   * Method that will reset the header position to normal if horizontal scrollbar is applied.
   * To handle the glitch of mismatch of data with column on empty rowset.
   */
  resetHeaderPosition(): void {
    const headerComponent = this.tableCmp.headerComponent;
    if (!headerComponent) { return; }

    const actualWidth = headerComponent._columnGroupWidths.center;
    const innerWidth = headerComponent.innerWidth;

    // To fix the glitch reset the column to 0 offset.
    if (innerWidth < actualWidth && !this.rows.length) {
      // Bring up the scrollbar to original position.
      const event = { offsetX: 0 };
      this.tableCmp.bodyComponent.scroll.next(event);
    }
  }

  onActivate(event) {
    if (event.type === 'click' && !this.tableSelectionClick) {
      const clickEvent: RowClickEvent = {
        row: event.row,
        column: event.column
      };
      this.rowClick.emit(clickEvent);
      if (this.tableConfig.rowHighlightOnClick && this.tableConfig.rowHighlightQuery) {
        const state = this.tableConfig.rowHighlightQuery(event.row);
        if (state) {
          this.renderer.addClass(event.rowElement, 'active-row');
          this.removeActiveRow();
          this.activeRowElement = event.rowElement;
        } else {
          this.renderer.removeClass(event.rowElement, 'active-row');
        }
      }
    }

    if (event.type === 'click' && this.tableSelectionClick) {
      this.tableSelectionClick = false;
    }
  }

  onSelect(event) {
    this.selected = event.selected;
    this.tableSelectionClick = true; // Logic to identify selection click and row click.
  }

  excelExport() {
    this.service.exportAsExcel$
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => {
        /* generate worksheet */
        const sheet1 = [];
        const filterdCols = this._columns.filter(col => col.prop !== 'selected');
        const cols = filterdCols.map(col => col.name);
        sheet1.push(cols);
        let rows = this.rows;
        if (this.selected && this.selected.length) {
          rows = this.selected;
        }
        rows.forEach(row => {
          const data = filterdCols.map(col => col.$$valueGetter(row, col.prop));
          sheet1.push(data);
        });
        /* generate worksheet */
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet1);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        const fileName = `${this.service.activeReport.name}_${Date.now()}.xlsx`;
        XLSX.writeFile(wb, fileName);
      });
  }

  removeActiveRow() {
    if (this.activeRowElement) {
      this.renderer.removeClass(this.activeRowElement, 'active-row');
    }
  }

  ngOnDestroy() {
    this.removeActiveRow();
    this.unsub$.next();
    this.unsub$.complete();
  }

}
