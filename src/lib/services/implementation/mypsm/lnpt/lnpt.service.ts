// ===============================================================
// LNPT Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { ApcAddConvert, type ApcAddDTO } from '$lib/dto/mypsm/lnpt/apc-add.dto';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class LNPTServices {
    static async getApcHistory(param: CommonListRequestDTO) {
        try {
            let url: Input = 'performance/apc/histories';

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

    static async addApcRecord(param: ApcAddDTO) {
        try {
            let url: Input = 'performance/apc/add';

            const response: Response = await http
                .post(url, {
                    body: ApcAddConvert.toJson(param),
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

    static async getAveragePermanent(param: CommonListRequestDTO) {
        try {
            let url: Input = 'performance/average/permanent';

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

    static async getAverageProbation(param: CommonListRequestDTO) {
        try {
            let url: Input = 'performance/average/probation';

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
