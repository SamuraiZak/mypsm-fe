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
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupServiceTypes } from '$lib/mocks/database/mockLookupServiceTypes';
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockEmployeeEducations } from '$lib/mocks/database/mockEmployeeEducations';
    import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
    import { mockEmployeeNextOfKins } from '$lib/mocks/database/mockEmployeeNextOfKins';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    // let educationList = [{ id: Date.now(), institution: '', degree: '' }];

    // function addEducation() {
    //     educationList = [
    //         ...educationList,
    //         { id: Date.now(), institution: '', degree: '' },
    //     ];
    // }

    onMount(async () => {
        const staffs: IntEmployees[] = await getEmployees();

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });

    export let employeeNumber: string = '00001';
    // export let activeStepper = 0;
    // export let isEditing: boolean = false;
    export let disabled: boolean = false;

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

    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;
    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
    })!;
    let currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee.birthStateId;
    })!;
    let currentEmployeeServiceType = mockLookupServiceTypes.find(
        (serviceType) => {
            return (
                serviceType.id ===
                mockCurrentService.find((service) => {
                    return service.employeeId === currentEmployee.id;
                })!.serviceTypeId
            );
        },
    )!;
    let currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeGrade = mockLookupGrades.find((grade) => {
        return grade.id === currentEmployeeService.gradeId;
    })!;
    let currentEmployeePosition = mockLookupPositions.find((position) => {
        return position.id === currentEmployeeService.positionId;
    })!;
    let currentEmployeeStatus = mockLookupEmploymentStatus.find((status) => {
        return status.id === currentEmployeeService.employmentStatusId;
    })!;
    let currentEmployeePositionHistory = mockEmploymentPositionHistories.filter(
        (positionHistory) => {
            return (
                positionHistory.currentServiceId ===
                currentEmployeeService.serviceTypeId
            );
        },
    )!;
    let currentEmployeePensions = mockEmploymentPensions.find((pension) => {
        return pension.currentServiceId === currentEmployeeService.id;
    })!;
    let currentEmployeeEducations = mockEmployeeEducations.filter(
        (eudcation) => {
            return eudcation.employeeId === currentEmployee.id;
        },
    )!;
    let currentEmployeeExperience = mockEmployeeExperience.filter(
        (experience) => {
            return experience.employeeId === currentEmployee.id;
        },
    )!;
    let currentEmployeeNextOfKins = mockEmployeeNextOfKins.find((nextOfKin) => {
        return nextOfKin.employeeId === currentEmployee.id;
    })!;

    let currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee.id;
        },
    )!;

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

    let steppers: string[] = [
        'Maklumat Peribadi',

        'Maklumat Perkhidmatan',

        'Maklumat Akademik / Kelayakan / Latihan yang Lalu',

        'Maklumat Pengalaman',

        'Maklumat Kegiatan / Keahlian',

        'Maklumat Keluarga',

        'Maklumat Tanggungan Selain Isteri dan Anak',

        'Maklumat Waris',

        'Dokumen - Dokumen Sokongan yang Berkaitan',
    ];
    let isExPoliceSoldier = currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        currentEmployeeSpouse.isLKIMStaff == 'Ya' ? 'true' : 'false';
    let isKWSP = currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

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
    title="Maklumat Lantikan Baru {currentEmployee.name}"
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
        <StepperContentHeader title="Maklumat Peribadi"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={currentEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaPenuh"
                    label={'Nama Penuh'}
                    value={currentEmployee.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaLain"
                    label={'Nama Lain'}
                    value={currentEmployee.alternativeName}
                ></TextField>
                <TextField
                    {disabled}
                    id="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(currentEmployee.isMalaysian)}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Lahir'}
                    selectedDate={dateFormatter(
                        currentEmployee.birthDate,
                    ).toString()}
                ></DateSelector>
                <TextField
                    {disabled}
                    id="tempatLahir"
                    label={'Tempat Lahir'}
                    value={currentEmployeeBirthState.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="warganegara"
                    label={'Warganegara'}
                    value={currentEmployee.isMalaysian ? 'Malaysia' : 'Bukan'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bangsa"
                    label={'Bangsa'}
                    value={currentEmployeeRace.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="agama"
                    label={'Agama'}
                    value={currentEmployeeReligion.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="jantina"
                    label={'Jantina'}
                    value={currentEmployee.gender}
                ></TextField>
                <TextField
                    {disabled}
                    id="status"
                    label={'Status'}
                    value={currentEmployee.marital}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel"
                    label={'Emel'}
                    value={currentEmployee.email}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatRumah"
                    label={'Alamat Rumah'}
                    value={currentEmployee.homeAddress}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    id="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={currentEmployee.mailAddress}
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
                        value={currentEmployeeSpouseEmployeeInfo?.employeeNumber}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={currentEmployeeSpouse.name}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={currentEmployeeSpouse.position}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="hubungan"
                        label={'Hubungan'}
                        value={currentEmployeeSpouse.relationship}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each currentEmployeeEducations as edu, i}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                        onClick={() => {}}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
                <!-- <div
                    class="w-full rounded-[3px] border border-system-primary p-2.5"
                >
                    {#each educationList as education, index (education.institution)}
                        <div class="education-form">
                            <input
                                type="text"
                                bind:value={education.institution}
                                placeholder="Institution"
                            />
                            <input
                                type="text"
                                bind:value={education.degree}
                                placeholder="Degree"
                            />
                            {#if index === educationList.length - 1}
                                <button on:click={addEducation}
                                    >Add More Education Information</button
                                >
                            {/if}
                            {console.log(educationList.length)}
                        </div>
                    {/each}
                </div> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each currentEmployeeExperience as item, i}
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
                            value={currencyFormatter(parseInt(item.salary))}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Pengalaman"
                        onClick={() => {}}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Kegiatan/Keahlian"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Keluarga"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tanggungan Selain Isteri dan Anak"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Tanggungan Selain Isteri dan Anak"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <TextField
                    {disabled}
                    id="namaWaris"
                    label={'Nama Waris'}
                    value={currentEmployeeNextOfKins.name}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKP"
                    label={'No. Kad Pengenalan'}
                    value={currentEmployeeNextOfKins.identityDocumentNumber}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label="Tarikh Lahir"
                    selectedDate={dateFormatter(
                        currentEmployeeNextOfKins.birthDate,
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    id="hubungan"
                    label={'Hubungan Dengan Waris'}
                    value={currentEmployeeNextOfKins.relationship}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Kahwin (Jika berkenaan)'}
                    selectedDate={dateFormatter(
                        currentEmployeeNextOfKins.marriageDate !== undefined
                            ? currentEmployeeNextOfKins.marriageDate
                            : '',
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    id="warnaKP"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(currentEmployeeNextOfKins.isMalaysian)}
                ></TextField>
                <TextField
                    {disabled}
                    id="telefonRumah"
                    label={'Telefon (R)'}
                    value={currentEmployeeNextOfKins.homeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="telefonPeribadi"
                    label={'Telefon (P)'}
                    value={currentEmployeeNextOfKins.mobileNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="pekerjaan"
                    label={'Pekerjaan'}
                    value={currentEmployeeNextOfKins.position}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaMajikan"
                    label={'Nama Majikan'}
                    value={currentEmployeeNextOfKins.company}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatMajikan"
                    label={'Alamat Majikan'}
                    value={currentEmployeeNextOfKins.companyAddress}
                ></LongTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm">
                    Sila muat turun, isi dengan lengkap dokumen berikut,
                    kemudian muat naik dokumen pada ruangan yang disediakan.
                </p>

                <ul
                    class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                >
                    <li>Surat Setuju Terima Tawaran</li>
                    <li>Surat Sumpah Bukan Penagih Dadah</li>
                    <li>Akuan Berkanun</li>
                    <li>Surat Aku Janji</li>
                    <li>Borang Perubatan</li>
                    <li>
                        Perkuan Untuk Ditandatangani Oleh Penjawat Awam
                        Berkenaan Dengan Akta Rahsia Rasmi, 1972
                    </li>
                </ul>
                <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField />
                    </span>
                </div>
                <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
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
            </div></StepperContentBody
        >
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
