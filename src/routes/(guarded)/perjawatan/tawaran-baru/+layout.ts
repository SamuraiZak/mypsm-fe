import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { NewOfferServices } from '$lib/services/implementation/mypsm/employment/new-offer/new-offer.service';

export const load = async () => {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const isEmploymentSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaPerjawatan.code;

    const isAuditDirectorRole =
        currentRoleCode === RoleConstant.pengarahAudit.code;

    const isIntegrityDirectorRole =
        currentRoleCode === RoleConstant.pengarahIntegriti.code;

    const isStateDirectorRole =
        currentRoleCode === RoleConstant.pengarahNegeri.code;

    const isUnitDirectorRole =
        currentRoleCode === RoleConstant.pengarahBahagian.code;

    const isSupporterRole = currentRoleCode === RoleConstant.penyokong.code;

    const isApproverRole = currentRoleCode === RoleConstant.pelulus.code;

    let newOfferMeetingListResponse: CommonResponseDTO = {};

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'meetingId',
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
            isStaffRole,
            isStateDirectorRole,
            isUnitDirectorRole,
            isEmploymentSecretaryRole,
            isAuditDirectorRole,
            isIntegrityDirectorRole,
            isSupporterRole,
            isApproverRole,
        },
    };
};
