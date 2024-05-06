import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DocumentDTO } from '$lib/dto/core/document/document.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto.js';
import type {
    ForcedRetirementApplicationDetailDTO,
    ForcedRetirementDetailRequestDTO,
} from '$lib/dto/mypsm/employment/retirement-new/force-retirement.dto';
import {
    ForcedRetirementEndorsementSchema,
    type ForcedRetirementEndorsement,
} from '$lib/schemas/mypsm/employment/retirement/forced-retirement.schema.js';
import { ForcedRetirementServices } from '$lib/services/implementation/mypsm/employment/retirement/forced-retirement.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // set default application id
    let currentApplicationId: number = parseInt(params.id);

    // set default current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    // set current role
    let currentRole: UserRoleDTO =
        UserRoleConstant.list.find((item) => item.code == currentRoleCode) ??
        UserRoleConstant.kakitangan;

    // ==================================================
    // create forms
    // ==================================================
    // certification form
    const certificationForm = await superValidate(
        zod(ForcedRetirementEndorsementSchema),
    );

    // confirmation form
    const confirmationForm = await superValidate(
        zod(ForcedRetirementEndorsementSchema),
    );

    // approval form
    const approvalForm = await superValidate(
        zod(ForcedRetirementEndorsementSchema),
    );

    // ==================================================
    // get current application detail
    // ==================================================
    let currentApplicationDetail: ForcedRetirementApplicationDetailDTO = {
        certification: null,
        confirmation: null,
        forms: null,
        approval: null,
        letter: null,
    };

    let currentApplicationDetailRequest: ForcedRetirementDetailRequestDTO = {
        retirementId: currentApplicationId,
    };

    const currentApplicationDetailResponse: CommonResponseDTO =
        await ForcedRetirementServices.getApplicationDetail(
            currentApplicationDetailRequest,
        );

    if (currentApplicationDetailResponse.status == 'success') {
        currentApplicationDetail = currentApplicationDetailResponse.data
            ?.details as ForcedRetirementApplicationDetailDTO;

        if (currentApplicationDetail.certification !== null) {
            certificationForm.data =
                currentApplicationDetail.certification as ForcedRetirementEndorsement;
        } else {
            certificationForm.data.retirementId = currentApplicationId;
        }

        if (currentApplicationDetail.confirmation !== null) {
            confirmationForm.data =
                currentApplicationDetail.confirmation as ForcedRetirementEndorsement;
        } else {
            confirmationForm.data.retirementId = currentApplicationId;
        }

        if (currentApplicationDetail.approval !== null) {
            approvalForm.data =
                currentApplicationDetail.approval as ForcedRetirementEndorsement;
        } else {
            approvalForm.data.retirementId = currentApplicationId;
        }
    }

    // ==================================================
    // get form download list
    // ==================================================
    let formList: DocumentDTO[] = [];

    const formListResponse: CommonResponseDTO =
        await ForcedRetirementServices.getFormList();

    if (formListResponse.status == 'success') {
        formList = formListResponse.data?.dataList as DocumentDTO[];
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
            currentApplicationDetail,
            currentRole,
            currentRoleCode,
            formList,
            endorsementDropdown,
        },
        forms: {
            certificationForm,
            confirmationForm,
            approvalForm,
        },
    };
}
