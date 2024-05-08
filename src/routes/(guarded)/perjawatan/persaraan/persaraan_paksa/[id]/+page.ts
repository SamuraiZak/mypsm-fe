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

export async function _certificationFormSubmit(
    formdata: ForcedRetirementEndorsement,
) {
    const form = await superValidate(
        formdata,
        zod(ForcedRetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await ForcedRetirementServices.addCertification(formdata);

        return { response };
    }
}

export async function _confirmationFormSubmit(
    formdata: ForcedRetirementEndorsement,
) {
    const form = await superValidate(
        formdata,
        zod(ForcedRetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await ForcedRetirementServices.addConfirmation(formdata);

        return { response };
    }
}

export async function _approvalFormSubmit(
    formdata: ForcedRetirementEndorsement,
) {
    const form = await superValidate(
        formdata,
        zod(ForcedRetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await ForcedRetirementServices.addApproval(formdata);

        return { response };
    }
}

export const _uploadForms = async (formData: string) => {
    const response: CommonResponseDTO =
        await ForcedRetirementServices.uploadForms(
            formData,
        );

    return { response };
};

export function _convertToBase64(file: File): Promise<DocumentDTO> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64String = event.target?.result as string;
            const fileName = file.name;
            const fileObject: DocumentDTO = {
                name: fileName,
                base64: base64String,
            };

            resolve(fileObject);
        };

        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

export function _prepDocumentUpload(
    fileList: FileList,
): Promise<DocumentDTO[]> {
    return new Promise((resolve, reject) => {
        const fileArray: File[] = Array.from(fileList);

        const filesPromiseArray: Promise<DocumentDTO>[] = [];

        fileArray.forEach((file) => {
            const filePromise = _convertToBase64(file);

            filesPromiseArray.push(filePromise);
        });

        Promise.all(filesPromiseArray)
            .then((files) => {
                resolve(files);
            })
            .catch((error) => {
                reject(error);
            });
    });
}