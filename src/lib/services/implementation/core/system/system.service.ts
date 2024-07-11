import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import { toasterGetMethod } from "$lib/helpers/core/french-toast.helper";
import type { Input } from "ky";
import http from "../../service-provider.service";

export class SystemServices {
    // get current user details
    static async getAccountDetails() {
       try {
          let url: Input = 'auth/detail';
          const promiseResponse: Promise<Response> = http.get(url, {}).json();
          const response = await toasterGetMethod(promiseResponse);
          const result = CommonResponseConvert.fromResponse(response);
          if (result.status == 'success') {
             return result;
          } else {
             return CommonResponseConstant.httpError;
          }
       } catch (error) {
          return CommonResponseConstant.httpError;
       }
    }
}