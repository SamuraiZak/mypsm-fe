<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { fileSelectionList } from '$lib/stores/globalState.js';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { onMount } from 'svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    export let data;
    let activeStepper = 0;
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;
    let selectedExamResult: any = 'pass';

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
            ><TextIconButton primary label="Simpan" /></StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="edu-level-dropdown"
                    label="Peringkat Kursus Pengajian"
                    bind:value={data.record.newStudyAllowanceApplication
                        .courseLevel}
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
                <TextField
                    labelBlack={false}
                    label="Nama Kursus Pengajian"
                    bind:value={data.record.newStudyAllowanceApplication
                        .courseName}
                />
                <TextField
                    labelBlack={false}
                    label="Nama IPTA"
                    bind:value={data.record.newStudyAllowanceApplication
                        .instituteName}
                />
                <TextField
                    labelBlack={false}
                    label="Institusi/Pusat Pembelajaran"
                    bind:value={data.record.newStudyAllowanceApplication
                        .instituteCenter}
                />
                <TextField
                    type="number"
                    labelBlack={false}
                    label="Tempoh Pengajian"
                    bind:value={data.record.newStudyAllowanceApplication
                        .coursePeriod}
                />
                <DateSelector
                    labelBlack={false}
                    label="Tarikh Kemasukan Ke IPTA"
                    bind:selectedDate={data.record.newStudyAllowanceApplication
                        .courseStartDate}
                    handleDateChange={() => {}}
                />
                <DateSelector
                    labelBlack={false}
                    label="Dijangka Tamat Pada"
                    bind:selectedDate={data.record.newStudyAllowanceApplication
                        .courseEndDate}
                    handleDateChange={() => {}}
                />
                <TextField
                    labelBlack={false}
                    label="Keputusan Akhir (CGPA)"
                    bind:value={data.record.newStudyAllowanceApplication
                        .finalResult}
                />
                <DropdownSelect
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="claim-semester-dropdown"
                    label="Tuntutan Untuk Semester"
                    bind:value={data.record.newStudyAllowanceApplication
                        .claimSemester}
                    options={[
                        { value: '4', name: '4' },
                        { value: '5', name: '5' },
                        { value: '6', name: '6' },
                    ]}
                ></DropdownSelect>

                <TextField
                    type="number"
                    labelBlack={false}
                    label="Jumlah Tuntutan (RM)"
                    bind:value={data.record.newStudyAllowanceApplication
                        .claimAmount}
                />
            </StepperContentBody>
        </div>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton primary label="Simpan" /></StepperContentHeader
        >
        <StepperContentBody>
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
            <p class="pb-5 text-sm text-system-danger">
                Sila muat naik dokumen sokongan anda pada ruangan yang
                disediakan di atas.
            </p>
        </StepperContentBody>
    </StepperContent>
</Stepper>
