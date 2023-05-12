import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IAddressItem } from 'src/app/models/address.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { CONFIRMATION_TOKEN } from '../confirmation/confirmation';
import { IModalContent } from 'src/app/models/confirmation.model';
import { CHECKOUT_ADDRESS_TOKEN } from '../checkout-address/checkout-address';
import { ADDRESSES_TOKEN } from '../addresses/addresses';
import { IOrderBody } from 'src/app/models/order-body.model';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  checkout: boolean = false;
  loadingCreate:boolean = false;
  loadingUpdate: boolean = false;
  loadingDelete:boolean = false;
  address: IAddressItem;
  addressForm: FormGroup;
  subtotal?: number;
  regularSubtotal?: number;
  paymentInfo?: IOrderBody;

  typeAddressList: Array<any>;
  departmentsList: Array<any>;
  provinceList: Array<any>;
  districtList: Array<any>;

  modalContent: IModalContent = {
    title: 'Confirmación',
    icon: 'exclamation',
    text: '¿Desea eliminar esta dirección?',
    type: 'warning',
  };

  constructor(
    @Inject(ADDRESSES_TOKEN) private addressesComponent: any,
    @Inject(CONFIRMATION_TOKEN) private confirmationComponent: any,
    @Inject(CHECKOUT_ADDRESS_TOKEN) private checkoutAddressComponent: any,
    public modalRef: MDBModalRef,
    public modalRefConfirmation: MDBModalRef,
    private modalService: MDBModalService,
    private ubigeoService: UbigeoService,
    private userProfileService: UserProfileService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      name: new FormControl(null),
      type_address: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      department: new FormControl(null, [Validators.required]),
      province: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      reference: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      cellphone: new FormControl(null, [Validators.required, Validators.maxLength(9)]),
    });
    if (this.address) {
      this.addressForm.addControl(
        '_id',
        new FormControl(null, [Validators.required])
      );
      this.addressForm.patchValue(this.address);
    }
    this.userProfileService
      .getTypeAddress()
      .subscribe((response: Array<any>) => {
        this.typeAddressList = response;
        this.address && this.typeAddressList.push(this.address.type_address);
        this.address &&
          this.addressForm.controls['type_address'].patchValue(
            this.address.type_address._id
          );
        this.ubigeoService
          .getDepartments()
          .subscribe((response: Array<any>) => {
            this.departmentsList = response;
            this.address &&
              this.addressForm.controls['department'].patchValue(
                this.address.department._id
              );
            var searchDepartment = this.address
              ? this.address.department._id
              : this.departmentsList[0]._id;

            this.ubigeoService
              .getProvincesByDepartment(searchDepartment)
              .subscribe((responseProvince: Array<any>) => {
                this.provinceList = responseProvince;
                this.address &&
                  this.addressForm.controls['province'].patchValue(
                    this.address.province._id
                  );
                var searchProvince = this.address
                  ? this.address.province._id
                  : this.provinceList[0]._id;

                this.ubigeoService
                  .getDistrictsByProvince(searchProvince)
                  .subscribe((responseDistrict: Array<any>) => {
                    this.districtList = responseDistrict;
                    this.address &&
                      this.addressForm.controls['district'].patchValue(
                        this.address.district._id
                      );
                    this.onChanges();
                  });
              });
          });
      });
  }

  createAddress(): void {
    if (this.addressForm.valid) {
      this.loadingCreate = true;
      this.addressForm.get('name').setValue(
        this.typeAddressList.find((e) => {
          return e._id === this.addressForm.get('type_address').value;
        }).value
      );
      this.userProfileService
        .createAddress(this.addressForm.value)
        .subscribe((result) => {
          this.userAddresses();
        });
    } else {
      this.toastrService.warning(
        Messages.errorCreateAddress,
        Messages.warningTitle
      );
    }
  }

  updateAddress(): void {
    if (this.addressForm.valid) {
      this.addressForm.get('name').setValue(
        this.typeAddressList.find((e) => {
          return e._id === this.addressForm.get('type_address').value;
        }).value
      );
      this.loadingUpdate = true;
      this.userProfileService
        .updateAddress(this.addressForm.value)
        .subscribe((result) => {
          this.userAddresses();
        });
    } else {
      this.toastrService.warning(
        Messages.errorUpdateAddress,
        Messages.warningTitle
      );
    }
  }

  deleteAddress(): void {
    this.modalRefConfirmation = this.modalService.show(
      this.confirmationComponent,
      {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        animated: true,
        class:
          'modal-sm modal-dialog modal-notify modal-' + this.modalContent.type,
        data: {
          modalContent: this.modalContent,
        },
      }
    );
    this.modalRefConfirmation.content.action.subscribe((result: any) => {
      if (result) {
        this.loadingDelete= true,
        this.userProfileService
          .deleteAddress(this.address._id)
          .subscribe((result) => {
            this.userAddresses();
          });
      }
    });
  }

  userAddresses(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(
      this.checkout ? this.checkoutAddressComponent : this.addressesComponent,
      {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-full-height modal-right mh-100 my-0',
        containerClass: 'right modal-dialog-scrollable mh-100 my-0',
        animated: true,
        data: {
          subtotal: this.subtotal,
          regularSubtotal: this.regularSubtotal,
          paymentInfo: this.paymentInfo,
        },
      }
    );
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  onChanges() {
    this.addressForm.controls['department'].valueChanges.subscribe((change) => {
      this.ubigeoService
        .getProvincesByDepartment(change)
        .subscribe((response: Array<any>) => {
          this.provinceList = response;
          this.addressForm.controls['province'].patchValue(
            this.provinceList[0]._id
          );
        });
    });
    this.addressForm.controls['province'].valueChanges.subscribe((change) => {
      this.ubigeoService
        .getDistrictsByProvince(change)
        .subscribe((response: Array<any>) => {
          this.districtList = response;
          this.addressForm.controls['district'].patchValue(
            this.districtList[0]._id
          );
        });
    });
  }
}
