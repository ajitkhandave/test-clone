import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-title',
  template: `
    <div class="report">
      <div class="report-header pb-1 pl-2">
        <span>Reports - {{service?.activeReport?.name}}</span>
        <span class="header-button ml-auto">
          <button class="btn btn-sm btn-primary" (click)="exportSheet()"> Export </button>
        </span>
      </div>
    </div>
    <router-outlet></router-outlet>
  `
})
export class TitleComponent implements OnInit {

  constructor(
    public service: ReportService
  ) { }

  ngOnInit() {
  }

  exportSheet() {
    this.service.exportAsExcel$.next();
  }

}
