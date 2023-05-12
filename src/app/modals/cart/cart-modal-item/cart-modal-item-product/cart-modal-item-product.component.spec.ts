import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalItemProductComponent } from './cart-modal-item-product.component';

describe('CartModalItemProductComponent', () => {
  let component: CartModalItemProductComponent;
  let fixture: ComponentFixture<CartModalItemProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartModalItemProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartModalItemProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
