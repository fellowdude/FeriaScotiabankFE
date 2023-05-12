import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private api: ApiService) { }

  getDepartments():Observable<any>{
    return this.api.getLogged('department');
  }

  getProvincesByDepartment(idDepartment: string): Observable<any>{
    return this.api.getLogged(`province/${idDepartment}`);
  }

  getDistrictsByProvince(idProvince: string): Observable<any>{
    return this.api.getLogged(`district/${idProvince}`);
  }

}
