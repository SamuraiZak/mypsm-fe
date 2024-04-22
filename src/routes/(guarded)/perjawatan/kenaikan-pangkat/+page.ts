import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { PromotionCommonList } from "$lib/dto/mypsm/employment/promotion/promotion-common-list.dto";
import { EmploymentPromotionServices } from "$lib/services/implementation/mypsm/perjawatan/employment-promotion.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)


    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    let table154: PromotionCommonList[] = [];
    let table154Response: CommonResponseDTO = {};
    let tableTbk12: PromotionCommonList[] = [];
    let tableTbk12Response: CommonResponseDTO = {};
    let tableMain: PromotionCommonList[] = [];
    let tableMainResponse: CommonResponseDTO = {};

    let dataList;

    //Table for urus setia/pengarah bahagian/negeri
    if ((currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) || (currentRoleCode === UserRoleConstant.pengarahBahagian.code) ||
        (currentRoleCode === UserRoleConstant.pengarahNegeri.code)) {
        table154Response =
            await EmploymentPromotionServices.get154List(param);
        table154 =
            table154Response.data?.dataList as PromotionCommonList[]
        tableTbk12Response =
            await EmploymentPromotionServices.getTbk12List(param);
        tableTbk12 =
            tableTbk12Response.data?.dataList as PromotionCommonList[]
        tableMainResponse =
            await EmploymentPromotionServices.getMainList(param);
        tableMain =
            tableMainResponse.data?.dataList as PromotionCommonList[]
    }
    //Table for penyokong/pelulus
    else if ((currentRoleCode === UserRoleConstant.penyokong.code) || (currentRoleCode === UserRoleConstant.pelulus.code)) {
        dataList = [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', penempatanSekarang: '-', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', penempatanSekarang: '-', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', penempatanSekarang: '-', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', penempatanSekarang: '-', status: 'SAH - Urus Setia', tindakan: '-' },
        ];
    }
    //Table for kakitangan
    else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        dataList = [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, gredBaharu: 'Gred 1-54', jawatanBaharu: 'Setiausaha Pejabat', penempatanBaharu: 'Pejabat Ketua Pengarah LKIM', tarikhBerkuatkuasa: '27/02/2024' },
        ];
    }

    return {
        currentRoleCode,
        param,
        table154Response,
        table154,
        tableTbk12Response,
        tableTbk12,
        tableMainResponse,
        tableMain,
        dataList,
    };
};

export const _updateTable = async (param: unknown) => {
    const response = {
        status: 'success',
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        dataList: [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', status: 'Menunggu Kelulusan Dari Urus Setia', tindakan: '-' },
            { noPekerja: 28343, name: 'Robin Van Persie', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', status: 'Menunggu Kelulusan Dari Urus Setia', tindakan: '-' },
        ],
    };

    return {
        param,
        response,
    };
};