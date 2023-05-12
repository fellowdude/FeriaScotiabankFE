import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerifyCodeService } from '../../services/verify-code.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.scss'],
})
export class VerificationPageComponent implements OnInit {
  verificationForm: FormGroup = this.fb.group({
    verificationCode: ['', Validators.required],
  });
  isBrowser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toastrService: ToastrService,
    public verifyCodeService: VerifyCodeService,
  ) {}

  ngOnInit(): void {}

  verify() {
    this.verifyCodeService
      .loginWithCode(this.verificationForm.get('verificationCode').value)
      .subscribe((resp) => {
        if (resp) {
          this.route.navigate(['/main']);
        } else {
          this.toastrService.error(Messages.accessCodeInvalid, 'Error', {
            timeOut: 2000,
          });
        }
      });
  }
}
