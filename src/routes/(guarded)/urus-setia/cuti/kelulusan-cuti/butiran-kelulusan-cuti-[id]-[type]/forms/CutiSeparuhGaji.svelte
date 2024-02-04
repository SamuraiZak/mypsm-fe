<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import type { PageData } from '../$types';
    import {
        _halfPayLeaveSchema,
        _hasApplicationReasonSchema,
        _submitHalfSalaryLeaveForm,
    } from '../+page';

    export let data: PageData;

    // ============== Form Validation
    const { form, errors, enhance } = superForm(data.halfPayLeaveForm, {
        SPA: true,
        validators: _halfPayLeaveSchema,
        invalidateAll: true,
        validationMethod: 'oninput',
        resetForm: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitHalfSalaryLeaveForm($form);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

    const proxyStartDate = dateProxy(form, 'startDate', { format: 'date' });
    const proxyEndDate = dateProxy(form, 'endDate', { format: 'date' });
</script>

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Separuh Gaji"></SectionHeader>
        <form
            id="formValidation"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >
            <LongTextField
                hasError={$errors.reason ? true : false}
                name="reason"
                label="Tujuan Permohonan"
                bind:value={$form.reason}
                placeholder="Sila taip jawapan anda dalam ruangan ini"
            ></LongTextField>
            {#if $errors.reason}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.reason}</span
                >
            {/if}
            <div class="w-fullflex-row flex items-center justify-start gap-2.5">
                <div class="flex w-full flex-col">
                    <DateSelector
                        hasError={$errors.startDate ? true : false}
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
                        hasError={$errors.halfDayStartDate ? true : false}
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
                        hasError={$errors.endDate ? true : false}
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
                    for="hasHalfDayEndDate"
                    class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Setengah Hari</label
                >
                <div class="flex w-full flex-col">
                    <DropdownSelect
                        hasError={$errors.halfDayEndDate ? true : false}
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
            <!-- <TextField
                hasError={$errors.totalDay ? true : false}
                name="totalDay"
                label="Bilangan Hari"
                bind:value={$form.totalDay}
            ></TextField>
            {#if $errors.totalDay}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.totalDay}</span
                >
            {/if} -->
        </form>
    </div>
    <!-- <div class="flex max-h-full w-full flex-col items-start justify-start">
        <SectionHeader
            title="Cuti Separuh Gaji yang telah diambil dalam tahun semasa"
        ></SectionHeader>
        <DynamicTable tableItems={ctr}></DynamicTable>
    </div> -->
</section>
