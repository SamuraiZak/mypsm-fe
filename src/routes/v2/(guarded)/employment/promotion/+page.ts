import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { PromotionCommonList } from "$lib/dto/mypsm/employment/promotion/promotion-common-list.dto";
import { EmploymentPromotionServices } from "$lib/services/implementation/mypsm/perjawatan/employment-promotion.service";

export const load = async ({parent}) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode


    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "groupId",
        orderType: 1,
        filter: {},
    };
    const employeeParam = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "promotionId",
        orderType: 1,
        filter: {},
    };

    let table154: PromotionCommonList[] = [];
    let table154Response: CommonResponseDTO = {};
    let tableTbk12: PromotionCommonList[] = [];
    let tableTbk12Response: CommonResponseDTO = {};
    let tableMain: PromotionCommonList[] = [];
    let tableMainResponse: CommonResponseDTO = {};
    let employeePromotionResponse: CommonResponseDTO = {};
    let employeePromotion: PromotionCommonList[] = [];

    //Table for urus setia/pengarah bahagian/negeri
    if (currentRoleCode !== UserRoleConstant.kakitangan.code){
        table154Response =
            await EmploymentPromotionServices.get154List(param);
        table154 =
            table154Response.data?.dataList as PromotionCommonList[]
        tableTbk12Response =
            await EmploymentPromotionServices.getTbk12List(param);
        tableTbk12 =
            tableTbk12Response.data?.dataList as PromotionCommonList[]
        tableMainResponse =
            await EmploymentPromotionServices.getMainList(param);
        tableMain =
            tableMainResponse.data?.dataList as PromotionCommonList[]
    }
    else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        employeePromotionResponse =
            await EmploymentPromotionServices.getEmployeePromotionOffer(employeeParam)
        employeePromotion =
            employeePromotionResponse.data?.dataList as PromotionCommonList[];
    }

    return {
        currentRoleCode,
        param,
        table154Response,
        table154,
        tableTbk12Response,
        tableTbk12,
        tableMainResponse,
        tableMain,
        employeeParam,
        employeePromotionResponse,
        employeePromotion,
    };
};