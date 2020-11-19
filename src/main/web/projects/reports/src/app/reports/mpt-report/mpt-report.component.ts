import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';
import { Subject } from 'rxjs';
import { DateRange } from '../../models/date-range';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { UtilService, SegmentChartConfig } from '../../services/util.service';

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
  type: string = this.viewDataBy[2];

  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;

  masterOrderCountsPerDay: any[];
  orderCountsPerDay: any[];
  chartByBusiness: any[];

  constructor(
    private reportService: ReportService,
    private utilService: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      vendor: new FormControl(''),
      year: new FormControl(''),
      type: new FormControl(''),
      quarter: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.fetchRecords();
    const years = [moment().year()];
    for (let i = 1; i < 5; i++) {
      years[i] = years[0] - i;
    }
    this.years = years;
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
    if (!this.masterOrderCountsPerDay) { return; }
    const { quarter, vendor, year } = this.filterForm.value;
    const startDate = moment()
      .quarter(quarter)
      .startOf('Q')
      .year(year);
    const endDate = startDate.clone().endOf('Q');
    const rows = this.masterOrderCountsPerDay.filter((row) => {
      let isInRage = true;
      let isVendor = true;
      if (startDate && endDate) {
        isInRage = moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]');
      }

      if (vendor) {
        isVendor = (row.printVendor.toLowerCase()).includes(vendor.toLowerCase());
      }
      return isInRage && isVendor;
    });
    const orderCountsPerDay = this.generateMonths(startDate.clone());
    this.generateOrderCountsPerDay(rows, orderCountsPerDay);
    this.generateBusinessSegement(rows, startDate.clone(), endDate.clone());
  }

  clearFilter() {
    this.ngAfterViewInit();
  }

  fetchRecords() {
    this.reportService.fetchMptReport().pipe(
      take(1)
    ).subscribe(resp => {
      this.masterOrderCountsPerDay = [].concat(resp.SHIPPED_REPORT);
      this.onSearch();
    });
  }

  generateOrderCountsPerDay(data, rows) {
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
    data.forEach(order => {
      const orderDate = moment(order.orderDate).format('MMM');
      const row = rows.find(r => r.name === orderDate);
      if (!row) { return; }
      const seriesExist = row.series.find(r => r.name === order.orderDate);
      if (seriesExist) {
        seriesExist.value += 1;
        return;
      }
      row.series.push({
        name: order.orderDate,
        value: Number(order[keyName()] || 1)
      });
    });
    this.orderCountsPerDay = rows;
  }

  generateBusinessSegement(data, startDate, endDate) {
    const rows: any[] = [];
    const filteredData = data.filter(row => moment(row.orderDate).isBetween(startDate, endDate, 'day', '[]'));
    const uniqueP3Segments = Array.from(new Set(filteredData.map(r => r.p3Segment)));
    uniqueP3Segments.forEach(p3Segment => {
      const rowCount = data.filter(r => r.p3Segment === p3Segment);
      rows.push({
        name: p3Segment,
        value: rowCount.length
      });
    });
    this.chartByBusiness = rows;
  }

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

}
