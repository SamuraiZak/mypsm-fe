import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { renameExamTypeKeyValue } from '$lib/helpers/mypsm/course/exam-type.helper';
import { _examInfoRequestSchema } from '$lib/schemas/mypsm/course/schema';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load() {
    let examListResponse: CommonResponseDTO = {};

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    if (!isStaffRole) {
        error(401, { message: 'Akses ditolak' });
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'examTitle',
        orderType: 0,
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
    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const examInfoForm = await superValidate(zod(_examInfoRequestSchema));

    // ===========================================================================

    return {
        examInfoForm,
        responses: {
            examListResponse,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _createExamForm = async (formData: FormData) => {
    const form = await superValidate(formData, zod(_examInfoRequestSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const modifiedForm = {
        examTypeId: form.data.examTypeId,
        examTitle: form.data.examTitle,
        startDate: form.data.startDate.toISOString().split('T')[0],
        endDate: form.data.endDate.toISOString().split('T')[0],
        examDate: form.data.examDate.toISOString().split('T')[0],
        examLocation: form.data.examLocation,
    };

    const response: CommonResponseDTO =
        await CourseServices.createCourseExam(modifiedForm);

    if (response.status === 'success')
        setTimeout(() => {
            goto('../kemaskini-peperiksaan');
        }, 2000);

    return { response };
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
