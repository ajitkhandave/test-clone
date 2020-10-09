import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportType } from '../../models/report-type';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reportTypes$: Observable<ReportType[]>;

  constructor(
    private service: ReportService
  ) { }

  ngOnInit() {
    this.reportTypes$ = this.service.getReportTypes();
  }

}
