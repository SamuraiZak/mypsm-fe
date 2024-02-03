<script lang="ts">
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule';
    import { Tooltip } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { afterUpdate, onMount } from 'svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import IntAllowancesFormGroup from '$lib/components/final-salary-form-group/AllowancesFormGroup.svelte';
    import SpecialDeductionFormGroup from '$lib/components/final-salary-form-group/SpecialDeductionFormGroup.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Modal } from 'flowbite-svelte';
    import {
        _addAllowanceTypeSchema,
        _submitAllowanceTypeForm,
        _submitSpecialDeductionForm,
        _specialDeductionSchema,
    } from './+page';
    export let data: PageData;
    export let noPekerja = data.record.currentEmployee?.employeeNumber;
    let activeStepper = 0;
    let salaryMovementData = data.record.currentEmployee;
    let disabled = true;
    // let isEditable = data.record.currentEmployee.status === 'baru' ? true : false;
    let labelBlack = !disabled;
    let selectedMeeting = '2';
    let selectedMonth = '10';
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;
    let radioValue: any = 'sah';
    let overallFinalSalary: number = 0;

    const salaryMonths = [
        { value: '1', name: 'Januari' },
        { value: '2', name: 'April' },
        { value: '3', name: 'Julai' },
        { value: '4', name: 'Oktober' },
    ];
    let selectedSalaryMonth: string = '1';

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'SAH',
        },
        {
            value: 'tidak sah',
            label: 'TIDAK SAH',
        },
    ];

    const faedahPersaraanOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'KWSP',
        },
        {
            value: 'false',
            label: 'Pencen',
        },
    ];

    function getEmployeeLeave(currentEmployeeNumber: string) {
        if (currentEmployeeNumber === '00001') {
            return '30';
        }
        if (currentEmployeeNumber === '00002') {
            return '27';
        }
        if (currentEmployeeNumber === '00003') {
            return '25';
        }
    }

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }

    let isExPoliceSoldier = data.record.currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        data.record.currentEmployeeSpouse.isLKIMStaff == 'Ya'
            ? 'true'
            : 'false';
    let isKWSP =
        data.record.currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

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
        title="Rekod Pekerja {noPekerja}"
        description="Maklumat - maklumat pergerakan gaji pekerja {noPekerja}"
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
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    id="noPerkeja"
                    label={'No. Pekerja'}
                    value={data.record.currentEmployee.employeeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaPenuh"
                    label={'Nama Penuh'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaLain"
                    label={'Nama Lain'}
                    value={data.record.currentEmployee.alternativeName}
                ></TextField>
                <TextField
                    {disabled}
                    id="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployee.isMalaysian,
                    )}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    {disabled}
                    label={'Tarikh Lahir'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployee.birthDate,
                    ).toString()}
                ></DateSelector>
                <TextField
                    {disabled}
                    id="tempatLahir"
                    label={'Tempat Lahir'}
                    value={data.record.currentEmployeeBirthState.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="warganegara"
                    label={'Warganegara'}
                    value={data.record.currentEmployee.isMalaysian
                        ? 'Malaysia'
                        : 'Bukan'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bangsa"
                    label={'Bangsa'}
                    value={data.record.currentEmployeeRace.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="agama"
                    label={'Agama'}
                    value={data.record.currentEmployeeReligion.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="jantina"
                    label={'Jantina'}
                    value={data.record.currentEmployee.gender}
                ></TextField>
                <TextField
                    {disabled}
                    id="status"
                    label={'Status'}
                    value={data.record.currentEmployee.marital}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel"
                    label={'Emel'}
                    value={data.record.currentEmployee.email}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatRumah"
                    label={'Alamat Rumah'}
                    value={data.record.currentEmployee.homeAddress}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    id="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={data.record.currentEmployee.mailAddress}
                ></LongTextField>
                <TextField
                    {disabled}
                    id="perumahan"
                    label={'Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    id="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    id="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    value={'-'}
                ></TextField>
                <RadioSingle
                    {disabled}
                    {options}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={isExPoliceSoldier}
                ></RadioSingle>
            </div>

            <div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>
                    Maklumat Pertalian Dengan Kakitangan LKIM
                </p>

                <!-- kakitanganLKIM? -->
                <RadioSingle
                    {options}
                    {disabled}
                    legend={'Perhubungan Dengan Kakitangan LKIM'}
                    bind:userSelected={isInRelationshipWithLKIMStaff}
                ></RadioSingle>
                {#if isInRelationshipWithLKIMStaff === 'true'}
                    <TextField
                        {disabled}
                        id="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        value={data.record.currentEmployeeSpouseEmployeeInfo
                            ?.employeeNumber}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.name}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.position}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="hubungan"
                        label={'Hubungan'}
                        value={data.record.currentEmployeeSpouse.relationship}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={false}
                    id="gredSemasa"
                    label={'Gred Semasa'}
                    value={data.record.currentEmployeeGrade.code}
                ></TextField>
                <TextField
                    disabled={false}
                    id="jawatan"
                    label={'Jawatan'}
                    value={data.record.currentEmployeePosition.name}
                ></TextField>
                <TextField
                    disabled={false}
                    id="penempatan"
                    label={'Penempatan'}
                    value={data.record.currentEmployeeService.placement}
                ></TextField>
                <TextField
                    disabled={false}
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                    value={data.record.currentEmployeeServiceType.name}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <RadioSingle
                    disabled={false}
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                    bind:userSelected={isKWSP}
                ></RadioSingle>
                <TextField
                    disabled={false}
                    id="noKWSP"
                    label={'No. KWSP'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="noSOCSO"
                    label={'No. SOCSO'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="noCukai"
                    label={'No. Cukai (LHDN)'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="bank"
                    label={'Bank'}
                    value={'Maybank Berhad'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="noAkaun"
                    label={'No. Akaun'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="program"
                    label={'Program'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="kelayakanCuti"
                    label={'Kelayakan Cuti'}
                    value={getEmployeeLeave(
                        data.record.currentEmployee.employeeNumber,
                    )}
                ></TextField>

                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>

                <AccordianField
                    disabled={!disabled}
                    label="Sejarah Lantikan Jawatan LKIM"
                    header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                >
                    {#each data.record.currentEmployeePositionHistory as item, i}
                        <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{i + 1}. {mockLookupGrades.find(
                                (grade) => grade.id === item.gradeId,
                            )?.code}, {mockLookupPositions.find(
                                (position) => position.gradeId === item.gradeId,
                            )?.name}, {item.startDate}, {item.startDate}
                        </label>
                    {/each}
                </AccordianField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <TextField
                    disabled={false}
                    id="pemangkuanSekarang"
                    label={'Pemangkuan Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="tanggungKerjaSekarang"
                    label={'Tanggung Kerja Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="skimPencen"
                    label={'Skim Pencen'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="kenaikanGajiAkhir"
                    label={'Kenaikan Gaji Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="kenaikanPangkatAkhir"
                    label={'Kenaikan Pangkat Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    id="bulanKGT"
                    label={'Bulan KGT'}
                    value={'-'}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={false}
                    label={'Tarikh Bersara'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeePensions.retiredDate,
                    )}
                ></DateSelector>
                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <TextField
                            disabled={false}
                            id="tarikhBerkuatkuasa"
                            label={'Tarikh Berkuatkuasa'}
                            value={'12/12/2021'}
                        ></TextField>
                        <TextField
                            disabled={false}
                            id="tanggaGaji"
                            label={'Tangga Gaji'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                        <TextField
                            disabled={false}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={false}
                            id="itka"
                            label={'ITKA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={false}
                            id="itp"
                            label={'ITP'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={false}
                            id="epw"
                            label={'EPW'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={false}
                            id="cola"
                            label={'COLA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <!-- Tooltip body -->
                        <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        >
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Gaji dan Potongan">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            />
            <FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-y-2.5 border-b border-bdr-primary pb-5"
            >
                <div
                    class="min-w-2/5 flex w-full flex-row items-center justify-end gap-5 rounded-[3px] border p-2.5"
                >
                    <b class="text-base text-system-primary"
                        >JUMLAH KESELURUHAN GAJI AKHIR:
                    </b>
                    <p class="min-w-[200px]">
                        {CurrencyHelper.formatCurrency(overallFinalSalary)}
                    </p>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Gaji dan Kadar Elaun - Elaun"
                        ><div class="mr-2">
                            <TextIconButton
                                primary
                                onClick={() => (openAllowanceTypeModal = true)}
                                label="Tambah Jenis Elaun"
                                ><SvgPlus /></TextIconButton
                            >
                        </div></SectionHeader
                    >
                    <hr />
                    <div
                        class="flex w-full flex-row gap-x-2.5 text-sm text-txt-secondary"
                    >
                        <span class="w-4"></span>
                        <div class="flex w-full flex-row gap-x-2.5">
                            <p class="w-[670px]">Nama Elaun</p>
                            <div class="flex w-full flex-row gap-x-2.5">
                                <p class="w-full">Tempoh Tahun Perkhidmatan</p>
                                <p class="w-full">Amaun Semasa (RM)</p>
                                <p class="w-full">
                                    Jumlah Hari Pada Bulan Pencen
                                </p>
                                <p class="w-full">Jumlah (RM)</p>
                            </div>
                            <span class="w-5"></span>
                        </div>
                    </div>
                    {#each Object.entries(allowancesFormGroups) as [groupId, group], index}
                        <div
                            class="flex w-full flex-row items-center gap-x-2.5 text-base"
                        >
                            <span class="w-4">{index + 1}.</span>
                            <IntAllowancesFormGroup
                                retiredDate={data.record.currentEmployeePensions
                                    .retiredDate}
                                bind:group={allowancesFormGroups[groupId]}
                                onDelete={() =>
                                    removeAllowanceFormGroup(groupId)}
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
                                label="JUMLAH BAYARAN ELAUN"
                                value={CurrencyHelper.formatCurrency(
                                    totalAllowance,
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader color="system-primary" title="Tolakan Khas"
                        ><div class="mr-2">
                            <TextIconButton
                                primary
                                onClick={() => openSpecialDeductionModal = true}
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
                </div>
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
                        fileName="Sijil Gaji Akhir {data.record.currentEmployee
                            .name} ({data.record.currentEmployee
                            .employeeNumber}):"
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
                hasError={!!$allowanceTypeError.allowanceName}
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
                hasError={!!$allowanceTypeError.serviceDuration}
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
                hasError={!!$allowanceTypeError.currentAmount}
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
                hasError={!!$specialDeductionError.specialDeductionName}
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
                hasError={!!$specialDeductionError.total}
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
