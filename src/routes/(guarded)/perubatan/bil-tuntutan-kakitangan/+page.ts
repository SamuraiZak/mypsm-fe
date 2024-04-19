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
        orderBy: 'claimId',
        orderType: 1,
        filter: {}
    };
    const paymentParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'medicalClaimId',
        orderType: 1,
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
        await MedicalServices.getClinicEmployeePaymentList(paymentParam)
    employeePaymentList =
        employeePaymentListResponse.data?.dataList as MedicalClinicEmployeePaymentList[];

    return {
        currentRoleCode,
        param,
        paymentParam,
        employeeAllocationListResponse,
        employeeAllocationList,
        employeeGetAllocationResponse,
        employeeGetAllocation,
        employeePaymentListResponse,
        employeePaymentList,
    }
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