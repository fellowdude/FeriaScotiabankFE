import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'];
  }

  campaign: any;
  brands: Array<any>;
  brand: any;
  isBrandPage: boolean = false;
  itemsPerPage: number = 12;
  products: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private campService: CampaignService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 1600) {
      this.itemsPerPage = 10;
    } else {
      this.itemsPerPage = 12;
    }
    this.campaign = this.resolvedData.entity;
    this.campService.campaign = this.resolvedData.entity;
    this.brands = this.resolvedData.brands ? this.resolvedData.brands.data : [];
    this.isBrandPage = this.resolvedData.isBrandPage;
    this.products = this.resolvedData.products
      ? this.resolvedData.products.data
      : [];
  }
}
