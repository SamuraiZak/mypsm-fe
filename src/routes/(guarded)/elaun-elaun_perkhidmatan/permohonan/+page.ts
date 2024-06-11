import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    AllowanceApplicationFilterDTO,
    AllowanceApplicationListDTO,
} from '$lib/dto/mypsm/allowance/allowance.dto';
import { AllowanceServices } from '$lib/services/implementation/mypsm/allowance/allowance.service';

export async function load() {
    // set filter
    const filter: AllowanceApplicationFilterDTO = {
        employeeNumber: null,
        name: null,
        allowanceType: null,
        applicationDate: null,
        status: null,
    };

    // set parameter
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // set default list value
    let allowanceApplicationList: AllowanceApplicationListDTO[] = [];

    // fetch list
    const response: CommonResponseDTO =
        await AllowanceServices.getApplicationList(listParam);

    // set list value
    if (response.status == 'success') {
        allowanceApplicationList = response.data
            ?.dataList as AllowanceApplicationListDTO[];
    }

    return {
        props: {
            allowanceApplicationList,
            listParam,
            response,
        },
    };
}
