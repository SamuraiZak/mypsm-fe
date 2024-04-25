// ===============================================================
// Quarters Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert, type CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { QuartersAddConfirmationConvert, type QuartersAddConfirmation } from '$lib/dto/mypsm/pinjaman/kuarters/application-confirmation.dto';
import { OutsiderFamilyConvert, type OutsiderFamily } from '$lib/dto/mypsm/pinjaman/kuarters/application-partner-detail.dto';
import { QuartersPersonalDetailConvert, type QuartersPersonalDetail } from '$lib/dto/mypsm/pinjaman/kuarters/application-personal-detail.dto';
import { OutsiderServiceDetailDetailConvert, type OutsiderServiceDetail } from '$lib/dto/mypsm/pinjaman/kuarters/application-service-detail.dto';
import { movingOutSetDirectorConvert, type MovingOutSetDirector } from '$lib/dto/mypsm/pinjaman/kuarters/moving-out-set-director.dto';
import { MoveOutConvert, type MoveOutQuarters } from '$lib/dto/mypsm/pinjaman/kuarters/moving-out.dto';
import { OutsiderIdConvert, type OutsiderId } from '$lib/dto/mypsm/pinjaman/kuarters/outsider-id.dto';
import { QuarterCommonApprovalConvert, QuarterSecretaryApprovalConvert, type QuarterCommonApproval, type QuarterSecretaryApproval } from '$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto';
import { QuarterDetailsConvert, QuarterPaymentConvert, type QuarterDetails, type QuarterPayment } from '$lib/dto/mypsm/pinjaman/kuarters/quarter-details.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class QuartersServices {
    //=================================================
    // Moving In Employee
    //=================================================
    //get moving in list
    static async getMovingInList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/list';

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

    // apply quarters
    static async addMovingInApplication() {
        try {
            const url: Input = 'quarter/moving_in/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            // const response: Response = await promiseRes;

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
    //add move out for employee
    static async addMovingOutEmployee(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //add move out for outsider
    static async addMovingOutForOutsider(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/outsider/moving_out/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    
    // get employee before register personal detail
    static async getEmployeePersonalDetail() {
        try {
            const url: Input = 'quarter/moving_out/personal_detail';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get moving in personal detail
    static async getApplicationPersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/personal_detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //get moving in service detail
    static async getApplicationServiceDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/service_detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //get moving in partner detail
    static async getApplicationPartnerDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/partner_detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add application confirmation
    static async addApplicationConfirmation(param: QuartersAddConfirmation) {
        try {
            let url: Input = 'quarter/moving_in/confirmation/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuartersAddConfirmationConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application confirmation
    static async getApplicationConfirmationDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/confirmation/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add quarters document
    static async addUploadDocument(param: string) {
        try {
            let url: Input = 'quarter/moving_in/document/upload';
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application documents
    static async getApplicationDocuments(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/document/download';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add application secretary approval
    static async addApplicationSecretaryApproval(param: QuarterSecretaryApproval) {
        try {
            let url: Input = 'quarter/moving_in/secretary_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterSecretaryApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get application secretary approval
    static async getApplicationSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/secretary_approval/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //add quarter payment
    static async addQuarterPayment(param: QuarterPayment) {
        try {
            let url: Input = 'quarter/moving_in/payment_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterPaymentConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get quarter payment
    static async getQuarterPayment(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/payment_detail/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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


    //get employee eligibility
    static async getEligibility(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/eligibility';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add quarter details
    static async addApplicationQuarterDetails(param: QuarterDetails) {
        try {
            let url: Input = 'quarter/moving_in/quarter_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterDetailsConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get quarters detail
    static async getApplicationQuarterDetails(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/quarter_detail/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add application director approval
    static async addApplicationDirectorApproval(param: QuarterCommonApproval) {
        try {
            let url: Input = 'quarter/moving_in/director_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get director approval
    static async getApplicationDirectorApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_in/director_approval/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //=================================================
    // Moving Out Employee
    //=================================================
    //get moving in list
    static async getMovingOutList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/list';

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
    //get moving out personal employee detail
    static async getOutPersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/personal_detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //get moving out employee service detail
    static async getOutServiceDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/service_detail';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add move out date for employee
    static async addEmployeeMoveOut(param: MoveOutQuarters) {
        try {
            let url: Input = 'quarter/moving_out/quarter_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MoveOutConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
     //get move out date for employee
     static async getEmployeeMoveOut(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/quarter_detail/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add outstanding document
    static async addOutstandingDocument(param: string) {
        try {
            let url: Input = 'quarter/moving_out/outstanding_document/upload';
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get outstanding documents
    static async getOutstandingDocuments(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/outstanding_document/download';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    // add moving out document
    static async addMovingOutDocument(param: string) {
        try {
            let url: Input = 'quarter/moving_out/document/upload';
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: param,
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get moving out documents
    static async getMovingOutDocuments(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/document/download';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add moving out confirmation
    static async addMovingOutConfirmation(param: QuartersAddConfirmation) {
        try {
            let url: Input = 'quarter/moving_out/confirmation/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuartersAddConfirmationConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get moving out confirmation
    static async getMovingOutConfirmationDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/confirmation/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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

    //add moving out secretary approval
    static async addMovingOutSecretaryApproval(param: QuarterSecretaryApproval) {
        try {
            let url: Input = 'quarter/moving_out/secretary_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuarterCommonApprovalConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get moving out secretary approval
    static async getMovingOutSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/secretary_approval/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //add moving out director
    static async addMovingOutDirector(param: MovingOutSetDirector) {
        try {
            let url: Input = 'quarter/moving_out/director/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: movingOutSetDirectorConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get moving out director
    static async getMovingOutDirector(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/moving_out/director/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
//add mmoving out director approval
static async addMovingOutDirectorApproval(param: QuarterCommonApproval) {
    try {
        let url: Input = 'quarter/moving_out/director_approval/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: QuarterCommonApprovalConvert.toJson(param),
            })
            .json();

        const response: Response = await getPromiseToast(promiseRes);
        const result = CommonResponseConvert.fromResponse(response);

        if (result.status == 'success') {
            invalidateAll()
            return result;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

//get mmoving out director approval
static async getMovingOutDirectorApproval(param: commonIdRequestDTO) {
    try {
        let url: Input = 'quarter/moving_out/director_approval/get';

        const response: Response = await http
            .post(url, {
                body: commonIdRequestDTOConvert.toJson(param),
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

    //================================================
    // Outsider Application
    //================================================
    //add outsider personal detail
    static async addOutsiderPersonalDetail(param: QuartersPersonalDetail) {
        try {
            let url: Input = 'quarter/outsider/personal_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: QuartersPersonalDetailConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get outsider personal detail
    static async getOutsiderPersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/outsider/personal_detail/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    static async addOutsiderFamily(param: OutsiderFamily) {
        try {
            let url: Input = 'quarter/outsider/family/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: OutsiderFamilyConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get outsider family detail
    static async getOutsiderPartnerDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/outsider/family/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    static async addOutsiderService(param: OutsiderServiceDetail) {
        try {
            let url: Input = 'quarter/outsider/service_detail/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: OutsiderServiceDetailDetailConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get outsider service detail
    static async getOutsiderServiceDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'quarter/outsider/service_detail/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
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
    //register outsider to moving in list
    static async addOutsiderApplication(param: OutsiderId) {
        try {
            let url: Input = 'quarter/outsider/moving_in/add';

            const response: Response = await http
                .post(url, {
                    body: OutsiderIdConvert.toJson(param),
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
