import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    LookupItemDTO,
    LookupTypeDTO,
} from '$lib/dto/core/lookup/lookup-item.dto';
import { LookupManagementServices } from '$lib/services/implementation/core/lookup/lookup-management.services.js';

const guard: string[] = [UserRoleConstant.admin.code];

export async function load({ params }) {
    const currentType: LookupTypeDTO =
        LookupItemConstant.list.find((item) => item.name == params.type) ??
        LookupItemConstant.department;

    const filter: LookupItemDTO = {
        // general
        id: null,
        code: null,
        description: null,
        typeCode: null,
        // employment status
        occSectorCode: null,
        occSectorName: null,
        // grades
        ssmCode: null,
        minimumSalary: null,
        maximumSalary: null,
        annualIncrementRate: null,
        // sections
        departmentCode: null,
        // units
        sectionCode: null,
    };

    // get list
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 50,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let lookupList: LookupItemDTO[] = [];

    const response: CommonResponseDTO =
        await LookupManagementServices.filterList(listParam, currentType);

    if (response.status == 'success') {
        lookupList = response.data?.dataList as LookupItemDTO[];
    }

    return {
        props: {
            currentType,
            lookupList,
            listParam,
            response,
        },
    };
}

export async function _updateTable(
    param: CommonListRequestDTO,
    type: LookupTypeDTO,
) {
    const response: CommonResponseDTO =
        await LookupManagementServices.filterList(param, type);

    return {
        props: {
            param,
            response,
        },
    };
}
