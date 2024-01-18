// ===============================================================
// Account Services
// ===============================================================

import type { ResetPasswordRequestViewModel } from "$lib/view-models/core/account/reset-password-request.view-model";
import type { UpdatePasswordRequestViewModel } from "$lib/view-models/core/account/update-password-request.view-model";
import api from "$lib/services/core/ky.service";

export class AccountService {

    // get the available role for the user
    static async getRoles(){

    }

    // trigger forgot password endpoint
    static async resetPassword(param:ResetPasswordRequestViewModel){

    }

    // trigger update paasword endpoint
    static async updatePassword(param: UpdatePasswordRequestViewModel){

    }
}