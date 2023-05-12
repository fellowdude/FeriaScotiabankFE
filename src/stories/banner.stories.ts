// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SharedModule } from '../app/shared/shared.module';
import { BannerComponent } from '../app/shared/banner/banner.component';
import { object } from '@storybook/addon-knobs';
import { banner } from '../app/mockups/banner.mockup';

const card = storiesOf('Shared/Banner', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
  })
);

card.add('Banner', () => {
  return {
    component: BannerComponent,
    props: {
      banner: object('banner', banner),
    },
  };
});
