import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-title',
  template: `
    <div class="report">
      <div class="report-header pb-1 pl-2">
        <span>Reports</span>
        <span class="header-button ml-auto" ngbDropdown>
          <button class="btn btn-sm btn-primary" ngbDropdownToggle> Export </button>
          <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
            <button ngbDropdownItem (click)="exportPdf()">PDF</button>
            <button ngbDropdownItem (click)="exportSheet()">Excel</button>
          </div>
        </span>
      </div>
    </div>
  `
})
export class TitleComponent implements OnInit {

  constructor(
    private service: ReportService
  ) { }

  ngOnInit() {
  }

  exportPdf() {
    this.service.exportAsPdf$.next(true);
  }

  exportSheet() {
    this.service.exportAsExcel$.next();
  }

}
