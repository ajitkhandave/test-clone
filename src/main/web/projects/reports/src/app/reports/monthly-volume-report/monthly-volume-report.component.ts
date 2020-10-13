import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-monthly-volume-report',
  templateUrl: './monthly-volume-report.component.html',
  styleUrls: ['./monthly-volume-report.component.scss']
})
export class MonthlyVolumeReportComponent implements OnInit {
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

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'monthlyVolumeIdentity.itemNumber', name: 'Item Number', sortable: true, draggable: false, resizeable: false },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, resizeable: false },
      { prop: 'itemRevisionNumber', name: 'Item Revision Number', sortable: true, draggable: false, resizeable: false },
      { prop: 'jan', name: 'Jan', sortable: true, draggable: false, resizeable: false },
      { prop: 'feb', name: 'Feb', sortable: true, draggable: false, resizeable: false },
      { prop: 'march', name: 'March', sortable: true, draggable: false, resizeable: false },
      { prop: 'april', name: 'April', sortable: true, draggable: false, resizeable: false },
      { prop: 'may', name: 'May', sortable: true, draggable: false, resizeable: false },
      { prop: 'june', name: 'June', sortable: true, draggable: false, resizeable: false },
      { prop: 'july', name: 'July', sortable: true, draggable: false, resizeable: false },
      { prop: 'aug', name: 'Aug', sortable: true, draggable: false, resizeable: false },
      { prop: 'sept', name: 'Sept', sortable: true, draggable: false, resizeable: false },
      { prop: 'oct', name: 'Oct', sortable: true, draggable: false, resizeable: false },
      { prop: 'nov', name: 'Nov', sortable: true, draggable: false, resizeable: false },
      { prop: 'dec', name: 'Dec', sortable: true, draggable: false, resizeable: false }
    ];

    this.filterForm = new FormGroup({
      productName: new FormControl(''),
      itemNumber: new FormControl(''),
      selectYear: new FormControl('')
    }, { validators: FilterSelectedValidator });
  }

  clearFilter() {
    this.filterForm.patchValue({
      productName: '',
      itemNumber: '',
      selectYear: ''
    });
    this.tableConfig.filters.next(false);
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  applyQuery(row): boolean {
    return true;
  }

  filterMasterRows(resp): any[] {
    const rows = [];
    // Todo: Write logic to create the group
    return resp;
  }

}
