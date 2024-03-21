import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ServiceAllowanceListFilterDTO, ServiceAllowanceListItemDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto';
import { ServiceAllowanceServices } from '$lib/services/implementation/mypsm/elaun-elaun-perkhidmatan/service-allowance.service';

export async function load() {
    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    // prepare empty allowance list
    let allowanceList: ServiceAllowanceListItemDTO[] = [];

    // list request filter
    const allowanceListFilter: ServiceAllowanceListFilterDTO = {
        employeeNumber: null,
        name: null,
        allowanceType: null,
        applicationDate: null,
        status: null,
    };

    // list request body
    const allowanceListRequestBody: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: allowanceListFilter,
    };

    // fetch the leave History
    const allowanceListResponse: CommonResponseDTO =
        await ServiceAllowanceServices.getAllowanceList(
            allowanceListRequestBody,
        );

    if (allowanceListResponse.status == 'success') {
        allowanceList = allowanceListResponse.data
            ?.dataList as ServiceAllowanceListItemDTO[];
    }

    return {
        props: {
            currentRoleCode,
            allowanceList,
            allowanceListRequestBody,
            allowanceListResponse,
        },
    };
}

export async function _updateAllowanceTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await ServiceAllowanceServices.getAllowanceList(param);

    return {
        props: {
            param,
            response,
        },
    };
}
