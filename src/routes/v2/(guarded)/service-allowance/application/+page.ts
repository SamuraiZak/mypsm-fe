import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { ServiceAllowanceServices } from '$lib/services/v2/service-allowance/service-allowance.service';

export async function load({ parent }) {
    const filter = {
        employeeNumber: null,
        name: null,
        identityDocumentNumber: null,
        allowanceType: null,
        applicationDate: null,
        status: null,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationDate',
        orderType: 1,
        filter: filter,
    };

    const response: CommonResponseDTO =
        await ServiceAllowanceServices.getApplicationList(request);

    const { layoutData } = await parent();

    return {
        props: {
            request,
            response,
            filter,
            layoutData,
        },
    };
}
