import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsRoutes} from './settings.routing';
import { SettingsComponent } from './settings.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ProfileComponent} from './profile/profile.component';
import {BillingComponent} from './billing/billing.component';
import { SettingComponent,ConfirmDialogGithub,ConfirmDialogName,SettingsDialogEmail,EmailDialogSave } from './setting/setting.component';

import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SettingsComponent,
    SideNavComponent,
    ProfileComponent,
    BillingComponent,
    SettingComponent,
    ConfirmDialogGithub,ConfirmDialogName,SettingsDialogEmail,EmailDialogSave

  ],
  imports: [
    RouterModule.forChild(SettingsRoutes),
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule, MatIconModule, MatDialogModule, TranslateModule,
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,

  ]
})
export class SettingsModule { }
