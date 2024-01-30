<script lang="ts">
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperOtherRolesResult from '$lib/components/stepper-conditional-rules/StepperOtherRolesResult.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _secretaryApprovalInfoSchema,
        _secretarySetApproversSchema,
        _serviceInfoSchema,
        _submitSecretaryApprovalForm,
        _submitSecretarySetApproverForm,
        _submitServiceInfoForm,
    } from './+page';
    import Stepper204 from '$lib/components/stepper-conditional-rules/Stepper204.svelte';
    import type { CandidatePersonalData } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model';
    import {
    approveOptions,
        certifyOptions,
        commonOptions,
        supportOptions,
    } from '$lib/constants/mypsm/radio-option-constants';
    export let data: PageData;

    const personalDetails: CandidatePersonalData =
        data.personalDetailResponse.data;

    let isSuccessPersonalFormResponse: boolean =
        data.personalDetailResponse.status >= 200 &&
        data.personalDetailResponse.status <= 201;
    let isReadonlyPersonalFormStepper: boolean =
        data.personalDetailResponse?.data?.isReadonly;

    let isSuccessAcademicFormResponse: boolean =
        data.academicInfoResponse.status >= 200 &&
        data.academicInfoResponse.status <= 201;
    let isReadonlyAcademicFormStepper: boolean =
        data.academicInfoResponse?.data?.isReadonly;

    let isSuccessExperienceFormResponse: boolean =
        data.experienceInfoResponse.status >= 200 &&
        data.experienceInfoResponse.status <= 201;
    let isReadonlyExperienceFormStepper: boolean =
        data.experienceInfoResponse?.data?.isReadonly;

    let isSuccessActivityFormResponse: boolean =
        data.activityInfoResponse.status >= 200 &&
        data.activityInfoResponse.status <= 201;
    let isReadonlyActivityFormStepper: boolean =
        data.activityInfoResponse?.data?.isReadonly;

    let isSuccessFamilyFormResponse: boolean =
        data.familyInfoResponse.status >= 200 &&
        data.familyInfoResponse.status <= 201;
    let isReadonlyFamilyFormStepper: boolean =
        data.familyInfoResponse?.data?.isReadonly;

    let isSuccessDependencyFormResponse: boolean =
        data.dependencyInfoResponse.status >= 200 &&
        data.dependencyInfoResponse.status <= 201;
    let isReadonlyDependencyFormStepper: boolean =
        data.dependencyInfoResponse?.data?.isReadonly;

    let isSuccessNextOfKinFormResponse: boolean =
        data.nextOfKinInfoResponse.status >= 200 &&
        data.nextOfKinInfoResponse.status <= 201;
    let isReadonlyNextOfKinFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.isReadonly;

    let isSuccessDocumentFormResponse: boolean =
        data.documentInfoResponse.status >= 200 &&
        data.documentInfoResponse.status <= 201;
    let isReadonlyDocumentFormStepper: boolean =
        data.documentInfoResponse?.data?.isReadonly;

    let isSuccessServiceFormResponse: boolean =
        data.serviceResponse.status >= 200 &&
        data.serviceResponse.status <= 201;
    let isReadonlyServiceFormStepper: boolean =
        data.serviceResponse?.data?.isReadonly;

    let isSuccessSetApproversResponse: boolean =
        data.secretaryGetApproversResponse.status >= 200 &&
        data.secretaryGetApproversResponse.status <= 201;
    let isReadonlySetApproversFormStepper: boolean =
        data.secretaryGetApproversResponse?.data?.isReadonly;

    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    // =========================================================================
    // function to assign the content  of the tooltip
    // =========================================================================
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';

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

    const {
        form: serviceInfoForm,
        errors: serviceInfoErrors,
        enhance: serviceInfoEnhance,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        validators: _serviceInfoSchema,
        onSubmit() {
            _submitServiceInfoForm($serviceInfoForm);
        },
    });

    const {
        form: secretaryApprovalInfoForm,
        errors: secretaryApprovalInfoErrors,
        enhance: secretaryApprovalInfoEnhance,
    } = superForm(data.secretaryApprovalInfoForm, {
        SPA: true,
        validators: _secretaryApprovalInfoSchema,
        onSubmit() {
            _submitSecretaryApprovalForm($secretaryApprovalInfoForm);
        },
    });

    const {
        form: secretarySetApproverForm,
        errors: secretarySetApproverErrors,
        enhance: secretarySetApproverEnhance,
    } = superForm(data.secretarySetApproversForm, {
        SPA: true,
        validators: _secretarySetApproversSchema,
        onSubmit() {
            _submitSecretarySetApproverForm($secretarySetApproverForm);
        },
    });
</script>

<ContentHeader title="Maklumat Lantikan Baru" description=""
    ><FormButton
        type="close"
        onClick={() => {
            // goto('../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi" />
        <StepperContentBody>
            {#if isSuccessPersonalFormResponse}
                <div class="flex w-full flex-col gap-2.5">
                    <!-- Maklumat Peribadi -->
                    <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="name"
                        label={'Nama Penuh'}
                        type="text"
                        bind:value={personalDetails.name}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="alternativeName"
                        label={'Nama Lain'}
                        type="text"
                        bind:value={personalDetails.alternativeName}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="identityDocumentNumber"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={personalDetails.identityDocumentNumber}
                    ></TextField>

                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="titleId"
                        name="titleId"
                        label="Gelaran"
                        bind:value={personalDetails.titleId}
                        options={data.titleLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="identityDocumentColor"
                        name="identityDocumentColor"
                        label="Warna Kad Pengenalan"
                        options={data.identityCardColorLookup}
                        bind:value={personalDetails.identityDocumentColor}
                    ></DropdownSelect>
                    <DateSelector
                        disabled={isReadonlyPersonalFormStepper}
                        name="birthDate"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={personalDetails.birthDate}
                    ></DateSelector>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="birthStateId"
                        name="birthStateId"
                        label="Tempat Lahir"
                        bind:value={personalDetails.birthStateId}
                        options={data.stateLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="birthCountryId"
                        name="birthCountryId"
                        label="Negara Dilahirkan"
                        bind:value={personalDetails.birthCountryId}
                        options={data.countryLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="nationalityId"
                        name="nationalityId"
                        label="Warganegara"
                        bind:value={personalDetails.nationalityId}
                        options={data.nationalityLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="raceId"
                        name="raceId"
                        label="Bangsa"
                        bind:value={personalDetails.raceId}
                        options={data.raceLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="ethnicId"
                        name="ethnicId"
                        label="Etnik"
                        bind:value={personalDetails.ethnicId}
                        options={data.ethnicityLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="religionId"
                        name="religionId"
                        label="Agama"
                        bind:value={personalDetails.religionId}
                        options={data.religionLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="genderId"
                        name="genderId"
                        label="Jantina"
                        bind:value={personalDetails.genderId}
                        options={data.genderLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="maritalId"
                        label="Status Perkahwinan"
                        bind:value={personalDetails.maritalId}
                        options={data.maritalLookup}
                    ></DropdownSelect>
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="email"
                        label={'Emel'}
                        type="text"
                        bind:value={personalDetails.email}
                    ></TextField>

                    <LongTextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="homeAddress"
                        label="Alamat Rumah"
                        bind:value={personalDetails.homeAddress}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="homeCountryId"
                        name="homeCountryId"
                        label="Negara"
                        options={data.countryLookup}
                        bind:value={personalDetails.homeCountryId}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="homeStateId"
                        name="homeStateId"
                        label="Negeri"
                        options={data.stateLookup}
                        bind:value={personalDetails.homeStateId}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="homeStateId"
                        name="homeCityId"
                        label="Bandar"
                        options={data.cityLookup}
                        bind:value={personalDetails.homeCityId}
                    />
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="homePostcode"
                        label="Poskod Rumah"
                        bind:value={personalDetails.homePostcode}
                    />

                    <LongTextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="mailAddress"
                        label="Alamat Surat Menyurat"
                        bind:value={personalDetails.mailAddress}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="mailCountryId"
                        name="mailCountryId"
                        label="Negara Surat Menyurat"
                        options={data.countryLookup}
                        bind:value={personalDetails.mailCountryId}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="mailStateId"
                        name="mailStateId"
                        label="Negeri Surat Menyurat"
                        options={data.stateLookup}
                        bind:value={personalDetails.mailStateId}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="mailStateId"
                        name="mailCityId"
                        label="Bandar Surat Menyurat"
                        options={data.cityLookup}
                        bind:value={personalDetails.mailCityId}
                    />
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="mailPostcode"
                        label="Poskod Surat Menyurat"
                        bind:value={personalDetails.mailPostcode}
                    />
                    <RadioSingle
                        disabled={isReadonlyPersonalFormStepper}
                        name="assetDeclarationStatusId"
                        legend="Status Pengikstiharan Harta"
                        bind:userSelected={personalDetails.assetDeclarationStatusId}
                        options={commonOptions}
                    ></RadioSingle>
                    <DateSelector
                        disabled={isReadonlyPersonalFormStepper}
                        name="propertyDeclarationDate"
                        handleDateChange
                        label="Tarikh Pengikstiharan Harta"
                        bind:selectedDate={personalDetails.propertyDeclarationDate}
                    ></DateSelector>
                    <RadioSingle
                        name="isExPoliceOrSoldier"
                        disabled={isReadonlyPersonalFormStepper}
                        options={commonOptions}
                        legend={'Bekas Polis / Tentera'}
                        bind:userSelected={personalDetails.isExPoliceOrSoldier}
                    ></RadioSingle>
                    <div class="flex w-full flex-col gap-2">
                        <p class={stepperFormTitleClass}>
                            Maklumat Pertalian Dengan Kakitangan LKIM
                        </p>

                        <RadioSingle
                            name="isInternalRelationship"
                            options={commonOptions}
                            disabled={isReadonlyPersonalFormStepper}
                            legend={'Perhubungan Dengan Kakitangan LKIM'}
                            bind:userSelected={personalDetails.isInternalRelationship}
                        ></RadioSingle>
                        {#if personalDetails.isInternalRelationship}
                            <TextField
                                disabled={isReadonlyPersonalFormStepper}
                                name="employeeNumber"
                                label={'No. Pekerja LKIM'}
                                type="text"
                                bind:value={personalDetails.employeeNumber}
                            ></TextField>

                            <TextField
                                disabled={isReadonlyPersonalFormStepper}
                                name="employeeName"
                                label={'Nama Kakitangan LKIM'}
                                type="text"
                                bind:value={personalDetails.employeeName}
                            ></TextField>

                            <DropdownSelect
                                disabled={isReadonlyPersonalFormStepper}
                                dropdownType="label-left-full"
                                id="employeePosition"
                                label="Jawatan Kakitangan LKIM"
                                bind:value={personalDetails.employeePosition}
                                options={data.positionLookup}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled={isReadonlyPersonalFormStepper}
                                dropdownType="label-left-full"
                                id="relationshipId"
                                label="Hubungan"
                                bind:value={personalDetails.relationshipId}
                                options={data.relationshipLookup}
                            ></DropdownSelect>
                        {/if}
                    </div>
                </div>
            {:else}
                <Stepper204 bind:status={data.personalDetailResponse.status} />
            {/if}
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        ></StepperContentHeader>

        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#if isSuccessAcademicFormResponse}
                    {#each data.academicInfoResponse.data.academicList as academic, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <div
                                class="mb-5 mt-2.5 text-sm text-system-primary"
                            >
                                <p>Maklumat Akademik #{i + 1}</p>
                            </div>
                            <DropdownSelect
                                disabled
                                name="majorId"
                                dropdownType="label-left-full"
                                label={'Jenis Jurusan'}
                                options={data.majorMinorLookup}
                                bind:value={academic.majorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="minorId"
                                dropdownType="label-left-full"
                                label={'Jenis Khusus'}
                                options={data.majorMinorLookup}
                                bind:value={academic.minorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="countryId"
                                dropdownType="label-left-full"
                                label={'Negara'}
                                options={data.countryLookup}
                                bind:value={academic.countryId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="institutionId"
                                dropdownType="label-left-full"
                                label={'Institusi'}
                                options={data.institutionLookup}
                                bind:value={academic.institutionId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="educationLevelId"
                                dropdownType="label-left-full"
                                label={'Taraf Pembelajaran'}
                                options={data.educationLookup}
                                bind:value={academic.educationLevelId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="sponsorshipId"
                                dropdownType="label-left-full"
                                label={'Penajaan'}
                                options={data.sponsorshipLookup}
                                bind:value={academic.sponsorshipId}
                            ></DropdownSelect>

                            <TextField
                                disabled
                                name="name"
                                label={'Nama Kelulusan/Sijil'}
                                type="text"
                                bind:value={academic.name}
                            ></TextField>

                            <TextField
                                disabled
                                name="completionDate"
                                label={'Tahun Kelulusan'}
                                type="text"
                                bind:value={academic.completionDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="finalGrade"
                                label={'Gred Akhir'}
                                type="text"
                                bind:value={academic.finalGrade}
                            ></TextField>

                            <TextField
                                disabled
                                name="field"
                                label={'Catatan'}
                                type="text"
                                bind:value={academic.field}
                            ></TextField>
                        </div>
                    {/each}
                {:else}
                    <Stepper204
                        bind:status={data.academicInfoResponse.status}
                    />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#if isSuccessExperienceFormResponse}
                    {#each data.experienceInfoResponse.data.experienceList as record, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <p class={stepperFormTitleClass}>
                                Maklumat Pengalaman #{i + 1}
                            </p>
                            <TextField
                                disabled
                                name="company"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={record.company}
                            ></TextField>

                            <TextField
                                disabled
                                name="address"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={record.address}
                            ></TextField>

                            <TextField
                                disabled
                                name="position"
                                label={'Jawatan'}
                                type="text"
                                bind:value={record.position}
                            ></TextField>

                            <TextField
                                disabled
                                name="positionCode"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={record.positionCode}
                            ></TextField>

                            <TextField
                                disabled
                                name="startDate"
                                label={'Dari (tahun)'}
                                type="text"
                                bind:value={record.startDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="endDate"
                                label={'Hingga (tahun)'}
                                type="text"
                                bind:value={record.endDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="salary"
                                label={'Gaji'}
                                type="text"
                                bind:value={record.salary}
                            ></TextField>
                        </div>
                    {/each}
                {:else}
                    <Stepper204
                        bind:status={data.experienceInfoResponse.status}
                    />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessActivityFormResponse}
                    <DynamicTable
                        tableItems={data.activityInfoResponse.data.activityList}
                    ></DynamicTable>
                {:else}
                    <Stepper204
                        bind:status={data.activityInfoResponse.status}
                    />
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessFamilyFormResponse}
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {:else}
                    <Stepper204 bind:status={data.familyInfoResponse.status} />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Suami/Isteri dan Anak"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessDependencyFormResponse}
                    <DynamicTable
                        tableItems={data.dependencyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {:else}
                    <Stepper204
                        bind:status={data.dependencyInfoResponse.status}
                    />
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2 overflow-y-auto"></div>
            <div class="flex w-full flex-col gap-2 overflow-y-auto">
                {#if isSuccessNextOfKinFormResponse}
                    <DynamicTable
                        tableItems={data.nextOfKinInfoResponse.data
                            .nextOfKinList}
                    ></DynamicTable>
                {:else}
                    <Stepper204
                        bind:status={data.nextOfKinInfoResponse.status}
                    />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
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
                {#if isSuccessDocumentFormResponse}
                    File list to be listed here...
                {:else}
                    <Stepper204
                        bind:status={data.documentInfoResponse.status}
                    />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru">
            {#if !isReadonlyServiceFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="newHireEmploymentServiceForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
            <form
                id="newHireEmploymentServiceForm"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <!-- <input hidden bind:value={$serviceInfoForm.candidateId} /> -->
                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.gradeId}
                    dropdownType="label-left-full"
                    id="gradeId"
                    label="Gred Semasa"
                    bind:value={$serviceInfoForm.gradeId}
                    options={data.gradeLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.gradeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.gradeId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.maxGradeId}
                    dropdownType="label-left-full"
                    id="maxGradeId"
                    label="Gred Maksimum"
                    bind:value={$serviceInfoForm.maxGradeId}
                    options={data.gradeLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.maxGradeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.maxGradeId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.positionId}
                    dropdownType="label-left-full"
                    id="positionId"
                    label="Jawatan"
                    bind:value={$serviceInfoForm.positionId}
                    options={data.positionLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.positionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.positionId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.placementId}
                    dropdownType="label-left-full"
                    id="placementId"
                    label="Penempatan"
                    bind:value={$serviceInfoForm.placementId}
                    options={data.placementLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.placementId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.placementId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.serviceTypeId}
                    dropdownType="label-left-full"
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceTypeId}
                    options={data.educationLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceTypeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceTypeId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.serviceGroupId}
                    dropdownType="label-left-full"
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceGroupId}
                    options={data.serviceGroupLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceGroupId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceGroupId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.unitId}
                    dropdownType="label-left-full"
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:value={$serviceInfoForm.unitId}
                    options={data.unitLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.unitId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.unitId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.employmentStatusId}
                    dropdownType="label-left-full"
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:value={$serviceInfoForm.employmentStatusId}
                    options={data.serviceTypeLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.employmentStatusId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.employmentStatusId}</span
                    >
                {/if}

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.effectiveDate}
                    name="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    bind:selectedDate={$serviceInfoForm.effectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.effectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.effectiveDate}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.retirementBenefit}
                    dropdownType="label-left-full"
                    id="retirementBenefit"
                    label="Faedah Persaraan"
                    bind:value={$serviceInfoForm.retirementBenefit}
                    options={data.retirementBenefitLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.retirementBenefit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementBenefit}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.epfNumber}
                    name="epfNumber"
                    label={'No. KWSP'}
                    bind:value={$serviceInfoForm.epfNumber}
                ></TextField>
                {#if $serviceInfoErrors.epfNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.epfNumber}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.socsoNumber}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    bind:value={$serviceInfoForm.socsoNumber}
                ></TextField>
                {#if $serviceInfoErrors.socsoNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.socsoNumber}</span
                    >
                {/if}
                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.incomeNumber}
                    name="incomeNumber"
                    label={'No. Cukai'}
                    bind:value={$serviceInfoForm.incomeNumber}
                ></TextField>
                {#if $serviceInfoErrors.incomeNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.incomeNumber}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.bankName}
                    name="bankName"
                    label={'Bank'}
                    bind:value={$serviceInfoForm.bankName}
                ></TextField>
                {#if $serviceInfoErrors.bankName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankName}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.bankAccount}
                    name="bankAccount"
                    label={'No. Akaun'}
                    bind:value={$serviceInfoForm.bankAccount}
                ></TextField>
                {#if $serviceInfoErrors.bankAccount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankAccount}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.eligibleLeaveCount}
                    name="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    bind:value={$serviceInfoForm.eligibleLeaveCount}
                ></TextField>
                {#if $serviceInfoErrors.eligibleLeaveCount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.eligibleLeaveCount}</span
                    >
                {/if}

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.civilServiceStartDate}
                    name="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    bind:selectedDate={$serviceInfoForm.civilServiceStartDate}
                ></DateSelector>
                {#if $serviceInfoErrors.civilServiceStartDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.civilServiceStartDate}</span
                    >
                {/if}
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.firstServiceDate}
                    name="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstServiceDate}</span
                    >
                {/if}
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.serviceDate}
                    name="serviceDate"
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    bind:selectedDate={$serviceInfoForm.serviceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.serviceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceDate}</span
                    >
                {/if}
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.firstConfirmServiceDate}
                    name="firstConfirmServiceDate"
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstConfirmServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstConfirmServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstConfirmServiceDate}</span
                    >
                {/if}
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.confirmDate}
                    name="confirmDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    bind:selectedDate={$serviceInfoForm.confirmDate}
                ></DateSelector>
                {#if $serviceInfoErrors.confirmDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.confirmDate}</span
                    >
                {/if}

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.firstEffectiveDate}
                    name="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    bind:selectedDate={$serviceInfoForm.firstEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstEffectiveDate}</span
                    >
                {/if}
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.newRecruitEffectiveDate}
                    name="newRecruitEffectiveDate"
                    label={'Tarikh Lantikan Baru'}
                    bind:selectedDate={$serviceInfoForm.newRecruitEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.newRecruitEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.newRecruitEffectiveDate}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.pensionNumber}
                    name="pensionNumber"
                    label={'Nombor Pencen'}
                    bind:value={$serviceInfoForm.pensionNumber}
                ></TextField>
                {#if $serviceInfoErrors.pensionNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.pensionNumber}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.revisionMonth}
                    dropdownType="label-left-full"
                    id="revisionMonth"
                    label="Bulan KGT"
                    bind:value={$serviceInfoForm.revisionMonth}
                    options={data.monthStringLookup}
                ></DropdownSelect>

                {#if $serviceInfoErrors.revisionMonth}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.revisionMonth}</span
                    >
                {/if}

                <TextField
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.kgt}
                    name="kgt"
                    type="number"
                    label={'KGT'}
                    bind:value={$serviceInfoForm.kgt}
                ></TextField>
                {#if $serviceInfoErrors.kgt}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.kgt}</span
                    >
                {/if}

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    hasError={!!$serviceInfoErrors.retirementDate}
                    name="retirementDate"
                    label={'Tarikh Bersara'}
                    bind:selectedDate={$serviceInfoForm.retirementDate}
                ></DateSelector>
                {#if $serviceInfoErrors.retirementDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementDate}</span
                    >
                {/if}

                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <!-- <TextField
                            hasError={!!$serviceInfoErrors.salaryDateOfEffect}
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            bind:value={'12/12/2021'}
                        ></TextField>
                        {#if $serviceInfoErrors.salaryDateOfEffect}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.salaryDateOfEffect}</span
                            >
                        {/if} -->
                        <TextField
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.maximumSalary}
                            name="maximumSalary"
                            label={'Tangga Gaji'}
                            bind:value={$serviceInfoForm.maximumSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.maximumSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.maximumSalary}</span
                            >
                        {/if}

                        <TextField
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.baseSalary}
                            name="baseSalary"
                            label={'Gaji Pokok'}
                            bind:value={$serviceInfoForm.baseSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.baseSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.baseSalary}</span
                            >
                        {/if}
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.itka}
                            name="itka"
                            label={'ITKA'}
                            bind:value={$serviceInfoForm.itka}
                        ></TextField>
                        {#if $serviceInfoErrors.itka}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itka}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.itp}
                            name="itp"
                            label={'ITP'}
                            bind:value={$serviceInfoForm.itp}
                        ></TextField>
                        {#if $serviceInfoErrors.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itp}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.epw}
                            name="epw"
                            label={'EPW'}
                            bind:value={$serviceInfoForm.epw}
                        ></TextField>
                        {#if $serviceInfoErrors.epw}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.epw}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={isReadonlyServiceFormStepper}
                            hasError={!!$serviceInfoErrors.cola}
                            name="cola"
                            label={'COLA'}
                            bind:value={$serviceInfoForm.cola}
                        ></TextField>
                        {#if $serviceInfoErrors.cola}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.cola}</span
                            >
                        {/if}
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        > -->
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Keputusan Lantikan Baru (Urus Setia Perjawatan)"
        >
            {#if !data.secretaryApprovalResponse.data.isApproved}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="newEmploymentSecretaryResultForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="newEmploymentSecretaryResultForm"
                method="POST"
                use:secretaryApprovalInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <div class="mb-5">
                    <b class="text-sm text-system-primary"
                        >Keputusan Urus Setia Perjawatan</b
                    >
                </div>

                <input hidden bind:value={$secretaryApprovalInfoForm.id} />

                <LongTextField
                    disabled={data.secretaryApprovalResponse.data.isApproved}
                    hasError={!!$secretaryApprovalInfoErrors.remark}
                    name="remark"
                    label="Tindakan/Ulasan"
                    bind:value={$secretaryApprovalInfoForm.remark}
                ></LongTextField>
                {#if $secretaryApprovalInfoErrors.remark}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$secretaryApprovalInfoErrors.remark}</span
                    >
                {/if}

                <RadioSingle
                    disabled={data.secretaryApprovalResponse.data.isApproved}
                    name="isApproved"
                    options={certifyOptions}
                    legend={'Keputusan'}
                    bind:userSelected={$secretaryApprovalInfoForm.isApproved}
                ></RadioSingle>
                {#if $secretaryApprovalInfoErrors.isApproved}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$secretaryApprovalInfoErrors.isApproved}</span
                    >
                {/if}
            </form>
            <hr />
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)">
            {#if !isReadonlySetApproversFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="newEmploymentAssignApproverSupporterForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="newEmploymentAssignApproverSupporterForm"
                method="POST"
                use:secretarySetApproverEnhance
                class="flex w-full flex-col gap-2"
            >
                <input
                    hidden
                    bind:value={$secretarySetApproverForm.candidateId}
                />
                <DropdownSelect
                    disabled={isReadonlySetApproversFormStepper}
                    hasError={!!$secretarySetApproverErrors.supporterId}
                    id="supporterId"
                    label="Nama Penyokong"
                    dropdownType="label-left-full"
                    options={[
                        {
                            value: 1,
                            name: 'Mohd Iqbal',
                        },
                    ]}
                    bind:value={$secretarySetApproverForm.supporterId}
                />
                {#if $secretarySetApproverErrors.supporterId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$secretarySetApproverErrors.supporterId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={isReadonlySetApproversFormStepper}
                    hasError={!!$secretarySetApproverErrors.approverId}
                    id="approverId"
                    label="Nama Pelulus"
                    dropdownType="label-left-full"
                    options={[
                        {
                            value: 2,
                            name: 'Mohd Kairom',
                        },
                    ]}
                    bind:value={$secretarySetApproverForm.approverId}
                />
                {#if $secretarySetApproverErrors.approverId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$secretarySetApproverErrors.approverId}</span
                    >
                {/if}
            </form>
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
                        name="supporterName"
                        label="Nama"
                        bind:value={data.supporterResultResponse.data.name}
                    ></TextField>
                    {#if data.supporterResultResponse.data.isApproved}
                        <LongTextField
                            disabled
                            name="supporterRemark"
                            label="Tindakan/Ulasan"
                            bind:value={data.supporterResultResponse.data
                                .remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="supporterIsApproved"
                            options={supportOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.supporterResultResponse.data
                                .isApproved}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Pelulus</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="approverName"
                        label="Nama"
                        bind:value={data.approverResultResponse.data.name}
                    ></TextField>
                    {#if data.approverResultResponse.data.isApproved}
                        <LongTextField
                            disabled
                            name="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:value={data.approverResultResponse.data.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="approverIsApproved"
                            options={approveOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.approverResultResponse.data
                                .isApproved}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
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
                        bind:value={data.secretaryApprovalResponse.data.name}
                    ></TextField>
                    {#if !!data.secretaryApprovalResponse.data.isApproved}
                        <LongTextField
                            disabled
                            name="service-secretary-remark"
                            label="Tindakan/Ulasan"
                            bind:value={data.secretaryApprovalResponse.data
                                .remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            name="supporterIsApproved"
                            options={certifyOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.secretaryApprovalResponse
                                .data.isApproved}
                        ></RadioSingle>
                    {:else}
                        <StepperOtherRolesResult />
                    {/if}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
