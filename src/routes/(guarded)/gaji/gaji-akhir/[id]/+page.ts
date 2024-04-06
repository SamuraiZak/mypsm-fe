import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"
import type { FinalSalaryDetail } from "$lib/dto/mypsm/gaji/gaji-akhir/final-salary-detail.dto.js"
import type { FinalSalaryServiceDetail } from "$lib/dto/mypsm/gaji/gaji-akhir/final-salary-service-detail.dto.js"
import type { Finalpayslip } from "$lib/dto/mypsm/gaji/gaji-akhir/finalpayslip.dto.js"
import type { GetContractPersonalDetailDTO } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-personal-detail.dto"
import { _finalPayslipSchema } from "$lib/schemas/mypsm/gaji/salary-schema.js"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { SalaryServices } from "$lib/services/implementation/mypsm/gaji/salary.service.js"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    const currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeePersonalDetail = {} as GetContractPersonalDetailDTO;
    let employeeServiceDetail = {} as FinalSalaryServiceDetail;
    let employeeFinalpayslip = {} as Finalpayslip;
    let employeeFinalSalaryDetail = {} as FinalSalaryDetail;

    const employeePersonalDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeePersonalDetail(currentId)
    employeePersonalDetail =
        employeePersonalDetailResponse.data?.details as GetContractPersonalDetailDTO;
    const employeeServiceDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeeServiceDetail(currentId)
    employeeServiceDetail =
        employeeServiceDetailResponse.data?.details as FinalSalaryServiceDetail;
    const employeeFinalpayslipResponse: CommonResponseDTO =
        await SalaryServices.getFinalpayslip(currentId);


    if (employeeFinalpayslipResponse.status == "success") {
        employeeFinalpayslip =
            employeeFinalpayslipResponse.data?.details as Finalpayslip;
    } else {
        employeeFinalpayslip = {
            id: 0,
            document: "",
        }
    }

    const employeeFinalSalaryDetailResponse: CommonResponseDTO =
        await SalaryServices.getEmployeeSalaryDetail(currentId);
    employeeFinalSalaryDetail =
        employeeFinalSalaryDetailResponse.data?.details as FinalSalaryDetail;

    const form = await superValidate(currentId, zod(_finalPayslipSchema))

    return {
        currentRoleCode,
        form,
        lookup,
        employeePersonalDetail,
        employeeServiceDetail,
        employeeFinalpayslip,
        employeeFinalSalaryDetail,
    }
}

export const _submitAddEmployeePayslip = async (formData: commonIdRequestDTO) => {
    const form = await superValidate(formData, zod(_finalPayslipSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await SalaryServices.addEmployeeFinalPayslip(form.data as commonIdRequestDTO)

        return { response }
    }
}

const getLookup = async () => {
    //=============================================
    const retirementBenefit: RadioDTO[] = [
        { name: "KWSP", value: 1 },
        { name: "Pencen", value: 2 },
    ]
    //=============================================
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
    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(titleLookupResponse);
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
    const relationshipLookupResponse: CommonResponseDTO =
        await LookupServices.getRelationshipEnums();

    const relationshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        relationshipLookupResponse,
    );
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
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );
    // -------------------------------------------------------
    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceTypeLookupResponse,
    );
    // -------------------------------------------------------
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] = LookupServices.setSelectOptionsNameIsCode(
        gradeLookupResponse,
    );
    // -------------------------------------------------------
    const unitLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const unitLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        unitLookupResponse,
    );
    // -------------------------------------------------------
    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );
    // -------------------------------------------------------
    const employmentStatusLookupResponse: CommonResponseDTO =
        await LookupServices.getEmploymentStatusEnums();

    const employmentStatusLookup: DropdownDTO[] = LookupServices.setSelectOptionEmploymentStatus(
        employmentStatusLookupResponse,
    );
    return {
        retirementBenefit,
        genderLookup,
        identityCardTypeLookup,
        stateLookup,
        nationalityLookup,
        raceLookup,
        titleLookup,
        maritalLookup,
        religionLookup,
        relationshipLookup,
        ethnicLookup,
        cityLookup,
        countryLookup,
        assetDeclarationLookup,
        placementLookup,
        positionLookup,
        serviceTypeLookup,
        gradeLookup,
        unitLookup,
        serviceGroupLookup,
        employmentStatusLookup,
    }
}