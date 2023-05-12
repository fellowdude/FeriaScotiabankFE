import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';

@Directive({
  selector: '[NoespecialCharacters]'
})
export class NoespecialCharactersDirective {
  constructor(private el?: ElementRef) { }

  regexpNumber : RegExp  = new RegExp ('[A-Za-z0-9ñáéíóú -]');

  @HostListener('keypress', ['$event']) onKeyDown(event) {
    if(!this.regexpNumber.test(event.key)){
      event.preventDefault();
    }
  }

}

