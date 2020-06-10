import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreoDrawerComponent } from './drawer.component';

@NgModule({
    declarations: [
        TreoDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        TreoDrawerComponent
    ]
})
export class TreoDrawerModule
{
}
