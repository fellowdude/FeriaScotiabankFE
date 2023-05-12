import { Component, OnInit, Input } from '@angular/core';
import {
  CategoryService,
  ICategoryBackend,
} from 'src/app/services/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: ICategoryBackend;
  @Input() color: string = 'pink';

  constructor(public catService: CategoryService) {}

  ngOnInit(): void {}

  get classes() {
    return [this.color].join(' ');
  }
}
