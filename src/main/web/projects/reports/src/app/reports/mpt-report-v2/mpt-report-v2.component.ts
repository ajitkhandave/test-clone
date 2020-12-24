import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';
import { Subject } from 'rxjs';
import { DateRange } from '../../models/date-range';
import { LoaderService } from '@sbs/loader';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-mpt-report-v2',
  templateUrl: './mpt-report-v2.component.html',
  styleUrls: ['./mpt-report-v2.component.scss']
})
export class MptReportV2Component implements OnInit {

  colorScheme = {
    domain: ['#5AA454', '#7aa3e5', '#C7B42C', '#aae3f5']
  };

  viewDataBy: string[] = [
    'Order Count',
    'Kit Count',
    'Quantity',
    'Shipments'
  ];
  type: string = this.viewDataBy[0];
  filterForm: FormGroup;
  dateRange: Subject<DateRange> = new Subject();
  maxDate: string;

  totalChart: {
    orders: number,
    kits: number,
    qty: number,
    shipments: number
  };

  masterData: any[] = [];

  mptMonthChart: any[];
  mptColors: any[] = [];
  businessSegmentChart: any[];
  statusChart: any[];
  flierChart: any[];
  kitChart: any[];

  userChart: any[];

  clearSelection$: Subject<void> = new Subject();

  public readonly chartFilter = {
    perDay: 'perDay',
    p3Segment: 'p3Segment',
    status: 'status',
    flier: 'flier',
    customerProductId: 'customerProductId',
    userName: 'userName'
  };

  constructor(
    private reportService: ReportService,
    private loaderService: LoaderService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const { perDay, p3Segment, status, flier, userName, customerProductId } = this.chartFilter;
    this.filterForm = new FormGroup({
      vendor: new FormControl(''),
      type: new FormControl(this.viewDataBy[0]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      [perDay]: new FormControl(''),
      [p3Segment]: new FormControl(''),
      [flier]: new FormControl(''),
      [customerProductId]: new FormControl(''),
      [status]: new FormControl(''),
      [userName]: new FormControl('')
    });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
  }

  ngAfterViewInit() {
    const val = {
      startDate: moment().add(-2, 'M').startOf('M').format('YYYY-MM-DD'),
      endDate: moment().endOf('M').format('YYYY-MM-DD')
    };
    this.startDateChange(val.startDate);
    this.endDateChange(val.endDate);
    this.dateRange.next(val);
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    const { type } = this.filterForm.value;
    this.type = type;
    if (this.masterData.length) { this.loaderService.show(); }
    const totaledRows = this.masterData.filter(row => this.applyQueryForTotals(row));
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));

    setTimeout(() => { // For performance issue need to delay the process.
      this.generateMptChart(filteredRows);
    });
    this.generateBusinessSegmentChart(filteredRows);
    this.generateStatusChart(filteredRows);
    this.generateFlierChart(filteredRows);
    this.generateKitChart(filteredRows);
    this.generateUserChart(filteredRows);

    this.generateTotals(totaledRows);

    if (this.masterData.length) {
      setTimeout(() => {
        this.loaderService.hide();
      });
    }
  }

  clearFilter() {
    this.filterForm.patchValue({
      type: this.viewDataBy[0],
      vendor: '',
      perDay: '',
      p3Segment: '',
      status: '',
      flier: '',
      customerProductId: '',
      userName: ''
    });
    this.clearSelection$.next();
    this.clearChartSelection();
    this.onSearch();
  }

  fetchRecords() {
    const { startDate, endDate } = this.filterForm.value;
    this.reportService.fetchMptReportV2(startDate, endDate).pipe(
      take(1)
    ).subscribe(resp => {
      this.masterData = [].concat(resp);
      this.onSearch();
    });
  }

  generateMptChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.perDay);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const { startDate, endDate } = this.filterForm.value;
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);
    const dateFormatter = (date) => moment(date).format('MM/DD/YYYY');

    // Generate signature for the Chart.
    const mptMonthChart = this.generateMonths(momentStartDate.clone(), momentEndDate.clone());
    const uniqueDates = Array.from(new Set(filteredRows.map(row => dateFormatter(row.orderDate))));
    uniqueDates.forEach((date: string) => {
      // Find the existing Signature
      const monthName = moment(date).format('MMM');
      const row = mptMonthChart.find(r => r.name === monthName);
      if (!row) { return; }

      const filteredRowsByDate = filteredRows.filter(item => dateFormatter(item.orderDate) === date);
      const value = this.activeCount(filteredRowsByDate);
      if (value) {
        row.series.push({
          name: date,
          value
        });
      }
    });

    this.mptMonthChart = mptMonthChart;
  }

  generateBusinessSegmentChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.p3Segment);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const chart = this.generateUniqueChart(filteredRows, 'p3Segment');
    this.businessSegmentChart = chart;
  }

  generateStatusChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.status);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const chart = this.generateUniqueChart(filteredRows, 'status');
    this.statusChart = chart;
  }

  generateFlierChart(rows: any[]) {
    const filteredRows = rows.filter(row => !!row.flierIdentifier);
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.flier);
    const chartRows = filteredRows.filter(row => this.generateDataWithFilters(filters, row));

    const chart = this.generateUniqueChart(chartRows, 'productName');
    this.flierChart = chart.slice(0, 10); // Only top 10
  }

  generateKitChart(rows: any[]) {
    const filteredRows = rows.filter(row => !!row.isKit);
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.customerProductId);
    const chartRows = filteredRows.filter(row => this.generateDataWithFilters(filters, row));

    const chart = this.generateUniqueChart(chartRows, 'customerProductId');
    this.kitChart = chart.slice(0, 5); // Only top 5
  }

  generateUserChart(rows: any[]) {
    const filters = this.util.getActiveFilters(this.filterForm, this.chartFilter, this.chartFilter.userName);
    const filteredRows = rows.filter(row => this.generateDataWithFilters(filters, row));

    const chart = this.generateUniqueChart(filteredRows, 'userName');
    this.userChart = chart.slice(0, 5); // Only top 5
  }

  generateTotals(rows: any[]) {
    this.totalChart = {
      orders: this.activeCount(rows, this.viewDataBy[0]),
      kits: this.activeCount(rows, this.viewDataBy[1]),
      qty: this.activeCount(rows, this.viewDataBy[2]),
      shipments: this.activeCount(rows, this.viewDataBy[3])
    };
  }

  /** Generic Funciton for CountsPerDay Chart */
  generateMonths(startDate: moment.Moment, endDate: moment.Moment): { name: string, series: any[] }[] {
    const monthName = startDate.format('MMM');
    const diff = endDate.diff(startDate, 'M');
    const rows = [{
      name: monthName,
      series: []
    }];
    for (let i = 1; i <= diff; i++) {
      const updatedMonthName = startDate.add(1, 'M').format('MMM');
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
    const nameList = Array.from(new Set(rows.map(r => r[key]).filter(i => !!i)));
    nameList.forEach(name => {
      // Gather all the rows by p3Segment Name
      const list = rows.filter(r => r[key] === name);
      const row = {
        name,
        value: this.activeCount(list)
      };
      chartList.push(row);
    });
    return chartList
      .filter(r => !!r.value)
      .sort((a, b) => b.value - a.value);
  }

  /**
   * Critical Utility Method to filterout the records.
   * @param row row object.
   */
  applyQuery(row: any): boolean {
    const { vendor } = this.filterForm.value;
    let isVendor = true;

    if (vendor) {
      isVendor = (row.printVendor.toLowerCase()).includes(vendor.toLowerCase());
    }
    return isVendor;
  }

  applyQueryForTotals(row) {
    const { perDay, p3Segment, status, flier, customerProductId, userName } = this.filterForm.value;
    let isVendor = this.applyQuery(row);
    let isPerDay = true;
    let isP3Segement = true;
    let isStatus = true;
    let isFlier = true;
    let isCustomerProductId = true;
    let isUserName = true;

    if (perDay) {
      isPerDay = moment(row.orderDate).format('MM/DD/YYYY') === perDay;
    }

    if (p3Segment) {
      isP3Segement = row.p3Segment === p3Segment;
    }

    if (status) {
      isStatus = row.status === status;
    }

    if (flier) {
      isFlier = row.productName === flier;
    }

    if (customerProductId) {
      isCustomerProductId = row.customerProductId === customerProductId;
    }

    if (userName) {
      isUserName = row.userName === userName;
    }

    return isVendor && isPerDay && isP3Segement && isStatus && isFlier && isCustomerProductId && isUserName;
  }

  generateDataWithFilters(filters: string[], row: any): boolean {
    const { perDay, p3Segment, status, flier, customerProductId, userName } = this.chartFilter;
    return filters.map(filterName => {
      const value = this.filterForm.get(filterName).value;
      switch (filterName) {
        case perDay:
          return moment(row.orderDate).format('MM/DD/YYYY') === value;

        case p3Segment:
          return row.p3Segment === value;

        case status:
          return row.status === value;

        case flier:
          return row.productName === value;

        case customerProductId:
          return row.customerProductId === value;

        case userName:
          return row.userName === value;
      }
    }).filter(i => !!i).length === filters.length; // IF every Filter is true, it should
  }

  /** Generic Key Getter for picking dataBy selected value. */
  activeCount(rows: any[], type: string = this.type): number {
    switch (type) {
      case this.viewDataBy[0]: // Rule: Use COUNT DISTINCT on “po_id” to get Orders
        return Array.from(new Set(rows.map(row => row.platformOrderId).filter(i => !!i))).length;

      case this.viewDataBy[1]: // Rule: Use COUNT DISTINCT on “li_id” to get Kits (also filter on flier_identifier = 1)
        let count = 0;
        const checkedList = [];
        rows.forEach(row => {
          // Filtering the records with lineItemId and flierIdentifier count
          const isKit = row.isKit; // flierIdentifier // isKit is used as per the tableau
          if (!checkedList.includes(row.lineItemId) && isKit) {
            count++;
            checkedList.push(row.lineItemId);
          }
        });
        return count;

      case this.viewDataBy[2]: // Rule: SUM(quantityOrdered) for Quantity
        return rows
          .map(row => Number(row.quantity || 0))
          .reduce((prev, curr) => prev + curr, 0);

      case this.viewDataBy[3]: // Rule: Use COUNT DISTINCT on tracking number for Shipments
        return Array.from(new Set(rows.map(row => row.trackingNumber).filter(i => !!i))).length;
    }
    return 0;
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
    this.maxDate = moment(date).add(2, 'M').endOf('M').format('YYYY-MM-DD');
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
    if (date) {
      this.fetchRecords();
    }
  }

  applyChartFilter(formControlName: string, row?: any) {
    this.filterForm.get(formControlName).setValue((row && row.name) || null);
    this.onSearch();
  }

  clearChartSelection() {
    this.mptColors = [];
  }

  onMptChartClick(event) {
    const chartType = this.chartFilter.perDay;
    const isSelected = this.mptColors.find(color => color.name === event.name);
    if (isSelected) {
      this.mptColors = [];
      this.applyChartFilter(chartType);
      return;
    }
    this.mptColors = [{
      name: event.name,
      value: '#122377'
    }];
    this.applyChartFilter(chartType, event);
  }
}
