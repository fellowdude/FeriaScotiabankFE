import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaymentListComponent } from './home-payment-list.component';

describe('HomePaymentListComponent', () => {
  let component: HomePaymentListComponent;
  let fixture: ComponentFixture<HomePaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
