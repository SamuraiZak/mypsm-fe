import { env } from '$env/dynamic/public';
import ky from 'ky';

const api = ky.create({
    prefixUrl: env.PUBLIC_BASE_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    hooks:{}
});

export default api;
