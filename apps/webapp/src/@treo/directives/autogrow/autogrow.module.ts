import { NgModule } from '@angular/core';
import { TreoAutogrowDirective } from './autogrow.directive';

@NgModule({
    declarations: [
        TreoAutogrowDirective
    ],
    exports     : [
        TreoAutogrowDirective
    ]
})
export class TreoAutogrowModule
{
}
