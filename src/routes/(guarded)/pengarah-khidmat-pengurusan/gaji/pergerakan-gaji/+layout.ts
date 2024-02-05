import type { ListSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval.dto';
import type { ListSalaryMovementApprovalFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import  { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import { loadingState } from '$lib/stores/globalState';

export async function load() {
    // showLoadingOverlay.set(true)
    // const filter: ListSalaryMovementApprovalFilterDTO = {
    //     month: 55,
    //     year: 2024
    // }
    // const param: CommonListRequestDTO = {
    //     pageNum: 1,
    //     pageSize: 5,
    //     orderBy: 'createdAt',
    //     orderType: 'asc',
    //     filter: filter,
    // };

    // const response: CommonResponseDTO = await SalaryServices.getSalaryMovementApprovalList(param)
    // const salaryMovementApprovalList: ListSalaryMovementApprovalDTO[] = response.data?.dataList as ListSalaryMovementApprovalDTO[];

    // setTimeout(() => showLoadingOverlay.set(false), 2500);

    // return {
    //     salaryMovementApprovalList,
    // }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            month: 3,
            year: 2024,
        },
    };

    const response: CommonResponseDTO =
        await SalaryServices.getSalaryMovementApprovalList(param);

    const salaryMovementApprovalList: ListSalaryMovementApprovalDTO[] = response.data
        ?.dataList as ListSalaryMovementApprovalDTO[];

    return {
        props: {
            param,
            salaryMovementApprovalList,
            response,
        },
    };
}

export const _getSalaryMovementMonth = async (getDay: number) => {
 
}

export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO =
        await SalaryServices.getSalaryMovementApprovalList(param);

    const salaryMovementApprovalList: ListSalaryMovementApprovalDTO[] = response.data
        ?.dataList as ListSalaryMovementApprovalDTO[];

    loadingState.set(false);

    return {
        props: {
            param,
            salaryMovementApprovalList,
            response,
        },
    };
}