import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';

export class TokenHelper {
    static async saveToken(token: string) {
        try {
            localStorage.setItem(LocalStorageKeyConstant.accessToken, token);

            return true;
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }
}
