import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert, type CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { PMGEmployeeListDTO } from "$lib/dto/mypsm/employment/acting/pmg-employee-response.dto";
import http from "$lib/services/provider/service-provider.service";

export class ActingServices {
    static async getEmployeeList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http.post('clinics/employees', {
            body: CommonListRequestConvert.toJson(param)
        }).json();

        let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);

        let employeeList : PMGEmployeeListDTO[] = result.data?.dataList as PMGEmployeeListDTO[]
        return employeeList;
    }
}