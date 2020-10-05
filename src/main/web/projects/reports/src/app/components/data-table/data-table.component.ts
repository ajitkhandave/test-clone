import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Sort } from '../../models/sort';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() sorts: Sort[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() tableConfig;
  @ViewChild(DatatableComponent) tableCmp: DatatableComponent;
  setPage$: EventEmitter<number> = new EventEmitter();
  pageOffset: number = 0;
  totalCount: number;
  unsub$: Subject<void> = new Subject();
  activeFilters;
  masterOrders = [];
  rows: any[] = [];

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
    if (this.activeFilters) {
      // Todo: Implement filtering logic.
      return;
    }
    this.totalCount = this.masterOrders.length;
    this.rows = [].concat(this.masterOrders);
    this.setPage$.next(1);
  }

  onActivate(event) {

  }

  onSelect(event) {

  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
