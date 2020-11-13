import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { take } from 'rxjs/operators';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { QtyPipe } from '../../pipes/qty.pipe';
import { DateRange } from '../../models/date-range';
import { MonthChartConfig, SegmentChartConfig, UtilService } from '../../services/util.service';

@Component({
  selector: 'app-wcbs',
  templateUrl: './wcbs.component.html',
  styleUrls: ['./wcbs.component.scss']
})
export class WcbsComponent implements OnInit, AfterViewInit {
  qtyPipe: QtyPipe = new QtyPipe();
  readonly PrintedColumn = { prop: 'total_quantity', name: 'No Of Printed', sortable: true, draggable: false, resizeable: false, width: 120, minWidth: 120, pipe: this.qtyPipe };
  readonly OrderColumn = { prop: 'totalOrders', name: 'No Of Orders', sortable: true, draggable: false, resizeable: false, width: 120, minWidth: 120, pipe: this.qtyPipe };

  columns: any[];
  sorts: any[];
  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  masterData: any[];
  filterForm: FormGroup;
  activeCol: string = this.OrderColumn.prop;
  maxDate: string;
  dateRange: Subject<DateRange> = new Subject();

  programMasterData: any[];
  monthlyOrderMasterData: any[];
  fundingTypeMasterData: any[];
  byBusinessSegmentMasterData: any[];

  byMonthChart: any[];
  fundingTypeChart: any[];
  chartByBusiness: any[];

  colorScheme = {
    domain: ['#003fa3']
  };

  constructor(
    private reportService: ReportService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'programs', name: 'Programs', sortable: true, draggable: false, resizeable: false },
      { prop: 'modules', name: 'Modules', sortable: true, draggable: false, resizeable: false },
      { ...this.OrderColumn }
    ];

    this.sorts = [];

    this.filterForm = new FormGroup({
      programs: new FormControl(''),
      modules: new FormControl(''),
      dataBy: new FormControl(this.OrderColumn.prop),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
    this.fetchData();
  }

  fetchData() {
    this.reportService.fetchOnboardingDashboard()
      .pipe(take(1))
      .subscribe(resp => {
        this.programMasterData = [].concat(resp.BY_PROGRAM);
        this.monthlyOrderMasterData = [].concat(resp.WCB_BY_MONTH);
        this.fundingTypeMasterData = [].concat(resp.BY_FUNDING_TYPE);
        this.byBusinessSegmentMasterData = [].concat(resp.WCB_BY_SEGMENT);
        this.generateData();
        this.generateByMonth();
        this.generateFundingType();
        this.prepareBusinessChart();
      });
  }

  ngAfterViewInit() {
    const val = {
      startDate: moment().add(-1, 'year').startOf('y').format('YYYY-MM-DD'),
      endDate: moment().endOf('y').format('YYYY-MM-DD')
    };
    this.filterForm.patchValue(val);
    this.dateRange.next(val);
    this.onSearch();
    this.cdr.detectChanges();
  }

  onSearch() {
    const { dataBy } = this.filterForm.value;
    this.activeCol = dataBy;
    const activeColumn = this.columns.find(col => col.prop === dataBy);
    if (!activeColumn) {
      if (dataBy === this.OrderColumn.prop) {
        this.setOrderColumn();
      }

      if (dataBy === this.PrintedColumn.prop) {
        this.setPrintedColumn();
      }
    }
    this.generateData();
    this.generateByMonth();
    this.generateFundingType();
    this.prepareBusinessChart();
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
    this.filterForm.patchValue({
      programs: '',
      modules: '',
      dataBy: this.OrderColumn.prop
    });
    const isPrintedColumn = this.columns.find(col => col.prop === this.OrderColumn.prop);
    if (!isPrintedColumn) {
      this.setOrderColumn();
    }
    this.ngAfterViewInit();
  }

  startDateChange(date) {
    const control = this.filterForm.get('startDate');
    control.patchValue(date);
  }

  endDateChange(date) {
    const control = this.filterForm.get('endDate');
    control.patchValue(date);
  }

  setOrderColumn() {
    const columns = this.columns.filter(col => col.prop !== this.PrintedColumn.prop);
    columns.push({ ...this.OrderColumn });
    this.columns = columns;
  }

  setPrintedColumn() {
    const columns = this.columns.filter(col => col.prop !== this.OrderColumn.prop);
    columns.push({ ...this.PrintedColumn });
    this.columns = columns;
  }

  applyQuery(row) {
    let isProgram = true;
    let isModule = true;
    const { programs, modules } = this.filterForm.value;
    if (programs) {
      isProgram = row.programs.toLowerCase().includes(programs.toLowerCase());
    }

    if (modules) {
      isModule = row.modules.toLowerCase().includes(modules.toLowerCase());
    }
    return isProgram && isModule;
  }

  generateData() {
    if (!this.programMasterData) { return; }
    const byProgram = [].concat(this.programMasterData);
    const { startDate, endDate } = this.filterForm.value;
    const rows = [];
    const filteredRows = byProgram.filter((row) => {
      if (row && row.identity) {
        return moment(row.identity.order_date).isBetween(startDate, endDate, 'day', '[]');
      }
      return false; // To ignore the null data.
    });
    filteredRows.forEach(row => {
      const program = rows.find(p => row.identity.modules === p.modules);
      if (program) {
        program.total_quantity += Number(row.total_quantity);
        program.totalOrders += Number(row.totalOrders);
        return;
      }

      rows.push({
        programs: row.identity.programs,
        modules: row.identity.modules,
        total_quantity: Number(row.total_quantity),
        totalOrders: Number(row.totalOrders)
      });
    });
    this.dataSource$.next(rows);
  }

  generateByMonth() {
    if (!this.monthlyOrderMasterData) { return; }
    const byMonth = [].concat(this.monthlyOrderMasterData);
    const { startDate, endDate } = this.filterForm.value;
    const chartConfig: MonthChartConfig = {
      startDate,
      endDate,
      monthKey: 'order_month',
      yearKey: 'order_year',
      qtyKey: this.activeCol
    };
    this.byMonthChart = this.util.generateMonthsChartData(chartConfig, byMonth);
  }

  generateFundingType() {
    if (!this.fundingTypeMasterData) { return; }
    const fundingType = [].concat(this.fundingTypeMasterData);
    const { startDate, endDate } = this.filterForm.value;
    const filteredRow = fundingType.filter(funding => {
      if (funding && funding.identity) {
        return moment(funding.identity.order_date).isBetween(startDate, endDate, 'day', '[]');
      }
      return false;
    });

    const uniqueFundingType = Array.from(new Set(filteredRow.map(i => i.identity.fundingType)));
    const data = {};
    uniqueFundingType.forEach((type) => {
      if (!data[type]) {
        data[type] = {
          [this.OrderColumn.prop]: 0,
          [this.PrintedColumn.prop]: 0
        };
      }
      filteredRow
        .filter(row => row.identity.fundingType === type)
        .forEach(row => {
          data[type][this.OrderColumn.prop] += Number(row[this.OrderColumn.prop]);
          data[type][this.PrintedColumn.prop] += Number(row[this.PrintedColumn.prop]);
        });
    });
    this.fundingTypeChart = Object.keys(data).map((key) => {
      return {
        name: key,
        value: data[key][this.activeCol]
      };
    });
  }

  prepareBusinessChart() {
    if (!this.byBusinessSegmentMasterData) { return; }
    const { startDate, endDate } = this.filterForm.value;
    const data: SegmentChartConfig = {
      startDate,
      endDate,
      qtyKey: this.activeCol
    };

    this.chartByBusiness = this.util.generateBusinessChartData(data, [].concat(this.byBusinessSegmentMasterData));
  }

}
