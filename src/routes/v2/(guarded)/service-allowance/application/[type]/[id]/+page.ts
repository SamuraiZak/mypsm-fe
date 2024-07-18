import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeDetailExtendedDTO } from '$lib/dto/core/employee/employee.dto';
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
    ServiceAllowanceOtherAllowanceDetailSchema,
    ServiceAllowancePassportPaymentDetailSchema,
    type ServiceAllowanceAssignDirectorType,
    type ServiceAllowanceCeremonyClothingDetailType,
    type ServiceAllowanceEndorsementType,
    type ServiceAllowanceEndorserDetailType,
    type ServiceAllowanceOtherAllowanceDetailType,
    type ServiceAllowancePassportPaymentDetailType,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema.js';
import { EmployeeExtendedServices } from '$lib/services/implementation/core/employee/employee.service.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceAllowanceServices } from '$lib/services/implementation/mypsm/service-allowance/service-allowance.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
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
        applicationDetail: undefined,
        assignDirector: undefined,
        directorSupport: undefined,
        verification: undefined,
        supportApprover: undefined,
        support: undefined,
        approval: undefined,
        confirmation: undefined,
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

    // 2. assign director form
    const assignDirectorForm = await superValidate(
        zod(ServiceAllowanceAssignDirectorSchema),
    );

    // 3. director support form
    const directorSupportForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // 4. secretary verification form
    const secretaryVerificationForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // 5. endorser details form
    const endorserDetailForm = await superValidate(
        zod(ServiceAllowanceEndorserDetailSchema),
    );

    // 6. supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // 7. approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // 8. secretary confirmation form
    const secretaryConfirmationForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
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
                default:
                    break;
            }

            // assign value to each processes form

            // assign director form
            if (
                currentApplicationDetails.assignDirector != null ||
                currentApplicationDetails.assignDirector != undefined
            ) {
                assignDirectorForm.data =
                    currentApplicationDetails.assignDirector as ServiceAllowanceAssignDirectorType;
            }

            // director support form
            if (
                currentApplicationDetails.directorSupport != null ||
                currentApplicationDetails.directorSupport != undefined
            ) {
                directorSupportForm.data =
                    currentApplicationDetails.directorSupport as ServiceAllowanceEndorsementType;
            }

            // secretary verification form
            if (
                currentApplicationDetails.verification != null ||
                currentApplicationDetails.verification != undefined
            ) {
                secretaryVerificationForm.data =
                    currentApplicationDetails.verification as ServiceAllowanceEndorsementType;
            }

            // endorser detail form
            if (
                currentApplicationDetails.supportApprover != null ||
                currentApplicationDetails.supportApprover != undefined
            ) {
                endorserDetailForm.data =
                    currentApplicationDetails.supportApprover as ServiceAllowanceEndorserDetailType;
            }

            // supporter feedback form
            if (
                currentApplicationDetails.support != null ||
                currentApplicationDetails.support != undefined
            ) {
                supporterFeedbackForm.data =
                    currentApplicationDetails.support as ServiceAllowanceEndorsementType;
            }

            // approver feedback form
            if (
                currentApplicationDetails.approval != null ||
                currentApplicationDetails.approval != undefined
            ) {
                approverFeedbackForm.data =
                    currentApplicationDetails.approval as ServiceAllowanceEndorsementType;
            }

            // secretary confirmation form
            if (
                currentApplicationDetails.confirmation != null ||
                currentApplicationDetails.confirmation != undefined
            ) {
                secretaryConfirmationForm.data =
                    currentApplicationDetails.confirmation as ServiceAllowanceEndorsementType;
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

    return {
        props: {
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

        if (form.valid) {
            console.log(JSON.stringify(formData));
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

// 2. passport payment
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
    formData: ServiceAllowanceEndorsementType,
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
