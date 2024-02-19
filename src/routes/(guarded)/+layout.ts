import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { error, redirect } from '@sveltejs/kit';

export const load = async () => {
    let token: string | null = localStorage.getItem(
        LocalStorageKeyConstant.accessToken,
    );

    // get current user's fullname
    let currentFullName: string =
        localStorage.getItem(LocalStorageKeyConstant.fullName) ?? 'unknown';

    // get current user's fullname
    let currentRole: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRole) ?? 'unknown';
    // get current user's fullname
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    if (token == null) {
        throw error(401, 'Unauthorised Access');
    }

    return {
        props: {
            currentFullName,
            currentRole,
            currentRoleCode,
        },
    };
};
