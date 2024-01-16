import { env } from '$env/dynamic/public';
import ky from 'ky';

const api = ky.create({
    prefixUrl: env.PUBLIC_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    hooks: {},
    timeout: 10000,
    
});

export default api;
