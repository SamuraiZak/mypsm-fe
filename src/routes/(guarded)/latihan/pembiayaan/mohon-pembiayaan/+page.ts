import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseFundApplicationUploadDocumentsRequestDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-document.dto';
import type { CourseAddFundApplicationRequestDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _createFundApplicationRequestSchema,
    _fundApplicationDetailResponseSchema,
    _fundApplicationUploadDocSchema,
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

    const fundApplicationUploadDocumentForm = await superValidate(
        zod(_fundApplicationUploadDocSchema),
    );

    // ===========================================================================

    return {
        fundApplicationInfoForm,
        fundApplicationUploadDocumentForm,
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

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.createCourseFundApplication(
            form.data as CourseAddFundApplicationRequestDTO,
        );

    return { response };
};

export const _submitDocumentForm = async (id: number, files: File[]) => {
    const documentData = new FormData();

    files.forEach((file) => {
        documentData.append('documents', file);
    });

    const form = await superValidate(
        documentData,
        zod(_fundApplicationUploadDocSchema),
    );

    form.data.id = 1;
    console.log(form);

    if (!form.valid || form.data.id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }
    const response: CommonResponseDTO =
        await CourseFundApplicationServices.uploadFundApplicationEmployeeDocument(
            form.data as CourseFundApplicationUploadDocumentsRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../pembiayaan');
        }, 2000);

    return { response };
};
