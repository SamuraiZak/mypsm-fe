import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { MedicalClinicEmployeeAllocationClaimList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto";
import type { MedicalClinicEmployeeGetAllocationList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-get-allocation.dto";
import type { MedicalClinicEmployeePaymentList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto";
import type { ClinicAllocation, ClinicAllocationEdit, CurrentYearAllocation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-allocation.dto";
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
    const allocationParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 0,
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
        cumulAlloc: 0,
        cumulRemainder: 0,
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
        await MedicalServices.getClinicEmployeeAllocationTable(allocationParam);
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
        allocationForm.data.year = currentYear.year;
    }
    return {
        currentRoleCode,
        param,
        paymentParam,
        allocationParam,
        employeeAllocationListResponse,
        employeeAllocationList,
        employeeGetAllocationResponse,
        employeeGetAllocation,
        employeePaymentListResponse,
        employeePaymentList,
        allocationForm,
        clinicPanelAllocations,
        currentYear,
    }
}


export const _submit = async (formData: ClinicAllocationEdit, updateTableParam: CommonListRequestDTO) => {
    const form = await superValidate(formData, zod(_editAllocations));
    let employeeGetAllocation: MedicalClinicEmployeeGetAllocationList[] = [];
    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.editAllocations(form.data as ClinicAllocationEdit)

        const employeeGetAllocationResponse: CommonResponseDTO =
            await MedicalServices.getClinicEmployeeAllocationTable(updateTableParam);
        employeeGetAllocation =
            employeeGetAllocationResponse.data?.dataList as MedicalClinicEmployeeGetAllocationList[];
        return { response, employeeGetAllocation }
    }
}

// export const _getUpdatedAllocation = async (thisYear: CurrentYearAllocation) => {
//     const clinicPanelAllocationResponse: CommonResponseDTO =
//         await MedicalServices.getClinicPanelAllocations(thisYear);
//     const clinicPanelAllocations =
//         clinicPanelAllocationResponse.data?.details as ClinicAllocation;

//     return { clinicPanelAllocations }
// }