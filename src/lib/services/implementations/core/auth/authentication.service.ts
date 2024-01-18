// ===============================================================
// Authentication Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import type { AuthenticationRequestViewModel } from "$lib/view-models/core/auth/auth-request.view-model";
import { AuthenticationResponseConvert } from "$lib/view-models/core/auth/auth-response.view-model";

export class AuthService {

    // login service for employee
    static async loginEmployee(param: AuthenticationRequestViewModel){
        const response: Response = await http
        .post('/authentication/login-employee', {
            body: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return AuthenticationResponseConvert.fromResponse(response);
    }

    // login service for candidate
    static async loginCandidate(param: AuthenticationRequestViewModel){
        const response: Response = await http
        .post('/authentication/login-candidate', {
            body: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return AuthenticationResponseConvert.fromResponse(response);
    }

    // login service for panel clinic
    static async loginClinic(param: AuthenticationRequestViewModel){
        const response: Response = await http
        .post('/authentication/login-candidate', {
            body: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return AuthenticationResponseConvert.fromResponse(response);
    }
}