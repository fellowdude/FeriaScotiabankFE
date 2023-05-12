import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBrandCardComponent } from './campaign-brand-card.component';

describe('CampaignBrandCardComponent', () => {
  let component: CampaignBrandCardComponent;
  let fixture: ComponentFixture<CampaignBrandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignBrandCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignBrandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
