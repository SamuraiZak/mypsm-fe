// ===============================================================
// Service Provider
// ===============================================================

import { env } from '$env/dynamic/public';
import ky from 'ky';

const http = ky.create({
    prefixUrl: env.PUBLIC_BASE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    credentials: 'include',
    hooks: {},
});

export default http;
