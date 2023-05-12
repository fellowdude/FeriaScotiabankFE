import { LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Constants } from 'src/app/constants';
import { IAddressItem } from 'src/app/models/address.model';
import { IOrderBody } from 'src/app/models/order-body.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { CHECKOUT_IZIPAY_TOKEN } from '../checkout-izipay/checkout-izipay';
import { CHECKOUT_SUMMARY_TOKEN } from '../checkout-summary/checkout-summary';
import { GtagService } from 'src/app/gtag/gtag.service';
import { ICartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-checkout-receipt',
  templateUrl: './checkout-receipt.component.html',
  styleUrls: ['./checkout-receipt.component.scss'],
})
export class CheckoutReceiptComponent implements OnInit {
  invoice: boolean = false;
  ballot: boolean = true;
  pointsDivider: number = Constants.POINTS_DIVIDER;

  cartItems: ICartItem[] = [];
  invoiceForm: FormGroup;
  total: number;
  regularTotal: number;

  paymentInfo: IOrderBody;
  orderId: string;
  orderCode: string;

  selectedAddress: IAddressItem;

  departmentsList: Array<any>;
  provinceList: Array<any>;
  districtList: Array<any>;

  loading: boolean = false;
  showToggle: boolean = true;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private locationStrategy: LocationStrategy,
    private gtag: GtagService,
    @Inject(CHECKOUT_IZIPAY_TOKEN) private checkoutIzipayComponent: any,
    @Inject(CHECKOUT_SUMMARY_TOKEN) private checkoutSummaryComponent: any,
    private ubigeoService: UbigeoService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    const gtagList = this.cartItems.map((product, idx) => ({
      brand: product?.info_product?.brand.name,
      category: product?.info_product?.categories[0].name,
      id: product?.info_product?.SKU,
      list_name: 'Checkout',
      list_position: idx + 1,
      name: product?.name_product,
      price: product?.info_product?.special_price,
      quantity: product?.quantity,
    }));
    // GTAG checkoutProgress
    this.gtag.checkoutProgress({
      affiliation: 'Feria Scotiabank Web',
      checkout_step: 4,
      currency: 'PEN',
      items: gtagList,
      shipping: this.selectedAddress?.amount_delivery,
      tax: 0,
      transaction_id: this.orderCode,
      value: this.total,
    });
    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera()
        );
      },
    };

    if (isMobile.any()) this.showToggle = false;

    this.invoiceForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      ruc: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      province: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
    });

    this.ubigeoService.getDepartments().subscribe((response: Array<any>) => {
      this.departmentsList = response;
      this.ubigeoService
        .getProvincesByDepartment(this.departmentsList[0]._id)
        .subscribe((responseProvince: Array<any>) => {
          this.provinceList = responseProvince;
          this.ubigeoService
            .getDistrictsByProvince(this.provinceList[0]._id)
            .subscribe((responseDistrict: Array<any>) => {
              this.districtList = responseDistrict;
              this.onChanges();
            });
        });
    });
  }

  checkoutIzipay(): void {
    if (this.invoice) {
      if (this.invoiceForm.valid) {
        this.paymentInfo.invoice_business_name = this.invoiceForm.get(
          'name'
        ).value;
        this.paymentInfo.invoice_ruc = this.invoiceForm.get('ruc').value;
        this.paymentInfo.invoice_address = this.invoiceForm.get(
          'address'
        ).value;
        this.paymentInfo.invoice_department = this.invoiceForm.get(
          'department'
        ).value;
        this.paymentInfo.invoice_province = this.invoiceForm.get(
          'province'
        ).value;
        this.paymentInfo.invoice_district = this.invoiceForm.get(
          'district'
        ).value;
        this.paymentInfo.invoice_send = true;
      } else {
        // NOTIFY ERROR
        return;
      }
    }
    this.loading = true;
    this.paymentInfo.current_step = 1;
    this.checkoutService
      .createOrder(this.paymentInfo, this.orderId)
      .subscribe((result: any) => {
        this.loading = false;
        this.closeModal();
        this.modalRef = this.modalService.show(this.checkoutIzipayComponent, {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          ignoreBackdropClick: true,
          class: 'modal-full-height modal-right mh-100 my-0',
          containerClass: 'right modal-dialog-scrollable mh-100 my-0',
          animated: true,
          data: {
            total: this.total,
            paymentInfo: this.paymentInfo,
            orderId: result._id,
            selectedAddress: this.selectedAddress,
            orderCode: result.code,
            regularTotal: this.regularTotal,
            cartItems: this.cartItems,
          },
        });
      });
  }

  returnSummary(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutSummaryComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        total: this.total,
        paymentInfo: this.paymentInfo,
        orderId: this.orderId,
        selectedAddress: this.selectedAddress,
        regularTotal: this.regularTotal,
      },
    });
  }

  isBallot(event) {
    this.invoiceForm.reset();
    this.invoice = false;
    this.ballot = true;
    event.preventDefault();
  }

  isInvoice(event) {
    this.invoice = true;
    this.ballot = false;
    event.preventDefault();
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  onChanges() {
    this.invoiceForm.controls['department'].valueChanges.subscribe((change) => {
      this.ubigeoService
        .getProvincesByDepartment(change)
        .subscribe((response: Array<any>) => {
          this.provinceList = response;
          this.invoiceForm.controls['province'].patchValue(null);
        });
    });
    this.invoiceForm.controls['province'].valueChanges.subscribe((change) => {
      if (change)
        this.ubigeoService
          .getDistrictsByProvince(change)
          .subscribe((response: Array<any>) => {
            this.districtList = response;
            this.invoiceForm.controls['district'].patchValue(null);
          });
    });
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.returnSummary();
    });
  }

  toggleInfo(): void {
    this.showToggle = !this.showToggle;
  }
}
