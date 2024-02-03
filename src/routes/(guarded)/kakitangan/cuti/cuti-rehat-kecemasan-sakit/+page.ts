import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { HrmisOutOfOfficeLeavesResponse } from '$lib/dto/mypsm/leave/hrmis-leaves/hrmis-leave-out-of-office-response.dto';
import type { HrmisLeavesResponse } from '$lib/dto/mypsm/leave/hrmis-leaves/hrmis-leave-response.dto';
import { LeaveServices } from '$lib/services/implementations/mypsm/leave/leave.service';

export const load = async () => {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
    };

    const hrmisOutOfOfficeResponse: CommonResponseDTO =
        await LeaveServices.getHrmisOutOfOfficeLeaves(param);

    const hrmisLeavesResponse: CommonResponseDTO =
        await LeaveServices.getHrmisLeaves(param);

    const hrmisLeaveList = hrmisLeavesResponse.data
        ?.dataList as HrmisLeavesResponse[];
    const hrmisOutOfOffice = hrmisOutOfOfficeResponse.data
        ?.dataList as HrmisOutOfOfficeLeavesResponse[];

    return {
        hrmisLeaveList,
        hrmisOutOfOffice,
    };
};
