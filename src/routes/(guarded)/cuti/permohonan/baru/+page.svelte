<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        LeaveCommonDetailsSchema,
        LeaveDeliveryDetailsSchema,
        LeaveStudyDetailsSchema,
        LeaveUnrecordedDetailsSchema,
    } from '$lib/schemas/mypsm/leave/leave.schema';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
    import { Alert } from 'flowbite-svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import {
        _leaveCommonFormSubmit,
        _leaveDeliveryFormSubmit,
        _leaveStudyFormSubmit,
        _leaveUnrecordedFormSubmit,
    } from './+page';

    export let data: PageData;

    // common leave
    const {
        form: leaveCommonForm,
        errors: leaveCommonErrors,
        enhance: leaveCommonEnhance,
    } = superForm(data.forms.leaveCommonForm, {
        id: 'leaveCommonForm',
        SPA: true,
        validators: zodClient(LeaveCommonDetailsSchema),
        onSubmit(input) {
            $leaveCommonForm.leaveTypeCode = data.props.currentLeaveType.code;

            _leaveCommonFormSubmit(
                $leaveCommonForm,
                data.props.currentLeaveType,
            );
        },
    });

    // unrecorded leave
    const {
        form: leaveUnrecordedForm,
        errors: leaveUnrecordedErrors,
        enhance: leaveUnrecordedEnhance,
    } = superForm(data.forms.leaveUnrecordedForm, {
        id: 'leaveUnrecordedForm',
        SPA: true,
        validators: zodClient(LeaveUnrecordedDetailsSchema),
        onSubmit(input) {
            $leaveUnrecordedForm.leaveTypeCode =
                data.props.currentLeaveType.code;

            _leaveUnrecordedFormSubmit(
                $leaveUnrecordedForm,
                data.props.currentLeaveType,
            );
        },
    });

    // delivery leave
    const {
        form: leaveDeliveryForm,
        errors: leaveDeliveryErrors,
        enhance: leaveDeliveryEnhance,
    } = superForm(data.forms.leaveDeliveryForm, {
        id: 'leaveDeliveryForm',
        SPA: true,
        validators: zodClient(LeaveDeliveryDetailsSchema),
        onSubmit(input) {
            $leaveDeliveryForm.leaveTypeCode = data.props.currentLeaveType.code;

            _leaveDeliveryFormSubmit(
                $leaveDeliveryForm,
                data.props.currentLeaveType,
            );
        },
    });

    // study leave
    const {
        form: leaveStudyForm,
        errors: leaveStudyErrors,
        enhance: leaveStudyEnhance,
    } = superForm(data.forms.leaveStudyForm, {
        id: 'leaveStudyForm',
        SPA: true,
        validators: zodClient(LeaveStudyDetailsSchema),
        onSubmit(input) {
            $leaveStudyForm.leaveTypeCode = data.props.currentLeaveType.code;

            _leaveStudyFormSubmit($leaveStudyForm, data.props.currentLeaveType);
        },
    });

    function handleLeaveTypeChange() {
        let currentLeaveType: LookupDTO =
            LeaveTypeConstant.list.find(
                (item) => item.code == data.props.currentLeaveTypeCode,
            ) ?? LeaveTypeConstant.unrecordedLeave;

        data.props.currentLeaveType = currentLeaveType;
    }
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
                        form="leaveUnrecordedForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.earlyMaternityLeave.code || data.props.currentLeaveTypeCode == LeaveTypeConstant.officerMaternityLeave.code || data.props.currentLeaveTypeCode == LeaveTypeConstant.partnerMaternityLeave.code}
                    <TextIconButton
                        form="leaveDeliveryForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.studyLeave.code}
                    <TextIconButton
                        form="leaveStudyForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else}
                    <TextIconButton
                        form="leaveCommonForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4 p-4"
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
                                onValueChange={() => {
                                    handleLeaveTypeChange();
                                }}
                            ></CustomSelectField>
                        </div>
                        {#if data.props.currentLeaveTypeCode == LeaveTypeConstant.unrecordedLeave.code}
                            <!-- UNRECORDED LEAVE -->
                            <form
                                id="leaveUnrecordedForm"
                                method="POST"
                                use:leaveUnrecordedEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="category"
                                        label={'Jenis Cuti Tanpa Rekod'}
                                        bind:val={$leaveUnrecordedForm.category}
                                        errors={$leaveUnrecordedErrors.category}
                                        options={data.props
                                            .unrecordedLeaveTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveUnrecordedForm.startDate}
                                        errors={$leaveUnrecordedErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveUnrecordedForm.endDate}
                                        errors={$leaveUnrecordedErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveUnrecordedForm.endHalfDayOption}
                                        errors={$leaveUnrecordedErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveUnrecordedForm.reason}
                                        errors={$leaveUnrecordedErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.earlyMaternityLeave.code || data.props.currentLeaveTypeCode == LeaveTypeConstant.officerMaternityLeave.code || data.props.currentLeaveTypeCode == LeaveTypeConstant.partnerMaternityLeave.code}
                            <!-- DELIVERY LEAVE -->
                            <form
                                id="leaveDeliveryForm"
                                method="POST"
                                use:leaveDeliveryEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="expectedDeliveryDate"
                                        type="date"
                                        label={'Tarikh Anggaran Bersalin'}
                                        bind:val={$leaveDeliveryForm.expectedDeliveryDate}
                                        errors={$leaveDeliveryErrors.expectedDeliveryDate}
                                    ></CustomTextField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveDeliveryForm.startDate}
                                        errors={$leaveDeliveryErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveDeliveryForm.endDate}
                                        errors={$leaveDeliveryErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveDeliveryForm.endHalfDayOption}
                                        errors={$leaveDeliveryErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveDeliveryForm.reason}
                                        errors={$leaveDeliveryErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.studyLeave.code}
                            <!-- DELIVERY LEAVE -->
                            <form
                                id="leaveStudyForm"
                                method="POST"
                                use:leaveStudyEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="certificationType"
                                        type="text"
                                        label={'Jenis Kursus/Sijil/Pengajian'}
                                        bind:val={$leaveStudyForm.certificationType}
                                        errors={$leaveStudyErrors.certificationType}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="fieldOfStudy"
                                        type="text"
                                        label={'Bidang Pengajian'}
                                        bind:val={$leaveStudyForm.fieldOfStudy}
                                        errors={$leaveStudyErrors.fieldOfStudy}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="institution"
                                        type="text"
                                        label={'Bidang Pengajian'}
                                        bind:val={$leaveStudyForm.institution}
                                        errors={$leaveStudyErrors.institution}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="courseName"
                                        type="text"
                                        label={'Nama Kursus'}
                                        bind:val={$leaveStudyForm.courseName}
                                        errors={$leaveStudyErrors.courseName}
                                    ></CustomTextField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveStudyForm.startDate}
                                        errors={$leaveStudyErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveStudyForm.endDate}
                                        errors={$leaveStudyErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveStudyForm.endHalfDayOption}
                                        errors={$leaveStudyErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveStudyForm.reason}
                                        errors={$leaveStudyErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else}
                            <!-- COMMON LEAVE -->
                            <form
                                id="leaveCommonForm"
                                method="POST"
                                use:leaveCommonEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveCommonForm.startDate}
                                        errors={$leaveCommonErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveCommonForm.startHalfDayOption}
                                        errors={$leaveCommonErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayType"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveCommonForm.startHalfDayType}
                                        errors={$leaveCommonErrors.startHalfDayType}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveCommonForm.endDate}
                                        errors={$leaveCommonErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        label={'Setengah Hari'}
                                        bind:val={$leaveCommonForm.endHalfDayOption}
                                        errors={$leaveCommonErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="endHalfDayType"
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveCommonForm.endHalfDayType}
                                        errors={$leaveCommonErrors.endHalfDayType}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveCommonForm.reason}
                                        errors={$leaveCommonErrors.reason}
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
