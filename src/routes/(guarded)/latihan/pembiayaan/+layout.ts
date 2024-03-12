import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundReimbursementListResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import { renameExamTypeKeyValue } from '$lib/helpers/mypsm/course/exam-type.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';

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
        orderBy: 'id',
        orderType: 1,
        filter: {
            employeeNumber: null,
            employeeName: null,
            employeeIdentityNumber: null,
        },
    };

    // fund application list
    fundReimbursementResponse =
        await CourseFundApplicationServices.getCourseFundApplicationList(param);

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
    // ===========================================================================

    const educationTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getEducationTypeEnums();

    const educationTypeLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationTypeLookupResponse,
    );
    // ===========================================================================

    const fundApplicationTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getApplicationTypeEnums();

    const fundApplicationTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(fundApplicationTypeLookupResponse);

    return {
        param,
        roles: {
            currentRoleCode,
            isStaffRole,
        },
        list: {
            fundReimbursementList,
        },
        response: {
            fundReimbursementResponse,
        },
        lookups: {
            statusLookup,
            examTypeLookup,
            examResultLookup,
            educationLookup,
            institutionLookup,
            educationTypeLookup,
            fundApplicationTypeLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await CourseFundApplicationServices.getCourseFundApplicationList(param);

    await renameExamTypeKeyValue(response);

    return {
        param,
        response,
    };
};
