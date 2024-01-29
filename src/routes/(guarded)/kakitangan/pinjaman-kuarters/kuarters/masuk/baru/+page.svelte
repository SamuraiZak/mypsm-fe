<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import { selectedRecordId } from '$lib/stores/globalState';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _submitPartnerDetailForm,
        _partnerDetailSchema,
        _serviceDetailSchema,
        _submitServiceDetailForm,
        _submitValidationForm,
        _validationSchema,
    } from './+page';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;

    let disabled = true;
    let labelBlack = false;
    let isStaff = 'true';
    let infoTrue = false;
    let activeStepper = 0;
    // let currRecord = mockRekodKuarters.filter(
    //     (rec) => rec.id == $selectedRecordId,
    // )[0];

    let currRecord: Record<string, any> = [
        {
            id: 1,
            employeeNumber: '00001',
            employeeName: 'Mohd Irfan Bin Abu',
            typeOfRequestor: 'Kakitangan LKIM',
            identityDocumentNumber: '890405-11-1234',
            category: 'Tetap',
            applicationDate: '2023-10-10',
            approvedDate: '2023-11-15',
            status: 'DALAM PROSES',
            typeOfRequest: 'Masuk',
            isOccupied: 'Ya',
            remarks: '',
        },
    ];
    let currentEmployee = mockEmployees.filter((rec) => rec.id == 1)[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
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
        form: partnerDetailForm,
        errors: partnerDetailError,
        enhance: partnerDetailEnhance,
    } = superForm(data.partnerDetailForm, {
        SPA: true,
        id: 'partnerDetailForm',
        validators: _partnerDetailSchema,
        onSubmit() {
            _submitPartnerDetailForm($partnerDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: serviceDetailForm,
        errors: serviceDetailError,
        enhance: serviceDetailEnhance,
    } = superForm(data.serviceDetailForm, {
        SPA: true,
        id: 'serviceDetailForm',
        validators: _serviceDetailSchema,
        onSubmit() {
            _submitServiceDetailForm($serviceDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: validationForm,
        errors: validationError,
        enhance: validationEnhance,
    } = superForm(data.validationForm, {
        SPA: true,
        id: 'validationForm',
        validators: _validationSchema,
        onSubmit() {
            _submitValidationForm($validationForm);
        },
        taintedMessage: false,
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Kuarters"
        description="Butiran permohonan kuarters"
        ><FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>

<Stepper
    activeIndex={activeStepper}
    dataId={'ID: ' + ' ' + currRecord.employeeNumber}
    dataStatus={'Status: ' + ' ' + currRecord.status}
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
                label="No. Pekerja"
                value={currentEmployee.employeeNumber}
            ></TextField>
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
                label="Gred"
                value={currEmpGrade[0].code}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label="Penempatan Semasa"
                value={currEmpService[0].placement}
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
            ></FormButton>
            <FormButton type="reset" onClick={() => {}} />
            <TextIconButton primary label="Simpan" form="partnerDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="partnerDetailForm"
                method="POST"
                use:partnerDetailEnhance
                class="flex w-full flex-col gap-2"
            >
                <TextField
                    hasError={!!$partnerDetailError.partnerName}
                    name="partnerName"
                    {labelBlack}
                    label="Nama Penuh"
                    bind:value={$partnerDetailForm.partnerName}
                />
                {#if $partnerDetailError.partnerName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$partnerDetailError.partnerName[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$partnerDetailError.partnerTelephoneNo}
                    name="partnerTelephoneNo"
                    {labelBlack}
                    label="No. Telefon"
                    bind:value={$partnerDetailForm.partnerTelephoneNo}
                />
                {#if $partnerDetailError.partnerTelephoneNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$partnerDetailError.partnerTelephoneNo[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$partnerDetailError.partnerPosition}
                    name="partnerPosition"
                    {labelBlack}
                    label="Jabatan / Jawatan"
                    bind:value={$partnerDetailForm.partnerPosition}
                />
                {#if $partnerDetailError.partnerPosition}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$partnerDetailError.partnerPosition[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$partnerDetailError.partnerSalary}
                    name="partnerSalary"
                    {labelBlack}
                    label="Gaji Sekarang yang Diterima (Gaji Pokok / Hakiki) (RM)"
                    bind:value={$partnerDetailForm.partnerSalary}
                />
                {#if $partnerDetailError.partnerSalary}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$partnerDetailError.partnerSalary[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$partnerDetailError.noOfChildren}
                    name="noOfChildren"
                    {labelBlack}
                    label="Bilangan anak yang tinggal bersama pemohon yang berumur kurang 21 tahun"
                    bind:value={$partnerDetailForm.noOfChildren}
                />
                {#if $partnerDetailError.noOfChildren}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$partnerDetailError.noOfChildren[0]}
                    </span>
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton type="reset" onClick={() => {}}
            ></FormButton>
            <TextIconButton primary label="Simpan" form="serviceDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="serviceDetailForm"
                method="POST"
                use:serviceDetailEnhance
                class="flex w-full flex-col gap-2"
            >
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
                <LongTextField
                    hasError={!!$serviceDetailError.agencyAddress}
                    name="agencyAddress"
                    label="Alamat Penuh Jabatan / Agensi"
                    bind:value={$serviceDetailForm.agencyAddress}
                />
                {#if $serviceDetailError.agencyAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.agencyAddress[0]}
                    </span>
                {/if}
                <LongTextField
                    hasError={!!$serviceDetailError.payrollAgency}
                    name="payrollAgency"
                    label="Alamat Penuh Jabatan / Agensi Pembayar Gaji"
                    bind:value={$serviceDetailForm.payrollAgency}
                />
                {#if $serviceDetailError.payrollAgency}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.payrollAgency[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$serviceDetailError.payrollBank}
                    name="payrollBank"
                    label="Bank Pembayar Gaji"
                    bind:value={$serviceDetailForm.payrollBank}
                />
                {#if $serviceDetailError.payrollBank}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.payrollBank[0]}
                    </span>
                {/if}
                <TextField
                    {disabled}
                    {labelBlack}
                    label="Gaji Sekarang (Gaji Pokok / Hakiki) (RM)"
                    value={CurrencyHelper.formatCurrency(3532.54)}
                ></TextField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton><FormButton type="reset" onClick={() => {}}
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
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <p class="text-sm text-txt-tertiary">
                        Sila muat naik salinan:
                    </p>
                    <ul
                        class="list-inside list-disc pl-2 text-sm text-txt-tertiary"
                    >
                        <li>Kad Pengenalan Sendiri</li>
                        <li>Kad Pengenalan Pasangan (Jika Berkaitan)</li>
                        <li>Kad Nikah (Jika Berkaitan)</li>
                        <li>Kad Pekerja</li>
                        <li>Surat Pengesahan Jabatan / Majikan</li>
                        <li>Slip Gaji 3 bulan yang Terkini</li>
                        <li>Gambar dalaman Kuarters</li>
                        <li>Gambar luaran Kuarters</li>
                        <li>Lain - lain dokumen yang diperlukan</li>
                    </ul>
                </div>
            </div>

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
                <div class="flex flex-col items-center justify-center gap-2.5">
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
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton><FormButton type="reset" onClick={() => {}}
            ></FormButton>
            <TextIconButton primary label="Simpan" form="validationForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2.5"
            >
                <form
                    id="validationForm"
                    method="POST"
                    use:validationEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <Checkbox bind:checked={$validationForm.staffValidation}
                        ><p>
                            Saya dengan ini mengesahkan bahawa maklumat
                            sebagaimana yang dinyatakan berikut adalah benar
                        </p>
                    </Checkbox>
                    {#if $validationError.staffValidation}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                        >
                            {$validationError.staffValidation[0]}
                        </span>
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
