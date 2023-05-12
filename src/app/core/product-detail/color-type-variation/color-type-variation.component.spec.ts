import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTypeVariationComponent } from './color-type-variation.component';

describe('ColorTypeVariationComponent', () => {
  let component: ColorTypeVariationComponent;
  let fixture: ComponentFixture<ColorTypeVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorTypeVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTypeVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
