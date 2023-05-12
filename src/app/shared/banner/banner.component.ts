import { Component, OnInit, Input } from '@angular/core';
import { IComplexCard } from 'src/app/models/static-pages.model';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() color = 'purple';
  @Input() banner: IComplexCard;
  @Input() withButton: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
