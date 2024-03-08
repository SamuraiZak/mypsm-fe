<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import { goto } from '$app/navigation';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _submitAcademicDetailForm,
        _submitActivityDetailForm,
        _submitDependantDetailForm,
        _submitDocumentForm,
        _submitEditNewContractEmployeeDetailForm,
        _submitExperienceDetailForm,
        _submitFamilyDetailForm,
        _submitNextOfKinForm,
        _submitSecretaryContractResultForm,
        _submitUpdateContractDetailForm,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _addContractAcademicSchema,
        _addContractActivitySchema,
        _addContractCommonRoleResult,
        _addContractExperienceSchema,
        _addContractSecretaryUpdate,
        _commonContractDependencySchema,
        _contractAcademicSchema,
        _editNewContractEmployeeSchema,
        _uploadDocSchema,
    } from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
    import { Toaster } from 'svelte-french-toast';
    import { Checkbox } from 'flowbite-svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import type { ContractAcademic } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto';
    import type { ContractExperience } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto';
    import type { ContractActivity } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto';
    import type { ContractDependency } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto';
    import { getErrorToast } from '$lib/helpers/core/toast.helper';
    import { error } from '@sveltejs/kit';

    export let data: PageData;

    // temporay arrays for list details
    let tempAcademicRecord: ContractAcademic[] = [];
    let tempExperienceRecord: ContractExperience[] = [];
    let tempActivityRecord: ContractActivity[] = [];
    let tempFamilyRecord: ContractDependency[] = [];
    let tempNonFamilyRecord: ContractDependency[] = [];
    let tempNextOfKinRecord: ContractDependency[] = [];
    let tempNextOfKinFromFamily: ContractDependency[] = [];

    // checkbox for 1st stepper if mail address is the same as home address
    let sameAddress: boolean = false;
    const {
        form: editNewContractEmployeeDetailForm,
        errors: editNewContractEmployeeDetailError,
        enhance: editNewContractEmployeeDetailEnhance,
    } = superForm(data.editNewContractEmployeeDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'addContractPersonalDetailForm',
        validators: zod(_editNewContractEmployeeSchema),
        onSubmit() {
            if ($editNewContractEmployeeDetailForm.isInternalRelationship) {
                $editNewContractEmployeeDetailForm.employeeNumber = '';
                $editNewContractEmployeeDetailForm.relationshipId = 0;
            } else {
                $editNewContractEmployeeDetailForm.employeeNumber = null;
                $editNewContractEmployeeDetailForm.relationshipId = null;
            }
            _submitEditNewContractEmployeeDetailForm(
                $editNewContractEmployeeDetailForm,
            );
        },
    });

    const {
        form: contractUploadDocumentForm,
        errors: contractUploadDocumentError,
        enhance: contractUploadDocumentEnhance,
    } = superForm(data.contractUploadDocumentForm, {
        SPA: true,
        taintedMessage: false,
        id: 'documentUploadForm',
        validators: zod(_uploadDocSchema),
        onSubmit() {
            _submitDocumentForm($contractUploadDocumentForm.document);
        },
    });

    const {
        form: academicDetailForm,
        errors: academicDetailError,
        enhance: academicDetailEnhance,
    } = superForm(data.academicDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'academicDetailForm',
        validators: zod(_addContractAcademicSchema),
        onSubmit() {
            _submitAcademicDetailForm($academicDetailForm);
        },
    });
    const {
        form: experienceDetailForm,
        errors: experienceDetailError,
        enhance: experienceDetailEnhance,
    } = superForm(data.experienceDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'experienceDetailForm',
        validators: zod(_addContractExperienceSchema),
        onSubmit() {
            _submitExperienceDetailForm($experienceDetailForm);
        },
    });
    const {
        form: activityDetailForm,
        errors: activityDetailError,
        enhance: activityDetailEnhance,
    } = superForm(data.activityDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'activityDetailForm',
        validators: zod(_addContractActivitySchema),
        onSubmit() {
            _submitActivityDetailForm($activityDetailForm);
        },
    });
    const {
        form: familyDetailForm,
        errors: familyDetailError,
        enhance: familyDetailEnhance,
    } = superForm(data.familyDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'familyDetailForm',
        validators: zod(_commonContractDependencySchema),
        onSubmit() {
            _submitFamilyDetailForm($familyDetailForm);
        },
    });
    const {
        form: dependantDetailForm,
        errors: dependantDetailError,
        enhance: dependantDetailEnhance,
    } = superForm(data.dependantDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'dependantDetailForm',
        validators: zod(_commonContractDependencySchema),
        onSubmit() {
            _submitDependantDetailForm($dependantDetailForm);
        },
    });
    const {
        form: nextOfKinDetailForm,
        errors: nextOfKinDetailError,
        enhance: nextOfKinDetailEnhance,
    } = superForm(data.nextOfKinDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'nextOfKinDetailForm',
        validators: zod(_commonContractDependencySchema),
        onSubmit() {
            _submitNextOfKinForm($nextOfKinDetailForm);
        },
    });
    const {
        form: updateContractDetailForm,
        errors: updateContractDetailError,
        enhance: updateContractDetailEnhance,
    } = superForm(data.updateContractDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'updateContractDetailForm',
        validators: zod(_addContractSecretaryUpdate),
        onSubmit() {
            $updateContractDetailForm.candidateId = data.contractId.id;
            _submitUpdateContractDetailForm($updateContractDetailForm);
        },
    });
    const {
        form: secretaryContractResultForm,
        errors: secretaryContractResultError,
        enhance: secretaryContractResultEnhance,
    } = superForm(data.secretaryContractResultForm, {
        SPA: true,
        taintedMessage: false,
        id: 'secretaryContractResultForm',
        validators: zod(_addContractCommonRoleResult),
        onSubmit() {
            $secretaryContractResultForm.id = data.contractId.id;
            _submitSecretaryContractResultForm($secretaryContractResultForm);
        },
    });

    $: if (sameAddress) {
        $editNewContractEmployeeDetailForm.mailAddress =
            $editNewContractEmployeeDetailForm.homeAddress;
        $editNewContractEmployeeDetailForm.mailCityId =
            $editNewContractEmployeeDetailForm.homeCityId;
        $editNewContractEmployeeDetailForm.mailCountryId =
            $editNewContractEmployeeDetailForm.homeCountryId;
        $editNewContractEmployeeDetailForm.mailStateId =
            $editNewContractEmployeeDetailForm.homeStateId;
        $editNewContractEmployeeDetailForm.mailPostcode =
            $editNewContractEmployeeDetailForm.homePostcode;
    }

    const handleOnInput = (e: Event) => {
        $contractUploadDocumentForm.document =
            ((e.currentTarget as HTMLInputElement)?.files?.item(0) as File) ??
            null;
    };
    function handleDelete() {
        $contractUploadDocumentForm.document = null;
    }

    const secretaryOption: RadioDTO[] = [
        { value: true, name: 'SAH' },
        { value: false, name: 'TIDAK SAH' },
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi">
                <TextIconButton
                    label="Simpan"
                    form="editNewContractEmployeeDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    id="editNewContractEmployeeDetailForm"
                    method="POST"
                    use:editNewContractEmployeeDetailEnhance
                >
                    <CustomTextField
                        label="Nama Penuh"
                        placeholder="Mohd. Syafiq"
                        id="name"
                        bind:val={$editNewContractEmployeeDetailForm.name}
                        errors={$editNewContractEmployeeDetailError.name}
                    />
                    <CustomSelectField
                        label="Gelaran Nama"
                        id="titleId"
                        options={data.selectOption.titleLookup}
                        bind:val={$editNewContractEmployeeDetailForm.titleId}
                        errors={$editNewContractEmployeeDetailError.titleId}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        placeholder="Fiq"
                        bind:val={$editNewContractEmployeeDetailForm.alternativeName}
                        errors={$editNewContractEmployeeDetailError.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        bind:val={$editNewContractEmployeeDetailForm.identityDocumentNumber}
                        errors={$editNewContractEmployeeDetailError.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        options={data.selectOption.identityCardTypeLookup}
                        bind:val={$editNewContractEmployeeDetailForm.identityDocumentColor}
                        errors={$editNewContractEmployeeDetailError.identityDocumentColor}
                    />
                    <CustomTextField
                        label="Emel"
                        id="email"
                        bind:val={$editNewContractEmployeeDetailForm.email}
                        errors={$editNewContractEmployeeDetailError.email}
                    />
                    <CustomTextField
                        label="No. Telefon Bimbit"
                        placeholder="01104220000"
                        id="phoneNumber"
                        bind:val={$editNewContractEmployeeDetailForm.phoneNumber}
                        errors={$editNewContractEmployeeDetailError.phoneNumber}
                    />

                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        type="date"
                        bind:val={$editNewContractEmployeeDetailForm.birthDate}
                        errors={$editNewContractEmployeeDetailError.birthDate}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        options={data.selectOption.stateLookup}
                        bind:val={$editNewContractEmployeeDetailForm.birthStateId}
                        errors={$editNewContractEmployeeDetailError.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$editNewContractEmployeeDetailForm.birthCountryId}
                        errors={$editNewContractEmployeeDetailError.birthCountryId}
                    />
                    <CustomSelectField
                        label="Warganegara"
                        id="nationalityId"
                        options={data.selectOption.nationalityLookup}
                        bind:val={$editNewContractEmployeeDetailForm.nationalityId}
                        errors={$editNewContractEmployeeDetailError.nationalityId}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        options={data.selectOption.raceLookup}
                        bind:val={$editNewContractEmployeeDetailForm.raceId}
                        errors={$editNewContractEmployeeDetailError.raceId}
                    />
                    <CustomSelectField
                        label="Agama"
                        id="religionId"
                        options={data.selectOption.religionLookup}
                        bind:val={$editNewContractEmployeeDetailForm.religionId}
                        errors={$editNewContractEmployeeDetailError.religionId}
                    />
                    <CustomSelectField
                        label="Etnik"
                        id="ethnicId"
                        options={data.selectOption.ethnicLookup}
                        bind:val={$editNewContractEmployeeDetailForm.ethnicId}
                        errors={$editNewContractEmployeeDetailError.ethnicId}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        options={data.selectOption.genderLookup}
                        bind:val={$editNewContractEmployeeDetailForm.genderId}
                        errors={$editNewContractEmployeeDetailError.genderId}
                    />
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        options={data.selectOption.maritalLookup}
                        bind:val={$editNewContractEmployeeDetailForm.maritalId}
                        errors={$editNewContractEmployeeDetailError.maritalId}
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id="homeAddress"
                        bind:val={$editNewContractEmployeeDetailForm.homeAddress}
                        errors={$editNewContractEmployeeDetailError.homeAddress}
                    />
                    <CustomSelectField
                        label="Bandar Alamat Rumah"
                        id="homeCityId"
                        options={data.selectOption.cityLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeCityId}
                        errors={$editNewContractEmployeeDetailError.homeCityId}
                    />
                    <CustomSelectField
                        label="Negeri Alamat Rumah"
                        id="homeStateId"
                        options={data.selectOption.stateLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeStateId}
                        errors={$editNewContractEmployeeDetailError.homeStateId}
                    />
                    <CustomSelectField
                        label="Negara Alamat Rumah"
                        id="homeCountryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeCountryId}
                        errors={$editNewContractEmployeeDetailError.homeCountryId}
                    />
                    <CustomTextField
                        label="Poskod Alamat Rumah"
                        id="homePostcode"
                        bind:val={$editNewContractEmployeeDetailForm.homePostcode}
                        errors={$editNewContractEmployeeDetailError.homePostcode}
                    />
                    <div class="flex w-full flex-col justify-items-start gap-2">
                        <Checkbox
                            bind:checked={sameAddress}
                            class="text-ios-labelColors-secondaryLabel-light"
                            >Sama dengan Alamat Rumah</Checkbox
                        >
                        <CustomTextField
                            label="Alamat Surat Menyurat"
                            disabled={sameAddress}
                            id="mailAddress"
                            bind:val={$editNewContractEmployeeDetailForm.mailAddress}
                            errors={$editNewContractEmployeeDetailError.mailAddress}
                        />
                        <CustomSelectField
                            label="Bandar Alamat Surat Menyurat"
                            disabled={sameAddress}
                            options={data.selectOption.cityLookup}
                            id="mailCityId"
                            bind:val={$editNewContractEmployeeDetailForm.mailCityId}
                            errors={$editNewContractEmployeeDetailError.mailCityId}
                        />
                        <CustomSelectField
                            label="Negeri Alamat Surat Menyurat"
                            disabled={sameAddress}
                            options={data.selectOption.stateLookup}
                            id="mailStateId"
                            bind:val={$editNewContractEmployeeDetailForm.mailStateId}
                            errors={$editNewContractEmployeeDetailError.mailStateId}
                        />
                        <CustomSelectField
                            label="Negara Alamat Surat Menyurat"
                            disabled={sameAddress}
                            options={data.selectOption.countryLookup}
                            id="mailCountryId"
                            bind:val={$editNewContractEmployeeDetailForm.mailCountryId}
                            errors={$editNewContractEmployeeDetailError.mailCountryId}
                        />
                        <CustomTextField
                            label="Poskod Alamat Surat Menyurat"
                            disabled={sameAddress}
                            id="mailPostcode"
                            bind:val={$editNewContractEmployeeDetailForm.mailPostcode}
                            errors={$editNewContractEmployeeDetailError.mailPostcode}
                        />
                    </div>
                    <CustomSelectField
                        errors={$editNewContractEmployeeDetailError.assetDeclarationStatusId}
                        id="assetDeclarationStatusId"
                        label="Status Pengikstiharan Harta"
                        bind:val={$editNewContractEmployeeDetailForm.assetDeclarationStatusId}
                        options={data.selectOption.assetDeclarationLookup}
                    ></CustomSelectField>

                    {#if $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 12 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 14 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 15 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 17 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 18 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 22}
                        <CustomTextField
                            errors={$editNewContractEmployeeDetailError.propertyDeclarationDate}
                            id="propertyDeclarationDate"
                            type="date"
                            label="Tarikh Pengikstiharan Harta"
                            bind:val={$editNewContractEmployeeDetailForm.propertyDeclarationDate}
                        />
                    {/if}
                    <CustomRadioBoolean
                        disabled={false}
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        bind:val={$editNewContractEmployeeDetailForm.isExPoliceOrSoldier}
                        errors={$editNewContractEmployeeDetailError.isExPoliceOrSoldier}
                    />
                    <CustomRadioBoolean
                        disabled={false}
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        bind:val={$editNewContractEmployeeDetailForm.isInternalRelationship}
                        errors={$editNewContractEmployeeDetailError.isInternalRelationship}
                    />
                    {#if $editNewContractEmployeeDetailForm.isInternalRelationship}
                        <CustomTextField
                            label="Nama Kakitangan LKIM"
                            id="employeeNumber"
                            bind:val={$editNewContractEmployeeDetailForm.employeeNumber}
                            errors={$editNewContractEmployeeDetailError.employeeNumber}
                        />
                        <CustomSelectField
                            label="Hubungan Kakitangan LKIM"
                            id="relationshipId"
                            options={data.selectOption.relationshipLookup}
                            bind:val={$editNewContractEmployeeDetailForm.relationshipId}
                            errors={$editNewContractEmployeeDetailError.relationshipId}
                        />
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            >
                <TextIconButton
                    label="Simpan"
                    form="academicDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="academicDetailForm"
                    use:academicDetailEnhance
                >
                    <CustomSelectField
                        label="Jenis Jurusan"
                        id="majorId"
                        options={data.selectOption.majorMinorLookup}
                        bind:val={$academicDetailForm.majorId}
                        errors={$academicDetailError.majorId}
                    />
                    <CustomSelectField
                        label="Jenis Bidang"
                        id="minorId"
                        options={data.selectOption.majorMinorLookup}
                        bind:val={$academicDetailForm.minorId}
                        errors={$academicDetailError.minorId}
                    />
                    <CustomSelectField
                        label="Negara"
                        id="countryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$academicDetailForm.countryId}
                        errors={$academicDetailError.countryId}
                    />
                    <CustomSelectField
                        label="Institusi"
                        id="institutionId"
                        options={data.selectOption.institutionLookup}
                        bind:val={$academicDetailForm.institutionId}
                        errors={$academicDetailError.institutionId}
                    />
                    <CustomSelectField
                        label="Taraf Pendidikan"
                        id="educationLevelId"
                        options={data.selectOption.educationLookup}
                        bind:val={$academicDetailForm.educationLevelId}
                        errors={$academicDetailError.educationLevelId}
                    />
                    <CustomSelectField
                        label="Penajaan"
                        id="sponsorshipId"
                        options={data.selectOption.sponsorshipLookup}
                        bind:val={$academicDetailForm.sponsorshipId}
                        errors={$academicDetailError.sponsorshipId}
                    />
                    <CustomTextField
                        label="Nama Pencapaian/Sijil"
                        id="name"
                        bind:val={$academicDetailForm.name}
                        errors={$academicDetailError.name}
                    />
                    <CustomTextField
                        label="Tarikh Kelulusan"
                        id="completionDate"
                        type="date"
                        bind:val={$academicDetailForm.completionDate}
                        errors={$academicDetailError.completionDate}
                    />
                    <CustomTextField
                        label="Pencapaian Akhir (Gred)"
                        id="finalGrade"
                        bind:val={$academicDetailForm.finalGrade}
                        errors={$academicDetailError.finalGrade}
                    />
                    <CustomTextField
                        label="Catatan"
                        id="field"
                        bind:val={$academicDetailForm.field}
                        errors={$academicDetailError.field}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pengalaman">
                <TextIconButton
                    label="Simpan"
                    form="experienceDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="experienceDetailForm"
                    use:experienceDetailEnhance
                >
                    <CustomTextField
                        label="Nama Majikan"
                        id="company"
                        bind:val={$experienceDetailForm.company}
                        errors={$experienceDetailError.company}
                    />
                    <CustomTextField
                        label="Alamat Majikan"
                        id="address"
                        bind:val={$experienceDetailForm.address}
                        errors={$experienceDetailError.address}
                    />
                    <CustomTextField
                        label="Jawatan"
                        id="position"
                        bind:val={$experienceDetailForm.position}
                        errors={$experienceDetailError.position}
                    />
                    <CustomTextField
                        label="Kod Jawatan (Jika Ada)"
                        id="positionCode"
                        bind:val={$experienceDetailForm.positionCode}
                        errors={$experienceDetailError.positionCode}
                    />
                    <CustomTextField
                        label="Tarikh Mula Bekerja"
                        id="startDate"
                        type="date"
                        bind:val={$experienceDetailForm.startDate}
                        errors={$experienceDetailError.startDate}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Bekerja"
                        id="endDate"
                        type="date"
                        bind:val={$experienceDetailForm.endDate}
                        errors={$experienceDetailError.endDate}
                    />
                    <CustomTextField
                        label="Gaji (RM)"
                        id="salary"
                        bind:val={$experienceDetailForm.salary}
                        errors={$experienceDetailError.salary}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
                <TextIconButton
                    label="Simpan"
                    form="activityDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="activityDetailForm"
                    use:activityDetailEnhance
                >
                    <CustomTextField
                        label="Nama Kegiatan/Keahlian"
                        id="name"
                        bind:val={$activityDetailForm.name}
                        errors={$activityDetailError.name}
                    />
                    <CustomTextField
                        label="Jawatan"
                        id="position"
                        bind:val={$activityDetailForm.position}
                        errors={$activityDetailError.position}
                    />
                    <CustomTextField
                        label="Tarikh Penyertaan"
                        id="joinDate"
                        type="date"
                        bind:val={$activityDetailForm.joinDate}
                        errors={$activityDetailError.joinDate}
                    />
                    <CustomTextField
                        label="Catatan"
                        id="description"
                        bind:val={$activityDetailForm.description}
                        errors={$activityDetailError.description}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluarga">
                <TextIconButton
                    label="Simpan"
                    form="familyDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="familyDetailForm"
                    use:familyDetailEnhance
                >
                    <CustomTextField
                        label="Nama"
                        id="name"
                        bind:val={$familyDetailForm.name}
                        errors={$familyDetailError.name}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        bind:val={$familyDetailForm.alternativeName}
                        errors={$familyDetailError.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        bind:val={$familyDetailForm.identityDocumentNumber}
                        errors={$familyDetailError.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        options={data.selectOption.identityCardTypeLookup}
                        bind:val={$familyDetailForm.identityDocumentColor}
                        errors={$familyDetailError.identityDocumentColor}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        options={data.selectOption.genderLookup}
                        bind:val={$familyDetailForm.genderId}
                        errors={$familyDetailError.genderId}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        type="date"
                        bind:val={$familyDetailForm.birthDate}
                        errors={$familyDetailError.birthDate}
                    />
                    <CustomSelectField
                        label="Kewarganegaraan"
                        id="nationalityId"
                        options={data.selectOption.nationalityLookup}
                        bind:val={$familyDetailForm.nationalityId}
                        errors={$familyDetailError.nationalityId}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        options={data.selectOption.stateLookup}
                        bind:val={$familyDetailForm.birthStateId}
                        errors={$familyDetailError.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$familyDetailForm.birthCountryId}
                        errors={$familyDetailError.birthCountryId}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        bind:val={$familyDetailForm.address}
                        errors={$familyDetailError.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id="postcode"
                        bind:val={$familyDetailForm.postcode}
                        errors={$familyDetailError.postcode}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="phoneNumber"
                        bind:val={$familyDetailForm.phoneNumber}
                        errors={$familyDetailError.phoneNumber}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        options={data.selectOption.raceLookup}
                        bind:val={$familyDetailForm.raceId}
                        errors={$familyDetailError.raceId}
                    />

                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        options={data.selectOption.maritalLookup}
                        bind:val={$familyDetailForm.maritalId}
                        errors={$familyDetailError.maritalId}
                    />
                    {#if $familyDetailForm.maritalId === 3}
                    <CustomTextField
                        label="Tarikh Perkahwinan"
                        id="marriageDate"
                        type="date"
                        bind:val={$familyDetailForm.marriageDate}
                        errors={$familyDetailError.marriageDate}
                    />
                    {/if}
                    <CustomSelectField
                        label="Hubungan"
                        id="relationshipId"
                        options={data.selectOption.relationshipLookup}
                        bind:val={$familyDetailForm.relationshipId}
                        errors={$familyDetailError.relationshipId}
                    />
                    <CustomSelectField
                        label="Taraf Pendidikan"
                        id="educationLevelId"
                        options={data.selectOption.educationLookup}
                        bind:val={$familyDetailForm.educationLevelId}
                        errors={$familyDetailError.educationLevelId}
                    />
                    <CustomTextField
                        label="Alamat Majikan"
                        id="workAddress"
                        bind:val={$familyDetailForm.workAddress}
                        errors={$familyDetailError.workAddress}
                    />
                    <CustomTextField
                        label="Poskod Alamat Majikan"
                        id="workPostcode"
                        bind:val={$familyDetailForm.workPostcode}
                        errors={$familyDetailError.workPostcode}
                    />
                    <CustomSelectField
                        label="Bersekolah"
                        id="inSchool"
                        options={[
                            { value: true, name: 'Ya' },
                            { value: false, name: 'Tidak' },
                        ]}
                        bind:val={$familyDetailForm.inSchool}
                        errors={$familyDetailError.inSchool}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Maklumat Tanggungan Selain Isteri dan Anak"
            >
                <TextIconButton
                    label="Simpan"
                    form="dependantDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="dependantDetailForm"
                    use:dependantDetailEnhance
                >
                    <CustomTextField
                        label="Nama"
                        id="name"
                        bind:val={$dependantDetailForm.name}
                        errors={$dependantDetailError.name}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        bind:val={$dependantDetailForm.alternativeName}
                        errors={$dependantDetailError.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        bind:val={$dependantDetailForm.identityDocumentNumber}
                        errors={$dependantDetailError.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        options={data.selectOption.identityCardTypeLookup}
                        bind:val={$dependantDetailForm.identityDocumentColor}
                        errors={$dependantDetailError.identityDocumentColor}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        options={data.selectOption.genderLookup}
                        bind:val={$dependantDetailForm.genderId}
                        errors={$dependantDetailError.genderId}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        type="date"
                        bind:val={$dependantDetailForm.birthDate}
                        errors={$dependantDetailError.birthDate}
                    />
                    <CustomSelectField
                        label="Kewarganegaraan"
                        id="nationalityId"
                        options={data.selectOption.nationalityLookup}
                        bind:val={$dependantDetailForm.nationalityId}
                        errors={$dependantDetailError.nationalityId}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        options={data.selectOption.stateLookup}
                        bind:val={$dependantDetailForm.birthStateId}
                        errors={$dependantDetailError.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$dependantDetailForm.birthCountryId}
                        errors={$dependantDetailError.birthCountryId}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        bind:val={$dependantDetailForm.address}
                        errors={$dependantDetailError.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id="postcode"
                        bind:val={$dependantDetailForm.postcode}
                        errors={$dependantDetailError.postcode}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="phoneNumber"
                        bind:val={$dependantDetailForm.phoneNumber}
                        errors={$dependantDetailError.phoneNumber}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        options={data.selectOption.raceLookup}
                        bind:val={$dependantDetailForm.raceId}
                        errors={$dependantDetailError.raceId}
                    />

                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        options={data.selectOption.maritalLookup}
                        bind:val={$dependantDetailForm.maritalId}
                        errors={$dependantDetailError.maritalId}
                    />
                    {#if $dependantDetailForm.maritalId === 3}
                    <CustomTextField
                        label="Tarikh Perkahwinan"
                        id="marriageDate"
                        type="date"
                        bind:val={$dependantDetailForm.marriageDate}
                        errors={$dependantDetailError.marriageDate}
                    />
                    {/if}
                    <CustomSelectField
                        label="Hubungan"
                        id="relationshipId"
                        options={data.selectOption.relationshipLookup}
                        bind:val={$dependantDetailForm.relationshipId}
                        errors={$dependantDetailError.relationshipId}
                    />
                    <CustomSelectField
                        label="Taraf Pendidikan"
                        id="educationLevelId"
                        options={data.selectOption.educationLookup}
                        bind:val={$dependantDetailForm.educationLevelId}
                        errors={$dependantDetailError.educationLevelId}
                    />
                    <CustomTextField
                        label="Alamat Majikan"
                        id="workAddress"
                        bind:val={$dependantDetailForm.workAddress}
                        errors={$dependantDetailError.workAddress}
                    />
                    <CustomTextField
                        label="Poskod Alamat Majikan"
                        id="workPostcode"
                        bind:val={$dependantDetailForm.workPostcode}
                        errors={$dependantDetailError.workPostcode}
                    />
                    <CustomSelectField
                        label="Bersekolah"
                        id="inSchool"
                        options={[
                            { value: true, name: 'Ya' },
                            { value: false, name: 'Tidak' },
                        ]}
                        bind:val={$dependantDetailForm.inSchool}
                        errors={$dependantDetailError.inSchool}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Waris">
                <TextIconButton
                    label="Simpan"
                    form="nextOfKinDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="nextOfKinDetailForm"
                    use:nextOfKinDetailEnhance
                >
                    <CustomTextField
                        label="Nama"
                        id="name"
                        bind:val={$nextOfKinDetailForm.name}
                        errors={$nextOfKinDetailError.name}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        bind:val={$nextOfKinDetailForm.alternativeName}
                        errors={$nextOfKinDetailError.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        bind:val={$nextOfKinDetailForm.identityDocumentNumber}
                        errors={$nextOfKinDetailError.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        options={data.selectOption.identityCardTypeLookup}
                        bind:val={$nextOfKinDetailForm.identityDocumentColor}
                        errors={$nextOfKinDetailError.identityDocumentColor}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        options={data.selectOption.genderLookup}
                        bind:val={$nextOfKinDetailForm.genderId}
                        errors={$nextOfKinDetailError.genderId}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        type="date"
                        bind:val={$nextOfKinDetailForm.birthDate}
                        errors={$nextOfKinDetailError.birthDate}
                    />
                    <CustomSelectField
                        label="Kewarganegaraan"
                        id="nationalityId"
                        options={data.selectOption.nationalityLookup}
                        bind:val={$nextOfKinDetailForm.nationalityId}
                        errors={$nextOfKinDetailError.nationalityId}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        options={data.selectOption.stateLookup}
                        bind:val={$nextOfKinDetailForm.birthStateId}
                        errors={$nextOfKinDetailError.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        options={data.selectOption.countryLookup}
                        bind:val={$nextOfKinDetailForm.birthCountryId}
                        errors={$nextOfKinDetailError.birthCountryId}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        bind:val={$nextOfKinDetailForm.address}
                        errors={$nextOfKinDetailError.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id="postcode"
                        bind:val={$nextOfKinDetailForm.postcode}
                        errors={$nextOfKinDetailError.postcode}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="phoneNumber"
                        bind:val={$nextOfKinDetailForm.phoneNumber}
                        errors={$nextOfKinDetailError.phoneNumber}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        options={data.selectOption.raceLookup}
                        bind:val={$nextOfKinDetailForm.raceId}
                        errors={$nextOfKinDetailError.raceId}
                    />

                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        options={data.selectOption.maritalLookup}
                        bind:val={$nextOfKinDetailForm.maritalId}
                        errors={$nextOfKinDetailError.maritalId}
                    />
                    {#if $nextOfKinDetailForm.maritalId === 3}
                    <CustomTextField
                        label="Tarikh Perkahwinan"
                        id="marriageDate"
                        type="date"
                        bind:val={$nextOfKinDetailForm.marriageDate}
                        errors={$nextOfKinDetailError.marriageDate}
                    />
                    {/if}
                    <CustomSelectField
                        label="Hubungan"
                        id="relationshipId"
                        options={data.selectOption.relationshipLookup}
                        bind:val={$nextOfKinDetailForm.relationshipId}
                        errors={$nextOfKinDetailError.relationshipId}
                    />
                    <CustomSelectField
                        label="Taraf Pendidikan"
                        id="educationLevelId"
                        options={data.selectOption.educationLookup}
                        bind:val={$nextOfKinDetailForm.educationLevelId}
                        errors={$nextOfKinDetailError.educationLevelId}
                    />
                    <CustomTextField
                        label="Alamat Majikan"
                        id="workAddress"
                        bind:val={$nextOfKinDetailForm.workAddress}
                        errors={$nextOfKinDetailError.workAddress}
                    />
                    <CustomTextField
                        label="Poskod Alamat Majikan"
                        id="workPostcode"
                        bind:val={$nextOfKinDetailForm.workPostcode}
                        errors={$nextOfKinDetailError.workPostcode}
                    />
                    <CustomSelectField
                        label="Bersekolah"
                        id="inSchool"
                        options={[
                            { value: true, name: 'Ya' },
                            { value: false, name: 'Tidak' },
                        ]}
                        bind:val={$nextOfKinDetailForm.inSchool}
                        errors={$nextOfKinDetailError.inSchool}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                <TextIconButton
                    label="Simpan"
                    form="documentUploadForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        method="POST"
                        id="documentUploadForm"
                        enctype="multipart/form-data"
                        use:contractUploadDocumentEnhance
                    >
                        {#if $contractUploadDocumentError.document}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >Sila muat naik dokumen barkaitan.</span
                            >
                        {/if}
                        <ContentHeader
                            title="Dokumen Sokongan"
                            borderClass="border-none"
                        >
                            <div
                                hidden={!(
                                    $contractUploadDocumentForm.document instanceof
                                    File
                                )}
                            >
                                <FileInputField
                                    id="document"
                                    handleOnInput={(e) => handleOnInput(e)}
                                ></FileInputField>
                            </div>
                        </ContentHeader>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                        >
                            <div class="flex flex-wrap gap-3">
                                <!-- {#each $documentForm.document as item, index} -->
                                {#if $contractUploadDocumentForm.document instanceof File}
                                    <FileInputFieldChildren
                                        childrenType="grid"
                                        handleDelete={() => handleDelete()}
                                        fileName={$contractUploadDocumentForm
                                            .document?.name}
                                    />
                                {/if}
                                <!-- {/each} -->
                            </div>
                            <div
                                class="flex flex-col items-center justify-center gap-2.5"
                            >
                                <p
                                    class=" text-sm text-txt-tertiary"
                                    hidden={$contractUploadDocumentForm.document instanceof
                                        File}
                                >
                                    Pilih fail dari peranti anda.
                                </p>
                                <div
                                    class="text-txt-tertiary"
                                    hidden={$contractUploadDocumentForm.document instanceof
                                        File}
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
                                <div
                                    hidden={$contractUploadDocumentForm.document instanceof
                                        File}
                                >
                                    <FileInputField id="document"
                                    ></FileInputField>
                                </div>
                            </div>
                        </div>
                    </form>
                </div></StepperContentBody
            >
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lantikan Baru (Kontrak)">
                <TextIconButton
                    label="Simpan"
                    form="updateContractDetailForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="updateContractDetailForm"
                    use:updateContractDetailEnhance
                >
                    <CustomTextField
                        label="Tarikh Mula Kontrak"
                        id="startContract"
                        type="date"
                        bind:val={$updateContractDetailForm.startContract}
                        errors={$updateContractDetailError.startContract}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Kontrak"
                        id="endContract"
                        type="date"
                        bind:val={$updateContractDetailForm.endContract}
                        errors={$updateContractDetailError.endContract}
                    />
                    <CustomTextField
                        label="Kadar Upah (RM)"
                        id="wageRate"
                        type="number"
                        bind:val={$updateContractDetailForm.wageRate}
                        errors={$updateContractDetailError.wageRate}
                    />
                    <CustomSelectField
                        label="Penempatan"
                        id="placementId"
                        options={data.selectOption.placementLookup}
                        bind:val={$updateContractDetailForm.placementId}
                        errors={$updateContractDetailError.placementId}
                    />
                    <CustomSelectField
                        label="Gelaran Tugas"
                        id="designation"
                        options={data.selectOption.positionLookup}
                        bind:val={$updateContractDetailForm.designation}
                        errors={$updateContractDetailError.designation}
                    />
                    <CustomTextField
                        label="Tarikh Lapor Diri"
                        id="reportDutyDate"
                        type="date"
                        bind:val={$updateContractDetailForm.reportDutyDate}
                        errors={$updateContractDetailError.reportDutyDate}
                    />
                    <CustomTextField
                        label="No. KWSP"
                        id="kwspNo"
                        bind:val={$updateContractDetailForm.kwspNo}
                        errors={$updateContractDetailError.kwspNo}
                    />
                    <CustomTextField
                        label="No. SOCSO"
                        id="socsoNo"
                        bind:val={$updateContractDetailForm.socsoNo}
                        errors={$updateContractDetailError.socsoNo}
                    />
                    <CustomTextField
                        label="No. Cukai"
                        id="taxNo"
                        bind:val={$updateContractDetailForm.taxNo}
                        errors={$updateContractDetailError.taxNo}
                    />
                    <CustomTextField
                        label="Nama Bank"
                        id="bankName"
                        bind:val={$updateContractDetailForm.bankName}
                        errors={$updateContractDetailError.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        id="bankAccount"
                        bind:val={$updateContractDetailForm.bankAccount}
                        errors={$updateContractDetailError.bankAccount}
                    />
                    <CustomSelectField
                        label="Jenis Perkhidmatan"
                        id="serviceTypeId"
                        options={data.selectOption.serviceTypeLookup}
                        bind:val={$updateContractDetailForm.serviceTypeId}
                        errors={$updateContractDetailError.serviceTypeId}
                    />
                    <CustomTextField
                        label="Kelayakan Cuti (Hari)"
                        id="leaveEntitlement"
                        type="number"
                        bind:val={$updateContractDetailForm.leaveEntitlement}
                        errors={$updateContractDetailError.leaveEntitlement}
                    />
                    <CustomTextField
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        id="effectiveDate"
                        type="date"
                        bind:val={$updateContractDetailForm.effectiveDate}
                        errors={$updateContractDetailError.effectiveDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        id="civilServiceStartDate"
                        type="date"
                        bind:val={$updateContractDetailForm.civilServiceStartDate}
                        errors={$updateContractDetailError.civilServiceStartDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan LKIM"
                        id="lkimServiceStartDate"
                        type="date"
                        bind:val={$updateContractDetailForm.lkimServiceStartDate}
                        errors={$updateContractDetailError.lkimServiceStartDate}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Sekarang"
                        id="currentServiceStartDate"
                        type="date"
                        bind:val={$updateContractDetailForm.currentServiceStartDate}
                        errors={$updateContractDetailError.currentServiceStartDate}
                    />
                    <CustomTextField
                        label="Disahkan Dalam Jawatan Pertama LKIM"
                        id="firstConfirmServiceDate"
                        type="date"
                        bind:val={$updateContractDetailForm.firstConfirmServiceDate}
                        errors={$updateContractDetailError.firstConfirmServiceDate}
                    />
                    <CustomTextField
                        label="Tarikh Perkhidmatan Pengesahan Semasa"
                        id="currentConfirmServiceDate"
                        type="date"
                        bind:val={$updateContractDetailForm.currentConfirmServiceDate}
                        errors={$updateContractDetailError.currentConfirmServiceDate}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Urus Setia Perjawatan">
                <TextIconButton
                    label="Simpan"
                    form="secretaryContractResultForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="secretaryContractResultForm"
                    use:secretaryContractResultEnhance
                >
                    <CustomTextField
                        label="Tindakan/Ulasan Urus Setia Perjawatan"
                        id="remark"
                        bind:val={$secretaryContractResultForm.remark}
                        errors={$secretaryContractResultError.remark}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        options={secretaryOption}
                        bind:val={$secretaryContractResultForm.status}
                        disabled={false}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Tetapkan Penyokong & Pelulus">
                <TextIconButton
                    label="Simpan"
                    form="setApproverAndSupporterForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="setApproverAndSupporterForm"
                >
                    <CustomTextField
                        label="Penyokong"
                        id="supporterId"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Pelulus"
                        id="approverId"
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Penyokong">
                <TextIconButton
                    label="Simpan"
                    form="supporterResultForm"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="supporterResultForm"
                >
                    <CustomTextField
                        label="Tindakan/Ulasan Urus Setia Perjawatan"
                        id="remark"
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        options={secretaryOption}
                        disabled={false}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Pelulus">
                <TextIconButton
                    label="Simpan"
                    form="approverResult"
                    type="primary"
                    icon="check"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    method="POST"
                    id="approverResult"
                >
                    <CustomTextField
                        label="Tindakan/Ulasan Urus Setia Perjawatan"
                        id="remark"
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        options={secretaryOption}
                        disabled={false}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
