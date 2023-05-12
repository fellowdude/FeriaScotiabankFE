import { ICategory } from "./category.model";
export interface ICategoryGroup{
  name: string;
  categoryList: Array<ICategory>;
}
