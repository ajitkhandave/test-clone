import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
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
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.reportService.fetchPopActiveReports(),
    query: (row) => this.applyQuery(row)
  };

  filterForm: FormGroup;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'itemNumber', name: 'Item Number', sortable: true, draggable: false },
      { prop: 'itemName', name: 'Product Name', sortable: true, draggable: false, width: 360 },
      { prop: 'assetUrl', name: 'View PDF', sortable: false, draggable: false, cellTemplate: this.assetTpl, width: 110 },
      { prop: 'documentType', name: 'Document Type', sortable: true, draggable: false },
      { prop: 'staticConfigurable', name: 'Static/Configurable', sortable: true, draggable: false, cellClass: 'text-capitalized' }
    ];

    this.sorts = [{ prop: 'itemNumber', dir: 'asc' }];

    this.filterForm = new FormGroup({
      itemNumber: new FormControl(''),
      productName: new FormControl(''),
      staticConfigurable: new FormControl('')
    }, { validators: FilterSelectedValidator });
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
      itemNumberFilter = (row.itemNumber || '').toLowerCase().includes(itemNumber.toLowerCase());
    }

    if (productName) {
      productNameFilter = (row.itemName || '').toLowerCase().includes(productName.toLowerCase());
    }

    if (staticConfigurable) {
      staticConfigurableFilter = row.staticConfigurable.includes(staticConfigurable);
    }

    return itemNumberFilter && productNameFilter && staticConfigurableFilter;
  }

}
