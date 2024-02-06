<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Modal } from 'flowbite-svelte';
    import { commonOptions } from '$lib/constants/mypsm/radio-option-constants';
    import {
        _addAllowanceTypeSchema,
        _generateFinalSalaryPayslip,
        _specialDeductionSchema,
        _submitAllowanceTypeForm,
        _submitSpecialDeductionForm,
    } from './+page';
    export let data: PageData;
    let activeStepper = 0;
    let disabled = true;
    let overallFinalSalary: number = 0;

    // let param: SalaryDetailRequestDTO = data.record.salaryDetailParam;

    // let table: TableDTO = {
    //     param: param,
    //     meta: data.record.finalPayslipSalaryDetailResponse.data?.meta ?? {
    //         pageSize: 1,
    //         pageNum: 1,
    //         totalData: 1,
    //         totalPage: 1,
    //     },
    //     data: data.record?.finalPayslipSalaryDetail ?? [],
    // };

    // async function _search() {
    //     _updateTable(table.param).then((value) => {
    //         table.data = value.props.response.data?.dataList ?? [];
    //         table.meta = value.props.response.data?.meta ?? {
    //             pageSize: 1,
    //             pageNum: 1,
    //             totalData: 1,
    //             totalPage: 1,
    //         };
    //         table.param.pageSize = table.meta.pageSize;
    //         table.param.pageNum = table.meta.pageNum;
    //     });
    // }

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';
    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'epw':
                    tooltipContent = epwTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }

    // =====================================================================
    // ===================Final Salary Form Group =========================-

    // ##Allowance----------------------------------------------------------
    let totalAllowance: number = 0;
    let totalAllowanceDisplay: string = '0';

    interface IntAllowancesFormGroup {
        title: string;
        totalServiceYear: number;
        currentAmount: number;
        retirementMonthTotalDay: number;
        total: number;
    }

    let allowancesFormGroups: { [key: string]: IntAllowancesFormGroup } = {};
    let allowancesNextGroupId = 1;

    function addAllowanceFormGroup() {
        allowancesFormGroups = {
            ...allowancesFormGroups,
            [allowancesNextGroupId.toString()]: {
                title: '',
                totalServiceYear: 0,
                currentAmount: 0,
                retirementMonthTotalDay: 0,
                total: 0,
            },
        };
        allowancesNextGroupId += 1;
    }

    function removeAllowanceFormGroup(groupId: string) {
        allowancesFormGroups = { ...allowancesFormGroups };
        delete allowancesFormGroups[groupId];
    }

    function calculateAllowanceTotal() {
        totalAllowance = Object.values(allowancesFormGroups).reduce(
            (acc, group) => acc + group.total,
            0,
        );

        totalAllowanceDisplay = totalAllowance.toFixed(2);
    }

    // ##Special Deduction------------------------------------------------
    let totalSpecialDeduction: number = 0.0;
    let totalSpecialDeductionDisplay: string = '0';

    interface IntSpecialDeductionFormGroup {
        title: string;
        totalDeduction: number;
    }

    let specialDeductionFormGroups: {
        [key: string]: IntSpecialDeductionFormGroup;
    } = {};
    let specialDeductionNextGroupId = 1;

    function addSpecialDeductionFormGroup() {
        specialDeductionFormGroups = {
            ...specialDeductionFormGroups,
            [specialDeductionNextGroupId.toString()]: {
                title: '',
                totalDeduction: 0,
            },
        };
        specialDeductionNextGroupId += 1;
    }

    function removeSpecialDeductionFormGroup(groupId: string) {
        specialDeductionFormGroups = { ...specialDeductionFormGroups };
        delete specialDeductionFormGroups[groupId];
    }

    function calculateSpecialDeductionTotal() {
        totalSpecialDeduction = Object.values(
            specialDeductionFormGroups,
        ).reduce((acc, group) => acc + Number(group.totalDeduction), 0);
        totalSpecialDeductionDisplay = totalSpecialDeduction.toFixed(2);
    }

    // ===================End of Final Salary Form Group ===================
    // =====================================================================

    onMount(() => {
        // Add an initial form group
        addAllowanceFormGroup();
        addSpecialDeductionFormGroup();
    });

    afterUpdate(() => {
        calculateAllowanceTotal();
        calculateSpecialDeductionTotal();

        overallFinalSalary = totalAllowance + totalSpecialDeduction;
    });

    let openAllowanceTypeModal: boolean = false;
    let openSpecialDeductionModal: boolean = false;
    // Form Validation =========================
    const {
        form: allowanceTypeForm,
        errors: allowanceTypeError,
        enhance: allowanceTypeEnhance,
    } = superForm(data.allowanceTypeForm, {
        SPA: true,
        id: 'allowanceTypeForm',
        validators: _addAllowanceTypeSchema,
        onSubmit() {
            _submitAllowanceTypeForm($allowanceTypeForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    const {
        form: specialDeductionForm,
        errors: specialDeductionError,
        enhance: specialDeductionEnhance,
    } = superForm(data.specialDeductionForm, {
        SPA: true,
        id: 'specialDeductionForm',
        validators: _specialDeductionSchema,
        onSubmit() {
            _submitSpecialDeductionForm($specialDeductionForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pekerja {data.record.finalPayslipEmployeeDetail
            .employeeNumber}"
        description="Maklumat - maklumat pergerakan gaji pekerja {data.record
            .finalPayslipEmployeeDetail.employeeNumber}"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <!-- Maklumat Peribadi -->
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    disabled={true}
                    name="name"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={data.record.finalPayslipEmployeeDetail.name}
                ></TextField>

                <TextField
                    disabled={true}
                    name="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .alternativeName}
                ></TextField>

                <TextField
                    disabled={true}
                    name="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .identityDocumentNumber}
                ></TextField>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="titleId"
                    name="titleId"
                    label="Gelaran"
                    bind:value={data.record.finalPayslipEmployeeDetail.titleId}
                    options={data.titleLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="identityDocumentColor"
                    name="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    options={data.identityCardColorLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .identityDocumentColor}
                ></DropdownSelect>
                <DateSelector
                    disabled={true}
                    name="birthDate"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={data.record.finalPayslipEmployeeDetail
                        .birthDate}
                ></DateSelector>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="birthStateId"
                    name="birthStateId"
                    label="Tempat Lahir"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .birthStateId}
                    options={data.stateLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="birthCountryId"
                    name="birthCountryId"
                    label="Negara Dilahirkan"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .birthCountryId}
                    options={data.countryLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="nationalityId"
                    name="nationalityId"
                    label="Warganegara"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .nationalityId}
                    options={data.nationalityLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="raceId"
                    name="raceId"
                    label="Bangsa"
                    bind:value={data.record.finalPayslipEmployeeDetail.raceId}
                    options={data.raceLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="ethnicId"
                    name="ethnicId"
                    label="Etnik"
                    bind:value={data.record.finalPayslipEmployeeDetail.ethnicId}
                    options={data.ethnicityLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="religionId"
                    name="religionId"
                    label="Agama"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .religionId}
                    options={data.religionLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="genderId"
                    name="genderId"
                    label="Jantina"
                    bind:value={data.record.finalPayslipEmployeeDetail.genderId}
                    options={data.genderLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="maritalId"
                    label="Status Perkahwinan"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .maritalId}
                    options={data.maritalLookup}
                ></DropdownSelect>
                <TextField
                    disabled={true}
                    name="email"
                    label={'Emel'}
                    type="text"
                    bind:value={data.record.finalPayslipEmployeeDetail.email}
                ></TextField>

                <LongTextField
                    disabled={true}
                    name="homeAddress"
                    label="Alamat Rumah"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .homeAddress}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="homeCountryId"
                    name="homeCountryId"
                    label="Negara"
                    options={data.countryLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .homeCountryId}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="homeStateId"
                    name="homeStateId"
                    label="Negeri"
                    options={data.stateLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .homeStateId}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="homeStateId"
                    name="homeCityId"
                    label="Bandar"
                    options={data.cityLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .homeCityId}
                />
                <TextField
                    disabled={true}
                    name="homePostcode"
                    label="Poskod Rumah"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .homePostcode}
                />

                <LongTextField
                    disabled={true}
                    name="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .mailAddress}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="mailCountryId"
                    name="mailCountryId"
                    label="Negara Surat Menyurat"
                    options={data.countryLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .mailCountryId}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="mailStateId"
                    name="mailStateId"
                    label="Negeri Surat Menyurat"
                    options={data.stateLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .mailStateId}
                />
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="mailStateId"
                    name="mailCityId"
                    label="Bandar Surat Menyurat"
                    options={data.cityLookup}
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .mailCityId}
                />
                <TextField
                    disabled={true}
                    name="mailPostcode"
                    label="Poskod Surat Menyurat"
                    bind:value={data.record.finalPayslipEmployeeDetail
                        .mailPostcode}
                />
                <RadioSingle
                    disabled={true}
                    name="assetDeclarationStatusId"
                    legend="Status Pengikstiharan Harta"
                    bind:userSelected={data.record.finalPayslipEmployeeDetail
                        .assetDeclarationStatusId}
                    options={commonOptions}
                ></RadioSingle>
                <DateSelector
                    disabled={true}
                    name="propertyDeclarationDate"
                    handleDateChange
                    label="Tarikh Pengikstiharan Harta"
                    bind:selectedDate={data.record.finalPayslipEmployeeDetail
                        .propertyDeclarationDate}
                ></DateSelector>
                <RadioSingle
                    name="isExPoliceOrSoldier"
                    disabled={true}
                    options={commonOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={data.record.finalPayslipEmployeeDetail
                        .isExPoliceOrSoldier}
                ></RadioSingle>
                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isInternalRelationship"
                        options={commonOptions}
                        disabled={true}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={data.record
                            .finalPayslipEmployeeDetail.isInternalRelationship}
                    ></RadioSingle>
                    {#if data.record.finalPayslipEmployeeDetail.isInternalRelationship}
                        <TextField
                            disabled={true}
                            name="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={data.record.finalPayslipEmployeeDetail
                                .employeeNumber}
                        ></TextField>

                        <TextField
                            disabled={true}
                            name="employeeName"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={data.record.finalPayslipEmployeeDetail
                                .employeeName}
                        ></TextField>

                        <DropdownSelect
                            disabled={true}
                            dropdownType="label-left-full"
                            id="employeePosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={data.record.finalPayslipEmployeeDetail
                                .employeePosition}
                            options={data.positionLookup}
                        ></DropdownSelect>
                        <DropdownSelect
                            disabled={true}
                            dropdownType="label-left-full"
                            id="relationshipId"
                            label="Hubungan"
                            bind:value={data.record.finalPayslipEmployeeDetail
                                .relationshipId}
                            options={data.relationshipLookup}
                        ></DropdownSelect>
                    {/if}
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>
                    Maklumat Pertalian Dengan Kakitangan LKIM
                </p>

                <!-- kakitanganLKIM? -->
                <RadioSingle
                    options={commonOptions}
                    {disabled}
                    legend={'Perhubungan Dengan Kakitangan LKIM'}
                    bind:userSelected={data.record.finalPayslipEmployeeDetail
                        .isInternalRelationship}
                ></RadioSingle>
                {#if !!data.record.finalPayslipEmployeeDetail.isInternalRelationship}
                    <TextField
                        {disabled}
                        id="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        value={data.record.finalPayslipEmployeeDetail
                            .employeeNumber}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={data.record.finalPayslipEmployeeDetail
                            .employeeName}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={data.record.finalPayslipEmployeeDetail
                            .employeePosition}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="hubungan"
                        label={'Hubungan'}
                        value={data.record.finalPayslipEmployeeDetail
                            .relationshipId}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="gradeId"
                    label="Gred Semasa"
                    bind:value={data.record.finalPayslipServiceDetail.gradeId}
                    options={data.gradeLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="maxGradeId"
                    label="Gred Maksimum"
                    bind:value={data.record.finalPayslipServiceDetail
                        .maxGradeId}
                    options={data.gradeLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="positionId"
                    label="Jawatan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .positionId}
                    options={data.positionLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="placementId"
                    label="Penempatan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .placementId}
                    options={data.placementLookup}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .serviceTypeId}
                    options={data.educationLookup}
                ></DropdownSelect>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .serviceGroupId}
                    options={data.serviceGroupLookup}
                ></DropdownSelect>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:value={data.record.finalPayslipServiceDetail.unitId}
                    options={data.unitLookup}
                ></DropdownSelect>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .employmentStatusId}
                    options={data.serviceTypeLookup}
                ></DropdownSelect>

                <DateSelector
                    disabled={true}
                    name="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .effectiveDate}
                ></DateSelector>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="retirementBenefit"
                    label="Faedah Persaraan"
                    bind:value={data.record.finalPayslipServiceDetail
                        .retirementBenefit}
                    options={data.retirementBenefitLookup}
                ></DropdownSelect>

                <TextField
                    disabled={true}
                    name="epfNumber"
                    label={'No. KWSP'}
                    bind:value={data.record.finalPayslipServiceDetail.epfNumber}
                ></TextField>

                <TextField
                    disabled={true}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    bind:value={data.record.finalPayslipServiceDetail
                        .socsoNumber}
                ></TextField>
                <TextField
                    disabled={true}
                    name="incomeNumber"
                    label={'No. Cukai'}
                    bind:value={data.record.finalPayslipServiceDetail
                        .incomeNumber}
                ></TextField>

                <TextField
                    disabled={true}
                    name="bankName"
                    label={'Bank'}
                    bind:value={data.record.finalPayslipServiceDetail.bankName}
                ></TextField>

                <TextField
                    disabled={true}
                    name="bankAccount"
                    label={'No. Akaun'}
                    bind:value={data.record.finalPayslipServiceDetail
                        .bankAccount}
                ></TextField>

                <TextField
                    disabled={true}
                    name="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    bind:value={data.record.finalPayslipServiceDetail
                        .eligibleLeaveCount}
                ></TextField>

                <DateSelector
                    disabled={true}
                    name="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .civilServiceStartDate}
                ></DateSelector>
                <DateSelector
                    disabled={true}
                    name="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .firstServiceDate}
                ></DateSelector>
                <DateSelector
                    disabled={true}
                    name="serviceDate"
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .serviceDate}
                ></DateSelector>
                <DateSelector
                    disabled={true}
                    name="firstConfirmServiceDate"
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .firstConfirmServiceDate}
                ></DateSelector>
                <DateSelector
                    disabled={true}
                    name="confirmDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .confirmDate}
                ></DateSelector>

                <DateSelector
                    disabled={true}
                    name="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .firstEffectiveDate}
                ></DateSelector>
                <DateSelector
                    disabled={true}
                    name="newRecruitEffectiveDate"
                    label={'Tarikh Lantikan Baru'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .newRecruitEffectiveDate}
                ></DateSelector>

                <TextField
                    disabled={true}
                    name="pensionNumber"
                    label={'Nombor Pencen'}
                    bind:value={data.record.finalPayslipServiceDetail
                        .pensionNumber}
                ></TextField>

                <DropdownSelect
                    disabled={true}
                    dropdownType="label-left-full"
                    id="revisionMonth"
                    label="Bulan KGT"
                    bind:value={data.record.finalPayslipServiceDetail
                        .revisionMonth}
                    options={data.monthStringLookup}
                ></DropdownSelect>

                <TextField
                    disabled={true}
                    name="kgt"
                    type="number"
                    label={'KGT'}
                    bind:value={data.record.finalPayslipServiceDetail.kgt}
                ></TextField>

                <DateSelector
                    disabled={true}
                    name="retirementDate"
                    label={'Tarikh Bersara'}
                    bind:selectedDate={data.record.finalPayslipServiceDetail
                        .retirementDate}
                ></DateSelector>

                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <!-- <TextField
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            bind:value={'12/12/2021'}
                        ></TextField>
                        <TextField
                            disabled={true}
                            name="maximumSalary"
                            label={'Tangga Gaji'}
                            bind:value={data.record.finalPayslipServiceDetail.maximumSalary}
                        ></TextField>

                        <TextField
                            disabled={true}
                            name="baseSalary"
                            label={'Gaji Pokok'}
                            bind:value={data.record.finalPayslipServiceDetail.baseSalary}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={true}
                            name="itka"
                            label={'ITKA'}
                            bind:value={data.record.finalPayslipServiceDetail.itka}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={true}
                            name="itp"
                            label={'ITP'}
                            bind:value={data.record.finalPayslipServiceDetail.itp}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={true}
                            name="epw"
                            label={'EPW'}
                            bind:value={data.record.finalPayslipServiceDetail.epw}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={true}
                            name="cola"
                            label={'COLA'}
                            bind:value={data.record.finalPayslipServiceDetail.cola}
                        ></TextField>
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        > -->
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Gaji dan Potongan">
            <TextIconButton
                primary
                label="Sahkan Semakan"
                onClick={() => {
                    _generateFinalSalaryPayslip(data.record.param.employeeId);
                }}><SvgCheck /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-y-2.5 border-b border-bdr-primary pb-5"
            >
                <!-- <div
                    class="min-w-2/5 flex w-full flex-row items-center justify-end gap-5 rounded-[3px] border p-2.5"
                >
                    <b class="text-base text-system-primary"
                        >JUMLAH KESELURUHAN GAJI AKHIR:
                    </b>
                    <p class="min-w-[200px]">
                        {CurrencyHelper.formatCurrency(overallFinalSalary)}
                    </p>
                </div>-->
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Gaji dan Kadar Elaun - Elaun"
                        ><div class="mr-2">
                            <!-- <TextIconButton
                                primary
                                onClick={() => (openAllowanceTypeModal = true)}
                                label="Tambah Jenis Elaun"
                                ><SvgPlus /></TextIconButton
                            > -->
                        </div></SectionHeader
                    >
                    <hr />
                    <div
                        class="flex w-full flex-row gap-x-2.5 text-sm text-txt-secondary"
                    >
                        <span class="w-4"></span>
                        <div class="flex w-full flex-row gap-x-2.5">
                            <p class="w-[670px]">Nama</p>
                            <div class="flex w-full flex-row gap-x-2.5">
                                <p class="w-full">Kuantiti</p>
                                <p class="w-full">Amaun (RM)</p>
                                <p class="w-full">Jumlah (RM)</p>
                            </div>
                            <span class="w-5"></span>
                        </div>
                    </div>

                    {#each data.record.finalPayslipSalaryDetail as salary, index}
                        <div
                            class="flex w-full flex-row items-center gap-x-2.5 text-base"
                        >
                            <span class="w-4">{index + 1}.</span>
                            <div class="flex w-full flex-row gap-x-2.5">
                                <div class="flex w-[600px] flex-row">
                                    <TextField
                                        labelType="no-label"
                                        disabled={true}
                                        placeholder="Nama Elaun"
                                        label="."
                                        bind:value={salary.name}
                                    />
                                </div>
                                <div
                                    class="flex w-full flex-row items-end gap-x-2.5"
                                >
                                    <TextField
                                        disabled={true}
                                        type="number"
                                        labelType="no-label"
                                        label="Kuantiti"
                                        bind:value={salary.quantity}
                                    />
                                    <TextField
                                        disabled={true}
                                        type="number"
                                        labelType="no-label"
                                        label="Amaun (RM)"
                                        bind:value={salary.price}
                                    />
                                    <TextField
                                        disabled={true}
                                        type="number"
                                        labelType="no-label"
                                        label="Jumlah (RM)"
                                        bind:value={salary.total}
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
                <!-- <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader color="system-primary" title="Tolakan Khas"
                        ><div class="mr-2">
                            <TextIconButton
                                primary
                                onClick={() =>
                                    (openSpecialDeductionModal = true)}
                                label="Tambah Tolakan Khas"
                                ><SvgPlus /></TextIconButton
                            >
                        </div></SectionHeader
                    >
                    <hr />
                    {#each Object.entries(specialDeductionFormGroups) as [groupId, group], index}
                        <div
                            class="flex w-full flex-row items-center gap-x-2.5 text-base"
                        >
                            <span class="w-4">{index + 1}.</span>
                            <SpecialDeductionFormGroup
                                bind:group={specialDeductionFormGroups[groupId]}
                                onDelete={() =>
                                    removeSpecialDeductionFormGroup(groupId)}
                            />
                        </div>
                    {/each}
                    <hr />
                    <div class="flex w-full flex-row justify-end px-14">
                        <div class="w-fit">
                            <TextField
                                disabled
                                labelBlack={true}
                                labelType="label-fit"
                                label="JUMLAH TOLAKAN"
                                value={CurrencyHelper.formatCurrency(
                                    totalSpecialDeduction,
                                )}
                            ></TextField>
                        </div>
                    </div>
                </div> -->
            </div>
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Cetak Sijil Gaji Akhir Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-row items-center justify-between">
                    <DownloadAttachment
                        fileName="Sijil Gaji Akhir: {data.record
                            .finalSalaryPayslipDoc.Document}"
                    ></DownloadAttachment>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />

<!-- Tambah Jenis Elaun Modal -->
<Modal title="Tambah Jenis Elaun" bind:open={openAllowanceTypeModal}>
    <form
        id="allowanceTypeForm"
        use:allowanceTypeEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
        >
            <TextField
                name="allowanceName"
                label="Nama Elaun"
                labelType="label-200"
                type="text"
                bind:value={$allowanceTypeForm.allowanceName}
            />
            {#if $allowanceTypeError.allowanceName}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$allowanceTypeError.allowanceName}</span
                >
            {/if}
            <TextField
                name="serviceDuration"
                label="Tempoh Tahun Perkhidmatan"
                labelType="label-200"
                type="number"
                bind:value={$allowanceTypeForm.serviceDuration}
            />
            {#if $allowanceTypeError.serviceDuration}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$allowanceTypeError.allowanceName}</span
                >
            {/if}
            <TextField
                name="currentAmount"
                label="Amaun Semasa (RM)"
                labelType="label-200"
                type="number"
                bind:value={$allowanceTypeForm.currentAmount}
            />
            {#if $allowanceTypeError.currentAmount}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$allowanceTypeError.currentAmount}</span
                >
            {/if}
        </div>
        <TextIconButton primary label="Simpan" form="allowanceTypeForm"
        ></TextIconButton>
    </form>
</Modal>

<!-- Tambah Tolakan Khas Modal -->
<Modal title="Tambah Tolakan Khas" bind:open={openSpecialDeductionModal}>
    <form
        id="specialDeductionForm"
        use:specialDeductionEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 text-black"
        >
            <TextField
                name="specialDeductionName"
                label="Nama Tolakan Khas"
                labelType="label-200"
                type="text"
                bind:value={$specialDeductionForm.specialDeductionName}
            />
            {#if $specialDeductionError.specialDeductionName}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$specialDeductionError.specialDeductionName}</span
                >
            {/if}
            <TextField
                name="total"
                label="Jumlah (RM)"
                labelType="label-200"
                type="number"
                bind:value={$specialDeductionForm.total}
            />
            {#if $specialDeductionError.total}
                <span
                    class="ml-[200px] font-sans text-sm italic text-system-danger"
                    >{$specialDeductionError.total}</span
                >
            {/if}
        </div>
        <TextIconButton primary label="Simpan" form="specialDeductionForm"
        ></TextIconButton>
    </form>
</Modal>
