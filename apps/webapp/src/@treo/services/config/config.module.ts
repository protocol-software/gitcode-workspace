import { ModuleWithProviders, NgModule } from '@angular/core';
import { TreoConfigService } from './config.service';
import { TREO_APP_CONFIG } from './config.constants';

@NgModule()
export class TreoConfigModule
{
    /**
     * Constructor
     *
     * @param {TreoConfigService} _treoConfigService
     */
    constructor(
        private _treoConfigService: TreoConfigService
    )
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<any>
    {
        return {
            ngModule : TreoConfigModule,
            providers: [
                {
                    provide : TREO_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
