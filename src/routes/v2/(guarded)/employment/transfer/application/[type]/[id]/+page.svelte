<script lang="ts">
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import DocumentInput from '$lib/components/document-input/DocumentInput.svelte';
    import SuratPertukaran from '$lib/components/letter/SuratPertukaran.svelte';
    import SingleChoiceInput from '$lib/components/inputs/single-choice-input/SingleChoiceInput.svelte';

    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import type { PageData } from './$types';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
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
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';

    export let data: PageData;

    let selectedValue: string = 'Disokong tanpa pengganti';

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
        id: 'transferDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationTransferDetailSchema),
        onSubmit(input) {},
    });

    // applicationConfirmation
    const {
        form: applicationConfirmationForm,
        errors: applicationConfirmationErrors,
        enhance: applicationConfirmationEnhance,
    } = superForm(data.forms.applicationConfirmationForm, {
        id: 'applicationConfirmationForm',
        SPA: true,
        validators: zodClient(TransferApplicationConfirmationSchema),
        onSubmit(input) {},
    });

    // assignDirector
    const {
        form: assignDirectorForm,
        errors: assignDirectorErrors,
        enhance: assignDirectorEnhance,
    } = superForm(data.forms.assignDirectorForm, {
        id: 'assignDirectorForm',
        SPA: true,
        validators: zodClient(TransferApplicationAssignDirectorSchema),
        onSubmit(input) {},
    });

    // directorSupport
    const {
        form: directorSupportForm,
        errors: directorSupportErrors,
        enhance: directorSupportEnhance,
    } = superForm(data.forms.directorSupportForm, {
        id: 'directorSupportForm',
        SPA: true,
        validators: zodClient(TransferApplicationDirectorSupportSchema),
        onSubmit(input) {},
    });

    // meetingResult
    const {
        form: meetingResultForm,
        errors: meetingResultErrors,
        enhance: meetingResultEnhance,
    } = superForm(data.forms.meetingResultForm, {
        id: 'meetingResultForm',
        SPA: true,
        validators: zodClient(TransferApplicationMeetingResultSchema),
        onSubmit(input) {},
    });

    // acceptanceLetterDetail
    const {
        form: acceptanceLetterDetailForm,
        errors: acceptanceLetterDetailErrors,
        enhance: acceptanceLetterDetailEnhance,
    } = superForm(data.forms.acceptanceLetterDetailForm, {
        id: 'acceptanceLetterDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationAcceptanceLetterDetailSchema),
        onSubmit(input) {},
    });

    // postponeDetail
    const {
        form: postponeDetailForm,
        errors: postponeDetailErrors,
        enhance: postponeDetailEnhance,
    } = superForm(data.forms.postponeDetailForm, {
        id: 'postponeDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationPostponeDetailSchema),
        onSubmit(input) {},
    });

    // assignPostponeApprover
    const {
        form: assignPostponeApproverForm,
        errors: assignPostponeApproverErrors,
        enhance: assignPostponeApproverEnhance,
    } = superForm(data.forms.assignPostponeApproverForm, {
        id: 'assignPostponeApproverForm',
        SPA: true,
        validators: zodClient(TransferApplicationAssignPostponeApproverSchema),
        onSubmit(input) {},
    });

    // postponeApproval
    const {
        form: postponeApprovalForm,
        errors: postponeApprovalErrors,
        enhance: postponeApprovalEnhance,
    } = superForm(data.forms.postponeApprovalForm, {
        id: 'postponeApprovalForm',
        SPA: true,
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {},
    });

    // postponeLetterDetail
    const {
        form: postponeLetterDetailForm,
        errors: postponeLetterDetailErrors,
        enhance: postponeLetterDetailEnhance,
    } = superForm(data.forms.postponeLetterDetailForm, {
        id: 'postponeLetterDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationPostponeLetterDetailSchema),
        onSubmit(input) {},
    });

    // transferDocument
    const {
        form: transferDocumentForm,
        errors: transferDocumentErrors,
        enhance: transferDocumentEnhance,
    } = superForm(data.forms.transferDocumentForm, {
        id: 'transferDocumentForm',
        SPA: true,
        validators: zodClient(TransferApplicationTransferDocumentSchema),
        onSubmit(input) {},
    });

    // endorserDetail
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationEndorserDetailSchema),
        onSubmit(input) {},
    });

    // supporterFeedback
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.forms.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {},
    });

    // approverFeedback
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.forms.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        validators: zodClient(TransferApplicationEndorsementSchema),
        onSubmit(input) {},
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
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Permohonan Pertukaran - Permohonan Sendiri">
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/employment/transfer');
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
                                class="flex w-full flex-col items-start justify-start gap-1"
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
                                class="flex w-full flex-col items-start justify-start gap-1"
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
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <SingleChoiceInput
                                    id="category"
                                    label="Jenis Pertukaran"
                                    choices={data.lookup.transferCategoryOption}
                                    bind:val={$transferDetailForm.category}
                                    bind:errors={$transferDetailErrors.category}
                                ></SingleChoiceInput>
                                <CustomTextField
                                    id="appliedLocation"
                                    label="Penempatan Bertukar"
                                    bind:val={$transferDetailForm.appliedLocation}
                                    bind:errors={$transferDetailErrors.appliedLocation}
                                ></CustomTextField>
                                <SingleChoiceInput
                                    id="reason"
                                    label="Alasan Pertukaran"
                                    choices={data.lookup.transferReasonOption}
                                    bind:val={$transferDetailForm.reason}
                                    bind:errors={$transferDetailErrors.reason}
                                ></SingleChoiceInput>
                                <CustomTextField
                                    id="remark"
                                    label="Sila Berikan Penjelasan Sekiranya Anda Memilih Lain-lain Sebagai Alasan Pertukaran"
                                    bind:val={$transferDetailForm.remark}
                                    bind:errors={$transferDetailErrors.remark}
                                ></CustomTextField>

                                <p class="text-base font-medium text-slate-700">
                                    Sekiranya Alasan Pertukaran Pemohon Kerana
                                    Mengikut Pasangan Sila Isikan Maklumat
                                    Pasangan Seperti Berikut:
                                </p>

                                <CustomTextField
                                    id="workPlaceDistance"
                                    type="number"
                                    label="Jarak Tempat Kerja (KM)"
                                    bind:val={$transferDetailForm.remark}
                                    bind:errors={$transferDetailErrors.remark}
                                ></CustomTextField>
                                <CustomTextField
                                    id="employerName"
                                    type="text"
                                    label="Nama Majikan"
                                    bind:val={$transferDetailForm.employerName}
                                    bind:errors={$transferDetailErrors.employerName}
                                ></CustomTextField>
                                <CustomTextField
                                    id="startDate"
                                    type="date"
                                    label="Tarikh Pasangan Mula Berkhidmat Di Penempatan Sekarang"
                                    isRequired={false}
                                    bind:val={$transferDetailForm.startDate}
                                    bind:errors={$transferDetailErrors.startDate}
                                ></CustomTextField>
                                <DocumentInput
                                    bind:documents={$transferDetailForm.documents}
                                    label="Sila Muat Naik Dokumen-dokumen Sokongan"
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
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                            class="flex w-full flex-col items-start justify-start gap-4 p-2"
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
                                        bind:value={$applicationConfirmationForm.status}
                                        class="rounded focus:outline-none focus:ring-0"
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
        <!-- ======================================================================= -->
        <!-- ASSIGN DIRECTOR -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Lantikan Peraku Permohonan">
                <TextIconButton label="Hantar" type="draft" icon="save"
                ></TextIconButton>
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
                            <CustomSelectField
                                id="identityDocumentNumber"
                                label={'Sila pilih peranan peraku permohonan ini'}
                                bind:val={$assignDirectorForm.identityDocumentNumber}
                                bind:errors={$assignDirectorErrors.identityDocumentNumber}
                                options={data.lookup.roleDropdown}
                            ></CustomSelectField>
                            <CustomSelectField
                                id="identityDocumentNumber"
                                label={'Sila pilih Peraku Permohonan untuk memberi sokongan bagi permohonan ini'}
                                bind:val={$assignDirectorForm.identityDocumentNumber}
                                bind:errors={$assignDirectorErrors.identityDocumentNumber}
                                options={data.lookup.directorDrodpwon}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="directorName"
                                label={'Nama Peraku Permohonan'}
                                bind:val={$assignDirectorForm.directorName}
                                bind:errors={$assignDirectorErrors.directorName}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- DIRECTOR SUPPORT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pengarah Bahagian/Negeri">
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
                                id="directorSupportForm"
                                method="POST"
                                use:directorSupportEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <p class="text-base font-medium text-slate-700">
                                    Saya mengesahkan bahawa maklumat yang
                                    diberikan adalah benar. Oleh itu saya
                                    memperakukan permohonan ini seperti ulasan
                                    berikut:
                                </p>
                                <SingleChoiceInput
                                    id="feedback"
                                    label="Maklum Balas Pengarah"
                                    choices={data.lookup.directorFeedbackOption}
                                    bind:val={$directorSupportForm.feedback}
                                    bind:errors={$directorSupportErrors.feedback}
                                ></SingleChoiceInput>

                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    bind:val={$directorSupportForm.remark}
                                    bind:errors={$directorSupportErrors.remark}
                                ></CustomTextField>

                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 py-2 pb-4"
                                >
                                    <div
                                        class="flex w-full flex-row items-center justify-between"
                                    >
                                        <p
                                            class=" w-full text-start text-base font-medium text-slate-700"
                                        >
                                            Senarai Laporan Tatatertib
                                        </p>
                                    </div>
                                    {#each $directorSupportForm.ethicalIssues as item, index}
                                        <div
                                            class="flex w-full flex-col items-start justify-start rounded-md border border-slate-200 bg-slate-100 p-4"
                                        >
                                            <div
                                                class="flex w-full flex-row items-center justify-between py-2"
                                            >
                                                <p
                                                    class="text-base font-semibold text-slate-700"
                                                >
                                                    Laporan Tatatertib {index +
                                                        1}
                                                </p>
                                                <button
                                                    type="button"
                                                    on:click={() => {
                                                        removeEthicalIssuesDetail(
                                                            index,
                                                        );
                                                    }}
                                                >
                                                    <span>
                                                        <SvgXMark></SvgXMark>
                                                    </span>
                                                </button>
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
                                                          ]?.punishment
                                                        : undefined}
                                                    bind:val={item.punishment}
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
                                                ></CustomTextField>
                                            </div>
                                        </div>
                                    {/each}
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
                                </div>

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
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- MEETING RESULT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
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
                                ></CustomTextField>
                                <CustomTextField
                                    id="meetingDate"
                                    label="Tarikh Mesyuarat"
                                    type="date"
                                    bind:val={$meetingResultForm.meetingDate}
                                    bind:errors={$meetingResultErrors.meetingDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Keputusan Mesyuarat Permohonan Ini Adalah:"
                                    bind:val={$meetingResultForm.status}
                                    bind:errors={$meetingResultErrors.status}
                                    options={approveOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    bind:val={$meetingResultForm.remark}
                                    bind:errors={$meetingResultErrors.remark}
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
            <StepperContentHeader title="Butiran Surat Pertukaran">
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
                            <SuratPertukaran></SuratPertukaran>
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
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="postponeDetailForm"
                                method="POST"
                                use:postponeDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Adakah Anda Ingin Memohon Penangguhan Tarikh Pertukaran"
                                    options={commonOptions}
                                    bind:val={$postponeDetailForm.status}
                                    bind:errors={$postponeDetailErrors.status}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    bind:val={$postponeDetailForm.remark}
                                    bind:errors={$postponeDetailErrors.remark}
                                ></CustomTextField>
                                <DocumentInput
                                    bind:documents={$postponeDetailForm.documents}
                                    label="Sila Muat Naik Surat Permohonan Penangguhan"
                                ></DocumentInput>
                                <CustomTextField
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
        <!-- ======================================================================= -->
        <!-- ASSIGN POSTPONE APPROVER -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Lantikan Penyokong Permohonan Penangguhan"
            >
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="assignPostponeApproverForm"
                                method="POST"
                                use:assignPostponeApproverEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomSelectField
                                    id="identityDocumentNumber"
                                    label={'Sila pilih penyokong untuk memberi sokongan bagi permohonan penangguhan pertukaran ini'}
                                    bind:val={$assignPostponeApproverForm.identityDocumentNumber}
                                    bind:errors={$assignPostponeApproverErrors.identityDocumentNumber}
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    id="directorName"
                                    label={'Nama Penyokong'}
                                    bind:val={$assignPostponeApproverForm.directorName}
                                    bind:errors={$assignPostponeApproverErrors.directorName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan'}
                                    bind:val={$assignPostponeApproverForm.identityDocumentNumber}
                                    bind:errors={$assignPostponeApproverErrors.identityDocumentNumber}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- POSTPONE APPROVAL -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Sokongan Permohonan Penangguhan">
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="postponeApprovalForm"
                                method="POST"
                                use:postponeApprovalEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Permohonan Penangguhan Pertukaran Pegawai Di Atas Adalah:"
                                    bind:val={$postponeApprovalForm.status}
                                    bind:errors={$postponeApprovalErrors.status}
                                    options={supportAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    bind:val={$postponeApprovalForm.remark}
                                    bind:errors={$postponeApprovalErrors.remark}
                                ></CustomTextField>
                                <CustomTextField
                                    id="name"
                                    label="Nama Penyokong"
                                    type="text"
                                    bind:val={$postponeApprovalForm.name}
                                    bind:errors={$postponeApprovalErrors.name}
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    bind:val={$postponeApprovalForm.identityDocumentNumber}
                                    bind:errors={$postponeApprovalErrors.identityDocumentNumber}
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
            <StepperContentHeader title="Butiran Surat Penangguhan Pertukaran">
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="postponeLetterDetailForm"
                                method="POST"
                                use:postponeLetterDetailEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            ></form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- TRANSFER ITINERARY -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Dokumen Keperluan Pertukaran">
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="transferDocumentForm"
                                method="POST"
                                use:transferDocumentEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <DocumentInput
                                    bind:documents={$transferDocumentForm.documents}
                                    label="Sila Muat Naik Salinan Borang-borang yang Telah Diisi"
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
            <StepperContentHeader title="Lantikan Penyokong dan Pelulus">
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="endorserDetailForm"
                                method="POST"
                                use:endorserDetailEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomSelectField
                                    id="supporterIdentityDocumentNumber"
                                    label={'Sila Pilih Penyokong Untuk Menyokong Pertukaran Ini'}
                                    bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                    bind:errors={$endorserDetailErrors.supporterIdentityDocumentNumber}
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomSelectField
                                    id="identityDocumentNumber"
                                    label={'Sila Pilih Pelulus Untuk Meluluskan Pertukaran Ini'}
                                    bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                    bind:errors={$endorserDetailErrors.approverIdentityDocumentNumber}
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    id="supporterName"
                                    label={'Nama Penyokong'}
                                    bind:val={$endorserDetailForm.supporterName}
                                    bind:errors={$endorserDetailErrors.supporterName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan Penyokong'}
                                    bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                    bind:errors={$endorserDetailErrors.supporterIdentityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="approverName"
                                    label={'Nama Penyokong'}
                                    bind:val={$endorserDetailForm.approverName}
                                    bind:errors={$endorserDetailErrors.approverName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="approverIdentityDocumentNumber"
                                    label={'No Kad Pengenalan Pelulus'}
                                    bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                    bind:errors={$endorserDetailErrors.approverIdentityDocumentNumber}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- TRANSFER SUPPORT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Penyokong">
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                id="supporterFeedbackForm"
                                method="POST"
                                use:supporterFeedbackEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Pertukaran Pegawai Di Atas Adalah:"
                                    val={null}
                                    options={supportAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    val=""
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
                <TextIconButton label="Hantar" type="primary" icon="check"
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
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Pertukaran Pegawai Di Atas Adalah:"
                                    val={null}
                                    options={approveAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
