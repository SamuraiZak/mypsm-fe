<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters.js';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox, Radio } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _approvalRemarkFormSchema,
        _submitApprovalRemarkForm,
        _approvalAndOfferSchema,
        _submitApprovalAndOfferForm,
    } from './+page';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;

    // Initialize Variables
    let activeStepper = 0;
    let labelBlack = false;
    let disabled = true;
    let isStaff = 'true';
    let infoTrue = true;
    let selectedService = 'true';
    let selectedApproval = 'true';
    let rentRate = 'under25km';

    let allEmp: any[] = Object.keys(mockEmployees).map(function (keys) {
        return { value: keys[0], name: mockEmployees[parseInt(keys)].name };
    });
    let selectedApprover = '';
    let selectedSupporter = '';

    // Get Mock Data
    let currEmpQuartersRec = mockRekodKuarters.filter(
        (rec) => rec.id == $selectedRecordId,
    );

    let currRecord = mockRekodKuarters.filter(
        (rec) => rec.id == $selectedRecordId,
    )[0];
    let currentEmployee = mockEmployees.filter(
        (rec) => rec.employeeNumber == currRecord.employeeNumber,
    )[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Kakitangan LKIM',
        },
        {
            value: 'false',
            label: 'Bukan Kakitangan LKIM',
        },
    ];

    const approvalOptions: RadioOption[] = [
        {
            value: true,
            label: 'LULUS',
        },
        {
            value: false,
            label: 'TIDAK LULUS',
        },
    ];
    const serviceOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Persekutuan',
        },
        {
            value: 'false',
            label: 'Negeri',
        },
    ];

    // Functions

    //Function to Convert Date
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    //function to get current age
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

    // ====================== Form Validation
    const {
        form: approvalRemarkForm,
        errors: approvalRemarkError,
        enhance: approvalRemarkEnhance,
    } = superForm(data.approvalRemarkForm, {
        SPA: true,
        id: 'approvalRemarkForm',
        validators: _approvalRemarkFormSchema,
        onSubmit() {
            _submitApprovalRemarkForm($approvalRemarkForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

    const {
        form: approvalAndOfferForm,
        errors: approvalAndOfferError,
        enhance: approvalAndOfferEnhance,
    } = superForm(data.approvalAndOfferForm, {
        SPA: true,
        id: 'approvalAndOfferForm',
        validators: _approvalAndOfferSchema,
        onSubmit() {
            _submitApprovalAndOfferForm($approvalAndOfferForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Permohonan Kuarter {'KTR-' +
            currEmpQuartersRec[0].employeeNumber}"
        description="Hal-hal berkaitan menguruskan kuarters"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton></ContentHeader
    >
</section>

<Stepper
    activeIndex={activeStepper}
    dataId={'ID: KTR-' + currEmpQuartersRec[0].employeeNumber}
    dataStatus={'Status: ' + currEmpQuartersRec[0].status}
>
    <StepperContent>
        <StepperContentHeader title="Jenis Pemohon"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <RadioSingle
                userSelected={currRecord.typeOfRequestor == 'Kakitangan LKIM'
                    ? 'true'
                    : 'false'}
                {labelBlack}
                {disabled}
                {options}
                legend={'Jenis Pemohon'}
            ></RadioSingle>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label="Nama"
                value={currentEmployee.name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. K/P"
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Pekerja"
                value={currentEmployee.employeeNumber}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Telefon"
                value={currentEmployee.mobileNumber}
            ></TextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Surat Menyurat"
                value={currentEmployee.mailAddress}
            ></LongTextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Status"
                value={currentEmployee.marital}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pasangan (Jika Berkhawin)"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label="Nama Penuh"
                value={'Nur Afifah Farhan'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="No. Telefon"
                value={'014-843557'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Jabatan / Jawatan"
                value={'Pengurus'}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gaji Sekarang yang Diterima (Gaji Pokok / Hakiki) (RM)"
                value={CurrencyHelper.formatCurrency(4123.22)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Bilangan anak yang tinggal bersama pemohon yang berumur kurang 21 tahun"
                value={'2'}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- TODO: DIFFERENT CONTENT FOR AGENSI LUAR  -->
            <TextField
                {disabled}
                {labelBlack}
                label="Nama Jawatan"
                value={currEmpPosition[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Gred"
                value={currEmpGrade[0].code}
            ></TextField>
            <RadioSingle
                {labelBlack}
                {disabled}
                options={serviceOptions}
                userSelected={selectedService}
                legend="Perkhidmatan"
            ></RadioSingle>
            <DateSelector
                label="Tarikh Mula Dilantik ke Perkhidmatan Kerajaan"
                {disabled}
                name="appointedDateToGoverment"
                {labelBlack}
            />
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Penuh Jabatan / Agensi Bertugas"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label="Alamat Penuh Jabatan / Agensi Pembayar Gaji"
                value={'D/A Lembaga Kemajuan Ikan Malaysia, Lot 329, Seksyen 9, Jalan Satok, Pelabuhan Senari, Sarawak, 93400 Kuching'}
            ></LongTextField>
            <DropdownSelect
                {disabled}
                {labelBlack}
                dropdownType="label-left-full"
                label="Bank Pembayar Gaji"
                options={[
                    {
                        value: 'Maybank',
                        name: 'Maybank',
                    },
                ]}
            ></DropdownSelect>
            <TextField
                {disabled}
                {labelBlack}
                label="Gaji Sekarang (Gaji Pokok / Hakiki) (RM)"
                value={CurrencyHelper.formatCurrency(3532.54)}
            ></TextField>

            {#if currRecord.typeOfRequestor == 'Kakitangan LKIM'}
                <TextField
                    {disabled}
                    {labelBlack}
                    label="ITP (RM)"
                    value={CurrencyHelper.formatCurrency(100.0)}
                ></TextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label="COLA (RM)"
                    value={CurrencyHelper.formatCurrency(150.0)}
                ></TextField>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 5;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- TODO: DIFFERENT CONTENT FOR AGENSI LUAR -->
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div>
                </SectionHeader>
                {#if currRecord.typeOfRequestor == 'Kakitangan LKIM'}
                    <div class="flex w-full items-start justify-start">
                        <p class="text-sm text-system-primary">
                            Fail - fail yang dimuat naik:
                        </p>
                    </div>

                    <DownloadAttachment fileName="Kad Pengenalan Sendiri.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment fileName="Kad Pengenalan Pasangan.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment fileName="Kad Nikah.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment fileName="Kad Pekerja.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment
                        fileName="Surat Pengesahan Jabatan/Majikan.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment
                        fileName="Slip Gaji 3 Bulan yang Terkini.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment fileName="Gambar Dalaman Kuarters.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment fileName="Gambar Luaran Kuarters.pdf"
                    ></DownloadAttachment>
                {:else}
                    <div class="flex w-full flex-col text-sm text-txt-tertiary">
                        <span>Muat naik salinan</span>
                        <span>1. Gambar berukuran passport</span>
                        <span>2. Kad pengenalan sendiri</span>
                        <span>3. Kad pengenalan pasangan</span>
                        <span>4. Kad nikah</span>
                        <span>5. Kad pekerja</span>
                        <span>6. Surat Pengesahan Jabatan/Majikan</span>
                        <span>7. Slip gaji 3 bulan yang terkini</span>
                        <span>8. Lain-lain</span>
                    </div>
                    <SectionHeader>
                        <div
                            class="flex w-full justify-end"
                            hidden={$fileSelectionList.length == 0}
                        >
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div>
                    </SectionHeader>
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
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2.5"
            >
                <Checkbox checked={infoTrue} {disabled}
                    ><p>
                        Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar
                    </p></Checkbox
                >
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Ulasan Kelulusan daripada Urus Setia"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 5;
                }}
            />
            <TextIconButton primary label="Simpan" form="approvalRemarkForm"
                ><SvgCheck /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <div class="w-full">
                <span class="text-sm text-system-primary"
                    >&#8226; Keputusan akan dihantar ke email klinik dan Urus
                    Setia berkaitan</span
                >
            </div>
            <form
                id="approvalRemarkForm"
                method="POST"
                use:approvalRemarkEnhance
                class="flex w-full flex-col gap-2"
            >
                <LongTextField
                    hasError={!!$approvalRemarkError.secretaryRemark}
                    name="secretaryRemark"
                    label="Tindakan / Ulasan"
                    bind:value={$approvalRemarkForm.secretaryRemark}
                ></LongTextField>
                {#if $approvalRemarkError.secretaryRemark}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$approvalRemarkError.secretaryRemark[0]}</span
                    >
                {/if}
                <RadioSingle
                    options={approvalOptions}
                    name="approvalResult"
                    bind:userSelected={$approvalRemarkForm.approvalResult}
                    legend=""
                ></RadioSingle>
                {#if $approvalRemarkError.approvalResult}
                    <span class=" font-sans text-sm italic text-system-danger"
                        >{$approvalRemarkError.approvalResult[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Permohonan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton>
            <TextIconButton primary label="Simpan" form="approvalAndOfferForm"
                ><SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <!-- TODO: DIFFERENT CONTENT FOR AGENSI LUAR -->
            <CustomTab>
                {#if currRecord.typeOfRequestor == 'Kakitangan LKIM'}
                    <CustomTabContent title="Maklumat Kelayakan">
                        <SectionHeader title="Maklumat Kelayakan"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        >
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Gred"
                                value={currEmpGrade[0].code}
                            ></TextField>
                        </div>
                    </CustomTabContent>
                    <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                        <form
                            id="approvalAndOfferForm"
                            method="POST"
                            use:approvalAndOfferEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                            >
                                <SectionHeader title="Nama Pelulus"
                                ></SectionHeader>
                                <DropdownSelect
                                    {labelBlack}
                                    hasError={!!$approvalAndOfferError.approvalName}
                                    dropdownType="label-left-full"
                                    id="approvalName"
                                    label="Nama Pelulus"
                                    options={allEmp}
                                    bind:value={$approvalAndOfferForm.approvalName}
                                ></DropdownSelect>
                                {#if $approvalAndOfferError.approvalName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .approvalName[0]}</span
                                    >
                                {/if}
                            </div>
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                            >
                                <SectionHeader
                                    title="Butiran Penempatan Kuarter"
                                ></SectionHeader>
                                <TextField
                                    {labelBlack}
                                    hasError={!!$approvalAndOfferError.applicantEmail}
                                    name="applicantEmail"
                                    label="Emel Pemohon"
                                    bind:value={$approvalAndOfferForm.applicantEmail}
                                ></TextField>
                                {#if $approvalAndOfferError.applicantEmail}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .applicantEmail[0]}</span
                                    >
                                {/if}
                                <DateSelector
                                    {labelBlack}
                                    hasError={!!$approvalAndOfferError.quarterEntryDate}
                                    name="quarterEntryDate"
                                    handleDateChange
                                    label="Tarikh Masuk Kuarter"
                                    bind:selectedDate={$approvalAndOfferForm.quarterEntryDate}
                                ></DateSelector>
                                {#if $approvalAndOfferError.quarterEntryDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .quarterEntryDate[0]}</span
                                    >
                                {/if}
                                <TextField
                                    {labelBlack}
                                    hasError={!!$approvalAndOfferError.unitAndQuarter}
                                    name="unitAndQuarter"
                                    label="Unit Dan Kuarter"
                                    bind:value={$approvalAndOfferForm.unitAndQuarter}
                                ></TextField>
                                {#if $approvalAndOfferError.unitAndQuarter}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .unitAndQuarter[0]}</span
                                    >
                                {/if}
                            </div>
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                            >
                                <!-- WIP -->
                                <SectionHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                ></SectionHeader>
                                {#if $approvalAndOfferError.rentalPaymentRates}
                                    <span
                                        class="font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .rentalPaymentRates[0]}</span
                                    >
                                {/if}
                                <div class="flex flex-col gap-5">
                                    <ul
                                        class="bg-white dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
                                    >
                                        <li>
                                            <Radio
                                                class="p-3"
                                                bind:group={$approvalAndOfferForm.rentalPaymentRates}
                                                value="under25km"
                                            >
                                                <div
                                                    class="flex flex-col pl-10 text-sm italic {$approvalAndOfferForm.rentalPaymentRates ==
                                                    'under25km'
                                                        ? 'text-txt-primary'
                                                        : 'text-txt-tertiary'}"
                                                >
                                                    <p>Dalam Jarak 25 KM:</p>
                                                    <ul
                                                        class="list-inside list-disc pl-2"
                                                    >
                                                        <li>
                                                            Potongan ITP 75%
                                                        </li>
                                                        <li>
                                                            Potongan COLA 50%
                                                        </li>
                                                    </ul>
                                                </div></Radio
                                            >
                                        </li>
                                        <li>
                                            <Radio
                                                class="p-3"
                                                bind:group={$approvalAndOfferForm.rentalPaymentRates}
                                                value="more25km"
                                                ><div
                                                    class="flex flex-col pl-10 text-sm italic {$approvalAndOfferForm.rentalPaymentRates ==
                                                    'more25km'
                                                        ? 'text-txt-primary'
                                                        : 'text-txt-tertiary'}"
                                                >
                                                    <p>Jarak Melebihi 25 KM:</p>
                                                    <ul
                                                        class="list-inside list-disc pl-2"
                                                    >
                                                        <li>
                                                            Potongan COLA 50%
                                                        </li>
                                                    </ul>
                                                </div></Radio
                                            >
                                        </li>
                                        <li>
                                            <Radio
                                                class="p-3"
                                                bind:group={$approvalAndOfferForm.rentalPaymentRates}
                                                value="gredExceed"
                                                ><div
                                                    class="flex flex-col pl-10 text-sm italic {$approvalAndOfferForm.rentalPaymentRates ==
                                                    'gredExceed'
                                                        ? 'text-txt-primary'
                                                        : 'text-txt-tertiary'}"
                                                >
                                                    <p>
                                                        Gred Jawatan Melebihi
                                                        Kategori Kuarters:
                                                    </p>
                                                    <ul
                                                        class="list-inside list-disc pl-2"
                                                    >
                                                        <li>
                                                            Potongan ITP
                                                            Mengikut Nilar
                                                            Sewaan Gred
                                                            Tertinggi Kuarters
                                                            yang Diperuntukkan
                                                            (RM)
                                                        </li>
                                                        <TextField
                                                            labelBlack
                                                            disabled={$approvalAndOfferForm.rentalPaymentRates !=
                                                                'gredExceed'}
                                                            label=""
                                                            value={CurrencyHelper.formatCurrency(
                                                                0,
                                                            )}
                                                        ></TextField>
                                                    </ul>
                                                </div></Radio
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </CustomTabContent>
                {:else}
                    <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                        <form
                            id="approvalAndOfferForm"
                            method="POST"
                            use:approvalAndOfferEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-4"
                            >
                                <SectionHeader title="Masukkan Nama Pelulus" />
                                <DropdownSelect
                                    hasError={!!$approvalAndOfferError.approvalName}
                                    {labelBlack}
                                    name="approvalName"
                                    label="Nama Pelulus"
                                    dropdownType="label-left-full"
                                    options={[
                                        {
                                            value: 'Irfan',
                                            name: 'Irfan',
                                        },
                                    ]}
                                    bind:value={$approvalAndOfferForm.approvalName}
                                />
                                {#if $approvalAndOfferError.approvalName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .approvalName[0]}</span
                                    >
                                {/if}

                                <SectionHeader
                                    title="Butiran Penempatan Kuarter"
                                />
                                <TextField
                                    hasError={!!$approvalAndOfferError.applicantEmail}
                                    {labelBlack}
                                    name="applicantEmail"
                                    label="Emel Pemohon"
                                    bind:value={$approvalAndOfferForm.applicantEmail}
                                />
                                {#if $approvalAndOfferError.applicantEmail}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .applicantEmail[0]}</span
                                    >
                                {/if}
                                <DateSelector
                                    {labelBlack}
                                    hasError={!!$approvalAndOfferError.quarterEntryDate}
                                    name="quarterEntryDate"
                                    handleDateChange
                                    label="Tarikh Masuk Kuarter"
                                    bind:selectedDate={$approvalAndOfferForm.quarterEntryDate}
                                ></DateSelector>
                                {#if $approvalAndOfferError.quarterEntryDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .quarterEntryDate[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$approvalAndOfferError.unitAndQuarter}
                                    {labelBlack}
                                    name="unitAndQuarter"
                                    label="Unit Dan Kuarter"
                                    bind:value={$approvalAndOfferForm.unitAndQuarter}
                                />
                                {#if $approvalAndOfferError.unitAndQuarter}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .unitAndQuarter[0]}</span
                                    >
                                {/if}
                                <SectionHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                />
                                <TextField
                                    hasError={!!$approvalAndOfferError.monthlyRentalValue}
                                    {labelBlack}
                                    name="monthlyRentalValue"
                                    label="Nilai Sewaan Bulanan (RM)"
                                    bind:value={$approvalAndOfferForm.monthlyRentalValue}
                                />
                                {#if $approvalAndOfferError.monthlyRentalValue}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .monthlyRentalValue[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$approvalAndOfferError.twoMonthsDeposit}
                                    {labelBlack}
                                    name="twoMonthsDeposit"
                                    label="Deposits (2 Bulan Nilai Sewaan) (RM)"
                                    bind:value={$approvalAndOfferForm.twoMonthsDeposit}
                                />
                                {#if $approvalAndOfferError.twoMonthsDeposit}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .twoMonthsDeposit[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$approvalAndOfferError.utilityDeposit}
                                    {labelBlack}
                                    name="utilityDeposit"
                                    label="Deposits (Air dan Elektrik) (RM)"
                                    bind:value={$approvalAndOfferForm.utilityDeposit}
                                />
                                {#if $approvalAndOfferError.utilityDeposit}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$approvalAndOfferError
                                            .utilityDeposit[0]}</span
                                    >
                                {/if}
                            </div>
                        </form>
                        <SectionHeader title="Muat Naik Resit Bayaran" />
                        <div
                            class="flex w-full flex-col text-sm text-txt-tertiary"
                        >
                            <span>1. Resit Deposit Sewaan</span>
                            <span>2. Resit Utiliti</span>
                            <span>3. Penyata Bank (Standing Instruction)</span>
                            <span>4. Gambar Dalaman Kuarters</span>
                            <span>5. Gambar Luaran Kuarters</span>
                        </div>

                        <SectionHeader>
                            <div
                                class="flex w-full justify-end"
                                hidden={$fileSelectionList.length == 0}
                            >
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div>
                        </SectionHeader>
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
                                    <FileInputField
                                        id="fileInput"
                                        {handleOnChange}
                                    ></FileInputField>
                                </div>
                            </div>
                        </div>
                    </CustomTabContent>
                {/if}
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Surat Tawaran Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 7;
                }}
            ></FormButton><FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
            >
                <DownloadAttachment
                    fileName="SURAT TAWARAN PENEMPATAN KUARTERS.pdf"
                ></DownloadAttachment>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
