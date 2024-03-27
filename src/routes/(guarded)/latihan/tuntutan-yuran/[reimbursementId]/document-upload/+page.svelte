<script lang="ts">
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _submitDocumentForm } from './+page';
    import {
        _fundReimbursementDetailResponseSchema,
        _fundReimbursementUploadDocSchema,
    } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    let enableUploadDocument = false;

    const {
        form: fundReimbursementUploadDocumentForm,
        errors: fundReimbursementUploadDocumentError,
        enhance: fundReimbursementUploadDocumentEnhance,
    } = superForm(data.fundReimbursementUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        id: 'documentUploadForm',
        validators: zod(_fundReimbursementUploadDocSchema),
        onSubmit() {
            _submitDocumentForm(
                data.fundReimbursementId,
                $fundReimbursementUploadDocumentForm.documents,
            );
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        additionalFiles.forEach((file) => {
            $fundReimbursementUploadDocumentForm.documents = [
                ...$fundReimbursementUploadDocumentForm.documents,
                file,
            ];
        });
    };

    const handleDelete = (i: number) => {
        $fundReimbursementUploadDocumentForm.documents =
            $fundReimbursementUploadDocumentForm.documents.filter(
                (_, index) => {
                    return index !== i;
                },
            );
    };
</script>

<ContentHeader
    title="Sila Lengkapkan Maklumat Tuntutan Pembiayaan Yuran Pengajian"
>
    {#if !enableUploadDocument}
        <TextIconButton
            label="Batal"
            type="neutral"
            onClick={() => {
                goto('../../tuntutan-yuran');
            }}
        />
    {/if}
</ContentHeader>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <TextIconButton
                label="Simpan"
                form="documentUploadForm"
                type="primary"
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="documentUploadForm"
                    enctype="multipart/form-data"
                    use:fundReimbursementUploadDocumentEnhance
                >
                    {#if $fundReimbursementUploadDocumentError.documents}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >Sila muat naik dokumen barkaitan dan pastikan tidak
                            melebihi 4MB.</span
                        >
                    {/if}
                    <ContentHeader
                        title="Sila pastikan dokumen berkenaan dimuat naik"
                        borderClass="border-none"
                    >
                        <div
                            hidden={$fundReimbursementUploadDocumentForm
                                .documents.length < 1}
                        >
                            <FileInputField
                                id="documents"
                                handleOnInput={(e) => handleOnInput(e)}
                            ></FileInputField>
                        </div>
                    </ContentHeader>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                    >
                        <div class="flex flex-wrap gap-3">
                            {#each $fundReimbursementUploadDocumentForm.documents as _, i}
                                <FileInputFieldChildren
                                    childrenType="grid"
                                    handleDelete={() => handleDelete(i)}
                                    document={$fundReimbursementUploadDocumentForm
                                        .documents[i]}
                                />
                            {/each}
                        </div>
                        {#if $fundReimbursementUploadDocumentForm.documents.length < 1}
                            <div
                                class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                            >
                                <span>Pilih fail dari peranti anda.</span>
                                <svg
                                    width={40}
                                    height={40}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                <FileInputField
                                    id="documents"
                                    handleOnInput={(e) => handleOnInput(e)}
                                ></FileInputField>
                            </div>
                        {/if}
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>

<Toaster />
