import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { Input } from 'ky';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '../../service-provider.service';
import { loanIdRequestDTOConvert, type loanIdRequestDTO } from '$lib/dto/mypsm/pinjaman/loan-ID.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { vechicalDetailConvert, type vechicalDetail } from '$lib/dto/mypsm/pinjaman/vehical-detail.dto';
import { OfferedLoanConvert, type OfferedLoan } from '$lib/dto/mypsm/pinjaman/offered-loan-detail.dto';
import { suppliersConvert, type Supplier,  } from '$lib/dto/mypsm/pinjaman/supplier-detail.dto';
import { VehicleFirstScheduleConvert, type VehicleFirstSchedule } from '$lib/dto/mypsm/pinjaman/car-first-schedule-detail.dto';
import { FirstScheduleConvert, type FirstSchedule } from '$lib/dto/mypsm/pinjaman/first-schedule.dto';
import { SecondScheduleConvert, type SecondSchedule } from '$lib/dto/mypsm/pinjaman/second-schedule.dto';
import { SupportApproverConvert, type SupportApprover } from '$lib/dto/mypsm/pinjaman/support-approval-detail.dto';
import { ApproverConvert, type Approver } from '$lib/dto/mypsm/pinjaman/approver-detail.dto';
import { ApproverApprovalConvert, type ApproverApproval } from '$lib/dto/mypsm/pinjaman/approver-approval-detail.dto';

export class LoanServices{
    // table

    static async getLoanListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'loan/list';

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

    //============================================
    //========= Get Personal Detail ==============
    //============================================
    static async getProfilePersonalDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/personal_detail/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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
     //============================================
    //========= Loan Detail==============
    //============================================

    static async getLoanDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/detail/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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


    //============================================
    //=========Vehicle Detail==============
    //============================================
    
    static async getVehicleDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/vehicle_detail/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

    //============================================
    //=========Get Document==============
    //============================================
    
    static async getDocument(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/document/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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



     //============================================
    //========= Offer Loan Detail==============
    //============================================


    static async getOfferLoanDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/offered_loan/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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


     //============================================
    //========= Supplier ==============
    //============================================

    static async getSupplierDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/supplier/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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


    //============================================
    //========= Agreement Letter ==============
    //============================================

    static async getAgreementLetter(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/agreement_letter/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

     //============================================
    //========= Agreement Form ==============
    //============================================

    static async getAgreementForm(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/agreement_letter/form';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

    //============================================
    //========= Jadual Pertama (Kenderaan) =======
    //============================================

    static async getVehicleFirstScheduleDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/first_schedule/vehicle/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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


    //============================================
    //========= Jadual Pertama  =======
    //============================================

    static async getFirstScheduleDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/first_schedule/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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


    //============================================
    //========= Jadual Kedua =======
    //============================================


    static async getSecondScheduleDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/second_schedule/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

    //============================================
    //========= Payment Document =================
    //============================================


    static async getPaymentDocument(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/payment_document/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

///=====================================================
//================ Supporter approval =================
//=====================================================


    static async getSupporterApprovalDetails(param: loanIdRequestDTO) {
        try {
            let url: Input = 'loan/supporter_approval/get';

            const response: Response = await http
                .post(url, {
                    body: loanIdRequestDTOConvert.toJson(param),
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

///=====================================================
//================ Approver ======================
//=====================================================


static async getApproverDetails(param: loanIdRequestDTO) {
    try {
        let url: Input = 'loan/get_approver';

        const response: Response = await http
            .post(url, {
                body: loanIdRequestDTOConvert.toJson(param),
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

//=====================================================
//================ Approver approval ==================
//=====================================================

static async getApproverApprovalDetails(param: loanIdRequestDTO) {
    try {
        let url: Input = 'loan/approver_approval/get';

        const response: Response = await http
            .post(url, {
                body: loanIdRequestDTOConvert.toJson(param),
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

// ==========================================================================================
// ======================================= Add ==============================================
// ==========================================================================================

//============================================
 //========= Add Loan ==================
//============================================

static async addLoan(param: loanIdRequestDTO) {
    try {
        let url: Input = 'loan/addd';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: loanIdRequestDTOConvert.toJson(param),
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
 //============================================
 //========= Add Loan Detail==================
//============================================

static async addLoanDetail(param: loanIdRequestDTO) {
    try {
        let url: Input = 'loan/detail/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: loanIdRequestDTOConvert.toJson(param),
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

 //============================================
 //========= Add Vehicle Detail==================
//============================================

static async addVehicleDetail(param:vechicalDetail) {
    try {
        let url: Input = 'loan/vehicle_detail/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: vechicalDetailConvert.toJson(param),
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
 //============================================
 //========= Add Document ====================
//============================================

static async addDocument(param: string) {
    try {
        let url: Input = 'loan/document/add';
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

 //============================================
 //========= Add offer Loan Detail ============
//============================================

static async offerLoanDetail(param: OfferedLoan) {
    try {
        let url: Input = 'loan/offered_loan/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: OfferedLoanConvert.toJson(param),
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

 //============================================
 //========= Add Supplier Detail ============
//============================================

static async supplierDetail(param: Supplier) {
    try {
        let url: Input = 'loan/supplier/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: suppliersConvert.toJson(param),
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

 //============================================
 //========= Add Agreement Letter ============
//============================================

static async addAgreementLetter(param: loanIdRequestDTO) {
    try {
        let url: Input = 'loan/agreement_letter/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: loanIdRequestDTOConvert.toJson(param),
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
 //============================================
 //========= Add Jadual Pertama (Kenderaan) =======
 //============================================

    static async addVehicleFirstScheduleDetail(param: VehicleFirstSchedule) {
        try {
            let url: Input = 'loan/first_schedule/vehicle/add';
    
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: VehicleFirstScheduleConvert.toJson(param),
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

//============================================
 //========= Add Jadual Pertama ===============
 //============================================

 static async addFirstScheduleDetail(param: FirstSchedule) {
    try {
        let url: Input = 'loan/first_schedule/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: FirstScheduleConvert.toJson(param),
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

//============================================
 //========= Add Jadual Kedua ===============
 //============================================

 static async addSecondScheduleDetail(param: SecondSchedule) {
    try {
        let url: Input = 'loan/second_schedule/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: SecondScheduleConvert.toJson(param),
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

//============================================
 //========= Add Payment Document ===============
 //============================================

static async addPaymentDocument(param: string) {
    try {
        let url: Input = 'loan/payment_document/add';
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

//============================================
 //========= Add Support Approval ===============
 //============================================

 static async addSupportApproval(param: SupportApprover) {
    try {
        let url: Input = 'loan/supporter_approval/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: SupportApproverConvert.toJson(param),
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

//============================================
 //========= Add Approver ===============
 //============================================

 static async addApprover(param: Approver) {
    try {
        let url: Input = 'loan/add_approver';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: ApproverConvert.toJson(param),
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

//============================================
 //========= Add Approver Approval ===============
 //============================================

 static async addApproverApproval(param: ApproverApproval) {
    try {
        let url: Input = 'loan/approver_approval/add';

        const promiseRes: Promise<Response> = http
            .post(url, {
                body: ApproverApprovalConvert.toJson(param),
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



// ==========================================================================================
// ======================================= Edit =============================================
// ==========================================================================================



    
}