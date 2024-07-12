<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { LeaveStudyRequestSchema } from '$lib/schemas/v2/mypsm/leave/leave.schema';
    import { _leaveStudyFormSubmit } from './+page';
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
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let activeFormId: string = '';

    function handleLeaveTypeChange(params: string) {
        switch (params) {
            case LeaveTypeConstant.studyLeave.code:
                activeFormId = 'leaveStudyForm';
                break;

            default:
                break;
        }
    }

    $: handleLeaveTypeChange(data.props.currentLeaveTypeCode);

    let isDraft: boolean = data.props.currentApplicationIsDraft;

    const {
        form: leaveStudyForm,
        errors: leaveStudyErrors,
        enhance: leaveStudyEnhance,
    } = superForm(data.forms.leaveStudyForm, {
        id: 'leaveStudyForm',
        SPA: true,
        resetForm: false,
        invalidateAll: false,
        validators: zodClient(LeaveStudyRequestSchema),
        onSubmit(input) {
            $leaveStudyForm.isDraft = isDraft;
            _leaveStudyFormSubmit($leaveStudyForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Borang Permohonan">
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
    class="flex h-full w-full flex-col items-center justify-start overflow-y-hidden"
>
    <Stepper activeIndex={1}>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pemohon"
            ></StepperContentHeader>
            <StepperContentBody></StepperContentBody>
        </StepperContent>

        <!-- ================================================================= -->
        <!-- Application Details Starts Here -->
        <!-- ================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Permohonan">
                <TextIconButton
                    onClick={() => {
                        isDraft = true;
                    }}
                    form={activeFormId}
                    type="draft"
                    label="Simpan"
                    icon="check"
                ></TextIconButton>
                <TextIconButton
                    onClick={() => {
                        isDraft = false;
                    }}
                    form={activeFormId}
                    type="primary"
                    label="Hantar"
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <!-- leave application type field starts -->
                        {#if data.props.currentApplicationId == 0}
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2 border"
                            >
                                <div
                                    class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                >
                                    <p
                                        class="text-start text-base font-semibold"
                                    >
                                        Jenis Cuti
                                    </p>
                                </div>
                                <div
                                    class="flex w-full flex-col justify-start gap-1 p-4"
                                >
                                    <CustomSelectField
                                        id="leaveType"
                                        label={'Jenis Cuti'}
                                        bind:val={data.props
                                            .currentLeaveTypeCode}
                                        options={data.props.leaveTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                            </div>
                        {/if}
                        <!-- leave application type field ends -->

                        {#if data.props.currentLeaveTypeCode == LeaveTypeConstant.studyLeave.code}
                            <!-- ================================================================= -->
                            <!-- Study Leave Application Details Starts Here -->
                            <!-- ================================================================= -->
                            <form
                                id="leaveStudyForm"
                                method="POST"
                                use:leaveStudyEnhance
                                class="flex w-full flex-col items-center justify-start gap-4"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Cuti Kursus Sambilan (CKS) Untuk
                                            Mengikuti Kursus PJJ (Intensif)
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <CustomTextField
                                            id="academicQualification"
                                            type="text"
                                            label={'Kelayakan Akademik'}
                                            bind:val={$leaveStudyForm.academicQualification}
                                            errors={$leaveStudyErrors.academicQualification}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="professionalQualification"
                                            type="text"
                                            label={'Kelayakan Ikhtisas'}
                                            bind:val={$leaveStudyForm.professionalQualification}
                                            errors={$leaveStudyErrors.professionalQualification}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="letterDateNumber"
                                            type="text"
                                            label={'No. Tarikh Surat Kebenaran untuk mengikuti Kursus PPJ'}
                                            bind:val={$leaveStudyForm.letterDateNumber}
                                            errors={$leaveStudyErrors.letterDateNumber}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="course"
                                            type="text"
                                            label={'Bidang Kursus Diambil'}
                                            bind:val={$leaveStudyForm.course}
                                            errors={$leaveStudyErrors.course}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="institution"
                                            type="text"
                                            label={'Tempat Pengajian Kursus (IPTA)'}
                                            bind:val={$leaveStudyForm.institution}
                                            errors={$leaveStudyErrors.institution}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="startDate"
                                            type="date"
                                            label={'Tarikh Cuti Dipohon'}
                                            bind:val={$leaveStudyForm.startDate}
                                            errors={$leaveStudyErrors.startDate}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="durationDays"
                                            type="text"
                                            label={'Bilangan Hari'}
                                            bind:val={$leaveStudyForm.durationDays}
                                            errors={$leaveStudyErrors.durationDays}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="reason"
                                            type="textarea"
                                            label={'Tujuan Kursus Intensif'}
                                            bind:val={$leaveStudyForm.reason}
                                            errors={$leaveStudyErrors.reason}
                                        ></CustomTextField>
                                    </div>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Info
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <CustomTextField
                                            id="applicationDate"
                                            type="date"
                                            disabled
                                            label={'Tarikh Permohonan'}
                                            bind:val={$leaveStudyForm.applicationDate}
                                            errors={$leaveStudyErrors.applicationDate}
                                        ></CustomTextField>
                                    </div>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Catatan
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <ol
                                            class="list-decimal px-4 text-base text-slate-500"
                                        >
                                            <li>
                                                Borang ini hendaklah dikemukakan
                                                selewatnya sebulan sebelum
                                                bercuti.
                                            </li>
                                            <li>
                                                Sertakan Salinan yang diakui sah
                                                surat panggilan dan jadual waktu
                                                kursus (Intensif).
                                            </li>
                                            <li>
                                                Sertakan Sesalinan Kenyataan
                                                Cuti tahun semasa yang
                                                dikemaskini.
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveTypeCode == LeaveTypeConstant.absenceLeave.code}
                            <!-- ================================================================= -->
                            <!-- Study Leave Application Details Starts Here -->
                            <!-- ================================================================= -->
                            <form
                                id="leaveStudyForm"
                                method="POST"
                                use:leaveStudyEnhance
                                class="flex w-full flex-col items-center justify-start gap-4"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Cuti Kursus Sambilan (CKS) Untuk
                                            Mengikuti Kursus PJJ (Intensif)
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <CustomTextField
                                            id="academicQualification"
                                            type="text"
                                            label={'Kelayakan Akademik'}
                                            bind:val={$leaveStudyForm.academicQualification}
                                            errors={$leaveStudyErrors.academicQualification}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="professionalQualification"
                                            type="text"
                                            label={'Kelayakan Ikhtisas'}
                                            bind:val={$leaveStudyForm.professionalQualification}
                                            errors={$leaveStudyErrors.professionalQualification}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="letterDateNumber"
                                            type="text"
                                            label={'No. Tarikh Surat Kebenaran untuk mengikuti Kursus PPJ'}
                                            bind:val={$leaveStudyForm.letterDateNumber}
                                            errors={$leaveStudyErrors.letterDateNumber}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="course"
                                            type="text"
                                            label={'Bidang Kursus Diambil'}
                                            bind:val={$leaveStudyForm.course}
                                            errors={$leaveStudyErrors.course}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="institution"
                                            type="text"
                                            label={'Tempat Pengajian Kursus (IPTA)'}
                                            bind:val={$leaveStudyForm.institution}
                                            errors={$leaveStudyErrors.institution}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="startDate"
                                            type="date"
                                            label={'Tarikh Cuti Dipohon'}
                                            bind:val={$leaveStudyForm.startDate}
                                            errors={$leaveStudyErrors.startDate}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="durationDays"
                                            type="text"
                                            label={'Bilangan Hari'}
                                            bind:val={$leaveStudyForm.durationDays}
                                            errors={$leaveStudyErrors.durationDays}
                                        ></CustomTextField>
                                        <CustomTextField
                                            id="reason"
                                            type="text"
                                            label={'Tujuan Kursus Intensif'}
                                            bind:val={$leaveStudyForm.reason}
                                            errors={$leaveStudyErrors.reason}
                                        ></CustomTextField>
                                    </div>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Info
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <CustomTextField
                                            id="applicationDate"
                                            type="date"
                                            disabled
                                            label={'Tarikh Permohonan'}
                                            bind:val={$leaveStudyForm.applicationDate}
                                            errors={$leaveStudyErrors.applicationDate}
                                        ></CustomTextField>
                                    </div>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-2 border"
                                >
                                    <div
                                        class="flex h-10 min-h-10 w-full flex-row items-center justify-start bg-gray-200 px-4"
                                    >
                                        <p
                                            class="text-start text-base font-semibold"
                                        >
                                            Catatan
                                        </p>
                                    </div>
                                    <div
                                        class="flex w-full flex-col justify-start gap-1 p-4"
                                    >
                                        <ol
                                            class="list-decimal px-4 text-base text-slate-500"
                                        >
                                            <li>
                                                Borang ini hendaklah dikemukakan
                                                selewatnya sebulan sebelum
                                                bercuti.
                                            </li>
                                            <li>
                                                Sertakan Salinan yang diakui sah
                                                surat panggilan dan jadual waktu
                                                kursus (Intensif).
                                            </li>
                                            <li>
                                                Sertakan Sesalinan Kenyataan
                                                Cuti tahun semasa yang
                                                dikemaskini.
                                            </li>
                                        </ol>
                                    </div>
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
