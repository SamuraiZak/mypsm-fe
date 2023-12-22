<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import { fail, type SubmitFunction } from '@sveltejs/kit';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { onMount } from 'svelte';
    import { mockExams } from '$lib/mocks/latihan/mockExams.js';
    import { page } from '$app/stores';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    // import { z } from 'zod';
    export let data;
    let activeStepper = 0;

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

    let isExPoliceSoldier = '';
    let isChecked: boolean = false;

    // export let form;
    // let currentData: IntExams;
    const getExams = async () => {
        const data: IntExams[] = await mockExams;

        const currentDataData: IntExams | undefined = data.find(
            (exam) => exam.id === $page.params.id,
        );

        if (!currentDataData) return fail(404, { missing: true });

        return {
            currentDataData,
        };
    };

    // z validation schema for the exam form fields=========================================================
    let errorData: any;

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

    const examFormSchema = z.object({
        // checkbox schema
        radioButtonExample: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        checkboxExample: z.enum(['on'], {
            required_error: 'Sila tandakan kotak semak.',
        }),
        selectOptionExample: z.enum(['perkhidmatan', 'psl'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Jenis latihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        textFieldExample: z
            .string({ required_error: 'Tajuk latihan tidak boleh kosong.' })
            .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
            .max(124, { message: 'Tajuk tidak boleh melebihi 124 karakter.' })
            .trim(),
        dateSelectorExample: dateScheme,
        examApplicationCloseDate: dateScheme,
        examDate: dateScheme,
        longTextExample: z
            .string({ required_error: 'Lokasi tidak boleh kosong.' })
            .min(4, { message: 'Lokasi hendaklah lebih daripada 4 karakter.' })
            .max(124, { message: 'Lokasi tidak boleh melebihi 124 karakter.' })
            .trim(),
    });

    const submitForm = async (event: Event) => {
        // toast.success('Berjaya disimpan!');

        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;
        console.log('HERE', formData.get('checkboxExample'));

        const examFormData = {
            selectOptionExample: String(selectOptionExampleSelector.value),
            radioButtonExample: String(formData.get('radioButtonExample')),
            textFieldExample: String(formData.get('textFieldExample')),
            dateSelectorExample: String(formData.get('dateSelectorExample')),
            examApplicationCloseDate: String(
                formData.get('examApplicationCloseDate'),
            ),
            examDate: String(formData.get('examDate')),
            longTextExample: String(formData.get('longTextExample')),
        };
        // console.log(examFormData);
        try {
            const result = examFormSchema.parse(examFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                if (formData.get('id') !== data.record.currentData.id) {
                    // window.history.back();
                } else {
                    console.log(
                        formData.get('id') +
                            ' has already existed => ' +
                            data.record.currentData.id,
                    );
                }
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                const { ...rest } = formData;
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
        class="flex flex-row items-center justify-between rounded border-2 p-2.5"
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
                <Checkbox
                    color={errorData?.checkboxExample ? 'red' : 'primary'}
                    name="checkboxExample"
                    bind:checked={isChecked}
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

<Toaster />
