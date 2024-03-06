import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseExamListResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-list-response.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service';

export const load = async () => {
    let examListResponse: CommonResponseDTO = {};
    let examList = [];
    let examApplicationResponse: CommonResponseDTO = {};
    let examApplicationList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            examTypeId: null, // 0 or Null: All | 1: Perkhidmatan | 2: PSL
            identityCard: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    // exam list
    examListResponse = await CourseServices.getCourseExamList(param);
    examList =
        (examListResponse.data?.dataList as CourseExamListResponseDTO) ?? [];

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
            examList,
            examApplicationList,
        },
        responses: {
            examListResponse,
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
