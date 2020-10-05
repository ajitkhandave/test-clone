import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-pop-active-products',
  templateUrl: './pop-active-products.component.html',
  styleUrls: ['./pop-active-products.component.scss']
})
export class PopActiveProductsComponent implements OnInit {

  @ViewChild('assetTpl') assetTpl: TemplateRef<string>;
  columns: any[];
  sorts: any[];
  data: any;

  filterForm: FormGroup;

  tableConfig = {
    api: () => this.reportService.fetchOrders(),
    filters: new BehaviorSubject<{ [key: string]: string }>(null)
  };

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'itemNumber', name: 'Item Number', sortable: true, draggable: false },
      { prop: 'itemName', name: 'Product Name', sortable: true, draggable: false },
      { prop: 'assetUrl', name: 'View PDF', sortable: true, draggable: false, cellTemplate: this.assetTpl },
      { prop: 'documentType', name: 'Document Type', sortable: true, draggable: false },
      { prop: 'staticConfigurable', name: 'Static/Configurable', sortable: false, draggable: false }
    ];

    this.sorts = [{ prop: 'itemNumber', dir: 'desc' }];

    this.filterForm = new FormGroup({
      itemNumber: new FormControl(''),
      productName: new FormControl(''),
      staticConfigurable: new FormControl('')
    });
  }

  onSearch() {
    const { value } = this.filterForm;
    // todo write logic to filter.
    this.tableConfig.filters.next(null);
  }

  clearFilter() {
    this.filterForm.setValue(null);
    this.onSearch();
  }

}
