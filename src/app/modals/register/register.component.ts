import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserAccessService } from 'src/app/services/user-access.service';
import { LOGIN_TOKEN } from '../login/login';
import { LdvService } from 'src/app/services/ldv.service';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { max } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { KJUR } from 'jsrsasign';
import { Crypt } from 'hybrid-crypto-js';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from 'src/app/services/internal/header.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  typeDocList: Array<any>;
  today: Date = new Date();
  cartProduct: any;
  loadingRegister: boolean = false;

  maxDate: string = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  ).toISOString().split('T')[0];

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    @Inject(LOGIN_TOKEN) private loginComponent: any,
    private userAccessService: UserAccessService,
    private ldvService: LdvService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private headerInternalService: HeaderService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      last_name_father: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      last_name_mother: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      type_document: new FormControl(null, [Validators.required]),
      number_document: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      birth_date: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
      check_terms: new FormControl(false, [Validators.required, Validators.requiredTrue]),
      age: new FormControl(false, [Validators.required, Validators.requiredTrue]),
      keepLogged: new FormControl(true)
    });
    this.ldvService
      .getLdvDetail('TYPE-DOCUMENT-CUSTOMER')
      .subscribe((result: Array<any>) => {
        this.typeDocList = result;
      });
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  registerUser(): void {
    if (
      this.registerForm.valid &&
      this.minimumAge() &&
      this.registerForm.controls['password'].value ===
        this.registerForm.controls['confirm_password'].value
    ) {
      this.loadingRegister = true;
      this.registerForm.get('email').setValue((this.registerForm.get('email').value as String).toLowerCase());
      const toSend = {
        ...this.registerForm.value,
        username: this.registerForm.controls['email'].value,
      };

      const user = this.registerForm.controls['email'].value;
      const pass = this.registerForm.controls['password'].value;

      const oHeader = { alg: 'RS256', typ: 'JWT' };
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(toSend);
      const sJWT = KJUR.jws.JWS.sign(
        'RS256',
        sHeader,
        sPayload,
        Constants.FRONT_KEY
      );
      this.userAccessService.registerUser({ jwt: sJWT }).subscribe((result) => {
        this.registerForm.reset();
        //this.logInUser();
        this.toastrService.success(
          Messages.successRegister,
          Messages.registerTitle
        );
        this.loadingRegister = false;
        this.logInUser(user,pass);
      }, (error)=>{
        this.loadingRegister = false;
      });
    } else {
      if(this.registerForm.valid){
        if(this.registerForm.controls['password'].value !== this.registerForm.controls['confirm_password'].value)
          this.toastrService.warning(Messages.errorFormPassword, Messages.warningTitle);
        else
          this.toastrService.warning(Messages.errorFormAge, Messages.warningTitle);
      }else{
        this.toastrService.warning(Messages.errorFormRegister, Messages.warningTitle);
      }

    }
  }
  initializacionCrypt(dataEncript) {
    const publicKey = environment.PUBLIC_KEY_LOGIN;
    let crypt = new Crypt({
      aesStandard: 'AES-CBC',
      rsaStandard: 'RSA-OAEP',
    });
    let message = dataEncript;
    let encrypted = crypt.encrypt(publicKey, message);
    return encrypted
  }
  logInUser(user, pass): void {
      const oHeader = { alg: 'RS256', typ: 'JWT' };
      // Payload
      const oPayload: any = {};
      oPayload.password = this.initializacionCrypt(pass)
      oPayload.user = this.initializacionCrypt(user)
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
            if (this.registerForm.get('keepLogged').value) {
              localStorage.setItem(
                'user',
                user
              );
            } else {
              localStorage.removeItem('user');
            }
            localStorage.setItem('jwt', result.jwt);
            this.headerInternalService.emitData({ type: 'LOGIN_SUCCESS' });
            this.closeModal();
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
        }
      );

  }
  
  minimumAge(): boolean {
    let splitDate = this.registerForm.get('birth_date').value.split('/')
    let date = null;
    if(typeof splitDate === 'object' && splitDate.length > 0){
      if(Number(splitDate[0])>12){
        date = new Date(splitDate[1]+'/'+splitDate[0]+'/'+splitDate[2])
        this.registerForm.get('birth_date').setValue(splitDate[1]+'/'+splitDate[0]+'/'+splitDate[2]);
      }else{
        date = new Date(this.registerForm.get('birth_date').value);
      }
    }else{
      date = new Date(this.registerForm.get('birth_date').value);
    }
    let today = new Date();
    let ageAccept = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if (date < ageAccept) {
      return true;
    }
    return false;
  }
}

