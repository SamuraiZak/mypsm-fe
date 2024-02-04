import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ApcEmployeeDTO } from '$lib/dto/mypsm/lnpt/apc/apc-employee.dto';
import { mockLnptApc } from '$lib/mocks/lnpt/lnptApc';
import { LNPTServices } from '$lib/services/implementations/mypsm/lnpt/lnpt.service';

export async function load() {
    const LnptApcRecord: IntLnptApc[] = await mockLnptApc;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {},
    };

    const response: CommonResponseDTO = await LNPTServices.getAPCHistory(param);

    const apcHistory: ApcEmployeeDTO[] = response.data
        ?.dataList as ApcEmployeeDTO[];

    return {
        props: {
            param,
            apcHistory,
        },
    };
}
