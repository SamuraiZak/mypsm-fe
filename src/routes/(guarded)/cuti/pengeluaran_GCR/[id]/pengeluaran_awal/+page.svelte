<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        _convertToBase64,
        _prepDocumentUpload,
        _submitApplicationDetailForm,
        _submitCalculationForm,
        _submitChiefDirectorFeedbackForm,
        _submitDirectorFeedbackForm,
        _submitDocument,
        _submitIntegritySecretaryFeedbackForm,
        _submitSecretaryFeedbackForm,
    } from './+page';
    import {
        GcrEndorsementSchema,
        GcrWithdrawalCalculationSchema,
        GcrWithdrawalDetailAddSchema,
    } from '$lib/schemas/mypsm/leave/gcr.schema';
    import { goto } from '$app/navigation';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { Alert } from 'flowbite-svelte';
    import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
    import type { GCRWithdrawalDocumentDetailDTO } from '$lib/dto/mypsm/leave/leave.dto';

    export let data: PageData;

    // application detail
    const {
        form: applicationDetailForm,
        errors: applicationDetailErrors,
        enhance: applicationDetailEnhance,
    } = superForm(data.forms.applicationDetailForm, {
        id: 'applicationDetailForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrWithdrawalDetailAddSchema),
        async onSubmit(input) {
            const response = _submitApplicationDetailForm(
                $applicationDetailForm,
            ).then((value) => {
                if (value.response.status == 'success') {
                    let applicationDetailId = value.response.data?.details.id;

                    let url =
                        '/cuti/pengeluaran_GCR/' +
                        applicationDetailId +
                        '/pengeluaran_awal';

                    goto(url);
                }
            });
        },
    });

    // director feedback form
    const {
        form: directorFeedbackForm,
        errors: directorFeedbackErrors,
        enhance: directorFeedbackEnhance,
    } = superForm(data.forms.directorFeedbackForm, {
        id: 'directorFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitDirectorFeedbackForm($directorFeedbackForm);
        },
    });

    // secretary feedback form
    const {
        form: secretaryFeedbackForm,
        errors: secretaryFeedbackErrors,
        enhance: secretaryFeedbackEnhance,
    } = superForm(data.forms.secretaryFeedbackForm, {
        id: 'secretaryFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitSecretaryFeedbackForm(
                $secretaryFeedbackForm,
            );
        },
    });

    // integritySecretary feedback form
    const {
        form: integritySecretaryFeedbackForm,
        errors: integritySecretaryFeedbackErrors,
        enhance: integritySecretaryFeedbackEnhance,
    } = superForm(data.forms.integritySecretaryFeedbackForm, {
        id: 'integritySecretaryFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitIntegritySecretaryFeedbackForm(
                $integritySecretaryFeedbackForm,
            );
        },
    });

    // chiefDirector feedback form
    const {
        form: chiefDirectorFeedbackForm,
        errors: chiefDirectorFeedbackErrors,
        enhance: chiefDirectorFeedbackEnhance,
    } = superForm(data.forms.chiefDirectorFeedbackForm, {
        id: 'chiefDirectorFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            $chiefDirectorFeedbackForm.id = data.props.currentApplicationId
            const response = _submitChiefDirectorFeedbackForm(
                $chiefDirectorFeedbackForm,
            );
        },
    });

    // calculation form
    const {
        form: calculationForm,
        errors: calculationErrors,
        enhance: calculationEnhance,
    } = superForm(data.forms.calculationForm, {
        id: 'calculationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrWithdrawalCalculationSchema),
        async onSubmit(input) {
            const response = _submitCalculationForm($calculationForm);
        },
    });

    let files: FileList;

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _prepDocumentUpload(files)
                .then((result) => {
                    let documentDetail: GCRWithdrawalDocumentDetailDTO = {
                        id: data.props.currentApplicationId,
                        document: result,
                    };
                    _submitDocument(JSON.stringify(documentDetail));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Pengeluaran GCR Awal">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/pengeluaran_GCR');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <div class="flex w-full flex-col gap-10 px-3 pb-4">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Arahan:</span>
                                Sila semak maklumat di bawah dan pastikan semua maklumat
                                adalah tepat sebelum meneruskan permohonan.
                            </p>
                        </Alert>
                    </div>
                    <form
                        id="employeeDetailForm"
                        method="POST"
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="name"
                                label={'Nama Kakitangan'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.name}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.identityDocumentNumber}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="grade"
                                label={'Gred'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.grade}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="scheme"
                                label={'Skim'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.scheme}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="placement"
                                label={'Penempatan Semasa'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.placement}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="startDate"
                                label={'Tarikh Mula Berkhidmat'}
                                type="data"
                                val={data.props.currentApplicationDetail
                                    .employeeDetail?.startDate}
                            ></CustomTextField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- start application -->
        <StepperContent>
            <StepperContentHeader title="Butiran GCR">
                {#if data.props.currentApplicationId == 0 && data.props.userMode == 'employee'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="applicationDetailForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <div class="flex w-full flex-col gap-10 px-3 pb-4">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Arahan:</span>
                                Sila semak maklumat di bawah dan pastikan semua maklumat
                                adalah tepat sebelum meneruskan permohonan.
                            </p>
                        </Alert>
                    </div>
                    <form
                        id="applicationDetailForm"
                        method="POST"
                        use:applicationDetailEnhance
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class=" hidden w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="employeeId"
                                label={'ID Kakitangan'}
                                type="date"
                                errors={$applicationDetailErrors.employeeId}
                                bind:val={$applicationDetailForm.employeeId}
                            ></CustomTextField>
                        </div>
                        <div class=" hidden w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="withdrawalType"
                                label={'Jenis Pengeluaran'}
                                type="date"
                                errors={$applicationDetailErrors.withdrawalType}
                                bind:val={$applicationDetailForm.withdrawalType}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="totalGCR"
                                label={'Jumlah Keseluruhan GCR'}
                                type="text"
                                val={data.props.currentApplicationDetail
                                    .gcrDetail?.totalGCR}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled
                                id="minimumGCR"
                                label={'Kelayakan Berdasarkan Jumlah GCR'}
                                val={data.props.currentApplicationDetail
                                    .gcrDetail?.minimumGCR}
                                options={data.props.eligibilityDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled
                                id="ageRequirement"
                                label={'Kelayakan Berdasarkan Usia'}
                                val={data.props.currentApplicationDetail
                                    .gcrDetail?.ageRequirement}
                                options={data.props.eligibilityDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                disabled
                                id="ageRequirement"
                                label={'Kelayakan Berdasarkan Tempoh Perkhidmatan'}
                                val={data.props.currentApplicationDetail
                                    .gcrDetail?.ageRequirement}
                                options={data.props.eligibilityDropdown}
                            ></CustomSelectField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- document upload -->
        {#if data.props.currentApplicationId !== 0}
            <StepperContent>
                <StepperContentHeader title="Dokumen Sokongan">
                    {#if data.props.currentApplicationDetail.document == null && data.props.userMode == 'employee'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            onClick={() => {
                                uploadDocument();
                            }}
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.document !== null}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <p
                                class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                            >
                                Muat Naik Surat Pertukaran dan Borang Serah
                                Tugas
                            </p>
                            {#each data.props.currentApplicationDetail.document.document as doc}
                                <a
                                    href={doc.base64}
                                    target="_blank"
                                    download={doc.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{doc.name}</a
                                >
                            {/each}
                        </div>
                    {:else if data.props.currentApplicationDetail.document == null}
                        {#if data.props.userMode == 'employee'}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="documentUploadForm"
                                    method="POST"
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomFileField
                                            id="transferDocument"
                                            bind:files
                                        ></CustomFileField>
                                    </div>
                                </form>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu maklum balas dari pihak berkenaan.
                                    </p>
                                </Alert>
                            </div>
                        {/if}
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- director feedback -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Pengarah">
                {#if data.props.currentApplicationDetail.director == null && data.props.userMode == 'director'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="directorFeedbackForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.director == null && data.props.userMode !== 'director'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Maklum Balas Pengarah Bahagian/Negeri
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            use:directorFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.director !==
                                        null}
                                    id="status"
                                    label={'Adakah Permohonan Penangguhan Ini Lulus?'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.director !==
                                        null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- secretary feedback -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Urus Setia Cuti">
                {#if data.props.currentApplicationDetail.secretary == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="secretaryFeedbackForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.secretary == null && data.props.userMode !== 'secretary'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Maklum Balas Pihak Berkenaan
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="secretaryFeedbackForm"
                            method="POST"
                            use:secretaryFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.secretary !==
                                        null}
                                    id="status"
                                    label={'Adakah Permohonan Sah?'}
                                    bind:val={$secretaryFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.secretary !==
                                        null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$secretaryFeedbackErrors.remark}
                                    bind:val={$secretaryFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- secretary feedback -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Urus Setia Integriti">
                {#if data.props.currentApplicationDetail.integrity == null && data.props.userMode == 'integritySecretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="integritySecretaryFeedbackForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.integrity == null && data.props.userMode !== 'integritySecretary'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Maklum Balas Pihak Berkenaan
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="integritySecretaryFeedbackForm"
                            method="POST"
                            use:integritySecretaryFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.integrity !==
                                        null}
                                    id="status"
                                    label={'Adakah Permohonan Sah?'}
                                    bind:val={$integritySecretaryFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.integrity !==
                                        null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$integritySecretaryFeedbackErrors.remark}
                                    bind:val={$integritySecretaryFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- chiefDirector feedback -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Ketua Pengarah">
                {#if data.props.currentApplicationDetail.chiefDirector == null && data.props.userMode == 'chiefDirector'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="chiefDirectorFeedbackForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.chiefDirector == null && data.props.userMode !== 'chiefDirector'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Maklum Balas Pengarah Bahagian/Negeri
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="chiefDirectorFeedbackForm"
                            method="POST"
                            use:chiefDirectorFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .chiefDirector !== null}
                                    id="status"
                                    label={'Adakah Permohonan Penangguhan Ini Lulus?'}
                                    bind:val={$chiefDirectorFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .chiefDirector !== null}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$chiefDirectorFeedbackErrors.remark}
                                    bind:val={$chiefDirectorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- calculation -->
        <StepperContent>
            <StepperContentHeader title="Pengiraan">
                {#if data.props.currentApplicationDetail.calculation == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="calculationForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.calculation == null && data.props.userMode !== 'secretary'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Maklum Balas Pihak Berkenaan
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="calculationForm"
                            method="POST"
                            use:calculationEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.integrity !==
                                        null}
                                    id="status"
                                    label={'Adakah Permohonan Sah?'}
                                    bind:val={$calculationForm.totalPayment}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster></Toaster>
