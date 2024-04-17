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
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        _addConfirmationSchema,
        _addQuarterDetails,
        _quarterCommonApproval,
    } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import {
        _fileToBase64Object,
        _submitConfirmationForm,
        _submitDirectorApprovalForm,
        _submitQuarterDetailsForm,
        _submitQuartersDocument,
        _submitSecretaryApprovalForm,
    } from './+page';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';

    export let data: PageData;
    let submitConfirmation: boolean = false;
    let submitSecretaryApproval: boolean = false;
    let submitQuarterDetails: boolean = false;
    let submitDirectorApproval: boolean = false;
    let successUpload: boolean = false;
    let paymentRates: number = 2;
    let files: FileList;

    if (data.quarterDocuments.document !== null) {
        successUpload = true;
    }
    if (data.quarterDetails.directorApproverId !== 0) {
        submitQuarterDetails = true;
    }
    if (data.directorApproval.remark !== null) {
        submitDirectorApproval = true;
    }

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    let quartersDocument: QuartersUploadDocuments = {
                        id: data.currentId.id,
                        documents: result,
                    };
                    const res = await _submitQuartersDocument(
                        JSON.stringify(quartersDocument),
                    );

                    if (res.response.status == 'success') {
                        successUpload = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    if (data.quarterDocuments.document !== null) {
        successUpload = true;
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
        validators: zod(_quarterCommonApproval),
        async onSubmit() {
            $secretaryApprovalForm.id = data.currentId.id;

            const readOnly = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                submitSecretaryApproval = true;
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

            const readOnly =
                await _submitQuarterDetailsForm($quarterDetailForm);
            if (readOnly?.response.status == 'success') {
                submitQuarterDetails = true;
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

            const readOnly = await _submitDirectorApprovalForm(
                $directorApprovalForm,
            );
            if (readOnly?.response.status == 'success') {
                submitDirectorApproval = true;
            }
        },
    });
    if ($confirmationForm.confirm) {
        submitConfirmation = true;
    }
    if (data.secretaryApproval.remark !== null) {
        submitSecretaryApproval = true;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Masuk Kuarters">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() =>
                goto('/pinjaman-dan-kuarters/permohonan-masuk-kuarters')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Jenis Pemohon">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomRadioBoolean
                        label="Jenis Pemohon"
                        id=""
                        options={data.lookup.applicantType}
                        val={data.currentRoleCode ==
                        UserRoleConstant.kakitangan.code
                            ? 1
                            : 2}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi Pemohon"
            ></StepperContentHeader>
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
                    <CustomSelectField
                        label="Status"
                        id="maritalId"
                        disabled
                        options={data.lookup.maritalLookup}
                        bind:val={data.personalDetail.maritalId}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pasangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <!-- TODO: CHECK FOR PARTNER EXIST OR NOT -->
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
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
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
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
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if !successUpload}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        onClick={() => uploadDocument()}
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
                    {#if data.quarterDocuments.document !== null}
                        <div class="flex flex-col justify-start gap-3 p-3">
                            {#each data.quarterDocuments.document as docs}
                                <a
                                    href={docs.document}
                                    download={docs.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{docs.name}</a
                                >
                            {/each}
                        </div>
                    {:else}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                        >
                            <span>Muat naik salinan</span>
                            <span>1. Kad Pengenalan Sendiri</span>
                            <span>2. Kad Pengenalan Pasangan</span>
                            <span>3. Kad Nikah</span>
                            <span>4. Gambar Dalaman Kuarters</span>
                            <span>5. Slip Gaji 3 Bulan Terkini</span>
                            <span>6. Surat Pengesahan Jabatan/Majikan</span>
                        </div>
                        <input
                            class="rounded-md bg-ios-systemColors-systemFill-light"
                            accept=".pdf"
                            type="file"
                            multiple
                            bind:files
                        />
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                {#if !submitConfirmation && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="confirmationForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader title="Pengesahan" borderClass="border-none" />
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id="confirmationForm"
                    use:confirmationEnhance
                    method="POST"
                >
                    <Checkbox
                        disabled={submitConfirmation}
                        bind:checked={$confirmationForm.confirm}
                        >Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar.</Checkbox
                    >
                </form>
            </StepperContentBody>
        </StepperContent>

        {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code}
            <StepperContent>
                <StepperContentHeader
                    title="Ulasan Kelulusan daripada Urus Setia"
                >
                    {#if !submitSecretaryApproval && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <TextIconButton
                            label="Simpan"
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
                        class="flex w-full flex-col justify-start gap-2.5"
                        id="secretaryApprovalForm"
                        method="POST"
                        use:secretaryApprovalEnhance
                    >
                        <CustomTextField
                            label="Tindakan Ulasan"
                            id="remark"
                            disabled={submitSecretaryApproval}
                            bind:val={$secretaryApprovalForm.remark}
                            errors={$secretaryApprovalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            disabled={submitSecretaryApproval}
                            options={approveOptions}
                            bind:val={$secretaryApprovalForm.status}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Ulasan Kelulusan daripada Pengarah Negeri / Bahagian"
                >
                    {#if (!submitDirectorApproval && data.currentRoleCode == UserRoleConstant.pengarahNegeri.code) || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code}
                        <TextIconButton
                            label="Simpan"
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
                        class="flex w-full flex-col justify-start gap-2.5"
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
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Permohonan">
                    {#if !submitQuarterDetails && data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="quarterDetailForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <CustomTab>
                        <CustomTabContent title="Maklumat Kelayakan">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id=""
                                method="POST"
                            >
                                <ContentHeader
                                    title="Maklumat Kelayakan"
                                    borderClass="border-none"
                                />
                                <CustomTextField label="Gred" id="" val="" />
                            </form>
                        </CustomTabContent>
                        <CustomTabContent
                            title="Maklumat Kelulusan dan Tawaran"
                        >
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id="quarterDetailForm"
                                method="POST"
                                use:quarterDetailEnhance
                            >
                                <ContentHeader
                                    title="Pelulus"
                                    borderClass="border-none"
                                />
                                <CustomSelectField
                                    label="Nama Pelulus"
                                    id="directorApproverId"
                                    disabled={submitQuarterDetails}
                                    options={data.lookup
                                        .supporterApproverLookup}
                                    bind:val={$quarterDetailForm.directorApproverId}
                                    errors={$quarterDetailError.directorApproverId}
                                />
                                <ContentHeader
                                    title="Butiran Penempatan Kuarter"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Emel Pemohon"
                                    id="email"
                                    disabled
                                    bind:val={$quarterDetailForm.email}
                                />
                                <CustomTextField
                                    label="Tarikh Masuk Kuarter"
                                    id="movingInDate"
                                    disabled={submitQuarterDetails}
                                    type="date"
                                    bind:val={$quarterDetailForm.movingInDate}
                                    errors={$quarterDetailError.movingInDate}
                                />
                                <CustomTextField
                                    label="Unit dan Kuarter"
                                    id="quarterDetails"
                                    disabled={submitQuarterDetails}
                                    bind:val={$quarterDetailForm.quarterDetails}
                                    errors={$quarterDetailError.quarterDetails}
                                />
                                <ContentHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti) *untuk permohonan dari kakitangan"
                                    borderClass="border-none"
                                />
                                <ul class="flex w-full flex-col gap-2.5">
                                    <li>
                                        <Radio
                                            aria-describedby="in25Km"
                                            class="p-3"
                                            disabled={submitQuarterDetails}
                                            bind:group={$quarterDetailForm.paymentMethod}
                                            value={1}>Dalam Jarak 25KM</Radio
                                        >
                                        <Helper id="in25Km" class="ps-9"
                                            >Potongan ITP 75% dan Potongan COLA
                                            50%</Helper
                                        >
                                    </li>

                                    <li>
                                        <Radio
                                            aria-describedby="moreThan25Km"
                                            class="p-3"
                                            disabled={submitQuarterDetails}
                                            bind:group={$quarterDetailForm.paymentMethod}
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
                                            disabled={submitQuarterDetails}
                                            bind:group={$quarterDetailForm.paymentMethod}
                                            value={3}
                                            >Gred Jawatan Melebihi Kategori
                                            Kuarters</Radio
                                        >
                                        <Helper
                                            id="betterGradeForKuarters"
                                            class="ps-9"
                                            >Potongan ITP mengikut nilai sewaan
                                            gred tertinggi kuarters yang
                                            diperuntukkan (RM):</Helper
                                        >

                                        <div class="w-[220px] ps-9">
                                            <CustomTextField
                                                label=""
                                                id=""
                                                type="number"
                                                disabled={paymentRates !== 3
                                                    ? true
                                                    : false}
                                                val={350}
                                            />
                                        </div>
                                    </li>
                                </ul>

                                <ContentHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti) *untuk permohonan agensi luar"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nilai Sewaan Bulanan (RM)"
                                    type="number"
                                    id=""
                                    val={300}
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Deposit (2 bulan nilai sewaan) (RM)"
                                    type="number"
                                    id=""
                                    val={300}
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Deposit (Air dan Elektrik) (RM)"
                                    type="number"
                                    id=""
                                    val={300.0}
                                    errors={[]}
                                />
                            </form>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            </StepperContent>
        {/if}
        <StepperContent>
            <StepperContentHeader title="Surat Tawaran Kuarters">
                {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <DownloadAttachment
                        fileName="Surat Tawaran Penempatan Kuarters"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
