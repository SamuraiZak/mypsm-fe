import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { GCRAccumulationDetailRequestDTO, GCRWithdrawalApplicationDetailDTO, LeaveEmployeeDetailDTO } from '$lib/dto/mypsm/leave/leave.dto';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';

export async function load() {
    // only for employeee
    // get current employee detail
    let currentEmployeeDetail: LeaveEmployeeDetailDTO = {
        employeeId: 0,
    };

    let currentApplicationDetail: GCRWithdrawalApplicationDetailDTO = {
        employeeDetail: null,
        gcrDetail: null,
        document: null,
        director: null,
        secretary: null,
        integrity: null,
        chiefDirector: null,
        calculation: null,
    };

    let currentApplicationDetailRequest: GCRAccumulationDetailRequestDTO = {
        id: null,
    };

    let currentApplicationDetailResponse: CommonResponseDTO =
        await GCRServices.getWithdrawalApplicationDetail(
            currentApplicationDetailRequest,
        );

    if (currentApplicationDetailResponse.status == 'success') {
        currentApplicationDetail = currentApplicationDetailResponse.data
            ?.details as GCRWithdrawalApplicationDetailDTO;

        if (currentApplicationDetail.gcrDetail != null) {
        }
    }
}
