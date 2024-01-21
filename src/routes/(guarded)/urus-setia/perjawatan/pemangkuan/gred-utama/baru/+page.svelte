<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgPdf2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _updatePromotionMeetingResultSchema,
        _submitUpdatePromotionMeetingForm,
        _updatePromotionMeetingResultDetailSchema,
        _submitUpdatePromotionMeetingResultDetailForm,
        _updateActingStaffDetailSchema,
        _submitUpdateActingStaffDetailForm,
        _supporterAndApproverSchema,
        _updateSupporterAndApproverForm,
    } from './+page';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';

    export let data : PageData;
    let editMode: boolean = false;

    let candidateList: Object[] = [
        {
            staffID: '28339',
            staffName: 'Ali bin Ahmad',
            identificationNumber: '920302-11-6632',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
        {
            staffID: '58449',
            staffName: 'Mahmood Saiful',
            identificationNumber: '851129-10-4139',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
        {
            staffID: '30290',
            staffName: 'Mohd Irfan Fikri',
            identificationNumber: '910110-08-2002',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
    ];

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Lulus',
        },
        {
            value: 'false',
            label: 'Tidak Lulus',
        },
    ];

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    // ============================= Superform Validation ================================
    const {
        form: updatePromotionMeetingResultForm,
        errors: updatePromotionMeetingResultErrors,
        enhance: updatePromotionMeetingResultEnhance,
    } = superForm(data.updatePromotionMeetingResultForm, {
        SPA: true,
        validators: _updatePromotionMeetingResultSchema,
        onSubmit() {
            _submitUpdatePromotionMeetingForm($updatePromotionMeetingResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: updatePromotionMeetingResultDetailForm,
        errors: updatePromotionMeetingResultDetailErrors,
        enhance: updatePromotionMeetingResultDetailEnhance,
    } = superForm(data.updatePromotionMeetingResultDetailForm, {
        SPA: true,
        validators: _updatePromotionMeetingResultDetailSchema,
        onSubmit() {
            _submitUpdatePromotionMeetingResultDetailForm($updatePromotionMeetingResultDetailForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: updateActingStaffDetailForm,
        errors: updateActingStaffDetailErrors,
        enhance: updateActingStaffDetailEnhance,
    } = superForm(data.updateActingStaffDetailForm, {
        SPA: true,
        validators: _updateActingStaffDetailSchema,
        onSubmit() {
            _submitUpdateActingStaffDetailForm($updateActingStaffDetailForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: supporterAndApproverForm,
        errors: supporterAndApproverErrors,
        enhance: supporterAndApproverEnhance,
    } = superForm(data.supporterAndApproverForm, {
        SPA: true,
        validators: _supporterAndApproverSchema,
        onSubmit() {
            _updateSupporterAndApproverForm($supporterAndApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred Utama"
        description="Hal-hal berkaitan Pemangkuan"
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
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'ID Pemangkuan #77699'}
        dataStatus={'Sedang Diproses'}
    >
        <!-- =========================================================== -->
        <!-- First Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Pemilihan Calon">
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
                <SectionHeader title="Senarai Semua Kakitangan"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b pb-3"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        withRowSelection
                        selectAdd
                        editable
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'program',
                            'skim',
                            'gred',
                            'positionName',
                            'currentPlacement',
                            'propertyDeclaration',
                            'educationLoanDeclaration',
                        ]}
                    ></DynamicTable>
                </div>

                <SectionHeader title="Senarai Calon">
                    <TextIconButton primary label="Cetak">
                        <SvgPrinter />
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b pb-3"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        withRowSelection
                        editable
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'program',
                            'skim',
                            'gred',
                            'positionName',
                            'currentPlacement',
                            'propertyDeclaration',
                            'educationLoanDeclaration',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Second Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemangkuan"
                >
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft />
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight />
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
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

                <div class="w-full items-center border-b py-3">
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton label="Tidak Peraku">
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton primary label="Perakukan">
                            <SvgDoubleTick />
                        </TextIconButton>
                    </SectionHeader>
                </div>

                <SectionHeader title="Senarai Kakitangan Yang Dipilih">
                    <TextIconButton primary label="">
                        <SvgPdf2 />
                    </TextIconButton>
                    <TextIconButton primary label="">
                        <SvgExcel />
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        hasCheckbox
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'disciplinaryReview',
                            'propertyDeclaration',
                            'certificateOfIntegrity',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Third Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Muat Turun Borang Berkaitan">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft />
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}
                >
                    <SvgArrowRight />
                </TextIconButton>
            </StepperContentHeader>
            <div
                class="flex w-full flex-col items-center justify-start gap-2 border-b p-3"
            >
                <DownloadAttachment fileName={'Borang Penilaian'}
                ></DownloadAttachment>
                <DownloadAttachment fileName={'Borang Kesihatan'}
                ></DownloadAttachment>
                <DownloadAttachment fileName={'Profil Kakitangan (CV)'}
                ></DownloadAttachment>
            </div>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Fourth Stepper -->
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
                    <SvgArrowLeft />
                </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="updatePromotionMeetingResultForm"
                    ><SvgCheck/>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon"></SectionHeader>

                    <div class="flex w-full flex-col gap-2 border-b pb-3">
                        <SectionHeader title="Keputusan Mesyuarat"
                        ></SectionHeader>
                        <form
                            id="updatePromotionMeetingResultForm"
                            method="POST"
                            use:updatePromotionMeetingResultEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.meetingName ? true : false}
                                name="meetingName"
                                label="Nama Mesyuarat"
                                bind:value={$updatePromotionMeetingResultForm.meetingName}
                            />
                            {#if $updatePromotionMeetingResultErrors.meetingName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.meetingName[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.meetingDate ? true : false}
                                name="meetingDate"
                                label="Tarikh Mesyuarat"
                                bind:value={$updatePromotionMeetingResultForm.meetingDate}
                            />
                            {#if $updatePromotionMeetingResultErrors.meetingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.meetingDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.actingPosition ? true : false}
                                name="actingPosition"
                                label="Jawatan Pemangkuan"
                                bind:value={$updatePromotionMeetingResultForm.actingPosition}
                            />
                            {#if $updatePromotionMeetingResultErrors.actingPosition}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.actingPosition[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.actingGred ? true : false}
                                name="actingGred"
                                label="Gred Pemangkuan"
                                bind:value={$updatePromotionMeetingResultForm.actingGred}
                            />
                            {#if $updatePromotionMeetingResultErrors.actingGred}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.actingGred[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.placement ? true : false}
                                name="placement"
                                label="Penempatan"
                                bind:value={$updatePromotionMeetingResultForm.placement}
                            />
                            {#if $updatePromotionMeetingResultErrors.placement}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.placement[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.reportingDate ? true : false}
                                name="reportingDate"
                                label="Tarikh Kuatkuasa Lapor Diri"
                                bind:value={$updatePromotionMeetingResultForm.reportingDate}
                            />
                            {#if $updatePromotionMeetingResultErrors.reportingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.reportingDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.referenceLetterNo ? true : false}
                                name="referenceLetterNo"
                                label="No. Rujukan Surat"
                                bind:value={$updatePromotionMeetingResultForm.referenceLetterNo}
                            />
                            {#if $updatePromotionMeetingResultErrors.referenceLetterNo}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.referenceLetterNo[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.letterDate ? true : false}
                                name="letterDate"
                                label="Tarikh Surat"
                                bind:value={$updatePromotionMeetingResultForm.letterDate}
                            />
                            {#if $updatePromotionMeetingResultErrors.letterDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.letterDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={$updatePromotionMeetingResultErrors.letterTitle ? true : false}
                                name="letterTitle"
                                label="Tajuk Surat"
                                bind:value={$updatePromotionMeetingResultForm.letterTitle}
                            />
                            {#if $updatePromotionMeetingResultErrors.letterTitle}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$updatePromotionMeetingResultErrors.letterTitle[0]}</span
                                >
                            {/if}
                        </form>
                    </div>

                    <div class="w-full border-b pb-3">
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight />
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            tableItems={candidateList}
                            hasCheckbox
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'staffID',
                                'staffName',
                                'identificationNumber',
                                'promotionMeetingResult',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                ></StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Kemaskini Keputusan">
                        <TextIconButton
                            label="Batal"
                            onClick={() => (editMode = false)}
                        >
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton
                            primary
                            label="Simpan"
                            form="updatePromotionMeetingResultDetailForm"
                        >
                            <SvgCheck />
                        </TextIconButton>
                    </SectionHeader>

                    <SectionHeader title="Maklumat Calon" />
                    <TextField
                        disabled
                        name="staffID"
                        label="No. Pekerja"
                        value="001023"
                    />
                    <TextField
                        disabled
                        name="staffName"
                        label="Name"
                        value="Ismail bin Ramdan"
                    />
                    <TextField
                        disabled
                        name="identificationNo"
                        label="No. K/p"
                        value="890701-13-5667"
                    />
                    <TextField
                        disabled
                        name="program"
                        label="Program"
                        value="-"
                    />
                    <TextField disabled name="skim" label="Skim" value="-" />
                    <TextField disabled name="gred" label="Gred" value="F41" />
                    <TextField
                        disabled
                        name="positionName"
                        label="Nama Jawatan"
                        value="F41 - Pegawai Teknologi Maklumat"
                    />
                    <TextField
                        disabled
                        name="currentPlacement"
                        label="Penempatan Sekarang"
                        value="00105 - Bhgn. Teknologi Maklumat"
                    />
                    <TextField
                        disabled
                        name="group"
                        label="Kumpulan"
                        value="PP1 - Pengurusan dan Professional - A"
                    />
                    <TextField
                        disabled
                        name="educationLoanDeclaration"
                        label="Akuan Pinjaman Pendidikan/Institusi"
                        value="-"
                    />

                    <SectionHeader
                        title="Keputusan Mesyuarat Kenaikan Pangkat"
                    />

                    <form
                        id="updatePromotionMeetingResultDetailForm"
                        method="POST"
                        use:updatePromotionMeetingResultDetailEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <RadioSingle
                            disabled={false}
                            {options}
                            name="promotionMeetingResult"
                            legend={'Keputusan'}
                            bind:userSelected={$updatePromotionMeetingResultDetailForm.promotionMeetingResult}
                        ></RadioSingle>
                        {#if $updatePromotionMeetingResultDetailErrors.promotionMeetingResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updatePromotionMeetingResultDetailErrors.promotionMeetingResult}</span
                            >
                        {/if}
                    </form></StepperContentBody
                >
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Fifth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Maklumat Pemangkuan Kakitangan"
                >
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => goNext()}
                    >
                        <SvgArrowRight />
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon">
                        <TextIconButton primary label="">
                            <SvgPdf2 />
                        </TextIconButton>
                        <TextIconButton primary label="">
                            <SvgExcel />
                        </TextIconButton>
                    </SectionHeader>

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            tableItems={candidateList}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'staffID',
                                'staffName',
                                'identificationNumber',
                                'acceptingLetter',
                                'reportingForm',
                                'handOverNote',
                                'actingStaffResult',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Keputusan Pemangkuan Kakitangan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Keputusan">
                        <TextIconButton
                            label="Batal"
                            onClick={() => (editMode = false)}
                        >
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton
                            primary
                            label="Simpan"
                            form="updateActingStaffDetailForm"
                        >
                            <SvgCheck />
                        </TextIconButton>
                    </SectionHeader>

                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        name="staffID"
                        label="No. Pekerja"
                        value="001023"
                    />
                    <TextField
                        disabled
                        name="name"
                        label="Name"
                        value="Ismail bin Ramdan"
                    />
                    <TextField
                        disabled
                        name="identificationNumber"
                        label="No. K/P"
                        value="890701-13-5667"
                    />

                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <div
                        class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                    >
                        <div
                            class="flex h-full max-h-full flex-col items-start justify-center"
                        >
                            <span class="text-sm italic text-system-primary"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                        </div>
                    </div>

                    <form
                        id="updateActingStaffDetailForm"
                        method="POST"
                        use:updateActingStaffDetailEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$updateActingStaffDetailErrors.actingPosition ? true : false}
                            name="actingPosition"
                            label="Jawatan Pemangkuan"
                            bind:value={$updateActingStaffDetailForm.actingPosition}
                        />
                        {#if $updateActingStaffDetailErrors.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.actingPosition[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingStaffDetailErrors.actingGred ? true : false}
                            name="actingGred"
                            label="Gred Pemangkuan"
                            bind:value={$updateActingStaffDetailForm.actingGred}
                        />
                        {#if $updateActingStaffDetailErrors.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.actingGred[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingStaffDetailErrors.newPlacement ? true : false}
                            name="newPlacement"
                            label="Penempatan Baru"
                            bind:value={$updateActingStaffDetailForm.newPlacement}
                        />
                        {#if $updateActingStaffDetailErrors.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.newPlacement[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={$updateActingStaffDetailErrors.reportingDate ? true : false}
                            name="reportingDate"
                            label="Tarikh Lapor Diri"
                            bind:value={$updateActingStaffDetailForm.reportingDate}
                        />
                        {#if $updateActingStaffDetailErrors.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.reportingDate[0]}</span
                            >
                        {/if}

                        <SectionHeader title="Pengesah Keputusan"
                        ></SectionHeader>
                        <DropdownSelect
                            hasError={$updateActingStaffDetailErrors.supporterName ? true : false}
                            id="supporterName"
                            label="Nama Penyokong"
                            dropdownType="label-left-full"
                            options={[
                                { value: 'true', name: 'Ya' },
                                { value: 'false', name: 'Tidak' },
                            ]}
                            bind:value={$updateActingStaffDetailForm.supporterName}
                        />
                        {#if $updateActingStaffDetailErrors.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.supporterName[0]}</span
                            >
                        {/if}
                        <DropdownSelect
                            hasError={$updateActingStaffDetailErrors.approverName ? true : false}
                            id="approverName"
                            label="Nama Pelulus"
                            dropdownType="label-left-full"
                            options={[
                                { value: 'true', name: 'Ya' },
                                { value: 'false', name: 'Tidak' },
                            ]}
                            bind:value={$updateActingStaffDetailForm.approverName}
                        />
                        {#if $updateActingStaffDetailErrors.approverName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateActingStaffDetailErrors.approverName[0]}</span
                            >
                        {/if}
                    </form></StepperContentBody
                >
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Sixth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Penyokong & Pelulus">
                <TextIconButton
                    primary
                    label="Selesai"
                    form="supporterAndApproverForm"
                >
                    <SvgCircleF2 />
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5 border-b pb-3">
                    <form
                        id="supporterAndApproverForm"
                        method="POST"
                        use:supporterAndApproverEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={$supporterAndApproverErrors.supporterName ? true : false}
                            name="supporterName"
                            label="Nama Penyokong"
                            bind:value={$supporterAndApproverForm.supporterName}
                        ></TextField>
                        {#if $supporterAndApproverErrors.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supporterAndApproverErrors.supporterName[0]}</span
                            >
                        {/if}
                        <TextField
                            hasError={$supporterAndApproverErrors.approverName ? true : false}
                            name="approverName"
                            label="Nama Pelulus"
                            bind:value={$supporterAndApproverForm.approverName}
                        ></TextField>
                        {#if $supporterAndApproverErrors.approverName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supporterAndApproverErrors.approverName[0]}</span
                            >
                        {/if}
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
