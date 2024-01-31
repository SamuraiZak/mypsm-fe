<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgPDF2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
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
        _submitMeetingResultCandidateSelectionForm,
        _submitUpdateInterviewDetailsForm,
        _submitUpdateInterviewResult,
        _submitPromotionMeetingResultForm,
        _submitStaffPlacement,
        _submitStaffPlacementAmendmentForm,
        _submitUpdateActingForm,
        _updateInterviewDetails,
        _meetingResultCandidateSelectionSchema,
        _updateInterviewResult,
        _promotionMeetingResultSchema,
        _staffPlacement,
        _staffPlacementAmendmentForm,
        _updateActing,
        _placementMeetingResultSchema,
        _submitPlacementMeetingResultForm,
        _promotionMeetingResultDetailSchema,
        _submitPromotionMeetingResultDetailForm,
    } from './+page';
    import type { PageData } from './$types';
    import type { ChosenEmployeeList } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-response.view-model';
    export let data: PageData;
    let tempData: ChosenEmployeeList;
    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //===================== Page Init Data =====================

    let editMode: boolean = false;

    //===================== Step 1 =====================

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

    // =========================== Superform Validation =================================
    const {
        form: meetingResultCandidateSelectionForm,
        errors: meetingResultCandidateSelectionErrors,
        enhance: meetingResultCandidateSelectionEnhance,
    } = superForm(data.meetingResultCandidateSelectionForm, {
        SPA: true,
        validators: _meetingResultCandidateSelectionSchema,
        onSubmit() {
            _submitMeetingResultCandidateSelectionForm(
                $meetingResultCandidateSelectionForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateInterviewForm,
        errors: updateInterviewErrors,
        enhance: updateInterviewEnhance,
    } = superForm(data.updateInterviewFormData, {
        SPA: true,
        validators: _updateInterviewDetails,
        onSubmit() {
            _submitUpdateInterviewDetailsForm($updateInterviewForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateInterviewResultForm,
        errors: updateInterviewResultErrors,
        enhance: updateInterviewResultEnhance,
    } = superForm(data.updateInterviewResult, {
        SPA: true,
        validators: _updateInterviewResult,
        onSubmit() {
            _submitUpdateInterviewResult($updateInterviewResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: promotionMeetingResultForm,
        errors: promotionMeetingResultErrors,
        enhance: promotionMeetingResultEnhance,
    } = superForm(data.promotionMeetingResultForm, {
        SPA: true,
        validators: _promotionMeetingResultSchema,
        onSubmit() {
            _submitPromotionMeetingResultForm($promotionMeetingResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: promotionMeetingResultDetailForm,
        errors: promotionMeetingResultDetailErrors,
        enhance: promotionMeetingResultDetailEnhance,
    } = superForm(data.promotionMeetingResultDetailForm, {
        SPA: true,
        validators: _promotionMeetingResultDetailSchema,
        onSubmit() {
            _submitPromotionMeetingResultDetailForm(
                $promotionMeetingResultDetailForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: staffPlacementForm,
        errors: staffPlacementErrors,
        enhance: staffPlacementEnhance,
    } = superForm(data.staffPlacementForm, {
        SPA: true,
        validators: _staffPlacement,
        onSubmit() {
            _submitStaffPlacement($staffPlacementForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: placementMeetingResultForm,
        errors: placementMeetingResultErrors,
        enhance: placementMeetingResultEnhance,
    } = superForm(data.placementMeetingResultForm, {
        SPA: true,
        validators: _placementMeetingResultSchema,
        onSubmit() {
            _submitPlacementMeetingResultForm($placementMeetingResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: staffPlacementAmendmentForm,
        errors: staffPlacementAmendmentErrors,
        enhance: PlacementAmendmentEnhance,
    } = superForm(data.staffPlacementAmendmentForm, {
        SPA: true,
        validators: _staffPlacementAmendmentForm,
        onSubmit() {
            _submitStaffPlacementAmendmentForm($staffPlacementAmendmentForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: updateActingform,
        errors: updateActingErrors,
        enhance: updateActingResultEnhance,
    } = superForm(data.updateActing, {
        SPA: true,
        validators: _updateActing,
        onSubmit() {
            _submitUpdateActingForm($updateActingform);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred 1-54"
        description="Sila pilih kakitangan yang terlibat dalam proses pemangkuan ini."
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
        <!-- Senarai Calon Pemangkuan -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goto('/urus-setia/perjawatan/pemangkuan/gred-1_54/baru');
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
                        tableItems={data.chosenEmployeeRecord}
                        withRowSelection
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        editable
                        bind:passData={tempData}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <!-- =========================================================== -->

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
                    label="Simpan"
                    form="meetingResultCandidateSelectionValidation"
                ></TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Maklumat Peraku Keputusan Mesyuarat"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="meetingResultCandidateSelectionValidation"
                        class="flex w-full flex-col gap-2"
                        use:meetingResultCandidateSelectionEnhance
                        method="POST"
                    >
                        <DropdownSelect
                            hasError={$meetingResultCandidateSelectionErrors.secretaryName
                                ? true
                                : false}
                            id="secretaryName"
                            label="Nama Urus Setia Integriti"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:value={$meetingResultCandidateSelectionForm.secretaryName}
                        />
                        {#if $meetingResultCandidateSelectionErrors.secretaryName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$meetingResultCandidateSelectionErrors
                                    .secretaryName}</span
                            >
                        {/if}

                        <DropdownSelect
                            hasError={$meetingResultCandidateSelectionErrors.directorName
                                ? true
                                : false}
                            id="directorName"
                            label="Nama Pengarah Bahagian / Negeri"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:value={$meetingResultCandidateSelectionForm.directorName}
                        />
                        {#if $meetingResultCandidateSelectionErrors.directorName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$meetingResultCandidateSelectionErrors
                                    .directorName}</span
                            >
                        {/if}
                    </form>
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
                                        <div class="flex flex-col">
                                            <DropdownSelect
                                                id="keputusanPemilihanDropdown"
                                                label=""
                                                dropdownType="label-left"
                                                options={keputusanPemilihan}
                                            />
                                        </div>
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

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Temuduga -->
        <!-- =========================================================== -->

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
                    label="Simpan"
                    form="updateMeetingValidation"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Butiran Tawaran dan Temuduga"
                ></SectionHeader>
                <form
                    id="updateMeetingValidation"
                    use:updateInterviewEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        hasError={$updateInterviewErrors.meetingName
                            ? true
                            : false}
                        name="meetingName"
                        type="text"
                        label="Nama Mesyuarat"
                        bind:value={$updateInterviewForm.meetingName}
                    ></TextField>
                    {#if $updateInterviewErrors.meetingName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.meetingName}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.meetingDate
                            ? true
                            : false}
                        name="meetingDate"
                        label={'Tarikh Mesyuarat'}
                        bind:value={$updateInterviewForm.meetingDate}
                    ></TextField>
                    {#if $updateInterviewErrors.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.meetingDate}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.gred ? true : false}
                        name="gred"
                        label={'Gred'}
                        bind:value={$updateInterviewForm.gred}
                    ></TextField>
                    {#if $updateInterviewErrors.gred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.gred}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.position
                            ? true
                            : false}
                        name="position"
                        label={'Jawatan'}
                        bind:value={$updateInterviewForm.position}
                    ></TextField>
                    {#if $updateInterviewErrors.position}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.position}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.interviewDate
                            ? true
                            : false}
                        name="interviewDate"
                        label={'Tarikh Temuduga'}
                        bind:value={$updateInterviewForm.interviewDate}
                    ></TextField>
                    {#if $updateInterviewErrors.interviewDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.interviewDate}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.interviewTime
                            ? true
                            : false}
                        name="interviewTime"
                        label={'Masa Temuduga'}
                        bind:value={$updateInterviewForm.interviewTime}
                    ></TextField>
                    {#if $updateInterviewErrors.interviewTime}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.interviewTime}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.state ? true : false}
                        name="state"
                        label={'Negeri'}
                        bind:value={$updateInterviewForm.state}
                    ></TextField>
                    {#if $updateInterviewErrors.state}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.state}</span
                        >
                    {/if}

                    <TextField
                        hasError={$updateInterviewErrors.interviewVenue
                            ? true
                            : false}
                        name="interviewVenue"
                        label={'Pusat Temuduga'}
                        bind:value={$updateInterviewForm.interviewVenue}
                    ></TextField>
                    {#if $updateInterviewErrors.interviewVenue}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateInterviewErrors.interviewVenue}</span
                        >
                    {/if}
                </form>

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

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Temuduga -->
        <!-- =========================================================== -->

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
                        form="updateInterviewResult"
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Markah Keseluruhan"
                    ></SectionHeader>

                    <form
                        id="updateInterviewResult"
                        use:updateInterviewResultEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$updateInterviewResultErrors.totalInterviewScore
                                ? true
                                : false}
                            name="totalInterviewScore"
                            type="text"
                            label={'Markah Keseluruhan'}
                            bind:value={$updateInterviewResultForm.totalInterviewScore}
                        ></TextField>
                        {#if $updateInterviewResultErrors.totalInterviewScore}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateInterviewResultErrors
                                    .totalInterviewScore}</span
                            >
                        {/if}
                    </form>

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

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Kenaikan Pangkat -->
        <!-- =========================================================== -->

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
                        label="Simpan"
                        form="updatePromotionMeetingResult"
                    />
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <form
                        id="updatePromotionMeetingResult"
                        use:promotionMeetingResultEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$promotionMeetingResultErrors.meetingName
                                ? true
                                : false}
                            type="text"
                            name="meetingName"
                            label={'Nama Mesyuarat'}
                            bind:value={$promotionMeetingResultForm.meetingName}
                        ></TextField>
                        {#if $promotionMeetingResultErrors.meetingName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultErrors
                                    .meetingName}</span
                            >
                        {/if}

                        <TextField
                            hasError={$promotionMeetingResultErrors.meetingDate
                                ? true
                                : false}
                            type="text"
                            name="meetingDate"
                            label={'Tarikh Mesyuarat'}
                            bind:value={$promotionMeetingResultForm.meetingDate}
                        ></TextField>
                        {#if $promotionMeetingResultErrors.meetingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultErrors
                                    .meetingDate}</span
                            >
                        {/if}

                        <TextField
                            hasError={$promotionMeetingResultErrors.meetingResult
                                ? true
                                : false}
                            type="text"
                            name="meetingResult"
                            label={'Keputusan Mesyuarat'}
                            bind:value={$promotionMeetingResultForm.meetingResult}
                        ></TextField>
                        {#if $promotionMeetingResultErrors.meetingResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultErrors
                                    .meetingResult}</span
                            >
                        {/if}

                        <TextField
                            hasError={$promotionMeetingResultErrors.actingPosition
                                ? true
                                : false}
                            type="text"
                            name="actingPosition"
                            label={'Jawatan Pemangkuan'}
                            bind:value={$promotionMeetingResultForm.actingPosition}
                        ></TextField>
                        {#if $promotionMeetingResultErrors.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultErrors
                                    .actingPosition}</span
                            >
                        {/if}

                        <TextField
                            hasError={$promotionMeetingResultErrors.actingGred
                                ? true
                                : false}
                            type="text"
                            name="actingGred"
                            label={'Gred Pemangkuan'}
                            bind:value={$promotionMeetingResultForm.actingGred}
                        ></TextField>
                        {#if $promotionMeetingResultErrors.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$promotionMeetingResultErrors
                                    .actingGred}</span
                            >
                        {/if}
                    </form>
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
                        form="promotionMeetingResultDetailValidation"
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
                        <form
                            id="promotionMeetingResultDetailValidation"
                            use:promotionMeetingResultDetailEnhance
                            method="POST"
                            class="flex w-full flex-col gap-2"
                        >
                            <DropdownSelect
                                hasError={$promotionMeetingResultDetailErrors.meetingResultDropdown
                                    ? true
                                    : false}
                                id="meetingResultDropdown"
                                label="Keputusan"
                                dropdownType="label-left-full"
                                bind:value={$promotionMeetingResultDetailForm.meetingResultDropdown}
                                options={[
                                    { value: 'true', name: 'Berjaya' },
                                    { value: 'false', name: 'Tidak Berjaya' },
                                ]}
                            />
                            {#if $promotionMeetingResultDetailErrors.meetingResultDropdown}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$promotionMeetingResultDetailErrors
                                        .meetingResultDropdown}</span
                                >
                            {/if}
                        </form>
                    </div>

                    <!-- function for button###-->
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Penempatan Kakitangan -->
        <!-- =========================================================== -->

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
                        label="Simpan"
                        form="staffPlacementMeetingResultValidation"
                    />
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <form
                        id="staffPlacementMeetingResultValidation"
                        use:staffPlacementEnhance
                        method="post"
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$staffPlacementErrors.meetingName
                                ? true
                                : false}
                            name="meetingName"
                            label={'Nama Mesyuarat'}
                            bind:value={$staffPlacementForm.meetingName}
                        ></TextField>
                        {#if $staffPlacementErrors.meetingName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffPlacementErrors.meetingName}</span
                            >
                        {/if}

                        <TextField
                            hasError={$staffPlacementErrors.meetingDate
                                ? true
                                : false}
                            name="meetingDate"
                            label={'Tarikh Mesyuarat'}
                            bind:value={$staffPlacementForm.meetingDate}
                        ></TextField>
                        {#if $staffPlacementErrors.meetingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffPlacementErrors.meetingDate}</span
                            >
                        {/if}
                    </form>
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
                                                id="keputusanMesyuaratDropdown"
                                                label=""
                                                dropdownType="label-left"
                                                options={keputusanPemilihan}
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
                        form="placementMeetingResult"
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
                    <form
                        id="placementMeetingResult"
                        use:placementMeetingResultEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$placementMeetingResultErrors.newPlacement
                                ? true
                                : false}
                            name="newPlacement"
                            label={'Penempatan Baru'}
                            bind:value={$placementMeetingResultForm.newPlacement}
                            type="text"
                        ></TextField>
                        {#if $placementMeetingResultErrors.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$placementMeetingResultErrors
                                    .newPlacement}</span
                            >
                        {/if}
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={$placementMeetingResultErrors.newDirector
                                    ? true
                                    : false}
                                id="newDirector"
                                label="Pengarah Baru"
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$placementMeetingResultForm.newDirector}
                            />
                            {#if $placementMeetingResultErrors.newDirector}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$placementMeetingResultErrors
                                        .newDirector}</span
                                >
                            {/if}
                        </div>
                        <DateSelector
                            hasError={$placementMeetingResultErrors.reportingDate
                                ? true
                                : false}
                            name="reportingDate"
                            {handleDateChange}
                            bind:selectedDate={$placementMeetingResultForm.reportingDate}
                            label={'Tarikh Lapor Diri'}
                        />
                        {#if $placementMeetingResultErrors.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$placementMeetingResultErrors
                                    .reportingDate}</span
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
                        form="placementAmendmentForm"
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
                    <form
                        id="placementAmendmentForm"
                        use:PlacementAmendmentEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    >
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={$staffPlacementAmendmentErrors.placementAmendmentResult
                                    ? true
                                    : false}
                                id="placementAmendmentResult"
                                label="Keputusan"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$staffPlacementAmendmentForm.placementAmendmentResult}
                            />{#if $staffPlacementAmendmentErrors.placementAmendmentResult}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$staffPlacementAmendmentErrors
                                        .placementAmendmentResult}</span
                                >
                            {/if}
                        </div>

                        <DateSelector
                            hasError={$staffPlacementAmendmentErrors.approvedNewReportingDate
                                ? true
                                : false}
                            name="approvedNewReportingDate"
                            {handleDateChange}
                            labelBlack={false}
                            label={'Kelulusan Tarikh Lapor Diri Baru'}
                            bind:selectedDate={$staffPlacementAmendmentForm.approvedNewReportingDate}
                        />
                        {#if $staffPlacementAmendmentErrors.approvedNewReportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffPlacementAmendmentErrors
                                    .approvedNewReportingDate}</span
                            >
                        {/if}

                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={$staffPlacementAmendmentErrors.placementAmendmentApproval
                                    ? true
                                    : false}
                                id="placementAmendmentApproval"
                                label="Kelulusan Pindaan Penempatan Dipohon"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$staffPlacementAmendmentForm.placementAmendmentApproval}
                            />
                            {#if $staffPlacementAmendmentErrors.placementAmendmentApproval}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$staffPlacementAmendmentErrors
                                        .placementAmendmentApproval}</span
                                >
                            {/if}
                        </div>
                    </form>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Permohonan Penangguhan / Pindaan -->
        <!-- =========================================================== -->

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

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Pemangkuan -->
        <!-- =========================================================== -->

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
                        form="updateActingResultForm"
                    ></TextIconButton></StepperContentHeader
                >

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon">
                    </SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>

                    <form
                        id="updateActingResultForm"
                        use:updateActingResultEnhance
                        method="POST"
                        class="flex w-full flex-col gap-2"
                    >
                        <SectionHeader title="Butiran Pemangkuan"
                        ></SectionHeader>
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
                                hasError={$updateActingErrors.actingResult
                                    ? true
                                    : false}
                                id="actingResult"
                                label="Keputusan Pemangkuan"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$updateActingform.actingResult}
                            />
                            {#if $updateActingErrors.actingResult}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateActingErrors.actingResult}</span
                                >
                            {/if}
                        </div>

                        <TextField
                            hasError={$updateActingErrors.actingPosition
                                ? true
                                : false}
                            labelBlack={false}
                            name="actingPosition"
                            label={'Jawatan Pemangkuan'}
                            bind:value={$updateActingform.actingPosition}
                        ></TextField>
                        {#if $updateActingErrors.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingErrors.actingPosition}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingErrors.actingGred
                                ? true
                                : false}
                            labelBlack={false}
                            name="actingGred"
                            label={'Gred Pemangkuan'}
                            bind:value={$updateActingform.actingGred}
                        ></TextField>
                        {#if $updateActingErrors.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingErrors.actingGred}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingErrors.newPlacement
                                ? true
                                : false}
                            labelBlack={false}
                            name="newPlacement"
                            label={'Penempatan Baru'}
                            bind:value={$updateActingform.newPlacement}
                        ></TextField>
                        {#if $updateActingErrors.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingErrors.newPlacement}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingErrors.reportingDate
                                ? true
                                : false}
                            labelBlack={false}
                            name="reportingDate"
                            label={'Tarikh Lapor Diri'}
                            bind:value={$updateActingform.reportingDate}
                        ></TextField>
                        {#if $updateActingErrors.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingErrors.reportingDate}</span
                            >
                        {/if}
                        <SectionHeader title="Pengesah Keputusan"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={$updateActingErrors.supporterName
                                    ? true
                                    : false}
                                id="supporterName"
                                label="Nama Penyokong"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$updateActingform.supporterName}
                            />
                            {#if $updateActingErrors.supporterName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateActingErrors
                                        .supporterName}</span
                                >
                            {/if}
                        </div>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={$updateActingErrors.approverName
                                    ? true
                                    : false}
                                id="approverName"
                                label="Nama Pelulus"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:value={$updateActingform.approverName}
                            />
                            {#if $updateActingErrors.approverName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updateActingErrors.approverName}</span
                                >
                            {/if}
                        </div>
                    </form>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Semak Pengesahan Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pemangkuan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <!-- <FormButton type="save"></FormButton> -->
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save pemangkuan function')}
                        ><SvgCircleF2></SvgCircleF2></TextIconButton
                    >
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
                        <!-- Pengesahan Keputusan Pemangkuan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'gredPemangkuan',
                                'namaJawatan',
                                'penempatanSekarang',
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Keputusan Pemangkuan"
                    ><TextIconButton
                        label="Tutup"
                        onClick={() => (editMode = false)}
                        ><SvgXMark></SvgXMark>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="jawatan-baru"
                        label={'Nama Jawatan Baru'}
                        value={'JURUTERA'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="gred-baru"
                        label={'Gred Baru'}
                        value={'E24'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'LKIM SARAWAK - KUCHING'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="pengarah-baru"
                        label={'Pengarah Baru'}
                        value={'Ismail Sabri'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="tarikh-lapor-diri"
                        label={'Tarikh Lapor Diri'}
                        value={'19/10/2023'}
                    ></TextField>
                    <SectionHeader title="Pengesahan Keputusan"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-penyokong"
                        label={'Nama Penyokong'}
                        value={'Iskandar Yahya'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="keputusan"
                        label={'Keputusan'}
                        value={'Disokong'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-pelulus"
                        label={'Nama Pelulus'}
                        value={'Zac Irfan'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="keputusan"
                        label={'Keputusan'}
                        value={'Lulus'}
                    ></TextField>
                </StepperContentBody>
            {/if}
        </StepperContent>
    </Stepper>
</section>

<Toaster />
