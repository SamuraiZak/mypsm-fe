// ===============================================================
// Medical Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert, type CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { ClaimIdRequestDTOConvert, type ClaimIdRequestDTO } from '$lib/dto/mypsm/perubatan/claim-id-request.dto';
import { ClinicCommonResultConvert, type ClinicCommonResult } from '$lib/dto/mypsm/perubatan/clinic-common-approval.dto';
import { ClinicSetSupporterApproverConvert, type ClinicSetSupporterApprover } from '$lib/dto/mypsm/perubatan/clinic-common-supporter-approver.dto';
import { ClinicClaimDetailConvert, type ClinicClaimDetail } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-detail.dto';
import { ClinicPanelProfileConvert, type ClinicPanelProfile } from '$lib/dto/mypsm/perubatan/clinic-panel-profile.dto';
import { TreatmentAddPatientConvert, type TreatmentAddPatient } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-patient.dto';
import { TreatmentAddTreatmentDetailConvert, type TreatmentAddTreatmentDetail } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-treatment-detail.dto';
import { MedicalClaimsAddConvert, type MedicalClaimsAdd } from '$lib/dto/mypsm/perubatan/medical-claim-add.dto';
import { MedicalClinicApplicationConvert, type MedicalClinicApplication } from '$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application.dto';
import { ClinicContractConvert, type ClinicContract } from '$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-contract.dto';
import { MedicalEmployeeMakePaymentConvert, type MedicalEmployeeMakePayment } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/employee-make-payment.dto';
import { ClinicAllocationConvert, ClinicAllocationEditConvert, CurrentYearAllocationConvert, type ClinicAllocation, type ClinicAllocationEdit, type CurrentYearAllocation } from '$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-allocation.dto';
import { MedicalClinicClaimSuppAppConvert, type MedicalClinicClaimSuppApp } from '$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-supporter-approver.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class MedicalServices {

    //==============================================================
    // Kakitangan    
    //==============================================================
    static async getMedicalClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/employee_claim/list';

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
    static async getMedicalAllocationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/payment/list';

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
    // get medical employee detail
    static async getMedicalEmployeeDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

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
    // add medical claim 
    static async addMedicalEmployeeClaims(param: MedicalClaimsAdd) {
        try {
            let url: Input = 'medical/employee_claim/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalClaimsAddConvert.toJson(param),
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

     // get medical claim
     static async getMedicalEmployeeClaimDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/employee_claim/view';

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
    // add employee claims document
    static async addEmployeeClaimDocument(param: string) {
        try {
            let url: Input = 'medical/employee_claim/upload';
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
    // get employee claim document
    static async getEmployeeClaimDocument(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/employee_claim/download';

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
    //==============================================================
    // Urus Setia    
    //==============================================================
    // Tuntutan Klinik Panel
    //==============================================================
    //get senarai tuntutan klinik panel table
    static async getMedicalClinicPanelClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/list';

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
    //get clinic detail
    static async getMedicalClinicClaimDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/clinic_detail/get';

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
    //get clinic calculation
    static async getMedicalClinicCalculation(param: ClaimIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/calculation/get';

            const response: Response = await http
                .post(url, {
                    body: ClaimIdRequestDTOConvert.toJson(param),
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
    //get clinic claim list
    static async getMedicalClinicClaimList(param: ClaimIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/calculation/list';

            const response: Response = await http
                .post(url, {
                    body: ClaimIdRequestDTOConvert.toJson(param),
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
    // set supporter and approver
    static async addMedicalClinicClaimSuppApp(param: MedicalClinicClaimSuppApp) {
        try {
            let url: Input = 'medical/clinic_claim/supporter_approver/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalClinicClaimSuppAppConvert.toJson(param),
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
    //get assigned supporter and approver
    static async getMedicalClinicClaimSuppApp(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/supporter_approver/get';

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
    //==============================================================
    // Urus Setia    
    //==============================================================
    // Tuntutan Kakitangan
    //==============================================================
    //get tuntutan kakitangan table
    static async getClinicEmployeeAllocation(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/allocation/claim/list';

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
    //get peruntukan kakitangan table
    static async getClinicEmployeeAllocationTable(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/allocation/list';

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
    //get pembayaran tuntutan table
    static async getClinicEmployeePaymentList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/allocation/payment/list';

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
    //get pembayaran tuntutan personal detail
    static async getClinicEmployeePaymentPersonalDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/payment/personal_detail/get';

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
    //get pembayaran tuntutan payment detail
    static async getClinicEmployeePaymentDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/payment/get';

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
    //get pembayaran tuntutan payment detail for employee
    static async getEmployeePaymenDetailForEmployee(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/payment/get';

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
    //get pembayaran tuntutan document for employee
    static async getPaymentDocuments(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/payment/download';

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
    //make pembayaran peruntukkan
    static async addEmployeeClaimPayment(param: MedicalEmployeeMakePayment) {
        try {
            let url: Input = 'medical/payment/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalEmployeeMakePaymentConvert.toJson(param),
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
    //make pembayaran peruntukkan secretary approval
    static async addPaymentSecretaryApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/allocation/payment/approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    
    //get secretary approval for payment
    static async getPaymentSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/payment/approval/get';

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
    //add secretary approval tuntutan kakitangan
    static async addEmployeeClaimSecretaryApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/allocation/secretary_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get secretary approval tuntutan kakitangan
    static async getEmployeeClaimSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/secretary_approval/get';

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
    //add supporter approver tuntutan kakitangan
    static async addEmployeeClaimSuppApp(param: MedicalClinicClaimSuppApp) {
        try {
            let url: Input = 'medical/allocation/supporter_approver/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalClinicClaimSuppAppConvert.toJson(param),
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
    //get supporter approver tuntutan kakitangan
    static async getEmployeeClaimSuppApp(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/supporter_approver/get';

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
    //add supporter approval tuntutan kakitangan
    static async addEmployeeClaimSupporterApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/allocation/supporter_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get supporter approval tuntutan kakitangan
    static async getEmployeeClaimSupporterApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/supporter_approval/get';

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
    //add approver approval tuntutan kakitangan
    static async addEmployeeClaimApproverApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/allocation/approver_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get approver approval tuntutan kakitangan
    static async getEmployeeClaimApproverApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/allocation/approver_approval/get';

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

    //==============================================================
    // Urus Setia    
    //==============================================================
    // Permohonan Klinik Panel
    //==============================================================
    //get clinic application table
    static async getClinicApplication(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/list';

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
    //add new clinic panel
    static async addClinicApplication(param: MedicalClinicApplication) {
        try {
            let url: Input = 'medical/clinic/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalClinicApplicationConvert.toJson(param),
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
    //get clinic application detail
    static async getClinicApplicationDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/get';

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
    // add clinic application documents
    static async addClinicApplicationDocument(param: string) {
        try {
            let url: Input = 'medical/clinic/upload';
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
    //get clinic application document
    static async getClinicApplicationDocument(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/download';

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
    //add clinic contract
    static async addClinicContract(param: ClinicContract) {
        try {
            let url: Input = 'medical/clinic/contract/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicContractConvert.toJson(param),
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
    //get clinic contract detail
    static async getClinicContractDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/contract/get';

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
    //add clinic secretary approval
    static async addClinicSecretaryApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/confirm/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get clinic secretary approval
    static async getClinicSecretaryApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/confirm/get';

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
    //add clinic supporter and approver
    static async addClinicSupporterApprover(param: ClinicSetSupporterApprover) {
        try {
            let url: Input = 'medical/clinic/roles/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicSetSupporterApproverConvert.toJson(param),
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
    //get clinic supporter and approver
    static async getClinicSupporterApprover(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/roles/get';

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
    //add clinic supporter approval
    static async addClinicSupporterApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/supporter_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get clinic supporter approval
    static async getClinicSupporterApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/supporter_approval/get';

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
    //add clinic approver approval
    static async addClinicApproverApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/approver_approval/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //get clinic approver approval
    static async getClinicApproverApproval(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/approver_approval/get';

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


    //==============================================================
    // Klinik Panel    
    //==============================================================
    // Profile
    //==============================================================

    //get clinic panel profile
    static async getClinicPanelProfile() {
        try {
            const url: Input = 'medical/clinic_panel/profile/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url).json();

            // await toast for resolved or rejected state
            // const response: Response = await getPromiseToast(promiseRes);
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
    //edit clinic panel profile
    static async editClinicPanelProfile(param: ClinicPanelProfile) {
        try {
            let url: Input = 'medical/clinic_panel/profile/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicPanelProfileConvert.toJson(param),
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


    //==============================================================
    // Maklumat Bil Rawatan
    //==============================================================
    //get treatment bill list
    static async getTreatmentBill(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/treatment_bill/get';

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

    //get employee detail
    static async getClinicPanelEmployeeDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

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
    //get patient detail
    static async getClinicPanelPatientDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/patient/get';

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
    //get treatment details
    static async getClinicPanelTreatmentDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/treatment/get';

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

    //==============================================================
    // Maklumat Kakitangan
    //==============================================================
    //get employee list
    static async getClinicPanelEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/claim_detail/get';

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



    //==============================================================
    // Sejarah Tuntutan
    //==============================================================
    //get claim history list
    static async getClinicPanelClaimHistory(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic_panel/history/list';

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
    //get claim history employee detail
    static async getClinicPanelClaimEmployee(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

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
    //get claim history employee detail
    static async getEmployeeDependant(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/dependents/get';

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
    // get claim history patient detail
    static async getClinicPanelClaimPatient(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/patient/get';

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
    // get claim history treatment detail
    static async getClinicPanelClaimPatientTreatment(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/treatment/get';

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
    //add patients
    static async addClinicPanelClaimPatient(param: TreatmentAddPatient) {
        try {
            let url: Input = 'medical/clinic/patient/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: TreatmentAddPatientConvert.toJson(param),
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
    //add treatments
    static async addClinicPanelClaimTreatment(param: TreatmentAddTreatmentDetail) {
        try {
            let url: Input = 'medical/clinic/treatment/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: TreatmentAddTreatmentDetailConvert.toJson(param),
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

    //==============================================================
    // Bil Tuntutan Klinik
    //==============================================================
    //get bil tuntutan table
    static async getClinicPanelClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/claims/list_by_clinic';

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
    static async getClinicPanelClaimOthersTable(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/claims/list';

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
    static async getClinicPanelAllocations(param: CurrentYearAllocation) {
        try {
            let url: Input = 'medical/clinic_claim/allocation/get';

            const response: Response = await http
                .post(url, {
                    body: CurrentYearAllocationConvert.toJson(param),
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
    //edit clinic allocation
    static async editAllocations(param: ClinicAllocationEdit) {
        try {
            let url: Input = 'medical/clinic_claim/allocation/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicAllocationEditConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get bil tuntutan detail
    static async getClinicPanelClaimDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/claims/view';

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

    //add bil tuntutan klinik detail
    static async addClinicPanelClaimDetail(param: ClinicClaimDetail) {
        try {
            let url: Input = 'medical/clinic/claims/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: ClinicClaimDetailConvert.toJson(param),
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

    //add bil tuntutan klinik urus setia approval
    static async addClinicPanelClaimSecretaryApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/claims/secretary_approver';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //add bil tuntutan klinik supporter approver
    static async addClinicPanelClaimSuppApp(param: MedicalClinicClaimSuppApp) {
        try {
            let url: Input = 'medical/clinic/claims/supporter_approver';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: MedicalClinicClaimSuppAppConvert.toJson(param),
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
    //add bil tuntutan klinik supporter approver
    static async addClinicPanelClaimSupporterApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/claims/supporter';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
    //add bil tuntutan klinik supporter approver
    static async addClinicPanelClaimApproverApproval(param: ClinicCommonResult) {
        try {
            let url: Input = 'medical/clinic/claims/approver';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicCommonResultConvert.toJson(param),
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
}
