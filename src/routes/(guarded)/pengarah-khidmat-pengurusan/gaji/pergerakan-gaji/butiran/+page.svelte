<script lang="ts">
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
    // import { currencyFormatter } from '$lib/service/services';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockSalaryMovementSchedule } from '$lib/mocks/gaji/salaryMovementSchedule/mockSalaryMovementSchedule';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import TabButton from '$lib/components/tabs/TabButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';

    export let noPekerja = '00001';

    let activeStepper = 0;
    let salaryMovementData = mockSalaryMovementRecord[0];
    let currSecratery = mockEmployees[2];
    let disabled = true;
    let labelBlack = !disabled;
    let selectedMeeting = '2';
    let selectedMonth = '10';
    let errorData: any;
    let salaryMovementScheduleReviewReview: any;
    let salaryMovementScheduleReviewResult: any;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYear = currentYear;
    const nextYear = currYear + 1;
    let radioValue: any = 'sah';

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];
    const salaryMovementScheduleReviewForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            salaryMovementScheduleReviewResult: String(
                formData.get('salaryMovementScheduleReviewResult'),
            ),
            salaryMovementScheduleReviewReview: String(
                formData.get('salaryMovementScheduleReviewReview'),
            ),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            salaryMovementScheduleReviewResult: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            salaryMovementScheduleReviewReview: z
                .string({ required_error: 'Medan ini tidak boleh kosong.' })
                .min(4, {
                    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
                })
                .max(124, {
                    message: 'Medan ini tidak boleh melebihi 124 karakter.',
                })
                .trim(),
        });

        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
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
            />
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Maklumat Pergerakan Gaji"></SectionHeader>
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
                <TextField {labelBlack} disabled label="Gaji Khas {nextYear}"
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
                <p class="h-[35px] text-sm text-system-primary">Urus Setia</p>
                <TextField
                    {labelBlack}
                    disabled
                    label="Nama"
                    value={currSecratery.name}
                ></TextField>
                <DropdownField
                    {labelBlack}
                    dropdownType="label-left-full"
                    label="Penempatan Baru"
                    bind:index={selectedMeeting}
                    id="dropdown"
                    options={meetings}
                    disabled
                />
                <DateSelector
                    {labelBlack}
                    handleDateChange
                    label="Tarikh Mesyuarat"
                    selectedDate="2023-08-23"
                    disabled
                ></DateSelector>
                <DropdownField
                    {labelBlack}
                    dropdownType="label-left-full-optional-fields"
                    label="Keputusan Mesyuarat"
                    bind:index={selectedMonth}
                    id="dropdown"
                    options={months}
                    disabled
                    checkboxLabel1="Gred"
                    checkboxLabel2="Bantuan Khas Kewangan (RM)"
                    checkboxLabel3="Kenaikan Khas (RM)"
                />
            </div>
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
            <TextIconButton
                primary
                label="Hantar"
                form="salaryMovementScheduleReviewFormValidation"
            />
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="salaryMovementScheduleReviewFormValidation"
                on:submit|preventDefault={salaryMovementScheduleReviewForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <SectionHeader title="Jadual Pergerakan Gaji"
                    ></SectionHeader>
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
                        hasError={errorData?.Review}
                        name="salaryMovementScheduleReviewReview"
                        label="Tindakan / Ulasan Mesyuarat"
                        bind:value={salaryMovementScheduleReviewReview}
                    />
                    {#if errorData?.salaryMovementScheduleReviewReview}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.salaryMovementScheduleReviewReview[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        disabled={false}
                        {options}
                        name="salaryMovementScheduleReviewResult"
                        legend={'Keputusan Mesyuarat'}
                        bind:userSelected={salaryMovementScheduleReviewResult}
                    ></RadioSingle>
                    {#if errorData?.salaryMovementScheduleReviewResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.salaryMovementScheduleReviewResult[0]}</span
                        >
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
