import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { ICategoryGroup } from '../models/category-group.model';
import { categoryGroups } from '../mockups/category-group.mockup';

@Injectable({
  providedIn: 'root',
})
export class CategoryGroupService {
  constructor(private api: ApiService) {}

  getCategoryGroups(): Observable<ICategoryGroup[]> {
    // return this.api.get('category-group/list');
    return of(categoryGroups);
  }
}
