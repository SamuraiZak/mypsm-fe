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
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import { _directorApprovalSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submit } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { Badge } from 'flowbite-svelte';

    export let data: PageData;

    let isReadOnly: boolean = false;
    let isWaitingApproval: boolean = true;
    let isProcessEnded: number = 0;
    if (data.directorApprovalForm.data.remark !== null) {
        isReadOnly = true;
        isWaitingApproval = false;
    }
    let endedMessage: string = '';
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
                _processEnd();
            }
        },
    });
    if ($form.remark !== null) {
        _processEnd();
    }

    async function _processEnd() {
        switch ($form.status) {
            case true: {
                isProcessEnded = 1;
                endedMessage = 'Proses Tamat: SAH';
                break;
            }
            case false: {
                isProcessEnded = 2;
                endedMessage = 'Proses Tamat: TIDAK SAH';
                break;
            }
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Pergerakan Gaji">
        {#if isProcessEnded !== 0}
            <Badge color={isProcessEnded == 2 ? 'red' : 'green'}
                >{endedMessage}</Badge
            >
        {/if}
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
            <StepperContentHeader title="Maklumat Mesyuarat"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Butiran Pergerakan Gaji"
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
            <StepperContentHeader title="Semakan Jadual Pergerakan Gaji"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex h-fit w-full overflow-y-auto px-2 pt-2">
                    <DynamicTable tableItems={data.salaryMovementSchedule} />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Pengarah Khidmat Pengurusan">
                {#if data.currentRoleCode == UserRoleConstant.pengarahKhidmatPengurusan.code && data.directorApprovalForm.data.remark == null}
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
                                <span class="font-medium">Tiada Maklumat!</span>
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
                                bind:val={data.directorApprovalForm.data.name}
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

        {#if data.currentRoleCode === UserRoleConstant.urusSetiaGaji.code && isProcessEnded === 1}
            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Pergerakan Gaji"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5"
                    ></div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster />
