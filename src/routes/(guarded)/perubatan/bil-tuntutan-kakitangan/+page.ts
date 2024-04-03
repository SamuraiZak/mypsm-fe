import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { MedicalClinicEmployeeAllocationClaimList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto";
import type { MedicalClinicEmployeeGetAllocationList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-get-allocation.dto";
import type { MedicalClinicEmployeePaymentList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeAllocationList: MedicalClinicEmployeeAllocationClaimList[] = [];
    let employeeGetAllocation: MedicalClinicEmployeeGetAllocationList[] = [];
    let employeePaymentList: MedicalClinicEmployeePaymentList[] = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    };

    const employeeAllocationListResponse: CommonResponseDTO =
        await MedicalServices.getClinicEmployeeAllocation(param);
    employeeAllocationList =
        employeeAllocationListResponse.data?.dataList as MedicalClinicEmployeeAllocationClaimList[];
    const employeeGetAllocationResponse: CommonResponseDTO =
        await MedicalServices.getClinicEmployeeAllocationTable(param);
    employeeGetAllocation =
        employeeGetAllocationResponse.data?.dataList as MedicalClinicEmployeeGetAllocationList[];
    const employeePaymentListResponse: CommonResponseDTO =
        await MedicalServices.getClinicEmployeePaymentList(param)
    employeePaymentList =
        employeePaymentListResponse.data?.dataList as MedicalClinicEmployeePaymentList[];

    return {
        currentRoleCode,
        param,
        employeeAllocationListResponse,
        employeeAllocationList,
        employeeGetAllocationResponse,
        employeeGetAllocation,
        employeePaymentListResponse,
        employeePaymentList,
    }
}

//update tuntutan kakitangan table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getClinicEmployeeAllocation(param);
    return {
        props: {
            param,
            response,
        },
    };
}
//update table peruntukkan
export async function _updateAllocationTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getClinicEmployeeAllocationTable(param);
    return {
        props: {
            param,
            response,
        },
    };
}
//update table pembayaran
export async function _updatePaymentTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getClinicEmployeePaymentList(param);
    return {
        props: {
            param,
            response,
        },
    };
}