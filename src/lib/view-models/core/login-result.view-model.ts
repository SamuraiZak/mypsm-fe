import type { IUser } from '$lib/interfaces/core/user.interface';

export interface LoginResultViewModel {
    accessToken: string;
    userInfo: IUser;
}
