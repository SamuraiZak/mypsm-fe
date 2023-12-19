<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { currencyFormatter } from '$lib/service/services';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge, Button, Checkbox, Tooltip } from 'flowbite-svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions.js';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import ChargesFormGroup from '$lib/components/integriti-charges-form-group/ChargesFormGroup.svelte';
    import { punishmentMeetingNames } from '$lib/mocks/mesyuarat/integrityMeetingName.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgLawScale from '$lib/assets/svg/SvgLawScale.svelte';
    import PunishmentFormGroup from '$lib/components/integriti-charges-form-group/PunishmentFormGroup.svelte';
    import AddPunishmentFromGroup from '$lib/components/integriti-charges-form-group/AddPunishmentFromGroup.svelte';
    export let data;
    let activeStepper = 0;
    let disabled = true;
    let isCompleted: boolean = true;
    let selectedProceedingType: string =
        data.record.currentProceeding.disciplinaryProceedingType;
    let selectedSuspensionType: string = 'suspension-criminal-offence';
    let suspensionStartDate: string = '2024-01-02';
    let suspensionCrimeOffenceStartDate: string = '2024-01-13';
    let crimeOffenceSuspendedStartDate: string = '2024-04-05';
    let updateCrimeOffenceInfo: boolean = false;
    let updateAppealInfo: boolean = false;
    let updateCrimeOffenceAppealSuspendedInfo: boolean = false;
    let crimeOffenceFollowThrough: string = '';
    let crimeOffenceAppealSuspendedFollowThrough: boolean = false;
    let appealHasBeenMade: boolean = false;
    let appealMeetingResult: string = '';
    let appealFollowUpResult: string = '';

    function calculateTwoMonthsLater(initialDate: string) {
        // Parse the initial date string to create a Date object
        const startDate = new Date(initialDate);

        // Calculate the date two months later
        const twoMonthsLater = new Date(startDate);
        twoMonthsLater.setMonth(startDate.getMonth() + 2);

        // Format the result as a string (you can adjust the format as needed)
        const result = twoMonthsLater.toISOString().split('T')[0];

        return result;
    }

    const meetingOptions: RadioOption[] = [
        {
            value: 'guilty',
            label: 'BERSALAH',
        },
        {
            value: 'innocent',
            label: 'TIDAK BERSALAH',
        },
    ];
    const appealMeetingOptions: RadioOption[] = [
        {
            value: 'pass',
            label: 'LULUS',
        },
        {
            value: 'fail',
            label: 'TIDAK LULUS',
        },
    ];
    const appealFollowUpOptions: RadioOption[] = [
        {
            value: 'reEvaluate',
            label: 'Hantar Balik Kes kepada JKTT untuk Dipertimbangkan Semula',
        },
        {
            value: 'noChange',
            label: 'Mengesahkan Keputusan JKTT',
        },
        {
            value: 'lightenPunishment',
            label: 'Mengesahkan Keputusan JKTT tetapi Mengubah kepada Hukuman yang Lebih Ringan',
        },
    ];
    let integrityDirectorResult: any = 'free';

    const integrityDirectorOptions: RadioOption[] = [
        {
            value: 'free',
            label: 'BEBAS',
        },
        {
            value: 'guilty',
            label: 'TIDAK BEBAS',
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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Prosiding Tatatertib"
        description="Rekod prosiding tatatertib {data.record.currentEmployee
            .name}"
    >
        {#if isCompleted || selectedProceedingType === 'charges'}
            <TextIconButton
                primary
                label="Maklumat Rayuan"
                onClick={() => {
                    updateAppealInfo = true;
                    activeStepper = 7;
                }}><SvgLawScale /></TextIconButton
            >
        {/if}
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
                            value={currencyFormatter(1234.56)}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                            value={currencyFormatter(1234.56)}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={true}
                            id="itka"
                            label={'ITKA'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={true}
                            id="itp"
                            label={'ITP'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={true}
                            id="epw"
                            label={'EPW'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={true}
                            id="cola"
                            label={'COLA'}
                            value={currencyFormatter(123.45)}
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
        <StepperContentHeader title="Jenis Prosiding"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meetings-dropdown"
                    label="Nama dan Bil Mesyuarat"
                    bind:value={selectedProceedingType}
                    options={[
                        { value: 'charges', name: 'Pertuduhan' },
                        {
                            value: 'suspension',
                            name: 'Tahan Kerja/Gantung Kerja',
                        },
                    ]}
                ></DropdownSelect>
            </div>
        </StepperContentBody>
    </StepperContent>
    {#if selectedProceedingType === 'charges'}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Pertuduhan"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={true}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={data.record.currentProceeding
                        .chargesMeetingDate}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meetings-dropdown"
                    label="Nama dan Bil Mesyuarat"
                    bind:value={data.record.currentProceeding
                        .chargesMeetingNumber}
                    options={meetings}
                ></DropdownSelect>
                <div class="my-5 h-fit w-full">
                    <hr />
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Senarai Pertuduhan"
                    ></SectionHeader>
                    <hr />
                    {#each Object.entries(data.record.currentProceeding.charges) as [groupId, group], index}
                        <div
                            class="flex w-full flex-row items-center gap-x-2.5 text-base"
                        >
                            <span class="w-4">{index + 1}.</span>
                            <ChargesFormGroup bind:group />
                        </div>
                    {/each}
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Pertuduhan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Integriti</b
                        >
                    </div>
                    {#if isCompleted}
                        <TextField
                            disabled
                            type="text"
                            id="integrity-director-name"
                            label="Nama"
                            value="Mohd Safwan Adam"
                        ></TextField>
                        <LongTextField
                            disabled
                            id="integrity-director-remark"
                            label="Tindakan/Ulasan"
                            value="bebas"
                        ></LongTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label
                                for="integrity-director-result"
                                class="w-[220px]">Keputusan</label
                            ><Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            >
                        </div>
                    {:else}
                        <TextField
                            disabled
                            type="text"
                            id="passer-name"
                            label="Nama"
                            value={'Azim Bin Karim'}
                        ></TextField>
                        <div class="text-sm text-system-primary">
                            <i class=""><li>● Menunggu keputusan...</li></i>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Penentuan
        Hukuman"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={true}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    bind:selectedDate={data.record.currentProceeding
                        .proceedingMeetingDate}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-number-dropdown"
                    label="Bil Mesyuarat"
                    bind:value={data.record.currentProceeding
                        .proceedingMeetingNumber}
                    options={meetings}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-name-dropdown"
                    label="Nama Mesyuarat"
                    bind:value={data.record.currentProceeding
                        .proceedingMeetingName}
                    options={punishmentMeetingNames}
                ></DropdownSelect>

                <div class="my-5 h-fit w-full border-b border-t">
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Keputusan Mesyuarat Prosiding Penentuan Hukuman"
                    ></SectionHeader>
                </div>

                {#each Object.entries(data.record.currentProceeding.proceedingMeetingResult) as [key, result], index}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                    >
                        <SectionHeader
                            color="system-primary"
                            title="Pertuduhan #{index + 1}: {result.chargeName}"
                        ></SectionHeader>
                        <hr />
                        <RadioSingle
                            disabled={true}
                            options={meetingOptions}
                            legend={'Keputusan Mesyuarat'}
                            userSelected={result.meetingResult}
                        ></RadioSingle>

                        <hr />

                        <div class="mx-2.5">
                            <SectionHeader title="Penentuan Hukuman"
                            ></SectionHeader>

                            <PunishmentFormGroup {key} {result} />
                        </div>
                    </div>
                {/each}
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Hukuman"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Integriti</b
                        >
                    </div>
                    {#if isCompleted}
                        <TextField
                            disabled
                            type="text"
                            id="integrity-director-name"
                            label="Nama"
                            value="Mohd Safwan Adam"
                        ></TextField>
                        <LongTextField
                            disabled
                            id="integrity-director-remark"
                            label="Tindakan/Ulasan"
                            value="bebas"
                        ></LongTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label
                                for="integrity-director-result"
                                class="w-[220px]">Keputusan</label
                            ><Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            >
                        </div>
                    {:else}
                        <TextField
                            disabled
                            type="text"
                            id="passer-name"
                            label="Nama"
                            value={'Azim Bin Karim'}
                        ></TextField>
                        <div class="text-sm text-system-primary">
                            <i class=""><li>● Menunggu keputusan...</li></i>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Mesyuarat Keputusan Jawatankuasa Rayuan Tatatertib"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-row items-center">
                    <label
                        class="w-[220px] text-base font-bold italic"
                        for="appeal-chosen"
                        >Rayuan Telah Dibuat
                    </label>
                    <Checkbox bind:checked={appealHasBeenMade} />
                </div>
                {#if appealHasBeenMade}
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Mesyuarat"
                    />
                    <DateSelector
                        disabled={false}
                        labelBlack={true}
                        label="Tarikh Mesyuarat"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                    <DropdownSelect
                        disabled={false}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="meeting-number-dropdown"
                        label="Bil Mesyuarat"
                        value={''}
                        options={meetings}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={false}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="meeting-name-dropdown"
                        label="Nama Mesyuarat"
                        value={''}
                        options={punishmentMeetingNames}
                    ></DropdownSelect>

                    <RadioSingle
                        disabled={false}
                        options={appealMeetingOptions}
                        legend={'Keputusan Mesyuarat'}
                        bind:userSelected={appealMeetingResult}
                    ></RadioSingle>

                    {#if appealMeetingResult === 'pass'}
                        <SectionHeader
                            color="system-primary"
                            title="Susulan Rayuan"
                        />
                        <RadioSingle
                            isVertical
                            disabled={false}
                            options={appealFollowUpOptions}
                            legend={'Keputusan Rayuan'}
                            bind:userSelected={appealFollowUpResult}
                        ></RadioSingle>
                    {/if}

                    <hr />

                    {#if appealFollowUpResult === 'lightenPunishment'}
                        <div
                            class="mt-5 flex w-full flex-col gap-2.5 border-b border-t"
                        >
                            <SectionHeader
                                title="Sila Pilih Hukuman - Hukuman Yang Dikenakan"
                            ></SectionHeader>
                            {#each Object.entries(data.record.currentProceeding.proceedingMeetingResult) as [key, result], index}
                                <div
                                    class="rounded-[3px] border border-system-primary p-2.5"
                                >
                                    <SectionHeader
                                        color="system-primary"
                                        title="Pertuduhan #{index +
                                            1}: {result.chargeName}"
                                    ></SectionHeader>
                                    <hr />

                                    <div class="mx-2.5">
                                        <AddPunishmentFromGroup />
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                {/if}
            </StepperContentBody>
        </StepperContent>
    {/if}
    {#if selectedProceedingType === 'suspension'}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Tatatertib"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={true}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    selectedDate={'2023-11-23'}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-number-dropdown"
                    label="Bil Mesyuarat"
                    value={'2'}
                    options={meetings}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-name-dropdown"
                    label="Nama Mesyuarat"
                    value={'non-demotion'}
                    options={punishmentMeetingNames}
                ></DropdownSelect>

                <RadioSingle
                    disabled={true}
                    options={meetingOptions}
                    legend={'Keputusan Mesyuarat'}
                    userSelected={'guilty'}
                ></RadioSingle>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        title="Maklumat Keputusan Mesyuarat Prosiding Tatatertib"
                    ></SectionHeader>

                    <DropdownSelect
                        disabled={isCompleted}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="suspension-type-dropdown"
                        id="suspension-type-dropdown"
                        label="Jenis Prosiding Tahan Kerja"
                        bind:value={selectedSuspensionType}
                        options={[
                            {
                                value: 'suspension-investigation',
                                name: 'Tahan Kerja - Penyiasatan',
                            },
                            {
                                value: 'suspension-criminal-offence',
                                name: 'Tahan Kerja - Prosiding Jenayah',
                            },
                        ]}
                    ></DropdownSelect>

                    <form action="">
                        <div class="mb-2.5 flex w-full flex-col gap-2.5">
                            {#if selectedSuspensionType === 'suspension-investigation'}
                                <SectionHeader
                                    color="system-primary"
                                    title="Butiran Tahan Kerja - Tujuan Penyiasatan"
                                ></SectionHeader>
                                <DateSelector
                                    disabled={true}
                                    labelBlack={true}
                                    name="start-date-suspenion-investigation"
                                    label="Tarikh Mula"
                                    bind:selectedDate={suspensionStartDate}
                                    handleDateChange={() => {}}
                                />
                                <DateSelector
                                    disabled={true}
                                    labelBlack={true}
                                    name="end-date-suspenion-investigation"
                                    label="Tarikh Akhir - 2 Bulan Dari Tarikh Mula"
                                    selectedDate={calculateTwoMonthsLater(
                                        suspensionStartDate,
                                    )}
                                    handleDateChange={() => {}}
                                />
                                <TextField
                                    disabled={true}
                                    type="text"
                                    id="entitled-emolument-suspenion-investigation"
                                    label="Emolumen Yang Layak Diterima"
                                    value={'100%'}
                                ></TextField>
                            {/if}
                            {#if selectedSuspensionType === 'suspension-criminal-offence'}
                                <SectionHeader
                                    color="system-primary"
                                    title="Butiran Tahan Kerja - Prosiding Jenayah"
                                >
                                    {#if data.record.currentProceeding.status === 'Baru'}
                                        {#if !updateCrimeOffenceInfo}
                                            <TextIconButton
                                                primary
                                                label="Kemaskini"
                                                onClick={() => {
                                                    updateCrimeOffenceInfo = true;
                                                }}><SvgEdit /></TextIconButton
                                            >
                                        {:else if updateCrimeOffenceInfo}
                                            <TextIconButton
                                                label="Batal"
                                                onClick={() => {
                                                    updateCrimeOffenceInfo = false;
                                                }}><SvgXMark /></TextIconButton
                                            >
                                            <TextIconButton
                                                primary
                                                label="Simpan"
                                                onClick={() => {}}
                                                ><SvgCheck /></TextIconButton
                                            >
                                        {/if}
                                    {/if}
                                </SectionHeader>

                                <DateSelector
                                    disabled={true}
                                    labelBlack={true}
                                    name="start-date-suspenion-criminal-offence"
                                    label="Tarikh Mula"
                                    bind:selectedDate={suspensionCrimeOffenceStartDate}
                                    handleDateChange={() => {}}
                                />
                                <TextField
                                    disabled={true}
                                    type="text"
                                    id="entitled-emolument-criminal-offence"
                                    label="Emolumen Yang Layak Diterima"
                                    value={'50%'}
                                ></TextField>
                                {#if updateCrimeOffenceInfo || data.record.currentProceeding.status !== 'Baru' || crimeOffenceFollowThrough !== ''}
                                    <RadioSingle
                                        disabled={data.record.currentProceeding
                                            .status !== 'Baru' ||
                                            !updateCrimeOffenceInfo}
                                        options={[
                                            {
                                                value: 'end-suspension',
                                                label: 'Batal Tahan Kerja',
                                            },

                                            {
                                                value: 'punishment-proceeding',
                                                label: 'Prosiding Penentuan Hukuman',
                                            },
                                            {
                                                value: 'appeal',
                                                label: 'Rayuan Dikemukakan',
                                            },
                                        ]}
                                        legend={'Susulan Prosiding Tahan Kerja'}
                                        bind:userSelected={crimeOffenceFollowThrough}
                                        onChange={() => {}}
                                    ></RadioSingle>
                                {/if}
                            {/if}
                        </div>
                    </form>
                </div>
                {#if crimeOffenceFollowThrough === 'appeal'}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                    >
                        <div class="mb-2.5 flex w-full flex-col gap-2.5">
                            <SectionHeader title="Butiran Gantung Kerja">
                                {#if data.record.currentProceeding.status === 'Baru'}
                                    {#if !updateCrimeOffenceAppealSuspendedInfo}
                                        <TextIconButton
                                            primary
                                            label="Kemaskini"
                                            onClick={() => {
                                                updateCrimeOffenceAppealSuspendedInfo = true;
                                            }}><SvgEdit /></TextIconButton
                                        >
                                    {:else if updateCrimeOffenceAppealSuspendedInfo}
                                        <TextIconButton
                                            label="Batal"
                                            onClick={() => {
                                                updateCrimeOffenceAppealSuspendedInfo = false;
                                            }}><SvgXMark /></TextIconButton
                                        >
                                        <TextIconButton
                                            primary
                                            label="Simpan"
                                            onClick={() => {}}
                                            ><SvgCheck /></TextIconButton
                                        >
                                    {/if}
                                {/if}
                            </SectionHeader>
                            <DateSelector
                                disabled={true}
                                labelBlack={true}
                                name="start-date-suspended"
                                label="Tarikh Mula"
                                selectedDate={crimeOffenceSuspendedStartDate}
                                handleDateChange={() => {}}
                            />
                            <TextField
                                disabled={true}
                                type="text"
                                id="entitled-emolument-suspended"
                                label="Emolumen Yang Layak Diterima"
                                value={'0%'}
                            ></TextField>
                            {#if updateCrimeOffenceAppealSuspendedInfo || data.record.currentProceeding.status !== 'Baru' || crimeOffenceAppealSuspendedFollowThrough}
                                <div class="flex w-full flex-row items-center">
                                    <label
                                        for="appeal"
                                        class="flex w-[220px] min-w-[220px] flex-row gap-2 text-sm font-medium italic text-system-primary"
                                    >
                                        Batal Gantung Kerja</label
                                    >
                                    <Checkbox
                                        color={updateCrimeOffenceAppealSuspendedInfo
                                            ? 'blue'
                                            : 'secondary'}
                                        disabled={data.record.currentProceeding
                                            .status !== 'Baru' ||
                                            !updateCrimeOffenceAppealSuspendedInfo}
                                        value="suspended-appeal-follow-through"
                                        bind:checked={crimeOffenceAppealSuspendedFollowThrough}
                                    />
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Tahan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Integriti</b
                        >
                    </div>
                    {#if isCompleted}
                        <TextField
                            disabled
                            type="text"
                            id="integrity-director-name"
                            label="Nama"
                            value="Mohd Safwan Adam"
                        ></TextField>
                        <LongTextField
                            disabled
                            id="integrity-director-remark"
                            label="Tindakan/Ulasan"
                            value="bebas"
                        ></LongTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label
                                for="integrity-director-result"
                                class="w-[220px]">Keputusan</label
                            ><Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            >
                        </div>
                    {:else}
                        <TextField
                            disabled
                            type="text"
                            id="passer-name"
                            label="Nama"
                            value={'Azim Bin Karim'}
                        ></TextField>
                        <div class="text-sm text-system-primary">
                            <i class=""><li>● Menunggu keputusan...</li></i>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>
