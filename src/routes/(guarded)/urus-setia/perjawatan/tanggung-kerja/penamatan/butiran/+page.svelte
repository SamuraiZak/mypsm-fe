<script lang="ts">
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { ZodError, z } from 'zod';
    import toast, { Toaster } from 'svelte-french-toast';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _assignApproverSupporterSchema,
        _interimCheckSchema,
        _payCalculationSchema,
        _submitAssignApproverSupporterForm,
        _submitInterimCheck,
        _submitpayCalculationCheck,
    } from './+page';
    let employeeLists: SelectOptionType<any>[] = [];
    export let data: PageData;

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Sah',
        },
        {
            value: 'false',
            label: 'Tidak Sah',
        },
    ];

    let listOfYears: { value: string; name: string }[] = [
        { value: '2019', name: '2019' },
        { value: '2020', name: '2020' },
        { value: '2021', name: '2021' },
        { value: '2022', name: '2022' },
        { value: '2023', name: '2023' },
        { value: '2024', name: '2024' },
    ];
    // for (var i = new Date().getFullYear(); i >= 1980; i--) {
    //     listOfYears.push({ value: i.toString(), name: i.toString() });
    // }

    let listOfMonths: { value: string; name: string }[] = [
        { value: '1', name: 'Jan' },
        { value: '2', name: 'Feb' },
        { value: '3', name: 'Mac' },
        { value: '4', name: 'Apr' },
    ];
    // for (let i = 1; i <= 12; i++) {
    //     listOfMonths.push({
    //         value: i.toString(),
    //         name: new Date(0, i - 1).toLocaleString('en-US', { month: 'long' }),
    //     });
    // }

    const { form, errors, enhance } = superForm(data.interimCheckForm, {
        SPA: true,
        validators: _interimCheckSchema,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: payCalculationForm,
        errors: payCalculationErrors,
        enhance: payCalculationEnhance,
    } = superForm(data.payCalculationForm, {
        SPA: true,
        validators: _payCalculationSchema,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
    const {
        form: assignApproverSupporterForm,
        errors: assignApproverSupporterErrors,
        enhance: assignApproverSupporterEnhance,
    } = superForm(data.assignApproverSupporterForm, {
        SPA: true,
        validators: _assignApproverSupporterSchema,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    onMount(async () => {
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        // selectedSupporter = employeeLists.value;
        // selectedApprover = employeeLists.value;
    });
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Penamatan Tanggung Kerja"
        description="Sila lengkapkan butiran yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/urus-setia/perjawatan/tanggung-kerja');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper>
        <!-- Langkah 1 -->
        <StepperContent>
            <StepperContentHeader title="Butiran Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama Gred"
                            disabled={true}
                            placeholder="-"
                            value="N32"
                        />
                        <TextField
                            label="Kementerian/Jabatan"
                            disabled={true}
                            placeholder="-"
                            value="Jabatan 1"
                        />
                        <TextField
                            label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                            disabled={true}
                            placeholder="-"
                            value="123456"
                        />
                        <TextField
                            label="Tarikh Mula"
                            disabled={true}
                            placeholder="-"
                            value="12/02/2023"
                        />
                        <TextField
                            label="Tarikh Tamat"
                            disabled={true}
                            placeholder="-"
                            value="12/03/2023"
                        />
                        <TextField
                            label="Tempat Kekosongan"
                            disabled={true}
                            placeholder="-"
                            value="Tempat 1"
                        />
                        <LongTextField
                            label="Sebab-sebab Kekosongan"
                            disabled={true}
                            placeholder="-"
                            value="Sebab-sebab..."
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama Pegawai"
                            disabled={true}
                            placeholder="-"
                            value="Mohd. Irfan Bin Abu"
                        />
                        <TextField
                            label="No. K/P"
                            disabled={true}
                            placeholder="-"
                            value="890701-13-5667"
                        />
                        <TextField
                            label="Tarikh Lantikan Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Tarikh Sah Dalam Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Jawatan/Gred"
                            disabled={true}
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                        />
                        <TextField
                            label="Tarikh Mula Bertugas di Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Tempat Bertugas Semasa"
                            disabled={true}
                            placeholder="-"
                            value="Tempat 2"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Semakan Maklumat Tanggung Kerja"
            >
                <TextIconButton
                    primary
                    label="Simpan"
                    form="interimSecretaryResultForm"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="interimSecretaryResultForm"
                    method="POST"
                    on:submit|preventDefault={_submitInterimCheck}
                    use:enhance
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div class="mb-5 flex flex-row items-center text-sm italic">
                        <label for="formToBeGenerated" class="w-[220px]"
                            >Borang-borang yang akan dijana dan diemelkan kepada
                            kakitangan berkaitan:</label
                        >
                        <p>1. Surat Penamatan Tanggung Kerja</p>
                    </div>
                    <LongTextField
                        hasError={$errors.interimCheckRemark ? true : false}
                        name="interimCheckRemark"
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        bind:value={$form.interimCheckRemark}
                    />
                    {#if $errors.interimCheckRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.interimCheckRemark}</span
                        >
                    {/if}
                    <RadioSingle
                        name="interimCheckResult"
                        legend="Keputusan"
                        {options}
                        bind:userSelected={$form.interimCheckResult}
                    />
                    {#if $errors.interimCheckResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.interimCheckResult}</span
                        >
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pengiraan Elaun Tanggung Kerja">
                <TextIconButton
                    primary
                    label="Simpan"
                    form="payCalculationForm"
                /></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Penyata Pelarasan Elaun Tanggung Kerja"
                ></SectionHeader>
                <form
                    id="payCalculationForm"
                    method="POST"
                    on:submit|preventDefault={_submitpayCalculationCheck}
                    use:payCalculationEnhance
                    class="h-full w-full"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama / No. K/P / No. Pekerja"
                            placeholder="-"
                            value="Abu Bin Bakar / 001122-33-4444 / 0282379L"
                            disabled={true}
                        />
                        <TextField
                            label="Jawatan Hakiki Sekarang"
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                            disabled={true}
                        />
                        <TextField
                            label="Jawatan yang Ditanggung Kerja"
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                            disabled={true}
                        />
                        <TextField
                            label="Gred dan Gaji Minima Jawatan yang Ditanggung Kerja"
                            placeholder="-"
                            value="E-44 - RM 3556.00"
                            disabled={true}
                        />
                        <div class="flex w-full items-center">
                            <div class="w-[220px] text-sm text-txt-secondary">
                                25% Daripada Gaji Minima
                            </div>
                            <div
                                class="text-sm font-semibold text-system-primary"
                            >
                                (RM 3556.00 * 25% = RM 889.00 sebulan)
                            </div>
                        </div>
                        <div class="flex w-full gap-2">
                            <div class="flex w-full flex-col">
                                <DateSelector
                                    hasError={$payCalculationErrors.interimDateOfEffect
                                        ? true
                                        : false}
                                    name="interimDateOfEffect"
                                    disabled={false}
                                    label={'Tarikh Kuatkuasa Penanggung Kerja'}
                                    bind:selectedDate={$payCalculationForm.interimDateOfEffect}
                                ></DateSelector>
                                {#if $payCalculationErrors.interimDateOfEffect}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{$payCalculationErrors.interimDateOfEffect}</span
                                    >
                                {/if}
                            </div>
                            <div class="flex w-full flex-col">
                                <DateSelector
                                    hasError={$payCalculationErrors.interimUntilDate
                                        ? true
                                        : false}
                                    name="interimUntilDate"
                                    disabled={false}
                                    label={'Hingga'}
                                    labelType="label-fit"
                                    bind:selectedDate={$payCalculationForm.interimUntilDate}
                                ></DateSelector>
                                {#if $payCalculationErrors.interimUntilDate}
                                    <span
                                        class="ml-10 font-sans text-sm italic text-system-danger"
                                        >{$payCalculationErrors.interimUntilDate}</span
                                    >
                                {/if}
                            </div>
                        </div>
                        <TextField
                            label="Penempatan"
                            placeholder="-"
                            value="Penempatan"
                            disabled={true}
                        />
                    </div>
                    <SectionHeader title="Perkiraan Elaun Tanggung Kerja"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <div class="flex w-full">
                            <div class="w-[220px] min-w-[220px] text-sm">
                                Bulan Jun (11 Hari)
                            </div>
                            <div
                                class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                            >
                                <span>(</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 889.00"
                                /><span>x</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="11"
                                /><span>hari ) /</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="30"
                                /><span>=</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 325.97"
                                />
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div class="w-[220px] min-w-[220px] text-sm">
                                Bulan Pertengahan (Penuh)
                            </div>
                            <div
                                class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                            >
                                <span>(</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 889.00"
                                /><span>x</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="5"
                                /><span>Bulan ) =</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 3556.00"
                                />
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div class="w-[220px] min-w-[220px] text-sm">
                                Bulan Disember (7 Hari)
                            </div>
                            <div
                                class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                            >
                                <span>(</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 889.00"
                                /><span>x</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="7"
                                /><span>hari ) /</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="31"
                                /><span>=</span><ShortTextField
                                    disabled={true}
                                    labelType="no-label"
                                    placeholder="-"
                                    value="RM 207.43"
                                />
                            </div>
                        </div>
                        <TextField
                            label="Jumlah bayaran tunggakan ETK"
                            placeholder="-"
                            value="RM 4089.40"
                            disabled={true}
                        />
                        <div class="text-sm italic text-txt-secondary">
                            Nota: Pegawai ini tidak bercuti bagi tempoh 14/28
                            hari berturut-turut. (Sila Rujuk Format 3)
                        </div>
                        <div class="flex w-full">
                            <div class="w-[220px] min-w-[220px] text-sm">
                                Sila Buat Bayaran Tunggakan ETK Melalui Gaji
                                Bulan
                            </div>
                            <div class="flex w-full gap-2">
                                <div class="flex w-full flex-col">
                                    <DropdownSelect
                                        hasError={$payCalculationErrors.etkPaymentMonth
                                            ? true
                                            : false}
                                        id="etkPaymentMonth"
                                        label="Bulan"
                                        dropdownType="label-fit"
                                        options={listOfMonths}
                                        bind:value={$payCalculationForm.etkPaymentMonth}
                                    />
                                    {#if $payCalculationErrors.etkPaymentMonth}
                                        <span
                                            class="ml-9 font-sans text-sm italic text-system-danger"
                                            >{$payCalculationErrors.etkPaymentMonth}</span
                                        >
                                    {/if}
                                </div>
                                <div class="flex w-full flex-col">
                                    <DropdownSelect
                                        hasError={$payCalculationErrors.etkPaymentYear
                                            ? true
                                            : false}
                                        id="etkPaymentYear"
                                        label="Tahun"
                                        dropdownType="label-fit"
                                        options={listOfYears}
                                        bind:value={$payCalculationForm.etkPaymentYear}
                                    />
                                    {#if $payCalculationErrors.etkPaymentYear}
                                        <span
                                            class="ml-10 font-sans text-sm italic text-system-danger"
                                            >{$payCalculationErrors.etkPaymentYear}</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Penyokong dan Pelulus (Timbalan dan Ketua Seksyen)"
                ><TextIconButton
                    primary
                    label="Hantar"
                    form="newEmploymentAssignApproverSupporterForm"
                /></StepperContentHeader
            >
            <StepperContentBody>
                <form
                    id="newEmploymentAssignApproverSupporterForm"
                    method="POST"
                    on:submit|preventDefault={_submitAssignApproverSupporterForm}
                    use:assignApproverSupporterEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={$assignApproverSupporterErrors.staffSupporter
                            ? true
                            : false}
                        id="staffSupporter"
                        label="Nama Penyokong"
                        dropdownType="label-left-full"
                        options={employeeLists}
                        bind:value={$assignApproverSupporterForm.staffSupporter}
                    />
                    {#if $assignApproverSupporterErrors.staffSupporter}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$assignApproverSupporterErrors.staffSupporter}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={$assignApproverSupporterErrors.staffApprover
                            ? true
                            : false}
                        id="staffApprover"
                        label="Nama Pelulus"
                        dropdownType="label-left-full"
                        options={employeeLists}
                        bind:value={$assignApproverSupporterForm.staffApprover}
                    />
                    {#if $assignApproverSupporterErrors.staffApprover}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$assignApproverSupporterErrors.staffApprover}</span
                        >
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
