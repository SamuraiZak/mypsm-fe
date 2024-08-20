import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    TransferApplicationListFilterDTO,
    TransferApplicationListItemDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service';

export async function load({ parent, params }) {
    const { layoutData } = await parent();

    // =========================================================
    // get self application list
    // =========================================================
    let selfApplicationList: TransferApplicationListItemDTO[] = [];

    let transferType: string = '';

    switch (params.type) {
        case 'self':
            transferType = 'Permohonan Sendiri';
            break;
        case 'director':
            transferType = 'Arahan Pengarah';
            break;
        case 'management':
            transferType = 'Arahan Pihak Pengurusan';
            break;
        case 'all':
            transferType = '';
            break;
        default:
            transferType = '';
            break;
    }

    const selfApplicationListFilter: TransferApplicationListFilterDTO = {
        employeeName: null,
        identityDocumentNumber: null,
        employeeNumber: null,
        status: null,
        transferType: transferType,
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
