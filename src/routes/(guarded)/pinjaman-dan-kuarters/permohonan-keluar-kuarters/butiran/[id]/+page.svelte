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
        certifyOptions,
    } from '$lib/constants/core/radio-option-constants';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        _fileToBase64Object,
        _submitConfirmationForm,
        _submitMoveOutForm,
        _submitMovingOutDocument,
        _submitSecretaryApprovalForm,
    } from './+page';
    import {
        _addConfirmationSchema,
        _moveOutQuarter,
        _quarterCommonApproval,
    } from '$lib/schemas/mypsm/quarters/quarters-schema';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';

    export let data: PageData;
    let isCheck: boolean = true;
    let paymentRates: number = 3;
    let moveOutSubmitted: boolean = false;
    let successUpload: boolean = false;
    let secretaryApproval: boolean = false;
    let submitConfirmation: boolean = false;

    let files: FileList;

    if (data.movingOutDate.movingOutDate !== null) {
        moveOutSubmitted = true;
    }
    if (data.quarterDocuments.document !== null) {
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
        validators: zod(_quarterCommonApproval),
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
    const handleDownload = async (url: string) => {
        await ContractEmployeeServices.downloadContractAttachment(url);
    };
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
                    const res = await _submitMovingOutDocument(
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
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomRadioBoolean
                        label="Jenis Pemohon"
                        id=""
                        options={data.lookup.applicantType}
                        val={1}
                    />
                </form>
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
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
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
                </div>
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
            <StepperContentHeader title="Maklumat Penempatan Kuarters"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    <CustomTextField
                        label="Emel Pemohon"
                        id="email"
                        disabled
                        bind:val={data.quarterDetails.email}
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
                    <ul class="flex w-full flex-col gap-2.5">
                        <li>
                            <Radio
                                aria-describedby="in25Km"
                                class="p-3"
                                disabled
                                bind:group={data.quarterDetails.paymentMethod}
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
                                bind:group={data.quarterDetails.paymentMethod}
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
                                bind:group={data.quarterDetails.paymentMethod}
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
                                    val={0}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluar Kuarters">
                {#if !moveOutSubmitted && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        label="Simpan"
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
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if !successUpload && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        onClick={() => uploadDocument()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Dokumen Keluar Kuarters"
                    borderClass="border-none"
                />
                {#if data.quarterDocuments.document !== null}
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
                        <DownloadAttachment
                            fileName="Borang Akuan Keluar Kuarters.pdf"
                            triggerDownload={() =>
                                handleDownload(data.quartersDeclarationLetter)}
                        />
                        <DownloadAttachment
                            fileName="Borang Pemeriksaan Keluar Kuarters.pdf"
                            triggerDownload={() =>
                                handleDownload(
                                    data.quartersMovingOutCheckingLetter,
                                )}
                        />
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

        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                {#if !submitConfirmation && data.currentRoleCode == UserRoleConstant.kakitangan.code}
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
                    method="POST"
                    use:confirmationEnhance
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
                            options={certifyOptions}
                            bind:val={$secretaryApprovalForm.status}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Permohonan">
                    <TextIconButton label="Simpan" icon="check" form="" />
                </StepperContentHeader>
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
                                    bind:val={data.quarterDetails.email}
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
                                <ul class="flex w-full flex-col gap-2.5">
                                    <li>
                                        <Radio
                                            aria-describedby="in25Km"
                                            class="p-3"
                                            disabled
                                            bind:group={data.quarterDetails
                                                .paymentMethod}
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
                                            disabled
                                            bind:group={data.quarterDetails
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
                                            bind:group={data.quarterDetails
                                                .paymentMethod}
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
                                                disabled
                                                val={0}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </CustomTabContent>
                        <CustomTabContent title="Maklumat Pengeluaran">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 p-3"
                                id=""
                                method="POST"
                            >
                                <ContentHeader
                                    title="Kemaskini Butiran Keluar Kuarter"
                                    borderClass="border-none"
                                />

                                <CustomTextField
                                    label="Tarikh Keluar Kuarter"
                                    id=""
                                    type="date"
                                    val=""
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Unit dan Kuarters"
                                    id="quarterDetails"
                                    disabled
                                    bind:val={data.quarterDetails
                                        .quarterDetails}
                                />
                            </form>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />
