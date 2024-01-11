<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { namaPengganti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/nama-pengganti';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import BekerjaLebihMasa from './BekerjaLebihMasa.svelte';
    import TugasTugasRasmiYangJatuhPadaHariCuti from './TugasTugasRasmiYangJatuhPadaHariCuti.svelte';
    import { jenisGantian } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/jenis-gantian';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';
    import toast from 'svelte-french-toast';
    import { ZodError } from 'zod';
    import { Checkbox } from 'flowbite-svelte';
    import { maklumatGantian } from '../../butiran-cuti-gantian/form-schema';

    let selectedJenisGantian = '';
    let hasHalfDayStartDate: boolean = false;
    let hasHalfDayEndDate: boolean = false;
    let selectedNamaPengganti = namaPengganti[0].value;
    let selectedSetengahHari = setengahHari[0].value;

    // ================ Form Validation ================
    let errorData: any;
    export const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const namaPengganti = document.getElementById(
            'namaPengganti',
        ) as HTMLSelectElement;
        const getTarikhMulaSetengah = document.getElementById(
            'tarikhMulaSetengah',
        ) as HTMLSelectElement;
        const getTarikhTamatSetengah = document.getElementById(
            'tarikhTamatSetengah',
        ) as HTMLSelectElement;

        const maklumatGantianFormData = {
            namaPengganti: String(namaPengganti.value),
            tarikhMula: String(formData.get('tarikhMula')),
            tarikhTamat: String(formData.get('tarikhTamat')),
            cutiGantianTerakhir: String(formData.get('cutiGantianTerakhir')),
        };

        try {
            let validatedData;
            let result;
            if (hasHalfDayStartDate && !hasHalfDayEndDate) {
                const tarikhMulaSetengah = String(getTarikhMulaSetengah.value);

                const validatedFormData = {
                    ...maklumatGantianFormData,
                    tarikhMulaSetengah,
                };
                validatedData = validatedFormData;
                result = maklumatGantian.parse(validatedFormData);
            } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
                const tarikhTamatSetengah = String(
                    getTarikhTamatSetengah.value,
                );

                const validatedFormData = {
                    ...maklumatGantianFormData,
                    tarikhTamatSetengah,
                };
                validatedData = validatedFormData;
                result = maklumatGantian.parse(validatedFormData);
            } else if (hasHalfDayStartDate && hasHalfDayEndDate) {
                const tarikhMulaSetengah = String(getTarikhMulaSetengah.value);
                const tarikhTamatSetengah = String(
                    getTarikhTamatSetengah.value,
                );

                const validatedFormData = {
                    ...maklumatGantianFormData,
                    tarikhMulaSetengah,
                    tarikhTamatSetengah,
                };
                validatedData = validatedFormData;
                result = maklumatGantian.parse(validatedFormData);
            } else {
                validatedData = maklumatGantianFormData;
                result = maklumatGantian.parse(maklumatGantianFormData);
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

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <CustomTabContent title="Maklumat Gantian">
            <SectionHeader title="Cuti Gantian">
            </SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <form
                    id="formValidation"
                    on:submit|preventDefault={submitForm}
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={errorData?.namaPengganti}
                        id="namaPengganti"
                        options={namaPengganti}
                        bind:index={selectedNamaPengganti}
                        dropdownType="label-left-full"
                        label="Nama Pengganti / Gred"
                    ></DropdownSelect>
                    {#if errorData?.namaPengganti}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.namaPengganti[0]}</span
                        >
                    {/if}
                    <div
                        class="flex w-full flex-row items-center justify-start gap-2.5"
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
                        class="flex w-full flex-row items-center justify-start gap-2.5"
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
                    <TextField
                        disabled
                        label="Jumlah Cuti Gantian Yang Telah Diambil Pada Tahun Semasa"
                        value="2"
                    ></TextField>
                    <DateSelector
                        hasError={errorData?.cutiGantianTerakhir}
                        name="cutiGantianTerakhir"
                        handleDateChange
                        label="Cuti Gantian Terakhir Diambil Pada"
                    ></DateSelector>
                    {#if errorData?.cutiGantianTerakhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.cutiGantianTerakhir[0]}</span
                        >
                    {/if}
                </form>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Jenis Gantian">
            <SectionHeader title="Jenis Gantian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Gantian"
                    options={jenisGantian.filter((cat) => cat.name != 'Semua')}
                    bind:value={selectedJenisGantian}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedJenisGantian === 'Bekerja Lebih Masa'}
                    <BekerjaLebihMasa></BekerjaLebihMasa>
                {:else if selectedJenisGantian === 'Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti'}
                    <TugasTugasRasmiYangJatuhPadaHariCuti
                    ></TugasTugasRasmiYangJatuhPadaHariCuti>
                {/if}
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
