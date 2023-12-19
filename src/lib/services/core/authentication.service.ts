/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IAppSettings } from '$lib/interfaces/core/appSettings.interface';
import type { LoginRequestViewModel } from '$lib/view-models/core/login-request.view-model';
import type { LoginResultViewModel } from '$lib/view-models/core/login-result.view-model';
import { Expose, Transform, Type, plainToClass } from 'class-transformer';
import { AppSettingsService } from './appSettings.service';

export class AuthenticationService {
    // load appsettings
    public appSettingServices = new AppSettingsService();

    public appSettings: Promise<IAppSettings> =
        this.appSettingServices.loadAppsettingsAsync();

    public async login(request: LoginRequestViewModel) {
        console.log(this.appSettings);

        const response = await fetch(
            `${(await this.appSettings).apiUrl}/api/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const result:LoginResponse = await response.json();

        console.log(result);
    }
}

class LoginResponse {
    public token!: string;

    public message!: string;

    public success!: boolean;

    public expiry!: string;
}
