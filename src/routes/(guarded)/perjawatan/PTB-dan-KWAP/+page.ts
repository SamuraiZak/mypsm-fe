import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";

export const load = async () => {
  
    
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    // urusetia
     let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;

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


    // ada pencen
    let ptbViewResponse: CommonResponseDTO;
    let ptbViewTable = [];

    // tiada pencen
    let ptbNoViewResponse: CommonResponseDTO;
    let ptbNoViewTable = [];


    
    // ada pencen
    ptbViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(param);
    ptbViewTable = ptbViewResponse.data?.dataList ?? [];

    // tiada 
    ptbNoViewResponse = await PTBKWAPServices.getPTBKWAPListDetails(paramNo);
    ptbNoViewTable = ptbNoViewResponse.data?.dataList ?? [];
   
return {
    param, paramUrusSetia,ptbViewResponse,ptbViewTable,ptbNoViewResponse,ptbNoViewTable,paramNo,
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


