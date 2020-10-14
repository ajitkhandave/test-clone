import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAlertReportComponent } from './status-alert-report.component';

describe('StatusAlertReportComponent', () => {
  let component: StatusAlertReportComponent;
  let fixture: ComponentFixture<StatusAlertReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAlertReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAlertReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
