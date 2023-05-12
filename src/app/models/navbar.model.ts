import { IFilter } from './filter.model';

export interface INavBarItem{
  name: string;
  categoryList: Array<IFilter>;
  friendlyUrl?: string;
  selected?: boolean;
}

export interface INavBar{
  navBarList: Array<INavBarItem>;
}
