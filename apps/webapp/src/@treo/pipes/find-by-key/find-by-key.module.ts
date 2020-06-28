import { NgModule } from '@angular/core';
import { TreoFindByKeyPipe } from './find-by-key.pipe';

@NgModule({
    declarations: [
        TreoFindByKeyPipe
    ],
    exports     : [
        TreoFindByKeyPipe
    ]
})
export class TreoFindByKeyPipeModule
{
}
