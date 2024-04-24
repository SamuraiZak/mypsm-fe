import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto.js';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    ApproverRequestDTO,
    MeetingResultDTO,
    NewOfferFullDetailDTO,
    NewOfferProcessRequestDTO,
    SetSupporterApproverRequestDTO,
} from '$lib/dto/mypsm/employment/new-offer/new-offer-request-response.dto.js';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _confirmationApprovalSchema,
    _confirmationDiciplinarySchema,
    _confirmationExaminationSchema,
} from '$lib/schemas/mypsm/employment/confirmation-in-service/schema.js';
import {
    _approverSchema,
    _includedEmployeeDetailSchema,
    _includedEmployeeSchema,
    _meetingResultSchema,
    _processSchema,
    _setApproverResultSchema,
    _setSupporterApproverSchema,
    _supporterApproverSchema,
    _updateMeetingResultSchema,
    _updateProcessSchema,
} from '$lib/schemas/mypsm/employment/new-offer/schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { NewOfferServices } from '$lib/services/implementation/mypsm/employment/new-offer/new-offer.service.js';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
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

    const newOfferFullDetailViewResponse: CommonResponseDTO =
        await NewOfferServices.getNewOfferFullDetail(idRequestBody);

    const newOfferDetailView: NewOfferFullDetailDTO =
        newOfferFullDetailViewResponse.data?.details;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'SEMUA',
            employeeNumber: null, //string | null | undefined;
            name: null, //string | null | undefined;
            identityCard: null, //string | null | undefined;
            scheme: null, //string | null | undefined;
            grade: null, //string | null | undefined;
            position: null, //string | null | undefined;
        },
    };

    // List
    const employeesListResponse = await EmployeeServices.getEmployeeList(param);

    const employeesListLookup: DropdownDTO[] = (
        employeesListResponse.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: Number(data.employeeId),
        name: String(data.name),
    }));

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const includedEmployeesForm = await superValidate(
        newOfferDetailView.includedEmployee,
        zod(_includedEmployeeSchema),
        { errors: false },
    );
    const employeeDetailForm = await superValidate(
        newOfferDetailView.includedEmployeeDetail,
        zod(_includedEmployeeDetailSchema),
        { errors: false },
    );

    const examsInfoForm = await superValidate(
        zod(_confirmationExaminationSchema),
        { errors: false },
    );

    const diciplinaryInfoForm = await superValidate(
        zod(_confirmationDiciplinarySchema),
        { errors: false },
    );
    const integrityDirectorApprovalForm = await superValidate(
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const auditDirectorInfoForm = await superValidate(
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const divisionDirectorInfoForm = await superValidate(
        zod(_confirmationApprovalSchema),
        { errors: false },
    );
    const newOfferMeetingForm = await superValidate(
        newOfferDetailView.meetingResult,
        zod(_meetingResultSchema),
        { errors: false },
    );
    const newOfferServiceDetailForm = await superValidate(
        newOfferDetailView.process,
        zod(_processSchema),
        { errors: false },
    );
    const newOfferSetSupporterApproverDetailForm = await superValidate(
        newOfferDetailView.setSupporterApprover,
        zod(_supporterApproverSchema),
        { errors: false },
    );
    const newOfferSupporterResultForm = await superValidate(
        newOfferDetailView.supporter,
        zod(_approverSchema),
        { errors: false },
    );
    const newOfferApprovalResultForm = await superValidate(
        newOfferDetailView.approver,
        zod(_approverSchema),
        { errors: false },
    );

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
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
        LookupServices.setSelectOptionsValueIsDescription(
            retirementBenefitLookupResponse,
        );

    // ===========================================================================

    const employmentStatusLookupResponse: CommonResponseDTO =
        await LookupServices.getEmploymentStatusEnums();

    const employmentStatusLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(employmentStatusLookupResponse);

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

    const generalMeetingLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'LULUS',
        },
        {
            value: false,
            name: 'TIDAK LULUS',
        },
    ];

    // ===========================================================================

    const sentencingMonthLookup: DropdownDTO[] = [];

    for (let month = 1; month <= 12; month++) {
        const option: DropdownDTO = {
            value: month < 10 ? `0${String(month)}` : `${String(month)}`,
            name: `Bulan ${month}`,
        };

        // Add the option to the sentencingMonthLookup array
        sentencingMonthLookup.push(option);
    }

    return {
        params,
        view: {
            newOfferDetailView,
        },
        forms: {
            includedEmployeesForm,
            employeeDetailForm,
            examsInfoForm,
            diciplinaryInfoForm,
            integrityDirectorApprovalForm,
            auditDirectorInfoForm,
            divisionDirectorInfoForm,
            newOfferMeetingForm,
            newOfferServiceDetailForm,
            newOfferSetSupporterApproverDetailForm,
            newOfferSupporterResultForm,
            newOfferApprovalResultForm,
        },
        lookups: {
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
            generalMeetingLookup,
            sentencingMonthLookup,
            employmentStatusLookup,
            employeesListLookup,
        },
    };
}

export const _updateNewOfferMeetingResultForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_updateMeetingResultSchema));
    form.data.meetingId = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.updateNewOfferMeetingResult(
            form.data as MeetingResultDTO,
        );

    return { response };
};

export const _updateNewOfferProcessForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_updateProcessSchema));
    form.data.meetingId = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.updateNewOfferProcess(
            form.data as NewOfferProcessRequestDTO,
        );

    return { response };
};

export const _setNewOfferSupporterApproverForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(
        formData,
        zod(_setSupporterApproverSchema),
    );
    form.data.meetingId = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.setNewOfferSupporterApprover(
            form.data as SetSupporterApproverRequestDTO,
        );

    return { response };
};

export const _newOfferSupporterResultForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_setApproverResultSchema));
    form.data.id = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.createNewOfferSupporterResult(
            form.data as ApproverRequestDTO,
        );

    return { response };
};

export const _newOfferApproverResultForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_setApproverResultSchema));
    form.data.id = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.createNewOfferApproverResult(
            form.data as ApproverRequestDTO,
        );

    return { response };
};
