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


import {
    _personalInfoSchema, _serviceInfoSchema, _PTBInfoSchema, _resultInfoSchema, _meetingInfoSchema, _supporterInfoSchema, _passerInfoSchema
} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import type { PTBIDRequestBody } from '$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-employeeid-request.view-dto';
import { PTBKWAPServices } from '$lib/services/implementation/mypsm/PTB-KWAP/PTB.service';
import type { PTBPersonalDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/PTB-KWAP-personal-detail.dto';
import type { PTBServiceDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-service-detail.dto';
import type { ptbPensionResponseDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/ptb-kwap-pension-detail.dto';
import type { ptbPensionRequestDTO } from '$lib/dto/mypsm/employment/PTB-KWAP/add-ptb-kwap-service-detail.dto';




//==================================================
//=============== Load Function ====================
//==================================================

// const authorisedRoleCode : string[] = [
//     UserRoleConstants.calon

export async function load({ params }) {


    const candidateIdRequestBody: PTBIDRequestBody = {
        id: Number(params.id),
    };

    const personalDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPPersonalDetails(
            candidateIdRequestBody,
        );

    const personalDetails: PTBPersonalDTO = personalDetailResponse.data
        ?.details as PTBPersonalDTO;


    const serviceDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPServiceDetails(
            candidateIdRequestBody,
        );

    const serviceDetails: PTBServiceDTO = serviceDetailResponse.data
        ?.details as PTBServiceDTO;

        const pensionDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPpensionDetails(
            candidateIdRequestBody,
        );

    const pensionDetails: ptbPensionResponseDTO = pensionDetailResponse.data
        ?.details as ptbPensionResponseDTO;

console.log(pensionDetails)
    
    const personalInfoForm = await superValidate(
        _personalInfoSchema,
    );
    const serviceInfoForm = await superValidate(
        _serviceInfoSchema,
    )

    const PTBInfoForm = await superValidate(
        pensionDetails,
        _PTBInfoSchema,
    )
    const resultInfoForm = await superValidate(
        _resultInfoSchema,
    )

    const meetingInfoForm = await superValidate(
        _meetingInfoSchema,
    )
    const supporterInfoForm = await superValidate(
        _supporterInfoSchema,
    )

    const passerInfoForm = await superValidate(
        _passerInfoSchema,
    )
    // filter
    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    // request body
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // fetch apc history
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    // convert to apcdto
    const employeeLookup: DropdownDTO[] = (
        response.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: data.employeeId,
        name: data.name,
    }));






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
            employeeLookup,
            assetDeclarationLookup,

        },
        personalInfoForm,
        serviceInfoForm,
        PTBInfoForm,
        resultInfoForm,
        meetingInfoForm,
        supporterInfoForm,
        passerInfoForm,
        personalDetails,
        serviceDetails,
        pensionDetails,
    }
};









//==================================================
//=============== Submit Functions =================
//==================================================
export const _personalInfoSubmit = async (formData: object) => {
    const personalInfoForm = await superValidate(
        formData,
        _personalInfoSchema,
    );
    console.log(personalInfoForm)
    if (personalInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(personalInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (personalInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

export const _serviceInfoSubmit = async (formData: object) => {
    const serviceInfoForm = await superValidate(
        formData,
        _serviceInfoSchema,
    );
    console.log(serviceInfoForm)
    if (serviceInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(serviceInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (serviceInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}



export const _PTBInfoSubmit = async (formData: object) => {
    const form = await superValidate(formData, _PTBInfoSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await PTBKWAPServices.addPTBKWAPpensionDetails(
            form.data as ptbPensionRequestDTO,
        );

    return { response };
};



























export const _resultInfoSubmit = async (formData: object) => {
    const resultInfoForm = await superValidate(
        formData,
        _resultInfoSchema,
    );
    console.log(resultInfoForm)
    if (resultInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(resultInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (resultInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

export const _meetingInfoSubmit = async (formData: object) => {
    const meetingInfoForm = await superValidate(
        formData,
        _meetingInfoSchema,
    );
    console.log(meetingInfoForm)
    if (meetingInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(meetingInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (meetingInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _supporterInfoSubmit = async (formData: object) => {
    const supporterInfoForm = await superValidate(
        formData,
        _supporterInfoSchema,
    );
    console.log(supporterInfoForm)
    if (supporterInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(supporterInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (supporterInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _passerInfoSubmit = async (formData: object) => {
    const passerInfoForm = await superValidate(
        formData,
        _passerInfoSchema,
    );
    console.log(passerInfoForm)
    if (passerInfoForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(passerInfoForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (passerInfoForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}