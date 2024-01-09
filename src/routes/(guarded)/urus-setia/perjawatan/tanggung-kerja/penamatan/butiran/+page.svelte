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

    let interimDateOfEffect: string = '';
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

    let listOfYears: { value: string; name: string }[] = [];
    // for (var i = new Date().getFullYear(); i >= 1980; i--) {
    //     listOfYears.push({ value: i.toString(), name: i.toString() });
    // }

    let listOfMonths: { value: string; name: string }[] = [];
    // for (let i = 1; i <= 12; i++) {
    //     listOfMonths.push({
    //         value: i.toString(),
    //         name: new Date(0, i - 1).toLocaleString('en-US', { month: 'long' }),
    //     });
    // }

    let isCertified: string = 'true';

    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        // selectedSupporter = employeeLists[0].value;
        // selectedApprover = employeeLists[0].value;
    });

    // =========================================================================
    // z validation schema and submit function for the interim form fields
    // =========================================================================
    let errorData: any;

    const textFieldSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const dateScheme = z.coerce.date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    });

    // Interim - check info form
    const interimCheckSchema = z.object({
        interimCheckRemark: longTextSchema,
        interimCheckResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    const submitInterimCheck = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const interimCheckData = {
            interimCheckRemark: String(formData.get('interimCheckRemark')),
            interimCheckResult: String(formData.get('interimCheckResult')),
        };

        try {
            const result = interimCheckSchema.parse(interimCheckData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };

    // Interim - payment calculation form
    const payCalculationSchema = z.object({
        interimDateOfEffect: dateScheme,
        interimUntilDate: dateScheme.refine(
            (date) => date >= new Date(interimDateOfEffect),
            {
                message: 'Tarikh tamat tidak boleh kurang daripada tarikh mula',
            },
        ),
        etkPaymentMonth: z
            .string()
            .min(1, { message: 'Sila pilih pilihan anda.' }),
        etkPaymentYear: z
            .string()
            .min(1, { message: 'Sila pilih pilihan anda.' }),
    });

    const submitpayCalculationCheck = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const getEtkPaymentMonth = document.getElementById(
            'etkPaymentMonth',
        ) as HTMLSelectElement;
        const getEtkPaymentYear = document.getElementById(
            'etkPaymentYear',
        ) as HTMLSelectElement;

        formData.append('etkPaymentMonth', String(getEtkPaymentMonth.value));
        formData.append('etkPaymentYear', String(getEtkPaymentYear.value));

        const payCalculationData = {
            interimDateOfEffect: String(formData.get('interimDateOfEffect')),
            interimUntilDate: String(formData.get('interimUntilDate')),
            etkPaymentMonth: String(formData.get('etkPaymentMonth')),
            etkPaymentYear: String(formData.get('etkPaymentYear')),
        };

        try {
            const result = payCalculationSchema.parse(payCalculationData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };

    // assign rights form
    const assignApproverSupporterSchema = z.object({
        staffSupporter: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
        staffApprover: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
    });

    const submitAssignApproverSupporterForm = async () => {
        const staffSupporterSelector = document.getElementById(
            'staffSupporter',
        ) as HTMLSelectElement;
        const staffApproverSelector = document.getElementById(
            'staffApprover',
        ) as HTMLSelectElement;

        const newEmploymentSecretaryResultData = {
            staffSupporter: String(staffSupporterSelector.value),
            staffApprover: String(staffApproverSelector.value),
        };

        try {
            const result = assignApproverSupporterSchema.parse(
                newEmploymentSecretaryResultData,
            );
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                setTimeout(() => {
                    goto('../../tanggung-kerja');
                }, 1500);
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
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
                    on:submit|preventDefault={submitInterimCheck}
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
                        hasError={errorData?.interimCheckRemark}
                        name="interimCheckRemark"
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value=""
                    />
                    {#if errorData?.interimCheckRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interimCheckRemark[0]}</span
                        >
                    {/if}
                    <RadioSingle
                        name="interimCheckResult"
                        legend="Keputusan"
                        {options}
                        bind:userSelected={isCertified}
                    />
                    {#if errorData?.interimCheckResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interimCheckResult[0]}</span
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
                    on:submit|preventDefault={submitpayCalculationCheck}
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
                                    hasError={errorData?.interimDateOfEffect}
                                    name="interimDateOfEffect"
                                    disabled={false}
                                    label={'Tarikh Kuatkuasa Penanggung Kerja'}
                                    bind:selectedDate={interimDateOfEffect}
                                ></DateSelector>
                                {#if errorData?.interimDateOfEffect}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.interimDateOfEffect[0]}</span
                                    >
                                {/if}
                            </div>
                            <div class="flex w-full flex-col">
                                <DateSelector
                                    hasError={errorData?.interimUntilDate}
                                    name="interimUntilDate"
                                    disabled={false}
                                    label={'Hingga'}
                                    labelType="label-fit"
                                    selectedDate={''}
                                ></DateSelector>
                                {#if errorData?.interimUntilDate}
                                    <span
                                        class="ml-10 font-sans text-sm italic text-system-danger"
                                        >{errorData?.interimUntilDate[0]}</span
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
                                        hasError={errorData?.etkPaymentMonth}
                                        id="etkPaymentMonth"
                                        label="Bulan"
                                        dropdownType="label-fit"
                                        options={listOfMonths}
                                        value={''}
                                    />
                                    {#if errorData?.etkPaymentMonth}
                                        <span
                                            class="ml-9 font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.etkPaymentMonth[0]}</span
                                        >
                                    {/if}
                                </div>
                                <div class="flex w-full flex-col">
                                    <DropdownSelect
                                        hasError={errorData?.etkPaymentYear}
                                        id="etkPaymentYear"
                                        label="Tahun"
                                        dropdownType="label-fit"
                                        options={listOfYears}
                                        value={''}
                                    />
                                    {#if errorData?.etkPaymentYear}
                                        <span
                                            class="ml-10 font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.etkPaymentYear[0]}</span
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
                    on:submit|preventDefault={submitAssignApproverSupporterForm}
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={errorData?.staffSupporter}
                        id="staffSupporter"
                        label="Nama Penyokong"
                        dropdownType="label-left-full"
                        options={employeeLists}
                        bind:value={selectedSupporter}
                    />
                    {#if errorData?.staffSupporter}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.staffSupporter[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={errorData?.staffApprover}
                        id="staffApprover"
                        label="Nama Pelulus"
                        dropdownType="label-left-full"
                        options={employeeLists}
                        bind:value={selectedApprover}
                    />
                    {#if errorData?.staffApprover}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.staffApprover[0]}</span
                        >
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
