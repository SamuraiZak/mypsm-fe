<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { zod } from 'sveltekit-superforms/adapters';
    import { Toaster } from 'svelte-french-toast';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import type {
        LoanDownload,
        UploadDocuments,
    } from '$lib/dto/mypsm/pinjaman/document.dto';
    import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
    import {
        _applyLoan,
        _approverApprovalSubmit,
        _approverSubmit,
        _documentCheckDetailSubmit,
        _eligibilityDetailSubmit,
        _fileToBase64Object,
        _firstScheduleDetailSubmit,
        _loanDetailSubmit,
        _offerLoanDetailSubmit,
        _secondScheduleDetailSubmit,
        _submitAgreementDocument,
        _submitDocument,
        _submitPaymentDocument,
        _supportApprovalSubmit,
        _vehicleDetailSubmit,
        _vehicleFirstScheduleDetailSubmit,
    } from './+page';
    import {
        _approver,
        _approverApproval,
        _documentCheck,
        _eligibility,
        _firstSchedule,
        _loanDetail,
        _offerLoan,
        _personalDetail,
        _secondSchedule,
        _supportApproval,
        _vehicleDetail,
        _vehicleFirstSchedule,
    } from '$lib/schemas/mypsm/loan/loan-application';
    import { Alert } from 'flowbite-svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;
    let files: FileList;
    const loanVehicleDocument: LoanDownload = data.loanDocument.data?.details;
    const loanAgreementDocument: LoanDownload =
        data.loanAgreementLetter.data?.details;
    const loanPaymentDocument: LoanDownload = data.loanPayment.data?.details;
    let filesPayment: FileList;

    let notpelulus: boolean = true;
    let notketuaSeksyen: boolean = true;
    let notloanDetail: boolean = true;
    let noturusetia: boolean = true;
    let notkakitangan: boolean = true;

    if (data.props.userMode == 'pelulus') {
        notpelulus = false;
    }

    if (data.props.userMode == 'ketua Seksyen') {
        notketuaSeksyen = false;
    }

    if (data.props.userMode == 'urusetia') {
        noturusetia = false;
    }

    if (data.props.userMode == 'kakitangan') {
        notkakitangan = false;
    }

    if (
        data.props.userMode == 'kakitangan' ||
        data.props.userMode == 'urusetia'
    ) {
        notloanDetail = false;
    }

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let Documents: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitDocument(JSON.stringify(Documents));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function uploadAgreementDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let uploadAgreementDocument: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitAgreementDocument(
                        JSON.stringify(uploadAgreementDocument),
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function uploadPayment() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let paymentDocuments: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitPaymentDocument(JSON.stringify(paymentDocuments));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
        isTainted: personalDetailTainted,
    } = superForm(data.forms.personalDetailForm, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_personalDetail),
    });

    const {
        form: loanInfoForm,
        errors: loanInfoError,
        enhance: loanInfoEnhance,
        isTainted: loanDetailTainted,
    } = superForm(data.forms.loanDetailsForm, {
        SPA: true,
        id: 'loanDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_loanDetail),
        onSubmit() {
            _loanDetailSubmit($loanInfoForm);
        },
    });
    const {
        form: vehicleInfoForm,
        errors: vehicleInfoError,
        enhance: vehicleInfoEnhance,
        isTainted: vehicleDetailTainted,
    } = superForm(data.forms.vehicleDetailsForm, {
        SPA: true,
        id: 'vehicleDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_vehicleDetail),
        onSubmit() {
            $vehicleInfoForm.id = data.props.currentApplicationId;
            _vehicleDetailSubmit($vehicleInfoForm);
        },
    });

    const {
        form: approverInfoForm,
        errors: approverInfoError,
        enhance: approverInfoEnhance,
        isTainted: approverDetailTainted,
    } = superForm(data.forms.approverDetailsForm, {
        SPA: true,
        id: 'approverDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_approver),
        onSubmit() {
            $approverInfoForm.id = data.props.currentApplicationId;
            _approverSubmit($approverInfoForm);
        },
    });

    const {
        form: approvalAndOfferDetailForm,
        errors: approvalAndOfferDetailError,
        enhance: approvalAndOfferDetailEnhance,
        isTainted: approvalAndOfferDetailtaimted,
    } = superForm(data.forms.offerLoanForm, {
        SPA: true,
        id: 'offerLoan',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_offerLoan),
        onSubmit() {
            $approvalAndOfferDetailForm.id = data.props.currentApplicationId;
            _offerLoanDetailSubmit($approvalAndOfferDetailForm);
        },
    });

    const {
        form: vehicleFirstScheduleForm,
        errors: vehicleFirstScheduleError,
        enhance: vehicleFirstScheduleEnhance,
        isTainted: vehicleFirstScheduleTainted,
    } = superForm(data.forms.vehicleFirstScheduleDetailsForm, {
        SPA: true,
        id: 'vehicleFirstSchedule',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_vehicleFirstSchedule),
        onSubmit() {
            $vehicleFirstScheduleForm.id = data.props.currentApplicationId;
            _vehicleFirstScheduleDetailSubmit($vehicleFirstScheduleForm);
        },
    });

    const {
        form: firstScheduleForm,
        errors: firstScheduleError,
        enhance: firstScheduleEnhance,
        isTainted: firstScheduleTainted,
    } = superForm(data.forms.firstScheduleDetailsForm, {
        SPA: true,
        id: 'firstScheduleDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_firstSchedule),
        onSubmit() {
            $firstScheduleForm.id = data.props.currentApplicationId;
            _firstScheduleDetailSubmit($firstScheduleForm);
        },
    });

    const {
        form: secondScheduleForm,
        errors: secondScheduleError,
        enhance: secondScheduleEnhance,
        isTainted: secondScheduleTainted,
    } = superForm(data.forms.secondScheduleDetailsForm, {
        SPA: true,
        id: 'secondScheduleDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_secondSchedule),
        onSubmit() {
            $secondScheduleForm.id = data.props.currentApplicationId;
            _secondScheduleDetailSubmit($secondScheduleForm);
        },
    });

    const {
        form: eligibilityForm,
        errors: eligibilityError,
        enhance: eligibilityEnhance,
        isTainted: eligibilityTainted,
    } = superForm(data.forms.eligibilityDetailsForm, {
        SPA: true,
        id: 'eligibiltyDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_eligibility),
        onSubmit() {
            $eligibilityForm.id = data.props.currentApplicationId;
            _eligibilityDetailSubmit($eligibilityForm);
        },
    });

    const {
        form: documentCheckForm,
        errors: documentCheckError,
        enhance: documentCheckEnhance,
        isTainted: documentCheckTainted,
    } = superForm(data.forms.documentCheckDetailsForm, {
        SPA: true,
        id: 'documentCheckDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_documentCheck),
        onSubmit() {
            $documentCheckForm.id = data.props.currentApplicationId;
            _documentCheckDetailSubmit($documentCheckForm);
        },
    });

    const {
        form: supporterApprovalForm,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
        isTainted: supporterApprovalTainted,
    } = superForm(data.forms.supporterApprovalDetailsForm, {
        SPA: true,
        id: 'supporterApprovalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_supportApproval),
        onSubmit() {
            $supporterApprovalForm.id = data.props.currentApplicationId;
            _supportApprovalSubmit($supporterApprovalForm);
        },
    });

    const {
        form: approverApprovalForm,
        errors: approverApprovalError,
        enhance: approverApprovalEnhance,
        isTainted: approverApprovalTainted,
    } = superForm(data.forms.approverApprovalDetailsForm, {
        SPA: true,
        id: 'approverApprovalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_approverApproval),
        onSubmit() {
            $approverApprovalForm.id = data.props.currentApplicationId;
            _approverApprovalSubmit($approverApprovalForm);
        },
    });

    const handleDownload = async (url: string) => {
        await LoanServices.getAgreementForm(url);
    };

    function apply() {
        _applyLoan().then((value) => {
            if (value?.response.status == 'success') {
                let applicationId: number = value?.response.data?.details.id;
                let url =
                    '/pinjaman-dan-kuarters/pinjaman/permohonan/kenderaan/' +
                    applicationId;
                goto(url);
            }
        });
    }
</script>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam">
            <!-- {data.props.currentApplicationId} -->
            <TextIconButton
                label="Kembali"
                onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
            />
            {#if data.props.currentApplicationId == 0}
                <TextIconButton
                    label="Teruskan"
                    icon="check"
                    onClick={() => {
                        apply();
                    }}
                ></TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-4 p-4"
            >
                {#if data.props.currentApplicationId == 0}
                    <div class="flex w-full flex-col gap-10 lg:w-1/2">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Arahan :</span>
                                Sila isi semak butiran anda dan klik butang Teruskan
                                untuk meneruskan proses permohonan pinjaman anda.
                            </p>
                        </Alert>
                    </div>
                {/if}
                <form
                    id="personalFormStepper"
                    method="POST"
                    use:personalInfoEnhance
                    class="flex w-full flex-col gap-2 lg:w-1/2"
                >
                    <CustomTextField
                        id="name"
                        disabled
                        label={'Nama Penuh'}
                        bind:val={$personalInfoForm.name}
                    ></CustomTextField>
                    <CustomTextField
                        id="identityDocumentNumber"
                        disabled
                        label={'No. K/P'}
                        bind:val={$personalInfoForm.identityDocumentNumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="birthDate"
                        type="date"
                        disabled
                        label={'Tarikh Lahir'}
                        bind:val={$personalInfoForm.birthDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="age"
                        disabled
                        label={'Umur Pada Tarikh Memohon'}
                        bind:val={$personalInfoForm.age}
                    ></CustomTextField>
                    <CustomSelectField
                        id="positionId"
                        disabled
                        label={'Jawatan Sekarang'}
                        options={data.positionLookup}
                        bind:val={$personalInfoForm.positionId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="serviceGroupId"
                        disabled
                        label={'Kumpulan Perkhidmatan'}
                        options={data.serviceGroupLookup}
                        bind:val={$personalInfoForm.serviceGroupId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="gradeId"
                        disabled
                        label={'Gred Jawatan'}
                        options={data.gradeLookup}
                        bind:val={$personalInfoForm.gradeId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="schemeId"
                        disabled
                        label={'Skim'}
                        options={data.schemeLookup}
                        bind:val={$personalInfoForm.schemeId}
                    ></CustomSelectField>
                    <CustomTextField
                        id="serviceDate"
                        disabled
                        label={'Tarikh Perkhidmatan'}
                        bind:val={$personalInfoForm.serviceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="confirmServiceDate"
                        disabled
                        label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                        bind:val={$personalInfoForm.confirmServiceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="baseSalary"
                        disabled
                        label={'Gaji Pokok'}
                        bind:val={$personalInfoForm.baseSalary}
                    ></CustomTextField>
                    <CustomTextField
                        id="allowance"
                        disabled
                        label={'Jumlah Elaun-elaun'}
                        bind:val={$personalInfoForm.allowance}
                    ></CustomTextField>
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    {#if data.props.currentApplicationId !== 0}
        <StepperContent>
            <StepperContentHeader title="Maklumat Pinjaman">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                <TextIconButton
                    label="Simpan"
                    icon="check"
                    form="loanInfoForm"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="loanInfoForm"
                    method="POST"
                    use:loanInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                        disabled={noturusetia}
                        id="maxLoan"
                        label={'Had Permohonan'}
                        errors={$loanInfoError.maxLoan}
                        bind:val={$loanInfoForm.maxLoan}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notloanDetail}
                        id="requestedLoan"
                        label={'Jumlah yang Dipohon (RM)'}
                        errors={$loanInfoError.requestedLoan}
                        bind:val={$loanInfoForm.requestedLoan}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notloanDetail}
                        id="paymentPeriod"
                        label={'Tempoh Pembayaran'}
                        errors={$loanInfoError.paymentPeriod}
                        bind:val={$loanInfoForm.paymentPeriod}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notloanDetail}
                        id="reason"
                        label={'Ulasan'}
                        errors={$loanInfoError.reason}
                        bind:val={$loanInfoForm.reason}
                    ></CustomTextField>
                </form></StepperContentBody
            >
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kenderaan yang Hendak Dibeli">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                <TextIconButton
                    label="Simpan"
                    icon="check"
                    form="vehicleDetail"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="vehicleDetail"
                    method="POST"
                    use:vehicleInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                        disabled={notkakitangan}
                        id="condition"
                        label={'Kondisi Kenderaan'}
                        errors={$vehicleInfoError.condition}
                        bind:val={$vehicleInfoForm.condition}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="vehicleType"
                        label={'Jenis Kenderaan'}
                        errors={$vehicleInfoError.vehicleType}
                        bind:val={$vehicleInfoForm.vehicleType}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="brandModel"
                        label={'Jenama Model Kenderaan'}
                        errors={$vehicleInfoError.brandModel}
                        bind:val={$vehicleInfoForm.brandModel}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="engineNumber"
                        label={'Sukatan Silinder/ No. Chasis/ No. Enjin'}
                        errors={$vehicleInfoError.engineNumber}
                        bind:val={$vehicleInfoForm.engineNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        type="date"
                        id="registrationDate"
                        label={'Tarikh Pendaftaran'}
                        errors={$vehicleInfoError.registrationDate}
                        bind:val={$vehicleInfoForm.registrationDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="registrationNumber"
                        label={'Nombor Pendaftaran'}
                        errors={$vehicleInfoError.registrationNumber}
                        bind:val={$vehicleInfoForm.registrationNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="nettPrice"
                        label={'Harga Bersih (RM)'}
                        errors={$vehicleInfoError.nettPrice}
                        bind:val={$vehicleInfoForm.nettPrice}
                    ></CustomTextField>
                </form></StepperContentBody
            >
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan yang Berkaitan">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                {#if data.props.userMode == 'kakitangan'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadDocument()}
                    />
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Fail-fail yang dimuat naik:</span>
                    </div>
                    {#if data.props.userMode == 'kakitangan'}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2"
                        >
                            <CustomFileField
                                label="Dokumen Sokongan"
                                id="employeeClaimDocument"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {/if}

                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2"
                    >
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan Kontrak"
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanVehicleDocument.document !== null}
                            {#each loanVehicleDocument.document as docs}
                                <div
                                    class="flex w-full flex-row items-center justify-between space-y-2.5"
                                >
                                    <label
                                        for=""
                                        class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    ></label>
                                    <a
                                        href={docs.document}
                                        download={docs.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{docs.name}</a
                                    >
                                </div>
                            {/each}
                        {/if}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pelulus Peminjam">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="approverDetail"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                >
                    <ContentHeader title="Masukkan Nama Penyokong dan Pelulus"
                    ></ContentHeader>

                    <form
                        id="approverDetail"
                        method="POST"
                        use:approverInfoEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <CustomSelectField
                            disabled={noturusetia}
                            id="approverName"
                            label={'Nama Pelulus'}
                            options={data.supporterApproverLookup}
                            bind:val={$approverInfoForm.approverId}
                        ></CustomSelectField>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- kemaskini -->

        <StepperContent>
            <StepperContentHeader title="Tetapan Pelulus">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
                >
                <ContentHeader title="Keputusan Dari Ketua Seksyen">
                    {#if data.props.userMode == 'ketua Seksyen'}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="supporterApprovalDetail"
                    ></TextIconButton>
                    {/if}
                </ContentHeader>

                <form
                    id="supporterApprovalDetail"
                    method="POST"
                    use:supporterApprovalEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                        disabled={notketuaSeksyen}
                        id="remark"
                        label="Tindakan/ Ulasan"
                        errors={$supporterApprovalError.remark}
                        bind:val={$supporterApprovalForm.remark}
                    />

                    <CustomRadioBoolean
                        disabled={notketuaSeksyen}
                        id="status"
                        label="Status"
                        errors={$supporterApprovalError.status}
                        bind:val={$supporterApprovalForm.status}
                    />
                </form>
                   
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
                >
                <ContentHeader title="Keputusan Dari Pelulus">
                    {#if data.props.userMode == 'pelulus'}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="approverApprovalDetail"
                    ></TextIconButton>
                    {/if}
                </ContentHeader>
                <form
                    id="approverApprovalDetail"
                    method="POST"
                    use:approverApprovalEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                        disabled={notpelulus}
                        id="remark"
                        label="Tindakan / Ulasan"
                        errors={$approverApprovalError.remark}
                        bind:val={$approverApprovalForm.remark}
                    />

                    <CustomRadioBoolean
                        disabled={notpelulus}
                        id="status"
                        label="Status"
                        errors={$approverApprovalError.status}
                        bind:val={$approverApprovalForm.status}
                    />
                </form>
                </div></StepperContentBody
            >
        </StepperContent>
        {#if data.props.userMode == 'urusetia' || data.props.userMode == 'pelulus' || data.props.userMode == 'ketua Seksyen'}
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Jadual Pertama Dan Jadual Kedua"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                    /></StepperContentHeader
                >
                <CustomTab id="schedule">
                    <CustomTabContent title="Jadual Pertama">
                        <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <div class="h-full w-full overflow-y-auto pb-10">
                            <ContentHeader
                                title="Masukkan Maklumat dan Perihal Kenderaan"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    form="vehicleFirstSchedule"
                                ></TextIconButton>
                            </ContentHeader>
                            <form
                                id="vehicleFirstSchedule"
                                method="POST"
                                use:vehicleFirstScheduleEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="engineNumber"
                                    label="No. Enjin"
                                    errors={$vehicleFirstScheduleError.engineNumber}
                                    bind:val={$vehicleFirstScheduleForm.engineNumber}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="chassisNumber"
                                    label="No. Casis"
                                    errors={$vehicleFirstScheduleError.chassisNumber}
                                    bind:val={$vehicleFirstScheduleForm.chassisNumber}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="countryOrigin"
                                    label="Buatan"
                                    errors={$vehicleFirstScheduleError.countryOrigin}
                                    bind:val={$vehicleFirstScheduleForm.countryOrigin}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="brandModel"
                                    label="Nama Model"
                                    errors={$vehicleFirstScheduleError.brandModel}
                                    bind:val={$vehicleFirstScheduleForm.brandModel}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="engineHP"
                                    label="Kuasa Enjin"
                                    errors={$vehicleFirstScheduleError.engineHP}
                                    bind:val={$vehicleFirstScheduleForm.engineHP}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="fuelType"
                                    label="Bahan Bakar"
                                    errors={$vehicleFirstScheduleError.fuelType}
                                    bind:val={$vehicleFirstScheduleForm.fuelType}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="class"
                                    label="Kelas Kegunaan"
                                    errors={$vehicleFirstScheduleError.class}
                                    bind:val={$vehicleFirstScheduleForm.class}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="bodyType"
                                    label="Jenis Badan"
                                    errors={$vehicleFirstScheduleError.bodyType}
                                    bind:val={$vehicleFirstScheduleForm.bodyType}
                                />

                                <CustomTextField
                                    disabled={noturusetia}
                                    id="makeYear"
                                    label="Tahun Dibuat"
                                    errors={$vehicleFirstScheduleError.makeYear}
                                    bind:val={$vehicleFirstScheduleForm.makeYear}
                                />
                                <ContentHeader
                                    title="Masukkan Butiran Penjualan/Tuan Asal"
                                ></ContentHeader>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5"
                                >
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="previousOwner"
                                        label="Nama"
                                        errors={$vehicleFirstScheduleError.previousOwner}
                                        bind:val={$vehicleFirstScheduleForm.previousOwner}
                                    />
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="previousOwnerIC"
                                        label="No. K/P"
                                        errors={$vehicleFirstScheduleError.previousOwnerIC}
                                        bind:val={$vehicleFirstScheduleForm.previousOwnerIC}
                                    />
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="address"
                                        label="Alamat"
                                        errors={$vehicleFirstScheduleError.address}
                                        bind:val={$vehicleFirstScheduleForm.address}
                                    />
                                </div>
                            </form>
                            <ContentHeader
                                title="Masukkan Harga Belian Kenderaan"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    form="firstScheduleDetail"
                                ></TextIconButton>
                            </ContentHeader>

                            <form
                                id="firstScheduleDetail"
                                method="POST"
                                use:firstScheduleEnhance
                            >
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="purchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                    errors={$firstScheduleError.purchasePrice}
                                    bind:val={$firstScheduleForm.purchasePrice}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="balancePayment"
                                    label="Bayaran Baki (RM)"
                                    errors={$firstScheduleError.balancePayment}
                                    bind:val={$firstScheduleForm.balancePayment}
                                />
                                <CustomTextField
                                    disabled={noturusetia}
                                    id="govFund"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                    errors={$firstScheduleError.govFund}
                                    bind:val={$firstScheduleForm.govFund}
                                />
                            </form>
                        </div>
                    </CustomTabContent>
                    <CustomTabContent title="Jadual Kedua">
                        <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <div class="h-full w-full overflow-y-auto pb-10">
                            <ContentHeader
                                title="Masukkan Maklumat Harga Jualan (RM)"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    form="secondScheduleDetail"
                                ></TextIconButton>
                            </ContentHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <form
                                    id="secondScheduleDetail"
                                    method="POST"
                                    use:secondScheduleEnhance
                                    class="flex w-full flex-col gap-2"
                                >
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="sellingPrice"
                                        label="Jumlah Harga Belian (RM)"
                                        errors={$secondScheduleError.sellingPrice}
                                        bind:val={$secondScheduleForm.sellingPrice}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="sellingBalance"
                                        label="Bayaran Baki (RM)"
                                        errors={$secondScheduleError.sellingBalance}
                                        bind:val={$secondScheduleForm.sellingBalance}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="govFund"
                                        label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                        errors={$secondScheduleError.govFund}
                                        bind:val={$secondScheduleForm.govFund}
                                    ></CustomTextField>

                                    <ContentHeader
                                        title="Masukkan Amaun dan Tempoh Bayaran Balik Harga Jualan"
                                    ></ContentHeader>
                                    <div
                                        class="flex w-full flex-col items-start justify-start gap-2.5"
                                    >
                                        <CustomTextField
                                            disabled={noturusetia}
                                            id="installment"
                                            label="Amaun Bulanan (RM)"
                                            errors={$secondScheduleError.installment}
                                            bind:val={$secondScheduleForm.installment}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={noturusetia}
                                            id="paymentPeriod"
                                            label={'Tempoh Pembayaran'}
                                            errors={$secondScheduleError.paymentPeriod}
                                            bind:val={$secondScheduleForm.paymentPeriod}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            </StepperContent>
        {/if}

        <StepperContent>
            <StepperContentHeader title="Surat Tawaran">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    ></div>
                    <div
                        class="flex h-fit w-full flex-col justify-center gap-2"
                    >
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 px-2"
                        >
                            <ContentHeader
                                title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan Kontrak"
                                borderClass="border-none"
                            />
                            <span
                                class="text-sm text-ios-labelColors-secondaryLabel-light"
                                >Sila Muat turun dan pastikan dokumen diisi
                                dengan lengkap dan ditandatangani sebelum
                                dihantar kepada Urus Setia:</span
                            >

                            <!-- <DownloadAttachment
                                triggerDownload={() =>
                                    handleDownload(data.props.agreementLetter)}
                                fileName="Surat Perjanjian Pinjaman Kenderaan.pdf"
                            /> -->

                            <div
                                class="flex w-full flex-row items-center justify-between space-y-2.5"
                            >
                                <label
                                    for=""
                                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                ></label>
                                <a
                                    href={data.documentDetailsVehicle.data
                                        ?.details.document}
                                    download={data.documentDetailsVehicle.data
                                        ?.details.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{data.documentDetailsVehicle.data?.details
                                        .name}</a
                                >
                            </div>
                        </div>
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Surat Perjanjian">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                {#if data.props.userMode == 'kakitangan'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadAgreementDocument()}
                    />
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Fail-fail yang dimuat naik:</span>
                    </div>
                    {#if data.props.userMode == 'kakitangan'}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2"
                        >
                            <CustomFileField
                                label="Dokumen Sokongan"
                                id="employeeClaimDocument"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {/if}

                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2"
                    >
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan Kontrak"
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanAgreementDocument.document  !== null}
                            {#each loanAgreementDocument.document as docs}
                                <div
                                    class="flex w-full flex-row items-center justify-between space-y-2.5"
                                >
                                    <label
                                        for=""
                                        class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    ></label>
                                    <a
                                        href={docs.document}
                                        download={docs.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{docs.name}</a
                                    >
                                </div>
                            {/each}
                        {/if}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
        {#if data.props.userMode == 'urusetia' || data.props.userMode == 'pelulus' || data.props.userMode == 'ketua Seksyen'}
            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Pinjaman">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                    /></StepperContentHeader
                >
                <StepperContentBody>
                    <CustomTab>
                        <CustomTabContent title="Maklumat Kelayakan">
                            <ContentHeader title="Maklumat Kelayakan"
                                ><TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    form="eligibiltyDetail"
                                ></TextIconButton></ContentHeader
                            >
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <p class="text-sm text-system-primary">
                                    Gaji Pokok Sahaja
                                </p>
                                <form
                                    id="eligibiltyDetail"
                                    method="POST"
                                    use:eligibilityEnhance
                                    class="flex w-full flex-col gap-2"
                                >
                                    <CustomTextField
                                        disabled
                                        id="baseSalary"
                                        label={'Gaji Pokok (RM)'}
                                        errors={$eligibilityError.baseSalary}
                                        bind:val={$eligibilityForm.baseSalary}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        type="number"
                                        id="salaryCut"
                                        label={'Potongan (RM)'}
                                        errors={$eligibilityError.salaryCut}
                                        bind:val={$eligibilityForm.salaryCut}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        id="balance"
                                        type="number"
                                        label={'Baki (RM)'}
                                        errors={$eligibilityError.balance}
                                        bind:val={$eligibilityForm.balance}
                                    ></CustomTextField>
                                    <p class="text-sm text-system-primary">
                                        Gaji Pokok dan Elaun
                                    </p>
                                    <CustomTextField
                                        disabled
                                        id="salaryAndAllowance"
                                        label={'Gaji Pokok dan Elaun (RM)'}
                                        errors={$eligibilityError.salaryAndAllowance}
                                        bind:val={$eligibilityForm.salaryAndAllowance}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled={noturusetia}
                                        type="number"
                                        id="newSalaryCut"
                                        label={'Potongan Baru (RM)'}
                                        errors={$eligibilityError.newSalaryCut}
                                        bind:val={$eligibilityForm.newSalaryCut}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        type="number"
                                        id="newBalance"
                                        label={'Baki (RM)'}
                                        errors={$eligibilityError.newBalance}
                                        bind:val={$eligibilityForm.newBalance}
                                    ></CustomTextField>
                                </form>
                            </div>
                        </CustomTabContent>
                        <CustomTabContent
                            title="Maklumat Kelulusan dan Tawaran"
                        >
                            <ContentHeader
                                title="Masukkan Maklumat Kelulusan dan Tawaran"
                                ><TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    form="offerLoan"
                                ></TextIconButton></ContentHeader
                            >

                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <form
                                    id="offerLoan"
                                    method="POST"
                                    use:approvalAndOfferDetailEnhance
                                    class="flex w-full flex-col gap-2"
                                >
                                    <CustomTextField
                                        disabled
                                        id="loanType"
                                        label="Jenis Belian"
                                        errors={$approvalAndOfferDetailError.loanType}
                                        bind:val={$approvalAndOfferDetailForm.loanType}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="purchasePrice"
                                        label="Harga Belian Dengan Kerajaan (RM)"
                                        errors={$approvalAndOfferDetailError.purchasePrice}
                                        bind:val={$approvalAndOfferDetailForm.purchasePrice}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="deposit"
                                        label="Bayaran Muka (RM)"
                                        errors={$approvalAndOfferDetailError.deposit}
                                        bind:val={$approvalAndOfferDetailForm.deposit}
                                    ></CustomTextField>
                                    <!-- value={upfront} -->

                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="govProfit"
                                        label="Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)"
                                        errors={$approvalAndOfferDetailError.govProfit}
                                        bind:val={$approvalAndOfferDetailForm.govProfit}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="govFund"
                                        label="Amaun Pembiayaan Kerajaan (RM)"
                                        errors={$approvalAndOfferDetailError.govFund}
                                        bind:val={$approvalAndOfferDetailForm.govFund}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="sellingPrice"
                                        label="Harga Jualan Kepada Pegawai (RM)"
                                        errors={$approvalAndOfferDetailError.sellingPrice}
                                        bind:val={$approvalAndOfferDetailForm.sellingPrice}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="installment"
                                        label="Ansuran Bulanan (RM)"
                                        errors={$approvalAndOfferDetailError.installment}
                                        bind:val={$approvalAndOfferDetailForm.installment}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="startLoanDate"
                                        type="date"
                                        label="Tarikh Mula"
                                        errors={$approvalAndOfferDetailError.startLoanDate}
                                        bind:val={$approvalAndOfferDetailForm.startLoanDate}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="paymentPeriod"
                                        label="Tempoh (Bulan)"
                                        errors={$approvalAndOfferDetailError.paymentPeriod}
                                        bind:val={$approvalAndOfferDetailForm.paymentPeriod}
                                    ></CustomTextField>
                                </form>
                            </div>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            </StepperContent>
        {/if}
        <StepperContent>
            <StepperContentHeader title="Senarai Semak Surat Perjanjian">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="documentCheckDetail"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Masukkan Maklumat Senarai Semak Surat Perjanjian"
                ></ContentHeader>
                <form
                    id="documentCheckDetail"
                    method="POST"
                    use:documentCheckEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                    >
                        <CustomRadioBoolean
                            disabled={noturusetia}
                            id="agreementReceived"
                            label="Diterima"
                            bind:val={$documentCheckForm.agreementReceived}
                        ></CustomRadioBoolean>

                        <CustomRadioBoolean
                            disabled={noturusetia}
                            id="agreementChecked"
                            label="Disemak"
                            bind:val={$documentCheckForm.agreementChecked}
                        ></CustomRadioBoolean>
                    </div>
                </form></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Resit dan Invois">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
                />
                {#if data.props.userMode == 'kakitangan'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadPayment()}
                    />
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Fail-fail yang dimuat naik:</span>
                    </div>
                    {#if data.props.userMode == 'kakitangan'}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2"
                        >
                            <CustomFileField
                                label="Dokumen Sokongan"
                                id="employeeClaimDocument"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {/if}

                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2"
                    >
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan "
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanPaymentDocument.document  !== null}
                            {#each loanPaymentDocument.document as docs}
                                <div
                                    class="flex w-full flex-row items-center justify-between space-y-2.5"
                                >
                                    <label
                                        for=""
                                        class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    ></label>
                                    <a
                                        href={docs.document}
                                        download={docs.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{docs.name}</a
                                    >
                                </div>
                            {/each}
                        {/if}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>
<Toaster />
