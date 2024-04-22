import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ActingCommonList } from "$lib/dto/mypsm/employment/acting/acting-common-list.dto";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let tableList154Response: CommonResponseDTO = {};
    let tableList154: ActingCommonList[] = [];
    let tableListFlexiResponse: CommonResponseDTO = {};
    let tableListFlexi41: ActingCommonList[] = [];
    let tableListMainResponse: CommonResponseDTO = {};
    let tableListMain: ActingCommonList[] = [];
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
    if (currentRoleCode !== UserRoleConstant.kakitangan.code) {
        //154
        tableList154Response = await EmploymentActingServices.get154List(param);
        tableList154 = tableList154Response.data?.dataList ?? [];

        //flexi 41
        tableListFlexiResponse = await EmploymentActingServices.getFlexi41List(param);
        tableListFlexi41 = tableListFlexiResponse.data?.dataList ?? []

        //main
        tableListMainResponse = await EmploymentActingServices.getMainList(param);
        tableListMain = tableListMainResponse.data?.dataList ?? []

    }
    //table for kakitangan 
    else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        dataList = [
            { idPemangkuan: 'PMGK-1234', tarikhTawaran: '19/02/2024', gred: 'N32', position: 'Setiausaha Pejabat', keputusanPemangkuan: 'Belum Dikemaskini' },
        ]
    }

    return {
        param,
        tableList154Response,
        tableList154,
        tableListFlexiResponse,
        tableListFlexi41,
        tableListMainResponse,
        tableListMain,
        dataList,
        currentRoleCode,
    };
};
