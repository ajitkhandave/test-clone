import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopActiveProductsComponent } from './pop-active-products.component';

describe('PopActiveProductsComponent', () => {
  let component: PopActiveProductsComponent;
  let fixture: ComponentFixture<PopActiveProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopActiveProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopActiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
