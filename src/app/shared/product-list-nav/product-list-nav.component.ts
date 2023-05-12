import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list-nav',
  templateUrl: './product-list-nav.component.html',
  styleUrls: ['./product-list-nav.component.scss'],
})
export class ProductListNavComponent implements OnInit {
  @Input() isOrderByVisible = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<number>();
  sortValue: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
