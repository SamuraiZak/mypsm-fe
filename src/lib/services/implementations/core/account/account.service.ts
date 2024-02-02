// ===============================================================
// Account Services
// ===============================================================


import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { TextHelper } from "$lib/helper/core/text-helper/text-helper";
import api from "$lib/services/core/ky.service";
import http from "$lib/services/provider/service-provider.service";
import { ResetPasswordRequestConvert, type ResetPasswordRequestViewModel } from "$lib/view-models/core/account/reset-password/reset-password-request.view-model";
import { ResetPasswordResponseConvert } from "$lib/view-models/core/account/reset-password/reset-password-response.view-model";
import { UpdatePasswordRequestConvert, type UpdatePasswordRequestViewModel } from "$lib/view-models/core/account/update-password/update-password-request.view-model";
import { UpdatePasswordResponseConvert } from "$lib/view-models/core/account/update-password/update-password-response.view-model";
import type { RoleOption } from "$lib/view-models/core/role-option/role-option.view-model";
import type { Input } from "ky";

export class AccountService {

    // get the available role for the user
    // authentication service for all types of user
    static async getRoles() {

        let roleResponse : RoleOption[];
        try {
            let url: Input = "personal-details/get-user-roles";

            const httpResponse: Response = await http
                .get(url);

            const response = await httpResponse.json();

            const result = CommonResponseConvert.fromResponse(response);

            

            if (result.status == "success") {
                 roleResponse = result.data?.dataList?.map((item)=>({
                    value: item.name,
                    name: TextHelper.toCamelCase(item.name),
                })) as RoleOption[];
                return roleResponse;
            }else{
                roleResponse = [
                    {
                        value : "undefined",
                        name:"undefined",
                    }
                ]

                return roleResponse;
            }
        } catch (error) {
            roleResponse = [
                {
                    value : "undefined",
                    name:"undefined",
                }
            ]
            return roleResponse;
        }
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