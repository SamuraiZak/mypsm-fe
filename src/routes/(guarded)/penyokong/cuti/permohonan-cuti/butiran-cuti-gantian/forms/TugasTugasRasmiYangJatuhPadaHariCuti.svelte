<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { kategoriCuti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/kategori-cuti';
    import { ZodError } from 'zod';
    import toast from 'svelte-french-toast';
    import { publicHolidayTask } from '../form-schema';

    let selectedKategoriCuti = kategoriCuti[0].value;

    // ======================= Form Validation
    let errorData: any;
    export const submitForm = async (event: Event) => {
        const formDetail = new FormData(event.target as HTMLFormElement);
        const holidayCategory = document.getElementById(
            'holidayCategory',
        ) as HTMLSelectElement;

        const formData = {
            officialTask: String(formDetail.get('officialTask')),
            placement: String(formDetail.get('placement')),
            startTime: String(formDetail.get('startTime')),
            holidayCategory: String(holidayCategory.value),
            endTime: String(formDetail.get('endTime')),
            totalTime: String(formDetail.get('totalTime')),
            date: String(formDetail.get('date')),
        };

        try {
            const result = publicHolidayTask.parse(formData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedFormData = { ...formData, id };
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

<section
    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
>
    <SectionHeader title="Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti"
    ></SectionHeader>
    <form
        id="formValidation"
        on:submit|preventDefault={submitForm}
        class="flex w-full flex-col gap-2"
    >
        <DropdownSelect
            id="holidayCategory"
            label="Kategori Cuti"
            dropdownType="label-left-full"
            bind:index={selectedKategoriCuti}
            options={kategoriCuti}
        ></DropdownSelect>
        {#if errorData?.holidayCategory}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.holidayCategory[0]}</span
            >
        {/if}
        <LongTextField
            hasError={errorData?.officialTask}
            name="officialTask"
            label="Tugas-Tugas Rasmi Yang Dijalankan"
            placeholder="Sila taip jawapan anda dalam ruangan ini"
        ></LongTextField>
        {#if errorData?.officialTask}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.officialTask[0]}</span
            >
        {/if}
        <DateSelector
            hasError={errorData?.date}
            name="date"
            handleDateChange
            label="Tarikh"
        ></DateSelector>
        {#if errorData?.date}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.date[0]}</span
            >
        {/if}
        <TextField
            hasError={errorData?.placement}
            name="placement"
            label="Tempat Bekerja"
            value=""
        ></TextField>
        {#if errorData?.placement}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.placement[0]}</span
            >
        {/if}
        <div class="flex w-full flex-row items-center justify-start">
            <label class="w-[220px] min-w-[220px] text-sm" for="appt"
                >Waktu Mula</label
            >
            <input
                name="startTime"
                class="border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm text-sm placeholder:text-txt-tertiary"
                type="time"
            />
        </div>
        {#if errorData?.startTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.startTime[0]}</span
            >
        {/if}
        <div class="flex w-full flex-row items-center justify-start">
            <label class="w-[220px] min-w-[220px] text-sm" for="appt"
                >Waktu Tamat</label
            >
            <input
                name="endTime"
                class="border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm text-sm placeholder:text-txt-tertiary"
                type="time"
            />
        </div>
        {#if errorData?.endTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.endTime[0]}</span
            >
        {/if}
        <TextField
            hasError={errorData?.totalTime}
            name="totalTime"
            label="Jumlah Jam"
            value=""
        ></TextField>
        {#if errorData?.totalTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.totalTime[0]}</span
            >
        {/if}
    </form>
</section>
