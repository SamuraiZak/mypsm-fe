import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ConfirmationServices } from '$lib/services/implementation/mypsm/employment/confirmation-in-service/confirmation.service';

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

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
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: 0, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityDocumentNumber: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    const exceedsThreeYearsParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: 1, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityDocumentNumber: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    const rationalisationParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: 2, // 0:semua | 1:Lebih 3 tahun | 2: Rasionalisasi (kurang 3 tahun)
            employeeNumber: null, //string | null | undefined;
            name: null,
            identityDocumentNumber: null,
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
    } else if (isStateDirectorRole || isUnitDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                param,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                exceedsThreeYearsParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationStateDirectorList(
                rationalisationParam,
            );
    } else if (isIntegrityDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                param,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                exceedsThreeYearsParam,
            );
        confirmationInServiceRationalisationListResponse =
            await ConfirmationServices.getConfirmationIntegrityDirectorList(
                rationalisationParam,
            );
    } else if (isAuditDirectorRole) {
        confirmationInServiceListResponse =
            await ConfirmationServices.getConfirmationAuditDirectorList(
                param,
            );
        confirmationInServiceExceedsThreeYearsListResponse =
            await ConfirmationServices.getConfirmationAuditDirectorList(
                exceedsThreeYearsParam,
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
