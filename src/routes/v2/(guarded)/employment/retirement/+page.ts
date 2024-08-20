import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { retirementServices } from '$lib/services/implementation/mypsm/perjawatan/retirement.service.js';

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode;

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'groupId',
        orderType: 1,
        filter: {},
    };
    const employeeParam = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'promotionId',
        orderType: 1,
        filter: {},
    };

    let voluntaryViewResponse: CommonResponseDTO = {};
    let voluntaryViewTable = [];

    let forceViewResponse: CommonResponseDTO = {};
    let forceViewTable = [];

    let unspecifyViewResponse: CommonResponseDTO = {};
    let unspecifyViewTable = [];

    if (currentRoleCode !== UserRoleConstant.kakitangan.code) {
        voluntaryViewResponse =
            await retirementServices.getVoluntaryListDetails(param);
        voluntaryViewTable = voluntaryViewResponse.data?.dataList ?? [];

        forceViewResponse = await retirementServices.getForceListDetails(param);
        forceViewTable = forceViewResponse.data?.dataList ?? [];

        unspecifyViewResponse =
            await retirementServices.getUnspecifyListDetails(param);
        unspecifyViewTable = unspecifyViewResponse.data?.dataList ?? [];
    }

    return {
        currentRoleCode,
        param,
        employeeParam,
        voluntaryViewTable,
        voluntaryViewResponse,
        forceViewTable,
        forceViewResponse,
        unspecifyViewTable,
        unspecifyViewResponse,
    };
};
