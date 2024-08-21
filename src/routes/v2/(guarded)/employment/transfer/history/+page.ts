import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    TransferApplicationListFilterDTO,
    TransferApplicationListItemDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service';

export async function load({ parent }) {
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
        transferType: null,
    };

    const selfApplicationListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: selfApplicationListFilter,
    };

    const selfApplicationListResponse: CommonResponseDTO =
        await TransferServices.getTransferHistory(selfApplicationListRequest);

    if (selfApplicationListResponse.status == 'success') {
        selfApplicationList = selfApplicationListResponse.data
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
        },
    };
}
