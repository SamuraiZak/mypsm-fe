import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { MovingInKuarters } from "$lib/dto/mypsm/pinjaman/kuarters/moving-in-list.dto"
import type { OutsiderId } from "$lib/dto/mypsm/pinjaman/kuarters/outsider-id.dto"
import type { OutsiderPersonalDetail } from "$lib/dto/mypsm/pinjaman/kuarters/outsider-personal-detail.dto"
import { _outsiderApplication } from "$lib/schemas/mypsm/quarters/quarters-schema"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"
import { zod } from "sveltekit-superforms/adapters"
import { superValidate } from "sveltekit-superforms/client"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let quartersList: MovingInKuarters[] = [];
    let quartersListResponse: CommonResponseDTO = {};

    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {}
    }

    quartersListResponse =
        await QuartersServices.getMovingInList(param);
    quartersList =
        quartersListResponse.data?.dataList as MovingInKuarters[];

    const form = await superValidate(zod(_outsiderApplication));

    return {
        currentRoleCode,
        param,
        quartersListResponse,
        quartersList,
        form,
    }
}

export const _applyQuarters = async () => {
    const response: CommonResponseDTO =
        await QuartersServices.addMovingInApplication();

    if (response.status == "success") {
        return { response }
    } else {
        new Error('Failed to create new application.')
    }
}
