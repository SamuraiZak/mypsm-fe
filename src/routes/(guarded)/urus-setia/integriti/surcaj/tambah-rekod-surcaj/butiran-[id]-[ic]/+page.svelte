<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperButiranSurcaj,
        _submitFormStepperButiranSurcaj,
    } from './+page';
    import {
        _stepperButiranMesyuarat,
        _submitFormStepperButiranMesyuarat,
    } from './+page';

    export let data: PageData;

    let activeStepper = 0;
    let disabled = true;

    // let isEditable = data.record.currentEmployee.status === 'baru' ? true : false;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const meetingsOptions: RadioOption[] = [
        {
            value: 'passed',
            label: 'LULUS',
        },
        {
            value: 'not passed',
            label: 'TIDAK LULUS',
        },
    ];

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

    //Butiran Surcaj
    const {
        form: butiranSurcajForm,
        errors: butiranSurcajErrors,
        enhance: butiranSurcajEnhance,
    } = superForm(data.stepperButiranSurcaj, {
        SPA: true,
        validators: _stepperButiranSurcaj,
        onSubmit() {
            _submitFormStepperButiranSurcaj($butiranSurcajForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    //Butiran Mesyuarat
    const {
        form: butiranMesyuaratForm,
        errors: butiranMesyuaratErrors,
        enhance: butiranMesyuaratEnhance,
    } = superForm(data.stepperButiranMesyuarat, {
        SPA: true,
        validators: _stepperButiranMesyuarat,
        onSubmit() {
            _submitFormStepperButiranMesyuarat($butiranMesyuaratForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Surcaj Baru"
        description="Hal-hal berkaitan Surcaj {''}"
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
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaPenuh"
                    label={'Nama Penuh'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaLain"
                    label={'Nama Lain'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={''}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    {disabled}
                    label={'Tarikh Lahir'}
                    selectedDate={''}
                ></DateSelector>
                <TextField
                    {disabled}
                    id="tempatLahir"
                    label={'Tempat Lahir'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="warganegara"
                    label={'Warganegara'}
                    value={''}
                ></TextField>
                <TextField {disabled} id="bangsa" label={'Bangsa'} value={''}
                ></TextField>
                <TextField {disabled} id="agama" label={'Agama'} value={''}
                ></TextField>
                <TextField {disabled} id="jantina" label={'Jantina'} value={''}
                ></TextField>
                <TextField {disabled} id="status" label={'Status'} value={''}
                ></TextField>
                <TextField {disabled} id="emel" label={'Emel'} value={''}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatRumah"
                    label={'Alamat Rumah'}
                    value={''}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    id="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={''}
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
                ></RadioSingle>
                <TextField
                    {disabled}
                    id="noPekerjaPasangan"
                    label={'No. Pekerja LKIM'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaPasangan"
                    label={'Nama Kakitangan LKIM'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="jawatanPasangan"
                    label={'Jawatan Kakitangan LKIM'}
                    value={''}
                ></TextField>
                <TextField
                    {disabled}
                    id="hubungan"
                    label={'Hubungan'}
                    value={''}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={true}
                    id="gredSemasa"
                    label={'Gred Semasa'}
                    value={''}
                ></TextField>
                <TextField
                    disabled={true}
                    id="jawatan"
                    label={'Jawatan'}
                    value={''}
                ></TextField>
                <TextField
                    disabled={true}
                    id="penempatan"
                    label={'Penempatan'}
                    value={''}
                ></TextField>
                <TextField
                    disabled={true}
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                    value={''}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={''}
                ></DateSelector>
                <RadioSingle
                    disabled={true}
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                ></RadioSingle>
                <TextField
                    disabled={true}
                    id="surchargeAction"
                    label={'No. KWSP'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noSOCSO"
                    label={'No. SOCSO'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noCukai"
                    label={'No. Cukai (LHDN)'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="bank"
                    label={'Bank'}
                    value={'Maybank Berhad'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noAkaun"
                    label={'No. Akaun'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="program"
                    label={'Program'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kelayakanCuti"
                    label={'Kelayakan Cuti'}
                    value={''}
                ></TextField>

                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    selectedDate={''}
                ></DateSelector>

                <AccordianField
                    disabled={!disabled}
                    label="Sejarah Lantikan Jawatan LKIM"
                    header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                >
                    <!-- {#each data.record.currentEmployeePositionHistory as item, i}
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
                    {/each} -->
                </AccordianField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    selectedDate={''}
                ></DateSelector>
                <TextField
                    disabled={true}
                    id="pemangkuanSekarang"
                    label={'Pemangkuan Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="tanggungKerjaSekarang"
                    label={'Tanggung Kerja Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="skimPencen"
                    label={'Skim Pencen'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kenaikanGajiAkhir"
                    label={'Kenaikan Gaji Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kenaikanPangkatAkhir"
                    label={'Kenaikan Pangkat Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="bulanKGT"
                    label={'Bulan KGT'}
                    value={'-'}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Bersara'}
                    selectedDate={''}
                ></DateSelector>
                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <TextField
                            disabled={true}
                            id="tarikhBerkuatkuasa"
                            label={'Tarikh Berkuatkuasa'}
                            value={'12/12/2021'}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="tanggaGaji"
                            label={'Tangga Gaji'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={true}
                            id="itka"
                            label={'ITKA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={true}
                            id="itp"
                            label={'ITP'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={true}
                            id="epw"
                            label={'EPW'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={true}
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
        <StepperContentHeader title="Butiran Surcaj"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperButiranSurcaj"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperButiranSurcaj"
                    class="flex w-full flex-col gap-2"
                    use:butiranSurcajEnhance
                    method="POST"
                >
                    <DateSelector
                        hasError={$butiranSurcajErrors.reportedDate
                            ? true
                            : false}
                        name="reportedDate"
                        handleDateChange
                        label="Tarikh Dilaporkan"
                        bind:selectedDate={$butiranSurcajForm.reportedDate}
                    ></DateSelector>
                    {#if $butiranSurcajErrors.reportedDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$butiranSurcajErrors.reportedDate[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$butiranSurcajErrors.surchargeAction
                            ? true
                            : false}
                        name="surchargeAction"
                        label={'Tindakan Surcaj'}
                        type="text"
                        bind:value={$butiranSurcajForm.surchargeAction}
                    ></TextField>

                    {#if $butiranSurcajErrors.surchargeAction}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$butiranSurcajErrors.surchargeAction[0]}</span
                        >
                    {/if}
                    <LongTextField
                        hasError={$butiranSurcajErrors.remark ? true : false}
                        name="remark"
                        label="Ulasan"
                        bind:value={$butiranSurcajForm.remark}
                    />
                    {#if $butiranSurcajErrors.remark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$butiranSurcajErrors.remark[0]}</span
                        >
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperButiranMesyuarat"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="FormStepperButiranMesyuarat"
                class="flex w-full flex-col gap-2"
                use:butiranMesyuaratEnhance
                method="POST"
            >
                <DropdownSelect
                    hasError={$butiranMesyuaratErrors.meetingDropdown
                        ? true
                        : false}
                    dropdownType="label-left-full"
                    id="meetingDropdown"
                    label="Nama dan Bil Mesyuarat"
                    bind:value={$butiranMesyuaratErrors.meetingDropdown}
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                ></DropdownSelect>
                {#if $butiranMesyuaratErrors.meetingDropdown}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors.meetingDropdown[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={$butiranMesyuaratErrors.meetingDate
                        ? true
                        : false}
                    name="meetingDate"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={$butiranMesyuaratForm.meetingDate}
                ></DateSelector>
                {#if $butiranMesyuaratErrors.meetingDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors.meetingDate[0]}</span
                    >
                {/if}
                <TextField
                    hasError={$butiranMesyuaratErrors.surchargeAmount
                        ? true
                        : false}
                    name="surchargeAmount"
                    label={'Jumlah Bayaran (RM)'}
                    type="number"
                    bind:value={$butiranMesyuaratErrors.surchargeAmount}
                ></TextField>

                {#if $butiranMesyuaratErrors.surchargeAmount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors.surchargeAmount[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={$butiranMesyuaratErrors.paymentDropdown
                        ? true
                        : false}
                    dropdownType="label-left-full"
                    id="paymentDropdown"
                    label="Cara Bayaran Balik"
                    bind:value={$butiranMesyuaratErrors.paymentDropdown}
                    options={[
                        { value: '1', name: 'Tunai' },
                        { value: '2', name: 'Atas Talian' },
                    ]}
                ></DropdownSelect>
                {#if $butiranMesyuaratErrors.paymentDropdown}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors.paymentDropdown[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={$butiranMesyuaratErrors.paymentPeriodDropdown
                        ? true
                        : false}
                    dropdownType="label-left-full"
                    id="paymentPeriodDropdown"
                    label="Tempoh Bayaran Balik (bulan)"
                    bind:value={$butiranMesyuaratErrors.paymentPeriodDropdown}
                    options={[
                        { value: '1', name: '3' },
                        { value: '2', name: '6' },
                    ]}
                ></DropdownSelect>
                {#if $butiranMesyuaratErrors.paymentPeriodDropdown}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors
                            .paymentPeriodDropdown[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={$butiranMesyuaratErrors.effectiveDate
                        ? true
                        : false}
                    name="effectiveDate"
                    handleDateChange
                    label="Tarikh Berkuatkuasa"
                    bind:selectedDate={$butiranMesyuaratForm.effectiveDate}
                ></DateSelector>
                {#if $butiranMesyuaratErrors.effectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$butiranMesyuaratErrors.effectiveDate[0]}</span
                    >
                {/if}
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
