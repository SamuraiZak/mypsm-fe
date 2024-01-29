<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperSecretaryResult,
        _submitFormStepperSecretaryResult,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let disabled: boolean = true;
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

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];

    // Secretary Result
    const {
        form: secretaryResultForm,
        errors: secretaryResultErrors,
        enhance: secretaryResultEnhance,
    } = superForm(data.stepperSecretaryResult, {
        SPA: true,
        validators: _stepperSecretaryResult,
        onSubmit() {
            _submitFormStepperSecretaryResult($secretaryResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tuntutan Perubatan"
        description="Butiran-butiran permohonan tuntutan perubatan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perubatan/bil-tuntutan-kakitangan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
                <TextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    value={'Irfan Bin Abu'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jawatan"
                    label={'Jawatan'}
                    value={'Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pembayaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="jumlah-tunggakan"
                        label={'Jumlah Tunggakan (RM)'}
                        value={'100.00'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kaedah-pembayaran"
                        label={'Kaedah Pembayaran'}
                        value={'Transaksi Atas Talian'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="no-rujukan-transaksi"
                        label={'No Rujukan Transaksi'}
                        value={'2'}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Transaksi'}
                    />
                    <DownloadAttachment
                        label="Bukti Pembayaran"
                        fileName="Receipt.png"
                    ></DownloadAttachment>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Urus Setia"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperSecretaryResult"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperSecretaryResult"
                class="flex w-full flex-col gap-2"
                use:secretaryResultEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Sila Tetapkan Keputusan (Urus Setia)
                    </p>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        ● Keputusan akan dihantar ke email klinik dan Urus Setia
                        negeri berkaitan
                    </p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        <LongTextField
                            hasError={!!$secretaryResultErrors.remark}
                            name="remark"
                            label="Tindakan / Ulasan"
                            bind:value={$secretaryResultForm.remark}
                        />
                        {#if $secretaryResultErrors.remark}
                            <span
                                class="ml-[-400px] font-sans text-sm italic text-system-danger"
                                >{$secretaryResultErrors.remark}</span
                            >
                        {/if}
                        <RadioSingle
                            {options}
                            name="resultOption"
                            bind:userSelected={$secretaryResultForm.resultOption}
                        ></RadioSingle>
                        {#if $secretaryResultErrors.resultOption}
                            <span
                                class="ml-[-940px] font-sans text-sm italic text-system-danger"
                                >{$secretaryResultErrors.resultOption}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
