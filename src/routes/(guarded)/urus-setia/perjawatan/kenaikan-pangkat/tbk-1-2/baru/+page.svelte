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
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import type { PageData } from './$types';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import {
        _updatePromotionMeetingResultSchema,
        _submitUpdatePromotionMeetingResultForm,
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
        jenisPemangkuan: 'TBK 1 dan 2 - Kumpulan Sokongan',
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

    // ====================== Form Validation
    const { form, errors, enhance } = superForm(
        data.updatePromotionMeetingResultForm,
        {
            SPA: true,
            id: 'promotionMeetingResultForm',
            validators: _updatePromotionMeetingResultSchema,
            onSubmit() {
                _submitUpdatePromotionMeetingResultForm($form);
            },
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
        },
    );
    const proxyMeetingDate = dateProxy(form, 'meetingDate', {
        format: 'date',
    });
    const proxyVerifiedPromotionDate = dateProxy(
        form,
        'verifiedPromotionDate',
        {
            format: 'date',
        },
    );
    const proxyActingEndDate = dateProxy(form, 'actingEndDate', {
        format: 'date',
    });
    const proxyReturnToOriginalGradeDate = dateProxy(
        form,
        'returnToOriginalGradeDate',
        {
            format: 'date',
        },
    );

    $: {
        if (!$form.meetingResult) {
            $form.verifiedPromotionDate = null;
        } else {
            $form.actingEndDate = null;
            $form.returnToOriginalGradeDate = null;
            $form.newPlacement = undefined;
        }
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat TBK 1 dan 2 - Kumpulan Sokongan"
        description="Hal-hal berkaitan Kenaikan Pangkat untuk TBK 1 dan 2 - Kumpulan Sokongan"
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
            <FormButton
                type="back"
                onClick={() => {
                    stepperIndex = 1;
                }}
            ></FormButton>
            <TextIconButton
                primary
                label="Simpan"
                form="promotionMeetingResultForm"
            >
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="promotionMeetingResultForm"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <p class="h-[35px] text-sm italic text-system-accent">
                    Sekiranya kakitangan tidak lulus mesyuarat, proses akan
                    berakhir untuk kakitangan tersebut
                </p>
                <TextField
                    name="meetingName"
                    hasError={!!$errors.meetingName}
                    label="Nama dan Bilangan Mesyuarat"
                    bind:value={$form.meetingName}
                    {disabled}
                ></TextField>
                {#if $errors.meetingName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.meetingName[0]}</span
                    >
                {/if}
                <DateSelector
                    name="meetingDate"
                    hasError={!!$errors.meetingDate}
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={$proxyMeetingDate}
                    {disabled}
                ></DateSelector>
                {#if $errors.meetingDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.meetingDate[0]}</span
                    >
                {/if}
                <LongTextField
                    name="secretaryRemark"
                    hasError={!!$errors.secretaryRemark}
                    label="Tindakan / Ulasan Mesyuarat"
                    bind:value={$form.secretaryRemark}
                    {disabled}
                ></LongTextField>
                {#if $errors.secretaryRemark}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.secretaryRemark[0]}</span
                    >
                {/if}
                <RadioSingle
                    options={approveOptions}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={$form.meetingResult}
                    {disabled}
                />
                {#if $errors.meetingResult}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.meetingResult[0]}</span
                    >
                {/if}
                <DateSelector
                    disabled={!$form.meetingResult}
                    name="verifiedPromotionDate"
                    hasError={!!$errors.verifiedPromotionDate}
                    handleDateChange
                    label="Tarikh Pengesahan Kenaikan Pangkat (Jika LULUS)"
                    bind:selectedDate={$proxyVerifiedPromotionDate}
                ></DateSelector>
                {#if $errors.verifiedPromotionDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.verifiedPromotionDate[0]}</span
                    >
                {/if}

                <div
                    class="flex max-h-full w-full flex-col gap-2.5 border-t border-bdr-primary py-2.5"
                >
                    <p class="text-lg text-txt-primary">
                        Penamatan Pemangkuan (Jika Mesyuarat TIDAK LULUS)
                    </p>
                </div>
                <DateSelector
                    disabled={$form.meetingResult}
                    name="actingEndDate"
                    hasError={!!$errors.actingEndDate}
                    handleDateChange
                    label="Tarikh Tamat Pemangkuan"
                    bind:selectedDate={$proxyActingEndDate}
                ></DateSelector>
                {#if $errors.actingEndDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.actingEndDate[0]}</span
                    >
                {/if}
                <DateSelector
                    disabled={$form.meetingResult}
                    name="returnToOriginalGradeDate"
                    hasError={!!$errors.returnToOriginalGradeDate}
                    handleDateChange
                    label="Tarikh Kembali ke Gred Asal"
                    bind:selectedDate={$proxyReturnToOriginalGradeDate}
                ></DateSelector>
                {#if $errors.returnToOriginalGradeDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.returnToOriginalGradeDate[0]}</span
                    >
                {/if}
                <DropdownField
                    disabled={$form.meetingResult}
                    id="newPlacement"
                    hasError={!!$errors.newPlacement}
                    dropdownType="label-left-full"
                    label="Penempatan Baru"
                    bind:value={$form.newPlacement}
                    options={placements}
                />
                {#if $errors.newPlacement}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.newPlacement[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <!-- STEPPER 3 -->
</Stepper>

<Toaster />
