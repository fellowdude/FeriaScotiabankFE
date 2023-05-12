import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAccordionComponent } from './single-accordion.component';

describe('SingleAccordionComponent', () => {
  let component: SingleAccordionComponent;
  let fixture: ComponentFixture<SingleAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
