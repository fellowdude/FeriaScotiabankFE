import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: string = 'primary';
  @Input() textSize: number = 1;
  @Input() hoverable: boolean = false;
  @Input() color: string = 'primary';
  @Input() textColor: string;
  @Input() size: number = 100;
  @Input() label = 'Button';
  @Input() additionalClasses: string;
  @Input() prefixIcon: string;
  @Input() sufixIcon: string;
  @Input() rounded: boolean = false;
  @Input() bold: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();
  @Output() onTouchStart = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  public get classes(): string {
    const hoverable = this.hoverable ? 'hoverable' : '';
    const rounded = this.rounded ? 'rounded' : '';
    const text = this.textColor ? this.textColor+'-text' : '';
    return [
      'btn z-depth-0',
      `font-size-${this.textSize}`,
      `btn-${this.type}`,
      `w-${this.size}`,
      this.additionalClasses,
      this.color,
      hoverable,
      rounded,
      text
    ].join(' ');
  }
}
