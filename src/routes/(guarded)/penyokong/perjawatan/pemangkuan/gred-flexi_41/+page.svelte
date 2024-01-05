<script lang="ts">
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { positions } from '$lib/mocks/positions/positions';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import type { DtoCalonPemangkuan } from '$lib/interfaces/database/actingApplication';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

    export let disabled: boolean = true;

    const salaryMonths = [
        { value: '1', name: 'Januari' },
        { value: '2', name: 'April' },
        { value: '3', name: 'Julai' },
        { value: '4', name: 'Oktober' },
    ];

    let selectedMeetingType: string = meetings[0].value;
    let selectedSalaryMonth: string = '1';
    let selectedGred: string = greds[0].value;

    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

    let radioChosen: string = '';
    let textFieldValue: string = 'Butiran Lengkap...';
    const supportOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Sokong',
        },
        {
            value: 'false',
            label: 'Tidak Sokong',
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

    //===================== Stepper controls =====================
    let stepperIndex = 9;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //Date Selector for Tarikh Lapor Diri
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let tempSelectedCandidatesList: DtoCalonPemangkuan[] = [];

    let currentData: any = {};

    let placeholderData: any = {};

    //===================== Step 1 =====================

    // Step 1 script starts here
    let editingCandidateList = false;

    //zod validation
    let errorData: any;
    const exampleFormSchema = z.object({
        //TextField
        remarks: z
            .string({ required_error: 'Tindakan/Ulasan tidak boleh kosong.' })
            .min(20, {
                message: 'Tindakan/Ulasan hendaklah melebihi 20 karakter.',
            })
            .max(124, {
                message: 'Tindakan/Ulasan tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        //Radio Button
        certify: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            certify: String(formData.get('certify')),
            remarks: String(formData.get('remarks')),
        };
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
                    'Sila pastikan semua maklumat adalah lengkap dan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'ID Pemangkuan #77699'}
        dataStatus={'Sedang Diproses'}
    >
        <!-- =========================================================== -->
        <!-- Senarai Kakitangan Yang Terpilih -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Search Kakitangan Yang Dipilih -->
            <StepperContentBody>
                <SectionHeader title=" Senarai Kakitangan Yang Dipilih">
                    <TextIconButton label="cetak" primary onClick={() => {}}>
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>

                <CustomTabContent>
                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="Gred"></FilterTextInput>
                                <FilterTextInput label="Jawatan"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol tolak untuk kelarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                        ></SectionHeader>

                        <!-- Table Senarai Kakitangan Yang Dipilih -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            withRowSelection
                            onSelect={() => {
                                console.log('pop selected here');
                            }}
                            editable
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'gred',
                                'gredSemasa',
                                'penempatanSemasa',
                            ]}
                        ></DynamicTable>
                    </div>
                </CustomTabContent>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <!-- TODO: put buttons in this area if necessary -->
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgXMark></SvgXMark>
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Maklumat Peraku Keputusan Mesyuarat -->
            <StepperContentBody>
                <div
                    class="my-2 w-full border-b-8 border-l-2 border-r-2 border-t-8 p-2.5"
                >
                    <SectionHeader title=" Maklumat Peraku Keputusan Mesyuarat"
                    ></SectionHeader>

                    <div class="flex w-full flex-col gap-2.5">
                        <DropdownSelect
                            {disabled}
                            id="meeting-type"
                            label="Nama Urus Setia Integriti"
                            dropdownType="label-left-full"
                            options={meetings}
                            bind:index={selectedMeetingType}
                        />

                        <DropdownSelect
                            {disabled}
                            id="salary-movement-month-type"
                            label="Nama Pengarah Bahagian/Negeri"
                            dropdownType="label-left-full"
                            options={salaryMonths}
                            bind:index={selectedSalaryMonth}
                        />
                    </div>

                    <!-- Search Kakitangan Yang Dipilih -->
                    <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
                        <CustomCard borderClass="border-system-primary">
                            <CustomCardBody>
                                <div
                                    class="flex w-full flex-wrap items-center gap-2.5"
                                >
                                    <FilterTextInput label="Gred"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Jawatan"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Nama"
                                    ></FilterTextInput>
                                    <FilterTextInput label="No. K/P"
                                    ></FilterTextInput>

                                    <TextIconButton
                                        label="cari"
                                        primary
                                        onClick={() => {}}
                                    >
                                        <SvgManifyingGlass></SvgManifyingGlass>
                                    </TextIconButton>
                                </div>
                            </CustomCardBody>
                        </CustomCard>

                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <SectionHeader
                                subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                            >
                                <TextIconButton primary label="Tidak Lulus">
                                    <SvgBlock></SvgBlock>
                                </TextIconButton>
                                <TextIconButton primary label="Lulus">
                                    <SvgDoubleTick></SvgDoubleTick>
                                </TextIconButton>
                                <TextIconButton primary label="">
                                    <SvgArrowRight></SvgArrowRight>
                                </TextIconButton>
                            </SectionHeader>
                        </div>

                        <!-- Table Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan -->
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DataTable title="Hasil Carian">
                                <DtTableHead>
                                    <DtTableHeadCell title="Bil"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="No.Pekerja"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Nama Pekerja"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="No. Kad Pengenalan"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Program"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Skim"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Gred"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Nama Jawatan"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell title="Penempatan Sekarang"
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell
                                        title="Keputusan Pemilihan "
                                    ></DtTableHeadCell>
                                    <DtTableHeadCell></DtTableHeadCell>
                                </DtTableHead>
                                <DtTableBody>
                                    {#each mockPerjawatanPemangkuan as item, i (i)}
                                        <DtTableRow>
                                            <DtTableDataCell value={i + 1}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.nomborPekerja}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.namaPekerja}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.noKadPengenalan}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.program}
                                            ></DtTableDataCell>
                                            <DtTableDataCell value={item.skim}
                                            ></DtTableDataCell>
                                            <DtTableDataCell value={item.gred}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.namaJawatan}
                                            ></DtTableDataCell>
                                            <DtTableDataCell
                                                value={item.penempatanSekarang}
                                            ></DtTableDataCell>
                                            <DtTableDataCell>
                                                <DropdownSelect
                                                    id="keputusanPemilihan"
                                                    label=""
                                                    dropdownType="label-left"
                                                    options={positions}
                                                />
                                            </DtTableDataCell>
                                            <DtTableDataCell>
                                                <IconButton
                                                    onClick={() => {
                                                        console.log(
                                                            'action function for each cell',
                                                        );
                                                    }}
                                                    ><SvgEdit
                                                    ></SvgEdit></IconButton
                                                >
                                            </DtTableDataCell>
                                        </DtTableRow>
                                    {/each}
                                </DtTableBody>
                            </DataTable>
                        </div>
                    </CustomTabContent>
                </div></StepperContentBody
            >
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Butiran Maklumat Temuduga -->
                <StepperContentBody>
                    <SectionHeader title=" Butiran Maklumat Temuduga"
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Nesyuarat'}
                            value={'Mazlan Shah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Tarikh Mesyuarat'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Jawatan'}
                            value={'Izzati Ismail'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Tarikh Temuduga'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'TMasa Temuduga'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Negeri'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Pusat Temuduga'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Upload Dokumen- Dokumen yang Berkaitan -->
                    <div
                        class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                    >
                        <SectionHeader title="Dokumen - Dokumen yang Berkaitan"
                            ><div hidden={$fileSelectionList.length == 0}>
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div></SectionHeader
                        >
                        <div
                            class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
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
                                    Seret dan Lepas fail anda ke dalam ruangan
                                    ini atau pilih dari fail dari peranti anda
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

                    <!-- Search Kemaskini Maklumat Temuduga -->
                    <SectionHeader
                        title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                    ></SectionHeader>

                    <CustomCard borderClass="border-system-primary ">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="Gred"></FilterTextInput>
                                <FilterTextInput label="Jawatan"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Right Arrow button -->

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight></SvgArrowRight>
                            </TextIconButton>
                        </SectionHeader>
                    </div>

                    <!-- Table Kemaskini Maklumat Temuduga -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol untuk semua kakitangan berkaitan"
                        ></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            withRowSelection
                            onSelect={() => {
                                console.log('pop selected here');
                            }}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Mesyuarat Pemilihan Calon"
                >
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Peraku Keputusan Mesyuarat "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Urus Setia Integriti'}
                            value={'Mazlan Shah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Perakuan'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Pengarah Bahagian/Negeri'}
                            value={'Izzati Ismail'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Perakuan'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Table Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat -->

                    <CustomTabContent>
                        <CustomCard
                            borderClass="border-system-primary items-center"
                        ></CustomCard>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <SectionHeader
                                title="Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                            ></SectionHeader>
                            <DynamicTable
                                tableItems={mockPerjawatanPemangkuan}
                                withRowSelection
                                onSelect={() => {
                                    console.log('pop selected here');
                                }}
                                editable
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaPekerja',
                                    'noKadPengenalan',
                                    'program',
                                    'skim',
                                    'gredSemasa',
                                    'namaJawatan',
                                    'penempatanSekarang',
                                    'keputusanMesyuarat',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Search senarai Kakitangan Yang Dipilih -->
                <StepperContentBody>
                    <SectionHeader title=" Kemaskini Maklumat Temuduga"
                    ></SectionHeader>
                    <CustomTabContent>
                        <CustomCard
                            borderClass="border-system-primary items-center"
                        >
                            <CustomCardBody>
                                <div class="flex w-full flex-wrap gap-2.5">
                                    <FilterTextInput label="Gred"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Jawatan"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Nama"
                                    ></FilterTextInput>
                                    <FilterTextInput label="No. K/P"
                                    ></FilterTextInput>

                                    <TextIconButton
                                        label="cari"
                                        primary
                                        onClick={() => {}}
                                    >
                                        <SvgManifyingGlass></SvgManifyingGlass>
                                    </TextIconButton>
                                </div>
                            </CustomCardBody>
                        </CustomCard>

                        <!-- Table Kemaskini Maklumat Temuduga -->
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <SectionHeader title="Hasil Carian"></SectionHeader>
                            <DynamicTable
                                tableItems={mockPerjawatanPemangkuan}
                                onSelect={() => {
                                    console.log('pop selected here');
                                }}
                                editable
                                onEditClick={() =>
                                    (editingCandidateList = true)}
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaPekerja',
                                    'noKadPengenalan',
                                    'program',
                                    'skim',
                                    'gredSemasa',
                                    'namaJawatan',
                                    'penempatanSekarang',
                                    'maklumatTemuduga',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Maklumat Temuduga">
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon"></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField {disabled} id="" label={'No. K/P'} value={''}
                        ></TextField>
                    </div>

                    <!-- Keputusan Temuduga -->
                    <SectionHeader title=" Keputusan Temuduga "></SectionHeader>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Temuduga'}
                    />
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'Pusat Temuduga'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Panel'}
                            value={'-'}
                        ></TextField>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Kenaikan Pangkat -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Search senarai Calon Yang Terpilih -->
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>
                    <CustomCard borderClass="border-system-primary ">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Mesyuarat kenaikan Pangkat -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'No.K/P'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Keputusan Mesyuarat -->
                    <SectionHeader title=" Keputusan Mesyuarat"></SectionHeader>

                    <div class="flex w-full flex-col gap-2.5">
                        <DropdownSelect
                            {disabled}
                            id="meeting-type"
                            label=" Keputusan"
                            dropdownType="label-left-full"
                            options={meetings}
                            bind:index={selectedMeetingType}
                        />
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Penempatan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                >
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <!-- Search senarai Calon Yang Terpilih -->
                    <CustomCard borderClass="border-system-primary ">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Mesyuarat Penempatan Kakitangan -->

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                                'statusPermohonan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'No.K/P'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Keputusan Mesyuarat -->

                    <SectionHeader title=" Keputusan Mesyuarat"></SectionHeader>

                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Penempatan Baru'}
                            value={'-'}
                        ></TextField>
                        <DropdownSelect
                            {disabled}
                            id="meeting-type"
                            label=" Pengarah Baru"
                            dropdownType="label-left-full"
                            options={meetings}
                            bind:index={selectedMeetingType}
                        />
                    </div>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Lapor Diri'}
                    />
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Permohonan Penangguhan / Pindaan Penempatan Dari Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Permohonan Penangguhan / Pindaan Penempatan Dari Kakitangan"
                >
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <!-- Search Senarai Calon Yang Terpilih  -->

                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                                'permohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Kemaskini Maklumat Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklum Balas Kakitangan -->
                <StepperContentBody>
                    <SectionHeader title=" Maklum Balas Kakitangan "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Kakitangan memerlukan Panangguhan'}
                            value={'-'}
                        ></TextField>

                        <!-- Download file for surat Permohonan Penangguhan/Pindaan Penempatan-->
                        <div
                            class="justidy-between flex w-full flex-row items-center"
                        >
                            <div
                                class="flex w-[220px] min-w-[220px] flex-row gap-2.5"
                            >
                                <label
                                    for=""
                                    class="text-sm font-medium text-txt-tertiary"
                                >
                                    Surat Permohonan Penangguhan/Pindaan
                                    Penempatan</label
                                >
                            </div>
                            <div class="flex w-full flex-row gap-2.5">
                                <DownloadAttachment
                                    fileName={'surat_penangguhan_irfan'}
                                ></DownloadAttachment>
                            </div>
                        </div>

                        <div
                            class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center"
                        >
                            <p class="text-sm font-medium text-txt-tertiary">
                                Sekiranya kakitangan memilih untuk tidak membuat
                                Permohonan Penangguhan/Pindaan sila terus ke
                                langkah berikut:
                            </p>
                            <p
                                class="bg-bgr-primary text-sm font-medium text-system-primary hover:underline"
                            >
                                Kemaskini Keputusan Pemangkuan
                            </p>
                        </div>
                        <SectionHeader
                            subTitle="Sekiranya kakitangan memilih untuk tidak membuat Permohonan Penangguhan/Pindaan Penempatan sila isi butiran penangguhan berikut mengikut surat penangguhan yang disediakan oleh kakitangan"
                        ></SectionHeader>

                        <!-- Butiran Penangguhan -->

                        <SectionHeader title=" Butiran Penangguhan "
                        ></SectionHeader>
                        <div class="flex w-full flex-col gap-2.5">
                            <DateSelector
                                {disabled}
                                {handleDateChange}
                                label={'Tarikh Asal Penempatan'}
                            />
                            <DateSelector
                                {disabled}
                                {handleDateChange}
                                label={'Tarikh Pertukaran yag Dipohon'}
                            />
                            <LongTextField
                                {disabled}
                                id=""
                                label={'Alasan Penanguhan'}
                                value={'Sila nyatakan alasan permohonan'}
                            ></LongTextField>
                        </div>

                        <SectionHeader title=" Butiran Pelulus"></SectionHeader>

                        <div class="flex w-full flex-col gap-2.5">
                            <DropdownSelect
                                {disabled}
                                id="meeting-type"
                                label="Nama Pelulus"
                                dropdownType="label-left-full"
                                options={meetings}
                                bind:index={selectedMeetingType}
                            />
                        </div>
                    </div></StepperContentBody
                >
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            >
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Search Senarai Calon yang Terpilih -->
            <StepperContentBody>
                <SectionHeader title=" Senarai Calon Yang Terpilih"
                ></SectionHeader>

                <CustomCard borderClass="border-system-primary ">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="No. Pekerja"
                            ></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>

                            <TextIconButton
                                label="cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <SectionHeader title="Hasil Carian"></SectionHeader>

                    <!-- Table Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        onSelect={() => {
                            // popSelected(currentData);
                        }}
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'gredSemasa',
                            'namaJawatan',
                            'penempatanSekarang',
                            'permohonanPenangguhanPindaanPenempatan',
                            'keputusanPermohonanPenangguhanPindaanPenempatan',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    <TextIconButton
                        label="Seterusnya"
                        primary
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Search Senarai Calon yang Terpilih -->
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <CustomCard borderClass="border-system-primary ">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Kemaskini Keputusan Pemangkuan -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'permohonanPenangguhanPindaanPenempatan',
                                'keputusanPermohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'No.K/P'} value={'-'}
                        ></TextField>
                    </div>

                    <!-- Butiran Pemangkuan -->

                    <SectionHeader title=" Butiran Pemangkuan "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Jawatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Gred Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Penempatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Pengarah Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Tarikh Lapor Diri'}
                            value={'-'}
                        ></TextField>
                    </div>

                    <SectionHeader title=" Pengesahan Keputusan"
                    ></SectionHeader>

                    <DropdownSelect
                        {disabled}
                        id="meeting-type"
                        label=" Nama Penyokong"
                        dropdownType="label-left-full"
                        options={meetings}
                        bind:index={selectedMeetingType}
                    />

                    <DropdownSelect
                        {disabled}
                        id="meeting-type"
                        label=" Nama Pelulus"
                        dropdownType="label-left-full"
                        options={meetings}
                        bind:index={selectedMeetingType}
                    />
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Penyokongan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Penyokongan Pemangkuan">
                <TextIconButton primary label="Hantar" form="formValidation"
                    ><SvgPaperAirplane /></TextIconButton
                >
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title=" Keputusan daripada Penyokong"
                ></SectionHeader>

                <div class="flex w-full flex-col gap-2">
                    <span class="text-sm italic text-system-primary"
                        >&#x2022; Keputusan akan dihantar ke email klinik dan
                        Urus Setia berkaitan</span
                    >

                    <form
                        id="formValidation"
                        on:submit|preventDefault={submitForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <LongTextField
                            labelBlack={false}
                            name="remarks"
                            label={'Tindakan/Ulasan'}
                            bind:value={textFieldValue}
                        />
                        {#if errorData?.remarks}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.remarks[0]}</span
                            >
                        {/if}
                        <RadioSingle
                            disabled={false}
                            options={supportOptions}
                            name="certify"
                            bind:userSelected={radioChosen}
                        />
                        {#if errorData?.certify}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.certify[0]}</span
                            >
                        {/if}
                    </form>
                    <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b border-t"
                />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
