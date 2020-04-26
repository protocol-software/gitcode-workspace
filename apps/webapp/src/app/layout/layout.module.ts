import { NgModule } from '@angular/core';
import { TreoDrawerModule } from '../../@treo/components/drawer';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { BasicLayoutModule } from './layouts/basic/basic.module';
import { SharedModule } from '../shared/shared.module';

const modules = [
    EmptyLayoutModule,
    BasicLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        TreoDrawerModule,
        SharedModule,
        ...modules
    ],
    exports     : [
        ...modules
    ]
})
export class LayoutModule
{
}
