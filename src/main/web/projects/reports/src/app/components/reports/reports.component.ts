import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  columns: any[];
  sorts: any[];
  data: any;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'orderNumber', name: 'Order Number', sortable: true },
      { prop: 'user.userFirstName', name: 'Ordered By', sortable: true },
      { prop: 'shippingAddress.company', name: 'Customer', sortable: true },
      {
        prop: 'createdAt',
        name: 'Date Created',
        sortable: true
      },
      { prop: 'statusName', name: 'Order Status', sortable: true }
    ];

    this.sorts = [{ prop: 'orderNumber', dir: 'desc' }];
    this.reportService.fetchOrders().subscribe((resp) => this.data = resp.orders);
  }

}
