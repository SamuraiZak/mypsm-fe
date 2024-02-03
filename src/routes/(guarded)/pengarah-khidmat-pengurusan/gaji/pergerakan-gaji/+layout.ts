import type { ListSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval.dto';
import type { ListSalaryMovementApprovalFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import  { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { showLoadingOverlay } from '$lib/stores/globalState';

export async function load() {
    showLoadingOverlay.set(true)
    const filter: ListSalaryMovementApprovalFilterDTO = {
        month: 1,
        year: 2024
    }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: filter,
    };

    const response: CommonResponseDTO = await SalaryServices.getSalaryMovementApprovalList(param)
    const salaryMovementApprovalList: ListSalaryMovementApprovalDTO[] = response.data?.dataList as ListSalaryMovementApprovalDTO[];

    setTimeout(() => showLoadingOverlay.set(false), 2500);

    return {
        salaryMovementApprovalList,
    }
}