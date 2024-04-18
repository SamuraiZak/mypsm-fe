// ===============================================================
// Buku Rekod Perkhidmatan Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ServiceRecordServices {
    // get personal info
    static async getPersonalDetails() {
        try {
            const url: Input = 'service_record/personal_detail';

            // get the promise response
            const response: Response = await http.get(url).json();

            // parse the json response to object
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

    // get list of qualifications
    static async getQualificationList() {
        try {
            const url: Input = 'service_record/qualification';

            // get the promise response
            const response: Response = await http.get(url).json();

            // parse the json response to object
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

    // get list of service statement
    static async getServiceStatementList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'service_record/service_statement';

            // get the promise response
            const response: Response = await http
                .post(url, { body: CommonListRequestConvert.toJson(param) })
                .json();

            // parse the json response to object
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

    // get list of leave statement
    static async getLeaveStatementList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'service_record/leave_statement';

            // get the promise response
            const response: Response = await http
                .post(url, { body: CommonListRequestConvert.toJson(param) })
                .json();

            // parse the json response to object
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

    // get list of beahviour histories
    static async getBehaviourHistoriesList(param: CommonListRequestDTO) {
        try {
            const url: Input = 'service_record/behaviour_histories';

            // get the promise response
            const response: Response = await http
                .post(url, { body: CommonListRequestConvert.toJson(param) })
                .json();

            // parse the json response to object
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
