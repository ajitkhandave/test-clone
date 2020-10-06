import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TableConfig } from '../../models/table-config';
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

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchOrders(),
    query: (row) => this.applyQuery(row)
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
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      itemNumber: '',
      productName: '',
      staticConfigurable: ''
    });
    this.tableConfig.filters.next(false);
  }

  /**
   * Method to write the query and conditions based on the filter.
   * @param row Row data object.
   * @return Boolean values, this will be used for filter.
   */
  applyQuery(row: any): boolean {
    const { itemNumber, productName, staticConfigurable } = this.filterForm.value;
    let itemNumberFilter = true;
    let productNameFilter = true;
    let staticConfigurableFilter = true;

    if (itemNumber) {
      itemNumberFilter = row.itemNumber.includes(itemNumber);
    }

    if (productName) {
      productNameFilter = row.itemName.includes(productName);
    }

    if (staticConfigurable) {
      staticConfigurableFilter = row.staticConfigurable.includes(staticConfigurable);
    }

    return itemNumberFilter && productNameFilter && staticConfigurableFilter;
  }

}
