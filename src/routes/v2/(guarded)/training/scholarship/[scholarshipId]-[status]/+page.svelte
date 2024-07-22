<script lang="ts">
    import StepperFileNotUploaded from '$lib/components/stepper/StepperFileNotUploaded.svelte';
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import {
        integrityOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { Checkbox } from 'flowbite-svelte';
    import {
        certifyOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { writable } from 'svelte/store';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import {
        _addCourseSecretaryApprovalForm,
        _addIntegritySecretaryApprovalForm,
        _addStateUnitSecretaryApprovalForm,
        _createFundApplicationForm,
        _getAverage,
        _submitDocumentForm,
        _submitSecretarySetApproverForm,
    } from './+layout';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import {
        _fundApplicationApprovalSchema,
        _fundApplicationDetailResponseSchema,
        _fundApplicationUploadDocSchema,
        _setApproversSchema,
    } from '$lib/schemas/mypsm/course/fund-application-schema';
    import type { LayoutData } from './$types';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    export let data: LayoutData;

    let tableLNPT: TableDTO = data.tableLNPT;
    let isReadonlyStateUnitDirectorApprovalResult = writable<boolean>(false);
    let isReadonlyIntegritySecretaryApprovalResult = writable<boolean>(false);
    let isReadonlyCourseSecretaryApprovalResult = writable<boolean>(false);
    let fundApplicationIsFail = writable<boolean>(false);
    let fundApplicationIsDraft = writable<boolean>(false);
    let fundApplicationDocumentIsDraft = writable<boolean>(false);
    let fundApplicationSecretarySetApproversIsDraft = writable<boolean>(false);
    let stateUnitDirectorApprovalResultIsDraft = writable<boolean>(false);
    let integritySecretaryApprovalResultIsDraft = writable<boolean>(false);
    let courseSecretaryApprovalResultIsDraft = writable<boolean>(false);
    let fundApplicationFileUploadPass = writable<boolean>(false);

    $: {
        data.responses.fundApplicationDetailResponse.data?.details.isDraft ===
        true
            ? fundApplicationIsDraft.set(true)
            : fundApplicationIsDraft.set(false);

        data.responses.fundApplicationDocumentInfoResponse.status === 'success'
            ? fundApplicationFileUploadPass.set(true)
            : fundApplicationFileUploadPass.set(false);

        data.responses.fundApplicationDocumentInfoResponse.data?.details
            .isDraft === true
            ? fundApplicationDocumentIsDraft.set(true)
            : fundApplicationDocumentIsDraft.set(false);

        data.responses.fundApplicationCourseSecretarySetApproverResponse.data
            ?.details.isDraft === true
            ? fundApplicationSecretarySetApproversIsDraft.set(true)
            : fundApplicationSecretarySetApproversIsDraft.set(false);

        data.responses.fundApplicationCourseSecretaryApprovalResponse.data
            ?.details.status === false ||
        data.responses.fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details.status === false ||
        data.responses.fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details.status === false
            ? fundApplicationIsFail.set(true)
            : fundApplicationIsFail.set(false);

        data.responses.fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details.isDraft === true
            ? stateUnitDirectorApprovalResultIsDraft.set(true)
            : stateUnitDirectorApprovalResultIsDraft.set(false);

        data.responses.fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyStateUnitDirectorApprovalResult.set(true)
            : isReadonlyStateUnitDirectorApprovalResult.set(false);

        data.responses.fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details.isDraft === true
            ? integritySecretaryApprovalResultIsDraft.set(true)
            : integritySecretaryApprovalResultIsDraft.set(false);

        data.responses.fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyIntegritySecretaryApprovalResult.set(true)
            : isReadonlyIntegritySecretaryApprovalResult.set(false);

        data.responses.fundApplicationCourseSecretaryApprovalResponse.data
            ?.details.isDraft === true
            ? courseSecretaryApprovalResultIsDraft.set(true)
            : courseSecretaryApprovalResultIsDraft.set(false);

        data.responses.fundApplicationCourseSecretaryApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyCourseSecretaryApprovalResult.set(true)
            : isReadonlyCourseSecretaryApprovalResult.set(false);
    }

    // Superforms
    const { form, errors, enhance } = superForm(
        data.forms.fundApplicationInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_fundApplicationDetailResponseSchema),
            onChange() {
                const educationTypeIdLastIndex =
                    $form.educationTypeId.length - 1;

                if ($form.educationTypeId[educationTypeIdLastIndex] === 3) {
                    $form.educationTypeId = $form.educationTypeId.filter(
                        (id) => id !== 4,
                    );
                } else if (
                    $form.educationTypeId[educationTypeIdLastIndex] === 4
                ) {
                    $form.educationTypeId = $form.educationTypeId.filter(
                        (id) => id !== 3,
                    );
                }

                const applicationTypeIdLastIndex =
                    $form.applicationTypeId.length - 1;

                if ($form.applicationTypeId[applicationTypeIdLastIndex] === 7) {
                    $form.applicationTypeId = $form.applicationTypeId.filter(
                        (id) => id !== 8,
                    );
                } else if (
                    $form.applicationTypeId[applicationTypeIdLastIndex] === 8
                ) {
                    $form.applicationTypeId = $form.applicationTypeId.filter(
                        (id) => id !== 7,
                    );
                }
            },
            async onSubmit() {
                $form.id = (
                    data.responses.fundApplicationDetailResponse.data
                        ?.details as CourseFundApplicationDetailResponseDTO
                ).id;
                await _createFundApplicationForm($form);
            },
        },
    );

    const {
        form: secretarySetApproverForm,
        errors: secretarySetApproverErrors,
        enhance: secretarySetApproverEnhance,
    } = superForm(data.forms.secretarySetApproverForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_setApproversSchema),
        onSubmit() {
            _submitSecretarySetApproverForm(
                Number(data.params.scholarshipId),
                $secretarySetApproverForm,
            );
        },
    });

    $secretarySetApproverForm.supporterId === 332;

    const { form: personalInfoForm, enhance: personalInfoEnhance } = superForm(
        data.forms.fundApplicationPersonalInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const { form: serviceInfoForm, enhance: serviceInfoEnhance } = superForm(
        data.forms.fundApplicationServiceInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const { form: documentsForm } = superForm(
        data.forms.fundApplicationDocumentForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const {
        form: courseSecretaryApprovalInfoForm,
        errors: courseSecretaryApprovalInfoErrors,
        enhance: courseSecretaryApprovalInfoEnhance,
        isTainted: courseSecretaryApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationCourseSecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!courseSecretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $courseSecretaryApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addCourseSecretaryApprovalForm($courseSecretaryApprovalInfoForm);
        },
    });

    const {
        form: integritySecretaryApprovalInfoForm,
        errors: integritySecretaryApprovalInfoErrors,
        enhance: integritySecretaryApprovalInfoEnhance,
        isTainted: integritySecretaryApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationIntegritySecretaryApprovalForm, {
        id: 'fundApplicationIntegritySecretaryApprovalCourseSubmodule',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!integritySecretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $integritySecretaryApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addIntegritySecretaryApprovalForm(
                $integritySecretaryApprovalInfoForm,
            );
        },
    });

    const {
        form: stateUnitDirectorApprovalInfoForm,
        errors: stateUnitDirectorApprovalInfoErrors,
        enhance: stateUnitDirectorApprovalInfoEnhance,
        isTainted: stateUnitDirectorApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationStateUnitDirectorApprovalForm, {
        id: 'fundApplicationStateUnitDirectorApprovalCourseSubmodule',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!stateUnitDirectorApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $stateUnitDirectorApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addStateUnitSecretaryApprovalForm(
                $stateUnitDirectorApprovalInfoForm,
            );
        },
    });

    const {
        form: fundApplicationUploadDocumentForm,
        errors: fundApplicationUploadDocumentError,
        enhance: fundApplicationUploadDocumentEnhance,
    } = superForm(data.forms.fundApplicationUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        invalidateAll: true,
        id: 'documentUploadForm',
        validators: zod(_fundApplicationUploadDocSchema),
        onSubmit() {
            _submitDocumentForm(
                (
                    data.responses.fundApplicationDetailResponse.data
                        ?.details as CourseFundApplicationDetailResponseDTO
                ).id,
                $fundApplicationUploadDocumentForm.isDraft,
                $fundApplicationUploadDocumentForm.documents,
                $documentsForm,
            );
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        additionalFiles.forEach((file) => {
            $fundApplicationUploadDocumentForm.documents = [
                ...$fundApplicationUploadDocumentForm.documents,
                file,
            ];
        });
    };

    const handleDelete = (i: number) => {
        $fundApplicationUploadDocumentForm.documents =
            $fundApplicationUploadDocumentForm.documents.filter((_, index) => {
                return index !== i;
            });
    };
    const handleDeleteUploadedFile = (i: number) => {
        $documentsForm.document = $documentsForm.document.filter((_, index) => {
            return index !== i;
        });
    };

    tableLNPT.param.filter.years = new Date().getFullYear();
    tableLNPT.param.filter.duration = 3;
    async function _generateAverage() {
        const currentEmployeeId: number = Number(data.forms.fundApplicationPersonalInfoForm.data.employeeId);

        let employeeIds: number[] = [currentEmployeeId];

        tableLNPT.param.filter.employeeIds = employeeIds;

        _getAverage(tableLNPT.param).then((value) => {
            tableLNPT.data =
                value.props.lnptAverageResponse.data?.dataList ?? [];
            tableLNPT.meta = value.props.lnptAverageResponse.data?.meta ?? {
                pageSize: 5,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            tableLNPT.param.pageSize = tableLNPT.meta.pageSize ?? 5;
            tableLNPT.param.pageNum = tableLNPT.meta.pageNum ?? 1;
        });
    }

    onMount(() => {
        _generateAverage();
    })
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran">
    <StatusPill status={data.params.status} slot="status" />

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../scholarship');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi" />
        <StepperContentBody>
            <!-- Maklumat Peribadi -->
            <form
                id="personalInfoStepper"
                method="POST"
                use:personalInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="employeeNo"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.employeeNo}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.identityDocumentNumber}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="identityCardColor"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.selectionOptions.identityCardColorLookup}
                    bind:val={$personalInfoForm.identityCardColor}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="date"
                    id="dateOfBirth"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.dateOfBirth}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="placeOfBirth"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.placeOfBirth}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$personalInfoForm.nationality}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$personalInfoForm.race}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$personalInfoForm.religion}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$personalInfoForm.gender}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="status"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$personalInfoForm.status}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="skim"
                    label="Skim Perkhidmatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.skim}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="grade"
                    label="Gred"
                    placeholder="-"
                    bind:val={$personalInfoForm.grade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="position"
                    label="Jawatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.position}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentPlacement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.currentPlacement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="group"
                    label="Kumpulan"
                    placeholder="-"
                    bind:val={$personalInfoForm.group}
                    options={data.selectionOptions.groupLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$personalInfoForm.mailAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="homeNo"
                    label="Nombor Telefon Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeNo}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="mobileNo"
                    label="Nombor Telefon Bimbit"
                    placeholder="-"
                    bind:val={$personalInfoForm.mobileNo}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="housing"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.housing}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.houseLoan}
                />

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$personalInfoForm.isExPolice}
                    options={data.selectionOptions.generalLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan" />
        <StepperContentBody>
            <form
                id="serviceInfoStepper"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentGrade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentPosition}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.placement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.serviceType}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.interimDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementDate}
                ></CustomTextField>

                <ContentHeader title="Maklumat Gaji dan Elaun - Elaun" />
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="salaryEffectiveDate"
                            type="date"
                            label={'Tarikh Berkuatkuasa'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="COLA"
                            label={'COLA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.COLA}
                        ></CustomTextField>
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat LNPT" />
        <StepperContentBody>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    tableId="lnptAverage"
                    title="Purata LNPT Dari Tahun {tableLNPT.param.filter
                        .years} Sepanjang Tempoh {tableLNPT.param.filter
                        .duration} Tahun"
                    bind:tableData={tableLNPT}
                    onUpdate={_generateAverage}
                ></CustomTable>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pembelajaran Diikuti">
            {#if $fundApplicationIsDraft && data.role.isStaffRole}
                <TextIconButton
                    type="neutral"
                    label="Simpan"
                    form="examApplicationInfoStepper"
                    onClick={() => {
                        $form.isDraft = true;
                    }}
                />
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="examApplicationInfoStepper"
                    onClick={() => {
                        $form.isDraft = false;
                    }}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if $fundApplicationIsDraft && !data.role.isStaffRole}
                <StepperOtherRolesResult />
            {:else}
                <form
                    id="examApplicationInfoStepper"
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomSelectField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.academicLevel}
                        id="academicLevel"
                        label="Peringkat Kursus Pengajian"
                        placeholder="-"
                        bind:val={$form.academicLevel}
                        options={data.lookups.educationLookup}
                    ></CustomSelectField>
                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.courseName}
                        id="courseName"
                        label="Nama Kursus Pengajian"
                        type="text"
                        placeholder="-"
                        bind:val={$form.courseName}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.institution}
                        id="institution"
                        label="Nama IPTA"
                        type="text"
                        placeholder="-"
                        bind:val={$form.institution}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.learningInstitution}
                        id="learningInstitution"
                        label="Institusi/Pusat Pembelajaran"
                        type="text"
                        placeholder="-"
                        bind:val={$form.learningInstitution}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.studyDuration}
                        id="studyDuration"
                        label="Tempoh Pengajian (Tahun)"
                        type="text"
                        placeholder="-"
                        bind:val={$form.studyDuration}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.entryDateToInstituition}
                        id="entryDateToInstituition"
                        label="Tarikh Kemasukan Ke IPTA"
                        type="date"
                        placeholder="-"
                        bind:val={$form.entryDateToInstituition}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$fundApplicationIsDraft}
                        errors={$errors.expectedFinishedStudyDate}
                        id="expectedFinishedStudyDate"
                        label="Dijangka Tamat Pada"
                        type="date"
                        placeholder="-"
                        bind:val={$form.expectedFinishedStudyDate}
                    ></CustomTextField>

                    <div
                        class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                    >
                        <label
                            for="role"
                            class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >Jenis Pengajian
                            <span class="text-base text-system-danger">*</span>
                        </label>
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.educationTypeId.includes(1)}
                            bind:group={$form.educationTypeId}
                            bind:value={data.lookups.educationTypeLookup[0]
                                .value}
                            >{data.lookups.educationTypeLookup[0]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.educationTypeId.includes(2)}
                            bind:group={$form.educationTypeId}
                            bind:value={data.lookups.educationTypeLookup[1]
                                .value}
                            >{data.lookups.educationTypeLookup[1]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.educationTypeId.includes(3)}
                            bind:group={$form.educationTypeId}
                            bind:value={data.lookups.educationTypeLookup[2]
                                .value}
                            >{data.lookups.educationTypeLookup[2]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.educationTypeId.includes(4)}
                            bind:group={$form.educationTypeId}
                            bind:value={data.lookups.educationTypeLookup[3]
                                .value}
                            >{data.lookups.educationTypeLookup[3]
                                .name}</Checkbox
                        >
                    </div>

                    <div
                        class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                    >
                        <label
                            for="role"
                            class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >Jenis Permohonan
                            <span class="text-base text-system-danger">*</span>
                        </label>
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.applicationTypeId.includes(1)}
                            bind:group={$form.applicationTypeId}
                            bind:value={data.lookups
                                .fundApplicationTypeLookup[0].value}
                            >{data.lookups.fundApplicationTypeLookup[0]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.applicationTypeId.includes(2)}
                            bind:group={$form.applicationTypeId}
                            bind:value={data.lookups
                                .fundApplicationTypeLookup[1].value}
                            >{data.lookups.fundApplicationTypeLookup[1]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.applicationTypeId.includes(3)}
                            bind:group={$form.applicationTypeId}
                            bind:value={data.lookups
                                .fundApplicationTypeLookup[2].value}
                            >{data.lookups.fundApplicationTypeLookup[2]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.applicationTypeId.includes(4)}
                            bind:group={$form.applicationTypeId}
                            bind:value={data.lookups
                                .fundApplicationTypeLookup[3].value}
                            >{data.lookups.fundApplicationTypeLookup[3]
                                .name}</Checkbox
                        >
                        <Checkbox
                            class={$fundApplicationIsDraft
                                ? 'text-ios-labelColors-secondaryLabel-light'
                                : ''}
                            disabled={!$fundApplicationIsDraft}
                            checked={$form.applicationTypeId.includes(5)}
                            bind:group={$form.applicationTypeId}
                            bind:value={data.lookups
                                .fundApplicationTypeLookup[4].value}
                            >{data.lookups.fundApplicationTypeLookup[4]
                                .name}</Checkbox
                        >
                    </div>
                </form>
            {/if}
        </StepperContentBody>
    </StepperContent>
    {#if !$fundApplicationIsDraft}
        <StepperContent>
            <StepperContentHeader
                title="Dokumen - Dokumen Sokongan yang Berkaitan"
            >
                {#if $fundApplicationDocumentIsDraft && data.role.isStaffRole}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="documentUploadForm"
                        onClick={() => {
                            $fundApplicationUploadDocumentForm.isDraft = true;
                        }}
                    />
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="documentUploadForm"
                        onClick={() => {
                            $fundApplicationUploadDocumentForm.isDraft = false;
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if (!$fundApplicationFileUploadPass || $fundApplicationDocumentIsDraft) && !data.role.isStaffRole}
                    <StepperFileNotUploaded />
                {:else if (!$fundApplicationFileUploadPass || $fundApplicationDocumentIsDraft) && data.role.isStaffRole}
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm">
                            Sila muat turun, isi dengan lengkap dokumen berikut,
                            kemudian muat naik dokumen pada ruangan yang
                            disediakan.
                        </p>

                        <ol class="list-inside list-decimal space-y-1 text-sm">
                            <li>Surat tawaran</li>
                            <li>Kebenaran melanjutkan pelajaran</li>
                            <li>Lain-lain dokumen yang berkaitan</li>
                        </ol>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            method="POST"
                            id="documentUploadForm"
                            enctype="multipart/form-data"
                            use:fundApplicationUploadDocumentEnhance
                        >
                            {#if $fundApplicationUploadDocumentError.documents && $documentsForm.document.length < 1}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >Sila muat naik dokumen barkaitan dan
                                    pastikan tidak melebihi 10MB.</span
                                >
                            {/if}
                            <ContentHeader
                                title="Sila pastikan dokumen berkenaan dimuat naik"
                                borderClass="border-none"
                            >
                                <div
                                    hidden={$fundApplicationUploadDocumentForm
                                        .documents.length < 1 &&
                                        $documentsForm.document.length < 1}
                                >
                                    <FileInputField
                                        id="documents"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            </ContentHeader>
                            <div
                                class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                            >
                                <div class="flex flex-wrap gap-3">
                                    {#each $fundApplicationUploadDocumentForm.documents as _, i}
                                        <FileInputFieldChildren
                                            childrenType="grid"
                                            handleDelete={() => handleDelete(i)}
                                            document={$fundApplicationUploadDocumentForm
                                                .documents[i]}
                                        />
                                    {/each}

                                    {#each $documentsForm.document as doc, i}
                                        <div class="flex flex-row">
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <div
                                                class="0 flex h-fit w-fit flex-col items-center justify-center gap-2.5 rounded-md bg-bgr-secondary p-2.5 text-sm hover:bg-bgr-tertiary"
                                            >
                                                <svg
                                                    fill="#ffffff"
                                                    class="mr-2 h-16 w-16 text-system-primary"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    ><g
                                                        id="SVGRepo_bgCarrier"
                                                        stroke-width="0"
                                                    ></g><g
                                                        id="SVGRepo_tracerCarrier"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></g><g
                                                        id="SVGRepo_iconCarrier"
                                                    >
                                                        <path
                                                            d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                        ></path>
                                                        <path
                                                            d="M20 8H15V3"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M11.5 13H11V17H11.5C12.6046 17 13.5 16.1046 13.5 15C13.5 13.8954 12.6046 13 11.5 13Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M15.5 17V13L17.5 13"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M16 15H17"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M7 17L7 15.5M7 15.5L7 13L7.75 13C8.44036 13 9 13.5596 9 14.25V14.25C9 14.9404 8.44036 15.5 7.75 15.5H7Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                    </g></svg
                                                >
                                                {#if doc.name.length < 15}
                                                    {doc.name}
                                                {:else}
                                                    {doc.name.substring(0, 15) +
                                                        '...'}
                                                {/if}
                                            </div>
                                            <div
                                                class=" flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-bgr-primary"
                                            >
                                                <button
                                                    type="button"
                                                    on:click={() =>
                                                        handleDeleteUploadedFile(
                                                            i,
                                                        )}
                                                    class="text-system-danger"
                                                    ><SvgMinusCircle size="22"
                                                    ></SvgMinusCircle></button
                                                >
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                                {#if $fundApplicationUploadDocumentForm.documents.length < 1 && $documentsForm.document.length < 1}
                                    <div
                                        class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                                    >
                                        <span
                                            >Pilih fail dari peranti anda.</span
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
                                        <FileInputField
                                            id="documents"
                                            handleOnInput={(e) =>
                                                handleOnInput(e)}
                                        ></FileInputField>
                                    </div>
                                {/if}
                            </div>
                        </form>
                    </div>
                {:else}
                    <div class="flex w-full flex-col gap-2">
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p
                                class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                            >
                                Fail-fail yang dimuat naik:
                            </p>
                            {#each $documentsForm.document as _, i}
                                <div
                                    class="flex w-full flex-row items-center justify-between"
                                >
                                    <label
                                        for=""
                                        class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                        >{i + 1}.</label
                                    >
                                    <a
                                        href={$documentsForm.document[i]
                                            .document}
                                        download={$documentsForm.document[i]
                                            .name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{$documentsForm.document[i].name}</a
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {#if $fundApplicationFileUploadPass && !$fundApplicationDocumentIsDraft}
            <StepperContent>
                <StepperContentHeader
                    title="Tetapan Penyokong (Pengarah Bahagian/Negeri)"
                >
                    {#if $fundApplicationSecretarySetApproversIsDraft && data.role.isCourseSecretaryRole}
                        <TextIconButton
                            type="neutral"
                            label="Simpan"
                            form="fundApplicationAssignApproverForm"
                            onClick={() => {
                                $secretarySetApproverForm.isDraft = true;
                            }}
                        />
                        <TextIconButton
                            type="primary"
                            label="Hantar"
                            form="fundApplicationAssignApproverForm"
                            onClick={() => {
                                $secretarySetApproverForm.isDraft = false;
                            }}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if $fundApplicationSecretarySetApproversIsDraft && !data.role.isCourseSecretaryRole}
                        <StepperOtherRolesResult />
                    {:else}
                        <form
                            id="fundApplicationAssignApproverForm"
                            method="POST"
                            use:secretarySetApproverEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <CustomSelectField
                                disabled={!$fundApplicationSecretarySetApproversIsDraft}
                                errors={$secretarySetApproverErrors.supporterId}
                                id="supporterId"
                                label="Nama Pengarah Bahagian/Negeri (Penyokong)"
                                options={data.selectionOptions.employeeLookup}
                                bind:val={$secretarySetApproverForm.supporterId}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            {#if !$fundApplicationSecretarySetApproversIsDraft}
                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan daripada Peranan - Peranan Lain"
                    >
                        {#if !$fundApplicationIsFail && (!$isReadonlyStateUnitDirectorApprovalResult || $stateUnitDirectorApprovalResultIsDraft) && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
                            <TextIconButton
                                type="neutral"
                                label="Simpan"
                                form="stateUnitDirectorApprovalForm"
                                onClick={() => {
                                    $stateUnitDirectorApprovalInfoForm.isDraft = true;
                                }}
                            />
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                form="stateUnitDirectorApprovalForm"
                                onClick={() => {
                                    $stateUnitDirectorApprovalInfoForm.isDraft = false;
                                }}
                            />
                        {:else if !$fundApplicationIsFail && (($isReadonlyStateUnitDirectorApprovalResult && !$isReadonlyIntegritySecretaryApprovalResult) || $integritySecretaryApprovalResultIsDraft) && data.role.isIntegritySecretaryRole && !$stateUnitDirectorApprovalResultIsDraft}
                            <TextIconButton
                                type="neutral"
                                label="Simpan"
                                form="integritySecretaryApprovalForm"
                                onClick={() => {
                                    $integritySecretaryApprovalInfoForm.isDraft = true;
                                }}
                            />
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                form="integritySecretaryApprovalForm"
                                onClick={() => {
                                    $integritySecretaryApprovalInfoForm.isDraft = false;
                                }}
                            />
                        {:else if !$fundApplicationIsFail && (($isReadonlyStateUnitDirectorApprovalResult && $isReadonlyIntegritySecretaryApprovalResult && !$isReadonlyCourseSecretaryApprovalResult) || $courseSecretaryApprovalResultIsDraft) && data.role.isCourseSecretaryRole && !$integritySecretaryApprovalResultIsDraft}
                            <TextIconButton
                                type="neutral"
                                label="Simpan"
                                form="courseSecretaryApprovalForm"
                                onClick={() => {
                                    $courseSecretaryApprovalInfoForm.isDraft = true;
                                }}
                            />
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                form="courseSecretaryApprovalForm"
                                onClick={() => {
                                    $courseSecretaryApprovalInfoForm.isDraft = false;
                                }}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            {#if !$fundApplicationIsFail && (!$isReadonlyStateUnitDirectorApprovalResult || $stateUnitDirectorApprovalResultIsDraft) && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
                                <form
                                    id="stateUnitDirectorApprovalForm"
                                    method="POST"
                                    use:stateUnitDirectorApprovalInfoEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Pengarah Negeri/Bahagian</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={!$stateUnitDirectorApprovalResultIsDraft}
                                        errors={$stateUnitDirectorApprovalInfoErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$stateUnitDirectorApprovalInfoForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={!$stateUnitDirectorApprovalResultIsDraft}
                                        errors={$stateUnitDirectorApprovalInfoErrors.status}
                                        id="approverIsApproved"
                                        options={supportOptions}
                                        label={'Keputusan'}
                                        bind:val={$stateUnitDirectorApprovalInfoForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {:else if !$fundApplicationIsFail && (($isReadonlyStateUnitDirectorApprovalResult && !$isReadonlyIntegritySecretaryApprovalResult) || $integritySecretaryApprovalResultIsDraft) && data.role.isIntegritySecretaryRole && !$stateUnitDirectorApprovalResultIsDraft}
                                <form
                                    id="integritySecretaryApprovalForm"
                                    method="POST"
                                    use:integritySecretaryApprovalInfoEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Urus Setia Integriti</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={!$integritySecretaryApprovalResultIsDraft}
                                        errors={$integritySecretaryApprovalInfoErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$integritySecretaryApprovalInfoForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={!$integritySecretaryApprovalResultIsDraft}
                                        errors={$integritySecretaryApprovalInfoErrors.status}
                                        id="approverIsApproved"
                                        options={integrityOptions}
                                        label={'Keputusan'}
                                        bind:val={$integritySecretaryApprovalInfoForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {:else if !$fundApplicationIsFail && (($isReadonlyStateUnitDirectorApprovalResult && $isReadonlyIntegritySecretaryApprovalResult && !$isReadonlyCourseSecretaryApprovalResult) || $courseSecretaryApprovalResultIsDraft) && data.role.isCourseSecretaryRole && !$integritySecretaryApprovalResultIsDraft}
                                <form
                                    id="courseSecretaryApprovalForm"
                                    method="POST"
                                    use:courseSecretaryApprovalInfoEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Urus Setia Latihan</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={!$courseSecretaryApprovalResultIsDraft}
                                        errors={$courseSecretaryApprovalInfoErrors.remark}
                                        id="supporterRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$courseSecretaryApprovalInfoForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={!$courseSecretaryApprovalResultIsDraft}
                                        errors={$courseSecretaryApprovalInfoErrors.status}
                                        id="supporterIsApproved"
                                        options={certifyOptions}
                                        label={'Keputusan'}
                                        bind:val={$courseSecretaryApprovalInfoForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {/if}

                            <div
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >1. Pengarah Negeri/Bahagian</b
                                    >
                                </div>
                                {#if $isReadonlyStateUnitDirectorApprovalResult}
                                    <CustomTextField
                                        disabled
                                        id="stateUnitDirectorRemark"
                                        label="Tindakan/Ulasan"
                                        val={data.responses
                                            .fundApplicationStateUnitDirectorApprovalResponse
                                            .data?.details.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="stateUnitDirectorStatus"
                                        options={supportOptions}
                                        label={'Keputusan'}
                                        val={data.responses
                                            .fundApplicationStateUnitDirectorApprovalResponse
                                            .data?.details.status}
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="approvalDate"
                                        label="Tarikh Kelulusan"
                                        type="date"
                                        placeholder="-"
                                        val={data.responses
                                            .fundApplicationStateUnitDirectorApprovalResponse
                                            .data?.details.approvalDate}
                                    ></CustomTextField>
                                {:else if $fundApplicationIsFail}
                                    <StepperFailStatement />
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                                <hr />
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >2. Urus Setia Integriti</b
                                    >
                                </div>
                                {#if $isReadonlyIntegritySecretaryApprovalResult}
                                    <CustomTextField
                                        disabled
                                        id="integrityCourseRemark"
                                        label="Tindakan/Ulasan"
                                        val={data.responses
                                            .fundApplicationIntegritySecretaryApprovalResponse
                                            .data?.details.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="integrityCourseStatus"
                                        options={integrityOptions}
                                        label={'Keputusan'}
                                        val={data.responses
                                            .fundApplicationIntegritySecretaryApprovalResponse
                                            .data?.details.status}
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="approvalDate"
                                        label="Tarikh Kelulusan"
                                        type="date"
                                        placeholder="-"
                                        val={data.responses
                                            .fundApplicationIntegritySecretaryApprovalResponse
                                            .data?.details.approvalDate}
                                    ></CustomTextField>
                                {:else if $fundApplicationIsFail}
                                    <StepperFailStatement />
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                                <hr />
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >3. Urus Setia Latihan</b
                                    >
                                </div>
                                {#if $isReadonlyCourseSecretaryApprovalResult}
                                    <CustomTextField
                                        disabled
                                        id="courseSecretaryRemark"
                                        label="Tindakan/Ulasan"
                                        val={data.responses
                                            .fundApplicationCourseSecretaryApprovalResponse
                                            .data?.details.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="courseSecretaryStatus"
                                        options={certifyOptions}
                                        label={'Keputusan'}
                                        val={data.responses
                                            .fundApplicationCourseSecretaryApprovalResponse
                                            .data?.details.status}
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="approvalDate"
                                        label="Tarikh Kelulusan"
                                        type="date"
                                        placeholder="-"
                                        val={data.responses
                                            .fundApplicationCourseSecretaryApprovalResponse
                                            .data?.details.approvalDate}
                                    ></CustomTextField>
                                {:else if $fundApplicationIsFail}
                                    <StepperFailStatement />
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                            </div>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    {/if}
</Stepper>

<Toaster />
