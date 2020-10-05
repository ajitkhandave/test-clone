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
        this.isReportTypeActive = resp.urlAfterRedirects.includes('/reports/type');
      });

    this.reportService.getReportTypes()
      .pipe(take(1))
      .subscribe(resp => this.reportTypes = resp);
  }
}
