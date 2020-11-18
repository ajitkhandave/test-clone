import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-mpt-report',
  templateUrl: './mpt-report.component.html',
  styleUrls: ['./mpt-report.component.scss']
})
export class MptReportComponent implements OnInit {

  colorScheme = {
    domain: ['#003fa3']
  };

  viewDataBy: string[] = [
    'Order Count',
    'Kit Count',
    'Quantity',
    'Shipments'
  ];
  type: string = this.viewDataBy[2];

  masterOrderCountsPerDay: any[];
  orderCountsPerDay: any[];

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.fetchRecords();
  }

  fetchRecords() {
    this.reportService.fetchAllSaversReport().pipe(
      take(1)
    ).subscribe(resp => {
      this.masterOrderCountsPerDay = [].concat(resp.BY_SKU);
      this.generateOrderCountsPerDay();
    });
  }

  generateOrderCountsPerDay() {
    if (!this.masterOrderCountsPerDay) { return; }
    const keyName = () => {
      switch (this.type) {
        case this.viewDataBy[0]:
          return 'ordersPerSku';
        case this.viewDataBy[1]:
          return 'kitsCount';
        case this.viewDataBy[2]:
          return 'quantity';
        case this.viewDataBy[3]:
          return 'shipments';
      }
    };
    const rows = this.generateMonths();
    this.masterOrderCountsPerDay.forEach(order => {
      const orderDate = moment(order.identity.order_date).format('MMM');
      const row = rows.find(r => r.name === orderDate);
      if (!row) { return; }
      row.series.push({
        name: order.identity.order_date,
        value: Number(order[keyName()] || 0)
      });
    });
    this.orderCountsPerDay = rows;
  }

  generateMonths() {
    const date = moment().startOf('y').add(8, 'M');
    return new Array(4).fill(0).map(() => {
      const monthName = date.format('MMM');
      date.add(1, 'M');
      return {
        name: monthName,
        series: []
      };
    });
  }

}
