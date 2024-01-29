<!-- WIP -->
<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
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
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
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
        _submitExitQuarterForm,
        _exitQuartersSchema,
        _submitNonStaffExitQuarterForm,
        _nonStaffExitQuarterSchema,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;

    // Initialize Variables
    let activeStepper = 0;
    let labelBlack = false;
    let disabled = true;
    let isStaff = 'true';
    let infoTrue = true;
    let paymentDelay: boolean;
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
            label: 'SAH',
        },
        {
            value: false,
            label: 'TIDAK SAH',
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
        id: 'secretaryApprovalRemarkForm',
        validators: _approvalRemarkFormSchema,
        onSubmit() {
            _submitApprovalRemarkForm($approvalRemarkForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
    });

    const {
        form: exitQuarterForm,
        errors: exitQuarterError,
        enhance: exitQuarterEnhance,
    } = superForm(data.exitQuarterForm, {
        SPA: true,
        id: 'exitQuarterForm',
        validators: _exitQuartersSchema,
        onSubmit() {
            _submitExitQuarterForm($exitQuarterForm);
        },
    });

    const {
        form: nonStaffExitQuarterForm,
        errors: nonStaffExitQuarterError,
        enhance: nonStaffExitQuarterEnhance,
    } = superForm(data.nonStaffExitQuarterForm, {
        SPA: true,
        id: 'nonStaffExitQuarterForm',
        validators: _nonStaffExitQuarterSchema,
        onSubmit() {
            _submitNonStaffExitQuarterForm($nonStaffExitQuarterForm);
        },
        taintedMessage: false,
    });

    $: if (!$nonStaffExitQuarterForm.hasOutstanding){
        $nonStaffExitQuarterForm.outstandingAmount = 0;
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Permohonan Keluar Kuarter {'KTR-' +
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
        <StepperContentHeader title="Maklumat Penempatan Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
            <FormButton
                type="next"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader title="Butiran Penempatan Kuarter" />
            <div class="flex w-full flex-col gap-2.5 border-b py-5">
                <TextField
                    {disabled}
                    {labelBlack}
                    label="Email Pemohon"
                    value={'Nur Afifah Farhan'}
                ></TextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label="Tarikh Masuk Kuarter"
                    value={'014-843557'}
                ></TextField>
                <TextField
                    {disabled}
                    {labelBlack}
                    label="Unit Dan Kuarter"
                    value={'Pengurus'}
                ></TextField>
            </div>
            <div class="flex w-full flex-col gap-2.5 border-b py-3">
                <SectionHeader
                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                />
                {#if currRecord.typeOfRequestor === 'Kakitangan LKIM'}
                    <div class="flex flex-col gap-5">
                        <ul
                            class="bg-white dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
                        >
                            <li>
                                <Radio
                                    class="p-3"
                                    bind:group={rentRate}
                                    value="under25km"
                                >
                                    <div
                                        class="flex flex-col pl-10 text-sm italic {rentRate ==
                                        'under25km'
                                            ? 'text-txt-primary'
                                            : 'text-txt-tertiary'}"
                                    >
                                        <p>Dalam Jarak 25 KM:</p>
                                        <ul class="list-inside list-disc pl-2">
                                            <li>Potongan ITP 75%</li>
                                            <li>Potongan COLA 50%</li>
                                        </ul>
                                    </div></Radio
                                >
                            </li>
                            <li>
                                <Radio
                                    class="p-3"
                                    bind:group={rentRate}
                                    value="more25km"
                                    ><div
                                        class="flex flex-col pl-10 text-sm italic {rentRate ==
                                        'more25km'
                                            ? 'text-txt-primary'
                                            : 'text-txt-tertiary'}"
                                    >
                                        <p>Jarak Melebihi 25 KM:</p>
                                        <ul class="list-inside list-disc pl-2">
                                            <li>Potongan COLA 50%</li>
                                        </ul>
                                    </div></Radio
                                >
                            </li>
                            <li>
                                <Radio
                                    class="p-3"
                                    bind:group={rentRate}
                                    value="gredExceed"
                                    ><div
                                        class="flex flex-col pl-10 text-sm italic {rentRate ==
                                        'gredExceed'
                                            ? 'text-txt-primary'
                                            : 'text-txt-tertiary'}"
                                    >
                                        <p>
                                            Gred Jawatan Melebihi Kategori
                                            Kuarters:
                                        </p>
                                        <ul class="list-inside list-disc pl-2">
                                            <li>
                                                Potongan ITP Mengikut Nilar
                                                Sewaan Gred Tertinggi Kuarters
                                                yang Diperuntukkan (RM)
                                            </li>
                                            <TextField
                                                labelBlack
                                                disabled={rentRate !=
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
                {:else}
                    <TextField
                        {labelBlack}
                        name="monthlyRentalValue"
                        disabled
                        label="Nilai Sewaan Bulanan (RM)"
                        value={''}
                    ></TextField>
                    <TextField
                        {labelBlack}
                        name="rentalDeposit"
                        disabled
                        label="Deposits (2 Bulan Nilai Sewaan) (RM)"
                        value={''}
                    ></TextField>
                    <TextField
                        {labelBlack}
                        name="utilityDeposit"
                        disabled
                        label="Deposits (Air dan Elektrik) (RM)"
                        value={''}
                    ></TextField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluar Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
            {#if currRecord.typeOfRequestor === 'Kakitangan LKIM'}
                <FormButton
                    type="next"
                    onClick={() => {
                        activeStepper = 4;
                    }}
                ></FormButton>
            {:else}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="nonStaffExitQuarterForm"
                    ><SvgCheck />
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader title="Butiran Keluar Kuarter" />
            {#if currRecord.typeOfRequestor === 'Kakitangan LKIM'}
                <DateSelector
                    name="quarterExitDate"
                    {disabled}
                    {labelBlack}
                    label="Tarikh Keluar Kuarter"
                    selectedDate={''}
                />
                <TextField
                    name="unitAndQuarter"
                    {disabled}
                    {labelBlack}
                    label="Unit Dan Kuarter"
                    value={''}
                />
            {:else}
                <form
                    id="nonStaffExitQuarterForm"
                    method="POST"
                    use:nonStaffExitQuarterEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <DateSelector
                        hasError={!!$nonStaffExitQuarterError.quarterExitDate}
                        name="quarterExitDate"
                        {labelBlack}
                        label="Tarikh Keluar Kuarter"
                        bind:selectedDate={$nonStaffExitQuarterForm.quarterExitDate}
                    />
                    {#if $nonStaffExitQuarterError.quarterExitDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$nonStaffExitQuarterError
                                .quarterExitDate[0]}</span
                        >
                    {/if}
                    <TextField
                        name="unitAndQuarter"
                        {disabled}
                        {labelBlack}
                        label="Unit Dan Kuarter"
                        value={''}
                    />
                    <SectionHeader
                        title="Sila Tetapkan Butiran Tunggakan Bayaran"
                    />
                    <RadioSingle
                        options={[
                            {
                                value: true,
                                label: 'Ada Tunggakan',
                            },
                            {
                                value: false,
                                label: ' Tiada Tunggakan',
                            },
                        ]}
                        name="hasOutstanding"
                        bind:userSelected={$nonStaffExitQuarterForm.hasOutstanding}
                        legend=""
                    />

                    {#if $nonStaffExitQuarterForm.hasOutstanding}
                        <TextField
                            hasError={!!$nonStaffExitQuarterError.outstandingAmount}
                            name="outstandingAmount"
                            {labelBlack}
                            label="Jumlah Tunggakan (Jika Ada) (RM) "
                            bind:value={$nonStaffExitQuarterForm.outstandingAmount}
                        />
                        {#if $nonStaffExitQuarterError.outstandingAmount}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$nonStaffExitQuarterError
                                    .outstandingAmount[0]}</span
                            >
                        {/if}

                        <DownloadAttachment
                            fileName="SURAT ARAHAN BAYARAN TUNGGAKAN.pdf"
                        />
                    {/if}
                </form>
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
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Keluar Kuarters"
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
                        <span>Isi dan muat naik salinan berikut:</span>
                        <span>1. Borang Akaun Keluar Kuarters</span>
                        <span>2. Borang Pemeriksaan Keluar Kuarters</span>
                        <span>3. Gambar Dalaman Kuarters</span>
                        <span>4. Gambar Luaran Kuarters</span>
                    </div>

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
            ></FormButton>
            <TextIconButton
                primary
                label="Simpan"
                form="secretaryApprovalRemarkForm"
                ><SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="w-full">
                <span class="text-sm text-system-primary"
                    >&#8226; Keputusan akan dihantar ke email klinik dan Urus
                    Setia berkaitan</span
                >
            </div>
            <form
                id="secretaryApprovalRemarkForm"
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
            <TextIconButton primary label="Simpan" form="exitQuarterForm"
                ><SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            {#if currRecord.typeOfRequestor == 'Kakitangan LKIM'}
                <CustomTab>
                    <CustomTabContent title="Maklumat Penempatan">
                        <SectionHeader title="Butiran Penempatan Kuarter"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-4"
                        >
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Emel Pemohon"
                                value={currEmpGrade[0].code}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Tarikh Masuk Kuarter"
                                value={currEmpGrade[0].code}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Unit Dan Kuarter"
                                value={currEmpGrade[0].code}
                            ></TextField>
                        </div>
                        <SectionHeader
                            title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                        />
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-4"
                        >
                            <div class="flex flex-col gap-5">
                                <ul
                                    class="bg-white dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
                                >
                                    <li>
                                        <Radio
                                            class="p-3"
                                            bind:group={rentRate}
                                            value="under25km"
                                        >
                                            <div
                                                class="flex flex-col pl-10 text-sm italic {rentRate ==
                                                'under25km'
                                                    ? 'text-txt-primary'
                                                    : 'text-txt-tertiary'}"
                                            >
                                                <p>Dalam Jarak 25 KM:</p>
                                                <ul
                                                    class="list-inside list-disc pl-2"
                                                >
                                                    <li>Potongan ITP 75%</li>
                                                    <li>Potongan COLA 50%</li>
                                                </ul>
                                            </div></Radio
                                        >
                                    </li>
                                    <li>
                                        <Radio
                                            class="p-3"
                                            bind:group={rentRate}
                                            value="more25km"
                                            ><div
                                                class="flex flex-col pl-10 text-sm italic {rentRate ==
                                                'more25km'
                                                    ? 'text-txt-primary'
                                                    : 'text-txt-tertiary'}"
                                            >
                                                <p>Jarak Melebihi 25 KM:</p>
                                                <ul
                                                    class="list-inside list-disc pl-2"
                                                >
                                                    <li>Potongan COLA 50%</li>
                                                </ul>
                                            </div></Radio
                                        >
                                    </li>
                                    <li>
                                        <Radio
                                            class="p-3"
                                            bind:group={rentRate}
                                            value="gredExceed"
                                            ><div
                                                class="flex flex-col pl-10 text-sm italic {rentRate ==
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
                                                        Potongan ITP Mengikut
                                                        Nilar Sewaan Gred
                                                        Tertinggi Kuarters yang
                                                        Diperuntukkan (RM)
                                                    </li>
                                                    <TextField
                                                        labelBlack
                                                        disabled={rentRate !=
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
                    </CustomTabContent>
                    <CustomTabContent title="Maklumat Pengeluaran">
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-5"
                        >
                            <SectionHeader title="Nama Pelulus"></SectionHeader>
                            <form
                                id="exitQuarterForm"
                                method="POST"
                                use:exitQuarterEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <DateSelector
                                    hasError={!!$exitQuarterError.exitQuarterDate}
                                    name="exitQuarterDate"
                                    handleDateChange
                                    label="Tarikh Keluar Kuarter"
                                    bind:selectedDate={$exitQuarterForm.exitQuarterDate}
                                />
                                {#if $exitQuarterError.exitQuarterDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .exitQuarterDate[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$exitQuarterError.unitAndQuarter}
                                    name="unitAndQuarter"
                                    label="Unit Dan Kuarter"
                                    bind:value={$exitQuarterForm.unitAndQuarter}
                                />
                                {#if $exitQuarterError.unitAndQuarter}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .unitAndQuarter[0]}</span
                                    >
                                {/if}
                            </form>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            {:else}
                <CustomTab>
                    <CustomTabContent title="Maklumat Penempatan">
                        <SectionHeader title="Butiran Penempatan Kuarter"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-4"
                        >
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Emel Pemohon"
                                value={currEmpGrade[0].code}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Tarikh Masuk Kuarter"
                                value={currEmpGrade[0].code}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Unit Dan Kuarter"
                                value={currEmpGrade[0].code}
                            ></TextField>
                        </div>
                        <SectionHeader
                            title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                        />
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b pb-4"
                        >
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Nilai Sewaan Bulanan (RM)"
                                value={''}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Deposits (2 Bulan Nilai Sewaan) (RM)"
                                value={''}
                            ></TextField>
                            <TextField
                                {disabled}
                                {labelBlack}
                                label="Deposits (Air dan Elektrik) (RM)"
                                value={''}
                            ></TextField>
                        </div>
                    </CustomTabContent>
                    <CustomTabContent title="Maklumat Keluar Kuarters">
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                        >
                            <form
                                id="exitQuarterForm"
                                method="POST"
                                use:exitQuarterEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <SectionHeader title="Masukkan Nama Pelulus" />
                                <DropdownSelect
                                    hasError={!!$exitQuarterError.approverName}
                                    {labelBlack}
                                    name="approverName"
                                    label="Nama Pelulus"
                                    dropdownType="label-left-full"
                                    options={[
                                        {
                                            value: 'Irfan',
                                            name: 'Irfan',
                                        },
                                    ]}
                                    bind:value={$exitQuarterForm.approverName}
                                />
                                {#if $exitQuarterError.approverName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .approverName[0]}</span
                                    >
                                {/if}
                                <SectionHeader
                                    title="Butiran Penempatan Kuarter"
                                />
                                <TextField
                                    hasError={!!$exitQuarterError.applicantEmail}
                                    {labelBlack}
                                    name="applicantEmail"
                                    label="Emel Pemohon"
                                    bind:value={$exitQuarterForm.applicantEmail}
                                />
                                {#if $exitQuarterError.applicantEmail}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .applicantEmail[0]}</span
                                    >
                                {/if}
                                <DateSelector
                                    hasError={!!$exitQuarterError.quarterEntryDate}
                                    name="quarterEntryDate"
                                    {labelBlack}
                                    label="Tarikh Masuk Kuarter"
                                    bind:selectedDate={$exitQuarterForm.quarterEntryDate}
                                />
                                {#if $exitQuarterError.quarterEntryDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .quarterEntryDate[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$exitQuarterError.unitAndQuarter}
                                    {labelBlack}
                                    name="unitAndQuarter"
                                    label="Unit Dan Kuarter"
                                    bind:value={$exitQuarterForm.unitAndQuarter}
                                />
                                {#if $exitQuarterError.unitAndQuarter}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .unitAndQuarter[0]}</span
                                    >
                                {/if}
                                <SectionHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                />
                                <TextField
                                    hasError={!!$exitQuarterError.monthlyRentalAmount}
                                    {labelBlack}
                                    name="monthlyRentalAmount"
                                    label="Nilai Sewaan Bulanan (RM)"
                                    bind:value={$exitQuarterForm.monthlyRentalAmount}
                                />
                                {#if $exitQuarterError.monthlyRentalAmount}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .monthlyRentalAmount[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$exitQuarterError.depositAmount}
                                    {labelBlack}
                                    name="depositAmount"
                                    label="Deposits (2 Bulan Nilai Sewaan) (RM)"
                                    bind:value={$exitQuarterForm.depositAmount}
                                />
                                {#if $exitQuarterError.depositAmount}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$exitQuarterError
                                            .depositAmount[0]}</span
                                    >
                                {/if}
                                <TextField
                                    {labelBlack}
                                    {disabled}
                                    name="utilityDeposit"
                                    label="Deposits (Air dan Elektrik) (RM)"
                                    value={'300.00 (Tetap)'}
                                />
                            </form>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            {/if}
        </StepperContentBody>
    </StepperContent>
    {#if currRecord.typeOfRequestor !== 'Kakitangan LKIM'}
        <StepperContent>
            <StepperContentHeader title="Cetak Surat dan Borang"
                ><FormButton
                    type="back"
                    onClick={() => {
                        activeStepper = 6;
                    }}
                ></FormButton>
                <TextIconButton primary label="Selesai">
                    <SvgCircleF2 />
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Cetak Surat dan Borang" />
                <DownloadAttachment fileName="BORANG PEMERIKSAAN KUARTERS" />
                <DownloadAttachment fileName="SURAT MAKLUMAN NEGERI" />
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
