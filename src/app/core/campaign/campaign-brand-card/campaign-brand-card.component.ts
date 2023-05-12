import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign-brand-card',
  templateUrl: './campaign-brand-card.component.html',
  styleUrls: ['./campaign-brand-card.component.scss']
})
export class CampaignBrandCardComponent implements OnInit {
  @Input() brand: any;

  constructor(public campService: CampaignService, public router: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
