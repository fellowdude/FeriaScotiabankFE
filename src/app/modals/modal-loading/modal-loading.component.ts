import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.scss']
})
export class ModalLoadingComponent implements OnInit {
  @Input() color = 'red';
  constructor() {}

  ngOnInit(): void {}
}
