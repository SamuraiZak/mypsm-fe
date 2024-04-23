import { GCRWithdrawalTypeConstant } from '$lib/constants/core/early-gcr.constant';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    GCRAccumulationDetailRequestDTO,
    GCRWithdrawalApplicationDetailDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    GcrEndorsementSchema,
    GcrWithdrawalCalculationSchema,
    GcrWithdrawalDetailAddSchema,
    type GcrEndorsement,
    type GcrWithdrawalCalculation,
    type GcrWithdrawalDetailAdd,
} from '$lib/schemas/mypsm/leave/gcr.schema';
import { GCRServices } from '$lib/services/implementation/mypsm/leave/gcr.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    let currentApplicationId: number = 0;

    if (params.id !== 'baru') {
        currentApplicationId = parseInt(params.id);
    }

    let currentType: DropdownDTO =
        GCRWithdrawalTypeConstant.list.find(
            (item) => item.url == params.type,
        ) ?? GCRWithdrawalTypeConstant.death;

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
        case UserRoleConstant.ketuaPengarah.code:
            userMode = 'chiefDirector';
            break;
        case UserRoleConstant.urusSetiaCuti.code:
            userMode = 'secretary';
            break;
        case UserRoleConstant.urusSetiaIntegriti.code:
            userMode = 'integritySecretary';
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
    // application details
    const applicationDetailForm = await superValidate(
        zod(GcrWithdrawalDetailAddSchema),
    );

    // chiefDirector feedback
    const calculationForm = await superValidate(
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

        if (currentApplicationDetail.employeeDetail !== null) {
            applicationDetailForm.data.employeeId =
                currentApplicationDetail.employeeDetail.employeeId;

            applicationDetailForm.data.withdrawalType = currentType.value;
        }

        if (currentApplicationDetail.calculation !== null) {
            calculationForm.data = currentApplicationDetail.calculation;
        } else {
            // calculationForm.data.id = currentApplicationId;
        }
    }

    let eligibilityDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Layak',
        },
        {
            value: false,
            name: 'Tidak Layak',
        },
    ];

    let booleanOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

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
            // currentApplicationId,
            currentApplicationDetail,
            userMode,
            currentRoleCode,
            eligibilityDropdown,
            booleanOption,
            endorsementDropdown,
        },
        forms: {
            applicationDetailForm,
            calculationForm,
        },
    };
}

// section application detail
export async function _submitApplicationDetailForm(
    formData: GcrWithdrawalDetailAdd,
) {
    const form = await superValidate(
        formData,
        zod(GcrWithdrawalDetailAddSchema),
    );

    if (form.valid) {
        const response = await GCRServices.addWithdrawalDetail(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// chief director
export async function _submitCalculationForm(
    formData: GcrWithdrawalCalculation,
) {
    const form = await superValidate(
        formData,
        zod(GcrWithdrawalCalculationSchema),
    );

    if (form.valid) {
        const response = await GCRServices.addWithdrawalCalculation(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}
