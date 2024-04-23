<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        _submitApplicationDetailForm,
        _submitCalculationForm,
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
    import type { GCRWithdrawalDocumentDetailDTO } from '$lib/dto/mypsm/leave/leave.dto';
    import { GCRWithdrawalTypeConstant } from '$lib/constants/core/early-gcr.constant';

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

                    let withdrawalType = GCRWithdrawalTypeConstant.list.find(
                        (item) =>
                            item.value == $applicationDetailForm.withdrawalType,
                    );

                    let url =
                        '/cuti/pengeluaran_GCR/' +
                        applicationDetailId +
                        '/' +
                        withdrawalType?.url;

                    goto(url);
                }
            });
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
                <TextIconButton
                    label="Hantar"
                    icon="check"
                    form="applicationDetailForm"
                ></TextIconButton>
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
                        <div class=" flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="ageRequirement"
                                label={'Kelayakan Berdasarkan Tempoh Perkhidmatan'}
                                bind:val={$applicationDetailForm.withdrawalType}
                                options={GCRWithdrawalTypeConstant.listDropdown}
                            ></CustomSelectField>
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
