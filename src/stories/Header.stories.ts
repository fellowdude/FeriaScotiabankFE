import { object } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';

import { MicroModule } from '../app/micro/micro.module';
import { HeaderComponent } from '../app/shared/header/header.component';
import { SharedModule } from '../app/shared/shared.module';
import { navBar } from '../app/mockups/header.mockup';
import { ModalModule } from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const card = storiesOf('Shared/Header', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule, MicroModule, ModalModule.forRoot(), BrowserAnimationsModule, RouterTestingModule, HttpClientModule ],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/' },
    ]
  })
);

card.add('Header Logged', () => {
  return {
    component: HeaderComponent,
    props: {
      user: {},
      navBarListConfig: object('navBarListConfig', navBar),
    },
  };
});
card.add('Header unLogged', () => {
  return {
    component: HeaderComponent,
    props: {
      user: null,
      navBarListConfig: object('navBarListConfig', navBar),
    },
  };
});
