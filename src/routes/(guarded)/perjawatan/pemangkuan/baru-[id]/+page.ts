import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto.js';
import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service.js';

export const load = async ({ params }) => {

    // let actingEmployeeListResponse:  CommonResponseDTO;
    // let actingEmployeeList = [];

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };  

    const actingEmployeeListResponse: CommonResponseDTO = 
        await EmploymentActingServices.getActingEmployeeList(param);
    
    let actingEmployeeList : CommonEmployeeDTO[] = [];

    if (actingEmployeeListResponse.status == "success") {
        actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
    ];
    const dataList2 = [
        { noPekerja: 'F-6699', name: 'David Villa', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6700', name: 'Kylian Mbappe', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6701', name: 'Fabrizio Romano', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6702', name: 'Peter Cech', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
    ];

    console.log(params.id)
    const actingTypes = params.id;
    return {
        actingEmployeeList,
        actingEmployeeListResponse,
        dataList, dataList2, param,
        actingTypes
    };

};

export const _updateActingEmployeeListTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await EmploymentActingServices.getActingEmployeeList(param);

    return {
        param,
        response,
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
