import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupplierItemComponent } from './order-supplier-item.component';

describe('OrderSupplierItemComponent', () => {
  let component: OrderSupplierItemComponent;
  let fixture: ComponentFixture<OrderSupplierItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupplierItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupplierItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
