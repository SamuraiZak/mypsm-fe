import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { MedicalClaimsAdd } from "$lib/dto/mypsm/perubatan/medical-claim-add.dto.js"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import { _addEmployeeClaimsSchema } from "$lib/schemas/mypsm/medical/medical-schema"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let employeeId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;

    if(currentRoleCode == UserRoleConstant.kakitangan.code){
        const employeeDetailResponse: CommonResponseDTO =
            await MedicalServices.getMedicalEmployeeDetail(employeeId)
        employeeDetail =
            employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    }

    const addClaimsForm = await superValidate(zod(_addEmployeeClaimsSchema))

    return {
        currentRoleCode,
        employeeDetail,
        addClaimsForm,
        lookup,
    }
}

export const _submitAddClaimsForm = async (formData: MedicalClaimsAdd) => {
    const form = await superValidate(formData, zod(_addEmployeeClaimsSchema));

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addMedicalEmployeeClaims(form.data as MedicalClaimsAdd)

            return { response }
    }
}

const getLookup = async () => {
    const clinicLookupResponse: CommonResponseDTO =
        await LookupServices.getClinicPanelList();

    const clinicLookup: DropdownDTO[] =
        LookupServices.setClinicOptions(clinicLookupResponse);

        return { clinicLookup }
}