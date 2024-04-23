import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { PTBKWAPServices } from '$lib/services/implementation/mypsm/PTB-KWAP/PTB.service';
import type { PTBPersonalDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/PTB-KWAP-personal-detail.dto';
import type { PTBServiceDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-service-detail.dto';
import type { ptbPensionRequestDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/add-ptb-kwap-service-detail.dto';
import { zod } from 'sveltekit-superforms/adapters';
import type { PTBIDRequestBody } from '$lib/dto/mypsm/employment/ptb-dan-kwap/id-request.dto';
import { _PTBPensionInfoSchema, _approveInfoSchema, _personalInfoSchema, _rolesRelatedEditSchema, _salaryInfoSchema, _serviceInfoSchema, _supporterInfoSchema } from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { PensionDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/pension-detail.dto';
import type { PersonalDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/personal-detail.dto';
import type { ServiceDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/service-detail.dto';
import type { SalaryDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/salary-detail.dto';
import type { RolesRelatedDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/roles-related.dto';
import type { SupportDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/support-detail.dto';
import type { ApproveDetailDTO } from '$lib/dto/mypsm/employment/ptb-dan-kwap/approve-detail.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';




//==================================================
//=============== Load Function ====================
//==================================================

// const authorisedRoleCode : string[] = [
//     UserRoleConstants.calon

export async function load({ params }) {



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
        LookupServices.setSelectOptionsValueIsDescription(stateLookupResponse);

    // ===========================================================================

    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(cityLookupResponse);

    // ===========================================================================

    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptionsInString(
        countryLookupResponse,
    );

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
        nationalityLookupResponse,
    );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(raceLookupResponse);

    // ===========================================================================

    const ethnicityLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicityLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
        ethnicityLookupResponse,
    );

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] = LookupServices.setSelectOptionsValueIsDescription(
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
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);

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

    const candidateIdRequestBody: PTBIDRequestBody = {
        id: Number(params.id),
    };

    const employeeeIdRequestBody: commonIdRequestDTO = {
        id: Number(params.id),
    };
    const pensionDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPpensionDetails(
            candidateIdRequestBody,
        );

    const personalDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPPersonalDetails(
            candidateIdRequestBody,
        );

    const serviceDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPServiceDetails(
            candidateIdRequestBody,
        );

    const salaryDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPSalaryDetails(
            candidateIdRequestBody,
        );

    const rolesRelatedDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPRolesRelated(
            candidateIdRequestBody,
        );

    const supportDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPSupport(
            candidateIdRequestBody,
        );

    const approveDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPApprove(
            candidateIdRequestBody,
        );

    // ===============================form=============================
    // ===============================================================

    const personalDetailForm = await superValidate(personalDetailResponse.data?.details as PersonalDetailDTO, zod(
        _personalInfoSchema))
        ;
    const serviceDetailForm = await superValidate(serviceDetailResponse.data?.details as ServiceDetailDTO, zod(
        _serviceInfoSchema))
        ;
    const pensionDetailForm = await superValidate(pensionDetailResponse.data?.details as PensionDetailDTO, zod(
        _PTBPensionInfoSchema))
        ;
    const salaryDetailForm = await superValidate(salaryDetailResponse.data?.details as SalaryDetailDTO, zod(
        _salaryInfoSchema))
        ;
    const rolesRelatedDetailForm = await superValidate(rolesRelatedDetailResponse.data?.details as RolesRelatedDetailDTO, zod(
        _rolesRelatedEditSchema))
        ;
    const supportDetailForm = await superValidate(supportDetailResponse.data?.details as SupportDetailDTO, zod(
        _supporterInfoSchema))
        ;
    const approveDetailForm = await superValidate(approveDetailResponse.data?.details as ApproveDetailDTO, zod(
        _approveInfoSchema))
        ;



    return {
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
            assetDeclarationLookup,

        },
        candidateIdRequestBody,
        employeeeIdRequestBody,
        pensionDetailResponse,
        personalDetailResponse,
        serviceDetailResponse,
        salaryDetailResponse,
        rolesRelatedDetailResponse,
        supportDetailResponse,
        approveDetailResponse,
        personalDetailForm,
        serviceDetailForm,
        pensionDetailForm,
        salaryDetailForm,
        rolesRelatedDetailForm,
        supportDetailForm,
        approveDetailForm,

    }
}





//
//     const supporterInfoForm = await superValidate(
//         _supporterInfoSchema,
//     )

//     const passerInfoForm = await superValidate(
//         _passerInfoSchema,
//     )
//     // filter
//     const filter: CommonFilterDTO = {
//         program: 'SEMUA',
//         identityCard: null,
//         employeeNumber: null,
//         name: null,
//         position: null,
//         status: null,
//         grade: null,
//         scheme: null,
//     };

//     // request body
//     const param: CommonListRequestDTO = {
//         pageNum: 1,
//         pageSize: 5,
//         orderBy: null,
//         orderType: null,
//         filter: filter,
//     };

//     // fetch apc history
//     const response: CommonResponseDTO =
//         await EmployeeServices.getEmployeeList(param);

//     // convert to apcdto
//     const employeeLookup: DropdownDTO[] = (
//         response.data?.dataList as CommonEmployeeDTO[]
//     ).map((data) => ({
//         value: data.employeeId,
//         name: data.name,
//     }));



//==================================================
//=============== Submit Functions =================
//==================================================



// ========================================================================================
// =========================== add ========================================================
// ========================================================================================

// ================================================================
// ==========  Add Pension Detail ====================================
// ================================================================
export const _pensionDetailSubmit = async (formData: object) => {
    const pensionDetailsInfoForm = await superValidate(formData, (zod)(_PTBPensionInfoSchema));

    if (pensionDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.addPTBKWAPSupport(pensionDetailsInfoForm.data as PensionDetailDTO);
        return { response };
    }

};

// ========================================================================================
// =========================== Edit ========================================================
// ========================================================================================

// ================================================================
// ==========  Edit Pension Detail ====================================
// ================================================================
export const _editpensionDetailSubmit = async (formData: object) => {
    const editPensionDetailsInfoForm = await superValidate(formData, (zod)(_PTBPensionInfoSchema));

    if (editPensionDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editPTBKWAPpensionDetails(editPensionDetailsInfoForm.data as PensionDetailDTO);
        return { response };
    }

};

// ================================================================
// ==========  Edit ROles Related =================================
// ================================================================
export const _editrolesRelatedDetailSubmit = async (formData: object) => {
    const editrolesRelatedDetailsInfoForm = await superValidate(formData, (zod)(_rolesRelatedEditSchema));

    if (editrolesRelatedDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editRolesRelatedDetails(editrolesRelatedDetailsInfoForm.data as RolesRelatedDetailDTO);
        return { response };
    }

};
// ================================================================
// ==========  Edit Pelulus =======================================
// ================================================================
export const _editSupporterDetailSubmit = async (formData: object) => {
    const editSupporterDetailsInfoForm = await superValidate(formData, (zod)(_supporterInfoSchema));

    if (editSupporterDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editRolesRelatedDetails(editSupporterDetailsInfoForm.data as SupportDetailDTO);
        return { response };
    }

};
// ================================================================
// ==========  Edit Penyokong ====================================
// ================================================================
export const _editApproverDetailSubmit = async (formData: object) => {
    const editApproverDetailsInfoForm = await superValidate(formData, (zod)(_approveInfoSchema));

    if (editApproverDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editRolesRelatedDetails(editApproverDetailsInfoForm.data as ApproveDetailDTO);
        return { response };
    }

};