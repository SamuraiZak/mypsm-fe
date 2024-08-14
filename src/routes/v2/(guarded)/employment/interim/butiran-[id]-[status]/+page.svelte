<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import {
        _addDirectorSchema,
        _addInterimApprovalSchema,
        _addNewInterimApplicationSchema,
    } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import { Toaster } from 'svelte-french-toast';
    import {
        _fileToBase64Object,
        _submitApproverForm,
        _submitChecklistForm,
        _submitDirectorForm,
        _submitInterimDocument,
        _submitSetDirector,
        _submitSkippingForm,
    } from './+page';
    import type { InterimUploadDocuments } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-upload-document.dto';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import { Alert, Checkbox, Modal } from 'flowbite-svelte';
    import {
        approveOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import FileGreyField from '$lib/components/inputs/file-upload/FileGreyField.svelte';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';

    export let data: PageData;

    let submitSkip: boolean = false;
    let submitDocument: boolean = false;
    let submitDirector: boolean = false;
    let submitChecklist: boolean = false;
    let submitApprover: boolean = false;
    let files: FileList;
    let files2: FileList;
    let files3: FileList;
    let files4: FileList;

    if (data.uploadedDocuments?.document?.length > 0) {
        submitDocument = true;
    }
    if (data.interimSupportDetail.status !== null) {
        submitDirector = true;
    }
    if (data.interimApprovalDetail.employeeId !== '') {
        submitApprover = true;
    }

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            let fileToUpload = [files, files2, files3, files4];
            _fileToBase64Object(fileToUpload)
                .then(async (result) => {
                    let interimDocuments: InterimUploadDocuments = {
                        interimId: data.interimId.interimId,
                        documents: result,
                    };
                    const response = await _submitInterimDocument(
                        JSON.stringify(interimDocuments),
                    );

                    if (response.response.status == 'success') {
                        submitDocument = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const {
        form: skippingForm,
        errors: skippingError,
        enhance: skippingEnhance,
    } = superForm(data.skippingForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        id: 'skippingForm',
        validators: zod(_addInterimApprovalSchema),
        async onSubmit() {
            $skippingForm.approvalDate = "";
            $skippingForm.interimId = data.interimId.interimId;
            if (!$skippingForm.status) {
                $skippingForm.remark = "";
            }
            const res = await _submitSkippingForm($skippingForm);
            if (res?.response.status == 'success') {
                if (!$skippingForm.isDraft) {
                    submitSkip = true;
                }
            }
        },
    });
    if (data.interimApplicationDetail?.skipping !== null) {
        submitSkip = true;
    }
    const {
        form: directorForm,
        errors: directorError,
        enhance: directorEnhance,
    } = superForm(data.directorForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        id: 'directorForm',
        validators: zod(_addInterimApprovalSchema),
        async onSubmit() {
            $directorForm.interimId = data.interimId.interimId;
            const res = await _submitDirectorForm($directorForm);
            if (res?.response.status == 'success') {
                submitDirector = true;
            }
        },
    });
    const {
        form: checklistForm,
        errors: checklistError,
        enhance: checklistEnhance,
    } = superForm(data.checklistForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'checklistForm',
        validators: zod(_addInterimApprovalSchema),
        async onSubmit() {
            $checklistForm.interimId = data.interimId.interimId;
            const res = await _submitChecklistForm($checklistForm);
            if (res?.response.status == 'success') {
                submitChecklist = true;
            }
        },
    });
    if ($checklistForm.checker !== undefined) {
        submitChecklist = true;
    }
    const {
        form: approverForm,
        errors: approverError,
        enhance: approverEnhance,
    } = superForm(data.approverForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        id: 'approverForm',
        validators: zod(_addInterimApprovalSchema),
        async onSubmit() {
            $approverForm.interimId = data.interimId.interimId;
            const res = await _submitApproverForm($approverForm);
            if (res?.response.status == 'success') {
                submitApprover = true;
            }
        },
    });

    // if ($checklistForm.checker !== undefined) {
    //     submitChecklist = true;
    // }
    const {
        form: setDirectorForm,
        errors: setDirectorError,
        enhance: setDirectorEnhance,
    } = superForm(data.setDirectorForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        id: 'setDirectorForm',
        validators: zod(_addDirectorSchema),
        async onSubmit() {
            $setDirectorForm.interimId = data.interimId.interimId;
            $setDirectorForm.type = 'pengarah negeri';
            const res = await _submitSetDirector($setDirectorForm);
            if (res?.response.status == 'success') {
                submitApprover = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tanggung Kerja">
        <StatusPill status={data.params.status} slot="status" />
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    {#if !data.failToLoad}
        <Stepper>
            <StepperContent>
                <StepperContentHeader
                    title="Butiran Permohonan Tanggung Kerja"
                />
                <StepperContentBody>
                    <div class="flex w-full items-start justify-start pb-10">
                        <div
                            class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        >
                            <CustomSelectField
                                label="Gred dan Jawatan"
                                id="grade"
                                disabled
                                isRequired={false}
                                val={data.interimApplicationDetail
                                    .applicationDetail.grade}
                                options={data.lookup.positionLookup}
                            />
                            <CustomSelectField
                                label="Kementerian/Jabatan"
                                id="placement"
                                disabled
                                isRequired={false}
                                val={data.interimApplicationDetail
                                    .applicationDetail.placement}
                                options={data.lookup.placementLookup}
                            />
                            <CustomTextField
                                id="referenceNumber"
                                disabled
                                isRequired={false}
                                label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                                placeholder={data.interimApplicationDetail
                                    .applicationDetail.referenceNumber == null
                                    ? 'Tiada'
                                    : ''}
                                type="text"
                                val={data.interimApplicationDetail
                                    .applicationDetail.referenceNumber}
                            />
                            <CustomTextField
                                id="startDate"
                                disabled
                                isRequired={false}
                                label="Tarikh Mula"
                                type="date"
                                val={data.interimApplicationDetail
                                    .applicationDetail.startDate}
                            />
                            <CustomTextField
                                id="endDate"
                                disabled
                                isRequired={false}
                                label="Tarikh Tamat"
                                type="date"
                                val={data.interimApplicationDetail
                                    .applicationDetail.endDate}
                            />
                            <CustomSelectField
                                label="Tempat Kekosongan"
                                id="newPlacement"
                                disabled
                                isRequired={false}
                                options={data.lookup.placementLookup}
                                val={data.interimApplicationDetail
                                    .applicationDetail.newPlacement}
                            />
                            <CustomTextField
                                id="reason"
                                disabled
                                isRequired={false}
                                label="Sebab-sebab Kekosongan"
                                type="text"
                                val={data.interimApplicationDetail
                                    .applicationDetail.reason}
                            />
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Pegawai Yang Menanggung Kerja"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full items-start justify-start pb-10">
                        <div
                            class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        >
                            <CustomTextField
                                label="Nama Pengawai"
                                disabled
                                isRequired={false}
                                id="name"
                                type="text"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.name}
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                disabled
                                isRequired={false}
                                id="identityCardNumber"
                                type="text"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details
                                    .identityDocumentNumber}
                            />
                            <!-- <CustomTextField
                                label="Tarikh Lantikan Jawatan Sekarang"
                                disabled
                                isRequired={false}
                                id="serviceDate"
                                type="date"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.}
                            /> -->
                            <CustomTextField
                                label="Tarikh Sah Dalam Jawatan Sekarang"
                                disabled
                                isRequired={false}
                                id="effectiveDate"
                                type="date"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.effectiveDate}
                            />
                            <CustomTextField
                                label="Jawatan/Gred"
                                disabled
                                isRequired={false}
                                id="positionWithGrade"
                                type="text"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.positionWithGrade}
                            />
                            <CustomTextField
                                label="Tarikh Mula Bertugas di Jawatan Sekarang"
                                disabled
                                isRequired={false}
                                id="confirmDate"
                                type="date"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.confirmServiceDate}
                            />
                            <CustomTextField
                                label="Tempat Bertugas Semasa"
                                disabled
                                isRequired={false}
                                id="placement"
                                type="text"
                                val={data.interimApplicationDetail
                                    .employeeDetail.details.placement}
                            />
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Tempoh Penanggungan Kerja"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full items-start justify-start pb-10">
                        <div
                            class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                        >
                            <ContentHeader
                                title="Tempoh Penanggungan Kerja Yang Diperakukan"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Dari"
                                id="from"
                                disabled
                                isRequired={false}
                                type="date"
                                val={data.interimApplicationDetail.duration
                                    ?.from}
                            />
                            <CustomTextField
                                label="Hingga"
                                id="to"
                                disabled
                                isRequired={false}
                                type="date"
                                val={data.interimApplicationDetail.duration?.to}
                            />
                            <div class="hidden">
                            {#if data.interimApplicationDetail.duration?.previousInterim.length > 0}
                                <ContentHeader
                                    title="Tempoh Penanggungan Kerja Bagi Jawatan yang Sama Sebelum Ini (Jika Ada)"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Dari"
                                    disabled
                                    isRequired={false}
                                    id="from"
                                    type="date"
                                    val={data.interimApplicationDetail.duration
                                        ?.previousInterim[0]?.from}
                                />
                                <CustomTextField
                                    label="Hingga"
                                    disabled
                                    isRequired={false}
                                    id="date"
                                    type="date"
                                    val={data.interimApplicationDetail.duration
                                        ?.previousInterim[0]?.to}
                                />
                            {/if}
                        </div>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
                    {#if !submitDocument && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            onClick={() => uploadDocument()}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full items-start justify-start pb-10">
                        <div
                            class="flex w-1/2 flex-col justify-start gap-6 p-3"
                        >
                            {#if data.uploadedDocuments?.document?.length < 1}
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Arahan:
                                        </span>
                                        Muat naik semua dokumen-dokumen yang berkaitan
                                        dan tekan butang Hantar untuk menghantar
                                        ke sistem.
                                    </p>
                                </Alert>
                                <div class="flex w-full flex-col gap-6">
                                    <FileGreyField
                                        label="1. Carta Organisasi (Kedudukan Pegawai dan Jawatan yang Ditanggung Kerja)"
                                        id="files"
                                        bind:files
                                    ></FileGreyField>
                                    <FileGreyField
                                        label="2. Salinan Surat Arahan Penangguhan Kerja"
                                        id="files2"
                                        bind:files={files2}
                                    ></FileGreyField>
                                    <FileGreyField
                                        label="3. Maklumat Cuti yang Terkini"
                                        id="files3"
                                        bind:files={files3}
                                    ></FileGreyField>
                                    <FileGreyField
                                        label="4. Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai Menanggung Kerja"
                                        id="files4"
                                        bind:files={files4}
                                    ></FileGreyField>
                                </div>
                            {:else}
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2"
                                >
                                    <ContentHeader
                                        title="Dokumen Yang Telah Dimuat Naik Oleh Kakitangan"
                                        borderClass="border-none"
                                        titlePadding={false}
                                    />
                                    <div
                                        class="flex w-full flex-col gap-2.5 text-sm text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span
                                            >Borang-borang yang perlu dimuat
                                            naik oleh kakitangan:</span
                                        >
                                        <span
                                            >1. Carta Organisasi (Kedudukan
                                            Pegawai dan Jawatan yang Ditanggung
                                            Kerja)</span
                                        >

                                        <span
                                            >2. Salinan Surat Arahan Penangguhan
                                            Kerja</span
                                        >

                                        <span
                                            >3. Maklumat Cuti yang Terkini</span
                                        >
                                        <span
                                            >4. Senarai Tugas Jawatan Ditanggung
                                            Kerja dan Pegawai Menanggung Kerja</span
                                        >
                                    </div>
                                    {#each data.uploadedDocuments?.document as docs, i}
                                        <div
                                            class="jusitfy-start flex w-full flex-row items-center gap-2.5"
                                        >
                                            <span class="text-[12px]"
                                                >{i + 1}.
                                            </span>
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
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Pelangkauan Dari Segi Kekananan">
                    {#if !submitSkip && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                    type="neutral"
                        label="Simpan"
                        icon="save"
                    form="skippingForm"
                    onClick={() => ($skippingForm.isDraft = true)}
                />    
                    <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="skippingForm"
                            onClick={() => ($skippingForm.isDraft = false)}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full items-start justify-start pb-10">
                        <form
                            class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                            method="POST"
                            id="skippingForm"
                            use:skippingEnhance
                        >
                            <CustomRadioBoolean
                                label="Pelangkauan Dari Segi Kekananan"
                                disabled={submitSkip}
                                id="status"
                                bind:val={$skippingForm.status}
                                errors={$skippingError.status}
                            />
                            {#if $skippingForm.status}
                                <CustomTextField
                                    label="Sebab-Sebab Pelangkauan"
                                    disabled={submitSkip}
                                    id="remark"
                                    type="text"
                                    bind:val={$skippingForm.remark}
                                    errors={$skippingError.remark}
                                />
                            {/if}
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>

            {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
                <StepperContent>
                    <StepperContentHeader
                        title="Sokongan dari Pengarah Bahagian/Negeri"
                    >
                        {#if !submitDirector && (data.currentRoleCode == UserRoleConstant.pengarahBahagian.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)}
                            
                        <TextIconButton
                        type="neutral"
                        label="Simpan"
                        icon="save"
                        form="directorForm"
                        onClick={() => ($directorForm.isDraft = true)}
                    /><TextIconButton
                                label="Hantar"
                                icon="check"
                                form="directorForm"
                                onClick={() => ($directorForm.isDraft = false)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <div
                            class="flex w-full flex-col items-start justify-start pb-10"
                        >
                            <ContentHeader
                                title="Ulasan Keputusan Daripada Pengarah Bahagian/Negeri"
                                borderClass="border-none"
                            />
                            {#if data.interimApplicationDetail.viewAssign == null && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                <form
                                    class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                                    method="POST"
                                    id="setDirectorForm"
                                    use:setDirectorEnhance
                                >
                                    <div class="flex items-center gap-2">
                                        <CustomSelectField
                                            label="Pilih Pengarah Bahagian/Negeri"
                                            id="director"
                                            disabled={false}
                                            options={data.lookup
                                                .supporterApproverLookup}
                                            bind:val={$setDirectorForm.director}
                                            errors={$setDirectorError.director}
                                        />
                                        <TextIconButton
                                            label="Set"
                                            icon="check"
                                            form="setDirectorForm"
                                            onClick={() =>
                                                ($setDirectorForm.isDraft = false)}
                                        />
                                    </div>
                                </form>
                            {/if}
                            {#if data.interimSupportDetail.status == null && (data.currentRoleCode == UserRoleConstant.pengarahBahagian.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code)}
                                <form
                                    class="flex w-1/2 flex-col justify-start gap-2.5"
                                    method="POST"
                                    id="directorForm"
                                    use:directorEnhance
                                >
                                    <CustomTextField
                                        label="Tindakan/Ulasan"
                                        disabled={submitDirector}
                                        id="remark"
                                        isRequired={false}
                                        bind:val={$directorForm.remark}
                                        errors={$directorError.remark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        disabled={submitDirector}
                                        options={supportOptions}
                                        id="status"
                                        bind:val={$directorForm.status}
                                        errors={$directorError.status}
                                    />
                                    <CustomTextField
                                        label="Tarikh Sokongan"
                                        disabled={submitDirector}
                                        type="date"
                                        id="approvalDate"
                                        isRequired={false}
                                        bind:val={$directorForm.approvalDate}
                                        errors={$directorError.approvalDate}
                                    />
                                </form>
                            {:else}
                                <div class="flex w-1/2 flex-col gap-2.5 p-3">
                                    <!-- <CustomTextField
                                        label="Nama"
                                        disabled
                                        isRequired={false}
                                        placeholder="Menunggu keputusan..."
                                        id="name"
                                        val={data.interimSupportDetail?.name}
                                    /> -->
                                    <CustomTextField
                                        label="Ulasan"
                                        disabled
                                        isRequired={false}
                                        placeholder="Menunggu keputusan..."
                                        id="remark"
                                        val={data.interimSupportDetail?.remark}
                                    />
                                    <CustomRadioBoolean
                                        label="Keputusan"
                                        disabled
                                        isRequired={false}
                                        options={supportOptions}
                                        id="status"
                                        val={data.interimSupportDetail?.status}
                                    />
                                </div>
                            {/if}
                        </div>
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <StepperContent>
                        <StepperContentHeader
                            title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
                        >
                            {#if !submitChecklist && data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code}
                                <TextIconButton
                                    label="Hantar"
                                    icon="check"
                                    form="checklistForm"
                                />
                               
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <form
                                class="flex w-full flex-col items-start justify-start gap-4 p-3 pb-10"
                                method="POST"
                                use:checklistEnhance
                                id="checklistForm"
                            >
                                <table
                                    class="table max-h-full w-full table-auto border-collapse"
                                >
                                    <thead class="sticky top-0 z-[1]">
                                        <tr
                                            class="h-7 min-h-7 border bg-ios-systemColors-quaternarySystemFill-light"
                                        >
                                            {#each data.lookup.columnLabel as col, i}
                                                <th
                                                    class="h-full {i == 0
                                                        ? 'w-[70%]'
                                                        : 'w-[15%]'} border px-2.5"
                                                >
                                                    <div
                                                        class="flex h-full flex-row items-center justify-center"
                                                    >
                                                        <span
                                                            class="select-none text-center align-middle text-md font-medium text-ios-labelColors-secondaryLabel-light"
                                                        >
                                                            {col.name}
                                                        </span>
                                                    </div>
                                                </th>
                                            {/each}
                                        </tr>
                                    </thead>
                                    <tbody class="text-[13px]">
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Surat permohonan dari
                                                        Bahagian</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.applicationLetterStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.applicationLetterCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Borang Perakuan
                                                        Penanggungan Kerja</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.certifiedFormStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.certifiedFormCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Carta Organisasi yang
                                                        disahkan dan jelas
                                                        menandakan kedudukan:</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >Nota: Pegawai yang
                                                        menanggung dan jawatan
                                                        yang ditanggung.</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.organisationalChartStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.organisationalChartCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Deskripsi Tugas (JD)</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >Nota: Pegawai yang
                                                        menanggung dan jawatan
                                                        yang ditanggung.</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.jobDescriptionStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.jobDescriptionCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Surat Arahan
                                                        Penanggungan Kerja</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >Nota: Tarikh Surat
                                                        Arahan hendaklah sebelum
                                                        atau pada tarikh
                                                        Penangguhan Kerja</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.orderLetterStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.orderLetterCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-fit flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Kenyataan cuti untuk 28
                                                        hari (perakuan
                                                        pertama)/14 hari pertama
                                                        (pelanjutan) pegawai
                                                        yang menanggung kerja</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >Nota: Hendaklah dijana
                                                        melalui Aplikasi HRMIS</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.leaveStatementStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.leaveStatementCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr
                                            class="p-none gap-none h-fit border"
                                        >
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-fit flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Salinan dokumen
                                                        sokongan berkaitan</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >1. Sijil Cuti Sakit</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >2. Surat Pertukaran
                                                        Pegawai</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >3. Surat Pemangkuan
                                                        Pegawai</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >4. Surat Kelulusan
                                                        (Cuti Haji, Cuti
                                                        Bersalin, Cuti Barah,
                                                        Cuti Belajar, Cuti Tanpa
                                                        Gaji)</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >5. Borang Perancangan
                                                        Cuti bagi Pegawai yang
                                                        mengambil Cuti Rehat
                                                        Sebelum Bersara</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.documentListStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.documentListCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="p-none gap-none h-10 border">
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-fit flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <span
                                                        >Justifikasi (sekiranya
                                                        ada) bagi permohonan
                                                        longgar syarat</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >1. Pelangkauan melebihi
                                                        2 gred</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >2. Lokasi berlainan dan
                                                        melebihi lingkuangan
                                                        25KM</span
                                                    >
                                                    <span
                                                        class="text-[12px] italic"
                                                        >3. Kelayakan, Kemahiran
                                                        atau Syarat Khas
                                                        (Berlainan Skim)</span
                                                    >
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-fit items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.justificationStatus}
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="h-fit w-fit border border-ios-labelColors-separator-light"
                                            >
                                                <div
                                                    class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light font-normal text-ios-labelColors-secondaryLabel-light"
                                                >
                                                    <Checkbox
                                                        class={submitChecklist
                                                            ? 'text-ios-labelColors-secondaryLabel-light'
                                                            : ''}
                                                        disabled={submitChecklist}
                                                        bind:checked={$checklistForm.justificationCheck}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="gap2-.5 flex flex-col">
                                    <CustomSelectField
                                        label="Disediakan Oleh"
                                        id="preparer"
                                        disabled={submitChecklist}
                                        options={data.lookup
                                            .supporterApproverLookup}
                                        bind:val={$checklistForm.preparer}
                                        errors={$checklistError.preparer}
                                    />
                                    <CustomSelectField
                                        label="Disemak Oleh"
                                        id="checker"
                                        disabled={submitChecklist}
                                        options={data.lookup
                                            .supporterApproverLookup}
                                        bind:val={$checklistForm.checker}
                                        errors={$checklistError.checker}
                                    />
                                </div>
                            </form>
                        </StepperContentBody>
                    </StepperContent>

                    <StepperContent>
                        <StepperContentHeader
                            title="Kelulusan Permohonan Tanggung Kerja"
                        >
                            {#if !submitApprover && data.currentRoleCode == UserRoleConstant.pengarahKhidmatPengurusan.code}
                            <TextIconButton
                            type="neutral"
                            label="Simpan"
                            icon="save"
                                form="approverForm"
                                onClick={() =>
                                    ($approverForm.isDraft = true)}
                            />
                                <TextIconButton
                                    label="Hantar"
                                    icon="check"
                                    form="approverForm"
                                    onClick={() =>
                                        ($approverForm.isDraft = false)}
                                />
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            <div
                                class="flex w-full flex-col items-start justify-start pb-10"
                            >
                                <ContentHeader
                                    title="Ulasan Keputusan daripada Pengarah Khidmat Pengurusan"
                                    borderClass="border-none"
                                />
                                <form
                                    class="flex w-1/2 flex-col justify-start gap-2.5 p-3"
                                    id="approverForm"
                                    method="POST"
                                    use:approverEnhance
                                >
                                    {#if data.interimApprovalDetail.employeeId == ''}
                                        {#if data.currentRoleCode !== UserRoleConstant.pengarahKhidmatPengurusan.code}
                                            <div
                                                class="flex w-full flex-col gap-10 px-3"
                                            >
                                                <Alert color="blue">
                                                    <p>
                                                        <span
                                                            class="font-medium"
                                                            >Tiada Maklumat!
                                                        </span>
                                                        Menunggu keputusan daripada
                                                        Pengarah Khidmat Pengurusan.
                                                    </p>
                                                </Alert>
                                            </div>
                                        {:else}
                                            <CustomTextField
                                                label="Tindakan/Ulasan"
                                                disabled={submitApprover}
                                                id="remark"
                                                isRequired={false}
                                                bind:val={$approverForm.remark}
                                                errors={$approverError.remark}
                                            />
                                            <CustomRadioBoolean
                                                label="Keputusan"
                                                id="status"
                                                disabled={submitApprover}
                                                options={approveOptions}
                                                bind:val={$approverForm.status}
                                            />
                                            <CustomTextField
                                                label="Tarikh Kelulusan"
                                                disabled={submitApprover}
                                                type="date"
                                                id="approvalDate"
                                                isRequired={false}
                                                bind:val={$approverForm.approvalDate}
                                                errors={$approverError.approvalDate}
                                            />
                                        {/if}
                                    {:else}
                                        <!-- <CustomTextField
                                            label="Nama"
                                            disabled
                                            isRequired={false}
                                            id="name"
                                            bind:val={data.interimApprovalDetail
                                                .name}
                                        /> -->
                                        <CustomTextField
                                            label="Ulasan"
                                            disabled
                                            isRequired={false}
                                            id="remark"
                                            bind:val={data.interimApprovalDetail
                                                .remark}
                                        />
                                        <CustomRadioBoolean
                                            label="Keputusan"
                                            id="status"
                                            disabled
                                            isRequired={false}
                                            options={approveOptions}
                                            val={data.interimApprovalDetail
                                                ?.status}
                                        />
                                    {/if}
                                </form>
                            </div>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
        </Stepper>
    {:else}
        <Modal title="Sistem MyPSM" open={data.failToLoad} dismissable={false}>
            <Alert color="red" class="w-full">
                <p>
                    <span class="font-medium">Gagal mengesan data.</span>
                    Sila cuba sekali lagi.
                </p>
            </Alert>
            <div class="flex w-full items-center justify-center">
                <TextIconButton
                    label="Kembali"
                    onClick={() => goto('/v2/employment/interim')}
                    type="neutral"
                />
            </div>
        </Modal>
    {/if}
</section>

<Toaster />
