import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseFundReimbursementUploadDocumentsBase64RequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import { _fileToBase64String } from '$lib/helpers/core/fileToBase64String.helper';
import {
    getErrorToast,
} from '$lib/helpers/core/toast.helper';
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
        { errors: false },
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

    // check file size validation
    files.forEach((file) => {
        documentData.append('documents', file, file.name);
    });

    const form = await superValidate(
        documentData,
        zod(_fundApplicationUploadDocSchema),
    );

    if (!form.valid || id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    // turns file into base 64 format
    const requestBody: CourseFundReimbursementUploadDocumentsBase64RequestDTO =
        {
            documents: [],
            id: id,
        };

    for (let i = 0; i < files.length; i++) {
        const base64String = await _fileToBase64String(files[i]);
        const documentObject: DocumentBase64RequestDTO = {
            base64: base64String,
            name: files[i].name,
        };
        requestBody.documents?.push(documentObject);
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.uploadFundApplicationEmployeeDocument(
            requestBody,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../${id}`);
        }, 1000);

    return { response };
};
