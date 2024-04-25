import type {
    ADEmployeeDetailDTO,
    ADEmployeeDetailRequestDTO,
    ADRoleDTO,
    ADRoleListFilterDTO,
    ADRolePlusDTO,
} from '$lib/dto/core/admin/admin.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service.js';

export async function load({ params }) {
    // set current employeeId
    const currentEmployeeId: number = parseInt(params.id);

    // get employee details
    let currentEmployeeDetail: ADEmployeeDetailDTO | null = null;

    const currentEmployeeDetailRequest: ADEmployeeDetailRequestDTO = {
        id: currentEmployeeId,
    };

    const currentEmployeeDetailResponse: CommonResponseDTO =
        await AdminServices.getEmployeeDetail(currentEmployeeDetailRequest);

    if (currentEmployeeDetailResponse.status == 'success') {
        currentEmployeeDetail = currentEmployeeDetailResponse.data
            ?.details as ADEmployeeDetailDTO;
    }

    // get list roles
    let roleList: ADRoleDTO[] = [];

    const roleListFilter: ADRoleListFilterDTO = {
        code: null,
        description: null,
        userGroupCode: null,
    };

    const roleListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'description',
        orderType: 0,
        filter: roleListFilter,
    };

    const roleListResponse: CommonResponseDTO =
        await AdminServices.getRoleList(roleListRequest);

    if (roleListResponse.status == 'success') {
        roleList = roleListResponse.data?.dataList as ADRoleDTO[];
    }

    return {
        props: {
            currentEmployeeId,
            currentEmployeeDetail,
            roleList,
            roleListFilter,
            roleListResponse,
            roleListRequest,
        },
    };
}

export async function _addRoles(formData: ADRolePlusDTO) {
    const response: CommonResponseDTO = await AdminServices.addRoles(formData);

    return response;
}
