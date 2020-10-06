import { Component, OnInit } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { take } from 'rxjs/operators';

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
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
  }

  exportPdf() {
    const exportAsConfig: ExportAsConfig = {
      type: 'pdf',
      elementIdOrContent: 'data-table',
      options: {
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
    };
    this.save(exportAsConfig);
  }

  exportSheet() {
    const exportAsConfig: ExportAsConfig = {
      type: 'xlsx',
      elementIdOrContent: 'data-table'
    };
    this.save(exportAsConfig);
  }

  save(config: ExportAsConfig) {
    this.exportAsService.save(config, Date.now().toString()).pipe(
      take(1)
    ).subscribe();
  }

}
