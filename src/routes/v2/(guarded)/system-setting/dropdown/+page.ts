import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    LookupCategoryDTO,
} from '$lib/dto/core/lookup/lookup-item.dto';
import { LookupManagementServices } from '$lib/services/implementation/core/lookup/lookup-management.services.js';

const guard: string[] = [UserRoleConstant.admin.code];

export async function load() {
    const filter = {
        name: null,
        url: null,
    };

    // get list
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let lookupCategoryList: LookupCategoryDTO[] = [];

    const response: CommonResponseDTO =
        await LookupManagementServices.getCategoryList(listParam);

    if (response.status == 'success') {
        lookupCategoryList = response.data?.dataList as LookupCategoryDTO[];
    }

    return {
        props: {
            lookupCategoryList,
            listParam,
            response,
        },
    };
}

export async function _updateTable(
    param: CommonListRequestDTO,
) {
    const response: CommonResponseDTO =
        await LookupManagementServices.getCategoryList(param);

    return {
        props: {
            param,
            response,
        },
    };
}
