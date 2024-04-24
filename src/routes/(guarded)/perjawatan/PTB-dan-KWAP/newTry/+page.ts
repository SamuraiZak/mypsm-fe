import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";

export const load = async () => {
    
    let agreementLetter = getAgreementLetter()
    
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    // urusetia
    let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;

    // employee NO PTB
    const paramEm = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };
    const actingEmployeeListResponse: CommonResponseDTO =
    await EmploymentActingServices.getActingEmployeeList(paramEm);

let actingEmployeeList: CommonEmployeeDTO[] = [];

if (actingEmployeeListResponse.status == "success") {
    actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
}



    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 1,
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

    // ada pencen
    const paramUrusSetia: CommonListRequestDTO = {
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



    // ada pencen
    ptbViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(param);
    ptbViewTable = ptbViewResponse.data?.dataList ?? [];

    // tiada 
    ptbNoViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(paramNo);
    ptbNoViewTable = ptbNoViewResponse.data?.dataList ?? [];

    // kakitangan 
    ptbEmployeeResponse = await PTBKWAPServices.getPTBKWAPEmployeeListDetails(paramEmp);
    ptbEmployeeTable = ptbEmployeeResponse.data?.dataList ?? [];


    return {
        param, paramUrusSetia,paramEmp, ptbViewResponse, ptbViewTable, ptbNoViewResponse, ptbNoViewTable, paramNo,ptbEmployeeTable,ptbEmployeeResponse,agreementLetter,actingEmployeeListResponse,actingEmployeeList,
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


const getAgreementLetter = () => {
    const url = "http://localhost:3333/employment/pension_detail/employee/forms/download"
    
    return url
}


