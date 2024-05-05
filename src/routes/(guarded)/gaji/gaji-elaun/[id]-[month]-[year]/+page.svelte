<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { kgtMonthLookup } from '$lib/constants/core/dropdown.constant';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    import {
        _addSalaryAllowanceSchema,
        _salaryAllowanceActingSchema,
        _salaryAllowanceApprovalSchema,
        _salaryAllowanceDeductionSchema,
        _salaryAllowancePublicSchema,
    } from '$lib/schemas/mypsm/gaji/salary-schema';
    import {
        _editSalaryAllowanceActingForm,
        _editSalaryAllowanceAdjustmentForm,
        _editSalaryAllowancePublicForm,
        _submitApprovalForm,
        _submitSalaryAllowanceForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { translate } from '$lib/config/dictionary';
    import DataTable from '$lib/components/table/DataTable.svelte';
    export let data: PageData;

    let isEditingPublicIndex: number = -1;
    let isEditingActingIndex: number = -1;
    let isEditingAdjustmentIndex: number = -1;
    let hideHeaderButton: boolean | undefined = data.publicDetail.isReadonly;

    if (
        data.currentRoleCode == UserRoleConstant.pengarahKhidmatPengurusan.code
    ) {
        hideHeaderButton = true;
    }
    let umumTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: data.publicDetail.leaves.length ?? 0,
            totalPage: 1,
        },
        data: data.publicDetail.leaves ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'amount',
                malay: 'Jumlah (RM)'
            }
        ],
        url: '',
        id: 'umumTable',
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

    const {
        form: publicDetailForm,
        errors: publicDetailError,
        enhance: publicDetailEnhance,
    } = superForm(data.publicDetailForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'publicDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_salaryAllowancePublicSchema),
    });

    const {
        form: actingDetailForm,
        errors: actingDetailError,
        enhance: actingDetailEnhance,
    } = superForm(data.actingDetailForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'actingDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_salaryAllowanceActingSchema),
    });
    const {
        form: adjustmentDetailForm,
        errors: adjustmentDetailError,
        enhance: adjustmentDetailEnhance,
    } = superForm(data.adjustmentDetailForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'adjustmentDetailForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_salaryAllowanceActingSchema),
    });
    const { form: addSalaryAllowanceForm } = superForm(
        data.addSalaryAllowanceForm,
        {
            SPA: true,
            dataType: 'json',
            taintedMessage: false,
            id: 'addSalaryAllowanceForm',
            invalidateAll: true,
            resetForm: false,
            validators: zod(_addSalaryAllowanceSchema),
        },
    );
    const {
        form: approvalForm,
        errors: approvalError,
        enhance: approvalEnhance,
    } = superForm(data.approvalForm, {
        SPA: true,
        dataType: 'json',
        taintedMessage: false,
        id: 'approvalForm',
        invalidateAll: true,
        resetForm: false,
        validators: zod(_salaryAllowanceApprovalSchema),
        onSubmit() {
            $approvalForm.month = data.currentId.month;
            $approvalForm.year = data.currentId.year;
            _submitApprovalForm($approvalForm);
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Gaji Dan Elaun">
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
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start gap-2.5 px-2 py-3"
                >
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                    >
                        <CustomTextField
                            label="No. Pekerja"
                            id="employeeNo"
                            disabled
                            bind:val={data.employeeDetail.employeeNo}
                        />
                        <CustomTextField
                            label="Nama"
                            id="name"
                            disabled
                            bind:val={data.employeeDetail.name}
                        />
                        <CustomTextField
                            label="No. Kad Pengenalan"
                            id="identityCard"
                            disabled
                            bind:val={data.employeeDetail.identityCard}
                        />
                        <CustomTextField
                            label="Gred"
                            id="grade"
                            disabled
                            bind:val={data.employeeDetail.grade}
                        />
                        <CustomTextField
                            label="Penempatan"
                            id="currentPlacement"
                            disabled
                            bind:val={data.employeeDetail.currentPlacement}
                        />
                        <CustomTextField
                            label="Kumpulan"
                            id="group"
                            disabled
                            bind:val={data.employeeDetail.group}
                        />
                        <CustomTextField
                            label="Status Semasa Kakitangan"
                            id="status"
                            disabled
                            bind:val={data.employeeDetail.status}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Elaun Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start gap-2.5 px-2 py-3"
                >
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                    >
                        <CustomTextField
                            label="Tangga Gaji (RM)"
                            id="salaryLevel"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.salaryLevel}
                        />
                        <CustomTextField
                            label="Gaji Pokok (RM)"
                            id="baseSalary"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.baseSalary}
                        />
                        <CustomTextField
                            label="ITKA"
                            id="itka"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.itka}
                        />
                        <CustomTextField
                            label="ITP"
                            id="itp"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.itp}
                        />
                        <CustomTextField
                            label="COLA"
                            id="cola"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.cola}
                        />
                        <CustomSelectField
                            label="Bulan Pergerakan Gaji"
                            id="salaryMovementMonth"
                            disabled
                            placeholder=""
                            options={kgtMonthLookup}
                            val={data.salaryDetail.salaryMovementMonth}
                        />
                        <CustomTextField
                            label="Jumlah (RM)"
                            id="salaryMovementTotal"
                            disabled
                            placeholder=""
                            bind:val={data.salaryDetail.salaryMovementTotal}
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lain-Lain"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5 pb-10">
                    {#if data.otherDetail.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Kakitangan tidak mempunyai maklumat lain-lain.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        {#each data.otherDetail as details}
                            <div
                                class="flex w-full flex-col gap-2.5 border-b pb-2.5"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                >
                                    <div class="w-full">
                                        <span
                                            class="text-base font-semibold text-ios-labelColors-link-light"
                                            >{details.name}</span
                                        >
                                    </div>
                                    <CustomTextField
                                        label="Tarikh Mula"
                                        id="submittedDate"
                                        disabled
                                        type="date"
                                        val={details.submittedDate}
                                    />
                                    <CustomTextField
                                        label="Tarikh Tamat"
                                        id="approvedDate"
                                        disabled
                                        type="date"
                                        val={details.approvedDate}
                                    />
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Perubahan Gaji">
                {#if data.currentRoleCode == UserRoleConstant.urusSetiaGaji.code && !hideHeaderButton}
                    <TextIconButton
                        label="Hantar Ke Pengarah"
                        icon="check"
                        onClick={async () => {
                            const res = await _submitSalaryAllowanceForm(
                                $addSalaryAllowanceForm,
                            );

                            if (res?.response.status == 'success') {
                                hideHeaderButton = true;
                            }
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-0">
                <CustomTab>
                    <CustomTabContent title="Umum">
                        <div class="w-full border-b px-3 pb-5">
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Cuti"
                                    tableData={umumTable}
                                />
                            </div>
                        </div>
                        <ContentHeader
                            title="Senarai Potongan"
                            borderClass="border-none"
                        />
                        {#if $publicDetailForm.deduction.length < 1}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Kakitangan tidak mempunyai maklumat potongan.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5 px-2 pb-10"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                >
                                    {#each $publicDetailForm.deduction as _, i}
                                        <form
                                            class="flex w-full flex-col justify-start"
                                            use:publicDetailEnhance
                                            method="POST"
                                            id="publicDetailForm"
                                        >
                                            <div
                                                class="flex w-full flex-row justify-between gap-2.5"
                                            >
                                                <span
                                                    class="text-base font-semibold text-ios-labelColors-link-light"
                                                    >{i + 1}. {translate(
                                                        $publicDetailForm
                                                            .deduction[i].type,
                                                    )}</span
                                                >
                                                <div
                                                    class=" flex flex-row gap-2.5"
                                                >
                                                    {#if !hideHeaderButton}
                                                        {#if isEditingPublicIndex == -1}
                                                            <TextIconButton
                                                                label="Kemaskini"
                                                                type="neutral"
                                                                onClick={() => {
                                                                    isEditingPublicIndex =
                                                                        i;
                                                                }}
                                                            />
                                                        {:else if isEditingPublicIndex == i}
                                                            <TextIconButton
                                                                label="Batal"
                                                                type="neutral"
                                                                onClick={() =>
                                                                    (isEditingPublicIndex =
                                                                        -1)}
                                                            />
                                                            <TextIconButton
                                                                label="Simpan"
                                                                onClick={() => {
                                                                    _editSalaryAllowancePublicForm(
                                                                        $publicDetailForm
                                                                            .deduction[
                                                                            isEditingPublicIndex
                                                                        ],
                                                                    );
                                                                    isEditingPublicIndex =
                                                                        -1;
                                                                }}
                                                            />
                                                        {/if}
                                                    {/if}
                                                </div>
                                            </div>
                                            <CustomTextField
                                                label="Jumlah Bayaran (RM)"
                                                id="amount{i}"
                                                type="number"
                                                disabled={isEditingPublicIndex !==
                                                    i}
                                                bind:val={$publicDetailForm
                                                    .deduction[i].amount}
                                                errors={$publicDetailError.deduction !==
                                                undefined
                                                    ? $publicDetailError
                                                          .deduction[i].amount
                                                    : []}
                                            />
                                            <CustomTextField
                                                label="Catatan"
                                                id="remark{i}"
                                                disabled={isEditingPublicIndex !==
                                                    i}
                                                bind:val={$publicDetailForm
                                                    .deduction[i].remark}
                                            />
                                            <!-- errors={$publicDetailForm.errors.deduction[i].remark} -->
                                        </form>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </CustomTabContent>

                    <CustomTabContent title="Pemangkuan">
                        {#if $actingDetailForm.acting.length < 1}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Kakitangan tidak mempunyai rekod pemangkuan.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5 px-2 pb-10"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                >
                                    {#each $actingDetailForm.acting as details, i}
                                        <form
                                            class="flex w-full flex-col justify-start"
                                            use:actingDetailEnhance
                                            method="POST"
                                            id="actingDetailForm"
                                        >
                                            <div
                                                class="flex w-full flex-row justify-between gap-3"
                                            >
                                                <span
                                                    class="text-base font-semibold text-ios-labelColors-link-light"
                                                    >{i + 1}. {details.type}</span
                                                >
                                                <div
                                                    class=" flex flex-row gap-2.5"
                                                >
                                                    {#if !hideHeaderButton}
                                                        {#if isEditingActingIndex == -1}
                                                            <TextIconButton
                                                                label="Kemaskini"
                                                                type="neutral"
                                                                onClick={() =>
                                                                    (isEditingActingIndex =
                                                                        i)}
                                                            />
                                                        {:else if isEditingActingIndex == i}
                                                            <TextIconButton
                                                                label="Batal"
                                                                type="neutral"
                                                                onClick={() =>
                                                                    (isEditingActingIndex =
                                                                        -1)}
                                                            />
                                                            <TextIconButton
                                                                label="Simpan"
                                                                onClick={() => {
                                                                    _editSalaryAllowanceActingForm(
                                                                        $actingDetailForm
                                                                            .acting[
                                                                            isEditingActingIndex
                                                                        ],
                                                                    );
                                                                    isEditingActingIndex =
                                                                        -1;
                                                                }}
                                                            />
                                                        {/if}
                                                    {/if}
                                                </div>
                                            </div>
                                            <CustomTextField
                                                label="Jumlah Bayaran (RM)"
                                                id="amount{i}"
                                                type="number"
                                                disabled={isEditingActingIndex !==
                                                    i}
                                                bind:val={$actingDetailForm
                                                    .acting[i].amount}
                                            />
                                            <CustomTextField
                                                label="Catatan"
                                                id="remark{i}"
                                                disabled={isEditingActingIndex !==
                                                    i}
                                                bind:val={$actingDetailForm
                                                    .acting[i].remark}
                                            />
                                        </form>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </CustomTabContent>

                    <CustomTabContent title="Pelarasan">
                        {#if $adjustmentDetailForm.acting.length < 1}
                            <div class="flex w-full flex-col gap-10 px-3">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Kakitangan tidak mempunyai rekod pelarasan.
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex w-full flex-col items-start justify-start gap-2.5 px-2 pb-10 pt-3"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                                >
                                    {#each $adjustmentDetailForm.acting as _, i}
                                        <form
                                            class="flex w-full flex-col justify-start"
                                            use:adjustmentDetailEnhance
                                            method="POST"
                                            id="adjustmentDetailForm"
                                        >
                                            <div
                                                class="flex w-full flex-row justify-between gap-3"
                                            >
                                                <span
                                                    class="text-base font-semibold text-ios-labelColors-link-light"
                                                    >Penambahan {i + 1}</span
                                                >
                                                <div
                                                    class=" flex flex-row gap-2.5"
                                                >
                                                    {#if !hideHeaderButton}
                                                        {#if isEditingAdjustmentIndex == -1}
                                                            <TextIconButton
                                                                label="Kemaskini"
                                                                type="neutral"
                                                                onClick={() =>
                                                                    (isEditingAdjustmentIndex =
                                                                        i)}
                                                            />
                                                        {:else if isEditingAdjustmentIndex == i}
                                                            <TextIconButton
                                                                label="Batal"
                                                                type="neutral"
                                                                onClick={() =>
                                                                    (isEditingAdjustmentIndex =
                                                                        -1)}
                                                            />
                                                            <TextIconButton
                                                                label="Simpan"
                                                                onClick={() => {
                                                                    _editSalaryAllowanceAdjustmentForm(
                                                                        $adjustmentDetailForm
                                                                            .acting[
                                                                            isEditingAdjustmentIndex
                                                                        ],
                                                                    );
                                                                    isEditingAdjustmentIndex =
                                                                        -1;
                                                                }}
                                                            />
                                                        {/if}
                                                    {/if}
                                                </div>
                                            </div>
                                            <CustomTextField
                                                label="Jenis Penambahan"
                                                id="type{i}"
                                                disabled={isEditingAdjustmentIndex !==
                                                    i}
                                                bind:val={$adjustmentDetailForm
                                                    .acting[i].type}
                                            />
                                            <CustomTextField
                                                label="Butiran"
                                                id="description{i}"
                                                disabled={isEditingAdjustmentIndex !==
                                                    i}
                                                bind:val={$adjustmentDetailForm
                                                    .acting[i].description}
                                            />
                                            <CustomTextField
                                                label="Jumlah (RM)"
                                                id="amount{i}"
                                                type="number"
                                                disabled={isEditingAdjustmentIndex !==
                                                    i}
                                                bind:val={$adjustmentDetailForm
                                                    .acting[i].amount}
                                            />
                                            <CustomTextField
                                                label="Catatan"
                                                id="remark{i}"
                                                disabled={isEditingAdjustmentIndex !==
                                                    i}
                                                bind:val={$adjustmentDetailForm
                                                    .acting[i].remark}
                                            />
                                        </form>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengarah Khidmat Pengurusan">
                {#if data.currentRoleCode == UserRoleConstant.pengarahKhidmatPengurusan.code && $approvalForm.month == undefined}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="approvalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.approvalDetail.name == null && data.currentRoleCode == UserRoleConstant.urusSetiaGaji.code}
                    <div class="flex w-full flex-col gap-10 px-3">
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
                        method="POST"
                        use:approvalEnhance
                        id="approvalForm"
                    >
                        {#if data.approvalDetail.name !== null}
                            <CustomTextField
                                label="Nama"
                                disabled
                                id="name"
                                bind:val={data.approvalDetail.name}
                            />
                        {/if}
                        <CustomTextField
                            label="Ulasan/Tindakan"
                            id="remark"
                            disabled={$approvalForm.month !== undefined ||
                                data.currentRoleCode ==
                                    UserRoleConstant.urusSetiaGaji.code}
                            bind:val={$approvalForm.remark}
                            errors={$approvalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            options={approveOptions}
                            id="status"
                            disabled={$approvalForm.month !== undefined ||
                                data.currentRoleCode ==
                                    UserRoleConstant.urusSetiaGaji.code}
                            bind:val={$approvalForm.status}
                            errors={$approvalError.status}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
