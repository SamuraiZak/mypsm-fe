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
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import {
        _getPlacementDetail,
        _getPromotionDetail,
        _submitAddNewPromotion,
        _submitCertification,
        _submitEmployeePromotion,
        _submitPlacement,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type {
        PromotionCommonEmployee,
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
    } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
    import { Toaster } from 'svelte-french-toast';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveOptions,
        certifyOptions,
        confirmOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { kgtMonthStringLookup } from '$lib/constants/core/dropdown.constant';
    import type { PromotionCertificationGet } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';

    let currentRoleCode: string | null;
    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let supporterRoleCode: string = UserRoleConstant.penyokong.code;
    let approverRoleCode: string = UserRoleConstant.pelulus.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

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
        hiddenColumn: [],
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
        hiddenColumn: ['promotionId'],
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
        param: data.promotionEmployeeParam,
        meta: data.promotionDetailResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.promotionDetail,
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [],
        url: 'employment/promotion/employee_promotions/list',
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
            $certificationForm.promotionType = data.promotionType
                .split(' ')
                .slice(-1)[0];
            $certificationForm.id = data.currentId.groupId;
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

    // to be remove
    let salaryMovementRecordTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList4 ?? [],
    };

    let employeePromotionTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList5 ?? [],
    };

    let directorStepperTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList6 ?? [],
    };

    let currentEmployeeDetail: PromotionPlacementDetail;
    let rowData: PromotionPlacement;
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
    let processDetail: PromotionProcessDetail;
    const getTableInformation = async (index: number) => {
        let requestedDetail: PromotionCertificationGet = {
            id: rowData.promotionId,
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
                        // salaryAdjustmentResponse = res.tableResponse.data.
                    })
                    .finally(() => {
                        // set form here
                    });
                break;
            }
            case 2: {
                _getPromotionDetail(requestedDetail).then((res) => {
                    processDetail = res.response.data
                        ?.details as PromotionProcessDetail;
                }).finally(() => {
                    // employeePromotion here
                } );
            }
        }
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
        {#if currentRoleCode !== depDirectorRoleCode && currentRoleCode !== stateDirectorRoleCode && currentRoleCode !== employeeRoleCode}
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
                <StepperContentHeader title="Semak Status Perakuan">
                    {#if openDetail}
                        <TextIconButton
                            type="neutral"
                            label="Kembali"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton label="Simpan" icon="check" form="" />
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
                                        detailActions={() =>
                                            (openDetail = true)}
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="flex w-full flex-col gap-2.5 pb-2.5">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10 md:w-1/2"
                            >
                                <ContentHeader
                                    title="Urus Setia Integriti"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nama"
                                    id="secretaryName"
                                    type="text"
                                    val="Justin Bieber"
                                />
                                <CustomTextField
                                    label="Ulasan/Tindakan"
                                    id="secretaryRemark"
                                    type="text"
                                    val="Disetuju untuk perakuan"
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="secretaryResult"
                                    disabled={false}
                                    options={confirmOptions}
                                    val={true}
                                />
                                <ContentHeader
                                    title="Pengarah Bahagian/Negeri"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nama"
                                    id="directorName"
                                    type="text"
                                    val="Justin Bieber"
                                />
                                <CustomTextField
                                    label="Ulasan/Tindakan"
                                    id="directorRemark"
                                    type="text"
                                    val="Disetuju untuk perakuan"
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="directorResult"
                                    disabled={false}
                                    options={confirmOptions}
                                    val={true}
                                />
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if data.promotionType === 'Gred Utama' && currentRoleCode === secretaryRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Muat Turun Borang Berkaitan">
                        <TextIconButton
                            type="netural"
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
                        <span
                            >download attachment here (borang penilaian, borang
                            kesihatan, profil kakitangan (cv))</span
                        >
                    </StepperContentBody>
                </StepperContent>
            {/if}

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
                    {#if !openDetail && currentRoleCode === secretaryRoleCode}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                        >
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Kakitangan Terpilih"
                                    bind:tableData={certificationTable}
                                    detailActions={() => {
                                        openDetail = true;
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
                                <span
                                    class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                                >
                                    Sekiranya kakitangan tidak lulus mesyuarat,
                                    proses akan berakhir untuk kakitangan
                                    tersebut.
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

                                {#if data.promotionType === 'Gred 1-54'}
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
                    {#if !openDetail && currentRoleCode === secretaryRoleCode}
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
                                            val={currentEmployeeDetail?.promotionDate}
                                        />
                                        <CustomSelectField
                                            label="Tarikh Pergerakan Gaji Asal"
                                            id="originalSalaryMovementDate"
                                            options={kgtMonthStringLookup}
                                            val={currentEmployeeDetail?.employeeName}
                                        />
                                        <CustomSelectField
                                            label="Tarikh Pergerakan Gaji Baru"
                                            id="newSalaryMovementDate"
                                            options={kgtMonthStringLookup}
                                            val={currentEmployeeDetail?.newSalaryMovementDate}
                                        />
                                        <CustomTextField
                                            label="Gaji Minimum - Gaji Maksimum E19"
                                            id="firstMinimumSalary"
                                            disabled
                                            val={'RM ' +
                                                currentEmployeeDetail?.firstMinimumSalary +
                                                ' -  RM' +
                                                currentEmployeeDetail?.firstMaximumSalary}
                                        />
                                        <CustomTextField
                                            label="Kenaikan Gaji Tahunan E19"
                                            id="firstSalaryRaise"
                                            disabled
                                            val={currentEmployeeDetail?.firstSalaryRaise}
                                        />
                                        <CustomTextField
                                            label="Gaji Minimum - Gaji Maksimum E22"
                                            id="minMaxSalaryNewGrade"
                                            val={'RM ' +
                                                currentEmployeeDetail?.secondMinimumSalary +
                                                ' -  RM ' +
                                                currentEmployeeDetail?.secondMaximumSalary}
                                        />
                                        <CustomTextField
                                            label="Kenaikan Gaji Tahunan E22"
                                            id="secondSalaryRaise"
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
                                            val={currentEmployeeDetail?.newPlacement}
                                        />
                                    </form>
                                </div>
                            </CustomTabContent>
                            <CustomTabContent
                                title="Jadual Pelarasan Gaji Kakitangan"
                            >
                                <ContentHeader
                                    title="Kemaskini Rekod Kenaikan Gaji"
                                    borderClass="border-none"
                                />
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
                                    <CustomTable
                                        title="Senarai Rekod Kenaikan Gaji"
                                        bind:tableData={salaryMovementRecordTable}
                                    />
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
                                    detailActions={async () => {
                                        // await getTableInformation(1).finally(
                                        //     () => (openDetail = true),
                                        // );
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
                            >
                                <CustomSelectField
                                    label="Nama Urus Setia Integriti"
                                    id="integrityCertifierName"
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    disabled
                                    val={processDetail?.integrityCertifierName}
                                />
                                <CustomTextField
                                    label="Ulasan"
                                    id="integrityCertifiedRemark"
                                    disabled
                                    val={processDetail?.integrityCertifiedRemark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="integrityCertifiedStatus"
                                    disabled
                                    options={certifyOptions}
                                    val={processDetail?.integrityCertifiedStatus}
                                />
                                <CustomTextField
                                    label="Tarikh Pengesahan"
                                    id="integrityCertifiedDate"
                                    disabled
                                    val={processDetail?.integrityCertifiedDate}
                                />
                                <CustomSelectField
                                    label="Nama Pelulus"
                                    id="approverName"
                                    disabled
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    val={processDetail?.approverName}
                                />
                                <CustomSelectField
                                    label="Nama Penyokong"
                                    id="supporterName"
                                    disabled
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    val={processDetail?.supporterName}
                                />
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if currentRoleCode === supporterRoleCode || currentRoleCode === approverRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Penyokongan Kenaikan Pangkat">
                        <TextIconButton
                            type="netural"
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
                        <ContentHeader
                            title="Keputusan daripada Penyokong"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                disabled={currentRoleCode === approverRoleCode
                                    ? true
                                    : false}
                                id="supporterRemark"
                                type="text"
                                placeholder="Butiran lengkap..."
                                val="long text field"
                            />
                            <span
                                >Radio button here (Sokong @ Tidak Sokong)</span
                            >
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            {#if currentRoleCode === approverRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Kelulusan Kenaikan Pangkat">
                        <TextIconButton
                            type="netural"
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
                        <ContentHeader
                            title="Keputusan daripada Penyokong"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="supporterRemark"
                                type="text"
                                placeholder="Butiran lengkap..."
                                val="long text field"
                            />
                            <span>Radio button here (Lulus @ Tidak Lulus)</span>
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {:else if currentRoleCode === depDirectorRoleCode || currentRoleCode === stateDirectorRoleCode}
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Perakuan Kenaikan Pangkat"
                >
                    {#if !openDetail}
                        <TextIconButton
                            type="primary"
                            label="Seterusnya"
                            icon="next"
                            onClick={() => goNext()}
                        />
                    {:else}
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
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <CustomTable
                            tableData={directorStepperTable}
                            enableDetail
                            detailActions={() => (openDetail = true)}
                        />
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5"
                        >
                            <ContentHeader
                                title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.</span
                            >
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="directorRemark"
                                type="text"
                                val="Sertakan Ulasan"
                            />
                            <span>Radio Button Here (Peraku/Tidak Peraku)</span>
                            <ContentHeader
                                title="Ulasan Keputusan daripada Urus Setia Integriti"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama"
                                id="secretaryName"
                                disabled={true}
                                type="text"
                                val="Arsene Wenger"
                            />
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="secretaryRemark"
                                disabled={true}
                                type="text"
                                val="Layak diperaku"
                            />
                            <CustomTextField
                                label="Keputusan"
                                id="secretaryResult"
                                disabled={true}
                                type="text"
                                val="DIPERAKU (green background?) @ DALAM PROSES (grey background?)"
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {:else if currentRoleCode === employeeRoleCode}
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
                        tableData={salaryMovementRecordTable}
                        title="Senarai Rekod Kenaikan Gaji"
                    />
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster />
