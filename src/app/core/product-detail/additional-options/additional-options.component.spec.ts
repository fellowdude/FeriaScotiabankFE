import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOptionsComponent } from './additional-options.component';

describe('AdditionalOptionsComponent', () => {
  let component: AdditionalOptionsComponent;
  let fixture: ComponentFixture<AdditionalOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
