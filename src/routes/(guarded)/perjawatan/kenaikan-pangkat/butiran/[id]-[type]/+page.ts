import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddNewPromotion } from '$lib/dto/mypsm/employment/promotion/add-promotion.dto';
import type { PromotionCertificationEmployee, PromotionCommonEmployee } from '$lib/dto/mypsm/employment/promotion/promotion-common-employee.dto';
import type { PromotionGroupID } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
import { _addNewPromotion } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
import { EmploymentPromotionServices } from '$lib/services/implementation/mypsm/perjawatan/employment-promotion.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let promotionType: string = params.type;
    let currentId: PromotionGroupID = {
        groupId: 0,
    }
    let isNewPromotion: string = params.id;
    if (params.id !== "baru") {
        currentId.groupId = Number(params.id)
    }

    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: PromotionCommonEmployee[] = [];
    let certificationListResponse: CommonResponseDTO = {};
    let certificationList: PromotionCertificationEmployee[] = [];

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    const commonParam = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: currentId,
    };

    const addnewPromotionForm = await superValidate(zod(_addNewPromotion));

    employeeListResponse =
        await EmploymentPromotionServices.getEmployeeList(param);
    employeeList =
        employeeListResponse.data?.dataList as PromotionCommonEmployee[];
    certificationListResponse =
        await EmploymentPromotionServices.getCertificationList(commonParam);
    certificationList =
        certificationListResponse.data?.dataList as PromotionCertificationEmployee[];

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
    ];
    const dataList2 = [
        { noPekerja: 'F-6699', name: 'David Villa', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6700', name: 'Kylian Mbappe', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6701', name: 'Fabrizio Romano', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6702', name: 'Peter Cech', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Sedang Diproses', perakuanPengarahBahagian: 'Sedang Diproses' },
    ];
    const dataList3 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-', },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-', },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-', },
    ];
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
        dataList, dataList2, dataList3, dataList4, dataList5, dataList6,
        param,
        promotionType,
        isNewPromotion,
        currentRoleCode,
        employeeListResponse,
        employeeList,
        addnewPromotionForm,
        commonParam,
        certificationListResponse,
        certificationList,
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
