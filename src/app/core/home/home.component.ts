import { ActivatedRoute } from '@angular/router';
import { IHomePage } from '../../resolvers/home.resolver';
import { IProductItem } from 'src/app/models/product.model';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ICategoryBackend } from 'src/app/services/category.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NewPasswordComponent } from 'src/app/modals/new-password/new-password.component';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IComplexCard, ISimpleCard } from 'src/app/models/static-pages.model';
import { homeHero } from './home-hero-list/home-hero.static';
import { HomePopUpComponent } from './home-pop-up/home-pop-up.component';
import { isPlatformBrowser } from '@angular/common';
import { VerifyCodeService } from 'src/app/services/verify-code.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IHomePage;
  }

  categories: ICategoryBackend[] = [];
  productFeat: IProductItem[] = [];
  heroes: IComplexCard[] = [];
  banners: IComplexCard[] = [];
  payments: ISimpleCard[] = [];
  modalRef: MDBModalRef;

  @Input() user: unknown = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private verifyCodeService: VerifyCodeService,
    private modalsService: MDBModalService,
    private staticTransformService: StaticPagesTransformService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('filter');
      localStorage.removeItem('page');
      localStorage.removeItem('pageS');
    }

    this.categories = this.resolvedData.categories;
    this.productFeat = this.resolvedData.productsFeat;

    this.heroes = homeHero;

    this.banners = this.staticTransformService.complexCardsStructure(
      this.resolvedData.content.content_client
    );

    this.payments = this.staticTransformService.accordionSimpleCardStructure(
      this.resolvedData.content.content_payment
    );

    if (this.route.snapshot.queryParams['pr']) {
      this.modalsService.show(NewPasswordComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-full-height modal-right mh-100 my-0',
        containerClass: 'right modal-dialog-scrollable mh-100 my-0',
        animated: true,
        data: {
          temporalJWT: this.route.snapshot.queryParams['pr'],
        },
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('popUpShown')) {
        this.modalRef = this.modalsService.show(HomePopUpComponent, {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          ignoreBackdropClick: false,
          class: 'modal-lg modal-dialog modal-dialog-centered',
          animated: true,
        });

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('popUpShown', 'y');
        }
      }
    }
  }
}
