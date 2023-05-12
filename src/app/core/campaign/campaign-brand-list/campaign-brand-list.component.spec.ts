import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBrandListComponent } from './campaign-brand-list.component';

describe('CampaignBrandListComponent', () => {
  let component: CampaignBrandListComponent;
  let fixture: ComponentFixture<CampaignBrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignBrandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
