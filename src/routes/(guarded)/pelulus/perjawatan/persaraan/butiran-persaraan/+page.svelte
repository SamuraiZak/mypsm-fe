<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import {
        _stepperRetirementApplicationApproval,
        _submitFormStepperRetirementApplicationApproval,
    } from './+page';

    export let disabled = true;
    export let data: PageData;

    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

    const {
        form: retirementApplicationApprovalForm,
        errors: retirementApplicationApprovalErrors,
        enhance: retirementApplicationApprovalEnhance,
    } = superForm(data.stepperRetirementApplicationApproval, {
        SPA: true,
        validators: _stepperRetirementApplicationApproval,
        onSubmit() {
            _submitFormStepperRetirementApplicationApproval(
                $retirementApplicationApprovalForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        description="Maklumat-maklumat permohonan persaraan pilihan pekerja 0282378L"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/pelulus/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Permohonan persaraan DIPERAKU'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Persaraan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Permohonan persaraan diperaku'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SAH</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Penyokong #2</p>
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ikhwan Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Maklumat Lengkap'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <div class="flex w-full items-center justify-center"></div>
                    <p class="text-sm font-bold">Penyokong #1</p>
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ikhwan Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Maklumat Lengkap'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kelulusan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperRetirementApplicationApproval"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperRetirementApplicationApproval"
                class="flex w-full flex-col gap-2"
                use:retirementApplicationApprovalEnhance
                method="POST"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pelulus</p>
                    <div class="flex h-fit w-full flex-col justify-start">
                        <LongTextField
                            hasError={$retirementApplicationApprovalErrors.actionRemark
                                ? true
                                : false}
                            name="actionRemark"
                            label="Tindakan / Ulasan"
                            bind:value={$retirementApplicationApprovalForm.actionRemark}
                        />
                        {#if $retirementApplicationApprovalErrors.actionRemark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationApprovalErrors
                                    .actionRemark[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            {options}
                            hasError={$retirementApplicationApprovalErrors.resultOption
                                ? true
                                : false}
                            name="resultOption"
                            legend="Keputusan"
                            bind:userSelected={$retirementApplicationApprovalForm.resultOption}
                        ></RadioSingle>
                        {#if $retirementApplicationApprovalErrors.resultOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationApprovalErrors
                                    .resultOption[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>

<Toaster />
