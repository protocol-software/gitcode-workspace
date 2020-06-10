import { NgModule } from '@angular/core';
import { TreoScrollbarDirective } from './scrollbar.directive';

@NgModule({
    declarations: [
        TreoScrollbarDirective
    ],
    exports     : [
        TreoScrollbarDirective
    ]
})
export class TreoScrollbarModule
{
}
