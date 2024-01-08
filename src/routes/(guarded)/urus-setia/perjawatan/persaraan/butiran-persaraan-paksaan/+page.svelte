<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { semakRekodTatatertibKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-paksaan/semak-rekod-tatatertib-kakitangan';
    import { Badge } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { status } from '$lib/mocks/urus-setia/persaraan/status';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';

    export let disabled: boolean = true;

    let selectedTahun = tahun[0].value;
    let selectedStatus = status[0].value;
    let target: any;
    let errorData: any;
    let validateApplicationReview: string;
    let validateApplicationResult: any;
    let validateDocumentReview: string;
    let validateDocumentResult: any;
    let updateApplicationReview: string;
    let updateApplicationResult: any;

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

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists;

    const validateApplicationForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            validateApplicationResult: String(
                formData.get('validateApplicationResult'),
            ),
            validateApplicationReview: String(
                formData.get('validateApplicationReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            validateApplicationResult: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            validateApplicationReview: z
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
    const validateDocumentForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            validateDocumentResult: String(
                formData.get('validateDocumentResult'),
            ),
            validateDocumentReview: String(
                formData.get('validateDocumentReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            validateDocumentResult: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            validateDocumentReview: z
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
        title="Rekod Permohonan Persaraan Paksaan 0282378L"
        description="Maklumat-maklumat permohonan persaraan paksaan pekerja 0282378L"
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
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Dokumen-dokumen telah disemak'}
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
        <StepperContentHeader title="Semak Rekod Tatatertib Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Senarai Tindakan/Ulasan Tatatertib"
                    ><DropdownSelect
                        id="tahunDropdown"
                        label="Tahun"
                        dropdownType="label-left"
                        bind:index={selectedTahun}
                        options={tahun}
                    ></DropdownSelect>
                    <DropdownSelect
                        id="statusDropdown"
                        label="Status"
                        dropdownType="label-left"
                        bind:index={selectedStatus}
                        options={status}
                    ></DropdownSelect></SectionHeader
                >
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        tableItems={semakRekodTatatertibKakitangan}
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
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="validateApplicationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="validateApplicationFormValidation"
                on:submit|preventDefault={validateApplicationForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <div>
                        <LongTextField
                            hasError={errorData?.validateApplicationReview}
                            name="validateApplicationReview"
                            label="Ulasan/Tindakan"
                            bind:value={validateApplicationReview}
                        />
                        {#if errorData?.validateApplicationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateApplicationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="validateApplicationResult"
                            legend={''}
                            bind:userSelected={validateApplicationResult}
                        ></RadioSingle>
                        {#if errorData?.validateApplicationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateApplicationResult[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="validateDocumentFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="validateDocumentFormValidation"
                on:submit|preventDefault={validateDocumentForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Dokumen Persaraan Kakitangan
                    </p>
                    <p class="text-sm">Fail-fail yang dimuat naik:</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li>
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pengesahan Urus Setia</p>
                    <div>
                        <LongTextField
                            hasError={errorData?.validateDocumentReview}
                            name="validateDocumentReview"
                            label="Ulasan/Tindakan"
                            bind:value={validateDocumentReview}
                        />
                        {#if errorData?.validateDocumentReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateDocumentReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="validateDocumentResult"
                            legend={''}
                            bind:userSelected={validateDocumentResult}
                        ></RadioSingle>
                        {#if errorData?.validateDocumentResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateDocumentResult[0]}</span
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
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
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
