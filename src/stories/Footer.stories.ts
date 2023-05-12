import { object } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { IconsModule } from 'angular-bootstrap-md';

import { MicroModule } from '../app/micro/micro.module';
import { FooterComponent } from '../app/shared/footer/footer.component';

const card = storiesOf('Shared/Footer', module).addDecorator(
  moduleMetadata({
    imports: [MicroModule, IconsModule]
  })
);

card.add('Footer Logged', () => {
  return {
    component: FooterComponent,
    props: {
      user: {},
    },
  };
});
card.add('Footer unLogged', () => {
  return {
    component: FooterComponent,
    props: {
      user: null,
    },
  };
});
