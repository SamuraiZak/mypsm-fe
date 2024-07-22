import { invalidateAll } from '$app/navigation';
import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    EmployeeDetailExtendedDTO,
    EmployeeLookupItemDTO,
} from '$lib/dto/core/employee/employee.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    ServiceAllowanceApplicationDetailDTO,
    ServiceAllowanceApplicationDetailRequestDTO,
    ServiceAllowanceEmployeeDetailRequestDTO,
} from '$lib/dto/mypsm/service-allowance/service-allowance.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    ServiceAllowanceAssignDirectorSchema,
    ServiceAllowanceCeremonyClothingDetailSchema,
    ServiceAllowanceEndorsementSchema,
    ServiceAllowanceEndorserDetailSchema,
    ServiceAllowanceFuneralDetailSchema,
    ServiceAllowanceHouseMovingDetailSchema,
    ServiceAllowanceOtherAllowanceDetailSchema,
    ServiceAllowancePassportPaymentDetailSchema,
    ServiceAllowanceSecretaryConfirmationSchema,
    ServiceAllowanceWinterClothingDetailSchema,
    type ServiceAllowanceAssignDirectorType,
    type ServiceAllowanceCeremonyClothingDetailType,
    type ServiceAllowanceEndorsementType,
    type ServiceAllowanceEndorserDetailType,
    type ServiceAllowanceFuneralDetailType,
    type ServiceAllowanceHouseMovingDetailType,
    type ServiceAllowanceOtherAllowanceDetailType,
    type ServiceAllowancePassportPaymentDetailType,
    type ServiceAllowanceSecretaryConfirmationType,
    type ServiceAllowanceWinterClothingDetailType,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema.js';
import { EmployeeExtendedServices } from '$lib/services/implementation/core/employee/employee.service.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceAllowanceServices } from '$lib/services/implementation/mypsm/service-allowance/service-allowance.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    // get the current application Id
    const currentAllowanceId: number = parseInt(params.id);

    // get the current allowance type code
    const currentAllowanceTypeCode: string = params.type;

    let currentEmployeeDetails: EmployeeDetailExtendedDTO = {
        fullName: 'Tiada Maklumat',
        alternateName: 'Tiada Maklumat',
        identityCardNumber: 'Tiada Maklumat',
        identityCardColor: 'Tiada Maklumat',
        employeeNumber: 'Tiada Maklumat',
        dateOfBirth: 'Tiada Maklumat',
        citizenship: 'Tiada Maklumat',
        race: 'Tiada Maklumat',
        religion: 'Tiada Maklumat',
        gender: 'Tiada Maklumat',
        maritalStatus: 'Tiada Maklumat',
        homeAddress: 'Tiada Maklumat',
        mailingAddress: 'Tiada Maklumat',
        homePhoneNumber: 'Tiada Maklumat',
        mobilePhoneNumber: 'Tiada Maklumat',
        isExMilitary: false,
        grade: 'Tiada Maklumat',
        position: 'Tiada Maklumat',
        placement: 'Tiada Maklumat',
    };

    let currentApplicationDetails: ServiceAllowanceApplicationDetailDTO = {
        applicationDetail: {
            isDraft: true,
        },
        assignDirector: null,
        directorSupport: null,
        verification: null,
        supporterApprover: null,
        support: null,
        approval: null,
        confirmation: null,
        secretaryVerification: undefined,
        status: 'Draf',
    };

    // create all forms
    // 1. details forms
    // 1.1 ceremony clothing details form
    const ceremonyClothingDetailsForm = await superValidate(
        zod(ServiceAllowanceCeremonyClothingDetailSchema),
    );

    ceremonyClothingDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.ceremonyClothing.code;

    // 1.2 passport payment
    const passportPaymentDetailsForm = await superValidate(
        zod(ServiceAllowancePassportPaymentDetailSchema),
    );

    passportPaymentDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.passportPayment.code;

    // 1.3 other allowance
    const otherAllowanceDetailsForm = await superValidate(
        zod(ServiceAllowanceOtherAllowanceDetailSchema),
    );

    otherAllowanceDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.otherAllowance.code;

    // 1.4 other allowance
    const houseMovingDetailsForm = await superValidate(
        zod(ServiceAllowanceHouseMovingDetailSchema),
    );

    houseMovingDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.houseMoving.code;

    // 1.5 winter clothing
    const winterClothingDetailsForm = await superValidate(
        zod(ServiceAllowanceWinterClothingDetailSchema),
    );

    winterClothingDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.winterClothing.code;

    // 1.6 funeral
    const funeralDetailsForm = await superValidate(
        zod(ServiceAllowanceFuneralDetailSchema),
    );

    funeralDetailsForm.data.allowanceTypeCode =
        AllowanceTypeConstant.funeralArrangement.code;

    // 2. assign director form
    const assignDirectorForm = await superValidate(
        zod(ServiceAllowanceAssignDirectorSchema),
    );

    assignDirectorForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 3. director support form
    const directorSupportForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    directorSupportForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 4. secretary verification form
    const secretaryVerificationForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    secretaryVerificationForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 5. endorser details form
    const endorserDetailForm = await superValidate(
        zod(ServiceAllowanceEndorserDetailSchema),
    );

    endorserDetailForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 6. supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    supporterFeedbackForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 7. approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    approverFeedbackForm.data.allowanceTypeCode = currentAllowanceTypeCode;

    // 8. secretary confirmation form
    const secretaryConfirmationForm = await superValidate(
        zod(ServiceAllowanceSecretaryConfirmationSchema),
    );

    // get the current allowance application details if the id received is != 0
    if (currentAllowanceId == 0) {
        // get employee details
        const employeeDetailsResponse =
            await EmployeeExtendedServices.getCurrentEmployeeDetails();

        if (employeeDetailsResponse.status == 'success') {
            currentEmployeeDetails = employeeDetailsResponse.data
                ?.details as EmployeeDetailExtendedDTO;
        }

        // set the default isdraft to true
        ceremonyClothingDetailsForm.data.isDraft = true;

        passportPaymentDetailsForm.data.isDraft = true;

        otherAllowanceDetailsForm.data.isDraft = true;

        houseMovingDetailsForm.data.isDraft = true;

        winterClothingDetailsForm.data.isDraft = true;

        funeralDetailsForm.data.isDraft = true;
    } else {
        // get employee details
        const employeeDetailsRequest: ServiceAllowanceEmployeeDetailRequestDTO =
            {
                allowanceId: currentAllowanceId,
            };

        const employeeDetailsResponse =
            await ServiceAllowanceServices.getEmployeeDetails(
                employeeDetailsRequest,
            );

        if (employeeDetailsResponse.status == 'success') {
            currentEmployeeDetails = employeeDetailsResponse.data
                ?.details as EmployeeDetailExtendedDTO;
        }

        // get current application details
        const currentApplicationDetailsRequest: ServiceAllowanceApplicationDetailRequestDTO =
            {
                allowanceId: currentAllowanceId,
                allowanceTypeCode: currentAllowanceTypeCode,
            };

        const currentApplicationDetailsResponse =
            await ServiceAllowanceServices.getApplicationDetails(
                currentApplicationDetailsRequest,
            );

        if (currentApplicationDetailsResponse.status == 'success') {
            currentApplicationDetails = currentApplicationDetailsResponse.data
                ?.details as ServiceAllowanceApplicationDetailDTO;

            // assign value to each detail form
            switch (currentAllowanceTypeCode) {
                case AllowanceTypeConstant.ceremonyClothing.code:
                    ceremonyClothingDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowanceCeremonyClothingDetailType;
                    break;

                case AllowanceTypeConstant.passportPayment.code:
                    passportPaymentDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowancePassportPaymentDetailType;
                    break;

                case AllowanceTypeConstant.otherAllowance.code:
                    otherAllowanceDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowanceOtherAllowanceDetailType;
                    break;

                case AllowanceTypeConstant.houseMoving.code:
                    houseMovingDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowanceHouseMovingDetailType;
                    break;

                case AllowanceTypeConstant.winterClothing.code:
                    winterClothingDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowanceWinterClothingDetailType;
                    break;

                case AllowanceTypeConstant.funeralArrangement.code:
                    funeralDetailsForm.data =
                        currentApplicationDetails.applicationDetail as ServiceAllowanceFuneralDetailType;
                    break;

                default:
                    break;
            }

            // assign value to each processes form

            // assign director form
            if (
                currentApplicationDetails.assignDirector !== undefined &&
                currentApplicationDetails.assignDirector !== null
            ) {
                assignDirectorForm.data =
                    currentApplicationDetails.assignDirector as ServiceAllowanceAssignDirectorType;
            } else {
                assignDirectorForm.data.allowanceId = currentAllowanceId;
                assignDirectorForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                assignDirectorForm.data.type = 'pengarah negeri';
            }

            // director support form
            if (
                currentApplicationDetails.directorSupport != null ||
                currentApplicationDetails.directorSupport != undefined
            ) {
                directorSupportForm.data =
                    currentApplicationDetails.directorSupport as ServiceAllowanceEndorsementType;
            } else {
                directorSupportForm.data.allowanceId = currentAllowanceId;
                directorSupportForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                directorSupportForm.data.date = Date.now().toString();
            }

            // secretary verification form
            if (
                currentApplicationDetails.verification != null ||
                currentApplicationDetails.verification != undefined
            ) {
                secretaryVerificationForm.data =
                    currentApplicationDetails.verification as ServiceAllowanceEndorsementType;
            } else {
                secretaryVerificationForm.data.allowanceId = currentAllowanceId;
                secretaryVerificationForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                secretaryVerificationForm.data.date = Date.now().toString();
            }

            // endorser detail form
            if (
                currentApplicationDetails.supporterApprover != null ||
                currentApplicationDetails.supporterApprover != undefined
            ) {
                endorserDetailForm.data =
                    currentApplicationDetails.supporterApprover as ServiceAllowanceEndorserDetailType;
            } else {
                endorserDetailForm.data.allowanceId = currentAllowanceId;
                endorserDetailForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
            }

            // supporter feedback form
            if (
                currentApplicationDetails.support != null ||
                currentApplicationDetails.support != undefined
            ) {
                supporterFeedbackForm.data =
                    currentApplicationDetails.support as ServiceAllowanceEndorsementType;
            } else {
                supporterFeedbackForm.data.allowanceId = currentAllowanceId;
                supporterFeedbackForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                supporterFeedbackForm.data.date = Date.now().toString();
            }

            // approver feedback form
            if (
                currentApplicationDetails.approval != null ||
                currentApplicationDetails.approval != undefined
            ) {
                approverFeedbackForm.data =
                    currentApplicationDetails.approval as ServiceAllowanceEndorsementType;
            } else {
                approverFeedbackForm.data.allowanceId = currentAllowanceId;
                approverFeedbackForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                approverFeedbackForm.data.date = Date.now().toString();
            }

            // secretary confirmation form
            if (
                currentApplicationDetails.confirmation != null ||
                currentApplicationDetails.confirmation != undefined
            ) {
                secretaryConfirmationForm.data =
                    currentApplicationDetails.confirmation;
            } else {
                secretaryConfirmationForm.data.allowanceId = currentAllowanceId;
                secretaryConfirmationForm.data.allowanceTypeCode =
                    currentAllowanceTypeCode;
                secretaryConfirmationForm.data.date = Date.now().toString();
            }
        }
    }

    // common config
    // 1. allowance lookup
    const allowanceDropdown: DropdownDTO[] = await _getAllowanceTypeDropdown();

    // 2. endorsement option
    const allowanceEndorsementOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // 3. director dropdown
    const directorDrodpwon: DropdownDTO[] = await _getDirectorDropdown();

    // 4. relationship dropdown
    const relationshipDropdown: DropdownDTO[] =
        await _getRelationshipDropdown();

    // 5. supporter dropdown
    const supporterDropdown: DropdownDTO[] = await _getSectionChiefDropdown();
    
    // 5. approver dropdown
    const approverDropdown: DropdownDTO[] = await _getPKPDropdown();

    return {
        props: {
            layoutData,
            currentAllowanceId,
            currentAllowanceTypeCode,
            currentEmployeeDetails,
            currentApplicationDetails,
        },
        forms: {
            // details forms
            ceremonyClothingDetailsForm,
            passportPaymentDetailsForm,
            otherAllowanceDetailsForm,
            houseMovingDetailsForm,
            winterClothingDetailsForm,
            funeralDetailsForm,

            // processes forms
            assignDirectorForm,
            directorSupportForm,
            secretaryVerificationForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
            secretaryConfirmationForm,
        },
        lookup: {
            allowanceDropdown,
            allowanceEndorsementOption,
            directorDrodpwon,
            relationshipDropdown,
            supporterDropdown,
            approverDropdown
        },
    };
}

// application detail submit
// 1. ceremony clothing
export async function _ceremonyClothingSubmit(
    formData: ServiceAllowanceCeremonyClothingDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceCeremonyClothingDetailSchema),
        );

        console.log(form.data.documents);

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addCeremonyClothing(formData);

            if (response.status == 'success') {
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// 2. passport payment
export async function _passportPaymentSubmit(
    formData: ServiceAllowancePassportPaymentDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowancePassportPaymentDetailSchema),
        );

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addPassportPayment(formData);

            if (response.status == 'success') {
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// 3. other allowance
export async function _otherAllowanceSubmit(
    formData: ServiceAllowanceOtherAllowanceDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceOtherAllowanceDetailSchema),
        );

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addOtherAllowance(formData);

            if (response.status == 'success') {
                await invalidateAll();
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// 4. house moving
export async function _houseMovingSubmit(
    formData: ServiceAllowanceHouseMovingDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceHouseMovingDetailSchema),
        );

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addHouseMoving(formData);

            if (response.status == 'success') {
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// 5. winter clothing
export async function _winterClothingSubmit(
    formData: ServiceAllowanceWinterClothingDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceWinterClothingDetailSchema),
        );

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addWinterClothing(formData);

            if (response.status == 'success') {
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// 5. winter clothing
export async function _funeralSubmit(
    formData: ServiceAllowanceFuneralDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceFuneralDetailSchema),
        );

        if (form.valid) {
            const response =
                await ServiceAllowanceServices.addFuneral(formData);

            if (response.status == 'success') {
                return response;
            } else {
                return CommonResponseConstant.httpError;
            }
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// =========================================================================
// PROCESSES
// =========================================================================

// submit assign director form
export async function _assignDirectorSubmit(
    formData: ServiceAllowanceAssignDirectorType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceAssignDirectorSchema),
        );

        const response = await ServiceAllowanceServices.addAssignDirector(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit director support
export async function _directorSupportSubmit(
    formData: ServiceAllowanceEndorsementType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceEndorsementSchema),
        );

        const response = await ServiceAllowanceServices.addDirectorSupport(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit secretary verification
export async function _secretaryVerificationSubmit(
    formData: ServiceAllowanceEndorsementType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceEndorsementSchema),
        );

        const response =
            await ServiceAllowanceServices.addSecretaryVerification(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit endorser detail
export async function _endorserDetailSubmit(
    formData: ServiceAllowanceEndorserDetailType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceEndorserDetailSchema),
        );

        const response = await ServiceAllowanceServices.addEndorserDetail(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit supporter feedback
export async function _supporterFeedbackSubmit(
    formData: ServiceAllowanceEndorsementType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceEndorsementSchema),
        );

        const response = await ServiceAllowanceServices.addSupporterFeedback(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit approver feedback
export async function _approverFeedbackSubmit(
    formData: ServiceAllowanceEndorsementType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceEndorsementSchema),
        );

        const response = await ServiceAllowanceServices.addApproverFeedback(
            form.data,
        );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// submit secretary confirmation
export async function _secretaryConfirmationSubmit(
    formData: ServiceAllowanceSecretaryConfirmationType,
) {
    try {
        const form = await superValidate(
            formData,
            zod(ServiceAllowanceSecretaryConfirmationSchema),
        );

        const response =
            await ServiceAllowanceServices.addSecretaryConfirmation(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } catch (error) {
        return CommonResponseConstant.httpError;
    }
}

// config
export async function _getAllowanceTypeDropdown() {
    let allowanceTypeOption: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeOption =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    return allowanceTypeOption;
}

// config
export async function _getDirectorDropdown() {
    let directorOption: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: RoleConstant.pengarahNegeri.code,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 1,
        filter: filter,
    };

    const directorListResponse: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const directorList: EmployeeLookupItemDTO[] = directorListResponse.data
        ?.dataList as EmployeeLookupItemDTO[];

    directorOption = LookupHelper.employeeToDropdown(directorList);

    return directorOption;
}

export async function _getSectionChiefDropdown() {
    let sectionChiefOption: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: RoleConstant.ketuaSeksyen.code,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 1,
        filter: filter,
    };

    const sectionChiefListResponse: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const sectionChiefList: EmployeeLookupItemDTO[] = sectionChiefListResponse
        .data?.dataList as EmployeeLookupItemDTO[];

    sectionChiefOption = LookupHelper.employeeToDropdown(sectionChiefList);

    return sectionChiefOption;
}

export async function _getPKPDropdown() {
    let pkpOption: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: RoleConstant.pengarahKhidmatPengurusan.code,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 1,
        filter: filter,
    };

    const pkpListResponse: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const pkpList: EmployeeLookupItemDTO[] = pkpListResponse.data
        ?.dataList as EmployeeLookupItemDTO[];

    pkpOption = LookupHelper.employeeToDropdown(pkpList);

    return pkpOption;
}

export async function _getRelationshipDropdown() {
    let relationshipLookup: DropdownDTO[] = [];
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    if (relationshipLookupResponse.status == 'success') {
        relationshipLookup = LookupServices.setSelectOptions(
            relationshipLookupResponse,
        );
    }

    return relationshipLookup;
}
