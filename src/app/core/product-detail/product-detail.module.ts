import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MicroModule } from 'src/app/micro/micro.module';
import { ProductDetailResolver } from 'src/app/resolvers/product-detail.resolver';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { IconsModule } from 'angular-bootstrap-md';
import { ModalsModule } from 'src/app/modals/modals.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TextTypeVariationComponent } from './text-type-variation/text-type-variation.component';
import { ColorTypeVariationComponent } from './color-type-variation/color-type-variation.component';
import { AdditionalOptionsComponent } from './additional-options/additional-options.component';

const routes: Routes = [
  {
    path: 'product/:friendlyUrl',
    runGuardsAndResolvers: 'always',
    resolve: {
      resolved: ProductDetailResolver,
    },
    component: ProductDetailComponent,
  },
];
@NgModule({
  declarations: [ProductDetailComponent, TextTypeVariationComponent, ColorTypeVariationComponent, AdditionalOptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MicroModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    IconsModule,
    ModalsModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes),
  ],
})
export class ProductDetailModule {}
