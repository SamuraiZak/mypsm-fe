import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseExamListResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-list-response.dto';
import { renameExamTypeKeyValue } from '$lib/helpers/mypsm/course/exam-type.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service';

export const load = async () => {
    let examListResponse: CommonResponseDTO = {};
    let examList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            examTypeId: null, // 0 or Null: All | 1: Perkhidmatan | 2: PSL
            identityCard: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    // exam list
    examListResponse = await CourseServices.getCourseExamList(param);

    await renameExamTypeKeyValue(examListResponse);

    examList =
        (examListResponse.data?.dataList as CourseExamListResponseDTO) ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

    // ===========================================================================

    const examTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const examTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        examTypeLookupResponse,
    );

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        list: {
            examList,
        },
        responses: {
            examListResponse,
        },
        selectionOptions: {
            examTypeLookup,
            statusLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await CourseServices.getCourseExamList(param);

    await renameExamTypeKeyValue(response);
    return {
        param,
        response,
    };
};
