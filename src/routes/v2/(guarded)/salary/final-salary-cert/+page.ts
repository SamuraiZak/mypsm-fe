import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { FinalPayslipList, FinalPayslipListFilter } from "$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";

export const load = async ({parent}) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode

    let finalPayslipList: FinalPayslipList[] = [];
    let finalPayslipListResponse: CommonResponseDTO = {};

    const finalPayslipListFilter: FinalPayslipListFilter = {
        type: 1,
        employeeNumber: "",
        name: "",
        identityDocumentNumber: "",
        retirementType: "",
        status: "",
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: finalPayslipListFilter,
    }

    finalPayslipListResponse =
        await SalaryServices.getFinalPayslipList(param);
    finalPayslipList =
        finalPayslipListResponse.data?.dataList as FinalPayslipList[];

    return {
        currentRoleCode,
        param,
        finalPayslipListResponse,
        finalPayslipList,
    }
}