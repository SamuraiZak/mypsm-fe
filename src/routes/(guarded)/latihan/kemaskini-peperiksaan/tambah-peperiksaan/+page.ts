import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _examInfoRequestSchema } from '$lib/schemas/mypsm/course/schema';
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

    const isStaffRole = currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    if (!isStaffRole) {
        error(401, { message: 'Akses ditolak!' });
    }

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const examInfoForm = await superValidate(zod(_examInfoRequestSchema));

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
