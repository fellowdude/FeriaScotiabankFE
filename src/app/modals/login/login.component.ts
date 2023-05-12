import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { KJUR } from 'jsrsasign';

import { RECOVER_PASSWORD_TOKEN } from '../recover-password/recover-password';
import { REGISTER_TOKEN } from '../register/register';

import { UserAccessService } from 'src/app/services/user-access.service';
import { Constants } from 'src/app/constants';
import { HeaderService } from 'src/app/services/internal/header.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { environment } from '../../../environments/environment';
//import * as CryptoJS from 'crypto-js';
import { Crypt } from 'hybrid-crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cartProduct: any;

  loadingLogin: boolean = false;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    @Inject(RECOVER_PASSWORD_TOKEN) private recoverPasswordComponent: any,
    @Inject(REGISTER_TOKEN) private registerComponent: any,
    private userAccessService: UserAccessService,
    private headerInternalService: HeaderService,
    private cartService: CartService,
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      keepLogged: new FormControl(true),
    });

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('user')) {
        this.loginForm.get('email').setValue(localStorage.getItem('user'));
      }
    }
  }
  initializacionCrypt(dataEncript) {
    const publicKey = environment.PUBLIC_KEY_LOGIN;

    // Basic initialization
    /*  var crypt = new Crypt();
     var rsa = new RSA();
  */
    /*  // Increase amount of entropy
     var entropy = 'sdf sfddf¿+}¿344$%5656535%&67¿éefdGYTRU5423, 334344.4453423';
     var crypt = new Crypt({ entropy: entropy });
     var rsa = new RSA({ entropy: entropy });
 
     // Select default message digest
     var crypt = new Crypt({ md: 'sha512' }); */

    // Select AES or RSA standard
    var crypt = new Crypt({
      // Default AES standard is AES-CBC. Options are:
      // AES-ECB, AES-CBC, AES-CFB, AES-OFB, AES-CTR, AES-GCM, 3DES-ECB, 3DES-CBC, DES-ECB, DES-CBC
      aesStandard: 'AES-CBC',
      // Default RSA standard is RSA-OAEP. Options are:
      // RSA-OAEP, RSAES-PKCS1-V1_5
      rsaStandard: 'RSA-OAEP',
    });

    // Alternate AES keysize (some AES algorithms requires specific key size)
    /*  var crypt = new Crypt({
       aesKeySize: 192, // Defaults to 256
     }); */

    var message = dataEncript;

    // Encryption with one public RSA key
    var encrypted = crypt.encrypt(publicKey, message);
    return encrypted
  }

  logInUser(): void {
    if (this.loginForm.valid) {
      this.loadingLogin = true;
      const oHeader = { alg: 'RS256', typ: 'JWT' };
      // Payload
      const oPayload: any = {};

      oPayload.password = this.initializacionCrypt(this.loginForm.value.password)
      oPayload.user = this.initializacionCrypt((this.loginForm.value.email as String).toLowerCase())
      oPayload.maxSession = this.initializacionCrypt((true))
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sJWT = KJUR.jws.JWS.sign(
        'RS256',
        sHeader,
        sPayload,
        Constants.FRONT_KEY
      );

      this.userAccessService.logIn({ jwt: sJWT }).subscribe(
        (result) => {
          if (isPlatformBrowser(this.platformId)) {
            if (this.loginForm.get('keepLogged').value) {
              localStorage.setItem(
                'user',
                (this.loginForm.value.email as String).toLowerCase()
              );
            } else {
              localStorage.removeItem('user');
            }
            localStorage.setItem('jwt', result.jwt);
            this.headerInternalService.emitData({ type: 'LOGIN_SUCCESS' });
            this.closeModal();
            this.loadingLogin = false;
            this.toastrService.success(
              Messages.successLogIn,
              Messages.logInTitle
            );
            if (this.cartProduct) {
              this.cartService
                .createCartItem(this.cartProduct)
                .subscribe(() => {
                  // success
                  this.toastrService.success(
                    Messages.successAddCart,
                    Messages.successTitle
                  );
                  this.headerInternalService.emitData({ type: 'UPDATE_CART' });
                });
            }
          }
        },
        (error) => {
          this.loadingLogin = false;
        }
      );
    } else {
      this.toastrService.warning(
        Messages.errorFormLogIn,
        Messages.warningTitle
      );
    }
  }

  rememberPassword(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.recoverPasswordComponent, {
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

  registerUser(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.registerComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        cartProduct: this.cartProduct,
      },
    });
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }
}
