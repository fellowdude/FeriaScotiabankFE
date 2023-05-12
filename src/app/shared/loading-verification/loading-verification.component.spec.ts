import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingVerificationComponent } from './loading-verification.component';

describe('LoadingVerificationComponent', () => {
  let component: LoadingVerificationComponent;
  let fixture: ComponentFixture<LoadingVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
