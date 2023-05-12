import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddressItemComponent } from './checkout-address-item.component';

describe('CheckoutAddressItemComponent', () => {
  let component: CheckoutAddressItemComponent;
  let fixture: ComponentFixture<CheckoutAddressItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutAddressItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
