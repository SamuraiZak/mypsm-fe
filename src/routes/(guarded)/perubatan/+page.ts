import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { MedicalClaimList } from "$lib/dto/mypsm/perubatan/medical-claim-list.dto";
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { EmployeeServices } from "$lib/services/implementation/mypsm/shared/employee.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let currentEmployeeDetail = {} as MedicalEmployeeDetail;
    let medicalClaimListResponse: CommonResponseDTO = {};
    let medicalClaimList: MedicalClaimList[] = [];
    let param: CommonListRequestDTO = {}


    if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        const currentEmployeeDetaiResponse: CommonResponseDTO =
            await EmployeeServices.getCurrentEmployeeDetails();
        currentEmployeeDetail =
            currentEmployeeDetaiResponse.data?.details as MedicalEmployeeDetail;

        //get table for medical claim
        param = {
            pageNum: 1,
            pageSize: 5,
            orderBy: null,
            orderType: null,
            filter: {}
        }
        medicalClaimListResponse =
            await MedicalServices.getMedicalClaimList(param)
        medicalClaimList =
            medicalClaimListResponse.data?.dataList as MedicalClaimList[];
    }

    return {
        currentRoleCode,
        medicalClaimListResponse,
        medicalClaimList,
        param,
        currentEmployeeDetail,
    }
}