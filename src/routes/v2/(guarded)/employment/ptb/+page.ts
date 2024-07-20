import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";


export const load = async ({parent}) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode




    // employee NO PTB
    const paramEm = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {program:"SEMUA", // 'TETAP' | 'PERCUBAAN' | 'SEMENTARA' | 'KONTRAK' | 'PROJEK' | 'SAMBILAN' | 'PINJAMAN' | 'LAIN-LAIN' | 'SEMUA',
        employeeNumber:null,
        name:null,
        identityCard:null,
        scheme:"",
        grade:null,
        position:null},
    };
    const actingEmployeeListResponse: CommonResponseDTO =
        await PTBKWAPServices.getActingEmployeeList(paramEm);

    let actingEmployeeList: CommonEmployeeDTO[] = [];

    if (actingEmployeeListResponse.status == "success") {
        actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    // const param: CommonListRequestDTO = {
    //     pageNum: 1,
    //     pageSize: 5,
    //     orderBy: "id",
    //     orderType: 1,
    //     filter: {
    //         dataType: 1,
    //         staffName: "",
    //         staffNo: "",
    //         identityCard: "",
    //         applicationDate: null,
    //         grade: "",
    //         position: "",
    //         status: "" // status code from lookup | null | undefined;
    //     },
    // };

    // new table
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {
            staffName: "",
            staffNo: "",
            identityCard: "",
            applicationDate: null,
            grade: "",
            position: "",
            status: "" // status code from lookup | null | undefined;
        },
    };


    const paramNo: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 2,
            staffName: "",
            staffNo: "",
            identityCard: "",
            applicationDate: null,
            grade: "",
            position: "",
            status: "" // status code from lookup | null | undefined;
        },
    };

    const paramEmp: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 2,
            staffName: "",
            staffNo: "",
            identityCard: "",
            applicationDate: null,
            grade: "",
            position: "",
            status: "" // status code from lookup | null | undefined;
        },
    };

    const paramAss: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 2,
            staffName: "",
            staffNo: "",
            identityCard: "",
            applicationDate: null,
            grade: "",
            position: "",
            status: "" // status code from lookup | null | undefined;
        },
    };

    // ada pencen
    const paramUrusSetia: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {
            employeeNumber: null,
            name: null,
            identityCardNumber: null,
            applicationDate: null,
        },
    };

    // tiada no pencen
    const paramNoUrusSetia: CommonListRequestDTO = {
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
    };

    // kakitangan
    const paramEmployee: CommonListRequestDTO = {
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
    };


    // ada pencen
    let ptbViewResponse: CommonResponseDTO;
    let ptbViewTable = [];

    // tiada pencen
    let ptbNoViewResponse: CommonResponseDTO;
    let ptbNoViewTable = [];

    // kakitangan
    let ptbEmployeeResponse: CommonResponseDTO;
    let ptbEmployeeTable = [];

    // assign
    let ptbEmployeeAssignResponse: CommonResponseDTO;
    let ptbEmployeeAssignTable = [];



    // ada pencen
    ptbViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(param);
    ptbViewTable = ptbViewResponse.data?.dataList ?? [];

    // tiada 
    ptbNoViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(paramNo);
    ptbNoViewTable = ptbNoViewResponse.data?.dataList ?? [];

    // kakitangan 
    ptbEmployeeResponse = await PTBKWAPServices.getPTBKWAPEmployeeListDetails(paramEmp);
    ptbEmployeeTable = ptbEmployeeResponse.data?.dataList ?? [];

    // assign 
    ptbEmployeeAssignResponse = await PTBKWAPServices.getPTBKWAPEmployeeListAssignDetails(paramAss);
    ptbEmployeeAssignTable = ptbEmployeeAssignResponse.data?.dataList ?? [];

    return {
        param, paramUrusSetia, paramEmp,paramEm, ptbViewResponse, ptbViewTable, ptbNoViewResponse,
         ptbNoViewTable, paramNo, ptbEmployeeTable, ptbEmployeeResponse, actingEmployeeListResponse,
          actingEmployeeList, currentRoleCode,ptbEmployeeAssignResponse,
          ptbEmployeeAssignTable,paramEmployee,paramAss
    };

};

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await PTBKWAPServices.getPTBKWAPListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}

export async function _updateTableNo(paramNo: CommonListRequestDTO) {
    const response: CommonResponseDTO = await PTBKWAPServices.getPTBKWAPListDetails(paramNo);
    return {
        props: {
            paramNo,
            response,
        },
    };
}
export async function _updateTableEmployee(paramEmp: CommonListRequestDTO) {
    const response: CommonResponseDTO = await PTBKWAPServices.getPTBKWAPEmployeeListDetails(paramEmp);
    return {
        props: {
            paramEmp,
            response,
        },
    };
}


