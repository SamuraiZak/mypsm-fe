import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundApplicationListResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';

export const load = async () => {
    let fundApplicationResponse: CommonResponseDTO = {};
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
    fundApplicationResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementList(
            param,
        );

    fundReimbursementList =
        (fundApplicationResponse.data
            ?.dataList as CourseFundApplicationListResponseDTO) ?? [];

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

    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            educationLookupResponse,
        );

    // ===========================================================================

    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            institutionLookupResponse,
        );

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
            fundApplicationResponse,
        },
        lookups: {
            statusLookup,
            examTypeLookup,
            examResultLookup,
            educationLookup,
            institutionLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.getCourseFundReimbursementList(
            param,
        );

    return {
        param,
        response,
    };
};
