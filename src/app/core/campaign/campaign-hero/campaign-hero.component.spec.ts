import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignHeroComponent } from './campaign-hero.component';

describe('CampaignHeroComponent', () => {
  let component: CampaignHeroComponent;
  let fixture: ComponentFixture<CampaignHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
