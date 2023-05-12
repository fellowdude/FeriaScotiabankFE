import { Component, Input, OnInit } from '@angular/core';
import { ISimpleCard } from 'src/app/models/static-pages.model';

@Component({
  selector: 'app-home-payment-card',
  templateUrl: './home-payment-card.component.html',
  styleUrls: ['./home-payment-card.component.scss'],
})
export class HomePaymentCardComponent implements OnInit {
  @Input() color: string;
  @Input() payment: ISimpleCard;
  @Input() position: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
