<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { Checkbox } from 'flowbite-svelte';

    export let data;
    export let noPekerja = data.currentEmployee?.employeeNumber;

    let activeStepper = 0;
    let salaryMovementData = data.currentEmployee;
    let disabled = true;
    let labelBlack = !disabled;
    let errorData: any;
    let meetingTypeOption: any;
    let meetingDate: any;
    let salaryMovementMonthType: any;
    let radioValue: any = 'sah';
    let isGredChecked: boolean = false;
    let isSpecialIncrementTextChecked: boolean = false;
    let gred: any;
    let isSpecialFiAidTextChecked: boolean = false;
    let specialFiAidText: any;
    let specialIncrementText: any;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'SAH',
        },
        {
            value: 'tidak sah',
            label: 'TIDAK SAH',
        },
    ];

    const dateScheme = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const exampleFormSchema = z.object({
        meetingTypeOption: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        meetingDate: dateScheme,
        salaryMovementMonthType: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        gred: z.optional(
            z.enum(['All', 'N19', 'N21', 'N29', 'N32', 'N49', 'N52'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Pilihan perlu dipilih.'
                            : defaultError,
                }),
            }),
        ),
        specialFiAidTexts: z.optional(
            z
                .string({ required_error: 'Medan ini tidak boleh kosong.' })
                .min(1, {
                    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
                })
                .max(124, {
                    message: 'Medan ini tidak boleh melebihi 124 karakter.',
                })
                .trim(),
        ),
        specialIncrementTexts: z.optional(
            z
                .string({ required_error: 'Medan ini tidak boleh kosong.' })
                .min(1, {
                    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
                })
                .max(124, {
                    message: 'Medan ini tidak boleh melebihi 124 karakter.',
                })
                .trim(),
        ),
    });

    const retirementConfirmationForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const meetingTypeOptionSelector = document.getElementById(
            'meetingTypeOption',
        ) as HTMLSelectElement;
        const salaryMovementMonthType = document.getElementById(
            'salaryMovementMonthType',
        ) as HTMLSelectElement;
        const getGred = document.getElementById('gred') as HTMLSelectElement;

        const exampleFormData = {
            meetingTypeOption: String(meetingTypeOptionSelector.value),
            meetingDate: String(formData.get('meetingDate')),
            salaryMovementMonthType: String(salaryMovementMonthType.value),
        };

        try {
            let validatedData;
            let result;

            if (isGredChecked) {
                const gred = String(getGred.value);

                const validatedFormData = {
                    ...exampleFormData,
                    gred,
                };
                validatedData = validatedFormData;
                result = exampleFormSchema.parse(validatedFormData);
            } else if (isSpecialFiAidTextChecked) {
                const specialFiAidTexts = String(
                    formData.get('specialFiAidTexts'),
                );
                const validatedFormData = {
                    ...exampleFormData,
                    specialFiAidTexts,
                };
                validatedData = validatedFormData;
                result = exampleFormSchema.parse(validatedFormData);
            } else if (isSpecialIncrementTextChecked) {
                const specialIncrementTexts = String(
                    formData.get('specialIncrementTexts'),
                );
                const validatedFormData = {
                    ...exampleFormData,
                    specialIncrementTexts,
                };
                validatedData = validatedFormData;
                result = exampleFormSchema.parse(validatedFormData);
            } else {
                validatedData = exampleFormData;
                result = exampleFormSchema.parse(exampleFormData);
            }

            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedFormData = {
                    ...validatedData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
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

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pekerja {noPekerja}"
        description="Maklumat - maklumat pergerakan gaji pekerja {noPekerja}"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Keputusan Mesyuarat">
            <FormButton
                type="next"
                onClick={() => {
                    activeStepper = 1;
                }}
            /><TextIconButton
                primary
                label="Hantar"
                form="retirementConfirmationFormValidation"
            />
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="retirementConfirmationFormValidation"
                on:submit|preventDefault={retirementConfirmationForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Maklumat Pergerakan Gaji Semasa"
                    ></SectionHeader>
                    <TextField
                        {labelBlack}
                        disabled
                        label="Tarikh Pergerakan Gaji (TPG)"
                        value={salaryMovementData.tpg}
                    ></TextField>
                    <TextField
                        {labelBlack}
                        disabled
                        label="Gaji Bulan Berkenaan - {salaryMovementData.tpg}"
                    ></TextField>
                    <TextField
                        {labelBlack}
                        disabled
                        label="Kenaikan Gaji Tahunan (KGT)"
                    ></TextField>
                    <TextField {labelBlack} disabled label="Elaun Wilayah (EW)"
                    ></TextField>
                    <TextField
                        {labelBlack}
                        disabled
                        label="EL. Kritikal (5%) {currYear}"
                    ></TextField>
                    <TextField {labelBlack} disabled label="KGT Khas {nextYear}"
                    ></TextField>
                    <TextField
                        {labelBlack}
                        disabled
                        label="Gaji Khas {nextYear}"
                    ></TextField>
                    <TextField {labelBlack} disabled label="EW Khas {nextYear}"
                    ></TextField>
                    <TextField
                        {labelBlack}
                        disabled
                        label="EL. Kritikal (5%) {nextYear}"
                    ></TextField>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Pergerakan Gaji Baru"></SectionHeader>
                    <DropdownSelect
                        hasError={errorData?.meetingTypeOption}
                        dropdownType="label-left-full"
                        id="meetingTypeOption"
                        label="Nama dan Bilangan Mesyuarat"
                        bind:value={meetingTypeOption}
                        options={[
                            { value: '1', name: 'Semua' },
                            { value: '2', name: '1/12' },
                            { value: '3', name: '1/102' },
                            { value: '4', name: '2/101' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.meetingTypeOption}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingTypeOption[0]}</span
                        >
                    {/if}
                    <DateSelector
                        hasError={errorData?.meetingDate}
                        name="meetingDate"
                        handleDateChange
                        label="Tarikh Mesyuarat"
                        bind:selectedDate={meetingDate}
                    ></DateSelector>
                    {#if errorData?.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingDate[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        hasError={errorData?.salaryMovementMonthType}
                        dropdownType="label-left-full"
                        id="salaryMovementMonthType"
                        label="Bulan Pergerakan Gaji"
                        bind:value={salaryMovementMonthType}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'April' },
                            { value: '3', name: 'Julai' },
                            { value: '4', name: 'Oktober' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.salaryMovementMonthType}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.salaryMovementMonthType[0]}</span
                        >
                    {/if}
                    <div class="flex w-full flex-row items-center">
                        <label for="meetingResult" class="w-[280px]">
                            <p class="text-sm">Keputusan Mesyuarat</p>
                        </label>
                        <div class="flex w-full flex-col gap-y-7">
                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="gred"
                                        bind:checked={isGredChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <DropdownSelect
                                        hasError={errorData?.gred}
                                        disabled={!isGredChecked}
                                        id="gred"
                                        label="Gred"
                                        dropdownType="label-left-full"
                                        bind:value={gred}
                                        options={[
                                            { value: 'All', name: 'Semua' },
                                            { value: 'N19', name: 'N19' },
                                            { value: 'N21', name: 'N21' },
                                            { value: 'N29', name: 'N29' },
                                            { value: 'N32', name: 'N32' },
                                            { value: 'N49', name: 'N49' },
                                            { value: 'N52', name: 'N52' },
                                        ]}
                                    />
                                    {#if errorData?.gred}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{errorData?.gred[0]}</span
                                        >
                                    {/if}
                                </div>
                            </div>

                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="specialFiAidText"
                                        bind:checked={isSpecialFiAidTextChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!isSpecialFiAidTextChecked}
                                        label="Bantuan Khas Kewangan (RM)"
                                        hasError={errorData?.specialFiAidTexts}
                                        name="specialFiAidTexts"
                                        type="number"
                                        bind:value={specialFiAidText}
                                    />
                                    {#if errorData?.specialFiAidTexts}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.specialFiAidTexts[0]}</span
                                        >
                                    {/if}
                                </div>
                                {#if errorData?.specialFiAidText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialFiAidText[0]}</span
                                    >
                                {/if}
                            </div>

                            <div class="flex flex-row items-center">
                                <div>
                                    <Checkbox
                                        name="specialIncrementText"
                                        bind:checked={isSpecialIncrementTextChecked}
                                    ></Checkbox>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!isSpecialIncrementTextChecked}
                                        label="Kenaikan Khas (RM)"
                                        hasError={errorData?.specialIncrementTexts}
                                        name="specialIncrementTexts"
                                        type="number"
                                        bind:value={specialIncrementText}
                                    />
                                    {#if errorData?.specialIncrementTexts}
                                        <span
                                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                                            >{errorData
                                                ?.specialIncrementTexts[0]}</span
                                        >
                                    {/if}
                                </div>
                                {#if errorData?.specialIncrementText}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.specialIncrementText[0]}</span
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
        <StepperContentHeader title="Semakan Jadual Pergerakan Gaji">
            <FormButton
                type="back"
                onClick={() => {
                    activeStepper = 0;
                }}
            />
            <FormButton
                type="done"
                onClick={() => {
                    window.history.back();
                }}
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Jadual Pergerakan Gaji"></SectionHeader>
                <DynamicTable tableItems={mockSalaryMovementSchedule}
                ></DynamicTable>
            </div>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="h-[35px] text-sm text-system-primary">
                    Pengarah Khidmat Pengurusan
                </p>
                <LongTextField
                    disabled
                    label="Tindakan / Ulasan Mesyuarat"
                    labelBlack
                    placeholder="Boleh diteruskan"
                ></LongTextField>
                <RadioSingle
                    disabled
                    {options}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={radioValue}
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pergerakan Gaji"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-row items-center justify-between">
                    <DownloadAttachment fileName="Keputusan Pergerakan Gaji"
                    ></DownloadAttachment>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
