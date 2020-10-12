import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusReportComponent } from './order-status-report.component';

describe('OrderStatusReportComponent', () => {
  let component: OrderStatusReportComponent;
  let fixture: ComponentFixture<OrderStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
