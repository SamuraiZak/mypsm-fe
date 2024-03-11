import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundApplicationApprovalDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-approval.dto';
import type { CourseFundApplicationPersonalDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-personal-info.dto';
import type { CourseFundApplicationServiceDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-service-info.dto';
import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _fundApplicationApprovalSchema,
    _fundApplicationDetailResponseSchema,
    _fundApplicationPersonalInfoResponseSchema,
    _fundApplicationServiceInfoResponseSchema,
} from '$lib/schemas/mypsm/course/fund-application-schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.fundApplicationId),
    };

    const isCourseSecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;
    const isIntegritySecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaIntegriti.code;
    const isStateDirectorRole: boolean =
        currentRoleCode === RoleConstant.pengarahNegeri.code;
    const isUnitDirectorRole: boolean =
        currentRoleCode === RoleConstant.pengarahBahagian.code;

    let fundApplicationDetailResponse: CommonResponseDTO = {};
    let fundApplicationPersonalDetailResponse: CommonResponseDTO = {};
    let fundApplicationServiceDetailResponse: CommonResponseDTO = {};
    let fundApplicationCourseSecretaryApprovalResponse: CommonResponseDTO = {};
    let fundApplicationIntegritySecretaryApprovalResponse: CommonResponseDTO =
        {};
    let fundApplicationStateUnitDirectorApprovalResponse: CommonResponseDTO =
        {};

    fundApplicationDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationDetail(
            idRequestBody,
        );

    fundApplicationPersonalDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationPersonalDetail(
            idRequestBody,
        );

    fundApplicationServiceDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationServiceDetail(
            idRequestBody,
        );

    fundApplicationCourseSecretaryApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationCourseSecretaryApproval(
            idRequestBody,
        );

    fundApplicationIntegritySecretaryApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationIntegritySecretaryApproval(
            idRequestBody,
        );

    fundApplicationStateUnitDirectorApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationStateUnitDirectorApproval(
            idRequestBody,
        );

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const fundApplicationInfoForm = await superValidate(
        fundApplicationDetailResponse.data
            ?.details as CourseFundApplicationDetailResponseDTO,
        zod(_fundApplicationDetailResponseSchema),
    );

    const fundApplicationPersonalInfoForm = await superValidate(
        fundApplicationPersonalDetailResponse.data
            ?.details as CourseFundApplicationPersonalDetailResponseDTO,
        zod(_fundApplicationPersonalInfoResponseSchema),
    );

    const fundApplicationServiceInfoForm = await superValidate(
        fundApplicationServiceDetailResponse.data
            ?.details as CourseFundApplicationServiceDetailResponseDTO,
        zod(_fundApplicationServiceInfoResponseSchema),
    );

    const fundApplicationCourseSecretaryApprovalForm = await superValidate(
        fundApplicationCourseSecretaryApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
    );

    const fundApplicationIntegritySecretaryApprovalForm = await superValidate(
        fundApplicationCourseSecretaryApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
    );

    const fundApplicationStateUnitDirectorApprovalForm = await superValidate(
        fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
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

    const fundApplicationTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const fundApplicationTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(fundApplicationTypeLookupResponse);

    // ===========================================================================

    return {
        responses: {
            fundApplicationDetailResponse,
            fundApplicationPersonalDetailResponse,
            fundApplicationServiceDetailResponse,
            fundApplicationCourseSecretaryApprovalResponse,
            fundApplicationIntegritySecretaryApprovalResponse,
            fundApplicationStateUnitDirectorApprovalResponse,
        },
        forms: {
            fundApplicationInfoForm,
            fundApplicationPersonalInfoForm,
            fundApplicationServiceInfoForm,
            fundApplicationCourseSecretaryApprovalForm,
            fundApplicationIntegritySecretaryApprovalForm,
            fundApplicationStateUnitDirectorApprovalForm,
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
            fundApplicationTypeLookup,
            programLookup,
        },
        role: {
            isCourseSecretaryRole,
            isIntegritySecretaryRole,
            isStateDirectorRole,
            isUnitDirectorRole,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _addCourseSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationCourseSecretaryApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};

export const _addIntegritySecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationIntegritySecretaryApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};

export const _addStateUnitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationStateUnitDirectorApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};
