import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingChargeListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';

export const load = async () => {
    let proceedingListResponse: CommonResponseDTO = {};
    let proceedingList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            proceedingTypeId: null, // 0 or Null: All | 1: Perkhidmatan | 2: PSL
            identityCard: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    // proceeding list
    proceedingListResponse =
        await IntegrityProceedingServices.getProceedingChargeRecordList(param);

    proceedingList =
        (proceedingListResponse.data
            ?.dataList as ProceedingChargeListResponseDTO) ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

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
            statusLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingChargeRecordList(param);

    return {
        param,
        response,
    };
};
