import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { TransferTypeConstant } from '$lib/constants/core/transfer.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    USPRetirementChosenDetailRequestDTO,
    USPRetirementChosenListDetailItemDTO,
} from '$lib/dto/mypsm/employment/retirement/retirement-other.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper.js';
import {
    UspRetirementDetailSchema,
    UspRetirementDocumentApprovalSchema,
    type UspRetirementDetail,
    type UspRetirementDocumentApproval,
} from '$lib/schemas/mypsm/employment/retirement/retirement-other.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { RetirementOtherServices } from '$lib/services/implementation/mypsm/employment/retirement/retirement-other.service.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // set current application id
    const currentApplicationId: number = parseInt(params.id);

    // set current employee id
    const currentEmployeeId: number = parseInt(params.employeeId);

    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        UserRoleConstant.kakitangan.code;

    // set default mode
    let userMode: string = 'employee';

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
        case UserRoleConstant.urusSetiaPersaraan.code:
            userMode = 'secretary';
            break;
        case UserRoleConstant.pelulus.code:
            userMode = 'approver';
            break;
        case UserRoleConstant.penyokong.code:
            userMode = 'supporter';
            break;
        default:
            userMode = 'employee';
            break;
    }

    // ======================================================
    // CREATE FORM
    // ======================================================
    // detail form
    const retirementDetailForm = await superValidate(
        zod(UspRetirementDetailSchema),
    );

    // document approval form
    const documentApprovalForm = await superValidate(
        zod(UspRetirementDocumentApprovalSchema),
    );

    // ======================================================
    // FETCH DATA
    // ======================================================

    // get current employee application detail
    let chosenDetail: USPRetirementChosenListDetailItemDTO = {
        employeeDetail: null,
        retirementDetail: null,
        documentApproval: null,
        letter: null,
    };

    const chosenDetailRequest: USPRetirementChosenDetailRequestDTO = {
        groupId: currentApplicationId,
        employeeId: currentEmployeeId,
    };

    const chosenDetailResponse: CommonResponseDTO =
        await RetirementOtherServices.getChosenDetail(chosenDetailRequest);

    if (chosenDetailResponse.status == 'success') {
        chosenDetail = chosenDetailResponse.data
            ?.details as USPRetirementChosenListDetailItemDTO;

        if (chosenDetail.retirementDetail != null) {
            retirementDetailForm.data = chosenDetail.retirementDetail;
        } else {
            retirementDetailForm.data.groupId = currentApplicationId;
            retirementDetailForm.data.employeeId = currentEmployeeId;

            if (chosenDetail.employeeDetail !== null) {
                retirementDetailForm.data.retirementDate =
                    chosenDetail.employeeDetail?.retirementDate;
            }
        }

        if (chosenDetail.documentApproval != null) {
            documentApprovalForm.data = chosenDetail.documentApproval;
        } else {
            documentApprovalForm.data.groupId = currentApplicationId;
            documentApprovalForm.data.employeeId = currentEmployeeId;
        }
    }

    // get list of retirementType
    let retirementTypeList: LookupDTO[] = [];

    const retirementTypeListResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    if (retirementTypeListResponse.status == 'success') {
        retirementTypeList = retirementTypeListResponse.data
            ?.dataList as LookupDTO[];
    }

    retirementTypeList = retirementTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const retirementTypeListDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProperId(retirementTypeList);

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
            currentEmployeeId,
            chosenDetail,
            userMode,
            retirementTypeListDropdown,
            endorsementDropdown,
        },
        forms: {
            retirementDetailForm,
            documentApprovalForm,
        },
    };
}

export async function _retirementDetailSubmit(formData: UspRetirementDetail) {
    const form = await superValidate(formData, zod(UspRetirementDetailSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await RetirementOtherServices.updateRetirementDetails(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _documentApprovalSubmit(
    formData: UspRetirementDocumentApproval,
) {
    const form = await superValidate(
        formData,
        zod(UspRetirementDocumentApprovalSchema),
    );

    if (form.valid) {
        const response: CommonResponseDTO =
            await RetirementOtherServices.addverifications(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}
