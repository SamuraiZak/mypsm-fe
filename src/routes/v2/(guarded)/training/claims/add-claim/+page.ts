import { goto } from '$app/navigation';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CourseAddFundReimbursementRequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
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
export async function load({ parent }) {
    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

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
export const _createFundReimbursementForm = async (formData: object) => {
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
            goto(`../claims/${response.data?.details.id}`);
        }, 1000);

    return { response };
};

// export const _submitDocumentForm = async (id: number, files: File[]) => {
//     const documentData = new FormData();

//     // check file size validation
//     files.forEach((file) => {
//         documentData.append('documents', file, file.name);
//     });

//     const form = await superValidate(
//         documentData,
//         zod(_fundReimbursementUploadDocSchema),
//     );

//     if (!form.valid || id === undefined) {
//         getErrorToast();
//         error(400, { message: 'Validation Not Passed!' });
//     }

//     // turns file into base 64 format
//     const requestBody: CourseFundApplicationUploadDocumentsBase64RequestDTO = {
//         documents: [],
//         id: id,
//     };

//     for (let i = 0; i < files.length; i++) {
//         const base64String = await _fileToBase64String(files[i]);
//         const documentObject: DocumentBase64RequestDTO = {
//             base64: base64String,
//             name: files[i].name,
//         };
//         requestBody.documents?.push(documentObject);
//     }

//     const response: CommonResponseDTO =
//         await CourseFundReimbursementServices.uploadFundReimbursementEmployeeDocument(
//             requestBody,
//         );

//     if (response.status === 'success')
//         setTimeout(() => {
//             goto(`../claims/${id}`);
//         }, 1000);

//     return { response };
// };
