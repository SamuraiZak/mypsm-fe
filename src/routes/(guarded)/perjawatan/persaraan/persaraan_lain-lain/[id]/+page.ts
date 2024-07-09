import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type {
    USPRetirementApplicationDetailDTO,
    USPRetirementChosenListFilter,
    USPRetirementEmployeeDetailDTO,
} from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
import { RetirementOtherServices } from '$lib/services/implementation/mypsm/employment/retirement/retirement-other.service.js';

export async function load({ params }) {
    // set current group Id
    let currentApplicationId: number = parseInt(params.id);

    // set current application detail
    let currentApplicationDetail: USPRetirementApplicationDetailDTO = {
        groupId: currentApplicationId,
        chosenListDetail: [],
    };

    // get current application chosen list
    let chosenList: USPRetirementEmployeeDetailDTO[] = [];

    let chosenListFilter: USPRetirementChosenListFilter = {
        groupId: currentApplicationId,
        name: null,
        employeeNumber: null,
        identityDocumentNumber: null,
    };

    const chosenListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: chosenListFilter,
    };

    const chosenListResponse: CommonResponseDTO =
        await RetirementOtherServices.getChosenList(chosenListRequest);

    if (chosenListResponse.status == 'success') {
        chosenList = chosenListResponse.data
            ?.dataList as USPRetirementEmployeeDetailDTO[];
    }

    return {
        props: {
            currentApplicationId,
            currentApplicationDetail,
            chosenList,
            chosenListFilter,
            chosenListRequest,
            chosenListResponse,
        },
    };
}
