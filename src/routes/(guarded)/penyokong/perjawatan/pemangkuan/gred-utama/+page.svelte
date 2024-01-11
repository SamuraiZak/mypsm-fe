<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgPDF2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import { positions } from '$lib/mocks/positions/positions';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _actingSupporterResultSchema,
        _submitActingSupporterResultForm,
    } from './+page';
    import type { PageData } from './$types';

    let editMode: boolean = false;

    //===================== Stepper controls =====================
    let stepperIndex = 9;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //Date Selector for Tarikh Lapor Diri - Kemaskini Keputusan Mesyuarat Penempatan Kakitangan
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

    //upload files for Kemaskini Maklumat Temuduga
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

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
    }

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

    // ==================================
    // Form Validation ==================
    // ==================================
    let errorData: any;
    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _actingSupporterResultSchema,
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'PMGK-1234'}
        dataStatus={'Status: Sedang Diproses'}
    >
        <!-- Senarai Kakitangan Yang Terpilih -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Kakitangan Yang Dipilih"
                    ><TextIconButton
                        primary
                        label="Cetak"
                        onClick={() => {
                            alert('printing..');
                        }}
                    >
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
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
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Maklumat Peraku Keputusan Mesyuarat"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DropdownSelect
                        disabled
                        id="position-dropdown"
                        label="Nama Urus Setia Integriti"
                        dropdownType="label-left-full"
                        options={positions}
                    />
                    <DropdownSelect
                        disabled
                        id="position-dropdown"
                        label="Nama Pengarah Bahagian / Negeri"
                        dropdownType="label-left-full"
                        options={positions}
                    />
                </div>
                <SectionHeader
                    title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
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
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-t"
                >
                    <SectionHeader
                        title="Hasil Carian"
                        subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                    ></SectionHeader>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
                    <DataTable title="">
                        <DtTableHead>
                            <DtTableHeadCell title="Bil. "></DtTableHeadCell>
                            <DtTableHeadCell title="No. Pekerja"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Nama Pekerja"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="No. Kad Pengenalan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Program"></DtTableHeadCell>
                            <DtTableHeadCell title="Skim"></DtTableHeadCell>
                            <DtTableHeadCell title="Gred"></DtTableHeadCell>
                            <DtTableHeadCell title="Nama Jawatan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Penempatan Sekarang"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Keputusan Pemilihan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell></DtTableHeadCell>
                        </DtTableHead>
                        <DtTableBody>
                            {#each mockPerjawatanPemangkuan as item, i (i)}
                                <DtTableRow>
                                    <DtTableDataCell value={i + 1}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.nomborPekerja}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.namaPekerja}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.noKadPengenalan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.program}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.skim}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.gred}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.namaJawatan}
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
                                            }}><SvgEdit></SvgEdit></IconButton
                                        >
                                    </DtTableDataCell>
                                </DtTableRow>
                            {/each}
                        </DtTableBody>
                    </DataTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Maklumat Temuduga -->
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Butiran Tawaran dan Temuduga"
                ></SectionHeader>
                <TextField
                    disabled
                    id="nama-mesyuarat"
                    label={'Nama Mesyuarat'}
                    value={'Mesyuarat Tersebut'}
                ></TextField>
                <TextField
                    disabled
                    id="tarikh-mesyuarat"
                    label={'Tarikh Mesyuarat'}
                    value={'01/08/2023'}
                ></TextField>
                <TextField disabled id="gred" label={'Gred'} value={'DV41'}
                ></TextField>
                <TextField
                    disabled
                    id="jawatan"
                    label={'Jawatan'}
                    value={'Setiausaha Pejabat'}
                ></TextField>
                <TextField
                    disabled
                    id="tarikh-temuduga"
                    label={'Tarikh Temuduga'}
                    value={'07/09/2023'}
                ></TextField>
                <TextField
                    disabled
                    id="masa-temuduga"
                    label={'Masa Temuduga'}
                    value={'10am - 11am'}
                ></TextField>
                <TextField disabled id="negeri" label={'Negeri'} value={'Sabah'}
                ></TextField>
                <TextField
                    disabled
                    id="pusat-temuduga"
                    label={'Pusat Temuduga'}
                    value={'LKIM SARAWAK - KUCHING'}
                ></TextField>

                <!-- Document Upload -->
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5 pt-5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Dokumen-Dokumen yang Berkaitan"
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
                                Seret dan lepas fail anda ke dalam ruangan ini
                                atau pilih fail dari peranti anda
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

                <SectionHeader
                    title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                >
                    <TextIconButton primary label="">
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-t"
                >
                    <SectionHeader
                        title="Hasil Carian"
                        subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                    ></SectionHeader>
                </div>

                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Selected Kakitangan -->
                    <DynamicTable
                        hasCheckbox
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'program',
                            'skim',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                            'keputusanPemilihan',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Keputusan Temuduga -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Kemaskini Maklumat Temuduga"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Kakitangan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'maklumatTemuduga',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Maklumat Keputusan Temuduga">
                    <TextIconButton
                        label="Batal"
                        onClick={() => (editMode = false)}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() =>
                            alert('save maklumat keputusan temuduga')}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Markah Keseluruhan"
                    ></SectionHeader>
                    <TextField
                        disabled
                        id="markah-keseluruhan"
                        label={'Markah Keseluruhan'}
                        value={'79%'}
                    ></TextField>

                    <SectionHeader title="Senarai Calon Temuduga"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight />
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                        >
                            <TextIconButton label="" primary
                                ><SvgPDF2></SvgPDF2>
                            </TextIconButton>
                            <TextIconButton label="" primary
                                ><SvgExcel></SvgExcel>
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Kakitangan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'tapisanTatatertib',
                                'pengisytiharanHarta',
                                'keputusanUrusSetiaIntegriti',
                                'keputusanPengarahNegeri',
                                'markahKeseluruhan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Kenaikan Pangkat -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        disabled
                        id="nama-mesyuarat"
                        label={'Nama Mesyuarat'}
                        value={'Mesyuarat Tersebut'}
                    ></TextField>
                    <TextField
                        disabled
                        id="tarikh-mesyuarat"
                        label={'Tarikh Mesyuarat'}
                        value={'01/08/2023'}
                    ></TextField>
                    <TextField
                        disabled
                        id="keputusan-mesyuarat"
                        label={'Keputusan Mesyuarat'}
                        value={'Berjaya/Tidak Berjaya'}
                    ></TextField>
                    <TextField
                        disabled
                        id="jawatan-pemangkuan"
                        label={'Jawatan Pemangkuan'}
                        value={'Setiausaha Pejabat'}
                    ></TextField>
                    <TextField
                        disabled
                        id="gred-pemangkuan"
                        label={'Gred Pemangkuan'}
                        value={'N32'}
                    ></TextField>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton primary label="">
                            <SvgArrowRight></SvgArrowRight>
                        </TextIconButton>
                    </SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                        <DynamicTable
                            hasCheckbox
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
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
                    ><TextIconButton
                        label="Batal"
                        onClick={() => {
                            editMode = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() =>
                            alert(
                                'save the keputusan mesyuarat kenaikan pangkat',
                            )}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="keputusan-mesyuarat"
                            label="Keputusan"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>

                    <!-- function for button###-->
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Penempatan Kakitangan -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        disabled
                        id="Nama Mesyuarat"
                        label={'Nama Mesyuarat'}
                        value={'Mesyuarat Tersebut'}
                    ></TextField>
                    <TextField
                        disabled
                        id="tarikh-mesyuarat"
                        label={'Tarikh Mesyuarat'}
                        value={'01/08/2023'}
                    ></TextField>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton primary label="">
                            <SvgArrowRight></SvgArrowRight>
                        </TextIconButton>
                    </SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Keputusan Mesyuarat Penempatan Kakitangan -->
                        <DataTable title="">
                            <DtTableHead>
                                <DtTableHeadCell title="Bil. "
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Kad Pengenalan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Gred"></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Jawatan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Penempatan Sekarang"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Keputusan Mesyuarat Penempatan"
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
                                        <DtTableDataCell value={item.gred}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.namaJawatan}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.penempatanSekarang}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.keputusanMesyuaratKenaikanPangkat}
                                        ></DtTableDataCell>
                                        <DtTableDataCell>
                                            <DropdownSelect
                                                id="mesyuaratPenempatan"
                                                label=""
                                                dropdownType="label-left"
                                                options={positions}
                                            />
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <IconButton
                                                onClick={() => {
                                                    editMode = true;
                                                }}
                                                ><SvgEdit></SvgEdit></IconButton
                                            >
                                        </DtTableDataCell>
                                    </DtTableRow>
                                {/each}
                            </DtTableBody>
                        </DataTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>

                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        disabled
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'-'}
                    ></TextField>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="pengarah-baru"
                            label="Pengarah Baru"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <DateSelector
                        disabled
                        {handleDateChange}
                        label={'Tarikh Lapor Diri'}
                    />
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Permohonan Penangguhan/Pindaan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
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
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklum Balas Kakitangan"
                    ></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="maklum-balas-kakitangan"
                        label={'Kakitangan memerlukan Penangguhan/Pindaan Penempatan?'}
                        value={'Ya'}
                    ></TextField>
                    <div
                        class="flex w-full flex-row items-center justify-between"
                    >
                        <div
                            class="flex w-[220px] min-w-[220px] flex-row gap-2"
                        >
                            <label
                                for=""
                                class="text-sm font-medium text-txt-tertiary"
                                >Dokumen-Dokumen Berkaitan</label
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
                            Permohonan Penangguhan/Pindaan Penempatan sila terus
                            ke langkah berikut:
                        </p>
                        <p
                            class="bg-bgr-primary text-sm font-medium text-system-primary hover:underline"
                        >
                            Kemaskini Keputusan Pemangkuan
                        </p>
                    </div>
                    <SectionHeader
                        subTitle="Sekiranya kakitangan memilih untuk membuat Permohonan Penangguhan/Pindaan Penempatan sila isi butiran penangguhan berikut mengikut surat penangguhan yang disediakan oleh Kakitangan."
                    ></SectionHeader>
                    <SectionHeader
                        title="Butiran Penangguhan/Pindaan Penempatan"
                    ></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="tarikh-asal-lapor-diri"
                        label={'Tarikh Asal Lapor Diri'}
                        value={'2/10/2023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="penempatan-asal"
                        label={'Penempatan Asal'}
                        value={'Bahagian Pengurusan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="tarikh-lapor-diri-baru-dipohon"
                        label={'Tarikh Lapor Diri Baru Dipohon'}
                        value={'2/11/2023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="pindaan-penempatan-dipohon"
                        label={'Pindaan Penempatan Dipohon'}
                        value={'Bahagian Teknologi'}
                    ></TextField>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="keputusan"
                            label="Keputusan"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <DateSelector
                        disabled
                        {handleDateChange}
                        labelBlack={false}
                        label={'Kelulusan Tarikh Lapor Diri Baru'}
                    />
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="kelulusan-pindaan-penempatan-dipohon"
                            label="Kelulusan Pindaan Penempatan Dipohon"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- Keputusan Permohonan Penangguhan/Pindaan Penempataan -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            >
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Calon Yang Terpilih"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="No. Pekerja"
                            ></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader title="Hasil Carian"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                            'permohonanPenangguhanPindaanPenempatan',
                            'keputusanPermohonanPenangguhanPindaanPenempatan',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Keputusan Pemangkuan -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'permohonanPenangguhanPindaanPenempatan',
                                'keputusanPermohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan"
                    ><TextIconButton
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton></StepperContentHeader
                >

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <div class="flex w-full flex-row items-center">
                        <p
                            class="text-sm font-medium italic text-system-primary"
                        >
                            Sekiranya tidak lulus, jawatan dan gred akan
                            dikembalikan ke butiran asal.
                        </p>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="keputusan-pemangkuan"
                            label="Keputusan Pemangkuan"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="jawatan-pemangkuan"
                        label={'Jawatan Pemangkuan'}
                        value={'Setiausaha Pejabat'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="gred-pemangkuan"
                        label={'Gred Pemangkuan'}
                        value={'N32'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'Bahagian Pengurusan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="tarikh-lapor-diri"
                        label={'Tarikh Lapor Diri'}
                        value={'19/10/2023'}
                    ></TextField>
                    <SectionHeader title="Pengesah Keputusan"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="nama-penyokong"
                            label="Nama Penyokong"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            disabled
                            id="nama-pelulus"
                            label="Nama Pelulus"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- Penyokong Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Penyokong Pemangkuan">
                <TextIconButton primary label="Hantar" form="formValidation"
                    ><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Keputusan daripada Penyokong"
                ></SectionHeader>
                <div
                    class="flex w-full flex-col gap-2"
                >
                    <span class="text-sm italic text-system-primary"
                        >&#x2022; Keputusan akan dihantar ke email klinik dan
                        Urus Setia berkaitan</span
                    >
                </div>
                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    on:submit|preventDefault={_submitActingSupporterResultForm}
                    class="flex w-full flex-col gap-2"
                >
                    <LongTextField
                        labelBlack={false}
                        name="supporterRemark"
                        label={'Tindakan/Ulasan'}
                        bind:value={$form.supporterRemark}
                    />
                    {#if $errors.supporterRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.supporterRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        disabled={false}
                        options={supportOptions}
                        name="supporterResult"
                        bind:userSelected={$form.supporterResult}
                    />
                    {#if $errors.supporterResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.supporterResult[0]}</span
                        >
                    {/if}
                </form>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b border-t"
                />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
