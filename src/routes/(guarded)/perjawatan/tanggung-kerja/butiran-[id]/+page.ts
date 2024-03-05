import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { EmployeeInterimApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service.js";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeInterimApplicationDetailResponse: CommonResponseDTO = {}
    //Employee POV: Get detail for tanggung kerja application
    const interimId: EmployeeInterimApplicationDetailRequestDTO = {
        interimId: Number(params.id)
    }

    if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        employeeInterimApplicationDetailResponse =
            await EmploymentInterimServices.getInterimApplicationDetail(interimId)
    }

    const filter: CommonFilterDTO = {
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let dataList;

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
        employeeInterimApplicationDetailResponse,
        dataList,
        currentRoleCode,
        selectionOptions: {
            gradeLookup,
            placementLookup,
            positionLookup,
            departmentLookup,
        }
    }
}