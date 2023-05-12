import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBottomInfoComponent } from './checkout-bottom-info.component';

describe('CheckoutBottomInfoComponent', () => {
  let component: CheckoutBottomInfoComponent;
  let fixture: ComponentFixture<CheckoutBottomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutBottomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBottomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
