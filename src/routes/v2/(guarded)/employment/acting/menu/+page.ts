import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type {
    ActingCommonList,
    EmployeeActingOffer,
} from '$lib/dto/mypsm/employment/acting/acting-common-list.dto.js';
import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service.js';

// load
export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRole;

    // get the acting list 1-54
    let actingListType154: ActingCommonList[] = [];
    let actingListType154Response: CommonResponseDTO = {};

    const actingListType154Request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'batchId',
        orderType: 1,
        filter: {},
    };

    // get the acting list Flexi41
    let actingListTypeFlexi41: ActingCommonList[] = [];
    let actingListTypeFlexi41Response: CommonResponseDTO = {};

    const actingListTypeFlexi41Request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'batchId',
        orderType: 1,
        filter: {},
    };

    // get the acting list Main
    let actingListTypeMain: ActingCommonList[] = [];
    let actingListTypeMainResponse: CommonResponseDTO = {};

    const actingListTypeMainRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'batchId',
        orderType: 1,
        filter: {},
    };

    // get the acting offer for employee
    let actingOfferListEmployee: EmployeeActingOffer[] = [];
    let actingOfferListEmployeeResponse: CommonResponseDTO = {};

    const actingOfferListEmployeeRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'actingId',
        orderType: 1,
        filter: {},
    };

    if (currentRoleCode !== UserRoleConstant.kakitangan.code) {
        // 154
        actingListType154Response = await EmploymentActingServices.get154List(
            actingListType154Request,
        );

        actingListType154 = actingListType154Response.data?.dataList ?? [];

        // Flexi41
        actingListTypeFlexi41Response =
            await EmploymentActingServices.getFlexi41List(
                actingListTypeFlexi41Request,
            );

        actingListTypeFlexi41 = actingListTypeFlexi41Response.data?.dataList ?? [];

        // Main
        actingListTypeMainResponse = await EmploymentActingServices.getMainList(
            actingListTypeMainRequest,
        );

        actingListTypeMain = actingListTypeMainResponse.data?.dataList ?? [];
    } else {
        actingOfferListEmployeeResponse =
            await EmploymentActingServices.getEmployeeActingOffer(
                actingOfferListEmployeeRequest,
            );

        if (actingOfferListEmployeeResponse.status == 'success') {
            actingOfferListEmployee =
                actingOfferListEmployeeResponse.data?.dataList ?? [];
        }
    }

    return {
        props: {
            layoutData,
            gred154: {
                list: actingListType154,
                response: actingListType154Response,
                request: actingListType154Request,
            },
            gredFlexi41: {
                list: actingListTypeFlexi41,
                response: actingListTypeFlexi41Response,
                request: actingListTypeFlexi41Request,
            },
            gredMain: {
                list: actingListTypeMain,
                response: actingListTypeMainResponse,
                request: actingListTypeMainRequest,
            },
            offer: {
                list: actingOfferListEmployee,
                response: actingOfferListEmployeeResponse,
                request: actingOfferListEmployeeRequest,
            },
        },
    };
};
