import { Component, OnInit } from '@angular/core';
import { ReportType } from './models/report-type';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reports';
  constructor(
    private service: ReportService
  ) { }

  ngOnInit() {
    const types: ReportType[] = [{
      id: '1',
      name: 'All savers report'
    }, {
      id: '2',
      name: 'Status Alert Report'
    }, {
      id: '3',
      name: 'POP Active Products Report'
    }, {
      id: '4',
      name: 'Order Status Report'
    }, {
      id: '5',
      name: 'Order Details Report'
    }, {
      id: '6',
      name: 'Onboarding Dashboard'
    }, {
      id: '7',
      name: 'OE VP Data Report'
    }, {
      id: '8',
      name: 'ENI Monthly Volume Report'
    }, {
      id: '9',
      name: 'Member Engagement Report'
    }, {
      id: '10',
      name: 'Invoicing Report'
    }];
    this.service.setReportTypes(types);
  }
}
