<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
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
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _personalDetailSchema,
        _submitPersonalDetailForm,
        _submitPartnerDetailForm,
        _partnerDetailSchema,
        _submitServiceDetailForm,
        _serviceDetailSchema,
        _submitValidationForm,
        _validationSchema,
        _approvalRemarkFormSchema,
        _submitApprovalRemarkForm,
        _submitQuartersDetailForm,
        _quartersDetailSchema,
    } from './+page';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    export let data: PageData;

    // Initialize Variables
    let activeStepper = 0;
    let labelBlack = false;
    let disabled = true;
    let isStaff = 'true';
    let infoTrue = false;
    let selectedService = 'true';
    let selectedApproval = 'true';
    let gredExceed = false;
    let under25km = true;
    let above25km = false;

    let allEmp: any[] = Object.keys(mockEmployees).map(function (keys) {
        return { value: keys[0], name: mockEmployees[parseInt(keys)].name };
    });
    let selectedApprover = '';
    let selectedSupporter = '';

    // Get Mock Data
    let currEmpQuartersRec = mockRekodKuarters.filter((rec) => rec.id == 1);

    let currRecord = mockRekodKuarters.filter((rec) => rec.id == 1)[0];
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
            value: 'false',
            label: 'Agensi / Jabatan Luar',
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
        form: personalDetailForm,
        errors: personalDetailError,
        enhance: personalDetailEnhance,
    } = superForm(data.personalDetailForm, {
        SPA: true,
        id: 'personalDetailForm',
        validators: _personalDetailSchema,
        onSubmit() {
            _submitPersonalDetailForm($personalDetailForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

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
        taintedMessage: false,
    });

    const {
        form: quartersDetailForm,
        errors: quartersDetailError,
        enhance: quartersDetailEnhance,
    } = superForm(data.quartersDetailForm, {
        SPA: true,
        id: 'quartersDetailForm',
        validators: _quartersDetailSchema,
        onSubmit() {
            _submitQuartersDetailForm($quartersDetailForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-row items-start justify-start">
    <ContentHeader
        title="Maklumat Permohonan Kuarter Agensi Luar/Jabatan Luar"
        description="Sila lengkapkan butiran berkaitan permohonan kuarters bukan kakitangan LKIM"
        ><FormButton
            type="back"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton></ContentHeader
    >
</section>

<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Jenis Pemohon"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <RadioSingle legend="Jenis Pemohon" {options}></RadioSingle>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton>
            <TextIconButton primary label="Simpan" form="personalDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="personalDetailForm"
                method="POST"
                use:personalDetailEnhance
                class="flex w-full flex-col gap-2"
            >
                <TextField
                    hasError={!!$personalDetailError.employeeNo}
                    name="employeeNo"
                    {labelBlack}
                    label="No. Pekerja"
                    bind:value={$personalDetailForm.employeeNo}
                ></TextField>
                {#if $personalDetailError.employeeNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.employeeNo[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.employeeName}
                    name="employeeName"
                    {labelBlack}
                    label="Nama"
                    bind:value={$personalDetailForm.employeeName}
                />
                {#if $personalDetailError.employeeName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.employeeName[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.identificationNo}
                    name="identificationNo"
                    {labelBlack}
                    label="No. K/P"
                    bind:value={$personalDetailForm.identificationNo}
                />
                {#if $personalDetailError.identificationNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.identificationNo[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.grade}
                    name="grade"
                    {labelBlack}
                    label="Gred"
                    bind:value={$personalDetailForm.grade}
                />
                {#if $personalDetailError.grade}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.grade[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.currentPlacement}
                    name="currentPlacement"
                    {labelBlack}
                    label="Penempatan Semasa"
                    bind:value={$personalDetailForm.currentPlacement}
                />
                {#if $personalDetailError.currentPlacement}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.currentPlacement[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.telephoneNo}
                    name="telephoneNo"
                    {labelBlack}
                    label="No. Telefon"
                    bind:value={$personalDetailForm.telephoneNo}
                />
                {#if $personalDetailError.telephoneNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.telephoneNo[0]}
                    </span>
                {/if}
                <LongTextField
                    hasError={!!$personalDetailError.mailingAddress}
                    name="mailingAddress"
                    {labelBlack}
                    label="Alamat Surat Menyurat"
                    bind:value={$personalDetailForm.mailingAddress}
                />
                {#if $personalDetailError.mailingAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.mailingAddress[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$personalDetailError.status}
                    name="status"
                    {labelBlack}
                    label="Status"
                    bind:value={$personalDetailForm.status}
                />
                {#if $personalDetailError.status}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$personalDetailError.status[0]}
                    </span>
                {/if}
            </form>
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
                    hasError={!!$serviceDetailError.positionName}
                    name="positionName"
                    label="Nama Jawatan"
                    bind:value={$serviceDetailForm.positionName}
                />
                {#if $serviceDetailError.positionName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.positionName[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$serviceDetailError.grade}
                    name="grade"
                    label="Gred"
                    bind:value={$serviceDetailForm.grade}
                />
                {#if $serviceDetailError.grade}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.grade[0]}
                    </span>
                {/if}
                <RadioSingle
                    name="services"
                    options={serviceOptions}
                    bind:userSelected={$serviceDetailForm.services}
                    legend="Perkhidmatan"
                />
                {#if $serviceDetailError.services}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.services[0]}
                    </span>
                {/if}
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
                    hasError={!!$serviceDetailError.agencyPayerAddress}
                    name="agencyPayerAddress"
                    label="Alamat Penuh Jabatan / Agensi Pembayar Gaji"
                    bind:value={$serviceDetailForm.agencyPayerAddress}
                />
                {#if $serviceDetailError.agencyPayerAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.agencyPayerAddress[0]}
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
                    hasError={!!$serviceDetailError.currentSalary}
                    name="currentSalary"
                    label="Gaji Sekarang (Gaji Pokok / Hakiki) (RM)"
                    bind:value={$serviceDetailForm.currentSalary}
                />
                {#if $serviceDetailError.currentSalary}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.currentSalary[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$serviceDetailError.itp}
                    name="itp"
                    label="ITP (RM)"
                    bind:value={$serviceDetailForm.itp}
                />
                {#if $serviceDetailError.itp}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.itp[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$serviceDetailError.cola}
                    name="cola"
                    label="COLA (RM)"
                    bind:value={$serviceDetailForm.cola}
                />
                {#if $serviceDetailError.cola}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$serviceDetailError.cola[0]}
                    </span>
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
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
                    <Checkbox bind:checked={$validationForm.secretaryValidation}
                        ><p>
                            Saya dengan ini mengesahkan bahawa maklumat
                            sebagaimana yang dinyatakan berikut adalah benar
                        </p>
                    </Checkbox>
                    {#if $validationError.secretaryValidation}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                        >
                            {$validationError.secretaryValidation[0]}
                        </span>
                    {/if}
                </form>
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
            <TextIconButton primary label="Simpan" form="approvalRemarkForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
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
                />
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
                />
                {#if $approvalRemarkError.approvalResult}
                    <span class=" font-sans text-sm italic text-system-danger"
                        >{$approvalRemarkError.approvalResult[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kuarters"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 6;
                }}
            ></FormButton>
            <TextIconButton primary label="Simpan" form="quartersDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="quartersDetailForm"
                method="POST"
                use:quartersDetailEnhance
                class="flex w-full flex-col gap-2"
            >
                <SectionHeader title="Nama Pelulus"></SectionHeader>
                <DropdownSelect
                    hasError={!!$quartersDetailError.approverName}
                    dropdownType="label-left-full"
                    name="approverName"
                    label="Nama Pelulus"
                    options={allEmp}
                    bind:value={$quartersDetailForm.approverName}
                />
                {#if $quartersDetailError.approverName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.approverName[0]}</span
                    >
                {/if}

                <SectionHeader title="Butiran Penempatan Kuarter" />
                <TextField
                    hasError={!!$quartersDetailError.applicantEmail}
                    name="applicantEmail"
                    label="Emel Pemohon"
                    bind:value={$quartersDetailForm.applicantEmail}
                />
                {#if $quartersDetailError.applicantEmail}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.applicantEmail[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$quartersDetailError.quartersEntryDate}
                    name="quartersEntryDate"
                    handleDateChange
                    label="Tarikh Masuk Kuarter"
                    bind:selectedDate={$quartersDetailForm.quartersEntryDate}
                />
                {#if $quartersDetailError.quartersEntryDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.quartersEntryDate[0]}</span
                    >
                {/if}
                <TextField
                    hasError={!!$quartersDetailError.unitAndQuarter}
                    name="unitAndQuarter"
                    label="Unit Dan Kuarter"
                    bind:value={$quartersDetailForm.unitAndQuarter}
                />
                {#if $quartersDetailError.unitAndQuarter}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.unitAndQuarter[0]}</span
                    >
                {/if}

                <SectionHeader
                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                />
                <TextField
                    hasError={!!$quartersDetailError.monthRentalValue}
                    name="monthRentalValue"
                    label="Nilai Sewaan Bulanan"
                    bind:value={$quartersDetailForm.monthRentalValue}
                />
                {#if $quartersDetailError.monthRentalValue}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.monthRentalValue[0]}</span
                    >
                {/if}
                <TextField
                    hasError={!!$quartersDetailError.rentalDeposit}
                    name="rentalDeposit"
                    label="Deposit (2 Bulan nilai sewaan)"
                    bind:value={$quartersDetailForm.rentalDeposit}
                />
                {#if $quartersDetailError.rentalDeposit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.rentalDeposit[0]}</span
                    >
                {/if}

                <TextField
                    hasError={!!$quartersDetailError.utilityDeposit}
                    name="utilityDeposit"
                    label="Deposit (Air dan Elektrik)"
                    bind:value={$quartersDetailForm.utilityDeposit}
                />
                {#if $quartersDetailError.utilityDeposit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$quartersDetailError.utilityDeposit[0]}</span
                    >
                {/if}
            </form>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Muat Naik Resit Bayaran"
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
                        <li>1. Resit Deposit Sewaan</li>
                        <li>2. Resit Utiliti</li>
                        <li>3. Penyata Bank (Standing Instruction)</li>
                        <li>Gambar Dalam Kuarters</li>
                        <li>Gambar luaran Kuarters</li>
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
