import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef, ModalModule } from 'angular-bootstrap-md';
import { AddressesComponent } from '../app/modals/addresses/addresses.component';

import { ModalsModule } from '../app/modals/modals.module';
import { LoginComponent } from '../app/modals/login/login.component';
import { RegisterComponent } from '../app/modals/register/register.component';
import { RecoverPasswordComponent } from '../app/modals/recover-password/recover-password.component';

import { LOGIN_TOKEN } from '../app/modals/login/login';
import { REGISTER_TOKEN } from '../app/modals/register/register';
import { RECOVER_PASSWORD_TOKEN } from '../app/modals/recover-password/recover-password';

const card = storiesOf('Modals/Login-Register', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule, ModalModule.forRoot()],
    providers: [
      MDBModalRef,
      { provide: LOGIN_TOKEN, useValue: LoginComponent },
      { provide: REGISTER_TOKEN, useValue: RegisterComponent },
      { provide: RECOVER_PASSWORD_TOKEN, useValue: RecoverPasswordComponent },
    ]
  })
);

card.add('Login', () => {
  return {
    component: LoginComponent,
    props: {},
  };
});

card.add('Register', () => {
  return {
    component: RegisterComponent,
    props: {},
  };
});

card.add('Forgot Password', () => {
  return {
    component: RecoverPasswordComponent,
    props: {},
  };
});
