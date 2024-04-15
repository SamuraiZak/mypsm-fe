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
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { Toaster } from 'svelte-french-toast';
    import {
        _addPatientSchema,
        _addTreatmentSchema,
        _patientSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import { _submitPatientForm, _submitTreatmentForm } from './+page';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { Accordion, AccordionItem, Modal } from 'flowbite-svelte';
    import type {
        PatientList,
        TreatmentAddPatient,
    } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-patient.dto';
    import { superValidate } from 'sveltekit-superforms';

    export let data: PageData;

    let patientModal: boolean = false;
    let patientIndex: number = 0;

    const {
        form: singlePatientForm,
        errors: singlePatientError,
        enhance: singlePatientEnhance,
    } = superForm(data.singlePatientForm, {
        SPA: true,
        taintedMessage: false,
        id: 'singlePatientForm',
        validators: zod(_patientSchema),
        resetForm: true,
        async onSubmit() {
            const form = await superValidate(
                $singlePatientForm,
                zod(_patientSchema),
            );

            if (form.valid) {
                let tempPatient: PatientList = {
                    name: $singlePatientForm.name,
                    relationshipId: $singlePatientForm.relationshipId,
                    identityDocumentCard:
                        $singlePatientForm.identityDocumentCard,
                    placementId: $singlePatientForm.placementId,
                    date: $singlePatientForm.date,
                };
                $patientForm.patientList.push(tempPatient);
                console.log($patientForm.patientList.length)
                setTimeout(() => (patientModal = false), 1000);
            }
        },
    });
    const {
        form: patientForm,
        errors: patientError,
        enhance: patientEnhance,
    } = superForm(data.patientForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'patientForm',
        validators: zod(_addPatientSchema),
        resetForm: false,
        onSubmit() {
            _submitPatientForm($patientForm);
        },
    });

    const {
        form: treatmentForm,
        errors: treatmentError,
        enhance: treatmentEnhance,
    } = superForm(data.treatmentForm, {
        SPA: true,
        taintedMessage: false,
        id: 'treatmentForm',
        validators: zod(_addTreatmentSchema),
        resetForm: false,
        onSubmit() {
            _submitTreatmentForm($treatmentForm);
        },
    });

    // const addPatient = () => {
    //     // $patientForm.patientList = [...$patientForm.patientList, tempPatient];

    //     patientIndex += 1;
    //     // console.log($patientForm);
    //     $patientForm.patientList[patientIndex] = tempPatient;
    // };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Makluamt Rawatan">
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="cancel"
            onClick={() => goto('/klinik-panel/maklumat-bil-rawatan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <CustomSelectField
                    label="Nama"
                    id="id"
                    options={data.lookup.employeeList}
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="No. Pekerja"
                    id="employeeNumber"
                    placeholder=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    id="identityCardNumber"
                    placeholder=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Gred"
                    id="grade"
                    placeholder=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Penempatan"
                    id="placement"
                    placeholder=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Kumpulan"
                    id="serviceGroup"
                    placeholder=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit">
                <TextIconButton
                    label="Tambah Pesakit"
                    type="neutral"
                    icon="add"
                    onClick={() => {
                        patientModal = true;
                    }}
                />
                <TextIconButton label="Hantar" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                {#if $patientForm.patientList.length < 1 || $patientForm.patientList[0].name == ''}
                    <div class="flex w-full flex-col gap-10 p-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Sila tambah pesakit terlebih dahulu.
                            </p>
                        </Alert>
                    </div>
                    <!-- {:else if $patientForm.patientList[0].name == ""} -->
                {:else}
                    <form
                        class="flex w-full"
                        method="POST"
                        use:patientEnhance
                        id="patientForm"
                    >
                        <CustomTab>
                            {#each $patientForm.patientList as _, i}
                                <CustomTabContent title="Pesakit {i + 1}">
                                    <CustomTextField
                                        label="Nama Pesakit"
                                        id="name"
                                        disabled
                                        bind:val={$patientForm.patientList[i]
                                            .name}
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        id="identityDocumentCard"
                                        disabled
                                        bind:val={$patientForm.patientList[i]
                                            .identityDocumentCard}
                                    />
                                    <CustomSelectField
                                        label="Hubungan"
                                        id="relationshipId"
                                        disabled
                                        options={data.lookup.relationshipLookup}
                                        bind:val={$patientForm.patientList[i]
                                            .relationshipId}
                                    />
                                    <CustomSelectField
                                        label="Pejabat LKIM"
                                        id="placementId"
                                        disabled
                                        options={data.lookup.placementLookup}
                                        bind:val={$patientForm.patientList[i]
                                            .placementId}
                                    />
                                    <CustomTextField
                                        label="Tarikh"
                                        id="date"
                                        type="date"
                                        disabled
                                        bind:val={$patientForm.patientList[i]
                                            .date}
                                    />
                                </CustomTabContent>
                            {/each}
                        </CustomTab>
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Rawatan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                <CustomTab id="treatmentTab">
                    <!-- {#each data.treatmentDetail as treatments, i}
                        <CustomTabContent title="Rawatan {i + 1}">
                            <CustomTextField
                                label="Nama Pesakit"
                                id="name"
                                disabled
                                bind:val={treatments.patientName}
                            />
                            {#each treatments.treatmentList as treatmentList, i}
                                <CustomTextField
                                    label="Jenis Rawatan"
                                    id="name"
                                    disabled
                                    bind:val={treatmentList.description}
                                />
                                <CustomTextField
                                    label="Jumlah (RM)"
                                    id="name"
                                    type="number"
                                    disabled
                                    bind:val={treatmentList.amount}
                                />
                            {/each}
                        </CustomTabContent>
                    {/each} -->
                </CustomTab>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />

<Modal title="Tambah Pesakit" bind:open={patientModal}>
    <form
        class="flex w-full flex-col gap-2.5"
        id="singlePatientForm"
        use:singlePatientEnhance
        method="POST"
    >
        <CustomTextField
            label="Nama Pesakit"
            id="name"
            disabled={false}
            bind:val={$singlePatientForm.name}
            errors={$singlePatientError.name}
        />
        <CustomTextField
            label="No. Kad Pengenalan"
            id="identityDocumentCard"
            disabled={false}
            bind:val={$singlePatientForm.identityDocumentCard}
            errors={$singlePatientError.identityDocumentCard}
        />
        <CustomSelectField
            label="Hubungan"
            id="relationshipId"
            disabled={false}
            options={data.lookup.relationshipLookup}
            bind:val={$singlePatientForm.relationshipId}
            errors={$singlePatientError.relationshipId}
        />
        <CustomSelectField
            label="Pejabat LKIM"
            id="placementId"
            disabled={false}
            options={data.lookup.placementLookup}
            bind:val={$singlePatientForm.placementId}
            errors={$singlePatientError.placementId}
        />
        <CustomTextField
            label="Tarikh"
            id="date"
            type="date"
            disabled={false}
            bind:val={$singlePatientForm.date}
            errors={$singlePatientError.date}
        />
        <TextIconButton label="Simpan" icon="add" form="singlePatientForm" />
    </form>
</Modal>

<!-- onClick={() => {
    addPatient();
    patientModal = false;
}} -->
