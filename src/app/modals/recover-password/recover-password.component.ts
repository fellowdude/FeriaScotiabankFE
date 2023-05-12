import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { KJUR } from 'jsrsasign';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants';
import { Messages } from 'src/app/messages';
import { UserAccessService } from 'src/app/services/user-access.service';

import { LOGIN_TOKEN } from '../login/login';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  loadingRecover: boolean = false;

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, private userAccessService: UserAccessService, private toastrService: ToastrService, @Inject(LOGIN_TOKEN) private loginComponent: any) { }

  ngOnInit(): void {
    this.recoverForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    })
  }

  recoverPassword(): void {
    if(this.recoverForm.valid){
      this.loadingRecover = true;

      const oHeader = { alg: 'RS256', typ: 'JWT' };
      const oPayload: any = {};
      oPayload.email = (this.recoverForm.value.email as String).toLowerCase();
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);

      const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

      this.userAccessService.sendRecoveryPassword({ jwt: sJWT }).subscribe((result)=>{
        this.toastrService.success(Messages.successRecovery, Messages.successTitle);
        this.loadingRecover = false;
        this.logInUser();
      }, (error) =>{
        this.loadingRecover = false;
      })
    }else{
      this.toastrService.warning(Messages.errorFormRecovery, Messages.warningTitle);
    }
  }

  logInUser(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.loginComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
    });
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

}
