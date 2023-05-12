import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrandCardComponent } from './category-brand-card.component';

describe('CategoryBrandCardComponent', () => {
  let component: CategoryBrandCardComponent;
  let fixture: ComponentFixture<CategoryBrandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBrandCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBrandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
