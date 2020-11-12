import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { DateRange } from '../../models/date-range';
import { TableConfig } from '../../models/table-config';
import { ReportService } from '../../services/report.service';
import { FilterSelectedValidator } from '../../validators/filter-selected.validator';
import { take } from 'rxjs/operators';
import { QtyPipe } from '../../pipes/qty.pipe';

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
    api: () => this.dataSource$
  };
  dateRange: Subject<DateRange> = new Subject();
  filterForm: FormGroup;
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  masterData: any[];
  qtyPipe: QtyPipe = new QtyPipe();
  maxDate: string;

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sorts = [];
    this.columns = [
      { prop: 'productSegment', name: 'Product Segment', sortable: true, draggable: false, resizable: false },
      { prop: 'p3Segment', name: 'P3 Segment', sortable: true, draggable: false, resizable: false },
      { prop: 'template', name: 'OECB Template', sortable: true, draggable: false, resizable: false },
      { prop: 'quantity', name: 'Quantity', cellClass: 'text-right', headerClass: 'text-right', sortable: true, draggable: false, resizable: false, pipe: this.qtyPipe },
      { prop: 'orders', name: 'Orders', cellClass: 'text-right', headerClass: 'text-right', sortable: true, draggable: false, resizable: false, pipe: this.qtyPipe },
      { prop: 'people', name: 'People', cellClass: 'text-center', headerClass: 'text-center', sortable: true, draggable: false, resizable: false, pipe: this.qtyPipe }
    ];

    this.filterForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    }, { validators: FilterSelectedValidator });
    this.maxDate = moment().endOf('y').format('YYYY-MM-DD');
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
    this.cdr.detectChanges();
  }

  onSearch() {
    this.generateRows([].concat(this.masterData));
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
      if (row && row.identity) {
        return moment(row.identity.order_date).isBetween(startDate, endDate, 'day', '[]');
      }
      return false; // To ignore the null data.
    });
    const uniqueSegments = Array.from(new Set(filteredRows.map(row => row.identity.productSegment)));
    uniqueSegments.forEach((segment) => {
      const uniqueP3Segments = Array.from(new Set(filteredRows.map(item => item.identity.p3Segment)));
      uniqueP3Segments.forEach((p3SegmentName) => {
        const p3SegmentList = filteredRows.filter((item) => {
          return item.identity.productSegment === segment && item.identity.p3Segment === p3SegmentName;
        });
        const row: any = {
          productSegment: segment,
          p3Segment: p3SegmentName,
          quantity: 0,
          orders: 0,
          people: 0
        };
        p3SegmentList.forEach(item => {
          row.template = item.template;
          row.quantity += Number(item.quantity);
          row.orders += Number(item.orders);
          row.people += Number(item.people);
        });
        if (row.quantity || row.orders || row.people) {
          rows.push(row);
        }
      });
    });
    this.dataSource$.next(rows);
  }
}
