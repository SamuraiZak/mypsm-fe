import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load() {
    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    if (currentRoleCode == UserRoleConstant.kakitangan.code) {
        // prepare empty employee detail
        let employeeDetail: CommonEmployeeDTO;

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

        let redirectUrl: string =
            '/cuti/laporan-cuti/' + employeeDetail.employeeNumber;

        goto(redirectUrl);
    } else {
        // prepare empty employee list
        let employeeList: CommonEmployeeDTO[] = [];

        // prepare employee list filter
        const employeeListFilter: CommonFilterDTO = {
            program: 'SEMUA',
            identityCard: null,
            employeeNumber: null,
            name: null,
            position: null,
            status: null,
            grade: null,
            scheme: null,
        };

        // prepare employee list request body
        const employeeListRequestBody: CommonListRequestDTO = {
            pageNum: 1,
            pageSize: 5,
            orderBy: null,
            orderType: null,
            filter: employeeListFilter,
        };

        // fetch employee list
        const employeeListResponse: CommonResponseDTO =
            await EmployeeServices.getEmployeeList(employeeListRequestBody);

        if (employeeListResponse.status == 'success') {
            employeeList = employeeListResponse.data
                ?.dataList as CommonEmployeeDTO[];
        }

        return {
            props: {
                employeeList,
                employeeListFilter,
                employeeListRequestBody,
                employeeListResponse,
            },
        };
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
