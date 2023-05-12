import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearchPage } from 'src/app/resolvers/search.resolver';
import { CategoryService } from 'src/app/services/category.service';
import { HeaderService } from 'src/app/services/internal/header.service';
import { IProductBackend } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as ISearchPage;
  }

  filter: string = '';
  productList: IProductBackend[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(@Inject(PLATFORM_ID) private platformId: any,private route: ActivatedRoute, private router: Router, private catService: CategoryService, private headerInternalService: HeaderService) {}

  ngOnInit(): void {
    if( isPlatformBrowser(this.platformId)){
      localStorage.removeItem('filter');
      localStorage.removeItem('page');

      if(window.innerWidth > 1600){
        this.itemsPerPage = 10;
      }else{
        this.itemsPerPage = 12;
      }
  
      this.route.queryParamMap.subscribe(
        (params) => {
          this.filter = params.get('filter');
        }
      );
      this.resolvedData.searchResult.forEach( (e)=>{ e.image_cover = (this.catService.urlAttachment? '':localStorage.getItem('url')) + e.image_cover} );
      this.productList = this.resolvedData.searchResult;
      this.headerInternalService.emitData({type: 'SEARCH_LOAD'})
    }
    
    
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if( isPlatformBrowser(this.platformId)){
      if(window.innerWidth > 1600){
        this.itemsPerPage = 10;
      }else{
        this.itemsPerPage = 12;
      }
    }
    
  }
}
