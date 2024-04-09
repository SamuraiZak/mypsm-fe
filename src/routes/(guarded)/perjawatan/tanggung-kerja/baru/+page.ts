import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { InterimApplicationResponse } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-response.dto";
import { _addNewInterimApplicationSchema } from "$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let lookup = await getLookup();
    //form validation
    const addNewInterimApplicationForm = await superValidate(zod(_addNewInterimApplicationSchema))

    return {
        currentRoleCode,
        lookup,
        addNewInterimApplicationForm,
    }
}

export const _submitAddNewInterimApplicationForm = async (formData: InterimApplicationResponse) => {
    const form = await superValidate(formData, zod(_addNewInterimApplicationSchema));

    if (form.valid) {
        if (form.valid) {
            const { isReadOnly, interimId, ...tempObj } = form.data
            const response: CommonResponseDTO =
                await EmploymentInterimServices.addNewInterimApplication(
                    tempObj as InterimApplicationResponse,
                )
            return { response };
        }
    }
};

const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(gradeLookupResponse);
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(departmentLookupResponse)
    // -------------------------------------------------------

    return {

        gradeLookup,
        placementLookup,
        positionLookup,
        departmentLookup,

    }
}