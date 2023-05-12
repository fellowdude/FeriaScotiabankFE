import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent implements OnInit {

  @Input() title: string;
  @Input() url: string;
  @Input() imgUrl: string;
  @Input() color: string = "orange";

  constructor() { }

  ngOnInit(): void {
  }

}
