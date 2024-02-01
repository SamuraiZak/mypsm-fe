// ===============================================================
// Medical Services
// ===============================================================

import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import http from "$lib/services/provider/service-provider.service";

export class MedicalServices {
    static async getKPEmployeeList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http.post('clinics/employees', {
            body: CommonListRequestConvert.toJson(param)
        }).json();

        return CommonResponseConvert.fromResponse(response);
    }
}