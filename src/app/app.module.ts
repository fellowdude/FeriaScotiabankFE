import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StaticPagesModule } from './static-pages/static-pages.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { InterceptorService } from './services/interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-PE';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { GtagModule } from './gtag/gtag.module';
import { Mugan86GoogleAnalyticsModule } from 'mugan86-ng-google-analytics';
import { Constants } from './constants';
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    StaticPagesModule,
    SharedModule,
    CoreModule,
    Ng5SliderModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      newestOnTop: true,
      closeButton: true,
      preventDuplicates: true,
      maxOpened: 2,
      timeOut: 3000,
    }),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-TVMXF6C',
    }),
    Mugan86GoogleAnalyticsModule.forRoot({
      analyticsId: 'UA-16719465-65',
      showLog: false,
    }),
    GtagModule.init({
      targetId: Constants.GTAG,
    }),
  ],
  providers: [
    { provide: 'googleTagManagerId', useValue: 'GTM-TVMXF6C' },
    { provide: LOCALE_ID, useValue: 'es-PE' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
