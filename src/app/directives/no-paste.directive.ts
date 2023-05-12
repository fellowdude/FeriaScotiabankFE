import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[NoPaste]'
})
export class NoPasteDirective {

  constructor(private el?: ElementRef) { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
