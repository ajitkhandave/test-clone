import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';
import { Subject } from 'rxjs';
import { DateRange } from '../../models/date-range';
import { LoaderService } from '@sbs/loader';

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
  rawMptChart: any[];
  businessSegmentChart: any[];
  rawBusinessSegmentChart: any[];
  statusChart: any[];
  rawStatusChart: any[];
  flierChart: any[];
  rawFlierChart: any[]
  kitChart: any[];
  rawKitChart: any[];
  userChart: any[];
  rawUserChart: any[];

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

  onSearch(skipRefresh?: string) {
    const { perDay, p3Segment, status, flier, userName, customerProductId } = this.chartFilter;
    const { type } = this.filterForm.value;
    this.type = type;
    if (this.masterData.length) { this.loaderService.show(); }
    const filteredRows = this.masterData.filter(row => this.applyQuery(row));

    if (skipRefresh !== perDay) {
      setTimeout(() => { // For performance issue need to delay the process.
        this.generateMptChart([].concat(filteredRows));
      });
    }

    if (skipRefresh !== p3Segment) {
      this.generateBusinessSegmentChart([].concat(filteredRows));
    }

    if (skipRefresh !== status) {
      this.generateStatusChart([].concat(filteredRows));
    }

    if (skipRefresh !== flier) {
      this.generateFlierChart([].concat(filteredRows));
    }

    if (skipRefresh !== customerProductId) {
      this.generateKitChart([].concat(filteredRows));
    }

    if (skipRefresh !== userName) {
      this.generateUserChart([].concat(filteredRows));
    }
    const totaledRows = this.masterData.filter(row => this.applyQueryForTotals(row));
    this.generateTotals([].concat(totaledRows));
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
    this.rawMptChart = [].concat(rows);
    const { startDate, endDate } = this.filterForm.value;
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);
    const dateFormatter = (date) => moment(date).format('MM/DD/YYYY');

    // Generate signature for the Chart.
    const mptMonthChart = this.generateMonths(momentStartDate.clone(), momentEndDate.clone());
    const uniqueDates = Array.from(new Set(rows.map(row => dateFormatter(row.orderDate))));
    uniqueDates.forEach((date: string) => {
      // Find the existing Signature
      const monthName = moment(date).format('MMM');
      const row = mptMonthChart.find(r => r.name === monthName);
      if (!row) { return; }

      const filteredRowsByDate = rows.filter(item => dateFormatter(item.orderDate) === date);
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
    this.rawBusinessSegmentChart = [].concat(rows);
    const chart = this.generateUniqueChart(rows, 'p3Segment');
    this.reApplyFilterValue(this.chartFilter.p3Segment, chart, rows);
    this.businessSegmentChart = chart;
  }

  generateStatusChart(rows: any[]) {
    this.rawStatusChart = [].concat(rows);
    const chart = this.generateUniqueChart(rows, 'status');
    this.reApplyFilterValue(this.chartFilter.status, chart, rows);
    this.statusChart = chart;
  }

  generateFlierChart(rows: any[]) {
    const filteredRows = rows.filter(row => !!row.flierIdentifier);
    this.rawFlierChart = [].concat(filteredRows);
    const chart = this.generateUniqueChart(filteredRows, 'productName');
    this.reApplyFilterValue(this.chartFilter.flier, chart, filteredRows);
    this.flierChart = chart.slice(0, 10); // Only top 10
  }

  generateKitChart(rows: any[]) {
    const filteredRows = rows.filter(row => !!row.isKit);
    this.rawKitChart = [].concat(filteredRows);
    const chart = this.generateUniqueChart(filteredRows, 'customerProductId');
    this.reApplyFilterValue(this.chartFilter.customerProductId, chart, filteredRows);
    this.kitChart = chart.slice(0, 5); // Only top 5
  }

  generateUserChart(rows: any[]) {
    this.rawUserChart = [].concat(rows);
    const chart = this.generateUniqueChart(rows, 'userName');
    this.reApplyFilterValue(this.chartFilter.userName, chart, rows);
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
   * @param skipFilter Optional flag to apply/ignore the chart filtering flag.
   */
  applyQuery(row: any, skipFilter: boolean = false): boolean {
    const { vendor, perDay, p3Segment, status, flier, customerProductId, userName } = this.filterForm.value;
    let isVendor = true;
    let isChart = true;

    if (vendor) {
      isVendor = (row.printVendor.toLowerCase()).includes(vendor.toLowerCase());
    }

    isChart = (
      (perDay ? moment(row.orderDate).format('MM/DD/YYYY') === perDay : false) ||
      (p3Segment ? row.p3Segment === p3Segment : false) ||
      (status ? row.status === status : false) ||
      (flier ? row.productName === flier : false) ||
      (customerProductId ? row.customerProductId === customerProductId : false) ||
      (userName ? row.userName === userName : false)
    );
    if (!(perDay || p3Segment || status || flier || customerProductId || userName) || skipFilter) {
      isChart = true;
    }
    return isVendor && isChart;
  }

  applyQueryForTotals(row) {
    const { vendor, perDay, p3Segment, status, flier, customerProductId, userName } = this.filterForm.value;
    let isVendor = true;
    let isPerDay = true;
    let isP3Segement = true;
    let isStatus = true;
    let isFlier = true;
    let isCustomerProductId = true;
    let isUserName = true;

    if (vendor) {
      isVendor = (row.printVendor.toLowerCase()).includes(vendor.toLowerCase());
    }

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
    this.maxDate = moment(date).add(3, 'M').endOf('M').format('YYYY-MM-DD');
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
    if (date) {
      this.fetchRecords();
    }
  }

  applyChartFilter(formControlName: string, row?: any) {
    const { perDay, p3Segment, status, flier, customerProductId, userName } = this.chartFilter;
    this.filterForm.get(formControlName).setValue((row && row.name) || null);
    if (row) {
      this.onSearch(formControlName);
      let rawData = [];
      switch (formControlName) {
        case perDay:
          rawData = this.rawMptChart;
          break;
        case p3Segment:
          rawData = this.rawBusinessSegmentChart;
          break;
        case flier:
          rawData = this.rawFlierChart;
          break;
        case status:
          rawData = this.rawStatusChart;
          break;
        case customerProductId:
          rawData = this.rawKitChart;
          break;
        case userName:
          rawData = this.rawUserChart;
          break;
      }
      const filterRows = rawData.filter(row => this.applyQueryForTotals(row));
      row.value = this.activeCount(filterRows);
    } else {
      // Find how many filters are remaining.
      const appliedFilters = Object
        .keys(this.filterForm.value)
        .filter(keyName => (
          Object.keys(this.chartFilter).includes(keyName) &&
          this.filterForm.value[keyName]
        ));
      // If last filter, it comes under special case. Skip normal refresh & call special case
      if (appliedFilters.length === 1) {
        this.onSearch(appliedFilters[0]);
        this.refreshSpecialCase(appliedFilters[0]);
        return;
      }
      this.onSearch();
    }
  }

  /**
   * On deselecting 2nd last filter, Last active filter chart should be rendered as normal.
   * @param filterName Name of the chartFilter.
   */
  refreshSpecialCase(filterName: string) {
    const { perDay, p3Segment, status, flier, customerProductId, userName } = this.chartFilter;
    const filteredRows = this.masterData.filter(row => this.applyQuery(row, true));
    switch (filterName) {
      case perDay:
        this.generateMptChart(filteredRows);
        break;
      case p3Segment:
        this.generateBusinessSegmentChart(filteredRows);
        break;
      case flier:
        this.generateFlierChart(filteredRows);
        break;
      case status:
        this.generateStatusChart(filteredRows);
        break;
      case customerProductId:
        this.generateKitChart(filteredRows);
        break;
      case userName:
        this.generateUserChart(filteredRows);
        break;
    }
  }

  /**
   * Utility Method to store and will be used for evaluation.
   * @param filterType Type of the filter `p3Segment`, `userName`
   * @param chart Array of the chart, use to find the value
   */
  reApplyFilterValue(filterType: string, chart: { name: string, value: number }[], rawData: any[]) {
    const value = this.filterForm.get(filterType).value;
    if (value) {
      const chartItem = chart.find(row => row.name === value);
      const filterRows = rawData.filter(row => this.applyQueryForTotals(row));
      chartItem.value = this.activeCount(filterRows);
    }
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
