import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { MedicalClaimAllocationList } from "$lib/dto/mypsm/perubatan/medical-claim-allocation-list.dto";
import type { MedicalClaimList } from "$lib/dto/mypsm/perubatan/medical-claim-list.dto";
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto";
import type { MedicalClinicEmployeeAllocationClaimList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-allocation-list.dto";
import type { MedicalClinicEmployeeGetAllocationList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-get-allocation.dto";
import type { MedicalClinicEmployeePaymentList } from "$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payments-list.dto";
import type { ClinicAllocation, ClinicAllocationEdit, CurrentYearAllocation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-allocation.dto";
import { _editAllocations } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { EmployeeServices } from "$lib/services/implementation/mypsm/shared/employee.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let employeeAllocationList: MedicalClinicEmployeeAllocationClaimList[] = [];
    let employeeGetAllocation: MedicalClinicEmployeeGetAllocationList[] = [];
    let employeePaymentList: MedicalClinicEmployeePaymentList[] = [];
    let employeeAllocationListResponse: CommonResponseDTO = {}
    let employeeGetAllocationResponse: CommonResponseDTO = {}
    let employeePaymentListResponse: CommonResponseDTO = {}
    let clinicPanelAllocationResponse: CommonResponseDTO = {}

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

    let currentEmployeeDetail = {} as MedicalEmployeeDetail;
    let medicalClaimListResponse: CommonResponseDTO = {};
    let medicalClaimList: MedicalClaimList[] = [];
    let employeeParam: CommonListRequestDTO = {}
    let allocationListResponse: CommonResponseDTO = {};
    let allocationList: MedicalClaimAllocationList[] = [];


    if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        const currentEmployeeDetaiResponse: CommonResponseDTO =
            await EmployeeServices.getCurrentEmployeeDetails();
        currentEmployeeDetail =
            currentEmployeeDetaiResponse.data?.details as MedicalEmployeeDetail;

        //get table for medical claim
        employeeParam = {
            pageNum: 1,
            pageSize: 5,
            orderBy: "id",
            orderType: 1,
            filter: {}
        }
        medicalClaimListResponse =
            await MedicalServices.getMedicalClaimList(employeeParam)
        medicalClaimList =
            medicalClaimListResponse.data?.dataList as MedicalClaimList[];
        allocationListResponse =
            await MedicalServices.getMedicalAllocationList(employeeParam);
        allocationList =
            allocationListResponse.data?.dataList as MedicalClaimAllocationList[];
    }

    if (currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code) {
        employeeAllocationListResponse =
            await MedicalServices.getClinicEmployeeAllocation(param);
        employeeAllocationList =
            employeeAllocationListResponse.data?.dataList as MedicalClinicEmployeeAllocationClaimList[];
        employeeGetAllocationResponse =
            await MedicalServices.getClinicEmployeeAllocationTable(allocationParam);
        employeeGetAllocation =
            employeeGetAllocationResponse.data?.dataList as MedicalClinicEmployeeGetAllocationList[];
        employeePaymentListResponse =
            await MedicalServices.getClinicEmployeePaymentList(paymentParam)
        employeePaymentList =
            employeePaymentListResponse.data?.dataList as MedicalClinicEmployeePaymentList[];
        if (currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code) {
            clinicPanelAllocationResponse =
                await MedicalServices.getClinicPanelAllocations(currentYear);
            clinicPanelAllocations =
                clinicPanelAllocationResponse.data?.details as ClinicAllocation;
            allocationForm.data.year = currentYear.year;
        }
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
        currentEmployeeDetail,
        medicalClaimList,
        medicalClaimListResponse,
        employeeParam,
        allocationList,
        allocationListResponse,
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