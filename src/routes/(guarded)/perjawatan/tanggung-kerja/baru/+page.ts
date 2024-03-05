import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { AddNewInterimApplicationDetailDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-new-application-detail.dto";
import { _addNewInterimApplicationSchema } from "$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";
import { superValidate } from "sveltekit-superforms/client";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    //form validation
    const addNewInterimApplicationForm = await superValidate(_addNewInterimApplicationSchema)

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
        currentRoleCode,
        addNewInterimApplicationForm,
        selectionOptions: {
            gradeLookup,
            placementLookup,
            positionLookup,
            departmentLookup,
        }
    }
}

export const _submitAddNewInterimApplicationForm = async (formData: object) => {
    const addNewInterimApplicationForm = await superValidate(
        formData,
        _addNewInterimApplicationSchema,
    );
    if(addNewInterimApplicationForm.valid){
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addNewInterimApplication(
                addNewInterimApplicationForm.data as AddNewInterimApplicationDetailDTO,
            )
        if (addNewInterimApplicationForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
