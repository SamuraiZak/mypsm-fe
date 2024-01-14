// ===============================================================
// HTTP Request Service
// ===============================================================

import ky from 'ky';

const http = ky.create({
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    hooks: {},
});

export default http;
