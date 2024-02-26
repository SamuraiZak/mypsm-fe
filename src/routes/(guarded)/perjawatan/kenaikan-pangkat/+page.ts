import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    let dataList;

    //Table for urus setia/pengarah bahagian/negeri
    if ((currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) || (currentRoleCode === UserRoleConstant.pengarahBahagian.code) ||
        (currentRoleCode === UserRoleConstant.pengarahNegeri.code)) {
        dataList = [
            { group: 'P1234', date: '20/02/2024', jumlahCalon: 5, status: 'Draf' },
            { group: 'P1235', date: '20/02/2024', jumlahCalon: 10, status: 'Draf' },
        ]
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

    return { param, currentRoleCode, dataList, };
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