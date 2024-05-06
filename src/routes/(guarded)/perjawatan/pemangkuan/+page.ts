import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { EmployeeActingOffer, ActingCommonList } from "$lib/dto/mypsm/employment/acting/acting-common-list.dto";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let tableList154Response: CommonResponseDTO = {};
    let tableList154: ActingCommonList[] = [];
    let tableListFlexiResponse: CommonResponseDTO = {};
    let tableListFlexi41: ActingCommonList[] = [];
    let tableListMainResponse: CommonResponseDTO = {};
    let tableListMain: ActingCommonList[] = [];
    let employeeOfferResponse: CommonResponseDTO = {};
    let employeeOffer: EmployeeActingOffer[] = [];

    // param for table 154/flexi41/main
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "batchId",
        orderType: 1,
        filter: {},
    };
    const employeeParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "createdAt",
        orderType: 1,
        filter: {},
    };

    //table for urus setia/penyokong/pelulus/pengarah
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
        employeeOfferResponse =
            await EmploymentActingServices.getEmployeeActingOffer(employeeParam);
        employeeOffer =
            employeeOfferResponse.data?.dataList as EmployeeActingOffer[];
    }

    return {
        param,
        tableList154Response,
        tableList154,
        tableListFlexiResponse,
        tableListFlexi41,
        tableListMainResponse,
        tableListMain,
        currentRoleCode,
        employeeOfferResponse,
        employeeOffer,
        employeeParam,
    };
};
