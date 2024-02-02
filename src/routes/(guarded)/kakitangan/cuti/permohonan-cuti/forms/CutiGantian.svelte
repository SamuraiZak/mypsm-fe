<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TugasTugasRasmiYangJatuhPadaHariCuti from './TugasTugasRasmiYangJatuhPadaHariCuti.svelte';
    import type { PageData } from '../$types';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import {
        _replacementLeaveSchema,
        _replacementLeaveSchema1,
        _replacementLeaveSchema2,
        _replacementLeaveSchema3,
        _replacementLeaveSchema4,
        _submitReplacementLeaveForm,
    } from '../+page';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { jenisGantian } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/jenis-gantian';
    import { kategoriCuti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/kategori-cuti';

    export let data: PageData;

    let selectedJenisGantian = '';
    // let hasHalfDayStartDate: boolean = false;
    // let hasHalfDayEndDate: boolean = false;

    // ================ Form Validation ================
    const { form, errors, enhance } = superForm(data.replacementLeaveForm, {
        SPA: true,
        validators: _replacementLeaveSchema,
        invalidateAll: true,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        resetForm: false,
        onSubmit() {
            _submitReplacementLeaveForm(
                $form,
                // hasHalfDayStartDate,
                // hasHalfDayEndDate,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

    const proxyStartDate = dateProxy(form, 'startDate', { format: 'date' });
    const proxyEndDate = dateProxy(form, 'endDate', { format: 'date' });
    const proxyLastLeaveDate = dateProxy(form, 'lastLeaveDate', {
        format: 'date',
    });
    const proxyDutyDate = dateProxy(form, 'dutyDate', {
        format: 'date',
    });

    // $: if (hasHalfDayStartDate && !hasHalfDayEndDate) {
    //     options.validators = _replacementLeaveSchema2;
    // } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
    //     options.validators = _replacementLeaveSchema3;
    // } else if (hasHalfDayEndDate && hasHalfDayStartDate) {
    //     options.validators = _replacementLeaveSchema4;
    // } else if (!hasHalfDayStartDate && !hasHalfDayEndDate) {
    //     options.validators = _replacementLeaveSchema1;
    // }
</script>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-auto"
>
    <form id="formValidation" method="POST" use:enhance class="w-full">
        <SectionHeader title="Maklumat Gantian"></SectionHeader>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
        >
            <div class="flex w-full flex-col gap-2">
                <DropdownSelect
                    hasError={!!$errors.substituteName}
                    id="substituteName"
                    options={data.employeeListLookup}
                    bind:value={$form.substituteName}
                    dropdownType="label-left-full"
                    label="Nama Pengganti / Gred"
                ></DropdownSelect>
                {#if $errors.substituteName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.substituteName}</span
                    >
                {/if}
                <div
                    class="flex w-full flex-row items-center justify-start gap-2.5"
                >
                    <div class="flex w-full flex-col">
                        <DateSelector
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
                                hasError={!!$errors.halfDayStartDate
                                    ? true
                                    : false}
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
                            for="hasHalfDayEndDate"
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
                <TextField
                    disabled
                    label="Jumlah Cuti Gantian Yang Telah Diambil Pada Tahun Semasa"
                    value="2"
                ></TextField>
                <DateSelector
                    hasError={!!$errors.lastLeaveDate}
                    name="lastLeaveDate"
                    handleDateChange
                    label="Cuti Gantian Terakhir Diambil Pada"
                    bind:selectedDate={$proxyLastLeaveDate}
                ></DateSelector>
                {#if $errors.lastLeaveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.lastLeaveDate}</span
                    >
                {/if}
            </div>
        </div>

        <SectionHeader title="Jenis Gantian"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DropdownSelect
                dropdownType="label-left-full"
                label="Jenis Gantian"
                options={jenisGantian.filter((cat) => cat.name != 'Semua')}
                bind:value={$form.replacementType}
                onSelect={() => {}}
            ></DropdownSelect>

            {#if !!$form.replacementType}
                <!-- <BekerjaLebihMasa {data}></BekerjaLebihMasa> -->
                <section
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                >
                    <SectionHeader
                        title={$form.replacementType === 'Bekerja Lebih Masa'
                            ? 'Bekerja Lebih Masa'
                            : 'Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti'}
                    ></SectionHeader>

                    <div class="flex w-full flex-col gap-2">
                        {#if $form.replacementType === 'Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti'}
                            <DropdownSelect
                                dropdownType="label-left-full"
                                label="Jenis Cuti Gantian"
                                options={kategoriCuti}
                                bind:value={$form.leaveCategory}
                                onSelect={() => {}}
                            ></DropdownSelect>
                        {/if}
                        <LongTextField
                            hasError={!!$errors.dutyDescription}
                            name="dutyDescription"
                            label="Tugas-Tugas Rasmi Yang Dijalankan"
                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                            bind:value={$form.dutyDescription}
                        ></LongTextField>
                        {#if $errors.dutyDescription}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.dutyDescription}</span
                            >
                        {/if}
                        <DateSelector
                            hasError={!!$errors.dutyDate}
                            name="dutyDate"
                            handleDateChange
                            label="Tarikh"
                            bind:selectedDate={$proxyDutyDate}
                        ></DateSelector>
                        {#if $errors.dutyDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.dutyDate}</span
                            >
                        {/if}
                        <TextField
                            hasError={!!$errors.dutyLocation}
                            name="dutyLocation"
                            label="Tempat Bekerja"
                            bind:value={$form.dutyLocation}
                        ></TextField>
                        {#if $errors.dutyLocation}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.dutyLocation}</span
                            >
                        {/if}
                        <div
                            class="flex w-full flex-row items-center justify-start"
                        >
                            <TextField
                                hasError={!!$errors.dutyStartHour}
                                label="Waktu Mula"
                                type="time"
                                name="dutyStartHour"
                                bind:value={$form.dutyStartHour}
                            />
                        </div>
                        {#if $errors.dutyStartHour}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.dutyStartHour}</span
                            >
                        {/if}
                        <div
                            class="flex w-full flex-row items-center justify-start"
                        >
                            <TextField
                                hasError={!!$errors.dutyEndHour}
                                label="Waktu Tamat"
                                type="time"
                                name="dutyEndHour"
                                bind:value={$form.dutyEndHour}
                            />
                        </div>
                        {#if $errors.dutyEndHour}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.dutyEndHour}</span
                            >
                        {/if}
                    </div>
                </section>
            {/if}
        </div>
    </form>
</section>
