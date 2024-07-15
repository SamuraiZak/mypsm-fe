import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseExamApplicationListResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service';

export const load = async ({ parent }) => {
    let examApplicationResponse: CommonResponseDTO = {};
    let examApplicationList = [];
    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            employeeNumber: null,
            employeeName: null,
            identityDocumentNumber: null,
            examTypeId: null,
            examTitle: null,
            examResult: null,
            examStatus: null,
        },
    };

    // exam application list
    examApplicationResponse =
        await CourseServices.getCourseExamApplicationList(param);

    examApplicationList =
        (examApplicationResponse.data
            ?.dataList as CourseExamApplicationListResponseDTO) ?? [];

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(statusLookupResponse);

    // ===========================================================================

    const examTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const examTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        examTypeLookupResponse,
    );

    // ===========================================================================

    const examResultLookupResponse: CommonResponseDTO =
        await LookupServices.getExamResultEnums();

    const examResultLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            examResultLookupResponse,
        );

    // ===========================================================================

    return {
        param,
        roles: {
            currentRoleCode,
            isStaffRole,
            layoutData,
        },
        list: {
            examApplicationList,
        },
        responses: {
            examApplicationResponse,
        },
        selectionOptions: {
            statusLookup,
            examTypeLookup,
            examResultLookup,
        },
    };
};
