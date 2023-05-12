import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NoNumbers]'
})
export class NoNumbersDirective {
  regexpNumber: RegExp  = new RegExp ('[0-9]');

  constructor(private el?: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyDown(event) {
    if(this.regexpNumber.test(event.key)){
      event.preventDefault();
    }
  }
}
