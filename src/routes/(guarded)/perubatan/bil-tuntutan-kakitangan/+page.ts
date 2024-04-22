import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { MedicalClinicEmployeeAllocationClaimList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto";
import type { MedicalClinicEmployeeGetAllocationList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-get-allocation.dto";
import type { MedicalClinicEmployeePaymentList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto";
import type { ClinicAllocation, CurrentYearAllocation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-allocation.dto";
import { _editAllocations } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

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
    let clinicPanelAllocations: ClinicAllocation = {
        year: 0,
        currentAllocation: 0,
        remainingAllocation: 0,
        newAllocation: 0,
    }
    let currentYear: CurrentYearAllocation = {
        year: Number(new Date().getFullYear())
    }

    const allocationForm = await superValidate(zod(_editAllocations))

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
    if (currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code) {
        const clinicPanelAllocationResponse: CommonResponseDTO =
            await MedicalServices.getClinicPanelAllocations(currentYear);
        clinicPanelAllocations =
            clinicPanelAllocationResponse.data?.details as ClinicAllocation;
        allocationForm.data = clinicPanelAllocations
    }
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
        allocationForm,
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

export const _submit = async (formData: ClinicAllocation) => {
    const form = await superValidate(formData, zod(_editAllocations));

    if (form.valid) {
        const { remainingAllocation, ...tempObj } = form.data;

        const response: CommonResponseDTO =
            await MedicalServices.editAllocations(tempObj as ClinicAllocation)

        return { response }
    }
}