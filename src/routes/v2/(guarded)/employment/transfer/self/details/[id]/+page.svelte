<script lang="ts">
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import DocumentInput from '$lib/components/document-input/DocumentInput.svelte';
    import SuratPertukaran from '$lib/components/letter/SuratPertukaran.svelte';
    import SingleChoiceInput from '$lib/components/inputs/single-choice-input/SingleChoiceInput.svelte';

    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import type { PageData } from './$types';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveAltOptions,
        approveOptions,
        commonOptions,
        supportAltOptions,
    } from '$lib/constants/core/radio-option-constants';
    import CustomBanner from '$lib/components/banner/CustomBanner.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        TransferApplicationAcceptanceLetterDetailSchema,
        TransferApplicationAssignDirectorSchema,
        TransferApplicationAssignPostponeApproverSchema,
        TransferApplicationConfirmationSchema,
        TransferApplicationDirectorSupportSchema,
        TransferApplicationEmployeeDetailSchema,
        TransferApplicationEndorsementSchema,
        TransferApplicationEndorserDetailSchema,
        TransferApplicationMeetingResultSchema,
        TransferApplicationPostponeDetailSchema,
        TransferApplicationPostponeLetterDetailSchema,
        TransferApplicationServiceDetailSchema,
        TransferApplicationTransferDetailSchema,
        TransferApplicationTransferDocumentSchema,
        type EthicalIssueType,
        type TransferApplicationAcceptanceLetterDetailType,
        type TransferApplicationConfirmationType,
        type TransferApplicationTransferDetailType,
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
    import {
        _acceptanceLetterDetailSubmit,
        _applicationConfirmationSubmit,
        _applicationDetailSubmit,
        _approverFeedbackSubmit,
        _assignDirectorSubmit,
        _assignPostponeApproverSubmit,
        _directorSupportSubmit,
        _endorserDetailSubmit,
        _getEndorserDropdown,
        _meetingResultSubmit,
        _postponeApprovalSubmit,
        _postponeDetailSubmit,
        _postponeLetterDetailSubmit,
        _supporterFeedbackSubmit,
        _transferDocumentSubmit,
    } from './+page';
    import MultiChoiceInput from '$lib/components/inputs/multiple-choice-input/MultiChoiceInput.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
    import { LookupHelper } from '$lib/helpers/core/lookup.helper';
    import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';

    export let data: PageData;

    // employee detail
    const {
        form: employeeDetailForm,
        errors: employeeDetailErrors,
        enhance: employeeDetailEnhance,
    } = superForm(data.forms.employeeDetailForm, {
        id: 'employeeDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationEmployeeDetailSchema),
        onSubmit(input) {},
    });

    // service detail
    const {
        form: serviceDetailForm,
        errors: serviceDetailErrors,
        enhance: serviceDetailEnhance,
    } = superForm(data.forms.serviceDetailForm, {
        id: 'serviceDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationServiceDetailSchema),
        onSubmit(input) {},
    });

    // transfer detail
    const {
        form: transferDetailForm,
        errors: transferDetailErrors,
        enhance: transferDetailEnhance,
    } = superForm(data.forms.transferDetailForm, {
        dataType: 'json',
        id: 'transferDetailForm',
        SPA: true,
        resetForm: false,
        invalidateAll: true,
        validators: zodClient(TransferApplicationTransferDetailSchema),
        onSubmit(input) {
            $transferDetailForm.applicationId = null;
            $transferDetailForm.transferType = 'Permohonan Sendiri';
            _applicationDetailSubmit($transferDetailForm).then((value) => {
                const response = value as CommonResponseDTO;

                if (response.status == 'success') {
                    let tempTransferDetails: TransferApplicationTransferDetailType =
                        response.data
                            ?.details as TransferApplicationTransferDetailType;

                    goto(
                        '/v2/employment/transfer/application/self/' +
                            tempTransferDetails.applicationId,
                    );
                }
            });
        },
    });

    // applicationConfirmation
    const {
        form: applicationConfirmationForm,
        errors: applicationConfirmationErrors,
        enhance: applicationConfirmationEnhance,
    } = superForm(data.forms.applicationConfirmationForm.data, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationConfirmationSchema),
        onSubmit() {
            _applicationConfirmationSubmit($applicationConfirmationForm).then(
                () => {
                    $transferDetailForm =
                        data.props.currentApplicationDetails.transferDetails;
                    $applicationConfirmationForm =
                        data.forms.applicationConfirmationForm.data;
                },
            );
        },
    });

    // assignDirector
    const {
        form: assignDirectorForm,
        errors: assignDirectorErrors,
        enhance: assignDirectorEnhance,
    } = superForm(data.forms.assignDirectorForm, {
        id: 'assignDirectorForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationAssignDirectorSchema),
        onSubmit(input) {
            $assignDirectorForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $assignDirectorForm.isDraft = false;
            _assignDirectorSubmit($assignDirectorForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.assignDirector !==
                        null
                    ) {
                        $assignDirectorForm =
                            data.props.currentApplicationDetails.assignDirector;
                    }
                }
            });
        },
    });

    // directorSupport
    const {
        form: directorSupportForm,
        errors: directorSupportErrors,
        enhance: directorSupportEnhance,
    } = superForm(data.forms.directorSupportForm, {
        id: 'directorSupportForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationDirectorSupportSchema),
        onSubmit(input) {
            $directorSupportForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $directorSupportForm.isDraft = false;
            _directorSupportSubmit($directorSupportForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.directorSupport !==
                        null
                    ) {
                        $directorSupportForm =
                            data.props.currentApplicationDetails
                                .directorSupport;
                    }
                }
            });
        },
    });

    // meetingResult
    const {
        form: meetingResultForm,
        errors: meetingResultErrors,
        enhance: meetingResultEnhance,
    } = superForm(data.forms.meetingResultForm, {
        id: 'meetingResultForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationMeetingResultSchema),
        onSubmit(input) {
            $meetingResultForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $meetingResultForm.isDraft = false;
            _meetingResultSubmit($meetingResultForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.meetingResult !==
                        null
                    ) {
                        $meetingResultForm =
                            data.props.currentApplicationDetails.meetingResult;
                    }
                }
            });
        },
    });

    // acceptanceLetterDetail
    const {
        form: acceptanceLetterDetailForm,
        errors: acceptanceLetterDetailErrors,
        enhance: acceptanceLetterDetailEnhance,
    } = superForm(data.forms.acceptanceLetterDetailForm, {
        id: 'acceptanceLetterDetailForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationAcceptanceLetterDetailSchema),
        onSubmit(input) {
            $acceptanceLetterDetailForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            _acceptanceLetterDetailSubmit($acceptanceLetterDetailForm).then(
                (response) => {
                    if (response.status == 'success') {
                        if (
                            data.props.currentApplicationDetails
                                .acceptanceLetterDetails !== null
                        ) {
                            $acceptanceLetterDetailForm =
                                data.props.currentApplicationDetails
                                    .acceptanceLetterDetails;
                        }
                    }
                },
            );
        },
    });

    // postponeDetail
    const {
        form: postponeDetailForm,
        errors: postponeDetailErrors,
        enhance: postponeDetailEnhance,
    } = superForm(data.forms.postponeDetailForm, {
        id: 'postponeDetailForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationPostponeDetailSchema),
        onSubmit(input) {
            $postponeDetailForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $postponeDetailForm.isDraft = false;
            _postponeDetailSubmit($postponeDetailForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.postponeDetails !==
                        null
                    ) {
                        $postponeDetailForm =
                            data.props.currentApplicationDetails
                                .postponeDetails;
                    }
                }
            });
        },
    });

    // assignPostponeApprover
    const {
        form: assignPostponeApproverForm,
        errors: assignPostponeApproverErrors,
        enhance: assignPostponeApproverEnhance,
    } = superForm(data.forms.assignPostponeApproverForm, {
        id: 'assignPostponeApproverForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationAssignPostponeApproverSchema),
        onSubmit(input) {
            $assignPostponeApproverForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $assignPostponeApproverForm.isDraft = false;
            _assignPostponeApproverSubmit($assignPostponeApproverForm).then(
                (response) => {
                    if (response.status == 'success') {
                        if (
                            data.props.currentApplicationDetails
                                .assignPostponeApprover !== null
                        ) {
                            $assignPostponeApproverForm =
                                data.props.currentApplicationDetails
                                    .assignPostponeApprover;
                        }
                    }
                },
            );
        },
    });

    // postponeApproval
    const {
        form: postponeApprovalForm,
        errors: postponeApprovalErrors,
        enhance: postponeApprovalEnhance,
    } = superForm(data.forms.postponeApprovalForm, {
        id: 'postponeApprovalForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {
            $postponeApprovalForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $postponeApprovalForm.isDraft = false;
            _postponeApprovalSubmit($postponeApprovalForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails
                            .postponeApproval !== null
                    ) {
                        $postponeApprovalForm =
                            data.props.currentApplicationDetails
                                .postponeApproval;
                    }
                }
            });
        },
    });

    // postponeLetterDetail
    const {
        form: postponeLetterDetailForm,
        errors: postponeLetterDetailErrors,
        enhance: postponeLetterDetailEnhance,
    } = superForm(data.forms.postponeLetterDetailForm, {
        id: 'postponeLetterDetailForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationPostponeLetterDetailSchema),
        onSubmit(input) {
            $postponeLetterDetailForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $postponeLetterDetailForm.isDraft = false;
            _postponeLetterDetailSubmit($postponeLetterDetailForm).then(
                (response) => {
                    if (response.status == 'success') {
                        if (
                            data.props.currentApplicationDetails
                                .postponeLetterDetails !== null
                        ) {
                            $postponeLetterDetailForm =
                                data.props.currentApplicationDetails
                                    .postponeLetterDetails;
                        }
                    }
                },
            );
        },
    });

    // transferDocument
    const {
        form: transferDocumentForm,
        errors: transferDocumentErrors,
        enhance: transferDocumentEnhance,
    } = superForm(data.forms.transferDocumentForm, {
        id: 'transferDocumentForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationTransferDocumentSchema),
        onSubmit(input) {
            $transferDocumentForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            _transferDocumentSubmit($transferDocumentForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails
                            .transferDocuments !== null
                    ) {
                        $transferDocumentForm =
                            data.props.currentApplicationDetails
                                .transferDocuments;
                    }
                }
            });
        },
    });

    // endorserDetail
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationEndorserDetailSchema),
        onSubmit(input) {
            $endorserDetailForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            _endorserDetailSubmit($endorserDetailForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.assignEndorser !==
                        null
                    ) {
                        $endorserDetailForm =
                            data.props.currentApplicationDetails.assignEndorser;
                    }
                }
            });
        },
    });

    // supporterFeedback
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.forms.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {
            $supporterFeedbackForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $supporterFeedbackForm.isDraft = false;
            _supporterFeedbackSubmit($supporterFeedbackForm).then(
                (response) => {
                    if (response.status == 'success') {
                        if (
                            data.props.currentApplicationDetails.support !==
                            null
                        ) {
                            $supporterFeedbackForm =
                                data.props.currentApplicationDetails.support;
                        }
                    }
                },
            );
        },
    });

    // approverFeedback
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.forms.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {
            $approverFeedbackForm.applicationId =
                data.props.currentApplicationDetails.applicationId;
            $approverFeedbackForm.isDraft = false;
            _approverFeedbackSubmit($approverFeedbackForm).then((response) => {
                if (response.status == 'success') {
                    if (
                        data.props.currentApplicationDetails.approval !== null
                    ) {
                        $approverFeedbackForm =
                            data.props.currentApplicationDetails.approval;
                    }
                }
            });
        },
    });

    function addEthicalIssuesDetail() {
        const newEthicalReport: EthicalIssueType = {
            punishment: '',
            date: '',
        };
        $directorSupportForm.ethicalIssues.push(newEthicalReport);

        $directorSupportForm = $directorSupportForm;
    }

    function removeEthicalIssuesDetail(index: number) {
        $directorSupportForm.ethicalIssues.splice(index, 1);
        $directorSupportForm = $directorSupportForm;
    }

    async function getEndorserDropdown(roleCode: string) {
        const list: DropdownDTO[] = await _getEndorserDropdown(roleCode);

        return list;
    }
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Permohonan Pertukaran - Permohonan Sendiri">
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/employment/transfer/self/list');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <!-- ======================================================================= -->
        <!-- PERSONAL DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Peribadi">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                use:employeeDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 p-5"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    bind:val={$employeeDetailForm.name}
                                    bind:errors={$employeeDetailErrors.name}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label="No. Kad Pengenalan"
                                    type="text"
                                    bind:val={$employeeDetailForm.identityDocumentNumber}
                                    bind:errors={$employeeDetailErrors.identityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeNumber"
                                    label="No. Pekerja"
                                    type="text"
                                    bind:val={$employeeDetailForm.employeeNumber}
                                    bind:errors={$employeeDetailErrors.employeeNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="phone"
                                    label="No. Telefon Bimbit"
                                    type="text"
                                    bind:val={$employeeDetailForm.phone}
                                    bind:errors={$employeeDetailErrors.phone}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="maritalStatus"
                                    label="Status"
                                    type="text"
                                    bind:val={$employeeDetailForm.maritalStatus}
                                    bind:errors={$employeeDetailErrors.maritalStatus}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childCount"
                                    label="Bilangan Anak"
                                    type="text"
                                    bind:val={$employeeDetailForm.childCount}
                                    bind:errors={$employeeDetailErrors.childCount}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childInSchoolCount"
                                    label="Bilangan Anak Bersekolah"
                                    type="text"
                                    bind:val={$employeeDetailForm.childInSchoolCount}
                                    bind:errors={$employeeDetailErrors.childInSchoolCount}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- SERVICE DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="serviceDetailForm"
                                method="POST"
                                use:serviceDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 p-5"
                            >
                                <CustomTextField
                                    disabled
                                    id="position"
                                    label="Nama Jawatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.position}
                                    bind:errors={$serviceDetailErrors.position}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="grade"
                                    label="Gred"
                                    type="text"
                                    bind:val={$serviceDetailForm.grade}
                                    bind:errors={$serviceDetailErrors.grade}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="hiringDate"
                                    label="Tarikh Lantikan"
                                    type="text"
                                    bind:val={$serviceDetailForm.hiringDate}
                                    bind:errors={$serviceDetailErrors.hiringDate}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeName"
                                    label="Nama Jabatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.officeName}
                                    bind:errors={$serviceDetailErrors.officeName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeAddress"
                                    label="Alamat Jabatan"
                                    type="text"
                                    bind:val={$serviceDetailForm.officeAddress}
                                    bind:errors={$serviceDetailErrors.officeAddress}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="department"
                                    label="Bahagian/ Unit"
                                    type="text"
                                    bind:val={$serviceDetailForm.department}
                                    bind:errors={$serviceDetailErrors.department}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="servicePeriod"
                                    label="Tempoh Perkhidmatan Di Penempatan Sekarang"
                                    type="text"
                                    bind:val={$serviceDetailForm.servicePeriod}
                                    bind:errors={$serviceDetailErrors.servicePeriod}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- APPLICATION DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan">
                <TextIconButton
                    label="Simpan"
                    type="draft"
                    icon="save"
                    form="transferDetailForm"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- notes starts here -->
                        <div
                            class="flex w-full flex-col items-center justify-start bg-slate-50 p-2"
                        >
                            <p
                                class="w-full text-wrap text-start text-base font-medium text-slate-500"
                            >
                                Sila baca keterangan yang berikut sebelum
                                mengisi borang:
                            </p>
                            <ol
                                class="w-full list-decimal px-4 text-start text-base text-slate-500"
                            >
                                <li class="w-full">
                                    Borang ini hendaklah diisi dalam dua (2)
                                    salinan.
                                </li>
                                <li>
                                    Sebarang perubahan maklumat kepada
                                    permohonan pertukaran yang telah didaftarkan
                                    hendaklah dimaklumkan secara bertulis.
                                </li>
                                <li>
                                    Bagi permohonan kerana mengikut pasangan
                                    (suami/isteri), salinan Sijil Nikah dan
                                    Surat Akuan Majikan pasangan hendaklah
                                    disertakan.
                                </li>
                                <li>
                                    Permohonan ini sah dan berkuatkuasa bagi
                                    tempoh satu (1) tahun dari tarikh
                                    permohonan. Selepas tempoh tersebut,
                                    permohonan ini akan terbatal dengan
                                    sendirinya dan sekiranya tuan dan puan masih
                                    berminat untuk bertukar, sila kemukakan
                                    permohonan baharu.
                                </li>
                            </ol>
                        </div>
                        <!-- notes ends here -->

                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="transferDetailForm"
                                method="POST"
                                use:transferDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1 px-5"
                            >
                                <MultiChoiceInput
                                    id="category"
                                    label="Jenis Pertukaran"
                                    choices={data.lookup.transferCategoryOption}
                                    bind:val={$transferDetailForm.category}
                                    disabled={!$transferDetailForm.isDraft}
                                ></MultiChoiceInput>
                                <CustomSelectField
                                    id="appliedLocation"
                                    label={'Pilihan Penempatan'}
                                    bind:val={$transferDetailForm.appliedLocation}
                                    bind:errors={$transferDetailErrors.appliedLocation}
                                    options={data.lookup.placementDropdown}
                                    disabled={!$transferDetailForm.isDraft}
                                ></CustomSelectField>
                                <MultiChoiceInput
                                    id="reason"
                                    label="Alasan Pertukaran"
                                    choices={data.lookup.transferReasonOption}
                                    bind:val={$transferDetailForm.reason}
                                    disabled={!$transferDetailForm.isDraft}
                                ></MultiChoiceInput>

                                {#if $transferDetailForm.reason.includes('Lain-lain (sila nyatakan)')}
                                    <CustomTextField
                                        id="remark"
                                        label="Sila Berikan Penjelasan Sekiranya Anda Memilih Lain-lain Sebagai Alasan Pertukaran"
                                        bind:val={$transferDetailForm.remark}
                                        bind:errors={$transferDetailErrors.remark}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                {/if}

                                {#if $transferDetailForm.reason.includes('Mengikut Pasangan')}
                                    <p
                                        class="text-base font-medium text-slate-700"
                                    >
                                        Sekiranya Alasan Pertukaran Pemohon
                                        Kerana Mengikut Pasangan Sila Isikan
                                        Maklumat Pasangan Seperti Berikut:
                                    </p>

                                    <CustomTextField
                                        id="workPlaceDistance"
                                        label="Jarak Tempat Kerja (KM) Pasangan Dari Penempatan Anda Sekarang"
                                        type="number"
                                        bind:val={$transferDetailForm.workPlaceDistance}
                                        bind:errors={$transferDetailErrors.workPlaceDistance}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="employerName"
                                        type="text"
                                        label="Nama Majikan Pasangan"
                                        bind:val={$transferDetailForm.employerName}
                                        bind:errors={$transferDetailErrors.employerName}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label="Tarikh Pasangan Mula Berkhidmat Di Penempatan Sekarang"
                                        isRequired={false}
                                        bind:val={$transferDetailForm.startDate}
                                        bind:errors={$transferDetailErrors.startDate}
                                        disabled={!$transferDetailForm.isDraft}
                                    ></CustomTextField>
                                {/if}

                                <DocumentInput
                                    bind:documents={$transferDetailForm.documents}
                                    label="Surat Permohonan Pertukaran"
                                    disabled={!$transferDetailForm.isDraft}
                                ></DocumentInput>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- EMPLOYEE CONFIRMATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemohon">
                <TextIconButton
                    label="Hantar"
                    type="primary"
                    icon="check"
                    form="applicationConfirmationForm"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 xl:w-1/2"
                    >
                        <CustomBanner
                            text="Sila buat perakuan anda di bawah dan klik butang Hantar untuk menghantar permohonan ini ke Urus Setia Perjawatan dan diproses."
                        ></CustomBanner>
                        <form
                            id="applicationConfirmationForm"
                            method="POST"
                            use:applicationConfirmationEnhance
                            class="flex w-full flex-col items-start justify-start gap-4 p-5"
                        >
                            <div
                                class="flex w-full flex-row items-start justify-start gap-2"
                            >
                                <div
                                    class="flex h-6 w-fit flex-col items-center justify-center"
                                >
                                    <input
                                        id="status"
                                        type="checkbox"
                                        bind:checked={$applicationConfirmationForm.status}
                                        class="rounded focus:outline-none focus:ring-0 disabled:text-gray-400"
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .confirmation !== null &&
                                            !data.props
                                                .currentApplicationDetails
                                                .confirmation.isDraft}
                                    />
                                </div>
                                <p
                                    class="text-justify text-base font-normal leading-loose tracking-wide text-slate-700"
                                >
                                    Saya sesungguhnya mengakui bahawa semua
                                    keterangan di atas adalah benar. Lembaga
                                    Kemajuan Ikan Malaysia (LKIM) berhak
                                    membatalkan permohonan saya jika didapati
                                    ada maklumat yang tidak benar. Saya faham
                                    bahawa pertukaran ini hanyalah ke Ibu
                                    Pejabat/Negeri/Wilayah yang saya nyatakan di
                                    atas sahaja. Saya juga faham bahawa
                                    penempatan saya ke mana-mana tempat di dalam
                                    Ibu Pejabat/Negeri/Wilayah itu adalah
                                    terpulang kepada pertimbangan dan sokongan
                                    Pengarah Bahagian/Negeri berkenaan. Saya
                                    juga mengambil maklum bahawa sekiranya saya
                                    membatalkan pertukaran yang telah diluluskan
                                    oleh Jawatankuasa Penyelarasan Penempatan
                                    Pegawai dan Kakitangan LKIM, saya tidak
                                    layak beri sebarang pertimbangan pertukaran
                                    ke tempat yang sama dalam tempoh satu (1)
                                    tahun dari tarikh pembatalan dilakukan.
                                </p>
                            </div>
                            <CustomTextField
                                disabled
                                id="date"
                                type="date"
                                label="Tarikh Perakuan"
                                bind:val={$applicationConfirmationForm.date}
                                bind:errors={$applicationConfirmationErrors.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        {#if data.props.currentApplicationDetails.confirmation !== null}
            <!-- ======================================================================= -->
            <!-- ASSIGN DIRECTOR -->
            <!-- ======================================================================= -->

            <StepperContent>
                <StepperContentHeader title="Lantikan Peraku Permohonan">
                    {#if data.props.currentApplicationDetails.assignDirector == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="assignDirectorForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <form
                                id="assignDirectorForm"
                                method="POST"
                                use:assignDirectorEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                {#if data.props.currentApplicationDetails.assignDirector == null}
                                    <CustomSelectField
                                        id="roleCode"
                                        label={'Sila pilih peranan yang layak menjadi Peraku Permohonan'}
                                        bind:val={$assignDirectorForm.roleCode}
                                        bind:errors={$assignDirectorErrors.roleCode}
                                        options={data.lookup.roleDropdown}
                                        onValueChange={async () => {
                                            data.lookup.directorDrodpwon =
                                                await getEndorserDropdown(
                                                    $assignDirectorForm.roleCode ??
                                                        '',
                                                );
                                        }}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="identityDocumentNumber"
                                        label={'Sila pilih nama Peraku Permohonan untuk memberi sokongan bagi permohonan ini'}
                                        bind:val={$assignDirectorForm.identityDocumentNumber}
                                        bind:errors={$assignDirectorErrors.identityDocumentNumber}
                                        options={data.lookup.directorDrodpwon}
                                    ></CustomSelectField>
                                {:else}
                                    <CustomSelectField
                                        id="roleCode"
                                        label={'Peranan Peraku Permohonan'}
                                        bind:val={$assignDirectorForm.roleCode}
                                        bind:errors={$assignDirectorErrors.roleCode}
                                        options={data.lookup.roleDropdown}
                                        disabled
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        id="directorName"
                                        label={'Nama Peraku Permohonan'}
                                        bind:val={$assignDirectorForm.directorName}
                                        bind:errors={$assignDirectorErrors.directorName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        id="directorName"
                                        label={'No. Kad Pengenalan Peraku Permohonan'}
                                        bind:val={$assignDirectorForm.identityDocumentNumber}
                                        bind:errors={$assignDirectorErrors.identityDocumentNumber}
                                    ></CustomTextField>
                                {/if}
                            </form>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <!-- ======================================================================= -->
            <!-- DIRECTOR SUPPORT -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Peraku Permohonan">
                    {#if data.props.currentApplicationDetails.directorSupport?.isDraft && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.assignDirector?.identityDocumentNumber}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="directorSupportForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetails.assignDirector !== null}
                        <div
                            class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                        >
                            <div
                                class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                            >
                                <!-- form wrapper starts here -->
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2"
                                >
                                    <form
                                        id="directorSupportForm"
                                        method="POST"
                                        use:directorSupportEnhance
                                        class="flex w-full flex-col items-start justify-start gap-1"
                                    >
                                        <p
                                            class="text-base font-medium text-slate-700"
                                        >
                                            Saya mengesahkan bahawa maklumat
                                            yang diberikan adalah benar. Oleh
                                            itu saya memperakukan permohonan ini
                                            seperti ulasan berikut:
                                        </p>
                                        <SingleChoiceInput
                                            id="feedback"
                                            label="Maklum Balas Pengarah"
                                            choices={data.lookup
                                                .directorFeedbackOption}
                                            bind:val={$directorSupportForm.feedback}
                                            bind:errors={$directorSupportErrors.feedback}
                                            disabled={!data.props
                                                .currentApplicationDetails
                                                .directorSupport?.isDraft ||
                                                data.props.layoutData
                                                    .accountDetails
                                                    .identityDocumentNumber !==
                                                    data.props
                                                        .currentApplicationDetails
                                                        .assignDirector
                                                        ?.identityDocumentNumber}
                                        ></SingleChoiceInput>

                                        <CustomTextField
                                            id="remark"
                                            label="Ulasan"
                                            type="textarea"
                                            isRequired={false}
                                            bind:val={$directorSupportForm.remark}
                                            bind:errors={$directorSupportErrors.remark}
                                            disabled={!data.props
                                                .currentApplicationDetails
                                                .directorSupport?.isDraft ||
                                                data.props.layoutData
                                                    .accountDetails
                                                    .identityDocumentNumber !==
                                                    data.props
                                                        .currentApplicationDetails
                                                        .assignDirector
                                                        ?.identityDocumentNumber}
                                        ></CustomTextField>

                                        {#if $directorSupportForm.feedback == 'Ada tindakan tatatertib (sila berikan senarai laporan)'}
                                            <div
                                                class="flex w-full flex-col items-start justify-start gap-2 py-2 pb-4"
                                            >
                                                <div
                                                    class="flex w-full flex-row items-center justify-between"
                                                >
                                                    <p
                                                        class=" w-full text-start text-base font-medium text-slate-700"
                                                    >
                                                        Senarai Laporan
                                                        Tatatertib
                                                    </p>
                                                </div>

                                                {#each $directorSupportForm.ethicalIssues as item, index}
                                                    <div
                                                        class="flex w-full flex-col items-start justify-start rounded-md border border-slate-200 bg-white p-4"
                                                    >
                                                        <div
                                                            class="flex w-full flex-row items-center justify-between py-2"
                                                        >
                                                            <p
                                                                class="text-base font-semibold text-slate-700"
                                                            >
                                                                Laporan
                                                                Tatatertib {index +
                                                                    1}
                                                            </p>

                                                            {#if data.props.currentApplicationDetails.directorSupport?.isDraft}
                                                                <button
                                                                    type="button"
                                                                    on:click={() => {
                                                                        removeEthicalIssuesDetail(
                                                                            index,
                                                                        );
                                                                    }}
                                                                >
                                                                    <span>
                                                                        <SvgXMark

                                                                        ></SvgXMark>
                                                                    </span>
                                                                </button>
                                                            {/if}
                                                        </div>
                                                        <div
                                                            class="flex w-full flex-col items-start justify-start gap-0"
                                                        >
                                                            <CustomTextField
                                                                type="text"
                                                                id="ethical-punishment-{index}"
                                                                label={'Hukuman'}
                                                                errors={$directorSupportErrors.ethicalIssues
                                                                    ? $directorSupportErrors
                                                                          .ethicalIssues[
                                                                          index
                                                                      ]
                                                                          ?.punishment
                                                                    : undefined}
                                                                bind:val={item.punishment}
                                                                disabled={!data
                                                                    .props
                                                                    .currentApplicationDetails
                                                                    .directorSupport
                                                                    ?.isDraft}
                                                            ></CustomTextField>
                                                            <CustomTextField
                                                                type="date"
                                                                id="ethical-date-{index}"
                                                                label={'Tarikh Laporan'}
                                                                errors={$directorSupportErrors.ethicalIssues
                                                                    ? $directorSupportErrors
                                                                          .ethicalIssues[
                                                                          index
                                                                      ]?.date
                                                                    : undefined}
                                                                bind:val={item.date}
                                                                disabled={!data
                                                                    .props
                                                                    .currentApplicationDetails
                                                                    .directorSupport
                                                                    ?.isDraft}
                                                            ></CustomTextField>
                                                        </div>
                                                    </div>
                                                {/each}

                                                {#if data.props.currentApplicationDetails.directorSupport?.isDraft}
                                                    <button
                                                        class="h-8 min-h-8 w-full rounded border border-slate-400 bg-slate-100"
                                                        type="button"
                                                        on:click={() => {
                                                            addEthicalIssuesDetail();
                                                        }}
                                                    >
                                                        <p
                                                            class="text-base font-medium text-slate-700"
                                                        >
                                                            + Tambah
                                                        </p>
                                                    </button>
                                                {/if}
                                            </div>
                                        {/if}

                                        <CustomTextField
                                            disabled
                                            id="name"
                                            label="Nama Pengarah"
                                            type="text"
                                            bind:val={$directorSupportForm.name}
                                            bind:errors={$directorSupportErrors.name}
                                        ></CustomTextField>
                                        <CustomTextField
                                            disabled
                                            id="identityDocumentNumber"
                                            label="No. Kad Pengenalan"
                                            type="text"
                                            bind:val={$directorSupportForm.identityDocumentNumber}
                                            bind:errors={$directorSupportErrors.identityDocumentNumber}
                                        ></CustomTextField>
                                        <CustomTextField
                                            disabled
                                            id="date"
                                            label="Tarikh"
                                            type="date"
                                            bind:val={$directorSupportForm.date}
                                            bind:errors={$directorSupportErrors.date}
                                        ></CustomTextField>
                                    </form>
                                </div>
                                <!-- form wrapper ends here -->
                            </div>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-center justify-center gap-2 rounded bg-slate-50"
                        >
                            <span
                                class="text-center text-lg font-medium text-slate-500"
                            >
                                <SvgInfoSolid size="30"></SvgInfoSolid>
                            </span>
                            <p
                                class="text-wrap text-center text-lg font-medium text-slate-500"
                            >
                                Menunggu maklumat Peraku Permohonan
                            </p>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- MEETING RESULT -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    {#if data.props.currentApplicationDetails.meetingResult == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="meetingResultForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <CustomBanner
                                    text="Sila masukkan butiran dan keputusan mesyuarat di ruangan yang tersedia di bawah."
                                ></CustomBanner>
                                <form
                                    id="meetingResultForm"
                                    method="POST"
                                    use:meetingResultEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <CustomTextField
                                        id="meetingName"
                                        label="Nama Mesyuarat"
                                        type="text"
                                        bind:val={$meetingResultForm.meetingName}
                                        bind:errors={$meetingResultErrors.meetingName}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .meetingResult !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="meetingDate"
                                        label="Tarikh Mesyuarat"
                                        type="date"
                                        bind:val={$meetingResultForm.meetingDate}
                                        bind:errors={$meetingResultErrors.meetingDate}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .meetingResult !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        id="status"
                                        label="Keputusan Mesyuarat Permohonan Ini Adalah:"
                                        bind:val={$meetingResultForm.status}
                                        bind:errors={$meetingResultErrors.status}
                                        options={approveOptions}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .meetingResult !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="remark"
                                        label="Ulasan"
                                        type="textarea"
                                        isRequired={false}
                                        bind:val={$meetingResultForm.remark}
                                        bind:errors={$meetingResultErrors.remark}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .meetingResult !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- ACCEPTANCE LETTER -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Surat Pertukaran">
                    {#if data.props.currentApplicationDetails.acceptanceLetterDetails == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="acceptanceLetterDetailForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <CustomBanner
                                    text="Sila masukkan butiran dan isi-isi Surat Pertukaran seperti yang tertera di bawah"
                                ></CustomBanner>
                                <form
                                    id="acceptanceLetterDetailForm"
                                    method="POST"
                                    use:acceptanceLetterDetailEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <CustomTextField
                                        id="referenceNumber"
                                        label="No. Rujukan Surat"
                                        type="text"
                                        bind:val={$acceptanceLetterDetailForm.referenceNumber}
                                        bind:errors={$acceptanceLetterDetailErrors.referenceNumber}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="referenceDate"
                                        label="Tarikh Surat"
                                        type="date"
                                        bind:val={$acceptanceLetterDetailForm.referenceDate}
                                        bind:errors={$acceptanceLetterDetailErrors.referenceDate}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="subject"
                                        label="Tajuk Surat"
                                        type="text"
                                        bind:val={$acceptanceLetterDetailForm.subject}
                                        bind:errors={$acceptanceLetterDetailErrors.subject}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="fromLocation"
                                        label={'Penempatan Asal'}
                                        bind:val={$acceptanceLetterDetailForm.fromLocation}
                                        bind:errors={$acceptanceLetterDetailErrors.fromLocation}
                                        options={data.lookup.placementDropdown}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="toLocation"
                                        label={'Penempatan Baharu'}
                                        bind:val={$acceptanceLetterDetailForm.toLocation}
                                        bind:errors={$acceptanceLetterDetailErrors.toLocation}
                                        options={data.lookup.placementDropdown}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                    <CustomTextField
                                        id="additionalNotes"
                                        label="Nota Tambahan"
                                        type="text"
                                        bind:val={$acceptanceLetterDetailForm.additionalNotes}
                                        bind:errors={$acceptanceLetterDetailErrors.additionalNotes}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="transferDate"
                                        label="Tarikh Pertukaran"
                                        type="date"
                                        bind:val={$acceptanceLetterDetailForm.transferDate}
                                        bind:errors={$acceptanceLetterDetailErrors.transferDate}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="newLocationAddress"
                                        label="Alamat Penempatan Baharu"
                                        type="text"
                                        bind:val={$acceptanceLetterDetailForm.newLocationAddress}
                                        bind:errors={$acceptanceLetterDetailErrors.newLocationAddress}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="slogan"
                                        label="Slogan Surat"
                                        type="text"
                                        bind:val={$acceptanceLetterDetailForm.slogan}
                                        bind:errors={$acceptanceLetterDetailErrors.slogan}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .acceptanceLetterDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomTextField>
                                    {#if data.props.currentApplicationDetails.acceptanceLetterDetails !== null}
                                        <DocumentInput
                                            bind:documents={$acceptanceLetterDetailForm.documents}
                                            label="Surat Pertukaran"
                                            disabled
                                        ></DocumentInput>
                                    {/if}
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- POSTPONE -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Permohonan Penangguhan">
                    {#if data.props.currentApplicationDetails.postponeDetails == null && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.employeeDetails?.identityDocumentNumber && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.kakitangan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="postponeDetailForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <form
                                    id="postponeDetailForm"
                                    method="POST"
                                    use:postponeDetailEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <CustomRadioBoolean
                                        id="isPostpone"
                                        label="Adakah Anda Ingin Memohon Penangguhan Tarikh Pertukaran"
                                        options={commonOptions}
                                        bind:val={$postponeDetailForm.isPostpone}
                                        bind:errors={$postponeDetailErrors.isPostpone}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .postponeDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .employeeDetails
                                                    ?.identityDocumentNumber ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.kakitangan.code}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="postponeDate"
                                        label="Nyatakan Tarikh Pertukaran Mengikut Kesusuaian Anda"
                                        type="date"
                                        isRequired={false}
                                        bind:val={$postponeDetailForm.postponeDate}
                                        bind:errors={$postponeDetailErrors.postponeDate}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .postponeDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .employeeDetails
                                                    ?.identityDocumentNumber ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.kakitangan.code}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="remark"
                                        label="Ulasan"
                                        type="textarea"
                                        isRequired={false}
                                        bind:val={$postponeDetailForm.remark}
                                        bind:errors={$postponeDetailErrors.remark}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .postponeDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .employeeDetails
                                                    ?.identityDocumentNumber ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.kakitangan.code}
                                    ></CustomTextField>
                                    <DocumentInput
                                        id="postponeDetailForm.documents"
                                        dispatchName="postponeDetails"
                                        bind:documents={$postponeDetailForm.documents}
                                        label="Surat Permohonan Penangguhan Pertukaran"
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .postponeDetails !== null ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .employeeDetails
                                                    ?.identityDocumentNumber ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.kakitangan.code}
                                    ></DocumentInput>
                                    <CustomTextField
                                        disabled
                                        id="date"
                                        label="Tarikh Permohonan Dihantar"
                                        type="date"
                                        bind:val={$postponeDetailForm.date}
                                        bind:errors={$postponeDetailErrors.date}
                                    ></CustomTextField>
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            {#if data.props.currentApplicationDetails.postponeDetails !== null}
                {#if data.props.currentApplicationDetails.postponeDetails.isPostpone}
                    <!-- ======================================================================= -->
                    <!-- ASSIGN POSTPONE APPROVER -->
                    <!-- ======================================================================= -->
                    <StepperContent>
                        <StepperContentHeader
                            title="Lantikan Pelulus Permohonan Penangguhan"
                        >
                            {#if data.props.currentApplicationDetails.assignPostponeApprover == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    label="Hantar"
                                    type="primary"
                                    icon="check"
                                    form="assignPostponeApproverForm"
                                ></TextIconButton>
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div
                                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                                >
                                    <form
                                        id="assignPostponeApproverForm"
                                        method="POST"
                                        use:assignPostponeApproverEnhance
                                        class="flex w-full flex-col items-center justify-start gap-2"
                                    >
                                        {#if data.props.currentApplicationDetails.assignPostponeApprover == null}
                                            <CustomSelectField
                                                id="roleCode"
                                                label={'Sila pilih peranan yang layak menjadi Pelulus Permohonan Penangguhan'}
                                                bind:val={$assignPostponeApproverForm.roleCode}
                                                bind:errors={$assignPostponeApproverErrors.roleCode}
                                                options={data.lookup
                                                    .roleDropdown}
                                                onValueChange={async () => {
                                                    data.lookup.postponeApproverDropdown =
                                                        await getEndorserDropdown(
                                                            $assignPostponeApproverForm.roleCode ??
                                                                '',
                                                        );
                                                }}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .assignPostponeApprover !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomSelectField>
                                            <CustomSelectField
                                                id="identityDocumentNumber"
                                                label={'Sila pilih nama Pelulus Permohonan Penangguhan untuk memberi sokongan bagi permohonan ini'}
                                                bind:val={$assignPostponeApproverForm.identityDocumentNumber}
                                                bind:errors={$assignPostponeApproverErrors.identityDocumentNumber}
                                                options={data.lookup
                                                    .postponeApproverDropdown}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .assignPostponeApprover !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomSelectField>
                                        {:else}
                                            <CustomSelectField
                                                id="roleCode"
                                                label={'Peranan Pelulus Permohonan Penangguhan'}
                                                bind:val={$assignPostponeApproverForm.roleCode}
                                                bind:errors={$assignPostponeApproverErrors.roleCode}
                                                options={data.lookup
                                                    .roleDropdown}
                                                disabled
                                            ></CustomSelectField>
                                            <CustomTextField
                                                disabled
                                                id="directorName"
                                                label={'Nama Pelulus Permohonan Penangguhan'}
                                                bind:val={$assignPostponeApproverForm.directorName}
                                                bind:errors={$assignPostponeApproverErrors.directorName}
                                            ></CustomTextField>
                                            <CustomTextField
                                                disabled
                                                id="identityDocumentNumber"
                                                label={'No. Kad Pengenalan Pelulus Permohonan Penangguhan'}
                                                bind:val={$assignPostponeApproverForm.identityDocumentNumber}
                                                bind:errors={$assignPostponeApproverErrors.identityDocumentNumber}
                                            ></CustomTextField>
                                        {/if}
                                    </form>
                                </div>
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                    <!-- ======================================================================= -->
                    <!-- POSTPONE APPROVAL -->
                    <!-- ======================================================================= -->
                    <StepperContent>
                        <StepperContentHeader
                            title="Sokongan Permohonan Penangguhan"
                        >
                            {#if data.props.currentApplicationDetails.postponeApproval?.isDraft && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.postponeApproval?.identityDocumentNumber}
                                <TextIconButton
                                    label="Hantar"
                                    type="primary"
                                    icon="check"
                                    form="postponeApprovalForm"
                                ></TextIconButton>
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div
                                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                                >
                                    <!-- form wrapper starts here -->
                                    <div
                                        class="flex w-full flex-col items-start justify-start gap-2"
                                    >
                                        <form
                                            id="postponeApprovalForm"
                                            method="POST"
                                            use:postponeApprovalEnhance
                                            class="flex w-full flex-col items-start justify-start gap-1"
                                        >
                                            <CustomRadioBoolean
                                                id="status"
                                                label="Permohonan Penangguhan Pertukaran Pegawai Di Atas Adalah:"
                                                bind:val={$postponeApprovalForm.status}
                                                bind:errors={$postponeApprovalErrors.status}
                                                options={supportAltOptions}
                                                disabled={!data.props
                                                    .currentApplicationDetails
                                                    .postponeApproval
                                                    ?.isDraft ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .identityDocumentNumber !==
                                                        data.props
                                                            .currentApplicationDetails
                                                            .postponeApproval
                                                            ?.identityDocumentNumber}
                                            ></CustomRadioBoolean>
                                            <CustomTextField
                                                id="remark"
                                                label="Ulasan"
                                                type="textarea"
                                                isRequired={false}
                                                bind:val={$postponeApprovalForm.remark}
                                                bind:errors={$postponeApprovalErrors.remark}
                                                disabled={!data.props
                                                    .currentApplicationDetails
                                                    .postponeApproval
                                                    ?.isDraft ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .identityDocumentNumber !==
                                                        data.props
                                                            .currentApplicationDetails
                                                            .postponeApproval
                                                            ?.identityDocumentNumber}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="name"
                                                label="Nama Penyokong"
                                                type="text"
                                                bind:val={$postponeApprovalForm.name}
                                                bind:errors={$postponeApprovalErrors.name}
                                                disabled
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="date"
                                                label="Tarikh Maklum Balas Dihantar"
                                                type="date"
                                                bind:val={$postponeApprovalForm.identityDocumentNumber}
                                                bind:errors={$postponeApprovalErrors.identityDocumentNumber}
                                                disabled
                                            ></CustomTextField>
                                        </form>
                                    </div>
                                    <!-- form wrapper ends here -->
                                </div>
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                    <!-- ======================================================================= -->
                    <!-- POSTPONE LETTER -->
                    <!-- ======================================================================= -->
                    <StepperContent>
                        <StepperContentHeader
                            title="Surat Penangguhan Pertukaran"
                        >
                            {#if data.props.currentApplicationDetails.postponeLetterDetails == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    label="Hantar"
                                    type="primary"
                                    icon="check"
                                    form="postponeLetterDetailForm"
                                ></TextIconButton>
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div
                                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                                >
                                    <!-- form wrapper starts here -->
                                    <div
                                        class="flex w-full flex-col items-start justify-start gap-2"
                                    >
                                        <CustomBanner
                                            text="Sila masukkan butiran dan isi-isi Surat Pertukaran seperti yang tertera di bawah"
                                        ></CustomBanner>
                                        <form
                                            id="postponeLetterDetailForm"
                                            method="POST"
                                            use:postponeLetterDetailEnhance
                                            class="flex w-full flex-col items-start justify-start gap-1"
                                        >
                                            <CustomTextField
                                                id="referenceNumber"
                                                label="No. Rujukan Surat"
                                                type="text"
                                                bind:val={$postponeLetterDetailForm.referenceNumber}
                                                bind:errors={$postponeLetterDetailErrors.referenceNumber}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="referenceDate"
                                                label="Tarikh Surat"
                                                type="date"
                                                bind:val={$postponeLetterDetailForm.referenceDate}
                                                bind:errors={$postponeLetterDetailErrors.referenceDate}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="subject"
                                                label="Tajuk Surat"
                                                type="text"
                                                bind:val={$postponeLetterDetailForm.subject}
                                                bind:errors={$postponeLetterDetailErrors.subject}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>

                                            <CustomSelectField
                                                id="fromLocation"
                                                label={'Penempatan Asal'}
                                                bind:val={$postponeLetterDetailForm.fromLocation}
                                                bind:errors={$postponeLetterDetailErrors.fromLocation}
                                                options={data.lookup
                                                    .placementDropdown}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomSelectField>
                                            <CustomSelectField
                                                id="toLocation"
                                                label={'Penempatan Baharu'}
                                                bind:val={$postponeLetterDetailForm.toLocation}
                                                bind:errors={$postponeLetterDetailErrors.toLocation}
                                                options={data.lookup
                                                    .placementDropdown}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomSelectField>
                                            <CustomTextField
                                                id="additionalNotes"
                                                label="Nota Tambahan"
                                                type="text"
                                                bind:val={$postponeLetterDetailForm.additionalNotes}
                                                bind:errors={$postponeLetterDetailErrors.additionalNotes}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="transferDate"
                                                label="Tarikh Pertukaran"
                                                type="date"
                                                bind:val={$postponeLetterDetailForm.transferDate}
                                                bind:errors={$postponeLetterDetailErrors.transferDate}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="newLocationAddress"
                                                label="Alamat Penempatan Baharu"
                                                type="text"
                                                bind:val={$postponeLetterDetailForm.newLocationAddress}
                                                bind:errors={$postponeLetterDetailErrors.newLocationAddress}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            <CustomTextField
                                                id="slogan"
                                                label="Slogan Surat"
                                                type="text"
                                                bind:val={$postponeLetterDetailForm.slogan}
                                                bind:errors={$postponeLetterDetailErrors.slogan}
                                                disabled={data.props
                                                    .currentApplicationDetails
                                                    .postponeLetterDetails !==
                                                    null ||
                                                    data.props.layoutData
                                                        .accountDetails
                                                        .currentRoleCode !==
                                                        RoleConstant
                                                            .urusSetiaPerjawatan
                                                            .code}
                                            ></CustomTextField>
                                            {#if data.props.currentApplicationDetails.postponeLetterDetails !== null}
                                                <DocumentInput
                                                    bind:documents={$postponeLetterDetailForm.documents}
                                                    label="Surat Penangguhan Pertukaran"
                                                    disabled
                                                ></DocumentInput>
                                            {/if}
                                        </form>
                                    </div>
                                    <!-- form wrapper ends here -->
                                </div>
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
            <!-- ======================================================================= -->
            <!-- TRANSFER ITINERARY -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Dokumen Keperluan Pertukaran">
                    {#if data.props.currentApplicationDetails.transferDocuments == null && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.employeeDetails?.identityDocumentNumber && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.kakitangan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="transferDocumentForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <form
                                    id="transferDocumentForm"
                                    method="POST"
                                    use:transferDocumentEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <DocumentInput
                                        id="transfer.documents"
                                        dispatchName="transferDocumentFormDocs"
                                        bind:documents={$transferDocumentForm.documents}
                                        label="Dokumen-dokumen Keperluan Pertukaran"
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .transferDocuments !== null ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .employeeDetails
                                                    ?.identityDocumentNumber ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.kakitangan.code}
                                    ></DocumentInput>
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- ASSIGN SUPPORTER AND APPROVER -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader
                    title="Lantikan Penyokong dan Pelulus Pertukaran"
                >
                    {#if data.props.currentApplicationDetails.assignEndorser == null && data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaPerjawatan.code}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="endorserDetailForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <form
                                id="endorserDetailForm"
                                method="POST"
                                use:endorserDetailEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                {#if data.props.currentApplicationDetails.assignEndorser == null}
                                    <CustomSelectField
                                        id="supporterRoleCode"
                                        label={'Sila pilih peranan yang layak memberi sokongan bagi pertukaran ini'}
                                        bind:val={$endorserDetailForm.supporterRoleCode}
                                        bind:errors={$endorserDetailErrors.supporterRoleCode}
                                        options={data.lookup.roleDropdown}
                                        onValueChange={async () => {
                                            data.lookup.supporterDropdown =
                                                await getEndorserDropdown(
                                                    $endorserDetailForm.supporterRoleCode ??
                                                        '',
                                                );
                                        }}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .assignEndorser !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="supporterIdentityDocumentNumber"
                                        label={'Sila pilih nama Penyokong untuk meluluskan pertukaran ini'}
                                        bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                        bind:errors={$endorserDetailErrors.supporterIdentityDocumentNumber}
                                        options={data.lookup.supporterDropdown}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .assignEndorser !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="approverRoleCode"
                                        label={'Sila pilih peranan yang layak memberi kelulusan bagi pertukaran ini'}
                                        bind:val={$endorserDetailForm.approverRoleCode}
                                        bind:errors={$endorserDetailErrors.approverRoleCode}
                                        options={data.lookup.roleDropdown}
                                        onValueChange={async () => {
                                            data.lookup.approverDropdown =
                                                await getEndorserDropdown(
                                                    $endorserDetailForm.approverRoleCode ??
                                                        '',
                                                );
                                        }}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .assignEndorser !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="approverIdentityDocumentNumber"
                                        label={'Sila pilih nama Pelulus untuk meluluskan pertukaran ini'}
                                        bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                        bind:errors={$endorserDetailErrors.approverIdentityDocumentNumber}
                                        options={data.lookup.approverDropdown}
                                        disabled={data.props
                                            .currentApplicationDetails
                                            .assignEndorser !== null ||
                                            data.props.layoutData.accountDetails
                                                .currentRoleCode !==
                                                RoleConstant.urusSetiaPerjawatan
                                                    .code}
                                    ></CustomSelectField>
                                {:else}
                                    <CustomSelectField
                                        id="supporterRoleCode"
                                        label={'Peranan Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.supporterRoleCode}
                                        bind:errors={$endorserDetailErrors.supporterRoleCode}
                                        options={data.lookup.roleDropdown}
                                        disabled
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        id="supporterName"
                                        label={'Nama Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.supporterName}
                                        bind:errors={$endorserDetailErrors.supporterName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        id="supporterIdentityDocumentNumber"
                                        label={'No. Kad Pengenalan Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                        bind:errors={$endorserDetailErrors.supporterIdentityDocumentNumber}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        id="approverRoleCode"
                                        label={'Peranan Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.approverRoleCode}
                                        bind:errors={$endorserDetailErrors.approverRoleCode}
                                        options={data.lookup.roleDropdown}
                                        disabled
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        id="approverName"
                                        label={'Nama Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.approverName}
                                        bind:errors={$endorserDetailErrors.approverName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        id="approverIdentityDocumentNumber"
                                        label={'No. Kad Pengenalan Penyokong Permohonan Penangguhan'}
                                        bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                        bind:errors={$endorserDetailErrors.approverIdentityDocumentNumber}
                                    ></CustomTextField>
                                {/if}
                            </form>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- TRANSFER SUPPORT -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Penyokong">
                    {#if data.props.currentApplicationDetails.support?.isDraft && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.support?.identityDocumentNumber}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="supporterFeedbackForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <form
                                    id="supporterFeedbackForm"
                                    method="POST"
                                    use:supporterFeedbackEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <CustomRadioBoolean
                                        id="status"
                                        label="Permohonan Penangguhan Pertukaran Pegawai Di Atas Adalah:"
                                        bind:val={$supporterFeedbackForm.status}
                                        bind:errors={$supporterFeedbackErrors.status}
                                        options={supportAltOptions}
                                        disabled={!data.props
                                            .currentApplicationDetails.support
                                            ?.isDraft ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .support
                                                    ?.identityDocumentNumber}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="remark"
                                        label="Ulasan"
                                        type="textarea"
                                        isRequired={false}
                                        bind:val={$supporterFeedbackForm.remark}
                                        bind:errors={$supporterFeedbackErrors.remark}
                                        disabled={!data.props
                                            .currentApplicationDetails.support
                                            ?.isDraft ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .support
                                                    ?.identityDocumentNumber}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="name"
                                        label="Nama Penyokong"
                                        type="text"
                                        bind:val={$supporterFeedbackForm.name}
                                        bind:errors={$supporterFeedbackErrors.name}
                                        disabled
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="date"
                                        label="Tarikh Maklum Balas Dihantar"
                                        type="date"
                                        bind:val={$supporterFeedbackForm.identityDocumentNumber}
                                        bind:errors={$supporterFeedbackErrors.identityDocumentNumber}
                                        disabled
                                    ></CustomTextField>
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            <!-- ======================================================================= -->
            <!-- TRANSFER APPROVAL -->
            <!-- ======================================================================= -->
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Pelulus">
                    {#if data.props.currentApplicationDetails.approval?.isDraft && data.props.layoutData.accountDetails.identityDocumentNumber == data.props.currentApplicationDetails.approval?.identityDocumentNumber}
                        <TextIconButton
                            label="Hantar"
                            type="primary"
                            icon="check"
                            form="approverFeedbackForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                        >
                            <!-- form wrapper starts here -->
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2"
                            >
                                <form
                                    id="approverFeedbackForm"
                                    method="POST"
                                    use:approverFeedbackEnhance
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <CustomRadioBoolean
                                        id="status"
                                        label="Permohonan Penangguhan Pertukaran Pegawai Di Atas Adalah:"
                                        bind:val={$approverFeedbackForm.status}
                                        bind:errors={$approverFeedbackErrors.status}
                                        options={approveAltOptions}
                                        disabled={!data.props
                                            .currentApplicationDetails.approval
                                            ?.isDraft ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .approval
                                                    ?.identityDocumentNumber}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="remark"
                                        label="Ulasan"
                                        type="textarea"
                                        isRequired={false}
                                        bind:val={$approverFeedbackForm.remark}
                                        bind:errors={$approverFeedbackErrors.remark}
                                        disabled={!data.props
                                            .currentApplicationDetails.approval
                                            ?.isDraft ||
                                            data.props.layoutData.accountDetails
                                                .identityDocumentNumber !==
                                                data.props
                                                    .currentApplicationDetails
                                                    .approval
                                                    ?.identityDocumentNumber}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="name"
                                        label="Nama Penyokong"
                                        type="text"
                                        bind:val={$approverFeedbackForm.name}
                                        bind:errors={$approverFeedbackErrors.name}
                                        disabled
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="date"
                                        label="Tarikh Maklum Balas Dihantar"
                                        type="date"
                                        bind:val={$approverFeedbackForm.identityDocumentNumber}
                                        bind:errors={$approverFeedbackErrors.identityDocumentNumber}
                                        disabled
                                    ></CustomTextField>
                                </form>
                            </div>
                            <!-- form wrapper ends here -->
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
