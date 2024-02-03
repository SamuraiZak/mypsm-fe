import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert, type CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { SalaryMovementListDTO } from "$lib/dto/mypsm/salary/salary-movement/salary-movement-list.dto";
import http from "$lib/services/provider/service-provider.service";

export class SalaryServices {
    static async getSalaryMovementList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http.post('salaries/salary-movements', {
            body: CommonListRequestConvert.toJson(param)
        }).json();

        let result : CommonResponseDTO =  CommonResponseConvert.fromResponse(response);

        let salaryMovementList : SalaryMovementListDTO[] = result.data?.dataList as SalaryMovementListDTO[]
        return salaryMovementList;
    }
}