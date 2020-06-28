import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { LandingHomeComponent } from './home.component';
import { LandingHomeRoutes } from './home.routing';

@NgModule({
    declarations: [
        LandingHomeComponent
    ],
    imports     : [
        RouterModule.forChild(LandingHomeRoutes),
        MatButtonModule,
        SharedModule
    ]
})
export class LandingHomeModule
{
}
