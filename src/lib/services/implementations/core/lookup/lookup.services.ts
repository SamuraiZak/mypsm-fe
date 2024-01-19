// ===============================================================
// Lookup Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import { IDTypeListConvert } from "$lib/view-models/core/lookup/lookup-id-type-list-response.view-model";
import { RoleListConvert } from "$lib/view-models/core/lookup/lookup-role-list-response.view-model";

export class LookupService{

    // get all available role
    static async getEnumRoles(){

        // fetch
        const response: Response = await http
        .get('/authentication/login-employee', {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return RoleListConvert.fromResponse(response);
    }

    // get all login option
    static async getEnumIdType(){

        // fetch
        const response: Response = await http
        .get('/authentication/login-employee', {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return IDTypeListConvert.fromResponse(response);
    }
}