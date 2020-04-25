import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TreoNavigationModule } from '../../../../../@treo/components/navigation';
import { MessagesModule } from '../../../../layout/common/messages/messages.module';
import { NotificationsModule } from '../../../../layout/common/notifications/notifications.module';
import { SearchModule } from '../../../../layout/common/search/search.module';
import { ShortcutsModule } from '../../../../layout/common/shortcuts/shortcuts.module';
import { UserModule } from '../../../../layout/common/user/user.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CenteredLayoutComponent } from '../../../../layout/layouts/horizontal/centered/centered.component';

@NgModule({
    declarations: [
        CenteredLayoutComponent
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
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        CenteredLayoutComponent
    ]
})
export class CenteredLayoutModule
{
}
