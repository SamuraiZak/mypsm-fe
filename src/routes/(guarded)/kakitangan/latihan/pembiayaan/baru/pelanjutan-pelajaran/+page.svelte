<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { years } from '$lib/mocks/dateSelection/years.js';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { fileSelectionList } from '$lib/stores/globalState.js';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { onMount } from 'svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { _stepperLessonInfo, _submitFormStepperLessonInfo } from './+page';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';

    export let data: PageData;
    export let selectedFiles: any = [];

    let activeStepper = 0;
    let target: any;
    let texthidden = false;
    let selectedExamResult: any = 'pass';
    let errorData: any;

    const results: RadioOption[] = [
        {
            value: 'pass',
            label: 'LULUS',
        },
        {
            value: 'fail',
            label: 'GAGAL',
        },
        {
            value: 'absent',
            label: 'TIDAK HADIR',
        },
    ];

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

    const supportDocuments = async (event: Event) => {
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

    //Staff Rating Update
    const {
        form: lessonInfoForm,
        errors: lessonInfoErrors,
        enhance: lessonInfoEnhance,
    } = superForm(data.stepperLessonInfo, {
        SPA: true,
        validators: _stepperLessonInfo,
        onSubmit() {
            _submitFormStepperLessonInfo($lessonInfoForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Pembiayaan Pembelajaran"
        description="Sila isi borang permohonan pembiayaan pembelajaran di bawah dengan butiran yang tepat dan lengkap."
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../../pembiayaan');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pelajaran Yang Akan Diikuti"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperLessonInfo"
                onClick={() => console.log('hehehhe')}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2 overflow-y-auto">
            <StepperContentBody
                ><form
                    id="FormStepperLessonInfo"
                    class="flex w-full flex-col gap-2"
                    use:lessonInfoEnhance
                    method="POST"
                >
                    <DropdownSelect
                        hasError={!!$lessonInfoErrors.eduLevel}
                        dropdownType="label-left-full"
                        id="eduLevel"
                        label="Peringkat Kursus Pengajian"
                        bind:value={$lessonInfoForm.eduLevel}
                        options={[
                            { value: 'diploma', name: 'Diploma' },
                            {
                                value: 'degree',
                                name: 'Ijazah Sarjana Muda',
                            },
                            { value: 'master', name: 'Ijazah' },
                            { value: 'phd', name: 'Doktor Falsafah' },
                        ]}
                    ></DropdownSelect>
                    {#if $lessonInfoErrors.eduLevel}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.eduLevel}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$lessonInfoErrors.courseName}
                        name="courseName"
                        label="Nama Kursus Pengajian"
                        bind:value={$lessonInfoForm.courseName}
                    />
                    {#if $lessonInfoErrors.courseName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.courseName[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$lessonInfoErrors.iptaName}
                        name="iptaName"
                        label="Nama IPTA"
                        bind:value={$lessonInfoForm.iptaName}
                    />
                    {#if $lessonInfoErrors.iptaName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.iptaName[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$lessonInfoErrors.institutions}
                        name="institutions"
                        label="Institusi/Pusat Pembelajaran"
                        bind:value={$lessonInfoForm.institutions}
                    />
                    {#if $lessonInfoErrors.institutions}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.institutions[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={!!$lessonInfoErrors.studyDuration}
                        name="studyDuration"
                        label="Tempoh Pengajian"
                        type="number"
                        bind:value={$lessonInfoForm.studyDuration}
                    />
                    {#if $lessonInfoErrors.studyDuration}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.studyDuration[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={!!$lessonInfoErrors.dateAdmission}
                        name="dateAdmission"
                        handleDateChange
                        label="Tarikh Kemasukan Ke IPTA"
                        bind:selectedDate={$lessonInfoForm.dateAdmission}
                    ></DateSelector>
                    {#if $lessonInfoErrors.dateAdmission}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.dateAdmission[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={!!$lessonInfoErrors.expectedEndDate}
                        name="expectedEndDate"
                        handleDateChange
                        label="Dijangka Tamat Pada"
                        bind:selectedDate={$lessonInfoForm.expectedEndDate}
                    ></DateSelector>
                    {#if $lessonInfoErrors.expectedEndDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$lessonInfoErrors.expectedEndDate[0]}</span
                        >
                    {/if}

                    <div
                        class="my-2.5 flex w-full flex-row items-start text-sm text-txt-tertiary"
                    >
                        <label for="study-type" class="w-[220px]"
                            >Jenis Pengajian</label
                        >
                        <span>
                            <ul
                                class="list-inside space-y-2.5 text-txt-secondary"
                            >
                                <li>
                                    <Checkbox value={'studyType'}
                                        >Pengajian Jarak Jauh</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'studyType'}
                                        >Pengajian Luar Kampus</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'studyType'}
                                        >Pengajian Separuh Masa</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'studyType'}
                                        >Pengajian Sepenuh Masa</Checkbox
                                    >
                                </li>
                            </ul></span
                        >
                    </div>
                    <div
                        class="my-2.5 flex w-full flex-row items-start text-sm text-txt-tertiary"
                    >
                        <label for="study-type" class="w-[220px]"
                            >Jenis Permohonan</label
                        >
                        <span>
                            <ul
                                class="list-inside space-y-2.5 text-txt-secondary"
                            >
                                <li>
                                    <Checkbox value={'value'}
                                        >Kebenaran Mengikuti Pengajian</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'value'}
                                        >Pelepasan Lembaga/Cuti Tanpa Rekod</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'value'}
                                        >Pembiayaan Pelajaran Sahaja</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox value={'value'}
                                        >Cuti Belajar Bergaji Penuh Dengan
                                        Pembiayaan</Checkbox
                                    >
                                </li>
                                <li>
                                    <Checkbox
                                        >Cuti Belajar Separuh Gaji Dengan
                                        Pembiayaan</Checkbox
                                    >
                                </li>
                            </ul></span
                        >
                    </div>
                </form></StepperContentBody
            >
        </div>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton
                primary
                label="Hantar"
                form="supportDocumentsValidation"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="supportDocumentsValidation"
                on:submit|preventDefault={supportDocuments}
                class="flex w-full flex-col gap-2"
            >
                <!-- Document Upload -->
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                >
                    <SectionHeader
                        title="Muat naik dokumen sokongan yang berkaitan:"
                        ><div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div></SectionHeader
                    >
                    <div
                        class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                    >
                        <div class="w-full">
                            {#if errorData?.uploadedFiles}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{errorData?.uploadedFiles[0]}</span
                                >
                            {/if}
                        </div>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-center gap-2.5"
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
                                    <FileInputField
                                        id="fileInput"
                                        {handleOnChange}
                                    ></FileInputField>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
