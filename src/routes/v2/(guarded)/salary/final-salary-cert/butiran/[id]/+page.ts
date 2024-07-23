import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { EmployeeSalaryDetail } from "$lib/dto/mypsm/gaji/gaji-akhir/final-salary-detail.dto";
import type { FinalSalaryEmployeeDetail } from "$lib/dto/mypsm/gaji/gaji-akhir/final-salary-employee-detail.dto.js";
import type { FinalSalaryServiceDetail } from "$lib/dto/mypsm/gaji/gaji-akhir/final-salary-service-detail.dto";
import type { GetContractPersonalDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto";
import { _finalCertSchema } from "$lib/schemas/mypsm/gaji/salary-schema.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode;
    const lookup = await getLookup();

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null
        },
    }

    const currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeePersonalDetail = {} as FinalSalaryEmployeeDetail;
    let employeeServiceDetail = {} as FinalSalaryServiceDetail;
    let employeeSalaryDetail = {} as EmployeeSalaryDetail;


    const employeePersonalDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeePersonalDetail(currentId)
    employeePersonalDetail =
        employeePersonalDetailResponse.data?.details as FinalSalaryEmployeeDetail;
    const employeeServiceDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeeServiceDetail(currentId)
    employeeServiceDetail =
        employeeServiceDetailResponse.data?.details as FinalSalaryServiceDetail;
    const employeeSalaryDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeeSalaryDetail(currentId);
    employeeSalaryDetail =
        employeeSalaryDetailResponse.data?.details as EmployeeSalaryDetail;

    const form = await superValidate(zod(_finalCertSchema));

    form.data.allowance = employeeSalaryDetail.allowance;
    form.data.deduction = employeeSalaryDetail.deduction;
    form.data.isDraft = employeeSalaryDetail.isDraft;

    return {
        props: {
            currentRoleCode,
            lookup,
            param,
            currentId,
        },
        form: {
            employeePersonalDetail,
            employeeServiceDetail,
            employeeSalaryDetail,
            form,
        }
    }
}

export const _submitForm = async(formData: EmployeeSalaryDetail) => {
    const form = await superValidate(formData, zod(_finalCertSchema));
    if(form.valid){
        const response: CommonResponseDTO =
            await SalaryServices.addEmployeeFinalPayslip(form.data as EmployeeSalaryDetail)

        return { response }
    }
}
export const _generatePayslip = async(id: commonIdRequestDTO) => {
        const response: CommonResponseDTO =
            await SalaryServices.getFinalpayslip(id as commonIdRequestDTO)

        return { response }
}

const getLookup = async () => {

    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(genderLookupResponse);
    // -------------------------------------------------------
    const identityCardTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getIdentityCardColor();

    const identityCardTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(identityCardTypeLookupResponse)
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(stateLookupResponse)
    // -------------------------------------------------------
    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(nationalityLookupResponse)
    // -------------------------------------------------------
    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(raceLookupResponse)
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(religionLookupResponse)
    // -------------------------------------------------------
    const ethnicLookupResponse: CommonResponseDTO =
        await LookupServices.getEthnicEnums();

    const ethnicLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(ethnicLookupResponse)
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );
    // -------------------------------------------------------
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsCodeAndDesc(gradeLookupResponse);
    // -------------------------------------------------------
    const assetDeclarationLookupResponse: CommonResponseDTO =
        await LookupServices.getPropertyDeclarationEnums();

    const assetDeclarationLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(assetDeclarationLookupResponse);
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );
    // -------------------------------------------------------
    const serviceLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceLookupResponse,
    );
    // -------------------------------------------------------
    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );
    // -------------------------------------------------------
    const serviceUnitLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const serviceUnitLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceUnitLookupResponse,
    );

    return {
        genderLookup,
        identityCardTypeLookup,
        nationalityLookup,
        raceLookup,
        maritalLookup,
        religionLookup,
        stateLookup,
        ethnicLookup,
        countryLookup,
        cityLookup,
        gradeLookup,
        assetDeclarationLookup,
        placementLookup,
        serviceTypeLookup,
        serviceGroupLookup,
        serviceUnitLookup,
    }
}