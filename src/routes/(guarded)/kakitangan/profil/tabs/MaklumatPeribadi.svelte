<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Tooltip } from 'flowbite-svelte';
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
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import Form from '$lib/components/form/Form.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import type { PageData } from './$types';
    import {
        _stepperMaklumatPeribadi,
        _submitFormStepperMaklumatPeribadi,
    } from '../+page';
    import {
        _stepperMaklumatPerkhidmatan,
        _submitFormStepperMaklumatPerkhidmatan,
    } from '../+page';
    import {
        _stepperMaklumatAkademik,
        _submitFormStepperMaklumatAkademik,
    } from '../+page';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(
        data.stepperMaklumatPeribadi,
        {
            SPA: true,
            validators: _stepperMaklumatPeribadi,
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        },
    );
    const {
        form: maklumatPerkhidmatanForm,
        errors: maklumatPerkhidmatanErrors,
        enhance: maklumatPerkhidmatanEnhance,
    } = superForm(data.stepperMaklumatPerkhidmatan, {
        SPA: true,
        validators: _stepperMaklumatPerkhidmatan,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: maklumatAkademikForm,
        errors: maklumatAkademikErrors,
        enhance: maklumatAkademikEnhance,
    } = superForm(data.stepperMaklumatPerkhidmatan, {
        SPA: true,
        validators: _stepperMaklumatPerkhidmatan,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });


    export let employeeNumber: string = '00001';
    export let disabled: boolean = true;

    let isEditing: boolean = false;
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

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    // Stepper Classes //

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
    //true
    let isInRelationshipWithLKIMStaff =
        currentEmployeeSpouse.isLKIMStaff == 'Ya' ? 'true' : 'false';
    let isKWSP = currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    // Radio Functions

    let radioChosen: string = '';
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

<Stepper>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPeribadi"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="FormStepperMaklumatPeribadi"
                on:submit|preventDefault={_submitFormStepperMaklumatPeribadi}
                class="flex w-full flex-col gap-2"
                use:enhance
            method="POST"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    hasError={$errors.noPekerja ? true : false}
                    name="noPekerja"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={$form.noPekerja}
                ></TextField>

                {#if $errors.noPekerja}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.noPekerja[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.statusPekerjaan}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    label="Status Pekerjaan"
                    bind:value={currentEmployeeStatus.name}
                    options={[
                        { value: '1', name: 'Aktif' },
                        { value: '2', name: 'Tidak Aktif' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.statusPekerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.statusPekerjaan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.noKadPengenalan ? true : false}
                    name="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.noKadPengenalan}
                ></TextField>

                {#if $errors.noKadPengenalan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.noKadPengenalan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.namaPenuh ? true : false}
                    name="namaPenuh"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.namaPenuh}
                ></TextField>

                {#if $errors.namaPenuh}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.namaPenuh[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.namaLain ? true : false}
                    name="namaLain"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={$form.namaLain}
                ></TextField>

                {#if $errors.namaLain}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.namaLain[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.warnaKadPengenalan}
                    dropdownType="label-left-full"
                    id="warnaKadPengenalan"
                    label="Warna Kad Pengenalan"
                    bind:value={currentEmployee.isMalaysian}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.statusPewarnaKadPengenalankerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.warnaKadPengenalan[0]}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={errorData?.tarikhLahir}
                    name="tarikhLahir"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={currentEmployee.birthDate}
                ></DateSelector>
                {#if errorData?.tarikhLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.tarikhLahir[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.tempatLahir}
                    dropdownType="label-left-full"
                    id="tempatLahir"
                    label="Tempat Lahir"
                    bind:value={currentEmployeeBirthState.name}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.tempatLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.tempatLahir[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.warganegara}
                    dropdownType="label-left-full"
                    id="warganegara"
                    label="Warganegara"
                    value=""
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.warganegara}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.warganegara[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.bangsa}
                    dropdownType="label-left-full"
                    id="bangsa"
                    label="Tempat Lahir"
                    bind:value={currentEmployeeRace.name}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.bangsa}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.bangsa[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.agama}
                    dropdownType="label-left-full"
                    id="agama"
                    label="Agama"
                    bind:value={currentEmployeeReligion.name}
                    options={[
                        { value: '1', name: 'Islam' },
                        { value: '2', name: 'Kristen' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.agama}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.agama[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.jantina}
                    dropdownType="label-left-full"
                    id="jantina"
                    label="Jantina"
                    bind:value={currentEmployee.gender}
                    options={[
                        { value: '1', name: 'Lelaki' },
                        { value: '2', name: 'Perempuan' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.jantina}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.jantina[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.status}
                    dropdownType="label-left-full"
                    id="status"
                    label="Status"
                    bind:value={currentEmployee.marital}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.status}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.status[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.emel ? true : false}
                    name="emel"
                    label={'Emel'}
                    type="text"
                    bind:value={$form.emel}
                ></TextField>

                {#if $errors?.emel}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.emel[0]}</span
                    >
                {/if}

                <LongTextField
                    hasError={$errors.alamatRumah ? true : false}
                    {disabled}
                    name="alamatRumah"
                    label="Alamat Rumah"
                    bind:value={$form.alamatRumah}
                />
                {#if $errors.alamatRumah}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alamatRumah[0]}</span
                    >
                {/if}

                <LongTextField
                    hasError={errorData?.alamatSuratMenyurat}
                    {disabled}
                    name="alamatSuratMenyurat"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={$form.alamatSuratMenyurat}
                />
                {#if errorData?.alamatSuratMenyurat}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.alamatSuratMenyurat[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    name="perumahan"
                    label={'Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                <TextField
                    {disabled}
                    name="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                <TextField
                    {disabled}
                    name="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    type="text"
                    value="-"
                ></TextField>

                <RadioSingle
                    {disabled}
                    {options}
                    name="radioButtonExample"
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={isExPoliceSoldier}
                ></RadioSingle>
                {#if errorData?.radioButtonExample}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.radioButtonExample[0]}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isInRelationshipWithLKIMStaff"
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={isInRelationshipWithLKIMStaff}
                    ></RadioSingle>
                    {#if isInRelationshipWithLKIMStaff === 'true'}
                        <TextField
                            {disabled}
                            hasError={errorData?.noPekerjaPasangan}
                            name="noPekerjaPasangan"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            value={currentEmployeeSpouseEmployeeInfo?.employeeNumber}
                        ></TextField>

                        {#if errorData?.noPekerjaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.noPekerjaPasangan[0]}</span
                            >
                        {/if}

                        <!-- blokcerssssss -->
                        <TextField
                            {disabled}
                            hasError={$errors.namaPasangan ? true : false}
                            name="namaPasangan"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={$form.namaPasangan}
                        ></TextField>

                        {#if errorData?.namaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.namaPasangan[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={errorData?.jawatanPasangan}
                            dropdownType="label-left-full"
                            id="jawatanPasangan"
                            label="Jawatan Kakitangan LKIM"
                            value=""
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.jawatanPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.jawatanPasangan[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={errorData?.hubungan}
                            dropdownType="label-left-full"
                            id="hubungan"
                            label="Hubungan"
                            value=""
                            options={[
                                { value: 'true', name: 'Suami' },
                                { value: 'false', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.hubungan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.hubungan[0]}</span
                            >
                        {/if}
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>

    <!----------------------------------------------------->
    <!--------------- Maklumat Perkhidmatan --------------->
    <!----------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPerkhidmatan"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperMaklumatPerkhidmatan"
                    on:submit|preventDefault={_submitFormStepperMaklumatPerkhidmatan}
                    class="flex w-full flex-col gap-2"
                    use:enhance
                     method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.gredSemasa}
                        dropdownType="label-left-full"
                        id="gredSemasa"
                        label="Gred Semasa"
                        bind:value={currentEmployeeGrade.code}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.gredSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gredSemasa[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.jawatan}
                        dropdownType="label-left-full"
                        id="jawatan"
                        label="Gred Semasa"
                        bind:value={currentEmployeePosition.name}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.jawatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.jawatan[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.penempatan}
                        dropdownType="label-left-full"
                        id="penempatan"
                        label="Penempatan"
                        bind:value={currentEmployeeService.placement}
                        options={[
                            { value: '1', name: 'Kuala Lumpur' },
                            { value: '2', name: 'Sarawak' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.penempatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.penempatan[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.tarafPerkhidmatan}
                        dropdownType="label-left-full"
                        id="tarafPerkhidmatan"
                        label="Taraf Perkhidmatan"
                        bind:value={currentEmployeeServiceType.name}
                        options={[
                            { value: '1', name: 'TETAP' },
                            { value: '2', name: 'SEMENTARA' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.tarafPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarafPerkhidmatan[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKuatkuasaLantikanSemasa}
                        name="tarikhKuatkuasaLantikanSemasa"
                        handleDateChange
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKuatkuasaLantikanSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhKuatkuasaLantikanSemasa[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        {disabled}
                        options={faedahPersaraanOptions}
                        name="faedahPersaraanPerkhidmatan"
                        legend={'Faedah Persaraan'}
                        bind:userSelected={radioChosen}
                    ></RadioSingle>
                    {#if errorData?.faedahPersaraanPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.faedahPersaraanPerkhidmatan[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.noKWSP
                            ? true
                            : false}
                        name="noKWSP"
                        label={'No. KWSP'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.noKWSP}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.noKWSP}$errors
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.noKWSP[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.noSOCSO ? true : false}
                        name="noSOCSO"
                        label={'No. SOCSO'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.noSOCSO}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.noSOCSO}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.noSOCSO[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.noCukai ? true : false}
                        name="noCukai"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.noCukai}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.noCukai}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.noCukai[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.bank ? true : false}
                        name="bank"
                        label={'Bank'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.bank}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.bank}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.bank[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.noAkaun ? true : false}
                        name="noAkaun"
                        label={'No.Akaun'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.noAkaun}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.noAkaun}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.noAkaun[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        name="program"
                        label={'Program'}
                        type="text"
                        value={'-'}
                    ></TextField>

                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.kelayakanCuti ? true : false}
                        name="kelayakanCuti"
                        label={'Kelayakan Cuti'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.kelayakanCuti}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.kelayakanCuti}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.kelayakanCuti[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.mulaDilantikPerkhidmatanKerajaan}
                        name="mulaDilantikPerkhidmatanKerajaan"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.mulaDilantikPerkhidmatanKerajaan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.mulaDilantikPerkhidmatanKerajaan[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={errorData?.mulaDilantikPerkhidmatanLKIM}
                        name="mulaDilantikPerkhidmatanLKIM"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={currentEmployeeService.currentServiceDate}
                    ></DateSelector>
                    {#if errorData?.mulaDilantikPerkhidmatanLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.mulaDilantikPerkhidmatanLKIM[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.disahkanDalamJawatanSemasaLKIM}
                        name="disahkanDalamJawatanSemasaLKIM"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={currentEmployeeService.currentServiceDate}
                    ></DateSelector>
                    {#if errorData?.disahkanDalamJawatanSemasaLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.disahkanDalamJawatanSemasaLKIM[0]}</span
                        >
                    {/if}

                    <AccordianField
                        disabled={!disabled}
                        label="Sejarah Lantikan Jawatan LKIM"
                        header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                    >
                        {#each currentEmployeePositionHistory as item, i}
                            <label
                                for=""
                                class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                    ? 'text-txt-tertiary'
                                    : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                >{i + 1}. {mockLookupGrades.find(
                                    (grade) => grade.id === item.gradeId,
                                )?.code}, {mockLookupPositions.find(
                                    (position) =>
                                        position.gradeId === item.gradeId,
                                )?.name}, {item.startDate}, {item.startDate}
                            </label>
                        {/each}
                    </AccordianField>

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKelulusanPercantumanPerkhidmatanLepas}
                        name="tarikhKelulusanPercantumanPerkhidmatanLepas"
                        handleDateChange
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKelulusanPercantumanPerkhidmatanLepas}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.tarikhKelulusanPercantumanPerkhidmatanLepas[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.pemangkuanSekarang}
                        name="pemangkuanSekarang"
                        handleDateChange
                        label="Pemangkuan Sekarang"
                        value=""
                    ></DateSelector>
                    {#if errorData?.pemangkuanSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.pemangkuanSekarang[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tanggungKerjaSekarang}
                        name="tanggungKerjaSekarang"
                        handleDateChange
                        label="Tanggung Kerja Sekarang"
                        value=""
                    ></DateSelector>
                    {#if errorData?.tanggungKerjaSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tanggungKerjaSekarang[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        name="skimPencen"
                        label={'Skim Pencen'}
                        type="text"
                        value="-"
                    ></TextField>

                    <DateSelector
                        {disabled}
                        hasError={errorData?.kenaikanGajiAkhir}
                        name="kenaikanGajiAkhir"
                        handleDateChange
                        label="Kenaikan Gaji Akhir"
                        value=""
                    ></DateSelector>
                    {#if errorData?.kenaikanGajiAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kenaikanGajiAkhir[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.kenaikanPangkatAkhir}
                        name="kenaikanPangkatAkhir"
                        handleDateChange
                        label="Kenaikan Pangkat Akhir"
                        value=""
                    ></DateSelector>
                    {#if errorData?.kenaikanPangkatAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kenaikanPangkatAkhir[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.bulanKGT}
                        dropdownType="label-left-full"
                        id="bulanKGT"
                        label="Bulan KGT"
                        value=""
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'Februari' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.bulanKGT}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.bulanKGT[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhBersara}
                        name="tarikhBersara"
                        handleDateChange
                        label="Tarikh Bersara"
                        bind:selectedDate={currentEmployeePensions.retiredDate}
                    ></DateSelector>
                    {#if errorData?.tarikhBersara}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhBersara[0]}</span
                        >
                    {/if}

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasError={$maklumatPerkhidmatanErrors.tarikhBerkuatKuasa ? true : false}
                                name="tarikhBerkuatKuasa"
                                label={'Tarikh Berkuatkuasa'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.tarikhBerkuatKuasa}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.tarikhBerkuatKuasa}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.tarikhBerkuatKuasa[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$maklumatPerkhidmatanErrors.tanggaGaji ? true : false}
                                name="tanggaGaji"
                                label={'Tangga Gaji'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.tanggaGaji}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.tanggaGaji}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.tanggaGaji[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPerkhidmatanErrors.gajiPokok ? true : false}
                                name="gajiPokok"
                                label={'Gaji Pokok'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.gajiPokok}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.gajiPokok}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.gajiPokok[0]}</span
                            >
                        {/if}
                        </div>

                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itka"
                                hasError={$maklumatPerkhidmatanErrors.itka ? true : false}
                                name="itka"
                                label={'ITKA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.itka}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.itka}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.itka[0]}</span
                            >
                        {/if}
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itp"
                                hasError={$maklumatPerkhidmatanErrors.itp ? true : false}
                                name="itp"
                                label={'ITP'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.itp}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.itp[0]}</span
                            >
                        {/if}

                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-epw"
                                hasError={$maklumatPerkhidmatanErrors.epw ? true : false}
                                name="epw"
                                label={'EPW'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.epw}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.itp[0]}</span
                            >
                        {/if}

                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-cola"
                                hasError={$maklumatPerkhidmatanErrors.cola ? true : false}
                                name="cola"
                                label={'COLA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.cola}
                            ></TextField>
                            {#if $maklumatPerkhidmatanErrors.cola}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.cola[0]}</span
                            >
                        {/if}
                            <!-- Tooltip body -->
                            <Tooltip
                                type="dark"
                                triggeredBy="[id^='type-']"
                                on:show={assignContent}
                                >"{tooltipContent}"</Tooltip
                            >
                        </div>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------>
    <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            >{#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepperAkademik" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperAkademik"
                    on:submit|preventDefault={_submitFormStepperMaklumatAkademik}
                    class="flex w-full flex-col gap-2"
                    use:enhance
                      method="POST"
                >
                    {#each currentEmployeeEducations as edu, i}
                        <p class={stepperFormTitleClass}>
                            {edu.type}
                        </p>

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.ID ? true : false}
                            name="sekolah"
                            label={'Sekolah'}
                            type="text"
                            bind:value={edu.instituteName}
                        ></TextField>

                        {#if errorData?.sekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.sekolah[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={errorData?.tahunHabis}
                            name="tahunHabis"
                            label={'Tahun'}
                            type="text"
                            bind:value={edu.completionYear}
                        ></TextField>

                        {#if errorData?.tahunHabis}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.tahunHabis[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={errorData?.gredSekolah}
                            name="gredSekolah"
                            label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                            type="text"
                            bind:value={edu.finalGrade}
                        ></TextField>

                        {#if errorData?.gredSekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.noPerkeja[0]}</span
                            >
                        {/if}

                        {#if edu.type == 'Ijazah'}
                            <TextField
                                {disabled}
                                hasError={errorData?.bidang}
                                name="bidang"
                                label={'Bidang'}
                                type="text"
                                bind:value={edu.course}
                            ></TextField>

                            {#if errorData?.bidang}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.bidang[0]}</span
                                >
                            {/if}

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
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper4" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper4"
                    on:submit|preventDefault={_submitFormStepperMaklumatPeribadi}
                    class="flex w-full flex-col gap-2"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>

                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={errorData?.namaMajikan}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={item.company}
                            ></TextField>
                            {#if errorData?.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.alamatMajikan}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                    (state) => state.id === item.stateId,
                                )?.name}, {item.country}"
                            ></TextField>
                            {#if errorData?.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.jawatanPengalaman}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={item.position}
                            ></TextField>
                            {#if errorData?.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.jawatanPengalaman[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                name="kodJawatan"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={item.grade}
                            ></TextField>

                            <TextField
                                {disabled}
                                hasError={errorData?.tempohPerkhidmatan}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                value={getDurationYear(
                                    item.startDate,
                                    item.endDate,
                                ).toString()}
                            ></TextField>
                            {#if errorData?.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.gajiPengalaman}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={item.salary}
                            ></TextField>
                            {#if errorData?.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.gajiPengalaman[0]}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={errorData?.namaMajikan}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={item.company}
                            ></TextField>
                            {#if errorData?.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.alamatMajikan}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                    (state) => state.id === item.stateId,
                                )?.name}, {item.country}"
                            ></TextField>
                            {#if errorData?.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.jawatanPengalaman}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={item.position}
                            ></TextField>
                            {#if errorData?.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.jawatanPengalaman[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.kodJawatan}
                                name="kodJawatan"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={item.grade}
                            ></TextField>
                            {#if errorData?.kodJawatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.kodJawatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.tempohPerkhidmatan}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                value={getDurationYear(
                                    item.startDate,
                                    item.endDate,
                                ).toString()}
                            ></TextField>
                            {#if errorData?.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.gajiPengalaman}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={item.salary}
                            ></TextField>
                            {#if errorData?.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.gajiPengalaman[0]}</span
                                >
                            {/if}
                        {/if}
                    {/each}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!--------------Maklumat Kegiatan / Keahlian------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
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

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper8" />
            {/if}
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper8"
                    on:submit|preventDefault={_submitFormStepperMaklumatPeribadi}
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        {disabled}
                        hasError={errorData?.namaWaris}
                        name="namaWaris"
                        label={'Nama Waris'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.name}
                    ></TextField>
                    {#if errorData?.namaWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.namaWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.noKP}
                        name="noKP"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.identityDocumentNumber}
                    ></TextField>
                    {#if errorData?.noKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noKP[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhLahirWaris}
                        name="tarikhLahirWaris"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={currentEmployeeNextOfKins.birthDate}
                    ></DateSelector>
                    {#if errorData?.tarikhLahirWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhLahirWaris[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.hubunganWaris}
                        dropdownType="label-left-full"
                        id="hubunganWaris"
                        label="Hubungan"
                        bind:value={currentEmployeeNextOfKins.relationship}
                        options={[
                            { value: '1', name: 'Suami' },
                            { value: '2', name: 'Isteri' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.hubunganWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.hubunganWaris[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKahwin}
                        name="tarikhKahwin"
                        handleDateChange
                        label="Tarikh Kahwin (Jika Berkenaan) "
                        bind:selectedDate={currentEmployeeNextOfKins.marriageDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKahwin}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhKahwin[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.warnaKP}
                        dropdownType="label-left-full"
                        id="warnaKP"
                        label="Warna Kad Pengenalan"
                        bind:value={currentEmployeeNextOfKins.isMalaysian}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.warnaKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.warnaKP[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.telefonRumah}
                        name="telefonRumah"
                        label={'Telefon (R)'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.homeNumber}
                    ></TextField>
                    {#if errorData?.telefonRumah}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.telefonRumah[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.telefonPeribadi}
                        name="telefonPeribadi"
                        label={'Telefon (P)'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.mobileNumber}
                    ></TextField>
                    {#if errorData?.telefonPeribadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.telefonPeribadi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.pekerjaanWaris}
                        name="pekerjaanWaris"
                        label={'Pekerjaan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.position}
                    ></TextField>
                    {#if errorData?.pekerjaanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.pekerjaanWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.namaMajikanWaris}
                        name="namaMajikanWaris"
                        label={'Nama Majikan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.company}
                    ></TextField>
                    {#if errorData?.namaMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.namaMajikanWaris[0]}</span
                        >
                    {/if}

                    <LongTextField
                        hasError={errorData?.alamatMajikanWaris}
                        {disabled}
                        name="alamatMajikanWaris"
                        label="Alamat Majikan"
                        bind:value={currentEmployeeNextOfKins.companyAddress}
                    />
                    {#if errorData?.alamatMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.alamatMajikanWaris[0]}</span
                        >
                    {/if}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
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
<Toaster />
