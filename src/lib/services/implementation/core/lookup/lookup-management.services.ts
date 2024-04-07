// ===============================================================
// Lookup Management Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type {
    LookupCategoryDTO,
    LookupItemDTO,
    LookupTypeDTO,
} from '$lib/dto/core/lookup/lookup-item.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LookupManagementServices {
    static async getCategoryList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'lookup/editable';

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

    // get category list
    static async getLookupList(
        param: CommonListRequestDTO,
        type: LookupCategoryDTO,
    ) {
        try {
            let url: Input = type.url + '/filter';

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

    // add new lookup by category
    static async add(param: object, type: LookupCategoryDTO) {
        try {
            let url: Input = type.url + '/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // edit lookup by category
    static async edit(param: object, type: LookupCategoryDTO) {
        try {
            let url: Input = type.url + '/edit';

            const promiseResponse: Promise<Response> = http
                .put(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

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

    // get list
    static async getList(type: LookupTypeDTO) {
        try {
            let url: Input = type.get;

            const response: Response = await http.get(url).json();

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

    // filter list
    static async filterList(param: CommonListRequestDTO, type: LookupTypeDTO) {
        try {
            let url: Input = type.filterUrl;

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
}
