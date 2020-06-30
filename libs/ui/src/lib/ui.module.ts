import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button/button.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
  ],
  declarations: [
    ButtonComponent,
    ColorsComponent,
  ],
  exports: [
    ButtonComponent,
  ],
})
export class UiModule {}
