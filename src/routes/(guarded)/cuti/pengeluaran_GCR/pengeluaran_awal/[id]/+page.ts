import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    GCRAccumulationDetailRequestDTO,
    GCRWithdrawalApplicationDetailDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import {
    GcrEndorsementSchema,
    GcrWithdrawalCalculationSchema,
    GcrWithdrawalDetailAddSchema,
} from '$lib/schemas/mypsm/leave/gcr.schema';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // set default application id
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
        case UserRoleConstant.pengarahBahagian.code:
            userMode = 'director';
            break;
        case UserRoleConstant.pengarahNegeri.code:
            userMode = 'director';
            break;
        case UserRoleConstant.ketuaPengarah.code:
            userMode = 'chiefDirector';
            break;
        case UserRoleConstant.urusSetiaCuti.code:
            userMode = 'secretary';
            break;
        case UserRoleConstant.penyokong.code:
            userMode = 'supporter';
            break;
        case UserRoleConstant.urusSetiaIntegriti.code:
            userMode = 'integritySecretary';
            break;

        default:
            userMode = 'employee';
            break;
    }

    // =============================================
    // FORM
    // =============================================
    // applicationDetail
    let applicationDetailForm = await superValidate(
        zod(GcrWithdrawalDetailAddSchema),
    );

    // directorFeedback
    let directorFeedbackForm = await superValidate(zod(GcrEndorsementSchema));

    // secretaryFeedback
    let secretaryFeedbackForm = await superValidate(zod(GcrEndorsementSchema));

    // integritySecretaryFeedback
    let integritySecretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // chiefDirectorFeedback
    let chiefDirectorFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // chiefDirectorFeedback
    let calculationForm = await superValidate(
        zod(GcrWithdrawalCalculationSchema),
    );

    // =============================================
    // APPLICATION DETAIL
    // =============================================
    let currentApplicationDetail: GCRWithdrawalApplicationDetailDTO = {
        employeeDetail: null,
        gcrDetail: null,
        document: null,
        director: null,
        secretary: null,
        integrity: null,
        chiefDirector: null,
        calculation: null,
    };

    let currentApplicationDetailRequest: GCRAccumulationDetailRequestDTO = {
        id: null,
    };

    if (currentApplicationId !== 0) {
        currentApplicationDetailRequest.id = currentApplicationId;
    }

    let currentApplicationDetailResponse: CommonResponseDTO =
        await GCRServices.getWithdrawalApplicationDetail(
            currentApplicationDetailRequest,
        );

    if (currentApplicationDetailResponse.status == 'success') {
        currentApplicationDetail = currentApplicationDetailResponse.data
            ?.details as GCRWithdrawalApplicationDetailDTO;

        if (currentApplicationDetail.gcrDetail != null) {
            
            
        }
    }

    // =============================================
    // ENUMS
    // =============================================
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
            directorFeedbackForm,
            secretaryFeedbackForm,
            integritySecretaryFeedbackForm,
            chiefDirectorFeedbackForm,
            calculationForm,
        },
    };
}
