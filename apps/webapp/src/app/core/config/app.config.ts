import { Layout } from '../../layout/layout.types';

// Theme type
export type Theme = 'light' | 'dark';

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig
{
    theme: Theme;
    layout: Layout;
    defaultLang: string;
}

/**
 * Default configuration for the entire application. This object is used by
 * 'ConfigService' to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * 'ConfigService'.
 */
export const appConfig: AppConfig = {
    theme : 'light',
    layout: 'modern',
    defaultLang: 'ko',
};
