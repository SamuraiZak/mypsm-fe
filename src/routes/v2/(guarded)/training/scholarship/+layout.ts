import { goto } from '$app/navigation';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundReimbursementListResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';

export const load = async ({ parent }) => {
    let fundApplicationResponse: CommonResponseDTO = {};
    let fundApplicationList = [];

    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            employeeNumber: null,
            employeeName: null,
            identityDocumentNumber: null,
            courseApplicationDate: null,
            status: null,
        },
    };

    // fund application list
    fundApplicationResponse =
        await CourseFundApplicationServices.getCourseFundApplicationList(param);

    fundApplicationList =
        (fundApplicationResponse.data
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
            fundApplicationList,
        },
        response: {
            fundApplicationResponse,
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

export const _checkIfDocumentExist = async (isStaff: boolean, id: number) => {
    const requestBody: commonIdRequestDTO = {
        id: Number(id),
    };

    // ==========================================================================
    // Check if document exist
    // ==========================================================================
    const fundApplicationDocumentInfoResponse: CommonResponseDTO =
        await CourseFundApplicationServices.getCurrentCandidateDocuments(
            requestBody,
        );

    if (fundApplicationDocumentInfoResponse.status === 'error') {
        if (isStaff) {
            goto(`./pembiayaan/${id}/document-upload`);
        } else {
            goto(`./pembiayaan/${id}`);
        }
    } else {
        goto(`./pembiayaan/${id}`);
    }
};
