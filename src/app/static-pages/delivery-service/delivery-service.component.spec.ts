import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryServiceComponent } from './delivery-service.component';

describe('DeliveryServiceComponent', () => {
  let component: DeliveryServiceComponent;
  let fixture: ComponentFixture<DeliveryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
