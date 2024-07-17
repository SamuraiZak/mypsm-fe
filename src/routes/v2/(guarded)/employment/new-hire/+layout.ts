import { RoleConstant } from '$lib/constants/core/role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
// import { redirect } from '@sveltejs/kit';

// guard code WIP

export const load = async ({ parent }) => {
    let candidateViewResponse: CommonResponseDTO = {};
    let candidateViewTable = [];
    let newCandidateResponse: CommonResponseDTO = {};
    let newCandidateList = [];
    let submittedFormResponse: CommonResponseDTO = {};
    let submittedFormList = [];
    let supporterViewResponse: CommonResponseDTO = {};
    let supporterViewList = [];
    let approverViewResponse: CommonResponseDTO = {};
    let approverViewList = [];

    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const isCandidateRole = currentRoleCode === RoleConstant.calon.code;
    const isEmploymentSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaPerjawatan.code;
    const isSupporterRole = currentRoleCode === RoleConstant.kakitangan.code;
    const isApproverRole = currentRoleCode === RoleConstant.kakitangan.code;

    // const authorised =
    //     currentRoleCode === RoleConstant.urusSetiaPerjawatan.code ||
    //     currentRoleCode === RoleConstant.calon.code;

    // if (!authorised) throw redirect(303, `/login?redirectTo=${url.pathname}`);

    // datatype 0: New added "new hire"
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: 0, // 0: New | 1: Other | null
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    // datatype 1: Submitted "new hire" application status
    const submittedTableParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: 1, // 0: New | 1: Other | null
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    // datatype null: All "new hire" application list
    const allNewHireTableParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            dataType: null, // 0: New | 1: Other | null
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    if (isCandidateRole) {
        candidateViewResponse = await EmploymentServices.getCandidateListView();
        candidateViewTable = candidateViewResponse.data?.dataList ?? [];
    } else if (isEmploymentSecretaryRole) {
        // new added list
        newCandidateResponse = await EmploymentServices.getNewHireList(param);
        newCandidateList = newCandidateResponse.data?.dataList ?? [];

        // submitted form list
        submittedFormResponse =
            await EmploymentServices.getNewHireList(submittedTableParam);
        submittedFormList = submittedFormResponse.data?.dataList ?? [];
    } else if (isSupporterRole) {
        supporterViewResponse =
            await EmploymentServices.getSupporterListOfCandidates(
                allNewHireTableParam,
            );
        supporterViewList = supporterViewResponse.data?.dataList ?? [];
    } else if (isApproverRole) {
        approverViewResponse =
            await EmploymentServices.getApproverListOfCandidates(
                allNewHireTableParam,
            );
        approverViewList = approverViewResponse.data?.dataList ?? [];
    }

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(statusLookupResponse);

    // ===========================================================================

    return {
        param,
        submittedTableParam,
        allNewHireTableParam,
        submittedFormList,
        newCandidateList,
        candidateViewTable,
        supporterViewList,
        approverViewList,
        roles: {
            isCandidateRole,
            isEmploymentSecretaryRole,
            isSupporterRole,
            isApproverRole,
            currentRoleCode,
        },
        responses: {
            candidateViewResponse,
            newCandidateResponse,
            submittedFormResponse,
            supporterViewResponse,
            approverViewResponse,
        },
        selectionOptions: {
            statusLookup,
        },
    };
};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await EmploymentServices.getNewHireList(param);
    return {
        param,
        response,
    };
};

export const _updateSubmittedListTable = async (
    param: CommonListRequestDTO,
) => {
    const response: CommonResponseDTO =
        await EmploymentServices.getNewHireList(param);
    return {
        param,
        response,
    };
};

export const _updateCandidateViewTable = async (
    param: CommonListRequestDTO,
) => {
    const response: CommonResponseDTO =
        await EmploymentServices.getCandidateListView();
    return {
        param,
        response,
    };
};

export const _updateSupporterViewTable = async (
    param: CommonListRequestDTO,
) => {
    const response: CommonResponseDTO =
        await EmploymentServices.getSupporterListOfCandidates(param);
    return {
        param,
        response,
    };
};

export const _updateApproverViewTable = async (param: CommonListRequestDTO) => {
    const response: CommonResponseDTO =
        await EmploymentServices.getApproverListOfCandidates(param);
    return {
        param,
        response,
    };
};
