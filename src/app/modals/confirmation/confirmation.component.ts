import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { IModalContent } from 'src/app/models/confirmation.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  modalContent: IModalContent;
  action: Subject<any> = new Subject();

  constructor(public modalRef: MDBModalRef) {}

  agree(){
    this.modalRef.hide();
    this.action.next(true)
  }

  cancel(){
    this.modalRef.hide();
    this.action.next(false)
  }

}
