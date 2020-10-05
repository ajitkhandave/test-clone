import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() table: DatatableComponent;
  @Input() rowCount: number;
  @Input() setPage$: EventEmitter<number> = new EventEmitter();
  @Output() pageChange: EventEmitter<Pagination> = new EventEmitter();
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
      .subscribe(value => {
        this.activeSort = value.sorts[0];
        this.onActivePageChange(1);
      });
  }

  ngOnChanges(changes) {
    if (
      changes.rowCount &&
      !changes.rowCount.firstChange &&
      changes.rowCount.previousValue !== changes.rowCount.currentValue
    ) {
      this.pagination.totalPages = changes.rowCount.currentValue;
      this.countTotalPages();
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

  countTotalPages() {
    const { limit } = this.pagination;
    this.pagination.totalPages = Math.ceil(this.rowCount / limit) || 1;
  }

  applyPagination() {
    const { page, limit } = this.pagination;
    const offset = page - 1;
    this.countTotalPages();
    this.pagination.offset = offset;
    this.table.limit = limit;
    this.table.offset = offset;

    const pageChangeObj: Pagination = {
      pageNo: offset,
      pageSize: limit
    };
    if (this.activeSort) {
      const { dir, prop } = this.activeSort;
      pageChangeObj.sortBy = prop;
      pageChangeObj.sortOrder = dir;
    }
    this.pageChange.next(pageChangeObj);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
