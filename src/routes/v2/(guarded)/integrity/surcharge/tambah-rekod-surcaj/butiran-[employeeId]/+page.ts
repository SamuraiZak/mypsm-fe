
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { surchargeaIdRequestDTO } from "$lib/dto/mypsm/integrity/surcaj/surcaj-ID-.dto";
import type { ApplicationDetail, Confirmation, ConfirmationDetails, MeetingDetail, SurcajEmployeeDetailResponseDTO } from "$lib/dto/mypsm/integrity/surcaj/surcaj-employee-detail-response.dto";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import { _applicationDetail, _confirmationDetail, _meetingDetail, _surcajEmployeeDetailViewSchema, _surcajEmployeeResponseSchema } from "$lib/schemas/mypsm/integrity/surcaj-scheme";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { IntegrityServices } from "$lib/services/implementation/mypsm/integriti/integrity.service";
import { superValidate } from "sveltekit-superforms";
import { error } from '@sveltejs/kit';
import { zod } from "sveltekit-superforms/adapters";
import type { employeeIdRequestDTO } from "$lib/dto/mypsm/integrity/surcaj/employee-ID.dto";
import type { SurcajPersonalDetailResponseDTO } from "$lib/dto/mypsm/integrity/surcaj/surcaj-view-personal-response.dto";


export async function load({ params }) {


    let employeeID: employeeIdRequestDTO = {
        employeeId: Number(params.employeeId)
    }

    const detailRequest = {
        integrityId: 0,
        employeeId: Number(params.employeeId),
    }


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

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptionsNameIsCode(
        positionLookupResponse,
    );

    // ===========================================================================

    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );

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
        LookupServices.setSelectOptionsValueIsDescription(assetDeclarationLookupResponse);

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


    const personalDetailResponse: CommonResponseDTO =
        await IntegrityServices.viewPersonalDetail(detailRequest);

    const personalInfoForm = await superValidate(personalDetailResponse.data?.details as SurcajPersonalDetailResponseDTO, zod(_surcajEmployeeDetailViewSchema),
        {
            errors: false
        }
    );
    //  =======================================================
    //  add
    // ========================================================


    const applicationDetail = await superValidate(zod(_applicationDetail),
        {
            errors: false
        })
console.log(applicationDetail)
    const meetingDetail = await superValidate(zod(_meetingDetail),
        {
            errors: false
        })

    const confirmationDetail = await superValidate(zod(_confirmationDetail),
        {
            errors: false
        })


    return {
        employeeID,
        personalInfoForm,
        applicationDetail,
        meetingDetail,
        confirmationDetail,
        selectionOptions: {
            identityCardColorLookup,
            cityLookup,
            stateLookup,
            countryLookup,
            nationalityLookup,
            raceLookup,
            ethnicityLookup,
            religionLookup,
            genderLookup,
            maritalLookup,
            positionLookup,
            relationshipLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
            titleLookup,
            generalLookup,
            // employeeLookup,
            assetDeclarationLookup,
            gradeLookup,
            placementLookup,
            serviceGroupLookup,
            unitLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
        },
    }
}

// ================================================================
// ========== add meeting Detail ==============================
// ================================================================

export const _applicationDetailSubmit = async (formData: object) => {
    const applicationDetailForm = await superValidate(formData, (zod)(_applicationDetail));
    console.log(applicationDetailForm)
    if (!applicationDetailForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityServices.addApplicationDetail(applicationDetailForm.data as ApplicationDetail);
    return { response };
};


// ================================================================
// ========== add Meeting Detail ==============================
// ================================================================

export const _meetingDetailSubmit = async (formData: object) => {

    const meetingDetailForm = await superValidate(formData, (zod)(_meetingDetail));
    console.log(meetingDetailForm)

    if (!meetingDetailForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityServices.addMeetingDetail(meetingDetailForm.data as MeetingDetail);
    return { response };
};

// ================================================================
// ========== add Cinfirmation Detail ==============================
// ================================================================


export const _confirmationDetailSubmit = async (formData: object) => {
    const confirmationDetailForm = await superValidate(formData, (zod)(_confirmationDetail));

    console.log(confirmationDetailForm)
    if (!confirmationDetailForm.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await IntegrityServices.addConfirmationDetail(confirmationDetailForm.data as ConfirmationDetails);
    return { response };
};
