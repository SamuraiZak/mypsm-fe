<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { Alert } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        SchemaExtendedSickLeave,
        SchemaHalfPayLeave,
        SchemaUnrecordedLeave,
    } from '$lib/schemas/mypsm/leave/leave.schema';
    import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import {
        _submitExtendedSickLeaveForm,
        _submitHalfPayLeaveForm,
        _submitUnrecordedLeaveForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    // unrecorded leave
    const {
        form: unrecordedLeaveForm,
        errors: unrecordedLeaveErrors,
        enhance: unrecordedLeaveEnhance,
    } = superForm(data.forms.unrecordedLeaveForm, {
        id: 'unrecordedLeaveForm',
        SPA: true,
        validators: zodClient(SchemaUnrecordedLeave),
        onSubmit(input) {
            _submitUnrecordedLeaveForm($unrecordedLeaveForm);
        },
    });

    // extended sick leave
    const {
        form: extendedSickLeaveForm,
        errors: extendedSickLeaveErrors,
        enhance: extendedSickLeaveEnhance,
    } = superForm(data.forms.extendedSickLeaveForm, {
        id: 'extendedSickLeaveForm',
        SPA: true,
        validators: zodClient(SchemaExtendedSickLeave),
        onSubmit(input) {
            _submitExtendedSickLeaveForm($extendedSickLeaveForm);
        },
    });

    // half pay leave
    const {
        form: halfPayLeaveForm,
        errors: halfPayLeaveErrors,
        enhance: halfPayLeaveEnhance,
    } = superForm(data.forms.halfPayLeaveForm, {
        id: 'halfPayLeaveForm',
        SPA: true,
        validators: zodClient(SchemaHalfPayLeave),
        onSubmit(input) {
            _submitHalfPayLeaveForm($halfPayLeaveForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/permohonan');
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
            <StepperContentHeader title="Butiran Permohonan">
                {#if data.props.currentLeaveTypeCode == LeaveTypeConstant.unrecordedLeave.code}
                    <TextIconButton
                        form="unrecordedLeaveForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.extendedSickLeave.code}
                    <TextIconButton
                        form="extendedSickLeaveForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.halfPayLeave.code}
                    <TextIconButton
                        form="halfPayLeaveForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                >
                    <div class="flex w-full flex-col gap-10 lg:w-1/2">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Arahan :</span>
                                Sila isi butiran permohonan di bawah dengan lengkap
                                dan tekan butang Hantar untuk menghantar permohonan
                                anda.
                            </p>
                        </Alert>
                    </div>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col">
                            <CustomSelectField
                                id="leaveType"
                                label={'Jenis Cuti'}
                                bind:val={data.props.currentLeaveTypeCode}
                                options={data.props.leaveTypeDropdown}
                            ></CustomSelectField>
                        </div>
                        {#if data.props.currentLeaveTypeCode == LeaveTypeConstant.unrecordedLeave.code}
                            <!-- UNRECORDED LEAVE -->
                            <form
                                id="unrecordedLeaveForm"
                                method="POST"
                                use:unrecordedLeaveEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="untrackedLeaveTypeCode"
                                        label={'Jenis Cuti Tanpa Rekod'}
                                        bind:val={$unrecordedLeaveForm.untrackedLeaveTypeCode}
                                        errors={$unrecordedLeaveErrors.untrackedLeaveTypeCode}
                                        options={data.props
                                            .unrecordedLeaveTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$unrecordedLeaveForm.startDate}
                                        errors={$unrecordedLeaveErrors.startDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$unrecordedLeaveForm.endDate}
                                        errors={$unrecordedLeaveErrors.endDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Adakah Anda Ingin Mengambil Cuti Setengah Hari Sahaja?'}
                                        bind:val={$unrecordedLeaveForm.halfDayOption}
                                        errors={$unrecordedLeaveErrors.halfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Jika Ya, Sila Pilih Jenis Cuti Setengah Hari Yang Berkenaan'}
                                        bind:val={$unrecordedLeaveForm.halfDayType}
                                        errors={$unrecordedLeaveErrors.halfDayType}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Nyatakan Alasan Anda'}
                                        bind:val={$unrecordedLeaveForm.reason}
                                        errors={$unrecordedLeaveErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.extendedSickLeave.code}
                            <!-- EXTENDED SICK LEAVE -->
                            <form
                                id="extendedSickLeaveForm"
                                method="POST"
                                use:extendedSickLeaveEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$extendedSickLeaveForm.startDate}
                                        errors={$extendedSickLeaveErrors.startDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$extendedSickLeaveForm.endDate}
                                        errors={$extendedSickLeaveErrors.endDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Adakah Anda Ingin Mengambil Cuti Setengah Hari Sahaja?'}
                                        bind:val={$extendedSickLeaveForm.halfDayOption}
                                        errors={$extendedSickLeaveErrors.halfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Jika Ya, Sila Pilih Jenis Cuti Setengah Hari Yang Berkenaan'}
                                        bind:val={$extendedSickLeaveForm.halfDayType}
                                        errors={$extendedSickLeaveErrors.halfDayType}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Nyatakan Alasan Anda'}
                                        bind:val={$extendedSickLeaveForm.reason}
                                        errors={$extendedSickLeaveErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.halfPayLeave.code}
                            <!-- HALF PAY LEAVE -->
                            <form
                                id="halfPayLeaveForm"
                                method="POST"
                                use:halfPayLeaveEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$halfPayLeaveForm.startDate}
                                        errors={$halfPayLeaveErrors.startDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$halfPayLeaveForm.endDate}
                                        errors={$halfPayLeaveErrors.endDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Adakah Anda Ingin Mengambil Cuti Setengah Hari Sahaja?'}
                                        bind:val={$halfPayLeaveForm.halfDayOption}
                                        errors={$halfPayLeaveErrors.halfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="halfDayOption"
                                        label={'Jika Ya, Sila Pilih Jenis Cuti Setengah Hari Yang Berkenaan'}
                                        bind:val={$halfPayLeaveForm.halfDayType}
                                        errors={$halfPayLeaveErrors.halfDayType}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Nyatakan Alasan Anda'}
                                        bind:val={$halfPayLeaveForm.reason}
                                        errors={$halfPayLeaveErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster></Toaster>
