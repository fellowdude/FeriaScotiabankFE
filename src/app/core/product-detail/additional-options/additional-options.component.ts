import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.scss']
})
export class AdditionalOptionsComponent implements OnInit {

  @Input() active: boolean = false;
  @Input() type: string = null;
  @Input() text: string = null;
  @Input() price: number = 0;
  @Output() onClick = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectAdditional(): void {
    this.active = !this.active;
    this.onClick.emit({
      type: this.type,
      active: this.active
    })
  }

}
