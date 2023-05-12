import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { VerifyCodeService } from '../services/verify-code.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationCodeGuard implements CanActivate, CanLoad {
  // private _needVerification: boolean = Constants.needVerification;

  constructor(
    private verifyCodeService: VerifyCodeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this._needVerification) return true;
    // const resp = this.verifyCodeService.verifyAccessCode();
    // if (!resp) {
    //   return this.router.navigateByUrl('verification');
    // }
    // return resp;
	return true;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this._needVerification) return true;
    // const resp = this.verifyCodeService.verifyAccessCode();
	  // console.log(resp)
    // if (!resp) {
    //   return this.router.navigateByUrl('verification');
    // }
    // return resp;
	return true;
  }
}
