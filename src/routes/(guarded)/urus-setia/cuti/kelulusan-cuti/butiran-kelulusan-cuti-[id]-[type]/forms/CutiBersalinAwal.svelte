<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import type { PageData } from '../$types';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import {
        _earlyMaternityLeaveSchema,
        _submitEarlyMaternityLeaveForm,
    } from '../+page';

    export let data: PageData;

    // ============== Form Validation
    const { form, errors, enhance } = superForm(data.earlyMaternityLeaveForm, {
        SPA: true,
        validators: false,
    });

    $form.leaveType = 'Cuti Bersalin Awal';

    const proxyStartDate = dateProxy(form, 'startDate', { format: 'date' });
    const proxyEndDate = dateProxy(form, 'endDate', { format: 'date' });
    const proxyExpectedDeliveryDate = dateProxy(form, 'expectedDeliveryDate', {
        format: 'date',
    });

    $proxyStartDate = data.currenLeaveDetailResponse.data?.details.startDate;
    $proxyEndDate = data.currenLeaveDetailResponse.data?.details.endDate;
    $proxyExpectedDeliveryDate =
        data.currenLeaveDetailResponse.data?.details.expectedDeliveryDate;
</script>

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Bersalin Awal"></SectionHeader>

        <form
            id="formValidation"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >
            <LongTextField
                disabled
                hasError={!!$errors.reason}
                name="reason"
                label="Tujuan Permohonan"
                value={data.currenLeaveDetailResponse.data?.details.reason}
                placeholder="Sila taip jawapan anda dalam ruangan ini"
            ></LongTextField>
            {#if $errors.reason}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.reason}</span
                >
            {/if}
            <div
                class="flex w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        disabled
                        hasError={!!$errors.startDate}
                        name="startDate"
                        handleDateChange
                        bind:selectedDate={$proxyStartDate}
                        label="Tarikh Mula"
                    ></DateSelector>
                    {#if $errors.startDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.startDate}</span
                        >
                    {/if}
                </div>
                <!-- <Checkbox
                    name="hasHalfDayStartDate"
                    bind:checked={hasHalfDayStartDate}
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                    for="hasHalfDayStartDate"
                    class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Setengah Hari</label
                >
                <div class="flex w-full flex-col">
                    <DropdownSelect
                        hasError={!!$errors.halfDayStartDate}
                        id="halfDayStartDate"
                        disabled={!hasHalfDayStartDate}
                        options={setengahHari}
                        bind:value={$form.halfDayStartDate}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                    {#if $errors.halfDayStartDate}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{$errors.halfDayStartDate}</span
                        >
                    {/if}
                </div> -->
            </div>
            <div
                class="flex w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        disabled
                        hasError={!!$errors.endDate}
                        name="endDate"
                        handleDateChange
                        label="Tarikh Tamat"
                        bind:selectedDate={$proxyEndDate}
                    ></DateSelector>
                    {#if $errors.endDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.endDate}</span
                        >
                    {/if}
                </div>
                <!-- <Checkbox
                    name="hasHalfDayEndDate"
                    bind:checked={hasHalfDayEndDate}
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                    for="default-checkbox"
                    class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Setengah Hari</label
                >
                <div class="flex w-full flex-col">
                    <DropdownSelect
                        hasError={!!$errors.halfDayEndDate}
                        id="halfDayEndDate"
                        disabled={!hasHalfDayEndDate}
                        options={setengahHari}
                        bind:value={$form.halfDayEndDate}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                    {#if $errors.halfDayEndDate}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{$errors.halfDayEndDate}</span
                        >
                    {/if}
                </div> -->
            </div>
            <DateSelector
                disabled
                hasError={!!$errors.expectedDeliveryDate}
                name="expectedDeliveryDate"
                handleDateChange
                label="Tarikh Dijangka Bersalin (EDD)"
                bind:selectedDate={$proxyExpectedDeliveryDate}
            ></DateSelector>
            {#if $errors.expectedDeliveryDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.expectedDeliveryDate}</span
                >
            {/if}
        </form>
    </div>
    <!-- <div class="flex max-h-full w-full flex-col items-start justify-start">
        <SectionHeader
            title="Cuti Bersalin Awal yang telah diambil dalam tahun semasa"
        ></SectionHeader>
        <DynamicTable tableItems={tarikh}></DynamicTable>
    </div> -->
</section>
