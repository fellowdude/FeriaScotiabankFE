import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutIzipayComponent } from './checkout-izipay.component';

describe('CheckoutIzipayComponent', () => {
  let component: CheckoutIzipayComponent;
  let fixture: ComponentFixture<CheckoutIzipayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutIzipayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutIzipayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
