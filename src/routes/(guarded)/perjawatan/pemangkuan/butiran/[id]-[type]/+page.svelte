<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
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
        _submitIntegrityResultForm,
        _submitCertifySelectedForm,
        _submitMainMeetingResult,
        _mainActing,
        _submitMainMeetingDetail,
        _submitMainSupporter,
        _submitMainApprover,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { superForm } from 'sveltekit-superforms/client';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        _updateMeetingDetailSchema,
        _updatePromotionMeetingResultSchema,
        _updateEmployeePlacementMeetingResultSchema,
        _updateActingResultSchema,
        _mainUpdatePromotionMeetingResultSchema,
        _mainUpdatePromotionMeetingResultDetailSchema,
        _placementAmendmentApplication,
        _updateChosenCandidate,
        _updateMeetingResult,
        _updatePromotionDetail,
        _actingApprovalSchema,
        _postponeDetailSchema,
        _certifySelected,
        _mainMeetingResult,
        _mainMeetingDetail,
    } from '$lib/schemas/mypsm/employment/acting/acting-schemas';
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
        ActingFinalApproval,
    } from '$lib/dto/mypsm/employment/acting/acting-approval.dto';
    import type { QuarterCommonApproval } from '$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto';
    import type {
        MainActingDetail,
        MainActingInfo,
    } from '$lib/dto/mypsm/employment/acting/main-acting-info.dto';
    import { _quarterCommonApproval } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import Alert from 'flowbite-svelte/Alert.svelte';


    function uploadDocument(stepper: number) {
        if (
            files == undefined &&
            $employeeNeedPlacementAmendmentForm.postponeNeeded
        ) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    if (stepper == 2) {
                        $employeeNeedPlacementAmendmentForm.documents = result;
                    } else if (stepper == 1) {
                        $updateMeetingDetailForm.documents = result;
                    }
                })
                .finally(() => {
                    if (stepper == 1) {
                        _submitUpdateMeetingDetailForm(
                            $updateMeetingDetailForm,
                        ).then((res) => {
                            if(res?.response.status == 'success'){
                                meetingDetailExist = true;
                            }
                        });
                    } else if (stepper == 2) {
                        _submitEmployeeNeedPlacementAmendmentForm(
                            $employeeNeedPlacementAmendmentForm,
                        );
                    }
                })
                .catch((error) => {
                    throw new Error(error);
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
    let checkPhaseTwo: boolean = true;
    let meetingDetailExist: boolean = true;
    let allMarked: boolean = false;
    let suppAppExist: boolean = true;
    let supporterApproved: boolean = true;
    let approverApproved: boolean = true;
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
        hiddenColumn: ['employeeId','actingId'],
        dictionary: [
            {
                english: 'programme',
                malay: 'Program'
            }
        ],
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
        dictionary: [
            {
                english: 'programme',
                malay: 'Program'
            }
        ],
        url: 'employment/acting/chosen_employee_lists/list',
        id: 'updatedChosenEmployeeTable',
        option: {
            checkbox: data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code ? false : true,
            detail: data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code ? true : false,
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
        dictionary: [
            {
                english: 'selectionResult',
                malay: 'Keputusan Pemilihan'
            },
            {
                english: 'programme',
                malay: 'Program'
            }
        ],
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
    $: interviewInfoTable.data = data.interviewInfo;
    if(interviewInfoTable.data.length < 1 && data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code){
        checkPhaseTwo = false;
    } else if (data.currentRoleCode == UserRoleConstant.urusSetiaIntegriti.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code){
        checkPhaseTwo = false;
    }
    let interviewResultTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
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
        dictionary: [
            {
                english: 'marks',
                malay: 'Markah Temuduga'
            },
            {
                english: 'secretariatStatus',
                malay: 'Urus Setia'
            },
            {
                english: 'directorStatus',
                malay: 'Pengarah Bahagian/Negeri'
            }
        ],
        url: 'employment/acting/interview_result_marks/list',
        id: 'interviewResultTable',
        option: {
            checkbox: allMarked,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    $:interviewResultTable.data = data.interviewResult;
    $: allMarked = data.interviewResult.every((item) => item.marks !== null)
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
    $:promotionMeetingResultTable.data = data.promotionMeetingResult;
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
        dictionary: [
            {
                english: 'promotionMeetingResult',
                malay: 'Keputusan Mesyuarat Kenaikan Pangkat'
            },
            {
                english: 'placementMeetingResult',
                malay: 'Keputusan Mesyuarat Penempatan'
            }
        ],
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
    $: placementTable.data = data.placementDetail;
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
        dictionary: [
            {
                english: 'programme',
                malay: 'Program'
            },
            {
                english: 'postponeApplication',
                malay: 'Permohonan Penangguhan/Pindaan'
            }
        ],
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
        dictionary: [
            {
                english: 'postponeApplication',
                malay: 'Permohonan Penangguhan/Pindaan'
            },
            {
                english: 'postponeResult',
                malay: 'Keputusan Penangguhan/Pindaan'
            },
            {
                english: 'programme',
                malay: 'Program'
            }
        ],
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
        dictionary: [
            {
                english: 'actingGrade',
                malay: 'Gred Pemangkuan'
            },
            {
                english: 'actingResult',
                malay: 'Keputusan Pemangkuan'
            }
        ],
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
        dictionary: [
            {
                english: 'propertyDeclaration',
                malay: 'Pengisytiharan Harta'
            },
            {
                english: 'certificateOfIntegrity',
                malay: 'Perakuan Urus Setia Integriti'
            }
        ],
        url: 'employment/acting/mains/certifications/list',
        id: 'mainCertification',
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
        dictionary: [
            {
                english: 'promotionMeetingResult',
                malay: 'Keputusan Mesyuarat Kenaikan Pangkat'
            },
        ],
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
    let mainActingInfoTable: TableSettingDTO = {
        param: data.chosenEmployeeParam,
        meta: data.mainActingInfoResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.mainActingInfo,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['actingId'],
        dictionary: [
            {
                english: 'acceptingLetter',
                malay: 'Surat Setuju Terima'
            },
            {
                english: 'reportingForm',
                malay: 'Borang Lapor Diri'
            },
            {
                english: 'handoverNote',
                malay: 'Nota Serah Tugas'
            },
            {
                english: 'actingResult',
                malay: 'Keputusan Pemangkuan'
            },
        ],
        url: 'employment/acting/mains/acting_infos/list',
        id: 'mainActingInfoTable',
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
            _submitUpdateChosenCandidateForm($updateChosenCandidateForm).then((res) => {
                if(res?.response.status == 'success'){
                    checkPhaseTwo = true;
                }
            });
        },
    });
    let directorApproved: boolean = true;
    let integrityApproved: boolean = true;
    const {
        form: directorResultForm,
        errors: directorResultError,
        enhance: directorResultEnhance,
    } = superForm(data.directorResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'directorResultForm',
        validators: zod(_actingApprovalSchema),
        onSubmit() {
            $directorResultForm.id = selectedCandidate.actingId;
            _submitDirectorResultForm($directorResultForm).then((res) => {
                if(res?.response.status == 'success'){
                    directorApproved = true;
                }
            });
        },
    });
    const {
        form: integrityResultForm,
        errors: integrityResultError,
        enhance: integrityResultEnhance,
    } = superForm(data.integrityResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'integrityResultForm',
        validators: zod(_actingApprovalSchema),
        onSubmit() {
            $integrityResultForm.id = selectedCandidate.actingId;
            _submitIntegrityResultForm($integrityResultForm).then((res) => {
                if(res?.response.status == 'success'){
                    integrityApproved = true;
                }
            });
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
            uploadDocument(1);
        },
    });
    if($updateMeetingDetailForm.interviewTime == undefined){
        meetingDetailExist = false;
    }
    const {
        form: updateMeetingResultForm,
        errors: updateMeetingResultError,
        enhance: updateMeetingResultEnhance,
    } = superForm(data.updateMeetingResultForm, {
        SPA: true,
        resetForm: true,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingResultForm',
        validators: zod(_updateMeetingResult),
        onSubmit() {
            
            interviewResultTable.selectedData.forEach((val:any) => {
                $updateMeetingResultForm.actingIds.push(Number(val?.actingId))
            });
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
            // if()
            _submitUpdateActingResultForm($updateActingResultForm).then((res) => {
                if(res?.response.status == 'success'){
                    suppAppExist = true;
                }
            });
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
        form: mainMeetingResultForm,
        errors: mainMeetingResultError,
        enhance: mainMeetingResultEnhance,
    } = superForm(data.mainMeetingResultForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'updateMeetingDetailForm',
        validators: zod(_mainMeetingResult),
        onSubmit() {
            $mainMeetingResultForm.id = selectedCandidate.actingId;
            _submitMainMeetingResult($mainMeetingResultForm);
        },
    });

    const {
        form: certifySelected,
        errors: certifySelectedError,
        enhance: certifySelectedEnhance,
    } = superForm(data.certifySelected, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'certifySelected',
        validators: zod(_certifySelected),
        onSubmit() {
            mainCertification.selectedData.forEach((val) => {
                let tempVal = val as ActingChosenEmployee;
                $certifySelected.id.push(tempVal.actingId);
            });
           
            _submitCertifySelectedForm($certifySelected);
        },
    });

    const {
        form: mainMeetingDetailForm,
        errors: mainMeetingDetailError,
        enhance: mainMeetingDetailEnhance,
    } = superForm(data.mainMeetingDetailForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'mainMeetingDetailForm',
        validators: zod(_mainMeetingDetail),
        onSubmit() {
            $mainMeetingDetailForm.id = selectedMainActingInfo.actingId;
            _submitMainMeetingDetail($mainMeetingDetailForm);
        },
    });
    const {
        form: mainSupporterApproval,
        errors: mainSupporterApprovalError,
        enhance: mainSupporterApprovalEnhance,
    } = superForm(data.mainSupporterApproval, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'mainSupporterApproval',
        validators: zod(_quarterCommonApproval),
        onSubmit() {
            $mainSupporterApproval.id = selectedMainActingInfo.actingId;
            _submitMainSupporter($mainSupporterApproval);
        },
    });
    const {
        form: mainApproverApproval,
        errors: mainApproverApprovalError,
        enhance: mainApproverApprovalEnhance,
    } = superForm(data.mainApproverApproval, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'mainApproverApproval',
        validators: zod(_quarterCommonApproval),
        onSubmit() {
            $mainApproverApproval.id = selectedMainActingInfo.actingId;
            _submitMainApprover($mainApproverApproval);
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
            $employeeNeedPlacementAmendmentForm.id = data.batchId.batchId;
            if (!$employeeNeedPlacementAmendmentForm.postponeNeeded) {
                $employeeNeedPlacementAmendmentForm.postponeReason = null;
                $employeeNeedPlacementAmendmentForm.requestedPlacement = null;
                $employeeNeedPlacementAmendmentForm.requestedReportDate = null;
                $employeeNeedPlacementAmendmentForm.documents = null;
            }
            uploadDocument(2);
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

    let supporterApproval = {} as ActingFinalApproval;
    let approverApproval = {} as ActingFinalApproval;
    let mainPromotionDetail = {} as MainPromotionMeeting;
    let selectedMainActingInfo: MainActingInfo;
    let mainActingInfoDetail = {} as MainActingDetail;
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
                        if(employeePostponeDetail?.initialReportDate !== null){
                            $updatePostponeDetail.meetingResult = employeePostponeDetail?.meetingResult;
                            $updatePostponeDetail.newReportDutyDate = employeePostponeDetail?.newReportDutyDate;
                            $updatePostponeDetail.newPlacement = employeePostponeDetail?.newPlacement;
                        }
                    });
                break;
            }
            case 3: {
                _actingResult(selectedCandidate.actingId)
                    .then((res) => {
                        employeeActingResult = res.response.data
                            ?.details as ActingResult;

                            _supportApproval(selectedCandidate.actingId).then((res) => {
                    supporterApproval = res.response.data
                        ?.details as ActingFinalApproval;

                        _approverApproval(selectedCandidate.actingId).then((res) => {
                    approverApproval = res.response.data
                        ?.details as ActingFinalApproval;
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
                        $updateActingResultForm.supporterName = employeeActingResult.confirmation?.supporterName;
                        $updateActingResultForm.approverName = employeeActingResult.confirmation?.approverName;
                        
                        if($updateActingResultForm.approverName === "Tiada Maklumat"){
                            suppAppExist = false;
                        }
                            //supporter
                            if (supporterApproval.remark !== null){
                                $supporterResultForm.remark = supporterApproval.remark;
                                $supporterResultForm.status = supporterApproval.status;
                            } else if(supporterApproval.remark == null && data.currentRoleCode == UserRoleConstant.penyokong.code){
                                supporterApproved = false;
                            }
                            //approver
                            if (approverApproval.remark !== null){
                                $approverResultForm.remark = approverApproval.remark;
                                $approverResultForm.status = approverApproval.status;
                            } else if(approverApproval.remark == null && data.currentRoleCode == UserRoleConstant.pelulus.code){

                            }
                    })
                    .catch((e) => {throw new Error(e)});      
                });
                
                });
                break;
            }
            case 4: {
                _actingConfirmation(selectedCandidate.actingId).then((res) => {
                    employeeActingConfirmation = res.response.data
                        ?.details as ActingConfirmationDetail;
                });
                break;
            }
            case 5: {
                _mainPromotion(selectedCandidate.actingId)
                    .then((res) => {
                        mainPromotionDetail = res.response.data
                            ?.details as MainPromotionMeeting;
                    })
                    .finally(() => {
                        if (
                            mainPromotionDetail.promotionMeetingResult !== null
                        ) {
                            $mainMeetingResultForm.status =
                                mainPromotionDetail.promotionMeetingResult;
                        }
                    });
                break;
            }
            case 6: {
                _directorApproval(selectedCandidate.actingId).then((res) => {
                    $directorResultForm = res.response.data
                        ?.details as QuarterCommonApproval;
                    if ($directorResultForm.remark == null && (data.currentRoleCode == UserRoleConstant.pengarahBahagian.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)) {
                        directorApproved = false;
                    } else {
                        directorApproved = true;
                    }
                    $integrityResultForm = res.integrityResponse.data
                        ?.details as QuarterCommonApproval;
                    if ($integrityResultForm.remark == null && data.currentRoleCode == UserRoleConstant.urusSetiaIntegriti.code) {
                        integrityApproved = false;
                    } else {
                        integrityApproved = true;
                    }
                });
                break;
            }
            case 7: {
                await _mainActing(selectedMainActingInfo.actingId)
                    .then((res) => {
                        mainActingInfoDetail = res.response.data
                            ?.details as MainActingDetail;
                    })
                    .finally(() => {
                        $mainMeetingDetailForm.actingGrade =
                            mainActingInfoDetail?.actingDetails?.actingGrade;
                        $mainMeetingDetailForm.actingPosition =
                            mainActingInfoDetail?.actingDetails?.actingPosition;
                        $mainMeetingDetailForm.newPlacement =
                            mainActingInfoDetail?.actingDetails?.newPlacement;
                        $mainMeetingDetailForm.reportDate =
                            mainActingInfoDetail?.actingDetails?.reportDate;
                        $mainMeetingDetailForm.approverName =
                            mainActingInfoDetail?.supporterApprover?.approverName;
                        $mainMeetingDetailForm.supporterName =
                            mainActingInfoDetail?.supporterApprover?.supporterName;
                        $mainSupporterApproval.remark =
                            mainActingInfoDetail?.supporter?.remark;
                        $mainSupporterApproval.status =
                            mainActingInfoDetail?.supporter?.status;
                        $mainApproverApproval.remark =
                            mainActingInfoDetail?.approver?.remark;
                        $mainApproverApproval.status =
                            mainActingInfoDetail?.approver?.status;
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
        {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code && data.actingType === 'Utama'}
            <StepperContent>
                <StepperContentHeader title="Perakuan Pemangkuan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex h-full w-full flex-col gap-2.5 px-2">
                        <ContentHeader
                            title="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                            borderClass="border-none"
                        />
                        <div class="flex w-full items-start justify-start">
                            <TextIconButton
                                label="PERAKU"
                                icon="check"
                                form="certifySelected"
                            />
                        </div>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            use:certifySelectedEnhance
                            method="POST"
                            id="certifySelected"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title=""
                                    bind:tableData={mainCertification}
                                ></DataTable>
                            </div>
                        </form>
                    </div>
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
                            form="mainMeetingResultForm"
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
                            id="mainMeetingResultForm"
                            method="POST"
                            use:mainMeetingResultEnhance
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
                                id="status"
                                label="Keputusan"
                                disabled={false}
                                bind:val={$mainMeetingResultForm.status}
                                errors={$mainMeetingResultError.status}
                                options={approveOptions}
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
                        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="mainMeetingDetailForm"
                            />
                        {:else if data.currentRoleCode === UserRoleConstant.penyokong.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="mainSupporterApproval"
                            />
                        {:else if data.currentRoleCode === UserRoleConstant.pelulus.code}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="mainApproverApproval"
                            />
                        {/if}
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Kakitangan"
                                    bind:tableData={mainActingInfoTable}
                                    bind:passData={selectedMainActingInfo}
                                    detailActions={async () => {
                                        await getTableInformation(7).finally(
                                            () => (detailOpen = true),
                                        );
                                    }}
                                ></DataTable>
                            </div>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                            id="mainMeetingDetailForm"
                            method="POST"
                            use:mainMeetingDetailEnhance
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                disabled
                                id="employeeNumber"
                                val={mainActingInfoDetail?.employeeDetails
                                    ?.employeeNumber}
                            />
                            <CustomTextField
                                label="Nama"
                                disabled
                                id="employeeName"
                                val={mainActingInfoDetail?.employeeDetails
                                    ?.employeeName}
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                id="ICNumber"
                                val={mainActingInfoDetail?.employeeDetails
                                    ?.ICNumber}
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
                                errors={$mainMeetingDetailError.actingPosition}
                                bind:val={$mainMeetingDetailForm.actingPosition}
                            />
                            <CustomSelectField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                options={data.lookup.gradeLookup}
                                errors={$mainMeetingDetailError.actingGrade}
                                bind:val={$mainMeetingDetailForm.actingGrade}
                            />
                            <CustomSelectField
                                label="Penempatan Baru"
                                id="newPlacement"
                                options={data.lookup.placementLookup}
                                errors={$mainMeetingDetailError.newPlacement}
                                bind:val={$mainMeetingDetailForm.newPlacement}
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportDate"
                                type="date"
                                errors={$mainMeetingDetailError.reportDate}
                                bind:val={$mainMeetingDetailForm.reportDate}
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Penyokong"
                                id="supporterName"
                                errors={$mainMeetingDetailError.supporterName}
                                bind:val={$mainMeetingDetailForm.supporterName}
                                options={data.lookup.supporterApproverLookup}
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id="mainSupporterApproval"
                                method="POST"
                                use:mainSupporterApprovalEnhance
                            >
                                <CustomTextField
                                    label="Ulasan"
                                    id="remark"
                                    bind:val={$mainSupporterApproval.remark}
                                    errors={$mainSupporterApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="status"
                                    options={supportOptions}
                                    disabled={false}
                                    bind:val={$mainSupporterApproval.status}
                                    errors={$mainSupporterApprovalError.status}
                                />
                            </form>
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="approverName"
                                errors={$mainMeetingDetailError.approverName}
                                bind:val={$mainMeetingDetailForm.approverName}
                                options={data.lookup.supporterApproverLookup}
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id="mainApproverApproval"
                                method="POST"
                                use:mainApproverApprovalEnhance
                            >
                                <CustomTextField
                                    label="Ulasan"
                                    id="remark"
                                    bind:val={$mainApproverApproval.remark}
                                    errors={$mainApproverApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="status"
                                    disabled={false}
                                    options={approveOptions}
                                    bind:val={$mainApproverApproval.status}
                                    errors={$mainApproverApprovalError.status}
                                />
                            </form>
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            <!-- End Of For Gred Utama (New) Only -->

            <!-- All involved role except for kakitangan -->
        {:else if data.currentRoleCode !== UserRoleConstant.kakitangan.code && data.actingType !== 'Utama'}
            <!-- Views will vary based on roles -->
            <StepperContent>
                <StepperContentHeader
                    title="Senarai Kakitangan Yang Terpilih"
                />
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                    >
                        <div class="h-fit w-full">
                            <DataTable
                                title="Senarai Kakitangan Dipilih"
                                bind:tableData={chosenEmployeeTable}
                            ></DataTable>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            {#if !checkPhaseTwo}
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
                >
                    {#if detailOpen && data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code}
                    <TextIconButton
                        label="Kembali"
                        icon="previous"
                        type="neutral"
                        onClick={() => (detailOpen = false)}
                    />
                    {#if !directorApproved && (data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form="directorResultForm"
                        />
                    {/if}
                    {#if !integrityApproved && data.currentRoleCode === UserRoleConstant.urusSetiaIntegriti.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            form="integrityResultForm"
                        />
                    {/if}
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.urusSetiaIntegriti.code}
                        {#if !detailOpen}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            >
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Kakitangan Dipilih"
                                        bind:tableData={updatedChosenEmployeeTable}
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                6,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                                id="integrityResultForm"
                                method="POST"
                                use:integrityResultEnhance
                            >
                                <ContentHeader
                                    title="Urus Setia Integriti"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="remark"
                                    placeholder="Menunggu keputusan daripada Urus Setia Integriti..."
                                    disabled={integrityApproved}
                                    bind:val={$integrityResultForm.remark}
                                    errors={$integrityResultError.remark}
                                />
                                <CustomRadioBoolean
                                    id="status"
                                    label="Keputusan"
                                    disabled={integrityApproved}
                                    options={confirmOptions}
                                    bind:val={$integrityResultForm.status}
                                    errors={$integrityResultError.status}
                                />
                            </form>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                                id="directorResultForm"
                                method="POST"
                                use:directorResultEnhance
                            >
                                <ContentHeader
                                    title="Pengarah Bahagian/Negeri"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    id="remark"
                                    placeholder="Menunggu keputusan daripada Pengarah Bahagian/Negeri..."
                                    disabled={directorApproved}
                                    errors={$directorResultError.remark}
                                    bind:val={$directorResultForm.remark}
                                />
                                <CustomRadioBoolean
                                    id="status"
                                    label="Keputusan"
                                    disabled={directorApproved}
                                    bind:val={$directorResultForm.status}
                                    errors={$directorResultError.status}
                                    options={confirmOptions}
                                />
                            </form>
                        {/if}
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
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
                                        bind:passData={selectedCandidate}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                6,
                                            ).finally(
                                                () => (detailOpen = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            {/if}
            {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code && data.currentRoleCode !== UserRoleConstant.urusSetiaIntegriti.code}
                <StepperContent>
                    <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                        {#if !meetingDetailExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="updateMeetingDetailForm"
                        />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
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
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.meetingName}
                                options={data.lookup.meetingNameLookup}
                                bind:val={$updateMeetingDetailForm.meetingName}
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.meetingDate}
                                type="date"
                                bind:val={$updateMeetingDetailForm.meetingDate}
                            />
                            <CustomSelectField
                                label="Gred"
                                id="grade"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.grade}
                                options={data.lookup.gradeLookup}
                                bind:val={$updateMeetingDetailForm.grade}
                            />
                            <CustomSelectField
                                label="Jawatan"
                                id="position"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.position}
                                options={data.lookup.positionLookup}
                                bind:val={$updateMeetingDetailForm.position}
                            />
                            <CustomTextField
                                label="Tarikh Temuduga"
                                id="interviewDate"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.interviewDate}
                                bind:val={$updateMeetingDetailForm.interviewDate}
                                type="date"
                            />
                            <CustomTextField
                                label="Masa Temuduga"
                                id="interviewTime"
                                disabled={meetingDetailExist}
                                placeholder="Contoh: 10.00pagi - 11.00pagi"
                                errors={$updateMeetingDetailErrors.interviewTime}
                                type="text"
                                bind:val={$updateMeetingDetailForm.interviewTime}
                            />
                            <CustomSelectField
                                label="Negeri"
                                id="state"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.state}
                                options={data.lookup.stateLookup}
                                bind:val={$updateMeetingDetailForm.state}
                            />
                            <CustomSelectField
                                label="Pusat Temuduga"
                                id="placement"
                                disabled={meetingDetailExist}
                                errors={$updateMeetingDetailErrors.placement}
                                bind:val={$updateMeetingDetailForm.placement}
                                options={data.lookup.placementLookup}
                            />
                            {#if $updateMeetingDetailForm.interviewTime == undefined}
                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    label="Dokumen Sokongan"
                                    id="postponeDocs"
                                    bind:files
                                ></CustomFileField>
                            </div>
                            {/if}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <div class="h-fit w-full p-3">
                                    <DataTable
                                        title="Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                        bind:tableData={interviewInfoTable}
                                    ></DataTable>
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                        {#if !allMarked}
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="updateMeetingResultForm"
                            />
                            {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            id="updateMeetingResultForm"
                            method="POST"
                            use:updateMeetingResultEnhance
                        >
                        {#if !allMarked}
                                <ContentHeader
                                    title="Maklumat Markah Keseluruhan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Markah Keseluruhan"
                                    id="marks"
                                    type="number"
                                    disabled={allMarked}
                                    placeholder=""
                                    bind:val={$updateMeetingResultForm.marks}
                                    errors={$updateMeetingResultError.marks}
                                />

                                <ContentHeader
                                    title="Tindakan: Tetapkan markah temuduga untuk semua kakitangan berkaitan."
                                    borderClass="border-none"
                                />
                                {/if}
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                >
                                    <div class="h-fit w-full p-3">
                                        <DataTable
                                            title="Keputusan Temuduga Untuk Calon Terpilih"
                                            bind:tableData={interviewResultTable}
                                        ></DataTable>
                                    </div>
                                </div>
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
                                    val={employeePostponeDetail?.postponeNeeded}
                                />
                                <ContentHeader
                                    title="Dokumen Sokongan"
                                    borderClass="border-none"
                                />
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2"
                                >
                                    {#if employeePostponeDetail?.documents !== null}
                                        {#each employeePostponeDetail?.documents as docs}
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
                                    <CustomTextField
                                        label="Tarikh Asal Lapor Diri"
                                        disabled
                                        id="initialReportDate"
                                        type="date"
                                        val={employeePostponeDetail?.initialReportDate}
                                    />
                                    <CustomTextField
                                        label="Penempatan Asal"
                                        disabled
                                        id="initialPlacement"
                                        type="text"
                                        val={employeePostponeDetail?.initialPlacement}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri Baru Dipohon"
                                        disabled
                                        id="requestedReportDate"
                                        type="date"
                                        val={employeePostponeDetail?.requestedReportDate}
                                    />
                                    <CustomTextField
                                        label="Pindaan Penempatan Dipohon"
                                        disabled
                                        id="requestedPlacement"
                                        type="text"
                                        val={employeePostponeDetail?.requestedPlacement}
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
                                        id="newReportDutyDate"
                                        errors={$updatePostponeError.newReportDutyDate}
                                        type="date"
                                        bind:val={$updatePostponeDetail.newReportDutyDate}
                                    />
                                    <CustomSelectField
                                        label="Kelulusan Pindaan Penempatan Dipohon"
                                        id="newPlacement"
                                        errors={$updatePostponeError.newPlacement}
                                        bind:val={$updatePostponeDetail.newPlacement}
                                        options={data.lookup.placementLookup}
                                    />
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
                            {#if !suppAppExist && data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    type="primary"
                                    form="updateActingResultForm"
                                />
                            {:else if !supporterApproved && data.currentRoleCode === UserRoleConstant.penyokong.code}
                                <TextIconButton
                                    label="Simpan"
                                    icon="check"
                                    type="primary"
                                    form="supporterResultForm"
                                />
                            {:else if !approverApproved && data.currentRoleCode === UserRoleConstant.pelulus.code}
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
                                        disabled={suppAppExist}
                                        bind:val={$updateActingResultForm.actingResult}
                                        errors={$updateActingResultError.actingResult}
                                        options={successOption}
                                    />
                                    {#if $updateActingResultForm.actingResult == "Berjaya"}
                                    <CustomSelectField
                                        label="Jawatan Pemangkuan"
                                        id="actingPosition"
                                        disabled={suppAppExist}
                                        options={data.lookup.positionLookup}
                                        errors={$updateActingResultError.actingPosition}
                                        bind:val={$updateActingResultForm.actingPosition}
                                    />
                                    <CustomSelectField
                                        label="Gred Pemangkuan"
                                        id="actingGrade"
                                        disabled={suppAppExist}
                                        options={data.lookup.gradeLookup}
                                        errors={$updateActingResultError.actingGrade}
                                        bind:val={$updateActingResultForm.actingGrade}
                                    />
                                    <CustomSelectField
                                        label="Penempatan Baru"
                                        id="newPlacement"
                                        disabled={suppAppExist}
                                        options={data.lookup.placementLookup}
                                        errors={$updateActingResultError.newPlacement}
                                        bind:val={$updateActingResultForm.newPlacement}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lapor Diri"
                                        id="reportDate"
                                        type="date"
                                        disabled={suppAppExist}
                                        errors={$updateActingResultError.reportDate}
                                        bind:val={$updateActingResultForm.reportDate}
                                    />
                                    {#if !suppAppExist}
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
                                    {/if}
                                </form>
                                {#if $updateActingResultForm.actingResult == "Berjaya"}
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
                                            id="remark"
                                            disabled={supporterApproved}
                                            placeholder="Menunggu keputusan daripada pelulus..."
                                            errors={$supporterResultError.remark}
                                            bind:val={$supporterResultForm.remark}
                                        />
                                        <CustomRadioBoolean
                                            id="status"
                                            label="Keputusan"
                                            disabled={supporterApproved}
                                            bind:val={$supporterResultForm.status}
                                            errors={$supporterResultError.status}
                                            options={supportOptions}
                                        />
                                        <CustomTextField
                                            label="Tarikh Disokong"
                                            id="supportedDate"
                                            disabled
                                            placeholder="Menunggu keputusan daripada penyokong..."
                                            bind:val={supporterApproval.supportedDate}
                                        />
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
                                            id="remark"
                                            disabled={approverApproved}
                                            placeholder="Menunggu keputusan daripada pelulus..."
                                            bind:val={$approverResultForm.remark}
                                            errors={$approverResultError.remark}
                                        />
                                        <CustomRadioBoolean
                                            id="approverResult"
                                            label="Keputusan"
                                            disabled={approverApproved}
                                            bind:val={$approverResultForm.status}
                                            errors={$approverResultError.status}
                                            options={approveOptions}
                                        />
                                        <CustomTextField
                                            label="Tarikh Diluluskan"
                                            id="approvedDate"
                                            disabled
                                            placeholder="Menunggu keputusan daripada pelulus..."
                                            bind:val={approverApproval.approvedDate}
                                        />
                                        
                                </form>
                                {/if}
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
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
        {:else if data.currentRoleCode === UserRoleConstant.kakitangan.code}
            <StepperContent>
                <StepperContentHeader title="Panggilan Temuduga"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5 p-3">
                        <ContentHeader
                            title="Butiran Temuduga"
                            borderClass="border-none"
                        />

                        {#if data.employeeInterviewDetail.document !== null}
                            {#each data.employeeInterviewDetail.document as docs}
                                <a
                                    href={docs.document}
                                    download={docs.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{docs.name}</a
                                >
                            {/each}
                        {/if}
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
                        {#if data.employeeMeetingDetail.document !== undefined}
                            {#each data.employeeMeetingDetail.document as docs}
                                <a
                                    href={docs.document}
                                    target="_blank"
                                    download={docs.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{docs.name}</a
                                >
                            {/each}
                        {/if}
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
                        <!-- <DownloadAttachment
                            label="Surat Penangguhan Rayuan"
                            fileName="surat_kelulusan_penangguhan_rayuan.pdf"
                            triggerDownload={() => {}}
                        /> -->
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
                        {#if data.employeeFinalResult?.approver !== "Tiada Maklumat"}
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
                        {:else}
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat! </span>
                                Menunggu keputusan daripada pihak berkaitan.
                            </p>
                        </Alert>
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
