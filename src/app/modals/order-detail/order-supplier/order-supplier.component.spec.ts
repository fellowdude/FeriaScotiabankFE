import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupplierComponent } from './order-supplier.component';

describe('OrderSupplierComponent', () => {
  let component: OrderSupplierComponent;
  let fixture: ComponentFixture<OrderSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
