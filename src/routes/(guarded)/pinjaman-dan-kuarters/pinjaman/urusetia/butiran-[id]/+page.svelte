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
        _firstSchedule,
        _loanDetail,
        _offerLoan,
        _personalDetail,
        _secondSchedule,
        _vehicleFirstSchedule,
    } from '$lib/schemas/mypsm/loan/loan-application';

    export let data: PageData;

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
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_loanDetail),
    });

    const {
        form: approvalAndOfferDetailForm,
        errors: approvalAndOfferDetailError,
        enhance: approvalAndOfferDetailEnhance,
        isTainted: approvalAndOfferDetailtaimted,
    } = superForm(data.offerLoan, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_offerLoan),
    });

    const {
        form: vehicleFirstScheduleForm,
        errors: vehicleFirstScheduleError,
        enhance: vehicleFirstScheduleEnhance,
        isTainted: vehicleFirstScheduleTainted,
    } = superForm(data.vehicleFirstScheduleDetails, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_vehicleFirstSchedule),
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
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></TextIconButton></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peminjam"
            ><TextIconButton></TextIconButton></StepperContentHeader
        >
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
            ><TextIconButton></TextIconButton>

            <TextIconButton></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="loanFormStepper"
                method="POST"
                use:loanInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    id="maxLoan"
                    disabled
                    label={'Had Permohonan'}
                    bind:val={$loanInfoForm.maxLoan}
                ></CustomTextField>
                <!-- <CustomTextField
                    id="requestedLoan"
                    disabled
                    label={'Jenis Permohonan'}
                    bind:val={$loanInfoForm.requestedLoan}
                ></CustomTextField> -->
                <CustomTextField
                    id="requestedLoan"
                    disabled
                    label={'Jumlah yang Dipohon (RM)'}
                    bind:val={$loanInfoForm.requestedLoan}
                ></CustomTextField>
                <CustomTextField
                    id="paymentPeriod"
                    disabled
                    label={'Tempoh Pembayaran'}
                    bind:val={$loanInfoForm.paymentPeriod}
                ></CustomTextField>
                <CustomTextField
                    id="reason"
                    disabled
                    label={'Ulasan'}
                    bind:val={$loanInfoForm.reason}
                ></CustomTextField>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan yang Berkaitan"
            ><TextIconButton></TextIconButton>

            <TextIconButton></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Dokumen Sokongan"></ContentHeader>
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
            </div></StepperContentBody
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

                <!-- <form
                    id="supporterAndApproverFormValidation"
                    use:supporterAndApproverEnhance
                    method="POST"
                    class="flex w-full flex-col gap-2"
                > -->
                <CustomSelectField
                    id="supporterName"
                    label={'Nama Penyokong'}
                    options={[
                        { value: '0001', name: 'Mohd Irfan bin Abu' },
                        { value: '0002', name: 'Nur Afifah Farhan' },
                        { value: '0003', name: 'Teressa Teng' },
                        { value: '0004', name: 'Sumar Amariti' },
                    ]}
                    val=""
                ></CustomSelectField>

                <CustomSelectField
                    id="approverName"
                    label={'Nama Pelulus'}
                    options={[
                        { value: '0001', name: 'Mohd Irfan bin Abu' },
                        { value: '0002', name: 'Nur Afifah Farhan' },
                        { value: '0003', name: 'Teressa Teng' },
                        { value: '0004', name: 'Sumar Amariti' },
                    ]}
                    val=""
                ></CustomSelectField>

                <!-- </form> -->
            </div>
        </StepperContentBody>
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
                            form="approvalAndOfferForm"
                        ></TextIconButton></ContentHeader
                    >

                    <div
                        class="flex w-full flex-col items-start justify-start gap-2.5"
                    >
                        <form
                            id="approvalAndOfferForm"
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
                            <!-- value={currEmpLoanRec[0].total} -->

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
                            <!-- value={amount} -->

                            <CustomTextField
                                id="govFund"
                                label="Amaun Pembiayaan Kerajaan (RM)"
                                bind:val={$approvalAndOfferDetailForm.govFund}
                            ></CustomTextField>
                            <!-- value={amount2} -->

                            <CustomTextField
                                id="sellingPrice"
                                label="Harga Jualan Kepada Pegawai (RM)"
                                bind:val={$approvalAndOfferDetailForm.sellingPrice}
                            ></CustomTextField>
                            <!-- value={currEmpLoanRec[0].total - saleValue} -->

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
            ><TextIconButton type="back"></TextIconButton><TextIconButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Dokumen Resit dan Invois">
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                </ContentHeader>
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>
                <!-- <DownloadAttachment fileName="SALINAN RESIT.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="SALINAN INVOIS.pdf"
                ></DownloadAttachment> -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
