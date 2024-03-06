import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import type { Input } from 'postcss';



export class ProfileServices {


    // static async getPTBKWAPPersonalDetails(
    //     param: PTBIDRequestBody,
    // ) {
    //     try {
    //         const url: Input = 'employment/pension_detail/personal_details/get';

    //         // get the promise response
    //         const promiseRes: Promise<Response> = http
    //             .post(url, {
    //                 body: JSON.stringify(param),
    //             })
    //             .json();

    //         // await toast for resolved or rejected state
    //         const response: Response = await promiseRes;

    //         // parse the json response to object
    //         const result = CommonResponseConvert.fromResponse(response);

    //         if (result.status == 'success') {
    //             return result;
    //         } else {
    //             return CommonResponseConstant.httpError;
    //         }
    //     } catch (error) {
    //         return CommonResponseConstant.httpError;
    //     }
    // }





}
