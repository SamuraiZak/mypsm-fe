import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto.js';
import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service.js';

export const load = async ({ params }) => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };  

    const actingEmployeeListResponse: CommonResponseDTO = 
        await EmploymentActingServices.getActingEmployeeList(param);
    
    let actingEmployeeList : CommonEmployeeDTO[] = [];

    if (actingEmployeeListResponse.status == "success") {
        actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    const actingTypes: string = params.id;
    return {
        actingEmployeeList,
        actingEmployeeListResponse,
        param,
        actingTypes
    };

};