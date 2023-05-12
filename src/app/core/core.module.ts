import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchModule } from './search/search.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { preload: false },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    data: { preload: false },
    runGuardsAndResolvers: 'always',
  },
  // {
  //   path: 'campaign',
  //   loadChildren: () =>
  //     import('./campaign/campaign.module').then((m) => m.CampaignModule),
  //   data: { preload: false },
  //   runGuardsAndResolvers: 'always',
  // },
  {
    path: 'product',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
    data: { preload: false },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
    data: { preload: false },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchModule,
    HomeModule,
    ProductDetailModule,
    RouterModule.forChild(coreRoutes),
  ],
})
export class CoreModule {}
