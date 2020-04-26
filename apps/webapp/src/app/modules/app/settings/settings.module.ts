import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsRoutes} from './settings.routing';
import { SettingsComponent } from './settings.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ProfileComponent} from './profile/profile.component';
import {BillingComponent} from './billing/billing.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SideNavComponent,
    ProfileComponent,
    BillingComponent,
  ],
  imports: [
    RouterModule.forChild(SettingsRoutes),
    SharedModule,
  ]
})
export class SettingsModule { }
