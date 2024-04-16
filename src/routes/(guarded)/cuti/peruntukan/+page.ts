import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    LeaveEntitlementDTO,
    LeaveEntitlementFilterDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { LeaveServices } from '$lib/services/implementation/mypsm/leave/leave.service';

export async function load() {
    // get current year
    const currentYear = new Date().getFullYear();

    // get leave entitlement
    let leaveEntitlementList: LeaveEntitlementDTO[] = [];

    const leaveEntitlementFilter: LeaveEntitlementFilterDTO = {
        year: currentYear,
        employeeID: null,
        identityCard: null,
        employeeNo: null,
        name: null,
        position: null,
        status: null,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: leaveEntitlementFilter,
    };

    const response: CommonResponseDTO =
        await LeaveServices.getEntitlementList(request);

    if (response.status == 'success') {
        leaveEntitlementList = response.data?.dataList as LeaveEntitlementDTO[];
    }

    return {
        props: {
            leaveEntitlementList,
            leaveEntitlementFilter,
            request,
            response,
        },
    };
}
