import { SystemConstant } from '$lib/constants/core/system/system.constant';
import type {
    ADEmployeeDetailDTO,
    ADEmployeeDetailRequestDTO,
    ADRoleDTO,
    ADRoleListFilterDTO,
    ADRolePlusDTO,
} from '$lib/dto/core/admin/admin.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type {
    AccountDetailsDTO,
    AccountDetailsRequestDTO,
    Role,
} from '$lib/dto/core/user-account/user-account.dto';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service.js';
import { AccountServices } from '$lib/services/implementation/core/user-account/user-account.service';

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

    let accountDetails: AccountDetailsDTO = {
        name: 'Jon Bovi',
        currentRole: 'kakitangan',
        currentRoleCode: '30f9b9da-429d-4965-b1fd-734843c1ed28',
        roles: [

        ],
        module: SystemConstant.systemModules,
        passwordExpired: false,
    };

    const accountDetailsRequest: AccountDetailsRequestDTO = {
        employeeId: parseInt(params.id),
    };

    const accountDetailResponse: CommonResponseDTO =
        await AccountServices.getTargetEmployeesDetail(accountDetailsRequest);

    if (accountDetailResponse.status == 'success') {
        accountDetails = accountDetailResponse.data
            ?.details as AccountDetailsDTO;
    }

    // get list roles
    let roleList: Role[] = [];

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
        roleList = roleListResponse.data?.dataList as Role[];
    }

    return {
        props: {
            currentEmployeeId,
            currentEmployeeDetail,
            roleList,
            roleListFilter,
            roleListResponse,
            roleListRequest,
            accountDetails,
        },
    };
}

export async function _addRoles(formData: ADRolePlusDTO) {
    const response: CommonResponseDTO = await AdminServices.addRoles(formData);

    return response;
}
