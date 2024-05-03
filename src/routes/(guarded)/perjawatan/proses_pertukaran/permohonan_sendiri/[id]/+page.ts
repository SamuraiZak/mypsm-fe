import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import {
    TransferReasonConstant,
    TransferStatusConstant,
} from '$lib/constants/core/transfer.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    TransferApplicationDetailRequestDTO,
    TransferCommonApplicationDetailDTO,
    TransferDocumentDTO,
    TransferSelfApplicationDetailDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    TransferCommonEndorsementSchema,
    TransferCommonEndorserDetailSchema,
    TransferCommonMeetingSchema,
    TransferCommonPostponeApplicationSchema,
    TransferCommonPostponeResultSchema,
    TransferSelfDetailSchema,
    TransferSelfEndorsementSchema,
    TransferSelfReasonSchema,
    type TransferCommonEndorsement,
    type TransferCommonEndorserDetail,
    type TransferCommonMeeting,
    type TransferCommonPostponeApplication,
    type TransferCommonPostponeResult,
    type TransferSelfDetail,
    type TransferSelfEndorsement,
    type TransferSelfReason,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { TransferApplicationServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // set default application id
    let currentApplicationId: number = 0;

    if (params.id !== 'Baru') {
        currentApplicationId = parseInt(params.id);
    }

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
        case UserRoleConstant.urusSetiaPerjawatan.code:
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

    // =====================================================
    // FORMS
    // =====================================================
    // create forms
    // application details form
    const applicationDetailForm = await superValidate(
        zod(TransferSelfDetailSchema),
    );

    // reason form
    const employeeReasonForm = await superValidate(
        zod(TransferSelfReasonSchema),
    );

    // employee confirmation form
    const employeeConfirmationForm = await superValidate(
        zod(TransferSelfEndorsementSchema),
    );

    // first director feedback form
    const firstDirectorFeedbackForm = await superValidate(
        zod(TransferCommonEndorsementSchema),
    );

    // second director feedback form
    const secondDirectorFeedbackForm = await superValidate(
        zod(TransferCommonEndorsementSchema),
    );

    // meeting form
    const meetingResultForm = await superValidate(
        zod(TransferCommonMeetingSchema),
    );

    // postpone form
    const postponeApplicationForm = await superValidate(
        zod(TransferCommonPostponeApplicationSchema),
    );

    // postpone result
    const postponeResultForm = await superValidate(
        zod(TransferCommonPostponeResultSchema),
    );

    // postpone approval form
    const postponeApprovalForm = await superValidate(
        zod(TransferCommonEndorsementSchema),
    );

    // endorser detail form
    const endorserDetailForm = await superValidate(
        zod(TransferCommonEndorserDetailSchema),
    );

    // supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(TransferCommonEndorsementSchema),
    );
    // meeting form
    const approverFeedbackForm = await superValidate(
        zod(TransferCommonEndorsementSchema),
    );

    // =====================================================
    // GET APPLICATION DETAILS
    // =====================================================
    let currentApplicationDetail: TransferSelfApplicationDetailDTO = {
        status: null,
        applicationDetail: null,
        reason: null,
        confirmation: null,
        transferDocument: null,
        firstDirector: null,
        secondDirector: null,
        meetingDetail: null,
        postponeDetail: null,
        postponeDocument: null,
        postponeResult: null,
        postponeApproval: null,
        endorserDetail: null,
        supporterFeedback: null,
        approverFeedback: null,
    };

    if (currentApplicationId !== 0) {
        const currentApplicationDetailRequest: TransferApplicationDetailRequestDTO =
            {
                id: currentApplicationId,
            };

        const currentApplicationDetailResponse: CommonResponseDTO =
            await TransferApplicationServices.getSelfTransferApplicationDetail(
                currentApplicationDetailRequest,
            );

        if (currentApplicationDetailResponse.status == 'success') {
            // assign the current application detail to the vairable
            currentApplicationDetail = currentApplicationDetailResponse.data
                ?.details as TransferSelfApplicationDetailDTO;

            // application detail
            if (currentApplicationDetail.applicationDetail !== null) {
                applicationDetailForm.data =
                    currentApplicationDetail.applicationDetail;

                currentApplicationId =
                    currentApplicationDetail.applicationDetail?.id;
            }

            // reason
            if (currentApplicationDetail.reason !== null) {
                employeeReasonForm.data = currentApplicationDetail.reason;
            } else {
                employeeReasonForm.data.id = currentApplicationId;
            }

            // employee confirmation
            if (currentApplicationDetail.confirmation !== null) {
                employeeConfirmationForm.data =
                    currentApplicationDetail.confirmation;
            } else {
                employeeConfirmationForm.data.id = currentApplicationId;
            }
            // first director feedback
            if (currentApplicationDetail.firstDirector !== null) {
                firstDirectorFeedbackForm.data =
                    currentApplicationDetail.firstDirector;
            } else {
                firstDirectorFeedbackForm.data.id = currentApplicationId;
            }

            // second director feedback
            if (currentApplicationDetail.secondDirector !== null) {
                secondDirectorFeedbackForm.data =
                    currentApplicationDetail.secondDirector;
            } else {
                secondDirectorFeedbackForm.data.id = currentApplicationId;
            }

            // meeting result
            if (currentApplicationDetail.meetingDetail !== null) {
                meetingResultForm.data = currentApplicationDetail.meetingDetail;
            } else {
                meetingResultForm.data.id = currentApplicationId;
            }

            // postpone application form
            if (currentApplicationDetail.postponeDetail !== null) {
                postponeApplicationForm.data =
                    currentApplicationDetail.postponeDetail;
            } else {
                postponeApplicationForm.data.id = currentApplicationId;
            }

            // postpone result form
            if (currentApplicationDetail.postponeResult !== null) {
                postponeResultForm.data =
                    currentApplicationDetail.postponeResult;
            } else {
                postponeResultForm.data.id = currentApplicationId;
            }

            // postpone approval form
            if (currentApplicationDetail.postponeApproval !== null) {
                postponeApprovalForm.data =
                    currentApplicationDetail.postponeApproval;
            } else {
                postponeApprovalForm.data.id = currentApplicationId;
            }

            // endorser detail
            if (currentApplicationDetail.endorserDetail !== null) {
                endorserDetailForm.data =
                    currentApplicationDetail.endorserDetail;
            } else {
                endorserDetailForm.data.id = currentApplicationId;
            }

            // endorser detail
            if (currentApplicationDetail.supporterFeedback !== null) {
                supporterFeedbackForm.data =
                    currentApplicationDetail.supporterFeedback;
            } else {
                supporterFeedbackForm.data.id = currentApplicationId;
            }

            // endorser detail
            if (currentApplicationDetail.approverFeedback !== null) {
                approverFeedbackForm.data =
                    currentApplicationDetail.approverFeedback;
            } else {
                approverFeedbackForm.data.id = currentApplicationId;
            }
        }
    }

    // =====================================================
    // GET APPLICATION DETAILS
    // =====================================================
    // get list of placement
    let placementList: LookupDTO[] = [];

    const unrecordedLeaveTypeResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    if (unrecordedLeaveTypeResponse.status == 'success') {
        placementList = unrecordedLeaveTypeResponse.data
            ?.dataList as LookupDTO[];
    }

    placementList = placementList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const placementListDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProperId(placementList);

    // get list of programme
    let programmeList: LookupDTO[] = [];

    const programmeListResponse: CommonResponseDTO =
        await LookupServices.getProgrammeEnums();

    if (programmeListResponse.status == 'success') {
        programmeList = programmeListResponse.data?.dataList as LookupDTO[];
    }

    programmeList = programmeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const programmeListDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProperId(programmeList);

    // endorser list
    const endorserRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'TETAP',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    };
    const endorserResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(endorserRequest);

    const endorserDropdown: DropdownDTO[] =
        LookupServices.setSelectOptionSupporterAndApproverKP(endorserResponse);

    // reason list
    let reasonList: LookupDTO[] = TransferReasonConstant.list;

    let reasonDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProperId(reasonList);

    // employee list
    const employeeRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'TETAP',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    };
    const employeeResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(employeeRequest);

    const employeeDropdown: DropdownDTO[] =
        LookupServices.setSelectOptionSupporterAndApproverKP(employeeResponse);

    let meetingResultOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Lulus',
        },
        {
            value: false,
            name: 'Tidak Lulus',
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

    let transferTypeDropdown: DropdownDTO[] = [
        {
            value: 'Pertukaran Dalam Ibu Pejabat / Negeri / Wilayah',
            name: 'Pertukaran Dalam Ibu Pejabat / Negeri / Wilayah',
        },
        {
            value: 'Pertukaran Luar Ibu Pejabat / Negeri / Wilayah',
            name: 'Pertukaran Luar Ibu Pejabat / Negeri / Wilayah',
        },
    ];

    return {
        props: {
            currentApplicationId,
            currentApplicationDetail,
            currentRoleCode,
            userMode,
            placementListDropdown,
            endorserDropdown,
            endorsementDropdown,
            employeeDropdown,
            programmeListDropdown,
            meetingResultOption,
            reasonDropdown,
            transferTypeDropdown,
        },
        forms: {
            applicationDetailForm,
            employeeReasonForm,
            employeeConfirmationForm,
            firstDirectorFeedbackForm,
            secondDirectorFeedbackForm,
            meetingResultForm,
            postponeApplicationForm,
            postponeResultForm,
            postponeApprovalForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
        },
    };
}

export async function _submitApplicationDetailForm(
    formData: TransferSelfDetail,
) {
    const form = await superValidate(formData, zod(TransferSelfDetailSchema));

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferDetail(formData);

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitReasonForm(formData: TransferSelfReason) {
    console.log('before submit' + formData.id);
    const form = await superValidate(formData, zod(TransferSelfReasonSchema));

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferReason(formData);

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// submit transfer document

// submit confirmation form
export async function _submitConfirmationForm(
    formData: TransferSelfEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferConfirmation(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// submit first director feedback form
export async function _submitFirstDirectorFeedbackForm(
    formData: TransferCommonEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferFirstDirectorApproval(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// submit Second director feedback form
export async function _submitSecondDirectorFeedbackForm(
    formData: TransferCommonEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferSecondDirectorApproval(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitMeetingResultForm(
    formData: TransferCommonMeeting,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonMeetingSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferMeeting(formData);

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitPostponeApplicationForm(
    formData: TransferCommonPostponeApplication,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonPostponeApplicationSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferPostponeApplication(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitPostponeResultForm(
    formData: TransferCommonPostponeResult,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonPostponeResultSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferPostponeResult(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitPostponeApprovalForm(
    formData: TransferCommonEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferPostponeApproval(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitEndorserDetailForm(
    formData: TransferCommonEndorserDetail,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorserDetailSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferEndorserDetail(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitSupporterFeedbackForm(
    formData: TransferCommonEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferSupporterFeedback(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitApproverFeedbackForm(
    formData: TransferCommonEndorsement,
) {
    const form = await superValidate(
        formData,
        zod(TransferCommonEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await TransferApplicationServices.addSelfTransferApproverFeedback(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export const _submitDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await TransferApplicationServices.addSelfTransferDocument(
            formData,
        );

    return { response };
};

export const _submitPostponeDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await TransferApplicationServices.uploadCommonPostponeDocument(
            formData,
        );

    return { response };
};

export function _convertToBase64(file: File): Promise<TransferDocumentDTO> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const base64String = event.target.result
                    .toString()
                    .split(',')[1];
                const resultObject: TransferDocumentDTO = {
                    base64: base64String,
                    name: file.name,
                };
                resolve(resultObject);
            } else {
                reject(new Error('Failed to read file.'));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

export function _prepDocumentUpload(
    fileList: FileList,
): Promise<TransferDocumentDTO[]> {
    return new Promise((resolve, reject) => {
        const fileArray: File[] = Array.from(fileList);

        const filesPromiseArray: Promise<TransferDocumentDTO>[] = [];

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
