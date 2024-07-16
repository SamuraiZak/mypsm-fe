import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingChargeListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';

export const load = async () => {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const isDisciplineSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaTatatertib.code;

    const isIntegritySecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaIntegriti.code;

    const isIntegrityDirectorRole =
        currentRoleCode === RoleConstant.pengarahIntegriti.code;

    let proceedingListResponse: CommonResponseDTO = {};
    let proceedingList = [];

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'integrityId',
        orderType: 1,
        filter: {
            identityDocumentNumber: null, //string | null | undefined;
            grade: null,
            position: null,
            year: null,
            employeeNumber: null,
            name: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    // proceeding - charge appeal list
    proceedingListResponse =
        await IntegrityProceedingServices.getProceedingChargeAppealList(param);

    proceedingList =
        (proceedingListResponse.data
            ?.dataList as ProceedingChargeListResponseDTO) ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        list: {
            proceedingList,
        },
        responses: {
            proceedingListResponse,
        },
        selectionOptions: {
            statusLookup,
        },
        roles: {
            isStaffRole,
            isDisciplineSecretaryRole,
            isIntegritySecretaryRole,
            isIntegrityDirectorRole,
        },
    };
};

export const _updateChargeAppealTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingChargeRecordList(param);

    return {
        param,
        response,
    };
};
