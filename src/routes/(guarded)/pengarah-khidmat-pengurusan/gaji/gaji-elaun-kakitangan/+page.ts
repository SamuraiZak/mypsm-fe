import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ListAllowanceDTO } from '$lib/dto/mypsm/salary/salary-allowance/list-allowance.dto';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { loadingState } from '$lib/stores/globalState';

export async function load() {
    // const LnptApcRecord: IntLnptApc[] = await mockLnptApc;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            employeeNumber: '',
            name: '',
            identityCard: '',
            allowance: null as number | null,
            month: null as number | null,
            status: '',
        },
    };

    const response: CommonResponseDTO =
        await SalaryServices.getSalaryAllowancePengarahList(param);

    const salaryAllowanceHistory: ListAllowanceDTO[] = response.data
        ?.dataList as ListAllowanceDTO[];

    return {
        props: {
            param,
            response,
            salaryAllowanceHistory,
        },
    };
}
export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);
    param.filter.allowance =
        Number(param.filter.allowance) == 0
            ? null
            : Number(param.filter.allowance);
    const response: CommonResponseDTO =
        await SalaryServices.getSalaryAllowanceList(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}
