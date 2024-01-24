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
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge, Checkbox, Tooltip } from 'flowbite-svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockEmployeeAllowanceDocList } from '$lib/mocks/elaun/mockEmployeeAllowanceDocList.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions.js';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        _stepperTuitionFeeFundingClaimApplicationResults,
        _submitFormStepperTuitionFeeFundingClaimApplicationResults,
    } from './+page';
    let activeStepper = 0;

    export let data: PageData;

    let courseSecretaryResult: string = 'certified';
    let isCompleted: boolean =
        data.record.currentStudyAllowanceApplication.status ===
        'SAH - Urus Setia Latihan';

    const courseSecretaryOptions: RadioOption[] = [
        {
            value: 'certified',
            label: 'SAH',
        },
        {
            value: 'not certified',
            label: 'TIDAK SAH',
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

    let currentEmployeeUploadedDocuments = mockEmployeeAllowanceDocList.filter(
        (document) => {
            return document.id === 1;
        },
    )!;

    //Evaluate Confirmation
    const {
        form: tuitionFeeFundingClaimApplicationResultsForm,
        errors: tuitionFeeFundingClaimApplicationResultsErrors,
        enhance: tuitionFeeFundingClaimApplicationResultsEnhance,
    } = superForm(data.stepperTuitionFeeFundingClaimApplicationResults, {
        SPA: true,
        validators: _stepperTuitionFeeFundingClaimApplicationResults,
        onSubmit() {
            _submitFormStepperTuitionFeeFundingClaimApplicationResults(
                $tuitionFeeFundingClaimApplicationResultsForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Pembiayaan Pembelajaran"
        description="Sila isi borang permohonan pembiayaan pembelajaran di bawah dengan butiran yang tepat dan lengkap."
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../tuntutan-yuran');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper
    activeIndex={activeStepper}
    dataId="ID: {data.record.currentStudyAllowanceApplication
        .candidateEmpNumber}"
    dataStatus="Status: {data.record.currentStudyAllowanceApplication.status}"
>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    disabled={true}
                    id="noPerkeja"
                    label={'No. Pekerja'}
                    value={data.record.currentEmployee.employeeNumber}
                ></TextField>
                <TextField
                    disabled={true}
                    id="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    disabled={true}
                    id="namaPenuh"
                    label={'Nama Penuh'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="namaLain"
                    label={'Nama Lain'}
                    value={data.record.currentEmployee.alternativeName}
                ></TextField>
                <TextField
                    disabled={true}
                    id="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployee.isMalaysian,
                    )}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Lahir'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployee.birthDate,
                    ).toString()}
                ></DateSelector>
                <TextField
                    disabled={true}
                    id="tempatLahir"
                    label={'Tempat Lahir'}
                    value={data.record.currentEmployeeBirthState.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="warganegara"
                    label={'Warganegara'}
                    value={data.record.currentEmployee.isMalaysian
                        ? 'Malaysia'
                        : 'Bukan'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="bangsa"
                    label={'Bangsa'}
                    value={data.record.currentEmployeeRace.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="agama"
                    label={'Agama'}
                    value={data.record.currentEmployeeReligion.name}
                ></TextField>
                <TextField
                    disabled={true}
                    id="jantina"
                    label={'Jantina'}
                    value={data.record.currentEmployee.gender}
                ></TextField>
                <TextField
                    disabled={true}
                    id="status"
                    label={'Status'}
                    value={data.record.currentEmployee.marital}
                ></TextField>
                <TextField
                    disabled={true}
                    id="emel"
                    label={'Emel'}
                    value={data.record.currentEmployee.email}
                ></TextField>
                <LongTextField
                    disabled={true}
                    id="alamatRumah"
                    label={'Alamat Rumah'}
                    value={data.record.currentEmployee.homeAddress}
                ></LongTextField>
                <LongTextField
                    disabled={true}
                    id="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={data.record.currentEmployee.mailAddress}
                ></LongTextField>
                <TextField
                    disabled={true}
                    id="perumahan"
                    label={'Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    value={'-'}
                ></TextField>
                <RadioSingle
                    disabled={true}
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
                    disabled={true}
                    legend={'Perhubungan Dengan Kakitangan LKIM'}
                    bind:userSelected={isInRelationshipWithLKIMStaff}
                ></RadioSingle>
                {#if isInRelationshipWithLKIMStaff === 'true'}
                    <TextField
                        disabled={true}
                        id="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        value={data.record.currentEmployeeSpouseEmployeeInfo
                            ?.employeeNumber}
                    ></TextField>
                    <TextField
                        disabled={true}
                        id="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.name}
                    ></TextField>
                    <TextField
                        disabled={true}
                        id="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.position}
                    ></TextField>
                    <TextField
                        disabled={true}
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
                    disabled={true}
                    label="Sejarah Lantikan Jawatan LKIM"
                    header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                >
                    {#each data.record.currentEmployeePositionHistory as item, i}
                        <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
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
        <StepperContentHeader title="Maklumat Pembelajaran"
        ></StepperContentHeader>
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    disabled={true}
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="edu-level-dropdown"
                    label="Peringkat Kursus Pengajian"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .courseLevel}
                    options={[
                        { value: 'diploma', name: 'Diploma' },
                        {
                            value: 'degree',
                            name: 'Ijazah Sarjana Muda',
                        },
                        { value: 'master', name: 'Ijazah' },
                        { value: 'phd', name: 'Doktor Falsafah' },
                    ]}
                ></DropdownSelect>
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Nama Kursus Pengajian"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .courseName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Nama IPTA"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .instituteName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Institusi/Pusat Pembelajaran"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .instituteCenter}
                />
                <TextField
                    disabled={true}
                    type="number"
                    labelBlack={false}
                    label="Tempoh Pengajian"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .coursePeriod}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Tarikh Kemasukan Ke IPTA"
                    bind:selectedDate={data.record
                        .currentStudyAllowanceApplication.courseStartDate}
                    handleDateChange={() => {}}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Dijangka Tamat Pada"
                    bind:selectedDate={data.record
                        .currentStudyAllowanceApplication.courseEndDate}
                    handleDateChange={() => {}}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Keputusan Akhir (CGPA)"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .finalResult}
                />
                <DropdownSelect
                    disabled={true}
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="claim-semester-dropdown"
                    label="Tuntutan Untuk Semester"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .claimSemester}
                    options={[
                        { value: '4', name: '4' },
                        { value: '5', name: '5' },
                        { value: '6', name: '6' },
                    ]}
                ></DropdownSelect>

                <TextField
                    disabled={true}
                    type="number"
                    labelBlack={false}
                    label="Jumlah Tuntutan (RM)"
                    bind:value={data.record.currentStudyAllowanceApplication
                        .claimAmount}
                />
            </StepperContentBody>
        </div>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"></StepperContentHeader>
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <!-- DOCUMENTS -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                    >
                        Fail-fail yang dimuat naik:
                    </p>

                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent><StepperContent>
        <StepperContentHeader
            title="Keputusan Permohonan Tuntutan Pembiayaan Yuran Pengajian"
        >
            {#if !isCompleted}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperTuitionFeeFundingClaimApplicationResults"
                    onClick={() => console.log('hehehhe')}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}</StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody
                ><form
                    id="FormStepperTuitionFeeFundingClaimApplicationResults"
                    class="flex w-full flex-col gap-2"
                    use:tuitionFeeFundingClaimApplicationResultsEnhance
                    method="POST"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Pengesahan Urus Setia Latihan"
                    />
                    <div
                        class="mb-2.5 flex w-full flex-row items-center text-sm italic"
                    >
                        <label for="file-download" class="w-[220px]"
                            >Borang - borang berkaitan yang akan dijana
                            sekiranya lulus:</label
                        >
                        <span>
                            <ul
                                class="list-inside list-decimal text-txt-secondary"
                            >
                                <li>Surat Surat Arahan Bayaran.</li>
                            </ul>
                        </span>
                    </div>
                    <!-- <LongTextField
                        disabled={isCompleted}
                        labelBlack={false}
                        name="meeting-remark"
                        label="Tindakan/Ulasan"
                        value={'layak'}
                    />
                    <RadioSingle
                        disabled={isCompleted}
                        labelBlack={false}
                        options={courseSecretaryOptions}
                        legend="Keputusan"
                        bind:userSelected={courseSecretaryResult}
                    /> -->
                    <LongTextField
                        disabled={isCompleted}
                        hasError={!!$tuitionFeeFundingClaimApplicationResultsErrors.actionRemark}
                        name="actionRemark"
                        label="Tindakan / Ulasan"
                        bind:value={$tuitionFeeFundingClaimApplicationResultsForm.actionRemark}
                    />
                    {#if $tuitionFeeFundingClaimApplicationResultsErrors.actionRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$tuitionFeeFundingClaimApplicationResultsErrors.actionRemark}</span
                        >
                    {/if}
                    <RadioSingle
                        disabled={isCompleted}
                        options={courseSecretaryOptions}
                        name="resultOption"
                        legend="Keputusan"
                        bind:userSelected={$tuitionFeeFundingClaimApplicationResultsForm.resultOption}
                    ></RadioSingle>
                    {#if $tuitionFeeFundingClaimApplicationResultsErrors.resultOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$tuitionFeeFundingClaimApplicationResultsErrors
                                .resultOption}</span
                        >
                    {/if}
                    {#if isCompleted}
                        <div class="flex w-full flex-row items-center">
                            <hr />
                            <label
                                for="file-download"
                                class="w-[220px] text-base text-system-primary"
                                >Cetak Surat Permohonan:</label
                            >
                            <IconButton><SvgPdf size="24" /></IconButton>
                            <hr />
                        </div>
                    {/if}
                </form></StepperContentBody
            >
        </div>
    </StepperContent>
</Stepper>
<Toaster />
