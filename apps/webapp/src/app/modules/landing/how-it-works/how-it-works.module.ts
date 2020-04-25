import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { HowItWorksComponent } from './how-it-works.component';
import {HowItWorksRoutes} from './how-it-works.routing';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [
        HowItWorksComponent
    ],
    imports     : [
        RouterModule.forChild(HowItWorksRoutes),
        MatButtonModule,
        SharedModule,
        TranslateModule
    ]
})
export class HowItWorksModule
{
}
