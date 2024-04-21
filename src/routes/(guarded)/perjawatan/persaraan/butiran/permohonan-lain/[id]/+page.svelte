<script lang="ts">
    
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { z, ZodError } from 'zod';

    import type { PageData } from '../$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomBanner from '$lib/components/banner/CustomBanner.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';

    export let selectedFiles: any = [];
   

    let target: any;
    let errorData: any;
    let texthidden = false;
    onMount(() => {
        target = document.getElementById('fileInput');
    });

    // function handleOnChange() {
    //     texthidden = true;
    //     const files = target.files;
    //     if (files) {
    //         for (let i = 0; i < files.length; i++) {
    //             selectedFiles.push(files[i]);
    //         }
    //     }

    //     fileSelectionList.set(selectedFiles);
    // }

    // function handleDelete(index: number) {
    //     selectedFiles.splice(index, 1);
    //     fileSelectionList.set(selectedFiles);
    // }

    // const options: RadioOption[] = [
    //     {
    //         value: 'sah',
    //         label: 'Sah',
    //     },
    //     {
    //         value: 'tidakSah',
    //         label: 'Tidak Sah',
    //     },
    // ];

    const retirementConfirmationForm = async (event: Event) => {
        let uploadedFiles = selectedFiles;
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            uploadedFiles: uploadedFiles,
        };

        const exampleFormSchema = z.object({
            uploadedFiles: z.any().array().nonempty({
                message:
                    'Sila muat naik dokumen sokongan pada ruangan disediakan.',
            }),
        });

        // try {
        //     const result = exampleFormSchema.parse(exampleFormData);
        //     if (result) {
        //         errorData = [];
        //         toast.success('Berjaya disimpan!', {
        //             style: 'background: #333; color: #fff;',
        //         });

        //         const id = crypto.randomUUID().toString();
        //         const validatedExamFormData = { ...exampleFormData, id };
        //         console.log(
        //             'REQUEST BODY: ',
        //             JSON.stringify(validatedExamFormData),
        //         );
        //     }
        // } catch (err: unknown) {
        //     if (err instanceof ZodError) {
        //         const { fieldErrors: errors } = err.flatten();
        //         errorData = errors;
        //         console.log('ERROR!', err.flatten());
        //         toast.error(
        //             'Sila pastikan maklumat adalah lengkap dengan tepat.',
        //             {
        //                 style: 'background: #333; color: #fff;',
        //             },
        //         );
        //     }
        // }
    };

    //Retirement Verification
   
    //Update Application Delivery Information
   
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Persaraan Lain-lain"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Pilih Kakitangan untuk Persaraan Lain-lain"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Senarai Kakitangan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <!-- <DynamicTable
                        withRowSelection
                        selectAdd
                        tableItems={pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto(
                                '/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan',
                            );
                        }}
                    ></DynamicTable> -->
                    table
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Senarai Kakitangan Yang Dipilih</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <!-- <DynamicTable
                        withRowSelection
                        tableItems={pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto(
                                '/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan',
                            );
                        }}
                    ></DynamicTable> -->
                    table
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Masukkan Butiran Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Senarai Kakitangan Persaraan Lain-lain
                </p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <!-- <DynamicTable
                        tableItems={masukkanButiranPersaraan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto('');
                        }}
                    ></DynamicTable> -->
                    table
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Persaraan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperRetirementVerification"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Dokumen Persaraan Kakitangan
                    </p>
                    <p class="text-sm">Fail-fail untuk dimuat turun</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <!-- <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li> -->
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Muat Naik Dokumen</p>
                    <ContentHeader title="Dokumen Sokongan"
                        >
                        <!-- <div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div> -->
                        </ContentHeader
                    >

                    <div
                        class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                    >
                        <div class="flex flex-wrap gap-3">
                            <!-- {#each $fileSelectionList as item, index}
                                <FileInputFieldChildren
                                    childrenType="grid"
                                    handleDelete={() => handleDelete(index)}
                                    fileName={item.name}
                                />
                            {/each} -->
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2.5"
                        >
                            <!-- <p
                                class=" text-sm text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            >
                                Pilih fail dari peranti anda.
                            </p> -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- <div
                                class="text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            > -->
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
                            <!-- <div hidden={$fileSelectionList.length > 0}>
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div> -->
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

                    <p class="text-sm">Fail-fail untuk dimuat naik</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <!-- <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Persaraan.pdf"
                            />
                        </li> -->
                    </ul>
                <!-- </div> -->
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Pengesahan Urus Setia</p>

                    <div>
                        <CustomTextField
                            id="actionRemark"
                            label="Tindakan / Ulasan"
                            val=""
                        />
                       
                        <CustomRadioBoolean
                        disabled={false}
                        id="resultOption"
                        label="Keputusan"
                        val=""
                    ></CustomRadioBoolean>
                    </div>
                </div>
            </StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperUpdateApplicationDeliveryInformation"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Cetak Surat Iringan</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <!-- <li>
                            <DownloadAttachment fileName="Surat Iringan" />
                        </li> -->
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Maklumat Penghantaran Permohonan
                    </p>
                    <div>
                        <CustomTextField
                            id="actionRemarkUADI"
                            label="Tindakan / Ulasan"
                           val=""
                        />
                       
                        <!-- <RadioSingle
                            {options}
                            name="resultOptionUADI"
                            bind:userSelected={$updateApplicationDeliveryInformationForm.resultOptionUADI}
                        ></RadioSingle> -->
                        
                    </div>
                </div>
          </StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
