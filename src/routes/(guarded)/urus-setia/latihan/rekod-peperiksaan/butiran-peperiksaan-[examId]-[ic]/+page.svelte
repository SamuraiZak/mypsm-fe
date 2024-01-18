<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions.js';
    import { Tooltip } from 'flowbite-svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _secretaryExaminationResultSchema,
        _submitSecretaryExaminationResultForm,
    } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    let activeStepper = 0;
    let disabled = true;
    let selectedCertify: any = '-';
    let selectedExamResult: any = '-';

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
    const results: RadioOption[] = [
        {
            value: 'pass',
            label: 'LULUS',
        },
        {
            value: 'fail',
            label: 'GAGAL',
        },
        {
            value: 'absent',
            label: 'TIDAK HADIR',
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
    const { form, errors, enhance } = superForm(
        data.secretaryExaminationResultForm,
        {
            SPA: true,
            validators: _secretaryExaminationResultSchema,
            onSubmit() {
                _submitSecretaryExaminationResultForm($form);
                console.log("HANCURKANLAH INGATAN KU")
            },
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda henda keluar dari laman ini?',
        },
    );
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM - {data
            .record.currentExam.exam.examTitle}"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../rekod-peperiksaan');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper
    activeIndex={activeStepper}
    dataId="ID: {data.record.currentExam.candidateEmpNumber}"
    dataStatus="Status: {data.record.currentExam.status}"
>
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
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={true}
                    id="gredSemasa"
                    label={'Gred Semasa'}
                    value={data.record.currentEmployeeGrade.code}
                ></TextField>
                <TextField
                    disabled={true}
                    id="jawatan"
                    label={'Jawatan'}
                    value={data.record.currentEmployeePosition.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="penempatan"
                    label={'Penempatan'}
                    value={data.record.currentEmployeeService.placement}
                ></TextField>
                <TextField
                    disabled={true}
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                    value={data.record.currentEmployeeServiceType.name}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <RadioSingle
                    disabled={true}
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                    bind:userSelected={isKWSP}
                ></RadioSingle>
                <TextField
                    disabled={true}
                    id="noKWSP"
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
                    value={getEmployeeLeave(
                        data.record.currentEmployee.employeeNumber,
                    )}
                ></TextField>

                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
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
                    disabled={true}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
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
        <StepperContentHeader title="Maklumat Peperiksaan LKIM Diambil"
        ></StepperContentHeader>

        <StepperContentBody>
            <form action="" class="flex w-full flex-col gap-2">
                <DropdownSelect
                    {disabled}
                    dropdownType="label-left-full"
                    name="exam-type-dropdown"
                    label="Jenis Peperiksaan"
                    bind:value={data.record.currentExam.exam.examType}
                    options={examTypes}
                ></DropdownSelect>
                <TextField
                    {disabled}
                    name="exam-title"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={data.record.currentExam.exam.examTitle}
                />
                <DateSelector
                    {disabled}
                    name="appl-open-date"
                    handleDateChange
                    label="Tarikh Mula Permohonam"
                    bind:selectedDate={data.record.currentExam.exam
                        .examApplicationOpenDate}
                ></DateSelector>
                <DateSelector
                    {disabled}
                    name="appl-close-date"
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={data.record.currentExam.exam
                        .examApplicationCloseDate}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="exam-date"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:value={data.record.currentExam.exam.examDate}
                />
                <LongTextField
                    {disabled}
                    name="exam-location"
                    label="Lokasi Peperiksaan"
                    bind:value={data.record.currentExam.exam.examLocation}
                />
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Urus Setia Latihan"
        ></StepperContentHeader>

        <StepperContentBody>
            <SectionHeader
                color="system-primary"
                title="Sistem akan menjana surat panggilan peperiksaan serta maklumat berkaitan lokasi, tarikh bagi peperiksaan dan menghantar surat ke email kakitangan."
            ></SectionHeader>
            <form
                action="examinationResultForm"
                use:enhance
                method="POST"
                class="flex w-full flex-col gap-2"
            >
                <LongTextField
                    hasError={$errors.secretaryRemark ? true : false}
                    name="secretaryRemark"
                    label="Tindakan / Ulasan"
                    labelBlack
                    placeholder="Boleh diteruskan"
                    bind:value={$form.secretaryRemark}
                ></LongTextField>
                {#if $errors.secretaryRemark}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.secretaryRemark}</span
                    >
                {/if}
                <RadioSingle
                    {options}
                    name="secretaryResult"
                    legend="Keputusan"
                    bind:userSelected={$form.secretaryResult}
                />
                {#if $errors.secretaryResult}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.secretaryResult}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Peperiksaan"
            ><TextIconButton
                primary
                label="Simpan"
                form="examinationResultForm"
                
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >

        <StepperContentBody>
            <form
                action="examinationResultForm"
                use:enhance
                method="POST"
                class="flex w-full flex-col gap-2"
            >
                <SectionHeader
                    color="system-primary"
                    title="Tetapan keputusan Panel Pemeriksa:"
                ></SectionHeader>
                <TextField
                    {disabled}
                    name="candidate-name-title"
                    label="Nama Kakitangan"
                    type="text"
                    bind:value={data.record.currentExam.candidate}
                />
                <TextField
                    {disabled}
                    name="candidate-number-title"
                    label="No. Pekerja"
                    type="text"
                    bind:value={data.record.currentExam.candidateEmpNumber}
                />
                <TextField
                    {disabled}
                    name="exam-title"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={data.record.currentExam.exam.examTitle}
                />
                <TextField
                    {disabled}
                    name="exam-title"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={data.record.currentExam.exam.examDate}
                />
                <RadioSingle
                    name="secretaryExaminationResult"
                    options={results}
                    legend="Keputusan Peperiksaan"
                    bind:userSelected={$form.secretaryExaminationResult}
                />
                {#if $errors.secretaryExaminationResult}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.secretaryExaminationResult}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
