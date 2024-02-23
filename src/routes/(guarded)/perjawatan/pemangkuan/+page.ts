import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    console.log(currentRoleCode)
    console.log(UserRoleConstant.kakitangan.code)
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    let dataList;
    if (currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) {
        dataList = [
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
        ]
    }
    else if ((currentRoleCode === UserRoleConstant.penyokong.code) || (currentRoleCode === UserRoleConstant.pengarahBahagian.code) ||
        (currentRoleCode === UserRoleConstant.pengarahNegeri.code) || (currentRoleCode === UserRoleConstant.pelulus.code)) {
        dataList = [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        ]
    } else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        dataList = [
            { idPemangkuan: 'PMGK-1234', tarikhTawaran: '19/02/2024', gred: 'N32', position: 'Setiausaha Pejabat', keputusanPemangkuan: 'Belum Dikemaskini' },
        ]
    }
    return { param, dataList, currentRoleCode };
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
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Lulus' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Tidak Lulus' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
            { idPemangkuan: 'PMGK-1234', date: '19/02/2024', jumlahCalon: 10, status: 'Sedang Diproses' },
        ],
    };

    return {
        param,
        response,
    };
};
