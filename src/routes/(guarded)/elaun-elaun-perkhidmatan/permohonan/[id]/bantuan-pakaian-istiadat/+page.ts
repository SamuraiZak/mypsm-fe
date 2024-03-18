import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RadioConstant } from '$lib/constants/core/radio.constant.js';
import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto.js';
import type { ServiceAllowanceBantuanPakaianIstiadatApplicationDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto.js';
import type { ServiceAllowanceApplicationDetailRequestDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/service-allowance-application-detail-request.dto.js';
import { _bantuanPakaianIstiadatAddSchema } from '$lib/schemas/mypsm/service-allowance/bantuan-pakaian-istiadat.schema.ts/bantuan-pakaian-istiadat.schema';
import {
    _serviceAllowanceApproverFeedbackSchema,
    _serviceAllowanceDirectorFeedbackSchema,
    _serviceAllowanceSuppAppDetailSchema,
    _serviceAllowanceSupporterFeedbackSchema,
    _serviceAllowanceVerificationSchema,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { ServiceAllowanceBantuanPakaianIstiadatService } from '$lib/services/implementation/mypsm/elaun-elaun-perkhidmatan/service-allowance-bantuan-pakaian-istiadat.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// =======================================================================
// Page Load Function
// =======================================================================
export async function load({ params }) {
    // set application ID to 0 : new application
    let currentApplicationId: number = 0;

    // the passed parameter value is "Baru" if it is a new application
    // else set the applicationID to the pass parameter value
    if (params.id !== 'Baru') {
        currentApplicationId = parseInt(params.id);
    }

    // get the current role code
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    // set the default allowanceTypeCode
    let currentAllowanceTypeCode: string =
        ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code;

    // get allowance type lookup
    let allowanceTypeOption: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];
    }

    // get verification status option
    const verificationStatusOption: RadioDTO[] = RadioConstant.verify;

    // get support status option
    const supportStatusOption: RadioDTO[] = RadioConstant.support;

    // get approval status option
    const approvalStatusOption: RadioDTO[] = RadioConstant.approve;

    // create detail form
    const allowanceDetailForm = await superValidate(
        zod(_bantuanPakaianIstiadatAddSchema),
    );

    // create verification form
    const verificationForm = await superValidate(
        zod(_serviceAllowanceVerificationSchema),
    );

    // create supporter and approver detail form
    const suppporterApproverDetailForm = await superValidate(
        zod(_serviceAllowanceSuppAppDetailSchema),
    );

    // create director feeedback form
    const directorFeedbackForm = await superValidate(
        zod(_serviceAllowanceDirectorFeedbackSchema),
    );

    // create supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(_serviceAllowanceSupporterFeedbackSchema),
    );

    // create approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(_serviceAllowanceApproverFeedbackSchema),
    );

    // create mock application details
    let currentApplicationDetail: ServiceAllowanceBantuanPakaianIstiadatApplicationDTO =
        {
            applicationDetail: null,
            download: null,
            verification: null,
            supportApprover: null,
            directorSupport: null,
            support: null,
            approval: null,
        };

    if (currentApplicationId == 0) {
        // if the current process is to add new application,
        // set the detail form to default value
        allowanceDetailForm.data.allowanceTypeCode = currentAllowanceTypeCode;
    } else {
        // create a request to get the application detail
        const applicationDetailRequest: ServiceAllowanceApplicationDetailRequestDTO =
            {
                allowanceId: currentApplicationId,
                allowanceTypeCode: currentAllowanceTypeCode,
            };

        // fetch the application detail
        const applicationDetailsResponse: CommonResponseDTO =
            await ServiceAllowanceBantuanPakaianIstiadatService.get(
                applicationDetailRequest,
            );

        if (applicationDetailsResponse.status == 'success') {
            //  fit the response into dto
            currentApplicationDetail = applicationDetailsResponse.data
                ?.details as ServiceAllowanceBantuanPakaianIstiadatApplicationDTO;

            // set the value for detail form if not null
            if (currentApplicationDetail.applicationDetail !== null) {
                // set the current allowance type code
                currentAllowanceTypeCode =
                    currentApplicationDetail.applicationDetail
                        ?.allowanceTypeCode;

                allowanceDetailForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.applicationDetail
                            .allowanceTypeCode,
                    reason: currentApplicationDetail.applicationDetail.reason,
                    personal:
                        currentApplicationDetail.applicationDetail.personal,
                    partner: currentApplicationDetail.applicationDetail.partner,
                    documents: [],
                };
            } else {
                allowanceDetailForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    reason: '',
                    personal: 0,
                    partner: 0,
                    documents: [],
                };
            }

            // set the value for verification form
            if (currentApplicationDetail.verification !== null) {
                verificationForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.verification
                            ?.allowanceTypeCode,
                    allowanceId:
                        currentApplicationDetail.verification.allowanceId,
                    status: currentApplicationDetail.verification.status,
                    remark: currentApplicationDetail.verification.remark,
                };
            } else {
                verificationForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    allowanceId: currentApplicationId,
                    status: false,
                    remark: '',
                };
            }

            // set the supporter approver detail form
            if (currentApplicationDetail.supportApprover !== null) {
                suppporterApproverDetailForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.supportApprover
                            .allowanceTypeCode,
                    allowanceId:
                        currentApplicationDetail.supportApprover.allowanceId,
                    supporter:
                        currentApplicationDetail.supportApprover.supporter,
                    approver: currentApplicationDetail.supportApprover.approver,
                };
            } else {
                suppporterApproverDetailForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    allowanceId: currentApplicationId,
                    supporter: '',
                    approver: '',
                };
            }

            // set the value for director feedabck form
            if (currentApplicationDetail.directorSupport !== null) {
                directorFeedbackForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.directorSupport
                            .allowanceTypeCode,
                    allowanceId:
                        currentApplicationDetail.directorSupport.allowanceId,
                    status: currentApplicationDetail.directorSupport.status,
                    remark: currentApplicationDetail.directorSupport.remark,
                };
            } else {
                directorFeedbackForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    allowanceId: currentApplicationId,
                    status: false,
                    remark: '',
                };
            }

            // set the value for supporter feedback form
            if (currentApplicationDetail.support !== null) {
                supporterFeedbackForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.support.allowanceTypeCode,
                    allowanceId: currentApplicationDetail.support.allowanceId,
                    status: currentApplicationDetail.support.status,
                    remark: currentApplicationDetail.support.remark,
                };
            } else {
                supporterFeedbackForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    allowanceId: currentApplicationId,
                    status: false,
                    remark: '',
                };
            }

            // set the value for approver feedback form
            if (currentApplicationDetail.approval !== null) {
                approverFeedbackForm.data = {
                    allowanceTypeCode:
                        currentApplicationDetail.approval.allowanceTypeCode,
                    allowanceId: currentApplicationDetail.approval.allowanceId,
                    status: currentApplicationDetail.approval.status,
                    remark: currentApplicationDetail.approval.remark,
                };
            } else {
                approverFeedbackForm.data = {
                    allowanceTypeCode: currentAllowanceTypeCode,
                    allowanceId: currentApplicationId,
                    status: false,
                    remark: '',
                };
            }
        }
    }
    // return page data
    const a = 0;

    return {
        a,
        props: {
            currentRoleCode,
            currentApplicationId,
            allowanceDetailForm,
            verificationForm,
            suppporterApproverDetailForm,
            directorFeedbackForm,
            supporterFeedbackForm,
            approverFeedbackForm,
            allowanceTypeOption,
            verificationStatusOption,
            supportStatusOption,
            approvalStatusOption,
            currentApplicationDetail,
        },
    };
}

// =======================================================================
// Form Submitter Functions
// =======================================================================

export const _submitAllowanceDetail = async (formData: object) => {};
