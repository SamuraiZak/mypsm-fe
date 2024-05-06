import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ConfirmationServices } from '$lib/services/implementation/mypsm/employment/confirmation-in-service/confirmation.service';

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

    let confirmationInServiceListResponse: CommonResponseDTO = {};
    let confirmationInServiceExceedsThreeYearsListResponse: CommonResponseDTO =
        {};
    let confirmationInServiceRationalisationListResponse: CommonResponseDTO =
        {};

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            dataType: 0, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityCard: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    const exceedsThreeYearsParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            dataType: 1, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityCard: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    const rationalisationParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            dataType: 2, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityCard: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    // List
    if (isEmploymentSecretaryRole || isStaffRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationList(param);
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationList(
                exceedsThreeYearsParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationList(
                rationalisationParam,
            );
    } else if (isStateDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                rationalisationParam,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                rationalisationParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                rationalisationParam,
            );
    } else if (isIntegrityDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                rationalisationParam,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                rationalisationParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                rationalisationParam,
            );
    } else if (isAuditDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationAuditDirectorList(
                rationalisationParam,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationAuditDirectorList(
                rationalisationParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationAuditDirectorList(
                rationalisationParam,
            );
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
        exceedsThreeYearsParam,
        rationalisationParam,
        currentRoleCode,
        responses: {
            confirmationInServiceListResponse,
            confirmationInServiceExceedsThreeYearsListResponse,
            confirmationInServiceRationalisationListResponse,
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
        },
    };
};
