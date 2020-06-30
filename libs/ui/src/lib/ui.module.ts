import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ColorsComponent,
  ],
  exports: [
    ButtonComponent,
  ],
})
export class UiModule {}
