import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-datatable-pdf',
  templateUrl: './datatable-pdf.component.html',
  styleUrls: ['./datatable-pdf.component.scss']
})
export class DatatablePdfComponent implements OnInit, OnDestroy {

  @Input() set columns(cols: any[]) {
    cols = cols.filter(col => col.prop !== 'selected');
    this._columns = cols;
  }
  @Input() rows: any[] = [];
  @Input() selected: any[] = [];
  _columns: any[] = [];
  isExporting: boolean = false;
  unsub$: Subject<void> = new Subject();

  constructor(
    private service: ReportService
  ) { }

  ngOnInit() {
    this.service.exportAsPdf$
      .pipe(takeUntil(this.unsub$))
      .subscribe(resp => {
        this.isExporting = resp;
        if (resp) {
          setTimeout(() => this.exportPdf());
        }
      });
  }

  exportPdf() {
      const doc = new jsPDF.jsPDF('p', 'pt', 'a4');
      // @ts-ignore
      doc.autoTable({ html: '#data-table-2', styles: { minCellWidth: 50 } });
      doc.save('MYPdf.pdf');
      this.service.exportAsPdf$.next(null);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
