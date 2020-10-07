import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Sort } from '../../models/sort';
import { TableConfig } from '../../models/table-config';

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
      width: 40
    };
    cols.splice(0, -1, select);
    this._columns = cols;
  }
  @Input() tableConfig: TableConfig;
  @ViewChild(DatatableComponent) tableCmp: DatatableComponent;
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

  constructor() { }

  ngOnInit() {
    if (this.tableConfig) {
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
          take(1),
        ).subscribe(resp => {
          this.masterOrders = resp;
          this.applyFilters();
        });
      }
    }
  }

  applyFilters() {
    let rows = [].concat(this.masterOrders);
    if (this.activeFilters && this.tableConfig.query) {
      rows = this.masterOrders.filter(this.tableConfig.query);
    }
    this.totalCount = rows.length;
    this.rows = rows;
    this.setPage$.next(1);
  }

  onActivate(event) {

  }

  onSelect(event) {
    this.selected = event.selected;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
