<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    import { eligibleOptions } from '$lib/constants/core/radio-option-constants';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { Alert, Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        _addConfirmationSchema,
        _addQuarterDetails,
        _outsiderApplication,
        _outsiderFamily,
        _outsiderService,
        _quarterCommonApproval,
        _quarterSecretaryApproval,
    } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import {
        _applyMoveoutQuarters,
        _applyQuarters,
        _applyMoveoutQuartersForOutsiders,
        _fileToBase64Object,
        _submitConfirmationForm,
        _submitDirectorApprovalForm,
        _submitOutsiderApplicationForm,
        _submitOutsiderFamilyForm,
        _submitOutsiderServiceForm,
        _submitQuarterDetailsForm,
        _submitQuartersDocument,
        _submitSecretaryApprovalForm,
        _submitQuarterPayment,
        _submitOtherDocument,
    } from './+page';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';

    export let data: PageData;
    let submitConfirmation: boolean = false;
    let submitPersonalDetail: boolean = false;
    let submitSecretaryApproval: boolean = false;
    let submitQuarterDetails: boolean = false;
    let submitDirectorApproval: boolean = false;
    let successUpload: boolean = false;
    let submitPayment: boolean = false;
    let files: FileList;
    let applicantType: number = 1;
    let successOtherDocUpload: boolean =  false;
    //for application type radio
    if (data.applicationType == 'luar') {
        applicantType = 2;
    }

    //outsider
    let outsiderId: number = 0;
    let outsiderFamilyForm: boolean = false;
    let outsiderService: boolean = false;

    if (data.quarterDocuments.document.length > 0) {
        successUpload = true;
    }
    if (data.quarterDetails.unit !== null) {
        submitQuarterDetails = true;
    }
    if (
        data.directorApproval.remark !== null &&
        data.directorApproval.remark !== undefined
    ) {
        submitDirectorApproval = true;
    }
    if(data.quartersOtherDocument.document !== null) {
        successOtherDocUpload = true;
    }

    function uploadDocument(stepper: number) {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    let quartersDocument: QuartersUploadDocuments = {
                        id: data.currentId.id,
                        documents: result,
                        isDraft: false,
                    };
                    if (stepper == 1) {
                        const res = await _submitQuartersDocument(
                            JSON.stringify(quartersDocument),
                        );

                        if (res.response.status == 'success') {
                            successUpload = true;
                        }
                    } else if (stepper == 2) {
                        const res = await _submitOtherDocument(
                            JSON.stringify(quartersDocument),
                        );

                        if (res.response.status == 'success') {
                            successOtherDocUpload = true;
                        }
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    }

    const {
        form: personalDetailForm,
        errors: personalDetailError,
        enhance: personalDetailEnhance,
    } = superForm(data.personalDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'personalDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_outsiderApplication),
        async onSubmit() {
            _submitOutsiderApplicationForm($personalDetailForm)
                .then((result) => {
                    if (result.status == 'success') {
                        submitPersonalDetail = true;
                        outsiderId = result.data?.details.outsiderId;
                    }
                })
                .finally(async () => {
                    if (!$personalDetailForm.marital) {
                        $outsiderFamily.outsiderId = outsiderId;
                        $outsiderFamily.currentSalary = null;
                        $outsiderFamily.name = 'Tiada';
                        $outsiderFamily.phoneNumber = null;
                        $outsiderFamily.position = null;
                        $outsiderFamily.totalChildren = null;
                        const readOnly =
                            await _submitOutsiderFamilyForm($outsiderFamily);
                        if (readOnly?.response.status == 'success') {
                            outsiderFamilyForm = true;
                        }
                    }
                });
        },
    });
    const {
        form: outsiderFamily,
        errors: outsiderFamilyError,
        enhance: outsiderFamilyEnhance,
    } = superForm(data.outsiderFamily, {
        SPA: true,
        taintedMessage: false,
        id: 'outsiderFamily',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_outsiderFamily),
        async onSubmit() {
            $outsiderFamily.outsiderId = outsiderId;
            const readOnly = await _submitOutsiderFamilyForm($outsiderFamily);
            if (readOnly?.response.status == 'success') {
                outsiderFamilyForm = true;
            }
        },
    });
    const {
        form: outsiderServiceForm,
        errors: outsiderServiceError,
        enhance: outsiderServiceEnhance,
    } = superForm(data.outsiderServiceForm, {
        SPA: true,
        taintedMessage: false,
        id: 'outsiderServiceForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_outsiderService),
        async onSubmit() {
            $outsiderServiceForm.outsiderId = outsiderId;
            const readOnly = await _submitOutsiderServiceForm(
                $outsiderServiceForm,
                outsiderId,
            );
            if (readOnly?.response.status == 'success') {
                outsiderService = true;
            }
        },
    });

    const {
        form: confirmationForm,
        errors: confirmationError,
        enhance: confirmationEnhance,
    } = superForm(data.confirmationForm, {
        SPA: true,
        taintedMessage: false,
        id: 'confirmationForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_addConfirmationSchema),
        async onSubmit() {
            $confirmationForm.id = data.currentId.id;

            const readOnly = await _submitConfirmationForm($confirmationForm);
            if (readOnly?.response.status == 'success') {
                submitConfirmation = true;
            }
        },
    });
    const {
        form: secretaryApprovalForm,
        errors: secretaryApprovalError,
        enhance: secretaryApprovalEnhance,
    } = superForm(data.secretaryApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'secretaryApprovalForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_quarterSecretaryApproval),
        async onSubmit() {
            $secretaryApprovalForm.id = data.currentId.id;
            $secretaryApprovalForm.isDraft = false;
            const readOnly = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                submitSecretaryApproval = true;
            }
        },
    });
    const {
        form: directorApprovalForm,
        errors: directorApprovalError,
        enhance: directorApprovalEnhance,
    } = superForm(data.directorApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'directorApprovalForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_quarterCommonApproval),
        async onSubmit() {
            $directorApprovalForm.id = data.currentId.id;
            $directorApprovalForm.isDraft = false;
            const readOnly = await _submitDirectorApprovalForm(
                $directorApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                submitDirectorApproval = true;
            }
        },
    });
    const {
        form: quarterDetailForm,
        errors: quarterDetailError,
        enhance: quarterDetailEnhance,
    } = superForm(data.quarterDetailForm, {
        SPA: true,
        taintedMessage: false,
        id: 'quarterDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_addQuarterDetails),
        async onSubmit() {
            $quarterDetailForm.id = data.currentId.id;
            $quarterDetailForm.directorApproverId =
                $secretaryApprovalForm.directorApproverId;

            const readOnly =
                await _submitQuarterDetailsForm($quarterDetailForm);
            if (readOnly?.response.status == 'success') {
                submitQuarterDetails = true;
            }
        },
    });

    const {
        form: quarterPaymentForm,
        errors: quarterPaymentError,
        enhance: quarterPaymentEnhance,
    } = superForm(data.quarterPaymentForm, {
        SPA: true,
        taintedMessage: false,
        id: 'quarterPaymentForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_addQuarterDetails),
        async onSubmit() {
            $quarterPaymentForm.id = data.currentId.id;
            if (data.applicationType == 'luar') {
                $quarterPaymentForm.paymentMethod = 1;
            }

            const readOnly = await _submitQuarterPayment($quarterPaymentForm);
            if (readOnly?.response.status == 'success') {
                submitPayment = true;
            }
        },
    });
    if ($confirmationForm.confirm) {
        submitConfirmation = true;
    }
    if (
        data.secretaryApproval.remark !== null &&
        data.secretaryApproval.remark !== undefined
    ) {
        submitSecretaryApproval = true;
    }
    if (
        $personalDetailForm.name !== '' &&
        $personalDetailForm.name !== undefined
    ) {
        submitPersonalDetail = true;
    }
    if ($outsiderFamily.name !== '') {
        outsiderFamilyForm = true;
    }
    if ($outsiderServiceForm.position !== '') {
        outsiderService = true;
    }
    if ($quarterPaymentForm.paymentMethod) {
        submitPayment = true;
    }
    console.log(data.quartersOtherDocument.document)
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Masuk Kuarters">
        {#if $quarterPaymentForm.paymentMethod && data.currentRoleCode == UserRoleConstant.kakitangan.code && data.applicationType == 'kakitangan'}
            <TextIconButton
                label="Permohonan Keluar"
                icon="add"
                onClick={() => _applyMoveoutQuarters(data.currentId)}
            />
        {:else if $quarterPaymentForm.paymentMethod && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code && data.applicationType == 'luar'}
            <TextIconButton
                label="Permohonan Keluar"
                icon="add"
                onClick={() =>
                    _applyMoveoutQuartersForOutsiders(data.currentId)}
            />
        {/if}
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() => goto('/v2/loan-and-quarters/quarters-entry')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        {#if !data.isFirstApplication}
            <StepperContent>
                <StepperContentHeader title="Jenis Pemohon"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                        <CustomRadioBoolean
                            label="Jenis Pemohon"
                            id="applicantType"
                            options={data.lookup.applicantType}
                            bind:val={applicantType}
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Maklumat Peribadi Pemohon">
                    {#if !submitPersonalDetail && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <!-- <TextIconButton
                            label="Simpan"
                            type="draft"
                            icon="save"
                            form="personalDetailForm"
                        /> -->
                        <TextIconButton
                            label="Hantar"
                            form="personalDetailForm"
                            icon="check"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        use:personalDetailEnhance
                        id="personalDetailForm"
                    >
                        <CustomTextField
                            label="Nama Penuh"
                            id="name"
                            disabled={submitPersonalDetail}
                            bind:val={$personalDetailForm.name}
                            errors={$personalDetailError.name}
                        />
                        <CustomTextField
                            label="No. Kad Pengenalan"
                            id="identityDocumentNumber"
                            disabled={submitPersonalDetail}
                            bind:val={$personalDetailForm.identityDocumentNumber}
                            errors={$personalDetailError.identityDocumentNumber}
                        />
                        <CustomTextField
                            label="No. Telefon"
                            id="phoneNumber"
                            disabled={submitPersonalDetail}
                            bind:val={$personalDetailForm.phoneNumber}
                            errors={$personalDetailError.phoneNumber}
                        />
                        <CustomTextField
                            label="Alamat Surat Menyurat"
                            id="mailAddress"
                            disabled={submitPersonalDetail}
                            bind:val={$personalDetailForm.mailAddress}
                            errors={$personalDetailError.mailAddress}
                        />
                        {#if data.applicationType !== 'luar'}
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                disabled={submitPersonalDetail}
                                bind:val={$personalDetailForm.employeeNumber}
                                errors={$personalDetailError.employeeNumber}
                            />
                            <CustomSelectField
                                label="Gred"
                                id="gradeId"
                                options={data.lookup.gradeLookup}
                                disabled={submitPersonalDetail}
                                bind:val={$personalDetailForm.gradeId}
                                errors={$personalDetailError.gradeId}
                            />
                            <CustomSelectField
                                label="Penempatan"
                                id="placementId"
                                options={data.lookup.placementLookup}
                                disabled={submitPersonalDetail}
                                bind:val={$personalDetailForm.placementId}
                                errors={$personalDetailError.placementId}
                            />
                            <CustomSelectField
                                label="Status"
                                id="maritalId"
                                disabled={submitPersonalDetail}
                                options={data.lookup.maritalLookup}
                                bind:val={$personalDetailForm.maritalId}
                                errors={$personalDetailError.maritalId}
                            />
                        {:else}
                            <CustomTextField
                                label="Email"
                                id="email"
                                disabled={submitPersonalDetail}
                                bind:val={$personalDetailForm.email}
                                errors={$personalDetailError.email}
                            />
                            <CustomRadioBoolean
                                label="Berkahwin"
                                id="marital"
                                disabled={submitPersonalDetail}
                                bind:val={$personalDetailForm.marital}
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Maklumat Pasangan">
                    {#if !outsiderFamilyForm && data.applicationType == 'luar'}
                        <!-- <TextIconButton
                            label="Simpan"
                            icon="save"
                            type="draft"
                            form="outsiderFamily"
                        /> -->
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="outsiderFamily"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        id="outsiderFamily"
                        method="POST"
                        use:outsiderFamilyEnhance
                    >
                        {#if data.applicationType !== 'luar'}
                            <CustomTextField
                                label="Nama Penuh"
                                id="name"
                                disabled
                                bind:val={data.partnerDetail.name}
                            />
                            <CustomTextField
                                label="No. Telefon"
                                id="phoneNumber"
                                disabled
                                bind:val={data.partnerDetail.phoneNumber}
                            />
                            <CustomTextField
                                label="Jabatan / Jawatan"
                                id="position"
                                placeholder=""
                                disabled
                                bind:val={data.partnerDetail.position}
                            />
                            <CustomTextField
                                label="Gaji Sekarang Yang Diterima (Gaji Pokok/Hakiki)"
                                id="salary"
                                disabled
                                bind:val={data.partnerDetail.salary}
                            />
                            <CustomTextField
                                label="Bilangan Anak Yang Tinggal Bersama Pemohon Yang Berumur Kurang 21 Tahun"
                                id="numberOfDependents"
                                disabled
                                bind:val={data.partnerDetail.numberOfDependents}
                            />
                        {:else if !$personalDetailForm.marital}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!
                                        </span>
                                        Pemohon tiada pasangan.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <CustomTextField
                                label="Nama Penuh Pasangan"
                                id="name"
                                disabled={outsiderFamilyForm}
                                bind:val={$outsiderFamily.name}
                                errors={$outsiderFamilyError.name}
                            />
                            <CustomTextField
                                label="No. Telefon"
                                id="phoneNumber"
                                disabled={outsiderFamilyForm}
                                bind:val={$outsiderFamily.phoneNumber}
                                errors={$outsiderFamilyError.phoneNumber}
                            />
                            <CustomTextField
                                label="Jabatan / Jawatan"
                                id="position"
                                disabled={outsiderFamilyForm}
                                bind:val={$outsiderFamily.position}
                                errors={$outsiderFamilyError.position}
                            />
                            <CustomTextField
                                label="Gaji Sekarang Yang Diterima (Gaji Pokok/Hakiki)"
                                id="currentSalary"
                                disabled={outsiderFamilyForm}
                                bind:val={$outsiderFamily.currentSalary}
                                errors={$outsiderFamilyError.currentSalary}
                            />
                            <CustomTextField
                                label="Bilangan Anak Yang Tinggal Bersama Pemohon Yang Berumur Kurang 21 Tahun"
                                id="totalChildren"
                                disabled={outsiderFamilyForm}
                                bind:val={$outsiderFamily.totalChildren}
                                errors={$outsiderFamilyError.totalChildren}
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Maklumat Perkhidmatan (Agensi/Jabatan)"
                >
                    {#if !outsiderService && data.applicationType == 'luar'}
                        <!-- <TextIconButton
                            label="Simpan"
                            icon="save"
                            type="draft"
                            form="outsiderServiceForm"
                        /> -->
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="outsiderServiceForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        id="outsiderServiceForm"
                        use:outsiderServiceEnhance
                        method="POST"
                    >
                        {#if data.applicationType !== 'luar'}
                            <CustomSelectField
                                label="Nama Jawatan"
                                id="positionId"
                                options={data.lookup.positionLookup}
                                bind:val={data.serviceDetail.positionId}
                                disabled
                            />
                            <CustomSelectField
                                label="Gred"
                                options={data.lookup.gradeLookup}
                                id="gradeId"
                                disabled
                                bind:val={data.serviceDetail.gradeId}
                            />
                            <CustomSelectField
                                label="Alamat Penuh Jabatan/Agensi Bertugas"
                                id="workAddress"
                                options={data.lookup.placementLookup}
                                bind:val={data.serviceDetail.workAddress}
                                disabled
                            />
                            <CustomSelectField
                                label="Alamat Penuh Jabatan/Agensi Pembayar Gaji"
                                id="paymentAddress"
                                options={data.lookup.placementLookup}
                                bind:val={data.serviceDetail.paymentAddress}
                                disabled
                            />
                            <CustomTextField
                                label="Bank Pembayar Gaji"
                                id="bank"
                                placeholder=""
                                disabled
                                bind:val={data.serviceDetail.bank}
                            />
                            <CustomTextField
                                label="Gaji Sekarang (Gaji Pokok/Hakiki)"
                                id="salary"
                                bind:val={data.serviceDetail.salary}
                                disabled
                            />
                        {:else}
                            <CustomTextField
                                label="Nama Jawatan"
                                id="position"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.position}
                                errors={$outsiderServiceError.position}
                            />
                            <CustomSelectField
                                label="Gred (Jika Ada)"
                                options={data.lookup.gradeLookup}
                                id="gradeId"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.gradeId}
                                errors={$outsiderServiceError.gradeId}
                            />
                            <CustomTextField
                                label="Alamat Penuh Jabatan/Agensi Bertugas"
                                id="officeAddress"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.officeAddress}
                                errors={$outsiderServiceError.officeAddress}
                            />
                            <CustomTextField
                                label="Alamat Penuh Jabatan/Agensi Pembayar Gaji"
                                id="employerOfficeAddress"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.employerOfficeAddress}
                                errors={$outsiderServiceError.employerOfficeAddress}
                            />
                            <CustomTextField
                                label="Bank Pembayar Gaji"
                                id="bankName"
                                placeholder=""
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.bankName}
                                errors={$outsiderServiceError.bankName}
                            />
                            <CustomTextField
                                label="Gaji Sekarang (Gaji Pokok/Hakiki)"
                                id="currentSalary"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.currentSalary}
                                errors={$outsiderServiceError.currentSalary}
                            />
                            <CustomTextField
                                label="ITP"
                                id="ITP"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.ITP}
                                errors={$outsiderServiceError.ITP}
                            />
                            <CustomTextField
                                label="COLA"
                                id="COLA"
                                disabled={outsiderService}
                                bind:val={$outsiderServiceForm.COLA}
                                errors={$outsiderServiceError.COLA}
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Dokumen Sokongan">
                    {#if !successUpload}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            onClick={() => uploadDocument(1)}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Dokumen Permohonan Menduduki Kuarters"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-full flex-col justify-start gap-2.5"
                        id="uploadDocuments"
                        method="POST"
                    >
                        {#if data.quarterDocuments.document.length < 1}
                            <div
                                class="flex h-fit w-full flex-col justify-center gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                            >
                                <span
                                    >Muat naik dokumen-dokumen yang berkaitan:
                                </span>
                                <span>1. Kad Pengenalan Sendiri</span>
                                <span>2. Kad Pengenalan Pasangan</span>
                                <span>3. Kad Nikah</span>
                                <span>4. Slip Gaji 3 Bulan Terkini</span>
                                <span
                                    >5. Surat Pengesahan Jabatan/Majikan(Jabatan
                                    atau Agensi Luar)</span
                                >
                            </div>
                            <div class="flex w-full flex-col gap-2 px-3">
                                <CustomFileField
                                    label="Dokumen Sokongan"
                                    id="employeeClaimDocument"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        {:else}
                            <div class="flex flex-col justify-start gap-3 p-3">
                                {#each data.quarterDocuments.document as docs, i}
                                    <div
                                        class="flex w-full items-center gap-3 text-sm"
                                    >
                                        <span>{i + 1}</span>
                                        <a
                                            href={docs.document}
                                            download={docs.name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{docs.name}</a
                                        >
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            {#if data.applicationType == 'kakitangan'}
                <StepperContent>
                    <StepperContentHeader title="Pengesahan">
                        {#if !submitConfirmation && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                            <TextIconButton
                                label="Simpan"
                                icon="save"
                                type="draft"
                                form="confirmationForm"
                            />
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="confirmationForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Pengesahan"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                            id="confirmationForm"
                            use:confirmationEnhance
                            method="POST"
                        >
                            <Checkbox
                                disabled={submitConfirmation}
                                bind:checked={$confirmationForm.confirm}
                                >Saya dengan ini mengesahkan bahawa maklumat
                                sebagaimana yang dinyatakan berikut adalah
                                benar.</Checkbox
                            >
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
                <StepperContent>
                    <StepperContentHeader
                        title="Ulasan Kelulusan daripada Urus Setia"
                    >
                        {#if !submitSecretaryApproval && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                            <!-- <TextIconButton
                                label="Simpan"
                                icon="save"
                                type="draft"
                                form="secretaryApprovalForm"
                            /> -->
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="secretaryApprovalForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Ulasan daripada Urus Setia"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                            id="secretaryApprovalForm"
                            method="POST"
                            use:secretaryApprovalEnhance
                        >
                            <CustomTextField
                                label="Tindakan Ulasan"
                                id="remark"
                                type="textarea"
                                disabled={submitSecretaryApproval}
                                bind:val={$secretaryApprovalForm.remark}
                                errors={$secretaryApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                disabled={submitSecretaryApproval}
                                options={eligibleOptions}
                                bind:val={$secretaryApprovalForm.status}
                            />
                            <ContentHeader
                                title="Pelulus (Pengarah Bahagian/Negeri)"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="directorApproverId"
                                disabled={submitSecretaryApproval}
                                options={data.lookup.supporterApproverLookup}
                                bind:val={$secretaryApprovalForm.directorApproverId}
                                errors={$secretaryApprovalError.directorApproverId}
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Ulasan Kelulusan daripada Pengarah Negeri / Bahagian"
                    >
                        {#if !submitDirectorApproval && (data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code)}
                            <!-- <TextIconButton
                                label="Simpan"
                                icon="save"
                                type="draft"
                                form="directorApprovalForm"
                            /> -->
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="directorApprovalForm"
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Ulasan daripada Pengarah Negeri / Bahagian"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                            id="directorApprovalForm"
                            method="POST"
                            use:directorApprovalEnhance
                        >
                            {#if $directorApprovalForm.remark == null && (data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code)}
                                <div class="flex w-full flex-col gap-10 px-3">
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Tiada Maklumat!
                                            </span>
                                            Menunggu kelulusan daripada Pengarah
                                            Bahagian/Negeri.
                                        </p>
                                    </Alert>
                                </div>
                            {:else}
                                <CustomTextField
                                    label="Tindakan Ulasan"
                                    id="remark"
                                    type="textarea"
                                    disabled={submitDirectorApproval}
                                    bind:val={$directorApprovalForm.remark}
                                    errors={$directorApprovalError.remark}
                                />
                                <CustomRadioBoolean
                                    label="Keputusan"
                                    id="status"
                                    disabled={submitDirectorApproval}
                                    options={approveOptions}
                                    bind:val={$directorApprovalForm.status}
                                />
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code}
                    <StepperContent>
                        <StepperContentHeader
                            title="Kemaskini Maklumat Permohonan"
                        >
                            {#if !submitQuarterDetails && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                                <!-- <TextIconButton
                                    label="Simpan"
                                    icon="save"
                                    type="draft"
                                    form="quarterDetailForm"
                                /> -->
                                <TextIconButton
                                    label="Hantar"
                                    icon="check"
                                    form="quarterDetailForm"
                                />
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody paddingClass="p-none">
                            <CustomTab>
                                {#if data.applicationType == 'kakitangan'}
                                    <CustomTabContent
                                        title="Maklumat Kelayakan"
                                    >
                                        <div
                                            class="flex w-full flex-col justify-start gap-2.5 p-3"
                                        >
                                            <ContentHeader
                                                title="Maklumat Kelayakan"
                                                borderClass="border-none"
                                            />
                                            {#if data.eligibilityDetail.baseSalary}
                                                <CustomTextField
                                                    label="Gaji Pokok (RM)"
                                                    id="baseSalary"
                                                    disabled
                                                    bind:val={data
                                                        .eligibilityDetail
                                                        .baseSalary}
                                                />
                                                <CustomTextField
                                                    label="Elaun-elaun (RM)"
                                                    id="allowance"
                                                    disabled
                                                    bind:val={data
                                                        .eligibilityDetail
                                                        .allowance}
                                                />
                                            {:else}
                                                <div
                                                    class="flex w-full flex-col gap-10 px-3"
                                                >
                                                    <Alert color="blue">
                                                        <p>
                                                            <span
                                                                class="font-medium"
                                                                >Tiada Maklumat
                                                            </span>
                                                            dikesan.
                                                        </p>
                                                    </Alert>
                                                </div>
                                            {/if}
                                        </div>
                                    </CustomTabContent>
                                {/if}
                                <CustomTabContent
                                    title="Maklumat Kemasukan Kuarters"
                                >
                                    <form
                                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                                        id="quarterDetailForm"
                                        method="POST"
                                        use:quarterDetailEnhance
                                    >
                                        <ContentHeader
                                            title="Butiran Penempatan Kuarter"
                                            borderClass="border-none"
                                        />
                                        {#if data.applicationType == 'luar'}
                                            <CustomTextField
                                                label="Emel Pemohon"
                                                id="email"
                                                placeholder=""
                                                disabled
                                                bind:val={$personalDetailForm.email}
                                            />
                                        {:else}
                                            <CustomTextField
                                                label="Emel Kakitangan"
                                                id="email"
                                                placeholder=""
                                                disabled
                                                val={data.quarterDetails?.email}
                                            />
                                        {/if}
                                        <CustomTextField
                                            label="Tarikh Masuk Kuarter"
                                            id="movingInDate"
                                            disabled={submitQuarterDetails}
                                            type="date"
                                            bind:val={$quarterDetailForm.movingInDate}
                                            errors={$quarterDetailError.movingInDate}
                                        />
                                        <CustomTextField
                                            label="Unit"
                                            id="unit"
                                            disabled={submitQuarterDetails}
                                            bind:val={$quarterDetailForm.unit}
                                            errors={$quarterDetailError.unit}
                                        />
                                        <CustomTextField
                                            label="Kuarter"
                                            id="quarter"
                                            disabled={submitQuarterDetails}
                                            bind:val={$quarterDetailForm.quarter}
                                            errors={$quarterDetailError.quarter}
                                        />
                                    </form>

                                    <form
                                        class="flex w-full flex-col justify-start gap-2.5 p-3 pb-5"
                                        method="POST"
                                        use:quarterPaymentEnhance
                                        id="quarterPaymentForm"
                                    >
                                        <ContentHeader
                                            title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                            borderClass="border-none"
                                        >
                                            {#if !submitPayment && data.currentRoleCode == UserRoleConstant.unitPengurusanFasiliti.code}
                                                <TextIconButton
                                                    label="Hantar"
                                                    icon="check"
                                                    form="quarterPaymentForm"
                                                />
                                            {/if}
                                        </ContentHeader>
                                        {#if data.applicationType !== 'luar'}
                                            <ul
                                                class="flex w-full flex-col gap-2.5"
                                            >
                                                <li>
                                                    <Radio
                                                        aria-describedby="in25Km"
                                                        class="p-3"
                                                        disabled={submitPayment}
                                                        bind:group={$quarterPaymentForm.paymentMethod}
                                                        value={1}
                                                        >Dalam Jarak 25KM</Radio
                                                    >
                                                    <Helper
                                                        id="in25Km"
                                                        class="ps-9"
                                                        >Potongan ITP 75% dan
                                                        Potongan COLA 50%</Helper
                                                    >
                                                </li>

                                                <li>
                                                    <Radio
                                                        aria-describedby="moreThan25Km"
                                                        class="p-3"
                                                        disabled={submitPayment}
                                                        bind:group={$quarterPaymentForm.paymentMethod}
                                                        value={2}
                                                        >Jarak Melebihi 25KM</Radio
                                                    >
                                                    <Helper
                                                        id="moreThan25Km"
                                                        class="ps-9"
                                                        >Potongan COLA 50%</Helper
                                                    >
                                                </li>

                                                <li>
                                                    <Radio
                                                        aria-describedby="betterGradeForKuarters"
                                                        class="p-3"
                                                        disabled={submitPayment}
                                                        bind:group={$quarterPaymentForm.paymentMethod}
                                                        value={3}
                                                        >Gred Jawatan Melebihi
                                                        Kategori Kuarters</Radio
                                                    >
                                                    <Helper
                                                        id="betterGradeForKuarters"
                                                        class="ps-9"
                                                        >Potongan ITP mengikut
                                                        nilai sewaan gred
                                                        tertinggi kuarters yang
                                                        diperuntukkan (RM):</Helper
                                                    >

                                                    <div class="w-[220px] ps-9">
                                                        <CustomTextField
                                                            label=""
                                                            id="rentRate"
                                                            type="number"
                                                            disabled={$quarterPaymentForm.paymentMethod !==
                                                            3
                                                                ? true
                                                                : submitPayment
                                                                  ? true
                                                                  : false}
                                                            bind:val={$quarterPaymentForm.rentRate}
                                                            errors={$quarterPaymentError.rentRate}
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        {:else}
                                            <CustomTextField
                                                label="Nilai Sewaan Bulanan (RM)"
                                                type="number"
                                                id="rentRate"
                                                disabled={submitPayment}
                                                bind:val={$quarterPaymentForm.rentRate}
                                                errors={$quarterPaymentError.rentRate}
                                            />
                                            <CustomTextField
                                                label="Deposit (2 bulan nilai sewaan) (RM)"
                                                type="number"
                                                id="deposit"
                                                disabled={submitPayment}
                                                bind:val={$quarterPaymentForm.deposit}
                                                errors={$quarterPaymentError.deposit}
                                            />
                                            <CustomTextField
                                                label="Deposit (Air dan Elektrik) (RM)"
                                                type="number"
                                                id="billDeposit"
                                                disabled={submitPayment}
                                                bind:val={$quarterPaymentForm.billDeposit}
                                                errors={$quarterPaymentError.billDeposit}
                                            />
                                        {/if}
                                    </form>
                                </CustomTabContent>
                            </CustomTab>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}

            {#if (data.currentRoleCode == UserRoleConstant.kakitangan.code || data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code) && successOtherDocUpload}
                <StepperContent>
                    <StepperContentHeader title="Surat Tawaran Kuarters">
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            onClick={() => uploadDocument(2)}
                        /></StepperContentHeader
                    >
                    <StepperContentBody>
                        <div
                            class="flex w-full flex-col justify-start gap-4 p-3"
                        >
                            {#if !successOtherDocUpload}
                                <div class="flex w-full flex-col">
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Tiada Maklumat!
                                            </span>
                                            Surat Tawaran menduduki kuarters akan
                                            dijana setelah permohonan diluluskan
                                            oleh Pengarah Bahagian/Negeri.
                                        </p>
                                    </Alert>
                                </div>
                            {:else if successOtherDocUpload && data.quartersOtherDocument.document.length == 0}
                                <div class="flex w-full flex-col">
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Muat naik dokumen-dokumen yang berkaitan.
                                        </p>
                                    </Alert>
                                </div>
                                <a
                                    href={data.movingIncertificateLetter
                                        .document}
                                    download="Borang Akuan Keluar Kuarters.pdf"
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >Borang Akuan Keluar Kuarters.pdf</a
                                >
                                <a
                                    href={data.movingInGuidelineLetter.document}
                                    download="Garis Panduan Permohonan.pdf"
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >Garis Panduan Permohonan.pdf</a
                                >
                                <a
                                    href={data.movingInCertificationLetter
                                        .document}
                                    download="Surat Akuan Patuh.pdf"
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >Surat Akuan Patuh.pdf</a
                                >
                                <a
                                    href={data.movingInMovingInLetter.document}
                                    download="Borang Pemeriksaan Masuk Rumah.pdf"
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >Borang Pemeriksaan Masuk Rumah.pdf</a
                                >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomFileField
                                        label="Dokumen Sokongan"
                                        id="othersDocument"
                                        bind:files
                                    ></CustomFileField>
                                </div>
                            {:else if successOtherDocUpload && data.quartersOtherDocument.document}
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:
                                            </span>
                                            Muat turun dokumen-dokumen yang telah
                                            dimuat naik.
                                        </p>
                                    </Alert>
                                    {#if data.quartersOtherDocument}
                                        {#each data.quartersOtherDocument.document as otherDocument, i}
                                            <a
                                                href={otherDocument.document}
                                                download={otherDocument.name}
                                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                                >{i+1}. {otherDocument.name}</a
                                            >
                                        {/each}
                                    {/if}
                            {/if}
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {:else if data.isFirstApplication}
            <StepperContent>
                <StepperContentHeader title="Maklumat Peribadi Pemohon">
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        onClick={() => _applyQuarters()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tindakan: </span>
                                Sila klik butang seterusnya untuk membuat permohonan
                                masuk kuarters.
                            </p>
                        </Alert>
                    </div>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        method="POST"
                        use:personalDetailEnhance
                        id="personalDetailForm"
                    >
                        <CustomTextField
                            label="Nama Penuh"
                            id="name"
                            disabled
                            bind:val={$personalDetailForm.name}
                            errors={$personalDetailError.name}
                        />
                        <CustomTextField
                            label="No. Kad Pengenalan"
                            id="identityDocumentNumber"
                            disabled
                            bind:val={$personalDetailForm.identityDocumentNumber}
                            errors={$personalDetailError.identityDocumentNumber}
                        />
                        <CustomTextField
                            label="No. Telefon"
                            id="phoneNumber"
                            disabled
                            bind:val={$personalDetailForm.phoneNumber}
                            errors={$personalDetailError.phoneNumber}
                        />
                        <CustomTextField
                            label="Alamat Surat Menyurat"
                            id="mailAddress"
                            disabled
                            bind:val={$personalDetailForm.mailAddress}
                            errors={$personalDetailError.mailAddress}
                        />
                        <CustomTextField
                            label="No. Pekerja"
                            id="employeeNumber"
                            disabled
                            bind:val={$personalDetailForm.employeeNumber}
                            errors={$personalDetailError.employeeNumber}
                        />
                        <CustomSelectField
                            label="Gred"
                            id="gradeId"
                            options={data.lookup.gradeLookup}
                            disabled
                            bind:val={$personalDetailForm.gradeId}
                            errors={$personalDetailError.gradeId}
                        />
                        <CustomSelectField
                            label="Penempatan"
                            id="placementId"
                            options={data.lookup.placementLookup}
                            disabled
                            bind:val={$personalDetailForm.placementId}
                            errors={$personalDetailError.placementId}
                        />
                        <CustomSelectField
                            label="Status"
                            id="maritalId"
                            disabled
                            options={data.lookup.maritalLookup}
                            bind:val={$personalDetailForm.maritalId}
                            errors={$personalDetailError.maritalId}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
