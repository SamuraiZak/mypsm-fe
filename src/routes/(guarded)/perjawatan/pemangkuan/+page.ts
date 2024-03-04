import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let tableList154Response: CommonResponseDTO;
    let tableList154 = [];
    let tableListFlexiResponse: CommonResponseDTO;
    let tableListFlexi41 = [];
    // param for table 154/flexi41/main
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    let dataList;
    //table for urus setia
    if (currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) {
        //154
        tableList154Response = await EmploymentActingServices.get154List(param);
        tableList154 = tableList154Response.data?.dataList ?? [];

        //flexi 41
        tableListFlexiResponse = await EmploymentActingServices.getFlexi41List(param);
        tableListFlexi41 = tableListFlexiResponse.data?.dataList ?? [];
    }
    //table for penyokong, pengarah bahagian/negeri and pelulus
    else if ((currentRoleCode === UserRoleConstant.penyokong.code) || (currentRoleCode === UserRoleConstant.pengarahBahagian.code) ||
        (currentRoleCode === UserRoleConstant.pengarahNegeri.code) || (currentRoleCode === UserRoleConstant.pelulus.code)) {
        dataList = [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        ]
    }
    //table for kakitangan 
    else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        dataList = [
            { idPemangkuan: 'PMGK-1234', tarikhTawaran: '19/02/2024', gred: 'N32', position: 'Setiausaha Pejabat', keputusanPemangkuan: 'Belum Dikemaskini' },
        ]
    }
   
    return { 
        param,
        tableList154,
        tableListFlexi41, 
        dataList, 
        currentRoleCode ,
    };
};

export const _update154sTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO = 
        await EmploymentActingServices.get154List(param);
    return {
        param,
        response,
    }
}
export const _updateFlexi41Table = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO = 
        await EmploymentActingServices.getFlexi41List(param);
    return {
        param,
        response,
    }
}

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
