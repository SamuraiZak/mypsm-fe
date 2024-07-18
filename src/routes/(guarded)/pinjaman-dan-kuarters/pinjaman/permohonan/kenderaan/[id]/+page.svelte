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
        _fileToBase64Object,
        _firstScheduleDetailSubmit,
        _loanDetailSubmit,
        _secondScheduleDetailSubmit,
        _submitAgreementDocument,
        _submitCalculation,
        _submitDocument,
        _submitOfferLetter,
        _submitPaymentDocument,
        _submitVoucher,
        _supportApprovalSubmit,
        _vehicleDetailSubmit,
        _vehicleFirstScheduleDetailSubmit,
    } from './+page';
    import {
        _approver,
        _approverApproval,
        _firstSchedule,
        _loanDetail,
        _personalDetail,
        _secondSchedule,
        _supportApproval,
        _vehicleDetail,
        _vehicleFirstSchedule,
    } from '$lib/schemas/mypsm/loan/loan-application';
    import { Alert } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import { vehicleConditionOption } from '$lib/constants/core/dropdown.constant';
    import { PrintHelper } from '$lib/helpers/print-helper/print-helper';

    export let data: PageData;
    let files: FileList;
    const loanVehicleDocument: LoanDownload = data.loanDocument.data?.details;
    const loanAgreementDocument: LoanDownload =
        data.loanAgreementLetter.data?.details;
    const loanPaymentDocument: LoanDownload = data.loanPayment.data?.details;

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

    function uploadCalculation() {
        if (files == undefined) {
            alert('Dokumen tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let Documents: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitCalculation(JSON.stringify(Documents));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                    let offerLetter: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitOfferLetter(JSON.stringify(offerLetter));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function uploadOfferLetter() {
        if (files == undefined) {
            alert('Dokumen tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let paymentDocuments: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitOfferLetter(JSON.stringify(paymentDocuments));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function uploadVoucher() {
        if (files == undefined) {
            alert('Dokumen tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let paymentDocuments: UploadDocuments = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitVoucher(JSON.stringify(paymentDocuments));
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
        form: vehicleFirstScheduleForm,
        errors: vehicleFirstScheduleError,
        enhance: vehicleFirstScheduleEnhance,
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
        form: supporterApprovalForm,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
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

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pinjaman Kenderaan">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() => goto('/pinjaman-dan-kuarters/pinjaman/')}
        />
    </ContentHeader>
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam">
            <!-- {data.props.currentApplicationId} -->
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
                        isRequired={false}
                        label={'Nama Penuh'}
                        bind:val={$personalInfoForm.name}
                    ></CustomTextField>
                    <CustomTextField
                        id="identityDocumentNumber"
                        disabled
                        isRequired={false}
                        label={'No. K/P'}
                        bind:val={$personalInfoForm.identityDocumentNumber}
                    ></CustomTextField>
                    <CustomTextField
                        id="birthDate"
                        type="date"
                        disabled
                        isRequired={false}
                        label={'Tarikh Lahir'}
                        bind:val={$personalInfoForm.birthDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="age"
                        disabled
                        isRequired={false}
                        label={'Umur Pada Tarikh Memohon'}
                        bind:val={$personalInfoForm.age}
                    ></CustomTextField>
                    <CustomSelectField
                        id="positionId"
                        disabled
                        isRequired={false}
                        label={'Jawatan Sekarang'}
                        options={data.positionLookup}
                        bind:val={$personalInfoForm.positionId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="serviceGroupId"
                        disabled
                        isRequired={false}
                        label={'Kumpulan Perkhidmatan'}
                        options={data.serviceGroupLookup}
                        bind:val={$personalInfoForm.serviceGroupId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="gradeId"
                        disabled
                        isRequired={false}
                        label={'Gred Jawatan'}
                        options={data.gradeLookup}
                        bind:val={$personalInfoForm.gradeId}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="schemeId"
                        disabled
                        isRequired={false}
                        label={'Skim'}
                        options={data.schemeLookup}
                        bind:val={$personalInfoForm.schemeId}
                    ></CustomSelectField>
                    <CustomTextField
                        id="serviceDate"
                        disabled
                        isRequired={false}
                        label={'Tarikh Perkhidmatan'}
                        bind:val={$personalInfoForm.serviceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="confirmServiceDate"
                        disabled
                        isRequired={false}
                        label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                        bind:val={$personalInfoForm.confirmServiceDate}
                    ></CustomTextField>
                    <CustomTextField
                        id="baseSalary"
                        disabled
                        isRequired={false}
                        label={'Gaji Pokok (RM)'}
                        bind:val={$personalInfoForm.baseSalary}
                    ></CustomTextField>
                    <CustomTextField
                        id="allowance"
                        disabled
                        placeholder=""
                        isRequired={false}
                        label={'Jumlah Elaun-elaun (RM)'}
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
                    label="Hantar"
                    icon="check"
                    form="loanInfoForm"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full justify-end">
                    <TextIconButton
                        label="Cetak"
                        icon="print"
                        onClick={() =>
                            PrintHelper.handleExportPDF('loanInfoForm')}
                    />
                </div>
                <form
                    id="loanInfoForm"
                    method="POST"
                    use:loanInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <div class="hidden">
                        <CustomTextField
                            id="name"
                            disabled
                            isRequired={false}
                            label={'Nama Kakitangan'}
                            bind:val={$personalInfoForm.name}
                        ></CustomTextField>
                        <CustomTextField
                            id="identityDocumentNumber"
                            disabled
                            isRequired={false}
                            label={'No. K/P'}
                            bind:val={$personalInfoForm.identityDocumentNumber}
                        ></CustomTextField>
                    </div>
                    <CustomTextField
                        disabled={noturusetia}
                        id="maxLoan"
                        label={'Had Permohonan (RM)'}
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
                        label={'Tempoh Pembayaran (Bulan)'}
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
            <StepperContentHeader title="Maklumat Pengiraan">
                <TextIconButton
                    label="Hantar"
                    icon="check"
                    onClick={() => uploadCalculation()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                >
                    <span>Fail-fail yang perlu dimuat naik:</span>
                    <span>1. Maklumat pinjaman yang telah dicetak beserta pengiraan</span>
                </div>
                {#if data.props.userMode == 'urusetia'}
                    <div
                        class="flex h-fit w-full flex-col justify-center gap-2"
                    >
                        <CustomFileField
                            label=""
                            id="loanCalculation"
                            bind:files
                        ></CustomFileField>
                    </div>
                {/if}
                {#if data.props.loanCalculation.document}
                    {#each data.props.loanCalculation.document as calculation}
                        <a
                            href={calculation.document}
                            download={calculation.name}
                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                            >{calculation.name}</a
                        >
                    {/each}
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Kenderaan yang Hendak Dibeli">
                <TextIconButton
                    label="Hantar"
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
                    <!-- dropdown -->
                    <CustomSelectField
                        disabled={notkakitangan}
                        id="condition"
                        label={'Kondisi Kenderaan'}
                        options={vehicleConditionOption}
                        errors={$vehicleInfoError.condition}
                        bind:val={$vehicleInfoForm.condition}
                    ></CustomSelectField>
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
                    <!-- nullable -->
                    <CustomTextField
                        disabled={notkakitangan}
                        id="engineNumber"
                        isRequired={false}
                        label={'Sukatan Silinder/ No. Chasis/ No. Enjin'}
                        errors={$vehicleInfoError.engineNumber}
                        bind:val={$vehicleInfoForm.engineNumber}
                    ></CustomTextField>
                    <!-- nullable -->
                    <CustomTextField
                        disabled={notkakitangan}
                        type="date"
                        id="registrationDate"
                        isRequired={false}
                        label={'Tarikh Pendaftaran'}
                        errors={$vehicleInfoError.registrationDate}
                        bind:val={$vehicleInfoForm.registrationDate}
                    ></CustomTextField>
                    <!-- nullable -->
                    <CustomTextField
                        disabled={notkakitangan}
                        id="registrationNumber"
                        label={'Nombor Pendaftaran'}
                        isRequired={false}
                        errors={$vehicleInfoError.registrationNumber}
                        bind:val={$vehicleInfoForm.registrationNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={notkakitangan}
                        id="nettPrice"
                        label={'Harga Jualan (RM)'}
                        errors={$vehicleInfoError.nettPrice}
                        bind:val={$vehicleInfoForm.nettPrice}
                    ></CustomTextField>
                </form></StepperContentBody
            >
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan yang Berkaitan">
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
                    class="flex w-full flex-col justify-start gap-4 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Fail-fail yang perlu dimuat naik:</span>
                        <span>1. Slip Gaji</span>
                        <span>2. Sebut Harga</span>
                        <span>3. Salinan Kad Pengenalan</span>
                        <span>4. Lesen Memandu</span>
                        <span class="flex flex-row items-center gap-2"
                            >5.

                            <a
                                href={data.documentDetailsVehicle.data?.details
                                    .document}
                                download={data.documentDetailsVehicle.data
                                    ?.details.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{data.documentDetailsVehicle.data?.details
                                    .name}</a
                            >
                        </span>
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

                    <div class="flex w-full flex-col justify-start gap-2.5">
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan"
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanVehicleDocument.document !== null}
                            {#each loanVehicleDocument.document as docs}
                                <div class="flex w-full flex-col justify-start">
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
                    type="primary"
                    label="Hantar"
                    icon="check"
                    form="approverDetail"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                >
                    <ContentHeader
                        title="Masukkan Nama Penyokong dan Pelulus"
                        borderClass="border-none"
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
                            label={'Pelulus'}
                            options={data.supporterApproverLookup}
                            bind:val={$approverInfoForm.approverId}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={noturusetia}
                            id="approverName"
                            label={'Ketua Seksyen'}
                            options={data.supporterApproverLookup}
                            bind:val={$approverInfoForm.approverId}
                        ></CustomSelectField>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- kemaskini -->

        <StepperContent>
            <StepperContentHeader title="Tetapan Pelulus"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <ContentHeader
                        title="Keputusan Dari Ketua Seksyen"
                        borderClass="border-none"
                    >
                        {#if data.props.userMode == 'ketua Seksyen'}
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                icon="check"
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
                    <ContentHeader
                        title="Keputusan Dari Pelulus"
                        borderClass="border-none"
                    >
                        {#if data.props.userMode == 'pelulus'}
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                icon="check"
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
      
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Jadual Pertama Dan Jadual Kedua"
                ></StepperContentHeader>
                <CustomTab id="schedule">
                    <CustomTabContent
                        title="Jadual Pertama"
                        paddingClass="p-2.5 pb-16"
                    >
                        <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <div class="flex w-full flex-col gap-3">
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-md border border-ios-activeColors-activeBlue-dark p-3"
                            >
                                <ContentHeader
                                    title="Masukkan Maklumat dan Perihal Kenderaan"
                                    borderClass="border-none"
                                >
                                    <TextIconButton
                                        type="primary"
                                        label="Hantar"
                                        icon="check"
                                        form="vehicleFirstSchedule"
                                    ></TextIconButton>
                                </ContentHeader>
                                <form
                                    id="vehicleFirstSchedule"
                                    method="POST"
                                    use:vehicleFirstScheduleEnhance
                                    class="flex w-full flex-col gap-2"
                                >
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        isRequired={false}
                                        id="engineNumber"
                                        label="No. Enjin"
                                        errors={$vehicleFirstScheduleError.engineNumber}
                                        bind:val={$vehicleFirstScheduleForm.engineNumber}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="chassisNumber"
                                        isRequired={false}
                                        label="No. Casis"
                                        errors={$vehicleFirstScheduleError.chassisNumber}
                                        bind:val={$vehicleFirstScheduleForm.chassisNumber}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="countryOrigin"
                                        isRequired={false}
                                        label="Buatan"
                                        errors={$vehicleFirstScheduleError.countryOrigin}
                                        bind:val={$vehicleFirstScheduleForm.countryOrigin}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="brandModel"
                                        isRequired={false}
                                        label="Nama Model"
                                        errors={$vehicleFirstScheduleError.brandModel}
                                        bind:val={$vehicleFirstScheduleForm.brandModel}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="engineHP"
                                        isRequired={false}
                                        label="Kuasa Enjin"
                                        errors={$vehicleFirstScheduleError.engineHP}
                                        bind:val={$vehicleFirstScheduleForm.engineHP}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="fuelType"
                                        isRequired={false}
                                        label="Bahan Bakar"
                                        errors={$vehicleFirstScheduleError.fuelType}
                                        bind:val={$vehicleFirstScheduleForm.fuelType}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="class"
                                        isRequired={false}
                                        label="Kelas Kegunaan"
                                        errors={$vehicleFirstScheduleError.class}
                                        bind:val={$vehicleFirstScheduleForm.class}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="bodyType"
                                        isRequired={false}
                                        label="Jenis Badan"
                                        errors={$vehicleFirstScheduleError.bodyType}
                                        bind:val={$vehicleFirstScheduleForm.bodyType}
                                    />
                                    <!-- nullable -->
                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="makeYear"
                                        isRequired={false}
                                        label="Tahun Dibuat"
                                        errors={$vehicleFirstScheduleError.makeYear}
                                        bind:val={$vehicleFirstScheduleForm.makeYear}
                                    />
                                    <ContentHeader
                                        title="Masukkan Butiran Penjualan/Tuan Asal"
                                        borderClass="border-none"
                                    ></ContentHeader>
                                    <div
                                        class="flex w-full flex-col items-start justify-start gap-2.5"
                                    >
                                        <CustomTextField
                                            disabled={noturusetia}
                                            id="previousOwner"
                                            label="Nama Syarikat"
                                            errors={$vehicleFirstScheduleError.previousOwner}
                                            bind:val={$vehicleFirstScheduleForm.previousOwner}
                                        />
                                        <!-- nullable -->
                                        <CustomTextField
                                            disabled={noturusetia}
                                            id="previousOwnerIC"
                                            isRequired={false}
                                            label="No. Kad Pengenalan"
                                            errors={$vehicleFirstScheduleError.previousOwnerIC}
                                            bind:val={$vehicleFirstScheduleForm.previousOwnerIC}
                                        />
                                        <CustomTextField
                                            disabled={noturusetia}
                                            id="address"
                                            label="Alamat Syarikat"
                                            errors={$vehicleFirstScheduleError.address}
                                            bind:val={$vehicleFirstScheduleForm.address}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div
                                class="flex w-full flex-col gap-2.5 rounded-md border border-ios-activeColors-activeBlue-dark p-3"
                            >
                                <ContentHeader
                                    title="Masukkan Harga Belian Kenderaan"
                                    borderClass="border-none"
                                >
                                    <TextIconButton
                                        type="primary"
                                        label="Hantar"
                                        icon="check"
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
                                        label="Bayaran Muka (RM)"
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
                        </div>
                    </CustomTabContent>

                    <CustomTabContent title="Jadual Kedua">
                        <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                        <div
                            class="flex w-full flex-col gap-2.5 rounded-md border border-ios-activeColors-activeBlue-dark p-3"
                        >
                            <ContentHeader
                                title="Masukkan Maklumat Harga Jualan (RM)"
                                borderClass="border-none"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Hantar"
                                    icon="check"
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
                                        label="Jumlah Harga Jualan (RM)"
                                        errors={$secondScheduleError.sellingPrice}
                                        bind:val={$secondScheduleForm.sellingPrice}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled={noturusetia}
                                        id="sellingBalance"
                                        label="Bayaran Muka (RM)"
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
                                        borderClass="border-none"
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
                                            label={'Tempoh Pembayaran (Bulan)'}
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
      

        <!-- This stepper is for US upload signed surat perjanjian from dokumen sokongan stepper-->
        <StepperContent>
            <StepperContentHeader title="Surat Tawaran">
                {#if data.props.userMode == 'urusetia'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadOfferLetter()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-3 p-3">
                    <div
                        class="flex w-full flex-col gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Fail-fail yang perlu dimuat naik oleh Urus Setia:</span
                        >
                        <span
                            >1. Surat Perjanjian Pinjaman (telah diisi oleh
                            kakitangan)</span
                        >
                        <span>2. Memorandum Penerimaan</span>
                    </div>
                    {#if data.props.userMode == 'urusetia'}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2"
                        >
                            <CustomFileField
                                label=""
                                id="employeeOfferLetter"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {/if}
                    {#if data.props.loanOfferLetter.document}
                        {#each data.props.loanOfferLetter.document as offer}
                            <a
                                href={offer.document}
                                download={offer.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{offer.name}</a
                            >
                        {/each}
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Surat Perjanjian">
                {#if data.props.userMode == 'kakitangan'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadAgreementDocument()}
                    />
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-4 p-3">
                    <div
                        class="flex w-full flex-col gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Fail-fail yang perlu dimuat naik oleh kakitangan:</span
                        >
                        <span>1. Memorandum Penerimaan</span>
                        <span>2. Surat Perjanjian</span>
                        <span>3. Duti Setem (Lembaga Hasil Dalam Negeri)</span>
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

                    <div class="flex w-full flex-col justify-start gap-2.5">
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan"
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanAgreementDocument.document !== null}
                            {#each loanAgreementDocument.document as docs}
                                <div class="flex w-full flex-col items-center">
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
            <StepperContentHeader title="Kemaskini Pembiayaan Pinjaman">
                {#if data.props.userMode == 'urusetia'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadVoucher()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-3 p-3">
                    <div
                        class="flex w-full flex-col gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Fail-fail yang perlu dimuat naik oleh Urus Setia:</span
                        >
                        <span>1. Baucar</span>
                    </div>
                    {#if data.props.userMode == 'urusetia'}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2"
                        >
                            <CustomFileField
                                label=""
                                id="employeeVoucher"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {/if}
                    {#if data.props.loanVoucher.document}
                        {#each data.props.loanVoucher.document as voucher}
                            <a
                                href={voucher.document}
                                download={voucher.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{voucher.name}</a
                            >
                        {/each}
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Resit dan Invois">
                {#if data.props.userMode == 'kakitangan'}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadPayment()}
                    />
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 p-3">
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light gap-2"
                    >
                        <span>Fail-fail yang dimuat naik:</span>
                        <span>1. Resit atau Invois</span>
                        <span>2. Polisi Insurans (Cover Note Insurans)</span>
                        <span>3. Geran</span>
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

                    <div class="flex w-full flex-col justify-start gap-2.5">
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan "
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanPaymentDocument.document !== null}
                            {#each loanPaymentDocument.document as docs}
                                <div class="flex w-full flex-col justify-start">
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
