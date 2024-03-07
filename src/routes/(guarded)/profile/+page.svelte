<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { dateProxy, superValidate } from 'sveltekit-superforms/client';

    import type { PageData } from './$types';

    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { Checkbox, Modal } from 'flowbite-svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import {
        _academicInfoSchema,
        _academicListResponseSchema,
        _activityInfoSchema,
        _experienceInfoSchema,
        _experienceListResponseSchema,
        _personalInfoResponseSchema,
        _relationsSchema,
        _serviceDetailSchema,
        _serviceInfoResponseSchema,
    } from '$lib/schemas/mypsm/profile/profile-schemas';
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _personalInfoSubmit,
        _serviceInfoSubmit,
        _submitAcademicForm,
        _submitAcademicInfoForm,
        _submitActivityForm,
        _submitActivityInfoForm,
        _submitDependencyForm,
        _submitDependencyInfoForm,
        _submitExperienceForm,
        _submitExperienceInfoForm,
        _submitFamilyForm,
        _submitFamilyInfoForm,
        _submitNextOfKinForm,
        _submitNextOfKinInfoForm,
    } from './+page';
    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import { error } from '@sveltejs/kit';
    import type { Academic } from '$lib/dto/mypsm/profile/academic-detail.dto';
    import type { Experience } from '$lib/dto/mypsm/profile/experience-detail.dto';
    import type { Activity } from '$lib/dto/mypsm/profile/activity-detail.dto';
    import type {
        Dependency,
        Family,
        NextOfKin,
    } from '$lib/dto/mypsm/profile/relation-detail.dto';

    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let data: PageData;

    const handleOnInput = (e: Event) => {
        // $documentForm.document =
        //     ((e.currentTarget as HTMLInputElement)?.files?.item(0) as File) ??
        //     null;
    };

    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let ResultOptions: RadioDTO[] = [
        {
            value: true,
            name: 'YA',
        },
        {
            value: false,
            name: 'TIDAK',
        },
    ];

    console.log(data.personalDetail);

    const triggerSubmitAcademicTempData = () => {
        _submitAcademicInfoForm(tempAcademicRecord);
    };

    const triggerSubmitExperienceTempData = () => {
        _submitExperienceInfoForm(tempExperienceRecord);
    };

    const triggerSubmitActivityTempData = () => {
        _submitActivityInfoForm(tempActivityRecord);
    };
    const triggerSubmitFamilyTempData = () => {
        _submitFamilyInfoForm(tempFamilyRecord);
    };
    const triggerSubmitDependencyTempData = () => {
        _submitDependencyInfoForm(tempDependency);
    };
    const triggerSubmitNextOfKinTempData = () => {
        const tempData = tempNextOfKin.map((tempData) => ({
            birthCountryId: Number(tempData.birthCountryId),
            birthStateId: Number(tempData.birthStateId),
            relationshipId: Number(tempData.relationshipId),
            educationLevelId: Number(tempData.educationLevelId),
            raceId: Number(tempData.raceId),
            nationalityId: Number(tempData.nationalityId),
            maritalId: Number(tempData.maritalId),
            genderId: Number(tempData.genderId),
            name: tempData.name,
            alternativeName: tempData.alternativeName,
            identityDocumentColor: tempData.identityDocumentColor,
            identityDocumentNumber: tempData.identityDocumentNumber,
            address: tempData.address,
            postcode: tempData.postcode,
            birthDate: tempData.birthDate,
            workAddress: tempData.workAddress,
            workPostcode: tempData.workPostcode,
            phoneNumber: tempData.phoneNumber,
            marriageDate: tempData.marriageDate,
            inSchool: tempData.inSchool,
        }));
        tempNextOfKin = [...tempNextOfKin, ...tempData] as NextOfKin[];
        _submitNextOfKinInfoForm(tempNextOfKin);
    };

    const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
    } = superForm(data.personalDetail, {
        SPA: true,
        id: 'personalDetail',
        validators: zod(_personalInfoResponseSchema),
        onUpdate(event) {},
        onSubmit() {
            _personalInfoSubmit($personalInfoForm);
        },
    });

    const {
        form: serviceInfoForm,
        errors: serviceInfoError,
        enhance: serviceInfoEnhance,
    } = superForm(
        data.serviceInfoForm,

        {
            SPA: true,
            id: 'serviceDetail',
            validators: zod(_serviceInfoResponseSchema),
            onUpdate(event) {},
            onSubmit() {
                _serviceInfoSubmit($serviceInfoForm);
            },
        },
    );

    const {
        form: academicInfoForm,
        errors: academicInfoError,
        enhance: academicInfoEnhance,
    } = superForm(
        data.academicInfoForm,

        {
            SPA: true,
            dataType: 'json',
            id: 'academicDetail',
            validators: zod(_academicListResponseSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitAcademicForm($academicInfoForm);
            },
        },
    );

    const {
        form: experienceInfoForm,
        errors: experienceInfoError,
        enhance: experienceInfoEnhance,
    } = superForm(
        data.experienceInfoForm,

        {
            SPA: true,
            dataType: 'json',
            id: 'experienceDetail',
            validators: zod(_experienceListResponseSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitExperienceForm($experienceInfoForm);
            },
        },
    );

    const {
        form: activityInfoForm,
        errors: activityInfoError,
        enhance: activityInfoEnhance,
    } = superForm(
        data.activityInfoForm,

        {
            SPA: true,
            id: 'activityDetail',
            validators: zod(_activityInfoSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitActivityForm($activityInfoForm);
            },
        },
    );

    const {
        form: familyInfoForm,
        errors: familyInfoError,
        enhance: familyInfoEnhance,
    } = superForm(
        data.familyInfoForm,

        {
            SPA: true,
            id: 'familyDetail',
            validators: zod(_relationsSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitFamilyForm($familyInfoForm);
            },
        },
    );

    const {
        form: dependencyInfoForm,
        errors: dependencyInfoError,
        enhance: dependencyInfoEnhance,
    } = superForm(
        data.familyInfoForm,

        {
            SPA: true,
            id: 'dependencyDetail',
            validators: zod(_relationsSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitDependencyForm($dependencyInfoForm);
            },
        },
    );

    const {
        form: nextOfKinInfoForm,
        errors: nextOfKinInfoError,
        enhance: nextOfKinInfoEnhance,
    } = superForm(
        data.nextOFKInInfoForm,

        {
            SPA: true,
            id: 'nextOfKinDetail',
            validators: zod(_relationsSchema),
            onUpdate(event) {},
            onSubmit() {
                _submitNextOfKinForm($nextOfKinInfoForm);
            },
        },
    );

    let editMode: boolean = true;

    let tempAcademicRecord: Academic[] = [];
    // modal
    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_academicInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_academicInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempAcademicRecord = [
                ...tempAcademicRecord,
                result.data as Academic,
            ];
            openAcademicInfoModal = false;
        },
    });

    let tempExperienceRecord: Experience[] = [];
    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_experienceInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_experienceInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempExperienceRecord = [
                ...tempExperienceRecord,
                result.data as Experience,
            ];
            openExperienceInfoModal = false;
        },
    });

    let tempActivityRecord: Activity[] = [];
    const {
        form: addActivityModal,
        errors: addActivityModalErrors,
        enhance: addActivityModalEnhance,
    } = superForm(data.addActivityModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_activityInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_activityInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempActivityRecord = [
                ...tempActivityRecord,
                result.data as Activity,
            ];
            openAcademicInfoModal = false;
        },
    });

    let tempFamilyRecord: Family[] = [];
    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempFamilyRecord = [...tempFamilyRecord, result.data as Family];
            openFamilyInfoModal = false;
        },
    });

    let tempDependency: Dependency[] = [];
    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempDependency = [...tempDependency, result.data as Dependency];
            openNonFamilyInfoModal = false;
        },
    });

    let tempNextOfKin: NextOfKin[] = [];
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempNextOfKin = [...tempNextOfKin, result.data as NextOfKin];
            openNextOfKinInfoModal = false;
        },
    });
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="MaklumatPeribadi">
            <Stepper>
                <!------------------------------------------------------>
                <!---------------Maklumat Peribadi---------------------->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader title="Maklumat Peribadi">
                        <TextIconButton
                            type="neutral"
                            label="Kemaskini"
                            onClick={() => (editMode = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            onClick={() => (editMode = true)}
                            form="personalFormStepper"
                        />
                    </StepperContentHeader>
                    <StepperContentBody
                        ><!-- Maklumat Peribadi -->
                        <form
                            id="personalFormStepper"
                            method="POST"
                            use:personalInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
                            >
                                <p class={stepperFormTitleClass}>
                                    Maklumat Peribadi
                                </p>

                                <!-- <CustomTextField
                                    disabled={editMode}
                                    id="employeeNumber"
                                    label={'No. Pekerja'}
                                    type="text"
                                    errors={$personalInfoError.employeeNo}
                                    bind:val={editMode ? data.personalDetails.employeeNo : $personalInfoForm.employeeNumber}
                                ></CustomTextField> -->
                                <CustomTextField
                                    disabled
                                    id="identityCardNumber"
                                    label={'No. Kad Pengenalan'}
                                    type="text"
                                    bind:val={$personalInfoForm.identityCardNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="fullName"
                                    label={'Nama Penuh'}
                                    type="text"
                                    bind:val={$personalInfoForm.fullName}
                                ></CustomTextField>

                                <CustomTextField
                                    id="alternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    bind:val={$personalInfoForm.alternativeName}
                                ></CustomTextField>

                                <CustomTextField
                                    id="email"
                                    label="Emel Pekerja"
                                    bind:val={$personalInfoForm.email}
                                ></CustomTextField>

                                <CustomSelectField
                                    disabled
                                    id="icColour"
                                    label="Warna Kad Pengenalan"
                                    bind:val={$personalInfoForm.icColour}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled
                                    type="date"
                                    id="birthDate"
                                    label="Tarikh Lahir"
                                    bind:val={$personalInfoForm.birthDate}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="birthStateId"
                                    label="Tempat Lahir"
                                    bind:val={$personalInfoForm.birthStateId}
                                    options={data.selectionOptions.stateLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="birthCountryId"
                                    label="Tempat Lahir"
                                    bind:val={$personalInfoForm.birthCountryId}
                                    options={data.selectionOptions
                                        .countryLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="nationalityId"
                                    label="Warganegara"
                                    bind:val={$personalInfoForm.nationalityId}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="raceId"
                                    label="Bangsa"
                                    bind:val={$personalInfoForm.raceId}
                                    options={data.selectionOptions.raceLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="ethnicId"
                                    label="Etnik"
                                    bind:val={$personalInfoForm.ethnicId}
                                    options={data.selectionOptions
                                        .ethnicityLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="religionId"
                                    label="Agama"
                                    bind:val={$personalInfoForm.religionId}
                                    options={data.selectionOptions
                                        .religionLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="genderId"
                                    label="Jantina"
                                    bind:val={$personalInfoForm.genderId}
                                    options={data.selectionOptions.genderLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="maritalId"
                                    label="Status Perkahwinan"
                                    bind:val={$personalInfoForm.maritalId}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                ></CustomSelectField>

                                <!-- <CustomTextField
                                disabled
                                id="email"
                                label={'Emel'}
                                type="text"
                                val=""
                            ></CustomTextField> -->

                                <CustomTextField
                                    disabled
                                    id="homeAddress"
                                    label="Alamat Rumah"
                                    bind:val={$personalInfoForm.homeAddress}
                                />

                                <CustomTextField
                                    disabled
                                    id="mailAddress"
                                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                                    bind:val={$personalInfoForm.mailAddress}
                                />
                                <CustomSelectField
                                    disabled
                                    id="houseLoanType"
                                    label="Jenis Pinjaman Rumah"
                                    bind:val={$personalInfoForm.houseLoanType}
                                ></CustomSelectField>
                                <CustomSelectField
                                    disabled
                                    id="houseLoan"
                                    label="Pinjaman Rumah"
                                    bind:val={$personalInfoForm.houseloan}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="assetDeclarationStatusId"
                                    label="Status Pengikstiharan Harta"
                                    bind:val={$personalInfoForm.assetDeclarationStatusId}
                                    options={data.selectionOptions
                                        .assetDeclarationLookup}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    id="propertyDeclarationDate"
                                    type="date"
                                    label="Tarikh Pengikstiharan Harta"
                                    bind:val={$personalInfoForm.propertyDeclarationDate}
                                />

                                <CustomSelectField
                                    disabled
                                    id="isExPoliceOrSoldier"
                                    label="Bekas Polis / Tentera"
                                    bind:val={$personalInfoForm.isExPoliceOrSoldier}
                                    options={data.selectionOptions
                                        .generalLookup}
                                ></CustomSelectField>

                                <p class={stepperFormTitleClass}>
                                    Maklumat Pertalian Dengan Kakitangan LKIM
                                </p>

                                <CustomSelectField
                                    disabled
                                    id="isInternalRelationship"
                                    label="Perhubungan Dengan Kakitangan LKIM"
                                    bind:val={$personalInfoForm.isInternalRelationship}
                                    options={data.selectionOptions
                                        .generalLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="employeeNumber"
                                    label={'No. Pekerja LKIM'}
                                    bind:val={$personalInfoForm.employeeNumber}
                                    options={data.selectionOptions
                                        .employeeLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="employeeName"
                                    label="Jawatan Kakitangan LKIM"
                                    bind:val={$personalInfoForm.employeeName}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="employeePosition"
                                    label="Jawatan Kakitangan LKIM"
                                    bind:val={$personalInfoForm.employeePosition}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="relationship"
                                    label="Hubungan"
                                    bind:val={$personalInfoForm.relationship}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                ></CustomSelectField>
                            </div>
                            <!-- </form> -->
                        </form></StepperContentBody
                    >
                </StepperContent>

                <!------------------------------------------------------>
                <!--------------- Maklumat Perkhidmatan ---------------->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader title="Maklumat Perkhidmatan">
                        <TextIconButton
                            label="simpan"
                            type="primary"
                            icon="check"
                            form="serviceDetail"
                        ></TextIconButton>
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            id="serviceFormStepper"
                            method="POST"
                            use:serviceInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <b class="text-sm text-system-primary"
                                >Maklumat Perkhidmatan</b
                            >
                            <CustomTextField
                                id="gradeId"
                                label={'Gred Semasa'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="positionId"
                                label={'Jawatan'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="placementId"
                                label={'Penempatan'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="serviceTypeId"
                                label={'Taraf Perkhidmatan'}
                                type="text"
                                val=""
                            ></CustomTextField>

                            <!-- <RadioButton
                            
                            options={faedahPersaraanOptions}
                            label={'Faedah Persaraan'}
                            bind:userSelected={isFaedahKWSP}
                        ></RadioButton>  -->

                            <CustomRadioBoolean
                                id="retirementBenefit"
                                label="Faedah Persaraan"
                                val=""
                            />

                            <CustomTextField
                                id="epfNumber"
                                label={'No. KWSP'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="socsoNumber"
                                label={'No. SOCSO'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="incomeNumber"
                                label={'No. Cukai (LHDN)'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="bankName"
                                label={'Bank'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="bankAccount"
                                label={'No. Akaun'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <!-- <CustomTextField
                                id="program"
                                label={'Program'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField> -->
                            <CustomTextField
                                id="eligibleLeaveCount"
                                label={'Kelayakan Cuti'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="civilServiceStartDate"
                                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                                type="date"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="newRecruitEffectiveDate"
                                label={'Mula Dilantik Perkhidmatan LKIM'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="firstServiceDate"
                                label={'Mula Dilantik Perkhidmatan Sekarang'}
                                type="date"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="firstConfirmServiceDate"
                                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                                type="date"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="confirmDate"
                                label={'Disahkan Dalam Jawatan Semasa LKIM'}
                                type="date"
                                val=""
                            ></CustomTextField>

                            <!-- <AccordianField
                            disabled={editable}
                            label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                            header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                        > 
    
                            <{#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

                            <!-- <label
                                for=""
                                class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                                    ? 'text-txt-tertiary'
                                    : 'text-txt-primary'}
                                                        hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                >{'i + 1'}. {'val'}</label
                            > -->
                            <!-- {/each} -->
                            <!-- </AccordianField>
                                 -->
                            <!-- <CustomTextField
                                id="tarikhKelulusanPercantumanPerkhidmatanLepas"
                                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField> -->
                            <!-- <CustomTextField
                                id="pemangkuanSekarang"
                                label={'Pemangkuan Sekarang'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField>
                            <CustomTextField
                                id="tanggungKerjaSekarang"
                                label={'Tanggung Kerja Sekarang'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField> -->
                            <!-- <CustomTextField
                                id="skimPencen"
                                label={'Skim Pencen'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField> -->
                            <!-- <CustomTextField
                                id="kenaikanGajiAkhir"
                                label={'Kenaikan Gaji Akhir'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField>
                            <CustomTextField
                                id="kenaikanPangkatAkhir"
                                label={'Kenaikan Pangkat Akhir'}
                                type="text"
                                val=""
                                placeholder=""
                            ></CustomTextField> -->
                            <CustomTextField
                                id="kgt"
                                label={'Bulan KGT'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                id="retirementDate"
                                label={'Tarikh Bersara'}
                                type="text"
                                val=""
                            ></CustomTextField>
                            <b class="text-sm text-system-primary"
                                >Maklumat Gaji dan Elaun - Elaun</b
                            >
                            <div class="grid grid-cols-2 gap-10">
                                <div class="space-y-2.5">
                                    <!-- <CustomTextField
                                        id="tarikhBerkuatkuasa"
                                        label={'Tarikh Berkuatkuasa'}
                                        type="text"
                                        val=""
                                        placeholder=""
                                    ></CustomTextField> -->
                                    <CustomTextField
                                        id="maximumSalary"
                                        label={'Tangga Gaji'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="baseSalary"
                                        label={'Gaji Pokok'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                </div>
                                <!-- hasTooltip={true}
                                    toolTipID="type-itka" -->
                                <div class="space-y-2.5">
                                    <CustomTextField
                                        id="itka"
                                        label={'ITKA'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="itp"
                                        label={'ITP'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="epw"
                                        label={'EPW'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="cola"
                                        label={'COLA'}
                                        type="text"
                                        val=""
                                    ></CustomTextField>
                                    <!-- Tooltip body -->
                                    <!-- <Tooltip
                                        type="dark"
                                        triggeredBy="[id^='type-']"
                                        on:show={assignContent}
                                        >"{tooltipContent}"</Tooltip
                                    > -->
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------>
                <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="FormStepperAkademik"
                            onClick={() => triggerSubmitAcademicTempData()}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if tempAcademicRecord.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempAcademicRecord as academic, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Akademik - {academic.name}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <form
                            id="academicFormStepper"
                            method="POST"
                            use:academicInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                                    onClick={() =>
                                        (openAcademicInfoModal = true)}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                            {#each $academicInfoForm.academics as _, i}
                                <CustomTabContent title={`Akademik #${i + 1}`}>
                                    <CustomSelectField
                                        disabled
                                        id="majorId"
                                        label={'Jurusan'}
                                        options={data.selectionOptions
                                            .majorMinorLookup}
                                        bind:val={$academicInfoForm.academics[i]
                                            .majorId}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        id="minorId"
                                        label={'Bidang'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .minorId}
                                        options={data.selectionOptions
                                            .majorMinorLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        id="countryId"
                                        label={'Negara'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .countryId}
                                        options={data.selectionOptions
                                            .countryLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        id="institutionId"
                                        label={'Institusi'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .institutionId}
                                        options={data.selectionOptions
                                            .institutionLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        id="educationLevelId"
                                        label={'Taraf Pendidikan'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .educationLevelId}
                                        options={data.selectionOptions
                                            .educationLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        id="sponsorshipId"
                                        label={'Penajaan'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .sponsorshipId}
                                        options={data.selectionOptions
                                            .sponsorshipLookup}
                                    ></CustomSelectField>

                                    <CustomTextField
                                        disabled
                                        id="name"
                                        label={'Nama Sijil/Pencapaian'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .name}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        id="completionDate"
                                        label="Tarikh Tamat Pembelajaran"
                                        type="date"
                                        bind:val={$academicInfoForm.academics[i]
                                            .completionDate}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        id="finalGrade"
                                        label={'Ijazah/ CGPA/ Gred'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .finalGrade}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        id="remark"
                                        label={'Catatan'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .remark}
                                    ></CustomTextField>
                                </CustomTabContent>
                            {/each}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!---------------Maklumat Pengalaman--------------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Pengalaman"
                    ></StepperContentHeader>
                    <StepperContentBody>
                        {#if tempExperienceRecord.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempExperienceRecord as experience, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Pengalaman - {experience.company}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Pengalaman"
                                onClick={() => {
                                    openExperienceInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>

                        <form
                            id="experienceInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:experienceInfoEnhance
                            method="POST"
                        >
                            {#if $experienceInfoForm.experiences.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                                {#each $experienceInfoForm.experiences as _, i}
                                    <CustomTabContent
                                        title={`Pengalaman #${i + 1}`}
                                    >
                                        <CustomTextField
                                            disabled
                                            id="company"
                                            label={'Nama Majikan'}
                                            type="text"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].company}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled
                                            id="address"
                                            label={'Alamat Majikan'}
                                            type="text"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].address}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled
                                            id="position"
                                            label={'Jawatan'}
                                            type="text"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].position}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled
                                            id="positionCode"
                                            label={'Kod Jawatan (jika ada)'}
                                            type="text"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].positionCode}
                                        ></CustomTextField>
                                        <CustomTextField
                                            type="date"
                                            disabled
                                            id="startDate"
                                            label="Tarikh Mula Bekerja"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].startDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            disabled
                                            id="endDate"
                                            label="Tarikh Tamat Bekerja"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].endDate}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled
                                            id="salary"
                                            label={'Gaji'}
                                            type="number"
                                            bind:val={$experienceInfoForm
                                                .experiences[i].salary}
                                        ></CustomTextField>
                                    </CustomTabContent>
                                {/each}
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!--------------Maklumat Kegiatan / Keahlian------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
                        <!-- {#if !$isReadonlyActivityFormStepper && data.isCandidateRole}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={() => triggerSubmitActivityTempData()}
                            />
                        {/if} -->
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if tempActivityRecord.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempActivityRecord as activity, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Kegiatan/Keahlian
                                            - {activity.name}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Kegiatan/Keahlian"
                                onClick={() => {
                                    openMembershipInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                        <!-- {/if} -->
                        <form
                            id="activityInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:activityInfoEnhance
                            method="POST"
                        >
                            <!-- {#if $activityInfoForm.activities.length < 1} -->
                            <div
                                class="text-center text-sm italic text-system-primary"
                            >
                                Tiada maklumat.
                            </div>
                            <!-- {:else} -->

                            <!-- {#each $activityInfoForm.activities as _, i} -->
                            <CustomTabContent title={`Aktiviti #`}>
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label={'Nama Kegiatan'}
                                    type="text"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    type="date"
                                    id="joinDate"
                                    label={'Tarikh Keahlian'}
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="position"
                                    label={'Jawatan'}
                                    type="text"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="addDescription"
                                    label={'Catatan'}
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </CustomTabContent>
                            <!-- {/each} -->

                            <!-- {/if} -->
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!-----------------Maklumat Keluarga--------------------->
                <!------------------------------------------------------->
                <StepperContent>
                    <StepperContentHeader title="Maklumat Keluarga">
                        <!-- {#if !$isReadonlyFamilyFormStepper && data.isCandidateRole} -->
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            onClick={() => {}}
                        />
                        <!-- {/if} -->
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if tempFamilyRecord.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempFamilyRecord as family, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Keluarga - {family.name}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Maklumat Keluarga"
                                onClick={() => {
                                    openFamilyInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>

                        <!-- <form
                id="familyInfoForm"
                class="flex w-full flex-col gap-2"
                use:familyInfoEnhance
                method="POST"
            > -->
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada maklumat.
                        </div>

                        <CustomTabContent>
                            <CustomTextField
                                id="name"
                                label={'Nama'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="alternativeName"
                                label={'Nama Lain'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>
                            <CustomSelectField
                                id="identityDocumentColor"
                                label={'Warna Kad Pengenalan'}
                                disabled
                                options={data.selectionOptions
                                    .identityCardColorLookup}
                                val=""
                            ></CustomSelectField>
                            <CustomTextField
                                id="identityDocumentNumber"
                                type="number"
                                label={'Nombor Kad Pengenalan'}
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="address"
                                label={'Alamat'}
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="postcode"
                                label={'Poskod'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                type="date"
                                id="birthDate"
                                label={'Tarikh Lahir'}
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                id="birthCountryId"
                                label={'Negara Kelahiran'}
                                disabled
                                options={data.selectionOptions.countryLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="birthStateId"
                                label={'Negeri Kelahiran'}
                                options={data.selectionOptions.stateLookup}
                                disabled
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="relationshipId"
                                label={'Hubungan'}
                                disabled
                                options={data.selectionOptions
                                    .relationshipLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="educationLevelId"
                                label={'Taraf Pendidikan'}
                                options={data.selectionOptions.educationLookup}
                                disabled
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="raceId"
                                label={'Bangsa'}
                                disabled
                                options={data.selectionOptions.raceLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="nationalityId"
                                label={'Kewarganegaraan'}
                                disabled
                                options={data.selectionOptions
                                    .nationalityLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="maritalId"
                                label={'Status Perkhahwinan'}
                                disabled
                                options={data.selectionOptions.maritalLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="genderId"
                                label={'Jantina'}
                                options={data.selectionOptions.genderLookup}
                                disabled
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                id="workAddress"
                                label={'Alamat Majikan'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="workPostcode"
                                label={'Poskod Majikan'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="phoneNumber"
                                label={'Nombor Mobil'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                type="date"
                                id="marriageDate"
                                label={'Tarikh Kahwin'}
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                id="inSchool"
                                label={'Bersekolah'}
                                disabled
                                options={data.selectionOptions.generalLookup}
                                val=""
                            ></CustomSelectField>
                        </CustomTabContent>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!------ Maklumat Tanggungan Selain Isteri dan Anak ----->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Tanggungan Selain Isteri dan Anak"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            onClick={() => {}}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if tempDependency.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempDependency as nonFamily, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Selain
                                            Suami/Isteri dan Anak - {nonFamily.name}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Tanggungan Selain Isteri dan Anak"
                                onClick={() => {
                                    openNonFamilyInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                        <!-- <form
                            id="dependencyInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:dependencyInfoEnhance
                            method="POST"
                        > -->
                        <!-- {#if $dependencyInfoForm.dependencies.length < 1} -->
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada maklumat.
                        </div>
                        <!-- {:else} -->

                        <CustomTextField
                            id="name"
                            label={'Nama'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="alternativeName"
                            label={'Nama Lain'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>
                        <CustomSelectField
                            id="identityDocumentColor"
                            label={'Warna Kad Pengenalan'}
                            disabled
                            options={data.selectionOptions
                                .identityCardColorLookup}
                            val=""
                        ></CustomSelectField>
                        <CustomTextField
                            id="identityDocumentNumber"
                            type="number"
                            label={'Nombor Kad Pengenalan'}
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="address"
                            label={'Alamat'}
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="postcode"
                            label={'Poskod'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            type="date"
                            id="birthDate"
                            label={'Tarikh Lahir'}
                            val=""
                        ></CustomTextField>

                        <CustomSelectField
                            id="birthCountryId"
                            label={'Negara Kelahiran'}
                            disabled
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="birthStateId"
                            label={'Negeri Kelahiran'}
                            disabled
                            options={data.selectionOptions.countryLookup}
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="relationshipId"
                            label={'Hubungan'}
                            options={data.selectionOptions.relationshipLookup}
                            disabled
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="educationLevelId"
                            label={'Taraf Pendidikan'}
                            disabled
                            options={data.selectionOptions.educationLookup}
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="raceId"
                            label={'Bangsa'}
                            disabled
                            options={data.selectionOptions.raceLookup}
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="nationalityId"
                            label={'Kewarganegaraan'}
                            disabled
                            options={data.selectionOptions.nationalityLookup}
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="maritalId"
                            label={'Status Perkhahwinan'}
                            disabled
                            options={data.selectionOptions.maritalLookup}
                            val=""
                        ></CustomSelectField>

                        <CustomSelectField
                            id="addGenderId"
                            label={'Jantina'}
                            options={data.selectionOptions.genderLookup}
                            disabled
                            val=""
                        ></CustomSelectField>

                        <CustomTextField
                            id="workAddress"
                            label={'Alamat Majikan'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="workPostcode"
                            label={'Poskod Majikan'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="phoneNumber"
                            label={'Nombor Mobil'}
                            type="text"
                            disabled
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            type="date"
                            id="marriageDate"
                            label={'Tarikh Kahwin'}
                            val=""
                        ></CustomTextField>

                        <CustomSelectField
                            id="inSchool"
                            label={'Bersekolah'}
                            options={data.selectionOptions.generalLookup}
                            disabled
                            val=""
                        ></CustomSelectField>

                        <!-- {/if} -->
                        <!-- </form> -->
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!-----------------Maklumat Waris--------------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Waris">
                        <TextIconButton type="primary" label="Simpan" />
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if tempNextOfKin.length > 0}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                            >
                                <div class="mb-2.5 text-sm font-medium">
                                    <p>Preview Rekod Untuk Disimpan</p>
                                </div>
                                {#each tempNextOfKin as nextOfKin, i}
                                    <div class="text-sm text-system-primary">
                                        <p>
                                            {i + 1}. Maklumat Waris - {nextOfKin.name}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                type="primary"
                                label="Tambah Waris"
                                onClick={() => {
                                    openNextOfKinInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>

                        <!-- <form
                id="nextOfKinInfoForm"
                class="flex w-full flex-col gap-2"
                use:nextOfKinInfoEnhance
                method="POST"
            > -->

                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada maklumat.
                        </div>
                        <CustomTabContent>
                            <CustomTextField
                                id="name"
                                label={'Nama'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="alternativeName"
                                label={'Nama Lain'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>
                            <CustomSelectField
                                id="identityDocumentColor"
                                label={'Warna Kad Pengenalan'}
                                disabled
                                options={data.selectionOptions
                                    .identityCardColorLookup}
                                val=""
                            ></CustomSelectField>
                            <CustomTextField
                                id="identityDocumentNumber"
                                type="number"
                                label={'Nombor Kad Pengenalan'}
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="address"
                                label={'Alamat'}
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="postcode"
                                label={'Poskod'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                type="date"
                                id="birthDate"
                                label={'Tarikh Lahir'}
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                id="birthCountryId"
                                label={'Negara Kelahiran'}
                                disabled
                                options={data.selectionOptions.countryLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="birthStateId"
                                label={'Negeri Kelahiran'}
                                options={data.selectionOptions.stateLookup}
                                disabled
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="relationshipId"
                                label={'Hubungan'}
                                options={data.selectionOptions
                                    .relationshipLookup}
                                disabled
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="educationLevelId"
                                label={'Taraf Pendidikan'}
                                disabled
                                options={data.selectionOptions.educationLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="raceId"
                                label={'Bangsa'}
                                disabled
                                options={data.selectionOptions.raceLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="nationalityId"
                                label={'Kewarganegaraan'}
                                disabled
                                options={data.selectionOptions
                                    .nationalityLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="maritalId"
                                label={'Status Perkhahwinan'}
                                disabled
                                options={data.selectionOptions.maritalLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomSelectField
                                id="genderId"
                                label={'Jantina'}
                                disabled
                                options={data.selectionOptions.genderLookup}
                                val=""
                            ></CustomSelectField>

                            <CustomTextField
                                id="workAddress"
                                label={'Alamat Majikan'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="workPostcode"
                                label={'Poskod Majikan'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                id="phoneNumber"
                                label={'Nombor Mobil'}
                                type="text"
                                disabled
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                type="date"
                                id="marriageDate"
                                label={'Tarikh Kahwin'}
                                val=""
                            ></CustomTextField>

                            <CustomSelectField
                                id="inSchool"
                                label={'Bersekolah'}
                                disabled
                                val=""
                                options={data.selectionOptions.generalLookup}
                            ></CustomSelectField>
                        </CustomTabContent>

                        <!-- </form> -->
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="documentUploadForm"
                        />
                    </StepperContentHeader>
                    <StepperContentBody
                        ><div class="flex w-full flex-col gap-2">
                            <p class="text-sm">
                                Sila muat turun, isi dengan lengkap dokumen
                                berikut, kemudian muat naik dokumen pada ruangan
                                yang disediakan.
                            </p>

                            <ul
                                class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                            >
                                <li>
                                    <button class="underline">
                                        Borang Lantikan Baru</button
                                    >
                                </li>
                            </ul>

                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >Sila muat naik dokumen barkaitan.</span
                            >

                            <!-- <form
                                    id="documentUploadForm"
                                    method="POST"
                                    use:documentFormEnhance
                                    enctype="multipart/form-data"
                                > -->
                            <ContentHeader
                                title="Dokumen Sokongan"
                                borderClass="border-none"
                            >
                                <div>
                                    <FileInputField
                                        id="document"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            </ContentHeader>
                            <div
                                class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                            >
                                <div class="flex flex-wrap gap-3">
                                    <!-- {#each $documentForm.document as item, index} -->
                                    <!-- {#if $documentForm.document instanceof File}
                                                <FileInputFieldChildren
                                                    childrenType="grid"
                                                    handleDelete={() => handleDelete()}
                                                    fileName={$documentForm.document?.name}
                                                />
                                            {/if} -->
                                    <!-- {/each} -->
                                </div>
                                <div
                                    class="flex flex-col items-center justify-center gap-2.5"
                                >
                                    <!-- <p
                                                class=" text-sm text-txt-tertiary"
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            >
                                                Pilih fail dari peranti anda.
                                            </p> -->
                                    <p>Pilih fail dari peranti anda.</p>
                                    <!-- <div
                                                class="text-txt-tertiary"
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            > -->
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
                                <!-- <div
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            >
                                                <FileInputField id="document"
                                                ></FileInputField>
                                            </div> -->
                            </div>
                        </div>
                        <!-- </form> -->

                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <ContentHeader
                                title="Dokumen - Dokumen Sokongan yang Berkaitan"
                            ></ContentHeader>
                            <p
                                class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                            >
                                Fail-fail yang dimuat naik:
                            </p>

                            <!-- {#each currentEmployeeUploadedDocuments as item, i} -->
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <label
                                    for=""
                                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    >1.</label
                                >
                                <!-- <DownloadAttachment
                                            triggerDownload={() =>
                                                handleDownload(
                                                    data.documentInfoResponse.data?.details
                                                        .attachment,
                                                )}
                                            fileName={data.documentInfoResponse.data
                                                ?.details.attachment}
                                        ></DownloadAttachment> -->
                            </div>
                            <!-- {/each} -->
                        </div>

                        <!-- </div> -->
                    </StepperContentBody>
                </StepperContent>
            </Stepper>
        </CustomTabContent>

        <CustomTabContent title="GajiElaun"></CustomTabContent>
        <CustomTabContent title="RekodKesihatan">
            <Stepper>
                <StepperContent>
                    <StepperContentHeader title="Sejarah Penyakit">
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="FormStepperSejarahPenyakit"
                        />
                    </StepperContentHeader>
                    <!------------------------------------------->
                    <!----------- Sejarah Penyakit -------------->
                    <!------------------------------------------->
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            <!-- <form
                            id="FormStepperSejarahPenyakit"
                            class="flex w-full flex-col gap-2"
                            use:sejarahPenyakitEnhance
                            method="POST"
                        > -->
                            <div class="flex w-full flex-col gap-2">
                                <!-- {#each data.medicalHistoryDiseaseNamesResponse.data.list as record, i}
                                    <div class="flex flex-row">
                                        <label
                                            for="diseases"
                                            class="w-full min-w-[220px] text-sm"
                                            >{record}</label
                                        >
                                        <input
                                            hidden
                                            type="text"
                                            value={$sejarahPenyakitForm.medicalHistory[
                                                i
                                            ]?.diseases ?? ' '}
                                        />
                                        <CustomRadioBoolean
                                            disabled
                                            options={commonOptions}
                                            name="record{i}isPesonal"
                                            userSelected={$sejarahPenyakitForm
                                                .medicalHistory[i]?.isPersonal ?? true}
                                        ></CustomRadioBoolean>
                                        <CustomRadioBoolean
                                            disabled
                                            options={commonOptions}
                                            name="record{i}isFamily"
                                            userSelected={$sejarahPenyakitForm
                                                .medicalHistory[i]?.isFamily ?? true}
                                        ></CustomRadioBoolean>
                                        <CustomTextField
                                            disabled
                                            name="alahan"
                                            label=""
                                            type="text"
                                            value={$sejarahPenyakitForm.medicalHistory[
                                                i
                                            ]?.remark ?? ' '}
                                        ></CustomTextField>
                                    </div>
                                {/each} -->
                                <table
                                    class="text-left text-sm {stepperFormTitleClass}"
                                >
                                    <tr>
                                        <th></th>
                                        <th>SENDIRI</th>
                                        <th>KELUARGA</th>
                                        <th>ULASAN</th>
                                    </tr>
                                    <tr>
                                        <td>Penyakit sejak lahir atau baka</td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriPenyakitSejakLahir"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaPenyakitSejakLahir"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="penyakitSejakLahir"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Alahan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAlahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAlahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="alahan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sakit jiwa</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSakitJiwa"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSakitJiwa"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sakitJiwa"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr><tr>
                                        <td
                                            >Epilepsi, sawan, angin ahmar,
                                            penyakit saraf</td
                                        >
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriEpilepsi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaEpilepsi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="epilepsi"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr><tr>
                                        <td>Darah tinggi</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriDarahTinggi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaDarahTinggi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="darahTinggi"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kencing manis</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKencingManis"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKencingManis"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="kencingManis"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jantung atatu salur darah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriJantung"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaJantung"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="jantungAtatuSalurDarah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Asma</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAsma"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAsma"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="asma"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sakit buah pinggang</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSakitBuahPinggang"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSakitBuahPinggang"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sakitBuahPinggang"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Barah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriBarah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaBarah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="barah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Batuk kering</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriBatukKering"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaBatukKering"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="batukKering"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ketagihan dadah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKetagihanDadah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKetagihanDadah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="ketagihanDadah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AIDS, HIV</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAIDS"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAIDS"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="AIDS"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hepatitis B</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriHepatitisB"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaHepatitisB"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="hepatitisB"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sejarah pembedahan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSejarahPembedahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSejarahPembedahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sejarahPembedahan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kecacatan anggota, pancaindera</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKecacatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKecacatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="kecacatan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Merokok</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriMerokok"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaMerokok"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="merokok"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Penyakit serius lain</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriPenyakitSeriusLain"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaPenyakitSeriusLain"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="penyakitSeriusLain"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sedang menerima rawatan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSedangMenerimaRawatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSedangMenerimaRawatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sedangMenerimaRawatan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!-- </form> -->
                        </div></StepperContentBody
                    >
                </StepperContent>

                <!------------------------------------------->
                <!---------- Pemeriksaan Doktor ------------->
                <!------------------------------------------->
                <StepperContent>
                    <StepperContentHeader title="Pemeriksaan Doktor">
                        <!-- <TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}><SvgPaperAirplane /></TextIconButton
            > -->

                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="FormStepperPemeriksaanDoktor"
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <!-- <form
                id="FormStepperPemeriksaanDoktor"
                class="flex w-full flex-col gap-2"
                use:pemeriksaanDoktorEnhance
                method="POST"
            > -->
                        <div
                            class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                        >
                            <p class="text-sm font-bold">Pemeriksaan Am</p>
                            <CustomTextField
                                disabled
                                id="height"
                                label="Tinggi (cm)"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="weight"
                                label="berat (kg)"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="BMI"
                                label="BMI"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="BPM"
                                label="Denyutan Nadi (setiap minit )"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="BP"
                                label="BP (mmHg)"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomRadioBoolean
                                disabled
                                id="paleSkin"
                                label="Kulit pucat"
                                val=""
                            ></CustomRadioBoolean>

                            <!-- <CustomRadioBoolean
                        disabled
                        {options}
                        id="cycnosis"
                        label="Sianosis"
                        bind:userSelected={$pemeriksaanDoktorForm.cycnosis}
                    ></CustomRadioBoolean>
                    {#if $pemeriksaanDoktorErrors.cycnosis}
                        <span
                            class="text-system-danger ml-[220px] font-sans text-sm italic"
                            >{$pemeriksaanDoktorErrors.cycnosis[0]}</span
                        >
                    {/if} -->
                            <CustomRadioBoolean
                                disabled
                                id="edema"
                                label="Edama"
                                val=""
                            ></CustomRadioBoolean>

                            <CustomRadioBoolean
                                disabled
                                id="jaundice"
                                label="Penyakit kuning"
                                val=""
                            ></CustomRadioBoolean>

                            <CustomRadioBoolean
                                disabled
                                id="lymphGlands"
                                label="Kelenjar limfa"
                                val=""
                            ></CustomRadioBoolean>

                            <CustomRadioBoolean
                                disabled
                                id="skinDisease"
                                label="Penyakit kulit"
                                val=""
                            ></CustomRadioBoolean>
                        </div>
                        <div
                            class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p class="text-sm font-bold">Mata</p>
                            <table class="text-left text-sm">
                                <tr>
                                    <td
                                        class="w-[220px] min-w-[220px] max-w-[220px]"
                                        >Penglihatan Tanpa Bantuan</td
                                    >
                                    <td
                                        class="w-[200px] min-w-[160px] max-w-[220px]"
                                    >
                                        <CustomTextField
                                            disabled
                                            id="unaidedVisionLeft"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>

                                    <td>
                                        <CustomTextField
                                            disabled
                                            id="unaidedVisionRight"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                    <!-- <td> -->
                                    <!-- <CustomTextField
                                    disabled
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan3
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan3}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan3[0]}</span
                                    >
                                {/if} -->
                                    <!-- </td> -->
                                </tr>
                                <tr>
                                    <!-- <td>Penglihatan Tanpa Bantuan</td>
                            <td>
                                <CustomTextField
                                    disabled
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan4
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan4"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan4}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan4}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan4[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <CustomTextField
                                    disabled
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan5
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan5"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan5}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan5}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan5[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <CustomTextField
                                    disabled
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan6
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan6"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan6}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan6}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan6[0]}</span
                                    >
                                {/if}
                            </td>
                        </tr>
                        <tr> -->
                                    <td>Penglihatan Dengan Bantuan</td>
                                    <td>
                                        <CustomTextField
                                            disabled
                                            id="aidedVisionLeft"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                    <td>
                                        <CustomTextField
                                            disabled
                                            id="aidedVisionRight"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                    <!-- <td>
                                <CustomTextField
                                    disabled
                                    hasError={$pemeriksaanDoktorErrors.penglihatanDenganBantuan3
                                        ? true
                                        : false}
                                    id="penglihatanDenganBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanDenganBantuan3}
                                ></CustomTextField>

                                {#if $pemeriksaanDoktorErrors.penglihatanDenganBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanDenganBantuan3[0]}</span
                                    >
                                {/if}
                            </td> -->
                                </tr>

                                <tr>
                                    <td>Penglihatan Warna</td>
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="penglihatanWarnaRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="colourVision"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Funduskopi</td>
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="funduskopiRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="fundoscopic"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div
                            class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <table class="text-left text-sm">
                                <tr>
                                    <td
                                        class="w-[220px] min-w-[220px] max-w-[220px]"
                                        ><p class="text-sm font-bold">
                                            Telinga
                                        </p></td
                                    >
                                    <td
                                        class="w-[160px] min-w-[160px] max-w-[160px]"
                                    >
                                        <CustomRadioBoolean
                                            disabled
                                            id="telingaRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="ear"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="text-sm font-bold">
                                            Rongga gigi dan mulut
                                        </p>
                                    </td>
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="ronggaGigiMulutRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="dental"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        ><p class="text-sm font-bold">
                                            Leher
                                        </p></td
                                    >
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="leherRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="neck"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        ><p class="text-sm font-bold">
                                            Kardiovaskular
                                        </p></td
                                    >
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="kardiovaskularRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="cardiovascular"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div
                            class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p class="text-sm font-bold">Sistem pernafasan</p>
                            <table class="text-left text-sm">
                                <tr>
                                    <td
                                        class="w-[220px] min-w-[220px] max-w-[220px]"
                                        >Pemeriksaan</td
                                    >
                                    <td
                                        class="w-[160px] min-w-[160px] max-w-[160px]"
                                    >
                                        <CustomRadioBoolean
                                            disabled
                                            id="pemeriksaanRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="breathingExam"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td>X-ray</td>
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="xrayRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="xray"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                            </table>

                            <CustomTextField
                                disabled
                                id="xrayTaken"
                                label="Tarikh pengambilan x-ray"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="xrayLocation"
                                label="Lokasi pengambilan x-ray"
                                type="text"
                                val=""
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="xrayReference"
                                label="Nombor Rujukan x-ray"
                                type="text"
                                val=""
                            ></CustomTextField>
                        </div>
                        <div
                            class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <table class="text-left text-sm">
                                <tr>
                                    <td
                                        class="w-[220px] min-w-[220px] max-w-[220px]"
                                        ><p class="text-sm font-bold">
                                            Abdomen dan hernia
                                        </p></td
                                    >
                                    <td
                                        class="w-[160px] min-w-[160px] max-w-[160px]"
                                    >
                                        <CustomRadioBoolean
                                            disabled
                                            id="abdomenHerniaRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="abdomenHernia"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        ><p class="text-sm font-bold">
                                            Sistem saraf dan keadaan mental
                                        </p></td
                                    >
                                    <td>
                                        <CustomRadioBoolean
                                            disabled
                                            id="sistemSarafRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="mentalState"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        ><p class="text-sm font-bold">
                                            Sistem muskuloskeletal
                                        </p></td
                                    >
                                    <td
                                        ><CustomRadioBoolean
                                            disabled
                                            id="sistemMuskuloskeletalRadio"
                                            label=""
                                            val=""
                                        ></CustomRadioBoolean>
                                    </td>

                                    <td colspan="2">
                                        <CustomTextField
                                            disabled
                                            id="musculoskeletal"
                                            label=""
                                            type="text"
                                            val=""
                                        ></CustomTextField>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div
                            class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p class="text-sm font-bold">Kencing</p>
                            <CustomRadioBoolean
                                disabled
                                id="sugar"
                                label="Gula"
                                val=""
                            ></CustomRadioBoolean>

                            <CustomRadioBoolean
                                disabled
                                id="albumin"
                                label="Albumin"
                                val=""
                            ></CustomRadioBoolean>

                            <CustomTextField
                                disabled
                                id="microscopic"
                                label="Mikroskopi"
                                type="text"
                                val=""
                            ></CustomTextField>
                        </div>
                        <!-- </form> -->
                        <div class="flex w-full flex-col gap-2.5">
                            <div class="flex w-full flex-col gap-2">
                                <p class={stepperFormTitleClass}>
                                    Fail-fail yang dimuat naik:
                                </p>
                                <!-- {#each currentEmployeeUploadedDocuments as item, i} -->
                                <div
                                    class="flex w-full flex-row items-center justify-between"
                                >
                                    <!-- <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            > -->
                                    <!-- <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment> -->
                                </div>
                                <!-- {/each} -->
                            </div>
                        </div></StepperContentBody
                    >
                </StepperContent>
            </Stepper>
        </CustomTabContent>
    </CustomTab>
</section>

<!-- Academic Info Modal -->
<Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <!-- <form
        id="addAcademicModalForm"
        method="POST"
        use:addAcademicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    > -->
    <CustomSelectField
        id="majorId"
        label={'Jenis Jurusan'}
        val=""
        options={data.selectionOptions.majorMinorLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="minorId"
        label={'Jenis Bidang'}
        val=""
        options={data.selectionOptions.majorMinorLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="countryId"
        label={'Negara'}
        val=""
        options={data.selectionOptions.countryLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="institutionId"
        label={'Institusi'}
        val=""
        options={data.selectionOptions.institutionLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="educationLevelId"
        label={'Taraf Pembelajaran'}
        val=""
        options={data.selectionOptions.educationLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="sponsorshipId"
        label={'Penajaan'}
        val=""
        options={data.selectionOptions.sponsorshipLookup}
    ></CustomSelectField>

    <CustomTextField id="id" label={'Nama Pencapaian/Sijil'} val=""
    ></CustomTextField>
    <CustomTextField
        id="completionDate"
        label="Tarikh Kelulusan"
        type="date"
        val=""
    ></CustomTextField>
    <CustomTextField id="finalGrade" label={'Pencapaian Akhir (Gred)'} val=""
    ></CustomTextField>
    <CustomTextField id="field" label={'Catatan'} val=""></CustomTextField>
    <TextIconButton
        type="primary"
        label={'Tambah'}
        form="addAcademicModalForm"
    />
    <!-- </form> -->
</Modal>

<!-- Experience Info Modal -->
<Modal title={'Tambah Maklumat Pengalaman'} bind:open={openExperienceInfoModal}>
    <!-- <form
        id="addExperienceInfoModal"
        method="POST"
        use:addExperienceModalEnhance
        class="flex w-full flex-col gap-2"
    > -->
    <CustomTextField id="company" label={'Nama Majikan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="address" label={'Alamat Majikan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="position" label={'Jawatan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="positionCode" label={'Kod Jawatan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField
        type="date"
        id="startDate"
        label={'Tarikh Mula Bekerja'}
        val=""
    ></CustomTextField>
    <CustomTextField
        type="date"
        id="endDate"
        label={'Tarikh Tamat Bekerja'}
        val=""
    ></CustomTextField>

    <CustomTextField id="salary" label={'Gaji'} type="text" val=""
    ></CustomTextField>
    <TextIconButton
        type="primary"
        label={'Tambah'}
        form="addExperienceInfoModal"
    />
    <!-- </form> -->
</Modal>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <!-- <form
        id="addMembershipInfoModal"
        class="flex w-full flex-col gap-2"
        use:addActivityModalEnhance
        method="POST"
    > -->
    <CustomTextField id="name" label={'Nama Kegiatan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="joinDate" type="date" label={'Tarikh Keahlian'} val=""
    ></CustomTextField>

    <CustomTextField id="position" label={'Jawatan'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="description" label={'Catatan'} type="text" val=""
    ></CustomTextField>

    <TextIconButton
        type="primary"
        label={'Tambah'}
        form="addMembershipInfoModal"
    />
    <!-- </form> -->
</Modal>
<!-- Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openFamilyInfoModal}
>
    <!-- <form
        id="addFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addFamilyEnhance
        method="POST"
    > -->
    <CustomTextField id="name" label={'Nama'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="alternativeName" label={'Nama Lain'} type="text" val=""
    ></CustomTextField>
    <CustomSelectField
        id="identityDocumentColor"
        label={'Warna Kad Pengenalan'}
        options={data.selectionOptions.identityCardColorLookup}
        val=""
    ></CustomSelectField>
    <CustomTextField
        id="identityDocumentNumber"
        type="text"
        label={'Nombor Kad Pengenalan'}
        val=""
    ></CustomTextField>

    <CustomTextField id="address" label={'Alamat'} val=""></CustomTextField>

    <CustomTextField id="postcode" label={'Poskod'} type="text" val=""
    ></CustomTextField>

    <CustomTextField type="date" id="birthDate" label={'Tarikh Lahir'} val=""
    ></CustomTextField>

    <CustomSelectField
        id="birthCountryId"
        label={'Negara Kelahiran'}
        val=""
        options={data.selectionOptions.countryLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="birthStateId"
        label={'Negeri Kelahiran'}
        val=""
        options={data.selectionOptions.stateLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="relationshipId"
        label={'Hubungan'}
        val=""
        options={data.selectionOptions.relationshipLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="educationLevelId"
        label={'Taraf Pendidikan'}
        val=""
        options={data.selectionOptions.educationLookup}
    ></CustomSelectField>

    <CustomSelectField id="raceId" label={'Bangsa'} val=""></CustomSelectField> options={data
        .selectionOptions.raceLookup}

    <CustomSelectField
        id="nationalityId"
        label={'Kewarganegaraan'}
        val=""
        options={data.selectionOptions.nationalityLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="genderId"
        label={'Jantina'}
        val=""
        options={data.selectionOptions.genderLookup}
    ></CustomSelectField>

    <CustomTextField
        id="workAddress"
        label={'Alamat Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField
        id="workPostcode"
        label={'Poskod Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField id="phoneNumber" label={'Nombor Mobil'} type="text" val=""
    ></CustomTextField>

    <CustomSelectField
        id="maritalId"
        label={'Status Perkhahwinan'}
        val=""
        options={data.selectionOptions.maritalLookup}
    ></CustomSelectField>

    <CustomTextField
        type="date"
        id="marriageDate"
        label={'Tarikh Kahwin'}
        val=""
    ></CustomTextField>

    <div class="flex flex-row">
        <label for="addInSchool" class="w-[70px] text-sm text-black"
            >Bersekolah</label
        >
        <Checkbox id="inSchool" />
    </div>
    <br />

    <TextIconButton type="primary" label={'Tambah'} form="addFamilyInfoModal" />
    <!-- </form> -->
</Modal>

<!-- Non Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openNonFamilyInfoModal}
>
    <!-- <form
        id="addNonFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addNonFamilyEnhance
        method="POST"
    > -->
    <CustomTextField id="name" label={'Nama'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="alternativeName" label={'Nama Lain'} type="text" val=""
    ></CustomTextField>
    <CustomSelectField
        id="identityDocumentColor"
        label={'Warna Kad Pengenalan'}
        options={data.selectionOptions.identityCardColorLookup}
        val=""
    ></CustomSelectField>
    <CustomTextField
        id="identityDocumentNumber"
        type="number"
        label={'Nombor Kad Pengenalan'}
        val=""
    ></CustomTextField>

    <CustomTextField id="address" label={'Alamat'} val=""></CustomTextField>

    <CustomTextField id="postcode" label={'Poskod'} type="text" val=""
    ></CustomTextField>

    <CustomTextField type="date" id="birthDate" label={'Tarikh Lahir'} val=""
    ></CustomTextField>

    <CustomSelectField
        id="birthCountryId"
        label={'Negara Kelahiran'}
        val=""
        options={data.selectionOptions.countryLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="birthStateId"
        label={'Negeri Kelahiran'}
        val=""
        options={data.selectionOptions.stateLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="relationshipId"
        label={'Hubungan'}
        val=""
        options={data.selectionOptions.relationshipLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="educationLevelId"
        label={'Taraf Pendidikan'}
        val=""
        options={data.selectionOptions.educationLookup}
    ></CustomSelectField>

    <CustomSelectField id="raceId" label={'Bangsa'} val=""></CustomSelectField> options={data
        .selectionOptions.raceLookup}

    <CustomSelectField
        id="nationalityId"
        label={'Kewarganegaraan'}
        val=""
        options={data.selectionOptions.nationalityLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="genderId"
        label={'Jantina'}
        val=""
        options={data.selectionOptions.genderLookup}
    ></CustomSelectField>

    <CustomTextField
        id="workAddress"
        label={'Alamat Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField
        id="workPostcode"
        label={'Poskod Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField id="phoneNumber" label={'Nombor Mobil'} type="text" val=""
    ></CustomTextField>

    <CustomSelectField
        id="maritalId"
        label={'Status Perkhahwinan'}
        val=""
        options={data.selectionOptions.maritalLookup}
    ></CustomSelectField>

    <CustomTextField
        type="date"
        id="marriageDate"
        label={'Tarikh Kahwin'}
        val=""
    ></CustomTextField>

    <div class="flex flex-row">
        <label for="addInSchool" class="w-[70px] text-sm text-black"
            >Bersekolah</label
        >
        <Checkbox id="inSchool" checked />
    </div>
    <br />

    <TextIconButton
        type="primary"
        label={'Tambah'}
        form="addNonFamilyInfoModal"
    />
    <!-- </form> -->
</Modal>

<!-- Next Of Kin Info Modal -->
<Modal title={'Tambah Maklumat Waris'} bind:open={openNextOfKinInfoModal}>
    <!-- <form
        id="addNextOfKinInfoModal"
        use:addNextOfKinEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    > -->
    <CustomTextField id="name" label={'Nama'} type="text" val=""
    ></CustomTextField>

    <CustomTextField id="alternativeName" label={'Nama Lain'} type="text" val=""
    ></CustomTextField>
    <CustomSelectField
        id="identityDocumentColor"
        label={'Warna Kad Pengenalan'}
        options={data.selectionOptions.identityCardColorLookup}
        val=""
    ></CustomSelectField>
    <CustomTextField
        id="identityDocumentNumber"
        type="number"
        label={'Nombor Kad Pengenalan'}
        val=""
    ></CustomTextField>

    <CustomTextField id="address" label={'Alamat'} val=""></CustomTextField>

    <CustomTextField id="postcode" label={'Poskod'} type="text" val=""
    ></CustomTextField>

    <CustomTextField type="date" id="birthDate" label={'Tarikh Lahir'} val=""
    ></CustomTextField>

    <CustomSelectField
        id="birthCountryId"
        label={'Negara Kelahiran'}
        val=""
        options={data.selectionOptions.countryLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="birthStateId"
        label={'Negeri Kelahiran'}
        val=""
        options={data.selectionOptions.stateLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="relationshipId"
        label={'Hubungan'}
        val=""
        options={data.selectionOptions.relationshipLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="educationLevelId"
        label={'Taraf Pendidikan'}
        val=""
        options={data.selectionOptions.educationLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="raceId"
        label={'Bangsa'}
        val=""
        options={data.selectionOptions.raceLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="nationalityId"
        label={'Kewarganegaraan'}
        val=""
        options={data.selectionOptions.nationalityLookup}
    ></CustomSelectField>

    <CustomSelectField
        id="genderId"
        label={'Jantina'}
        val=""
        options={data.selectionOptions.genderLookup}
    ></CustomSelectField>

    <CustomTextField
        id="workAddress"
        label={'Alamat Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField
        id="workPostcode"
        label={'Poskod Majikan'}
        type="text"
        val=""
    ></CustomTextField>

    <CustomTextField id="phoneNumber" label={'Nombor Mobil'} type="text" val=""
    ></CustomTextField>

    <CustomSelectField
        id="maritalId"
        label={'Status Perkhahwinan'}
        val=""
        options={data.selectionOptions.maritalLookup}
    ></CustomSelectField>

    <CustomTextField
        type="date"
        id="marriageDate"
        label={'Tarikh Kahwin'}
        val=""
    ></CustomTextField>

    <div class="flex flex-row">
        <label for="addInSchool" class="w-[70px] text-sm text-black"
            >Bersekolah</label
        >
        <Checkbox id="inSchool" checked />
    </div>

    <TextIconButton
        type="primary"
        label={'Tambah'}
        form="addNextOfKinInfoModal"
    />
    <!-- </form> -->
</Modal>
