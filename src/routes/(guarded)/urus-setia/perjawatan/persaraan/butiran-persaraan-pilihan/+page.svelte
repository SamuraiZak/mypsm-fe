<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { Badge } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';

    export let disabled: boolean = true;

    let errorData: any;
    let applicationConfirmationReview: string;
    let applicationConfirmationResult: any;
    let applicationApprovalReview: string;
    let applicationApprovalResult: any;
    let validateDocumentReview: string;
    let validateDocumentResult: any;
    let updateApplicationReview: string;
    let updateApplicationResult: any;
    let supporter1Option: any;
    let supporter2Option: any;
    let approverOption: any;

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

    const supportOptions: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

    const applicationConfirmationForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            applicationConfirmationResult: String(
                formData.get('applicationConfirmationResult'),
            ),
            applicationConfirmationReview: String(
                formData.get('applicationConfirmationReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            applicationConfirmationResult: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            applicationConfirmationReview: z
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

    const supporterApproverForm = async (event: Event) => {
        const supporter1OptionSelector = document.getElementById(
            'supporter1Option',
        ) as HTMLSelectElement;
        const supporter2OptionSelector = document.getElementById(
            'supporter2Option',
        ) as HTMLSelectElement;
        const approverOptionSelector = document.getElementById(
            'approverOption',
        ) as HTMLSelectElement;

        const exampleFormData = {
            supporter1Option: String(supporter1OptionSelector.value),
            supporter2Option: String(supporter2OptionSelector.value),
            approverOption: String(approverOptionSelector.value),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            supporter1Option: z.enum(['1', '2', '3', '4'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Pilihan perlu dipilih.'
                            : defaultError,
                }),
            }),
            supporter2Option: z.enum(['1', '2', '3', '4'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Pilihan perlu dipilih.'
                            : defaultError,
                }),
            }),
            approverOption: z.enum(['1', '2', '3', '4'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Pilihan perlu dipilih.'
                            : defaultError,
                }),
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
    const applicationApprovalForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            applicationApprovalResult: String(
                formData.get('applicationApprovalResult'),
            ),
            applicationApprovalReview: String(
                formData.get('applicationApprovalReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            applicationApprovalResult: z.enum(['lulus', 'tidakLulus'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            applicationApprovalReview: z
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
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        description="Maklumat-maklumat permohonan persaraan pilihan pekerja 0282378L"
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
                <p class="text-sm font-bold">Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="name"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Review'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Result</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="applicationConfirmationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <form
                        id="applicationConfirmationFormValidation"
                        on:submit|preventDefault={applicationConfirmationForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <LongTextField
                            hasError={errorData?.applicationConfirmationReview}
                            name="applicationConfirmationReview"
                            label="Ulasan/Tindakan"
                            bind:value={applicationConfirmationReview}
                        />
                        {#if errorData?.applicationConfirmationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.applicationConfirmationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="applicationConfirmationResult"
                            legend={''}
                            bind:userSelected={applicationConfirmationResult}
                        ></RadioSingle>
                        {#if errorData?.applicationConfirmationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.applicationConfirmationResult[0]}</span
                            >
                        {/if}
                    </form>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong & Pelulus"
            ><TextIconButton
                primary
                label="Hantar"
                form="supporterApproverFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="supporterApproverFormValidation"
                on:submit|preventDefault={supporterApproverForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <DropdownSelect
                            hasError={errorData?.supporter1Option}
                            dropdownType="label-left-full"
                            id="supporter1Option"
                            label="Nama Penyokong #1"
                            bind:value={supporter1Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.supporter1Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporter1Option[0]}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={errorData?.supporter2Option}
                            dropdownType="label-left-full"
                            id="supporter2Option"
                            label="Nama Penyokong #2"
                            bind:value={supporter2Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.supporter2Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporter2Option[0]}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={errorData?.approverOption}
                            dropdownType="label-left-full"
                            id="approverOption"
                            label="Nama Pelulus"
                            bind:value={approverOption}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.approverOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approverOption[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Status Sokongan dan Kelulusan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #1</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ismail Bin Ramdan'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #2</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Nurhamzah Binti Jamaludin'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Pelulus</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ramdan Bin Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Setuju diluluskan'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">LULUS</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kelulusan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="applicationApprovalFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="applicationApprovalFormValidation"
                on:submit|preventDefault={applicationApprovalForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <LongTextField
                            hasError={errorData?.applicationApprovalReview}
                            name="applicationApprovalReview"
                            label="Ulasan/Tindakan"
                            bind:value={applicationApprovalReview}
                        />
                        {#if errorData?.applicationApprovalReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.applicationApprovalReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            options={supportOptions}
                            name="applicationApprovalResult"
                            legend={''}
                            bind:userSelected={applicationApprovalResult}
                        ></RadioSingle>
                        {#if errorData?.applicationApprovalResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.applicationApprovalResult[0]}</span
                            >
                        {/if}

                        <p class="text-sm">
                            Nota: Notifikasi akan dihantar ke kakitangan untuk
                            mengisi borang persaraan
                        </p>
                    </div>
                </div>
            </form>
        </StepperContentBody>
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
