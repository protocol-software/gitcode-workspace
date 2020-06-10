import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TreoNavigationModule } from '../../../../@treo/components/navigation';
import { MessagesModule } from '../../common/messages/messages.module';
import { NotificationsModule } from '../../common/notifications/notifications.module';
import { UserModule } from '../../common/user/user.module';
import { SharedModule } from '../../../shared/shared.module';
import { BasicLayoutComponent } from './basic.component';

@NgModule({
    declarations: [
        BasicLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        TreoNavigationModule,
        MessagesModule,
        NotificationsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        BasicLayoutComponent
    ]
})
export class BasicLayoutModule
{
}
