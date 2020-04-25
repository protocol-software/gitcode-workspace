import { NgModule } from '@angular/core';
import { TreoMediaWatcherService } from './media-watcher.service';

@NgModule({
    providers: [
        TreoMediaWatcherService
    ]
})
export class TreoMediaWatcherModule
{
    /**
     * Constructor
     *
     * @param {TreoMediaWatcherService} _treoMediaWatcherService
     */
    constructor(
        private _treoMediaWatcherService: TreoMediaWatcherService
    )
    {
    }
}
