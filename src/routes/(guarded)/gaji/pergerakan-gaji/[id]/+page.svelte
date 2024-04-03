<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import type { PageData } from './$types';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { certifyOptions, confirmOptions } from '$lib/constants/core/radio-option-constants';
    import { _directorApprovalSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submit } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';

    export let data: PageData;

    let isReadOnly: boolean = false;
    let isWaitingApproval: boolean = true;

    if (data.directorApprovalForm.data.remark !== null) {
        isReadOnly = true;
        isWaitingApproval = false;
    }

    const { form, errors, enhance } = superForm(data.directorApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'directorApprovalForm',
        invalidateAll: true,
        resetForm: false,
        validationMethod: 'onsubmit',
        validators: zod(_directorApprovalSchema),
        async onSubmit() {
            $form.id = data.meetingId.id;

            const readOnly = await _submit($form);
            if (readOnly?.response.status == 'success') {
                isReadOnly = true;
            }
        },
    });
    console.log(data.directorApprovalForm.data)
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Pergerakan Gaji">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Pergerakan Gaji Baru"
                    borderClass="border-none"
                />
                <CustomTextField
                    label="Nama dan Bilangan Mesyuarat"
                    disabled
                    id="meetingName"
                    bind:val={data.salaryMovementDetail.meetingName}
                />
                <CustomTextField
                    label="Tarikh Mesyuarat"
                    disabled
                    id="meetingDate"
                    type="date"
                    bind:val={data.salaryMovementDetail.meetingDate}
                />
                <CustomTextField
                    label="Bulan Pergerakan Gaji"
                    disabled
                    id="salaryMovementMonth"
                    bind:val={data.salaryMovementDetail.salaryMovementMonth}
                />
                <div
                    class="flex w-full flex-row items-center justify-start gap-10"
                >
                    <!-- <ContentHeader
                        title="Keputusan Mesyuarat"
                        borderClass="border-none"
                    /> -->
                    <CustomTextField
                        label="Bantuan Khas Kewangan (RM)"
                        disabled
                        type="number"
                        id="specialAid"
                        bind:val={data.salaryMovementDetail.specialAid}
                    />
                    <CustomTextField
                        label="Kenaikan Khas (RM)"
                        disabled
                        type="number"
                        id="specialRaise"
                        bind:val={data.salaryMovementDetail.specialRaise}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Semakan Jadual Pergerakan Gaji">
            </StepperContentHeader>
            <StepperContentBody>
                <DynamicTable tableItems={data.salaryMovementSchedule} />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Pengarah Khidmat Pengurusan">
                {#if data.currentRoleCode == UserRoleConstant.pengarahKhidmatPengurusan.code && $form.remark == ''}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="directorApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if isWaitingApproval && data.currentRoleCode !== UserRoleConstant.pengarahKhidmatPengurusan.code}
                <div class="flex w-full flex-col gap-10 px-3 pb-10">
                    <Alert color="blue">
                        <p>
                            <span class="font-medium"
                                >Tiada Maklumat!</span
                            >
                            Menunggu keputusan daripada Pengarah Khidmat Pengurusan.
                        </p>
                    </Alert>
                </div>
            {:else}
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2"
                    id="directorApprovalForm"
                    use:enhance
                    method="POST"
                >
                    <ContentHeader
                        title="Pengarah Khidmat Pengurusan"
                        borderClass="border-none"
                    />

                    {#if data.directorApprovalForm.data.remark !== null}
                        <CustomTextField
                            label="Nama"
                            disabled
                            id="name"
                            bind:val={$form.name}
                        />
                    {/if}
                    <CustomTextField
                        label="Ulasan/Tindakan"
                        disabled={isReadOnly}
                        id="remark"
                        bind:val={$form.remark}
                        errors={$errors.remark}
                    />
                    <CustomSelectField
                        label="Keputusan"
                        disabled={isReadOnly}
                        options={certifyOptions}
                        id="status"
                        bind:val={$form.status}
                        errors={$errors.status}
                    />
                </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster/>