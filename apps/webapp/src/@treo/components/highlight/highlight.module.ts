import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreoHighlightComponent } from './highlight.component';

@NgModule({
    declarations   : [
        TreoHighlightComponent
    ],
    imports        : [
        CommonModule
    ],
    exports        : [
        TreoHighlightComponent
    ],
    entryComponents: [
        TreoHighlightComponent
    ]
})
export class TreoHighlightModule
{
}
