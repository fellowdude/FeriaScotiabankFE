import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListNavComponent } from './product-list-nav.component';

describe('ProductListNavComponent', () => {
  let component: ProductListNavComponent;
  let fixture: ComponentFixture<ProductListNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
