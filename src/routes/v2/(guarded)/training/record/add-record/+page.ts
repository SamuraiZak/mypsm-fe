import { goto } from '$app/navigation';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseAddExamApplicationRequestDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { renameExamTypeKeyValue } from '$lib/helpers/mypsm/course/exam-type.helper';
import {
    _addExamApplicationRequestSchema,
    _examInfoRequestSchema,
} from '$lib/schemas/mypsm/course/exam-schema';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ parent }) {
    let examListResponse: CommonResponseDTO = {};

    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    if (!isStaffRole) {
        error(401, { message: 'Akses ditolak' });
    }

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            examTypeId: null, // 0 or Null: All | 1: Perkhidmatan | 2: PSL
            identityDocumentNumber: null, //string | null | undefined;
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
    const examInfoForm = await superValidate(zod(_examInfoRequestSchema), {
        errors: false,
    });

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
export const _createExamForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_addExamApplicationRequestSchema),
    );

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseServices.addCourseExamApplication(
            form.data as CourseAddExamApplicationRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../record');
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
