import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModuleModule} from '../../custom-module/custom-module.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';

@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    CustomModuleModule,
  ],
  exports:[ 
    ActivityComponent,
  ],
})
export class ActivityModule { }
