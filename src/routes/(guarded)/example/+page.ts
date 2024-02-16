import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    // get current role to restricted the access
    let currentRole = localStorage.getItem(LocalStorageKeyConstant.currentRole);

    return {
        props: {
            currentRole,
        },
    };
};
