import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { CourseExamDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam.dto.js';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _editExamInfoRequestSchema,
    _examInfoResponseSchema,
} from '$lib/schemas/mypsm/course/schema';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isCourseSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.examId),
    };

    let examDetailResponse: CommonResponseDTO = {};

    if (isCourseSecretaryRole) {
        examDetailResponse =
            await CourseServices.getCourseExamDetail(idRequestBody);
    }

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const examInfoForm = await superValidate(
        examDetailResponse.data?.details as CourseExamDetailResponseDTO,
        zod(_examInfoResponseSchema),
    );

    // ===========================================================================

    return {
        examDetailResponse,
        examInfoForm,
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _editExamForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_editExamInfoRequestSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const modifiedForm = {
        id: form.data.id,
        examTypeId: form.data.examTypeId,
        examTitle: form.data.examTitle,
        startDate: form.data.startDate.toISOString().split('T')[0],
        endDate: form.data.endDate.toISOString().split('T')[0],
        examDate: form.data.examDate.toISOString().split('T')[0],
        examLocation: form.data.examLocation,
    };

    const response: CommonResponseDTO =
        await CourseServices.editCourseExam(modifiedForm);

    return { response };
};
