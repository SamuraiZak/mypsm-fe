import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { SalaryMovementDetail } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-detail.dto"
import type { SalaryMovementFilter, SalaryMovementList } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto"
import type { SalaryMovementSchedule } from "$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-schedule.dto"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service"


export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const meetingId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    //get meeting detail
    let salaryMovementDetailResponse: CommonResponseDTO = {};
    let salaryMovementDetail = {} as SalaryMovementDetail;
    let salaryMovementScheduleResponse: CommonResponseDTO = {};
    let salaryMovementSchedule: SalaryMovementSchedule[] = [];


    //get meeting detail
    salaryMovementDetailResponse =
        await SalaryServices.getSalaryMovementDetail(meetingId);
    salaryMovementDetail =
        salaryMovementDetailResponse.data?.details as SalaryMovementDetail;

    //get selected salary movement detail
    const paramFilter: SalaryMovementFilter = {
        month: salaryMovementDetail.salaryMovementMonth % 100,
        year: Math.floor(salaryMovementDetail.salaryMovementMonth / 100),
    }

    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: paramFilter,
    }
    let currentSalaryMovementDetailResponse: CommonResponseDTO = {};
    let currentSalaryMovementDetail: SalaryMovementList[] = [];


    currentSalaryMovementDetailResponse =
        await SalaryServices.getSalaryMovementList(param);
    currentSalaryMovementDetail =
        currentSalaryMovementDetailResponse.data?.dataList as SalaryMovementList[];

    salaryMovementScheduleResponse =
        await SalaryServices.getSalaryMovementSchedule(meetingId)
    salaryMovementSchedule =
        salaryMovementScheduleResponse.data?.dataList as SalaryMovementSchedule[];

    return {
        currentRoleCode,
        salaryMovementDetail,
        currentSalaryMovementDetail,
        salaryMovementSchedule,
    }
}