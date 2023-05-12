import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  @Input() text: string;
  @Input() image: string;
  @Input() url: string;
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;
  @Input() textSize?:number;

  constructor() { }

  ngOnInit(): void {
  }

}
