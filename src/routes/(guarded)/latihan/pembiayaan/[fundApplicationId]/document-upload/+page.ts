import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _fundApplicationUploadDocSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const fundApplicationId = Number(params.fundApplicationId);

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

    const fundApplicationUploadDocumentForm = await superValidate(
        zod(_fundApplicationUploadDocSchema),
    );

    // ===========================================================================

    return {
        fundApplicationId,
        fundApplicationUploadDocumentForm,
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
    documentData.append('id', id.toString());

    const form = await superValidate(
        documentData,
        zod(_fundApplicationUploadDocSchema),
    );

    if (!form.valid || form.data.id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.uploadFundApplicationEmployeeDocument(
            documentData,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto('../pembiayaan');
        }, 2000);

    return { response };
};
