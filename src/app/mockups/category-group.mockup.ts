import { ICategoryGroup } from '../models/category-group.model';
import { ICategoryPage } from '../resolvers/category.resolver';
import { products } from './product.mockup';

export const categoryGroups: ICategoryGroup[] = [
  {
    name: 'Hogar',
    categoryList: [],
  },
  {
    name: 'Electronica',
    categoryList: [],
  },
  {
    name: 'Ropa',
    categoryList: [],
  },
  {
    name: 'Restaurantes',
    categoryList: [],
  },
  {
    name: 'Viajes',
    categoryList: [],
  },
  {
    name: 'Werkwerk',
    categoryList: [],
  },
];
export const categoryGroup = categoryGroups[0];
export const mockResolver: ICategoryPage = {
  _brands: [],
  category: {
    _id: '',
    brands: [],
    filters: [],
    friendly_url: '',
    image_banner: '',
    image_link: '',
    name: '',
    url_attachment: '',
  },
  isBrandPage: false,
};
