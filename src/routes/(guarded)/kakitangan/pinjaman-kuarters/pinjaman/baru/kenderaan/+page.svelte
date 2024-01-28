<script lang="ts">
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
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
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockLookupServiceGroups } from '$lib/mocks/database/mockLookupServiceGroups';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';
    import {
        loanPaybackMonthsOptions,
        loanPaybackYearsOptions,
    } from '$lib/mocks/pinjaman-kuarters/loanPaybackDurationOptions';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import {
        vehicleCondition,
        vehicleType,
    } from '$lib/mocks/pinjaman-kuarters/pinjamanKenderaanButiran';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _submitValidationForm,
        _validationSchema,
        _submitLoanDetailForm,
        _loanDetailSchema,
        _vehicleDetailSchema,
        _submitVehicleDetailForm,
        _submitLoanFinancingForm,
        _loanFinancingSchema,
    } from './+page';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    export let data: PageData;

    let disabled = true;
    let labelBlack = false;
    let selectedLoanPayback = '';
    let selectedVehicleCondition = '';
    let selectedVehicleType = '';
    let loanBefore = 'true';
    let infoTrue = false;
    let activeStepper = 0;
    let currRecord = mockRekodPinjaman.filter(
        (rec) => rec.id == 1, //to be repalced with $selectedRecordId
    )[0];
    let currentEmployee = mockEmployees.filter((rec) => rec.id == 1)[0];

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

    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
    })!;
    let currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee.birthStateId;
    })!;

    let isExPoliceSoldier = currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    function change() {
        if (loanBefore == 'true') {
            loanBefore = 'false';
        } else {
            loanBefore = 'true';
        }
    }

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }
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
            label: 'Pernah',
        },
        {
            value: false,
            label: 'Tidak Pernah',
        },
    ];

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
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    // ====================== Form Validation
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
        form: loanDetailForm,
        errors: loanDetailError,
        enhance: loanDetailEnhance,
    } = superForm(data.loanDetailForm, {
        SPA: true,
        id: 'loanDetailForm',
        validators: _loanDetailSchema,
        onSubmit() {
            _submitLoanDetailForm($loanDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: vehicleDetailForm,
        errors: vehicleDetailError,
        enhance: vehicleDetailEnhance,
    } = superForm(data.vehicleDetailForm, {
        SPA: true,
        id: 'vehicleDetailForm',
        validators: _vehicleDetailSchema,
        onSubmit() {
            _submitVehicleDetailForm($vehicleDetailForm);
        },
        taintedMessage: false,
    });

    const {
        form: loanFinancingForm,
        errors: loanFinancingError,
        enhance: loanFinancingEnhance,
    } = superForm(data.loanFinancingForm, {
        SPA: true,
        id: 'loanFinancingForm',
        validators: _loanFinancingSchema,
        onSubmit() {
            _submitLoanFinancingForm($loanFinancingForm);
        },
        taintedMessage: false,
    });

    //reset loan financing stepper if previous loan is false
    $: if (!$loanFinancingForm.hasPreviousLoan){
        $loanFinancingForm.recentLoanDate = undefined;
        $loanFinancingForm.totalLoan = undefined;
        $loanFinancingForm.latestPaidInstallmentDate = undefined;
        $loanFinancingForm.latestPaidInstallment = undefined;
        $loanFinancingForm.currentVehicle = undefined;
        $loanFinancingForm.currentLoanFromGoverment = undefined;
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Butiran Rekod Permohonan Pinjaman Pembiayaan Kenderaan"
        description="Butiran permohonan pinjaman pembiayaan kenderaan"
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
        <StepperContentHeader title="Maklumat Peribadi Kakitangan">
            <FormButton
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
        </StepperContentHeader>
        <StepperContentBody>
            <SectionHeader title="Butiran Peminjam"></SectionHeader>
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
        <StepperContentHeader title="Butiran Pinjaman">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton primary label="Simpan" form="loanDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="loanDetailForm"
                method="POST"
                use:loanDetailEnhance
                class="flex w-full flex-col gap-2"
            >
                <TextField
                    name="maxFundingEligibility"
                    {labelBlack}
                    {disabled}
                    label={'Kelayakan Pembiayaan Maksimum'}
                    value={CurrencyHelper.formatCurrency(30000)}
                />
                <TextField
                    hasError={!!$loanDetailError.requestedAmount}
                    name="requestedAmount"
                    label={'Jumlah yang Dipohon (RM)'}
                    bind:value={$loanDetailForm.requestedAmount}
                />
                {#if $loanDetailError.requestedAmount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$loanDetailError.requestedAmount[0]}
                    </span>
                {/if}
                <DropdownSelect
                    hasError={!!$loanDetailError.paymentPeriod}
                    name="paymentPeriod"
                    dropdownType="label-left-full"
                    label={'Tempoh Pembayaran'}
                    options={loanPaybackYearsOptions}
                    bind:value={$loanDetailForm.paymentPeriod}
                />
                {#if $loanDetailError.paymentPeriod}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$loanDetailError.paymentPeriod[0]}
                    </span>
                {/if}
                <LongTextField
                    hasError={!!$loanDetailError.reasonToLoan}
                    name="reasonToLoan"
                    label={'Tugas Jawatan yang menunjukan sebab-sebab keperluan menggunakan kenderaan persendirian'}
                    bind:value={$loanDetailForm.reasonToLoan}
                />
                {#if $loanDetailError.reasonToLoan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$loanDetailError.reasonToLoan[0]}
                    </span>
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Kenderaan yang Hendak Dibeli">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 1;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton primary label="Simpan" form="vehicleDetailForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="vehicleDetailForm"
                method="POST"
                use:vehicleDetailEnhance
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    hasError={!!$vehicleDetailError.vehicleCondition}
                    name="vehicleCondition"
                    dropdownType="label-left-full"
                    label={'Kondisi Kenderaan'}
                    options={vehicleCondition}
                    bind:value={$vehicleDetailForm.vehicleCondition}
                />
                {#if $vehicleDetailError.vehicleCondition}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.vehicleCondition[0]}
                    </span>
                {/if}
                <DropdownSelect
                    hasError={!!$vehicleDetailError.vehicleType}
                    name="vehicleType"
                    dropdownType="label-left-full"
                    label={'Jenis Kenderaan'}
                    options={vehicleType}
                    bind:value={$vehicleDetailForm.vehicleType}
                />
                {#if $vehicleDetailError.vehicleType}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.vehicleType[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$vehicleDetailError.vehicleBrand}
                    name="vehicleBrand"
                    label={'Jenama dan Model Kenderaan'}
                    bind:value={$vehicleDetailForm.vehicleBrand}
                />
                {#if $vehicleDetailError.vehicleBrand}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.vehicleBrand[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$vehicleDetailError.engineNo}
                    name="engineNo"
                    label={'Sukatan Silinder/No. Chasis/No. Enjin'}
                    bind:value={$vehicleDetailForm.engineNo}
                />
                {#if $vehicleDetailError.engineNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.engineNo[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$vehicleDetailError.registrationNo}
                    name="registrationNo"
                    label={'Nombor Pendaftaran'}
                    bind:value={$vehicleDetailForm.registrationNo}
                />
                {#if $vehicleDetailError.registrationNo}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.registrationNo[0]}
                    </span>
                {/if}
                <DateSelector
                    hasError={!!$vehicleDetailError.registratioNDate}
                    name="registratioNDate"
                    handleDateChange
                    label="Tarikh Pendaftaran"
                    bind:selectedDate={$vehicleDetailForm.registratioNDate}
                />
                {#if $vehicleDetailError.registratioNDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.registratioNDate[0]}
                    </span>
                {/if}
                <TextField
                    hasError={!!$vehicleDetailError.netPrice}
                    name="netPrice"
                    label={'Harga Bersih (seperti ditetapkan dalam WP 9.3'}
                    bind:value={$vehicleDetailForm.netPrice}
                />
                {#if $vehicleDetailError.netPrice}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$vehicleDetailError.netPrice[0]}
                    </span>
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pembiayaan Pinjaman">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 2;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton primary label="Simpan" form="loanFinancingForm">
                <SvgCheck />
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="loanFinancingForm"
                method="POST"
                use:loanFinancingEnhance
                class="flex w-full flex-col gap-2"
            >
                <RadioSingle
                    name="hasPreviousLoan"
                    onChange={change}
                    bind:userSelected={$loanFinancingForm.hasPreviousLoan}
                    {options}
                    legend={'Pernahkah diberikan pinjaman/pembiayaan sebelum ini'}
                />
                {#if $loanFinancingError.hasPreviousLoan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >
                        {$loanFinancingError.hasPreviousLoan[0]}
                    </span>
                {/if}
                {#if $loanFinancingForm.hasPreviousLoan}
                    <DateSelector
                        hasError={!!$loanFinancingError.recentLoanDate}
                        name="recentLoanDate"
                        handleDateChange
                        label="Tarikh Pinjaman/Pembayaran Terakhir"
                        bind:selectedDate={$loanFinancingForm.recentLoanDate}
                    />
                    {#if $loanFinancingError.recentLoanDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.recentLoanDate[0]}
                        </span>
                    {/if}
                    <TextField
                        hasError={!!$loanFinancingError.totalLoan}
                        name="totalLoan"
                        label={'Jumlah Pinjaman/Pembiayaan'}
                        bind:value={$loanFinancingForm.totalLoan}
                    />
                    {#if $loanFinancingError.totalLoan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.totalLoan[0]}
                        </span>
                    {/if}
                    <DateSelector
                        hasError={!!$loanFinancingError.latestPaidInstallmentDate}
                        name="latestPaidInstallmentDate"
                        handleDateChange
                        label="Tarikh Ansuran Terakhir Dibayar"
                        bind:selectedDate={$loanFinancingForm.latestPaidInstallmentDate}
                    />
                    {#if $loanFinancingError.latestPaidInstallmentDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.latestPaidInstallmentDate[0]}
                        </span>
                    {/if}
                    <TextField
                        hasError={!!$loanFinancingError.latestPaidInstallment}
                        name="latestPaidInstallment"
                        label={'Jumlah Ansuran Terakhir Dibayar'}
                        bind:value={$loanFinancingForm.latestPaidInstallment}
                    />
                    {#if $loanFinancingError.latestPaidInstallment}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.latestPaidInstallment[0]}
                        </span>
                    {/if}

                    <TextField
                        hasError={!!$loanFinancingError.currentVehicle}
                        name="currentVehicle"
                        label={'Jenis Kenderaan yang Digunakan Sekarang Untuk Tugas Rasmi'}
                        bind:value={$loanFinancingForm.currentVehicle}
                    />
                    {#if $loanFinancingError.currentVehicle}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.currentVehicle[0]}
                        </span>
                    {/if}

                    <TextField
                        hasError={!!$loanFinancingError.currentLoanFromGoverment}
                        name="currentLoanFromGoverment"
                        label={'Butir-butir Baki Hutang/Tuntutan Lain dengan Kerajaan Bagi Pihak Diri Sendiri, Jika Ada'}
                        bind:value={$loanFinancingForm.currentLoanFromGoverment}
                    />
                    {#if $loanFinancingError.currentLoanFromGoverment}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >
                            {$loanFinancingError.currentLoanFromGoverment[0]}
                        </span>
                    {/if}
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ><FormButton
                type="back"
                onClick={() => {
                    activeStepper = 3;
                }}
            ></FormButton>
            <FormButton type="reset" onClick={() => {}}></FormButton>
            <TextIconButton primary label="Hantar" form="validationForm">
                <SvgPaperAirplane />
            </TextIconButton>
        </StepperContentHeader>
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
                        Muat naik salinan berikut:
                    </p>
                    <ul
                        class="list-inside list-disc pl-2 text-sm text-txt-tertiary"
                    >
                        <li>Kad Pengenalan</li>
                        <li>Lesen</li>
                        <li>Slip Gaji Terkini</li>
                        <li>Sijil Nilaian (Jika kenderaan terpakai)</li>
                        <li>Salinan Sebut Harga</li>
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

            <SectionHeader title="Pengesahan"></SectionHeader>
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
