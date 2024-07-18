import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { InterimApplicationDetailDTO, InterimSupport, InterimDownload } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-detail-response.dto";
import type { InterimApplicationResponse } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-response.dto";
import type { EmployeeInterimApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto";
import { _addInterimApprovalSchema, _addNewInterimApplicationSchema, _checklistSchema } from "$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let employeeInterimApplicationDetailResponse: CommonResponseDTO = {}

    let lookup = await getLookup();

    let interimId: EmployeeInterimApplicationDetailRequestDTO = {
        interimId: 0
    }

    //form validation
    const addNewInterimApplicationForm = await superValidate(zod(_addNewInterimApplicationSchema))
    let interimApplicationDetail = {} as InterimApplicationDetailDTO;
    //Employee POV: Get detail for tanggung kerja application
    if (params.id !== "permohonan") {
        interimId.interimId = Number(params.id);

        employeeInterimApplicationDetailResponse =
            await EmploymentInterimServices.getInterimApplicationDetail(interimId)
        interimApplicationDetail =
            employeeInterimApplicationDetailResponse.data?.details as InterimApplicationDetailDTO;
        addNewInterimApplicationForm.data = {
            interimId: interimApplicationDetail.applicationDetail.interimId,
            gradeId: interimApplicationDetail.applicationDetail.grade,
            newPlacementId: interimApplicationDetail.applicationDetail.newPlacement,
            placementId: interimApplicationDetail.applicationDetail.placement,
            reason: interimApplicationDetail.applicationDetail.reason,
            referenceNumber: interimApplicationDetail.applicationDetail.referenceNumber,
            startDate: interimApplicationDetail.applicationDetail.startDate,
            endDate: interimApplicationDetail.applicationDetail.endDate,
            isDraft: true,
        }
    }else {
        addNewInterimApplicationForm.data.interimId = interimId.interimId;
    }



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
            const { isReadOnly, ...tempObj } = form.data
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
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionAndGradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionCode(positionLookupResponse)
    // -------------------------------------------------------

    return {
        placementLookup,
        positionAndGradeLookup,
    }
}