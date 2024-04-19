import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    TransferCommonHistoryDTO,
    TransferCommonHistoryFilterDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { TransferApplicationServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service';

export async function load() {
    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    // set default mode
    let userMode: string = 'employee';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'employee';
            break;
        case UserRoleConstant.pengarahBahagian.code:
            userMode = 'director';
            break;
        case UserRoleConstant.pengarahNegeri.code:
            userMode = 'director';
            break;
        case UserRoleConstant.urusSetiaPerjawatan.code:
            userMode = 'secretary';
            break;

        default:
            userMode = 'employee';
            break;
    }

    // get director application history list
    let directorApplicationList: TransferCommonHistoryDTO[] = [];

    let directorApplicationListFilter: TransferCommonHistoryFilterDTO = {
        directorName: '',
        employeeName: '',
        employeeIdentityCardNumber: '',
        status: '',
        result: '',
        applicationType: 'director',
    };

    let directorApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: directorApplicationListFilter,
    };

    let directorApplicationListResponse: CommonResponseDTO =
        await TransferApplicationServices.getCommonHistory(
            directorApplicationListRequest,
        );

    if (directorApplicationListResponse.status == 'success') {
        directorApplicationList = directorApplicationListResponse.data
            ?.dataList as TransferCommonHistoryDTO[];
    }

    // get management application history list
    let managementApplicationList: TransferCommonHistoryDTO[] = [];

    let managementApplicationListFilter: TransferCommonHistoryFilterDTO = {
        directorName: '',
        employeeName: '',
        employeeIdentityCardNumber: '',
        status: '',
        result: '',
        applicationType: 'management',
    };

    let managementApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: managementApplicationListFilter,
    };

    let managementApplicationListResponse: CommonResponseDTO =
        await TransferApplicationServices.getCommonHistory(
            managementApplicationListRequest,
        );

    if (managementApplicationListResponse.status == 'success') {
        managementApplicationList = managementApplicationListResponse.data
            ?.dataList as TransferCommonHistoryDTO[];
    }

    return {
        props: {
            currentRoleCode,
            userMode,
        },
        director: {
            directorApplicationList,
            directorApplicationListFilter,
            directorApplicationListRequest,
            directorApplicationListResponse,
        },
        management: {
            managementApplicationList,
            managementApplicationListFilter,
            managementApplicationListRequest,
            managementApplicationListResponse,
        },
    };
}
