export interface ICategory {
  name: string;
  subcategoryList?: Array<ICategory>;
}

export type CategoryListType = 'carousel' | 'grid';
export type CategoryBrandListType = 'carousel' | 'grid';
