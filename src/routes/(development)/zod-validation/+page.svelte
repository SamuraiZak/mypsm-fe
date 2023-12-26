<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    export let data;

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'YA',
        },
        {
            value: 'false',
            label: 'TIDAK',
        },
    ];

    let isChecked: boolean = false;

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    // date common schema
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
        // checkbox schema
        radioButtonExample: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        checkboxExample: z.enum(['on'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tandakan kotak semak.'
                        : defaultError,
            }),
        }),
        selectOptionExample: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        textFieldExample: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        dateSelectorExample: dateScheme,
        longTextExample: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    // =================================================================================
    // submit form function==================================
    // =================================================================================
    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const exampleFormData = {
            radioButtonExample: String(formData.get('radioButtonExample')),
            checkboxExample: String(formData.get('checkboxExample')),
            selectOptionExample: String(selectOptionExampleSelector.value),
            textFieldExample: String(formData.get('textFieldExample')),
            dateSelectorExample: String(formData.get('dateSelectorExample')),
            longTextExample: String(formData.get('longTextExample')),
        };
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

<div class="flex flex-col gap-y-5 p-5">
    <div
        class="flex flex-row items-center justify-between rounded border-2 border-system-accent p-2.5"
    >
        <p class="text-base font-bold">Zod validation example</p>
        <TextIconButton primary label="Simpan" form="formValidation" />
    </div>
    <div class="rounded border-2 p-2.5">
        <form
            id="formValidation"
            on:submit|preventDefault={submitForm}
            class="flex w-full flex-col gap-2"
        >
            <input
                type="text"
                name="id"
                hidden
                bind:value={data.record.currentData.id}
            />

            <!-- Radio input -->
            <RadioSingle
                disabled={false}
                {options}
                name="radioButtonExample"
                legend={'Radio Button'}
                bind:userSelected={data.record.currentData.radioChosen}
            ></RadioSingle>
            {#if errorData?.radioButtonExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.radioButtonExample[0]}</span
                >
            {/if}

            <!-- Checkbox element -->
            <div class="flex flex-row">
                <label for="checkboxExample" class="w-[220px] text-sm"
                    >Checkbox Input</label
                >
                <Checkbox name="checkboxExample" bind:checked={isChecked}
                    >You have to agree! Check the box on the left.</Checkbox
                >
            </div>
            {#if errorData?.checkboxExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.checkboxExample[0]}</span
                >
            {/if}

            <!-- Select options -->
            <DropdownSelect
                hasError={errorData?.selectOptionExample}
                dropdownType="label-left-full"
                id="selectOptionExample"
                label="Dropdown Option"
                bind:value={data.record.currentData.isAgreed}
                options={[
                    { value: '1', name: 'One' },
                    { value: '2', name: 'Two' },
                    { value: '3', name: 'Three' },
                    { value: '4', name: 'Four' },
                ]}
            ></DropdownSelect>
            {#if errorData?.selectOptionExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.selectOptionExample[0]}</span
                >
            {/if}

            <!-- Text Field options -->
            <TextField
                hasError={errorData?.textFieldExample}
                name="textFieldExample"
                label="Text Field"
                type="text"
                bind:value={data.record.currentData.textInput}
            />
            {#if errorData?.textFieldExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.textFieldExample[0]}</span
                >
            {/if}

            <!-- Date Selector options -->
            <DateSelector
                hasError={errorData?.dateSelectorExample}
                name="dateSelectorExample"
                handleDateChange
                label="Date Selector"
                bind:selectedDate={data.record.currentData.formDate}
            ></DateSelector>
            {#if errorData?.dateSelectorExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.dateSelectorExample[0]}</span
                >
            {/if}

            <!-- Text Area options -->
            <LongTextField
                hasError={errorData?.longTextExample}
                name="longTextExample"
                label="Long Text Field"
                bind:value={data.record.currentData.address}
            />
            {#if errorData?.longTextExample}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.longTextExample[0]}</span
                >
            {/if}
        </form>
    </div>
</div>

<!-- Svelte French Toast UI Component -->
<Toaster />
