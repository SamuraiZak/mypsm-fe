<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import { ZodError, z } from 'zod';
    import toast, { Toaster } from 'svelte-french-toast';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';

    const options: RadioOption[] = [
        {
            value: 'ada',
            label: 'Ada',
        },
        {
            value: 'tidak',
            label: 'Tidak Ada',
        },
    ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
    let currentGrade: string;
    let position: string;
    let interimStartDate: string = String(new Date());
    let interimEndDate: string = '';
    let vacantPlacement: string = '';
    let reasonOfVacant: string = '';
    let previousInterimFromDate: string = '';
    let previousInterimToDate: string = '';

    let selectedFiles: File[] = [];
    let hasHierchicalSkip: string = 'tidak';
    let target: any;
    let texthidden = false;
    let isChecked: boolean = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });

    // Function to handle the file changes
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

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    // =========================================================================
    // z validation schema and submit function for the interim form fields
    // =========================================================================
    let errorData: any;

    const textFieldSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const dateScheme = z.coerce.date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    });

    // Interim section
    const interimApplicationSchema = z.object({
        currentGrade: z.enum(['FT26', 'E32', 'E38'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        position: z.enum(
            ['Pegawai Sistem Maklumat', 'Pegawai Ekonomi', 'Pegawai Komputer'],
            {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            },
        ),
        ministryType: textFieldSchema,
        infoNumber: textFieldSchema,
        interimStartDate: dateScheme,
        interimEndDate: dateScheme.refine(
            (data) => data >= new Date(interimStartDate),
            { message: 'Tarikh tamat tidak boleh kurang daripada tarikh mula' },
        ),
        reasonOfVacant: longTextSchema,
        vacantPlacement: z.enum(['Kuala Lumpur', 'Kuching', 'Puchong'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    const submitInterimApplicationForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const gredSelector = document.getElementById(
            'currentGrade',
        ) as HTMLSelectElement;
        const positionSelector = document.getElementById(
            'position',
        ) as HTMLSelectElement;
        const placementSelector = document.getElementById(
            'vacantPlacement',
        ) as HTMLSelectElement;

        const interimApplicationData = {
            currentGrade: String(gredSelector.value),
            position: String(positionSelector.value),
            ministryType: String(formData.get('ministryType')),
            infoNumber: String(formData.get('infoNumber')),
            interimStartDate: String(formData.get('interimStartDate')),
            interimEndDate: String(formData.get('interimEndDate')),
            reasonOfVacant: String(formData.get('reasonOfVacant')),
            vacantPlacement: String(placementSelector.value),
        };

        try {
            const result = interimApplicationSchema.parse(
                interimApplicationData,
            );
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };

    // Previous interim dates section
    const previousInterimSchema = z.object({
        previousInterimFromDate: dateScheme,
        previousInterimToDate: dateScheme.refine(
            (data) => data >= new Date(interimStartDate),
            { message: 'Tarikh tamat tidak boleh kurang daripada tarikh mula' },
        ),
    });

    const submitPreviousInterimForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const interimApplicationData = {
            previousInterimFromDate: String(
                formData.get('previousInterimFromDate'),
            ),
            previousInterimToDate: String(
                formData.get('previousInterimToDate'),
            ),
        };

        if (previousInterimFromDate != '' || previousInterimToDate != '') {
            try {
                const result = previousInterimSchema.parse(
                    interimApplicationData,
                );
                if (result) {
                    errorData = [];
                    toast.success('Berjaya disimpan!', {
                        style: 'background: #333; color: #fff;',
                    });
                }
            } catch (error: unknown) {
                if (error instanceof ZodError) {
                    const { fieldErrors: errors } = error.flatten();
                    errorData = errors;
                    toast.error(
                        'Sila pastikan maklumat adalah lengkap dengan tepat.',
                        {
                            style: 'background: #333; color: #fff;',
                        },
                    );
                }
            }
        }
    };

    // Files section
    const uploadedFileSchema = z.object({
        uploadedFiles: z.any().array().nonempty({
            message: 'Sila muat naik dokumen - dokumen berkaitan.',
        }),
    });

    const submitFilesForm = async () => {
        let uploadedFiles = selectedFiles;
        const uploadedFileData = {
            uploadedFiles: uploadedFiles,
        };

        try {
            const result = uploadedFileSchema.parse(uploadedFileData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error('Sila pastikan dokumen telah dimuat naik.', {
                    style: 'background: #333; color: #fff;',
                });
            }
        }
    };

    // Seniority skipping section
    const hierchySkipSchema = z.object({
        hierchySkipReason: longTextSchema,
        declarationAcceptance: z.enum(['on'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tandakan kotak semak.'
                        : defaultError,
            }),
        }),
    });

    const submitHierchySkipForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const hierchySkipData = {
            hierchySkipReason: String(formData.get('hierchySkipReason')),
            declarationAcceptance: String(
                formData.get('declarationAcceptance'),
            ),
        };

        if (hasHierchicalSkip === 'ada') {
            try {
                const result = hierchySkipSchema.parse(hierchySkipData);
                if (result) {
                    errorData = [];
                    toast.success('Berjaya disimpan!', {
                        style: 'background: #333; color: #fff;',
                    });
                    setTimeout(() => goto('../../tanggung-kerja'), 1500);
                }
            } catch (error: unknown) {
                if (error instanceof ZodError) {
                    const { fieldErrors: errors } = error.flatten();
                    errorData = errors;
                    toast.error('Sila pastikan dokumen telah dimuat naik.', {
                        style: 'background: #333; color: #fff;',
                    });
                }
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tanggung Kerja"
        description="Borang Permohonan Tanggung Kerja"
        ><FormButton
            type="close"
            onClick={() => {
                goto('../');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja">
                <TextIconButton
                    primary
                    label="Simpan"
                    form="interimApplicationForm"
                />
            </StepperContentHeader>
            <StepperContentBody
                ><form
                    id="interimApplicationForm"
                    on:submit|preventDefault={submitInterimApplicationForm}
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={errorData?.currentGrade}
                        dropdownType="label-left-full"
                        id="currentGrade"
                        label="Gred Semasa"
                        bind:value={currentGrade}
                        options={[
                            { value: 'FT26', name: 'FT26' },
                            { value: 'E32', name: 'E32' },
                            { value: 'E38', name: 'E38' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.currentGrade}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.currentGrade}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={errorData?.position}
                        dropdownType="label-left-full"
                        id="position"
                        label="Jawatan"
                        bind:value={position}
                        options={[
                            {
                                value: 'Pegawai Sistem Maklumat',
                                name: 'Pegawai Sistem Maklumat',
                            },
                            {
                                value: 'Pegawai Ekonomi',
                                name: 'Pegawai Ekonomi',
                            },
                            {
                                value: 'Pegawai Komputer',
                                name: 'Pegawai Komputer',
                            },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.position}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.position}</span
                        >
                    {/if}
                    <TextField
                        disabled={false}
                        hasError={errorData?.ministryType}
                        name="ministryType"
                        label="Kementrian/Jabatan"
                        placeholder="-"
                        value=""
                    />
                    {#if errorData?.ministryType}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.ministryType}</span
                        >
                    {/if}
                    <TextField
                        disabled={false}
                        hasError={errorData?.infoNumber}
                        name="infoNumber"
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        placeholder="-"
                        value=""
                    />
                    {#if errorData?.infoNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.infoNumber}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={errorData?.interimStartDate}
                        name="interimStartDate"
                        disabled={false}
                        label={'Tarikh Mula'}
                        bind:selectedDate={interimStartDate}
                    ></DateSelector>
                    {#if errorData?.interimStartDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interimStartDate}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={errorData?.interimEndDate}
                        name="interimEndDate"
                        disabled={false}
                        label={'Tarikh Tamat'}
                        bind:selectedDate={interimEndDate}
                    ></DateSelector>
                    {#if errorData?.interimEndDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interimEndDate}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={errorData?.vacantPlacement}
                        dropdownType="label-left-full"
                        id="vacantPlacement"
                        label="Tempat Kekosongan"
                        bind:value={vacantPlacement}
                        options={[
                            { value: 'Kuala Lumpur', name: 'Kuala Lumpur' },
                            { value: 'Kuching', name: 'Kuching' },
                            { value: 'Puchong', name: 'Puchong' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.vacantPlacement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.vacantPlacement}</span
                        >
                    {/if}
                    <LongTextField
                        hasError={errorData?.reasonOfVacant}
                        name="reasonOfVacant"
                        label="Sebab-sebab Kekosongan"
                        bind:value={reasonOfVacant}
                    ></LongTextField>
                    {#if errorData?.reasonOfVacant}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.reasonOfVacant}</span
                        >
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama Pegawai"
                        disabled={true}
                        placeholder="-"
                        value="Mohd. Irfan Bin Abu"
                    />
                    <TextField
                        label="No. K/P"
                        disabled={true}
                        placeholder="-"
                        value="890701-13-5667"
                    />
                    <TextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Jawatan/Gred"
                        disabled={true}
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                    />
                    <TextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tempat Bertugas Semasa"
                        disabled={true}
                        placeholder="-"
                        value="Tempat 2"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja">
                <TextIconButton
                    primary
                    label="Simpan"
                    form="previousInterimForm"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja bagi Jawatan yang SAMA Sebelum Ini (Jika Ada)"
                    ></SectionHeader>
                    <form
                        id="previousInterimForm"
                        on:submit|preventDefault={submitPreviousInterimForm}
                        class="flex w-full gap-4"
                    >
                        <div class="flex w-full flex-col">
                            <DateSelector
                                hasError={errorData?.previousInterimFromDate}
                                name="previousInterimFromDate"
                                disabled={false}
                                label={'Dari'}
                                labelType="label-fit"
                                bind:selectedDate={previousInterimFromDate}
                            ></DateSelector>
                            {#if errorData?.previousInterimFromDate}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{errorData
                                        ?.previousInterimFromDate}</span
                                >
                            {/if}
                        </div>
                        <div class="flex w-full flex-col">
                            <DateSelector
                                hasError={errorData?.previousInterimToDate}
                                name="previousInterimToDate"
                                disabled={false}
                                label={'Hingga'}
                                labelType="label-fit"
                                bind:selectedDate={previousInterimToDate}
                            ></DateSelector>
                            {#if errorData?.previousInterimToDate}
                                <span
                                    class=" font-sans text-sm italic text-system-danger"
                                    >{errorData?.previousInterimToDate}</span
                                >
                            {/if}
                        </div>
                    </form>
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja yang Diperakukan"
                    ></SectionHeader>
                    <div class="flex w-full gap-4">
                        <DateSelector
                            disabled
                            labelType="label-fit"
                            label="Dari"
                            handleDateChange
                        />
                        <DateSelector
                            disabled
                            labelType="label-fit"
                            label="Hingga"
                            handleDateChange
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => submitFilesForm()}
                />
            </StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <SectionHeader title="Sertakan:" />
                    <ul
                        class="w-full list-disc pl-4 text-sm text-txt-secondary"
                    >
                        <li>
                            Carta Organisasi (Kedudukan Pegawai dan jawatan yang
                            Ditanggung Kerja);
                        </li>
                        <li>Salinan Surat Arahan Penangguhan Kerja;</li>
                        <li>Maklumat Cuti yang Terkini;</li>
                        <li>
                            Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai
                            Menanggung Kerja
                        </li>
                    </ul>

                    <SectionHeader title="Dokumen Sokongan"
                        ><div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div></SectionHeader
                    >
                    {#if errorData?.uploadedFiles}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{errorData?.uploadedFiles}</span
                        >
                    {/if}
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
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pelangkauan dari Segi Kekananan">
                <TextIconButton primary label="Simpan" form="hierchySkipForm" />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="hierchySkipForm"
                    on:submit|preventDefault={submitHierchySkipForm}
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader title="Pelangkauan dari Segi Kekananan"
                    ></SectionHeader>
                    <RadioSingle {options} bind:userSelected={hasHierchicalSkip}
                    ></RadioSingle>
                    {#if hasHierchicalSkip === 'ada'}
                        <LongTextField
                            hasError={errorData?.hierchySkipReason}
                            name="hierchySkipReason"
                            label="Jika Ada, sila nyatakan sebab-sebab pelangkauan"
                            placeholder="-"
                            value=""
                        ></LongTextField>
                        {#if errorData?.hierchySkipReason}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.hierchySkipReason}</span
                            >
                        {/if}
                        <div class="w-full py-10">
                            <Checkbox
                                name="declarationAcceptance"
                                bind:checked={isChecked}
                                ><span class="font-semibold"
                                    >Saya dengan ini mengesahkan bahawa maklumat
                                    sebagaimana yang dinyatakan berikut adalah
                                    benar.</span
                                ></Checkbox
                            >
                            {#if errorData?.declarationAcceptance}
                                <span
                                    class="ml-6 font-sans text-sm italic text-system-danger"
                                    >{errorData?.declarationAcceptance}</span
                                >
                            {/if}
                        </div>
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
