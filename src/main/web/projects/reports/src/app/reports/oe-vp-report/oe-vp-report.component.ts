import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-oe-vp-report',
  templateUrl: './oe-vp-report.component.html',
  styleUrls: ['./oe-vp-report.component.scss']
})
export class OeVpReportComponent implements OnInit, AfterViewInit {

  columns: any[];
  sorts: any[];

  tableConfig: TableConfig = {
    filters: new Subject<boolean>(),
    api: () => this.dataSource$,
    query: (row) => this.applyQuery(row)
  };
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  masterData: any[];

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'productSegment', name: 'Product Segment', sortable: true, draggable: false, resizable: false },
      { prop: 'p3Segment', name: 'P3 Segment', sortable: true, draggable: false, resizable: false },
      { prop: 'template', name: 'OECB Template', sortable: true, draggable: false, resizable: false },
      { prop: 'quantity', name: 'Quantity', sortable: true, draggable: false, resizable: false },
      { prop: 'orders', name: 'Orders', sortable: true, draggable: false, resizable: false },
      { prop: 'people', name: 'People', sortable: true, draggable: false, resizable: false }
    ];

    this.filterForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });

    this.reportService.fetchOeVpReport()
      .pipe(take(1))
      .subscribe(resp => {
        this.masterData = [].concat(resp);
        this.generateRows(resp);
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
    // this.cdr.detectChanges();
  }

  onSearch() {
    this.tableConfig.filters.next(true);
  }

  clearFilter() {
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

  generateRows(resp) {
    const { startDate, endDate } = this.filterForm.value;
    const rows = [];
    const filteredRows = resp.filter((row) => {
      return moment(row.identity.order_date).isBetween(startDate, endDate);
    });
    const uniqueSegments = Array.from(new Set(filteredRows.map(row => row.identity.productSegment)));
    uniqueSegments.forEach((segment) => {
      const row = {
        productSegment: segment,
        p3Segments: []
      };
      const uniqueSegments = Array.from(new Set(filteredRows.map(item => item.identity.p3Segment)));
      uniqueSegments.forEach((p3SegmentName) => {
        let p3Segment = row.p3Segments.find(i => i.p3Segment === p3SegmentName);
        if (!p3Segment) {
          p3Segment = {
            p3Segment: p3SegmentName,
            quantity: 0,
            orders: 0,
            people: 0
          };
          row.p3Segments.push(p3Segment);
        }
        const p3SegmentList = filteredRows.filter((item) => {
          return item.identity.productSegment === segment && item.identity.p3Segment === p3SegmentName;
        });
        p3SegmentList.forEach(item => {
          p3Segment.template = item.template;
          p3Segment.quantity += item.quantity;
          p3Segment.orders += item.orders;
          p3Segment.people += item.people;
        });
      });
      rows.push(row);
    });
    console.log('rows', rows);
    this.dataSource$.next(rows);
  }

  applyQuery(row) {
    /**
     [{
        orderDate: '',
        productSegment: '',
        p3Segments: [{
          p3Segment: '',
          oecb_template: '',
          quantity: '',
          orders: '',
          people: ''
        }]
    }]
    */
    return row;
  }

}
