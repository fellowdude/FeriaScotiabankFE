import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';
import { VerifyCodeService } from './services/verify-code.service';
import { VerificationCodeGuard } from './guards/verification-code.guard';
import { environment } from 'src/environments/environment';
import { Meta } from '@angular/platform-browser';
import { GtagService } from './gtag/gtag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Feria ScotiaPuntos';
  loading: boolean = false;
  currentRoute: string = '';
  previousRoute: string = null;
  isBrowser: boolean;
  googleSiteVerificationContent: string =
    environment.googleSiteVerificationContent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private urlService: UrlService,
    public verifyCodeService: VerifyCodeService,
    public verificationCodeGuard: VerificationCodeGuard,
    private metaTagService: Meta,
    private gtag: GtagService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((routerEvent: RouterEvent) => {
        if (routerEvent instanceof NavigationStart) {
          this.loading = true;
        }

        if (
          routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError
        ) {
          this.loading = false;
        }

        if (routerEvent instanceof NavigationEnd) {
          this.previousRoute = this.currentRoute;
          this.currentRoute = routerEvent.url;

          this.urlService.setPreviouseUrl(this.previousRoute);

          const gtmTag = {
            event: 'page',
            pageName: routerEvent.url,
          };
          this.gtmService.pushTag(gtmTag);
          this.gtag.pageView(this.title, routerEvent.url);
        }
      });
    }
  }

  ngOnInit() {
    this.metaTagService.addTags([
      {
        name: 'google-site-verification',
        content: environment.googleSiteVerificationContent,
      },
    ]);
  }
}
