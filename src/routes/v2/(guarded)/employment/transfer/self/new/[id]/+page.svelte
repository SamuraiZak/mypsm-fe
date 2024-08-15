<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import type { PageData } from './$types';
    import {
        TransferApplicationEmployeeDetailSchema,
        TransferApplicationServiceDetailSchema,
        TransferApplicationTransferDetailSchema,
        TransferApplicationConfirmationSchema,
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
    import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: PageData;

    // employee detail
    const {
        form: employeeDetailForm,
        errors: employeeDetailErrors,
        enhance: employeeDetailEnhance,
    } = superForm(data.forms.employeeDetailForm, {
        id: 'employeeDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationEmployeeDetailSchema),
        onSubmit(input) {},
    });

    // service detail
    const {
        form: serviceDetailForm,
        errors: serviceDetailErrors,
        enhance: serviceDetailEnhance,
    } = superForm(data.forms.serviceDetailForm, {
        id: 'serviceDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationServiceDetailSchema),
        onSubmit(input) {},
    });

    // transfer detail
    const {
        form: transferDetailForm,
        errors: transferDetailErrors,
        enhance: transferDetailEnhance,
    } = superForm(data.forms.transferDetailForm, {
        id: 'transferDetailForm',
        SPA: true,
        validators: zodClient(TransferApplicationTransferDetailSchema),
        onSubmit(input) {},
    });

    // applicationConfirmation
    const {
        form: applicationConfirmationForm,
        errors: applicationConfirmationErrors,
        enhance: applicationConfirmationEnhance,
    } = superForm(data.forms.applicationConfirmationForm, {
        id: 'applicationConfirmationForm',
        SPA: true,
        validators: zodClient(TransferApplicationConfirmationSchema),
        onSubmit(input) {},
    });
</script>

<section class="flex w-full flex-col items-center justify-center">
    <div
        class="flex h-20 w-full flex-row items-center justify-between border-b px-10"
    >
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center gap-0">
            <p
                class="w-full text-wrap text-lg font-medium leading-tight text-slate-700"
            >
                Permohonan Baru
            </p>
            <p
                class="w-full text-wrap text-base font-normal leading-tight text-slate-500"
            >
                Pertukaran Atas Permohonan Sendiri
            </p>
        </div>
        <!-- trailing -->
        <div class="flex w-fit flex-row items-center justify-end gap-1">
            <TextIconButton
                icon="cancel"
                label="Batal"
                type="draft"
                onClick={() => {
                    goto('/v2/employment/transfer/self/list');
                }}
            ></TextIconButton>
        </div>
    </div>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <!-- <div
            slot="status"
            class="flex h-[50px] max-h-[50px] min-h-[50px] w-full flex-col items-center justify-center border-b"
        >
            <StatusPill status="draf"></StatusPill>
        </div> -->
        <!-- ======================================================================= -->
        <!-- PERSONAL DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Peribadi"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto p-5"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                use:employeeDetailEnhance
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    bind:val={$employeeDetailForm.name}
                                    bind:errors={$employeeDetailErrors.name}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label="No. Kad Pengenalan"
                                    type="text"
                                    bind:val={$employeeDetailForm.identityDocumentNumber}
                                    bind:errors={$employeeDetailErrors.identityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeNumber"
                                    label="No. Pekerja"
                                    type="text"
                                    bind:val={$employeeDetailForm.employeeNumber}
                                    bind:errors={$employeeDetailErrors.employeeNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="phone"
                                    label="No. Telefon Bimbit"
                                    type="text"
                                    bind:val={$employeeDetailForm.phone}
                                    bind:errors={$employeeDetailErrors.phone}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="maritalStatus"
                                    label="Status"
                                    type="text"
                                    bind:val={$employeeDetailForm.maritalStatus}
                                    bind:errors={$employeeDetailErrors.maritalStatus}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childCount"
                                    label="Bilangan Anak"
                                    type="text"
                                    bind:val={$employeeDetailForm.childCount}
                                    bind:errors={$employeeDetailErrors.childCount}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childInSchoolCount"
                                    label="Bilangan Anak Bersekolah"
                                    type="text"
                                    bind:val={$employeeDetailForm.childInSchoolCount}
                                    bind:errors={$employeeDetailErrors.childInSchoolCount}
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- SERVICE DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto p-5"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- APPLICATION DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto p-5"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- EMPLOYEE CONFIRMATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemohon"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start overflow-y-auto p-5"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                id="employeeDetailForm"
                                method="POST"
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
