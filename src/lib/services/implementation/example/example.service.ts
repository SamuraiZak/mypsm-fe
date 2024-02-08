// ===============================================================
// Example Service
// Notes: Any other service made must follow this standard
// How to use :
// let example : CommonResponseDTO = ExampleServices.methodName(param);
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ExampleServices {
    // POST: getting list of data example
    // strictly required the parameter type as CommonListRequestDTO
    // return type CommonResponseConvert
    static async postExampleList(param: CommonListRequestDTO) {
        try {
            // edit the endpoint url here without the prefix
            // e.g RAW URL = localhost:3333/api/v1/example/get-example
            // url: Input = example/get-example
            let url: Input = '';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

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

    // POST: getting details of a data
    // parameter must be of type object
    // return type CommonResponseConvert
    static async postExampleDetail(param: object) {
        try {
            // edit the endpoint url here without the prefix
            // e.g RAW URL = localhost:3333/api/v1/example/get-example
            // url: Input = example/get-example
            let url: Input = '';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // PUT: adding or editing data
    // parameter must be of type object
    // return type CommonResponseConvert
    static async putExampleAddorEdit(param: object) {
        try {
            // edit the endpoint url here without the prefix
            // e.g RAW URL = localhost:3333/api/v1/example/get-example
            // url: Input = example/get-example
            let url: Input = '';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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

    // GET: getting list of data example
    // no parameter needed
    // return type CommonResponseConvert
    // e.g getting lookup
    static async getExampleList() {
        try {
            // edit the endpoint url here without the prefix
            // e.g RAW URL = localhost:3333/api/v1/example/get-example
            // url: Input = example/get-example
            let url: Input = '';

            const response: Response = await http.post(url).json();

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
