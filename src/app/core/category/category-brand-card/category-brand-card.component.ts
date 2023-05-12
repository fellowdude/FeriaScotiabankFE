import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CategoryService,
  IBrandBackend,
} from 'src/app/services/category.service';

@Component({
  selector: 'app-category-brand-card',
  templateUrl: './category-brand-card.component.html',
  styleUrls: ['./category-brand-card.component.scss'],
})
export class CategoryBrandCardComponent implements OnInit {
  @Input() brand: IBrandBackend;
  constructor(public catService: CategoryService, public router: ActivatedRoute) {}

  ngOnInit(): void {}
}
