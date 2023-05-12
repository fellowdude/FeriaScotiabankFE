import { Component, Inject, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IAddressItem } from 'src/app/models/address.model';
import { ProfileComponent } from '../profile/profile.component';
import { addressesOrder } from 'src/app/mockups/address.mockup';
import { ADDRESS_FORM_TOKEN } from '../address-form/address-form';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  @Input() addresses: Array<IAddressItem> = [];
  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, @Inject(ADDRESS_FORM_TOKEN) private addressFormComponent: any,
    private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.userAddressList().subscribe(
      (result: Array<any>)=>{
        this.addresses = result;
      }
    )
  }

  addAddress(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.addressFormComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
      data: {
        address: null,
      }
    })
  }

  closeModal(): void{
    this.modalRef && this.modalRef.hide();
  }

  returnProfile(): void{
    this.closeModal();
    this.modalRef = this.modalService.show( ProfileComponent , {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
    })
  }

}
