import type { IAppSettings } from '$lib/interfaces/core/appSettings.interface';
import { AppSettingsService } from '$lib/services/core/appSettings.service';

export class LantikanBaruService {
    public appSettingServices = new AppSettingsService();

    public appSettings: Promise<IAppSettings> =
        this.appSettingServices.loadAppsettingsAsync();

    public async getCandidateList() {
        const response = await fetch(
            `${(await this.appSettings).apiUrl}/api/auth/login`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        console.log(response);
    }
}
