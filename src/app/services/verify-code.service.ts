import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeService {
  verified: boolean = true;
  loadingVerification: boolean = true;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}

  get code(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessCode') || '';
    }
    return '';
  }

  loginWithCode(accessCode: string): Observable<any> {
    if (isPlatformBrowser(this.platformId) && accessCode === '0000001') {
      localStorage.setItem('accessCode', accessCode);
      this.verified = true;
      this.loadingVerification = false;
      return of(true);
    }
    this.verified = false;
    this.loadingVerification = false;
    return of(false);
  }

  verifyAccessCode(): boolean {
    if (this.code === '0000001') {
      this.verified = true;
      return true;
    }
    return false;
  }

  verifyAccessCodeAndNavigate(): void {
    if (this.code !== '0000001') {
      this.verified = false;
      this.loadingVerification = false;
      this.router.navigateByUrl('verification');
      return;
    }
    this.verified = true;
    this.loadingVerification = false;
  }
}
