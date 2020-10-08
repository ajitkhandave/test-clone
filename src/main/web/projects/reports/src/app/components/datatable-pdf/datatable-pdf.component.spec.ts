import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePdfComponent } from './datatable-pdf.component';

describe('DatatablePdfComponent', () => {
  let component: DatatablePdfComponent;
  let fixture: ComponentFixture<DatatablePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
