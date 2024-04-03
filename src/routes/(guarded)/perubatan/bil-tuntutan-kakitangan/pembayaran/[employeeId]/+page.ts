import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js'
import type { MedicalClinicEmployeePaymentPersonalDetail } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payment-personal-detail.dto';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service.js';

export const load = async ({ params }) => {
    let currentId: commonIdRequestDTO = {
        id: Number(params.employeeId)
    }

    let paymentPersonalDetail = {} as MedicalClinicEmployeePaymentPersonalDetail;

    const paymentPersonalDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicEmployeePaymentPersonalDetail(currentId);
    paymentPersonalDetail =
        paymentPersonalDetailResponse.data?.details as MedicalClinicEmployeePaymentPersonalDetail
    return {
        paymentPersonalDetail
    }
}