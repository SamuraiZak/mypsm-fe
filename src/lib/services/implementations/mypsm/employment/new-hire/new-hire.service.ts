// ===============================================================
// Employment - New Hire Module Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import { NewHireListRequestConvert, type NewHireListRequestViewModel } from "$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model";
import { NewHireListResponseConvert, type NewHireListResponseViewModel } from "$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model";


export class NewHireServices {
    static async getNewHireList(param: NewHireListRequestViewModel): Promise<NewHireListResponseViewModel>{

        // fetch data
        const response: Response = await http.post('employments/new-hires',{
            body: NewHireListRequestConvert.toJson(param)
        }).json();

        if (response.status >= 200 && response.status < 300) {
            return NewHireListResponseConvert.fromResponse(response);
        } else {
            throw new Error("Unknown error");
        }
    }
}