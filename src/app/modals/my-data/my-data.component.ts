import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { PROFILE_TOKEN } from '../profile/profile';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { LdvService } from 'src/app/services/ldv.service';
import { UserAccessService } from 'src/app/services/user-access.service';
import { Constants } from 'src/app/constants';
import { KJUR } from 'jsrsasign';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  typeDocList: Array<any>;

  loadingUpdateData: boolean = false;
  loadingUpdatePassword: boolean = false;
  today: Date = new Date();

  maxDate: string = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  ).toISOString().split('T')[0];

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService,
    @Inject(PROFILE_TOKEN) private profileComponent: any, private userProfileService: UserProfileService,
    private toastrService: ToastrService,
    private userAccessService:UserAccessService, private LdvService: LdvService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      last_name_father: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      last_name_mother: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      type_document: new FormControl('', [Validators.required]),
      number_document: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]),
      birth_date: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
    })
    this.passwordForm = new FormGroup({
      current_password: new FormControl('', [Validators.minLength(6), Validators.required]),
      new_password: new FormControl('', [Validators.minLength(6), Validators.required]),
      repeat_new_password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
    this.LdvService.getLdvDetail('TYPE-DOCUMENT-CUSTOMER').subscribe((result: Array<any>)=>{
      this.typeDocList = result;
      this.userProfileService.userData().subscribe((result: any)=>{
        this.profileForm.patchValue(result);
        if(this.profileForm.get('birth_date').value)
          this.profileForm.get('birth_date').setValue((this.profileForm.get('birth_date').value || '').split('T')[0]);
      })
    })

  }

  updateProfile(): void{
    if(this.profileForm.valid && this.minimumAge()){
      this.loadingUpdateData = true;
      this.userProfileService.userDataUpdate(this.profileForm.value).subscribe( (result: any)=>{
        // NOTIFY SUCCESS
        this.toastrService.success(Messages.successUpdateProfile, Messages.successTitle);
        this.loadingUpdateData = false;
      }, (error)=>{
        this.loadingUpdateData = false;
      })
    }else{
      // NOTIFY ERROR
      if(this.profileForm.invalid)
        this.toastrService.warning(Messages.errorUpdateProfile, Messages.warningTitle);
      else{
        this.toastrService.warning(Messages.errorAgeUpdateProfile, Messages.warningTitle);
      }
    }
  }

  updatePassword(): void{
    if(this.passwordForm.valid && this.passwordForm.get('new_password').value === this.passwordForm.get('repeat_new_password').value){
      this.loadingUpdatePassword = true;

      const oHeader = { alg: 'RS256', typ: 'JWT' };
      const oPayload: any = {};
      oPayload.old_password = this.passwordForm.value['current_password'];
      oPayload.new_password = this.passwordForm.value['new_password'];
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);

      const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

      this.userAccessService.changePassword(sJWT).subscribe( (result: any)=>{
        this.toastrService.success(Messages.successUpdatePassword, Messages.successTitle);
        this.loadingUpdatePassword = false;
        this.passwordForm.reset();
      }, (error) => {
        this.loadingUpdatePassword = false;
      })
    }else{
      if(this.passwordForm.get('new_password').value !== this.passwordForm.get('repeat_new_password').value){
        this.toastrService.warning(Messages.errorUpdatePasswordEqual, Messages.warningTitle);
      }else{
        this.toastrService.warning(Messages.errorUpdatePasswordSize, Messages.warningTitle);
      }
    }
  }

  closeModal(): void{
    this.modalRef && this.modalRef.hide();
  }

  returnProfile(): void{
    this.closeModal();
    this.modalRef = this.modalService.show( this.profileComponent , {
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

  minimumAge(): boolean {
    let date = new Date(this.profileForm.get('birth_date').value);
    let today = new Date();
    let ageAccept = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if (date < ageAccept) {
      return true;
    }
    return false;
  }
}
