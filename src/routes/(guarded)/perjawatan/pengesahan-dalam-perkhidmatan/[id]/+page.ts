import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    ConfirmationApprovalDTO,
    ConfirmationFullDetailResponseDTO,
    ConfirmationMeetingResultRequestDTO,
} from '$lib/dto/mypsm/employment/confirmation/confirmation_request_response.dto.js';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _confirmationApprovalSchema,
    _confirmationDiciplinarySchema,
    _confirmationExaminationSchema,
    _confirmationExamsChecklistSchema,
    _confirmationMeetingResultSchema,
    _confirmationPersonalDetailSchema,
    _confirmationServiceSchema,
    _updateConfirmationMeetingResultSchema,
} from '$lib/schemas/mypsm/employment/confirmation-in-service/schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ConfirmationServices } from '$lib/services/implementation/mypsm/employment/confirmation-in-service/confirmation.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.id),
    };

    const confirmationInServiceDetailViewResponse: CommonResponseDTO =
        await ConfirmationServices.getConfirmationFullDetail(idRequestBody);

    const confirmationInServiceView: ConfirmationFullDetailResponseDTO =
        confirmationInServiceDetailViewResponse.data?.details;

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const personalInfoForm = await superValidate(
        confirmationInServiceView.personalDetail,
        zod(_confirmationPersonalDetailSchema),
        { errors: false },
    );
    const serviceInfoForm = await superValidate(
        confirmationInServiceView.service,
        zod(_confirmationServiceSchema),
        { errors: false },
    );

    const examsInfoForm = await superValidate(
        confirmationInServiceView.examination,
        zod(_confirmationExaminationSchema),
        { errors: false },
    );

    const diciplinaryInfoForm = await superValidate(
        confirmationInServiceView.diciplinary,
        zod(_confirmationDiciplinarySchema),
        { errors: false },
    );
    const employmentSecretaryInfoForm = await superValidate(
        confirmationInServiceView.secretary,
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const divisionDirectorInfoForm = await superValidate(
        confirmationInServiceView.division,
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const integrityDirectorApprovalForm = await superValidate(
        confirmationInServiceView.integrity,
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const auditDirectorInfoForm = await superValidate(
        confirmationInServiceView.audit,
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const confirmationMeetingForm = await superValidate(
        confirmationInServiceView.meeting,
        zod(_confirmationMeetingResultSchema),
        { errors: false },
    );

    const checklistForm = await superValidate(zod(_confirmationExamsChecklistSchema));
    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const examTableColumn = [
        { name: 'Jenis Peperiksaan Perkhidmatan/Kursus Induksi' },
        { name: 'Semakan (Lulus/Gagal)' },
    ];
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            identityCardColorLookupResponse,
        );

    // ===========================================================================

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse);

    // ===========================================================================

    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);

    // ===========================================================================

    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        nationalityLookupResponse,
    );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse);

    // ===========================================================================

    const ethnicityLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicityLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        ethnicityLookupResponse,
    );

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        religionLookupResponse,
    );

    // ===========================================================================

    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);

    // ===========================================================================

    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        maritalLookupResponse,
    );

    // ===========================================================================

    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );

    // ===========================================================================

    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsRelationship(relationshipLookupResponse);

    // ===========================================================================

    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );

    // ===========================================================================

    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );

    // ===========================================================================

    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );

    // ===========================================================================

    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );

    // ===========================================================================

    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);

    // ===========================================================================

    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);

    // ===========================================================================

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsNameIsCode(gradeLookupResponse);

    // ===========================================================================

    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );

    // ===========================================================================

    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );

    // ===========================================================================

    const unitLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const unitLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(unitLookupResponse);

    // ===========================================================================

    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );

    // ===========================================================================

    const retirementBenefitLookupResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    const retirementBenefitLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            retirementBenefitLookupResponse,
        );

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'YA',
        },
        {
            value: false,
            name: 'TIDAK',
        },
    ];

    // ===========================================================================

    return {
        params,
        view: {
            confirmationInServiceView,
        },
        forms: {
            personalInfoForm,
            serviceInfoForm,
            examsInfoForm,
            diciplinaryInfoForm,
            employmentSecretaryInfoForm,
            divisionDirectorInfoForm,
            integrityDirectorApprovalForm,
            auditDirectorInfoForm,
            confirmationMeetingForm,
            checklistForm,
        },
        lookups: {
            examTableColumn,
            generalLookup,
            identityCardColorLookup,
            genderLookup,
            gradeLookup,
            stateLookup,
            cityLookup,
            countryLookup,
            nationalityLookup,
            raceLookup,
            ethnicityLookup,
            religionLookup,
            maritalLookup,
            positionLookup,
            relationshipLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            titleLookup,
            assetDeclarationLookup,
            placementLookup,
            serviceGroupLookup,
            unitLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
        },
    };
}

export const _addConfirmationEmploymentSecretary = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_confirmationApprovalSchema),
    );
    form.data.id = id;

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ConfirmationServices.createConfirmationEmploymentSecretaryResult(
            form.data as ConfirmationApprovalDTO,
        );

    return { response };
};

export const _addConfirmationStateDirector = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_confirmationApprovalSchema),
    );
    form.data.id = id;

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ConfirmationServices.createConfirmationStateDirectorResult(
            form.data as ConfirmationApprovalDTO,
        );

    return { response };
};

export const _addConfirmationIntegrityDirector = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_confirmationApprovalSchema),
    );
    form.data.id = id;

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ConfirmationServices.createConfirmationIntegrityDirectorResult(
            form.data as ConfirmationApprovalDTO,
        );

    return { response };
};

export const _addConfirmationAuditDirector = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_confirmationApprovalSchema),
    );
    form.data.id = id;

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ConfirmationServices.createConfirmationAuditDirectorResult(
            form.data as ConfirmationApprovalDTO,
        );

    return { response };
};

export const _addConfirmationMeetingResult = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_updateConfirmationMeetingResultSchema),
    );
    form.data.id = id;

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await ConfirmationServices.createConfirmationMeetingResult(
            form.data as ConfirmationMeetingResultRequestDTO,
        );

    return { response };
};
