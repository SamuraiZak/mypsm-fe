<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import {
        _getCertifications,
        _getPlacementDetail,
        _getPromotionDetail,
        _submitAddNewPromotion,
        _submitApproverApproval,
        _submitCertification,
        _submitDirectorForm,
        _submitEmployeePromotion,
        _submitIntegrityForm,
        _submitPlacement,
        _submitSupporterApproval,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
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
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _addNewPromotion,
        _editEmployeePromotion,
        _editPromotionCertification,
        _editPromotionPlacement,
        _promotionCommonApproval,
    } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
    import { Toaster } from 'svelte-french-toast';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveOptions,
        confirmOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { kgtMonthValueIsStringLookup } from '$lib/constants/core/dropdown.constant';
    import type { PromotionCertificationGet } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';

    let currentRoleCode: string | null;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;

    currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let openDetail: boolean = false;

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
        dictionary: [],
        url: 'employment/promotion/employee_lists/list',
        id: 'employeeListTable',
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

    let selectedEmployeeList: TableSettingDTO = {
        param: data.param,
        meta: employeeListTable.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: employeeListTable.selectedData,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [],
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
        },
    };

    $: selectedEmployeeList.data = employeeListTable.selectedData ?? [];

    const {
        form: addnewPromotionForm,
        errors: addnewPromotionError,
        enhance: addnewPromotionEnhance,
    } = superForm(data.addnewPromotionForm, {
        SPA: true,
        resetForm: false,
        dataType: 'json',
        invalidateAll: true,
        id: 'addnewPromotionForm',
        validators: zod(_addNewPromotion),
        onSubmit() {
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
                _submitAddNewPromotion($addnewPromotionForm)
                    .then((res) => {
                        if (res?.response.status == 'success') {
                            tempGroupId = res.response.data?.details.groupId;
                        }
                    })
                    .finally(() => {
                        goto(
                            '/perjawatan/kenaikan-pangkat/butiran/' +
                                tempGroupId +
                                '-' +
                                data.promotionType,
                        );
                    });
            }
        },
    });

    let certificationTable: TableSettingDTO = {
        param: data.commonParam,
        meta: data.certificationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.certificationList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'promotionId'],
        dictionary: [],
        url: 'employment/promotion/certifications/list',
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
        },
    };
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
        dictionary: [],
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
        },
    };
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
        dictionary: [],
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
        },
    };
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
        dictionary: [],
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
        },
    };
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
        },
    };

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
            _submitCertification($certificationForm);
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
            _submitDirectorForm($directorForm);
        },
    });
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
        validators: zod(_editPromotionPlacement),
        onSubmit() {
            $integrityForm.promotionType = data.promotionType;
            $integrityForm.id = rowData.promotionId;
            _submitIntegrityForm($integrityForm);
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
            _submitPlacement($placementForm);
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
            _submitEmployeePromotion($employeePromotion);
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
            _submitSupporterApproval($supporterApproval);
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
            _submitApproverApproval($approverApproval);
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
            employeeId: 1,
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
                        $supporterApproval = res.suppResponse.data?.details;
                        $approverApproval = res.appResponse.data?.details;
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

                _getCertifications(requestedDetails)
                    .then((res) => {
                        certificationResult = res.response.data
                            ?.details as PromotionCertificationResult;
                    })
                    .finally(() => {
                        // DO SOMETHIGN HERE $certification
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
            totalData: 1,
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
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat {data.promotionType.replace(/_/g, '-')}"
    >
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perjawatan/kenaikan-pangkat')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper bind:activeIndex={stepperIndex}>
        {#if currentRoleCode !== UserRoleConstant.kakitangan.code}
            {#if currentRoleCode === secretaryRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Pemilihan Kakitangan">
                        {#if data.isNewPromotion}
                            <TextIconButton
                                type="primary"
                                label="Tambah"
                                icon="add"
                                form="addnewPromotionForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col gap-2.5 p-3 pb-10"
                            id="addnewPromotionForm"
                            method="POST"
                            use:addnewPromotionEnhance
                        >
                            <div class="flex w-full">
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Kakitangan"
                                        bind:tableData={employeeListTable}
                                    ></DataTable>
                                </div>
                            </div>
                            <div class="flex w-full">
                                <div class="h-fit w-full">
                                    <DataTable
                                        title="Senarai Kakitangan Yang Dipilih"
                                        bind:tableData={selectedEmployeeList}
                                    ></DataTable>
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <StepperContent>
                <StepperContentHeader title="Status Perakuan">
                    {#if openDetail}
                        <TextIconButton
                            type="neutral"
                            label="Kembali"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form={data.currentRoleCode !==
                            UserRoleConstant.urusSetiaIntegriti.code
                                ? 'directorForm'
                                : 'integrityForm'}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                        >
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <div class="h-fit w-full">
                                    <DataTable
                                        title=""
                                        bind:tableData={certificationTable}
                                        bind:passData={rowData}
                                        detailActions={async () => {
                                            await getTableInformation(
                                                1,
                                            ).finally(
                                                () => (openDetail = true),
                                            );
                                        }}
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="flex w-full flex-col gap-2.5 pb-2.5">
                            <ContentHeader
                                title="Urus Setia Integriti"
                                borderClass="border-none"
                            />
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
                                id="integrityForm"
                                use:integrityEnhance
                                method="POST"
                            >
                                <CustomTextField
                                    label="Ulasan/Tindakan"
                                    id="remark"
                                    bind:val={$integrityForm.remark}
                                    errors={$integrityError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="status"
                                    disabled={false}
                                    options={confirmOptions}
                                    bind:val={$integrityForm.status}
                                />
                            </form>
                            {#if data.promotionType !== 'Utama'}
                                <ContentHeader
                                    title="Pengarah Bahagian/Negeri"
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
                                        id="remark"
                                        bind:val={$directorForm.remark}
                                        errors={$directorError.remark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        id="status"
                                        disabled={false}
                                        options={confirmOptions}
                                        bind:val={$directorForm.status}
                                    />
                                </form>
                            {/if}
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    {#if openDetail}
                        <TextIconButton
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            form="certificationForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Kakitangan Terpilih"
                                    bind:tableData={promotionmeetingTable}
                                    bind:passData={employeeCertification}
                                    detailActions={async () => {
                                        await getTableInformation(3).finally(
                                            () => (openDetail = true),
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
                                        mesyuarat, proses akan berakhir untuk
                                        kakitangan tersebut.
                                    </span>
                                    <CustomSelectField
                                        label="Nama dan Bilangan Mesyuarat"
                                        id="meetingNameCount"
                                        options={data.lookup.meetingNameLookup}
                                        bind:val={$certificationForm.meetingNameCount}
                                    />
                                    <CustomTextField
                                        label="Tarikh Mesyuarat"
                                        id="meetingDate"
                                        type="date"
                                        bind:val={$certificationForm.meetingDate}
                                        errors={$certificationError.meetingDate}
                                    />
                                    <CustomTextField
                                        label="Tindakan/Ulasan Mesyuarat"
                                        id="meetingRemark"
                                        type="text"
                                        bind:val={$certificationForm.meetingRemark}
                                        errors={$certificationError.meetingRemark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        id="meetingResult"
                                        disabled={false}
                                        options={approveOptions}
                                        bind:val={$certificationForm.meetingResult}
                                        errors={$certificationError.meetingResult}
                                    />

                                    {#if $certificationForm.meetingResult}
                                        <CustomTextField
                                            label="Tarikh Pengesahan Kenaikan Pangkat (Jika Lulus)"
                                            id="confirmedDate"
                                            type="date"
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
                                            bind:val={$certificationForm.actingEndDate}
                                            errors={$certificationError.actingEndDate}
                                        />
                                        <CustomTextField
                                            label="Tarikh Kembali Ke Gred Asal"
                                            id="gradeRevertDate"
                                            type="date"
                                            bind:val={$certificationForm.gradeRevertDate}
                                            errors={$certificationError.gradeRevertDate}
                                        />
                                        <CustomSelectField
                                            label="Penempatan Baru"
                                            id="newPlacement"
                                            options={data.lookup
                                                .placementLookup}
                                            bind:val={$certificationForm.newPlacement}
                                            errors={$certificationError.newPlacement}
                                        />
                                    {/if}
                                {:else}
                                    <CustomSelectField
                                        label="Nama dan Bilangan Mesyuarat"
                                        id="meetingName"
                                        disabled
                                        options={data.lookup.meetingNameLookup}
                                        val={certificationResult?.meetingName}
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
                    {#if openDetail}
                        <TextIconButton
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            form="placementForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody paddingClass="p-none">
                    {#if !openDetail}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Calon Kakitangan Yang Dibawa Ke Mesyuarat Penempatan Kakitangan"
                                    bind:tableData={promotionTable}
                                    bind:passData={rowData}
                                    detailActions={async () => {
                                        await getTableInformation(1).finally(
                                            () => (openDetail = true),
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
                                <div
                                    class="flex w-full flex-col justify-start gap-1 px-2 text-sm italic text-ios-labelColors-secondaryLabel-light"
                                >
                                    <span>
                                        Borang-borang berkaitan yang akan
                                        dijana:
                                    </span>
                                    <span>
                                        1. Surat Tawaran Kenaikan Pangkat
                                    </span>
                                    <span> 2. Borang Lapor Diri </span>
                                    <span> 3. Jadual Pelarasan Gaji </span>
                                </div>
                                <ContentHeader
                                    title="Butiran Kenaikan Pangkat"
                                    borderClass="border-none"
                                />
                                <div class="flex w-full flex-col gap-2.5 pb-10">
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
                                            val={currentEmployeeDetail?.employeeNumber}
                                        />
                                        <CustomTextField
                                            label="Nama Pekerja"
                                            id="employeeName"
                                            disabled
                                            val={currentEmployeeDetail?.employeeName}
                                        />
                                        <CustomTextField
                                            label="Tarikh Kenaikan Pangkat"
                                            id="promotionDate"
                                            type="date"
                                            bind:val={$placementForm.promotionDate}
                                            errors={$placementError.promotionDate}
                                        />
                                        <CustomSelectField
                                            label="Bulan Pergerakan Gaji Baru"
                                            id="salaryMovementMonth"
                                            options={kgtMonthValueIsStringLookup}
                                            bind:val={$placementForm.salaryMovementMonth}
                                            errors={$placementError.salaryMovementMonth}
                                        />
                                        <CustomTextField
                                            label="Gaji Minimum - Gaji Maksimum (Gred Lama)"
                                            id="firstMinimumSalary"
                                            disabled
                                            val={'RM ' +
                                                currentEmployeeDetail?.firstMinimumSalary +
                                                ' -  RM' +
                                                currentEmployeeDetail?.firstMaximumSalary}
                                        />
                                        <CustomTextField
                                            label="Kenaikan Gaji Tahunan (Gred Lama)"
                                            id="firstSalaryRaise"
                                            disabled
                                            val={'RM ' +
                                                currentEmployeeDetail?.firstSalaryRaise}
                                        />
                                        <CustomSelectField
                                            label="Gred Baru"
                                            id="newGrade"
                                            options={data.lookup.gradeLookup}
                                            bind:val={$placementForm.newGrade}
                                            errors={$placementError.newGrade}
                                        />
                                        <CustomTextField
                                            label="Gaji Minimum - Gaji Maksimum (Gred Baru)"
                                            id="minMaxSalaryNewGrade"
                                            placeholder=""
                                            disabled
                                            val={'RM ' +
                                                currentEmployeeDetail?.secondMinimumSalary +
                                                ' -  RM ' +
                                                currentEmployeeDetail?.secondMaximumSalary}
                                        />
                                        <CustomTextField
                                            label="Kenaikan Gaji Tahunan (Gred Baru)"
                                            id="secondSalaryRaise"
                                            disabled
                                            placeholder=""
                                            val={currentEmployeeDetail?.secondSalaryRaise}
                                        />
                                        <CustomTextField
                                            label="Penempatan Sekarang"
                                            disabled
                                            id="currentPlacement"
                                            val={currentEmployeeDetail?.currentPlacement}
                                        />
                                        <CustomSelectField
                                            label="Penempatan Baru"
                                            id="newPlacement"
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
                                                title=""
                                                bind:tableData={salaryAdjustTable}
                                            ></DataTable>
                                        </div>
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
                    {#if openDetail}
                        <TextIconButton
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            form="employeePromotion"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Calon Kakitangan Yang Lulus Untuk Kenaikan Pangkat"
                                    bind:tableData={promotionEmployee}
                                    bind:passData={finalPromotionRowData}
                                    detailActions={async () => {
                                        await getTableInformation(2).finally(
                                            () => (openDetail = true),
                                        );
                                        openDetail = true;
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
                                    type="date"
                                    bind:val={$employeePromotion.confirmedDate}
                                />
                                <CustomRadioBoolean
                                    label="Status"
                                    id="status"
                                    disabled={false}
                                    options={approveOptions}
                                    bind:val={$employeePromotion.status}
                                />
                                <CustomTextField
                                    label="Ulasan"
                                    id="remark"
                                    bind:val={$employeePromotion.remark}
                                />
                                <CustomSelectField
                                    label="Nama Penyokong"
                                    id="supporterName"
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    bind:val={$employeePromotion.supporterName}
                                />
                                <CustomSelectField
                                    label="Nama Pelulus"
                                    id="approverName"
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    bind:val={$employeePromotion.approverName}
                                />
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Penyokongan Kenaikan Pangkat">
                    {#if openDetail}
                        <TextIconButton
                            type="netural"
                            label="Kembali"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        {#if data.currentRoleCode !== UserRoleConstant.urusSetiaPerjawatan.code}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                icon="check"
                                form={data.currentRoleCode ==
                                UserRoleConstant.penyokong.code
                                    ? 'supporterApproval'
                                    : 'approverApproval'}
                            />
                        {/if}
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Calon Kakitangan Yang Lulus Untuk Kenaikan Pangkat"
                                    bind:tableData={promotionFinalResult}
                                    bind:passData={finalPromotionRowData}
                                    detailActions={async () => {
                                        await getTableInformation(2).finally(
                                            () => (openDetail = true),
                                        );
                                        openDetail = true;
                                    }}
                                ></DataTable>
                            </div>
                        </div>
                    {:else}
                        <ContentHeader
                            title="Keputusan daripada Penyokong dan Pelulus"
                            borderClass="border-none"
                        />
                        <div class="flex w-full flex-col gap-2.5 pb-10">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
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
                                    id="remark"
                                    placeholder="Menunggu keputusan..."
                                    bind:val={$supporterApproval.remark}
                                    errors={$supporterApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    options={supportOptions}
                                    id="status"
                                    disabled={false}
                                    bind:val={$supporterApproval.status}
                                />
                            </form>
                        </div>
                        <div class="flex w-full flex-col gap-2.5 pb-10">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
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
                                    id="remark"
                                    placeholder="Menunggu keputusan..."
                                    bind:val={$approverApproval.remark}
                                    errors={$approverApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    options={approveOptions}
                                    id="status"
                                    disabled={false}
                                    bind:val={$approverApproval.status}
                                />
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {:else if data.currentRoleCode === UserRoleConstant.kakitangan.code}
            <StepperContent>
                <StepperContentHeader title="Butiran Kenaikan Pangkat">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <CustomTextField
                            label="No. Pekerja"
                            disabled
                            id="employeeNumber"
                            type="text"
                            val="28339"
                        />
                        <CustomTextField
                            label="Nama Pekerja"
                            disabled
                            id="employeeName"
                            type="text"
                            val="David Beckham"
                        />
                        <CustomTextField
                            label="Tarikh Kenaikan Pangkat"
                            disabled
                            id="promotionDate"
                            type="text"
                            val="27/02/2024"
                        />
                        <CustomTextField
                            label="Tarikh Pergerakan Gaji Asal"
                            disabled
                            id="originalSalaryMovementDate"
                            type="text"
                            val="JULAI"
                        />
                        <CustomTextField
                            label="Tarikh Pergerakan Gaji Baru"
                            disabled
                            id="newSalaryMovementDate"
                            type="text"
                            val="APRIL"
                        />
                        <CustomTextField
                            label="Gaji Minimum - Gaji Maksimum E19 (RM)"
                            disabled
                            id="oldMinMaxSalary"
                            type="text"
                            val="RM 1,335.00 - RM 4,005.00"
                        />
                        <CustomTextField
                            label="Kenaikan Gaji Tahunan (RM)"
                            disabled
                            id="oldAnnualSalaryIncrement"
                            type="text"
                            val="RM 100.00"
                        />
                        <CustomTextField
                            label="Gaji Minimum - Gaji Maksimum E22 (RM)"
                            disabled
                            id="newMinMaxSalary"
                            type="text"
                            val="RM 1,335.00 - RM 4,005.00"
                        />
                        <CustomTextField
                            label="Kenaikan Gaji Tahunan (RM)"
                            disabled
                            id="newAnnualSalaryIncrement"
                            type="text"
                            val="RM 100.00"
                        />
                        <CustomTextField
                            label="Penempatan Sekarang"
                            disabled
                            id="currentPlacement"
                            type="text"
                            val="Pejabat Ketua Pengarah"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            disabled
                            id="newPlacement"
                            type="text"
                            val="Setiausaha Pejabat Gred N32"
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Jadual Pergerakan Gaji">
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
                        onClick={() => {}}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <CustomTable
                        tableData={salaryAdjustTable}
                        title="Senarai Rekod Kenaikan Gaji"
                    />
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster />
