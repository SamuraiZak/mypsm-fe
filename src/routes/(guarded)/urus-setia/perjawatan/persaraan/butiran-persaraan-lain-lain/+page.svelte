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

    export let selectedFiles: any = [];

    let target: any;
    let errorData: any;
    let retirementConfirmationReview: any;
    let retirementConfirmationResult: any;
    let updateApplicationReview: any;
    let updateApplicationResult: any;

    onMount(() => {
        target = document.getElementById('hello');
    });

    function handleOnChange() {
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }
    }

    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
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

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            retirementConfirmationResult: String(formData.get('retirementConfirmationResult')),
            retirementConfirmationReview: String(formData.get('retirementConfirmationReview')),
            updateApplicationResult: String(formData.get('updateApplicationResult')),
            updateApplicationReview: String(formData.get('updateApplicationReview')),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            result: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            Review: z
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
                on:submit|preventDefault={submitForm}
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
                    <div
                        class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                    >
                        <p class="text-base text-txt-secondary">
                            Seret dan lepas fail anda ke dalam ruangan ini atau
                            pilih fail dari peranti anda
                        </p>
                        <span>
                            <FileInputField />
                        </span>
                    </div>
                    <p class="text-sm text-rose-500">
                        Sila muat naik dokumen sokongan pada ruangan disediakan.
                    </p>

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
                                >{errorData?.retirementConfirmationReview[0]}</span
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
                                >{errorData?.retirementConfirmationResult[0]}</span
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
                on:submit|preventDefault={submitForm}
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
