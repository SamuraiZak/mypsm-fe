import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { EmployeeInterimApplicationDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-list-request.dto";
import type { EmployeeInterimApplicationFilter, EmployeeInterimApplicationListResponseDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-list-response.dto";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeInterimApplicationResponse: CommonResponseDTO = {};
    let employeeInterimApplicationList: EmployeeInterimApplicationListResponseDTO[] = [];

    const employeeApplicationFilter: EmployeeInterimApplicationFilter = {
        employeeNumber: null,
        name: null,
        identityCardNumber: null,
        applicationDate: null,
    };

    //Employees' POV: View Application Table
    const employeeApplicationParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: employeeApplicationFilter,
    }

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: employeeApplicationFilter,
    };

    //table for kakitangan
    if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        employeeInterimApplicationResponse =
            await EmploymentInterimServices.getEmployeeApplicationList(employeeApplicationParam);
        if (employeeInterimApplicationResponse.status == "success") {
            employeeInterimApplicationList = employeeInterimApplicationResponse.data?.dataList as EmployeeInterimApplicationListResponseDTO[];
        }
    }
    else {
        employeeInterimApplicationResponse =
            await EmploymentInterimServices.getApplicationList(employeeApplicationParam);
        if (employeeInterimApplicationResponse.status == "success") {
            employeeInterimApplicationList = employeeInterimApplicationResponse.data?.dataList as EmployeeInterimApplicationListResponseDTO[];
        }
    }
    return {
        employeeApplicationParam,
        employeeInterimApplicationResponse,
        employeeInterimApplicationList,
        param,
        currentRoleCode,
    }
}
