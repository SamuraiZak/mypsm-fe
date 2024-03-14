import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseFundReimbursementUploadDocumentsRequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
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

    files.forEach((file) => {
        documentData.append('documents', file);
    });

    const form = await superValidate(
        documentData,
        zod(_fundReimbursementUploadDocSchema),
    );

    form.data.id = 1;
    console.log(form);

    if (!form.valid || form.data.id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }
    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.uploadFundReimbursementEmployeeDocument(
            form.data as CourseFundReimbursementUploadDocumentsRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../pembiayaan');
        }, 2000);

    return { response };
};
