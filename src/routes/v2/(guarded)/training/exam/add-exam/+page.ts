import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseCreateExamRequestDTO } from '$lib/dto/mypsm/course/exam/course-exam.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _examInfoRequestSchema } from '$lib/schemas/mypsm/course/exam-schema';
import { CourseServices } from '$lib/services/implementation/mypsm/latihan/course.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load() {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isCourseSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    if (!isCourseSecretaryRole) {
        error(401, { message: 'Akses ditolak' });
    }

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const examInfoForm = await superValidate(zod(_examInfoRequestSchema), {
        errors: false,
    });

    // ===========================================================================

    return {
        examInfoForm,
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

    const response: CommonResponseDTO =
        await CourseServices.createCourseExam(form.data as CourseCreateExamRequestDTO);

    if (response.status === 'success')
        setTimeout(() => {
            goto('../exam');
        }, 2000);

    return { response };
};
