import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-text-type-variation',
  templateUrl: './text-type-variation.component.html',
  styleUrls: ['./text-type-variation.component.scss']
})
export class TextTypeVariationComponent implements OnInit {
  selectedOption: string = null;
  @Input() title: string;
  @Input() options: Array<any>;
  @Output() onChoose = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

  onSelectOption(): void {
    this.onChoose.emit({
      option: this.selectedOption,
      name: this.title
    })
  }

}
