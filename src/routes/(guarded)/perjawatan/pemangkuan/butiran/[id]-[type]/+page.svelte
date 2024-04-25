<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import {
        _submitUpdateMeetingDetailForm,
        _submitUpdateMeetingResultForm,
        _submitUpdatePromotionMeetingResultForm,
        _submitUpdateEmployeePlacementMeetingResultForm,
        _submitUpdateActingResultForm,
        _submitUpdateMainPromotionMeetingResultForm,
        _submitUpdateMainPromotionMeetingResultDetailForm,
        _submitUpdateMainActingEmployeeDetailForm,
        _submitMainSupporterAndApproverForm,
        _submitSupporterResultForm,
        _submitApproverResultForm,
        _submitDirectorResultForm,
        _submitEmployeeNeedPlacementAmendmentForm,
        _submitUpdateChosenCandidateForm,
        _submitUpdatePromotionMeetingForm,
        _tableInformation,
        _submitUpdatePlacementMeeting,
        _postponeDetail,
        _actingResult,
        _actingConfirmation,
        _mainPromotion,
        _directorApproval,
        _supportApproval,
        _approverApproval,
        _fileToBase64Object,
        _submitPostponeForm,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { superForm } from 'sveltekit-superforms/client';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import {
        _updateMeetingDetailSchema,
        _updatePromotionMeetingResultSchema,
        _updateEmployeePlacementMeetingResultSchema,
        _updateActingResultSchema,
        _mainUpdatePromotionMeetingResultSchema,
        _mainUpdatePromotionMeetingResultDetailSchema,
        _mainUpdateActingEmployeeDetailSchema,
        _mainSupporterAndApproverSchema,
        _placementAmendmentApplication,
        _updateChosenCandidate,
        _updateMeetingResult,
        _updatePromotionDetail,
        _actingApprovalSchema,
        _postponeDetailSchema,
    } from '$lib/schemas/mypsm/employment/acting/acting-schemas';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { zod } from 'sveltekit-superforms/adapters';
    import type {
        ActingChosenEmployee,
        EmployeePromotionDetail,
        PostponeDetail,
    } from '$lib/dto/mypsm/employment/acting/acting-chosen-employee.dto';
    import {
        dropdownCommonOption,
        successOption,
    } from '$lib/constants/core/dropdown.constant';
    import type { ActingResult } from '$lib/dto/mypsm/employment/acting/acting-result.dto';
    import type { ActingConfirmationDetail } from '$lib/dto/mypsm/employment/acting/acting-confirmation-detail.dto';
    import {
        approveOptions,
        confirmOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import type { MainPromotionMeeting } from '$lib/dto/mypsm/employment/acting/main-promotion-meeting-detail.dto';
    import type {
        ActingApproverApproval,
        ActingDirectorApproval,
        ActingSupportApproval,
    } from '$lib/dto/mypsm/employment/acting/acting-approval.dto';

    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

    function uploadDocument() {
        if (
            files == undefined &&
            $employeeNeedPlacementAmendmentForm.postponeNeeded
        ) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    $employeeNeedPlacementAmendmentForm.documents = result;
                })
                .finally(() => {
                    _submitEmployeeNeedPlacementAmendmentForm(
                        $employeeNeedPlacementAmendmentForm,
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let detailOpen: boolean = false;

    let selectedCandidate: ActingChosenEmployee;
    let files: FileList;
    //all tables
    let chosenEmployeeTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.chosenEmployeeResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.chosenEmployee,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [],
        url: 'employment/acting/chosen_employee_lists/list',
        id: 'chosenEmployeeTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let updatedChosenEmployeeTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.chosenEmployeeResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.chosenEmployee,
        selectedData: [],
        exportData: [],
        hiddenColumn: [
            'actingId',
            'employeeId',
            'position',
            'currentPlacement',
            'ICNumber',
        ],
        dictionary: [],
        url: 'employment/acting/chosen_employee_lists/list',
        id: 'updatedChosenEmployeeTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let interviewInfoTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.interviewInfoResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.interviewInfo,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/interview_infos/list',
        id: 'interviewInfoTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let interviewResultTable: TableSettingDTO = {
        param: data.interviewResultParam,
        meta: data.interviewResultResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.interviewResult,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/interview_result_marks/list',
        id: 'interviewResultTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let promotionMeetingResultTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.promotionMeetingResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.promotionMeetingResult,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/promotion_meeting_results/list',
        id: 'promotionMeetingResultTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let placementTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.placementDetailResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.placementDetail,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/promotion_meeting_placements/list',
        id: 'placementTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let postponeTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.postponeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.postponeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/postpones/list',
        id: 'postponeTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let postponeResultTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.postponeResultResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.postponeResult ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/postpone_results/list',
        id: 'postponeResultTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let actingConfirmationTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.actingConfirmationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.actingConfirmation,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/acting_confirmations/list',
        id: 'actingConfirmationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    //gred utama table starts here
    let mainCertification: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.mainActingCertificationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.mainActingCertification,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/mains/promotion_meetings/list',
        id: 'mainCertification',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let mainPromotionTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.mainActingPromotionListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.mainActingPromotionList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [],
        url: 'employment/acting/mains/promotion_meetings/list',
        id: 'mainPromotionTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    // ================ delete this after done
    let promotionMeetingResultOptions: RadioDTO[] = [
        {
            value: true,
            name: 'Lulus',
        },
        {
            value: false,
            name: 'Tidak Lulus',
        },
    ];
    // ================ delete this after done

    // ======================= validation
    const {
        form: updateChosenCandidateForm,
        errors: updateChosenCandidateError,
        enhance: updateChosenCandidateEnhance,
    } = superForm(data.updateChosenCandidateForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateChosenCandidateForm',
        validators: zod(_updateChosenCandidate),
        onSubmit() {
            updatedChosenEmployeeTable.selectedData.forEach((val: any) => {
                $updateChosenCandidateForm.actingIds.push(val.actingId);
            });
            _submitUpdateChosenCandidateForm($updateChosenCandidateForm);
        },
    });

    const {
        form: directorResultForm,
        errors: directorResultError,
        enhance: directorResultEnhance,
    } = superForm(data.directorResultForm, {
        SPA: true,
        validators: zod(_actingApprovalSchema),
        onSubmit() {
            $directorResultForm.id = data.batchId.batchId;
            _submitDirectorResultForm($directorResultForm);
        },
    });
    const {
        form: updateMeetingDetailForm,
        errors: updateMeetingDetailErrors,
        enhance: updateMeetingDetailEnhance,
    } = superForm(data.updateMeetingDetailForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingDetailForm',
        validators: zod(_updateMeetingDetailSchema),
        onSubmit() {
            $updateMeetingDetailForm.batchId = data.batchId.batchId;
            _submitUpdateMeetingDetailForm($updateMeetingDetailForm);
        },
    });
    const {
        form: updateMeetingResultForm,
        errors: updateMeetingResultError,
        enhance: updateMeetingResultEnhance,
    } = superForm(data.updateMeetingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingResultForm',
        validators: zod(_updateMeetingResult),
        onSubmit() {
            data.interviewResult.forEach((val) =>
                $updateMeetingResultForm.actingIds.push(Number(val.actingId)),
            );
            _submitUpdateMeetingResultForm($updateMeetingResultForm);
        },
    });
    const {
        form: updatePromotionMeetingForm,
        errors: updatePromotionMeetingError,
        enhance: updatePromotionMeetingEnhance,
    } = superForm(data.updatePromotionMeetingForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updatePromotionMeetingForm',
        validators: zod(_updatePromotionDetail),
        onSubmit() {
            $updatePromotionMeetingForm.batchId = data.batchId.batchId;
            _submitUpdatePromotionMeetingForm($updatePromotionMeetingForm);
        },
    });
    const {
        form: updatePromotionMeetingResultForm,
        errors: updatePromotionMeetingResultError,
        enhance: updatePromotionMeetingResultEnhance,
    } = superForm(data.updatePromotionMeetingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updatePromotionMeetingResultForm',
        validators: zod(_updatePromotionMeetingResultSchema),
        onSubmit() {
            _submitUpdatePromotionMeetingResultForm(
                $updatePromotionMeetingResultForm,
            );
        },
    });
    const {
        form: updatePlacementMeeting,
        errors: updatePlacementMeetingError,
        enhance: updatePlacementMeetingEnhance,
    } = superForm(data.updatePlacementMeeting, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updatePlacementMeeting',
        validators: zod(_updatePromotionDetail),
        onSubmit() {
            $updatePlacementMeeting.batchId = data.batchId.batchId;
            _submitUpdatePlacementMeeting($updatePlacementMeeting);
        },
    });

    const {
        form: updateEmployeePlacementMeetingResultForm,
        errors: updateEmployeePlacementMeetingResultError,
        enhance: updateEmployeePlacementMeetingResultEnhance,
    } = superForm(data.updateEmployeePlacementMeetingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateEmployeePlacementMeetingResultForm',
        validators: zod(_updateEmployeePlacementMeetingResultSchema),
        onSubmit() {
            $updateEmployeePlacementMeetingResultForm.id =
                selectedCandidate.actingId;
            _submitUpdateEmployeePlacementMeetingResultForm(
                $updateEmployeePlacementMeetingResultForm,
            );
        },
    });
    const {
        form: updateActingResultForm,
        errors: updateActingResultError,
        enhance: updateActingResultEnhance,
    } = superForm(data.updateActingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateActingResultForm',
        validators: zod(_updateActingResultSchema),
        onSubmit() {
            _submitUpdateActingResultForm($updateActingResultForm);
        },
    });
    const {
        form: supporterResultForm,
        errors: supporterResultError,
        enhance: supporterResultEnhance,
    } = superForm(data.supporterResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'supporterResultForm',
        validators: zod(_actingApprovalSchema),
        onSubmit() {
            $supporterResultForm.id = selectedCandidate.actingId;
            _submitSupporterResultForm($supporterResultForm);
        },
    });
    const {
        form: approverResultForm,
        errors: approverResultError,
        enhance: approverResultEnhance,
    } = superForm(data.approverResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'approverResultForm',
        validators: zod(_actingApprovalSchema),
        onSubmit() {
            $approverResultForm.id = selectedCandidate.actingId;
            _submitApproverResultForm($approverResultForm);
        },
    });

    // KIV
    const {
        form: updatePostponeDetail,
        errors: updatePostponeError,
        enhance: updatePostponeEnhance,
    } = superForm(data.updatePostponeDetail, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updatePostponeDetail',
        validators: zod(_postponeDetailSchema),
        onSubmit() {
            $updatePostponeDetail.id = selectedCandidate.actingId;
            _submitPostponeForm($updatePostponeDetail);
        },
    });

    // =============== gred utama validation
    const {
        form: updateMainPromotionMeetingResultForm,
        errors: updateMainPromotionMeetingResultError,
        enhance: updateMainPromotionMeetingResultEnhance,
    } = superForm(data.updateMainPromotionMeetingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMainPromotionMeetingResultForm',
        validators: zod(_mainUpdatePromotionMeetingResultSchema),
        onSubmit() {
            $updateMainPromotionMeetingResultForm.batchId =
                data.batchId.batchId;
            _submitUpdateMainPromotionMeetingResultForm(
                $updateMainPromotionMeetingResultForm,
            );
        },
    });
    const {
        form: updateMainPromotionMeetingResultDetailForm,
        errors: updateMainPromotionMeetingResultDetailError,
        enhance: updateMainPromotionMeetingResultDetailEnhance,
    } = superForm(data.updateMainPromotionMeetingResultDetailForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingDetailForm',
        validators: zod(_mainUpdatePromotionMeetingResultDetailSchema),
        onSubmit() {
            _submitUpdateMainPromotionMeetingResultDetailForm(
                $updateMainPromotionMeetingResultDetailForm,
            );
        },
    });
    const {
        form: updateMainActingEmployeeDetailForm,
        errors: updateMainActingEmployeeDetailError,
        enhance: updateMainActingEmployeeDetailEnhance,
    } = superForm(data.updateMainActingEmployeeDetailForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingDetailForm',
        validators: zod(_mainUpdateActingEmployeeDetailSchema),
        onSubmit() {
            _submitUpdateMainActingEmployeeDetailForm(
                $updateMainActingEmployeeDetailForm,
            );
        },
    });
    const {
        form: mainSupporterAndApproverForm,
        errors: mainSupporterAndApproverError,
        enhance: mainSupporterAndApproverEnhance,
    } = superForm(data.mainSupporterAndApproverForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingDetailForm',
        validators: zod(_mainSupporterAndApproverSchema),
        onSubmit() {
            _submitMainSupporterAndApproverForm($mainSupporterAndApproverForm);
        },
    });

    // ======================= kakitangan form
    const {
        form: employeeNeedPlacementAmendmentForm,
        errors: employeeNeedPlacementAmendmentError,
        enhance: employeeNeedPlacementAmendmentEnhance,
    } = superForm(data.employeeNeedPlacementAmendmentForm, {
        SPA: true,
        id: 'employeeNeedPlacementAmendmentForm',
        validators: zod(_placementAmendmentApplication),
        taintedMessage: false,
        dataType: 'json',
        invalidateAll: true,
        multipleSubmits: 'prevent',
        onSubmit() {
            $employeeNeedPlacementAmendmentForm.id = 110;
            uploadDocument();
        },
    });

    // ================= pass data for tables' detail
    let employeePromotionDetail: EmployeePromotionDetail = {
        candidate: {
            employeeName: '',
            employeeNumber: '',
            ICNumber: '',
        },
        meetingResult: '',
    };
    let employeePostponeDetail: PostponeDetail = {
        postponeNeeded: '',
        initialReportDate: '',
        initialPlacement: '',
        requestedReportDate: null,
        requestedPlacement: '',
        meetingResult: '',
        newReportDutyDate: '',
        newPlacement: '',
        documents: [],
    };
    let employeeActingResult = {} as ActingResult;
    let employeeActingConfirmation = {} as ActingConfirmationDetail;
    let directorApproval = {} as ActingDirectorApproval;

    const isUndefined = typeof directorApproval === 'undefined';
    const isEmpty = Object.keys(directorApproval).length === 0;
    const isUndefinedOrEmpty = isUndefined && isEmpty;

    let supporterApproval = {} as ActingSupportApproval;
    let approverApproval = {} as ActingApproverApproval;
    let mainPromotionDetail = {} as MainPromotionMeeting;
    const getTableInformation = async (index: number) => {
        switch (index) {
            case 1: {
                _tableInformation(selectedCandidate.actingId)
                    .then((res) => {
                        employeePromotionDetail = res.promotionResponse.data
                            ?.details as EmployeePromotionDetail;
                    })
                    .finally(() => {
                        $updatePromotionMeetingResultForm.id =
                            selectedCandidate.actingId;
                        $updatePromotionMeetingResultForm.meetingResult =
                            employeePromotionDetail.meetingResult;
                    });
                break;
            }
            case 2: {
                _postponeDetail(selectedCandidate.actingId)
                    .then((res) => {
                        employeePostponeDetail = res.response.data
                            ?.details as PostponeDetail;
                    })
                    .finally(() => {
                        // TODO: edit postpone result here
                    });
                break;
            }
            case 3: {
                _actingResult(selectedCandidate.actingId)
                    .then((res) => {
                        employeeActingResult = res.response.data
                            ?.details as ActingResult;
                    })
                    .finally(() => {
                        $updateActingResultForm.id =
                            employeeActingResult.actingDetails?.actingId;
                        $updateActingResultForm.actingResult =
                            employeeActingResult.actingDetails?.actingResult;
                        $updateActingResultForm.actingPosition =
                            employeeActingResult.actingDetails?.actingPosition;
                        $updateActingResultForm.actingGrade =
                            employeeActingResult.actingDetails?.actingGrade;
                        $updateActingResultForm.newPlacement =
                            employeeActingResult.actingDetails?.newPlacement;
                        $updateActingResultForm.reportDate =
                            employeeActingResult.actingDetails?.reportDate;
                        // $updateActingResultForm.supporterName = employeeActingResult.actingDetails?.supporterName;
                        // $updateActingResultForm.approverName = employeeActingResult.actingDetails?.approverName;
                    })
                    .catch((e) => console.log(e));
                _supportApproval(selectedCandidate.actingId).then((res) => {
                    supporterApproval = res.response.data
                        ?.details as ActingSupportApproval;
                });
                _approverApproval(selectedCandidate.actingId).then((res) => {
                    approverApproval = res.response.data
                        ?.details as ActingApproverApproval;
                });
                break;
            }
            case 4: {
                _actingConfirmation(selectedCandidate.actingId).then((res) => {
                    employeeActingConfirmation = res.response.data
                        ?.details as ActingConfirmationDetail;
                });
            }
            case 5: {
                _mainPromotion(selectedCandidate.actingId)
                    .then((res) => {
                        mainPromotionDetail = res.response.data
                            ?.details as MainPromotionMeeting;
                    })
                    .finally(() => {
                        // TODO: edit postpone result here
                    });
                break;
            }
            case 6: {
                _directorApproval(selectedCandidate.actingId).then((res) => {
                    directorApproval = res.response.data
                        ?.details as ActingDirectorApproval;
                });
                break;
            }
        }
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perjawatan/pemangkuan')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper bind:activeIndex={stepperIndex}>
        <!-- For Gred Utama (New) Only -->
        {#if data.currentRoleCode === secretaryRoleCode && data.actingType === 'Gred Utama'}
            <StepperContent>
                <StepperContentHeader title="Perakuan Pemangkuan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex h-full w-full flex-col gap-2.5 px-2">
                        <ContentHeader
                            title="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                            borderClass="border-none"
                        >
                            <TextIconButton
                                type="primary"
                                label="Peraku"
                                icon="check"
                                onClick={() => {}}
                            />
                            <TextIconButton
                                type="danger"
                                label="Tidak Peraku"
                                icon="cancel"
                                onClick={() => {}}
                            />
                        </ContentHeader>
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title=""
                                    bind:tableData={mainCertification}
                                ></DataTable>
                            </div>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Borang Berkaitan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <DownloadAttachment></DownloadAttachment>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    {#if detailOpen}
                        <TextIconButton
                            label="Batal"
                            icon="block"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />

                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form="updateMainPromotionMeetingResultDetailForm"
                        />
                    {:else}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form="updateMainPromotionMeetingResultForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 border-b p-3 pb-5"
                            id="updateMainPromotionMeetingResultForm"
                            method="POST"
                            use:updateMainPromotionMeetingResultEnhance
                        >
                            <CustomSelectField
                                label="Name Mesyuarat"
                                id="meetingName"
                                options={data.lookup.meetingNameLookup}
                                bind:val={$updateMainPromotionMeetingResultForm.meetingName}
                                errors={$updateMainPromotionMeetingResultError.meetingName}
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                type="date"
                                bind:val={$updateMainPromotionMeetingResultForm.meetingDate}
                                errors={$updateMainPromotionMeetingResultError.meetingDate}
                            />
                            <CustomSelectField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                options={data.lookup.positionLookup}
                                errors={$updateMainPromotionMeetingResultError.actingPosition}
                                bind:val={$updateMainPromotionMeetingResultForm.actingPosition}
                            />
                            <CustomSelectField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                options={data.lookup.gradeLookup}
                                errors={$updateMainPromotionMeetingResultError.actingGrade}
                                bind:val={$updateMainPromotionMeetingResultForm.actingGrade}
                            />
                            <CustomSelectField
                                label="Penempatan"
                                id="placement"
                                errors={$updateMainPromotionMeetingResultError.placement}
                                bind:val={$updateMainPromotionMeetingResultForm.placement}
                                options={data.lookup.placementLookup}
                            />
                            <CustomTextField
                                label="Tarikh Kuatkuasa Lapor Diri"
                                id="reportDate"
                                type="date"
                                errors={$updateMainPromotionMeetingResultError.reportDate}
                                bind:val={$updateMainPromotionMeetingResultForm.reportDate}
                            />
                            <CustomTextField
                                label="No. Rujukan Surat"
                                id="referenceNo"
                                type="text"
                                errors={$updateMainPromotionMeetingResultError.referenceNo}
                                bind:val={$updateMainPromotionMeetingResultForm.referenceNo}
                            />
                            <CustomTextField
                                label="Tarikh Surat"
                                id="referenceDate"
                                type="date"
                                errors={$updateMainPromotionMeetingResultError.referenceDate}
                                bind:val={$updateMainPromotionMeetingResultForm.referenceDate}
                            />
                            <CustomTextField
                                label="Tajuk Surat"
                                id="referenceTitle"
                                type="text"
                                errors={$updateMainPromotionMeetingResultError.referenceTitle}
                                bind:val={$updateMainPromotionMeetingResultForm.referenceTitle}
                            />
                        </form>
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10"
                        >
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                                borderClass="border-none"
                            />
                            <div
                                class="flex w-full flex-col justify-start gap-2.5"
                            >
                                <div class="h-fit w-full">
                                    <DataTable
                                        title=""
                                        bind:tableData={mainPromotionTable}
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                5,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start px-3 pb-10"
                            id="updateMainPromotionMeetingResultDetailForm"
                            method="POST"
                            use:updateMainPromotionMeetingResultDetailEnhance
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                disabled
                                id="employeeNumber"
                                val={mainPromotionDetail.candidate
                                    ?.employeeNumber}
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                disabled
                                val={mainPromotionDetail.candidate
                                    ?.employeeName}
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                id="ICNumber"
                                val={mainPromotionDetail.candidate?.ICNumber}
                            />
                            <CustomTextField
                                label="Program"
                                disabled
                                id="programme"
                                val={mainPromotionDetail.candidate?.programme}
                            />
                            <CustomTextField
                                label="Skim"
                                disabled
                                id="scheme"
                                val={mainPromotionDetail.candidate?.scheme}
                            />
                            <CustomTextField
                                label="Gred"
                                disabled
                                id="grade"
                                val={mainPromotionDetail.candidate?.grade}
                            />
                            <CustomTextField
                                label="Nama Jawatan"
                                disabled
                                id="position"
                                val={mainPromotionDetail.candidate?.position}
                            />
                            <CustomTextField
                                label="Penempatan Sekarang"
                                disabled
                                id="currentPlacement"
                                val={mainPromotionDetail.candidate
                                    ?.currentPlacement}
                            />
                            <CustomTextField
                                label="Kumpulan"
                                disabled
                                id="serviceGroup"
                                val={mainPromotionDetail.candidate
                                    ?.serviceGroup}
                            />
                            <CustomTextField
                                label="Akuan Pinjaman Pendidikan / Institusi"
                                disabled
                                id="institutionLoanAccount"
                                val={mainPromotionDetail.candidate
                                    ?.institutionLoanAccount}
                            />
                            <ContentHeader
                                title="Keputusan Mesyuarat Kenaikan Pangkat"
                                borderClass="border-none"
                            />
                            <CustomRadioBoolean
                                id="promotionMeetingResult"
                                label="Keputusan"
                                disabled={false}
                                bind:val={$updateMainPromotionMeetingResultDetailForm.promotionMeetingResult}
                                errors={$updateMainPromotionMeetingResultDetailError.promotionMeetingResult}
                                options={promotionMeetingResultOptions}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Maklumat Pemangkuan Kakitangan"
                >
                    {#if detailOpen}
                        <TextIconButton
                            label="Batal"
                            icon="block"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="updateMainActingEmployeeDetailForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <CustomTable
                            title="Senarai Calon"
                            enableDetail
                            detailActions={() => (detailOpen = true)}
                            bind:tableData={chosenEmployeeTable}
                        />
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                            id="updateMainActingEmployeeDetailForm"
                            method="POST"
                            use:updateMainActingEmployeeDetailEnhance
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                disabled
                                id="employeeNumber"
                                type="text"
                                val="001023"
                            />
                            <CustomTextField
                                label="Nama"
                                disabled
                                id="employeeName"
                                type="text"
                                val="Rosli bin Ramdan"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                id="identificationNumber"
                                type="text"
                                val="890701-13-2215"
                            />
                            <ContentHeader
                                title="Butiran Pemangkuan"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                            <CustomSelectField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                options={data.lookup.positionLookup}
                                errors={$updateMainActingEmployeeDetailError.actingPosition}
                                bind:val={$updateMainActingEmployeeDetailForm.actingPosition}
                            />
                            <CustomSelectField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                options={data.lookup.gradeLookup}
                                errors={$updateMainActingEmployeeDetailError.actingGrade}
                                bind:val={$updateMainActingEmployeeDetailForm.actingGrade}
                            />
                            <CustomSelectField
                                label="Penempatan Baru"
                                id="newPlacement"
                                options={data.lookup.placementLookup}
                                errors={$updateMainActingEmployeeDetailError.newPlacement}
                                bind:val={$updateMainActingEmployeeDetailForm.newPlacement}
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="date"
                                errors={$updateMainActingEmployeeDetailError.reportingDate}
                                bind:val={$updateMainActingEmployeeDetailForm.reportingDate}
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Penyokong"
                                id="supporterName"
                                errors={$updateMainActingEmployeeDetailError.supporterName}
                                bind:val={$updateMainActingEmployeeDetailForm.supporterName}
                                options={successOption}
                            />
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="approverName"
                                errors={$updateMainActingEmployeeDetailError.approverName}
                                bind:val={$updateMainActingEmployeeDetailForm.approverName}
                                options={successOption}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Penyokong & Pelulus">
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        form="mainSupporterAndApproverForm"
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start px-2.5 pb-10"
                        id="mainSupporterAndApproverForm"
                        method="POST"
                        use:mainSupporterAndApproverEnhance
                    >
                        <CustomSelectField
                            label="Nama Penyokong"
                            id="supporterName"
                            options={data.lookup.supporterApproverLookup}
                            errors={$mainSupporterAndApproverError.supporterName}
                            bind:val={$mainSupporterAndApproverForm.supporterName}
                        />
                        <CustomSelectField
                            label="Nama Pelulus"
                            id="approverName"
                            options={data.lookup.supporterApproverLookup}
                            errors={$mainSupporterAndApproverError.approverName}
                            bind:val={$mainSupporterAndApproverForm.approverName}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>
            <!-- End Of For Gred Utama (New) Only -->

            <!-- All involved role except for kakitangan -->
        {:else if data.currentRoleCode !== employeeRoleCode}
            <!-- Views will vary based on roles -->
            <StepperContent>
                <StepperContentHeader
                    title="Senarai Kakitangan Yang Terpilih"
                />
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <div class="h-fit w-full p-3">
                            <DataTable
                                title="Senarai Kakitangan Dipilih"
                                bind:tableData={chosenEmployeeTable}
                            ></DataTable>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
                >
                    {#if (isUndefinedOrEmpty && data.currentRoleCode == UserRoleConstant.pengarahNegeri.code) || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form="directorResultForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <!-- Director Only -->
                    {#if data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                            id="directorResultForm"
                            method="POST"
                            use:directorResultEnhance
                        >
                            <ContentHeader
                                title="Keputusan daripada Pengarah Bahagian atau Negeri"
                                borderClass="border-none"
                            />
                            {#if isUndefinedOrEmpty}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="directorCertifiedRemark"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedRemark}
                                />
                                <CustomTextField
                                    label="Keputusan"
                                    id="directorCertifiedStatus"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedStatus}
                                />
                                <CustomTextField
                                    label="Tarikh Diperakui"
                                    id="directorCertifiedDate"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedDate}
                                />
                            {:else}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="remark"
                                    type="text"
                                    errors={$directorResultError.remark}
                                    bind:val={$directorResultForm.remark}
                                />
                                <CustomRadioBoolean
                                    id="status"
                                    label="Keputusan"
                                    disabled={false}
                                    bind:val={$directorResultForm.status}
                                    errors={$directorResultError.status}
                                    options={confirmOptions}
                                />
                            {/if}
                        </form>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                            id="directorResultForm"
                            method="POST"
                            use:directorResultEnhance
                        >
                            <ContentHeader
                                title="Keputusan daripada Urus Setia Integriti"
                                borderClass="border-none"
                            />
                            {#if isUndefinedOrEmpty}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="directorCertifiedRemark"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedRemark}
                                />
                                <CustomTextField
                                    label="Keputusan"
                                    id="directorCertifiedStatus"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedStatus}
                                />
                                <CustomTextField
                                    label="Tarikh Diperakui"
                                    id="directorCertifiedDate"
                                    disabled
                                    bind:val={directorApproval.directorCertifiedDate}
                                />
                            {:else}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="remark"
                                    type="text"
                                    errors={$directorResultError.remark}
                                    bind:val={$directorResultForm.remark}
                                />
                                <CustomRadioBoolean
                                    id="status"
                                    label="Keputusan"
                                    disabled={false}
                                    bind:val={$directorResultForm.status}
                                    errors={$directorResultError.status}
                                    options={confirmOptions}
                                />
                            {/if}
                        </form>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateChosenCandidateForm"
                            method="POST"
                            use:updateChosenCandidateEnhance
                        >
                            <!-- Urus Setia and Penyokong POV-->
                            <ContentHeader
                                title="Maklumat Peraku Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                disabled={false}
                                label="Nama Urus Setia Integriti"
                                id="secretaryName"
                                options={data.lookup.supporterApproverLookup}
                                bind:val={$updateChosenCandidateForm.secretaryName}
                                errors={$updateChosenCandidateError.secretaryName}
                            />

                            <CustomSelectField
                                disabled={false}
                                label="Nama Pengarah Bahagian / Negeri"
                                id="directorName"
                                options={data.lookup.supporterApproverLookup}
                                bind:val={$updateChosenCandidateForm.directorName}
                                errors={$updateChosenCandidateError.directorName}
                            />

                            <ContentHeader
                                title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua calon yang berkaitan."
                                borderClass="border-none"
                            >
                                <TextIconButton
                                    label="Lulus"
                                    icon="check"
                                    type="primary"
                                    form="updateChosenCandidateForm"
                                />
                            </ContentHeader>
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <div class="h-fit w-full p-3">
                                    <DataTable
                                        title="Senarai Kakitangan Dipilih"
                                        bind:tableData={updatedChosenEmployeeTable}
                                    ></DataTable>
                                </div>
                            </div>
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if data.currentRoleCode !== depDirectorRoleCode && data.currentRoleCode !== stateDirectorRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="updateMeetingDetailForm"
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateMeetingDetailForm"
                            method="POST"
                            use:updateMeetingDetailEnhance
                        >
                            <ContentHeader
                                title="Butiran Tawaran dan Temuduga"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Mesyuarat"
                                id="meetingName"
                                errors={$updateMeetingDetailErrors.meetingName}
                                options={data.lookup.meetingNameLookup}
                                bind:val={$updateMeetingDetailForm.meetingName}
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                errors={$updateMeetingDetailErrors.meetingDate}
                                type="date"
                                bind:val={$updateMeetingDetailForm.meetingDate}
                            />
                            <CustomSelectField
                                label="Gred"
                                id="grade"
                                errors={$updateMeetingDetailErrors.grade}
                                options={data.lookup.gradeLookup}
                                bind:val={$updateMeetingDetailForm.grade}
                            />
                            <CustomSelectField
                                label="Jawatan"
                                id="position"
                                errors={$updateMeetingDetailErrors.position}
                                options={data.lookup.positionLookup}
                                bind:val={$updateMeetingDetailForm.position}
                            />
                            <CustomTextField
                                label="Tarikh Temuduga"
                                id="interviewDate"
                                errors={$updateMeetingDetailErrors.interviewDate}
                                bind:val={$updateMeetingDetailForm.interviewDate}
                                type="date"
                            />
                            <CustomTextField
                                label="Masa Temuduga"
                                id="interviewTime"
                                placeholder="Contoh: 10.00pagi - 11.00pagi"
                                errors={$updateMeetingDetailErrors.interviewTime}
                                type="text"
                                bind:val={$updateMeetingDetailForm.interviewTime}
                            />
                            <CustomSelectField
                                label="Negeri"
                                id="state"
                                errors={$updateMeetingDetailErrors.state}
                                options={data.lookup.stateLookup}
                                bind:val={$updateMeetingDetailForm.state}
                            />
                            <CustomSelectField
                                label="Pusat Temuduga"
                                id="placement"
                                errors={$updateMeetingDetailErrors.placement}
                                bind:val={$updateMeetingDetailForm.placement}
                                options={data.lookup.placementLookup}
                            />

                            <ContentHeader
                                title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <div class="h-fit w-full p-3">
                                    <DataTable
                                        title=""
                                        bind:tableData={interviewInfoTable}
                                    ></DataTable>
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                        {#if !detailOpen}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updateMeetingResultForm"
                            />
                        {:else}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => (detailOpen = false)}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                type="primary"
                                form="updateMeetingResultForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            id="updateMeetingResultForm"
                            method="POST"
                            use:updateMeetingResultEnhance
                        >
                            {#if data.actingType === 'Gred 1-54'}
                                <ContentHeader
                                    title="Maklumat Markah Keseluruhan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Markah Keseluruhan"
                                    id="marks"
                                    placeholder=""
                                    bind:val={$updateMeetingResultForm.marks}
                                    errors={$updateMeetingResultError.marks}
                                />

                                <ContentHeader
                                    title="Tindakan: Tetapkan untuk semua kakitangan berkaitan"
                                    borderClass="border-none"
                                />
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                >
                                    <div class="h-fit w-full p-3">
                                        <DataTable
                                            title=""
                                            bind:tableData={interviewResultTable}
                                        ></DataTable>
                                    </div>
                                </div>
                            {:else if !detailOpen}
                                <CustomTable
                                    title="Senarai Calon Yang Terpilih"
                                    enableDetail
                                    detailActions={() => (detailOpen = true)}
                                    bind:tableData={chosenEmployeeTable}
                                />
                            {:else}
                                <ContentHeader
                                    title="Maklumat Calon"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    type="text"
                                    val="6764"
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    type="text"
                                    val="Gareth Bale"
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="identificationNumber"
                                    type="text"
                                    val="991122-13-4749"
                                />
                                <ContentHeader
                                    title="Keputusan Temuduga"
                                    borderClass="border-none"
                                />
                                <!-- <CustomTextField
                                    label="Tarikh Temuduga"
                                    id="interviewDate"
                                    type="date"
                                    bind:val={$updateMeetingResultForm.interviewDate}
                                    errors={$updateMeetingResultError.interviewDate}
                                />
                                <CustomSelectField
                                    label="Pusat Temuduga"
                                    id="interviewCenter"
                                    options={data.lookup.placementLookup}
                                    bind:val={$updateMeetingResultForm.interviewCenter}
                                    errors={$updateMeetingResultError.interviewCenter}
                                />
                                <CustomTextField
                                    label="Nama Panel"
                                    id="panelName"
                                    type="text"
                                    bind:val={$updateMeetingResultForm.panelName}
                                    errors={$updateMeetingResultError.panelName}
                                /> -->
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                    >
                        {#if detailOpen}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => (detailOpen = false)}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updatePromotionMeetingResultForm"
                            />
                        {:else}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updatePromotionMeetingForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !detailOpen}
                            {#if data.actingType === 'Gred 1-54'}
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                                    id="updatePromotionMeetingForm"
                                    method="POST"
                                    use:updatePromotionMeetingEnhance
                                >
                                    <CustomSelectField
                                        label="Nama Mesyuarat"
                                        id="meetingName"
                                        options={data.lookup.meetingNameLookup}
                                        bind:val={$updatePromotionMeetingForm.meetingName}
                                        errors={$updatePromotionMeetingError.meetingName}
                                    />
                                    <CustomTextField
                                        label="Tarikh Mesyuarat"
                                        id="meetingDate"
                                        type="date"
                                        bind:val={$updatePromotionMeetingForm.meetingDate}
                                        errors={$updatePromotionMeetingError.meetingDate}
                                    />
                                    <CustomSelectField
                                        label="Jawatan Pemangkuan"
                                        id="actingPosition"
                                        options={data.lookup.positionLookup}
                                        bind:val={$updatePromotionMeetingForm.actingPosition}
                                        errors={$updatePromotionMeetingError.actingPosition}
                                    />
                                    <CustomSelectField
                                        label="Gred Pemangkuan"
                                        id="actingGrade"
                                        options={data.lookup.gradeLookup}
                                        bind:val={$updatePromotionMeetingForm.actingGrade}
                                        errors={$updatePromotionMeetingError.actingGrade}
                                    />
                                </form>
                            {/if}

                            <div
                                class="flex w-full flex-col justify-start gap-2.5"
                            >
                                <div class="h-fit w-full p-3">
                                    <DataTable
                                        title=""
                                        bind:tableData={promotionMeetingResultTable}
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                1,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                                id="updatePromotionMeetingResultForm"
                                method="POST"
                                use:updatePromotionMeetingResultEnhance
                            >
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    bind:val={employeePromotionDetail.candidate
                                        .employeeNumber}
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    bind:val={employeePromotionDetail.candidate
                                        .employeeName}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="ICNumber"
                                    bind:val={employeePromotionDetail.candidate
                                        .ICNumber}
                                />
                                <ContentHeader
                                    title="Keputusan Mesyuarat"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                    label="Keputusan"
                                    id="meetingResult"
                                    errors={$updatePromotionMeetingResultError.meetingResult}
                                    bind:val={$updatePromotionMeetingResultForm.meetingResult}
                                    options={successOption}
                                />
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                    >
                        {#if detailOpen}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => {
                                    detailOpen = false;
                                }}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updateEmployeePlacementMeetingResultForm"
                            />
                        {:else}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updatePlacementMeeting"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !detailOpen}
                            <ContentHeader
                                title="Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                                id="updatePlacementMeeting"
                                use:updatePlacementMeetingEnhance
                                method="POST"
                            >
                                <CustomSelectField
                                    label="Nama Mesyuarat"
                                    id="meetingName"
                                    options={data.lookup.meetingNameLookup}
                                    bind:val={$updatePlacementMeeting.meetingName}
                                    errors={$updatePlacementMeetingError.meetingName}
                                />
                                <CustomTextField
                                    label="Tarikh Mesyuarat"
                                    id="meetingDate"
                                    type="date"
                                    bind:val={$updatePlacementMeeting.meetingDate}
                                    errors={$updatePlacementMeetingError.meetingDate}
                                />

                                <div
                                    class="flex w-full flex-col justify-start gap-2.5"
                                >
                                    <div class="h-fit w-full p-3">
                                        <DataTable
                                            title=""
                                            bind:tableData={placementTable}
                                            bind:passData={selectedCandidate}
                                            detailActions={() => {
                                                detailOpen = true;
                                            }}
                                        ></DataTable>
                                    </div>
                                </div>
                            </form>
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                id="updateEmployeePlacementMeetingResultForm"
                                method="POST"
                                use:updateEmployeePlacementMeetingResultEnhance
                            >
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled
                                    id="employeeNumber"
                                    bind:val={selectedCandidate.employeeNumber}
                                />
                                <CustomTextField
                                    label="Nama"
                                    disabled
                                    id="employeeName"
                                    bind:val={selectedCandidate.employeeName}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    disabled
                                    id="ICNumber"
                                    bind:val={selectedCandidate.ICNumber}
                                />
                                <ContentHeader
                                    title="Keputusan Mesyuarat"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                    label="Keputusan"
                                    id="meetingResult"
                                    options={successOption}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.meetingResult}
                                    errors={$updateEmployeePlacementMeetingResultError.meetingResult}
                                />
                                <CustomSelectField
                                    label="Penempatan Baru"
                                    id="newPlacement"
                                    options={data.lookup.placementLookup}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.newPlacement}
                                    errors={$updateEmployeePlacementMeetingResultError.newPlacement}
                                />
                                <CustomSelectField
                                    label="Pengarah Baru"
                                    id="newDirector"
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    bind:val={$updateEmployeePlacementMeetingResultForm.newDirector}
                                    errors={$updateEmployeePlacementMeetingResultError.newDirector}
                                />
                                <CustomTextField
                                    label="Tarikh Lapor Diri"
                                    id="reportDate"
                                    type="date"
                                    bind:val={$updateEmployeePlacementMeetingResultForm.reportDate}
                                    errors={$updateEmployeePlacementMeetingResultError.reportDate}
                                />
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
                    >
                        {#if detailOpen}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => {
                                    detailOpen = false;
                                }}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updatePostponeDetail"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !detailOpen}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                            >
                                <div class="h-fit w-full">
                                    <DataTable
                                        title=""
                                        bind:tableData={postponeTable}
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                2,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <ContentHeader
                                title="Maklum Balas Kakitangan"
                                borderClass="border-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                                id="updatePostponeDetail"
                                method="POST"
                                use:updatePostponeEnhance
                            >
                                <CustomTextField
                                    label="Kakitangan Memerlukan Penangguhan/Pindaan Penempatan?"
                                    disabled
                                    id="postponeNeeded"
                                    bind:val={employeePostponeDetail.postponeNeeded}
                                />
                                <ContentHeader
                                    title="Dokumen Sokongan"
                                    borderClass="border-none"
                                />
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2"
                                >
                                    {#if employeePostponeDetail.documents !== undefined}
                                        {#each employeePostponeDetail.documents as docs}
                                            <a
                                                href={docs.document}
                                                download={docs.name}
                                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                                >{docs.name}</a
                                            >
                                        {/each}
                                    {/if}
                                </div>
                                <div class="flex flex-row gap-2 pb-2.5">
                                    <span
                                        class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                                        >Sekiranya kakitangan memilih untuk
                                        tidak membuat Permohonan
                                        Penangguhan/Pindaan Penempatan sila
                                        terus ke langkah berikut:</span
                                    >
                                    <span
                                        class="text-sm italic text-ios-activeColors-activeBlue-light"
                                    >
                                        Kemaskini Keputusan Pemangkuan
                                    </span>
                                </div>
                                <span
                                    class="pb-2.5 text-sm italic text-ios-labelColors-secondaryLabel-light"
                                    >Sekiranya kakitangan memilih untuk membuat
                                    Permohonan Penangguhan/Pindaan Penempatan
                                    sila isi butiran penangguhan berikut
                                    mengikut surat penangguhan yang disediakan
                                    oleh kakitangan.</span
                                >
                                <ContentHeader
                                    title="Butiran Penangguhan/Pindaan Penempatan"
                                    borderClass="border-none"
                                />
                                {#if data.actingType === 'Gred 1-54'}
                                    <CustomTextField
                                        label="Tarikh Asal Lapor Diri"
                                        disabled
                                        id="initialReportDate"
                                        type="text"
                                        bind:val={employeePostponeDetail.initialReportDate}
                                    />
                                    <CustomTextField
                                        label="Penempatan Asal"
                                        disabled
                                        id="initialPlacement"
                                        type="text"
                                        bind:val={employeePostponeDetail.initialPlacement}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri Baru Dipohon"
                                        disabled
                                        id="requestedReportDate"
                                        type="text"
                                        bind:val={employeePostponeDetail.requestedReportDate}
                                    />
                                    <CustomTextField
                                        label="Pindaan Penempatan Dipohon"
                                        disabled
                                        id="requestedPlacement"
                                        type="text"
                                        bind:val={employeePostponeDetail.requestedPlacement}
                                    />
                                    <CustomSelectField
                                        label="Keputusan"
                                        id="meetingResult"
                                        errors={$updatePostponeError.meetingResult}
                                        bind:val={$updatePostponeDetail.meetingResult}
                                        options={successOption}
                                    />
                                    <CustomTextField
                                        label="Kelulusan Tarikh Lapor Diri Baru"
                                        id="newReportDateApproval"
                                        errors={$updatePostponeError.newReportDateApproval}
                                        type="date"
                                        bind:val={$updatePostponeDetail.newReportDateApproval}
                                    />
                                    <CustomSelectField
                                        label="Kelulusan Pindaan Penempatan Dipohon"
                                        id="placementApproval"
                                        errors={$updatePostponeError.placementApproval}
                                        bind:val={$updatePostponeDetail.placementApproval}
                                        options={data.lookup.placementLookup}
                                    />
                                    <!-- {:else}
                                    <CustomTextField
                                        label="Tarikh Asal Penempatan"
                                        id="originalPlacementDate"
                                        errors={$updatePostponeError.originalPlacementDate}
                                        type="text"
                                        bind:val={$updatePostponeDetail.originalPlacementDate}
                                    />
                                    <CustomTextField
                                        label="Tarikh Pertukaran Yang Dipohon"
                                        id="placementRequestedAmendmentDate"
                                        errors={$updatePostponeError.placementRequestedAmendmentDate}
                                        type="text"
                                        bind:val={$updatePostponeDetail.placementRequestedAmendmentDate}
                                    />
                                    <CustomTextField
                                        label="Alasan Penangguhan"
                                        id="placementAmendmentReason"
                                        errors={$updatePostponeError.placementAmendmentReason}
                                        type="text"
                                        bind:val={$updatePostponeDetail.placementAmendmentReason}
                                    />
                                    <CustomSelectField
                                        label="Nama Pelulus"
                                        id="approverName"
                                        errors={$updatePostponeError.approverName}
                                        options={data.lookup
                                            .supporterApproverLookup}
                                        val={$updatePostponeDetail.approverName}
                                    /> -->
                                {/if}
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                    />
                    <StepperContentBody>
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title=""
                                    bind:tableData={postponeResultTable}
                                ></DataTable>
                            </div>
                        </div>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Kemaskini Keputusan Pemangkuan"
                    >
                        {#if detailOpen}
                            <TextIconButton
                                label="Batal"
                                icon="block"
                                type="neutral"
                                onClick={() => {
                                    detailOpen = false;
                                }}
                            />
                            {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    type="primary"
                                    form="updateActingResultForm"
                                />
                            {:else if data.currentRoleCode === UserRoleConstant.penyokong.code}
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    type="primary"
                                    form="supporterResultForm"
                                />
                            {:else if data.currentRoleCode === UserRoleConstant.pelulus.code}
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    type="primary"
                                    form="approverResultForm"
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !detailOpen}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            >
                                <div class="h-fit w-full">
                                    <DataTable
                                        title=""
                                        bind:tableData={postponeResultTable}
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                3,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            >
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3 md:w-1/2"
                                    id="updateActingResultForm"
                                    method="POST"
                                    use:updateActingResultEnhance
                                >
                                    <ContentHeader
                                        title="Maklumat Calon"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="No. Pekerja"
                                        disabled
                                        id="employeeNumber"
                                        val={employeeActingResult.candidate
                                            ?.employeeNumber}
                                    />
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="employeeName"
                                        val={employeeActingResult.candidate
                                            ?.employeeName}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        disabled
                                        id="ICNumber"
                                        val={employeeActingResult.candidate
                                            ?.ICNumber}
                                    />
                                    <ContentHeader
                                        title="Butiran Pemangkuan"
                                        borderClass="border-none"
                                    />
                                    <span
                                        class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                        >Sekiranya tidak lulus, jawatan dan gred
                                        akan dikembalikan ke butiran asal.</span
                                    >
                                    <CustomSelectField
                                        label="Keputusan Pemangkuan"
                                        id="actingResult"
                                        bind:val={$updateActingResultForm.actingResult}
                                        errors={$updateActingResultError.actingResult}
                                        options={successOption}
                                    />
                                    <CustomSelectField
                                        label="Jawatan Pemangkuan"
                                        id="actingPosition"
                                        options={data.lookup.positionLookup}
                                        errors={$updateActingResultError.actingPosition}
                                        bind:val={$updateActingResultForm.actingPosition}
                                    />
                                    <CustomSelectField
                                        label="Gred Pemangkuan"
                                        id="actingGrade"
                                        options={data.lookup.gradeLookup}
                                        errors={$updateActingResultError.actingGrade}
                                        bind:val={$updateActingResultForm.actingGrade}
                                    />
                                    <CustomSelectField
                                        label="Penempatan Baru"
                                        id="newPlacement"
                                        options={data.lookup.placementLookup}
                                        errors={$updateActingResultError.newPlacement}
                                        bind:val={$updateActingResultForm.newPlacement}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri"
                                        id="reportDate"
                                        type="date"
                                        errors={$updateActingResultError.reportDate}
                                        bind:val={$updateActingResultForm.reportDate}
                                    />
                                    {#if Object.values(approverApproval).length < 1}
                                        <ContentHeader
                                            title="Pengesah Keputusan"
                                            borderClass="border-none"
                                        />
                                        <CustomSelectField
                                            label="Nama Penyokong"
                                            id="supporterName"
                                            bind:val={$updateActingResultForm.supporterName}
                                            errors={$updateActingResultError.supporterName}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                        />
                                        <CustomSelectField
                                            label="Nama Pelulus"
                                            id="approverName"
                                            bind:val={$updateActingResultForm.approverName}
                                            errors={$updateActingResultError.approverName}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                        />
                                    {/if}
                                </form>
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3 md:w-1/2"
                                    id="supporterResultForm"
                                    method="POST"
                                    use:supporterResultEnhance
                                >
                                    <ContentHeader
                                        title="Penyokong"
                                        borderClass="border-none"
                                    />
                                    {#if Object.values(supporterApproval).length > 0}
                                        <CustomSelectField
                                            label="Nama Penyokong"
                                            id="supporterName"
                                            disabled
                                            bind:val={$updateActingResultForm.supporterName}
                                            errors={$updateActingResultError.supporterName}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                        />

                                        <CustomTextField
                                            label="Tindakan/Ulasan"
                                            id="supportedRemark"
                                            disabled
                                            bind:val={supporterApproval.supportedRemark}
                                        />
                                        <CustomTextField
                                            label="Keputusan"
                                            id="supportedStatus"
                                            disabled
                                            bind:val={supporterApproval.supportedStatus}
                                        />
                                        <CustomTextField
                                            label="Tarikh Disokong"
                                            id="supportedDate"
                                            disabled
                                            bind:val={supporterApproval.supportedDate}
                                        />
                                    {:else}
                                        <CustomTextField
                                            label="Tindakan/Ulasan"
                                            id="remark"
                                            errors={$supporterResultError.remark}
                                            bind:val={$supporterResultForm.remark}
                                        />
                                        <CustomRadioBoolean
                                            id="status"
                                            label="Keputusan"
                                            disabled={false}
                                            bind:val={$supporterResultForm.status}
                                            errors={$supporterResultError.status}
                                            options={supportOptions}
                                        />
                                    {/if}
                                </form>
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3 md:w-1/2"
                                    id="approverResultForm"
                                    method="POST"
                                    use:approverResultEnhance
                                >
                                    <ContentHeader
                                        title="Pelulus"
                                        borderClass="border-none"
                                    />
                                    {#if Object.values(approverApproval).length > 0}
                                        <CustomSelectField
                                            label="Nama Pelulus"
                                            id="approverName"
                                            disabled
                                            bind:val={$updateActingResultForm.approverName}
                                            errors={$updateActingResultError.approverName}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                        />
                                        <CustomTextField
                                            label="Tindakan/Ulasan"
                                            id="approvedRemark"
                                            disabled
                                            bind:val={approverApproval.approvedRemark}
                                        />
                                        <CustomTextField
                                            label="Keputusan"
                                            id="approvedStatus"
                                            disabled
                                            bind:val={approverApproval.approvedStatus}
                                        />
                                        <CustomTextField
                                            label="Tarikh Diluluskan"
                                            id="approvedDate"
                                            disabled
                                            bind:val={approverApproval.approvedDate}
                                        />
                                    {:else}
                                        <CustomTextField
                                            label="Tindakan/Ulasan"
                                            id="remark"
                                            type="text"
                                            bind:val={$approverResultForm.remark}
                                            errors={$approverResultError.remark}
                                        />
                                        <CustomRadioBoolean
                                            id="approverResult"
                                            label="status"
                                            disabled={false}
                                            bind:val={$approverResultForm.status}
                                            errors={$approverResultError.status}
                                            options={approveOptions}
                                        />
                                    {/if}
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode === secretaryRoleCode}
                    <StepperContent>
                        <StepperContentHeader
                            title="Semak Pengesahan Keputusan Pemangkuan"
                        >
                            {#if !detailOpen}
                                <TextIconButton
                                    label="Selesai"
                                    icon="check"
                                    type="primary"
                                    onClick={() =>
                                        goto('/perjawatan/pemangkuan')}
                                />
                            {:else}
                                <TextIconButton
                                    label="Kembali"
                                    icon="cancel"
                                    type="neutral"
                                    onClick={() => (detailOpen = false)}
                                />
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            >
                                {#if !detailOpen}
                                    <div
                                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                    >
                                        <div class="h-fit w-full">
                                            <DataTable
                                                title=""
                                                bind:tableData={actingConfirmationTable}
                                                bind:passData={selectedCandidate}
                                                detailActions={async () => {
                                                    await getTableInformation(
                                                        4,
                                                    ).finally(
                                                        () =>
                                                            (detailOpen = true),
                                                    );
                                                }}
                                            ></DataTable>
                                        </div>
                                    </div>
                                {:else}
                                    <ContentHeader
                                        title="Maklumat Calon"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="No. Pekerja"
                                        disabled
                                        id="employeeNumber"
                                        val={employeeActingConfirmation
                                            .candidate?.employeeNumber}
                                    />
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="employeeName"
                                        val={employeeActingConfirmation
                                            .candidate?.employeeName}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        disabled
                                        id="ICNumber"
                                        val={employeeActingConfirmation
                                            .candidate?.ICNumber}
                                    />
                                    <ContentHeader
                                        title="Butiran Pemangkuan"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Nama Jawatan Baru"
                                        disabled
                                        id="newPosition"
                                        val={employeeActingConfirmation
                                            .actingDetail?.newPosition}
                                    />
                                    <CustomTextField
                                        label="Gred Baru"
                                        disabled
                                        id="newGrade"
                                        val={employeeActingConfirmation
                                            .actingDetail?.newGrade}
                                    />
                                    <CustomTextField
                                        label="Penempatan Baru"
                                        disabled
                                        id="newPlacement"
                                        val={employeeActingConfirmation
                                            .actingDetail?.newPlacement}
                                    />
                                    <CustomTextField
                                        label="Pengarah Baru"
                                        disabled
                                        id="newDirector"
                                        val={employeeActingConfirmation
                                            .actingDetail?.newDirector}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri"
                                        disabled
                                        id="reportDate"
                                        val={employeeActingConfirmation
                                            .actingDetail?.reportDate}
                                    />
                                    <ContentHeader
                                        title="Pengesah Keputusan"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Nama Penyokong"
                                        disabled
                                        id="supporterName"
                                        val={employeeActingConfirmation
                                            .confirmation?.supporterName}
                                    />
                                    <CustomTextField
                                        label="Keputusan"
                                        disabled
                                        id="supporterResult"
                                        val={employeeActingConfirmation
                                            .confirmation?.supporterResult}
                                    />
                                    <CustomTextField
                                        label="Nama Pelulus"
                                        disabled
                                        id="approverName"
                                        val={employeeActingConfirmation
                                            .confirmation?.approverName}
                                    />
                                    <CustomTextField
                                        label="Keputusan"
                                        disabled
                                        id="approverResult"
                                        val={employeeActingConfirmation
                                            .confirmation?.approverResult}
                                    />
                                {/if}
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
            <!-- For kakitangan only -->
        {:else if data.currentRoleCode === employeeRoleCode}
            <StepperContent>
                <StepperContentHeader title="Panggilan Temuduga">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 p-3">
                        <ContentHeader
                            title="Butiran Temuduga"
                            borderClass="border-none"
                        />
                        <DownloadAttachment
                            label="Surat Panggilan Temuduga"
                            fileName="surat_panggilan_temuduga_irfan.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Borang Perakuan Pendidikan"
                            fileName="borang_perakuan_pendidikan.pdf"
                            triggerDownload={() => {}}
                        />
                        <DownloadAttachment
                            label="Dokumen Tambahan"
                            fileName="dokumen_tambahan.pdf"
                            triggerDownload={() => {}}
                        />
                        <div
                            class="flex flex-col pb-2.5 text-sm italic text-ios-labelColors-secondaryLabel-light"
                        >
                            <span
                                >Tahniah! Anda berjaya dipanggil untuk temuduga.</span
                            >
                            <span>
                                Sila hadirkan diri ke temuduga mengikut butiran
                                temuduga seperti yang tertera di atas.
                            </span>
                            <span
                                >Sila bawa dokumen yang berkaitan ke temuduga
                                tersebut.</span
                            >
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 p-3 pb-10">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            placeholder=""
                            disabled
                            id="grade"
                            val={data.employeeMeetingDetail.grade}
                        />
                        <CustomTextField
                            label="Jawatan"
                            placeholder=""
                            disabled
                            id="position"
                            val={data.employeeMeetingDetail.position}
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            placeholder=""
                            disabled
                            id="date"
                            val={data.employeeMeetingDetail.date}
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            placeholder=""
                            disabled
                            id="newPlacement"
                            val={data.employeeMeetingDetail.newPlacement}
                        />

                        <ContentHeader
                            title="Dokumen-dokumen yang perlu dimuat turun dan diisi"
                            borderClass="border-none"
                        />
                        {#each data.employeeMeetingDetail.document as docs}
                            <a
                                href={docs.document}
                                target="_blank"
                                download={docs.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{docs.name}</a
                            >
                        {/each}
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        icon="check"
                        form="employeeNeedPlacementAmendmentForm"
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col gap-2.5 p-3 pb-10"
                        id="employeeNeedPlacementAmendmentForm"
                        method="POST"
                        use:employeeNeedPlacementAmendmentEnhance
                    >
                        <ContentHeader
                            title="Permohonan Penangguhan/Pindaan Penempatan"
                            borderClass="border-none"
                        />
                        <CustomSelectField
                            label="Adakah anda memerlukan penangguhan/pindaan penempatan?"
                            id="postponeNeeded"
                            options={dropdownCommonOption}
                            bind:val={$employeeNeedPlacementAmendmentForm.postponeNeeded}
                            errors={$employeeNeedPlacementAmendmentError.postponeNeeded}
                        />
                        {#if $employeeNeedPlacementAmendmentForm.postponeNeeded}
                            <CustomTextField
                                label="Tarikh Lapor Diri yang Dipohon"
                                id="requestedReportDate"
                                type="date"
                                bind:val={$employeeNeedPlacementAmendmentForm.requestedReportDate}
                                errors={$employeeNeedPlacementAmendmentError.requestedReportDate}
                            />
                            <CustomSelectField
                                label="Pindaan Penempatan Dipohon"
                                id="requestedPlacement"
                                errors={$employeeNeedPlacementAmendmentError.requestedPlacement}
                                bind:val={$employeeNeedPlacementAmendmentForm.requestedPlacement}
                                options={data.lookup.placementLookup}
                            />
                            <CustomTextField
                                label="Sebab-sebab penangguhan/pindaan"
                                id="postponeReason"
                                bind:val={$employeeNeedPlacementAmendmentForm.postponeReason}
                                errors={$employeeNeedPlacementAmendmentError.postponeReason}
                            />
                            <ContentHeader
                                title="Dokumen-Dokumen yang Berkaitan"
                                borderClass="border-none"
                            />
                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    label="Dokumen Sokongan"
                                    id="postponeDocs"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 p-3 pb-10">
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Keputusan"
                            disabled
                            placeholder=""
                            id="meetingResult"
                            val={data.employeePostponeResult.meetingResult}
                        />
                        <CustomTextField
                            label="Kelulusan Pindaan Penempatan Dipohon"
                            disabled
                            placeholder=""
                            id="postponeApproval"
                            val={data.employeePostponeResult.postponeApproval}
                        />
                        <CustomTextField
                            label="Kelulusan Tarikh Lapor Diri Baru"
                            disabled
                            placeholder=""
                            id="newReportDate"
                            val={data.employeePostponeResult.newReportDate}
                        />
                        <DownloadAttachment
                            label="Surat Penangguhan Rayuan"
                            fileName="surat_kelulusan_penangguhan_rayuan.pdf"
                            triggerDownload={() => {}}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Akhir Pemangkuan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        onClick={() => {
                            goto('/perjawatan/pemangkuan');
                        }}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 p-3 pb-10">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="grade"
                            val={data.employeeFinalResult?.grade}
                        />
                        <CustomTextField
                            label="Jawatan"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="position"
                            val={data.employeeFinalResult?.position}
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="meetingDate"
                            val={data.employeeFinalResult?.meetingDate}
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="newPlacement"
                            val={data.employeeFinalResult?.newPlacement}
                        />
                        <CustomTextField
                            label="Pengarah Baru"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="newDirector"
                            val={data.employeeFinalResult?.newDirector}
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="reportingDate"
                            val={data.employeeFinalResult?.reportDutyDate}
                        />
                        <ContentHeader
                            title="Pengesahan Keputusan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Nama Penyokong"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="supporterName"
                            val={data.employeeFinalResult?.supporter}
                        />
                        <!-- <CustomTextField
                            label="Keputusan"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="supporterResult"
                            val={data.employeeFinalResult?.}
                            /> -->
                        <CustomTextField
                            label="Nama Pelulus"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="approverName"
                            val={data.employeeFinalResult?.approver}
                        />
                        <!-- <CustomTextField
                            label="Keputusan"
                            disabled
                            placeholder="Menunggu keputusan daripada pihak berkaitan.."
                            id="approverResult"
                            val={data.employeeFinalResult?.}
                            /> -->
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >Tahniah! Anda boleh menyemak perubahan pada gaji
                            dan buku rekod perkhidmatan anda. Sila hubungi Urus
                            Setia berkenaan jika ada sebarang pertanyaan
                            mengenai perubahan tersebut.</span
                        >
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
