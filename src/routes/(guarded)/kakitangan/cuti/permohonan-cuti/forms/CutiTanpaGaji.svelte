<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { ctr } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/ctr';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';
    import { Checkbox } from 'flowbite-svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _hasApplicationReasonSchema,
        _halfSalaryLeaveSchema,
        _halfSalaryLeaveSchema2,
        _halfSalaryLeaveSchema3,
        _submitHalfSalaryLeaveForm,
    } from '../+page';

    export let data: PageData;
    let hasHalfDayStartDate: boolean = false;
    let hasHalfDayEndDate: boolean = false;

    // ============== Form Validation
    const { form, errors, enhance, options } = superForm(
        data.leaveWithoutRecordForm,
        {
            SPA: true,
            onSubmit() {
                _submitHalfSalaryLeaveForm(
                    $form,
                    hasHalfDayStartDate,
                    hasHalfDayEndDate,
                );
            },
            taintedMessage:
                'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
        },
    );

    $: if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        options.validators = _halfSalaryLeaveSchema;
    } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
        options.validators = _halfSalaryLeaveSchema2;
    } else if (hasHalfDayEndDate && hasHalfDayStartDate) {
        options.validators = _halfSalaryLeaveSchema3;
    } else if (!hasHalfDayStartDate && !hasHalfDayEndDate) {
        options.validators = _hasApplicationReasonSchema;
    }
</script>

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Tanpa Gaji"></SectionHeader>
        <form
            id="formValidation"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >
            <LongTextField
                hasError={$errors.applicationReason ? true : false}
                name="applicationReason"
                label="Tujuan Permohonan"
                bind:value={$form.applicationReason}
                placeholder="Sila taip jawapan anda dalam ruangan ini"
            ></LongTextField>
            {#if $errors.applicationReason}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.applicationReason}</span
                >
            {/if}
            <div
                class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        hasError={$errors.startDate ? true : false}
                        name="startDate"
                        handleDateChange
                        bind:selectedDate={$form.startDate}
                        label="Tarikh Mula"
                    ></DateSelector>
                    {#if $errors.startDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.startDate}</span
                        >
                    {/if}
                </div>
                <Checkbox
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
                </div>
            </div>
            <div
                class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        hasError={$errors.endDate ? true : false}
                        name="endDate"
                        handleDateChange
                        label="Tarikh Tamat"
                        bind:selectedDate={$form.endDate}
                    ></DateSelector>
                    {#if $errors.endDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.endDate}</span
                        >
                    {/if}
                </div>
                <Checkbox
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
                </div>
            </div>
            <TextField
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
            {/if}
        </form>
    </div>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <SectionHeader
            title="Cuti Tanpa Gaji yang telah diambil dalam tahun semasa"
        ></SectionHeader>
        <DynamicTable tableItems={ctr}></DynamicTable>
    </div>
</section>
