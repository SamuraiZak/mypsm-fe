import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseAddFundReimbursementRequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import {
    getErrorToast,
    getInsufficientFileToast,
} from '$lib/helpers/core/toast.helper';
import {
    _createFundReimbursementRequestSchema,
    _fundReimbursementDetailResponseSchema,
    _fundReimbursementUploadDocSchema,
} from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';
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
    const reimbursementInfoForm = await superValidate(
        zod(_fundReimbursementDetailResponseSchema),
        { errors: false },
    );

    const fundReimbursementUploadDocumentForm = await superValidate(
        zod(_fundReimbursementUploadDocSchema),
        { errors: false },
    );

    return {
        reimbursementInfoForm,
        fundReimbursementUploadDocumentForm,
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _createFundReimbursementForm = async (formData: FormData) => {
    const form = await superValidate(
        formData,
        zod(_createFundReimbursementRequestSchema),
    );

    console.log(form);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.createCourseFundReimbursement(
            form.data as CourseAddFundReimbursementRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../tuntutan-yuran');
        }, 2000);

    return { response };
};

export const _submitDocumentForm = async (id: number, files: File[]) => {
    const documentData = new FormData();

    if (files.length < 2) {
        getInsufficientFileToast();
        error(400, { message: 'Validation Not Passed!' });
    }
    files.forEach((file) => {
        documentData.append('documents', file, file.name);
    });
    documentData.append('id', id.toString());

    const form = await superValidate(
        documentData,
        zod(_fundReimbursementUploadDocSchema),
    );

    if (!form.valid || form.data.id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }
    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.uploadFundReimbursementEmployeeDocument(
            documentData,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../${id}`);
        }, 1000);

    return { response };
};