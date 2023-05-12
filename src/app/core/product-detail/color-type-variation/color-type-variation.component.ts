import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-type-variation',
  templateUrl: './color-type-variation.component.html',
  styleUrls: ['./color-type-variation.component.scss']
})
export class ColorTypeVariationComponent implements OnInit {

  selectedOption: string = null;
  @Input() title: string;
  @Input() options: Array<any>;
  @Output() onChoose = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
    this.options.forEach(e => {
      e.selected = false;
    });
  }

  selectOne(position: number): void {
    this.options.forEach(e => {
      e.selected = false;
    });
    this.options[position].selected = true;
    this.selectedOption = this.options[position].value;
    this.onSelectOption();
  }

  onSelectOption(): void {
    this.onChoose.emit({
      option: this.selectedOption,
      name: this.title
    })
  }

}
