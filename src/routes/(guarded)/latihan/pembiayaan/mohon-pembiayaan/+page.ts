import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _createFundApplicationRequestSchema,
    _fundApplicationDetailResponseSchema,
} from '$lib/schemas/mypsm/course/fund-application-schema';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';
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

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    if (!isStaffRole) {
        error(401, { message: 'Akses ditolak' });
    }

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const fundApplicationInfoForm = await superValidate(
        zod(_fundApplicationDetailResponseSchema),
    );

    // ===========================================================================

    return {
        fundApplicationInfoForm,
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _createFundApplicationForm = async (formData: FormData) => {
    const form = await superValidate(
        formData,
        zod(_createFundApplicationRequestSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const modifiedForm = {
        academicLevel: form.data.academicLevel,
        courseName: form.data.courseName,
        institution: form.data.institution,
        learningInstitution: form.data.learningInstitution,
        studyDuration: form.data.studyDuration,
        expectedFinishedStudy: form.data.expectedFinishedStudyDate
            .toISOString()
            .split('T')[0],
        entryDateToInstituition: form.data.entryDateToInstituition
            .toISOString()
            .split('T')[0],
        educationType: form.data.educationType,
        applicationType: form.data.applicationType,
    };

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.createCourseFundApplication(
            modifiedForm,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../pembiayaan');
        }, 2000);

    return { response };
};
