<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Modal } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatKegiatanTable } from '$lib/mocks/profil/maklumat-kegiatan-keahlian';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
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
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import {
        _academicInfoSchema,
        _addAcademicInfoSchema,
        _experienceInfoSchema,
        _moreAcedemicInfo,
        _personalInfoForm,
        _submitAddMoreAcademicForm,
        _submitExperienceInfoForm,
        _submitPersonalInfoForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    let employeeLists: SelectOptionType<any>[] = [];

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

    onMount(async () => {
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
    });

    export let employeeNumber: string = '00001';
    // export let activeStepper = 0;
    // export let isEditing: boolean = false;
    export let disabled: boolean = false;

    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;
    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
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

    // Radio Functions

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
    export let data: PageData;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    let tempAcademicRecord: any[] = [];
    $: tempAcademicRecord;

    export const { form, errors, enhance } = superForm(data.personalInfoForm, {
        SPA: true,
        validators: _personalInfoForm,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',

        onSubmit() {
            // console.log('HERE: ', $form);
            _submitPersonalInfoForm($form);
        },
    });

    const {
        form: academicInfoForm,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.academicInfoForm, {
        SPA: true,
        validators: _academicInfoSchema,
    });

    const {
        form: addAcademicInfoModal,
        errors: academicInfoErrors,
        enhance: academicInfoEnhance,
        delayed,
    } = superForm(data.addAcademicInfoModal, {
        SPA: true,
        validators: _addAcademicInfoSchema,
        onSubmit() {
            toast.promise(
                _submitAddMoreAcademicForm($addAcademicInfoModal).then(
                    (response) => {
                        tempAcademicRecord.push(response);
                        console.log('RESPONSE MODAL: ', tempAcademicRecord);
                    },
                ),
                {
                    loading: 'Sedang Diproses...',
                    success: 'Berjaya disimpan!',
                    error: 'Data tidak dapat disimpan.',
                },
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        },
    });

    const {
        form: experienceInfoForm,
        errors: experienceInfoErrors,
        enhance: experienceInfoEnhance,
    } = superForm(data.experienceInfoForm, {
        SPA: true,
        validators: _experienceInfoSchema,
        onSubmit() {
            _submitExperienceInfoForm($experienceInfoForm);
        },
    });
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
        <StepperContentHeader title="Maklumat Peribadi">
            <TextIconButton
                primary
                label="Simpan"
                form="FormStepperMaklumatPeribadi"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- Maklumat Peribadi -->
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
                        >{$errors.noPekerja}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.statusPekerjaan ? true : false}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    name="statusPekerjaan"
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
                        >{$errors.statusPekerjaan}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.noKadPengenalan
                        ? true
                        : false
                          ? true
                          : false}
                    name="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.noKadPengenalan}
                ></TextField>

                {#if $errors.noKadPengenalan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.noKadPengenalan}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.namaPenuh ? true : false ? true : false}
                    name="namaPenuh"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.namaPenuh}
                ></TextField>

                {#if $errors.namaPenuh}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.namaPenuh}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.namaLain ? true : false ? true : false}
                    name="namaLain"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={$form.namaLain}
                ></TextField>

                {#if $errors.namaLain}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.namaLain}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.warnaKadPengenalan ? true : false}
                    dropdownType="label-left-full"
                    id="warnaKadPengenalan"
                    name="warnaKadPengenalan"
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
                        >{$errors.warnaKadPengenalan}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={$errors.tarikhLahir ? true : false ? true : false}
                    name="tarikhLahir"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={$form.tarikhLahir}
                ></DateSelector>
                {#if $errors?.tarikhLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.tarikhLahir}</span
                    >
                {/if}
                <DropdownSelect
                    {disabled}
                    hasError={$errors.tempatLahir ? true : false}
                    dropdownType="label-left-full"
                    id="tempatLahir"
                    name="tempatLahir"
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
                        >{$errors.tempatLahir}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.warganegara ? true : false}
                    dropdownType="label-left-full"
                    id="warganegara"
                    name="warganegara"
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
                        >{$errors.warganegara}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.bangsa ? true : false}
                    dropdownType="label-left-full"
                    id="bangsa"
                    name="bangsa"
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
                        >{$errors.bangsa}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.agama ? true : false}
                    dropdownType="label-left-full"
                    id="agama"
                    name="agama"
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
                        >{$errors.agama}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={$errors.jantina ? true : false}
                    dropdownType="label-left-full"
                    id="jantina"
                    name="jantina"
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
                        >{$errors.jantina}</span
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
                        >{$errors.status}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.emel ? true : false ? true : false}
                    name="emel"
                    label={'Emel'}
                    type="text"
                    bind:value={$form.emel}
                ></TextField>

                {#if $errors?.emel}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.emel}</span
                    >
                {/if}

                <LongTextField
                    hasError={$errors.alamatRumah ? true : false ? true : false}
                    {disabled}
                    name="alamatRumah"
                    label="Alamat Rumah"
                    bind:value={$form.alamatRumah}
                />
                {#if $errors.alamatRumah}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alamatRumah}</span
                    >
                {/if}

                <LongTextField
                    hasError={$errors.alamatSuratMenyurat ? true : false}
                    {disabled}
                    name="alamatSuratMenyurat"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={$form.alamatSuratMenyurat}
                />
                {#if $errors.alamatSuratMenyurat}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alamatSuratMenyurat}</span
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
                        bind:userSelected={$form.isInRelationshipWithLKIMStaff}
                    ></RadioSingle>
                    {#if $form.isInRelationshipWithLKIMStaff === 'true'}
                        <TextField
                            {disabled}
                            hasError={$errors.noPekerjaPasangan ? true : false}
                            name="noPekerjaPasangan"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$form.noPekerjaPasangan}
                        ></TextField>

                        {#if $errors.noPekerjaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.noPekerjaPasangan}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$errors.namaPasangan
                                ? true
                                : false
                                  ? true
                                  : false}
                            name="namaPasangan"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={$form.namaPasangan}
                        ></TextField>

                        {#if $errors.namaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.namaPasangan}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={$errors.jawatanPasangan ? true : false}
                            dropdownType="label-left-full"
                            id="jawatanPasangan"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.jawatanPasangan}
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.jawatanPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.jawatanPasangan}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={$errors.hubungan ? true : false}
                            dropdownType="label-left-full"
                            id="hubungan"
                            label="Hubungan"
                            bind:value={$form.hubungan}
                            options={[
                                { value: 'true', name: 'Suami' },
                                { value: 'false', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.hubungan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.hubungan}</span
                            >
                        {/if}
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            ><TextIconButton primary label="Simpan" form="academicInfoForm">
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="academicInfoForm"
                    method="POST"
                    use:addAcademicInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    {#each currentEmployeeEducations as edu, i}
                        <p class={stepperFormTitleClass}>
                            {edu.type}
                        </p>

                        <TextField
                            {disabled}
                            hasError={$addAcademicInfoErrors.sekolah
                                ? true
                                : false}
                            name="sekolah"
                            label={'Sekolah'}
                            type="text"
                            bind:value={$academicInfoForm.sekolah}
                        ></TextField>

                        {#if $addAcademicInfoErrors.sekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$addAcademicInfoErrors.sekolah[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$addAcademicInfoErrors.tahunHabis
                                ? true
                                : false}
                            name="tahunHabis"
                            label={'Tahun'}
                            type="text"
                            bind:value={$academicInfoForm.tahunHabis}
                        ></TextField>

                        {#if $addAcademicInfoErrors.tahunHabis}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$addAcademicInfoErrors.tahunHabis[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$addAcademicInfoErrors.gredSekolah
                                ? true
                                : false}
                            name="gredSekolah"
                            label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                            type="text"
                            bind:value={$academicInfoForm.gredSekolah}
                        ></TextField>

                        {#if $addAcademicInfoErrors.gredSekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$addAcademicInfoErrors.gredSekolah[0]}</span
                            >
                        {/if}

                        {#if edu.type == 'Ijazah'}
                            <TextField
                                {disabled}
                                hasError={$addAcademicInfoErrors.bidang
                                    ? true
                                    : false}
                                name="bidang"
                                label={'Bidang'}
                                type="text"
                                bind:value={$academicInfoForm.bidang}
                            ></TextField>

                            {#if $addAcademicInfoErrors.bidang}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$addAcademicInfoErrors.bidang[0]}</span
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                        onClick={() => (openAcademicInfoModal = true)}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
            ><TextIconButton
                primary
                label="Simpan"
                form="formStepperPengalaman"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="formStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:experienceInfoEnhance
                    method="POST"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>

                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.namaMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.namaMajikan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.alamatMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.alamatMajikan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$experienceInfoForm.jawatanPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.jawatanPengalaman}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                name="kodJawatan"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={$experienceInfoForm.kodJawatan}
                            ></TextField>

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$experienceInfoForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $experienceInfoErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.tempohPerkhidmatan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$experienceInfoForm.gajiPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.gajiPengalaman}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.namaMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.namaMajikan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.alamatMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.alamatMajikan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$experienceInfoForm.jawatanPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.jawatanPengalaman}</span
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
                                hasError={$experienceInfoErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$experienceInfoForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $experienceInfoErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.tempohPerkhidmatan}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$experienceInfoForm.gajiPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.gajiPengalaman}</span
                                >
                            {/if}
                        {/if}
                    {/each}
                </form>
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Pengalaman"
                        onClick={() => {
                            openExperienceInfoModal = true;
                        }}
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
                    onClick={() => {
                        openMembershipInfoModal = true;
                    }}
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
                    label="Tambah Maklumat Keluarga"
                    onClick={() => {
                        openFamilyInfoModal = true;
                    }}
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
                    onClick={() => {
                        openNonFamilyInfoModal = true;
                    }}
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

<Toaster />

<!-- Academic Info Modal -->
<Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <form
        id="addAcademicInfoModal"
        method="POST"
        use:academicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <TextField
            hasError={$academicInfoErrors.title ? true : false}
            {disabled}
            name="title"
            label={'Tajuk'}
            bind:value={$addAcademicInfoModal.title}
        ></TextField>
        {#if $academicInfoErrors.title}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$academicInfoErrors.title}</span
            >
        {/if}
        <TextField
            hasError={$academicInfoErrors.institution ? true : false}
            {disabled}
            name="institution"
            label={'Institusi'}
            bind:value={$addAcademicInfoModal.institution}
        ></TextField>
        {#if $academicInfoErrors.institution}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$academicInfoErrors.institution}</span
            >
        {/if}
        <TextField
            hasError={$academicInfoErrors.year ? true : false}
            {disabled}
            name="year"
            label={'Tahun'}
            bind:value={$addAcademicInfoModal.year}
        ></TextField>
        {#if $academicInfoErrors.year}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$academicInfoErrors.year}</span
            >
        {/if}
        <TextField
            hasError={$academicInfoErrors.achievement ? true : false}
            {disabled}
            name="achievement"
            label={'Pencapaian'}
            bind:value={$addAcademicInfoModal.achievement}
        ></TextField>
        {#if $academicInfoErrors.achievement}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$academicInfoErrors.achievement}</span
            >
        {/if}
        <LongTextField
            hasError={$academicInfoErrors.remarks ? true : false}
            {disabled}
            name="remarks"
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.remarks}
        ></LongTextField>
        {#if $academicInfoErrors.remarks}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$academicInfoErrors.remarks}</span
            >
        {/if}
        <TextIconButton primary label={'Simpan'} form="addAcademicInfoModal" />
    </form>
</Modal>

<!-- Experience Info Modal -->
<Modal title={'Tambah Maklumat Pengalaman'} bind:open={openExperienceInfoModal}>
    <form
        id="addExperienceInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={$experienceInfoErrors.namaMajikan ? true : false}
            name="namaMajikan"
            label={'Nama Majikan'}
            type="text"
            bind:value={$experienceInfoForm.namaMajikan}
        ></TextField>
        {#if $experienceInfoErrors.namaMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.namaMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.alamatMajikan ? true : false}
            name="alamatMajikan"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$experienceInfoForm.alamatMajikan}
        ></TextField>
        {#if $experienceInfoErrors.alamatMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.alamatMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.jawatanPengalaman ? true : false}
            name="jawatanPengalaman"
            label={'Jawatan'}
            type="text"
            bind:value={$experienceInfoForm.jawatanPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.jawatanPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.jawatanPengalaman}</span
            >
        {/if}

        <TextField
            {disabled}
            name="kodJawatan"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$experienceInfoForm.kodJawatan}
        ></TextField>

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.tempohPerkhidmatan ? true : false}
            name="tempohPerkhidmatan"
            label={'Tempoh Perkhidmatan (tahun)'}
            type="text"
            bind:value={$experienceInfoForm.tempohPerkhidmatan}
        ></TextField>
        {#if $experienceInfoErrors.tempohPerkhidmatan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.tempohPerkhidmatan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.gajiPengalaman ? true : false}
            name="gajiPengalaman"
            label={'Gaji'}
            type="text"
            bind:value={$experienceInfoForm.gajiPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.gajiPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.gajiPengalaman}</span
            >
        {/if}
    </form>
</Modal>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <form
        id="addExperienceInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={$experienceInfoErrors.namaMajikan ? true : false}
            name="namaMajikan"
            label={'Nama Majikan'}
            type="text"
            bind:value={$experienceInfoForm.namaMajikan}
        ></TextField>
        {#if $experienceInfoErrors.namaMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.namaMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.alamatMajikan ? true : false}
            name="alamatMajikan"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$experienceInfoForm.alamatMajikan}
        ></TextField>
        {#if $experienceInfoErrors.alamatMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.alamatMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.jawatanPengalaman ? true : false}
            name="jawatanPengalaman"
            label={'Jawatan'}
            type="text"
            bind:value={$experienceInfoForm.jawatanPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.jawatanPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.jawatanPengalaman}</span
            >
        {/if}

        <TextField
            {disabled}
            name="kodJawatan"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$experienceInfoForm.kodJawatan}
        ></TextField>

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.tempohPerkhidmatan ? true : false}
            name="tempohPerkhidmatan"
            label={'Tempoh Perkhidmatan (tahun)'}
            type="text"
            bind:value={$experienceInfoForm.tempohPerkhidmatan}
        ></TextField>
        {#if $experienceInfoErrors.tempohPerkhidmatan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.tempohPerkhidmatan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.gajiPengalaman ? true : false}
            name="gajiPengalaman"
            label={'Gaji'}
            type="text"
            bind:value={$experienceInfoForm.gajiPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.gajiPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.gajiPengalaman}</span
            >
        {/if}
    </form>
</Modal>

<!-- Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openFamilyInfoModal}
>
    <form
        id="addExperienceInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={$experienceInfoErrors.namaMajikan ? true : false}
            name="namaMajikan"
            label={'Nama Majikan'}
            type="text"
            bind:value={$experienceInfoForm.namaMajikan}
        ></TextField>
        {#if $experienceInfoErrors.namaMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.namaMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.alamatMajikan ? true : false}
            name="alamatMajikan"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$experienceInfoForm.alamatMajikan}
        ></TextField>
        {#if $experienceInfoErrors.alamatMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.alamatMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.jawatanPengalaman ? true : false}
            name="jawatanPengalaman"
            label={'Jawatan'}
            type="text"
            bind:value={$experienceInfoForm.jawatanPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.jawatanPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.jawatanPengalaman}</span
            >
        {/if}

        <TextField
            {disabled}
            name="kodJawatan"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$experienceInfoForm.kodJawatan}
        ></TextField>

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.tempohPerkhidmatan ? true : false}
            name="tempohPerkhidmatan"
            label={'Tempoh Perkhidmatan (tahun)'}
            type="text"
            bind:value={$experienceInfoForm.tempohPerkhidmatan}
        ></TextField>
        {#if $experienceInfoErrors.tempohPerkhidmatan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.tempohPerkhidmatan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.gajiPengalaman ? true : false}
            name="gajiPengalaman"
            label={'Gaji'}
            type="text"
            bind:value={$experienceInfoForm.gajiPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.gajiPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.gajiPengalaman}</span
            >
        {/if}
    </form>
</Modal>

<!-- Non Family Info Modal -->
<Modal
    title={'Tambah Maklumat Selain Suami/Isteri & Anak'}
    bind:open={openNonFamilyInfoModal}
>
    <form
        id="addExperienceInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={$experienceInfoErrors.namaMajikan ? true : false}
            name="namaMajikan"
            label={'Nama Majikan'}
            type="text"
            bind:value={$experienceInfoForm.namaMajikan}
        ></TextField>
        {#if $experienceInfoErrors.namaMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.namaMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.alamatMajikan ? true : false}
            name="alamatMajikan"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$experienceInfoForm.alamatMajikan}
        ></TextField>
        {#if $experienceInfoErrors.alamatMajikan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.alamatMajikan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.jawatanPengalaman ? true : false}
            name="jawatanPengalaman"
            label={'Jawatan'}
            type="text"
            bind:value={$experienceInfoForm.jawatanPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.jawatanPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.jawatanPengalaman}</span
            >
        {/if}

        <TextField
            {disabled}
            name="kodJawatan"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$experienceInfoForm.kodJawatan}
        ></TextField>

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.tempohPerkhidmatan ? true : false}
            name="tempohPerkhidmatan"
            label={'Tempoh Perkhidmatan (tahun)'}
            type="text"
            bind:value={$experienceInfoForm.tempohPerkhidmatan}
        ></TextField>
        {#if $experienceInfoErrors.tempohPerkhidmatan}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.tempohPerkhidmatan}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={$experienceInfoErrors.gajiPengalaman ? true : false}
            name="gajiPengalaman"
            label={'Gaji'}
            type="text"
            bind:value={$experienceInfoForm.gajiPengalaman}
        ></TextField>
        {#if $experienceInfoErrors.gajiPengalaman}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$experienceInfoErrors.gajiPengalaman}</span
            >
        {/if}
    </form>
</Modal>
