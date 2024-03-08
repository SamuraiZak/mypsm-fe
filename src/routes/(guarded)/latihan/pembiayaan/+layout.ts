import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundReimbursementListResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import { renameExamTypeKeyValue } from '$lib/helpers/mypsm/course/exam-type.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';

export const load = async () => {
    let fundReimbursementResponse: CommonResponseDTO = {};
    let fundReimbursementList = [];

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: 1,
        filter: {
            employeeNumber: null,
            employeeName: null,
            employeeIdentityNumber: null,
        },
    };

    // fund application list
    fundReimbursementResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementList(
            param,
        );

    await renameExamTypeKeyValue(fundReimbursementResponse);

    fundReimbursementList =
        (fundReimbursementResponse.data
            ?.dataList as CourseFundReimbursementListResponseDTO) ?? [];

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
        },
        list: {
            fundReimbursementList,
        },
        responses: {
            fundReimbursementResponse,
        },
        selectionOptions: {
            statusLookup,
            examTypeLookup,
            examResultLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.getCourseFundReimbursementList(
            param,
        );

    await renameExamTypeKeyValue(response);

    return {
        param,
        response,
    };
};
