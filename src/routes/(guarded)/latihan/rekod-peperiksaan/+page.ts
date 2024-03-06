import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service';

export const load = async () => {
    let examApplicationResponse: CommonResponseDTO = {};
    let examApplicationList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: 1,
        filter: {
            employeeNumber: null,
            employeeName: null,
            employeeIdentityNumber: null,
            examTypeId: null,
            examTitle: null,
            examDate: null,
            examResult: null,
            examStatus: null,
        },
    };

    // submitted form list
    examApplicationResponse =
        await CourseServices.getCourseExamApplicationList(param);
    examApplicationList = examApplicationResponse.data?.dataList ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        list: {
            examApplicationList,
        },
        responses: {
            examApplicationResponse,
        },
        selectionOptions: {
            statusLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await CourseServices.getCourseExamList(param);
    return {
        param,
        response,
    };
};
