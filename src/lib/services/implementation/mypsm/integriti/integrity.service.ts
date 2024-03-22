// ===============================================================
// Integrity Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import type { SurcajServiceDetailResponseDTO } from '$lib/dto/mypsm/integrity/surcaj/surcaj--service-detail-response.dto';
import type { SurcajApplicationDetailResponseDTO } from '$lib/dto/mypsm/integrity/surcaj/surcaj-application-detail-response.dto';
import type { SurcajEmployeeDetailResponseDTO } from '$lib/dto/mypsm/integrity/surcaj/surcaj-employee-detail-response.dto';
import type { SurcajMeetingDetailResponseDTO } from '$lib/dto/mypsm/integrity/surcaj/surcaj-meeting-detail-response.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class IntegrityServices {
    static async method(param: CommonListRequestDTO) {
        try {
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


    // ===================================================
    // ============ list table surcaj kakitangan =========
    // ==================================================

    static async getSurcajListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/surcharge/employee_lists';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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


    // ===================================================
    // ============ list table surcaj Pengarah =========
    // ==================================================

    static async getDirectorSurcajListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/surcharge/list';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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

    // ===================================================
    // ============ list table Tambah rekod =========
    // ==================================================

    static async getSurcajListAddDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'integrity/surcharge/add';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
            const response: Response = await promiseRes;

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

    // ==================================================
    // ============ employee Detail =====================
    // ==================================================


    static async surcajEmployeeDetails(param: commonIdRequestDTO) {
        try {
            const url: Input = 'integrity/surcharge/view';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url, { body: JSON.stringify(param) }).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

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

      // ==================================================
    // ============ Service Detail =====================
    // ==================================================


    static async surcajServiceDetailDetails(param: SurcajServiceDetailResponseDTO) {
        try {
            const url: Input = 'integrity/surcharge/view';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url, { body: JSON.stringify(param) }).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

      // ==================================================
    // ============ Application Detail =====================
    // ==================================================


    static async surcajApplicationDetailDetails(param: SurcajApplicationDetailResponseDTO) {
        try {
            const url: Input = 'integrity/surcharge/view';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url, { body: JSON.stringify(param) }).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

      // ==================================================
    // ============ Meeting Detail =====================
    // ==================================================


    static async surcajMeetingDetailDetails(param: SurcajMeetingDetailResponseDTO) {
        try {
            const url: Input = 'integrity/surcharge/view';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url, { body: JSON.stringify(param) }).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }





}
