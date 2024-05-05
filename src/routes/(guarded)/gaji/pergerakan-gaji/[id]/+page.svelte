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
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import { _directorApprovalSchema } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submit } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { Badge } from 'flowbite-svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';

    export let data: PageData;

    let isReadOnly: boolean = false;
    let isWaitingApproval: boolean = true;
    let isProcessEnded: number = 0;
    if (data.directorApprovalForm.data.remark !== null) {
        isReadOnly = true;
        isWaitingApproval = false;
    }
    let endedMessage: string = '';

    let scheduleTable: TableSettingDTO = {
        param: {},
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: data.salaryMovementSchedule.length,
            totalPage: 1,
        },
        data: data.salaryMovementSchedule ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [],
        url: '',
        id: 'scheduleTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
            footer: false,
        },
        controls: {
            add: false,
        },
    };

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

    function _processEnd() {
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
                <div class="flex flex-col w-full justify-start gap-2.5 p-3">
                <CustomTextField
                    label="Nama dan Bilangan Mesyuarat"
                    disabled
                    id="meetingName"
                    val={data.salaryMovementDetail?.meetingName}
                />
                <CustomTextField
                    label="Tarikh Mesyuarat"
                    disabled
                    id="meetingDate"
                    type="date"
                    val={data.salaryMovementDetail?.meetingDate}
                />
                <CustomTextField
                    label="Bulan Pergerakan Gaji"
                    disabled
                    id="salaryMovementMonth"
                    val={data.salaryMovementDetail?.salaryMovementMonth}
                />
                <div
                    class="flex w-full flex-row items-center justify-start gap-5"
                >
                    <CustomTextField
                        label="Bantuan Khas Kewangan (RM)"
                        disabled
                        type="number"
                        id="specialAid"
                        val={data.salaryMovementDetail?.specialAid}
                    />
                    <CustomTextField
                        label="Kenaikan Khas (RM)"
                        disabled
                        type="number"
                        id="specialRaise"
                        val={data.salaryMovementDetail?.specialRaise}
                    />
                </div>
            </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Semakan Jadual Pergerakan Gaji"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full p-3 pb-10">
                    <div class="h-fit w-full">
                        <DataTable
                            title="Jadual Pergerakan Gaji"
                            bind:tableData={scheduleTable}
                        />
                    </div>
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
                <StepperContentHeader title="Keputusan Pergerakan Gaji"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                    >
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Arahan: </span>
                                Muat turun surat pergerakan gaji untuk setiap kakitangan
                                berikut.
                            </p>
                        </Alert>
                        {#each data.salaryMovementLetter as letter, i}
                        <div
                            class="flex w-full flex-col justify-start rounded-md border p-4"
                        >
                            <div class="flex w-full gap-4">
                                <CustomTextField
                                    label="{i+1}. Nama Kakitangan"
                                    id="employeeName"
                                    disabled
                                    val={letter?.employeeName}
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    id="employeeNo"
                                    disabled
                                    val={letter?.employeeNo}
                                />
                            </div>
                            <a
                                href={letter?.base64}
                                download={letter?.fileName}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{letter?.fileName}</a
                            >
                        </div>
                        {/each}
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
<Toaster />
