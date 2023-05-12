import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaymentCardComponent } from './home-payment-card.component';

describe('HomePaymentCardComponent', () => {
  let component: HomePaymentCardComponent;
  let fixture: ComponentFixture<HomePaymentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePaymentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
