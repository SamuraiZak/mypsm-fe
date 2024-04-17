import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js'
import type { ClinicPanelEmployeeDependant } from '$lib/dto/mypsm/perubatan/clinic-panel-employee-dependant.dto';
import type { MedicalEmployeeDetail } from '$lib/dto/mypsm/perubatan/medical-employee-detail.dto';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service.js';

export const load = async ({ params }) => {
    let currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;
    let employeeDependant: ClinicPanelEmployeeDependant[] = [];

    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            employeeId: currentId.id,
        }
    }

    const employeeDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelClaimEmployee(currentId)
    employeeDetail =
        employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    const employeeDependantResponse: CommonResponseDTO =
        await MedicalServices.getEmployeeDependant(param);
    employeeDependant =
        employeeDependantResponse.data?.dataList as ClinicPanelEmployeeDependant[];

    return {
        employeeDetail,
        employeeDependant,
        param,
        employeeDependantResponse,
    }
}

//update employee dependant table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await MedicalServices.getEmployeeDependant(param);
    return {
        props: {
            param,
            response,
        },
    };
}