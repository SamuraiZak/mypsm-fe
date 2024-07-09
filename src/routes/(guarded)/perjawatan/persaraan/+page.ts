import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { retirementServices } from '$lib/services/implementation/mypsm/perjawatan/retirement.service';
import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';

export const load = async () => {
    // =============================
    // set mode
    // =============================

    let userMode: string = 'kakitangan';

    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? '';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'kakitangan';
            break;

        case UserRoleConstant.pelulus.code:
            userMode = 'pelulus';
            break;

        case UserRoleConstant.ketuaSeksyen.code:
            userMode = 'ketua Seksyen';
            break;

        case UserRoleConstant.urusSetiaPentadbiran.code:
            userMode = 'urusetia';
            break;

        default:
            break;
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 1,
            staffName: '',
            staffNo: '',
            identityCard: '',
            applicationDate: null,
            grade: '',
            position: '',
            status: '', // status code from lookup | null | undefined;
        },
    };

    let voluntaryViewResponse: CommonResponseDTO = {};
    let voluntaryViewTable = [];

    let forceViewResponse: CommonResponseDTO = {};
    let forceViewTable = [];

    let unspecifyViewResponse: CommonResponseDTO = {};
    let unspecifyViewTable = [];

    voluntaryViewResponse =
        await retirementServices.getVoluntaryListDetails(param);
    voluntaryViewTable = voluntaryViewResponse.data?.dataList ?? [];

    forceViewResponse = await retirementServices.getForceListDetails(param);
    forceViewTable = forceViewResponse.data?.dataList ?? [];

    unspecifyViewResponse =
        await retirementServices.getUnspecifyListDetails(param);
    unspecifyViewTable = unspecifyViewResponse.data?.dataList ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);
    return {
        param,
        voluntaryViewResponse,
        voluntaryViewTable,
        forceViewResponse,
        forceViewTable,
        unspecifyViewResponse,
        unspecifyViewTable,
        userMode,
        selectionOptions: {
            statusLookup,
        },
    };
};

export async function _updatevoluntaryTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await retirementServices.getVoluntaryListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}

export async function _updateForceTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await retirementServices.getForceListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}

export async function _updateUnspecifyTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await retirementServices.getUnspecifyListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}
