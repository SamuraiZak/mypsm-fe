import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { redirect } from '@sveltejs/kit';

export const load = async()=> {
    let token: string | null = localStorage.getItem(
        LocalStorageKeyConstant.accessToken,
    );

    if (token == null) {
        throw redirect(302, '/login');
    }
}
