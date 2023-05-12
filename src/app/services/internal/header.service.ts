import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICommunicartionHeader } from 'src/app/models/communitacion.model'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitData(data: ICommunicartionHeader) {
    this.observer.next(data);
  }
}
