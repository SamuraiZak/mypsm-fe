import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
// import { redirect } from '@sveltejs/kit';

// guard code WIP

export const load = async () => {
    let candidateViewResponse: CommonResponseDTO;
    let candidateViewTable = undefined;

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isCandidateRole = currentRoleCode === RoleConstant.calon.code;

    // const authorised =
    //     currentRoleCode === RoleConstant.urusSetiaPerjawatan.code ||
    //     currentRoleCode === RoleConstant.calon.code;

    // if (!authorised) throw redirect(303, `/login?redirectTo=${url.pathname}`);

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 0, // 0: New | 1: Other | null
            identityCard: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    const submittedTableParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 1, // 0: New | 1: Other | null
            identityCard: null, //string | null | undefined;
            temporaryId: null, //string | null | undefined;
            status: null, // status code from lookup | null | undefined;
        },
    };

    const newCandidateResponse: CommonResponseDTO =
        await EmploymentServices.getNewHireList(param);

    const newCandidateList = newCandidateResponse.data?.dataList;

    const submittedFormResponse: CommonResponseDTO =
        await EmploymentServices.getNewHireList(submittedTableParam);

    const submittedFormList = submittedFormResponse.data?.dataList;

    if (isCandidateRole) {
        candidateViewResponse = await EmploymentServices.getCandidateListView();
        candidateViewTable = candidateViewResponse.data?.dataList;
    }

    return {
        param,
        submittedFormList,
        newCandidateList,
        isCandidateRole,
        candidateViewTable,
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
