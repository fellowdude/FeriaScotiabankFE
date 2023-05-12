import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VerifyCodeService } from '../services/verify-code.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoVerificationCodeGuard implements CanActivate, CanLoad {
  private _needVerification: boolean = environment.needVerification;
  constructor(
    private router: Router,
    private verifyCodeService: VerifyCodeService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._needVerification) {
      return this.router.navigateByUrl('main');
    }
    const resp = this.verifyCodeService.verifyAccessCode();
    if (resp) {
      return this.router.navigateByUrl('main');
    }
    return true;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._needVerification) {
      return this.router.navigateByUrl('main');
    }
    const resp = this.verifyCodeService.verifyAccessCode();
    if (resp) {
      return this.router.navigateByUrl('main');
    }
    return true;
  }
}
