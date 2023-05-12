import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  CategoryService,
  IBrandBackend,
  IFilterBackend,
} from 'src/app/services/category.service';
import { Constants } from 'src/app/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-list-menu',
  templateUrl: './product-list-menu.component.html',
  styleUrls: ['./product-list-menu.component.scss'],
})
export class ProductListMenuComponent implements OnInit {
  @Input() filters: IFilterBackend[];
  @Input() _brands: IBrandBackend[];
  @Output() menuChange = new EventEmitter<any>();

  @Input() isToggled;
  @Output() isToggledChange = new EventEmitter<boolean>();

  formMenu = this.fb.group({});
  priceArr = [null, null];
  pointsArr = [null, null];
  existFilters: any;

  // Getters for the html
  get formFilters() {
    return (this.formMenu.get('formFilters') as FormArray)?.controls;
  }
  get formBrands() {
    return ((this.formMenu.get('formBrand') as FormGroup)?.get(
      'value'
    ) as FormArray)?.controls;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: FormBuilder,
    private catService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initFormFilters();

    if (isPlatformBrowser(this.platformId) && localStorage.getItem('filter') && !this.catService.brand) {
      this.existFilters = [...JSON.parse(localStorage.getItem('filter'))];
      this.existFilters.forEach((element) => {
        switch (element.bindedTo) {
          case '':
            this.formMenu.controls['formFilters'].patchValue([element]);
            this.formMenu.controls['formBrand'].markAsDirty();
            break;
          case 'price':
            this.formMenu.controls['formPrice'].patchValue(element);
            this.formMenu.controls['formBrand'].markAsDirty();
            break;
          case 'marca':
            this.formMenu.controls['formBrand'].patchValue(element);
            this.formMenu.controls['formBrand'].markAsDirty();
            break;
        }
      });
      localStorage.removeItem('filter');
    }

    this.sendFormFilters(this.formMenu.value);

    this.formMenu.controls['formBrand'].valueChanges.subscribe((val) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('page');
      }
      this.sendFormFilters({
        formBrand: val,
        formFilters: this.formMenu.controls['formFilters'].value,
      });
    });
    this.formMenu.controls['formFilters'].valueChanges.subscribe((val) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('page');
      }
      this.sendFormFilters({
        formFilters: val,
        formBrand: this.formMenu.controls['formBrand'].value,
      });
    });
  }

  initFormFilters() {
    // Add every form group|array to formMenu
    // price, points, brands, filters
    const formPrice = this.fb.group(
      {
        bindedTo: ['precio'],
        used: [true],
        button: true,
        value: this.fb.array([this.fb.control(null), this.fb.control(null)]),
      },
      {
        validators: (controls) => {
          return (controls.get('value') as FormArray).controls[0].value <
            (controls.get('value') as FormArray).controls[1].value
            ? null
            : {
                errorPricesInvalid: true,
              };
        },
      }
    );
    this.formMenu.addControl('formPrice', formPrice);

    const formPoints = this.fb.group(
      {
        bindedTo: ['precio'],
        used: [true],
        button: true,
        value: this.fb.array([this.fb.control(null), this.fb.control(null)]),
      },
      {
        validators: (controls) => {
          return (controls.get('value') as FormArray).controls[0].value <
            (controls.get('value') as FormArray).controls[1].value
            ? null
            : {
                errorPricesInvalid: true,
              };
        },
      }
    );
    this.formMenu.addControl('formPoints', formPoints);

    const formBrand = this.fb.group({
      bindedTo: ['marca'],
      used: [true],
      button: false,
      value: this.fb.array(
        this._brands.map((val) =>
          this.fb.group({
            name: [val.name],
            toggle: [false],
          })
        )
      ),
    });
    this.formMenu.addControl('formBrand', formBrand);

    const formFilters = this.fb.array(
      this.filters.map((filter) =>
        this.fb.group({
          bindedTo: [''],
          name: [(filter as any).filter.name],
          used: [true],
          button: false,
          filter_id: [filter._id],
          type: ['checkbox'],
          value: this.fb.array(
            filter.values.map((val) =>
              this.fb.group({
                name: [val],
                toggle: [val == this.catService.activeFilter || false],
              })
            )
          ),
        })
      )
    );

    this.formMenu.addControl('formFilters', formFilters);
    this.catService.activeFilter &&
      this.formMenu.get('formFilters').markAsDirty();
  }

  sendFormFilters(val = {}, forceSend = false, consider = false) {
    if (this.isToggled && !forceSend) return;

    // Mildly validate the values of formMenu
    // so the back receives|processes less params
    let flatFormArr = [];

    if (
      this.formMenu.get('formBrand').dirty &&
      this.formMenu.get('formBrand').value
    ) {
      const isUsed = this.isFilterUsed(
        this.formMenu.get('formBrand').value.value as [
          { name: string; toggle: boolean }
        ]
      );
      if (isUsed) flatFormArr.push(this.formMenu.get('formBrand').value);
    }

    if (
      this.formMenu.get('formFilters').dirty &&
      this.formMenu.get('formFilters').value
    ) {
      this.formMenu.get('formFilters').value.forEach((_filter) => {
        const isUsed = this.isFilterUsed(
          _filter.value as [{ name: string; toggle: boolean }]
        );
        if (isUsed) flatFormArr.push(_filter);
      });
    }

    if (
      this.formMenu.get('formPrice').valid &&
      this.formMenu.get('formPrice').value
    ) {
      flatFormArr.push(this.formMenu.get('formPrice').value);
    }

    if (
      this.formMenu.get('formPoints').valid &&
      this.formMenu.get('formPoints').value
    ) {
      // shallow copy to avoid modifying source obj
      let formPointsCopy = Object.assign(
        {},
        this.formMenu.get('formPoints').value
      );
      // points is the price divided by POINTS_DIVIDER
      formPointsCopy.value = (formPointsCopy.value as [
        number,
        number
      ])?.map((val) => Number((val / Constants.POINTS_DIVIDER).toFixed(2)));

      // merge with price filter if price is also valid
      if (
        this.formMenu.get('formPrice').valid &&
        this.formMenu.get('formPrice').value
      ) {
        flatFormArr = [];
        // intersect the filter amount values
        if (
          this.formMenu.get('formPrice').value.value[0] >
          formPointsCopy.value[0]
        )
          formPointsCopy.value[0] = this.formMenu.get(
            'formPrice'
          ).value.value[0];
        if (
          this.formMenu.get('formPrice').value.value[1] <
          formPointsCopy.value[1]
        )
          formPointsCopy.value[1] = this.formMenu.get(
            'formPrice'
          ).value.value[1];
      }
      flatFormArr.push(formPointsCopy);
    }

    // Brand page
    if (this.catService.brand) {
      flatFormArr.push({
        bindedTo: 'marca',
        used: true,
        value: [
          {
            name: this.catService.brand.name,
            toggle: true,
          },
        ],
      });
    }

    // then emit them
    this.menuChange.emit(flatFormArr);
  }

  applyPriceFilter() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('page');
    }
    if (this.isToggled) return;
    let flatFormArr = [];
    if (
      this.formMenu.get('formPrice').valid &&
      this.formMenu.get('formPrice').value
    ) {
      flatFormArr.push(this.formMenu.get('formPrice').value);
    }

    if (this.formMenu.get('formBrand').dirty) {
      const isUsed = this.isFilterUsed(
        this.formMenu.get('formBrand').value.value as [
          { name: string; toggle: boolean }
        ]
      );
      if (isUsed) flatFormArr.push(this.formMenu.get('formBrand').value);
    }

    if (this.formMenu.get('formFilters').dirty) {
      this.formMenu.get('formFilters').value.forEach((_filter) => {
        const isUsed = this.isFilterUsed(
          _filter.value as [{ name: string; toggle: boolean }]
        );
        if (isUsed) flatFormArr.push(_filter);
      });
    }

    if (
      this.formMenu.get('formPrice').valid ||
      (this.formMenu.get('formPrice').value.value[0] == null &&
        this.formMenu.get('formPrice').value.value[1] == null)
    ) {
      this.menuChange.emit(flatFormArr);
    }
  }

  applyPointsFilter() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('page');
    }
    if (this.isToggled) return;
    let flatFormArr = [];
    if (
      this.formMenu.get('formPoints').valid &&
      this.formMenu.get('formPoints').value
    ) {
      // shallow copy to avoid modifying source obj
      let formPointsCopy = Object.assign(
        {},
        this.formMenu.get('formPoints').value
      );
      // points is the price divided by POINTS_DIVIDER
      formPointsCopy.value = (formPointsCopy.value as [
        number,
        number
      ])?.map((val) => Number((val / Constants.POINTS_DIVIDER).toFixed(2)));

      // merge with price filter if price is also valid
      if (
        this.formMenu.get('formPrice').valid &&
        this.formMenu.get('formPrice').value
      ) {
        flatFormArr = [];
        // intersect the filter amount values
        if (
          this.formMenu.get('formPrice').value.value[0] >
          formPointsCopy.value[0]
        )
          formPointsCopy.value[0] = this.formMenu.get(
            'formPrice'
          ).value.value[0];
        if (
          this.formMenu.get('formPrice').value.value[1] <
          formPointsCopy.value[1]
        )
          formPointsCopy.value[1] = this.formMenu.get(
            'formPrice'
          ).value.value[1];
      }
      flatFormArr.push(formPointsCopy);
    }

    if (this.formMenu.get('formBrand').dirty) {
      const isUsed = this.isFilterUsed(
        this.formMenu.get('formBrand').value.value as [
          { name: string; toggle: boolean }
        ]
      );
      if (isUsed) flatFormArr.push(this.formMenu.get('formBrand').value);
    }

    if (this.formMenu.get('formFilters').dirty) {
      this.formMenu.get('formFilters').value.forEach((_filter) => {
        const isUsed = this.isFilterUsed(
          _filter.value as [{ name: string; toggle: boolean }]
        );
        if (isUsed) flatFormArr.push(_filter);
      });
    }

    if (
      this.formMenu.get('formPoints').valid ||
      (this.formMenu.get('formPoints').value.value[0] == null &&
        this.formMenu.get('formPoints').value.value[1] == null)
    ) {
      this.menuChange.emit(flatFormArr);
    }
  }

  isFilterUsed(filter: [{ name: string; toggle: boolean }]) {
    if (filter === undefined) return false;
    return filter.some((x) => x.toggle === true);
  }

  applyFilters() {
    this.sendFormFilters(this.formMenu.value, true);
    this.closeFilters();
  }

  closeFilters() {
    this.isToggled = false;
    this.isToggledChange.emit(this.isToggled);
  }
}
