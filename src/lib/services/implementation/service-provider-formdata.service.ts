// ===============================================================
// Service Provider
// ===============================================================

import { env } from '$env/dynamic/public';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';

import ky from 'ky';

const httpFormData = ky.create({
    prefixUrl: env.PUBLIC_BASE_API_URL,
    headers: {
        Accept: 'multipart/form-data',
    },
    timeout: 25000,
    credentials: 'include',
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem(
                    LocalStorageKeyConstant.accessToken,
                );

                if (token != null) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
    },
});

export default httpFormData;