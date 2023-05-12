import { categoryGroups } from './category-group.mockup';
import { products } from './product.mockup';

export const mockResolver = {
  categories: categoryGroups,
  productsFeat: products,
};

export const homeHero: any = {
  title: 'Compra lo que quieras sin salir de casa',
  description:
    'Duis deserunt occaehome amet qui nostrud consectetur nostrud deserunt sint officia. Ad magna labore reprehenderit ad ipsum. Irure id laborum anim commodo eu irure.',
  buttonLabel: 'Call to action',
  url: 'https://www.google',
};

export const homeHeroList: any[] = [homeHero, homeHero, homeHero];
