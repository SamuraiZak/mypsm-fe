<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { Alert, Modal } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { zod, zodClient } from 'sveltekit-superforms/adapters';
    import { Toaster } from 'svelte-french-toast';
    import type {
        LoanDownload,
        UploadDocuments,
    } from '$lib/dto/mypsm/pinjaman/document.dto';
    import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';

    import {
        _approver,
        _approverApproval,
        _firstSchedule,
        _loanDetail,
        _personalDetail,
        _secondSchedule,
        _supplier,
        _supportApproval,
        _vehicleDetail,
        _vehicleFirstSchedule,
    } from '$lib/schemas/mypsm/loan/loan-application';
    import type { SupplierElement } from '$lib/dto/mypsm/pinjaman/supplier-detail.dto';
    import {
        _fileToBase64Object,
        _submitDocument,
        _submitAgreementDocument,
        _submitPaymentDocument,
        _loanDetailSubmit,
        _vehicleDetailSubmit,
        _approverSubmit,
        // _offerLoanDetailSubmit,
        _vehicleFirstScheduleDetailSubmit,
        _firstScheduleDetailSubmit,
        _supplierSubmit,
        _secondScheduleDetailSubmit,
        // _eligibilityDetailSubmit,
        // _documentCheckDetailSubmit,
        _supportApprovalSubmit,
        _approverApprovalSubmit,
        _applyLoan,
        _submitOfferLetter,
        _submitCalculation,
        _submitVoucher,
    } from './+page';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { PrintHelper } from '$lib/helpers/print-helper/print-helper';

    export let data: PageData;
    const loanComputerDocument: LoanDownload = data.loanDocument.data?.details;
    const loanAgreementDocument: LoanDownload =
        data.loanAgreementLetter.data?.details;
    const loanPaymentDocument: LoanDownload = data.loanPayment.data?.details;
    let files: FileList;
    let openModal: boolean = false;

    let notpelulus: boolean = true;
    let notketuaSeksyen: boolean = true;
    let notvehicleDetail: boolean = true;
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
        notvehicleDetail = false;
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
        resetForm: false,
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
        validationMethod: 'oninput',
        validators: zodClient(_loanDetail),
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

    // const {
    //     form: approvalAndOfferDetailForm,
    //     errors: approvalAndOfferDetailError,
    //     enhance: approvalAndOfferDetailEnhance,
    //     isTainted: approvalAndOfferDetailtaimted,
    // } = superForm(data.forms.offerLoanForm, {
    //     SPA: true,
    //     id: 'offerLoan',
    //     dataType: 'json',
    //     multipleSubmits: 'allow',
    //     resetForm: false,
    //     validationMethod: 'oninput',
    //     validators: zod(_offerLoan),
    //     onSubmit() {
    //         $approvalAndOfferDetailForm.id = data.props.currentApplicationId;
    //         _offerLoanDetailSubmit($approvalAndOfferDetailForm);
    //     },
    // });

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
        form: supplierForm,
        errors: supplierError,
        enhance: supplierEnhance,
        isTainted: supplierTainted,
    } = superForm(data.forms.supplierDetailsForm, {
        SPA: true,
        id: 'supplierDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        resetForm: false,
        validators: zod(_supplier),
        onSubmit() {
            $supplierForm.id = data.props.currentApplicationId;
            _supplierSubmit($supplierForm);
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

    // const {
    //     form: eligibilityForm,
    //     errors: eligibilityError,
    //     enhance: eligibilityEnhance,
    //     isTainted: eligibilityTainted,
    // } = superForm(data.forms.eligibilityDetailsForm, {
    //     SPA: true,
    //     id: 'eligibiltyDetail',
    //     dataType: 'json',
    //     resetForm: false,
    //     multipleSubmits: 'allow',
    //     validationMethod: 'oninput',
    //     validators: zod(_eligibility),
    //     onSubmit() {
    //         $eligibilityForm.id = data.props.currentApplicationId;
    //         _eligibilityDetailSubmit($eligibilityForm);
    //     },
    // });

    // const {
    //     form: documentCheckForm,
    //     errors: documentCheckError,
    //     enhance: documentCheckEnhance,
    //     isTainted: documentCheckTainted,
    // } = superForm(data.forms.documentCheckDetailsForm, {
    //     SPA: true,
    //     id: 'documentCheckDetail',
    //     dataType: 'json',
    //     multipleSubmits: 'allow',
    //     resetForm: false,
    //     validationMethod: 'oninput',
    //     validators: zod(_documentCheck),
    //     onSubmit() {
    //         $documentCheckForm.id = data.props.currentApplicationId;
    //         _documentCheckDetailSubmit($documentCheckForm);
    //     },
    // });
    const {
        form: supporterApprovalForm,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
        isTainted: supporterApprovalTainted,
    } = superForm(data.forms.supporterApprovalDetailsForm, {
        SPA: true,
        id: 'supporterApprovalDetail',
        dataType: 'json',
        resetForm: false,
        multipleSubmits: 'allow',
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
    let tempSupplier: SupplierElement = {
        name: '',
        address: '',
    };
    function addSupplier() {
        $supplierForm.suppliers = [...$supplierForm.suppliers, tempSupplier];
        tempSupplier = { name: '', address: '' };
    }
    function removeSupplier(index: number) {
        $supplierForm.suppliers.splice(index, 1);

        $supplierForm.suppliers = [...$supplierForm.suppliers];
    }

    async function apply() {
        let applicationId: number = 0;
        let url: string = '';
        const response = await _applyLoan().then((value) => {
            if (value?.response.status == 'success') {
                applicationId = value?.response.data?.details.id;
                url =
                    '/pinjaman-dan-kuarters/pinjaman/permohonan/komputer_dan_telefon_pintar/' +
                    applicationId;
            }
        }).finally(() => {
            setTimeout(() => goto(url, { replaceState: true }), 1000);
        });
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
        <StepperContentHeader
            title="Maklumat Peminjam"
        >
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
                        label={'Gaji Pokok'}
                        bind:val={$personalInfoForm.baseSalary}
                    ></CustomTextField>
                    <CustomTextField
                        id="allowance"
                        disabled
                        placeholder=""
                        isRequired={false}
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
                <TextIconButton label="Hantar" icon="check" form="loanDetail" />
            </StepperContentHeader>
            <StepperContentBody>
                <div class="w-full flex justify-end">
                    <TextIconButton
                        label="Cetak"
                        icon="print"
                        onClick={() => PrintHelper.handleExportPDF("loanDetail")}
                    />
                </div>
                <form
                    id="loanDetail"
                    method="POST"
                    use:loanInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                <!-- max 5k -->
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
                        id="maxLoan"
                        label={'Had Permohonan'}
                        type="number"
                        errors={$loanInfoError.maxLoan}
                        bind:val={$loanInfoForm.maxLoan}
                    ></CustomTextField>
                    <CustomTextField
                        id="requestedLoan"
                        label={'Jumlah yang Dipohon (RM)'}
                        errors={$loanInfoError.requestedLoan}
                        bind:val={$loanInfoForm.requestedLoan}
                    ></CustomTextField>
                    <!-- 48 months -->
                    <CustomTextField
                        id="paymentPeriod"
                        label={'Tempoh Pembayaran (Bulan)'}
                        errors={$loanInfoError.paymentPeriod}
                        bind:val={$loanInfoForm.paymentPeriod}
                    ></CustomTextField>
                    <CustomTextField
                        id="reason"
                        label={'Ulasan'}
                        errors={$loanInfoError.reason}
                        bind:val={$loanInfoForm.reason}
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
                {/if}
                </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-4 p-3"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light gap-2"
                    >
                        <span>Fail-fail yang perlu dimuat naik:</span>
                        <span>1. Slip Gaji</span>
                        <span>2. Sebut Harga</span>
                        <span>3. Salinan Kad Pengenalan</span>

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
                        class="flex w-full flex-col justify-start gap-2.5"
                    >
                        <ContentHeader
                            title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan"
                            borderClass="border-none"
                        />
                        <span
                            class="text-sm text-ios-labelColors-secondaryLabel-light"
                            >Borang-borang yang telah dimuat naik oleh
                            kakitangan:</span
                        >
                        {#if loanComputerDocument.document !== null && loanComputerDocument.document !== undefined }
                            {#each loanComputerDocument.document as docs}
                                <div
                                    class="flex flex-col justify-start gap-2.5"
                                >
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
            <StepperContentHeader title="Pelulus Peminjam">
                {#if data.props.userMode == 'urusetia'}
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    icon="check"
                    form="approverDetail"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                >
                    <ContentHeader title="Masukkan Nama Penyokong dan Pelulus" borderClass="border-none"/>

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

        <StepperContent>
            <StepperContentHeader title="Tetapan Ketua Seksyen">
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
                >
                <ContentHeader title="Keputusan Dari Ketua Seksyen" borderClass="border-none">
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
                <!-- <div
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
                </div> -->
                </StepperContentBody
            >
        </StepperContent>
      
        <StepperContent>
            <StepperContentHeader title="Tetapan Pelulus">
            </StepperContentHeader>
            <StepperContentBody>
                
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 border-b border-bdr-primary pb-5"
                >
                <ContentHeader title="Keputusan Dari Pelulus" borderClass="border-none">
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
        {#if data.props.userMode == 'urusetia' || data.props.userMode == 'pelulus' || data.props.userMode == 'ketua Seksyen'}
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Jadual Pertama dan Jadual Kedua"
                ></StepperContentHeader
                >
                <CustomTab id="schedule">
                    <CustomTabContent title="Jadual Pertama">
                        <ContentHeader title="Masukkan Maklumat Pembekal" borderClass="border-none">
                            <TextIconButton
                                label="Tambah Pembekal"
                                icon="add"
                                type="neutral"
                                onClick={() => (openModal = true)}
                            />
                            <TextIconButton
                                type="primary"
                                label="Hantar"
                                icon="check"
                                form="supplierForm"
                            ></TextIconButton>
                        </ContentHeader>

                        <form
                            id="supplierForm"
                            method="POST"
                            use:supplierEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                                >
                                    {#if $supplierForm.suppliers.length < 1}
                                        <div
                                            class="flex w-full flex-col gap-10 px-3"
                                        >
                                            <Alert color="blue">
                                                <p>
                                                    <span class="font-medium"
                                                        >Tiada Maklumat!</span
                                                    >
                                                    Sila tambah tuntutan terlebih
                                                    dahulu.
                                                </p>
                                            </Alert>
                                        </div>
                                    {:else}
                                        {#each $supplierForm.suppliers as supplier, i}
                                            <div
                                                class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3"
                                            >
                                                <div
                                                    class="flex w-full items-center justify-start gap-2.5 pb-1 text-sm font-semibold text-ios-labelColors-link-light"
                                                >
                                                    <span>
                                                        Tuntutan {i + 1}
                                                    </span>
                                                    {#if data.props.userMode == 'urusetia'}
                                                        <TextIconButton
                                                            label=""
                                                            icon="delete"
                                                            type="danger"
                                                            onClick={() =>
                                                                removeSupplier(
                                                                    i,
                                                                )}
                                                        />
                                                    {/if}
                                                </div>
                                                <CustomTextField
                                                    label="Harga Belian"
                                                    id=""
                                                    disabled
                                                    val=""
                                                />
                                                <CustomTextField
                                                    label="Nama Pembekal"
                                                    id="name{i}"
                                                    disabled
                                                    val={supplier.name}
                                                />
                                                <CustomTextField
                                                    label="Alamat Pembekal"
                                                    id="address{i}"
                                                    disabled
                                                    val={supplier.address}
                                                />
                                            </div>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        </form>
                    </CustomTabContent>

                    <CustomTabContent title="Jadual Kedua">
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
                            class="flex w-full flex-col justify-start gap-2.5"
                        >
                            <form
                                id="secondScheduleDetail"
                                method="POST"
                                use:secondScheduleEnhance
                                class="flex w-full flex-col gap-2"
                            >
                                <CustomTextField
                                    id="sellingPrice"
                                    label="Jumlah Harga Jumlah (RM)"
                                    errors={$secondScheduleError.sellingPrice}
                                    bind:val={$secondScheduleForm.sellingPrice}
                                ></CustomTextField>

                                <CustomTextField
                                    id="sellingBalance"
                                    label="Bayaran Muka (RM)"
                                    errors={$secondScheduleError.sellingBalance}
                                    bind:val={$secondScheduleForm.sellingBalance}
                                ></CustomTextField>

                                <CustomTextField
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
                                <!-- max 48 bulan -->
                                    <CustomTextField
                                        id="installment"
                                        label="Amaun Bulanan (RM)"
                                        errors={$secondScheduleError.installment}
                                        bind:val={$secondScheduleForm.installment}
                                    ></CustomTextField>

                                    <CustomTextField
                                        id="paymentPeriod"
                                        label={'Tempoh Pembayaran (Bulan)'}
                                        errors={$secondScheduleError.paymentPeriod}
                                        bind:val={$secondScheduleForm.paymentPeriod}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            </StepperContent>
        {/if}

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

<Modal title="Tambah Pembekal" bind:open={openModal}>
    <div class="flex w-full flex-col justify-start gap-2.5 pb-3">
        <CustomTextField
            label="Harga Belian (RM)"
            id="name"
            bind:val={tempSupplier.name}
        />
        <CustomTextField
            label="Nama Pembekal"
            id="name"
            bind:val={tempSupplier.name}
        />
        <CustomTextField
            label="Alamat Pembekal"
            id="address"
            bind:val={tempSupplier.address}
        />
        <TextIconButton
            label="Hantar"
            icon="check"
            onClick={() => {
                addSupplier();
                openModal = false;
            }}
        />
    </div>
</Modal>
