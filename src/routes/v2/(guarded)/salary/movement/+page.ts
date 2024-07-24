import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { SalaryMovementList, SalaryMovementFilter } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto";
import { _addNewSalaryMovementSchema } from "$lib/schemas/mypsm/gaji/salary-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    const lookup = await getLookup();
    let salaryType: IntDropdownOption[] = [
        {
            value: 'Kenaikan Khas',
            name: 'Kenaikan Khas',
            href: '/v2/salary/movement/new/application Kenaikan Khas',
        },
        {
            value: 'Kenaikan Gaji Tahunan',
            name: 'Kenaikan Gaji Tahunan',
            href: '/v2/salary/movement/new/application Kenaikan Gaji Tahunan',
        },
        {
            value: 'Bantuan Khas Kewangan',
            name: 'Bantuan Khas Kewangan',
            href: '/v2/salary/movement/new/application Bantuan Khas Kewangan',
        },
    ];

    let salaryMovementListResponse: CommonResponseDTO = {};
    let salaryMovementList: SalaryMovementList[] = [];
    let currentDate: Date = new Date();

    const salaryMovementListFilter: SalaryMovementFilter = {
        month: Number(currentDate.getMonth() + 1),
        year: Number(currentDate.getFullYear()),
    }
    if (salaryMovementListFilter.month !== 1 && salaryMovementListFilter.month !== 4 && salaryMovementListFilter.month !== 7 && salaryMovementListFilter.month !== 10) {
        salaryMovementListFilter.month = 1;
    }
    const salaryMovementParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "applicationId",
        orderType: 1,
        filter: salaryMovementListFilter,
    }

    if (currentRoleCode == UserRoleConstant.urusSetiaGaji.code) {
        salaryMovementListResponse =
            await SalaryServices.getSalaryMovementList(salaryMovementParam);
        salaryMovementList =
            salaryMovementListResponse.data?.dataList as SalaryMovementList[];
    }

    return {
        props: {
            currentRoleCode,
            salaryType,
            salaryMovementListResponse,
            salaryMovementList,
            salaryMovementParam,
            lookup,
        }
    }
}

const getLookup = async () => {
    // -------------------------------------------------------
    const monthReq: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 20,
        orderBy: "",
        orderType: 0,
        filter: {
            code: null,
            description: null,
            isQuarter: true
        }
    }
    
    const salaryMonthResponse: CommonResponseDTO =
        await LookupServices.getSalaryMovementMonth(monthReq);

    const salaryMovementMonth: DropdownDTO[] =
        LookupServices.setSelectOptions(salaryMonthResponse)

        return {
            salaryMovementMonth,
        }
}