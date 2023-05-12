import { Component, Input, OnInit } from '@angular/core';
import {
  CategoryService,
  ICategoryBackend,
} from 'src/app/services/category.service';
@Component({
  selector: 'app-category-hero',
  templateUrl: './category-hero.component.html',
  styleUrls: ['./category-hero.component.scss'],
})
export class CategoryHeroComponent implements OnInit {
  @Input() category: ICategoryBackend;
  @Input() color = 'orange';
  @Input() title: string;
  @Input() imgUrl: string;
  constructor(public catService: CategoryService) {}
  ngOnInit(): void {}
}
