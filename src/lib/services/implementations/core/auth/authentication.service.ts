// ===============================================================
// Authentication Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import type { AuthenticationRequestViewModel } from "$lib/view-models/core/auth/auth-request.view-model";
import { AuthenticationResponseConvert } from "$lib/view-models/core/auth/auth-response.view-model";
import { EnumRoleResponseConvert } from "$lib/view-models/core/lookup/role/role-enum-reponse.view-model";

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

    // get all roles available
    static async getRoleOptions(){
        const response: Response = await http.get('/lookups/roles').json();

        return EnumRoleResponseConvert.fromResponse(response);
    }
}