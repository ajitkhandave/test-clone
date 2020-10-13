import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyVolumeReportComponent } from './monthly-volume-report.component';

describe('MonthlyVolumeReportComponent', () => {
  let component: MonthlyVolumeReportComponent;
  let fixture: ComponentFixture<MonthlyVolumeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyVolumeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyVolumeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
