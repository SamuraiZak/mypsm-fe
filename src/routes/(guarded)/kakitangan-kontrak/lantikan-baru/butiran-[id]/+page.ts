import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CandidateIDRequestBody } from "$lib/dto/core/common/candidate-id-request.view-dto.js";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { AddNewContractEmployeeAcademicDTO, ContractAcademic } from "$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto.js";
import type { EditNewContractEmployeeDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto.js";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import { _addContractAcademicSchema, _contractAcademicSchema, _editNewContractEmployeeSchema, _uploadDocSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { error } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params }) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    const contractId: CandidateIDRequestBody = {
        id: Number(params.id)
    };

    // const academicDetailContract: CommonResponseDTO =
    //     await ContractEmployeeServices.getContractAcademicDetail(contractId);

    //form validation
    const editNewContractEmployeeDetailForm = await superValidate(zod(_editNewContractEmployeeSchema));
    const academicDetailForm = await superValidate(zod(_addContractAcademicSchema));
    // const academicDetailForm = await superValidate(
    //     academicDetailContract.data
    //         ?.details as AddNewContractEmployeeAcademicDTO,
    //     _contractAcademicSchema,
    // );
    const contractUploadDocumentForm = await superValidate(zod(_uploadDocSchema));


    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);
    // -------------------------------------------------------
    const identityCardTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getIdentityCardColor();

    const identityCardTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(identityCardTypeLookupResponse)
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse)
    // -------------------------------------------------------
    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(nationalityLookupResponse)
    // -------------------------------------------------------
    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse)
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(religionLookupResponse)
    // -------------------------------------------------------
    const ethnicLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(ethnicLookupResponse)
    // -------------------------------------------------------
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );
    // -------------------------------------------------------
    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);
    // -------------------------------------------------------
    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );
    // -------------------------------------------------------
    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );
    // -------------------------------------------------------
    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );
    // -------------------------------------------------------
    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );


    return {
        currentRoleCode,
        editNewContractEmployeeDetailForm,
        contractUploadDocumentForm,
        academicDetailForm,
        selectOption: {
            genderLookup,
            identityCardTypeLookup,
            nationalityLookup,
            raceLookup,
            maritalLookup,
            religionLookup,
            stateLookup,
            ethnicLookup,
            relationshipLookup,
            countryLookup,
            cityLookup,
            assetDeclarationLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
        }
    }
}

export const _submitEditNewContractEmployeeDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_editNewContractEmployeeSchema));
    
    if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.editNewContractEmployeeDetail(
                form.data as EditNewContractEmployeeDetailDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitAcademicDetailForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addContractAcademicSchema));
   
    if (form.valid) {
        const tempFormData: AddNewContractEmployeeAcademicDTO = {
            academics: [form.data],
        }

        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeAcademic(
                tempFormData as AddNewContractEmployeeAcademicDTO,
            )
        if (form.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};

export const _submitDocumentForm = async (file: File | null | undefined) => {
    const documentData = new FormData();

    const form = await superValidate(zod(_uploadDocSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    } else if (form.valid) {
        const response: CommonResponseDTO =
            await ContractEmployeeServices.addNewContractEmployeeDocument(documentData);
        return { response };
    }

};
