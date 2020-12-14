import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-mpt-report-v2',
  templateUrl: './mpt-report-v2.component.html',
  styleUrls: ['./mpt-report-v2.component.scss']
})
export class MptReportV2Component implements OnInit {

  colorScheme = {
    domain: ['#5AA454', '#7aa3e5', '#C7B42C', '#aae3f5']
  };

  years: number[] = [];
  viewDataBy: string[] = [
    'Order Count',
    'Kit Count',
    'Quantity',
    'Shipments'
  ];
  type: string = this.viewDataBy[0];
  filterForm: FormGroup;

  totalChart: {
    orders: number,
    kits: number,
    qty: number,
    shipments: number
  };

  masterData: any[] = [];

  mptMonthChart: any[];

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      vendor: new FormControl(''),
      year: new FormControl(''),
      type: new FormControl(''),
      quarter: new FormControl('')
    });
    const years = [moment().year()];
    for (let i = 1; i < 5; i++) {
      years[i] = years[0] - i;
    }
    this.years = years;
    this.fetchRecords();
  }

  ngAfterViewInit() {
    this.filterForm.patchValue({
      quarter: moment().quarter(),
      type: this.viewDataBy[0],
      vendor: '',
      year: this.years[0]
    });
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    const { type } = this.filterForm.value;
    this.type = type;
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));
    this.generateMptChart([].concat(filteredRows));
    this.generateBusinessSegmentChart([].concat(filteredRows));
    this.generateStatusChart([].concat(filteredRows));
    this.generateFlierChart([].concat(filteredRows));
    this.generateKitChart([].concat(filteredRows));
    this.generateUserChart([].concat(filteredRows));
  }

  clearFilter() {
    this.ngAfterViewInit();
  }

  fetchRecords() {
    this.reportService.fetchMptReportV2().pipe(
      take(1)
    ).subscribe(resp => {
      this.masterData = [].concat(resp);
      this.onSearch();
    });
  }

  generateMptChart(rows: any[]) {
    const { year, quarter } = this.filterForm.value;
    const startDate = moment()
      .quarter(quarter)
      .startOf('Q')
      .year(year);

    // Generate signature for the Chart.
    const mptMonthChart = this.generateMonths(startDate.clone());
    rows.forEach(order => {
      const date = order.order_date;
      const monthName = moment(date).format('MMM');

      // Find the existing Signature
      const row = mptMonthChart.find(r => r.name === monthName);
      if (!row) { return; }

      // Find if data is already logged for the day.
      const seriesExist = row.series.find(r => r.name === date);

      // Based on activeFilter key add the count.
      const value = Number(order[this.activeKey] || 0);
      if (seriesExist) {
        seriesExist.value += value;
        return;
      }
      row.series.push({
        name: date,
        value
      });
    });
    this.mptMonthChart = mptMonthChart;
  }

  generateBusinessSegmentChart(rows: any[]) {
    //Todo: logic to generate the Business Segment Chart.
  }

  generateStatusChart(rows: any[]) {
    //Todo: logic to generate the Status Chart.
  }

  generateFlierChart(rows: any[]) {
    //Todo: logic to generate the Flier Chart.
  }

  generateKitChart(rows: any[]) {
    //Todo: logic to generate the Kit Chart.
  }

  generateUserChart(rows: any[]) {
    //Todo: logic to generate the User Chart.
  }

  /** Generic Funciton for CountsPerDay Chart */
  generateMonths(date: moment.Moment): { name: string, series: any[] }[] {
    const monthName = date.format('MMM');
    const rows = [{
      name: monthName,
      series: []
    }];
    for (let i = 1; i < 3; i++) {
      const updatedMonthName = date.add(1, 'M').format('MMM');
      rows[i] = {
        name: updatedMonthName,
        series: []
      };
    }
    return rows;
  }

  applyQuery(row: any): boolean {
    const { year, quarter, vendor } = this.filterForm.value;
    const startDate = moment()
      .quarter(quarter)
      .startOf('Q')
      .year(year);
    const endDate = startDate.clone().endOf('Q');

    let isInRange = moment(row.order_date).isBetween(startDate, endDate, 'day', '[]');
    let isVendor = true;
    if (vendor) {
      isVendor = (row.print_vendor.toLowerCase()).includes(vendor.toLowerCase());
    }
    return isInRange && isVendor;
  }

  /** Generic Key Getter for picking dataBy selected value. */
  get activeKey(): string {
    switch (this.type) {
      case this.viewDataBy[0]:
        return 'orderCount';
      case this.viewDataBy[1]:
        return 'kitCount';
      case this.viewDataBy[2]:
        return 'quantity';
      case this.viewDataBy[3]:
        return 'shipments';
    }
  }

}
