import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ReportType } from '../../models/report-type';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  reportTypes = [];
  isReportTypeActive: boolean = false;

  activePopoverInstance;
  activePopover: string;

  @ViewChild(NgbDropdown) navDropdown: NgbDropdown;
  unsub$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((resp: NavigationEnd) => {
        const RESERVED = ['/reports', '/contact', '/error'];
        this.isReportTypeActive = !RESERVED.some(path => resp.urlAfterRedirects.endsWith(path));
      });

    this.reportService.getReportTypes()
      .pipe(take(1))
      .subscribe(resp => this.reportTypes = resp);
  }

  ngAfterViewInit() {
    this.navDropdown.openChange
      .pipe(takeUntil(this.unsub$))
      .subscribe((status) => {
        if (!status && this.activePopoverInstance) {
          this.activePopoverInstance.close();
          this.activePopoverInstance = null;
          if (!this.reportService.activeReport || this.reportService.activeReport.id !== this.activePopover) {
            this.activePopover = null;
          }
        }
      });
  }

  isReportActive(currentReport): boolean {
    const report = this.reportService.activeReport;
    if (!report) { return false; }
    if (report.id !== currentReport.id && currentReport.submenu && currentReport.submenu.length) {
      const isReportExist = currentReport.submenu.some(r => r.id === report.id);
      if (isReportExist) {
        return true;
      }
    }
    return report.id === currentReport.id;
  }

  get errorUrl(): boolean {
    return !this.router.url.endsWith('/error');
  }

  popoverOpened(p, type: ReportType) {
    this.activePopover = type.id;
    if (this.activePopoverInstance) {
      this.activePopoverInstance.close();
      this.activePopoverInstance = null;
    }
    this.activePopoverInstance = p;
    p.open({ submenu: type.submenu });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
