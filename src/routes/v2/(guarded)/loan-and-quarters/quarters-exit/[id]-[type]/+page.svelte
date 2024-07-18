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
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { Toaster } from 'svelte-french-toast';
    import {
        approveOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { Alert, Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        _fileToBase64Object,
        _submitConfirmationForm,
        _submitDirectorApprovalForm,
        _submitMoveOutForm,
        _submitMovingOutDocument,
        _submitOutstandingDocument,
        _submitSecretaryApprovalForm,
        _submitSetDirectorForm,
    } from './+page';
    import {
        _addConfirmationSchema,
        _moveOutQuarter,
        _quarterCommonApproval,
        _setDirector,
        _quarterSecretaryApproval,
    } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';

    export let data: PageData;
    let moveOutSubmitted: boolean = false;
    let successUpload: boolean = false;
    let secretaryApproval: boolean = false;
    let submitConfirmation: boolean = false;
    let outstandingUploaded: boolean = false;
    let directorExist: boolean = false;
    let submitDirectorApproval: boolean = false;
    let files: FileList;

    let applicantType: number = 1;

    //for application type radio
    if (data.applicationType == 'luar') {
        applicantType = 2;
    }
    if (data.quarterDocuments.document.length > 0) {
        successUpload = true;
    }
    if (data.secretaryApproval.remark !== null) {
        secretaryApproval = true;
    }

    const {
        form: moveOutForm,
        errors: moveOutError,
        enhance: moveOutEnhance,
    } = superForm(data.moveOutForm, {
        SPA: true,
        taintedMessage: false,
        id: 'moveOutForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_moveOutQuarter),
        async onSubmit() {
            $moveOutForm.id = data.currentId.id;

            const readOnly = await _submitMoveOutForm($moveOutForm);
            if (readOnly?.response.status == 'success') {
                moveOutSubmitted = true;
            }
        },
    });
    if ($moveOutForm.movingOutDate !== '') {
        moveOutSubmitted = true;
    }
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
    if ($confirmationForm.confirm) {
        submitConfirmation = true;
    }
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

            const readOnly = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                secretaryApproval = true;
            }
        },
    });
    if ($secretaryApprovalForm.remark !== null) {
        directorExist = true;
    }
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

            const readOnly = await _submitDirectorApprovalForm(
                $directorApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                submitDirectorApproval = true;
            }
        },
    });
    if ($directorApprovalForm.remark !== null) {
        submitDirectorApproval = true;
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
                    };
                    if (stepper == 1) {
                        const res = await _submitOutstandingDocument(
                            JSON.stringify(quartersDocument),
                        );

                        if (res.response.status == 'success') {
                            outstandingUploaded = true;
                        }
                    } else if (stepper == 2) {
                        const res = await _submitMovingOutDocument(
                            JSON.stringify(quartersDocument),
                        );

                        if (res.response.status == 'success') {
                            successUpload = true;
                        }
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Keluar Kuarters">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() =>
                goto('/pinjaman-dan-kuarters/permohonan-keluar-kuarters')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Jenis Pemohon" />
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    <CustomRadioBoolean
                        label="Jenis Pemohon"
                        id=""
                        options={data.lookup.applicantType}
                        bind:val={applicantType}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi Pemohon" />
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    <CustomTextField
                        label="Nama Penuh"
                        id="name"
                        disabled
                        bind:val={data.personalDetail.name}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id="identityDocumentNumber"
                        disabled
                        bind:val={data.personalDetail.identityDocumentNumber}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="phoneNumber"
                        disabled
                        bind:val={data.personalDetail.phoneNumber}
                    />
                    <CustomTextField
                        label="Alamat Surat Menyurat"
                        id="mailAddress"
                        disabled
                        bind:val={data.personalDetail.mailAddress}
                    />

                    {#if data.applicationType !== 'luar'}
                        <CustomTextField
                            label="No. Pekerja"
                            id="employeeNumber"
                            disabled
                            bind:val={data.personalDetail.employeeNumber}
                        />
                        <CustomSelectField
                            label="Gred"
                            id="gradeId"
                            options={data.lookup.gradeLookup}
                            disabled
                            bind:val={data.personalDetail.gradeId}
                        />
                        <CustomSelectField
                            label="Penempatan"
                            id="placementId"
                            options={data.lookup.placementLookup}
                            disabled
                            bind:val={data.personalDetail.placementId}
                        />
                        <CustomSelectField
                            label="Status"
                            id="maritalId"
                            disabled
                            options={data.lookup.maritalLookup}
                            bind:val={data.personalDetail.maritalId}
                        />
                    {:else}
                        <CustomTextField
                            label="Email"
                            id="email"
                            disabled
                            bind:val={data.personalDetail.email}
                        />
                        <CustomRadioBoolean
                            label="Berkahwin"
                            id="marital"
                            disabled
                            bind:val={data.personalDetail.marital}
                        />
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pasangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <!-- TODO: CHECK FOR PARTNER EXIST OR NOT -->
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
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
                    {:else if data.outsiderFamily.position == null}
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
                            disabled
                            bind:val={data.outsiderFamily.name}
                        />
                        <CustomTextField
                            label="No. Telefon"
                            id="phoneNumber"
                            disabled
                            bind:val={data.outsiderFamily.phoneNumber}
                        />
                        <CustomTextField
                            label="Jabatan / Jawatan"
                            id="position"
                            disabled
                            bind:val={data.outsiderFamily.position}
                        />
                        <CustomTextField
                            label="Gaji Sekarang Yang Diterima (Gaji Pokok/Hakiki)"
                            id="currentSalary"
                            disabled
                            bind:val={data.outsiderFamily.currentSalary}
                        />
                        <CustomTextField
                            label="Bilangan Anak Yang Tinggal Bersama Pemohon Yang Berumur Kurang 21 Tahun"
                            id="totalChildren"
                            disabled
                            bind:val={data.outsiderFamily.totalChildren}
                        />
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
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
                            disabled
                            bind:val={data.outsiderService.position}
                        />
                        <CustomSelectField
                            label="Gred (Jika Ada)"
                            options={data.lookup.gradeLookup}
                            id="gradeId"
                            disabled
                            bind:val={data.outsiderService.gradeId}
                        />
                        <CustomTextField
                            label="Alamat Penuh Jabatan/Agensi Bertugas"
                            id="officeAddress"
                            disabled
                            bind:val={data.outsiderService.officeAddress}
                        />
                        <CustomTextField
                            label="Alamat Penuh Jabatan/Agensi Pembayar Gaji"
                            id="employerOfficeAddress"
                            disabled
                            bind:val={data.outsiderService
                                .employerOfficeAddress}
                        />
                        <CustomTextField
                            label="Bank Pembayar Gaji"
                            id="bankName"
                            placeholder=""
                            disabled
                            bind:val={data.outsiderService.bankName}
                        />
                        <CustomTextField
                            label="Gaji Sekarang (Gaji Pokok/Hakiki)"
                            id="currentSalary"
                            disabled
                            bind:val={data.outsiderService.currentSalary}
                        />
                        <CustomTextField
                            label="ITP"
                            id="ITP"
                            disabled
                            bind:val={data.outsiderService.ITP}
                        />
                        <CustomTextField
                            label="COLA"
                            id="COLA"
                            disabled
                            bind:val={data.outsiderService.COLA}
                        />
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Penempatan Kuarters"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    <CustomTextField
                        label="Emel Pemohon"
                        id="email"
                        disabled
                        bind:val={data.personalDetail.email}
                    />
                    <CustomTextField
                        label="Tarikh Masuk Kuarters"
                        id="movingInDate"
                        disabled
                        bind:val={data.quarterDetails.movingInDate}
                    />
                    <CustomTextField
                        label="Unit dan Kuarters"
                        id="quarterDetails"
                        disabled
                        bind:val={data.quarterDetails.quarterDetails}
                    />
                    <ContentHeader
                        title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                        borderClass="border-none"
                    />
                    {#if data.applicationType !== 'luar'}
                        <ul class="flex w-full flex-col gap-2.5">
                            <li>
                                <Radio
                                    aria-describedby="in25Km"
                                    class="p-3"
                                    disabled
                                    bind:group={data.paymentDetail
                                        .paymentMethod}
                                    value={1}>Dalam Jarak 25KM</Radio
                                >
                                <Helper id="in25Km" class="ps-9"
                                    >Potongan ITP 75% dan Potongan COLA 50%</Helper
                                >
                            </li>

                            <li>
                                <Radio
                                    aria-describedby="moreThan25Km"
                                    class="p-3"
                                    disabled
                                    bind:group={data.paymentDetail
                                        .paymentMethod}
                                    value={2}>Jarak Melebihi 25KM</Radio
                                >
                                <Helper id="moreThan25Km" class="ps-9"
                                    >Potongan COLA 50%</Helper
                                >
                            </li>

                            <li>
                                <Radio
                                    aria-describedby="betterGradeForKuarters"
                                    class="p-3"
                                    disabled
                                    bind:group={data.paymentDetail
                                        .paymentMethod}
                                    value={3}
                                    >Gred Jawatan Melebihi Kategori Kuarters</Radio
                                >
                                <Helper id="betterGradeForKuarters" class="ps-9"
                                    >Potongan ITP mengikut nilai sewaan gred
                                    tertinggi kuarters yang diperuntukkan (RM):</Helper
                                >

                                <div class="w-[220px] ps-9">
                                    <CustomTextField
                                        label=""
                                        id=""
                                        type="number"
                                        disabled
                                        bind:val={data.paymentDetail.rentRate}
                                    />
                                </div>
                            </li>
                        </ul>
                    {:else if data.applicationType == 'luar'}
                        <CustomTextField
                            label="Nilai Sewaan Bulanan (RM)"
                            type="number"
                            id="rentRate"
                            disabled
                            bind:val={data.paymentDetail.rentRate}
                        />
                        <CustomTextField
                            label="Deposit (2 bulan nilai sewaan) (RM)"
                            type="number"
                            id="deposit"
                            disabled
                            bind:val={data.paymentDetail.deposit}
                        />
                        <CustomTextField
                            label="Deposit (Air dan Elektrik) (RM)"
                            type="number"
                            id="billDeposit"
                            disabled
                            bind:val={data.paymentDetail.billDeposit}
                        />
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluar Kuarters">
                {#if (!moveOutSubmitted && data.currentRoleCode == UserRoleConstant.kakitangan.code) || data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="moveOutForm"
                    />
                    <TextIconButton
                    label="Hantar"
                    icon="check"
                    form="moveOutForm"
                />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="moveOutForm"
                    method="POST"
                    use:moveOutEnhance
                >
                    <CustomTextField
                        label="Tarikh Keluar Kuarter Yang Dipohon"
                        id="movingOutDate"
                        disabled={moveOutSubmitted}
                        type="date"
                        bind:val={$moveOutForm.movingOutDate}
                        errors={$moveOutError.movingOutDate}
                    />
                    <CustomTextField
                        label="Unit dan Kuarter"
                        id="quarterDetails"
                        disabled
                        bind:val={data.quarterDetails.quarterDetails}
                    />

                    {#if data.applicationType == 'luar'}
                        <ContentHeader
                            title="Butiran Tunggakan Bayaran"
                            borderClass="border-none"
                        />
                        <CustomRadioBoolean
                            label="Unit dan Kuarter"
                            id="outstandingBalance"
                            disabled={moveOutSubmitted}
                            bind:val={$moveOutForm.outstandingBalance}
                        />
                        {#if $moveOutForm.outstandingBalance}
                            <CustomTextField
                                label="Jumlah Tunggakan (RM)"
                                id="outstandingAmount"
                                type="number"
                                disabled={moveOutSubmitted}
                                bind:val={$moveOutForm.outstandingAmount}
                            />

                            {#if data.outstandingDocument.document.length > 0}
                                <div
                                    class="flex h-fit w-full flex-col justify-start gap-2 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                                >
                                    {#each data.outstandingDocument.document as documents}
                                        <a
                                            href={documents.document}
                                            download={documents.name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{documents.name}</a
                                        >
                                    {/each}
                                </div>
                            {:else}
                                <div class="flex w-full flex-col gap-2">
                                    <ContentHeader
                                        title="Tindakan: Muat naik surat arahan bayaran tunggakan."
                                        borderClass="border-none"
                                    >
                                        {#if !outstandingUploaded && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                                            <TextIconButton
                                                label="Muat Naik"
                                                icon="check"
                                                onClick={() =>
                                                    uploadDocument(1)}
                                            />
                                        {/if}
                                    </ContentHeader>
                                    <CustomFileField
                                        label="Muat naik"
                                        id="movingOutDocument"
                                        bind:files
                                    ></CustomFileField>
                                </div>
                            {/if}
                        {/if}
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if !successUpload && (data.currentRoleCode == UserRoleConstant.kakitangan.code || data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code)}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        onClick={() => uploadDocument(2)}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Dokumen Keluar Kuarters"
                    borderClass="border-none"
                />
                {#if data.quarterDocuments.document.length > 0}
                    <div
                        class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Dokumen-dokumen sokongan yang telah dimuat naik
                            oleh pemohon :</span
                        >
                        {#each data.quarterDocuments.document as documents}
                            <a
                                href={documents.document}
                                download={documents.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{documents.name}</a
                            >
                        {/each}
                    </div>
                {:else}
                    <div
                        class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Muat turun dan isi salinan borang di bawah dan muat
                            naik pada ruangan yang disediakan.</span
                        >
                        <span
                        >1. Sijil akuan Keluar Rumah.</span
                    >
                    <span
                        >2. Borang Pemeriksaan Keluar Rumah.</span
                    >
                    <span
                        >3. Gambar Dalam Rumah</span
                    >
                        <a
                            href={data.quartersDeclarationLetter.document}
                            download="Borang Akuan Keluar Kuarters.pdf"
                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                            >Borang Akuan Keluar Kuarters.pdf</a
                        >
                        <a
                        href={data.quartersMovingOutOutstandingLetter.document}
                        download="Sijil Keluar Kuarters.pdf"
                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                        >Sijil Keluar Kuarters.pdf</a
                    >
                    <a
                    href={data.memoMovingOutOutstandingLetter.document}
                    download="Memorandum.pdf"
                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                    >Memorandum.pdf</a
                >
                        <a
                            href={data.quartersMovingOutCheckingLetter.document}
                            download={data.quartersMovingOutCheckingLetter.name}
                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                            >{data.quartersMovingOutCheckingLetter.name}</a
                        >
                    </div>
                    <div class="flex w-full flex-col gap-2 px-3">
                        <CustomFileField
                            label="Dokumen Sokongan"
                            id="movingOutDocument"
                            bind:files
                        ></CustomFileField>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        {#if data.applicationType == 'kakitangan'}
            <StepperContent>
                <StepperContentHeader title="Pengesahan">
                    {#if !submitConfirmation && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
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
                        class="flex w-full flex-col justify-start gap-2.5"
                        id="confirmationForm"
                        method="POST"
                        use:confirmationEnhance
                    >
                        <Checkbox
                            disabled={submitConfirmation}
                            bind:checked={$confirmationForm.confirm}
                            >Saya dengan ini mengesahkan bahawa maklumat
                            sebagaimana yang dinyatakan berikut adalah benar.</Checkbox
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
                    {#if !secretaryApproval && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="secretaryApproval"
                        />
                        <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="secretaryApproval"
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
                        id="secretaryApproval"
                        method="POST"
                        use:secretaryApprovalEnhance
                    >
                        <CustomTextField
                            label="Tindakan Ulasan"
                            id="remark"
                            disabled={secretaryApproval}
                            bind:val={$secretaryApprovalForm.remark}
                            errors={$secretaryApprovalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            disabled={secretaryApproval}
                            options={approveOptions}
                            bind:val={$secretaryApprovalForm.status}
                        />
                        <CustomSelectField
                            label="Pengarah Bahagian/Negeri"
                            options={data.lookup.supporterApproverLookup}
                            disabled={secretaryApproval}
                            id="directorApproverId"
                            bind:val={$secretaryApprovalForm.directorApproverId}
                            errors={$secretaryApprovalError.directorApproverId}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Maklumat Permohonan"
                ></StepperContentHeader>
                <StepperContentBody paddingClass="p-none">
                    <CustomTab>
                        <CustomTabContent title="Maklumat Penempatan">
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                            >
                                <CustomTextField
                                    label="Emel Pemohon"
                                    id="email"
                                    disabled
                                    bind:val={data.personalDetail.email}
                                />
                                <CustomTextField
                                    label="Tarikh Masuk Kuarters"
                                    id="movingInDate"
                                    disabled
                                    bind:val={data.quarterDetails.movingInDate}
                                />
                                <CustomTextField
                                    label="Unit dan Kuarters"
                                    id="quarterDetails"
                                    disabled
                                    bind:val={data.quarterDetails
                                        .quarterDetails}
                                />
                                <ContentHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                    borderClass="border-none"
                                />

                                {#if data.applicationType == 'kakitangan'}
                                    <ul class="flex w-full flex-col gap-2.5">
                                        <li>
                                            <Radio
                                                aria-describedby="in25Km"
                                                class="p-3"
                                                disabled
                                                bind:group={data.paymentDetail
                                                    .paymentMethod}
                                                value={1}
                                                >Dalam Jarak 25KM</Radio
                                            >
                                            <Helper id="in25Km" class="ps-9"
                                                >Potongan ITP 75% dan Potongan
                                                COLA 50%</Helper
                                            >
                                        </li>

                                        <li>
                                            <Radio
                                                aria-describedby="moreThan25Km"
                                                class="p-3"
                                                disabled
                                                bind:group={data.paymentDetail
                                                    .paymentMethod}
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
                                                disabled
                                                bind:group={data.paymentDetail
                                                    .paymentMethod}
                                                value={3}
                                                >Gred Jawatan Melebihi Kategori
                                                Kuarters</Radio
                                            >
                                            <Helper
                                                id="betterGradeForKuarters"
                                                class="ps-9"
                                                >Potongan ITP mengikut nilai
                                                sewaan gred tertinggi kuarters
                                                yang diperuntukkan (RM):</Helper
                                            >

                                            <div class="w-[220px] ps-9">
                                                <CustomTextField
                                                    label=""
                                                    id=""
                                                    type="number"
                                                    disabled
                                                    bind:val={data.paymentDetail
                                                        .rentRate}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                {:else}
                                    <CustomTextField
                                        label="Nilai Sewaan Bulanan (RM)"
                                        type="number"
                                        id="rentRate"
                                        disabled
                                        bind:val={data.paymentDetail.rentRate}
                                    />
                                    <CustomTextField
                                        label="Deposit (2 bulan nilai sewaan) (RM)"
                                        type="number"
                                        id="deposit"
                                        disabled
                                        bind:val={data.paymentDetail.deposit}
                                    />
                                    <CustomTextField
                                        label="Deposit (Air dan Elektrik) (RM)"
                                        type="number"
                                        id="billDeposit"
                                        disabled
                                        bind:val={data.paymentDetail
                                            .billDeposit}
                                    />
                                {/if}
                            </div>
                        </CustomTabContent>
                        <CustomTabContent title="Maklumat Keluar">
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                            >
                                <ContentHeader
                                    title="Butiran Keluar Kuarter"
                                    borderClass="border-none"
                                />

                                <CustomTextField
                                    label="Tarikh Keluar Kuarter"
                                    id="movingOutDate"
                                    type="date"
                                    disabled
                                    bind:val={$moveOutForm.movingOutDate}
                                    errors={$moveOutError.movingOutDate}
                                />
                                <CustomTextField
                                    label="Unit dan Kuarters"
                                    id="quarterDetails"
                                    disabled
                                    bind:val={data.quarterDetails
                                        .quarterDetails}
                                />
                            </div>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Ulasan daripada Pengarah Bahagian/Negeri"
                >
                    {#if !submitDirectorApproval && (data.currentRoleCode == UserRoleConstant.pengarahBahagian.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="directorApprovalForm"
                        />
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="directorApprovalForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if directorExist}
                        {#if !submitDirectorApproval && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!
                                        </span>
                                        Menunggu keputusan daripada Pengarah Bahagian/Negeri.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 px-3 pt-3"
                            >
                                <CustomSelectField
                                    label="Pengarah Bahagian/Negeri"
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    disabled
                                    id="directorApproverId"
                                    bind:val={$secretaryApprovalForm.directorApproverId}
                                />
                            </div>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 px-3"
                                id="directorApprovalForm"
                                method="POST"
                                use:directorApprovalEnhance
                            >
                                <CustomTextField
                                    label="Tindakan Ulasan"
                                    id="remark"
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
                            </form>
                        {/if}
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
