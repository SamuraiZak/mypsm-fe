import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    TransferApplicationListFilterDTO,
    TransferApplicationListItemDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service';

export async function load({parent}) {
    const { layoutData } = await parent();
    // =========================================================
    // get self application list
    // =========================================================
    let selfApplicationList: TransferApplicationListItemDTO[] = [];

    const selfApplicationListFilter: TransferApplicationListFilterDTO = {
        employeeName: null,
        identityDocumentNumber: null,
        employeeNumber: null,
        status: null,
        transferType: 'Permohonan Sendiri',
    };

    const selfApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: selfApplicationListFilter,
    };

    const selfApplicationListResponse: CommonResponseDTO =
        await TransferServices.getApplicationList(selfApplicationListRequest);

    if (selfApplicationListResponse.status == 'success') {
        selfApplicationList = selfApplicationListResponse.data
            ?.dataList as TransferApplicationListItemDTO[];
    }

    // =========================================================
    // get director application list
    // =========================================================
    let directorApplicationList: TransferApplicationListItemDTO[] = [];

    const directorApplicationListFilter: TransferApplicationListFilterDTO = {
        employeeName: null,
        identityDocumentNumber: null,
        employeeNumber: null,
        status: null,
        transferType: "Arahan Pengarah",
    };

    const directorApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: directorApplicationListFilter,
    };

    const directorApplicationListResponse: CommonResponseDTO =
        await TransferServices.getApplicationList(directorApplicationListRequest);

    if (directorApplicationListResponse.status == 'success') {
        directorApplicationList = directorApplicationListResponse.data
            ?.dataList as TransferApplicationListItemDTO[];
    }
    
    // =========================================================
    // get management application list
    // =========================================================
    let managementApplicationList: TransferApplicationListItemDTO[] = [];

    const managementApplicationListFilter: TransferApplicationListFilterDTO = {
        employeeName: null,
        identityDocumentNumber: null,
        employeeNumber: null,
        status: null,
        transferType: "Arahan Pihak Pengurusan",
    };

    const managementApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: managementApplicationListFilter,
    };

    const managementApplicationListResponse: CommonResponseDTO =
        await TransferServices.getApplicationList(managementApplicationListRequest);

    if (managementApplicationListResponse.status == 'success') {
        managementApplicationList = managementApplicationListResponse.data
            ?.dataList as TransferApplicationListItemDTO[];
    }

    return {
        props: {
            layoutData,
            selfApplication: {
                list: selfApplicationList,
                request: selfApplicationListRequest,
                filter: selfApplicationListFilter,
                response: selfApplicationListResponse,
            },
            directorApplication: {
                list: directorApplicationList,
                request: directorApplicationListRequest,
                filter: directorApplicationListFilter,
                response: directorApplicationListResponse,
            },
            managementApplication: {
                list: managementApplicationList,
                request: managementApplicationListRequest,
                filter: managementApplicationListFilter,
                response: managementApplicationListResponse,
            },
        },
    };
}
