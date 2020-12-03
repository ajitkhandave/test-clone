import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-skus-to-add',
  templateUrl: './skus-to-add.component.html',
  styleUrls: ['./skus-to-add.component.scss']
})
export class SkusToAddComponent implements OnInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchMissingSkus()
  };

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'sku', name: 'sku', sortable: false, draggable: false, resizable: false },
    ];

    this.sorts = [];
  }

}
