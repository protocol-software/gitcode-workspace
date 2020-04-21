import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentNavComponent} from './component-nav.component';


@NgModule({
  declarations: [
    ComponentNavComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ComponentNavComponent,
  ]
})
export class ComponentNavModule { }
