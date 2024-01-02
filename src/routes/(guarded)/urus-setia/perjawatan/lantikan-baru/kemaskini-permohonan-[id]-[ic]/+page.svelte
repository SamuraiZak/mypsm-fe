<script lang="ts">
    // Importing external components and libraries
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import { goto } from '$app/navigation';
    // import MaklumatPeribadi from './forms/MaklumatPeribadi.svelte';
    // import MaklumatAkademik from './forms/MaklumatAkademik.svelte';

    // let id: string = '93699';
    // let status: string = 'Baru';

    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Badge, Tooltip } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatKegiatanTable } from '$lib/mocks/profil/maklumat-kegiatan-keahlian';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    export let data;
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        employeeLists = data.record.data.map((staff) => ({
            value: staff,
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });

    // export let activeStepper = 0;
    // export let isEditing: boolean = false;
    export let disabled: boolean = true;

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let passerResult: string = 'passed';

    let isCertified: string = 'true';
    const certifyOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'SAH',
        },
        {
            value: 'false',
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
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function getDurationYear(startDate: string, endDate: string) {
        let start = new Date(dateConvertor(startDate));
        let end = new Date(dateConvertor(endDate));
        let duration = end.getTime() - start.getTime();
        let year = duration / (1000 * 3600 * 24 * 365);
        return Math.ceil(year);
    }
    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    // Stepper Classes

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let isExPoliceSoldier = data.record.currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        data.record.currentEmployeeSpouse.isLKIMStaff == 'Ya'
            ? 'true'
            : 'false';
    let isKWSP =
        data.record.currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    // Radio Functions

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
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Ya',
        },
        {
            value: 'false',
            label: 'Tidak',
        },
    ];
    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
    }
    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function currencyFormatter(amount: number) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    }
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

<ContentHeader
    title="Maklumat Lantikan Baru {data.record.currentEmployee.name}"
    description=""
    ><FormButton
        type="close"
        onClick={() => {
            goto('../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <!-- <TextField
                    {disabled}
                    name="noPerkeja"
                    label={'No. Pekerja'}
                    value={currentEmployee.employeeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={currentEmployeeStatus.name}
                ></TextField> -->
                <TextField
                    {disabled}
                    name="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaPenuh"
                    label={'Nama Penuh'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaLain"
                    label={'Nama Lain'}
                    value={data.record.currentEmployee.alternativeName}
                ></TextField>
                <TextField
                    {disabled}
                    name="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployee.isMalaysian,
                    )}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Lahir'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployee.birthDate,
                    ).toString()}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="tempatLahir"
                    label={'Tempat Lahir'}
                    value={data.record.currentEmployeeBirthState.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="warganegara"
                    label={'Warganegara'}
                    value={data.record.currentEmployee.isMalaysian
                        ? 'Malaysia'
                        : 'Bukan'}
                ></TextField>
                <TextField
                    {disabled}
                    name="bangsa"
                    label={'Bangsa'}
                    value={data.record.currentEmployeeRace.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="agama"
                    label={'Agama'}
                    value={data.record.currentEmployeeReligion.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="jantina"
                    label={'Jantina'}
                    value={data.record.currentEmployee.gender}
                ></TextField>
                <TextField
                    {disabled}
                    name="status"
                    label={'Status'}
                    value={data.record.currentEmployee.marital}
                ></TextField>
                <TextField
                    {disabled}
                    name="emel"
                    label={'Emel'}
                    value={data.record.currentEmployee.email}
                ></TextField>
                <LongTextField
                    {disabled}
                    name="alamatRumah"
                    label={'Alamat Rumah'}
                    value={data.record.currentEmployee.homeAddress}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    name="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={data.record.currentEmployee.mailAddress}
                ></LongTextField>
                <TextField
                    {disabled}
                    name="perumahan"
                    label={'Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    name="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    name="pinjKenderaan"
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
                        name="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        value={data.record.currentEmployeeSpouseEmployeeInfo
                            ?.employeeNumber}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.name}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.position}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="hubungan"
                        label={'Hubungan'}
                        value={data.record.currentEmployeeSpouse.relationship}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each data.record.currentEmployeeEducations as edu, i}
                    <p class={stepperFormTitleClass}>
                        {edu.type}
                    </p>
                    <TextField
                        {disabled}
                        name="sekolah"
                        label={'Sekolah'}
                        value={edu.instituteName}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="tahunHabis"
                        label={'Tahun'}
                        value={edu.completionYear}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="gredSekolah"
                        label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                        value={edu.finalGrade}
                    ></TextField>
                    {#if edu.type == 'Ijazah'}
                        <TextField
                            {disabled}
                            name="bidang"
                            label={'Bidang'}
                            value={edu.course}
                        ></TextField>
                        <AccordianField
                            disabled={!disabled}
                            label="Catatan"
                            header="Catatan"
                        >
                            {#each edu.remark as val, i}
                                <label
                                    for=""
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                        ? 'text-txt-tertiary'
                                        : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                    >{i + 1}. {val}</label
                                >
                            {/each}
                        </AccordianField>
                    {/if}
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each data.record.currentEmployeeExperience as item, i}
                    <p class={stepperFormTitleClass}>
                        Maklumat Pengalaman #{i + 1}
                    </p>
                    {#if item.company !== '-'}
                        <TextField
                            {disabled}
                            name="namaMajikan"
                            label={'Nama Majikan'}
                            value={item.company}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                (state) => state.id === item.stateId,
                            )?.name}, {item.country}"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="jawatan"
                            label={'Jawatan'}
                            value={item.position}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value={item.grade}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value={getDurationYear(
                                item.startDate,
                                item.endDate,
                            ).toString()}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="gaji"
                            label={'Gaji'}
                            value={currencyFormatter(parseInt(item.salary))}
                        ></TextField>
                    {:else}
                        <TextField
                            {disabled}
                            name="namaMajikan"
                            label={'Nama Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="jawatan"
                            label={'Jawatan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="gaji"
                            label={'Gaji'}
                            value="-"
                        ></TextField>{/if}
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tanggungan Selain Isteri dan Anak"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <TextField
                    {disabled}
                    name="namaWaris"
                    label={'Nama Waris'}
                    value={data.record.currentEmployeeNextOfKins.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="noKP"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployeeNextOfKins
                        .identityDocumentNumber}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label="Tarikh Lahir"
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeNextOfKins.birthDate,
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="hubungan"
                    label={'Hubungan Dengan Waris'}
                    value={data.record.currentEmployeeNextOfKins.relationship}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Kahwin (Jika berkenaan)'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeNextOfKins.marriageDate !==
                            undefined
                            ? data.record.currentEmployeeNextOfKins.marriageDate
                            : '',
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="warnaKP"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployeeNextOfKins.isMalaysian,
                    )}
                ></TextField>
                <TextField
                    {disabled}
                    name="telefonRumah"
                    label={'Telefon (R)'}
                    value={data.record.currentEmployeeNextOfKins.homeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="telefonPeribadi"
                    label={'Telefon (P)'}
                    value={data.record.currentEmployeeNextOfKins.mobileNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="pekerjaan"
                    label={'Pekerjaan'}
                    value={data.record.currentEmployeeNextOfKins.position}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaMajikan"
                    label={'Nama Majikan'}
                    value={data.record.currentEmployeeNextOfKins.company}
                ></TextField>
                <LongTextField
                    {disabled}
                    name="alamatMajikan"
                    label={'Alamat Majikan'}
                    value={data.record.currentEmployeeNextOfKins.companyAddress}
                ></LongTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
                {#each data.record.currentEmployeeUploadedDocuments as item, i}
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
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={false}
                    name="currentGrade"
                    label={'Gred Semasa'}
                    value={data.record.currentEmployeeGrade.code}
                ></TextField>
                <TextField
                    disabled={false}
                    name="position"
                    label={'Jawatan'}
                    value={data.record.currentEmployeePosition.name}
                ></TextField>
                <TextField
                    disabled={false}
                    name="placement"
                    label={'Penempatan'}
                    value={data.record.currentEmployeeService.placement}
                ></TextField>
                <TextField
                    disabled={false}
                    name="serviceLevel"
                    label={'Taraf Perkhidmatan'}
                    value={data.record.currentEmployeeServiceType.name}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    name="currentEmploymentDateOfEffect"
                    disabled={false}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <RadioSingle
                    disabled={false}
                    name="pensionBenefits"
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                    bind:userSelected={isKWSP}
                ></RadioSingle>
                <TextField
                    disabled={false}
                    name="kwspNumber"
                    label={'No. KWSP'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="taxNumber"
                    label={'No. Cukai (LHDN)'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="bank"
                    label={'Bank'}
                    value={'Maybank Berhad'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="accountNumber"
                    label={'No. Akaun'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="program"
                    label={'Program'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="leaveEntitlement"
                    label={'Kelayakan Cuti'}
                    value={getEmployeeLeave(
                        data.record.currentEmployee.employeeNumber,
                    )}
                ></TextField>

                <DateSelector
                    {handleDateChange}
                    name="govEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    name="lkimEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    name="currentEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    name="confirmedFirstLkimPositionData"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    name="confirmedCurrentLkimPositionData"
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
                    {handleDateChange}
                    name="approvedPreviousServiceMergingDate"
                    disabled={false}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                <TextField
                    disabled={false}
                    name="currentActing"
                    label={'Pemangkuan Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="currentInterim"
                    label={'Tanggung Kerja Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="pensionScheme"
                    label={'Skim Pencen'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="finalIncreament"
                    label={'Kenaikan Gaji Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="finalPromotion"
                    label={'Kenaikan Pangkat Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={false}
                    name="kgtMonth"
                    label={'Bulan KGT'}
                    value={'-'}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    name="retirementDate"
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
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            value={'12/12/2021'}
                        ></TextField>
                        <TextField
                            disabled={false}
                            name="salaryBenchmark"
                            label={'Tangga Gaji'}
                            value={currencyFormatter(1234.56)}
                        ></TextField>
                        <TextField
                            disabled={false}
                            name="salary"
                            label={'Gaji Pokok'}
                            value={currencyFormatter(1234.56)}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={false}
                            name="itka"
                            label={'ITKA'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={false}
                            name="itp"
                            label={'ITP'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={false}
                            name="epw"
                            label={'EPW'}
                            value={currencyFormatter(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={false}
                            name="cola"
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
        <StepperContentHeader
            title="Keputusan Lantikan Baru (Urus Setia Perjawatan)"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="mb-5">
                    <b class="text-sm text-system-primary"
                        >Keputusan Urus Setia Perjawatan</b
                    >
                </div>
                <LongTextField
                    name="employmentSecretary"
                    label="Tindakan/Ulasan"
                    value=""
                ></LongTextField>

                <RadioSingle
                    disabled={false}
                    options={certifyOptions}
                    legend={'Keputusan'}
                    bind:userSelected={isCertified}
                ></RadioSingle>
                <hr />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <DropdownSelect
                    name="staffs-supporter"
                    label="Nama Penyokong"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:index={selectedSupporter}
                />
                <DropdownSelect
                    name="staffs-approver"
                    label="Nama Pelulus"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:index={selectedApprover}
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan daripada Peranan - Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Penyokong</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="supporter-name"
                        label="Nama"
                        value="Mohd Rahim Ismail"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="supporter-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="supporter-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'supported'
                                ? 'green'
                                : 'red'}>{results[3].name}</Badge
                        >
                    </div>
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Pelulus</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="approver-name"
                        label="Nama"
                        value="Mohd Safwan Adam"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="approver-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="approver-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'passed' ? 'green' : 'red'}
                            >{results[0].name}</Badge
                        >
                    </div>
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Urus Setia Perjawatan</b
                        >
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="service-secretary-name"
                        label="Nama"
                        value="Ikhwan bin Salem"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="service-secretary-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="service-secretary-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'passed' ? 'green' : 'red'}
                            >{results[0].name}</Badge
                        >
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat ID MyPSM"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    name="staff-number"
                    label={'No. Pekerja (Dijana secara automatik)'}
                    value={data.record.currentEmployee.employeeNumber}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<!-- content header starts here -->
<!-- <section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Baru. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
    </ContentHeader>
</section> -->
