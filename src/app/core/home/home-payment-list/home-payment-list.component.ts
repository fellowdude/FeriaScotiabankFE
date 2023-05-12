import { Component, Input, OnInit } from '@angular/core';
import { ISimpleCard } from 'src/app/models/static-pages.model';
@Component({
  selector: 'app-home-payment-list',
  templateUrl: './home-payment-list.component.html',
  styleUrls: ['./home-payment-list.component.scss'],
})
export class HomePaymentListComponent implements OnInit {
  @Input() payments: ISimpleCard[];
  cardColors = ['orange', 'purple', 'pink'];
  constructor() {}

  ngOnInit(): void {}
}
