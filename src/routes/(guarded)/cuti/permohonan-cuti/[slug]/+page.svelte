<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedLeaveType: string = LeaveTypeConstant.untrackedLeave.code;

    let halfDayOption: RadioDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];
    let halfDayTypeOption: RadioDTO[] = [
        {
            value: 'Pagi',
            name: 'Pagi',
        },
        {
            value: 'Petang',
            name: 'Petang',
        },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Cuti"></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper activeIndex={1}>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pemohon"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="employeeDetailForm"
                        method="POST"
                        class="w-full space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="name"
                                label={'Nama Pemohon'}
                                val=""
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="employeeNumber"
                                label={'No. Pekerja'}
                                val=""
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="identityCard"
                                label={'No. Kad Pengenalan'}
                                val=""
                            ></CustomTextField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Cuti"></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="leaveInfoForm"
                        method="POST"
                        class="w-full space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="name"
                                label={'Jenis Cuti'}
                                bind:val={selectedLeaveType}
                                options={data.props.leaveTypeDropdown}
                            ></CustomSelectField>
                        </div>

                        {#if selectedLeaveType == LeaveTypeConstant.untrackedLeave.code}
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="date"
                                    id="startDate"
                                    label={'Tarikh Mula Cuti'}
                                    val=""
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="date"
                                    id="endDate"
                                    label={'Tarikh Tamat Cuti'}
                                    val=""
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="untrackedLeaveType"
                                    label={'Kategori'}
                                    val=""
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="reason"
                                    label={'Alasan'}
                                    val=""
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    id="halfDayOption"
                                    label={'Separuh Hari'}
                                    options={halfDayOption}
                                    val={false}
                                ></CustomRadioField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomRadioField
                                    id="halfDayOption"
                                    label={'Masa Separuh Hari'}
                                    options={halfDayTypeOption}
                                    val={false}
                                ></CustomRadioField>
                            </div>
                        {:else if selectedLeaveType == LeaveTypeConstant.absenceLeave.code}
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled
                                    id="identityCard"
                                    label={'No. Kad Pengenalan'}
                                    val=""
                                ></CustomTextField>
                            </div>
                        {/if}
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
