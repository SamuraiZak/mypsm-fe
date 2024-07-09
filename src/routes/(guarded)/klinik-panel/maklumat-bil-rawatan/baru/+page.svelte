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
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _addPatientSchema,
        _addTreatmentSchema,
        _patientSchema,
        _patientTreatmentSchema,
        _treatmentSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import {
        _getEmployee,
        _submitPatientForm,
        _submitTreatmentForm,
    } from './+page';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { Accordion, AccordionItem, Checkbox, Modal } from 'flowbite-svelte';
    import type { PatientList } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-patient.dto';
    import { superValidate } from 'sveltekit-superforms';
    import type { MedicalEmployeeDetail } from '$lib/dto/mypsm/perubatan/medical-employee-detail.dto';
    import type { TreatmentDetailList } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-add-treatment-detail.dto';

    export let data: PageData;

    let patientModal: boolean = false;
    let treatmentModal: boolean = false;
    let patientIndex: number = 0;
    let eachIndex: number = 0;
    let patientIsEmployee: boolean = false;
    let isSelected: boolean = false;
    let selectedEmployee: number = 0;
    let successAddPatients: boolean = false;
    let successAddTreatments: boolean = false;
    let employeeDetail = {
        employeeId: 0,
        employeeNumber: '',
        identityCardNumber: '',
        fullName: '',
        grade: '',
        placement: '',
        serviceGroup: '',
    };

    const {
        form: singlePatientForm,
        errors: singlePatientError,
        enhance: singlePatientEnhance,
    } = superForm(data.singlePatientForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'singlePatientForm',
        validators: zod(_patientSchema),
        resetForm: true,
        clearOnSubmit: 'errors-and-message',
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
                $patientForm.patientList = [tempPatient, ...$patientForm.patientList];
                $treatmentForm.patientList[patientIndex] = {
                    patientName: $singlePatientForm.name,
                    treatmentList: [],
                };
                patientIndex += 1;
                setTimeout(() => (patientModal = false), 50);
                patientIsEmployee = false;
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
        async onSubmit() {
            $patientForm.id = data.profile.clinicId;
            $patientForm.employeeNumber = employeeDetail.employeeNumber;
            const submitResponse = await _submitPatientForm($patientForm);

            if (submitResponse?.response.status == 'success') {
                $treatmentForm.claimId =
                    submitResponse.response.data?.details.claimId;
                successAddPatients = true;
            }
        },
    });

    const {
        form: singleTreatmentForm,
        errors: singleTreatmentError,
        enhance: singleTreatmentEnhance,
    } = superForm(data.singleTreatmentForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'singleTreatmentForm',
        validators: zod(_treatmentSchema),
        resetForm: true,
        async onSubmit() {
            const form = await superValidate(
                $singleTreatmentForm,
                zod(_treatmentSchema),
            );
            
            if (form.valid) {
                let temptTreatment: TreatmentDetailList = {
                    description: $singleTreatmentForm.description,
                    amount: $singleTreatmentForm.amount,
                };
                $treatmentForm.patientList[eachIndex].treatmentList = [
                    temptTreatment,
                    ...$treatmentForm.patientList[eachIndex].treatmentList,
                ];
                treatmentModal = false;
            }
        },
    });
    const {
        form: treatmentForm,
        errors: treatmentError,
        enhance: treatmentEnhance,
    } = superForm(data.treatmentForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'treatmentForm',
        validators: zod(_addTreatmentSchema),
        resetForm: false,
        async onSubmit() {
            const doneProcess = await _submitTreatmentForm($treatmentForm);

            if (doneProcess?.response.status == 'success') {
                successAddTreatments = true;
            }
        },
    });

    const searchEmployee = async () => {
        const employee = await _getEmployee(selectedEmployee);

        employeeDetail = {
            employeeId: employee.response.data?.details.employeeId,
            employeeNumber: employee.response.data?.details.employeeNumber,
            identityCardNumber:
                employee.response.data?.details.identityCardNumber,
            fullName: employee.response.data?.details.fullName,
            grade: employee.response.data?.details.grade,
            placement: employee.response.data?.details.placement,
            serviceGroup: employee.response.data?.details.serviceGroup,
        };
    };

    $: {
        if (patientIsEmployee) {
            $singlePatientForm.name = employeeDetail.fullName;
            $singlePatientForm.relationshipId = null;
            $singlePatientForm.identityDocumentCard =
                employeeDetail.identityCardNumber;
        } else {
            $singlePatientForm.name = "";
            $singlePatientForm.relationshipId = 0;
            $singlePatientForm.identityDocumentCard = "";
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Rawatan">
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
                {#if !isSelected}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        onClick={() => (isSelected = true)}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <CustomSelectField
                    label="Nama"
                    id="fullname"
                    disabled={isSelected}
                    options={data.lookup.employeeList}
                    bind:val={selectedEmployee}
                    onValueChange={() => searchEmployee()}
                />
                <CustomTextField
                    label="No. Pekerja"
                    id="employeeNumber"
                    placeholder=""
                    disabled
                    bind:val={employeeDetail.employeeNumber}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    id="identityCardNumber"
                    placeholder=""
                    disabled
                    bind:val={employeeDetail.identityCardNumber}
                />
                <CustomTextField
                    label="Gred"
                    id="grade"
                    placeholder=""
                    disabled
                    bind:val={employeeDetail.grade}
                />
                <CustomTextField
                    label="Penempatan"
                    id="placement"
                    placeholder=""
                    disabled
                    bind:val={employeeDetail.placement}
                />
                <CustomTextField
                    label="Kumpulan"
                    id="serviceGroup"
                    placeholder=""
                    disabled
                    bind:val={employeeDetail.serviceGroup}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit">
                {#if $patientError?._errors}
                    <span class="text-sm text-ios-basic-destructiveRed"
                        >{$patientError._errors}</span
                    >
                {/if}
                {#if !successAddPatients}
                    <TextIconButton
                        label="Tambah Pesakit"
                        type="neutral"
                        icon="add"
                        onClick={() => {
                            patientModal = true;
                        }}
                    />
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="patientForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                {#if $patientForm.patientList.length < 1}
                    <div class="flex w-full flex-col gap-10 p-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Sila tambah pesakit terlebih dahulu.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <form
                        class="flex w-full flex-col justify-start p-3"
                        method="POST"
                        use:patientEnhance
                        id="patientForm"
                    >
                        <Accordion id="patientAccordion">
                            {#each $patientForm.patientList as _, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >{$patientForm.patientList[i]
                                            .name}</span
                                    >
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
                                        label="Tarikh Rawatan"
                                        id="date"
                                        type="date"
                                        disabled
                                        bind:val={$patientForm.patientList[i]
                                            .date}
                                    />
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Rawatan">
                {#if !successAddTreatments}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="treatmentForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                {#if $treatmentForm.patientList.length < 1}
                    <div class="flex w-full flex-col gap-10 p-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Sila tambah pesakit terlebih dahulu.
                            </p>
                        </Alert>
                    </div>
                {:else if $treatmentForm.patientList.length > 0}
                    <form
                        class="flex w-full flex-col justify-start p-3"
                        method="POST"
                        use:treatmentEnhance
                        id="treatmentForm"
                    >
                        <Accordion id="patientAccordion">
                            {#each $treatmentForm.patientList as _, i}
                                <AccordionItem>
                                    <span
                                        slot="header"
                                        class="text-sm text-ios-labelColors-link-light"
                                        >{$treatmentForm.patientList[i]
                                            .patientName}</span
                                    >
                                    {#if !successAddTreatments}
                                        <TextIconButton
                                            label="Tambah Rawatan"
                                            type="neutral"
                                            icon="add"
                                            onClick={() => {
                                                eachIndex = i;
                                                treatmentModal = true;
                                            }}
                                        />
                                    {/if}
                                    <div
                                        class="flex w-full flex-col gap-2.5 pt-3"
                                    >
                                        {#each $treatmentForm.patientList[i].treatmentList as _, x}
                                            <div
                                                class="flex w-full flex-col justify-start rounded-md border border-ios-activeColors-activeBlue-dark p-3"
                                            >
                                                <CustomTextField
                                                    label="Jenis Rawatan"
                                                    id="description"
                                                    disabled
                                                    val={$treatmentForm
                                                        .patientList[i]
                                                        .treatmentList[x]
                                                        ?.description}
                                                />
                                                <CustomTextField
                                                    label="Jumlah (RM)"
                                                    id="amount"
                                                    disabled
                                                    type="number"
                                                    val={$treatmentForm
                                                        .patientList[i]
                                                        .treatmentList[x]
                                                        ?.amount}
                                                />
                                            </div>
                                        {/each}
                                    </div>
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    </form>
                {/if}
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
        <Checkbox class="text-sm font-base text-ios-systemColors-systemGrey-light" bind:checked={patientIsEmployee}
            >Pesakit ialah kakitangan</Checkbox
        >
        <CustomTextField
            label="Nama Pesakit"
            id="name"
            disabled={patientIsEmployee}
            bind:val={$singlePatientForm.name}
            errors={$singlePatientError.name}
        />
        <CustomTextField
            label="No. Kad Pengenalan"
            id="identityDocumentCard"
            disabled={patientIsEmployee}
            bind:val={$singlePatientForm.identityDocumentCard}
            errors={$singlePatientError.identityDocumentCard}
        />
        <CustomSelectField
            label="Hubungan"
            id="relationshipId"
            disabled={patientIsEmployee}
            options={data.lookup.relationshipLookup}
            bind:val={$singlePatientForm.relationshipId}
            errors={$singlePatientError.relationshipId}
        />
        <CustomSelectField
            label="Pejabat LKIM"
            id="placementId"
            options={data.lookup.placementLookup}
            bind:val={$singlePatientForm.placementId}
            errors={$singlePatientError.placementId}
        />
        <CustomTextField
            label="Tarikh"
            id="date"
            type="date"
            bind:val={$singlePatientForm.date}
            errors={$singlePatientError.date}
        />
        <TextIconButton label="Tambah" icon="add" form="singlePatientForm" />
    </form>
</Modal>

<Modal title="Tambah Rawatan" bind:open={treatmentModal}>
    <form
        class="flex w-full flex-col gap-2.5"
        id="singleTreatmentForm"
        use:singleTreatmentEnhance
        method="POST"
    >
        <CustomTextField
            label="Jenis Rawatan"
            id="description"
            bind:val={$singleTreatmentForm.description}
            errors={$singleTreatmentError.description}
        />
        <CustomTextField
            label="Jumlah (RM)"
            id="amount"
            type="number"
            bind:val={$singleTreatmentForm.amount}
            errors={$singleTreatmentError.amount}
        />
        <TextIconButton label="Tambah" icon="add" form="singleTreatmentForm" />
    </form>
</Modal>
