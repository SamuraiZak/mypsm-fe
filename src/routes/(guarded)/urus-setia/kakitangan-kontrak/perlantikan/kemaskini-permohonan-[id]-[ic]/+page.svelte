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
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        _stepperNewAppointmentResult,
        _submitFormStepperNewAppointmentResult,
    } from './+page';
    import {
        _stepperSetSupporterApprover,
        _submitFormStepperSetSupporterApprover,
    } from './+page';
    import {
        _stepperUpdateNewAppointment,
        _submitFormStepperUpdateNewAppointment,
    } from './+page';

    export let data: PageData;

    let employeeLists: SelectOptionType<any>[] = [];

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

    //Update New Appointment
    const {
        form: updateNewAppointmentForm,
        errors: updateNewAppointmentErrors,
        enhance: updateNewAppointmentEnhance,
    } = superForm(data.stepperUpdateNewAppointment, {
        SPA: true,
        validators: _stepperUpdateNewAppointment,
        onSubmit() {
            _submitFormStepperUpdateNewAppointment($updateNewAppointmentForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    //New Appointment Result
    const {
        form: newAppointmentResultForm,
        errors: newAppointmentResultErrors,
        enhance: newAppointmentResultEnhance,
    } = superForm(data.stepperNewAppointmentResult, {
        SPA: true,
        validators: _stepperNewAppointmentResult,
        onSubmit() {
            _submitFormStepperNewAppointmentResult($newAppointmentResultForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    //Set Supporter Approver
    const {
        form: setSupporterApproverForm,
        errors: setSupporterApproverErrors,
        enhance: setSupporterApproverEnhance,
    } = superForm(data.stepperSetSupporterApprover, {
        SPA: true,
        validators: _stepperSetSupporterApprover,
        onSubmit() {
            _submitFormStepperSetSupporterApprover($setSupporterApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<ContentHeader
    title="Maklumat Lantikan Baru {data.record.currentEmployee.name}"
    description=""
    ><FormButton
        type="back"
        onClick={() => {
            goto('../perlantikan');
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
                    id="noPerkeja"
                    label={'No. Pekerja'}
                    value={currentEmployee.employeeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    id="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={currentEmployeeStatus.name}
                ></TextField> -->
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
                            value={CurrencyHelper.formatCurrency(
                                parseInt(item.salary),
                            )}
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
        <StepperContentHeader title="Kemaskini Lantikan Baru (Kontrak)"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperUpdateNewAppointment"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperUpdateNewAppointment"
                    class="flex w-full flex-col gap-2"
                    use:updateNewAppointmentEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.contractStartDate
                            ? true
                            : false}
                        name="contractStartDate"
                        handleDateChange
                        label="Tarikh Mula Kontrak"
                        bind:selectedDate={$updateNewAppointmentForm.contractStartDate}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.contractStartDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .contractStartDate[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.contractEndDate
                            ? true
                            : false}
                        name="contractEndDate"
                        handleDateChange
                        label="Tarikh Tamat Kontrak"
                        bind:selectedDate={$updateNewAppointmentForm.contractEndDate}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.contractEndDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .contractEndDate[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.wageRates
                            ? true
                            : false}
                        name="wageRates"
                        label={'Kadar Upah (RM)'}
                        type="number"
                        bind:value={$updateNewAppointmentForm.wageRates}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.wageRates}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.wageRates[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.placement
                            ? true
                            : false}
                        name="placement"
                        label={'Penempatan'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.placement}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.placement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.placement[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.jobTitle
                            ? true
                            : false}
                        name="jobTitle"
                        label={'Gelaran Tugas'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.jobTitle}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.jobTitle}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.jobTitle[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.reportDutyDate
                            ? true
                            : false}
                        name="reportDutyDate"
                        handleDateChange
                        label="Tarikh Lapor Diri"
                        bind:selectedDate={$updateNewAppointmentForm.reportDutyDate}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.reportDutyDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .reportDutyDate[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.noKWSP
                            ? true
                            : false}
                        name="noKWSP"
                        label={'No. KWSP'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.noKWSP}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.noKWSP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.noKWSP[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.noSOCSO
                            ? true
                            : false}
                        name="noSOCSO"
                        label={'No. SOCSO'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.noSOCSO}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.noSOCSO}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.noSOCSO[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.taxNo
                            ? true
                            : false}
                        name="taxNo"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.taxNo}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.taxNo}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.taxNo[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.bank
                            ? true
                            : false}
                        name="bank"
                        label={'Bank'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.bank}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.bank}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.bank[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.accountNo
                            ? true
                            : false}
                        name="accountNo"
                        label={'No. Akaun'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.accountNo}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.accountNo}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.accountNo[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.serviceLevel
                            ? true
                            : false}
                        name="serviceLevel"
                        label={'Taraf Perkhidmatan'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.serviceLevel}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.serviceLevel}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors.serviceLevel[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.effectiveDateCurrentAppointment
                            ? true
                            : false}
                        name="effectiveDateCurrentAppointment"
                        handleDateChange
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={$updateNewAppointmentForm.effectiveDateCurrentAppointment}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.effectiveDateCurrentAppointment}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .effectiveDateCurrentAppointment[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={$updateNewAppointmentErrors.leaveEntitlement
                            ? true
                            : false}
                        name="leaveEntitlement"
                        label={'Kelayakan Cuti'}
                        type="text"
                        bind:value={$updateNewAppointmentForm.leaveEntitlement}
                    ></TextField>

                    {#if $updateNewAppointmentErrors.leaveEntitlement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .leaveEntitlement[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.firstAppointedGovernmentService
                            ? true
                            : false}
                        name="firstAppointedGovernmentService"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={$updateNewAppointmentForm.firstAppointedGovernmentService}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.firstAppointedGovernmentService}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .firstAppointedGovernmentService[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.startAppointedService
                            ? true
                            : false}
                        name="startAppointedService"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={$updateNewAppointmentForm.startAppointedService}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.startAppointedService}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .startAppointedService[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.startAppointedCurrentService
                            ? true
                            : false}
                        name="startAppointedCurrentService"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Sekarang"
                        bind:selectedDate={$updateNewAppointmentForm.startAppointedCurrentService}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.startAppointedCurrentService}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .startAppointedCurrentService[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.confirmedFirstPosition
                            ? true
                            : false}
                        name="confirmedFirstPosition"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Pertama LKIM"
                        bind:selectedDate={$updateNewAppointmentForm.confirmedFirstPosition}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.confirmedFirstPosition}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .confirmedFirstPosition[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={$updateNewAppointmentErrors.confirmedCurrentPosition
                            ? true
                            : false}
                        name="confirmedCurrentPosition"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={$updateNewAppointmentForm.confirmedCurrentPosition}
                    ></DateSelector>
                    {#if $updateNewAppointmentErrors.confirmedCurrentPosition}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$updateNewAppointmentErrors
                                .confirmedCurrentPosition[0]}</span
                        >
                    {/if}
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Keputusan Lantikan Baru - Kontrak (Urus Setia Perjawatan)"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperNewAppointmentResult"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperNewAppointmentResult"
                    class="flex w-full flex-col gap-2"
                    use:newAppointmentResultEnhance
                    method="POST"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Keputusan Urus Setia Perjawatan</b
                        >
                    </div>
                    <LongTextField
                        hasError={$newAppointmentResultErrors.actionRemark
                            ? true
                            : false}
                        name="actionRemark"
                        label="Tindakan / Ulasan"
                        bind:value={$newAppointmentResultForm.actionRemark}
                    />
                    {#if $newAppointmentResultErrors.actionRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$newAppointmentResultErrors.actionRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        options={certifyOptions}
                        hasError={$newAppointmentResultErrors.resultOption
                            ? true
                            : false}
                        name="resultOption"
                        legend="Keputusan"
                        bind:userSelected={$newAppointmentResultForm.resultOption}
                    ></RadioSingle>
                    {#if $newAppointmentResultErrors.resultOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$newAppointmentResultErrors.resultOption[0]}</span
                        >
                    {/if}
                    <hr />
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperSetSupporterApprover"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <form
                    id="FormStepperSetSupporterApprover"
                    class="flex w-full flex-col gap-2"
                    use:setSupporterApproverEnhance
                    method="POST"
                >
                    <DropdownSelect
                        hasError={$setSupporterApproverErrors.supporterNameDropdown
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="supporterNameDropdown"
                        label="Nama Penyokong"
                        bind:value={$setSupporterApproverForm.supporterNameDropdown}
                        options={[
                            {
                                value: '1',
                                name: 'Ali',
                            },
                            {
                                value: '2',
                                name: 'Abu',
                            },
                            {
                                value: '3',
                                name: 'Ahmad',
                            },
                        ]}
                    ></DropdownSelect>
                    {#if $setSupporterApproverErrors.supporterNameDropdown}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$setSupporterApproverErrors
                                .supporterNameDropdown[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={$setSupporterApproverErrors.approverNameDropdown
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="approverNameDropdown"
                        label="Nama Pelulus"
                        bind:value={$setSupporterApproverForm.approverNameDropdown}
                        options={[
                            {
                                value: '1',
                                name: 'Ali',
                            },
                            {
                                value: '2',
                                name: 'Abu',
                            },
                            {
                                value: '3',
                                name: 'Ahmad',
                            },
                        ]}
                    ></DropdownSelect>
                    {#if $setSupporterApproverErrors.approverNameDropdown}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$setSupporterApproverErrors
                                .approverNameDropdown[0]}</span
                        >
                    {/if}
                </form>
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
                        id="approver-name"
                        label="Nama"
                        value="Mohd Safwan Adam"
                    ></TextField>
                    <LongTextField
                        disabled
                        id="approver-remark"
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
                        id="service-secretary-name"
                        label="Nama"
                        value="Ikhwan bin Salem"
                    ></TextField>
                    <LongTextField
                        disabled
                        id="service-secretary-remark"
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
        <StepperContentHeader title="Maklumat ID Kontrak MyPSM"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="staff-number"
                    label={'No. Pekerja (Dijana secara automatik)'}
                    value={data.record.currentEmployee.employeeNumber}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
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
