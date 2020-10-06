import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  reportTypes = [];
  isReportTypeActive: boolean = false;

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

  get errorUrl(): boolean {
    return !this.router.url.includes('error');
  }
}
