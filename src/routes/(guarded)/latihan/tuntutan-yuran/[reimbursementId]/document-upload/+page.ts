import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    getErrorToast,
    getInsufficientFileToast,
} from '$lib/helpers/core/toast.helper';
import { _fundReimbursementUploadDocSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const fundReimbursementId = Number(params.reimbursementId);

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

    const fundReimbursementUploadDocumentForm = await superValidate(
        zod(_fundReimbursementUploadDocSchema),
    );

    // ===========================================================================

    return {
        fundReimbursementId,
        fundReimbursementUploadDocumentForm,
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
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
