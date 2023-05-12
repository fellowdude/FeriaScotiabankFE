import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home-pop-up',
  templateUrl: './home-pop-up.component.html',
  styleUrls: ['./home-pop-up.component.scss']
})
export class HomePopUpComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
