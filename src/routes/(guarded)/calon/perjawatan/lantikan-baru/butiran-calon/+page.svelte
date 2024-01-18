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
        _addExperienceModalSchema,
        _experienceInfoSchema,
        _personalInfoForm,
        _submitAcademicInfoForm,
        _submitAddExperienceModal,
        _submitAddMoreAcademicForm,
        _submitExperienceInfoForm,
        _submitPersonalInfoForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { getErrorToast, getSuccessToast } from '$lib/toast/toast-service';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
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

    let selectedFiles: File[] = [];
    let target: any;
    let texthidden = false;

    // Function to handle the file changes
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    onMount(async () => {
        target = document.getElementById('fileInput');
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
    let tempExperienceRecord: any[] = [];

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
        errors: academicInfoErrors,
        enhance: academicInfoEnhance,
        tainted: academicInfoTainted,
    } = superForm(data.academicInfoForm, {
        SPA: true,
        validators: _academicInfoSchema,
        onSubmit() {
            if ($academicInfoTainted)
                _submitAcademicInfoForm($academicInfoForm);
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

    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
        delayed,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        validators: _addAcademicInfoSchema,
        onSubmit() {
            _submitAddMoreAcademicForm($addAcademicInfoModal).then(
                (response) => {
                    tempAcademicRecord.push(response);
                    console.log('RESPONSE MODAL: ', tempAcademicRecord);
                },
            );
            // .then(() => (openAcademicInfoModal = false));
        },
    });

    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        validators: _addExperienceModalSchema,
        onSubmit() {
            _submitAddExperienceModal($addExperienceModalForm).then(
                (response) => {
                    tempExperienceRecord.push(response);
                    console.log('RESPONSE MODAL: ', tempExperienceRecord);
                },
            );
        },
    });

    // const {
    //     form: addMembershipModal,
    //     errors: addMembershipModalErrors,
    //     enhance: addMembershipModalEnhance,
    // } = superForm(data.addExperienceModalForm, {
    //     SPA: true,
    //     validators: _addExperienceModalSchema,
    //     onSubmit() {
    //         _submitAddMoreAcademicForm($addAcademicInfoModal);
    //     },
    // });
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
                    disabled
                    name="candidateNumber"
                    label={'No. Calon'}
                    type="text"
                    bind:value={$form.candidateNumber}
                ></TextField>
                <!-- <TextField
                    {disabled}
                    hasError={!!$errors.staffNumber}
                    name="staffNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={$form.staffNumber}
                ></TextField>

                {#if $errors.staffNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.staffNumber}</span
                    >
                {/if} -->

                <!-- <DropdownSelect
                    {disabled}
                    hasError={!!$errors.statusPekerjaan}
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
                {/if} -->

                <TextField
                    {disabled}
                    hasError={$errors.identityDocumentNumber
                        ? true
                        : false
                          ? true
                          : false}
                    name="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.identityDocumentNumber}
                ></TextField>

                {#if $errors.identityDocumentNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityDocumentNumber}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.name}
                    name="name"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.name}
                ></TextField>

                {#if $errors.name}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.name}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.alternativeName
                        ? true
                        : false
                          ? true
                          : false}
                    name="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={$form.alternativeName}
                ></TextField>

                {#if $errors.alternativeName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alternativeName}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.identityDocumentColor}
                    dropdownType="label-left-full"
                    id="identityDocumentColor"
                    name="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    bind:value={$form.identityDocumentColor}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.identityDocumentColor}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityDocumentColor}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={!!$errors.birthDate}
                    name="birthDate"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={$form.birthDate}
                ></DateSelector>
                {#if $errors?.birthDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.birthDate}</span
                    >
                {/if}
                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.birthPlace}
                    dropdownType="label-left-full"
                    id="birthPlace"
                    name="birthPlace"
                    label="Tempat Lahir"
                    bind:value={$form.birthPlace}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.birthPlace}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthPlace}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.isMalaysia}
                    dropdownType="label-left-full"
                    id="isMalaysia"
                    name="isMalaysia"
                    label="Warganegara"
                    bind:value={$form.isMalaysia}
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if $errors.isMalaysia}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isMalaysia}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.raceId}
                    dropdownType="label-left-full"
                    id="raceId"
                    name="raceId"
                    label="Bangsa"
                    bind:value={$form.raceId}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if $errors.raceId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.raceId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.religionId}
                    dropdownType="label-left-full"
                    id="religionId"
                    name="religionId"
                    label="Agama"
                    bind:value={$form.religionId}
                    options={[
                        { value: '1', name: 'Islam' },
                        { value: '2', name: 'Kristen' },
                    ]}
                ></DropdownSelect>
                {#if $errors.religionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.religionId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.gender}
                    dropdownType="label-left-full"
                    id="gender"
                    name="gender"
                    label="Jantina"
                    bind:value={$form.gender}
                    options={[
                        { value: 'male', name: 'Lelaki' },
                        { value: 'female', name: 'Perempuan' },
                    ]}
                ></DropdownSelect>
                {#if $errors.gender}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.gender}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.marital}
                    dropdownType="label-left-full"
                    id="marital"
                    label="marital"
                    bind:value={$form.marital}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
                ></DropdownSelect>
                {#if $errors.marital}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.marital}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.email}
                    name="email"
                    label={'Emel'}
                    type="text"
                    bind:value={$form.email}
                ></TextField>

                {#if $errors?.email}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.email}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.homeAddress}
                    {disabled}
                    name="homeAddress"
                    label="Alamat Rumah"
                    bind:value={$form.homeAddress}
                />
                {#if $errors.homeAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeAddress}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.mailAddress}
                    {disabled}
                    name="mailAddress"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={$form.mailAddress}
                />
                {#if $errors.mailAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailAddress}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.propertyDeclarationStatus}
                    dropdownType="label-left-full"
                    id="propertyDeclarationStatus"
                    name="propertyDeclarationStatus"
                    label="Status Pengikstiharan Harta"
                    bind:value={$form.propertyDeclarationStatus}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.propertyDeclarationStatus}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.propertyDeclarationStatus}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={!!$errors.propertyDeclarationDate}
                    name="propertyDeclarationDate"
                    handleDateChange
                    label="Tarikh Pengikstiharan Harta"
                    bind:selectedDate={$form.propertyDeclarationDate}
                ></DateSelector>
                {#if $errors.propertyDeclarationDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.propertyDeclarationDate}</span
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
                    name="isExPoliceOrSoldier"
                    disabled={!editable}
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.isExPoliceOrSoldier}
                ></RadioSingle>
                {#if $errors.isExPoliceOrSoldier}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isExPoliceOrSoldier}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isInternalRelationship"
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isInternalRelationship}
                    ></RadioSingle>
                    {#if $form.isInternalRelationship === 'true'}
                        <TextField
                            {disabled}
                            hasError={!!$errors.employeeNumber}
                            name="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$form.employeeNumber}
                        ></TextField>

                        {#if $errors.employeeNumber}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeeNumber}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$errors.employeeName
                                ? true
                                : false
                                  ? true
                                  : false}
                            name="employeeName"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={$form.employeeName}
                        ></TextField>

                        {#if $errors.employeeName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeeName}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.employeePosition}
                            dropdownType="label-left-full"
                            id="employeePosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.employeePosition}
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.employeePosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeePosition}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.relationship}
                            dropdownType="label-left-full"
                            id="relationship"
                            label="Hubungan"
                            bind:value={$form.relationship}
                            options={[
                                { value: 'true', name: 'Suami' },
                                { value: 'false', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.relationship}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.relationship}</span
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
                    use:academicInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <p class={stepperFormTitleClass}>UPSR / Darjah 6</p>

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primarySchool
                            ? true
                            : false}
                        name="primarySchool"
                        label={'Sekolah'}
                        type="text"
                        bind:value={$academicInfoForm.primarySchool}
                    ></TextField>

                    {#if $academicInfoErrors.primarySchool}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primarySchool}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primaryYearFinished
                            ? true
                            : false}
                        name="primaryYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.primaryYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.primaryYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primaryYearFinished}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primaryGred
                            ? true
                            : false}
                        name="primaryGred"
                        label={'Gred'}
                        type="text"
                        bind:value={$academicInfoForm.primaryGred}
                    ></TextField>

                    {#if $academicInfoErrors.primaryGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primaryGred}</span
                        >
                    {/if}

                    <p class={stepperFormTitleClass}>SPM/ MCE</p>

                    <TextField
                        {disabled}
                        hasError={!!$academicInfoErrors.highSchool}
                        name="highSchool"
                        label={'Sekolah'}
                        type="text"
                        bind:value={$academicInfoForm.highSchool}
                    ></TextField>

                    {#if $academicInfoErrors.highSchool}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchool}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.highSchoolYearFinished
                            ? true
                            : false}
                        name="highSchoolYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.highSchoolYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.highSchoolYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchoolYearFinished}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.highSchoolGred
                            ? true
                            : false}
                        name="highSchoolGred"
                        label={'Ijazah/ CGPA/ Gred'}
                        type="text"
                        bind:value={$academicInfoForm.highSchoolGred}
                    ></TextField>

                    {#if $academicInfoErrors.highSchoolGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchoolGred}</span
                        >
                    {/if}

                    <p class={stepperFormTitleClass}>
                        Institut Pengajian Tinggi
                    </p>

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEdu
                            ? true
                            : false}
                        name="higherLevelEdu"
                        label={'IPT'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEdu}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEdu}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEdu}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduYearFinished
                            ? true
                            : false}
                        name="higherLevelEduYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduYearFinished}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduGred
                            ? true
                            : false}
                        name="higherLevelEduGred"
                        label={'CGPA/ Gred'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduGred}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduGred}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduCourse
                            ? true
                            : false}
                        name="higherLevelEduCourse"
                        label={'Bidang'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduCourse}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduCourse}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduCourse}</span
                        >
                    {/if}

                    <!-- <AccordianField
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
                            </AccordianField> -->
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
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
                    id="relationship"
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    if ($fileSelectionList.length === 0)
                        toast.error(
                            'Sila pastikan dokumen telah dimuat naik.',
                            {
                                style: 'background: #333; color: #fff;',
                            },
                        );
                    else getSuccessToast();
                    setTimeout(() => goto('../lantikan-baru'), 1500);
                }}
            >
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
                <!-- <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </span>
                </div> -->
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                {#if $fileSelectionList.length === 0}
                    <span class="font-sans text-sm italic text-system-danger"
                        >Sila muat naik dokumen barkaitan.</span
                    >
                {/if}
                <div
                    class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                >
                    <div class="flex flex-wrap gap-3">
                        {#each $fileSelectionList as item, index}
                            <FileInputFieldChildren
                                childrenType="grid"
                                handleDelete={() => handleDelete(index)}
                                fileName={item.name}
                            />
                        {/each}
                    </div>
                    <div
                        class="flex flex-col items-center justify-center gap-2.5"
                    >
                        <p
                            class=" text-sm text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            Pilih fail dari peranti anda.
                        </p>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            <svg
                                width={40}
                                height={40}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </div>
                        <div hidden={$fileSelectionList.length > 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div>
                    </div>
                </div>

                <!-- <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
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
                {/each} -->
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
        use:addAcademicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <TextField
            hasError={!!$addAcademicInfoErrors.title}
            {disabled}
            name="title"
            label={'Tajuk'}
            bind:value={$addAcademicInfoModal.title}
        ></TextField>
        {#if $addAcademicInfoErrors.title}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.title}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.institution}
            {disabled}
            name="institution"
            label={'Institusi'}
            bind:value={$addAcademicInfoModal.institution}
        ></TextField>
        {#if $addAcademicInfoErrors.institution}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.institution}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.year}
            {disabled}
            name="year"
            label={'Tahun'}
            bind:value={$addAcademicInfoModal.year}
        ></TextField>
        {#if $addAcademicInfoErrors.year}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.year}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.achievement}
            {disabled}
            name="achievement"
            label={'Pencapaian'}
            bind:value={$addAcademicInfoModal.achievement}
        ></TextField>
        {#if $addAcademicInfoErrors.achievement}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.achievement}</span
            >
        {/if}
        <LongTextField
            hasError={!!$addAcademicInfoErrors.remarks}
            {disabled}
            name="remarks"
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.remarks}
        ></LongTextField>
        {#if $addAcademicInfoErrors.remarks}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.remarks}</span
            >
        {/if}
        <TextIconButton primary label={'Simpan'} form="addAcademicInfoModal" />
    </form>
</Modal>

<!-- Experience Info Modal -->
<Modal title={'Tambah Maklumat Pengalaman'} bind:open={openExperienceInfoModal}>
    <form
        id="addExperienceInfoModal"
        method="POST"
        use:addExperienceModalEnhance
        class="flex w-full flex-col gap-2"
    >
        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.companyName}
            name="companyName"
            label={'Nama Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.companyName}
        ></TextField>
        {#if $addExperienceModalErrors.companyName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.companyName}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.companyAddress}
            name="companyAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.companyAddress}
        ></TextField>
        {#if $addExperienceModalErrors.companyAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.companyAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.position}
            name="position"
            label={'Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.position}
        ></TextField>
        {#if $addExperienceModalErrors.position}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.position}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.positionCode}
            name="positionCode"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$addExperienceModalForm.positionCode}
        ></TextField>

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.servicePeriod}
            name="servicePeriod"
            label={'Tempoh Perkhidmatan (tahun)'}
            type="text"
            bind:value={$addExperienceModalForm.servicePeriod}
        ></TextField>
        {#if $addExperienceModalErrors.servicePeriod}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.servicePeriod}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.serviceSalary}
            name="serviceSalary"
            label={'Gaji'}
            type="text"
            bind:value={$addExperienceModalForm.serviceSalary}
        ></TextField>
        {#if $addExperienceModalErrors.serviceSalary}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.serviceSalary}</span
            >
        {/if}
        <TextIconButton
            primary
            label={'Simpan'}
            form="addExperienceInfoModal"
        />
    </form>
</Modal>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <form
        id="addMembershipInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={!!$experienceInfoErrors.namaMajikan}
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
            hasError={!!$experienceInfoErrors.alamatMajikan}
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
            hasError={!!$experienceInfoErrors.jawatanPengalaman}
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
            hasError={!!$experienceInfoErrors.tempohPerkhidmatan}
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
            hasError={!!$experienceInfoErrors.gajiPengalaman}
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
        <TextIconButton
            primary
            label={'Simpan'}
            form="addMembershipInfoModal"
        />
    </form>
</Modal>

<!-- Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openFamilyInfoModal}
>
    <form
        id="addFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:experienceInfoEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={!!$experienceInfoErrors.namaMajikan}
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
            hasError={!!$experienceInfoErrors.alamatMajikan}
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
            hasError={!!$experienceInfoErrors.jawatanPengalaman}
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
            hasError={!!$experienceInfoErrors.tempohPerkhidmatan}
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
            hasError={!!$experienceInfoErrors.gajiPengalaman}
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
            hasError={!!$experienceInfoErrors.namaMajikan}
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
            hasError={!!$experienceInfoErrors.alamatMajikan}
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
            hasError={!!$experienceInfoErrors.jawatanPengalaman}
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
            hasError={!!$experienceInfoErrors.tempohPerkhidmatan}
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
            hasError={!!$experienceInfoErrors.gajiPengalaman}
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
