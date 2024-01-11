<script lang="ts">
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
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
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
        selectedApprover = employeeLists[1].value;
    });

    let isPassed: string = 'true';
    const passerOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'LULUS',
        },
        {
            value: 'false',
            label: 'TIDAK LULUS',
        },
    ];

    let isSupported: string = 'true';
    const supportOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'SOKONG',
        },
        {
            value: 'false',
            label: 'TIDAK SOKONG',
        },
    ];

    // export let activeStepper = 0;
    // export let isEditing: boolean = false;
    export let disabled: boolean = true;

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
        { value: 'certified', name: 'PERAKU' },
        { value: 'notCertified', name: 'PERAKU' },
    ];

    let passerResult: string = 'passed';
    let certifierResult: string = 'certified';

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
    title="Maklumat Pembaharuan Kontrak {data.record.currentEmployee.name}"
    description=""
    ><FormButton
        type="back"
        onClick={() => {
            goto('../pembaharuan');
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
                    value={data.record.currentEmployeeStatus.name}
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
                    {handleDateChange}
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
                        id="sekolah"
                        label={'Sekolah'}
                        value={edu.instituteName}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="tahunHabis"
                        label={'Tahun'}
                        value={edu.completionYear}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="gredSekolah"
                        label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                        value={edu.finalGrade}
                    ></TextField>
                    {#if edu.type == 'Ijazah'}
                        <TextField
                            {disabled}
                            id="bidang"
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
                            id="namaMajikan"
                            label={'Nama Majikan'}
                            value={item.company}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                (state) => state.id === item.stateId,
                            )?.name}, {item.country}"
                        ></TextField>
                        <TextField
                            {disabled}
                            id="jawatan"
                            label={'Jawatan'}
                            value={item.position}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value={item.grade}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value={getDurationYear(
                                item.startDate,
                                item.endDate,
                            ).toString()}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="gaji"
                            label={'Gaji'}
                            value={CurrencyHelper.formatCurrency(parseInt(item.salary))}
                        ></TextField>
                    {:else}
                        <TextField
                            {disabled}
                            id="namaMajikan"
                            label={'Nama Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            id="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            id="jawatan"
                            label={'Jawatan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            id="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            id="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value="-"
                        ></TextField>
                        <TextField {disabled} id="gaji" label={'Gaji'} value="-"
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
                    id="namaWaris"
                    label={'Nama Waris'}
                    value={data.record.currentEmployeeNextOfKins.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKP"
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
                    id="hubungan"
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
                    id="warnaKP"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployeeNextOfKins.isMalaysian,
                    )}
                ></TextField>
                <TextField
                    {disabled}
                    id="telefonRumah"
                    label={'Telefon (R)'}
                    value={data.record.currentEmployeeNextOfKins.homeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="telefonPeribadi"
                    label={'Telefon (P)'}
                    value={data.record.currentEmployeeNextOfKins.mobileNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="pekerjaan"
                    label={'Pekerjaan'}
                    value={data.record.currentEmployeeNextOfKins.position}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaMajikan"
                    label={'Nama Majikan'}
                    value={data.record.currentEmployeeNextOfKins.company}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatMajikan"
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
        <StepperContentHeader title="Maklumat Kontrak"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Tarikh Mula Kontrak'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Tarikh Tamat Kontrak'}
                    selectedDate={''}
                ></DateSelector>
                <TextField
                    disabled={true}
                    type="number"
                    id="payrate-contract"
                    label={'Kadar Upah (RM)'}
                    value={''}
                ></TextField>
                <TextField
                    disabled={true}
                    id="placement-contract"
                    label={'Penempatan'}
                    value={''}
                ></TextField>
                <TextField
                    disabled={true}
                    id="job-title"
                    label={'Gelaran Tugas'}
                    value={''}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Tarikh Lapor Diri'}
                    selectedDate={''}
                ></DateSelector>
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
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                    value={''}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={''}
                ></DateSelector>
                <TextField
                    disabled={true}
                    id="kelayakanCuti"
                    label={'Kelayakan Cuti'}
                    value={''}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={''}
                ></DateSelector>
                <DateSelector
                    {handleDateChange}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    selectedDate={''}
                ></DateSelector>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan untuk Dinilai"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="mb-5">
                    <b class="text-sm text-system-primary"
                        >Keputusan Urus Setia Perjawatan</b
                    >
                </div>
                <LongTextField
                    disabled={true}
                    id="supporter-remark"
                    label="Tindakan/Ulasan"
                    value="layak"
                ></LongTextField>

                <RadioSingle
                    disabled={true}
                    options={certifyOptions}
                    legend={'Keputusan'}
                    bind:userSelected={isCertified}
                ></RadioSingle>
                <hr />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Penilaian Dan Perakuan Daripada Pengarah Bahagian/Negeri"
        ></StepperContentHeader>
        <ContentHeader
            title="Penilaian dan Perakuan Kakitangan"
            description=""
        />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="stated-director-certification"
                    label={'Nama'}
                    value={'Mustaqim Bin Ahmad'}
                ></TextField>
                <TextField
                    {disabled}
                    id="assessment-mark"
                    label={'Markah Penilaian (/100)'}
                    value={'79'}
                ></TextField>
                <div class="flex w-full flex-row text-sm">
                    <label for="supporter-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge
                        border
                        color={certifierResult == 'certified' ? 'green' : 'red'}
                        >{results[5].name}</Badge
                    >
                </div>
            </div>
            <div class="flex w-full flex-row text-sm">
                <label for="supporter-result" class="w-[220px]"
                    >Cetak Markah Penilaian:
                </label>
                <TextIconButton label="Markah Keseluruhan">
                    <SvgPdf />
                </TextIconButton>
            </div>
            <ContentHeader
                title="Pengesahan Semakan Urus Setia"
                description=""
            />
            <LongTextField
                disabled={true}
                id="secretary-remark"
                label="Tindakan/Ulasan"
                value="Layak"
            ></LongTextField>
            <RadioSingle
                disabled={true}
                options={certifyOptions}
                legend={'Keputusan'}
                userSelected={'true'}
            ></RadioSingle>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Keputusan Mesyuarat Perjawatan Kakitangan Kontrak"
        ></StepperContentHeader>
        <ContentHeader
            title="Penilaian dan Perakuan Kakitangan"
            description=""
        />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <span class="text-sm italic text-system-primary">
                    Sekiranya keputusan mesyuarat tidak diluluskan, sistem MyPSM
                    akan menjana surat penamatan kontrak dan email surat
                    berkenaan ke email kakitangan.
                </span>
                <DropdownSelect
                    disabled={true}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meetings-dropdown"
                    label="Nama dan Bil Mesyuarat"
                    value={'2'}
                    options={meetings}
                ></DropdownSelect>
                <DateSelector
                    disabled={true}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    selectedDate={'2023-11-04'}
                    handleDateChange={() => {}}
                />
                <LongTextField
                    disabled={true}
                    id="secretary-remark"
                    label="Tindakan/Ulasan"
                    value="Layak"
                ></LongTextField>
                <div class="flex w-full flex-row text-sm">
                    <label for="supporter-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge
                        border
                        color={passerResult == 'passed' ? 'green' : 'red'}
                        >{results[0].name}</Badge
                    >
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <DropdownSelect
                    disabled={true}
                    id="staffs-supporter"
                    label="Nama Penyokong"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:value={selectedSupporter}
                />
                <DropdownSelect
                    disabled={true}
                    id="staffs-approver"
                    label="Nama Pelulus"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:value={selectedApprover}
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan daripada Peranan - Peranan Lain"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="mb-5">
                    <b class="text-sm text-system-primary">Keputusan Pelulus</b>
                </div>
                <LongTextField
                    id="passer-remark"
                    label="Tindakan/Ulasan"
                    value=""
                ></LongTextField>

                <RadioSingle
                    options={passerOptions}
                    legend={'Keputusan'}
                    bind:userSelected={isPassed}
                ></RadioSingle>
                <hr />
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Penyokong</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        id="supporter-name"
                        label="Nama"
                        value="Mohd Rahim Ismail"
                    ></TextField>
                    <LongTextField
                        disabled
                        id="supporter-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="supporter-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={isSupported == 'true' ? 'green' : 'red'}
                            >{results[2].name}</Badge
                        >
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
