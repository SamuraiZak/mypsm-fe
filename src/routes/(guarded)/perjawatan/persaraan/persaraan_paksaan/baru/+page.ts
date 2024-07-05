import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    RetirementEmployeeDTO,
    RetirementOtherAddChosenDTO,
} from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
import { RetirementOtherServices } from '$lib/services/implementation/mypsm/employment/retirement/retirement-other.service';

export async function load() {
    // get employee list
    let employeeList: RetirementEmployeeDTO[] = [];

    const employeeListFilter = {
        employeeNumber: null,
        name: null,
        identityDocumentNumber: null,
        applicationDate: null,
    };

    const employeeListRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: employeeListFilter,
    };

    const employeeListResponse: CommonResponseDTO =
        await RetirementOtherServices.getEmployeeList(employeeListRequest);

    if (employeeListResponse.status == 'success') {
        employeeList = employeeListResponse.data
            ?.dataList as RetirementEmployeeDTO[];
    }

    return {
        props: {
            employeeList,
            employeeListFilter,
            employeeListRequest,
            employeeListResponse,
        },
    };
}

export async function _submitChosenList(formData: RetirementOtherAddChosenDTO) {
    const response =
        await RetirementOtherServices.createNewApplication(formData);

    return { response };
}
