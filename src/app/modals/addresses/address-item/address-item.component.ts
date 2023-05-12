import { Component, Inject, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { IAddressItem } from 'src/app/models/address.model';
import { ADDRESS_FORM_TOKEN } from '../../address-form/address-form';
import { AddressFormComponent } from '../../address-form/address-form.component';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss']
})
export class AddressItemComponent implements OnInit {
  @Input() address: IAddressItem;
  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, @Inject(ADDRESS_FORM_TOKEN) private addressFormComponent: any) { }

  ngOnInit(): void {
  }

  addressDetail(): void {
    this.modalRef && this.modalRef.hide();
    this.modalRef = this.modalService.show(this.addressFormComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
      data: {
        address: this.address
      }
    });
  }
}
