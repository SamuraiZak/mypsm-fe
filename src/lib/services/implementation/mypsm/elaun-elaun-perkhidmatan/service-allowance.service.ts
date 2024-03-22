// ===============================================================
// Service Allowance Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    ServiceAllowanceAPIConstant,
    ServiceAllowanceTypeConstant,
} from '$lib/constants/core/service-allowance.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { ServiceAllowanceViewRequestDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ServiceAllowanceServices {
    // POST: get list of allowance
    static async getAllowanceList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'service_allowance/list';

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

    // GET: get application detail
    static async viewApplication(param: ServiceAllowanceViewRequestDTO) {
        try {
            let url: Input = '';

            switch (param.allowanceTypeCode) {
                case ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code:
                    url = ServiceAllowanceAPIConstant.ceremonyDress.view;
                    break;
                case ServiceAllowanceTypeConstant.bantuanPakaianPanas.code:
                    url = ServiceAllowanceAPIConstant.warmClothes.view;
                    break;
                case ServiceAllowanceTypeConstant.tambangMengunjungiWilayahAsal
                    .code:
                    url = ServiceAllowanceAPIConstant.hometownVisit.view;
                    break;
                case ServiceAllowanceTypeConstant.bantuanMengurusJenazah.code:
                    url = ServiceAllowanceAPIConstant.funeral.view;
                    break;
                case ServiceAllowanceTypeConstant.tabungKebajikanKakitangan
                    .code:
                    url = ServiceAllowanceAPIConstant.welfareFund.view;
                    break;
                case ServiceAllowanceTypeConstant.perpindahanRumah.code:
                    url = ServiceAllowanceAPIConstant.houseMoving.view;
                    break;
                case ServiceAllowanceTypeConstant.pembayaranBalikPassport.code:
                    url = ServiceAllowanceAPIConstant.passportClaim.view;
                    break;
                case ServiceAllowanceTypeConstant.insuransKesihatan.code:
                    url = ServiceAllowanceAPIConstant.healthInsurance.view;
                    break;
                case ServiceAllowanceTypeConstant.bayaranBalikPengangkutanBarang
                    .code:
                    url = ServiceAllowanceAPIConstant.shippingClaim.view;
                    break;

                default:
                    url = ServiceAllowanceAPIConstant.ceremonyDress.view;
                    break;
            }

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

    // POST: add application detail for Ceremony Dress
    static async addInfoCeremonyDress(param: string) {
        try {
            let url: Input = 'service_allowance/ceremony_clothing/add_base64';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: param,
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
}
