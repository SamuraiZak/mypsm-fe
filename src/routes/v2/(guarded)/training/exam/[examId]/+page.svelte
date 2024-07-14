<script lang="ts">
    import SvgDownload from '$lib/assets/svg/SvgDownload.svelte';
    import { error } from '@sveltejs/kit';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import QRCode, { type QRCodeRenderersOptions } from 'qrcode';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _editExamForm } from './+page';
    import { onMount } from 'svelte';
    export let data: PageData;

    let isReadonlyExamFormStepper: boolean = true;

    let qrData: string;
    let qrCanvas: HTMLCanvasElement;
    let qrImageUrl: string;

    $: {
        qrData = JSON.stringify(data.examInfoForm.data);
    }

    const opts: QRCodeRenderersOptions = {
        errorCorrectionLevel: 'H',
        margin: 4,
        scale: 3.3,
    };

    const getQRCode = async () => {
        try {
            await QRCode.toCanvas(qrCanvas, qrData, opts);
            const url = qrCanvas.toDataURL('image/jpeg', 1);
            qrImageUrl = url;
            console.log('QR code generated successfully!');
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    onMount(async () => {
        getQRCode();
    });

    // Superforms
    const { form, errors, enhance, isTainted } = superForm(data.examInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_examInfoResponseSchema),
        async onUpdated() {
            getQRCode();
        },
        async onSubmit() {
            if (!isTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _editExamForm($form);

            if (result.response.status === 'success')
                isReadonlyExamFormStepper = true;
        },
        taintedMessage: false,
    });
</script>

<ContentHeader title="Maklumat Lantikan Baru"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../../training/exam');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM">
            {#if isReadonlyExamFormStepper}
                <TextIconButton
                    type="neutral"
                    label="Kemaskini"
                    onClick={() => (isReadonlyExamFormStepper = false)}
                />
            {:else}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyExamFormStepper = false)}
                    form="examFormStepper"
                />
                <TextIconButton
                    type="neutral"
                    label="Batal"
                    onClick={() => (isReadonlyExamFormStepper = true)}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="mb-5 flex w-full flex-col rounded px-6 pb-6 shadow-[0_0_8px_0_rgba(0,0,0,0.2)]"
            >
                <h4 class="mb-2 mt-5 text-center text-md">
                    Ini adalah kod QR <span class="font-bold"
                        >MAKLUMAT PEPERIKSAAN</span
                    > untuk imbasan aplikasi mudah alih
                </h4>
                <div
                    class="flex w-full items-center gap-x-10 sm:flex-col lg:flex-row"
                >
                    <span class="flex flex-row items-baseline">
                        <canvas bind:this={qrCanvas}></canvas>
                    </span>
                    <div class="space-y-5 text-md">
                        <label
                            class="flex flex-col font-bold text-system-neutral"
                            for="name"
                            >TAJUK:
                            <span class="font-light text-black"
                                >{$form.examTitle}</span
                            >
                        </label>
                        <label
                            class="flex flex-col font-bold text-system-neutral"
                            for="name"
                            >TARIKH DIJALANKAN:
                            <span class="font-light text-black"
                                >{new Date(
                                    $form.examDate,
                                ).toLocaleDateString()}</span
                            >
                        </label>
                        <label
                            class="flex flex-col font-bold text-system-neutral"
                            for="name"
                            >LOKASI:
                            <span class="font-light text-black"
                                >{$form.examLocation}</span
                            >
                        </label>
                        {#if qrImageUrl}
                            <a
                                href={qrImageUrl}
                                class="px-1.5"
                                download="qrcode-peperiksaan-{$form.examTitle}.png"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Muat Turun Kod QR"
                                    onClick={() =>
                                        (isReadonlyExamFormStepper = true)}
                                >
                                    <SvgDownload />
                                </TextIconButton>
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
            <form
                id="examFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <input type="text" hidden bind:value={$form.id} />

                <CustomSelectField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examTypeId}
                    id="examTypeId"
                    label="Jenis Peperiksaan"
                    bind:val={$form.examTypeId}
                    options={data.selectionOptions.examTypeLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examTitle}
                    id="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:val={$form.examTitle}
                ></CustomTextField>

                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.startDate}
                    id="startDate"
                    label="Tarikh Mula Permohonan"
                    type="date"
                    bind:val={$form.startDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.endDate}
                    id="endDate"
                    label="Tarikh Tutup Permohonan"
                    type="date"
                    bind:val={$form.endDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examDate}
                    id="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:val={$form.examDate}
                ></CustomTextField>
                <CustomTextField
                    disabled={isReadonlyExamFormStepper}
                    errors={$errors.examLocation}
                    id="examLocation"
                    label="Lokasi Peperiksaan"
                    type="text"
                    bind:val={$form.examLocation}
                ></CustomTextField>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
