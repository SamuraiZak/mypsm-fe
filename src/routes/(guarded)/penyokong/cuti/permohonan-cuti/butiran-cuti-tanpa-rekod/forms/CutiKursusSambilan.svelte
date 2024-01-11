<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';
    import { ZodError } from 'zod';
    import toast from 'svelte-french-toast';
    import { Checkbox } from 'flowbite-svelte';
    import { reusableDateSchema } from '../../butiran-cuti-gantian/form-schema';

    let selectedSetengahHari = setengahHari[0].value;
    let hasHalfDayStartDate: boolean = false;
    let hasHalfDayEndDate: boolean = false;

    // ============== Form Validation
    let errorData: any;
    export const submitForm = async (event: Event) => {
        const formDetail = new FormData(event.target as HTMLFormElement);
        const getTarikhMulaSetengah = document.getElementById(
            'tarikhMulaSetengah',
        ) as HTMLSelectElement;
        const getTarikhTamatSetengah = document.getElementById(
            'tarikhTamatSetengah',
        ) as HTMLSelectElement;

        const formData = {
            tarikhMula: String(formDetail.get('tarikhMula')),
            tarikhTamat: String(formDetail.get('tarikhTamat')),
        };

        try {
            let validatedData;
            let result;
            if (hasHalfDayStartDate && !hasHalfDayEndDate) {
                const tarikhMulaSetengah = String(getTarikhMulaSetengah.value);

                const validatedFormData = {
                    ...formData,
                    tarikhMulaSetengah,
                };
                validatedData = validatedFormData;
                result = reusableDateSchema.parse(validatedFormData);
            } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
                const tarikhTamatSetengah = String(
                    getTarikhTamatSetengah.value,
                );

                const validatedFormData = {
                    ...formData,
                    tarikhTamatSetengah,
                };
                validatedData = validatedFormData;
                result = reusableDateSchema.parse(validatedFormData);
            } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
                const tarikhMulaSetengah = String(getTarikhMulaSetengah.value);
                const tarikhTamatSetengah = String(
                    getTarikhTamatSetengah.value,
                );

                const validatedFormData = {
                    ...formData,
                    tarikhMulaSetengah,
                    tarikhTamatSetengah,
                };
                validatedData = validatedFormData;
                result = reusableDateSchema.parse(validatedFormData);
            } else {
                validatedData = formData;
                result = reusableDateSchema.parse(formData);
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

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Kursus Sambilan"></SectionHeader>
        <form
            id="formValidation"
            on:submit|preventDefault={submitForm}
            class="flex w-full flex-col gap-2"
        >
            <div
                class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        hasError={errorData?.tarikhMula}
                        name="tarikhMula"
                        handleDateChange
                        label="Tarikh Mula"
                    ></DateSelector>
                    {#if errorData?.tarikhMula}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhMula[0]}</span
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
                        hasError={errorData?.tarikhMulaSetengah}
                        disabled={!hasHalfDayStartDate}
                        id="tarikhMulaSetengah"
                        options={setengahHari}
                        bind:index={selectedSetengahHari}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                    {#if errorData?.tarikhMulaSetengah}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhMulaSetengah[0]}</span
                        >
                    {/if}
                </div>
            </div>
            <div
                class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
            >
                <div class="flex w-full flex-col">
                    <DateSelector
                        hasError={errorData?.tarikhTamat}
                        name="tarikhTamat"
                        handleDateChange
                        label="Tarikh Tamat"
                    ></DateSelector>
                    {#if errorData?.tarikhTamat}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhTamat[0]}</span
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
                        hasError={errorData?.tarikhTamatSetengah}
                        disabled={!hasHalfDayEndDate}
                        id="tarikhTamatSetengah"
                        options={setengahHari}
                        bind:index={selectedSetengahHari}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                    {#if errorData?.tarikhTamatSetengah}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhTamatSetengah[0]}</span
                        >
                    {/if}
                </div>
            </div>
        </form>
        <TextField disabled label="Bilangan Hari" value="7"></TextField>
    </div>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Maklumat Pengajian"></SectionHeader>
        <TextField
            disabled
            label="Kelayakan Akademik"
            value="Sarjana Muda Sains Komputer"
        ></TextField>
        <TextField disabled label="Kelayakan Ikhtisas" value=""></TextField>
        <TextField disabled label="Bidang Kursus Diambil" value=""></TextField>
        <TextField disabled label="Tempat Pengajian" value=""></TextField>
    </div>
</section>
