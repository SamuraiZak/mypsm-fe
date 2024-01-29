<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperPanelClinicApplicationVerification,
        _submitFormStepperPanelClinicApplicationVerification,
    } from './+page';
    import {
        _stepperSupporterApprover,
        _submitFormStepperSupporterApprover,
    } from './+page';

    export let data: PageData;
    export let disabled: boolean = true;

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

    // Panel Clinic Application Verification
    const {
        form: panelClinicApplicationVerificationForm,
        errors: panelClinicApplicationVerificationErrors,
        enhance: panelClinicApplicationVerificationEnhance,
    } = superForm(data.stepperPanelClinicApplicationVerification, {
        SPA: true,
        validators: _stepperPanelClinicApplicationVerification,
        onSubmit() {
            _submitFormStepperPanelClinicApplicationVerification(
                $panelClinicApplicationVerificationForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    // Supporter Approver
    const {
        form: supporterApproverForm,
        errors: supporterApproverErrors,
        enhance: supporterApproverEnhance,
    } = superForm(data.stepperSupporterApprover, {
        SPA: true,
        validators: _stepperSupporterApprover,
        onSubmit() {
            _submitFormStepperSupporterApprover($supporterApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Penambahan Klinik Panel"
        description="Masukkan maklumat klinik panel"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perubatan/permohonan-panel-klinik');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Klinik"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="nama-klinik"
                    label={'Nama Klinik'}
                    value={'Klinik Wee'}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel-klinik"
                    label={'Emel Klinik'}
                    value={'klinik.wee@gmail'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamat"
                    label={'Alamat'}
                    value={'ICOM Square'}
                ></LongTextField>
                <TextField
                    {disabled}
                    id="poskod"
                    label={'Poskod'}
                    value={'93250'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bandar"
                    label={'Bandar'}
                    value={'Kuching'}
                ></TextField>
                <TextField
                    {disabled}
                    id="negeri"
                    label={'Negeri'}
                    value={'Perlis'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Mula Lantikan'}
                    />
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Tamat Lantikan'}
                    />
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan Yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Fail-fail yang dimuat naik:</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment
                            fileName="Salinan-maklumat-klinik"
                        />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Salinan-maklumat-bank" />
                    </li>
                </ul>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Klinik Panel"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperPanelClinicApplicationVerification"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperPanelClinicApplicationVerification"
                class="flex w-full flex-col gap-2"
                use:panelClinicApplicationVerificationEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Ulasan Penyemakan daripada Urus Setia
                    </p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        <LongTextField
                            hasError={!!$panelClinicApplicationVerificationErrors.remark}
                            name="remark"
                            label="Tindakan / Ulasan"
                            bind:value={$panelClinicApplicationVerificationForm.remark}
                        />
                        {#if $panelClinicApplicationVerificationErrors.remark}
                            <span
                                class="ml-[-400px] font-sans text-sm italic text-system-danger"
                                >{$panelClinicApplicationVerificationErrors.remark}</span
                            >
                        {/if}
                        <RadioSingle
                            {options}
                            name="resultOption"
                            bind:userSelected={$panelClinicApplicationVerificationForm.resultOption}
                        ></RadioSingle>
                        {#if $panelClinicApplicationVerificationErrors.resultOption}
                            <span
                                class="ml-[-940px] font-sans text-sm italic text-system-danger"
                                >{$panelClinicApplicationVerificationErrors
                                    .resultOption[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperSupporterApprover"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperSupporterApprover"
                class="flex w-full flex-col gap-2"
                use:supporterApproverEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Ulasan Penyemakan daripada Penyokong dan Pelulus
                    </p>
                    <TextField
                        hasError={!!$supporterApproverErrors.supporterName}
                        name="supporterName"
                        label="Nama Penyokong"
                        bind:value={$supporterApproverForm.supporterName}
                    />
                    {#if $supporterApproverErrors.supporterName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.supporterName}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$supporterApproverErrors.approverName}
                        name="approverName"
                        label="Nama Pelulus"
                        bind:value={$supporterApproverForm.approverName}
                    />
                    {#if $supporterApproverErrors.approverName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.approverName}</span
                        >
                    {/if}
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Surat Pelantikan Klinik Panel"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Cetak Surat Pelantikan Klinik Panel
                </p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment
                            fileName="Surat Pelantikan Klinik Panel"
                        />
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
