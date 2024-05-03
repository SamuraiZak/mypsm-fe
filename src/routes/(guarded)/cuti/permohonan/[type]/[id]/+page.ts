import { LeaveProcessConstant } from '$lib/constants/core/leave-process.constant';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant.js';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type {
    LeaveApplicationDetailDTO,
    LeaveApplicationDetailRequestDTO,
    LeaveApplicationProcessDTO,
    LeaveCommonDetailsDTO,
    LeaveDeliveryDetailsDTO,
    LeaveDocumentAddDTO,
    LeaveDocumentUploadDTO,
    LeaveDocumentViewDTO,
    LeaveEndorserDetailsDTO,
    LeaveEndorsmentDTO,
    LeaveReplacementDetailsDTO,
    LeaveStudyDetailsDTO,
    LeaveUnrecordedDetailsDTO,
} from '$lib/dto/mypsm/leave/leave.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    LeaveCommonDetailsSchema,
    LeaveDeliveryDetailsSchema,
    LeaveEndorsementSchema,
    LeaveEndorserDetailsSchema,
    LeaveReplacementDetailsSchema,
    LeaveStudyDetailsSchema,
    LeaveUnrecordedDetailsSchema,
} from '$lib/schemas/mypsm/leave/leave.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveApplicationServices } from '$lib/services/implementation/mypsm/leave/leave-application.service.js';
import { error } from '@sveltejs/kit';
import { resolve } from 'path-browserify';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // get the current type
    const currentLeaveType: LookupDTO =
        LeaveTypeConstant.list.find(
            (item) => item.description == params.type,
        ) ?? LeaveTypeConstant.unrecordedLeave;

    const currentApplicationProcess: LeaveApplicationProcessDTO =
        LeaveProcessConstant.list.find(
            (item) => item.type.description == currentLeaveType.description,
        ) ?? LeaveProcessConstant.unrecordedLeave;

    // get current application Id
    const currentApplicationId: number = parseInt(params.id);

    // get current user mode
    let userMode: string = 'employee';

    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? '';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'employee';
            break;
        case UserRoleConstant.ketuaPengarah.code:
            userMode = 'headOfDirector';
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

    // ============================================
    // get all enums
    // ============================================

    // get leave type
    let leaveTypeList: LookupDTO[] = [];

    const leaveTypeResponse: CommonResponseDTO =
        await LookupServices.getLeaveTypeEnums();

    if (leaveTypeResponse.status == 'success') {
        leaveTypeList = leaveTypeResponse.data?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    leaveTypeList = leaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const leaveTypeDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProper(leaveTypeList);

    // get list of half day option
    const halfDayOptionDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // get list of half type option
    const halfDayTypeDropdown: DropdownDTO[] = [
        {
            value: 'Pagi',
            name: 'Pagi',
        },
        {
            value: 'Petang',
            name: 'Petang',
        },
    ];

    let leaveEndorsementDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // get list of unrecorded leave type
    let unrecordedLeaveTypeList: LookupDTO[] = [];

    const unrecordedLeaveTypeResponse: CommonResponseDTO =
        await LookupServices.getUnrecordedLeaveTypeEnums();

    if (unrecordedLeaveTypeResponse.status == 'success') {
        unrecordedLeaveTypeList = unrecordedLeaveTypeResponse.data
            ?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    unrecordedLeaveTypeList = unrecordedLeaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const unrecordedLeaveTypeDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProper(unrecordedLeaveTypeList);

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

    // ============================================
    // create detail forms
    // ============================================
    // leave common form
    const leaveCommonForm = await superValidate(zod(LeaveCommonDetailsSchema));

    // leave unrecorded form
    const leaveUnrecordedForm = await superValidate(
        zod(LeaveUnrecordedDetailsSchema),
    );

    // leave delivery form
    const leaveDeliveryForm = await superValidate(
        zod(LeaveDeliveryDetailsSchema),
    );

    // leave study form
    const leaveStudyForm = await superValidate(zod(LeaveStudyDetailsSchema));

    // replacement leave form
    const leaveReplacementForm = await superValidate(
        zod(LeaveReplacementDetailsSchema),
    );

    // ============================================
    // create endorsement forms
    // ============================================

    // head of director feedback
    const headOfDirectorFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // director feedback
    const directorFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // secretary verification
    let secretaryVerificationForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // supporter feedback
    const supporterFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // approver feedback
    const approverFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // management feedback
    const managementFeedbackForm = await superValidate(
        zod(LeaveEndorsementSchema),
    );

    // meeting feedback
    const meetingResultForm = await superValidate(zod(LeaveEndorsementSchema));

    // ============================================
    // create endorser detail form
    // ============================================

    // endorser details form
    const endorserDetailForm = await superValidate(
        zod(LeaveEndorserDetailsSchema),
    );

    // ============================================
    // get application detail
    // ============================================

    let currentApplicationDetail: LeaveApplicationDetailDTO = {
        status: 'inactive',
        applicationDetail: null,
        headOfDirectorFeedback: null,
        directorFeedback: null,
        secretaryVerification: null,
        endorserDetail: null,
        supporterFeedback: null,
        approverFeedback: null,
        managementFeedback: null,
        meeting: null,
        document: null,
    };

    let documents: LeaveDocumentViewDTO[] = [];

    const applicationDetailRequestBody: LeaveApplicationDetailRequestDTO = {
        leaveId: currentApplicationId,
        leaveTypeCode: currentLeaveType.code,
    };

    const applicationDetailResponse: CommonResponseDTO =
        await LeaveApplicationServices.getApplicationDetail(
            applicationDetailRequestBody,
        );

    if (applicationDetailResponse.status !== 'success') {
        return error(404);
    } else {
        currentApplicationDetail = applicationDetailResponse.data
            ?.details as LeaveApplicationDetailDTO;

        // fit data into detail form
        if (currentApplicationDetail.applicationDetail !== null) {
            switch (currentLeaveType.code) {
                case LeaveTypeConstant.unrecordedLeave.code:
                    leaveUnrecordedForm.data =
                        currentApplicationDetail.applicationDetail as LeaveUnrecordedDetailsDTO;
                    break;

                case LeaveTypeConstant.studyLeave.code:
                    leaveStudyForm.data =
                        currentApplicationDetail.applicationDetail as LeaveStudyDetailsDTO;
                    break;

                case LeaveTypeConstant.earlyMaternityLeave.code:
                    leaveDeliveryForm.data =
                        currentApplicationDetail.applicationDetail as LeaveDeliveryDetailsDTO;

                case LeaveTypeConstant.officerMaternityLeave.code:
                    leaveDeliveryForm.data =
                        currentApplicationDetail.applicationDetail as LeaveDeliveryDetailsDTO;

                case LeaveTypeConstant.partnerMaternityLeave.code:
                    leaveDeliveryForm.data =
                        currentApplicationDetail.applicationDetail as LeaveDeliveryDetailsDTO;
                    break;
                case LeaveTypeConstant.replacementLeave.code:
                    leaveReplacementForm.data =
                        currentApplicationDetail.applicationDetail as LeaveReplacementDetailsDTO;
                    break;

                default:
                    leaveCommonForm.data =
                        currentApplicationDetail.applicationDetail as LeaveCommonDetailsDTO;
                    break;
            }

            // fit data into head of director feedback form
            if (currentApplicationDetail.headOfDirectorFeedback !== null) {
                headOfDirectorFeedbackForm.data =
                    currentApplicationDetail.headOfDirectorFeedback as LeaveEndorsmentDTO;
            } else {
                headOfDirectorFeedbackForm.data.leaveId = currentApplicationId;
                headOfDirectorFeedbackForm.data.leaveTypeCode =
                    currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.headOfDirectorFeedback = false;
                }
            }

            // fit data into director feedback form
            if (currentApplicationDetail.directorFeedback !== null) {
                directorFeedbackForm.data =
                    currentApplicationDetail.directorFeedback as LeaveEndorsmentDTO;

                directorFeedbackForm.data.status =
                    currentApplicationDetail.directorFeedback?.status ?? false;
            } else {
                directorFeedbackForm.data.leaveId = currentApplicationId;
                directorFeedbackForm.data.leaveTypeCode = currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.directorFeedback = false;
                }
            }

            // fit data into secretary verification form
            if (currentApplicationDetail.secretaryVerification !== null) {
                secretaryVerificationForm.data =
                    currentApplicationDetail.secretaryVerification as LeaveEndorsmentDTO;

                secretaryVerificationForm = await superValidate(
                    currentApplicationDetail.secretaryVerification,
                    zod(LeaveEndorsementSchema),
                );
            } else {
                secretaryVerificationForm.data.leaveId = currentApplicationId;
                secretaryVerificationForm.data.leaveTypeCode =
                    currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.secretaryVerification = false;
                }
            }

            // fit data into supporter feedback form
            if (currentApplicationDetail.supporterFeedback !== null) {
                supporterFeedbackForm.data =
                    currentApplicationDetail.supporterFeedback as LeaveEndorsmentDTO;
            } else {
                supporterFeedbackForm.data.leaveId = currentApplicationId;
                supporterFeedbackForm.data.leaveTypeCode =
                    currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.supporterFeedback = false;
                }
            }

            // fit data into approver feedback form
            if (currentApplicationDetail.approverFeedback !== null) {
                approverFeedbackForm.data =
                    currentApplicationDetail.approverFeedback as LeaveEndorsmentDTO;
            } else {
                approverFeedbackForm.data.leaveId = currentApplicationId;
                approverFeedbackForm.data.leaveTypeCode = currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.approverFeedback = false;
                }
            }

            // fit data into management feedback form
            if (currentApplicationDetail.managementFeedback !== null) {
                managementFeedbackForm.data =
                    currentApplicationDetail.managementFeedback as LeaveEndorsmentDTO;
            } else {
                managementFeedbackForm.data.leaveId = currentApplicationId;
                managementFeedbackForm.data.leaveTypeCode =
                    currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.managementFeedback = false;
                }
            }

            // fit data into meeting form
            if (currentApplicationDetail.meeting !== null) {
                meetingResultForm.data =
                    currentApplicationDetail.managementFeedback as LeaveEndorsmentDTO;
            } else {
                meetingResultForm.data.leaveId = currentApplicationId;
                meetingResultForm.data.leaveTypeCode = currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.meeting = false;
                }
            }

            // fit data into endorser detail form
            if (currentApplicationDetail.endorserDetail !== null) {
                endorserDetailForm.data =
                    currentApplicationDetail.endorserDetail as LeaveEndorserDetailsDTO;
            } else {
                endorserDetailForm.data.leaveId = currentApplicationId;
                endorserDetailForm.data.leaveTypeCode = currentLeaveType.code;

                if (currentApplicationDetail.status == 'inactive') {
                    currentApplicationProcess.endorserDetail = false;
                }
            }

            if (currentApplicationDetail.document !== null) {
                documents = currentApplicationDetail.document;
            }
        }
    }

    return {
        props: {
            currentApplicationId,
            currentLeaveType,
            currentApplicationProcess,
            currentApplicationDetail,
            userMode,
            unrecordedLeaveTypeDropdown,
            halfDayOptionDropdown,
            halfDayTypeDropdown,
            leaveTypeDropdown,
            leaveEndorsementDropdown,
            endorserDropdown,
            documents,
        },
        forms: {
            leaveCommonForm,
            leaveUnrecordedForm,
            leaveDeliveryForm,
            leaveStudyForm,
            leaveReplacementForm,
            headOfDirectorFeedbackForm,
            directorFeedbackForm,
            secretaryVerificationForm,
            supporterFeedbackForm,
            approverFeedbackForm,
            managementFeedbackForm,
            meetingResultForm,
            endorserDetailForm,
        },
    };
}

// head of director
export async function _submitHeadOfDirectorFeedbackForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addHeadOfDirectorFeedback(formData);
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// director
export async function _submitDirectorFeedbackForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addDirectorFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitSecretaryVerificationForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addSecretaryVerification(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitSupporterFeedbackForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addSupporterFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitApproverFeedbackForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addApproverFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitManagementFeedbackForm(
    formData: LeaveEndorsmentDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addManagementFeedback(formData);

        return {
            response,
        };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitMeetingResultForm(formData: LeaveEndorsmentDTO) {
    const form = await superValidate(formData, zod(LeaveEndorsementSchema));

    if (form.valid) {
        // const response =
        //     await LeaveApplicationServices.addManagementFeedback(formData);
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export async function _submitEndorserDetailsForm(
    formData: LeaveEndorserDetailsDTO,
) {
    const form = await superValidate(formData, zod(LeaveEndorserDetailsSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addEndorserDetails(formData);
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

export const _submitDocument = async (
    formData: string,
    currentType: LookupDTO,
) => {
    const response: CommonResponseDTO =
        await LeaveApplicationServices.uploadDocument(formData, currentType);

    return { response };
};

export function _prepDocumentUpload(
    fileList: FileList,
): Promise<LeaveDocumentAddDTO[]> {
    return new Promise((resolve, reject) => {
        const fileArray: File[] = Array.from(fileList);

        const filesPromiseArray: Promise<LeaveDocumentAddDTO>[] = [];

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

export function _convertToBase64(file: File): Promise<LeaveDocumentAddDTO> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64String = event.target?.result as string;
            const fileName = file.name;
            const fileObject: LeaveDocumentAddDTO = {
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
