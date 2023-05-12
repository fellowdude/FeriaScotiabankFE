import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  constructor(private api: ApiService) { }

  logIn(jwt: any): Observable<any>{
    return this.api.postLog('authorization', jwt)
  }

  logOut(): Observable<any>{
    return this.api.deleteLogged('authentication/log-out')
  }

  changePassword(sJWT: any): Observable<any> {
    return this.api.postLogged('authentication/change-password', { jwt: sJWT });
  }

  registerUser(userData: any): Observable<any>{
    return this.api.post('user', userData);
  }

  sendRecoveryPassword(jwt: any): Observable<any> {
    return this.api.post('authentication/send-mail-password-recovery', jwt);
  }

  sendNewPassword(passwordJWT: any, headerJWT: any): Observable<any> {
    return this.api.postRecovery('authentication/recovery-password', headerJWT, passwordJWT);
  }

}
