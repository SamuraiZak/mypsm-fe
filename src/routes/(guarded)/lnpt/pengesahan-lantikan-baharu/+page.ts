import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { TableDTO } from '$lib/dto/core/table/table.dto';
import type { ApcDTO } from '$lib/dto/mypsm/lnpt/apc.dto';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';

const guard: string[] = [UserRoleConstant.urusSetiaLnpt.code];

export async function load() {
    // check guard
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    if (currentRoleCode !== null && guard.includes(currentRoleCode)) {
        // TODO: your code here

        // filter
        const filter: CommonFilterDTO = {
            program: 'PERCUBAAN',
            identityCard: null,
            employeeNumber: null,
            name: null,
            position: null,
            status: null,
            grade: null,
            scheme: null,
        };

        // request body
        const param: CommonListRequestDTO = {
            pageNum: 1,
            pageSize: 5,
            orderBy: null,
            orderType: null,
            filter: filter,
        };

        // fetch employeelist
        const response: CommonResponseDTO =
            await EmployeeServices.getEmployeeList(param);

        // convert to common employee list
        const employeeList: CommonEmployeeDTO[] = response.data
            ?.dataList as CommonEmployeeDTO[];

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
                param,
                response,
                employeeList,
                tableLNPT,
            },
        };
    } else {
        error(401);
    }
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
        await LNPTServices.getAveragePermanent(lnptAverageParams);

    return {
        props: {
            lnptAverageParams,
            lnptAverageResponse,
        },
    };
}
