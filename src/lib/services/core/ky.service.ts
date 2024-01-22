import { env } from '$env/dynamic/public';
import ky from 'ky';

const api = ky.create({
    prefixUrl: env.PUBLIC_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    credentials: 'include',
    hooks: {},
    timeout: 10000,
});

export default api;
