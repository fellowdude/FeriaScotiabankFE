import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() returnCondition: boolean = true;
  @Output() onClose = new EventEmitter<any>();
  @Output() onReturn = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void{
    this.onClose.emit();
  }

  returnModal(): void{
    this.onReturn.emit();
  }
}
