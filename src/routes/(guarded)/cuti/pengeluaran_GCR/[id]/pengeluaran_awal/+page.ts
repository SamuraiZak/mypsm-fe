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

    // director feedback
    const directorFeedbackForm = await superValidate(zod(GcrEndorsementSchema));

    // secretary feedback
    const secretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // integritySecretary feedback
    const integritySecretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // chiefDirector feedback
    const chiefDirectorFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
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

            applicationDetailForm.data = {
                employeeId: currentApplicationDetail.employeeDetail.employeeId,
                withdrawalType: 3,
            };

            // applicationDetailForm.data.employeeId = currentApplicationId;
            // applicationDetailForm.data.withdrawalType =
            //     GCRWithdrawalTypeConstant.early.value;
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

        if (currentApplicationDetail.integrity !== null) {
            integritySecretaryFeedbackForm.data =
                currentApplicationDetail.integrity;
        } else {
            integritySecretaryFeedbackForm.data.id = currentApplicationId;
        }

        if (currentApplicationDetail.chiefDirector !== null) {
            chiefDirectorFeedbackForm.data =
                currentApplicationDetail.chiefDirector;
        } else {
            chiefDirectorFeedbackForm.data.id = currentApplicationId;
        }

        if (currentApplicationDetail.calculation !== null) {
            calculationForm.data = currentApplicationDetail.calculation;
        } else {
            calculationForm.data.id = currentApplicationId;
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
            currentApplicationId,
            currentApplicationDetail,
            userMode,
            currentRoleCode,
            eligibilityDropdown,
            booleanOption,
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

// director
export async function _submitDirectorFeedbackForm(formData: GcrEndorsement) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addWithdrawalDirectorFeedback(formData);

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
            await GCRServices.addWithdrawalSecretaryFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// integrity secretary
export async function _submitIntegritySecretaryFeedbackForm(
    formData: GcrEndorsement,
) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addWithdrawalIntegrityFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// chief director
export async function _submitChiefDirectorFeedbackForm(
    formData: GcrEndorsement,
) {
    const form = await superValidate(formData, zod(GcrEndorsementSchema));

    if (form.valid) {
        const response =
            await GCRServices.addWithdrawalChiefDirectorFeedback(formData);

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

export const _submitDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await GCRServices.uploadWithdrawalDocument(formData);

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
