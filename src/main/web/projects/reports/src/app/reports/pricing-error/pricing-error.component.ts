import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-pricing-error',
  templateUrl: './pricing-error.component.html',
  styleUrls: ['./pricing-error.component.scss']
})
export class PricingErrorComponent implements OnInit {

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchPricingErrorReport()
  };

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'customerSku', name: 'Item Number', sortable: true, draggable: false, resizable: false }, // Todo: Need to validate once API starts.
      { prop: 'size', name: 'Size', sortable: true, draggable: false, resizable: false },
      { prop: 'pageCount', name: 'Page Count', sortable: true, draggable: false, resizable: false },
      { prop: 'blackColor', name: 'Color', sortable: true, draggable: false, resizable: false },
      { prop: 'occurances', name: 'Occurances', sortable: false, draggable: false, resizable: false },
    ];

    this.sorts = [];
  }

}
