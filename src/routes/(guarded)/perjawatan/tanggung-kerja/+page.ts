import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { EmployeeInterimApplicationDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-list-request.dto";
import type { EmployeeInterimApplicationListResponseDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-list-response.dto";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeInterimApplicationList: EmployeeInterimApplicationListResponseDTO[] = [];

    //Employees' POV: View Application Table
    const employeeApplicationParam = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            employeeNumber: null,
            name: null,
            identityCardNumber: null,
            applicationDate: null,
        },
    }
    const employeeInterimApplicationResponse: CommonResponseDTO = 
        await EmploymentInterimServices.getEmployeeApplicationList(employeeApplicationParam);

    
    const filter: CommonFilterDTO = {
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    let dataList;

    //table for kakitangan
    if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        // employeeInterimApplicationResponse =
        //     await EmploymentInterimServices.getEmployeeApplicationList(employeeApplicationParam);
        if(employeeInterimApplicationResponse.status == "success"){
            employeeInterimApplicationList = employeeInterimApplicationResponse.data?.dataList as EmployeeInterimApplicationListResponseDTO[];
        }
        
    }
    else if (currentRoleCode === UserRoleConstant.pengarahBahagian.code || currentRoleCode === UserRoleConstant.pengarahNegeri.code || currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) {
        dataList = [
            { noPekerja: '7956', name: 'Eric Dier', noKadPengenalan: 950420137894, jawatanSekarang: '-', jawatanYangDitanggungKerja: '-', penempatanSekarang: '-', penempatanYangDitanggungKerja: '-', status: 'Dalam Proses', tindakan: '-'},
        ]
    }
    else if (currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code) {
        dataList = [
            { noPekerja: '7956', name: 'Eric Dier', noKadPengenalan: 950420137894, penempatanSekarang: '00105 - Bhgn. Teknologi Maklumat', penempatanYangDitanggungKerja: '00101 - Bhgn. Teknikal', tarikhMohon: '20/02/2024', status: 'Sokong - Pengarah Bahagian/Negeri', tindakan: '-'},
        ]
    }

    let dataList2 = [
        { noPekerja: '7956', name: 'Eric Dier', noKadPengenalan: 950420137894, tarikhMula: '19/02/2024', tarikhAkhir: '19/02/2024', status: 'Tidak Aktif', suratPenamatan: "cetak surat here" },
    ]

    return {
        employeeApplicationParam,
        employeeInterimApplicationResponse,
        employeeInterimApplicationList,
        param,
        currentRoleCode,
        dataList,
        dataList2,
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
            { noPekerja: '7956', name: 'Eric Dier', noKadPengenalan: 950420137894, tarikhMohon: '19/02/2024', tarikhAkhir: '19/02/2024', status: 'Sokong - Pengarah Negeri', tindakan: "Tiada" },
        ],
    };

    return {
        param,
        response,
    };
};