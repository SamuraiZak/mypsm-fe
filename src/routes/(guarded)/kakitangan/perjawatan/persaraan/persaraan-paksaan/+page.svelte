<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import { Badge } from 'flowbite-svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { onMount } from 'svelte';

    export let disabled: boolean = true;
    export let selectedFiles: any = [];

    let target: any;
    let errorData: any;
    let texthidden = false;
    onMount(() => {
        target = document.getElementById('fileInput');
    });

    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    const retirementDocumentForm = async (event: Event) => {
        let uploadedFiles = selectedFiles;
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            uploadedFiles: uploadedFiles,
        };

        const exampleFormSchema = z.object({
            // checkbox schema

            uploadedFiles: z.any().array().nonempty({
                message:
                    'Sila muat naik dokumen sokongan pada ruangan disediakan.',
            }),
        });

        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
    const updateApplicationForm = async (event: Event) => {
        const exampleFormData = {};

        const exampleFormSchema = z.object({
            // checkbox schema
        });

        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Persaraan"
        description="Maklumat berkaitan dengan perjawatan - persaraan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/kakitangan/perjawatan/persaraan/');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Unit Integriti</p>
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
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Persaraan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hakimi Bin Urash'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Permohonan disahkan'}
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
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="retirementDocumentFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="retirementDocumentFormValidation"
                on:submit|preventDefault={retirementDocumentForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div
                        class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                    >
                        <p class="text-sm font-bold">
                            Dokumen Persaraan Kakitangan
                        </p>
                        <p class="text-sm">
                            Fail-fail untuk dimuat turun dan diisi:
                        </p>
                        <ul
                            class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                        >
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                            <li>
                                <DownloadAttachment fileName="JPA BP_SPPP B01a"
                                ></DownloadAttachment>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start"
                    ></div>
                    <p class="text-sm font-bold">Muat Naik Dokumen</p>
                    <SectionHeader subTitle="Dokumen Sokongan"
                        ><div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div></SectionHeader
                    >

                    <div
                        class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                    >
                        <div class="flex flex-wrap gap-3">
                            {#each $fileSelectionList as item, index}
                                <FileInputFieldChildren
                                    childrenType="grid"
                                    handleDelete={() => handleDelete(index)}
                                    fileName={item.name}
                                />
                            {/each}
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2.5"
                        >
                            <p
                                class=" text-sm text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            >
                                Pilih fail dari peranti anda.
                            </p>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div
                                class="text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            >
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
                            </div>
                            <div hidden={$fileSelectionList.length > 0}>
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        {#if errorData?.uploadedFiles}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >{errorData?.uploadedFiles[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
