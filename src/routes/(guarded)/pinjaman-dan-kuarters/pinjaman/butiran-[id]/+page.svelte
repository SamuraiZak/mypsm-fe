<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _approver,
        _firstSchedule,
        _loanDetail,
        _offerLoan,
        _personalDetail,
        _secondSchedule,
        _vehicleDetail,
        _vehicleFirstSchedule,
    } from '$lib/schemas/mypsm/loan/loan-application';
    import { Toaster } from 'svelte-french-toast';
    import {
        _approverSubmit,
        _fileToBase64Object,
        _loanDetailSubmit,
        _offerLoanDetailSubmit,
        _submitDocument,
        _submitPaymentDocument,
        _vehicleDetailSubmit,
        _vehicleFirstScheduleDetailSubmit,
    } from './+page';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import type { UploadDocuments } from '$lib/dto/mypsm/pinjaman/document.dto';

    export let data: PageData;
    let files: FileList;
    let filesPayment: FileList;

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let Documents: UploadDocuments = {
                        id: data.currentID.id,
                        documents: result,
                    };
                    _submitDocument(JSON.stringify(Documents));
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
                        id: data.currentID.id,
                        documents: result,
                    };
                    _submitPaymentDocument(JSON.stringify(paymentDocuments));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function percentage(partialValue: number, totalValue: number) {
        var res = ((partialValue / totalValue) * 100).toFixed(2);
        return res;
    }

    const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
        isTainted: personalDetailTainted,
    } = superForm(data.personalDetail, {
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
    } = superForm(data.loanDetails, {
        SPA: true,
        id: 'loanDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
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
    } = superForm(data.vehicleDetails, {
        SPA: true,
        id: 'vehicleDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_vehicleDetail),
        onSubmit() {
            _vehicleDetailSubmit($vehicleInfoForm);
        },
 });

    const {
        form: approverInfoForm,
        errors: approverInfoError,
        enhance: approverInfoEnhance,
        isTainted: approverDetailTainted,
    } = superForm(data.approverDetails, {
        SPA: true,
        id: 'approverDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_approver),
        onSubmit() {
            _approverSubmit($approverInfoForm);
        },
    });

    const {
        form: approvalAndOfferDetailForm,
        errors: approvalAndOfferDetailError,
        enhance: approvalAndOfferDetailEnhance,
        isTainted: approvalAndOfferDetailtaimted,
    } = superForm(data.offerLoan, {
        SPA: true,
        id: 'offerLoan',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_offerLoan),
        onSubmit() {
            _offerLoanDetailSubmit($approvalAndOfferDetailForm);
        },
    });

    const {
        form: vehicleFirstScheduleForm,
        errors: vehicleFirstScheduleError,
        enhance: vehicleFirstScheduleEnhance,
        isTainted: vehicleFirstScheduleTainted,
    } = superForm(data.vehicleFirstScheduleDetails, {
        SPA: true,
        id: 'vehicleFirstSchedule',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_vehicleFirstSchedule),
        onSubmit() {
            _vehicleFirstScheduleDetailSubmit($vehicleFirstScheduleForm);
        },
    });

    const {
        form: firstScheduleForm,
        errors: firstScheduleError,
        enhance: firstScheduleEnhance,
        isTainted: firstScheduleTainted,
    } = superForm(data.firstScheduleDetails, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_firstSchedule),
    });

    const {
        form: supplierForm,
        errors: supplierError,
        enhance: supplierEnhance,
        isTainted: supplierTainted,
    } = superForm(data.supplierDetails, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_firstSchedule),
    });

    const {
        form: secondScheduleForm,
        errors: secondScheduleError,
        enhance: secondScheduleEnhance,
        isTainted: secondScheduleTainted,
    } = superForm(data.secondScheduleDetails, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_secondSchedule),
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Semak Maklumat Pinjaman"
        ><TextIconButton
            label="Kembali"
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></TextIconButton></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam"></StepperContentHeader>
        <StepperContentBody>
            <form
                id="personalFormStepper"
                method="POST"
                use:personalInfoEnhance
                class="flex w-full flex-col gap-2"
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
                <CustomTextField
                    id="positionId"
                    disabled
                    label={'Jawatan Sekarang'}
                    bind:val={$personalInfoForm.positionId}
                ></CustomTextField>
                <CustomTextField
                    id="serviceGroupId"
                    disabled
                    label={'Kumpulan Perkhidmatan'}
                    bind:val={$personalInfoForm.serviceGroupId}
                ></CustomTextField>
                <CustomTextField
                    id="gradeId"
                    disabled
                    label={'Gred Jawatan'}
                    bind:val={$personalInfoForm.gradeId}
                ></CustomTextField>
                <CustomTextField
                    id="schemeId"
                    disabled
                    label={'Skim'}
                    bind:val={$personalInfoForm.schemeId}
                ></CustomTextField>
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
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pinjaman"
            ><TextIconButton label="Simpan" icon="check" form="loanInfoForm" />

            <TextIconButton></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="loanInfoForm"
                method="POST"
                use:loanInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    id="maxLoan"
                    label={'Had Permohonan'}
                    bind:val={$loanInfoForm.maxLoan}
                ></CustomTextField>
                <!-- <CustomTextField
                    id="requestedLoan"
                    
                    label={'Jenis Permohonan'}
                    bind:val={$loanInfoForm.requestedLoan}
                ></CustomTextField> -->
                <CustomTextField
                    id="requestedLoan"
                    label={'Jumlah yang Dipohon (RM)'}
                    bind:val={$loanInfoForm.requestedLoan}
                ></CustomTextField>
                <CustomTextField
                    id="paymentPeriod"
                    label={'Tempoh Pembayaran'}
                    bind:val={$loanInfoForm.paymentPeriod}
                ></CustomTextField>
                <CustomTextField
                    id="reason"
                    label={'Ulasan'}
                    bind:val={$loanInfoForm.reason}
                ></CustomTextField>
            </form></StepperContentBody
        >
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Maklumat Kenderaan yang Hendak Dibeli"
            ><TextIconButton label="Simpan" icon="check" form="vehicleDetail" />

            <TextIconButton></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="vehicleDetail"
                method="POST"
                use:vehicleInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    id="condition"
                    label={'Kondisi Kenderaan'}
                    bind:val={$vehicleInfoForm.condition}
                ></CustomTextField>
                <CustomTextField
                    id="vehicleType"
                    label={'Jenis Kenderaan'}
                    bind:val={$vehicleInfoForm.vehicleType}
                ></CustomTextField>
                <CustomTextField
                    id="brandModel"
                    label={'Jenama san Model Kenderaan'}
                    bind:val={$vehicleInfoForm.brandModel}
                ></CustomTextField>
                <CustomTextField
                    id="engineNumber"
                    label={'Sukatan Silinder/ No. Chasis/ No. Enjin'}
                    bind:val={$vehicleInfoForm.engineNumber}
                ></CustomTextField>
                <CustomTextField
                type=date
                    id="registrationDate"
                    label={'Tarikh Pendaftaran'}
                    bind:val={$vehicleInfoForm.registrationDate}
                ></CustomTextField>
                <CustomTextField
                
                    id="registrationNumber"
                    label={'Nombor Pendaftaran'}
                    bind:val={$vehicleInfoForm.registrationNumber}
                ></CustomTextField>
                <CustomTextField
                    id="nettPrice"
                    label={'Harga Bersih'}
                    bind:val={$vehicleInfoForm.nettPrice}
                ></CustomTextField>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><TextIconButton></TextIconButton>

            <TextIconButton
            label="Muat Naik"
            icon="check"
            onClick={() => uploadDocument()}
        /></StepperContentHeader
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
                    <div
                        class="flex h-fit w-full flex-col justify-center gap-2"
                    >
                        <input
                            class="rounded-md bg-ios-systemColors-systemFill-light"
                            accept=".pdf"
                            type="file"
                            multiple
                            bind:files
                        />
                    </div>

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
                        {#each data.loanDocument.document as docs}
                            <a
                                href={docs.document}
                                download={docs.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{docs.name}</a
                            >
                        {/each}
                    </div>
                </form>
            
            </StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus Peminjam"
            ><TextIconButton />
            <TextIconButton
                type="primary"
                label="Simpan"
                form="supporterAndApproverFormValidation"
            ></TextIconButton>
        </StepperContentHeader>

        <!-- ------------------------------------------------------------------------------------------------- -->
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Masukkan Nama Penyokong dan Pelulus"
                ></ContentHeader>

                <form
                    id="loanDetail"
                    method="POST"
                    use:approverInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                        id="approverName"
                        label={'Nama Pelulus'}
                        bind:val={$approverInfoForm.approverId}
                    ></CustomTextField>

                    <!-- </form> -->
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Muat Turun Surat Tawaran"
            >
</StepperContentHeader
        >
        <StepperContentBody>
            <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Permohonan Pinjaman Kenderaan:</span>
                    </div>
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
                            >Sila Muat turun dan pastikan dokumen diisi dengan lengkap dan ditandatangani sebelum dihantar kepada Urus Setia:</span
                        >
                        
                            <a
                                href={data.agreementFormDocument.document}
                                download={data.agreementFormDocument.document}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >Surat Perjanjian Pinjaman</a
                            >
                    </div>
                </form>
            
            </StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pinjaman"
            ><TextIconButton />
        </StepperContentHeader>
        <StepperContentBody>
            <CustomTab>
                <CustomTabContent title="Maklumat Kelayakan">
                    <ContentHeader title="Maklumat Kelayakan"
                        ><TextIconButton
                            type="primary"
                            label="Simpan"
                            form="qualificationDetailForm"
                        ></TextIconButton></ContentHeader
                    >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <p class="text-sm text-system-primary">
                            Gaji Pokok Sahaja
                        </p>
                        <!-- <form
                            id="qualificationDetailForm"
                            method="POST"
                            use:qualificationDetailEnhance
                            class="flex w-full flex-col gap-2"
                        > -->
                        <CustomTextField
                            disabled
                            id=""
                            label={'Gaji Pokok (RM)'}
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            type="number"
                            id="baseSalaryOnlyDeduction"
                            label={'Potongan (RM)'}
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id=""
                            disabled
                            type="number"
                            label={'Baki (RM)'}
                            val=""
                        ></CustomTextField>
                        <p class="text-sm text-system-primary">
                            Gaji Pokok dan Elaun
                        </p>
                        <CustomTextField
                            disabled
                            id=""
                            label={'Gaji Pokok dan Elaun (RM)'}
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            type="number"
                            id=""
                            label={'Potongan (RM)'}
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            type="number"
                            id=""
                            label={'Potongan Baru (RM)'}
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            type="number"
                            id=""
                            label={'Baki (RM)'}
                            val=""
                        ></CustomTextField>
                        <!-- </form> -->
                    </div>

                    <!-- ------------------------------------------------------------------------------------------------------ -->
                </CustomTabContent>
                <CustomTabContent title="Maklumat Kelulusan dan Tawaran">
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
                                id="loanType"
                                label="Jenis Belian"
                                bind:val={$approvalAndOfferDetailForm.loanType}
                            ></CustomTextField>

                            <CustomTextField
                                id="purchasePrice"
                                label="Harga Belian Dengan Kerajaan (RM)"
                                bind:val={$approvalAndOfferDetailForm.purchasePrice}
                            ></CustomTextField>
                            <CustomTextField
                                id="deposit"
                                label="Bayaran Muka (RM)"
                                bind:val={$approvalAndOfferDetailForm.deposit}
                            ></CustomTextField>
                            <!-- value={upfront} -->

                            <CustomTextField
                                id="govProfit"
                                label="Bayaran Amaun Pembiayaan Dan Keuntungan Kerajaan (RM)"
                                bind:val={$approvalAndOfferDetailForm.govProfit}
                            ></CustomTextField>
                            <CustomTextField
                                id="govFund"
                                label="Amaun Pembiayaan Kerajaan (RM)"
                                bind:val={$approvalAndOfferDetailForm.govFund}
                            ></CustomTextField>
                            <CustomTextField
                                id="sellingPrice"
                                label="Harga Jualan Kepada Pegawai (RM)"
                                bind:val={$approvalAndOfferDetailForm.sellingPrice}
                            ></CustomTextField>
                            <CustomTextField
                                id="installment"
                                label="Ansuran Bulanan (RM)"
                                bind:val={$approvalAndOfferDetailForm.installment}
                            ></CustomTextField>
                            <CustomTextField
                                id="startLoanDate"
                                type="date"
                                label="Tarikh Mula"
                                bind:val={$approvalAndOfferDetailForm.startLoanDate}
                            ></CustomTextField>
                            <CustomTextField
                                id="paymentPeriod"
                                label="Tempoh"
                                bind:val={$approvalAndOfferDetailForm.paymentPeriod}
                            ></CustomTextField>
                        </form>
                    </div>
                </CustomTabContent>
                <CustomTabContent title="Jadual Pertama">
                    <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                    <ContentHeader
                        title="Masukkan Maklumat dan Perihal Kenderaan"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="vehicleDetailAndDescriptionForm"
                        ></TextIconButton>
                    </ContentHeader>
                    <form
                        id="vehicleDetailAndDescriptionForm"
                        method="POST"
                        use:vehicleFirstScheduleEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <CustomTextField
                            id="engineNumber"
                            label="No. Enjin"
                            bind:val={$vehicleFirstScheduleForm.engineNumber}
                        />
                        <CustomTextField
                            id="chassisNumber"
                            label="No. Casis"
                            bind:val={$vehicleFirstScheduleForm.chassisNumber}
                        />
                        <CustomTextField
                            id="countryOrigin"
                            label="Buatan"
                            bind:val={$vehicleFirstScheduleForm.countryOrigin}
                        />
                        <CustomTextField
                            id="brandModel"
                            label="Nama Model"
                            bind:val={$vehicleFirstScheduleForm.brandModel}
                        />
                        <CustomTextField
                            id="engineHP"
                            label="Kuasa Enjin"
                            bind:val={$vehicleFirstScheduleForm.engineHP}
                        />
                        <CustomTextField
                            id="fuelType"
                            label="Bahan Bakar"
                            bind:val={$vehicleFirstScheduleForm.fuelType}
                        />
                        <CustomTextField
                            id="class"
                            label="Kelas Kegunaan"
                            bind:val={$vehicleFirstScheduleForm.class}
                        />
                        <CustomTextField
                            id="bodyType"
                            label="Jenis Badan"
                            bind:val={$vehicleFirstScheduleForm.bodyType}
                        />

                        <CustomTextField
                            id="makeYear"
                            label="Tahun Dibuat"
                            bind:val={$vehicleFirstScheduleForm.makeYear}
                        />
                        <ContentHeader
                            title="Masukkan Butiran Penjualan/Tuan Asal"
                        ></ContentHeader>
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2.5"
                        >
                            <CustomTextField
                                id="previousOwner"
                                label="Nama"
                                bind:val={$vehicleFirstScheduleForm.previousOwner}
                            />
                            <CustomTextField
                                id="previousOwnerIC"
                                label="No. K/P"
                                bind:val={$vehicleFirstScheduleForm.previousOwnerIC}
                            />
                            <CustomTextField
                                id="address"
                                label="Alamat"
                                bind:val={$vehicleFirstScheduleForm.address}
                            />
                        </div>
                        <ContentHeader title="Masukkan Harga Belian Kenderaan"
                        ></ContentHeader>

                        <form
                            id="firstScheduleForm"
                            method="POST"
                            use:firstScheduleEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <CustomTextField
                                    id="purchasePrice"
                                    label="Jumlah Harga Belian (RM)"
                                    bind:val={$firstScheduleForm.purchasePrice}
                                />
                                <CustomTextField
                                    id="balancePayment"
                                    label="Bayaran Baki (RM)"
                                    bind:val={$firstScheduleForm.balancePayment}
                                />
                                <CustomTextField
                                    id="govFund"
                                    label="Amaun Pembiayaan Kerajaan (RM)"
                                    bind:val={$firstScheduleForm.govFund}
                                />
                            </div>
                        </form>

                        <!-- <ContentHeader title="Masukkan Maklumat Pembekal">
                            <TextIconButton type="add-supplier" />
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="vehicleDetailAndDescriptionForm"
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
                                    <div
                                        class="flex w-full items-start justify-between"
                                    ></div>
                                    <CustomTextField
                                        id="name"
                                        placeholder="Nama Pembekal"
                                        label="Nama Pembekal"
                                       bind:val={$supplierForm.name}
                                    />
                                    <CustomTextField
                                        id="address"
                                        placeholder="Alamat Pembekal"
                                        label="Alamat"
                                        bind:val={$supplierForm.name}
                                    />
                                </div>
                            </div>
                            </form> -->
                    </form></CustomTabContent
                >
                <CustomTabContent title="Jadual Kedua">
                    <!-- {#if currEmpLoanRec[0].typeOfLoan == 'Kenderaan'} -->
                    <ContentHeader title="Masukkan Maklumat Harga Jualan (RM)">
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="secondScheduleFormValidation"
                        ></TextIconButton>
                    </ContentHeader>
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <form
                            id="secondScheduleFormValidation"
                            method="POST"
                            use:secondScheduleEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <CustomTextField
                                id="sellingPrice"
                                label="Jumlah Harga Belian (RM)"
                                bind:val={$secondScheduleForm.sellingPrice}
                            ></CustomTextField>

                            <CustomTextField
                                id="sellingBalance"
                                label="Bayaran Baki (RM)"
                                bind:val={$secondScheduleForm.sellingBalance}
                            ></CustomTextField>

                            <CustomTextField
                                id="govFund"
                                label="Amaun Pembiayaan dan Keuntungan Kerajaan (RM)"
                                bind:val={$secondScheduleForm.govFund}
                            ></CustomTextField>

                            <ContentHeader
                                title="Masukkan Amaun dan Tempoh Bayaran Balik Harga Jualan"
                            ></ContentHeader>
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5"
                            >
                                <CustomTextField
                                    id="installment"
                                    label="Amaun Bulanan (RM)"
                                    bind:val={$secondScheduleForm.installment}
                                ></CustomTextField>

                                <CustomTextField
                                    id="paymentPeriod"
                                    label={'Tempoh Pembayaran'}
                                    bind:val={$secondScheduleForm.paymentPeriod}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </CustomTabContent>
            </CustomTab>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Senarai Semak Surat Perjanjian"
            ><TextIconButton type="back"></TextIconButton>
            <TextIconButton
                type="primary"
                label="Simpan"
                form="letterOfAgreementFormValidation"
            ></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <ContentHeader
                title="Masukkan Maklumat Senarai Semak Surat Perjanjian"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <!-- <form
                    id="letterOfAgreementFormValidation"
                    use:letterOfAgreementEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                > -->
                <CustomRadioBoolean id="received" label="Diterima" val=""
                ></CustomRadioBoolean>

                <CustomRadioBoolean id="checked" label="Disemak" val=""
                ></CustomRadioBoolean>

                <!-- </form> -->
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Resit dan Invois"
            ><TextIconButton
            label="Muat Naik"
            icon="check"
            onClick={() => uploadPayment()}
        /></StepperContentHeader
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
                    <div
                        class="flex h-fit w-full flex-col justify-center gap-2"
                    >
                        <input
                            class="rounded-md bg-ios-systemColors-systemFill-light"
                            accept=".pdf"
                            type="file"
                            multiple
                            bind:files
                        />
                    </div>

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
                        {#each data.loanPaymentDocument.document as docs}
                            <a
                                href={docs.document}
                                download={docs.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{docs.name}</a
                            >
                        {/each}
                    </div>
                </form>
            
            </StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
