import { ICategory } from '../models/category.model';
import { IFilter } from '../models/filter.model';
import { INavBar, INavBarItem } from '../models/navbar.model';

export const subCategory: ICategory = {
  name: 'Subcategoria',
  subcategoryList: []
}

export const category: ICategory = {
  name: 'Categoria',
  subcategoryList: [subCategory,subCategory,subCategory,subCategory]
}

export const filter: IFilter = {
  filter: '000001',
  name: 'ABC'
}

export const navBarItem: INavBarItem = {
  name: 'Grupo de Categoria',
  categoryList: [filter,filter,filter,filter,filter,filter,filter,filter,filter]
};

export const navBar: INavBar = {
  navBarList: [navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem, navBarItem]
};
