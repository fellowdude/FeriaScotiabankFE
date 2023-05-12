import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

	private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	previousUrl$ = this.previousUrl.asObservable();

	setPreviouseUrl(url: string) {
		this.previousUrl.next(url);
	}

	constructor( private router: Router ) { }

}
