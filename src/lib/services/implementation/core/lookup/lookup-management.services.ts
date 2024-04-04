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

    static async getTypeList(param: CommonListRequestDTO) {
        try {
            let list: LookupTypeDTO[] = LookupItemConstant.list;
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

    // add list
    static async add(param: LookupItemDTO, type: LookupTypeDTO) {
        try {
            let url: Input = type.add;

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(responsePromise);

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

    // edit list
    static async edit(param: LookupItemDTO, type: LookupTypeDTO) {
        try {
            let url: Input = type.edit;

            const responsePromise: Promise<Response> = http
                .put(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(responsePromise);

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
