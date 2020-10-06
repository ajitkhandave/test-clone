import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-all-savers-report',
  templateUrl: './all-savers-report.component.html',
  styleUrls: ['./all-savers-report.component.scss']
})
export class AllSaversReportComponent implements OnInit {

  @ViewChild('assetTpl') assetTpl: TemplateRef<string>;
  columns: any[];
  sorts: any[];
  data: any;

  tableConfig: TableConfig = {
    selectionType: SelectionType.checkbox,
    api: () => this.reportService.fetchOrders(),
  };

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        resizable: false,
        checkboxable: true,
        width: 40
      },
      { prop: 'itemNumber', name: 'Item Number', sortable: true, draggable: false },
      { prop: 'itemName', name: 'Product Name', sortable: true, draggable: false },
      { prop: 'assetUrl', name: 'View PDF', sortable: true, draggable: false, cellTemplate: this.assetTpl },
      { prop: 'documentType', name: 'Document Type', sortable: true, draggable: false },
      { prop: 'staticConfigurable', name: 'Static/Configurable', sortable: false, draggable: false }
    ];

    this.sorts = [{ prop: 'itemNumber', dir: 'desc' }];
  }

}
