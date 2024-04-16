import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { ClinicPanelProfile } from "$lib/dto/mypsm/perubatan/clinic-panel-profile.dto"
import type { TreatmentAddPatient } from "$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-patient.dto"
import type { TreatmentAddTreatmentDetail } from "$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-treatment-detail.dto"
import { _addPatientSchema, _addTreatmentSchema, _patientSchema, _patientTreatmentSchema, _treatmentSchema } from "$lib/schemas/mypsm/medical/medical-schema"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup()
    let profile = {} as ClinicPanelProfile;

    const clinicPanelProfileResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelProfile()
    profile =
        clinicPanelProfileResponse.data?.details as ClinicPanelProfile;

    const singlePatientForm = await superValidate(zod(_patientSchema));
    const patientForm = await superValidate(zod(_addPatientSchema));
    const singleTreatmentForm = await superValidate(zod(_treatmentSchema));
    const treatmentForm = await superValidate(zod(_addTreatmentSchema));
    return {
        currentRoleCode,
        lookup,
        singlePatientForm,
        patientForm,
        treatmentForm,
        singleTreatmentForm,
        profile,
    }
}

export const _submitPatientForm = async (formData: TreatmentAddPatient) => {
    const form = await superValidate(formData, zod(_addPatientSchema));
    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimPatient(form.data as TreatmentAddPatient)

        return { response }
    }
}


export const _submitTreatmentForm = async (formData: TreatmentAddTreatmentDetail) => {
    const form = await superValidate(formData, zod(_addTreatmentSchema));;

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimTreatment(form.data as TreatmentAddTreatmentDetail)

        return { response }
    }
}

export const _getEmployee = async (param: number) => {

    const request: commonIdRequestDTO = {
        id: param,
    }

    const response: CommonResponseDTO =
        await MedicalServices.getMedicalEmployeeDetail(request)

    return { response }
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