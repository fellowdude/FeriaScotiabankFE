import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { HeaderService } from './internal/header.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private router: Router, private toastr: ToastrService, private headerInternalService: HeaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(catchError(response => {
      if (response instanceof HttpErrorResponse) {
        if (response.error.close_session) {
          localStorage.clear();
          this.headerInternalService.emitData({type: "SESSION_CLOSED"});
          this.router.navigate(['/home']);
          this.toastr.warning(Messages.clossedSession, Messages.warningTitle, {
            timeOut: 3000,
            progressBar: true
          })
        }
        else{
          if (response.error.message) {
            if(response.status === 500){
              this.router.navigate(['/info/not-found']);
              this.toastr.error(response.error.message,Messages.errorTitle,{
                timeOut: 3000,
                progressBar: true
              })
            }else{
              this.toastr.warning(response.error.message,Messages.warningTitle,{
                timeOut: 3000,
                progressBar: true
              })
            }
          }
        }
      }
      return throwError(response);
    }));
  }

}
