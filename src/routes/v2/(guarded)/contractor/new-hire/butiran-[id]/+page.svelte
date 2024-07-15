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
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import type { PageData } from './$types';
    import {
        _fileToBase64Object,
        _submitAcademicDetailForm,
        _submitActivityDetailForm,
        _submitApproverContractResultForm,
        _submitDependantDetailForm,
        _submitDocumentForm,
        _submitEditNewContractEmployeeDetailForm,
        _submitExperienceDetailForm,
        _submitFamilyDetailForm,
        _submitGetContractEmployeeNumberForm,
        _submitNextOfKinForm,
        _submitSecretaryContractResultForm,
        _submitSetSupporterApproverForm,
        _submitSupporterContractResultForm,
        _submitUpdateContractDetailForm,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _addContractAcademicSchema,
        _addContractActivitySchema,
        _addContractCommonRoleResult,
        _addContractExperienceSchema,
        _addContractSupporterApprover,
        _addContractViewSecretaryUpdate,
        _commonContractDependencySchema,
        _editNewContractEmployeeSchema,
        _getContractEmployeeNumber,
        _uploadDocSchema,
    } from '$lib/schemas/mypsm/contract-employee/contract-employee-schemas';
    import { Toaster } from 'svelte-french-toast';
    import {
        Accordion,
        AccordionItem,
        Alert,
        Badge,
        Checkbox,
        Modal,
    } from 'flowbite-svelte';
    import type {
        AddNewContractEmployeeAcademicDTO,
        ContractAcademic,
    } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-academic.dto';
    import type {
        AddNewContractEmployeeExperienceDTO,
        ContractExperience,
    } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-experience.dto';
    import type {
        AddNewContractEmployeeActivityDTO,
        ContractActivity,
    } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-activity.dto';
    import type {
        AddNewContractEmployeeDependencyDTO,
        ContractDependency,
    } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-dependency.dto';
    import type {
        AddContractNextOfKinDTO,
        NextOfKin,
    } from '$lib/dto/mypsm/kakitangan-kontrak/add-contract-next-of-kin.dto';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
    export let data: PageData;

    // temporay arrays for list details
    let tempAcademicRecord: AddNewContractEmployeeAcademicDTO = {
        academics: [],
        isDraft: false,
    };
    if (data.getContractAcademicDetails.academicList?.length > 0) {
        tempAcademicRecord.academics =
            data.getContractAcademicDetails.academicList;
    }

    let tempExperienceRecord: AddNewContractEmployeeExperienceDTO = {
        experiences: [],
        isDraft: false,
    };
    if (data.getContractExperienceDetails.experienceList.length > 0) {
        data.getContractExperienceDetails.experienceList.map((value) => {
        
           tempExperienceRecord.experiences.push({
            company: value.company,
            address: value.address,
            endDate: value.endDate,
            position: value.position,
            positionCode: value.positionCode,
            salary: Number(value.salary),
            startDate: value.startDate,
           })
        })
   
    }
    let tempActivityRecord: AddNewContractEmployeeActivityDTO = {
        activities: [],
        isDraft: false,
    };
    if(data.getContractActivityDetails.activityList.length > 0){
        tempActivityRecord.activities = data.getContractActivityDetails.activityList;
        tempActivityRecord.isDraft = data.getContractActivityDetails.isDraft;
    }
    let tempFamilyRecord: AddNewContractEmployeeDependencyDTO = {
        dependencies: [],
        isDraft: false,
    };
    if(data.getContractFamilyDetails.dependenciesList.length > 0){
        tempFamilyRecord.dependencies = data.getContractFamilyDetails.dependenciesList;
    }
    let tempNonFamilyRecord: AddNewContractEmployeeDependencyDTO = {
        dependencies: [],
        isDraft: false,
    };
    if(data.getContractNonFamilyDetails.dependenciesList.length > 0){
        tempNonFamilyRecord.dependencies = data.getContractNonFamilyDetails.dependenciesList;
    }
    let tempNextOfKinRecord: AddContractNextOfKinDTO = { nextOfKins: [], isDraft: false };
    if(data.getContractNextOfKinDetails.nextOfKinList.length > 0){
        tempNextOfKinRecord.nextOfKins = data.getContractNextOfKinDetails.nextOfKinList;
    }
    // checkbox for 1st stepper if mail address is the same as home address
    let sameAddress: boolean = false;
    // modal button
    let academicModal: boolean = false;
    let experienceModal: boolean = false;
    let activityModal: boolean = false;
    let familyModal: boolean = false;
    let dependantModal: boolean = false;
    let nextOfKinModal: boolean = false;
    let files: FileList;
    let academicfiles: FileList;
    let isProcessEnded: number = 0;

    //superform
    const {
        form: editNewContractEmployeeDetailForm,
        errors: editNewContractEmployeeDetailError,
        enhance: editNewContractEmployeeDetailEnhance,
    } = superForm(data.editNewContractEmployeeDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'addContractPersonalDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_editNewContractEmployeeSchema),
        async onSubmit() {
            if (!$editNewContractEmployeeDetailForm.isInternalRelationship) {
                $editNewContractEmployeeDetailForm.employeeNumber = null;
                $editNewContractEmployeeDetailForm.employeeName = null;
                $editNewContractEmployeeDetailForm.employeePosition = null;
                $editNewContractEmployeeDetailForm.relationshipId = null;
            }
            if (
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    12 &&
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    14 &&
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    15 &&
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    17 &&
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    18 &&
                $editNewContractEmployeeDetailForm.assetDeclarationStatusId !==
                    22
            ) {
                $editNewContractEmployeeDetailForm.propertyDeclarationDate =
                    null;
            }
            const readOnly = await _submitEditNewContractEmployeeDetailForm(
                $editNewContractEmployeeDetailForm,
            );
            if (
                readOnly?.response.status == 'success' &&
                $editNewContractEmployeeDetailForm.isDraft
            ) {
                $editNewContractEmployeeDetailForm.isReadonly = false;
            } else if (
                readOnly?.response.status == 'success' &&
                !$editNewContractEmployeeDetailForm.isDraft
            ) {
                $editNewContractEmployeeDetailForm.isReadonly = true;
            }
        },
    });
    const {
        form: contractUploadDocumentForm,
        errors: contractUploadDocumentError,
        enhance: contractUploadDocumentEnhance,
    } = superForm(data.contractUploadDocumentForm, {
        SPA: true,
        taintedMessage: false,
        dataType: 'json',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_uploadDocSchema),
        onSubmit() {
            _fileToBase64Object(files[0], 1)
                .then((resultObject) => {
                    _submitDocumentForm(resultObject as string);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    });
    const {
        form: academicDetailForm,
        errors: academicDetailError,
        enhance: academicDetailEnhance,
    } = superForm(data.academicDetailForm, {
        SPA: true,
        resetForm: true,
        dataType: 'json',
        id: 'academicDetailForm',
        validators: zod(_addContractAcademicSchema),
        onSubmit() {
            _fileToBase64Object(academicfiles[0], 2)
                .then((resultObject) => {
                    $academicDetailForm.document =
                        resultObject as DocumentBase64RequestDTO;
                })
                .finally(async () => {
                    const academicRecord = await superValidate(
                        $academicDetailForm,
                        zod(_addContractAcademicSchema),
                    );
                    if (academicRecord.valid) {
                        tempAcademicRecord.academics = [
                            ...tempAcademicRecord.academics,
                            academicRecord.data as ContractAcademic,
                        ];
                        academicModal = false;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
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
        async onSubmit() {
            const experienceRecord = await superValidate(
                $experienceDetailForm,
                zod(_addContractExperienceSchema),
            );

            if (experienceRecord.valid) {
                tempExperienceRecord.experiences = [
                    ...tempExperienceRecord.experiences,
                    experienceRecord.data as ContractExperience,
                ];
                experienceModal = false;
            }
        },
    });
    const {
        form: activityDetailForm,
        errors: activityDetailError,
        enhance: activityDetailEnhance,
    } = superForm(data.activityDetailForm, {
        SPA: true,
        taintedMessage: false,
        dataType: 'json',
        id: 'activityDetailForm',
        validators: zod(_addContractActivitySchema),
        async onSubmit() {
            const activityRecord = await superValidate(
                $activityDetailForm,
                zod(_addContractActivitySchema),
            );
            if (activityRecord.valid) {
                tempActivityRecord.activities = [
                    ...tempActivityRecord.activities,
                    activityRecord.data as ContractActivity,
                ];
                activityModal = false;
            }
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
        async onSubmit() {
            const dependencyRecord = await superValidate(
                $familyDetailForm,
                zod(_commonContractDependencySchema),
            );
            if (dependencyRecord.valid) {
                tempFamilyRecord.dependencies = [
                    ...tempFamilyRecord.dependencies,
                    dependencyRecord.data as ContractDependency,
                ];
                familyModal = false;
            }
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
        async onSubmit() {
            const nonFamilyRecord = await superValidate(
                $dependantDetailForm,
                zod(_commonContractDependencySchema),
            );
            if (nonFamilyRecord.valid) {
                tempNonFamilyRecord.dependencies = [
                    ...tempNonFamilyRecord.dependencies,
                    nonFamilyRecord.data as ContractDependency,
                ];
                dependantModal = false;
            }
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
        async onSubmit() {
            const nextOfKinRecord = await superValidate(
                $nextOfKinDetailForm,
                zod(_commonContractDependencySchema),
            );
            if (nextOfKinRecord.valid) {
                tempNextOfKinRecord.nextOfKins = [
                    ...tempNextOfKinRecord.nextOfKins,
                    nextOfKinRecord.data as NextOfKin,
                ];
                nextOfKinModal = false;
            }
        },
    });
    const {
        form: updateContractDetailForm,
        errors: updateContractDetailError,
        enhance: updateContractDetailEnhance,
    } = superForm(data.updateContractDetailForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        multipleSubmits: 'prevent',
        resetForm: false,
        id: 'updateContractDetailForm',
        validators: zod(_addContractViewSecretaryUpdate),
        async onSubmit() {
            $updateContractDetailForm.candidateId = data.contractId.id;
            const readOnly = await _submitUpdateContractDetailForm(
                $updateContractDetailForm,
            );

            if (readOnly?.response.status == 'success') {
                $updateContractDetailForm.isReadonly = true;
                $secretaryContractResultForm.isReadonly = false;
            }
        },
    });
    const {
        form: secretaryContractResultForm,
        errors: secretaryContractResultError,
        enhance: secretaryContractResultEnhance,
    } = superForm(data.secretaryContractResultForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'secretaryContractResultForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $secretaryContractResultForm.id = data.contractId.id;
            const readOnly = await _submitSecretaryContractResultForm(
                $secretaryContractResultForm,
            );
            if (readOnly?.response.status == 'success') {
                $secretaryContractResultForm.isReadonly = true;
                processResult($secretaryContractResultForm.status);
            }
        },
    });
    const {
        form: supporterContractResultForm,
        errors: supporterContractResultError,
        enhance: supporterContractResultEnhance,
    } = superForm(data.supporterContractResultForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'supporterContractResultForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $supporterContractResultForm.id = data.contractId.id;
            const readOnly = await _submitSupporterContractResultForm(
                $supporterContractResultForm,
            );
            if (readOnly?.response.status == 'success') {
                $supporterContractResultForm.isReadonly = true;
                processResult($supporterContractResultForm.status);
            }
        },
    });
    const {
        form: setSupporterApproverForm,
        errors: setSupporterApproverError,
        enhance: setSupporterApproverEnhance,
    } = superForm(data.setSupporterApproverForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'setSupporterApproverForm',
        validators: zod(_addContractSupporterApprover),
        async onSubmit() {
            $setSupporterApproverForm.candidateId = data.contractId.id;
            const readOnly = await _submitSetSupporterApproverForm(
                $setSupporterApproverForm,
            );
            if (readOnly?.response.status == 'success') {
                $setSupporterApproverForm.isReadonly = true;
            }
        },
    });
    const {
        form: approverContractResultForm,
        errors: approverContractResultError,
        enhance: approverContractResultEnhance,
    } = superForm(data.approverContractResultForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'approverContractResultForm',
        validators: zod(_addContractCommonRoleResult),
        async onSubmit() {
            $approverContractResultForm.id = data.contractId.id;
            const readOnly = await _submitApproverContractResultForm(
                $approverContractResultForm,
            );
            if (readOnly?.response.status == 'success') {
                $approverContractResultForm.isReadonly = true;
                _submitGetContractEmployeeNumberForm(data.contractId);
                processResult($approverContractResultForm.status);
            }
        },
    });
    const {
        form: getContractEmployeeNumberForm,
        errors: getContractEmployeeNumberError,
        enhance: getContractEmployeeNumberEnhance,
    } = superForm(data.getContractEmployeeNumberForm, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: 'getContractEmployeeNumberForm',
        onSubmit() {
            _submitGetContractEmployeeNumberForm(data.contractId);
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

    $: {
        data.contractUploadDocumentForm.valid
            ? (data.getContractDocuments.isReadonly = true)
            : (data.getContractDocuments.isReadonly = false);
    }

    const handleDownload = async (url: string) => {
        await ContractEmployeeServices.downloadContractAttachment(url);
    };

    if (
        ($secretaryContractResultForm.status == false &&
            $secretaryContractResultForm.remark !== '') ||
        ($supporterContractResultForm.status == false &&
            $supporterContractResultForm.remark !== '') ||
        ($approverContractResultForm.status == false &&
            $approverContractResultForm.remark !== '')
    ) {
        isProcessEnded = 1;
    } else if (
        $secretaryContractResultForm.status == true &&
        $supporterContractResultForm.status == true &&
        $approverContractResultForm.status == true
    ) {
        isProcessEnded = 2;
    }
    function processResult(result: boolean) {
        if (!result) {
            isProcessEnded = 1;
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        {#if isProcessEnded !== 0}
            <Badge color={isProcessEnded == 1 ? 'red' : 'dark'}
                >Proses Telah Tamat</Badge
            >
        {/if}
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
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
                {#if !$editNewContractEmployeeDetailForm.isReadonly && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Simpan"
                        form="editNewContractEmployeeDetailForm"
                        type="neutral"
                        icon="save"
                        onClick={() =>
                            ($editNewContractEmployeeDetailForm.isDraft = true)}
                    />
                    <TextIconButton
                        label="Hantar"
                        form="editNewContractEmployeeDetailForm"
                        type="primary"
                        icon="check"
                        onClick={() =>
                            ($editNewContractEmployeeDetailForm.isDraft = false)}
                    />
                {/if}
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
                        id="name"
                        disabled
                        bind:val={$editNewContractEmployeeDetailForm.name}
                        errors={$editNewContractEmployeeDetailError.name}
                    />
                    <CustomSelectField
                        label="Gelaran Nama"
                        id="titleId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.titleLookup}
                        bind:val={$editNewContractEmployeeDetailForm.titleId}
                        errors={$editNewContractEmployeeDetailError.titleId}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id="alternativeName"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        bind:val={$editNewContractEmployeeDetailForm.alternativeName}
                        errors={$editNewContractEmployeeDetailError.alternativeName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        disabled
                        bind:val={$editNewContractEmployeeDetailForm.identityDocumentNumber}
                        errors={$editNewContractEmployeeDetailError.identityDocumentNumber}
                    />
                    <CustomSelectField
                        label="Jenis Kad Pengenalan"
                        id="identityDocumentColor"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.identityCardTypeLookup}
                        bind:val={$editNewContractEmployeeDetailForm.identityDocumentColor}
                        errors={$editNewContractEmployeeDetailError.identityDocumentColor}
                    />
                    <CustomTextField
                        label="Emel"
                        id="email"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        bind:val={$editNewContractEmployeeDetailForm.email}
                        errors={$editNewContractEmployeeDetailError.email}
                    />
                    <CustomTextField
                        label="No. Telefon Bimbit"
                        placeholder="Contoh: 01104220000"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        id="phoneNumber"
                        bind:val={$editNewContractEmployeeDetailForm.phoneNumber}
                        errors={$editNewContractEmployeeDetailError.phoneNumber}
                    />

                    <CustomTextField
                        label="Tarikh Lahir"
                        id="birthDate"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        type="date"
                        bind:val={$editNewContractEmployeeDetailForm.birthDate}
                        errors={$editNewContractEmployeeDetailError.birthDate}
                    />
                    <CustomSelectField
                        label="Negeri Kelahiran"
                        id="birthStateId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.stateLookup}
                        bind:val={$editNewContractEmployeeDetailForm.birthStateId}
                        errors={$editNewContractEmployeeDetailError.birthStateId}
                    />
                    <CustomSelectField
                        label="Negara Kelahiran"
                        id="birthCountryId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.countryLookup}
                        bind:val={$editNewContractEmployeeDetailForm.birthCountryId}
                        errors={$editNewContractEmployeeDetailError.birthCountryId}
                    />
                    <CustomSelectField
                        label="Warganegara"
                        id="nationalityId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.nationalityLookup}
                        bind:val={$editNewContractEmployeeDetailForm.nationalityId}
                        errors={$editNewContractEmployeeDetailError.nationalityId}
                    />
                    <CustomSelectField
                        label="Bangsa"
                        id="raceId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.raceLookup}
                        bind:val={$editNewContractEmployeeDetailForm.raceId}
                        errors={$editNewContractEmployeeDetailError.raceId}
                    />
                    <CustomSelectField
                        label="Agama"
                        id="religionId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.religionLookup}
                        bind:val={$editNewContractEmployeeDetailForm.religionId}
                        errors={$editNewContractEmployeeDetailError.religionId}
                    />
                    <CustomSelectField
                        label="Etnik"
                        id="ethnicId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.ethnicLookup}
                        bind:val={$editNewContractEmployeeDetailForm.ethnicId}
                        errors={$editNewContractEmployeeDetailError.ethnicId}
                    />
                    <CustomSelectField
                        label="Jantina"
                        id="genderId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.genderLookup}
                        bind:val={$editNewContractEmployeeDetailForm.genderId}
                        errors={$editNewContractEmployeeDetailError.genderId}
                    />
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.maritalLookup}
                        bind:val={$editNewContractEmployeeDetailForm.maritalId}
                        errors={$editNewContractEmployeeDetailError.maritalId}
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id="homeAddress"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        bind:val={$editNewContractEmployeeDetailForm.homeAddress}
                        errors={$editNewContractEmployeeDetailError.homeAddress}
                    />
                    <CustomSelectField
                        label="Bandar Alamat Rumah"
                        id="homeCityId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.cityLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeCityId}
                        errors={$editNewContractEmployeeDetailError.homeCityId}
                    />
                    <CustomSelectField
                        label="Negeri Alamat Rumah"
                        id="homeStateId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.stateLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeStateId}
                        errors={$editNewContractEmployeeDetailError.homeStateId}
                    />
                    <CustomSelectField
                        label="Negara Alamat Rumah"
                        id="homeCountryId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        options={data.lookup.countryLookup}
                        bind:val={$editNewContractEmployeeDetailForm.homeCountryId}
                        errors={$editNewContractEmployeeDetailError.homeCountryId}
                    />
                    <CustomTextField
                        label="Poskod Alamat Rumah"
                        id="homePostcode"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        bind:val={$editNewContractEmployeeDetailForm.homePostcode}
                        errors={$editNewContractEmployeeDetailError.homePostcode}
                    />
                    <div class="flex w-full flex-col justify-items-start gap-2">
                        {#if !$editNewContractEmployeeDetailForm.isReadonly}
                            <Checkbox
                                bind:checked={sameAddress}
                                class="text-ios-labelColors-secondaryLabel-light"
                                >Sama dengan Alamat Rumah</Checkbox
                            >
                        {/if}
                        <CustomTextField
                            label="Alamat Surat Menyurat"
                            disabled={sameAddress ||
                                $editNewContractEmployeeDetailForm.isReadonly}
                            id="mailAddress"
                            bind:val={$editNewContractEmployeeDetailForm.mailAddress}
                            errors={$editNewContractEmployeeDetailError.mailAddress}
                        />
                        <CustomSelectField
                            label="Bandar Alamat Surat Menyurat"
                            disabled={sameAddress ||
                                $editNewContractEmployeeDetailForm.isReadonly}
                            options={data.lookup.cityLookup}
                            id="mailCityId"
                            bind:val={$editNewContractEmployeeDetailForm.mailCityId}
                            errors={$editNewContractEmployeeDetailError.mailCityId}
                        />
                        <CustomSelectField
                            label="Negeri Alamat Surat Menyurat"
                            disabled={sameAddress ||
                                $editNewContractEmployeeDetailForm.isReadonly}
                            options={data.lookup.stateLookup}
                            id="mailStateId"
                            bind:val={$editNewContractEmployeeDetailForm.mailStateId}
                            errors={$editNewContractEmployeeDetailError.mailStateId}
                        />
                        <CustomSelectField
                            label="Negara Alamat Surat Menyurat"
                            disabled={sameAddress ||
                                $editNewContractEmployeeDetailForm.isReadonly}
                            options={data.lookup.countryLookup}
                            id="mailCountryId"
                            bind:val={$editNewContractEmployeeDetailForm.mailCountryId}
                            errors={$editNewContractEmployeeDetailError.mailCountryId}
                        />
                        <CustomTextField
                            label="Poskod Alamat Surat Menyurat"
                            disabled={sameAddress ||
                                $editNewContractEmployeeDetailForm.isReadonly}
                            id="mailPostcode"
                            bind:val={$editNewContractEmployeeDetailForm.mailPostcode}
                            errors={$editNewContractEmployeeDetailError.mailPostcode}
                        />
                    </div>
                    <CustomSelectField
                        errors={$editNewContractEmployeeDetailError.assetDeclarationStatusId}
                        id="assetDeclarationStatusId"
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        label="Status Pengikstiharan Harta"
                        bind:val={$editNewContractEmployeeDetailForm.assetDeclarationStatusId}
                        options={data.lookup.assetDeclarationLookup}
                    ></CustomSelectField>

                    {#if $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 12 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 14 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 15 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 17 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 18 || $editNewContractEmployeeDetailForm.assetDeclarationStatusId === 22}
                        <CustomTextField
                            errors={$editNewContractEmployeeDetailError.propertyDeclarationDate}
                            id="propertyDeclarationDate"
                            bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                            type="date"
                            label="Tarikh Pengikstiharan Harta"
                            bind:val={$editNewContractEmployeeDetailForm.propertyDeclarationDate}
                        />
                    {/if}
                    <CustomRadioBoolean
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        id="isExPoliceOrSoldier"
                        label="Bekas Polis/Tentera"
                        bind:val={$editNewContractEmployeeDetailForm.isExPoliceOrSoldier}
                        errors={$editNewContractEmployeeDetailError.isExPoliceOrSoldier}
                    />
                    <CustomRadioBoolean
                        bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        bind:val={$editNewContractEmployeeDetailForm.isInternalRelationship}
                        errors={$editNewContractEmployeeDetailError.isInternalRelationship}
                    />
                    {#if $editNewContractEmployeeDetailForm.isInternalRelationship}
                        <CustomTextField
                            label="No. Pekerja Kakitangan LKIM"
                            id="employeeNumber"
                            bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                            bind:val={$editNewContractEmployeeDetailForm.employeeNumber}
                            errors={$editNewContractEmployeeDetailError.employeeNumber}
                        />
                        <CustomSelectField
                            label="Hubungan Kakitangan LKIM"
                            id="relationshipId"
                            bind:disabled={$editNewContractEmployeeDetailForm.isReadonly}
                            options={data.lookup.relationshipLookup}
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
                {#if (data.getContractAcademicDetails.academicList?.length < 1 || data.getContractAcademicDetails.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (academicModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempAcademicRecord.academics.length < 1) {
                                alert('Maklumat Akademik tidak boleh kosong.');
                            } else {
                                tempAcademicRecord.isDraft = true;
                                _submitAcademicDetailForm(tempAcademicRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempAcademicRecord.academics.length < 1) {
                                alert('Maklumat Akademik tidak boleh kosong.');
                            } else {
                                tempAcademicRecord.isDraft = false;
                                _submitAcademicDetailForm(tempAcademicRecord);
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if tempAcademicRecord.academics.length < 1}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu calon untuk mengemaskini maklumat.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <Accordion class="w-full pb-10">
                        {#each tempAcademicRecord.academics as obj, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Maklumat {i + 1}</span
                                >
                                <CustomSelectField
                                    label="Jenis Jurusan"
                                    disabled
                                    id="academicsMajor{i}"
                                    options={data.lookup.majorMinorLookup}
                                    val={obj.majorId}
                                />
                                <CustomSelectField
                                    label="Jenis Bidang"
                                    disabled
                                    id="academicsMinor{i}"
                                    options={data.lookup.majorMinorLookup}
                                    val={obj.minorId}
                                />
                                <CustomSelectField
                                    label="Negara"
                                    disabled
                                    id="academicscountryId{i}"
                                    options={data.lookup.countryLookup}
                                    val={obj.countryId}
                                />
                                <CustomSelectField
                                    label="Institusi"
                                    disabled
                                    id="academicsinstitutionId{i}"
                                    options={data.lookup.institutionLookup}
                                    val={obj.institutionId}
                                />
                                <CustomSelectField
                                    label="Taraf Pendidikan"
                                    disabled
                                    id="academicseducationLevelId{i}"
                                    options={data.lookup.educationLookup}
                                    val={obj.educationLevelId}
                                />
                                <CustomSelectField
                                    label="Penajaan"
                                    disabled
                                    id="academicssponsorshipId{i}"
                                    options={data.lookup.sponsorshipLookup}
                                    val={obj.sponsorshipId}
                                />
                                <CustomTextField
                                    label="Nama Pencapaian/Sijil"
                                    disabled
                                    id="academicsname{i}"
                                    val={obj.name}
                                />
                                <CustomTextField
                                    label="Tarikh Kelulusan"
                                    disabled
                                    id="academicscompletionDate{i}"
                                    type="date"
                                    val={obj.completionDate}
                                />
                                <CustomTextField
                                    label="Pencapaian Akhir (Gred)"
                                    disabled
                                    id="academicsfinalGrade{i}"
                                    val={obj.finalGrade}
                                />
                                <CustomTextField
                                    label="Catatan"
                                    disabled
                                    id="academicsfield{i}"
                                    val={obj.field}
                                />
                                <div class="w-full flex flex-col justify-start gap-1">
                                <span class="text-base text-slate-700 font-medium">
                                    Dokumen
                                </span>
                                <a
                                    href={obj.document.base64}
                                    download={obj.document.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{obj.document.name}</a
                                >
                                </div>
                            </AccordionItem>
                        {/each}
                    </Accordion>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pengalaman">
                {#if (data.getContractExperienceDetails?.experienceList?.length < 1 || data.getContractExperienceDetails.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (experienceModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempExperienceRecord.experiences.length < 1) {
                                alert('Maklumat Pengalaman tidak boleh kosong.');
                            } else {
                                tempExperienceRecord.isDraft = true;
                                _submitExperienceDetailForm(tempExperienceRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempExperienceRecord.experiences.length < 1) {
                                alert(
                                    'Maklumat Pengalaman tidak boleh kosong.',
                                );
                            } else {
                                tempExperienceRecord.isDraft = false;
                                _submitExperienceDetailForm(
                                    tempExperienceRecord,
                                );
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                    {#if tempExperienceRecord.experiences.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon untuk mengemaskini maklumat.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <Accordion class="w-full pb-10">
                            {#each tempExperienceRecord.experiences as obj, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >Maklumat {i + 1}</span
                                    >
                                    <CustomTextField
                                        label="Nama Majikan"
                                        disabled
                                        id="company{i}"
                                        val={obj.company}
                                    />
                                    <CustomTextField
                                        label="Alamat Majikan"
                                        disabled
                                        id="address{i}"
                                        val={obj.address}
                                    />
                                    <CustomTextField
                                        label="Jawatan"
                                        disabled
                                        id="position{i}"
                                        val={obj.position}
                                    />
                                    <CustomTextField
                                        label="Kod Jawatan (Jika Ada)"
                                        disabled
                                        isRequired={false}
                                        id="positionCode{i}"
                                        val={obj.positionCode}
                                    />
                                    <CustomTextField
                                        label="Tarikh Mula Bekerja"
                                        disabled
                                        id="startDate{i}"
                                        type="date"
                                        val={obj.startDate}
                                    />
                                    <CustomTextField
                                        label="Tarikh Tamat Bekerja"
                                        disabled
                                        id="endDate{i}"
                                        type="date"
                                        val={obj.endDate}
                                    />
                                    <CustomTextField
                                        label="Gaji (RM)"
                                        disabled
                                        id="salary{i}"
                                        val={obj.salary}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    {/if}

            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
                {#if (data.getContractActivityDetails.activityList?.length < 1 || data.getContractActivityDetails.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (activityModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempActivityRecord.activities.length < 1) {
                                alert(
                                    'Maklumat Kegiatan/Keahlian tidak boleh kosong.',
                                );
                            } else {
                                tempActivityRecord.isDraft = true;
                                _submitActivityDetailForm(tempActivityRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempActivityRecord.activities.length < 1) {
                                alert(
                                    'Maklumat Kegiatan/Keahlian tidak boleh kosong.',
                                );
                            } else {
                                tempActivityRecord.isDraft = false;
                                _submitActivityDetailForm(tempActivityRecord);
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                    {#if tempActivityRecord.activities.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon untuk mengemaskini maklumat.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <Accordion class="w-full pb-10">
                            {#each tempActivityRecord.activities as obj, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >Maklumat {i + 1}</span
                                    >
                                    <CustomTextField
                                        label="Nama Kegiatan/Keahlian"
                                        disabled
                                        id="name{i}"
                                        val={obj.name}
                                    />
                                    <CustomTextField
                                        label="Jawatan"
                                        disabled
                                        id="position{i}"
                                        val={obj.position}
                                    />
                                    <CustomTextField
                                        label="Tarikh Penyertaan"
                                        disabled
                                        id="joinDate{i}"
                                        type="date"
                                        val={obj.joinDate}
                                    />
                                    <CustomTextField
                                        label="Catatan"
                                        disabled
                                        id="description{i}"
                                        val={obj.description}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    {/if}

            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluarga">
                {#if (data.getContractFamilyDetails.dependenciesList?.length < 1 || data.getContractFamilyDetails.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (familyModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempFamilyRecord.dependencies.length < 1) {
                                alert('Maklumat Keluarga tidak boleh kosong.');
                            } else {
                                tempFamilyRecord.isDraft = true;
                                _submitFamilyDetailForm(tempFamilyRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempFamilyRecord.dependencies.length < 1) {
                                alert('Maklumat Keluarga tidak boleh kosong.');
                            } else {
                                tempFamilyRecord.isDraft = false;
                                _submitFamilyDetailForm(tempFamilyRecord);
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                    {#if tempFamilyRecord.dependencies.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon untuk mengemaskini maklumat.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <Accordion class="w-full pb-10">
                            {#each tempFamilyRecord.dependencies as obj, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >Maklumat {i + 1}</span
                                    >
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="name{i}"
                                        val={obj.name}
                                    />
                                    <CustomTextField
                                        label="Nama Lain"
                                        disabled
                                        id="alternativeName{i}"
                                        val={obj.alternativeName}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        disabled
                                        id="identityDocumentNumber"
                                        val={obj.identityDocumentNumber}
                                    />
                                    <CustomSelectField
                                        label="Jenis Kad Pengenalan"
                                        disabled
                                        id="identityDocumentColor{i}"
                                        options={data.lookup
                                            .identityCardTypeLookup}
                                        val={obj.identityDocumentColor}
                                    />
                                    <CustomSelectField
                                        label="Jantina"
                                        disabled
                                        id="genderId{i}"
                                        options={data.lookup.genderLookup}
                                        val={obj.genderId}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lahir"
                                        disabled
                                        id="birthDate{i}"
                                        type="date"
                                        val={obj.birthDate}
                                    />
                                    <CustomSelectField
                                        label="Kewarganegaraan"
                                        disabled
                                        id="nationalityId{i}"
                                        options={data.lookup.nationalityLookup}
                                        val={obj.nationalityId}
                                    />
                                    <CustomSelectField
                                        label="Negeri Kelahiran"
                                        disabled
                                        id="birthStateId{i}"
                                        options={data.lookup.stateLookup}
                                        val={obj.birthStateId}
                                    />
                                    <CustomSelectField
                                        label="Negara Kelahiran"
                                        disabled
                                        id="birthCountryId{i}"
                                        options={data.lookup.countryLookup}
                                        val={obj.birthCountryId}
                                    />
                                    <CustomTextField
                                        label="Alamat"
                                        disabled
                                        id="address{i}"
                                        val={obj.address}
                                    />
                                    <CustomTextField
                                        label="Poskod"
                                        disabled
                                        id="postcode{i}"
                                        val={obj.postcode}
                                    />
                                    <CustomTextField
                                        label="No. Telefon"
                                        disabled
                                        id="phoneNumber{i}"
                                        val={obj.phoneNumber}
                                    />
                                    <CustomSelectField
                                        label="Bangsa"
                                        disabled
                                        id="raceId{i}"
                                        options={data.lookup.raceLookup}
                                        val={obj.raceId}
                                    />

                                    <CustomSelectField
                                        label="Status"
                                        disabled
                                        id="maritalId{i}"
                                        options={data.lookup.maritalLookup}
                                        val={obj.maritalId}
                                    />
                                    {#if obj.maritalId === 3}
                                        <CustomTextField
                                            label="Tarikh Perkahwinan"
                                            disabled
                                            id="marriageDate{i}"
                                            type="date"
                                            val={obj.marriageDate}
                                        />
                                    {/if}
                                    <CustomSelectField
                                        label="Hubungan"
                                        disabled
                                        id="relationshipId{i}"
                                        options={data.lookup
                                            .relationshipIsFamily}
                                        val={obj.relationshipId}
                                    />
                                    <CustomSelectField
                                        label="Taraf Pendidikan"
                                        disabled
                                        id="educationLevelId{i}"
                                        options={data.lookup.educationLookup}
                                        val={obj.educationLevelId}
                                    />
                                    <CustomTextField
                                        label="Alamat Majikan"
                                        disabled
                                        id="workAddress{i}"
                                        val={obj.workAddress}
                                    />
                                    <CustomTextField
                                        label="Poskod Alamat Majikan"
                                        disabled
                                        id="workPostcode{i}"
                                        val={obj.workPostcode}
                                    />
                                    <CustomSelectField
                                        label="Bersekolah"
                                        disabled
                                        id="inSchool{i}"
                                        options={[
                                            { value: true, name: 'Ya' },
                                            { value: false, name: 'Tidak' },
                                        ]}
                                        val={obj.inSchool}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    {/if}

            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Maklumat Tanggungan Selain Pasangan dan Anak"
            >
                {#if (data.getContractNonFamilyDetails.dependenciesList?.length < 1 || tempNonFamilyRecord.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (dependantModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempNonFamilyRecord.dependencies.length < 1) {
                                alert(
                                    'Maklumat Tanggungan tidak boleh kosong.',
                                );
                            } else {
                                tempNonFamilyRecord.isDraft = true;
                                _submitDependantDetailForm(tempNonFamilyRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempNonFamilyRecord.dependencies.length < 1) {
                                alert(
                                    'Maklumat Tanggungan tidak boleh kosong.',
                                );
                            } else {
                                tempNonFamilyRecord.isDraft = false;
                                _submitDependantDetailForm(tempNonFamilyRecord);
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                    {#if tempNonFamilyRecord.dependencies.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon untuk mengemaskini maklumat.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <Accordion class="w-full pb-10">
                            {#each tempNonFamilyRecord.dependencies as obj, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >Maklumat {i + 1}</span
                                    >
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="name{i}"
                                        val={obj.name}
                                    />
                                    <CustomTextField
                                        label="Nama Lain"
                                        disabled
                                        id="alternativeName{i}"
                                        val={obj.alternativeName}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        disabled
                                        id="identityDocumentNumber{i}"
                                        val={obj.identityDocumentNumber}
                                    />
                                    <CustomSelectField
                                        label="Jenis Kad Pengenalan"
                                        disabled
                                        id="identityDocumentColor{i}"
                                        options={data.lookup
                                            .identityCardTypeLookup}
                                        val={obj.identityDocumentColor}
                                    />
                                    <CustomSelectField
                                        label="Jantina"
                                        disabled
                                        id="genderId{i}"
                                        options={data.lookup.genderLookup}
                                        val={obj.genderId}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lahir"
                                        disabled
                                        id="birthDate{i}"
                                        type="date"
                                        val={obj.birthDate}
                                    />
                                    <CustomSelectField
                                        label="Kewarganegaraan"
                                        disabled
                                        id="nationalityId{i}"
                                        options={data.lookup.nationalityLookup}
                                        val={obj.nationalityId}
                                    />
                                    <CustomSelectField
                                        label="Negeri Kelahiran"
                                        disabled
                                        id="birthStateId{i}"
                                        options={data.lookup.stateLookup}
                                        val={obj.birthStateId}
                                    />
                                    <CustomSelectField
                                        label="Negara Kelahiran"
                                        disabled
                                        id="birthCountryId{i}"
                                        options={data.lookup.countryLookup}
                                        val={obj.birthCountryId}
                                    />
                                    <CustomTextField
                                        label="Alamat"
                                        disabled
                                        id="address{i}"
                                        val={obj.address}
                                    />
                                    <CustomTextField
                                        label="Poskod"
                                        disabled
                                        id="postcode{i}"
                                        val={obj.postcode}
                                    />
                                    <CustomTextField
                                        label="No. Telefon"
                                        disabled
                                        id="phoneNumber{i}"
                                        val={obj.phoneNumber}
                                    />
                                    <CustomSelectField
                                        label="Bangsa"
                                        disabled
                                        id="raceId{i}"
                                        options={data.lookup.raceLookup}
                                        val={obj.raceId}
                                    />

                                    <CustomSelectField
                                        label="Status"
                                        disabled
                                        id="maritalId{i}"
                                        options={data.lookup.maritalLookup}
                                        val={obj.maritalId}
                                    />
                                    {#if obj.maritalId === 3}
                                        <CustomTextField
                                            label="Tarikh Perkahwinan"
                                            disabled
                                            id="marriageDate{i}"
                                            type="date"
                                            val={obj.marriageDate}
                                        />
                                    {/if}
                                    <CustomSelectField
                                        label="Hubungan"
                                        disabled
                                        id="relationshipId{i}"
                                        options={data.lookup
                                            .relationshipIsNonFamily}
                                        val={obj.relationshipId}
                                    />
                                    <CustomSelectField
                                        label="Taraf Pendidikan"
                                        disabled
                                        id="educationLevelId{i}"
                                        options={data.lookup.educationLookup}
                                        val={obj.educationLevelId}
                                    />
                                    <CustomTextField
                                        label="Alamat Majikan"
                                        disabled
                                        id="workAddress{i}"
                                        val={obj.workAddress}
                                    />
                                    <CustomTextField
                                        label="Poskod Alamat Majikan"
                                        disabled
                                        id="workPostcode{i}"
                                        val={obj.workPostcode}
                                    />
                                    <CustomSelectField
                                        label="Bersekolah"
                                        disabled
                                        id="inSchool{i}"
                                        options={[
                                            { value: true, name: 'Ya' },
                                            { value: false, name: 'Tidak' },
                                        ]}
                                        val={obj.inSchool}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    {/if}

            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Waris">
                {#if (data.getContractNextOfKinDetails.nextOfKinList?.length < 1 || tempNextOfKinRecord.isDraft) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                    <TextIconButton
                        label="Tambah Rekod"
                        type="neutral"
                        icon="add"
                        onClick={() => (nextOfKinModal = true)}
                    />
                    <TextIconButton
                        label="Simpan"
                        type="neutral"
                        icon="save"
                        onClick={() => {
                            if (tempNextOfKinRecord.nextOfKins.length < 1) {
                                alert('Maklumat Waris tidak boleh kosong.');
                            } else {
                                tempNextOfKinRecord.isDraft = true;
                                _submitNextOfKinForm(tempNextOfKinRecord);
                            }
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        type="primary"
                        icon="check"
                        onClick={() => {
                            if (tempNextOfKinRecord.nextOfKins.length < 1) {
                                alert('Maklumat Waris tidak boleh kosong.');
                            } else {
                                tempNextOfKinRecord.isDraft = false;
                                _submitNextOfKinForm(tempNextOfKinRecord);
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                    {#if tempNextOfKinRecord.nextOfKins.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon untuk mengemaskini maklumat.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <Accordion class="w-full pb-10">
                            {#each tempNextOfKinRecord.nextOfKins as obj, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >Maklumat {i + 1}</span
                                    >
                                    <CustomTextField
                                        label="Nama"
                                        id="name{i}"
                                        disabled
                                        val={obj.name}
                                    />
                                    <CustomTextField
                                        label="Nama Lain"
                                        id="alternativeName{i}"
                                        disabled
                                        val={obj.alternativeName}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        id="identityDocumentNumber{i}"
                                        disabled
                                        val={obj.identityDocumentNumber}
                                    />
                                    <CustomSelectField
                                        label="Jenis Kad Pengenalan"
                                        id="identityDocumentColor{i}"
                                        options={data.lookup
                                            .identityCardTypeLookup}
                                        disabled
                                        val={obj.identityDocumentColor}
                                    />
                                    <CustomSelectField
                                        label="Jantina"
                                        id="genderId{i}"
                                        options={data.lookup.genderLookup}
                                        disabled
                                        val={obj.genderId}
                                    />
                                    <CustomTextField
                                        label="Tarikh Lahir"
                                        id="birthDate{i}"
                                        type="date"
                                        disabled
                                        val={obj.birthDate}
                                    />
                                    <CustomSelectField
                                        label="Kewarganegaraan"
                                        id="nationalityId{i}"
                                        options={data.lookup.nationalityLookup}
                                        disabled
                                        val={obj.nationalityId}
                                    />
                                    <CustomSelectField
                                        label="Negeri Kelahiran"
                                        id="birthStateId{i}"
                                        options={data.lookup.stateLookup}
                                        disabled
                                        val={obj.birthStateId}
                                    />
                                    <CustomSelectField
                                        label="Negara Kelahiran"
                                        id="birthCountryId{i}"
                                        options={data.lookup.countryLookup}
                                        disabled
                                        val={obj.birthCountryId}
                                    />
                                    <CustomTextField
                                        label="Alamat"
                                        id="address{i}"
                                        disabled
                                        val={obj.address}
                                    />
                                    <CustomTextField
                                        label="Poskod"
                                        id="postcode{i}"
                                        disabled
                                        val={obj.postcode}
                                    />
                                    <CustomTextField
                                        label="No. Telefon"
                                        id="phoneNumber{i}"
                                        disabled
                                        val={obj.phoneNumber}
                                    />
                                    <CustomSelectField
                                        label="Bangsa"
                                        id="raceId{i}"
                                        options={data.lookup.raceLookup}
                                        disabled
                                        val={obj.raceId}
                                    />

                                    <CustomSelectField
                                        label="Status"
                                        id="maritalId{i}"
                                        options={data.lookup.maritalLookup}
                                        disabled
                                        val={obj.maritalId}
                                    />
                                    {#if obj.maritalId === 3}
                                        <CustomTextField
                                            label="Tarikh Perkahwinan"
                                            id="marriageDate{i}"
                                            type="date"
                                            disabled
                                            val={obj.marriageDate}
                                        />
                                    {/if}
                                    <CustomSelectField
                                        label="Hubungan"
                                        id="relationshipId{i}"
                                        options={data.lookup.relationshipLookup}
                                        disabled
                                        val={obj.relationshipId}
                                    />
                                    <CustomSelectField
                                        label="Taraf Pendidikan"
                                        id="educationLevelId{i}"
                                        options={data.lookup.educationLookup}
                                        disabled
                                        val={obj.educationLevelId}
                                    />
                                    <CustomTextField
                                        label="Alamat Majikan"
                                        id="workAddress{i}"
                                        disabled
                                        val={obj.workAddress}
                                    />
                                    <CustomTextField
                                        label="Poskod Alamat Majikan"
                                        id="workPostcode{i}"
                                        disabled
                                        val={obj.workPostcode}
                                    />
                                    <CustomSelectField
                                        label="Bersekolah"
                                        id="inSchool{i}"
                                        options={[
                                            { value: true, name: 'Ya' },
                                            { value: false, name: 'Tidak' },
                                        ]}
                                        disabled
                                        val={obj.inSchool}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    {/if}

            </StepperContentBody>
        </StepperContent>

        {#if tempNextOfKinRecord.nextOfKins.length > 0 || data.getContractNextOfKinDetails.nextOfKinList?.length > 0}
            <StepperContent>
                <StepperContentHeader title="Dokumen Sokongan">
                    {#if (data.getContractDocuments.attachmentName == '' || data.getContractDocuments.attachmentName == null) && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                        <TextIconButton
                            label="Hantar"
                            form="documentUploadForm"
                            type="primary"
                            icon="check"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.getContractDocuments.attachmentName !== undefined}
                        <div class="flex w-full flex-col gap-2">
                            <span
                                class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >
                                Fail-fail yang telah dimuat naik:
                            </span>

                            <a
                                href={data.getContractDocuments.attachment}
                                download={data.getContractDocuments
                                    .attachmentName}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{data.getContractDocuments.attachmentName}</a
                            >
                        </div>
                    {:else if data.getContractDocuments.attachmentName == undefined && data.currentRoleCode !== UserRoleConstant.calonKontrak.code}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu calon kakitangan untuk muat naik dokumen
                                    yang berkaitan.
                                </p>
                            </Alert>
                        </div>
                    {:else if data.getContractDocuments.attachmentName == undefined && data.currentRoleCode === UserRoleConstant.calonKontrak.code}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            method="POST"
                            id="documentUploadForm"
                            enctype="multipart/form-data"
                            use:contractUploadDocumentEnhance
                        >
                            <span
                                class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >
                                Sila muat turun dan isi dokumen berkaitan dan
                                muat naik ke ruangan yang disediakan.
                            </span>
                            <DownloadAttachment
                                triggerDownload={() =>
                                    handleDownload(data.contractDocLink)}
                                fileName="Surat Setuju Terima Tawaran.pdf"
                            />
                            <!-- <a
                                href={data.contractTemplate.template}
                                download={data.contractTemplate
                                    .templateName}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{data.contractTemplate.templateName}</a
                            > -->
                            <div class="flex w-full flex-col gap-2 px-3">
                                <CustomFileField
                                    label="Dokumen Sokongan"
                                    id="contractDocument"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- {#if isProcessEnded !== 1} -->
        {#if data.currentRoleCode !== UserRoleConstant.calonKontrak.code && data.getContractDocuments == undefined}
            <StepperContent>
                <StepperContentHeader title="Maklumat Lantikan Baru (Kontrak)">
                    {#if !$updateContractDetailForm.isReadonly}
                        <TextIconButton
                            label="Hantar"
                            form="updateContractDetailForm"
                            type="primary"
                            icon="check"
                        />
                    {/if}
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
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="startContract"
                            type="date"
                            bind:val={$updateContractDetailForm.startContract}
                            errors={$updateContractDetailError.startContract}
                        />
                        <CustomTextField
                            label="Tarikh Tamat Kontrak"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="endContract"
                            type="date"
                            bind:val={$updateContractDetailForm.endContract}
                            errors={$updateContractDetailError.endContract}
                        />
                        <CustomTextField
                            label="Kadar Upah (RM)"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="wageRate"
                            type="number"
                            bind:val={$updateContractDetailForm.wageRate}
                            errors={$updateContractDetailError.wageRate}
                        />
                        <CustomSelectField
                            label="Penempatan"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="placementId"
                            options={data.lookup.placementLookup}
                            bind:val={$updateContractDetailForm.placementId}
                            errors={$updateContractDetailError.placementId}
                        />
                        <CustomTextField
                            label="Gelaran Tugas"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="designation"
                            bind:val={$updateContractDetailForm.designation}
                            errors={$updateContractDetailError.designation}
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="reportDutyDate"
                            type="date"
                            bind:val={$updateContractDetailForm.reportDutyDate}
                            errors={$updateContractDetailError.reportDutyDate}
                        />
                        <CustomTextField
                            label="No. KWSP"
                            isRequired={false}
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="kwspNo"
                            bind:val={$updateContractDetailForm.kwspNo}
                            errors={$updateContractDetailError.kwspNo}
                        />
                        <CustomTextField
                            label="No. SOCSO"
                            isRequired={false}
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="socsoNo"
                            bind:val={$updateContractDetailForm.socsoNo}
                            errors={$updateContractDetailError.socsoNo}
                        />
                        <CustomTextField
                            label="No. Cukai"
                            isRequired={false}
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="taxNo"
                            bind:val={$updateContractDetailForm.taxNo}
                            errors={$updateContractDetailError.taxNo}
                        />
                        <CustomTextField
                            label="Nama Bank"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="bankName"
                            bind:val={$updateContractDetailForm.bankName}
                            errors={$updateContractDetailError.bankName}
                        />
                        <CustomTextField
                            label="No. Akaun Bank"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="bankAccount"
                            bind:val={$updateContractDetailForm.bankAccount}
                            errors={$updateContractDetailError.bankAccount}
                        />
                        <CustomSelectField
                            label="Jenis Perkhidmatan"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="serviceTypeId"
                            options={data.lookup.serviceTypeLookup}
                            bind:val={$updateContractDetailForm.serviceTypeId}
                            errors={$updateContractDetailError.serviceTypeId}
                        />
                        <CustomTextField
                            label="Kelayakan Cuti (Hari)"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="leaveEntitlement"
                            type="number"
                            bind:val={$updateContractDetailForm.leaveEntitlement}
                            errors={$updateContractDetailError.leaveEntitlement}
                        />
                        <CustomTextField
                            label="Tarikh Lantikan Kontrak"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="effectiveDate"
                            type="date"
                            bind:val={$updateContractDetailForm.effectiveDate}
                            errors={$updateContractDetailError.effectiveDate}
                        />
                        <CustomTextField
                            label="Tarikh Lantikan Kontrak Semasa"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="civilServiceStartDate"
                            type="date"
                            bind:val={$updateContractDetailForm.civilServiceStartDate}
                            errors={$updateContractDetailError.civilServiceStartDate}
                        />
                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan LKIM"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="lkimServiceStartDate"
                            type="date"
                            bind:val={$updateContractDetailForm.lkimServiceStartDate}
                            errors={$updateContractDetailError.lkimServiceStartDate}
                        />
                        <CustomTextField
                            label="Mula Dilantik Perkhidmatan Sekarang"
                            bind:disabled={$updateContractDetailForm.isReadonly}
                            id="currentServiceStartDate"
                            type="date"
                            bind:val={$updateContractDetailForm.currentServiceStartDate}
                            errors={$updateContractDetailError.currentServiceStartDate}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Urus Setia Perjawatan">
                    {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code && !$secretaryContractResultForm.isReadonly}
                        <TextIconButton
                            label="Hantar"
                            form="secretaryContractResultForm"
                            type="primary"
                            icon="check"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        method="POST"
                        id="secretaryContractResultForm"
                        use:secretaryContractResultEnhance
                    >
                        {#if data.getSecretaryResult?.name !== ''}
                            <CustomTextField
                                label="Nama"
                                disabled
                                id="name"
                                val={$secretaryContractResultForm.name}
                            />
                        {/if}
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            disabled={$secretaryContractResultForm.isReadonly}
                            id="remark"
                            bind:val={$secretaryContractResultForm.remark}
                            errors={$secretaryContractResultError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            disabled={$secretaryContractResultForm.isReadonly}
                            id="status"
                            options={certifyOptions}
                            bind:val={$secretaryContractResultForm.status}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            {#if $secretaryContractResultForm.isReadonly && $secretaryContractResultForm.status !== false}
                <StepperContent>
                    <StepperContentHeader title="Tetapkan Penyokong & Pelulus">
                        {#if !$setSupporterApproverForm.isReadonly && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                            <TextIconButton
                                label="Hantar"
                                form="setSupporterApproverForm"
                                type="primary"
                                icon="check"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            method="POST"
                            id="setSupporterApproverForm"
                            use:setSupporterApproverEnhance
                        >
                            <CustomSelectField
                                label="Penyokong"
                                disabled={$setSupporterApproverForm.isReadonly}
                                id="supporterId"
                                options={data.lookup.supporterApproverLookup}
                                bind:val={$setSupporterApproverForm.supporterId}
                                errors={$setSupporterApproverError.supporterId}
                            />
                            <CustomSelectField
                                label="Pelulus"
                                disabled={$setSupporterApproverForm.isReadonly}
                                id="approverId"
                                options={data.lookup.supporterApproverLookup}
                                bind:val={$setSupporterApproverForm.approverId}
                                errors={$setSupporterApproverError.approverId}
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Keputusan Penyokong">
                        {#if !$supporterContractResultForm.isReadonly && data.currentRoleCode == UserRoleConstant.penyokong.code}
                            <TextIconButton
                                label="Hantar"
                                form="supporterContractResultForm"
                                type="primary"
                                icon="check"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if $supporterContractResultForm.remark == '' && data.currentRoleCode !== UserRoleConstant.penyokong.code}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu keputusan daripada Penyokong.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                method="POST"
                                id="supporterContractResultForm"
                                use:supporterContractResultEnhance
                            >
                                {#if $supporterContractResultForm.isReadonly}
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="name"
                                        val={$supporterContractResultForm.name}
                                    />
                                {/if}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    bind:disabled={$supporterContractResultForm.isReadonly}
                                    id="remark"
                                    bind:val={$supporterContractResultForm.remark}
                                    errors={$supporterContractResultError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    bind:disabled={$supporterContractResultForm.isReadonly}
                                    id="status"
                                    options={supportOptions}
                                    bind:val={$supporterContractResultForm.status}
                                />
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader title="Keputusan Pelulus">
                        {#if !$approverContractResultForm.isReadonly && data.currentRoleCode == UserRoleConstant.pelulus.code}
                            <TextIconButton
                                label="Hantar"
                                form="approverContractResultForm"
                                type="primary"
                                icon="check"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if $approverContractResultForm.remark == '' && data.currentRoleCode !== UserRoleConstant.pelulus.code}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu keputusan daripada Pelulus.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                method="POST"
                                id="approverContractResultForm"
                                use:approverContractResultEnhance
                            >
                                {#if $approverContractResultForm.isReadonly}
                                    <CustomTextField
                                        label="Nama"
                                        disabled
                                        id="name"
                                        val={$approverContractResultForm.name}
                                    />
                                {/if}
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    bind:disabled={$approverContractResultForm.isReadonly}
                                    id="remark"
                                    bind:val={$approverContractResultForm.remark}
                                    errors={$approverContractResultError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    bind:disabled={$approverContractResultForm.isReadonly}
                                    id="status"
                                    options={approveOptions}
                                    bind:val={$approverContractResultForm.status}
                                />
                            </form>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}
            {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code && $approverContractResultForm.status}
                <StepperContent>
                    <StepperContentHeader title="No. Pekerja Calon"
                    ></StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Tindakan: Tekan butang untuk memperolehi No. Pekerja kakitangan kontrak."
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            method="POST"
                            id="getContractEmployeeNumberForm"
                            use:getContractEmployeeNumberEnhance
                        >
                            <div class="flex justify-start">
                                <TextIconButton
                                    label="No. Pekerja"
                                    icon="create"
                                    type="primary"
                                    form="getContractEmployeeNumberForm"
                                />
                            </div>
                            <CustomTextField
                                id="employeeNumber"
                                label="No. Pekerja"
                                disabled
                                placeholder=""
                                bind:val={$getContractEmployeeNumberForm.employeeNumber}
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}
            <!-- {/if} -->
        {/if}
    </Stepper>
</section>

<!-- modal for adding contract candidate personal details -->
<Modal title="Tambah Rekod Akademik" bind:open={academicModal}>
    <form
        class="flex w-full flex-col justify-start gap-2.5"
        method="POST"
        id="academicDetailForm"
        use:academicDetailEnhance
    >
        <CustomSelectField
            label="Jenis Jurusan"
            id="majorId"
            options={data.lookup.majorMinorLookup}
            bind:val={$academicDetailForm.majorId}
            errors={$academicDetailError.majorId}
        />
        <CustomSelectField
            label="Jenis Bidang"
            id="minorId"
            options={data.lookup.majorMinorLookup}
            bind:val={$academicDetailForm.minorId}
            errors={$academicDetailError.minorId}
        />
        <CustomSelectField
            label="Negara"
            id="countryId"
            options={data.lookup.countryLookup}
            bind:val={$academicDetailForm.countryId}
            errors={$academicDetailError.countryId}
        />
        <CustomSelectField
            label="Institusi"
            id="institutionId"
            options={data.lookup.institutionLookup}
            bind:val={$academicDetailForm.institutionId}
            errors={$academicDetailError.institutionId}
        />
        <CustomSelectField
            label="Taraf Pendidikan"
            id="educationLevelId"
            options={data.lookup.educationLookup}
            bind:val={$academicDetailForm.educationLevelId}
            errors={$academicDetailError.educationLevelId}
        />
        <CustomSelectField
            label="Penajaan"
            id="sponsorshipId"
            options={data.lookup.sponsorshipLookup}
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
        <div class="flex w-full flex-col gap-2">
            <CustomFileField
                label="Muatnaik Sijil"
                id="contractAcademicDocument"
                bind:files={academicfiles}
            ></CustomFileField>
        </div>
        <div class="flex w-full justify-center pt-6">
            <TextIconButton
                label="Simpan"
                form="academicDetailForm"
                type="primary"
                icon="check"
            />
        </div>
    </form>
</Modal>
<Modal title="Tambah Rekod Pengalaman" bind:open={experienceModal}>
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
            isRequired={false}
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
        <TextIconButton
            label="Simpan"
            form="experienceDetailForm"
            type="primary"
            icon="check"
        />
    </form>
</Modal>
<Modal title="Tambah Rekod Kegiatan/Keahlian" bind:open={activityModal}>
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
        <TextIconButton
            label="Simpan"
            form="activityDetailForm"
            type="primary"
            icon="check"
        />
    </form>
</Modal>
<Modal title="Tambah Rekod Keluarga" bind:open={familyModal}>
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
            options={data.lookup.identityCardTypeLookup}
            bind:val={$familyDetailForm.identityDocumentColor}
            errors={$familyDetailError.identityDocumentColor}
        />
        <CustomSelectField
            label="Jantina"
            id="genderId"
            options={data.lookup.genderLookup}
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
            options={data.lookup.nationalityLookup}
            bind:val={$familyDetailForm.nationalityId}
            errors={$familyDetailError.nationalityId}
        />
        <CustomSelectField
            label="Negeri Kelahiran"
            id="birthStateId"
            options={data.lookup.stateLookup}
            bind:val={$familyDetailForm.birthStateId}
            errors={$familyDetailError.birthStateId}
        />
        <CustomSelectField
            label="Negara Kelahiran"
            id="birthCountryId"
            options={data.lookup.countryLookup}
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
            options={data.lookup.raceLookup}
            bind:val={$familyDetailForm.raceId}
            errors={$familyDetailError.raceId}
        />

        <CustomSelectField
            label="Status"
            id="maritalId"
            options={data.lookup.maritalLookup}
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
            options={data.lookup.relationshipIsFamily}
            bind:val={$familyDetailForm.relationshipId}
            errors={$familyDetailError.relationshipId}
        />
        <CustomSelectField
            label="Taraf Pendidikan"
            id="educationLevelId"
            options={data.lookup.educationLookup}
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
        <TextIconButton
            label="Simpan"
            form="familyDetailForm"
            type="primary"
            icon="check"
        />
    </form>
</Modal>
<Modal
    title="Tambah Rekod Tanggungan Selain Pasangan dan Anak"
    bind:open={dependantModal}
>
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
            options={data.lookup.identityCardTypeLookup}
            bind:val={$dependantDetailForm.identityDocumentColor}
            errors={$dependantDetailError.identityDocumentColor}
        />
        <CustomSelectField
            label="Jantina"
            id="genderId"
            options={data.lookup.genderLookup}
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
            options={data.lookup.nationalityLookup}
            bind:val={$dependantDetailForm.nationalityId}
            errors={$dependantDetailError.nationalityId}
        />
        <CustomSelectField
            label="Negeri Kelahiran"
            id="birthStateId"
            options={data.lookup.stateLookup}
            bind:val={$dependantDetailForm.birthStateId}
            errors={$dependantDetailError.birthStateId}
        />
        <CustomSelectField
            label="Negara Kelahiran"
            id="birthCountryId"
            options={data.lookup.countryLookup}
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
            options={data.lookup.raceLookup}
            bind:val={$dependantDetailForm.raceId}
            errors={$dependantDetailError.raceId}
        />

        <CustomSelectField
            label="Status"
            id="maritalId"
            options={data.lookup.maritalLookup}
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
            options={data.lookup.relationshipIsNonFamily}
            bind:val={$dependantDetailForm.relationshipId}
            errors={$dependantDetailError.relationshipId}
        />
        <CustomSelectField
            label="Taraf Pendidikan"
            id="educationLevelId"
            options={data.lookup.educationLookup}
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
        <TextIconButton
            label="Simpan"
            form="dependantDetailForm"
            type="primary"
            icon="check"
        />
    </form>
</Modal>
<Modal title="Tambah Rekod Waris" bind:open={nextOfKinModal}>
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
            options={data.lookup.identityCardTypeLookup}
            bind:val={$nextOfKinDetailForm.identityDocumentColor}
            errors={$nextOfKinDetailError.identityDocumentColor}
        />
        <CustomSelectField
            label="Jantina"
            id="genderId"
            options={data.lookup.genderLookup}
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
            options={data.lookup.nationalityLookup}
            bind:val={$nextOfKinDetailForm.nationalityId}
            errors={$nextOfKinDetailError.nationalityId}
        />
        <CustomSelectField
            label="Negeri Kelahiran"
            id="birthStateId"
            options={data.lookup.stateLookup}
            bind:val={$nextOfKinDetailForm.birthStateId}
            errors={$nextOfKinDetailError.birthStateId}
        />
        <CustomSelectField
            label="Negara Kelahiran"
            id="birthCountryId"
            options={data.lookup.countryLookup}
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
            options={data.lookup.raceLookup}
            bind:val={$nextOfKinDetailForm.raceId}
            errors={$nextOfKinDetailError.raceId}
        />

        <CustomSelectField
            label="Status"
            id="maritalId"
            options={data.lookup.maritalLookup}
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
            options={data.lookup.relationshipLookup}
            bind:val={$nextOfKinDetailForm.relationshipId}
            errors={$nextOfKinDetailError.relationshipId}
        />
        <CustomSelectField
            label="Taraf Pendidikan"
            id="educationLevelId"
            options={data.lookup.educationLookup}
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
        <TextIconButton
            label="Simpan"
            form="nextOfKinDetailForm"
            type="primary"
            icon="check"
        />
    </form>
</Modal>
<Toaster />
