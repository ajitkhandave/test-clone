import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReportType } from '../../models/report-type';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reportTypes$: BehaviorSubject<ReportType[]> = new BehaviorSubject([]);
  title: string;
  constructor(
    private service: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.verifyConnection().subscribe();
    this.fetchReportTypes();
    this.route.queryParams.subscribe((params) => {
      if (params.menu) {
        const report = this.service.getReport(params.menu);
        this.title = `- ${report.name}`;
        this.reportTypes$.next(report.submenu);
        return;
      }
      this.title = null;
      this.fetchReportTypes();
    });
  }

  fetchReportTypes() {
    this.service.getReportTypes()
      .pipe(take(1))
      .subscribe(resp => this.reportTypes$.next(resp));
  }

  navigate(report: ReportType) {
    if (report.submenu && report.submenu.length) {
      this.router.navigate([''], {
        queryParams: {
          menu: report.id
        }
      });
      return;
    }
    this.router.navigate(['/reports/type', report.id]);
  }

}
