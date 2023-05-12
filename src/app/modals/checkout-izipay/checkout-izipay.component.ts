import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IAddressItem } from 'src/app/models/address.model';
import { IOrderBody } from 'src/app/models/order-body.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CHECKOUT_ERROR_TOKEN } from '../checkout-error/checkout-error';
import { CHECKOUT_RECEIPT_TOKEN } from '../checkout-receipt/checkout-receipt';
import { CHECKOUT_SUCCESS_TOKEN } from '../checkout-success/checkout-success';
import * as CryptoJS from 'crypto-js';
import * as URLEncode from 'urlencode';
import KRGlue from '@lyracom/embedded-form-glue';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { IModalContent } from 'src/app/models/confirmation.model';
import { Constants } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { HeaderService } from 'src/app/services/internal/header.service';
import { ToastrService } from 'ngx-toastr';
import {
  CurrencyPipe,
  isPlatformBrowser,
  LocationStrategy,
} from '@angular/common';
import { ICartItem } from 'src/app/models/cart-item.model';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-checkout-izipay',
  templateUrl: './checkout-izipay.component.html',
  styleUrls: ['./checkout-izipay.component.scss'],
  providers: [CurrencyPipe],
})
export class CheckoutIzipayComponent implements OnInit {
  total: number;
  regularTotal: number;
  paymentInfo: IOrderBody;

  cartItems: ICartItem[] = [];
  orderId: string;
  orderCode: string;
  selectedAddress: IAddressItem;
  pointsDivider: number = Constants.POINTS_DIVIDER;

  today: Date = new Date();
  url: string = environment.izipayURL;
  izipayObject: IzipayBody;
  scotiaPoints: boolean = false;
  lyraActive: boolean = true;
  selectedPayType: boolean = false;
  finishedPayment: boolean = false;
  isMobile: boolean = false;
  isiOS: boolean = false;
  @ViewChild('ScotiaFrame', { static: false }) scotiaFrame: ElementRef;
  showToggle: boolean = true;
  loadedPayment: boolean = true;
  KR: any = null;
  modalContent: IModalContent = {
    title: 'Confirmación',
    icon: 'exclamation',
    text:
      'Si el proceso de pago ya culminó proceda a cerrar la ventana. ¿Desea cerrar la ventana?',
    type: 'warning',
  };
  modalRefConfirm: MDBModalRef;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    @Inject(PLATFORM_ID) private platformId: any,
    private locationStrategy: LocationStrategy,
    private cp: CurrencyPipe,
    private headerInternalService: HeaderService,
    private toastrService: ToastrService,
    @Inject(CHECKOUT_SUCCESS_TOKEN) private checkoutSuccessComponent: any,
    @Inject(CHECKOUT_ERROR_TOKEN) private checkoutErrorComponent: any,
    @Inject(CHECKOUT_RECEIPT_TOKEN) private checkoutReceiptComponent: any,
    private checkoutService: CheckoutService,
    private renderer: Renderer2,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    // GTAG checkoutProgress
    this.gtag.checkoutProgress({
      affiliation: 'Feria Scotiabank Web',
      checkout_step: 5,
      currency: 'PEN',
      items: this.gtagItems(),
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
    //if(isMobile.any()) this.isMobile = true;
    this.isiOS = false;
    this.loadedPayment = true;
    this.checkoutService
      .generateIzipayForm(this.orderId)
      .subscribe((result: IzipayBody) => {
        this.izipayObject = result;
        this.izipayObject.auth = URLEncode(this.izipayObject.auth);
        setTimeout(() => {
          this.loadedPayment = false;
          this.isScotiaPoints(null);
        }, 500);
      });
  }

  ngAfterViewInit() {
    var frame;
    if (isPlatformBrowser(this.platformId)) {
      frame = document.getElementById('demoFrame');
    }

    if (!frame) {
      //Crear Iframe
      var iframe: HTMLIFrameElement = this.renderer.createElement('iframe');
      iframe.setAttribute('id', 'demoFrame');
      iframe.setAttribute('name', 'demoFrame');
      iframe.setAttribute('src', this.url);
      iframe.setAttribute('height', '650px');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute(
        'style',
        'border: 0.5em solid white; width:100%; overflow-y: auto;'
      );
      iframe.setAttribute('scrolling', 'no');
      //iframe.setAttribute('allowTransparency', 'yes');
      this.renderer.appendChild(this.scotiaFrame.nativeElement, iframe);
    }
    //frame && (frame.style.display = 'block');
  }

  scotiapointsForm(): void {
    //Enviar parametros al iframe con Metodo POST
    if (isPlatformBrowser(this.platformId)) {
      (document.getElementById('form_iframe') as HTMLFormElement).submit();
    }
  }

  lyraForm(): void {
    const publicKey = environment.lyraPublicKey;
    const url = environment.lyraURL;
    if (publicKey) {
      this.checkoutService.generateLyraForm().subscribe((result) => {
        //console.log(result)
        KRGlue.loadLibrary(url, publicKey)
          .then(({ KR }) =>
            KR.setFormConfig({
              formToken: result.answer.formToken,
              'kr-language': 'es-ES',
            })
          )
          .then(({ KR }) =>
            KR.button.setLabel(
              'Pagar ' + this.cp.transform(this.total, 'S/', 'symbol', '1.2-2')
            )
          )
          .then(({ KR }) => KR.addForm('#myPaymentForm'))
          .then(({ KR, result }) => {
            //console.log(result);
            KR.showForm(result.formId);
            this.KR = KR;
            KR.onError((event) => {
              //console.log(event)
              var code = event.errorCode;
              var message = event.errorMessage;
              this.toastrService.warning(message, code);
            });
            KR.onSubmit((event) => {
              if (event.clientAnswer.transactions.length > 0) {
                this.checkoutService
                  .confirmLyraForm(
                    event.clientAnswer.transactions[0].uuid,
                    this.orderCode
                  )
                  .subscribe(
                    (result) => {
                      this.selectedPayType = false;
                      this.checkoutSuccess();
                    },
                    (error) => {
                      console.log(error);
                      this.checkoutError();
                      KR.removeForms();
                    }
                  );
              } else {
                this.checkoutError();
                KR.removeForms();
              }
            });
          });
      });
    } else {
      console.log('ERROR');
    }
  }

  isScotiaPoints(event): void {
    if (!this.isMobile) {
      this.scotiaPoints = true;
      this.lyraActive = false;
      this.selectedPayType = true;
      this.scotiapointsForm();
    }
    event?.preventDefault();
  }

  isLyra(event): void {
    this.lyraActive = true;
    this.scotiaPoints = false;
    event.preventDefault();
  }

  selectPayType(e): void {
    e.preventDefault(e);
    this.selectedPayType = true;
    if (this.scotiaPoints) {
      this.scotiapointsForm();
    }
    if (this.lyraActive) {
      this.lyraForm();
    }
  }

  gtagItems(): ICartItem[] {
    return this.cartItems.map((product, idx) => ({
      brand: product?.info_product?.brand.name,
      category: product?.info_product?.categories[0].name,
      id: product?.info_product?.SKU,
      list_name: 'Checkout',
      list_position: idx + 1,
      name: product?.name_product,
      price: product?.info_product?.special_price,
      quantity: product?.quantity,
    }));
  }

  checkoutSuccess(): void {
    // GTAG purchase
    console.log({
      affiliation: 'Feria Scotiabank Web',
      currency: 'PEN',
      items: this.gtagItems(),
      shipping: this.selectedAddress?.amount_delivery,
      transaction_id: this.orderCode,
      value: this.total,
    });

    this.finishedPayment = true;
    this.headerInternalService.emitData({ type: 'UPDATE_CART' });
    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutSuccessComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        orderNumber: this.orderCode,
      },
    });
  }

  checkoutError(): void {
    this.finishedPayment = true;
    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutErrorComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  returnReciept(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutReceiptComponent, {
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
        selectedAddress: this.selectedAddress,
        paymentInfo: this.paymentInfo,
      },
    });
  }

  closeModal(): void {
    if (!this.finishedPayment && this.selectedPayType) {
      this.modalRefConfirm = this.modalService.show(ConfirmationComponent, {
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
      });
      this.modalRefConfirm.content.action.subscribe((result: any) => {
        if (result) {
          this.headerInternalService.emitData({ type: 'UPDATE_CART' });
          this.modalRefConfirm && this.modalRefConfirm.hide();
          this.modalRef && this.modalRef.hide();
          this.KR && this.KR.removeForms();
        }
      });
    } else {
      this.modalRef && this.modalRef.hide();
    }
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.returnReciept();
    });
  }

  iOS(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return (
        [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod',
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
      );
    }
  }

  toggleInfo(): void {
    this.showToggle = !this.showToggle;
  }
}

export interface IzipayBody {
  commerceNumber: string;
  orderNumber: string;
  payAmount: string;
  payCurrency: 'PEN';
  payDate: string;
  payHour: string;
  payStamp: string;
  clientId: string;
  countryCode: 'PER';
  processType: 'AT';
  auth: string;
  colorWindow: string;
  fontType: 'Arial' | 'Verdana' | 'Times';
  cancelButton: 'IN' | 'OUT';
  email_user: string;
  idGA: string;
}
