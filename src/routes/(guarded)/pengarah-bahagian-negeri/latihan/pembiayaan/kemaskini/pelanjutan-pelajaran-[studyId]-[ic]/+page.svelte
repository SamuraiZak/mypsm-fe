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
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { onMount } from 'svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox, Tooltip } from 'flowbite-svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockEmployeeAllowanceDocList } from '$lib/mocks/elaun/mockEmployeeAllowanceDocList.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions.js';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        _stepperSupportSettings,
        _submitFormStepperSupportSettings,
    } from './+page';

    export let data: PageData;

    let activeStepper = 0;
    let target: any;
    let selectedSupportResult: any = '-';

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
            value: 'support',
            label: 'SOKONG',
        },
        {
            value: 'unsupport',
            label: 'TIDAK SOKONG',
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

    onMount(() => {
        target = document.getElementById('fileInput');
    });

    //Evaluate Confirmation
    const {
        form: supportSettingsForm,
        errors: supportSettingsErrors,
        enhance: supportSettingsEnhance,
    } = superForm(data.stepperSupportSettings, {
        SPA: true,
        validators: _stepperSupportSettings,
        onSubmit() {
            _submitFormStepperSupportSettings($supportSettingsForm);
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
                goto('../../pembiayaan');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper
    activeIndex={activeStepper}
    dataId="ID: {data.record.currentApplication.candidateEmpNumber}"
    dataStatus="Status: {data.record.currentApplication.status}"
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
                            value={123.23}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                            value={123.23}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={true}
                            id="itka"
                            label={'ITKA'}
                            value={123.23}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={true}
                            id="itp"
                            label={'ITP'}
                            value={123.23}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={true}
                            id="epw"
                            label={'EPW'}
                            value={123.23}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={true}
                            id="cola"
                            label={'COLA'}
                            value={123.23}
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
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#each data.record.currentEmployeeEducations as edu}
                    <p class={stepperFormTitleClass}>
                        {edu.type}
                    </p>
                    <TextField
                        disabled={true}
                        id="sekolah"
                        label={'Sekolah'}
                        value={edu.instituteName}
                    ></TextField>
                    <TextField
                        disabled={true}
                        id="tahunHabis"
                        label={'Tahun'}
                        value={edu.completionYear}
                    ></TextField>
                    <TextField
                        disabled={true}
                        id="gredSekolah"
                        label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                        value={edu.finalGrade}
                    ></TextField>
                    {#if edu.type == 'Ijazah'}
                        <TextField
                            disabled={true}
                            id="bidang"
                            label={'Bidang'}
                            value={edu.course}
                        ></TextField>
                        <AccordianField
                            disabled={true}
                            label="Catatan"
                            header="Catatan"
                        >
                            {#each edu.remark as val, i}
                                <label
                                    for=""
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                    >{i + 1}. {val}</label
                                >
                            {/each}
                        </AccordianField>
                    {/if}
                {/each}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pelajaran Yang Akan Diikuti"
        ></StepperContentHeader>
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <DropdownSelect
                    disabled={true}
                    labelBlack={false}
                    dropdownType="label-left-full"
                    name="edu-level-dropdown"
                    label="Peringkat Kursus Pengajian"
                    bind:value={data.record.currentApplication.courseLevel}
                    options={examTypes}
                ></DropdownSelect>
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Nama Kursus Pengajian"
                    value={data.record.currentApplication.courseName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Nama IPTA"
                    value={data.record.currentApplication.instituteName}
                />
                <TextField
                    disabled={true}
                    labelBlack={false}
                    label="Institusi/Pusat Pembelajaran"
                    value={data.record.currentApplication.instituteCenter}
                />
                <TextField
                    disabled={true}
                    type="number"
                    labelBlack={false}
                    label="Tempoh Pengajian"
                    value={data.record.currentApplication.coursePeriod}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Tarikh Kemasukan Ke IPTA"
                    selectedDate={data.record.currentApplication
                        .courseStartDate}
                    handleDateChange={() => {}}
                />
                <DateSelector
                    disabled={true}
                    labelBlack={false}
                    label="Dijangka Tamat Pada"
                    selectedDate={data.record.currentApplication.courseEndDate}
                    handleDateChange={() => {}}
                />

                <div
                    class="my-2.5 flex w-full flex-row items-start text-sm text-txt-tertiary"
                >
                    <label for="study-type" class="w-[220px]"
                        >Jenis Pengajian</label
                    >
                    <span>
                        <ul class="list-inside space-y-2.5 text-txt-secondary">
                            <li>
                                <Checkbox disabled={true} value={'studyType'}
                                    >Pengajian Jarak Jauh</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'studyType'}
                                    >Pengajian Luar Kampus</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'studyType'}
                                    >Pengajian Separuh Masa</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'studyType'}
                                    >Pengajian Sepenuh Masa</Checkbox
                                >
                            </li>
                        </ul></span
                    >
                </div>
                <div
                    class="my-2.5 flex w-full flex-row items-start text-sm text-txt-tertiary"
                >
                    <label for="study-type" class="w-[220px]"
                        >Jenis Permohonan</label
                    >
                    <span>
                        <ul class="list-inside space-y-2.5 text-txt-secondary">
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Kebenaran Mengikuti Pengajian</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Pelepasan Lembaga/Cuti Tanpa Rekod</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Pembiayaan Pelajaran Sahaja</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true} value={'value'}
                                    >Cuti Belajar Bergaji Penuh Dengan
                                    Pembiayaan</Checkbox
                                >
                            </li>
                            <li>
                                <Checkbox disabled={true}
                                    >Cuti Belajar Separuh Gaji Dengan Pembiayaan</Checkbox
                                >
                            </li>
                        </ul></span
                    >
                </div>
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
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Tetapan Sokongan (Pengarah Negeri/Bahagian)"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperSupportSettings"
                onClick={() => console.log('hehehhe')}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody
                ><form
                    id="FormStepperSupportSettings"
                    class="flex w-full flex-col gap-2"
                    use:supportSettingsEnhance
                    method="POST"
                >
                    {#if data.record.currentApplication.status !== 'Baru'}
                        <div
                            class="mb-2.5 flex w-full flex-row items-center text-sm italic text-system-primary"
                        >
                            <label for="file-download" class="w-[220px]"
                                >Menunggu keputusan mesyuarat...</label
                            >
                        </div>
                    {:else}
                        <SectionHeader
                            color="system-primary"
                            title="Maklumat Kumpulan Mesyuarat"
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
                                    <li>Surat Lulus Permohonan.</li>
                                </ul>
                            </span>
                        </div>
                        <LongTextField
                            hasError={!!$supportSettingsErrors.actionRemark}
                            name="actionRemark"
                            label="Tindakan / Ulasan"
                            bind:value={$supportSettingsForm.actionRemark}
                        />
                        {#if $supportSettingsErrors.actionRemark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supportSettingsErrors.actionRemark}</span
                            >
                        {/if}
                        <RadioSingle
                            options={results}
                            name="resultOption"
                            legend="Keputusan"
                            bind:userSelected={$supportSettingsForm.resultOption}
                        ></RadioSingle>
                        {#if $supportSettingsErrors.resultOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supportSettingsErrors.resultOption}</span
                            >
                        {/if}
                        <div
                            class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            <TextField
                                disabled
                                type="text"
                                id="passer-name"
                                label="Nama"
                                value={'Azim Bin Karim'}
                            ></TextField>
                            <div class="text-sm text-system-primary">
                                <i class=""
                                    ><li>
                                        ● Menunggu keputusan daripada Pengarah
                                        Bahagian/Negeri.
                                    </li></i
                                >
                            </div>
                        </div>
                    {/if}
                </form></StepperContentBody
            >
        </div>
    </StepperContent>
</Stepper>
<Toaster />
