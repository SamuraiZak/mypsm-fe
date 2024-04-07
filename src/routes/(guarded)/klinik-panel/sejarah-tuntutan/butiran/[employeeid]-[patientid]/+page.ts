import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { ClinicPanelTreatmentDetailList, ClinicPanelTreatmentPatientDetail } from "$lib/dto/mypsm/perubatan/clinic-panel-treatment-patient-detail.dto"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"

export const load = async ({ params }) => {
    const employeeId: commonIdRequestDTO = {
        id: Number(params.employeeid)
    }
    const patientId: commonIdRequestDTO = {
        id: Number(params.patientid)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;
    let patientDetail: ClinicPanelTreatmentPatientDetail[] = [];
    let treatmentDetail: ClinicPanelTreatmentDetailList[] = [];
    const lookup = await getLookup()

    const employeeDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimEmployee(employeeId)
    employeeDetail =
        employeeDetailResponse.data?.details as MedicalEmployeeDetail;

    const patientDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimPatient(patientId)
    patientDetail =
        patientDetailResponse.data?.details as ClinicPanelTreatmentPatientDetail[];

    const treatmentDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimPatientTreatment(patientId)
    treatmentDetail =
        treatmentDetailResponse.data?.dataList as ClinicPanelTreatmentDetailList[];

    console.log(treatmentDetailResponse)
    return {
        employeeDetail,
        patientDetail,
        lookup,
        treatmentDetail,
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