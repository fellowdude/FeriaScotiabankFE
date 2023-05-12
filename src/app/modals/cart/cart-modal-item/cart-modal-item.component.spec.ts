import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalItemComponent } from './cart-modal-item.component';

describe('CartModalItemComponent', () => {
  let component: CartModalItemComponent;
  let fixture: ComponentFixture<CartModalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartModalItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
