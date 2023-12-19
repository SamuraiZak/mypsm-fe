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
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState.js';
    import { onMount } from 'svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockEmployeeAllowanceDocList } from '$lib/mocks/elaun/mockEmployeeAllowanceDocList.js';
    import { studyTypes } from '$lib/config/latihanOptions/courseTypes.js';
    export let data;
    let activeStepper = 0;
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;
    let selectedExamResult: any = 'pass';
    let isCompleted: boolean =
        data.record.currentApplication.status === 'LULUS - Mesyuarat';

    const results: RadioOption[] = [
        {
            value: 'pass',
            label: 'LULUS',
        },
        {
            value: 'fail',
            label: 'TIDAK LULUS',
        },
    ];

    let currentEmployeeUploadedDocuments = mockEmployeeAllowanceDocList.filter(
        (document) => {
            return document.id === 1;
        },
    )!;

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
        ></StepperContentHeader>
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    disabled={true}
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="edu-level-dropdown"
                    label="Peringkat Kursus Pengajian"
                    bind:value={data.record.currentApplication.courseLevel}
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
                    disabled={true}
                    labelBlack={false}
                    label="Nama Kursus Pengajian"
                    value={data.record.currentApplication.courseName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Nama IPTA"
                    value={data.record.currentApplication.instituteName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Institusi/Pusat Pembelajaran"
                    value={data.record.currentApplication.instituteCenter}
                />
                <TextField
                    disabled={true}
                    type="number"
                    labelBlack={false}
                    label="Tempoh Pengajian"
                    value={data.record.currentApplication.coursePeriod}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Tarikh Kemasukan Ke IPTA"
                    selectedDate={data.record.currentApplication
                        .courseStartDate}
                    handleDateChange={() => {}}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Dijangka Tamat Pada"
                    selectedDate={data.record.currentApplication.courseEndDate}
                    handleDateChange={() => {}}
                />

                <div
                    class="my-2.5 flex w-full flex-row items-start text-sm text-txt-tertiary"
                >
                    <label for="study-type" class="w-[220px]"
                        >Jenis Pengajian</label
                    >
                    <span>
                        <ul class="list-inside space-y-2.5 text-txt-secondary">
                            <li>
                                <Checkbox
                                    disabled={true}
                                    value={'Pengajian Jarak Jauh'}
                                    >Pengajian Jarak Jauh</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox
                                    disabled={true}
                                    value={'Pengajian Luar Kampus'}
                                    >Pengajian Luar Kampus</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox
                                    disabled={true}
                                    value={'Pengajian Separuh Masa'}
                                    >Pengajian Separuh Masa</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox
                                    disabled={true}
                                    value={'Pengajian Sepenuh Masa'}
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
                        <ul class="list-inside space-y-2.5 text-txt-secondary">
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Kebenaran Mengikuti Pengajian</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Pelepasan Lembaga/Cuti Tanpa Rekod</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Pembiayaan Pelajaran Sahaja</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Cuti Belajar Bergaji Penuh Dengan
                                    Pembiayaan</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true}
                                    >Cuti Belajar Separuh Gaji Dengan Pembiayaan</Checkbox
                                >
                            </li>
                        </ul></span
                    >
                </div>
            </StepperContentBody>
        </div>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"></StepperContentHeader>
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Permohonan Pembiayaan Pelajaran"
        ></StepperContentHeader>
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                {#if isCompleted}
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Kumpulan Mesyuarat"
                    />
                    <div
                        class="mb-2.5 flex w-full flex-row items-center text-sm italic"
                    >
                        <label for="file-download" class="w-[220px]"
                            >Borang - borang berkaitan yang akan dijana
                            sekiranya lulus:</label
                        >
                        <span>
                            <ul
                                class="list-inside list-decimal text-txt-secondary"
                            >
                                <li>Surat Lulus Permohonan.</li>
                            </ul>
                        </span>
                    </div>
                    <TextField
                        disabled={true}
                        labelBlack={false}
                        label="Nama dan Bilangan Mesyuarat"
                        value={'1/02'}
                    />
                    <DateSelector
                        disabled={true}
                        labelBlack={false}
                        label="Tarikh Mesyuarat"
                        selectedDate={'2023-12-01'}
                        handleDateChange={() => {}}
                    />
                    <LongTextField
                        disabled={true}
                        labelBlack={false}
                        name="meeting-remark"
                        label="Tindakan/Ulasan Mesyuarat"
                        value={'layak'}
                    />
                    <RadioSingle
                        disabled={true}
                        labelBlack={false}
                        options={results}
                        legend="Keputusan Peperiksaan"
                        bind:userSelected={selectedExamResult}
                    />
                    <div class="flex w-full flex-row items-center">
                        <hr />
                        <label
                            for="file-download"
                            class="w-[220px] text-base text-system-primary"
                            >Cetak Surat LULUS Permohonan:</label
                        >
                        <IconButton><SvgPdf size="24" /></IconButton>
                        <hr />
                    </div>
                {:else}
                    <div
                        class="mb-2.5 flex w-full flex-row items-center text-sm italic text-system-primary"
                    >
                        <label for="file-download" class="w-[220px]"
                            >Menunggu keputusan mesyuarat...</label
                        >
                    </div>
                {/if}
            </StepperContentBody>
        </div>
    </StepperContent>
</Stepper>
