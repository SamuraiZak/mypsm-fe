import { GradeActingService } from '$lib/services/implementations/mypsm/perjawatan/grade-acting/grade-acting-services.service';
import { ActingServices } from '$lib/services/implementations/mypsm/employment/acting/acting.service';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO, Meta } from '$lib/dto/core/common/common-response.dto';
import type { PMGEmployeeListDTO } from '$lib/dto/mypsm/employment/acting/pmg-employee-response.dto';

export async function load() {
    const employeeRequestBody: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const employeeResponse: PMGEmployeeListDTO[] =
        await ActingServices.getEmployeeList(employeeRequestBody);

    return { employeeResponse };
}