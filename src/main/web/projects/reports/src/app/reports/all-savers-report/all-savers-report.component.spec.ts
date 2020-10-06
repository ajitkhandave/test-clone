import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSaversReportComponent } from './all-savers-report.component';

describe('AllSaversReportComponent', () => {
  let component: AllSaversReportComponent;
  let fixture: ComponentFixture<AllSaversReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSaversReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSaversReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
