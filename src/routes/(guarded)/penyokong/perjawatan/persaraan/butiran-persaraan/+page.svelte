<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import {
        _stepperRetirementApplicationSupporter,
        _submitFormStepperRetirementApplicationSupporter,
    } from './+page';

    export let disabled = true;
    export let data: PageData;

    const options: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];

    const {
        form: retirementApplicationSupporterForm,
        errors: retirementApplicationSupporterErrors,
        enhance: retirementApplicationSupporterEnhance,
    } = superForm(data.stepperRetirementApplicationSupporterForm, {
        SPA: true,
        validators: _stepperRetirementApplicationSupporter,
        onSubmit() {
            _submitFormStepperRetirementApplicationSupporter(
                $retirementApplicationSupporterForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        description="Maklumat - maklumat permohonan persaraan pilihan pekerja 0282378L"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/penyokong/perjawatan/persaraan');
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
        <StepperContentHeader title="Penyokong Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperRetirementApplicationSupporter"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperRetirementApplicationSupporter"
                class="flex w-full flex-col gap-2"
                use:retirementApplicationSupporterEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Penyokong #2</p>
                    <div
                        class="flex h-fit w-full flex-col justify-start border-b border-bdr-primary"
                    >
                        <LongTextField
                            hasError={$retirementApplicationSupporterErrors.actionRemark
                                ? true
                                : false}
                            name="actionRemark"
                            label="Tindakan / Ulasan"
                            bind:value={$retirementApplicationSupporterForm.actionRemark}
                        />
                        {#if $retirementApplicationSupporterErrors.actionRemark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationSupporterErrors
                                    .actionRemark[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            {options}
                            name="resultOption"
                            legend="Keputusan"
                            bind:userSelected={$retirementApplicationSupporterForm.resultOption}
                        ></RadioSingle>
                        {#if $retirementApplicationSupporterErrors.resultOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationSupporterErrors
                                    .resultOption[0]}</span
                            >
                        {/if}
                    </div>
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
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
