import { ICategory } from '../models/category.model';
export const category: ICategory = {
  name: 'Hogar.',
  subcategoryList: [
    {
      name: 'Refrigeracion',
      subcategoryList: [],
    },
    {
      name: 'Lavado',
      subcategoryList: [],
    },
    {
      name: 'Cocina',
      subcategoryList: [],
    },
    {
      name: 'Electrodomesticos',
      subcategoryList: [],
    },
  ],
};

export const categories = [category, category, category, category, category];
