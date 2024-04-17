import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    let proceedingListResponse: CommonResponseDTO = {};
    let proceedingList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const { roles } = await parent();

    if (roles.isStaffRole) {
        error(401, { message: 'Akses ditolak' });
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 0,
        filter: {
            employeeNumber: null,
            name: null,
            identityCardNumber: null,
            position: null,
            grade: null,
            serviceYear: null,
        },
    };

    // proceeding list
    proceedingListResponse =
        await IntegrityProceedingServices.getEmployeeList(param);

    proceedingList = proceedingListResponse.data?.dataList ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(positionLookupResponse);

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        list: {
            proceedingList,
        },
        responses: {
            proceedingListResponse,
        },
        selectionOptions: {
            positionLookup,
            gradeLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await IntegrityProceedingServices.getEmployeeList(param);

    return {
        param,
        response,
    };
};
