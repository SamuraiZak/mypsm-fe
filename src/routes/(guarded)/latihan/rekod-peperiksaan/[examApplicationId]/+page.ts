import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseExamApplicationApprovalDTO } from '$lib/dto/mypsm/course/exam/course-exam-application-approval.dto.js';
import type { CourseExamApplicationPersonalDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application-personal-info.dto.js';
import type { CourseExamApplicationServiceDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application-service-info.dto.js';
import type { CourseExamApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto.js';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _coursePersonalInfoResponseSchema,
    _courseServiceInfoResponseSchema,
    _editExamInfoRequestSchema,
    _examApplicationInfoResponseSchema,
} from '$lib/schemas/mypsm/course/exam-schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';
import { _examApplicationApprovalSchema } from '../../../../../lib/schemas/mypsm/course/exam-schema';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.examApplicationId),
    };

    const isCourseSecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    let examApplicationDetailResponse: CommonResponseDTO = {};
    let examPersonalDetailResponse: CommonResponseDTO = {};
    let examServiceDetailResponse: CommonResponseDTO = {};
    let courseExamSecretaryApprovalResponse: CommonResponseDTO = {};
    let courseExamResultResponse: CommonResponseDTO = {};

    examApplicationDetailResponse =
        await CourseServices.getCourseExamApplicationDetail(idRequestBody);

    examPersonalDetailResponse =
        await CourseServices.getCourseExamApplicationPersonalDetail(
            idRequestBody,
        );

    examServiceDetailResponse =
        await CourseServices.getCourseExamApplicationServiceDetail(
            idRequestBody,
        );

    courseExamSecretaryApprovalResponse =
        await CourseServices.getCourseExamApplicationSecreataryApproval(
            idRequestBody,
        );

    courseExamResultResponse = {};
    // await CourseServices.setCourseExamResult(
    //     idRequestBody,
    // );

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const examInfoForm = await superValidate(
        examApplicationDetailResponse.data
            ?.details as CourseExamApplicationDetailResponseDTO,
        zod(_examApplicationInfoResponseSchema),
    );

    const examPersonalInfoForm = await superValidate(
        examPersonalDetailResponse.data
            ?.details as CourseExamApplicationPersonalDetailResponseDTO,
        zod(_coursePersonalInfoResponseSchema),
    );

    const examServiceInfoForm = await superValidate(
        examServiceDetailResponse.data
            ?.details as CourseExamApplicationServiceDetailResponseDTO,
        zod(_courseServiceInfoResponseSchema),
    );

    const examSecretaryApprovalForm = await superValidate(
        courseExamSecretaryApprovalResponse.data
            ?.details as CourseExamApplicationApprovalDTO,
        zod(_examApplicationApprovalSchema),
    );

    const examResultForm = await superValidate(
        courseExamResultResponse.data
            ?.details as CourseExamApplicationApprovalDTO,
        zod(_examApplicationApprovalSchema),
    );

    // ===========================================================================

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            identityCardColorLookupResponse,
        );

    // ===========================================================================

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(stateLookupResponse);

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            nationalityLookupResponse,
        );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(raceLookupResponse);

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            religionLookupResponse,
        );

    // ===========================================================================

    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(genderLookupResponse);

    // ===========================================================================

    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            maritalLookupResponse,
        );

    // ===========================================================================

    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            positionLookupResponse,
        );

    // ===========================================================================

    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(titleLookupResponse);

    // ===========================================================================

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // ===========================================================================

    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            placementLookupResponse,
        );

    // ===========================================================================

    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            serviceTypeLookupResponse,
        );

    // ===========================================================================

    const retirementBenefitLookupResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    const retirementBenefitLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            retirementBenefitLookupResponse,
        );

    // ===========================================================================

    const schemeLookupResponse: CommonResponseDTO =
        await LookupServices.getSchemeEnums();

    const schemeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(schemeLookupResponse);

    // ===========================================================================

    const groupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const groupLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(groupLookupResponse);

    // ===========================================================================

    // ===========================================================================

    const programLookupResponse: CommonResponseDTO =
        await LookupServices.getProgrammeEnums();

    const programLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            programLookupResponse,
        );

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // ===========================================================================

    const examTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const examTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        examTypeLookupResponse,
    );

    // ===========================================================================

    return {
        responses: {
            examApplicationDetailResponse,
            examPersonalDetailResponse,
            examServiceDetailResponse,
            courseExamSecretaryApprovalResponse,
            courseExamResultResponse,
        },
        forms: {
            examInfoForm,
            examPersonalInfoForm,
            examServiceInfoForm,
            examSecretaryApprovalForm,
            examResultForm,
        },
        selectionOptions: {
            identityCardColorLookup,
            stateLookup,
            nationalityLookup,
            raceLookup,
            religionLookup,
            genderLookup,
            maritalLookup,
            positionLookup,
            titleLookup,
            generalLookup,
            gradeLookup,
            placementLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
            schemeLookup,
            groupLookup,
            examTypeLookup,
            programLookup,
        },
        role: {
            isCourseSecretaryRole,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _addExamApplicationForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_editExamInfoRequestSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const modifiedForm = {
        id: form.data.id,
        examTypeId: form.data.examTypeId,
        examTitle: form.data.examTitle,
        startDate: form.data.startDate.toISOString().split('T')[0],
        endDate: form.data.endDate.toISOString().split('T')[0],
        examDate: form.data.examDate.toISOString().split('T')[0],
        examLocation: form.data.examLocation,
    };

    const response: CommonResponseDTO =
        await CourseServices.editCourseExam(modifiedForm);

    return { response };
};

export const _addSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_examApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseServices.setCourseExamApplicationSecretaryApproval(
            form.data as CourseExamApplicationApprovalDTO,
        );

    return { response };
};
