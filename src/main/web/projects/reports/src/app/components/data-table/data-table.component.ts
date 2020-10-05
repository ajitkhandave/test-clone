import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Pagination } from '../../models/pagination';
import { Sort } from '../../models/sort';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() sorts: Sort[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() masterOrders: any[];
  @ViewChild(DatatableComponent) tableCmp: DatatableComponent;
  setPage$: EventEmitter<number> = new EventEmitter();
  pageOffset: number = 0;
  totalCount: number;
  // masterOrders = [];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Pagination page Change event handler. Make an API call to get the new data.
   * @param pagination Pagination object.
   */
  onPageChange(pagination: Pagination): void {
  }

  onActivate(event) {

  }

  onSelect(event) {

  }

}
