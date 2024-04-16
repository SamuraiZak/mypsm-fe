<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import type { PageData } from './$types';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { SchemaUnrecordedLeave } from '$lib/schemas/mypsm/leave/leave.schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Alert } from 'flowbite-svelte';

    export let data: PageData;

    const {
        form: unrecordedLeaveForm,
        errors: unrecordedLeaveErrors,
        enhance: unrecordedLeaveEnhance,
    } = superForm(data.forms.detailForm, {
        id: 'unrecordedLeaveForm',
        SPA: true,
        validators: zodClient(SchemaUnrecordedLeave),
        onSubmit(input) {},
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Permohonan">
        <TextIconButton
            type="neutral"
            label="Tutup"
            onClick={() => {
                goto('/cuti/permohonan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <!-- Application Details -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div class="flex w-full flex-col">
                        <CustomSelectField
                            id="untrackedLeaveTypeCode"
                            label={'Jenis Cuti Tanpa Rekod'}
                            disabled
                            bind:val={$unrecordedLeaveForm.untrackedLeaveTypeCode}
                            errors={$unrecordedLeaveErrors.untrackedLeaveTypeCode}
                            options={data.props.unrecordedLeaveTypeDropdown}
                        ></CustomSelectField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="startDate"
                            type="date"
                            label={'Tarikh Mula'}
                            disabled
                            bind:val={$unrecordedLeaveForm.startDate}
                            errors={$unrecordedLeaveErrors.startDate}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="endDate"
                            type="date"
                            label={'Tarikh Tamat'}
                            disabled
                            bind:val={$unrecordedLeaveForm.endDate}
                            errors={$unrecordedLeaveErrors.endDate}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col">
                        <CustomSelectField
                            id="halfDayOption"
                            label={'Setengah Hari'}
                            disabled
                            bind:val={$unrecordedLeaveForm.halfDayOption}
                            errors={$unrecordedLeaveErrors.halfDayOption}
                            options={data.props.halfDayOptionDropdown}
                        ></CustomSelectField>
                    </div>

                    {#if $unrecordedLeaveForm.halfDayOption}
                        <div class="flex w-full flex-col">
                            <CustomSelectField
                                id="halfDayOption"
                                label={'Jenis Setengah Hari'}
                                disabled
                                bind:val={$unrecordedLeaveForm.halfDayType}
                                errors={$unrecordedLeaveErrors.halfDayType}
                                options={data.props.halfDayTypeDropdown}
                            ></CustomSelectField>
                        </div>
                    {/if}
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="reason"
                            type="text"
                            label={'Nyatakan Alasan Anda'}
                            disabled
                            bind:val={$unrecordedLeaveForm.reason}
                            errors={$unrecordedLeaveErrors.reason}
                        ></CustomTextField>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Director's Endorsement -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Pengarah"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                >
                    {#if data.details.directorFeedback == null && data.props.userMode !== 'pengarah'}
                        <div class="flex w-full flex-col gap-10 lg:w-1/2">
                            <Alert color="blue">
                                <p>
                                    <span class="font-semibold">Nota :</span>
                                    Maklumat sedang diproses.
                                </p>
                            </Alert>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Secretary's Endorsement -->
        <StepperContent>
            <StepperContentHeader title="Semakan Oleh Urus Setia"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Endorser Details -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Penyokong Dan Pelulus"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Supporter's Endorsement -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Penyokong"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Supporter's Endorsement -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Pelulus"
            ></StepperContentHeader>

            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4"
                ></div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
