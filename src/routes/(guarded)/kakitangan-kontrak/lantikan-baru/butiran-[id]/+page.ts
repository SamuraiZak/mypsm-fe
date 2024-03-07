import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { EditNewContractEmployeeDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/edit-new-contract-employee-detail.dto.js";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import { _editNewContractEmployeeSchema, _uploadDocSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";
import { error } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({params}) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode);

    //form validation
    const editNewContractEmployeeDetailForm = await superValidate(zod(_editNewContractEmployeeSchema));
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

    return {
        currentRoleCode,
        editNewContractEmployeeDetailForm,
        contractUploadDocumentForm,
        selectOption: {
            genderLookup,
            identityCardTypeLookup,
            nationalityLookup,
            raceLookup,
            maritalLookup,
            religionLookup,
            stateLookup,
            ethnicLookup,
        }
    }
}

export const _submitEditNewContractEmployeeDetailForm = async (formData: object) => {
    const form = await superValidate(formData,zod(_editNewContractEmployeeSchema));
    console.log(form)
    if(form.valid){
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

export const _submitDocumentForm = async (file: File | null | undefined) => {
    const documentData = new FormData();
    
    const form = await superValidate(zod(_uploadDocSchema));
    
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    } else if (form.valid){
        const response: CommonResponseDTO =
        await ContractEmployeeServices.addNewContractEmployeeDocument(documentData);
        return { response };
    }
    
};
