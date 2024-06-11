import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import {
    TransferStatusConstant,
    TransferTypeConstant,
} from '$lib/constants/core/transfer.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    TransferApplicationDetailRequestDTO,
    TransferCommonApplicationDetailDTO,
    TransferDocumentAddDTO,
    TransferDocumentDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    TransferCommonDetailSchema,
    TransferCommonEndorsementSchema,
    TransferCommonEndorserDetailSchema,
    TransferCommonMeetingSchema,
    TransferCommonPostponeApplicationSchema,
    TransferCommonPostponeResultSchema,
    type TransferCommonDetail,
    type TransferCommonEndorsement,
    type TransferCommonEndorserDetail,
    type TransferCommonMeeting,
    type TransferCommonPostponeApplication,
    type TransferCommonPostponeResult,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { TransferApplicationServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service.js';
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

    let currentApplicationType =
        TransferTypeConstant.list.find(
            (item) => item.description == params.type,
        )?.code ?? TransferTypeConstant.director.code;

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

    // set the current steps
    let currentStep: LookupDTO = TransferStatusConstant.step0;

    // create forms
    // application details form
    const applicationDetailForm = await superValidate(
        zod(TransferCommonDetailSchema),
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

    // set default application detail
    let currentApplicationDetail: TransferCommonApplicationDetailDTO = {
        status: null,
        applicationDetail: null,
        meeting: null,
        postponeDetail: null,
        postponeDocument: null,
        postponeResult: null,
        postponeApproval: null,
        transferDocument: null,
        endorserDetails: null,
        supporterFeedback: null,
        approverFeedback: null,
    };

    if (currentApplicationId !== 0) {
        const currentApplicationDetailRequest: TransferApplicationDetailRequestDTO =
            {
                id: currentApplicationId,
            };

        const currentApplicationDetailResponse: CommonResponseDTO =
            await TransferApplicationServices.getCommonApplicationDetail(
                currentApplicationDetailRequest,
            );

        if (currentApplicationDetailResponse.status == 'success') {
            // assign the current application detail to the vairable
            currentApplicationDetail = currentApplicationDetailResponse.data
                ?.details as TransferCommonApplicationDetailDTO;

            if (currentApplicationDetail.status !== null) {
                currentStep =
                    TransferStatusConstant.list.find(
                        (item) =>
                            item.description == currentApplicationDetail.status,
                    ) ?? TransferStatusConstant.step0;
            }

            // application detail
            if (currentApplicationDetail.applicationDetail !== null) {
                applicationDetailForm.data =
                    currentApplicationDetail.applicationDetail;

                currentApplicationType =
                    currentApplicationDetail.applicationDetail.applicationType;
            }

            // meeting result
            if (currentApplicationDetail.meeting !== null) {
                meetingResultForm.data = currentApplicationDetail.meeting;
            } else {
                meetingResultForm.data.id = currentApplicationId;

                if (
                    currentApplicationDetail.applicationDetail
                        ?.newPlacementId !== undefined
                ) {
                    meetingResultForm.data.placementId =
                        currentApplicationDetail.applicationDetail
                            ?.newPlacementId;
                }
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
            if (currentApplicationDetail.endorserDetails !== null) {
                endorserDetailForm.data =
                    currentApplicationDetail.endorserDetails;
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
    } else {
        applicationDetailForm.data.applicationType = currentApplicationType;
    }

    // enums
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

    return {
        props: {
            userMode,
            currentRoleCode,
            currentApplicationId,
            currentApplicationDetail,
            currentApplicationType,
            currentStep,
            placementListDropdown,
            endorserDropdown,
            endorsementDropdown,
            employeeDropdown,
            employeeResponse,
            employeeRequest,
            programmeListDropdown,
            meetingResultOption,
        },
        forms: {
            applicationDetailForm,
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
    formData: TransferCommonDetail,
) {
    const form = await superValidate(formData, zod(TransferCommonDetailSchema));

    if (form.valid) {
        const response =
            await TransferApplicationServices.addCommonDetail(formData);

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
            await TransferApplicationServices.addCommonMeeting(formData);

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
            await TransferApplicationServices.addCommonPostponeApplication(
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
            await TransferApplicationServices.addCommonPostponeResult(formData);

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
            await TransferApplicationServices.addCommonPostponeApproval(
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
            await TransferApplicationServices.addCommonEndorserDetail(formData);

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
            await TransferApplicationServices.addCommonSupporterFeedback(
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
            await TransferApplicationServices.addCommonApproverFeedback(
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
        await TransferApplicationServices.uploadCommonTransferDocument(
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
            const base64String = event.target?.result as string;
            const fileName = file.name;
            const fileObject: TransferDocumentDTO = {
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
