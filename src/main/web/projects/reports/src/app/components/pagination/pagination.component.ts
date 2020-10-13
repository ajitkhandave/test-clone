import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() table: DatatableComponent;
  @Input() rowCount: number;
  @Input() setPage$: EventEmitter<number> = new EventEmitter();
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  unsub$: Subject<void> = new Subject();
  /** Pagination Object */
  pagination = {
    limit: 10,
    page: 1,
    offset: 0,
    totalPages: 1
  };
  activeSort: { dir: string, prop: string };

  constructor() { }

  ngOnInit() {
    if (!this.table) {
      throw new Error('Table Attribute is required. Pass the reference instance of ngx-datatable.');
    }
    this.unsub$ = new Subject();

    // Method to set Page.
    if (this.setPage$) {
      this.setPage$
        .pipe(takeUntil(this.unsub$))
        .subscribe((newPage: number) => this.onActivePageChange(newPage));
    }

    this.table.sort
      .pipe(takeUntil(this.unsub$))
      .subscribe(sort => this.onActivePageChange(1));
  }

  ngOnChanges(changes) {
    if (
      changes.rowCount &&
      !changes.rowCount.firstChange &&
      changes.rowCount.previousValue !== changes.rowCount.currentValue
    ) {
      this.pagination.totalPages = changes.rowCount.currentValue;
      setTimeout(() => this.onActivePageChange(1));
    }
  }

  onPrev() {
    this.onActivePageChange(this.pagination.page - 1);
  }
  onNext() {
    this.onActivePageChange(this.pagination.page + 1);
  }

  onPaginationLimitChange(newValue: number) {
    this.pagination.limit = newValue;
    this.onActivePageChange(1);
  }

  onActivePageChange(newPage: number) {
    if (this.pagination.totalPages >= newPage && newPage > 0) {
      this.pagination.page = newPage;
      this.applyPagination();
    }
  }

  applyPagination() {
    const { page, limit } = this.pagination;
    const offset = page - 1;
    this.pagination.totalPages = Math.ceil(this.table.rows.length / limit) || 1;
    this.pagination.offset = offset;
    this.table.limit = limit;
    this.table.offset = offset;
    this.pageChange.next(offset);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
