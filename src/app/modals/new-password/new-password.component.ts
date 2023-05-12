import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { KJUR } from 'jsrsasign';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants';
import { Messages } from 'src/app/messages';
import { UserAccessService } from 'src/app/services/user-access.service';
import { LOGIN_TOKEN } from '../login/login';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  loadingNewPassword: boolean = false;
  temporalJWT: string = '';

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, private userAccessService: UserAccessService, private toastrService: ToastrService,
    @Inject(LOGIN_TOKEN) private loginComponent: any, private router: Router) { }

  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  saveNewPassword(): void{
    if(this.newPasswordForm.valid && this.newPasswordForm.get('newPassword').value === this.newPasswordForm.get('repeatPassword').value){
      this.loadingNewPassword = true;

      const oHeader = { alg: 'RS256', typ: 'JWT' };
      const oPayload: any = {};
      oPayload.new_password = this.newPasswordForm.get('newPassword').value;
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);

      const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

      this.userAccessService.sendNewPassword(sJWT, this.temporalJWT).subscribe(() => {
        this.closeModal();
        this.newPasswordForm.reset();
        this.toastrService.success(Messages.successNewPassword, Messages.successTitle)
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
        this.loadingNewPassword = false;
      }, (error) => {
        this.loadingNewPassword = false;
      })

    }else{
      this.toastrService.warning(Messages.errorFormNewPassword, Messages.warningTitle)
    }
  }

  closeModal(): void {
    this.router.navigate(['/main/home']);
    this.modalRef && this.modalRef.hide();
  }
}
