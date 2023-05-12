import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input() color: string = 'red';
  @Input() fontSize: number = 14;
  @Input() size: number = 20;
  @Input() label: string;
  @Input() checked: boolean = false;
  @Input() centerColor: string = 'white';
  @Input() centerWidth: number = 3;
  @Input() noClick: boolean = false;
  @Input() centered: boolean = false;
  @Output() onClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  choose(event): void{
    if(!this.noClick){
      this.checked = !this.checked;
      this.onClick.emit(this.checked);
    }
  }
}
