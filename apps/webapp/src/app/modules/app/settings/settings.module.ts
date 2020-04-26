import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsRoutes} from './settings.routing';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule.forChild(SettingsRoutes),
    SharedModule,
  ]
})
export class SettingsModule { }
