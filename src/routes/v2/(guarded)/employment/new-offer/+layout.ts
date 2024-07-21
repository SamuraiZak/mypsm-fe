import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { NewOfferServices } from '$lib/services/implementation/mypsm/employment/new-offer/new-offer.service';

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const isEmploymentSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaPerjawatan.code;

    const isSupporterRole = currentRoleCode === RoleConstant.kakitangan.code;

    const isApproverRole = currentRoleCode === RoleConstant.kakitangan.code;

    let newOfferMeetingListResponse: CommonResponseDTO = {};

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            meetingName: null, //string | null | undefined;
            meetingDate: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    // List
    if (isEmploymentSecretaryRole) {
        newOfferMeetingListResponse =
            await NewOfferServices.getNewOfferMeetingList(param);
    } else if (isSupporterRole) {
        newOfferMeetingListResponse =
            await NewOfferServices.getNewOfferMeetingSupporterList(param);
    } else if (isApproverRole) {
        newOfferMeetingListResponse =
            await NewOfferServices.getNewOfferMeetingApproverList(param);
    }

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(statusLookupResponse);

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        responses: {
            newOfferMeetingListResponse,
        },
        selectionOptions: {
            statusLookup,
        },
        roles: {
            layoutData,
            isStaffRole,
            isEmploymentSecretaryRole,
            isSupporterRole,
            isApproverRole,
        },
    };
};
