import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroListComponent } from './home-hero-list.component';

describe('HomeHeroListComponent', () => {
  let component: HomeHeroListComponent;
  let fixture: ComponentFixture<HomeHeroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
