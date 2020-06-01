import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TreoMediaWatcherModule } from './services/media-watcher/media-watcher.module';
import { TreoSplashScreenModule } from './services/splash-screen/splash-screen.module';

@NgModule({
    imports  : [
        TreoMediaWatcherModule,
        TreoSplashScreenModule
    ],
    providers: [
        {
            // Use the 'fill' appearance on form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class TreoModule
{
    /**
     * Constructorw
     *
     * @param parentModule
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: TreoModule
    )
    {
        if ( parentModule )
        {
            throw new Error('TreoModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
