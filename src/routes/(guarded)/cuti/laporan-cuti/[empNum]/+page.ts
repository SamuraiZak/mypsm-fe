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
import { LeaveServices } from '$lib/services/implementation/mypsm/cuti/leave.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load({ params }) {
    // prepare empty employee detail
    let employeeDetail: CommonEmployeeDTO;

    // prepare empty leave entitlement list
    let leaveEntitlement: LeaveEntitlementDTO[] = [];

    // prepare empty leave history list
    let leaveHistory: LeaveHistoryDTO[] = [];

    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    // get current year
    const currentYear = new Date().getFullYear();

    // ===========================================================
    // start fetching employee detail
    // ===========================================================

    if (currentRoleCode == UserRoleConstant.kakitangan.code) {
        // fetch employee details
        const employeeDetailResponse: CommonResponseDTO =
            await EmployeeServices.getCurrentEmployeeDetails();

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
    } else {
        // prepare employee detail request
        let employeeDetailRequest: EmployeeDetailRequestDTO = {
            employeeNumber: params.empNum,
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
    }

    // ===========================================================
    // start fetching leave entitlement
    // ===========================================================

    // build param for leave entitlement req
    const leaveEntitlementRequestParam: LeaveEntitlementRequestDTO = {
        employeeId: employeeDetail.employeeId,
        year: currentYear,
    };

    // build req body for leave entitlement
    const leaveEntitlementRequestBody: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 50,
        orderBy: null,
        orderType: null,
        filter: leaveEntitlementRequestParam,
    };

    // fetch the leave entitlement
    const leaveEntitlementResponse: CommonResponseDTO =
        await LeaveServices.getLeaveEntitlement(leaveEntitlementRequestBody);

    // check the status of leave entitlement request
    if (leaveEntitlementResponse.status == 'success') {
        leaveEntitlement = leaveEntitlementResponse.data
            ?.dataList as LeaveEntitlementDTO[];
    }

    // ===========================================================
    // start fetching leave history
    // ===========================================================

    // build param for leave History req
    const leaveHistoryRequestParam: LeaveHistoryRequestDTO = {
        employeeId: employeeDetail.employeeId,
        year: currentYear,
    };

    // build req body for leave History
    const leaveHistoryRequestBody: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: leaveHistoryRequestParam,
    };

    // fetch the leave History
    const leaveHistoryResponse: CommonResponseDTO =
        await LeaveServices.getLeaveHistory(leaveHistoryRequestBody);

    // check the status of leave History request
    if (leaveHistoryResponse.status == 'success') {
        leaveHistory = leaveHistoryResponse.data?.dataList as LeaveHistoryDTO[];
    }

    return {
        props: {
            currentRoleCode,
            employeeDetail,
            leaveEntitlement,
            leaveEntitlementRequestParam,
            leaveEntitlementRequestBody,
            leaveEntitlementResponse,
            leaveHistory,
            leaveHistoryRequestParam,
            leaveHistoryRequestBody,
            leaveHistoryResponse,
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
