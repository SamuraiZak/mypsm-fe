import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ApcDTO } from '$lib/dto/mypsm/lnpt/apc.dto';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { error } from '@sveltejs/kit';

const guard: string[] = [UserRoleConstant.urusSetiaLnpt.code];

export async function load() {

        // filter
        const filter: CommonFilterDTO = {
            identityDocumentNumber: null,
            employeeNumber: null,
            name: null,
            position: null,
            status: null,
        };

        // request body
        const param: CommonListRequestDTO = {
            pageNum: 1,
            pageSize: 5,
            orderBy: null,
            orderType: null,
            filter: filter,
        };

        // fetch apc history
        const response: CommonResponseDTO =
            await LNPTServices.getApcHistory(param);

        // convert to apcdto
        const apcHistories: ApcDTO[] = response.data?.dataList as ApcDTO[];

        // request body - print
        const printParam: CommonListRequestDTO = {
            pageNum: 1,
            pageSize: response.data?.meta?.totalData,
            orderBy: null,
            orderType: null,
            filter: filter,
        };

        // fetch apc history - print
        const printResponse: CommonResponseDTO =
            await LNPTServices.getApcHistory(printParam);

        return {
            props: {
                param,
                response,
                apcHistories,
                printResponse,
            },
        };

}

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await LNPTServices.getApcHistory(param);

    return {
        props: {
            param,
            response,
        },
    };
}
