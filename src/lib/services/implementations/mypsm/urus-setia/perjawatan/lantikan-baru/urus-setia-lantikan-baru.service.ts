// ===============================================================
// Urus-Setia (Lantikan Baru) Services
// ===============================================================

import http from '$lib/services/core/http.service';

export class UrusSetiaLantikanBaruService {
    constructor() {}

    async getListNewHire(param: unknown) {
        const response: Response = await http
            .post('http://127.0.0.1:3333/api/v1/authentication/login', {
                body: JSON.stringify(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                prefixUrl: '',
            })
            .json();

        return response;
    }
}
