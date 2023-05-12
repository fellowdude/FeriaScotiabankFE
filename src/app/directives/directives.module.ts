import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { NoespecialCharactersDirective } from './noespecial-characters.directive';
import { NoNumbersDirective } from './no-numbers.directive';
import { NoCopyDirective } from './no-copy.directive';
import { NoPasteDirective } from './no-paste.directive'

@NgModule({
  declarations: [
    OnlyNumberDirective,
    NoespecialCharactersDirective,
    NoNumbersDirective,
    NoCopyDirective,
    NoPasteDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OnlyNumberDirective,
    NoespecialCharactersDirective,
    NoNumbersDirective,
    NoCopyDirective,
    NoPasteDirective
  ]
})
export class DirectivesModule { }
