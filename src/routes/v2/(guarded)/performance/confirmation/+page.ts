import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { EmployeeListFilterDTO } from '$lib/dto/core/admin/admin.dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { TableDTO } from '$lib/dto/core/table/table.dto';
import type { ApcDTO } from '$lib/dto/mypsm/lnpt/apc.dto';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';

const guard: string[] = [UserRoleConstant.urusSetiaLnpt.code];

export async function load() {
    // get list of employee
    let employeeList: CommonEmployeeDTO[] = [];

    const employeeListFilter: CommonFilterDTO = {
        program: 'PERCUBAAN',
        employeeNumber: null,
        name: null,
        identityDocumentNumber: null,
        scheme: null,
        grade: null,
        position: null,
    };

    const employeeListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: employeeListFilter,
    };

    const employeeListResponse: CommonResponseDTO =
        await AdminServices.getEmployeeList(employeeListRequest);

    if (employeeListResponse.status == 'success') {
        employeeList = employeeListResponse.data
            ?.dataList as CommonEmployeeDTO[];
    }

    // prepare mocks for lnpt average filters
    let lnptAverageFilters: object = {
        employeeIds: [],
        years: 2021,
        duration: 2,
    };

    // prepare mocks for lnpt average params
    let lnptAverageParams: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: lnptAverageFilters,
    };

    // lnpt average table
    let tableLNPT: TableDTO = {
        param: lnptAverageParams,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: [],
        hiddenData: ['employeeId'],
    };

    return {
        props: {
            employeeList,
            employeeListRequest,
            employeeListResponse,
            tableLNPT,
        },
    };
}

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    return {
        props: {
            param,
            response,
        },
    };
}

export async function _getAverage(lnptAverageParams: CommonListRequestDTO) {
    const lnptAverageResponse: CommonResponseDTO =
        await LNPTServices.getAverageProbation(lnptAverageParams);

    return {
        props: {
            lnptAverageParams,
            lnptAverageResponse,
        },
    };
}
