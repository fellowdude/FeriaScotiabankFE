import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import {
  ButtonsModule,
  CollapseModule,
  WavesModule,
} from 'angular-bootstrap-md';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ButtonComponent, SectionHeaderComponent, RadioButtonComponent],
  imports: [CommonModule, ButtonsModule, WavesModule, CollapseModule, FormsModule, HammerModule],
  exports: [ButtonComponent, SectionHeaderComponent, RadioButtonComponent],
})
export class MicroModule {}
