<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import type { PageData } from './$types';
    import {
        _addClinicApplicationScheme,
        _verificationSchema,
        _addApproverSupporterSchema,
        _approveSchema,
        _supportSchema,
        _clinicDetailsSchema,
        _submitForm,
        _submitVerificationForm,
        _submitAddApproverSupporterForm,
        _submitApprovalForm,
        _submitSupportForm,
        _submitAddClinicDetailForm,
    } from './+page';

    export let data: PageData;

    let result: string = 'pending';

    let currentSteps = 0;

    let formType: any;

    let formSubmitter = () => {};

    const verificationOption: RadioOption[] = [
        {
            value: true,
            label: 'Sah',
        },
        {
            value: false,
            label: 'Tidak Sah',
        },
    ];

    // switch (data.props.step) {
    //     case 'application':
    //         currentSteps = 0;
    //         formType = data.applicationForm;
    //         break;

    //     case 'verification':
    //         currentSteps = 1;
    //         formType = data.verificationForm;
    //         break;

    //     case 'add approver and supporter':
    //         currentSteps = 2;
    //         formType = data.addApproverSupporterForm;
    //         break;

    //     case 'approval':
    //         currentSteps = 3;
    //         formType = data.approvalForm;
    //         break;

    //     case 'support':
    //         currentSteps = 4;
    //         formType = data.supportForm;
    //         break;

    //     case 'edit details':
    //         currentSteps = 5;
    //         formType = data.addDetailForm;
    //         break;

    //     case 'confirmation':
    //         currentSteps = 6;
    //         formType = data.applicationForm;
    //         break;

    //     default:
    //         currentSteps = 0;
    //         formType = data.applicationForm;
    //         break;
    // }

    const { form, errors, enhance } = superForm(data.applicationForm, {
        SPA: true,
        validators: _addClinicApplicationScheme,
        onUpdate(event) {},
        onSubmit() {
            _submitForm($form).then((value) => {
                result = value.result;

                alert(result);
            });
        },
    });

    const {
        form: verificationForm,
        errors: verificationErrors,
        enhance: verificationEnhance,
    } = superForm(data.verificationForm, {
        SPA: true,
        validators: _verificationSchema,
        onUpdate(event) {},
        onSubmit() {
            $verificationForm.id = data.props.id;
            _submitVerificationForm($verificationForm).then((value) => {
                result = value.result;
                console.log(value.result);
            });
        },
    });

    // add approver
    const {
        form: addApproverForm,
        errors: addApproverErrors,
        enhance: addApproverEnhance,
    } = superForm(data.addApproverSupporterForm, {
        SPA: true,
        validators: _addApproverSupporterSchema,
        onUpdate(event) {},
        onSubmit() {
            $addApproverForm.id = data.props.id;
            _submitAddApproverSupporterForm($addApproverForm).then((value) => {
                result = value.result;
                console.log(value.result);
            });
        },
    });

    // approve
    const {
        form: approvalForm,
        errors: approvalErrors,
        enhance: approvalEnhance,
    } = superForm(data.approvalForm, {
        SPA: true,
        validators: _approveSchema,
        onUpdate(event) {},
        onSubmit() {
            $approvalForm.id = data.props.id;
            _submitAddApproverSupporterForm($approvalForm).then((value) => {
                result = value.result;
                console.log(value.result);
            });
        },
    });

    // support
    const {
        form: supportForm,
        errors: supportErrors,
        enhance: supportEnhance,
    } = superForm(data.supportForm, {
        SPA: true,
        validators: _supportSchema,
        onUpdate(event) {},
        onSubmit() {
            $supportForm.id = data.props.id;
            _submitSupportForm($supportForm).then((value) => {
                result = value.result;
                console.log(value.result);
            });
        },
    });

    // support
    const {
        form: addClinicDetailForm,
        errors: addClinicDetailErrors,
        enhance: addClinicDetailEnhance,
    } = superForm(data.addDetailForm, {
        SPA: true,
        validators: _clinicDetailsSchema,
        onUpdate(event) {},
        onSubmit() {
            $addClinicDetailForm.id = data.props.id;
            _submitAddClinicDetailForm($addClinicDetailForm).then((value) => {
                result = value.result;
                console.log(value.result);
            });
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Penambahan Klinik Panel"
        description="Masukkan maklumat klinik panel"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perubatan/permohonan-panel-klinik');
            }}
        /></ContentHeader
    >
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper bind:activeIndex={currentSteps}>
        <!-- ======================================================================================================== -->
        <!-- apply -->
        <!-- ======================================================================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik">
                {#if data.props.role == 'unit bahagian'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="addClinicForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Unit Bahagian atau Unit Negeri"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="addClinicForm"
                        method="POST"
                        use:enhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- district -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.district}
                                id="district"
                                label={'Daerah'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.district}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.district}
                                </p>
                            {/if}
                        </div>

                        <!-- name -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.name}
                                id="name"
                                label={'Nama Klinik'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.name}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.name}
                                </p>
                            {/if}
                        </div>

                        <!-- address -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.address}
                                id="address"
                                label={'Alamat'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.address}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.address}
                                </p>
                            {/if}
                        </div>

                        <!-- email -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.email}
                                id="email"
                                label={'Emel'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.email}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.email}
                                </p>
                            {/if}
                        </div>

                        <!-- contactNumber -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.contactNumber}
                                id="contactNumber"
                                label={'Nombor Telefon'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.contactNumber}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.contactNumber}
                                </p>
                            {/if}
                        </div>

                        <!-- foundationDate -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.foundationDate}
                                id="foundationDate"
                                label={'Tarikh Ditubuhkan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.foundationDate}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.foundationDate}
                                </p>
                            {/if}
                        </div>

                        <!-- clinicType -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.clinicType}
                                id="clinicType"
                                label={'Jenis Klinik'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.clinicType}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.clinicType}
                                </p>
                            {/if}
                        </div>

                        <!-- ownershipStatus -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.ownershipStatus}
                                id="ownershipStatus"
                                label={'Status Pemilikan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.ownershipStatus}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.ownershipStatus}
                                </p>
                            {/if}
                        </div>

                        <!-- registeredMedicalPractitioner -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.registeredMedicalPractitioner}
                                id="registeredMedicalPractitioner"
                                label={'Pengamal Perubatan Yang Berdaftar'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.registeredMedicalPractitioner}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.registeredMedicalPractitioner}
                                </p>
                            {/if}
                        </div>

                        <!-- branchCount -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                dataType="number"
                                bind:value={$form.branchCount}
                                id="branchCount"
                                label={'Jumlah Cawangan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.branchCount}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.branchCount}
                                </p>
                            {/if}
                        </div>

                        <!-- clinicOfficeDistance -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                dataType="number"
                                bind:value={$form.clinicOfficeDistance}
                                id="clinicOfficeDistance"
                                label={'Jarak Dari Pejabat LKIM'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.clinicOfficeDistance}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.clinicOfficeDistance}
                                </p>
                            {/if}
                        </div>

                        <!-- nearestClinicDistance -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                dataType="number"
                                bind:value={$form.nearestClinicDistance}
                                id="nearestClinicDistance"
                                label={'Jarak Klinik Terdekat Dari LKIM'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.nearestClinicDistance}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.nearestClinicDistance}
                                </p>
                            {/if}
                        </div>

                        <!-- operationHours -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.step != 'add'}
                                bind:value={$form.operationHours}
                                id="operationHours"
                                label={'Waktu Operasi'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.operationHours}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.operationHours}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- verification -->
        <!-- ======================================================================================================== -->
        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                {#if data.props.role == 'urus setia perubatan'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="verificationForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Urus Setia Perubatan"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="verificationForm"
                        method="POST"
                        use:verificationEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- remarks -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$verificationForm.remark}
                                id="remarks"
                                label={'Ulasan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $verificationErrors.remark}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$verificationErrors.remark}
                                </p>
                            {/if}
                        </div>

                        <!-- verification -->
                        <div class="flex w-full flex-col gap-2">
                            <RadioSingle
                                options={verificationOption}
                                legend="Pengesahan Permohonan"
                                bind:userSelected={$verificationForm.status}
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                            />
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $verificationErrors.status}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$verificationErrors.status}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- add approver supporter -->
        <!-- ======================================================================================================== -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Penyokong Dan Pelulus">
                {#if data.props.role == 'urus setia perubatan'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="addApproverSupporterForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Urus Setia Perubatan"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="addApproverSupporterForm"
                        method="POST"
                        use:addApproverEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- approver -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addApproverForm.supporterName}
                                id="panelAppointedDate"
                                label={'Nama Penyokong'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addApproverForm.supporterName}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addApproverForm.supporterName}
                                </p>
                            {/if}
                        </div>

                        <!-- approver -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addApproverForm.approverName}
                                id="panelAppointedDate"
                                label={'Nama Pelulus'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addApproverForm.approverName}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addApproverForm.approverName}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- support -->
        <!-- ======================================================================================================== -->
        <StepperContent>
            <StepperContentHeader title="Penyokong">
                {#if data.props.role == 'penyokong'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="supportForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Penyokong yang dipilih"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="supportForm"
                        method="POST"
                        use:supportEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- remarks -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role != 'penyokong'}
                                bind:value={$supportForm.remark}
                                id="remark"
                                label={'Ulasan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $supportErrors.remark}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$supportErrors.remark}
                                </p>
                            {/if}
                        </div>

                        <!-- verification -->
                        <div class="flex w-full flex-col gap-2">
                            <RadioSingle
                                options={verificationOption}
                                legend="Penyokongan Permohonan"
                                bind:userSelected={$supportForm.status}
                                disabled={data.props.role != 'penyokong'}
                            />
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $supportErrors.status}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$supportErrors.status}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- approval -->
        <!-- ======================================================================================================== -->

        <StepperContent>
            <StepperContentHeader title="Pelulus">
                {#if data.props.role == 'pelulus'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="approvalForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Pelulus yang dipilih"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="approvalForm"
                        method="POST"
                        use:approvalEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- remarks -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role != 'pelulus'}
                                bind:value={$approvalForm.remark}
                                id="remark"
                                label={'Ulasan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $approvalErrors.remark}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$approvalErrors.remark}
                                </p>
                            {/if}
                        </div>

                        <!-- verification -->
                        <div class="flex w-full flex-col gap-2">
                            <RadioSingle
                                options={verificationOption}
                                legend="Pelulusan Permohonan"
                                bind:userSelected={$approvalForm.status}
                                disabled={data.props.role != 'pelulus'}
                            />
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $approvalErrors.status}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$supportErrors.status}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- edit details -->
        <!-- ======================================================================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Klinik">
                {#if data.props.role == 'urus setia perubatan'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="editDetailsForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Urus Setia Perubatan"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="editDetailsForm"
                        method="POST"
                        use:addClinicDetailEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- remarks -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addClinicDetailForm.panelAppointedDate}
                                id="panelAppointedDate"
                                label={'Tarikh Lantikan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addClinicDetailErrors.panelAppointedDate}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addClinicDetailErrors.panelAppointedDate}
                                </p>
                            {/if}
                        </div>

                        <!-- remarks -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addClinicDetailForm.panelContractEndDate}
                                id="panelContractEndDate"
                                label={'Tarikh Tamat Lantikan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addClinicDetailErrors.panelContractEndDate}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addClinicDetailErrors.panelContractEndDate}
                                </p>
                            {/if}
                        </div>

                        <!-- bank name -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addClinicDetailForm.bankName}
                                id="bankName"
                                label={'Nama Bank'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addClinicDetailErrors.bankName}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addClinicDetailErrors.bankName}
                                </p>
                            {/if}
                        </div>

                        <!-- bank number -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={data.props.role !=
                                    'urus setia perubatan'}
                                bind:value={$addClinicDetailForm.bankAccount}
                                id="bankAccount"
                                label={'Nama Bank'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $addClinicDetailErrors.bankAccount}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$addClinicDetailErrors.bankAccount}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================================================== -->
        <!-- confirmation -->
        <!-- ======================================================================================================== -->

        <StepperContent>
            <StepperContentHeader title="Pengesahan Perlantikan">
                {#if data.props.role == 'urus setia perubatan'}
                    <button
                        on:click={() => {}}
                        type="submit"
                        form="confirmationForm"
                        class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                    >
                        <!-- icon -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span class="leading-loose">
                                <!-- icon slot -->

                                <slot />
                            </span>
                        </div>

                        <!-- label -->
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <p class="text-sm font-normal leading-loose">
                                Simpan
                            </p>
                        </div>
                    </button>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Nota: Untuk diisi oleh Urus Setia Perubatan"
                ></SectionHeader>
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="confirmationForm"
                        method="POST"
                        use:approvalEnhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                    <p class="text-base">Sila klik butang di bawah untuk mengesahkan permohonan ini dan sistem akan menghantar surat perlantikan melalui alamat emel yang didaftar.</p>
                        <button
                            on:click={() => {}}
                            type="submit"
                            form="confirmationForm"
                            class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                        >
                            <!-- icon -->
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <span class="leading-loose">
                                    <!-- icon slot -->

                                    <slot />
                                </span>
                            </div>

                            <!-- label -->
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <p class="text-sm font-normal leading-loose">
                                    Sahkan & Hantar Emel
                                </p>
                            </div>
                        </button>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
