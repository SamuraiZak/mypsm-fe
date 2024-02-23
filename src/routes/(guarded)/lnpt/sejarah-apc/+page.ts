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
    // check guard
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    if (currentRoleCode !== null && guard.includes(currentRoleCode)) {
        // TODO: your code here

        // filter
        const filter: CommonFilterDTO = {
            identityCard: null,
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

        return {
            props: {
                param,
                response,
                apcHistories,
            },
        };
    } else {
        error(401);
    }
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
