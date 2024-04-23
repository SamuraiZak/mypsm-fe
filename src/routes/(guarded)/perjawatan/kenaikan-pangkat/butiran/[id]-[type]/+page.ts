import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { AddNewPromotion } from '$lib/dto/mypsm/employment/promotion/add-promotion.dto';
import type { PromotionCertificationEmployee, PromotionCommonEmployee, PromotionDetail, PromotionPlacement } from '$lib/dto/mypsm/employment/promotion/promotion-common-employee.dto';
import type { PromotionCertificationGet, PromotionGroupID } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
import type { PromotionCertification, PromotionEmployeeEdit, PromotionPlacementEdit } from '$lib/dto/mypsm/employment/promotion/promotion-form.dto.js';
import { _addNewPromotion, _editEmployeePromotion, _editPromotionCertification, _editPromotionPlacement } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentPromotionServices } from '$lib/services/implementation/mypsm/perjawatan/employment-promotion.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let promotionType: string = params.type;
    let currentId: PromotionGroupID = {
        groupId: 0,
    }
    let isNewPromotion: boolean = true;
    if (params.id !== "baru") {
        currentId.groupId = Number(params.id);
        isNewPromotion = false;
    }
    let lookup = await getLookup();

    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: PromotionCommonEmployee[] = [];
    let certificationListResponse: CommonResponseDTO = {};
    let certificationList: PromotionCertificationEmployee[] = [];
    let placementListResponse: CommonResponseDTO = {};
    let placementList: PromotionPlacement[] = [];
    let promotionDetailResponse: CommonResponseDTO = {};
    let promotionDetail: PromotionDetail[] = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    const commonParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: currentId,
    };
    const promotionEmployeeParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            promotionType: promotionType,
        }
    }

    const addnewPromotionForm = await superValidate(zod(_addNewPromotion));
    const certificationForm = await superValidate(zod(_editPromotionCertification), { errors: false });
    const placementForm = await superValidate(zod(_editPromotionPlacement), { errors: false })
    const employeePromotion = await superValidate(zod(_editEmployeePromotion), {errors: false});

    employeeListResponse =
        await EmploymentPromotionServices.getEmployeeList(param);
    employeeList =
        employeeListResponse.data?.dataList as PromotionCommonEmployee[];
    certificationListResponse =
        await EmploymentPromotionServices.getCertificationList(commonParam);
    certificationList =
        certificationListResponse.data?.dataList as PromotionCertificationEmployee[];
    placementListResponse =
        await EmploymentPromotionServices.getPlacementList(commonParam);
    placementList =
        placementListResponse.data?.dataList as PromotionPlacement[];
    promotionDetailResponse =
        await EmploymentPromotionServices.getPromotionEmployeeList(promotionEmployeeParam)
    promotionDetail =
        promotionDetailResponse.data?.dataList as PromotionDetail[]


    const dataList4 = [
        { tarikhKuatkuasa: "17/3/2024", gajiSekarang: 'RM 1,932.13', gajiBaru: "-", gred: '-', catatan: 'Gaji Akhir Di Gred Jawatan Asal Sebelum Diberi Pergerakan Gaji', },
        { tarikhKuatkuasa: "18/3/2024", gajiSekarang: 'RM 2,032.13', gajiBaru: "2,254.00", gred: '-', catatan: 'Gaji Sekarang - Diberi 1 KGT RM 100.00 Di Gred E19, Gaji Baru - Diberi Gaji Permulaan Di Gred E22', },
    ];

    const dataList5 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses" },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses" },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses" },
    ];
    const dataList6 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: "tetap", gred: "1-54", penempatanSekarang: "-", status: "Dalam Proses", tindakan: "-" },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: "tetap", gred: "1-54", penempatanSekarang: "-", status: "Diperaku - Urus Setia Integriti", tindakan: "-" },
    ];

    return {
        dataList4, dataList5, dataList6,

        param,
        promotionType,
        isNewPromotion,
        currentId,
        currentRoleCode,
        employeeListResponse,
        employeeList,
        addnewPromotionForm,
        commonParam,
        certificationListResponse,
        certificationList,
        lookup,
        certificationForm,
        placementListResponse,
        placementList,
        placementForm,
        promotionEmployeeParam,
        promotionDetailResponse,
        promotionDetail,
        employeePromotion,
    };

};

export const _submitAddNewPromotion = async (formData: AddNewPromotion) => {
    const form = await superValidate(formData, zod(_addNewPromotion));
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addNewPromotion(form.data as AddNewPromotion)

        return { response }
    }
}

export const _submitCertification = async (formData: PromotionCertification) => {
    const form = await superValidate(formData, zod(_editPromotionCertification));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editCertification(form.data as PromotionCertification)

        return { response }
    }
}

export const _submitPlacement = async (formData: PromotionPlacementEdit) => {
    const form = await superValidate(formData, zod(_editPromotionPlacement));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editPlacement(form.data as PromotionPlacementEdit)

        return { response }
    }
}

export const _submitEmployeePromotion = async (formData: PromotionEmployeeEdit) => {
    const form = await superValidate(formData, zod(_editEmployeePromotion));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editEmployeePromotion(form.data as PromotionEmployeeEdit)

        return { response }
    }
}

//get table detail
export const _getPlacementDetail = async (id: PromotionCertificationGet, req: CommonListRequestDTO) => {

    const response: CommonResponseDTO =
        await EmploymentPromotionServices.getPlacementDetail(id)
    const tableResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getSalaryAdjustmentTable(req);
    const salaryDetail: CommonResponseDTO =
        await EmploymentPromotionServices.getSalaryAdjustmentDetail(id)

    return { response, tableResponse, salaryDetail, }
}

export const _getPromotionDetail = async(id: PromotionCertificationGet) => {
    const response: CommonResponseDTO =
        await EmploymentPromotionServices.getPromotionEmployeeDetail(id);

    return { response }
}


const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(stateLookupResponse)
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(departmentLookupResponse)
    // -------------------------------------------------------
    const meetingNameLookup: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]
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
        gradeLookup,
        stateLookup,
        meetingNameLookup,
        placementLookup,
        positionLookup,
        departmentLookup,
        supporterApproverLookup,
    }
}
