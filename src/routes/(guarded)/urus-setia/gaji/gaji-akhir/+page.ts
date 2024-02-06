import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { FinalPayslipListFilterDTO } from '$lib/dto/mypsm/salary/final-payslip/final-payslip-list-filter.dto';
import type { FinalPayslipListDTO } from '$lib/dto/mypsm/salary/final-payslip/final-payslip-list.dto';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import { loadingState } from '$lib/stores/globalState';

export async function load() {
    const filter: FinalPayslipListFilterDTO = {
        employeeNumber: '',
        name: '',
        identityCardNumber: '',
        retirementType: '',
        status: '',
    };

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: filter,
    };

    const response: CommonResponseDTO =
        await SalaryServices.getFinalPayslipList(param);

    const finalPayslipList: FinalPayslipListDTO[] = response.data
        ?.dataList as FinalPayslipListDTO[];

    return {
        records: {
            param,
            response,
            finalPayslipList,
        },
    };
}

export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);

    const response: CommonResponseDTO = await SalaryServices.getFinalPayslipList(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}
