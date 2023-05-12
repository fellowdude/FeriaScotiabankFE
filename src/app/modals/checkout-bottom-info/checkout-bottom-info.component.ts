import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-checkout-bottom-info',
  templateUrl: './checkout-bottom-info.component.html',
  styleUrls: ['./checkout-bottom-info.component.scss']
})
export class CheckoutBottomInfoComponent implements OnInit {

  pointsDivider: number = Constants.POINTS_DIVIDER;

  constructor() { }

  ngOnInit(): void {
  }

}
