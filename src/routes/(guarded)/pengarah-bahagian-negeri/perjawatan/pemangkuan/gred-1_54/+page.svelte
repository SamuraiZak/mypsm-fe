<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgExchangeArrow from '$lib/assets/svg/SvgExchangeArrow.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _actingDirectorResultSchema,
        _submitActingDirectorResultForm,
    } from './+page';
    import type { PageData } from './$types';

    //===================== Stepper controls =====================
    let stepperIndex = 1;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    const directorOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Peraku',
        },
        {
            value: 'false',
            label: 'Tidak Peraku',
        },
    ];

    //reset what have been typed by user in the long text field for Tindakan/Ulasan
    function resetText() {
        
    }

    // ==================================
    // Form Validation ==================
    // ==================================
    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _actingDirectorResultSchema,
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Pemangkuan Gred 1-54"
        description="Sila semak maklumat-maklumat permohonan pemangkuan berikut"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/pemangkuan');
            }}
        >
            <SvgBlock />
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'PMGK-1234'}
        dataStatus={'Status: Sedang Diproses'}
    >
        <!-- Senarai Kakitangan Yang Terpilih -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Kakitangan Yang Dipilih"
                    ><TextIconButton
                        primary
                        label="Cetak"
                        onClick={() => {
                            alert('printing..');
                        }}
                    >
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        withRowSelection
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'program',
                            'skim',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <TextIconButton label="Set Semula" onClick={() => resetText()}
                    ><SvgExchangeArrow /></TextIconButton
                >
                <TextIconButton primary label="Hantar" form="formValidation"
                    ><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Keputusan daripada Pengarah Bahagian atau Negeri"
                ></SectionHeader>

                <div class="flex w-full flex-col gap-2">
                    <span class="text-sm italic text-system-primary"
                        >&#x2022; Keputusan akan dihantar ke email klinik dan
                        Urus Setia berkaitan</span
                    >
                </div>

                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    on:submit|preventDefault={_submitActingDirectorResultForm}
                    class="flex w-full flex-col gap-2"
                >
                    <LongTextField
                        hasError={$errors.directorRemark ? true : false}
                        labelBlack={false}
                        name="directorRemark"
                        label={'Tindakan/Ulasan'}
                        bind:value={$form.directorRemark}
                    />
                    {#if $errors.directorRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.directorRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        disabled={false}
                        options={directorOptions}
                        name="directorResult"
                        bind:userSelected={$form.directorResult}
                    />
                    {#if $errors.directorResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.directorResult[0]}</span
                        >
                    {/if}
                </form>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b"
                ></div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>

<Toaster />
