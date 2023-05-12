import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign-hero',
  templateUrl: './campaign-hero.component.html',
  styleUrls: ['./campaign-hero.component.scss']
})
export class CampaignHeroComponent implements OnInit {
  @Input() campaign: any;
  @Input() color = 'orange';
  @Input() title: string;
  @Input() imgUrl: string;

  constructor(public campService: CampaignService) { }

  ngOnInit(): void {
  }

}
