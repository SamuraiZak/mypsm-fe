<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import type {
        DtoCalonPemangkuan,
        IntActingApplication,
    } from '$lib/interfaces/database/actingApplication';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import {
        mockPromotionCandidate,
        mockPromotionCandidateDetail,
    } from '$lib/mocks/kenaikan-pangkat/mockPromotion';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { placements } from '$lib/mocks/placements/mockPlacements';
    import { onMount } from 'svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryIncrementRecord } from '$lib/mocks/gaji/rekodKenaikanGaji/mockSalaryIncrementRecord';
    import type { PageData } from './$types';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import {
        _updatePromotionMeetingResultSchema,
        _submitUpdatePromotionMeetingResultForm,
        _updatePlacementMeetingResultSchema,
        _submitUpdatePlacementMeetingResultForm,
        _submitUpdateStaffPromotionForm,
        _updateStaffPromotionSchema,
    } from './+page';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { approveOptions } from '$lib/constants/mypsm/radio-option-constants';

    export let data: PageData;
    let editMeetingResult = false;
    let editPlacementMeetingResult = false;
    let editPromotionInfo = false;
    let disabled = false;
    let selectedValue: any;
    let selectedMonth: any;

    onMount(() => {
        selectedValue = placements[3].value;
        selectedMonth = months[6].value;
    });

    let stepperIndex = 0;

    let actingDetails: IntActingApplication = {
        idRekod: 1,
        jenisPemangkuan: 'Gred 1-54',
        tarikhRekod: Date.now.toString(),
        jumlahCalon: 0,
        status: 'Sedang Diproses',
        calonPemangkuan: [],
    };

    // Step 1 script starts here
    let editingCandidateList = false;

    let allEmployeeList: DtoCalonPemangkuan[] = [];

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let selectTempCandidate: any = {};

    function saveSelected() {
        actingDetails.calonPemangkuan = selectedCandidatesList;
    }

    // Step 1 script ends here
    // ====================== Form Validation
    const {
        form: promotionMeetingResultForm,
        errors: promotionMeetingResultError,
        enhance: promotionMeetingResultEnhance,
    } = superForm(data.updatePromotionMeetingResultForm, {
        SPA: true,
        id: 'promotionMeetingResultForm',
        validators: _updatePromotionMeetingResultSchema,
        onSubmit() {
            _submitUpdatePromotionMeetingResultForm(
                $promotionMeetingResultForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
    });

    const {
        form: updatePlacementMeetingResultForm,
        errors: updatePlacementMeetingResultError,
        enhance: updatePlacementMeetingResultEnhance,
    } = superForm(data.updatePlacementMeetingResultForm, {
        SPA: true,
        id: 'updatePlacementMeetingResultForm',
        validators: _updatePlacementMeetingResultSchema,
        onSubmit() {
            _submitUpdatePlacementMeetingResultForm(
                $updatePlacementMeetingResultForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
    });

    const {
        form: updateStaffPromotionForm,
        errors: updateStaffPromotionError,
        enhance: updateStaffPromotionEnhance,
    } = superForm(data.updateStaffPromotionForm, {
        SPA: true,
        id: 'updateStaffPromotionForm',
        validators: _updateStaffPromotionSchema,
        onSubmit() {
            _submitUpdateStaffPromotionForm($updateStaffPromotionForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
    });
    const proxyMeetingDate = dateProxy(
        promotionMeetingResultForm,
        'meetingDate',
        {
            format: 'date',
        },
    );
    const proxyVerifiedPromotionDate = dateProxy(
        promotionMeetingResultForm,
        'verifiedPromotionDate',
        {
            format: 'date',
        },
    );
    const proxyActingEndDate = dateProxy(
        promotionMeetingResultForm,
        'actingEndDate',
        {
            format: 'date',
        },
    );
    const proxyReturnToOriginalGradeDate = dateProxy(
        promotionMeetingResultForm,
        'returnToOriginalGradeDate',
        {
            format: 'date',
        },
    );

    $: {
        if (!$promotionMeetingResultForm.meetingResult) {
            $promotionMeetingResultForm.verifiedPromotionDate = null;
        } else {
            $promotionMeetingResultForm.actingEndDate = null;
            $promotionMeetingResultForm.returnToOriginalGradeDate = null;
            $promotionMeetingResultForm.newPlacement = undefined;
        }
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat Gred 1-54"
        description="Hal-hal berkaitan Kenaikan Pangkat untuk Gred 1-54"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={stepperIndex}>
    <!-- STEPPER 0 -->
    <StepperContent>
        <StepperContentHeader title="Senarai Kakitangan Untuk Kenaikan Pangkat">
            {#if editingCandidateList}
                <FormButton
                    type="cancel"
                    onClick={() => {
                        editingCandidateList = false;
                    }}
                />
                <FormButton
                    type="save"
                    onClick={() => {
                        saveSelected();
                        editingCandidateList = false;
                    }}
                />
            {:else}
                <FormButton
                    type="add"
                    onClick={() => {
                        editingCandidateList = true;
                    }}
                ></FormButton>
                <FormButton type="print"></FormButton>
                <FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 1;
                    }}
                ></FormButton>
            {/if}
        </StepperContentHeader>
        {#if editingCandidateList}
            <StepperContentBody paddingClass="p-0">
                <CustomTab>
                    <!-- Senarai semua kakitangan -->

                    <CustomTabContent title="Senarai Semua Kakitangan"
                        ><SectionHeader
                            title="Tekan butang '+' untuk masukkan ke dalam senarai kakitangan yang terpilih"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DynamicTable
                                bind:passData={selectTempCandidate}
                                bind:selectedItems={selectedCandidatesList}
                                tableItems={allEmployeeList}
                                selectAdd
                                withRowSelection
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaKakitangan',
                                    'nomborKP',
                                    'gredSemasa',
                                    'jawatanSemasa',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>

                    <!-- Senarai kakitangan yang dipilih -->

                    <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
                        <SectionHeader
                            title="Tekan butang '-' untuk keluarkan kakitangan daripada senarai yang terpilih"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DynamicTable
                                bind:passData={selectTempCandidate}
                                bind:selectedItems={selectedCandidatesList}
                                tableItems={selectedCandidatesList}
                                withRowSelection
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaKakitangan',
                                    'nomborKP',
                                    'gredSemasa',
                                    'jawatanSemasa',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        {:else}
            <StepperContentBody>
                <SectionHeader
                    title="Sila cetak senarai kakitangan untuk dibawa ke mesyuarat"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={selectedCandidatesList}
                        columnKeys={[
                            'nomborPekerja',
                            'namaKakitangan',
                            'nomborKP',
                            'gredSemasa',
                            'jawatanSemasa',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        {/if}
    </StepperContent>
    <!-- STEPPER 1 -->
    <StepperContent>
        <StepperContentHeader title="Semak Status Perakuan">
            <FormButton
                type="back"
                onClick={() => {
                    stepperIndex = 0;
                }}
            ></FormButton><FormButton
                type="next"
                onClick={() => {
                    stepperIndex = 2;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotionCandidate}
                    columnKeys={[
                        'employeeNumber',
                        'name',
                        'identityDocumentNumber',
                        'meetingResult',
                        'integritySecretariatCertification',
                        'districtOrStateDirectorCertification',
                    ]}
                ></DynamicTable>
            </div>
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 2 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
        >
            {#if editMeetingResult == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 1;
                    }}
                ></FormButton><FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 3;
                    }}
                ></FormButton>
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton>
                {#if !disabled}
                    <TextIconButton
                        primary
                        label="Selesai"
                        form="promotionMeetingResultForm"
                    >
                        <SvgCheck /></TextIconButton
                    >{:else}
                    <FormButton
                        type="next"
                        onClick={() => {
                            stepperIndex = 3;
                        }}
                    ></FormButton>
                {/if}
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editMeetingResult == false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidate}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editMeetingResult = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editMeetingResult = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'name',
                            'identityDocumentNumber',
                            'meetingResult',
                            'integritySecretariatCertification',
                            'districtOrStateDirectorCertification',
                        ]}
                    ></DynamicTable>
                </div>
            {:else}
                <form
                    id="promotionMeetingResultForm"
                    method="POST"
                    use:promotionMeetingResultEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <p class="h-[35px] text-sm italic text-system-accent">
                        Sekiranya kakitangan tidak lulus mesyuarat, proses akan
                        berakhir untuk kakitangan tersebut
                    </p>
                    <TextField
                        name="meetingName"
                        hasError={!!$promotionMeetingResultError.meetingName}
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={$promotionMeetingResultForm.meetingName}
                        {disabled}
                    ></TextField>
                    {#if $promotionMeetingResultError.meetingName && !disabled}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$promotionMeetingResultError.meetingName[0]}</span
                        >
                    {/if}
                    <DateSelector
                        name="meetingDate"
                        hasError={!!$promotionMeetingResultError.meetingDate}
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        bind:selectedDate={$proxyMeetingDate}
                        {disabled}
                    ></DateSelector>
                    {#if $promotionMeetingResultError.meetingDate && !disabled}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$promotionMeetingResultError.meetingDate[0]}</span
                        >
                    {/if}
                    <LongTextField
                        name="secretaryRemark"
                        hasError={!!$promotionMeetingResultError.secretaryRemark}
                        label="Tindakan / Ulasan Mesyuarat"
                        bind:value={$promotionMeetingResultForm.secretaryRemark}
                        {disabled}
                    ></LongTextField>
                    {#if $promotionMeetingResultError.secretaryRemark && !disabled}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$promotionMeetingResultError
                                .secretaryRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        options={approveOptions}
                        legend="Keputusan Mesyuarat"
                        bind:userSelected={$promotionMeetingResultForm.meetingResult}
                        {disabled}
                    />
                    {#if $promotionMeetingResultError.meetingResult && !disabled}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$promotionMeetingResultError
                                .meetingResult[0]}</span
                        >
                    {/if}

                    {#if !$promotionMeetingResultForm.meetingResult}
                        <DateSelector
                            {disabled}
                            name="verifiedPromotionDate"
                            hasError={!!$promotionMeetingResultError.verifiedPromotionDate}
                            handleDateChange
                            label="Tarikh Pengesahan Kenaikan Pangkat (Jika LULUS)"
                            bind:selectedDate={$proxyVerifiedPromotionDate}
                        />
                        {#if $promotionMeetingResultError.verifiedPromotionDate && !disabled}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultError
                                    .verifiedPromotionDate[0]}</span
                            >
                        {/if}
                    {:else}
                        <div
                            class="flex max-h-full w-full flex-col gap-2.5 border-t border-bdr-primary py-2.5"
                        >
                            <p class="text-lg text-txt-primary">
                                Penamatan Pemangkuan (Jika Mesyuarat TIDAK
                                LULUS)
                            </p>
                        </div>
                        <DateSelector
                            {disabled}
                            name="actingEndDate"
                            hasError={!!$promotionMeetingResultError.actingEndDate}
                            handleDateChange
                            label="Tarikh Tamat Pemangkuan"
                            bind:selectedDate={$proxyActingEndDate}
                        />
                        {#if $promotionMeetingResultError.actingEndDate && !disabled}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultError
                                    .actingEndDate[0]}</span
                            >
                        {/if}
                        <DateSelector
                            {disabled}
                            name="returnToOriginalGradeDate"
                            hasError={!!$promotionMeetingResultError.returnToOriginalGradeDate}
                            handleDateChange
                            label="Tarikh Kembali ke Gred Asal"
                            bind:selectedDate={$proxyReturnToOriginalGradeDate}
                        />
                        {#if $promotionMeetingResultError.returnToOriginalGradeDate && !disabled}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultError
                                    .returnToOriginalGradeDate[0]}</span
                            >
                        {/if}
                        <DropdownField
                            {disabled}
                            id="newPlacement"
                            hasError={!!$promotionMeetingResultError.newPlacement}
                            dropdownType="label-left-full"
                            label="Penempatan Baru"
                            bind:value={$promotionMeetingResultForm.newPlacement}
                            options={placements}
                        />
                        {#if $promotionMeetingResultError.newPlacement && !disabled}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultError
                                    .newPlacement[0]}</span
                            >
                        {/if}
                    {/if}
                </form>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 3 -->
    <StepperContent>
        <StepperContentHeader
            title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
        >
            {#if editPlacementMeetingResult == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 2;
                    }}
                ></FormButton><FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 4;
                    }}
                ></FormButton>
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editPlacementMeetingResult = false;
                        disabled = false;
                    }}
                ></FormButton>
                <TextIconButton
                    primary
                    label="Selesai"
                    form="updatePlacementMeetingResultForm"
                >
                    <SvgCheck /></TextIconButton
                >
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editPlacementMeetingResult === false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidate}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editPlacementMeetingResult = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editPlacementMeetingResult = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'name',
                            'identityDocumentNumber',
                            'gradeId',
                            'positionId',
                            'currentPlacement',
                        ]}
                    ></DynamicTable>
                </div>
            {:else}
                <form
                    id="updatePlacementMeetingResultForm"
                    method="POST"
                    use:updatePlacementMeetingResultEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTab>
                        <!-- Butiran Kenaikan Pangkat Kakitangan -->

                        <CustomTabContent
                            title="Butiran Kenaikan Pangkat Kakitangan"
                        >
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelBlack={false}
                                    labelType="read-only-list-value"
                                    label="Borang-borang berkaitan yang akan dijana:"
                                    valueList={[
                                        '1. Surat Tawaran Kenaikan Pangkat',
                                        '2. Borang Lapor Diri',
                                        '3. Jadual Pelarasan Gaji',
                                    ]}
                                    {disabled}
                                ></TextField>
                                <SectionHeader title="Butiran Kenaikan Pangkat"
                                ></SectionHeader>
                                <TextField
                                    label="No. Pekerja"
                                    value="00001"
                                    disabled
                                />
                                <TextField
                                    label="Nama Pkerja"
                                    value="Mohd Irfan Bin Abu"
                                    disabled
                                />

                                <DateSelector
                                    name="promotionDate"
                                    hasError={!!$updatePlacementMeetingResultError.promotionDate}
                                    handleDateChange
                                    label="Tarikh Kenaikan Pangkat"
                                    bind:selectedDate={$updatePlacementMeetingResultForm.promotionDate}
                                    {disabled}
                                />
                                {#if $updatePlacementMeetingResultError.promotionDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .promotionDate[0]}</span
                                    >
                                {/if}
                                <DropdownField
                                    name="newMovementSalaryDate"
                                    hasError={!!$updatePlacementMeetingResultError.newMovementSalaryDate}
                                    dropdownType="label-left-full"
                                    label="Tarikh Pergerakan Gaji Baru"
                                    bind:value={$updatePlacementMeetingResultForm.newMovementSalaryDate}
                                    id="dropdown"
                                    options={data.monthStringLookup}
                                    {disabled}
                                />
                                {#if $updatePlacementMeetingResultError.newMovementSalaryDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .newMovementSalaryDate[0]}</span
                                    >
                                {/if}
                                <TextField
                                    name="minSalaryPrevious"
                                    hasError={!!$updatePlacementMeetingResultError.minSalaryPrevious}
                                    label="Gaji Minimum - Gaji Maksimum E19 (RM)"
                                    {disabled}
                                    bind:value={$updatePlacementMeetingResultForm.minSalaryPrevious}
                                />
                                {#if $updatePlacementMeetingResultError.minSalaryPrevious}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .minSalaryPrevious[0]}</span
                                    >
                                {/if}
                                <TextField
                                    name="annualIncrementPrevious"
                                    hasError={!!$updatePlacementMeetingResultError.annualIncrementPrevious}
                                    label="Kenaikan Gaji Tahunan E19 (RM)"
                                    {disabled}
                                    bind:value={$updatePlacementMeetingResultForm.annualIncrementPrevious}
                                />
                                {#if $updatePlacementMeetingResultError.annualIncrementPrevious}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .annualIncrementPrevious[0]}</span
                                    >
                                {/if}
                                <TextField
                                    name="minSalaryNew"
                                    hasError={!!$updatePlacementMeetingResultError.minSalaryNew}
                                    label="Gaji Minimum - Gaji Maksimum E22 (RM)"
                                    {disabled}
                                    bind:value={$updatePlacementMeetingResultForm.minSalaryNew}
                                />
                                {#if $updatePlacementMeetingResultError.minSalaryNew}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .minSalaryNew[0]}</span
                                    >
                                {/if}
                                <TextField
                                    name="annualIncrementNew"
                                    hasError={!!$updatePlacementMeetingResultError.annualIncrementNew}
                                    label="Kenaikan Gaji Tahunan E22 (RM)"
                                    {disabled}
                                    bind:value={$updatePlacementMeetingResultForm.annualIncrementNew}
                                />
                                {#if $updatePlacementMeetingResultError.annualIncrementNew}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .annualIncrementNew[0]}</span
                                    >
                                {/if}
                                <TextField
                                    label="Penempatan Sekarang"
                                    disabled={true}
                                    value=""
                                />
                                <DropdownField
                                    name="newPlacement"
                                    hasError={!!$updatePlacementMeetingResultError.newPlacement}
                                    dropdownType="label-left-full"
                                    label="Penempatan Baru"
                                    bind:value={$updatePlacementMeetingResultForm.newPlacement}
                                    id="dropdown"
                                    options={placements}
                                    {disabled}
                                />
                                {#if $updatePlacementMeetingResultError.newPlacement}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .newPlacement[0]}</span
                                    >
                                {/if}
                            </div>
                        </CustomTabContent>

                        <!-- Jadual Pelarasan Gaji Kakitangan -->

                        <CustomTabContent
                            title="Jadual Pelarasan Gaji Kakitangan"
                        >
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelBlack={false}
                                    labelType="read-only-list-value"
                                    label="Borang-borang berkaitan yang akan dijana:"
                                    valueList={[
                                        '1. Surat Tawaran Kenaikan Pangkat',
                                        '2. Borang Lapor Diri',
                                        '3. Jadual Pelarasan Gaji',
                                    ]}
                                    {disabled}
                                ></TextField>
                                <SectionHeader
                                    title="Kemaskini Rekod Kenaikan Gaji"
                                ></SectionHeader>
                                <DateSelector
                                    hasError={!!$updatePlacementMeetingResultError.promotionDate}
                                    name="promotionDate"
                                    handleDateChange
                                    label="Tarikh Kenaikan Pangkat"
                                    bind:selectedDate={$updatePlacementMeetingResultForm.promotionDate}
                                    {disabled}
                                />
                                {#if $updatePlacementMeetingResultError.promotionDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .promotionDate[0]}</span
                                    >
                                {/if}
                                <TextField label="Gaji Sekarang" disabled
                                ></TextField>

                                <TextField
                                    hasError={!!$updatePlacementMeetingResultError.newSalary}
                                    name="newSalary"
                                    label="Gaji Baru"
                                    {disabled}
                                    bind:value={$updatePlacementMeetingResultForm.newSalary}
                                />
                                {#if $updatePlacementMeetingResultError.newSalary}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .newSalary[0]}</span
                                    >
                                {/if}
                                <LongTextField
                                    hasError={!!$updatePlacementMeetingResultError.remarks}
                                    name="remarks"
                                    rows={2}
                                    label="Catatan"
                                    bind:value={$updatePlacementMeetingResultForm.remarks}
                                    {disabled}
                                />
                                {#if $updatePlacementMeetingResultError.remarks}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$updatePlacementMeetingResultError
                                            .remarks[0]}</span
                                    >
                                {/if}

                                <SectionHeader
                                    title="Senarai Rekod Kenaikan Gaji"
                                ></SectionHeader>
                                <DynamicTable
                                    tableItems={mockSalaryIncrementRecord.filter(
                                        (record) => record.id != '3',
                                    )}
                                    columnKeys={[
                                        'enforcedDate',
                                        'currentSalary',
                                        'newSalary',
                                        'remarks',
                                    ]}
                                ></DynamicTable>
                            </div>
                        </CustomTabContent>
                    </CustomTab>
                </form>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 4 -->
    <StepperContent>
        <StepperContentHeader title="Kemaskini Kenaikan Pangkat Kakitangan">
            {#if editPromotionInfo == false}
                <FormButton
                    type="back"
                    onClick={() => {
                        stepperIndex = 3;
                    }}
                />
                <FormButton
                    type="next"
                    onClick={() => {
                        stepperIndex = 5;
                    }}
                />
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        editPromotionInfo = false;
                        disabled = false;
                    }}
                ></FormButton>
                <TextIconButton
                    primary
                    label="Selesai"
                    form="updateStaffPromotionForm"
                >
                    <SvgCheck /></TextIconButton
                >
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if editPromotionInfo === false}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={mockPromotionCandidateDetail}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editPromotionInfo = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editPromotionInfo = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'employeeName',
                            'identityDocumentNumber',
                            'secretariatConfirmation',
                            'supporterSupport',
                            'approverApproval',
                        ]}
                    ></DynamicTable>
                </div>
            {:else}
                <form
                    id="updateStaffPromotionForm"
                    method="POST"
                    use:updateStaffPromotionEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <DateSelector
                        hasError={!!$updateStaffPromotionError.validationDate}
                        name="validationDate"
                        label="Tarikh Pengesahan"
                        handleDateChange
                        bind:selectedDate={$updateStaffPromotionForm.validationDate}
                        {disabled}
                    />
                    {#if $updateStaffPromotionError.validationDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateStaffPromotionError
                                .validationDate[0]}</span
                        >
                    {/if}
                    <LongTextField
                        hasError={!!$updateStaffPromotionError.secretaryRemarks}
                        name="secretaryRemarks"
                        label="Ulasan"
                        bind:value={$updateStaffPromotionForm.secretaryRemarks}
                        {disabled}
                    />
                    {#if $updateStaffPromotionError.secretaryRemarks}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateStaffPromotionError
                                .secretaryRemarks[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        name="validation"
                        options={approveOptions}
                        legend="Pengesahan"
                        bind:userSelected={$updateStaffPromotionForm.validation}
                        {disabled}
                    />
                    {#if $updateStaffPromotionError.validation}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateStaffPromotionError.validation[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$updateStaffPromotionError.approverName}
                        name="approverName"
                        label="Nama Pelulus"
                        bind:value={$updateStaffPromotionForm.approverName}
                        {disabled}
                    />
                    {#if $updateStaffPromotionError.approverName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateStaffPromotionError.approverName[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$updateStaffPromotionError.supporterName}
                        name="supporterName"
                        label="Nama Penyokong"
                        bind:value={$updateStaffPromotionForm.supporterName}
                        {disabled}
                    />
                    {#if $updateStaffPromotionError.supporterName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateStaffPromotionError.supporterName[0]}</span
                        >
                    {/if}
                </form>
            {/if}
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
