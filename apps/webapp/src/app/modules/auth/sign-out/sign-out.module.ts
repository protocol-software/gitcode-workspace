import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TreoCardModule } from '../../../../@treo/components/card';
import { SharedModule } from '../../../shared/shared.module';
import { AuthSignOutComponent } from './sign-out.component';
import { authSignOutRoutes } from './sign-out.routing';

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        TreoCardModule,
        SharedModule
    ]
})
export class AuthSignOutModule
{
}
