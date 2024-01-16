<script lang="ts">
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
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockEmployeeEducations } from '$lib/mocks/database/mockEmployeeEducations';
    import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { superForm } from 'sveltekit-superforms/client';
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
    import {
        _stepperMaklumatPengalaman,
        _submitFormStepperMaklumatPengalaman,
    } from '../+page';
    import {
        _stepperMaklumatWaris,
        _submitFormStepperMaklumatWaris,
    } from '../+page';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(
        data.stepperMaklumatPeribadi,
        {
            SPA: true,
            validators: _stepperMaklumatPeribadi,
            onSubmit() {
                _submitFormStepperMaklumatPerkhidmatan($form);
            },
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        },
    );

    const {
        form: maklumatPerkhidmatanForm,
        errors: maklumatPerkhidmatanErrors,
        enhance: maklumatPerkhidmatanEnhance,
    } = superForm(data.stepperMaklumatPerkhidmatan,
    {
        SPA: true,
        validators: _stepperMaklumatPerkhidmatan,
        onSubmit() {
                _submitFormStepperMaklumatPerkhidmatan($maklumatPerkhidmatanForm);
            },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: maklumatAkademikForm,
        errors: maklumatAkademikErrors,
        enhance: maklumatAkademikEnhance,
    } = superForm(data.stepperMaklumatAkademik, {
        SPA: true,
        validators: _stepperMaklumatAkademik,
        onSubmit() {
                _submitFormStepperMaklumatAkademik($maklumatAkademikForm);
            },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: maklumatPengalamanForm,
        errors: maklumatPengalamanErrors,
        enhance: maklumatPengalamanEnhance,
    } = superForm(data.stepperMaklumatPengalaman, {
        SPA: true,
        validators: _stepperMaklumatPengalaman,
        onSubmit() {
            _submitFormStepperMaklumatPengalaman($maklumatPengalamanForm);
            },

        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: maklumatWarisForm,
        errors: maklumatWarisErrors,
        enhance: maklumatWarisEnhance,
    } = superForm(data.stepperMaklumatWaris, {
        SPA: true,
        validators: _stepperMaklumatWaris,
        onSubmit() {
                _submitFormStepperMaklumatWaris($maklumatWarisForm);
            },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    export let employeeNumber: string = '00001';
    export let disabled: boolean = true;
    let editable: boolean = true;

    const approveOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'LULUS',
        },
        {
            value: 'false',
            label: 'TIDAK LULUS',
        },
    ];


    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;

    let currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
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

    let currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee.id;
        },
    )!;


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
                    hasError={$errors.statusPekerjaan ? true : false}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    label="Status Pekerjaan"
                    bind:value={$form.statusPekerjaan}
                    options={[
                        { value: '1', name: 'Aktif' },
                        { value: '2', name: 'Tidak Aktif' },
                    ]}
                ></DropdownSelect>
                {#if $errors.statusPekerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.statusPekerjaan[0]}</span
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
                    hasError={$errors.warnaKadPengenalan ? true : false}
                    dropdownType="label-left-full"
                    id="warnaKadPengenalan"
                    label="Warna Kad Pengenalan"
                    bind:value={$form.warnaKadPengenalan}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.warnaKadPengenalan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.warnaKadPengenalan[0]}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={$errors.tarikhLahir ? true : false}
                    name="tarikhLahir"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={$form.tarikhLahir}
                ></DateSelector>
                {#if $errors?.tarikhLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.tarikhLahir[0]}</span
                    >
                {/if}
                <DropdownSelect
                    {disabled}
                    hasError={$errors.tempatLahir ? true : false}
                    dropdownType="label-left-full"
                    id="tempatLahir"
                    label="Tempat Lahir"
                    bind:value={$form.tempatLahir}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.tempatLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.tempatLahir[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.warganegara ? true : false}
                    dropdownType="label-left-full"
                    id="warganegara"
                    label="Warganegara"
                    bind:value={$form.warganegara}
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if $errors.warganegara}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.warganegara[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.bangsa ? true : false}
                    dropdownType="label-left-full"
                    id="bangsa"
                    label="Bangsa"
                    bind:value={$form.bangsa}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if $errors.bangsa}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.bangsa[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.agama ? true : false}
                    dropdownType="label-left-full"
                    id="agama"
                    label="Agama"
                    bind:value={$form.agama}
                    options={[
                        { value: '1', name: 'Islam' },
                        { value: '2', name: 'Kristen' },
                    ]}
                ></DropdownSelect>
                {#if $errors.agama}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.agama[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.jantina ? true : false}
                    dropdownType="label-left-full"
                    id="jantina"
                    label="Jantina"
                    bind:value={$form.jantina}
                    options={[
                        { value: '1', name: 'Lelaki' },
                        { value: '2', name: 'Perempuan' },
                    ]}
                ></DropdownSelect>
                {#if $errors.jantina}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.jantina[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.status ? true : false}
                    dropdownType="label-left-full"
                    id="status"
                    label="Status"
                    bind:value={$form.status}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
                ></DropdownSelect>
                {#if $errors.status}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.status[0]}</span
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
                {#if $errors.alamatSuratMenyurat}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alamatSuratMenyurat[0]}</span
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
                    name="bekasPolisTentera"
                    disabled={!editable}
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.bekasPolisTentera}
                ></RadioSingle>
                {#if $errors.bekasPolisTentera}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.bekasPolisTentera}</span
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
                    class="flex w-full flex-col gap-2"
                    use:maklumatPerkhidmatanEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>

                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.gredSemasa
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="gredSemasa"
                        label="Gred Semasa"
                        bind:value={$maklumatPerkhidmatanForm.gredSemasa}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.gredSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.gredSemasa[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.jawatan
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="jawatan"
                        label="Jawatan"
                        bind:value={$maklumatPerkhidmatanForm.jawatan}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.jawatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.jawatan[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.penempatan
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="penempatan"
                        label="Penempatan"
                        bind:value={$maklumatPerkhidmatanForm.penempatan}
                        options={[
                            { value: '1', name: 'Kuala Lumpur' },
                            { value: '2', name: 'Sarawak' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.penempatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.penempatan[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.tarafPerkhidmatan
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="tarafPerkhidmatan"
                        label="Taraf Perkhidmatan"
                        bind:value={$maklumatPerkhidmatanForm.tarafPerkhidmatan}
                        options={[
                            { value: '1', name: 'TETAP' },
                            { value: '2', name: 'SEMENTARA' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.tarafPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .tarafPerkhidmatan[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.tarikhKuatkuasaLantikanSemasa
                            ? true
                            : false}
                        name="tarikhKuatkuasaLantikanSemasa"
                        handleDateChange
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={$maklumatPerkhidmatanForm.tarikhKuatkuasaLantikanSemasa}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.tarikhKuatkuasaLantikanSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .tarikhKuatkuasaLantikanSemasa[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        {disabled}
                        options={faedahPersaraanOptions}
                        name="faedahPersaraanPerkhidmatan"
                        legend={'Faedah Persaraan'}
                        bind:userSelected={$maklumatPerkhidmatanForm.faedahPersaraanPerkhidmatan}
                    ></RadioSingle>
                    {#if $maklumatPerkhidmatanErrors.faedahPersaraanPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.faedahPersaraanPerkhidmatan}</span
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

                    {#if $maklumatPerkhidmatanErrors.noKWSP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.noKWSP[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.noSOCSO
                            ? true
                            : false}
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
                        hasError={$maklumatPerkhidmatanErrors.noCukai
                            ? true
                            : false}
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
                        hasError={$maklumatPerkhidmatanErrors.bank
                            ? true
                            : false}
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
                        hasError={$maklumatPerkhidmatanErrors.noAkaun
                            ? true
                            : false}
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
                        hasError={$maklumatPerkhidmatanErrors.kelayakanCuti
                            ? true
                            : false}
                        name="kelayakanCuti"
                        label={'Kelayakan Cuti'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.kelayakanCuti}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.kelayakanCuti}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .kelayakanCuti[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.mulaDilantikPerkhidmatanKerajaan
                            ? true
                            : false}
                        name="mulaDilantikPerkhidmatanKerajaan"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={$maklumatPerkhidmatanForm.mulaDilantikPerkhidmatanKerajaan}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.mulaDilantikPerkhidmatanKerajaan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .mulaDilantikPerkhidmatanKerajaan[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.mulaDilantikPerkhidmatanLKIM
                            ? true
                            : false}
                        name="mulaDilantikPerkhidmatanLKIM"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={$maklumatPerkhidmatanForm.mulaDilantikPerkhidmatanLKIM}
                    ></DateSelector>
                    {#if errorData?.mulaDilantikPerkhidmatanLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.mulaDilantikPerkhidmatanLKIM[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.disahkanDalamJawatanSemasaLKIM
                            ? true
                            : false}
                        name="disahkanDalamJawatanSemasaLKIM"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={$maklumatPerkhidmatanForm.disahkanDalamJawatanSemasaLKIM}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.disahkanDalamJawatanSemasaLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .disahkanDalamJawatanSemasaLKIM[0]}</span
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
                        hasError={$maklumatPerkhidmatanErrors.tarikhKelulusanPercantumanPerkhidmatanLepas
                            ? true
                            : false}
                        name="tarikhKelulusanPercantumanPerkhidmatanLepas"
                        handleDateChange
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:selectedDate={$maklumatPerkhidmatanForm.tarikhKelulusanPercantumanPerkhidmatanLepas}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.tarikhKelulusanPercantumanPerkhidmatanLepas}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .tarikhKelulusanPercantumanPerkhidmatanLepas[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.pemangkuanSekarang
                            ? true
                            : false}
                        name="pemangkuanSekarang"
                        handleDateChange
                        label="Pemangkuan Sekarang"
                        bind:selectedDate={$maklumatPerkhidmatanForm.pemangkuanSekarang}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.pemangkuanSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .pemangkuanSekarang[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.tanggungKerjaSekarang
                            ? true
                            : false}
                        name="tanggungKerjaSekarang"
                        handleDateChange
                        label="Tanggung Kerja Sekarang"
                        bind:selectedDate={$maklumatPerkhidmatanForm.tanggungKerjaSekarang}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.tanggungKerjaSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .tanggungKerjaSekarang[0]}</span
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
                        hasError={$maklumatPerkhidmatanErrors.kenaikanGajiAkhir
                            ? true
                            : false}
                        name="kenaikanGajiAkhir"
                        handleDateChange
                        label="Kenaikan Gaji Akhir"
                        bind:selectedDate={$maklumatPerkhidmatanForm.kenaikanGajiAkhir}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.kenaikanGajiAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .kenaikanGajiAkhir[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.kenaikanPangkatAkhir
                            ? true
                            : false}
                        name="kenaikanPangkatAkhir"
                        handleDateChange
                        label="Kenaikan Pangkat Akhir"
                        bind:selectedDate={$maklumatPerkhidmatanForm.kenaikanPangkatAkhir}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.kenaikanPangkatAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors
                                .kenaikanPangkatAkhir[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.bulanKGT
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="bulanKGT"
                        label="Bulan KGT"
                        bind:value={$maklumatPerkhidmatanForm.bulanKGT}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'Februari' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.bulanKGT}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.bulanKGT[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatPerkhidmatanErrors.tarikhBersara
                            ? true
                            : false}
                        name="tarikhBersara"
                        handleDateChange
                        label="Tarikh Bersara"
                        bind:selectedDate={$maklumatPerkhidmatanForm.tarikhBersara}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.tarikhBersara}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$maklumatPerkhidmatanErrors.tarikhBersara[0]}</span
                    >
                {/if}

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasError={$maklumatPerkhidmatanErrors.tarikhBerkuatKuasa
                                    ? true
                                    : false}
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
                                hasError={$maklumatPerkhidmatanErrors.tanggaGaji
                                    ? true
                                    : false}
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
                                hasError={$maklumatPerkhidmatanErrors.gajiPokok
                                    ? true
                                    : false}
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
                                hasError={$maklumatPerkhidmatanErrors.itka
                                    ? true
                                    : false}
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
                                hasError={$maklumatPerkhidmatanErrors.itp
                                    ? true
                                    : false}
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
                                hasError={$maklumatPerkhidmatanErrors.epw
                                    ? true
                                    : false}
                                name="epw"
                                label={'EPW'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.epw}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.epw}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.epw[0]}</span
                            >
                        {/if}

                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-cola"
                                hasError={$maklumatPerkhidmatanErrors.cola
                                    ? true
                                    : false}
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
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperAkademik"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperAkademik"
                    class="flex w-full flex-col gap-2"
                    use:maklumatAkademikEnhance
                    method="POST"
                >
                    {#each currentEmployeeEducations as edu, i}
                        <p class={stepperFormTitleClass}>
                            {edu.type}
                        </p>

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.sekolah
                                ? true
                                : false}
                            name="sekolah"
                            label={'Sekolah'}
                            type="text"
                            bind:value={$maklumatAkademikForm.sekolah}
                        ></TextField>

                        {#if $maklumatAkademikErrors.sekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.sekolah[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.tahunHabis
                                ? true
                                : false}
                            name="tahunHabis"
                            label={'Tahun'}
                            type="text"
                            bind:value={$maklumatAkademikForm.tahunHabis}
                        ></TextField>

                        {#if $maklumatAkademikErrors.tahunHabis}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.tahunHabis[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.gredSekolah
                                ? true
                                : false}
                            name="gredSekolah"
                            label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                            type="text"
                            bind:value={$maklumatAkademikForm.gredSekolah}
                        ></TextField>

                        {#if $maklumatAkademikErrors.gredSekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.gredSekolah[0]}</span
                            >
                        {/if}

                        {#if edu.type == 'Ijazah'}
                            <TextField
                                {disabled}
                                hasError={$maklumatAkademikErrors.bidang
                                    ? true
                                    : false}
                                name="bidang"
                                label={'Bidang'}
                                type="text"
                                bind:value={$maklumatAkademikForm.bidang}
                            ></TextField>

                            {#if $maklumatAkademikErrors.bidang}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatAkademikErrors.bidang[0]}</span
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
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperPengalaman"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPengalamanEnhance
                    method="POST"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>

                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.namaMajikan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.alamatMajikan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.jawatanPengalaman}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .jawatanPengalaman[0]}</span
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
                                hasError={$maklumatPengalamanErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.gajiPengalaman}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .gajiPengalaman[0]}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.namaMajikan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.alamatMajikan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.jawatanPengalaman}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .jawatanPengalaman[0]}</span
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
                                hasError={$maklumatPengalamanErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.gajiPengalaman}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors
                                        .gajiPengalaman[0]}</span
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
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperWaris"
                />
            {/if}
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperWaris"
                    class="flex w-full flex-col gap-2"
                    use:maklumatWarisEnhance
                    method="POST"
                >
                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.namaWaris ? true : false}
                        name="namaWaris"
                        label={'Nama Waris'}
                        type="text"
                        bind:value={$maklumatWarisForm.namaWaris}
                    ></TextField>
                    {#if $maklumatWarisErrors.namaWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.namaWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.noKP ? true : false}
                        name="noKP"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={$maklumatWarisForm.noKP}
                    ></TextField>
                    {#if $maklumatWarisErrors.noKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.noKP[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={$maklumatWarisErrors.tarikhLahirWaris
                            ? true
                            : false}
                        name="tarikhLahirWaris"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={$maklumatWarisForm.tarikhLahirWaris}
                    ></DateSelector>
                    {#if $maklumatWarisErrors?.tarikhLahirWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors?.tarikhLahirWaris[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatWarisErrors.hubunganWaris
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="hubunganWaris"
                        label="Hubungan"
                        bind:value={$maklumatWarisForm.hubunganWaris}
                        options={[
                            { value: '1', name: 'Suami' },
                            { value: '2', name: 'Isteri' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatWarisErrors.hubunganWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.hubunganWaris[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={$maklumatWarisErrors.tarikhKahwin
                            ? true
                            : false}
                        name="tarikhKahwin"
                        handleDateChange
                        label="Tarikh Kahwin (Jika Berkenaan) "
                        bind:selectedDate={$maklumatWarisForm.tarikhKahwin}
                    ></DateSelector>
                    {#if $maklumatWarisErrors?.tarikhKahwin}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors?.tarikhKahwin[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={$maklumatWarisErrors.warnaKP
                            ? true
                            : false}
                        dropdownType="label-left-full"
                        id="warnaKP"
                        label="Warna Kad Pengenalan"
                        bind:value={$maklumatWarisForm.warnaKP}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatWarisErrors.warnaKP}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$maklumatWarisErrors.warnaKP[0]}</span
                    >
                {/if}


                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.telefonRumah
                            ? true
                            : false}
                        name="telefonRumah"
                        label={'Telefon (R)'}
                        type="text"
                        bind:value={$maklumatWarisForm.telefonRumah}
                    ></TextField>
                    {#if $maklumatWarisErrors.telefonRumah}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.telefonRumah[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.telefonPeribadi
                            ? true
                            : false}
                        name="telefonPeribadi"
                        label={'Telefon (P)'}
                        type="text"
                        bind:value={$maklumatWarisForm.telefonPeribadi}
                    ></TextField>
                    {#if $maklumatWarisErrors.telefonPeribadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.telefonPeribadi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.pekerjaanWaris
                            ? true
                            : false}
                        name="pekerjaanWaris"
                        label={'Pekerjaan'}
                        type="text"
                        bind:value={$maklumatWarisForm.pekerjaanWaris}
                    ></TextField>
                    {#if $maklumatWarisErrors.pekerjaanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.pekerjaanWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.namaMajikanWaris
                            ? true
                            : false}
                        name="namaMajikanWaris"
                        label={'Nama Majikan'}
                        type="text"
                        bind:value={$maklumatWarisForm.namaMajikanWaris}
                    ></TextField>
                    {#if $maklumatWarisErrors.namaMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.namaMajikanWaris[0]}</span
                        >
                    {/if}

                    <LongTextField
                        hasError={$maklumatWarisErrors.alamatMajikanWaris
                            ? true
                            : false}
                        {disabled}
                        name="alamatMajikanWaris"
                        label="Alamat Majikan"
                        bind:value={$maklumatWarisForm.alamatMajikanWaris}
                    />
                    {#if $maklumatWarisErrors.alamatMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.alamatMajikanWaris[0]}</span
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

