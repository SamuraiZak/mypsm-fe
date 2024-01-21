<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
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
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _updateCandidateSelectionMeetingResultSchema,
        _submitUpdateCandidateSelectionMeetingResultForm,
        _updateMeetingDetailSchema,
        _submitUpdateMeetingDetailForm,
        _updateInterviewResultSchema,
        _submitUpdateInterviewResultForm,
        _updatePromotionMeetingResultSchema,
        _submitUpdatePromotionMeetingResultForm,
        _updateStaffPlacementMeetingResultSchema,
        _submitUpdateStaffPlacementMeetingResultForm,
        _staffPlacementAmendmentApplicationSchema,
        _submitStaffPlacementAmendmentApplicationSchema,
        _updateActingResultSchema,
        _submitUpdateActingResultForm,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let disabled: boolean = true;
    export let data: PageData;

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
        fileSelectionList.set(selectedFiles);
    }

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //===================== Page Init Data =====================

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

    let keputusanPemilihan = [
        {
            value: 'true',
            name: 'Berjaya',
        },
        {
            value: 'false',
            name: 'Tidak Berjaya',
        },
    ];

    //===================== Step 1 =====================

    // Step 1 script starts here
    let editingCandidateList = false;

    //======================== superform validation ===========================
    const {
        form: updateCandidateSelectionMeetingResultForm,
        errors: updateCandidateSelectionMeetingResultErrors,
        enhance: updateCandidateSelectionMeetingResultEnhance,
    } = superForm(data.updateCandidateSelectionMeetingResultForm, {
        SPA: true,
        validators: _updateCandidateSelectionMeetingResultSchema,
        onSubmit() {
            _submitUpdateCandidateSelectionMeetingResultForm(
                $updateCandidateSelectionMeetingResultForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateMeetingDetailForm,
        errors: updateMeetingDetailErrors,
        enhance: updateMeetingDetailEnhance,
    } = superForm(data.updateMeetingDetailForm, {
        SPA: true,
        validators: _updateMeetingDetailSchema,
        onSubmit() {
            _submitUpdateMeetingDetailForm($updateMeetingDetailForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateInterviewResultForm,
        errors: updateInterviewResultErrors,
        enhance: updateInterviewResultEnhance,
    } = superForm(data.updateInterviewResultForm, {
        SPA: true,
        validators: _updateInterviewResultSchema,
        onSubmit() {
            _submitUpdateInterviewResultForm($updateInterviewResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updatePromotionMeetingResultForm,
        errors: updatePromotionMeetingResultErrors,
        enhance: updatePromotionMeetingResultEnhance,
    } = superForm(data.updatePromotionMeetingResultForm, {
        SPA: true,
        validators: _updatePromotionMeetingResultSchema,
        onSubmit() {
            _submitUpdatePromotionMeetingResultForm(
                $updatePromotionMeetingResultForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateStaffPlacementMeetingResultForm,
        errors: updateStaffPlacementMeetingResultErrors,
        enhance: updateStaffPlacementMeetingResultEnhance,
    } = superForm(data.updateStaffPlacementMeetingResultForm, {
        SPA: true,
        validators: _updateStaffPlacementMeetingResultSchema,
        onSubmit() {
            _submitUpdateStaffPlacementMeetingResultForm(
                $updateStaffPlacementMeetingResultForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: staffPlacementAmendmentApplicationForm,
        errors: staffPlacementAmendmentApplicationErrors,
        enhance: staffPlacementAmendmentApplicationEnhance,
    } = superForm(data.staffPlacementAmendmentApplicationForm, {
        SPA: true,
        validators: _staffPlacementAmendmentApplicationSchema,
        onSubmit() {
            _submitStaffPlacementAmendmentApplicationSchema(
                $staffPlacementAmendmentApplicationForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateActingResultForm,
        errors: updateActingResultErrors,
        enhance: updateActingResultEnhance,
    } = superForm(data.updateActingResultForm, {
        SPA: true,
        validators: _updateActingResultSchema,
        onSubmit() {
            _submitUpdateActingResultForm($updateActingResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred 41"
        description="Sila pilih kakitangan yang terlibat dalam proses pemangkuan ini"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
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
        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan"
            >
                <!-- TODO: put buttons in this area if necessary -->
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft />
                </TextIconButton>
                <TextIconButton
                    label="Simpan"
                    primary
                    form="updateCandidateSelectionMeetingResultForm"
                ><SvgCheck/></TextIconButton>
            </StepperContentHeader>

            <!-- Maklumat Peraku Keputusan Mesyuarat -->
            <StepperContentBody>
                <SectionHeader title=" Maklumat Peraku Keputusan Mesyuarat"
                ></SectionHeader>

                <div class="flex w-full flex-col gap-2.5">
                    <form
                        id="updateCandidateSelectionMeetingResultForm"
                        method="POST"
                        use:updateCandidateSelectionMeetingResultEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <DropdownSelect
                            hasError={$updateCandidateSelectionMeetingResultErrors.secretaryName
                                ? true
                                : false}
                            id="secretaryName"
                            label="Nama Urus Setia Integriti"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:value={$updateCandidateSelectionMeetingResultForm.secretaryName}
                        />
                        {#if $updateCandidateSelectionMeetingResultErrors.secretaryName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateCandidateSelectionMeetingResultErrors
                                    .secretaryName[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            hasError={$updateCandidateSelectionMeetingResultErrors.directorName
                                ? true
                                : false}
                            id="directorName"
                            label="Nama Pengarah Bahagian/Negeri"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:value={$updateCandidateSelectionMeetingResultForm.directorName}
                        />
                        {#if $updateCandidateSelectionMeetingResultErrors.directorName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateCandidateSelectionMeetingResultErrors
                                    .directorName[0]}</span
                            >
                        {/if}
                    </form>
                </div>

                <!-- Search Kakitangan Yang Dipilih -->
                <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
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
                                <DtTableHeadCell title="Bil"></DtTableHeadCell>
                                <DtTableHeadCell title="No.Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Kad Pengenalan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Program"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Skim"></DtTableHeadCell>
                                <DtTableHeadCell title="Gred"></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Jawatan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Penempatan Sekarang"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Keputusan Pemilihan "
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
                                        <DtTableDataCell value={item.program}
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
                                                id="keputusanPemilihanDropdown"
                                                label=""
                                                dropdownType="label-left"
                                                options={keputusanPemilihan}
                                            />
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <IconButton
                                                onClick={() => {
                                                    console.log(
                                                        'action function for each cell',
                                                    );
                                                }}
                                                ><SvgEdit></SvgEdit></IconButton
                                            >
                                        </DtTableDataCell>
                                    </DtTableRow>
                                {/each}
                            </DtTableBody>
                        </DataTable>
                    </div>
                </CustomTabContent></StepperContentBody
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
                        <SvgArrowLeft />
                    </TextIconButton>
                    <TextIconButton
                        label="Simpan"
                        primary
                        form="updateMeetingDetailForm"
                    >
                        <SvgCheck />
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Butiran Maklumat Temuduga -->
                <StepperContentBody>
                    <SectionHeader title=" Butiran Maklumat Temuduga"
                    ></SectionHeader>

                    <div class="flex w-full flex-col gap-2">
                        <form
                            id="updateMeetingDetailForm"
                            method="POST"
                            use:updateMeetingDetailEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={$updateMeetingDetailErrors.meetingName
                                    ? true
                                    : false}
                                name="meetingName"
                                type="text"
                                label={'Nama Nesyuarat'}
                                bind:value={$updateMeetingDetailForm.meetingName}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.meetingName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .meetingName[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.meetingDate
                                    ? true
                                    : false}
                                name="meetingDate"
                                type="text"
                                label={'Tarikh Mesyuarat'}
                                bind:value={$updateMeetingDetailForm.meetingDate}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.meetingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .meetingDate[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.position
                                    ? true
                                    : false}
                                name="position"
                                type="text"
                                label={'Jawatan'}
                                bind:value={$updateMeetingDetailForm.position}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.position}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .position[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.interviewDate
                                    ? true
                                    : false}
                                name="interviewDate"
                                type="text"
                                label={'Tarikh Temuduga'}
                                bind:value={$updateMeetingDetailForm.interviewDate}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.interviewDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .interviewDate[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.interviewTime
                                    ? true
                                    : false}
                                name="interviewTime"
                                type="text"
                                label={'Masa Temuduga'}
                                bind:value={$updateMeetingDetailForm.interviewTime}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.interviewTime}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .interviewTime[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.state
                                    ? true
                                    : false}
                                name="state"
                                type="text"
                                label={'Negeri'}
                                bind:value={$updateMeetingDetailForm.state}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.state}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors.state[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateMeetingDetailErrors.interviewVenue
                                    ? true
                                    : false}
                                name="interviewVenue"
                                type="text"
                                label={'Pusat Temuduga'}
                                bind:value={$updateMeetingDetailForm.interviewVenue}
                            ></TextField>
                            {#if $updateMeetingDetailErrors.interviewVenue}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateMeetingDetailErrors
                                        .interviewVenue[0]}</span
                                >
                            {/if}
                        </form>
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
                            hasCheckbox
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
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

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                        ></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}><SvgArrowLeft /></TextIconButton
                    >
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="updateInterviewResultForm"
                        ><SvgCheck /></TextIconButton
                    >
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
                    <form
                        id="updateInterviewResultForm"
                        method="POST"
                        use:updateInterviewResultEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <DateSelector
                            hasError={$updateInterviewResultErrors.interviewDate
                                ? true
                                : false}
                            name="interviewDate"
                            {handleDateChange}
                            label={'Tarikh Temuduga'}
                            bind:selectedDate={$updateInterviewResultForm.interviewDate}
                        />
                        {#if $updateInterviewResultErrors.interviewDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateInterviewResultErrors
                                    .interviewDate[0]}</span
                            >
                        {/if}
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                hasError={$updateInterviewResultErrors.interviewVenue
                                    ? true
                                    : false}
                                name="interviewVenue"
                                label={'Pusat Temuduga'}
                                bind:value={$updateInterviewResultForm.interviewVenue}
                                type="text"
                            ></TextField>
                            {#if $updateInterviewResultErrors.interviewVenue}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateInterviewResultErrors
                                        .interviewVenue[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={$updateInterviewResultErrors.panelName
                                    ? true
                                    : false}
                                name="panelName"
                                label={'Nama Panel'}
                                bind:value={$updateInterviewResultForm.panelName}
                            ></TextField>
                            {#if $updateInterviewResultErrors.panelName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateInterviewResultErrors
                                        .panelName[0]}</span
                                >
                            {/if}
                        </div>
                    </form>
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}><SvgArrowLeft /></TextIconButton
                    >
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="updatePromotionMeetingResultForm"
                        ><SvgCheck /></TextIconButton
                    >
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
                        <form
                            id="updatePromotionMeetingResultForm"
                            method="POST"
                            use:updatePromotionMeetingResultEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <DropdownSelect
                                hasError={$updatePromotionMeetingResultErrors.meetingResultDropdown
                                    ? true
                                    : false}
                                id="meetingResultDropdown"
                                label=" Keputusan"
                                dropdownType="label-left-full"
                                options={[
                                    { value: 'true', name: 'Berjaya' },
                                    { value: 'false', name: 'Tidak Berjaya' },
                                ]}
                                bind:value={$updatePromotionMeetingResultForm.meetingResultDropdown}
                            />
                            {#if $updatePromotionMeetingResultErrors.meetingResultDropdown}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors
                                        .meetingResultDropdown[0]}</span
                                >
                            {/if}
                        </form>
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}><SvgArrowLeft /></TextIconButton
                    >
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper6Validation"><SvgCheck /></TextIconButton
                    >
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
                    <form
                        id="stepper6Validation"
                        method="POST"
                        use:updateStaffPlacementMeetingResultEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <div class="flex w-full flex-col gap-2.5">
                            <TextField
                                hasError={$updateStaffPlacementMeetingResultErrors.newPlacement
                                    ? true
                                    : false}
                                name="newPlacement"
                                label={'Penempatan Baru'}
                                bind:value={$updateStaffPlacementMeetingResultForm.newPlacement}
                                type="text"
                            ></TextField>
                            {#if $updateStaffPlacementMeetingResultErrors.newPlacement}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateStaffPlacementMeetingResultErrors
                                        .newPlacement[0]}</span
                                >
                            {/if}
                            <DropdownSelect
                                hasError={$updateStaffPlacementMeetingResultErrors.newDirector
                                    ? true
                                    : false}
                                id="newDirector"
                                label=" Pengarah Baru"
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$updateStaffPlacementMeetingResultForm.newDirector}
                            />
                            {#if $updateStaffPlacementMeetingResultErrors.newDirector}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateStaffPlacementMeetingResultErrors
                                        .newDirector[0]}</span
                                >
                            {/if}
                        </div>
                        <DateSelector
                            hasError={$updateStaffPlacementMeetingResultErrors.reportingDate
                                ? true
                                : false}
                            name="reportingDate"
                            {handleDateChange}
                            label={'Tarikh Lapor Diri'}
                            bind:selectedDate={$updateStaffPlacementMeetingResultForm.reportingDate}
                        />
                        {#if $updateStaffPlacementMeetingResultErrors.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateStaffPlacementMeetingResultErrors
                                    .reportingDate[0]}</span
                            >
                        {/if}
                    </form>
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}><SvgArrowLeft /></TextIconButton
                    >
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="staffPlacementAmendmentApplicationForm"
                        ><SvgCheck /></TextIconButton
                    >
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
                                    class="text-system-tertiary text-sm font-medium"
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
                            color="text-system-primary"
                            subTitle="Sekiranya kakitangan memilih untuk tidak membuat Permohonan Penangguhan/Pindaan Penempatan sila isi butiran penangguhan berikut mengikut surat penangguhan yang disediakan oleh kakitangan"
                        ></SectionHeader>

                        <!-- Butiran Penangguhan -->

                        <SectionHeader title=" Butiran Penangguhan "
                        ></SectionHeader>

                        <form
                            id="staffPlacementAmendmentApplicationForm"
                            method="POST"
                            use:staffPlacementAmendmentApplicationEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div class="flex w-full flex-col gap-2.5">
                                <DateSelector
                                    hasError={$staffPlacementAmendmentApplicationErrors.initialPlacementDate
                                        ? true
                                        : false}
                                    name="initialPlacementDate"
                                    {handleDateChange}
                                    label={'Tarikh Asal Penempatan'}
                                    bind:selectedDate={$staffPlacementAmendmentApplicationForm.initialPlacementDate}
                                />
                                {#if $staffPlacementAmendmentApplicationErrors.initialPlacementDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$staffPlacementAmendmentApplicationErrors
                                            .initialPlacementDate[0]}</span
                                    >
                                {/if}
                                <DateSelector
                                    hasError={$staffPlacementAmendmentApplicationErrors.requestedDate
                                        ? true
                                        : false}
                                    name="requestedDate"
                                    {handleDateChange}
                                    label={'Tarikh Pertukaran yag Dipohon'}
                                    bind:selectedDate={$staffPlacementAmendmentApplicationForm.requestedDate}
                                />
                                {#if $staffPlacementAmendmentApplicationErrors.requestedDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$staffPlacementAmendmentApplicationErrors
                                            .requestedDate[0]}</span
                                    >
                                {/if}
                                <LongTextField
                                    hasError={$staffPlacementAmendmentApplicationErrors.postponementReason
                                        ? true
                                        : false}
                                    name="postponementReason"
                                    label={'Alasan Penanguhan'}
                                    bind:value={$staffPlacementAmendmentApplicationForm.postponementReason}
                                ></LongTextField>
                                {#if $staffPlacementAmendmentApplicationErrors.postponementReason}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$staffPlacementAmendmentApplicationErrors
                                            .postponementReason[0]}</span
                                    >
                                {/if}
                            </div>

                            <SectionHeader title=" Butiran Pelulus"
                            ></SectionHeader>

                            <div class="flex w-full flex-col gap-2.5">
                                <DropdownSelect
                                    hasError={$staffPlacementAmendmentApplicationErrors.approverName
                                        ? true
                                        : false}
                                    id="approverName"
                                    label="Nama Pelulus"
                                    dropdownType="label-left-full"
                                    options={keputusanPemilihan}
                                    bind:value={$staffPlacementAmendmentApplicationForm.approverName}
                                />
                                {#if $staffPlacementAmendmentApplicationErrors.approverName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$staffPlacementAmendmentApplicationErrors
                                            .approverName[0]}</span
                                    >
                                {/if}
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
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
                        label="Kembali"
                        onClick={() => {
                            editingCandidateList = false;
                        }}><SvgArrowLeft /></TextIconButton
                    >
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="updateActingResultForm"
                        ><SvgCheck /></TextIconButton
                    >
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

                    <form
                        id="updateActingResultForm"
                        method="POST"
                        use:updateActingResultEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <DropdownSelect
                            hasError={$updateActingResultErrors.supporterName
                                ? true
                                : false}
                            id="supporterName"
                            label="Nama Penyokong"
                            dropdownType="label-left-full"
                            options={keputusanPemilihan}
                            bind:value={$updateActingResultForm.supporterName}
                        />
                        {#if $updateActingResultErrors.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingResultErrors
                                    .supporterName[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            hasError={$updateActingResultErrors.approvalName
                                ? true
                                : false}
                            id="approvalName"
                            label="Nama Pelulus"
                            dropdownType="label-left-full"
                            options={keputusanPemilihan}
                            bind:value={$updateActingResultForm.approvalName}
                        />
                        {#if $updateActingResultErrors.approvalName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingResultErrors
                                    .approvalName[0]}</span
                            >
                        {/if}
                    </form>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Semak Pengesahan Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pemangkuan"
                >
                    <TextIconButton
                        primary
                        label="Selesai"
                        onClick={() => {
                            alert('save function');
                        }}
                    >
                        <SvgCircleF2 />
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Search Pengesahan Keputusan Pemangkuan -->
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

                    <!-- Table Pengesahan Keputusan Pemangkuan-->
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
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Kemaskini Maklumat Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        label="Tutup"
                        onClick={() => {
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <!-- Maklumat Calon -->
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

                    <!-- Pengesahan Keputusan -->
                    <SectionHeader title=" Pengesahan Keputusan "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Penyokong'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Keputusan'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Pelulus'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Keputusan'}
                            value={'-'}
                        ></TextField>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>
    </Stepper>
</section>

<Toaster />
