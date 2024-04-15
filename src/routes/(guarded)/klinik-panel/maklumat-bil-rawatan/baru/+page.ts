import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { ClinicPanelTreatmentDetailList, ClinicPanelTreatmentPatientDetail } from "$lib/dto/mypsm/perubatan/clinic-panel-treatment-patient-detail.dto"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import { _addPatientSchema, _addTreatmentSchema, _patientSchema } from "$lib/schemas/mypsm/medical/medical-schema"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup()


    const singlePatientForm = await superValidate(zod(_patientSchema));
    const patientForm = await superValidate(zod(_addPatientSchema));
    const treatmentForm = await superValidate(zod(_addTreatmentSchema));

    return {
        currentRoleCode,
        lookup,
        singlePatientForm,
        patientForm,
        treatmentForm,
    }
}

export const _submitPatientForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addPatientSchema));

    if(form.valid){

    }
}


export const _submitTreatmentForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_addTreatmentSchema));;

    if(form.valid){

    }
}

const getLookup = async () => {
    const employeeListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    }
    const employeeListResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(employeeListRequest);

    const employeeList: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApprover(
        employeeListResponse,
    );
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );
    // -------------------------------------------------------
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );
    return {
        employeeList,
        placementLookup,
        relationshipLookup,
    }
}