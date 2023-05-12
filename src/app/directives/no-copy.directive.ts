import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NoCopy]'
})
export class NoCopyDirective {

  constructor(private el?: ElementRef) { }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

}
