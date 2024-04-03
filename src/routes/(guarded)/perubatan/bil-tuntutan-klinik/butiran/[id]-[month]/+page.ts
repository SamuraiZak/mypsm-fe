import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto.js";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { ClaimIdRequestDTO } from "$lib/dto/mypsm/perubatan/claim-id-request.dto.js";
import type { MedicalClinicCalculation } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-calculation.dto.js";
import type { MedicalClinicClaimDetail } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claim-clinic-detail.dto.js";
import type { MedicalClinicClaimsList } from "$lib/dto/mypsm/perubatan/tuntutan-klinik/clinic-claims-list.dto.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service.js";

export const load = async ({ params }) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let claimIdRequest: ClaimIdRequestDTO = {
        id: Number(params.id),
        month: params.month
    }
    let clinicDetail = {} as MedicalClinicClaimDetail;
    let calculationDetail = {} as MedicalClinicCalculation;
    let claimList: MedicalClinicClaimsList[] = [];

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };
    const dataList = [
        { namaPesakit: "Siti Aminah", noKadPengenalan: "910822032872", rawatan: ["Batuk", "Selesema"], hubungan: "Isteri", jumlah: "10000" }
    ]

    const clinicDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicClaimDetail(clinicId);
    clinicDetail =
        clinicDetailResponse.data?.details as MedicalClinicClaimDetail;
    const calculationDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicCalculation(claimIdRequest)
    calculationDetail =
        calculationDetailResponse.data?.details as MedicalClinicCalculation
    const claimListResponse: CommonResponseDTO =
        await MedicalServices.getMedicalClinicClaimList(claimIdRequest)
    claimList =
        claimListResponse.data?.dataList as MedicalClinicClaimsList[];

    return {
        currentRoleCode,
        lookup,
        param,
        dataList,
        clinicDetail,
        calculationDetail,
        claimList,
    }
}

const getLookup = async () => {
    // -------------------------------------------------------
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    }
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverBothAreName(
        supporterApproverResponse,
    );

    return {
        supporterApproverLookup,
    }
}
