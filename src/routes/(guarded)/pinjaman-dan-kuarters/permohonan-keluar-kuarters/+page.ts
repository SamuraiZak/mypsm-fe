import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { MovingInKuarters } from "$lib/dto/mypsm/pinjaman/kuarters/moving-in-list.dto"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let quartersList: MovingInKuarters[] = [];
    let quartersListResponse: CommonResponseDTO = {};

    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    }
    const occupiedStatus: DropdownDTO[] = [
        { name: "Kedua-duanya", value: null },
        { name: "Sedang Didiami", value: true },
        { name: "Tidak Didiami", value: false },
    ]
    const applicantType: DropdownDTO[] = [
        { name: "Kakitangan", value: "" },
        { name: "Bukan Kakitangan", value: null },
    ]

    quartersListResponse =
        await QuartersServices.getMovingOutList(param);
    quartersList =
        quartersListResponse.data?.dataList as MovingInKuarters[];

    return {
        currentRoleCode,
        param,
        quartersList,
        quartersListResponse,
        occupiedStatus,
        applicantType,
    }
}
