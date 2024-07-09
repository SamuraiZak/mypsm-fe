<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import { goto } from '$app/navigation';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { Alert, Modal } from 'flowbite-svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addEmployeeClaimsSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import {
        _fileToBase64Object,
        _getUploadedDocument,
        _submitAddClaimsForm,
        _submitEmployeeClaimDocument,
    } from './+page';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';
    import type { QuartersGetDocument } from '$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    export let data: PageData;

    let openModal: boolean = false;
    let tempClaims: number = 0;
    let submitSuccess: boolean = false;
    let successUpload: boolean = false;
    let medicalId: number = 0;
    let exceedAllocation: boolean = false;
    let files: FileList;
    let docs: QuartersGetDocument = {
        id: 0,
        document: [],
    };

    const {
        form: addClaimsForm,
        errors: addClaimsError,
        enhance: addClaimsEnhance,
    } = superForm(data.addClaimsForm, {
        SPA: true,
        taintedMessage: false,
        id: 'addClaimsForm',
        validators: zod(_addEmployeeClaimsSchema),
        resetForm: false,
        async onSubmit() {
            const res = await _submitAddClaimsForm($addClaimsForm);

            if (res?.response.status == 'success') {
                submitSuccess = true;
                medicalId = res.response.data?.details.medicalClaimId;
            }
        },
    });

    function addClaims() {
        $addClaimsForm.claims = [...$addClaimsForm.claims, tempClaims];
        tempClaims = 0;
    }
    function removeClaims(index: number) {
        $addClaimsForm.claims.splice(index, 1);

        $addClaimsForm.claims = [...$addClaimsForm.claims];
    }
    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    let quartersDocument: QuartersUploadDocuments = {
                        id: medicalId,
                        documents: result,
                    };
                    const res = await _submitEmployeeClaimDocument(
                        JSON.stringify(quartersDocument),
                    );

                    if (res.response.status == 'success') {
                        successUpload = true;
                    }
                    let tempDocs = await _getUploadedDocument(medicalId);

                    if (tempDocs.response.status == 'success') {
                        docs = {
                            id: tempDocs.response.data?.details.id,
                            document: tempDocs.response.data?.details.document,
                        };
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
    <ContentHeader title="Tambah Tuntutan Baru">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('../')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-3 py-5"
                >
                    <CustomTextField
                        label="No. Pekerja"
                        disabled
                        id="employeeNumber"
                        bind:val={data.employeeDetail.employeeNumber}
                    />
                    <CustomTextField
                        label="Nama"
                        disabled
                        id="fullName"
                        bind:val={data.employeeDetail.fullName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        disabled
                        id="identityCardNumber"
                        bind:val={data.employeeDetail.identityCardNumber}
                    />
                    <CustomTextField
                        label="Gred"
                        disabled
                        id="grade"
                        bind:val={data.employeeDetail.grade}
                    />
                    <CustomTextField
                        label="Penempatan"
                        disabled
                        id="placement"
                        bind:val={data.employeeDetail.placement}
                    />
                    <CustomTextField
                        label="Kumpulan"
                        disabled
                        id="serviceGroup"
                        bind:val={data.employeeDetail.serviceGroup}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Tuntutan">
                {#if $addClaimsError.claims?._errors}
                    <span class="text-sm text-ios-basic-destructiveRed"
                        >{$addClaimsError.claims._errors}</span
                    >
                {/if}
                {#if !submitSuccess}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="addClaimsForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10 pt-5"
                    method="POST"
                    id="addClaimsForm"
                    use:addClaimsEnhance
                >
                    <CustomTextField
                        label="Tarikh Rawatan"
                        id="treatmentDate"
                        disabled={submitSuccess}
                        type="date"
                        bind:val={$addClaimsForm.treatmentDate}
                        errors={$addClaimsError.treatmentDate}
                    />
                    <CustomSelectField
                        label="Klinik"
                        id="clinicId"
                        disabled={submitSuccess}
                        options={data.lookup.clinicLookup}
                        bind:val={$addClaimsForm.clinicId}
                        errors={$addClaimsError.clinicId}
                    />
                    <CustomTextField
                        label="Bilangan Hari Cuti Sakit"
                        id="medicalLeave"
                        disabled={submitSuccess}
                        type="number"
                        bind:val={$addClaimsForm.medicalLeave}
                        errors={$addClaimsError.medicalLeave}
                    />
                    <ContentHeader
                        title="Senarai Tuntutan"
                        borderClass="border-none"
                    >
                        {#if !submitSuccess}
                            <TextIconButton
                                label="Tambah"
                                icon="add"
                                type="neutral"
                                onClick={() => (openModal = true)}
                            />
                        {/if}
                    </ContentHeader>
                    {#if $addClaimsForm.claims.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Sila tambah tuntutan terlebih dahulu.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        {#each $addClaimsForm.claims as claim, i}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3"
                            >
                                <div
                                    class="flex w-full items-center justify-start gap-2.5 pb-1 text-sm font-semibold text-ios-labelColors-link-light"
                                >
                                    <span>
                                        Tuntutan {i + 1}
                                    </span>
                                    {#if !submitSuccess}
                                        <TextIconButton
                                            label=""
                                            icon="delete"
                                            type="danger"
                                            onClick={() => removeClaims(i)}
                                        />
                                    {/if}
                                </div>
                                <CustomTextField
                                    label="Jumlah Rawatan (RM)"
                                    id="claims{i}"
                                    disabled
                                    type="number"
                                    val={claim}
                                />
                            </div>
                        {/each}
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if !successUpload}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        onClick={() => {
                            uploadDocument();
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if docs?.document.length < 1}
                    <div
                        class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Muat naik resit dan dokumen-dokumen sokongan yang
                            berkaitan.</span
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
                    <div
                        class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Dokumen-dokumen sokongan yang telah dimuat naik
                            oleh kakitangan :</span
                        >
                        {#each docs?.document as documents}
                            <a
                                href={documents.document}
                                download={documents.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{documents.name}</a
                            >
                        {/each}
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />

<Modal title="Tambah Tuntutan" bind:open={openModal}>
    <div class="flex w-full flex-col justify-start gap-2.5 pb-3">
        <CustomTextField
            label="Nama Rawatan"
            id="claims"
            type="number"
            bind:val={tempClaims}
        />
        <CustomTextField
            label="Nama Ubat"
            id="claims"
            type="number"
            bind:val={tempClaims}
        />
        <CustomTextField
            label="Jumlah Rawatan (RM)"
            id="claims"
            type="number"
            bind:val={tempClaims}
        />
        <TextIconButton
            label="Simpan"
            icon="check"
            onClick={() => {
                addClaims();
                openModal = false;
            }}
        />
    </div>
</Modal>
<Modal title="Sistem MyPSM" size="sm" bind:open={exceedAllocation} dismissable={false}>
    <Alert color="red">
        <p>
            <span>Ralat! </span>
            Permohonan tuntutan dibatalkan. Anda telah melepasi peruntukkan yang diberi.
        </p>
    </Alert>
    <div class="flex w-full justify-center pb-3">
       
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="previous"
            onClick={() => {
                exceedAllocation = false;
            }}
        />
    </div>
</Modal>
