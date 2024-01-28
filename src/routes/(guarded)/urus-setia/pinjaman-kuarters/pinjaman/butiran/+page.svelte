<script lang="ts">
    import SvgTrash from '$lib/assets/svg/SvgTrash.svelte';
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
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupServiceGroups } from '$lib/mocks/database/mockLookupServiceGroups';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';
    import { loanOptions } from '$lib/mocks/pinjaman-kuarters/loanOptions';
    import { loanPaybackMonthsOptions } from '$lib/mocks/pinjaman-kuarters/loanPaybackDurationOptions';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _supporterAndApproverSchema,
        _submitSupporterAndApproverForm,
        _qualificationDetailSchema,
        _submitUpdateLoanDetailQualificationForm,
        _submitApprovalAndOfferForm,
        _approvalAndOfferDetailSchema,
        _firstScheduleSchema,
        _submitVehicleDetailAndDescriptionForm,
        _submitSecondScheduleForm,
        _secondScheduleSchema,
        _letterOfAgreementSchema,
        _submitLetterOfAgreementForm,
    } from './+page';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    export let data: PageData;

    let currEmpLoanRec = mockRekodPinjaman.filter(
        (rec) => rec.id == $selectedRecordId,
    );

    let disabled = true;
    let deductionVal = 0;
    let salaryAndAllowanceDeductionVal = 0;
    let newDeductionVal = 0;
    let labelBlack = false;
    let upfront = 2000;
    let amount = 500;
    let amount2 = 501;
    let saleValue = upfront + amount + amount2;
    let selectedAccepted = 'true';
    let selectedChecked = 'true';

    let suppliers: any[] = [
        {
            name: '',
            address: '',
        },
    ];
    const addPembekal = () => {
        suppliers = [...suppliers, { name: '', address: '' }];
    };

    let activeStepper = 0;
    let currentEmployee = mockEmployees.filter(
        (rec) => rec.employeeNumber == currEmpLoanRec[0].employeeNumber,
    )[0];

    let currEmpSalary = mockFinalSalary.filter(
        (rec) => rec.employeeNumber == currentEmployee.employeeNumber,
    )[0];

    let currEmpService = mockCurrentService.filter(
        (e) => e.employeeId == currentEmployee.id,
    );

    let currEmpPosition = mockLookupPositions.filter(
        (e) => e.id == currEmpService[0].positionId,
    );

    let currEmpServiceGroup = mockLookupServiceGroups.filter(
        (e) => e.id == currEmpService[0].serviceGroupId,
    );

    let currEmpGrade = mockLookupGrades.filter(
        (e) => e.id == currEmpService[0].gradeId,
    );

    let currEmpPensions = mockEmploymentPensions.filter((e) => e.id == 1)[0];

    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    const options: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
            label: 'Tidak',
        },
    ];

    // let allEmp: any[] = mockEmployees.filter((employee) => employee.name);
    let selectedApprover = '';
    let selectedSupporter = '';

    //function to get current age
    function getAge(birthday: string) {
        let formattedBday = dateConvertor(birthday).replaceAll('-', ',');
        const today = new Date();
        const birthDate = new Date(formattedBday);
        var age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
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

    // Function to get months
    function getMonths(date1: string, date2: string) {
        var firstDate = new Date(date1);
        var secondDate = new Date(date2);
        var months =
            secondDate.getMonth() -
            firstDate.getMonth() +
            12 * (secondDate.getFullYear() - firstDate.getFullYear());
        var duration = months + ' Bulan';
        return duration;
    }
    // Function to get months
    function getMonthsNumber(date1: string, date2: string) {
        var firstDate = new Date(date1);
        var secondDate = new Date(date2);
        var months =
            secondDate.getMonth() -
            firstDate.getMonth() +
            12 * (secondDate.getFullYear() - firstDate.getFullYear());
        return months;
    }
    // Function to get percentage
    function percentage(partialValue: number, totalValue: number) {
        var res = ((partialValue / totalValue) * 100).toFixed(2);
        return res;
    }
    // Function to get monthly payment
    function monthly(total: number, month: number) {
        var res = total / month;
        return res;
    }

    // ====================== Form Validation
    const {
        form: supporterAndApproverForm,
        errors: supporterAndApproverErrors,
        enhance: supporterAndApproverEnhance,
    } = superForm(data.supporterAndApproverForm, {
        SPA: true,
        id: 'supporterAndApproverFormValidation',
        validators: _supporterAndApproverSchema,
        onSubmit() {
            _submitSupporterAndApproverForm($supporterAndApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

    const {
        form: qualificationDetailForm,
        errors: qualificationDetailError,
        enhance: qualificationDetailEnhance,
    } = superForm(data.updateLoanDetailQualificationForm, {
        SPA: true,
        id: 'qualificationDetailForm',
        validators: _qualificationDetailSchema,
        onSubmit() {
            _submitUpdateLoanDetailQualificationForm($qualificationDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: approvalAndOfferDetailForm,
        errors: approvalAndOfferDetailError,
        enhance: approvalAndOfferDetailEnhance,
    } = superForm(data.approvalAndOfferForm, {
        SPA: true,
        validators: _approvalAndOfferDetailSchema,
        id: 'approvalAndOfferForm',
        onSubmit() {
            _submitApprovalAndOfferForm($approvalAndOfferDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: vehicleDetailAndDescriptionForm,
        errors: vehicleDetailAndDescriptionError,
        enhance: vehicleDetailAndDescriptionEnhance,
    } = superForm(data.vehicleDetailAndDescriptionForm, {
        SPA: true,
        validators: _firstScheduleSchema,
        id: 'vehicleDetailAndDescriptionForm',
        onSubmit() {
            _submitVehicleDetailAndDescriptionForm(
                $vehicleDetailAndDescriptionForm,
            );
        },
        taintedMessage: false,
    });

    const {
        form: secondScheduleForm,
        errors: secondScheduleError,
        enhance: secondScheduleEnhance,
    } = superForm(data.secondScheduleForm, {
        SPA: true,
        validators: _secondScheduleSchema,
        id: 'secondScheduleFormValidation',
        onSubmit() {
            _submitSecondScheduleForm($secondScheduleForm);
        },
        taintedMessage: false,
    });

    const {
        form: letterOfAgreementForm,
        errors: letterOfAgreementError,
        enhance: letterOfAgreementEnhance,
    } = superForm(data.letterOfAgreementForm, {
        SPA: true,
        validators: _letterOfAgreementSchema,
        id: 'letterOfAgreementFormValidation',
        onSubmit() {
            _submitLetterOfAgreementForm($letterOfAgreementForm);
        },
        taintedMessage: false,
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Pinjaman {currEmpLoanRec[0].typeOfLoan ==
        'Kenderaan'
            ? 'K-' + currEmpLoanRec[0].employeeNumber
            : 'KTP-' + currEmpLoanRec[0].employeeNumber}"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
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
    dataId={currEmpLoanRec[0].typeOfLoan == 'Kenderaan'
        ? 'ID: K-' + currEmpLoanRec[0].employeeNumber
        : 'ID: KTP-' + currEmpLoanRec[0].employeeNumber}
    dataStatus={'Status: ' + currEmpLoanRec[0].status}
>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam"
            ><FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {disabled}
                {labelBlack}
                label={'Nama Penuh'}
                value={currentEmployee.name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'No. K/P'}
                value={currentEmployee.identityDocumentNumber}
            ></TextField>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Lahir'}
                selectedDate={dateConvertor(currentEmployee.birthDate)}
            ></DateSelector>
            <TextField
                {disabled}
                {labelBlack}
                label={'Umur Pada Tarikh Memohon'}
                value={getAge(currentEmployee.birthDate)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jawatan Sekarang'}
                value={currEmpPosition[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Kumpulan Perkhidmatan'}
                value={currEmpServiceGroup[0].name}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Gred Jawatan'}
                value={currEmpGrade[0].code}
            ></TextField>
            <TextField {disabled} {labelBlack} label={'Kementerian'} value={'-'}
            ></TextField>
            <TextField {disabled} {labelBlack} label={'Jabatan'} value={'-'}
            ></TextField>
            <LongTextField
                {disabled}
                {labelBlack}
                label={'Alamat Penuh Tempat Bertugas'}
                value={'-'}
            ></LongTextField>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                selectedDate={dateFormatter(currEmpService[0].firstServiceDate)}
            ></DateSelector>
            <DateSelector
                handleDateChange
                {disabled}
                {labelBlack}
                label={'Tarikh Persaraan Wajib'}
                selectedDate={dateFormatter(currEmpPensions.retiredDate)}
            ></DateSelector>
            <TextField
                {disabled}
                {labelBlack}
                label={'Gaji Pokok'}
                value={CurrencyHelper.formatCurrency(currEmpSalary.grossSalary)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Elaun-elaun'}
                value={CurrencyHelper.formatCurrency(currEmpSalary.allowances)}
            ></TextField>
            <TextField
                {disabled}
                {labelBlack}
                label={'Jumlah Potongan'}
                value={CurrencyHelper.formatCurrency(
                    currEmpSalary.salaryDeduction,
                )}
            ></TextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pinjaman"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <TextField
                {labelBlack}
                {disabled}
                label={'Jenis Permohonan'}
                value={currEmpLoanRec[0].typeOfLoan}
            ></TextField>
            <TextField
                {labelBlack}
                {disabled}
                label={'Jumlah yang Dipohon (RM)'}
                value={CurrencyHelper.formatCurrency(currEmpLoanRec[0].total)}
            ></TextField>
            <DropdownSelect
                {labelBlack}
                {disabled}
                dropdownType="label-left-full"
                label={'Tempoh Pembayaran'}
                options={loanPaybackMonthsOptions}
                value={getMonths(
                    currEmpLoanRec[0].loanStartDate,
                    currEmpLoanRec[0].loanEndDate,
                )}
            ></DropdownSelect></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>

            <FormButton
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
                <DownloadAttachment fileName="SALINAN SEBUT HARGA.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN KAD PENGENALAN.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SLIP GAJI TERKINI.pdf"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus Peminjam"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            />
            <TextIconButton
                primary
                label="Simpan"
                form="supporterAndApproverFormValidation"
            >
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Masukkan Nama Penyokong dan Pelulus"
                ></SectionHeader>

                <form
                    id="supporterAndApproverFormValidation"
                    use:supporterAndApproverEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        id="supporterName"
                        hasError={!!$supporterAndApproverErrors.supporterName}
                        dropdownType="label-left-full"
                        label={'Nama Penyokong'}
                        options={[
                            { value: '0001', name: 'Mohd Irfan bin Abu' },
                            { value: '0002', name: 'Nur Afifah Farhan' },
                            { value: '0003', name: 'Teressa Teng' },
                            { value: '0004', name: 'Sumar Amariti' },
                        ]}
                        bind:value={$supporterAndApproverForm.supporterName}
                    ></DropdownSelect>
                    {#if $supporterAndApproverErrors.supporterName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterAndApproverErrors.supporterName}</span
                        >
                    {/if}
                    <DropdownSelect
                        id="approverName"
                        hasError={!!$supporterAndApproverErrors.approverName}
                        dropdownType="label-left-full"
                        label={'Nama Pelulus'}
                        options={[
                            { value: '0001', name: 'Mohd Irfan bin Abu' },
                            { value: '0002', name: 'Nur Afifah Farhan' },
                            { value: '0003', name: 'Teressa Teng' },
                            { value: '0004', name: 'Sumar Amariti' },
                        ]}
                        bind:value={$supporterAndApproverForm.approverName}
                    ></DropdownSelect>
                    {#if $supporterAndApproverErrors.approverName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterAndApproverErrors.approverName}</span
                        >
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pinjaman"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <CustomTab>
                <CustomTabContent title="Maklumat Kelayakan">
                    <SectionHeader title="Maklumat Kelayakan"
                        ><TextIconButton
                            primary
                            label="Simpan"
                            form="qualificationDetailForm"
                            ><SvgCheck /></TextIconButton
                        ></SectionHeader
                    >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <form
                            id="qualificationDetailForm"
                            method="POST"
                            use:qualificationDetailEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                {disabled}
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={'100.00' + '%'}
                                label={'Gaji Pokok (RM)'}
                                value={currEmpSalary.grossSalary}
                            ></TextField>
                            <TextField
                                type="number"
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={percentage(
                                    $qualificationDetailForm.baseSalaryOnlyDeduction,

                                    currEmpSalary.grossSalary,
                                ) + '%'}
                                name="baseSalaryOnlyDeduction"
                                label={'Potongan (RM)'}
                                bind:value={$qualificationDetailForm.baseSalaryOnlyDeduction}
                            ></TextField>
                            {#if $qualificationDetailError.baseSalaryOnlyDeduction}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$qualificationDetailError
                                        .baseSalaryOnlyDeduction[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                type="number"
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={percentage(
                                    currEmpSalary.grossSalary - deductionVal,
                                    currEmpSalary.grossSalary,
                                ) + '%'}
                                label={'Baki (RM)'}
                                value={+(
                                    currEmpSalary.grossSalary - deductionVal
                                ).toFixed(2)}
                            ></TextField>
                            <p class="text-sm text-system-primary">
                                Gaji Pokok dan Elaun
                            </p>
                            <TextField
                                {disabled}
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={'100.00' + '%'}
                                label={'Gaji Pokok dan Elaun (RM)'}
                                value={currEmpSalary.grossSalary +
                                    currEmpSalary.allowances}
                            ></TextField>

                            <TextField
                                type="number"
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                name=""
                                percentageVal={percentage(
                                    $qualificationDetailForm.baseSalaryAndAllowanceDeduction,
                                    currEmpSalary.grossSalary,
                                ) + '%'}
                                label={'Potongan (RM)'}
                                bind:value={$qualificationDetailForm.baseSalaryAndAllowanceDeduction}
                            ></TextField>
                            {#if $qualificationDetailError.baseSalaryAndAllowanceDeduction}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$qualificationDetailError
                                        .baseSalaryAndAllowanceDeduction[0]}</span
                                >
                            {/if}

                            <TextField
                                type="number"
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={percentage(
                                    $qualificationDetailForm.baseSalaryAndAllowanceNewDeduction,
                                    currEmpSalary.grossSalary,
                                ) + '%'}
                                label={'Potongan Baru (RM)'}
                                bind:value={$qualificationDetailForm.baseSalaryAndAllowanceNewDeduction}
                            ></TextField>
                            {#if $qualificationDetailError.baseSalaryAndAllowanceNewDeduction}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$qualificationDetailError
                                        .baseSalaryAndAllowanceNewDeduction[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                type="number"
                                labelType="auto-calculate-percentage"
                                hasTooltip
                                percentageVal={percentage(
                                    currEmpSalary.grossSalary -
                                        salaryAndAllowanceDeductionVal -
                                        newDeductionVal,
                                    currEmpSalary.grossSalary,
                                ) + '%'}
                                label={'Baki (RM)'}
                                value={+(
                                    currEmpSalary.grossSalary -
                                    salaryAndAllowanceDeductionVal -
                                    newDeductionVal
                                ).toFixed(2)}
                            ></TextField>
                        </form>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
                    <SectionHeader
                        title="Masukkan Maklumat Kelulusan dan Tawaran"
                        ><TextIconButton
                            primary
                            label="Simpan"
                            form="approvalAndOfferForm"
                            ><SvgCheck /></TextIconButton
                        ></SectionHeader
                    >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <form
                            id="approvalAndOfferForm"
                            method="POST"
                            use:approvalAndOfferDetailEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <DropdownSelect
                                hasError={!!$approvalAndOfferDetailError.typeOfPurchase}
                                dropdownType="label-left-full"
                                label="Jenis Belian"
                                options={loanOptions}
                                bind:value={$approvalAndOfferDetailForm.typeOfPurchase}
                            ></DropdownSelect>
                            {#if $approvalAndOfferDetailError.typeOfPurchase}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .typeOfPurchase[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.purchasePrice}
                                type="number"
                                label="Harga Belian Dengan Kerajaan (RM)"
                                bind:value={$approvalAndOfferDetailForm.purchasePrice}
                            ></TextField>
                            <!-- value={currEmpLoanRec[0].total} -->
                            {#if $approvalAndOfferDetailError.purchasePrice}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .purchasePrice[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.downpayment}
                                type="number"
                                label="Bayaran Muka (RM)"
                                bind:value={$approvalAndOfferDetailForm.downpayment}
                            ></TextField>
                            <!-- value={upfront} -->
                            {#if $approvalAndOfferDetailError.downpayment}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .downpayment[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.governmentFinancingAmountPaymentAndProfit}
                                type="number"
                                label="Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)"
                                bind:value={$approvalAndOfferDetailForm.governmentFinancingAmountPaymentAndProfit}
                            ></TextField>
                            <!-- value={amount} -->
                            {#if $approvalAndOfferDetailError.governmentFinancingAmountPaymentAndProfit}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .governmentFinancingAmountPaymentAndProfit[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.amountOfGovernmentFunding}
                                type="number"
                                label="Amaun Pembiayaan Kerajaan (RM)"
                                bind:value={$approvalAndOfferDetailForm.amountOfGovernmentFunding}
                            ></TextField>
                            <!-- value={amount2} -->
                            {#if $approvalAndOfferDetailError.amountOfGovernmentFunding}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .amountOfGovernmentFunding[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.sellingPrices}
                                type="number"
                                label="Harga Jualan Kepada Pegawai (RM)"
                                bind:value={$approvalAndOfferDetailForm.sellingPrices}
                            ></TextField>
                            <!-- value={currEmpLoanRec[0].total - saleValue} -->
                            {#if $approvalAndOfferDetailError.sellingPrices}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .sellingPrices[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.monthlyInstallment}
                                type="number"
                                label="Ansuran Bulanan (RM)"
                                bind:value={$approvalAndOfferDetailForm.monthlyInstallment}
                            ></TextField>
                            <!-- value={monthly(
                                currEmpLoanRec[0].total - saleValue,
                                getMonthsNumber(
                                    currEmpLoanRec[0].loanStartDate,
                                    currEmpLoanRec[0].loanEndDate,
                                ),
                            )} -->
                            {#if $approvalAndOfferDetailError.monthlyInstallment}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .monthlyInstallment[0]}</span
                                >
                            {/if}
                            <DateSelector
                                hasError={!!$approvalAndOfferDetailError.startDate}
                                label="Tarikh Mula"
                                handleDateChange
                                bind:selectedDate={$approvalAndOfferDetailForm.startDate}
                            ></DateSelector>
                            <!-- selectedDate="2023-08-03" -->
                            {#if $approvalAndOfferDetailError.startDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .startDate[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$approvalAndOfferDetailError.duration}
                                label="Tempoh"
                                bind:value={$approvalAndOfferDetailForm.duration}
                            ></TextField>
                            <!-- value={getMonths(
                                currEmpLoanRec[0].loanStartDate,
                                currEmpLoanRec[0].loanEndDate,
                            )} -->
                            {#if $approvalAndOfferDetailError.duration}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$approvalAndOfferDetailError
                                        .duration[0]}</span
                                >
                            {/if}
                        </form>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Jadual Pertama">
                    {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'}
                        <SectionHeader
                            title="Masukkan Maklumat dan Perihal Kenderaan"
                        >
                            <TextIconButton
                                primary
                                label="Simpan"
                                form="vehicleDetailAndDescriptionForm"
                            ><SvgCheck /></TextIconButton>
                        </SectionHeader>
                        <form
                            id="vehicleDetailAndDescriptionForm"
                            method="POST"
                            use:vehicleDetailAndDescriptionEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.engineNo}
                                name="engineNo"
                                label="No. Enjin"
                                bind:value={$vehicleDetailAndDescriptionForm.engineNo}
                            />{#if $vehicleDetailAndDescriptionError.engineNo}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .engineNo[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.chasisNo}
                                name="chasisNo"
                                label="No. Casis"
                                bind:value={$vehicleDetailAndDescriptionForm.chasisNo}
                            />{#if $vehicleDetailAndDescriptionError.chasisNo}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .chasisNo[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.brand}
                                name="brand"
                                label="Buatan"
                                bind:value={$vehicleDetailAndDescriptionForm.brand}
                            />{#if $vehicleDetailAndDescriptionError.brand}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .brand[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.modelName}
                                name="modelName"
                                label="Nama Model"
                                bind:value={$vehicleDetailAndDescriptionForm.modelName}
                            />{#if $vehicleDetailAndDescriptionError.modelName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .modelName[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.enginePower}
                                name="enginePower"
                                label="Kuasa Enjin"
                                bind:value={$vehicleDetailAndDescriptionForm.enginePower}
                            />{#if $vehicleDetailAndDescriptionError.enginePower}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .enginePower[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.fuel}
                                name="fuel"
                                label="Bahan Bakar"
                                bind:value={$vehicleDetailAndDescriptionForm.fuel}
                            />{#if $vehicleDetailAndDescriptionError.fuel}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .fuel[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.utilityClass}
                                name="utilityClass"
                                label="Kelas Kegunaan"
                                bind:value={$vehicleDetailAndDescriptionForm.utilityClass}
                            />{#if $vehicleDetailAndDescriptionError.utilityClass}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .utilityClass[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.bodyType}
                                name="bodyType"
                                label="Jenis Badan"
                                bind:value={$vehicleDetailAndDescriptionForm.bodyType}
                            />{#if $vehicleDetailAndDescriptionError.bodyType}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .bodyType[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$vehicleDetailAndDescriptionError.yearMade}
                                name="yearMade"
                                label="Tahun Dibuat"
                                bind:value={$vehicleDetailAndDescriptionForm.yearMade}
                            />{#if $vehicleDetailAndDescriptionError.yearMade}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$vehicleDetailAndDescriptionError
                                        .yearMade[0]}</span
                                >
                            {/if}
                            <SectionHeader
                                title="Masukkan Butiran Penjualan/Tuan Asal"
                            ></SectionHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.previousOwnerName}
                                    name="previousOwnerName"
                                    label="Nama"
                                    bind:value={$vehicleDetailAndDescriptionForm.previousOwnerName}
                                />{#if $vehicleDetailAndDescriptionError.previousOwnerName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .previousOwnerName[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.identificationNo}
                                    name="identificationNo"
                                    label="No. K/P"
                                    bind:value={$vehicleDetailAndDescriptionForm.identificationNo}
                                />{#if $vehicleDetailAndDescriptionError.identificationNo}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .identificationNo[0]}</span
                                    >
                                {/if}
                                <LongTextField
                                    hasError={!!$vehicleDetailAndDescriptionError.address}
                                    name="address"
                                    label="Alamat"
                                    bind:value={$vehicleDetailAndDescriptionForm.address}
                                />{#if $vehicleDetailAndDescriptionError.address}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .address[0]}</span
                                    >
                                {/if}
                            </div>
                            <SectionHeader
                                title="Masukkan Harga Belian Kenderaan"
                            ></SectionHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.totalPurchasePrice}
                                    name="totalPurchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.totalPurchasePrice}
                                />{#if $vehicleDetailAndDescriptionError.totalPurchasePrice}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .totalPurchasePrice[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.balancePayment}
                                    name="balancePayment"
                                    label="Bayaran Baki (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.balancePayment}
                                />{#if $vehicleDetailAndDescriptionError.balancePayment}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .balancePayment[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.govermentFundingAmount}
                                    name="govermentFundingAmount"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.govermentFundingAmount}
                                />{#if $vehicleDetailAndDescriptionError.govermentFundingAmount}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .govermentFundingAmount[0]}</span
                                    >
                                {/if}
                            </div>
                        </form>
                    {:else}
                        <SectionHeader title="Masukkan Maklumat Pembekal">
                            <FormButton
                                type="add-supplier"
                                onClick={addPembekal}
                            />
                            <TextIconButton
                                primary
                                label="Simpan"
                                form="vehicleDetailAndDescriptionForm"
                                ><SvgCheck /></TextIconButton
                            >
                        </SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            {#each suppliers as item, index}
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                >
                                    <div
                                        class="flex w-full items-start justify-between"
                                    >
                                        <p class="text-sm text-system-primary">
                                            Pembekal #{index + 1}
                                        </p>
                                        {#if index != 0}
                                            <button
                                                on:click={() => {
                                                    suppliers.splice(index, 1);
                                                    suppliers = suppliers;
                                                }}
                                            >
                                                <div class="text-system-danger">
                                                    <SvgTrash></SvgTrash>
                                                </div></button
                                            >
                                        {/if}
                                    </div>
                                    <TextField
                                        placeholder="Nama Pembekal"
                                        label="Nama Pembekal"
                                        bind:value={item.name}
                                    />
                                    <TextField
                                        placeholder="Alamat Pembekal"
                                        label="Alamat"
                                        bind:value={item.address}
                                    />
                                </div>
                            {/each}
                        </div>
                        <SectionHeader title="Masukkan Maklumat Pembelian"
                        ></SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <form
                                id="vehicleDetailAndDescriptionForm"
                                method="POST"
                                use:vehicleDetailAndDescriptionEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.totalPurchasePrice}
                                    name="totalPurchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.totalPurchasePrice}
                                />
                                {#if $vehicleDetailAndDescriptionError.totalPurchasePrice}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .totalPurchasePrice[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.balancePayment}
                                    name="balancePayment"
                                    label="Bayaran Baki (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.balancePayment}
                                />
                                {#if $vehicleDetailAndDescriptionError.balancePayment}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .balancePayment[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$vehicleDetailAndDescriptionError.govermentFundingAmount}
                                    name="govermentFundingAmount"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                    bind:value={$vehicleDetailAndDescriptionForm.govermentFundingAmount}
                                />
                                {#if $vehicleDetailAndDescriptionError.govermentFundingAmount}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$vehicleDetailAndDescriptionError
                                            .govermentFundingAmount[0]}</span
                                    >
                                {/if}
                            </form>
                        </div>
                    {/if}
                </CustomTabContent>
                <CustomTabContent title="Jadual Kedua">
                    {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'}
                        <SectionHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        >
                            <TextIconButton
                                primary
                                label="Simpan"
                                form="secondScheduleFormValidation"
                                ><SvgCheck /></TextIconButton
                            >
                        </SectionHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <form
                                id="secondScheduleFormValidation"
                                method="POST"
                                use:secondScheduleEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <TextField
                                    hasError={!!$secondScheduleError.purchasePrice}
                                    name="purchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                    bind:value={$secondScheduleForm.purchasePrice}
                                ></TextField>
                                {#if $secondScheduleError.purchasePrice}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$secondScheduleError
                                            .purchasePrice[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$secondScheduleError.balancePayment}
                                    name="balancePayment"
                                    label="Bayaran Baki (RM)"
                                    bind:value={$secondScheduleForm.balancePayment}
                                ></TextField>
                                {#if $secondScheduleError.balancePayment}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$secondScheduleError
                                            .balancePayment[0]}</span
                                    >
                                {/if}
                                <TextField
                                    hasError={!!$secondScheduleError.govermentFundingAndProfitAmount}
                                    name="govermentFundingAndProfitAmount"
                                    label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                    bind:value={$secondScheduleForm.govermentFundingAndProfitAmount}
                                ></TextField>
                                {#if $secondScheduleError.govermentFundingAndProfitAmount}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$secondScheduleError
                                            .govermentFundingAndProfitAmount[0]}</span
                                    >
                                {/if}

                                <SectionHeader
                                    title="Masukkan Amaun dan Tempoh Bayaran Balik Harga Jualan"
                                ></SectionHeader>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5"
                                >
                                    <TextField
                                        hasError={!!$secondScheduleError.monthlyAmount}
                                        name="monthlyAmount"
                                        label="Amaun Bulanan (RM)"
                                        bind:value={$secondScheduleForm.monthlyAmount}
                                    ></TextField>
                                    {#if $secondScheduleError.monthlyAmount}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$secondScheduleError
                                                .monthlyAmount[0]}</span
                                        >
                                    {/if}
                                    <DropdownSelect
                                        hasError={!!$secondScheduleError.paymentDuration}
                                        id="paymentDuration"
                                        dropdownType="label-left-full"
                                        label={'Tempoh Pembayaran'}
                                        options={loanPaybackMonthsOptions}
                                        bind:value={$secondScheduleForm.paymentDuration}
                                    ></DropdownSelect>
                                    <!-- value={getMonths(
                                        currEmpLoanRec[0].loanStartDate,
                                        currEmpLoanRec[0].loanEndDate,
                                    )} -->
                                    {#if $secondScheduleError.paymentDuration}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{$secondScheduleError
                                                .paymentDuration[0]}</span
                                        >
                                    {/if}
                                </div>
                            </form>
                        </div>
                    {:else}
                        <SectionHeader
                            title="Masukkan Maklumat Harga Jualan (RM)"
                        >
                            <TextIconButton
                                primary
                                label="Simpan"
                                form="secondScheduleFormValidation"
                                ><SvgCheck /></TextIconButton
                            >
                        </SectionHeader>
                        <form
                            id="secondScheduleFormValidation"
                            method="POST"
                            use:secondScheduleEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={!!$secondScheduleError.purchasePrice}
                                name="purchasePrice"
                                label="Jumlah Harga Belian (RM)"
                                bind:value={$secondScheduleForm.purchasePrice}
                            />
                            {#if $secondScheduleError.purchasePrice}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .purchasePrice[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$secondScheduleError.balancePayment}
                                name="balancePayment"
                                label="Bayaran Baki (RM)"
                                bind:value={$secondScheduleForm.balancePayment}
                            />
                            {#if $secondScheduleError.balancePayment}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .balancePayment[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$secondScheduleError.govermentFundingAndProfitAmount}
                                name="govermentFundingAndProfitAmount"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                bind:value={$secondScheduleForm.govermentFundingAndProfitAmount}
                            />
                            {#if $secondScheduleError.govermentFundingAndProfitAmount}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .govermentFundingAndProfitAmount[0]}</span
                                >
                            {/if}
                            <SectionHeader
                                title="Masukkan Maklumat Amaun dan Keuntungan Kerajaan (RM)"
                            ></SectionHeader>

                            <TextField
                                hasError={!!$secondScheduleError.govermentFundingAndProfitAmountDetail}
                                name="govermentFundingAndProfitAmountDetail"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan"
                                bind:value={$secondScheduleForm.govermentFundingAndProfitAmountDetail}
                            />
                            {#if $secondScheduleError.govermentFundingAndProfitAmountDetail}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .govermentFundingAndProfitAmountDetail[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={!!$secondScheduleError.govermentBalancePayment}
                                name="govermentBalancePayment"
                                label="Bayaran Baki (RM)"
                                bind:value={$secondScheduleForm.govermentBalancePayment}
                            />
                            {#if $secondScheduleError.govermentBalancePayment}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .govermentBalancePayment[0]}</span
                                >
                            {/if}
                            <DropdownSelect
                                hasError={!!$secondScheduleError.paymentDuration}
                                name="paymentDuration"
                                dropdownType="label-left-full"
                                label={'Tempoh Pembayaran'}
                                options={loanPaybackMonthsOptions}
                                bind:value={$secondScheduleForm.paymentDuration}
                            />
                            {#if $secondScheduleError.paymentDuration}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$secondScheduleError
                                        .paymentDuration[0]}</span
                                >
                            {/if}
                        </form>
                    {/if}
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Senarai Semak Surat Perjanjian"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 4;
                }}
            ></FormButton>
            <TextIconButton
                primary
                label="Simpan"
                form="letterOfAgreementFormValidation"
                ><SvgCheck /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader
                title="Masukkan Maklumat Senarai Semak Surat Perjanjian"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <form
                    id="letterOfAgreementFormValidation"
                    use:letterOfAgreementEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                >
                    <RadioSingle
                        name="received"
                        legend="Diterima"
                        {options}
                        bind:userSelected={$letterOfAgreementForm.received}
                    ></RadioSingle>
                    {#if $letterOfAgreementError.received}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$letterOfAgreementError.received[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        name="checked"
                        legend="Disemak"
                        {options}
                        bind:userSelected={$letterOfAgreementForm.checked}
                    ></RadioSingle>
                    {#if $letterOfAgreementError.checked}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$letterOfAgreementError.checked[0]}</span
                        >
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Resit dan Invois"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 5;
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
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <SectionHeader title="Dokumen Resit dan Invois"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
                <DownloadAttachment fileName="SALINAN RESIT.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN INVOIS.pdf"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
