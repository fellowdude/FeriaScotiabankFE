import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrandListComponent } from './category-brand-list.component';

describe('CategoryBrandListComponent', () => {
  let component: CategoryBrandListComponent;
  let fixture: ComponentFixture<CategoryBrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBrandListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
