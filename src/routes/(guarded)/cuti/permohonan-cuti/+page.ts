import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { LeaveHistoryRequestDTO } from '$lib/dto/mypsm/cuti/report/leave-history-request.dto';
import type { LeaveHistoryDTO } from '$lib/dto/mypsm/cuti/report/leave-history.dto';
import { DropdownHelper } from '$lib/helpers/core/dropdown.helper';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveServices } from '$lib/services/implementation/mypsm/cuti/leave.service';

export async function load() {
    // prepare empty leave history list
    let leaveHistory: LeaveHistoryDTO[] = [];

    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    // get current year
    const currentYear = new Date().getFullYear();

    // ===========================================================
    // start fetching leave history
    // ===========================================================

    // build param for leave History req
    const leaveHistoryRequestParam: LeaveHistoryRequestDTO = {
        year: currentYear,
        employeeId: null,
        identityCard: null,
        staffNo: null,
        staffName: null,
        position: null,
        status: null,
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

    // prepare year dropdown
    const yearDropdownList: DropdownDTO[] = DropdownHelper.getYearDropdown();

    // prepare status dropdown
    const leaveStatusDropdownList: DropdownDTO[] =
        DropdownHelper.getLeaveStatusDropdown();

    // get leave types
    let leaveTypeDropdown: DropdownDTO[] = [];

    let leaveTypeListResponse: CommonResponseDTO =
        await LookupServices.getLeaveTypeEnums();

    if (leaveTypeListResponse.status == 'success') {
        let leaveTypeLookup: LookupDTO[] = leaveTypeListResponse.data
            ?.dataList as LookupDTO[];

        leaveTypeDropdown = LookupHelper.toDropdownProper(leaveTypeLookup);
    }

    return {
        props: {
            currentRoleCode,
            leaveHistory,
            leaveHistoryRequestParam,
            leaveHistoryRequestBody,
            leaveHistoryResponse,
            yearDropdownList,
            leaveStatusDropdownList,
            leaveTypeDropdown,
        },
    };
}

export async function _updateLeaveHistoryTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await LeaveServices.getLeaveHistory(param);

    return {
        props: {
            param,
            response,
        },
    };
}
