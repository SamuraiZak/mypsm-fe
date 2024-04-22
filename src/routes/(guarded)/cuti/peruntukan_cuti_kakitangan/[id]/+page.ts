import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { EmployeeDetailRequestDTO } from '$lib/dto/core/common/employee/employee-detail-request.dto.js';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { LeaveEntitlementRequestDTO } from '$lib/dto/mypsm/cuti/report/leave-entitlement-request.dto';
import type { LeaveEntitlementDTO } from '$lib/dto/mypsm/cuti/report/leave-entitlement.dto';
import type { LeaveHistoryRequestDTO } from '$lib/dto/mypsm/cuti/report/leave-history-request.dto';
import type { LeaveHistoryDTO } from '$lib/dto/mypsm/cuti/report/leave-history.dto';
import type { LeaveEntitlementFilterDTO } from '$lib/dto/mypsm/leave/leave.dto';
import { LeaveServices } from '$lib/services/implementation/mypsm/cuti/leave.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load({ params }) {
    // get current year
    const currentYear = new Date().getFullYear();

    // get leave entitlement
    let leaveEntitlementList: LeaveEntitlementDTO[] = [];

    const leaveEntitlementFilter: LeaveEntitlementFilterDTO = {
        year: currentYear,
        employeeId: null,
        identityCard: null,
        employeeNo: params.id,
        name: null,
        position: null,
        status: null,
    };

    const leaveEntitlementRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: leaveEntitlementFilter,
    };

    const leaveEntitlementResponse: CommonResponseDTO =
        await LeaveServices.getLeaveEntitlement(leaveEntitlementRequest);

    if (leaveEntitlementResponse.status == 'success') {
        leaveEntitlementList = leaveEntitlementResponse.data
            ?.dataList as LeaveEntitlementDTO[];
    }

    // prepare empty employee detail
    let employeeDetail: CommonEmployeeDTO;

    // prepare employee detail request
    let employeeDetailRequest: EmployeeDetailRequestDTO = {
        employeeNumber: params.id,
    };

    // fetch employee details
    const employeeDetailResponse: CommonResponseDTO =
        await EmployeeServices.getEmployeeDetail(employeeDetailRequest);

    if (employeeDetailResponse.status == 'success') {
        employeeDetail = employeeDetailResponse.data
            ?.details as CommonEmployeeDTO;
    } else {
        employeeDetail = {
            employeeId: 0,
            employeeNumber: 'unknown',
            name: 'unknown',
            identityCard: 'unknown',
            program: 'unknown',
            scheme: 'unknown',
            grade: 'unknown',
            position: 'unknown',
            placement: 'unknown',
        };
    }

    return {
        props: {
            leaveEntitlementList,
            leaveEntitlementFilter,
            leaveEntitlementRequest,
            leaveEntitlementResponse,
            employeeDetail,
        },
    };
}

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await LeaveServices.getLeaveHistory(param);

    return {
        props: {
            param,
            response,
        },
    };
}
