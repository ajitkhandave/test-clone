import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';

@Component({
  selector: 'app-mpt-report',
  templateUrl: './mpt-report.component.html',
  styleUrls: ['./mpt-report.component.scss']
})
export class MptReportComponent implements OnInit, AfterViewInit {

  colorScheme = {
    domain: ['#003fa3']
  };

  years: number[] = [];
  viewDataBy: string[] = [
    'Order Count',
    'Kit Count',
    'Quantity',
    'Shipments'
  ];
  type: string = this.viewDataBy[0];

  maxDate: string;
  filterForm: FormGroup;

  masterOrderCountsPerDay: any[];
  orderCountsPerDay: any[];
  masterChartByBusiness: any[];
  chartByBusiness: any[];
  masterStatusChart: any[];
  statusChart: any[];
  masterFlierChart: any[];
  flierChart: any[];

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
    }, { validators: FilterSelectedValidator });
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
    const { quarter, year, type } = this.filterForm.value;
    this.type = type;
    const startDate = moment()
      .quarter(quarter)
      .startOf('Q')
      .year(year);
    const endDate = startDate.clone().endOf('Q');
    this.generateOrderCountsPerDay(startDate.clone(), endDate.clone());
    this.generateBusinessSegement(startDate.clone(), endDate.clone());
    this.generateStatus(startDate.clone(), endDate.clone());
    this.generateFlier(startDate.clone(), endDate.clone());
  }

  clearFilter() {
    this.ngAfterViewInit();
  }

  fetchRecords() {
    this.reportService.fetchMptReport().pipe(
      take(1)
    ).subscribe(resp => {
      this.masterOrderCountsPerDay = [].concat(resp.MPT_REPORT_PER_DAY);
      this.masterChartByBusiness = [].concat(resp.MPT_REPORT_BY_SEGMENT);
      this.masterStatusChart = [].concat(resp.MPT_REPORT_BY_STATUS);
      // this.masterFlierChart = [].concat(resp.MPT_REPORT_BY_FLIER);
      this.onSearch();
    });
  }

  /** CountsPerDay Chart */
  generateOrderCountsPerDay(startDate, endDate) {
    if (!this.masterOrderCountsPerDay) { return; }

    // Filter the orderCounts based on Vendor, startDate & endDate.
    const filteredData = this.masterOrderCountsPerDay.filter(row => this.filterRecords(startDate, endDate, row));

    // Generate signature for the Chart.
    const orderCountsPerDay = this.generateMonths(startDate.clone());
    filteredData.forEach(order => {
      const date = order.identity.orderDate;
      const monthName = moment(date).format('MMM');

      // Find the existing Signature
      const row = orderCountsPerDay.find(r => r.name === monthName);
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
    this.orderCountsPerDay = orderCountsPerDay;
  }

  /** Business Segment Chart */
  generateBusinessSegement(startDate, endDate) {
    if (!this.masterChartByBusiness) { return; }
    // Filter the records by Vendor, startDate & endDate
    const filteredData = this.masterChartByBusiness.filter(row => this.filterRecords(startDate, endDate, row));
    this.chartByBusiness = this.generateUniqueChart(filteredData, 'p3Segment');
  }

  /** Status Chart */
  generateStatus(startDate, endDate) {
    if (!this.masterStatusChart) { return; }
    // Filter the records by Vendor, startDate & endDate
    const filteredData = this.masterStatusChart.filter(row => this.filterRecords(startDate, endDate, row));
    this.statusChart = this.generateUniqueChart(filteredData, 'status');
  }

  /** Flier Chart */
  generateFlier(startDate, endDate) {
    if (!this.masterFlierChart) { return; }
    // Filter the records by Vendor, startDate & endDate
    // const filteredData = this.masterFlierChart.filter(row => this.filterRecords(startDate, endDate, row));
    // this.flierChart = this.generateUniqueChart(filteredData, 'status');
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

  /** Generic Function for BusinessSegment & Status Chart */
  generateUniqueChart(rows: any[], key: string): any[] {
    const chartList = [];
    const nameList = Array.from(new Set(rows.map(r => r.identity[key])));
    nameList.forEach(name => {
      // Gather all the rows by p3Segment Name
      const list = rows.filter(r => r.identity[key] === name);
      const row = {
        name,
        value: 0
      };
      // Sum the value based on the active Filter.
      list.forEach(order => {
        row.value += Number(order[this.activeKey] || 0);
      });
      chartList.push(row);
    });
    return chartList
      .filter(r => !!r.value)
      .sort((a, b) => b.value - a.value);
  }

  /** Generic Filter. */
  filterRecords(startDate: string, endDate: string, row: any): boolean {
    if (!row || !row.identity) { return false; }
    const { vendor } = this.filterForm.value;
    let isInRage = true;
    let isVendor = true;
    if (startDate && endDate) {
      isInRage = moment(row.identity.orderDate).isBetween(startDate, endDate, 'day', '[]');
    }

    if (vendor) {
      isVendor = (row.identity.printVendor.toLowerCase()).includes(vendor.toLowerCase());
    }
    return isInRage && isVendor;
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
        return 'shipmentCount';
    }
  }

}
