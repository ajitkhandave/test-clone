import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ReportType } from '../../models/report-type';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  reportTypes = [];
  isReportTypeActive: boolean = false;

  activePopoverInstance;
  activePopover: string;

  constructor(
    private router: Router,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((resp: NavigationEnd) => {
        const RESERVED = ['/reports', '/contact', '/error'];
        this.isReportTypeActive = !RESERVED.some(path => resp.urlAfterRedirects.endsWith(path));
      });

    this.reportService.getReportTypes()
      .pipe(take(1))
      .subscribe(resp => this.reportTypes = resp);
  }

  isReportActive(id): boolean {
    const report = this.reportService.activeReport;
    if (!report) { return false; }
    return report.id === id;
  }

  get errorUrl(): boolean {
    return !this.router.url.includes('error');
  }

  popoverOpened(p, type: ReportType) {
    this.activePopover = type.id;
    if (this.activePopoverInstance) {
      this.activePopoverInstance.close();
      this.activePopoverInstance = null;
    }
    this.activePopoverInstance = p;
    p.open({ submenu: type.submenu });
  }

}
