import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypeVariationComponent } from './text-type-variation.component';

describe('TextTypeVariationComponent', () => {
  let component: TextTypeVariationComponent;
  let fixture: ComponentFixture<TextTypeVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTypeVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTypeVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
