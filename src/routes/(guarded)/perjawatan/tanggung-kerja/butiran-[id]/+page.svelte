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
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import {
        _addInterimApprovalSchema,
        _addNewInterimApplicationSchema,
    } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import { Toaster } from 'svelte-french-toast';
    import {
        _fileToBase64Object,
        _submitDirectorForm,
        _submitInterimDocument,
        _submitSkippingForm,
    } from './+page';
    import type { InterimUploadDocuments } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-upload-document.dto';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import { Checkbox } from 'flowbite-svelte';
    import { existOptions } from '$lib/constants/core/radio-option-constants';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';

    export let data: PageData;

    let submitSkip: boolean = false;
    let submitDocument: boolean = false;
    let submitDirector: boolean = false;
    let files: FileList;

    if (data.interimApplicationDetail.download.document.length > 0) {
        submitDocument = true;
    }

    if (data.interimApplicationDetail.skipping?.remark !== null) {
        submitSkip = true;
    }

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then((result) => {
                    let interimDocuments: InterimUploadDocuments = {
                        interimId: data.interimId.interimId,
                        documents: result,
                    };
                    _submitInterimDocument(JSON.stringify(interimDocuments));
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
            $skippingForm.interimId = data.interimId.interimId;
            const res = await _submitSkippingForm($skippingForm);
            if (res?.response.status == 'success') {
                submitSkip = true;
            }
        },
    });

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
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan">
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
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja" />
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <CustomSelectField
                        label="Gred"
                        id="grade"
                        disabled
                        val={data.interimApplicationDetail.applicationDetail
                            .grade}
                        options={data.lookup.gradeLookup}
                    />
                    <CustomSelectField
                        label="Jawatan"
                        id="position"
                        disabled
                        val={data.interimApplicationDetail.applicationDetail
                            .position}
                        options={data.lookup.positionLookup}
                    />
                    <CustomSelectField
                        label="Kementerian/Jabatan"
                        id="placement"
                        disabled
                        val={data.interimApplicationDetail.applicationDetail
                            .placement}
                        options={data.lookup.departmentLookup}
                    />
                    <CustomTextField
                        id="referenceNumber"
                        disabled
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        type="text"
                        val={data.interimApplicationDetail.applicationDetail
                            .referenceNumber}
                    />
                    <CustomTextField
                        id="startDate"
                        disabled
                        label="Tarikh Mula"
                        type="date"
                        val={data.interimApplicationDetail.applicationDetail
                            .startDate}
                    />
                    <CustomTextField
                        id="endDate"
                        disabled
                        label="Tarikh Tamat"
                        type="date"
                        val={data.interimApplicationDetail.applicationDetail
                            .endDate}
                    />
                    <CustomSelectField
                        label="Tempat Kekosongan"
                        id="newPlacement"
                        disabled
                        options={data.lookup.placementLookup}
                        val={data.interimApplicationDetail.applicationDetail
                            .newPlacement}
                    />
                    <CustomTextField
                        id="reason"
                        disabled
                        label="Sebab-sebab Kekosongan"
                        type="text"
                        val={data.interimApplicationDetail.applicationDetail
                            .reason}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pegawai Yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <CustomTextField
                        label="Nama Pengawai"
                        disabled
                        id="name"
                        type="text"
                        val={data.interimApplicationDetail.employeeDetail.name}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        disabled
                        id="identityCardNumber"
                        type="text"
                        val={data.interimApplicationDetail.employeeDetail
                            .identityCardNumber}
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled
                        id="serviceDate"
                        type="date"
                        val={data.interimApplicationDetail.employeeDetail
                            .serviceDate}
                    />
                    <CustomTextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled
                        id="effectiveDate"
                        type="date"
                        val={data.interimApplicationDetail.employeeDetail
                            .effectiveDate}
                    />
                    <CustomTextField
                        label="Jawatan/Gred"
                        disabled
                        id="positionWithGrade"
                        type="text"
                        val={data.interimApplicationDetail.employeeDetail
                            .positionWithGrade}
                    />
                    <CustomTextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled
                        id="confirmDate"
                        type="date"
                        val={data.interimApplicationDetail.employeeDetail
                            .confirmDate}
                    />
                    <CustomTextField
                        label="Tempat Bertugas Semasa"
                        disabled
                        id="placement"
                        type="text"
                        val={data.interimApplicationDetail.employeeDetail
                            .placement}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <ContentHeader
                        title="Tempoh Penanggungan Kerja Yang Diperakukan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Dari"
                        id="from"
                        disabled
                        type="date"
                        val={data.interimApplicationDetail.duration?.from}
                    />
                    <CustomTextField
                        label="Hingga"
                        id="to"
                        disabled
                        type="date"
                        val={data.interimApplicationDetail.duration?.to}
                    />
                    <ContentHeader
                        title="Tempoh Penanggungan Kerja Bagi Jawatan yang Sama Sebelum Ini (Jika Ada)"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Dari"
                        disabled
                        id="from"
                        type="date"
                        val={data.interimApplicationDetail.duration
                            ?.previousInterim[0].from}
                    />
                    <CustomTextField
                        label="Hingga"
                        disabled
                        id="date"
                        type="date"
                        val={data.interimApplicationDetail.duration
                            ?.previousInterim[0].to}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
                {#if !submitDocument && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        label="Muat Naik"
                        icon="check"
                        onClick={() => uploadDocument()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <div
                        class="flex w-full flex-col text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>Fail-fail yang dimuat naik:</span>
                        <span
                            >Carta Organisasi (Kedudukan Pegawai dan Jawatan
                            yang Ditanggung Kerja)</span
                        >
                        <span>Salinan Surat Arahan Penagguhan Kerja</span>
                        <span>Maklumat Cuti Yang Terkini</span>
                        <span
                            >Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai
                            Menanggung Kerja</span
                        >
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

                    <DownloadAttachment fileName="Carta Organisasi" />
                    <DownloadAttachment
                        fileName="Salinan Surat Arahan Penangguhan Kerja"
                    />
                    <DownloadAttachment fileName="Maklumat Cuti Terkini" />
                    <DownloadAttachment fileName="Senarai Tugas" />
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
                        {#each data.interimApplicationDetail.download.document as docs}
                            <a
                                href={docs.document}
                                download={docs.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{docs.name}</a
                            >
                        {/each}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pelangkauan Dari Segi Kekananan">
                {#if !submitSkip && data.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="skippingForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
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
            </StepperContentBody>
        </StepperContent>

        {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
            <!-- Pengarah Bahagian/Negeri can only view this -->
            <StepperContent>
                <StepperContentHeader
                    title="Sokongan dari Pengarah Bahagian/Negeri"
                >
                    {#if !submitDirector}
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="directorForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5"
                        method="POST"
                        id="directorForm"
                        use:directorEnhance
                    >
                        <ContentHeader
                            title="Ulasan Keputusan Daripada Pengarah Bahagian/Negeri"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            disabled={submitDirector}
                            id="remark"
                            type="text"
                            bind:val={$directorForm.remark}
                            errors={$directorError.remark}
                        />
                        <CustomRadioBoolean
                            label="Pelangkauan Dari Segi Kekananan"
                            disabled={submitDirector}
                            id="status"
                            bind:val={$directorForm.status}
                            errors={$directorError.status}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>
            {#if data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code}
                <StepperContent>
                    <StepperContentHeader
                        title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
                    ></StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col items-start justify-start gap-2.5 px-2 pb-10"
                        >
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 rounded-md border p-4 md:w-1/2"
                            >
                                <!-- <div class="flex w-full flex-col justify-start"> -->
                                <div
                                    class="flex w-full flex-row justify-between items-center gap-2.5"
                                >
                                    <span
                                        class="text-base font-semibold text-ios-labelColors-secondaryLabel-light"
                                        >1. Surat Permohonan dari Bahagian
                                    </span>
                                    <Checkbox>Semakan Urus Setia</Checkbox>
                                    <Checkbox>Semakan Urus Setia</Checkbox>
                                </div>
                                <!-- </div> -->
                            </div>
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 rounded-md border p-4 md:w-1/2"
                            >
                                <!-- <div class="flex w-full flex-col justify-start"> -->
                                <div
                                    class="flex w-full flex-row justify-between items-center gap-2.5"
                                >
                                    <span
                                        class="text-base font-semibold text-ios-labelColors-secondaryLabel-light"
                                        >2. Borang Perakuan Penanggungan Kerja
                                    </span>
                                    <Checkbox>Semakan Urus Setia</Checkbox>
                                    <Checkbox>Semakan Urus Setia</Checkbox>
                                </div>
                                <!-- </div> -->
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code}
                    <StepperContent>
                        <StepperContentHeader
                            title="Kelulusan Permohonan Tanggung Kerja"
                        >
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form=""
                            />
                        </StepperContentHeader>
                        <StepperContentBody>
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <ContentHeader
                                    title="Ulasan Keputusan daripada Pengarah Khidmat Pengurusan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    disabled
                                    id="managementServiceDirectorRemark"
                                    type="text"
                                    val="-"
                                />
                                <span>radio here sokong@tidak sokong</span>
                            </form>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
        {/if}
    </Stepper>
</section>

<Toaster />
