import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type {
    GCRAccumulationApplicationDetailDTO,
    GCRAccumulationDetailRequestDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    GcrAccumulationDetailSchema,
    GcrEndorsementSchema,
    type GcrAccumulationDetail,
    type GcrEndorsement,
} from '$lib/schemas/mypsm/leave/gcr.schema';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    let currentApplicationId: number = 0;

    if (params.id !== 'Baru') {
        currentApplicationId = parseInt(params.id);
    }

    let userMode = 'employee';

    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? '';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'employee';
            break;
        case UserRoleConstant.ketuaSeksyen.code:
            userMode = 'sectionLeader';
            break;
        case UserRoleConstant.pengarahBahagian.code:
            userMode = 'director';
            break;
        case UserRoleConstant.pengarahNegeri.code:
            userMode = 'director';
            break;
        case UserRoleConstant.urusSetiaCuti.code:
            userMode = 'secretary';
            break;
        case UserRoleConstant.pengarahKhidmatPengurusan.code:
            userMode = 'management';
            break;
        case UserRoleConstant.penyokong.code:
            userMode = 'supporter';
            break;
        case UserRoleConstant.pelulus.code:
            userMode = 'approver';
            break;

        default:
            userMode = 'employee';
            break;
    }

    // =============================================
    // FORM
    // =============================================
    const applicationDetailForm = await superValidate(
        zod(GcrAccumulationDetailSchema),
    );

    const sectionLeadFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    const directorFeedbackForm = await superValidate(zod(GcrEndorsementSchema));

    const secretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // =============================================
    // APPLICATION DETAIL
    // =============================================
    let currentApplicationDetail: GCRAccumulationApplicationDetailDTO = {
        personalDetail: null,
        accumulation: null,
        lead: null,
        director: null,
        secretary: null,
    };

    let currentApplicationDetailRequest: GCRAccumulationDetailRequestDTO = {
        id: null,
    };

    if (currentApplicationId !== 0) {
        currentApplicationDetailRequest.id = currentApplicationId;
    }

    let currentApplicationDetailResponse: CommonResponseDTO =
        await GCRServices.getAccumulationApplicationDetail(
            currentApplicationDetailRequest,
        );

    if (currentApplicationDetailResponse.status == 'success') {
        currentApplicationDetail =
            currentApplicationDetailResponse.data?.details;

        if (currentApplicationDetail.accumulation !== null) {
            applicationDetailForm.data.collectedGCR =
                currentApplicationDetail.accumulation.currentCollected;

            currentApplicationId =
                currentApplicationDetail.accumulation.id ?? 0;
            console.log(currentApplicationId);
        }

        if (currentApplicationDetail.lead !== null) {
            sectionLeadFeedbackForm.data = currentApplicationDetail.lead;
        } else {
            sectionLeadFeedbackForm.data.id = currentApplicationId;
        }

        if (currentApplicationDetail.director !== null) {
            directorFeedbackForm.data = currentApplicationDetail.director;
        } else {
            directorFeedbackForm.data.id = currentApplicationId;
        }

        if (currentApplicationDetail.secretary !== null) {
            secretaryFeedbackForm.data = currentApplicationDetail.secretary;
        } else {
            secretaryFeedbackForm.data.id = currentApplicationId;
        }
    }

    let endorsementDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    
    return {
        props: {
            currentApplicationId,
            userMode,
            currentRoleCode,
            currentApplicationDetail,
            endorsementDropdown,
        },
        forms: {
            applicationDetailForm,
            sectionLeadFeedbackForm,
            directorFeedbackForm,
            secretaryFeedbackForm,
        },
    };
}

// section lead
export async function _submitApplicationDetailForm(
    formData: GcrAccumulationDetail,
) {
    const form = await superValidate(
        formData,
        zod(GcrAccumulationDetailSchema),
    );

    if (form.valid) {
        const response = await GCRServices.addAccumulationDetail(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// section lead
export async function _submitSectionLeadFeedbackForm(formData: GcrEndorsement) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addAccumulationSectionLeadFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// director
export async function _submitDirectorFeedbackForm(formData: GcrEndorsement) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addAccumulationDirectorFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// secretary
export async function _submitSecretaryFeedbackForm(formData: GcrEndorsement) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addAccumulationSecretaryFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}
