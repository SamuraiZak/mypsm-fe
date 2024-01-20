<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperPermohonanPersaraan,
        _submitFormStepperPermohonanPersaraan,
    } from './+page';

    export let data: PageData;

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const {
        form: permohonanPersaraanForm,
        errors: permohonanPersaraanErrors,
        enhance: permohonanPersaraanEnhance,
    } = superForm(data.stepperPermohonanPersaraan, {
        SPA: true,
        validators: _stepperPermohonanPersaraan,
        onSubmit() {
            _submitFormStepperPermohonanPersaraan($permohonanPersaraanForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<ContentHeader
    title="Persaraan"
    description="Maklumat berkaitan dengan perjawatan - persaraan"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/perjawatan/persaraan');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Persaraan">
            <TextIconButton
                primary
                label="Simpan"
                form="FormStepperPermohonanPersaraan"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col">
                <form
                    id="FormStepperPermohonanPersaraan"
                    class="flex w-full flex-col gap-2"
                    use:permohonanPersaraanEnhance
                    method="POST"
                >
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm font-bold">Permohonan Persaraan</p>
                        <DateSelector
                            hasError={$permohonanPersaraanErrors.earlyRetirementDate
                                ? true
                                : false}
                            name="earlyRetirementDate"
                            handleDateChange
                            label="Tarikh Bersara Awal"
                            bind:selectedDate={$permohonanPersaraanForm.earlyRetirementDate}
                        ></DateSelector>
                        {#if $permohonanPersaraanErrors.earlyRetirementDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$permohonanPersaraanErrors
                                    .earlyRetirementDate[0]}</span
                            >
                        {/if}

                        <DateSelector
                            hasError={$permohonanPersaraanErrors.earlyRetirementApplicationDate
                                ? true
                                : false}
                            name="earlyRetirementApplicationDate"
                            handleDateChange
                            label="Tarikh Permohonan Persaraan Awal"
                            bind:selectedDate={$permohonanPersaraanForm.earlyRetirementApplicationDate}
                        ></DateSelector>
                        {#if $permohonanPersaraanErrors.earlyRetirementApplicationDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$permohonanPersaraanErrors
                                    .earlyRetirementApplicationDate[0]}</span
                            >
                        {/if}

                        <LongTextField
                            hasError={$permohonanPersaraanErrors.applicationPurpose
                                ? true
                                : false}
                            name="applicationPurpose"
                            label="Tujuan Permohonan"
                            bind:value={$permohonanPersaraanForm.applicationPurpose}
                        />
                        {#if $permohonanPersaraanErrors.applicationPurpose}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$permohonanPersaraanErrors
                                    .applicationPurpose[0]}</span
                            >
                        {/if}
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
