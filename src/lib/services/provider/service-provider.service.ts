// ===============================================================
// Service Provider
// ===============================================================

import { env } from '$env/dynamic/public';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import { AuthenticationHelper } from '$lib/helper/core/authentication-helper/authentication-helper';
import ky from 'ky';

const http = ky.create({
    prefixUrl: env.PUBLIC_BASE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    credentials: 'include',
    hooks: {
        beforeRequest:[
            request => {
                const token = localStorage.getItem(LocalStorageKeyConstant.accessToken);

                if (token != null) {
                    
                    request.headers.set('Authorization', `${token}`);
                }
			}
        ]
    },
});

export default http;
