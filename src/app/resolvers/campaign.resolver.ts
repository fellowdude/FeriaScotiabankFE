import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignService } from '../services/campaign.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignResolver implements Resolve<any> {
  constructor(private campService: CampaignService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const campUrl = route.paramMap.get('friendlyUrl');
    console.log(campUrl);

    return zip(this.campService.getCampaignBySlug(campUrl)).pipe(
      map(([campaignInfo]) => {
        this.campService.urlAttachment = campaignInfo.url_attachment;
        campaignInfo.isBrandPage = false;
        return campaignInfo;
      })
    );
  }
}
