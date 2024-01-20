// ===============================================================
// Account Services
// ===============================================================


import api from "$lib/services/core/ky.service";
import http from "$lib/services/provider/service-provider.service";
import { ResetPasswordRequestConvert, type ResetPasswordRequestViewModel } from "$lib/view-models/core/account/reset-password/reset-password-request.view-model";
import { ResetPasswordResponseConvert } from "$lib/view-models/core/account/reset-password/reset-password-response.view-model";
import { UpdatePasswordRequestConvert, type UpdatePasswordRequestViewModel } from "$lib/view-models/core/account/update-password/update-password-request.view-model";
import { UpdatePasswordResponseConvert } from "$lib/view-models/core/account/update-password/update-password-response.view-model";

export class AccountService {

    // get the available role for the user
    static async getRoles(){

    }

    // forgot password will trigger this service to reset the user accnount password
    static async resetPassword(param:ResetPasswordRequestViewModel){
        // fetch
        const response: Response = await http
        .post('/authentication/reset-password', {
            body: ResetPasswordRequestConvert.toJson(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return ResetPasswordResponseConvert.fromResponse(response);
    }

    // trigger update paasword endpoint
    static async updatePassword(param: UpdatePasswordRequestViewModel){
        // fetch
        const response: Response = await http
        .post('/authentication/update-password', {
            body: UpdatePasswordRequestConvert.toJson(param),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        .json();

        return UpdatePasswordResponseConvert.fromResponse(response);

    }
}