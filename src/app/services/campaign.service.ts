import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  urlAttachment: string = '';
  campaign: any;
  constructor(private apiService: ApiService) {}

  getCampaignBySlug(
    slug: string,
    page: number = 1,
    quantity: number = 12,
    filter: any = null
  ): Observable<any> {
    let params: any = { page, quantity };
    if (filter) params.filter = filter;
    const query = this.apiService.createHttpParams(params);
    return this.apiService.get(`campaign/v2/api/list/${slug}`, query);
  }
}
