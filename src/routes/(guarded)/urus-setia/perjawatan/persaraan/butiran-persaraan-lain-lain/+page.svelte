<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan';
    import { masukkanButiranPersaraan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/masukkan-butiran-persaraan';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';

    export let selectedFiles: any = [];

    let target: any;
    let errorData: any;
    let retirementConfirmationReview: any;
    let retirementConfirmationResult: any;
    let updateApplicationReview: any;
    let updateApplicationResult: any;
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
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            updateApplicationResult: String(
                formData.get('updateApplicationResult'),
            ),
            updateApplicationReview: String(
                formData.get('updateApplicationReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            updateApplicationResult: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            updateApplicationReview: z
                .string({ required_error: 'Medan ini tidak boleh kosong.' })
                .min(4, {
                    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
                })
                .max(124, {
                    message: 'Medan ini tidak boleh melebihi 124 karakter.',
                })
                .trim(),
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
        title="Persaraan Lain-lain"
        description="Hal-hal berkaitan Persaraan Lain-lain"
        ><FormButton
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
                    <DynamicTable
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
                    ></DynamicTable>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Senarai Kakitangan Yang Dipilih</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        withRowSelection
                        tableItems={pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto(
                                '/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan',
                            );
                        }}
                    ></DynamicTable>
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
                    <DynamicTable
                        tableItems={masukkanButiranPersaraan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto('');
                        }}
                    ></DynamicTable>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="retirementConfirmationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="retirementConfirmationFormValidation"
                on:submit|preventDefault={retirementConfirmationForm}
                class="flex w-full flex-col gap-2"
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
                        <li>
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
                        </li>
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
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

                    <p class="text-sm">Fail-fail untuk dimuat naik</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
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
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Pengesahan Urus Setia</p>

                    <div>
                        <LongTextField
                            hasError={errorData?.Review}
                            name="retirementConfirmationReview"
                            label="Ulasan/Tindakan"
                            bind:value={retirementConfirmationReview}
                        />
                        {#if errorData?.retirementConfirmationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.retirementConfirmationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="retirementConfirmationResult"
                            legend={''}
                            bind:userSelected={retirementConfirmationResult}
                        ></RadioSingle>
                        {#if errorData?.retirementConfirmationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.retirementConfirmationResult[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                primary
                label="Hantar"
                form="updateApplicationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="updateApplicationFormValidation"
                on:submit|preventDefault={updateApplicationForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Cetak Surat Iringan</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="Surat Iringan" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Maklumat Penghantaran Permohonan
                    </p>
                    <div>
                        <LongTextField
                            hasError={errorData?.updateApplicationReview}
                            name="updateApplicationReview"
                            label="Ulasan/Tindakan"
                            bind:value={updateApplicationReview}
                        />
                        {#if errorData?.updateApplicationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.updateApplicationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="updateApplicationResult"
                            legend={''}
                            bind:userSelected={updateApplicationResult}
                        ></RadioSingle>
                        {#if errorData?.updateApplicationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.updateApplicationResult[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
