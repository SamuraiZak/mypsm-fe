import type { IAppSettings } from '$lib/interfaces/core/appSettings.interface';

import settings from '../../settings/app-settings.json';

export class AppSettingsService {
    /**
     * loadAppsettingsAsync
     */
    public async loadAppsettingsAsync(): Promise<IAppSettings> {
        const appSettings: IAppSettings = {
            ...settings,
        };

        return appSettings;
    }
}
