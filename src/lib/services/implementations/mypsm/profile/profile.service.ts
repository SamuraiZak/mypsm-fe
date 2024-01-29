import http from '$lib/services/provider/service-provider.service';
import type { GetPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-get-personal-detail-response.modal';
import type { PutPersonalDetailRequest } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-request.modal';
import type { PutPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-response.modal';





export class EmployeeService {


    static async ProfileDetail(
        param: PutPersonalDetailRequest,
    ): Promise<GetPersonalDetailResponse> {
        const response: GetPersonalDetailResponse = await http
            .put(`personal-details/detail`, {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }





}

