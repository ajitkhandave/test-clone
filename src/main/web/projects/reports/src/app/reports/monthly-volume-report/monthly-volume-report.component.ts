import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    headerHeight: 55,
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
      { prop: 'monthlyVolumeIdentity.itemNumber', name: 'Item Number', sortable: true, draggable: false, resizeable: false, width: 115, minWidth: 115, maxWidth: 115 },
      { prop: 'productName', name: 'Product Name', sortable: true, draggable: false, resizeable: false, width: 95 },
      { prop: 'itemRevisionNumber', name: 'Item Revision Number', sortable: true, draggable: false, resizeable: false, width: 94, maxWidth: 94, minWidth: 94 },
      { prop: 'jan', name: 'Jan', sortable: true, draggable: false, resizeable: false, width: 60, minWidth: 60 },
      { prop: 'feb', name: 'Feb', sortable: true, draggable: false, resizeable: false, width: 70, minWidth: 70 },
      { prop: 'march', name: 'March', sortable: true, draggable: false, resizeable: false, width: 75, minWidth: 75 },
      { prop: 'april', name: 'April', sortable: true, draggable: false, resizeable: false, width: 75, minWidth: 75 },
      { prop: 'may', name: 'May', sortable: true, draggable: false, resizeable: false, width: 75, minWidth: 75 },
      { prop: 'june', name: 'June', sortable: true, draggable: false, resizeable: false, width: 75, minWidth: 75 },
      { prop: 'july', name: 'July', sortable: true, draggable: false, resizeable: false, width: 75, minWidth: 75 },
      { prop: 'aug', name: 'Aug', sortable: true, draggable: false, resizeable: false, width: 70, minWidth: 70 },
      { prop: 'sept', name: 'Sept', sortable: true, draggable: false, resizeable: false, width: 70, minWidth: 70 },
      { prop: 'oct', name: 'Oct', sortable: true, draggable: false, resizeable: false, width: 65, minWidth: 65 },
      { prop: 'nov', name: 'Nov', sortable: true, draggable: false, resizeable: false, width: 65, minWidth: 65 },
      { prop: 'dec', name: 'Dec', sortable: true, draggable: false, resizeable: false, width: 70, minWidth: 70 }
    ];

    this.filterForm = new FormGroup({
      productName: new FormControl(''),
      itemNumber: new FormControl(''),
      selectYear: new FormControl('')
    }, { validators: this.filterSelectedValidator });
  }

  filterSelectedValidator(formGroup: FormGroup): ValidationErrors | null {
    const { controls } = formGroup;
    const isFormValid = Object.values(controls).some(control => !!control.value);
    return isFormValid ? null : { filterNotSelected: true };
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
