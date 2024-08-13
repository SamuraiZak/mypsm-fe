<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { Modal } from 'flowbite-svelte';
    import {
        _getCertifications,
        _getPlacementDetail,
        _getPromotionDetail,
        _submitAddNewPromotion,
        _submitApproverApproval,
        _submitCertification,
        _submitDirectorForm,
        _submitDocumentForm,
        _submitEmployeePromotion,
        _submitIntegrityForm,
        _submitPlacement,
        _submitSupporterApproval,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type {
        PromotionCertificationEmployee,
        PromotionCertificationResult,
        PromotionCommonEmployee,
        PromotionDetail,
        PromotionPlacement,
        PromotionPlacementDetail,
        PromotionProcessDetail,
        PromotionSalaryAdjustment,
        PromotionSalaryAdjustmentDetail,
    } from '$lib/dto/mypsm/employment/promotion/promotion-common-employee.dto';
    import { superForm } from 'sveltekit-superforms/client';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _addNewPromotion,
        _documentsSchema,
        _editEmployeePromotion,
        _editPromotionCertification,
        _editPromotionPlacement,
        _promotionCommonApproval,
        _promotionIntegrityApproval,
        _uploadDocumentsSchema,
    } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
    import { Toaster } from 'svelte-french-toast';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveOptions,
        confirmOptions,
        integrityOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { kgtMonthValueIsStringLookup } from '$lib/constants/core/dropdown.constant';
    import type { PromotionCertificationGet } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import SvgArrowDownTray from '$lib/assets/svg/SvgArrowDownTray.svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { writable } from 'svelte/store';

    //stepper control
    let stepperControl: boolean[] = [false, false, false, false, false];

    //view control
    let directorApproved: boolean = true;
    let integrityApproved: boolean = true;
    let promotionMeetingExist: boolean = true;
    let placementMeetingExist: boolean = true;
    let employeePromotionExist: boolean = true;
    let supporterApproved: boolean = true;
    let approverApproved: boolean = true;
    let confirmModal: boolean = false;

    let confirmationStaffDocumentIsReadonly = writable<boolean>(false);
    let confirmationStaffDocumentIsDraft = writable<boolean>(false);

    let employeeListTable: TableSettingDTO = {
        param: data.param,
        meta: data.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeList,
        selectedData: [] as PromotionCommonEmployee[],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [
            {
                english: 'programme',
                malay: 'Program',
            },
            {
                english: 'name',
                malay: 'Nama Kakitangan',
            },
            {
                english: 'actingStartDate',
                malay: 'Tarikh Pemangkuan',
            },
        ],
        url: 'employee/acting',
        id: 'employeeListTable',
        option: {
            checkbox:
                data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code ||
                data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code
                    ? true
                    : false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    let selectedEmployeeList: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: employeeListTable.selectedData,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [
            {
                english: 'programme',
                malay: 'Program',
            },
            {
                english: 'name',
                malay: 'Nama Kakitangan',
            },
            {
                english: 'actingStartDate',
                malay: 'Tarikh Pemangkuan',
            },
        ],
        url: '',
        id: 'selectedEmployeeList',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };

    $: data.employeeDocumentInfo.isReadonly === true
        ? confirmationStaffDocumentIsReadonly.set(true)
        : confirmationStaffDocumentIsReadonly.set(false);
    $: data.employeeDocumentInfo.isDraft === true
        ? confirmationStaffDocumentIsDraft.set(true)
        : confirmationStaffDocumentIsDraft.set(false);
    $: selectedEmployeeList.data = employeeListTable.selectedData ?? [];
    $: selectedEmployeeList.meta.totalData =
        employeeListTable.selectedData.length;

    const {
        form: addnewPromotionForm,
        errors: addnewPromotionError,
        enhance: addnewPromotionEnhance,
    } = superForm(data.addnewPromotionForm, {
        SPA: true,
        resetForm: true,
        dataType: 'json',
        invalidateAll: true,
        id: 'addnewPromotionForm',
        validators: zod(_addNewPromotion),
        async onSubmit() {
            let tempGroupId: number;
            let tempObj: PromotionCommonEmployee[] =
                selectedEmployeeList.data as PromotionCommonEmployee[];
            tempObj.forEach((val) => {
                $addnewPromotionForm.employeeIds.push(val.employeeId);
            });
            $addnewPromotionForm.promotionType = data.promotionType;

            if ($addnewPromotionForm.employeeIds.length < 1) {
                alert(
                    'Sila tambah senarai calon untuk pengesahan kenaikan pangkat terlebih dahulu.',
                );
            } else {
                await _submitAddNewPromotion($addnewPromotionForm).then(
                    async (res) => {
                        if (res?.response?.status == 'success') {
                            tempGroupId = res.response.data?.details.groupId;
                            confirmModal = false;
                            await goto('/v2/employment/promotion');
                        }
                    },
                );
            }
        },
    });

    let controlIntegrity: boolean = false;
    let certificationTable: TableSettingDTO = {
        param: data.commonParam,
        meta: data.certificationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.certificationList,
        selectedData: [] as PromotionCertificationEmployee[],
        exportData: [],
        hiddenColumn: [
            'employeeId',
            'promotionId',
            data.promotionType == 'Utama' ? 'directionCertification' : '',
        ],
        dictionary: [
            {
                english: 'integrityCertification',
                malay: 'Pengesahan Urus Setia Integriti',
            },
            {
                english: 'directionCertification',
                malay: 'Perakuan Pengarah Bahagian/Negeri',
            },
        ],
        url: 'employment/promotion/certifications/list',
        id: 'certificationTable',
        option: {
            checkbox:
                data.currentRoleCode == UserRoleConstant.urusSetiaIntegriti.code
                    ? true
                    : false,
            detail:
                data.currentRoleCode !==
                    UserRoleConstant.urusSetiaIntegriti.code &&
                data.promotionType !== 'Utama'
                    ? true
                    : false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };

    $: controlIntegrity = data.certificationList.every(
        (item) => item.integrityCertification !== 'Sedang diproses',
    );
    $: certificationTable.option.checkbox = !controlIntegrity;

    let promotionmeetingTable: TableSettingDTO = {
        param: data.commonParam,
        meta: data.promotionMeetingListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.promotionMeetingList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'promotionId'],
        dictionary: [
            {
                english: 'integrityCertification',
                malay: 'Pengesahan Urus Setia Integriti',
            },
            {
                english: 'directionCertification',
                malay: 'Perakuan Pengarah Bahagian/Negeri',
            },
        ],
        url: 'employment/promotion/promotion_meetings/list',
        id: 'certificationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };
    $: promotionmeetingTable.data = data.promotionMeetingList;

    let promotionTable: TableSettingDTO = {
        param: data.commonParam,
        meta: data.placementListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.placementList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'promotionId'],
        dictionary: [
            {
                english: 'gradeNo',
                malay: 'Gred',
            },
            {
                english: 'positionNo',
                malay: 'Jawatan',
            },
        ],
        url: 'employment/promotion/placement_meetings/list',
        id: 'certificationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };
    $: promotionTable.data = data.placementList;

    let promotionEmployee: TableSettingDTO = {
        param: data.commonParam,
        meta: data.promotionDetailResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.promotionDetail,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['promotionId'],
        dictionary: [
            {
                english: 'secretariatCertification',
                malay: 'Pengesahan Urus Setia',
            },
        ],
        url: 'employment/promotion/employee_promotions/list',
        id: 'promotionEmployee',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };
    $: promotionEmployee.data = data.promotionDetail;

    let promotionFinalResult: TableSettingDTO = {
        param: data.commonParam,
        meta: data.finalResultResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.finalResult,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['promotionId'],
        dictionary: [
            {
                english: 'secretariatCertification',
                malay: 'Pengesahan Urus Setia',
            },
        ],
        url: 'employment/promotion/final_result/list',
        id: 'promotionEmployee',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };
    $: promotionFinalResult.data = data.finalResult;

    const {
        form: certificationForm,
        errors: certificationError,
        enhance: certificationEnhance,
    } = superForm(data.certificationForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'certificationForm',
        validators: zod(_editPromotionCertification),
        onSubmit() {
            $certificationForm.promotionType = data.promotionType;
            $certificationForm.id = employeeCertification.promotionId;
            if ($certificationForm.meetingResult) {
                $certificationForm.actingEndDate = '';
                $certificationForm.gradeRevertDate = '';
                $certificationForm.newPlacement = '';
            } else if (!$certificationForm.meetingResult) {
                $certificationForm.confirmedDate = '';
            }
            _submitCertification($certificationForm).then((res) => {
                if (res?.response.status == 'success') {
                    promotionMeetingExist = true;
                }
            });
        },
    });
    const {
        form: directorForm,
        errors: directorError,
        enhance: directorEnhance,
    } = superForm(data.directorForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'directorForm',
        validators: zod(_promotionCommonApproval),
        onSubmit() {
            $directorForm.promotionType = data.promotionType;
            $directorForm.id = rowData.promotionId;
            _submitDirectorForm($directorForm).then((res) => {
                if (res?.response.status == 'success') {
                    directorApproved = true;
                }
            });
        },
    });

    let integrityModal: boolean = false;
    const {
        form: integrityForm,
        errors: integrityError,
        enhance: integrityEnhance,
    } = superForm(data.integrityForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'integrityForm',
        validators: zod(_promotionIntegrityApproval),
        onSubmit() {
            $integrityForm.promotionType = data.promotionType;
            // ======================= push the id here
            certificationTable.selectedData.map((item: any) => {
                $integrityForm.id.push(item.promotionId);
            });

            _submitIntegrityForm($integrityForm).then((res) => {
                if (res?.response.status == 'success') {
                    certificationTable.data = data.certificationList;
                    integrityApproved = true;
                    integrityModal = false;
                }
            });
        },
    });
    const {
        form: placementForm,
        errors: placementError,
        enhance: placementEnhance,
    } = superForm(data.placementForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'placementForm',
        validators: zod(_editPromotionPlacement),
        onSubmit() {
            _submitPlacement($placementForm).then((res) => {
                if (res?.response.status == 'success') {
                    placementMeetingExist = true;
                }
            });
        },
    });
    const {
        form: employeePromotion,
        errors: employeePromotionError,
        enhance: employeePromotionEnhance,
    } = superForm(data.employeePromotion, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'employeePromotion',
        validators: zod(_editEmployeePromotion),
        onSubmit() {
            $employeePromotion.id = finalPromotionRowData.promotionId;
            if (!$employeePromotion.status) {
                $employeePromotion.supporterName = null;
                $employeePromotion.approverName = null;
                $employeePromotion.remark = 'Tidak Lulus';
            }
            _submitEmployeePromotion($employeePromotion).then((res) => {
                if (res?.response.status == 'success') {
                    employeePromotionExist = true;
                }
            });
        },
    });
    const {
        form: supporterApproval,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
    } = superForm(data.supporterApproval, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'supporterApproval',
        validators: zod(_promotionCommonApproval),
        onSubmit() {
            $supporterApproval.promotionType = data.promotionType;
            $supporterApproval.id = finalPromotionRowData.promotionId;
            _submitSupporterApproval($supporterApproval).then((res) => {
                if (res?.response.status == 'successs') {
                    supporterApproved = true;
                }
            });
        },
    });
    const {
        form: approverApproval,
        errors: approverApprovalError,
        enhance: approverApprovalEnhance,
    } = superForm(data.approverApproval, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'approverApproval',
        validators: zod(_promotionCommonApproval),
        onSubmit() {
            $approverApproval.promotionType = data.promotionType;
            $approverApproval.id = finalPromotionRowData.promotionId;
            _submitApproverApproval($approverApproval).then((res) => {
                if (res?.response.status == 'success') {
                    approverApproved = true;
                }
            });
        },
    });

    let currentEmployeeDetail: PromotionPlacementDetail;
    let rowData: PromotionPlacement;
    let finalPromotionRowData: PromotionDetail;
    let certificationResult = {} as PromotionCertificationResult;
    let salaryAdjustmentDetail: PromotionSalaryAdjustmentDetail;
    let salaryAdjustment: PromotionSalaryAdjustment[] = [];
    let salaryAdjustmentResponse: CommonResponseDTO = {};
    let salaryAdjustmentParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 0,
        filter: {
            employeeId: 0,
        },
    };
    $: salaryAdjustmentParam.filter.employeeId = rowData?.employeeId;
    let processDetail: PromotionProcessDetail;
    const getTableInformation = async (index: number) => {
        let requestedDetail: PromotionCertificationGet = {
            id:
                index == 2
                    ? finalPromotionRowData.promotionId
                    : rowData.promotionId,
            promotionType: data.promotionType,
        };
        switch (index) {
            case 1: {
                _getPlacementDetail(requestedDetail, salaryAdjustmentParam)
                    .then((res) => {
                        currentEmployeeDetail = res.response.data
                            ?.details as PromotionPlacementDetail;
                        salaryAdjustmentDetail = res.salaryDetail.data
                            ?.details as PromotionSalaryAdjustmentDetail;
                        salaryAdjustmentResponse = res.tableResponse;
                        $directorForm = res.directorResponse.data?.details;
                        $integrityForm = res.integrityResponse.data?.details;
                        if (
                            $directorForm.status == null &&
                            (data.currentRoleCode ==
                                UserRoleConstant.pengarahBahagian.code ||
                                data.currentRoleCode ==
                                    UserRoleConstant.pengarahNegeri.code)
                        ) {
                            directorApproved = false;
                        }
                        if (
                            $integrityForm.status == null &&
                            data.currentRoleCode ==
                                UserRoleConstant.urusSetiaIntegriti.code
                        ) {
                            integrityApproved = false;
                        }
                    })
                    .finally(() => {
                        $placementForm.promotionType = data.promotionType;
                        $placementForm.id = rowData.promotionId;
                        if (Object.keys(currentEmployeeDetail).length > 0) {
                            $placementForm.promotionDate =
                                currentEmployeeDetail.promotionDate;
                            $placementForm.salaryMovementMonth =
                                currentEmployeeDetail.salaryMovementMonth;
                            $placementForm.newPlacement =
                                currentEmployeeDetail.newPlacement;
                            $placementForm.newGrade =
                                currentEmployeeDetail.newGrade;
                        }
                        if ($placementForm.promotionDate == null) {
                            placementMeetingExist = false;
                        } else {
                            placementMeetingExist = true;
                        }
                        salaryAdjustment = salaryAdjustmentResponse.data
                            ?.dataList as PromotionSalaryAdjustment[];
                        //for get director & integrity approval
                    });
                break;
            }
            case 2: {
                _getPromotionDetail(requestedDetail)
                    .then((res) => {
                        processDetail = res.response.data
                            ?.details as PromotionProcessDetail;

                        if (processDetail !== undefined) {
                            $employeePromotion.confirmedDate =
                                processDetail.confirmedDate;
                            $employeePromotion.approverName =
                                processDetail.approverName;
                            $employeePromotion.supporterName =
                                processDetail.supporterName;
                            $employeePromotion.status = processDetail.status;
                            $employeePromotion.remark = processDetail.remark;
                        }
                        if ($employeePromotion.status == null) {
                            employeePromotionExist = false;
                        } else {
                            employeePromotionExist = true;
                        }

                        $supporterApproval = res.suppResponse.data?.details;
                        $approverApproval = res.appResponse.data?.details;
                        if (
                            $supporterApproval.remark == '' &&
                            data.currentRoleCode ==
                                UserRoleConstant.kakitangan.code
                        ) {
                            supporterApproved = false;
                            approverApproved = true;
                        } else if (
                            supporterApproved &&
                            $approverApproval.remark == '' &&
                            data.currentRoleCode ==
                                UserRoleConstant.kakitangan.code
                        ) {
                            approverApproved = false;
                        }
                    })
                    .finally(() => {
                        $employeePromotion.id = processDetail.id;
                        $employeePromotion.promotionType = data.promotionType;

                        if (processDetail.status !== null) {
                            $employeePromotion.confirmedDate =
                                processDetail.confirmedDate;
                            $employeePromotion.supporterName =
                                processDetail.supporterName;
                            $employeePromotion.approverName =
                                processDetail.approverName;
                            $employeePromotion.status = processDetail.status;
                            $employeePromotion.remark = processDetail.remark;
                        }
                    });
                break;
            }
            case 3: {
                let requestedDetails: PromotionCertificationGet = {
                    id: employeeCertification.promotionId,
                    promotionType: data.promotionType,
                };

                _getCertifications(requestedDetails).then((res) => {
                    certificationResult = res.response.data
                        ?.details as PromotionCertificationResult;
                    if (
                        certificationResult.meetingRemarks == null &&
                        data.currentRoleCode ==
                            UserRoleConstant.urusSetiaPerjawatan.code
                    ) {
                        promotionMeetingExist = false;
                    }
                });
                break;
            }
        }
    };
    let employeeCertification: PromotionCertificationEmployee;
    let salaryAdjustTable: TableSettingDTO = {
        param: salaryAdjustmentParam,
        meta: salaryAdjustmentResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: salaryAdjustment,
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [],
        url: 'employment/promotion/placement_meeting_salary_adjustments/list',
        id: 'salaryAdjustTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
            footer: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };
    $: certificationTable.data = data.certificationList;
    $: {
        salaryAdjustTable.data = salaryAdjustment;
    }

    const { form: staffUploadedDocumentsForm } = superForm(
        data.staffDocumentForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const {
        form: promotionStaffUploadDocumentForm,
        errors: promotionStaffUploadDocumentError,
        enhance: promotionStaffUploadDocumentEnhance,
    } = superForm(data.promotionStaffUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        invalidateAll: true,
        id: 'documentUploadForm',
        validators: zod(_uploadDocumentsSchema),
        onSubmit() {
            _submitDocumentForm(
                data.employeeIdRequest,
                $promotionStaffUploadDocumentForm.isDraft,
                $promotionStaffUploadDocumentForm.document,
                $staffUploadedDocumentsForm.attachment,
            );
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        additionalFiles.forEach((file) => {
            $promotionStaffUploadDocumentForm.document = [
                ...$promotionStaffUploadDocumentForm.document,
                file,
            ];
        });
    };

    const handleDelete = (i: number) => {
        $promotionStaffUploadDocumentForm.document =
            $promotionStaffUploadDocumentForm.document.filter((_, index) => {
                return index !== i;
            });
    };
    const handleDeleteUploadedFile = (i: number) => {
        $staffUploadedDocumentsForm.attachment =
            $staffUploadedDocumentsForm.attachment.filter((_, index) => {
                return index !== i;
            });
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <StatusPill status={data.params.status} slot="status" />

    <ContentHeader title="Kenaikan Pangkat">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/v2/employment/promotion')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        {#if data.assignedRole}
            {#if data.isNewPromotion}
                <!-- ========================================================= -->
                <!-- PEMILIHAN CALON -->
                <!-- ========================================================= -->
                <StepperContent>
                    <StepperContentHeader
                        title="Pemilihan Calon Kenaikan Pangkat"
                    >
                        <TextIconButton
                            type="primary"
                            label="Tambah"
                            icon="add"
                            onClick={() => (confirmModal = true)}
                        />
                    </StepperContentHeader>
                    <StepperContentBody paddingClass="p-none">
                        <CustomTab>
                            <CustomTabContent
                                title="Senarai Nama Kakitangan Yang Memangku"
                            >
                                <form
                                    id="addnewPromotionForm"
                                    method="POST"
                                    use:addnewPromotionEnhance
                                ></form>
                                <div
                                    class="flex w-full flex-col gap-2.5 p-3 pb-10"
                                >
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Sila tekan butang tambah di sebelah kiri
                                            jadual untuk masukkan kakitangan ke dalam
                                            senarai calon kenaikan pangkat. Klik
                                            butang
                                            <span class="font-medium"
                                                >Hantar</span
                                            > setelah selesai.
                                        </p>
                                    </Alert>
                                    <div class="flex w-full">
                                        <div class="h-fit w-full">
                                            <DataTable
                                                title="{data.promotionType ===
                                                'TBK 1 dan 2'
                                                    ? 'Senarai Nama Kakitangan Yang Telah Berkhidmat 13 Tahun Ke-Atas'
                                                    : 'Senarai Nama Kakitangan Yang Memangku'} "
                                                bind:tableData={employeeListTable}
                                            >
                                                <FilterWrapper slot="filter">
                                                    <FilterTextField
                                                        label="No. Pekerja"
                                                        bind:inputValue={employeeListTable
                                                            .param.filter
                                                            .employeeNumber}
                                                    />
                                                    <FilterTextField
                                                        label="Nama Kakitangan"
                                                        bind:inputValue={employeeListTable
                                                            .param.filter.name}
                                                    />
                                                    <FilterTextField
                                                        label="No. Kad Pengenalan"
                                                        bind:inputValue={employeeListTable
                                                            .param.filter
                                                            .identityCard}
                                                    />
                                                    <FilterSelectField
                                                        label="Gred"
                                                        options={data.lookup
                                                            .gradeLookup}
                                                        bind:inputValue={employeeListTable
                                                            .param.filter.grade}
                                                    />
                                                </FilterWrapper>
                                            </DataTable>
                                        </div>
                                    </div>
                                </div>
                            </CustomTabContent>
                            <CustomTabContent
                                title="Senarai Calon Kenaikan Pangkat Dipilih"
                            >
                                <div class="flex w-full p-3 pb-10">
                                    <div class="h-fit w-full">
                                        <DataTable
                                            title="Senarai Calon Kenaikan Pangkat"
                                            bind:tableData={selectedEmployeeList}
                                        ></DataTable>
                                    </div>
                                </div>
                            </CustomTabContent>
                        </CustomTab>
                    </StepperContentBody>
                </StepperContent>
            {:else if !data.isNewPromotion}
                <!-- ========================================================= -->
                <!-- PERAKUAN -->
                <!-- ========================================================= -->
                <StepperContent>
                    <StepperContentHeader
                        title="Perakuan Senarai Calon Kenaikan Pangkat"
                    >
                        {#if stepperControl[0]}
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                icon="previous"
                                onClick={() => (stepperControl[0] = false)}
                            />
                            {#if !directorApproved}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    icon="check"
                                    form="directorForm"
                                    onClick={() => {
                                        $directorForm.isDraft = true;
                                    }}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
                                    form="directorForm"
                                    onClick={() => {
                                        $directorForm.isDraft = false;
                                    }}
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !stepperControl[0]}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                            >
                                <div class="flex w-full flex-col gap-2.5 pb-10">
                                    {#if data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code && data.currentRoleCode !== UserRoleConstant.kakitangan.code}
                                        <Alert color="blue">
                                            <p>
                                                <span class="font-medium"
                                                    >Arahan:
                                                </span>
                                                Sila kemaskini perakuan anda bagi
                                                setiap calon kenaikan pangkat yang
                                                terlibat.
                                            </p>
                                        </Alert>
                                    {/if}
                                    {#if !controlIntegrity && data.currentRoleCode === UserRoleConstant.urusSetiaIntegriti.code}
                                        <div class="flex w-full justify-end">
                                            <TextIconButton
                                                label="Tindakan"
                                                onClick={() =>
                                                    (integrityModal = true)}
                                            />
                                        </div>
                                    {/if}
                                    <div class="h-fit w-full">
                                        <DataTable
                                            title="Senarai Calon Kenaikan Pangkat"
                                            bind:tableData={certificationTable}
                                            bind:passData={rowData}
                                            detailActions={async () => {
                                                await getTableInformation(
                                                    1,
                                                ).finally(
                                                    () =>
                                                        (stepperControl[0] = true),
                                                );
                                            }}
                                        ></DataTable>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-2.5 pb-2.5">
                                {#if data.promotionType !== 'Utama'}
                                    <ContentHeader
                                        title="Perakuan Pengarah Bahagian/Negeri"
                                        borderClass="border-none"
                                    />
                                    <form
                                        class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
                                        id="directorForm"
                                        use:directorEnhance
                                        method="POST"
                                    >
                                        <CustomTextField
                                            label="Ulasan/Tindakan"
                                            isRequired={false}
                                            id="remark"
                                            disabled={directorApproved}
                                            placeholder="Menunggu perakuan daripada Pengarah Bahagian/Negeri..."
                                            bind:val={$directorForm.remark}
                                            errors={$directorError.remark}
                                        />
                                        <CustomRadioBoolean
                                            label="Keputusan"
                                            id="status"
                                            disabled={directorApproved}
                                            options={confirmOptions}
                                            bind:val={$directorForm.status}
                                        />
                                        {#if data.promotionType === 'TBK 1 dan 2'}
                                            <CustomTextField
                                                label="Markah"
                                                isRequired={false}
                                                id="marks"
                                                type="number"
                                                disabled={directorApproved}
                                                placeholder="Markah"
                                                bind:val={$directorForm.mark}
                                                errors={$directorError.mark}
                                            />
                                            <!-- Upload document section -->
                                        {/if}
                                    </form>
                                {/if}
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Mesyuarat Jawatankuasa"
                    >
                        {#if stepperControl[1]}
                            <TextIconButton
                                type="netural"
                                label="Kembali"
                                icon="previous"
                                onClick={() => (stepperControl[1] = false)}
                            />
                            {#if !promotionMeetingExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    icon="check"
                                    form="certificationForm"
                                    onClick={() => {
                                        $certificationForm.isDraft = true;
                                    }}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
                                    form="certificationForm"
                                    onClick={() => {
                                        $certificationForm.isDraft = false;
                                    }}
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !stepperControl[1]}
                            <div
                                class="flex w-full flex-col justify-center gap-2.5 p-3 pb-10"
                            >
                                {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Sila kemaskini Keputusan Mesyuarat Jawatankuasa
                                            bagi setiap calon kenaikan pangkat yang
                                            terlibat.
                                        </p>
                                    </Alert>
                                {/if}
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Kakitangan Terpilih"
                                        bind:tableData={promotionmeetingTable}
                                        bind:passData={employeeCertification}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                3,
                                            ).finally(
                                                () =>
                                                    (stepperControl[1] = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-2.5 pb-10">
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                    id="certificationForm"
                                    method="POST"
                                    use:certificationEnhance
                                >
                                    {#if certificationResult.meetingRemarks == null}
                                        <span
                                            class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                                        >
                                            Sekiranya kakitangan tidak lulus
                                            mesyuarat, proses akan berakhir
                                            untuk kakitangan tersebut.
                                        </span>
                                        <CustomSelectField
                                            label="Nama dan Bilangan Mesyuarat"
                                            id="meetingNameCount"
                                            disabled={promotionMeetingExist}
                                            options={data.lookup
                                                .meetingNameLookup}
                                            bind:val={$certificationForm.meetingNameCount}
                                        />
                                        <CustomTextField
                                            label="Tarikh Mesyuarat"
                                            id="meetingDate"
                                            type="date"
                                            disabled={promotionMeetingExist}
                                            bind:val={$certificationForm.meetingDate}
                                            errors={$certificationError.meetingDate}
                                        />
                                        <CustomTextField
                                            label="Tindakan/Ulasan Mesyuarat"
                                            id="meetingRemark"
                                            type="textarea"
                                            disabled={promotionMeetingExist}
                                            bind:val={$certificationForm.meetingRemark}
                                            errors={$certificationError.meetingRemark}
                                        />
                                        <CustomRadioBoolean
                                            label="Keputusan"
                                            id="meetingResult"
                                            disabled={promotionMeetingExist}
                                            options={approveOptions}
                                            bind:val={$certificationForm.meetingResult}
                                            errors={$certificationError.meetingResult}
                                        />

                                        {#if $certificationForm.meetingResult}
                                            <CustomTextField
                                                label="Tarikh Pengesahan Kenaikan Pangkat (Jika Lulus)"
                                                id="confirmedDate"
                                                type="date"
                                                disabled={promotionMeetingExist}
                                                bind:val={$certificationForm.confirmedDate}
                                                errors={$certificationError.confirmedDate}
                                            />
                                        {:else}
                                            <ContentHeader
                                                title="Penamatan Pemangkuan (Jika Mesyuarat Tidak Lulus)"
                                                borderClass="border-none"
                                            />
                                            <CustomTextField
                                                label="Tarikh Tamat Pemangkuan"
                                                id="actingEndDate"
                                                type="date"
                                                disabled={promotionMeetingExist}
                                                bind:val={$certificationForm.actingEndDate}
                                                errors={$certificationError.actingEndDate}
                                            />
                                            <CustomTextField
                                                label="Tarikh Kembali Ke Gred Asal"
                                                isRequired={false}
                                                id="gradeRevertDate"
                                                type="date"
                                                disabled={promotionMeetingExist}
                                                bind:val={$certificationForm.gradeRevertDate}
                                                errors={$certificationError.gradeRevertDate}
                                            />
                                            <CustomSelectField
                                                label="Penempatan Baru"
                                                id="newPlacement"
                                                disabled={promotionMeetingExist}
                                                options={data.lookup
                                                    .placementLookup}
                                                bind:val={$certificationForm.newPlacement}
                                                errors={$certificationError.newPlacement}
                                            />
                                            <CustomTextField
                                                label="Gaji Semasa"
                                                id="currentSalary"
                                                type="number"
                                                disabled={promotionMeetingExist}
                                                bind:val={$certificationForm.currentSalary}
                                                errors={$certificationError.currentSalary}
                                            />
                                            <CustomTextField
                                                label="Gaji Baharu"
                                                id="newSalary"
                                                type="number"
                                                disabled={promotionMeetingExist}
                                                bind:val={$certificationForm.newSalary}
                                                errors={$certificationError.newSalary}
                                            />
                                        {/if}
                                    {:else}
                                        <CustomSelectField
                                            label="Nama dan Bilangan Mesyuarat"
                                            id="meetingName"
                                            disabled
                                            options={data.lookup
                                                .meetingNameLookup}
                                            val={certificationResult?.meetingNameCount}
                                        />
                                        <CustomTextField
                                            label="Tarikh Mesyuarat"
                                            id="meetingDate"
                                            disabled
                                            type="date"
                                            val={certificationResult?.meetingDate}
                                        />
                                        <CustomTextField
                                            label="Tindakan/Ulasan Mesyuarat"
                                            id="meetingRemarks"
                                            disabled
                                            type="text"
                                            val={certificationResult?.meetingRemarks}
                                        />
                                        <CustomRadioBoolean
                                            label="Keputusan"
                                            id="meetingResult"
                                            disabled
                                            options={approveOptions}
                                            val={certificationResult?.meetingResult}
                                        />
                                        {#if certificationResult?.meetingResult}
                                            <CustomTextField
                                                label="Tarikh Pengesahan Kenaikan Pangkat (Jika Lulus)"
                                                id="confirmedDate"
                                                disabled
                                                type="date"
                                                val={certificationResult?.confirmedDate}
                                            />
                                        {:else}
                                            <ContentHeader
                                                title="Penamatan Pemangkuan (Jika Mesyuarat Tidak Lulus)"
                                                borderClass="border-none"
                                            />
                                            <CustomTextField
                                                label="Tarikh Tamat Pemangkuan"
                                                id="actingEndDate"
                                                disabled
                                                type="date"
                                                val={certificationResult?.actingEndDate}
                                            />
                                            <CustomTextField
                                                label="Tarikh Kembali Ke Gred Asal"
                                                id="gradeRevertDate"
                                                disabled
                                                type="date"
                                                val={certificationResult?.gradeRevertDate}
                                            />
                                            <CustomSelectField
                                                label="Penempatan Baru"
                                                id="newPlacement"
                                                disabled
                                                options={data.lookup
                                                    .placementLookup}
                                                val={certificationResult?.newPlacement}
                                            />
                                            <CustomTextField
                                                label="Gaji Semasa"
                                                id="currentSalary"
                                                disabled
                                                type="number"
                                                val={certificationResult?.currentSalary}
                                            />
                                            <CustomTextField
                                                label="Gaji Baharu"
                                                id="newSalary"
                                                disabled
                                                type="number"
                                                val={certificationResult?.newSalary}
                                            />
                                        {/if}
                                    {/if}
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Mesyuarat Penempatan Kakitangan"
                    >
                        {#if stepperControl[2]}
                            <TextIconButton
                                type="netural"
                                label="Kembali"
                                icon="previous"
                                onClick={() => (stepperControl[2] = false)}
                            />
                            {#if !placementMeetingExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    icon="check"
                                    form="placementForm"
                                    onClick={() => {
                                        $placementForm.isDraft = true;
                                    }}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
                                    form="placementForm"
                                    onClick={() => {
                                        $placementForm.isDraft = false;
                                    }}
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody paddingClass="p-none">
                        {#if !stepperControl[2]}
                            <div
                                class="flex w-full flex-col justify-center gap-2.5 p-3 pb-10"
                            >
                                {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Tetapkan untuk semua kakitangan berkaitan.
                                        </p>
                                    </Alert>
                                {/if}
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Calon Kakitangan Yang Dibawa Ke Mesyuarat Penempatan Kakitangan"
                                        bind:tableData={promotionTable}
                                        bind:passData={rowData}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                1,
                                            ).finally(
                                                () =>
                                                    (stepperControl[2] = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <CustomTab>
                                <CustomTabContent
                                    title="Butiran Kenaikan Pangkat Kakitangan"
                                >
                                    <ContentHeader
                                        title="Butiran Kenaikan Pangkat"
                                        borderClass="border-none"
                                    />
                                    <div
                                        class="flex w-full flex-col gap-2.5 pb-10"
                                    >
                                        <form
                                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
                                            id="placementForm"
                                            use:placementEnhance
                                            method="POST"
                                        >
                                            <CustomTextField
                                                label="No. Pekerja"
                                                id="employeeNumber"
                                                disabled
                                                isRequired={false}
                                                val={currentEmployeeDetail?.employeeNumber}
                                            />
                                            <CustomTextField
                                                label="Nama Kakitangan"
                                                id="employeeName"
                                                disabled
                                                isRequired={false}
                                                val={currentEmployeeDetail?.employeeName}
                                            />
                                            <CustomTextField
                                                label="Tarikh Kenaikan Pangkat"
                                                id="promotionDate"
                                                disabled={placementMeetingExist}
                                                type="date"
                                                bind:val={$placementForm.promotionDate}
                                                errors={$placementError.promotionDate}
                                            />
                                            <CustomSelectField
                                                label="Bulan Pergerakan Gaji Baru"
                                                id="salaryMovementMonth"
                                                disabled={placementMeetingExist}
                                                options={kgtMonthValueIsStringLookup}
                                                bind:val={$placementForm.salaryMovementMonth}
                                                errors={$placementError.salaryMovementMonth}
                                            />
                                            <CustomTextField
                                                label="Gaji Minimum - Gaji Maksimum (Gred Lama)"
                                                id="firstMinimumSalary"
                                                disabled
                                                isRequired={false}
                                                val={'RM ' +
                                                    currentEmployeeDetail?.firstMinimumSalary +
                                                    ' -  RM ' +
                                                    currentEmployeeDetail?.firstMaximumSalary}
                                            />
                                            <CustomTextField
                                                label="Kenaikan Gaji Tahunan (Gred Lama)"
                                                id="firstSalaryRaise"
                                                disabled
                                                isRequired={false}
                                                val={'RM ' +
                                                    currentEmployeeDetail?.firstSalaryRaise}
                                            />
                                            <CustomSelectField
                                                label="Gred Baru"
                                                id="newGrade"
                                                disabled={placementMeetingExist}
                                                options={data.lookup
                                                    .gradeLookup}
                                                bind:val={$placementForm.newGrade}
                                                errors={$placementError.newGrade}
                                            />
                                            <CustomTextField
                                                label="Gaji Minimum - Gaji Maksimum (Gred Baru)"
                                                id="minMaxSalaryNewGrade"
                                                placeholder=""
                                                disabled
                                                isRequired={false}
                                                val={currentEmployeeDetail?.secondMinimumSalary !==
                                                null
                                                    ? 'RM ' +
                                                      currentEmployeeDetail?.secondMinimumSalary +
                                                      ' - RM ' +
                                                      currentEmployeeDetail?.secondMaximumSalary
                                                    : ''}
                                            />
                                            <CustomTextField
                                                label="Kenaikan Gaji Tahunan (Gred Baru)"
                                                id="secondSalaryRaise"
                                                disabled
                                                isRequired={false}
                                                placeholder=""
                                                val={currentEmployeeDetail?.secondSalaryRaise !==
                                                null
                                                    ? 'RM ' +
                                                      currentEmployeeDetail?.secondSalaryRaise
                                                    : ''}
                                            />
                                            <CustomTextField
                                                label="Gaji Sekarang"
                                                disabled
                                                isRequired={false}
                                                id="currentSalary"
                                                val={currentEmployeeDetail?.currentSalary}
                                            />
                                            <CustomTextField
                                                label="Gaji Baru"
                                                disabled
                                                isRequired={false}
                                                id="newSalary"
                                                val={currentEmployeeDetail?.newSalary}
                                            />
                                            <CustomTextField
                                                label="Penempatan Sekarang"
                                                disabled
                                                isRequired={false}
                                                id="currentPlacement"
                                                val={currentEmployeeDetail?.currentPlacement}
                                            />
                                            <CustomSelectField
                                                label="Penempatan Baru"
                                                id="newPlacement"
                                                disabled={placementMeetingExist}
                                                options={data.lookup
                                                    .placementLookup}
                                                bind:val={$placementForm.newPlacement}
                                                errors={$placementError.newPlacement}
                                            />
                                        </form>
                                    </div>
                                </CustomTabContent>
                                <CustomTabContent
                                    title="Jadual Pelarasan Gaji Kakitangan"
                                >
                                    <div
                                        class="flex w-full flex-col gap-2.5 px-2.5 pb-10"
                                    >
                                        <form
                                            class="flex w-full flex-col justify-start gap-2.5 md:w-1/2"
                                        >
                                            <CustomTextField
                                                label="Tarikh Kuatkuasa"
                                                id="effectiveDate"
                                                placeholder=""
                                                disabled
                                                val={salaryAdjustmentDetail?.promotionDate}
                                            />
                                            <CustomTextField
                                                label="Gaji Sekarang (RM)"
                                                id="currentSalary"
                                                type="number"
                                                disabled
                                                val={salaryAdjustmentDetail?.currentSalary}
                                            />
                                            <CustomTextField
                                                label="Gaji Baru (RM)"
                                                id="newSalary"
                                                disabled
                                                placeholder=""
                                                type="number"
                                                val={salaryAdjustmentDetail?.newSalary}
                                            />
                                            <CustomTextField
                                                label="Catatan"
                                                placeholder=""
                                                id="remarks"
                                                disabled
                                                val={salaryAdjustmentDetail?.remarks}
                                            />
                                        </form>
                                        <div
                                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                        >
                                            <div class="h-fit w-full">
                                                <DataTable
                                                    title="Jadual Pelarasan Gaji"
                                                    bind:tableData={salaryAdjustTable}
                                                ></DataTable>
                                            </div>
                                            {#if salaryAdjustmentDetail?.attachmentSalaryTable !== null}
                                                <div
                                                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                                >
                                                    <p class="text-sm">
                                                        Sila muat turun jadual
                                                        gaji dan surat tawaran
                                                        di bawah ini.
                                                    </p>
                                                    <div
                                                        class="flex w-full flex-row items-center justify-between"
                                                    >
                                                        1. <a
                                                            href={salaryAdjustmentDetail?.attachmentSalaryTable}
                                                            download="Jadual Gaji"
                                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                                            >Jadual Gaji
                                                            <SvgArrowDownTray />
                                                        </a>
                                                    </div>
                                                    <div
                                                        class="flex w-full flex-row items-center justify-between"
                                                    >
                                                        2.
                                                        <a
                                                            href={salaryAdjustmentDetail?.attachmentOfferLetter}
                                                            download="Surat Tawaran"
                                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                                            >Surat Tawaran
                                                            <SvgArrowDownTray />
                                                        </a>
                                                    </div>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </CustomTabContent>
                            </CustomTab>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Kenaikan Pangkat Kakitangan"
                    >
                        {#if stepperControl[3]}
                            <TextIconButton
                                type="netural"
                                label="Kembali"
                                icon="previous"
                                onClick={() => (stepperControl[3] = false)}
                            />
                            {#if !employeePromotionExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    icon="check"
                                    form="employeePromotion"
                                    onClick={() => {
                                        $employeePromotion.isDraft = true;
                                    }}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
                                    form="employeePromotion"
                                    onClick={() => {
                                        $employeePromotion.isDraft = false;
                                    }}
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !stepperControl[3]}
                            <div class="flex w-full flex-col gap-2.5 p-3 pb-10">
                                {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Tetapkan untuk semua kakitangan berkaitan.
                                        </p>
                                    </Alert>
                                {/if}
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Calon Kakitangan Yang Lulus Untuk Kenaikan Pangkat"
                                        bind:tableData={promotionEmployee}
                                        bind:passData={finalPromotionRowData}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                2,
                                            ).finally(
                                                () =>
                                                    (stepperControl[3] = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-2.5 pb-10">
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 pt-2 md:w-1/2"
                                    id="employeePromotion"
                                    use:employeePromotionEnhance
                                    method="POST"
                                >
                                    <CustomTextField
                                        label="Tarikh Pengesahan"
                                        id="confirmedDate"
                                        disabled={employeePromotionExist}
                                        type="date"
                                        bind:val={$employeePromotion.confirmedDate}
                                        errors={$employeePromotionError.confirmedDate}
                                    />
                                    <CustomRadioBoolean
                                        label="Status"
                                        id="status"
                                        disabled={employeePromotionExist}
                                        options={approveOptions}
                                        bind:val={$employeePromotion.status}
                                        errors={$employeePromotionError.status}
                                    />
                                    {#if $employeePromotion.status}
                                        <CustomTextField
                                            label="Ulasan"
                                            isRequired={false}
                                            id="remark"
                                            type="textarea"
                                            disabled={employeePromotionExist}
                                            bind:val={$employeePromotion.remark}
                                            errors={$employeePromotionError.remark}
                                        />
                                        <CustomSelectField
                                            label="Nama Penyokong"
                                            id="supporterName"
                                            disabled={employeePromotionExist}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                            bind:val={$employeePromotion.supporterName}
                                            errors={$employeePromotionError.supporterName}
                                        />
                                        <CustomSelectField
                                            label="Nama Pelulus"
                                            id="approverName"
                                            disabled={employeePromotionExist}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                            bind:val={$employeePromotion.approverName}
                                            errors={$employeePromotionError.approverName}
                                        />
                                    {/if}
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Penyokongan Kenaikan Pangkat">
                        {#if stepperControl[4]}
                            <TextIconButton
                                type="netural"
                                label="Kembali"
                                icon="previous"
                                onClick={() => (stepperControl[4] = false)}
                            />
                            {#if (data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code && !supporterApproved) || !approverApproved}
                                <TextIconButton
                                    type="neutral"
                                    label="Simpan"
                                    icon="check"
                                    form={!supporterApproved
                                        ? 'supporterApproval'
                                        : 'approverApproval'}
                                    onClick={() => {
                                        if (!supporterApproved) {
                                            $supporterApproval.isDraft = true;
                                        } else {
                                            $approverApproval.isDraft = true;
                                        }
                                    }}
                                />
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
                                    form={!supporterApproved
                                        ? 'supporterApproval'
                                        : 'approverApproval'}
                                    onClick={() => {
                                        if (!supporterApproved) {
                                            $supporterApproval.isDraft = false;
                                        } else {
                                            $approverApproval.isDraft = false;
                                        }
                                    }}
                                />
                            {/if}
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if !stepperControl[4]}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                            >
                                {#if data.currentRoleCode == UserRoleConstant.kakitangan.code}
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Tetapkan untuk semua kakitangan berkaitan.
                                        </p>
                                    </Alert>
                                {/if}
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Calon Kakitangan Yang Lulus Untuk Kenaikan Pangkat"
                                        bind:tableData={promotionFinalResult}
                                        bind:passData={finalPromotionRowData}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                2,
                                            ).finally(
                                                () =>
                                                    (stepperControl[4] = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        {:else}
                            <ContentHeader
                                title="Keputusan daripada Penyokong dan Pelulus"
                                borderClass="border-none"
                            />
                            <div class="flex w-full flex-col gap-2.5 pb-5">
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                    id="supporterApproval"
                                    use:supporterApprovalEnhance
                                    method="POST"
                                >
                                    <!-- <span
                                    class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                                >
                                    Keputusan akan dihantar ke emel klinik dan
                                    Urus Setia berkaitan.
                                </span> -->
                                    <ContentHeader
                                        title="Penyokong"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Tindakan/Ulasan"
                                        isRequired={false}
                                        id="remark"
                                        disabled={supporterApproved}
                                        placeholder="Menunggu keputusan..."
                                        bind:val={$supporterApproval.remark}
                                        errors={$supporterApprovalError.remark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        options={supportOptions}
                                        id="status"
                                        disabled={supporterApproved}
                                        bind:val={$supporterApproval.status}
                                    />
                                </form>
                            </div>
                            <div class="flex w-full flex-col gap-2.5 pb-10">
                                <form
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                    id="approverApproval"
                                    use:approverApprovalEnhance
                                    method="POST"
                                >
                                    <!-- <span
                                    class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                                >
                                    Keputusan akan dihantar ke emel klinik dan
                                    Urus Setia berkaitan.
                                </span> -->
                                    <ContentHeader
                                        title="Pelulus"
                                        borderClass="border-none"
                                    />
                                    <CustomTextField
                                        label="Tindakan/Ulasan"
                                        isRequired={false}
                                        id="remark"
                                        disabled={approverApproved}
                                        placeholder="Menunggu keputusan..."
                                        bind:val={$approverApproval.remark}
                                        errors={$approverApprovalError.remark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        options={approveOptions}
                                        id="status"
                                        disabled={approverApproved}
                                        bind:val={$approverApproval.status}
                                    />
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {:else}
            <StepperContent>
                <StepperContentHeader title="Borang Perakuan Pendidikan">
                    {#if !$confirmationStaffDocumentIsReadonly || $confirmationStaffDocumentIsDraft}
                        <TextIconButton
                            type="neutral"
                            label="Simpan"
                            form="documentUploadForm"
                            onClick={() => {
                                $promotionStaffUploadDocumentForm.isDraft = true;
                            }}
                        />
                        <TextIconButton
                            type="primary"
                            label="Hantar"
                            form="documentUploadForm"
                            onClick={() => {
                                $promotionStaffUploadDocumentForm.isDraft = false;
                            }}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !$confirmationStaffDocumentIsReadonly || $confirmationStaffDocumentIsDraft}
                        <div class="flex w-full flex-col gap-2">
                            <p class="text-sm">
                                Sila muat turun, isi dengan lengkap dokumen yang
                                berkaitan, kemudian muat naik dokumen pada
                                ruangan yang disediakan.
                            </p>

                            <ul
                                class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                            >
                                {#each $staffUploadedDocumentsForm.template as _, i}
                                    <li>
                                        <a
                                            href={$staffUploadedDocumentsForm
                                                .template[i].document}
                                            download={$staffUploadedDocumentsForm
                                                .template[i].name}
                                            class="cursor-pointer underline"
                                            >{$staffUploadedDocumentsForm
                                                .template[i].name}</a
                                        >
                                    </li>
                                {/each}
                            </ul>

                            <p class="text-sm">
                                Sila muat turun, isi dengan lengkap dokumen
                                berikut, kemudian muat naik dokumen pada ruangan
                                yang disediakan.
                            </p>

                            <ol
                                class="list-inside list-decimal space-y-1 text-sm"
                            >
                                <li>Borang Perakuan Pendidikan</li>
                                <li>Borang Lapor Diri</li>
                                <li>Lain-lain dokumen yang berkaitan</li>
                            </ol>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                method="POST"
                                id="documentUploadForm"
                                enctype="multipart/form-data"
                                use:promotionStaffUploadDocumentEnhance
                            >
                                {#if $promotionStaffUploadDocumentError.document && $staffUploadedDocumentsForm.attachment.length < 1}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >Sila muat naik dokumen barkaitan dan
                                        pastikan tidak melebihi 10MB.</span
                                    >
                                {/if}
                                <ContentHeader
                                    title="Sila pastikan dokumen berkenaan dimuat naik"
                                    borderClass="border-none"
                                >
                                    <div
                                        hidden={$promotionStaffUploadDocumentForm
                                            .document.length < 1 &&
                                            $staffUploadedDocumentsForm
                                                .attachment.length < 1}
                                    >
                                        <FileInputField
                                            id="documents"
                                            handleOnInput={(e) =>
                                                handleOnInput(e)}
                                        ></FileInputField>
                                    </div>
                                </ContentHeader>
                                <div
                                    class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                                >
                                    <div class="flex flex-wrap gap-3">
                                        {#each $promotionStaffUploadDocumentForm.document as _, i}
                                            <FileInputFieldChildren
                                                childrenType="grid"
                                                handleDelete={() =>
                                                    handleDelete(i)}
                                                document={$promotionStaffUploadDocumentForm
                                                    .document[i]}
                                            />
                                        {/each}

                                        {#each $staffUploadedDocumentsForm.attachment as doc, i}
                                            <div class="flex flex-row">
                                                <div
                                                    class="0 flex h-fit w-fit flex-col items-center justify-center gap-2.5 rounded-md bg-bgr-secondary p-2.5 text-sm hover:bg-bgr-tertiary"
                                                >
                                                    <svg
                                                        fill="#ffffff"
                                                        class="mr-2 h-16 w-16 text-system-primary"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        ><g
                                                            id="SVGRepo_bgCarrier"
                                                            stroke-width="0"
                                                        ></g><g
                                                            id="SVGRepo_tracerCarrier"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></g><g
                                                            id="SVGRepo_iconCarrier"
                                                        >
                                                            <path
                                                                d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                            ></path>
                                                            <path
                                                                d="M20 8H15V3"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M11.5 13H11V17H11.5C12.6046 17 13.5 16.1046 13.5 15C13.5 13.8954 12.6046 13 11.5 13Z"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M15.5 17V13L17.5 13"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M16 15H17"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M7 17L7 15.5M7 15.5L7 13L7.75 13C8.44036 13 9 13.5596 9 14.25V14.25C9 14.9404 8.44036 15.5 7.75 15.5H7Z"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                        </g></svg
                                                    >
                                                    {#if doc.name.length < 15}
                                                        {doc.name}
                                                    {:else}
                                                        {doc.name.substring(
                                                            0,
                                                            15,
                                                        ) + '...'}
                                                    {/if}
                                                </div>
                                                <div
                                                    class=" flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-bgr-primary"
                                                >
                                                    <button
                                                        type="button"
                                                        on:click={() =>
                                                            handleDeleteUploadedFile(
                                                                i,
                                                            )}
                                                        class="text-system-danger"
                                                        ><SvgMinusCircle
                                                            size="22"

                                                        ></SvgMinusCircle></button
                                                    >
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                    {#if $promotionStaffUploadDocumentForm.document.length < 1 && $staffUploadedDocumentsForm.attachment.length < 1}
                                        <div
                                            class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                                        >
                                            <span
                                                >Pilih fail dari peranti anda.</span
                                            >
                                            <svg
                                                width={40}
                                                height={40}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                />
                                            </svg>
                                            <FileInputField
                                                id="documents"
                                                handleOnInput={(e) =>
                                                    handleOnInput(e)}
                                            ></FileInputField>
                                        </div>
                                    {/if}
                                </div>
                            </form>
                        </div>
                    {:else}
                        <div class="flex w-full flex-col gap-2">
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <p
                                    class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                                >
                                    Fail-fail yang dimuat naik:
                                </p>
                                {#each $staffUploadedDocumentsForm.attachment as _, i}
                                    <div
                                        class="flex w-full flex-row items-center justify-between"
                                    >
                                        <label
                                            for=""
                                            class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                            >{i + 1}.</label
                                        >
                                        <a
                                            href={$staffUploadedDocumentsForm
                                                .attachment[i].document}
                                            download={$staffUploadedDocumentsForm
                                                .attachment[i].name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{$staffUploadedDocumentsForm
                                                .attachment[i].name}</a
                                        >
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Kenaikan Pangkat"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full p-3 pb-10">
                        <div class="w-md:1/2 flex flex-col gap-2.5">
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                disabled
                                isRequired={false}
                                val={data.employeePOV?.employeePromotionInfo
                                    .employeeNumber}
                            />
                            <CustomTextField
                                label="Nama Kakitangan"
                                id="employeeName"
                                disabled
                                isRequired={false}
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.employeeName}
                            />
                            <CustomTextField
                                label="Tarikh Kenaikan Pangkat"
                                id="promotionDate"
                                disabled
                                isRequired={false}
                                type="date"
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.promotionDate}
                            />
                            <CustomSelectField
                                label="Bulan Pergerakan Gaji Baru"
                                id="salaryMovementMonth"
                                disabled
                                isRequired={false}
                                options={kgtMonthValueIsStringLookup}
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.salaryMovementMonth}
                            />
                            <CustomTextField
                                label="Gaji Minimum - Gaji Maksimum (Gred Lama)"
                                id="firstMinimumSalary"
                                disabled
                                isRequired={false}
                                val={'RM ' +
                                    data.employeePOV?.employeePromotionInfo
                                        ?.firstMinimumSalary +
                                    ' -  RM ' +
                                    data.employeePOV?.employeePromotionInfo
                                        ?.firstMaximumSalary}
                            />
                            <CustomTextField
                                label="Kenaikan Gaji Tahunan (Gred Lama)"
                                id="firstSalaryRaise"
                                disabled
                                isRequired={false}
                                val={'RM ' +
                                    data.employeePOV?.employeePromotionInfo
                                        ?.firstSalaryRaise}
                            />
                            <CustomSelectField
                                label="Gred Baru"
                                id="newGrade"
                                disabled
                                isRequired={false}
                                options={data.lookup.gradeLookup}
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.newGrade}
                            />
                            <CustomTextField
                                label="Gaji Minimum - Gaji Maksimum (Gred Baru)"
                                id="minMaxSalaryNewGrade"
                                placeholder=""
                                disabled
                                isRequired={false}
                                val={'RM ' +
                                    data.employeePOV?.employeePromotionInfo
                                        ?.secondMinimumSalary +
                                    ' -  RM ' +
                                    data.employeePOV?.employeePromotionInfo
                                        ?.secondMaximumSalary}
                            />
                            <CustomTextField
                                label="Kenaikan Gaji Tahunan (Gred Baru)"
                                id="secondSalaryRaise"
                                disabled
                                isRequired={false}
                                placeholder=""
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.secondSalaryRaise}
                            />
                            <CustomTextField
                                label="Gaji Sekarang"
                                disabled
                                isRequired={false}
                                id="currentSalary"
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.currentSalary}
                            />
                            <CustomTextField
                                label="Gaji Baru"
                                disabled
                                isRequired={false}
                                id="newSalary"
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.newSalary}
                            />
                            <CustomTextField
                                label="Penempatan Sekarang"
                                disabled
                                isRequired={false}
                                id="currentPlacement"
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.currentPlacement}
                            />
                            <CustomSelectField
                                label="Penempatan Baru"
                                id="newPlacement"
                                disabled
                                isRequired={false}
                                options={data.lookup.placementLookup}
                                val={data.employeePOV?.employeePromotionInfo
                                    ?.newPlacement}
                            />
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster />
<Modal title="Sistem MyPSM" bind:open={integrityModal} size="sm">
    <div class="flex w-full flex-col justify-start gap-3">
        <Alert color="blue">
            <p>
                <span class="font-medium">Arahan: </span>
                Tetapkan perakuan untuk kakitangan yang dipilih.
            </p>
        </Alert>
        <div class="hidden">
            <form
                class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                id="integrityForm"
                use:integrityEnhance
                method="POST"
            >
                <CustomRadioBoolean
                    label="Keputusan"
                    id="status"
                    disabled={integrityApproved}
                    options={integrityOptions}
                    bind:val={$integrityForm.status}
                />
            </form>
        </div>
        <div class="flex w-full justify-between gap-3">
            <TextIconButton
                label="TIDAK BEBAS"
                form="integrityForm"
                icon="cancel"
                type="neutral"
                onClick={() => ($integrityForm.status = false)}
            />
            <TextIconButton
                label="BEBAS"
                icon="check"
                form="integrityForm"
                onClick={() => ($integrityForm.status = true)}
            />
        </div>
    </div>
</Modal>

<Modal
    title="Sistem MyPSM"
    bind:open={confirmModal}
    size="sm"
    dismissable={false}
>
    <Alert color="blue">
        <div class="flex w-full flex-col justify-start gap-3">
            <p>
                <span class="font-medium">Arahan: </span>
                Masukkan gred dan jawatan kenaikan pangkat untuk menetapkan tajuk
                proses pemangkuan.
            </p>
        </div>
    </Alert>
    <div class="w-full">
        <CustomSelectField
            id="grade"
            label="Jawatan"
            options={data.lookup.positionLookup}
            bind:val={$addnewPromotionForm.grade}
            errors={$addnewPromotionError.grade}
        />
    </div>
    <div class="flex justify-center gap-3">
        <TextIconButton
            label="Batal"
            type="neutral"
            icon="cancel"
            onClick={() => (confirmModal = false)}
        />
        <TextIconButton
            label="Hantar"
            type="primary"
            icon="check"
            form="addnewPromotionForm"
        />
    </div>
</Modal>
<Toaster />
