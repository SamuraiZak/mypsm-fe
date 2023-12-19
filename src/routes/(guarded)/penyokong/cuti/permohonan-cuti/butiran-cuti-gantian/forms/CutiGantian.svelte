<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
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

    export let selectedFiles: any = [];
    export let disabled: boolean = true;
    let selectedJenisGantian = '';

    let target: any;
    let texthidden = false;
    let selectedNamaPengganti = namaPengganti[0].value;
    let selectedSetengahHari = setengahHari[0].value;

    onMount(() => {
        target = document.getElementById('fileInput');
    });

    // Function to handle the file changes
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }
</script>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <CustomTabContent title="Maklumat Gantian">
            <SectionHeader title="Cuti Gantian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <DropdownSelect
                    options={namaPengganti}
                    bind:index={selectedNamaPengganti}
                    dropdownType="label-left-full"
                    label="Nama Pengganti / Gred"
                ></DropdownSelect>
                <div
                    class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
                >
                    <DateSelector handleDateChange label="Tarikh Mula"
                    ></DateSelector>
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                        for="default-checkbox"
                        class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Setengah Hari</label
                    >
                    <DropdownSelect
                        options={setengahHari}
                        bind:index={selectedSetengahHari}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                </div>
                <div
                    class="flex flex w-full w-full flex-row items-center justify-start gap-2.5"
                >
                    <DateSelector handleDateChange label="Tarikh Tamat"
                    ></DateSelector>
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                        for="default-checkbox"
                        class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Setengah Hari</label
                    >
                    <DropdownSelect
                        options={setengahHari}
                        bind:index={selectedSetengahHari}
                        dropdownType="noLabel"
                        label=""
                    ></DropdownSelect>
                </div>
                <TextField
                    disabled
                    label="Jumlah Cuti Gantian Yang Telah Diambil Pada Tahun Semasa"
                    value="2"
                ></TextField>
                <DateSelector
                    handleDateChange
                    label="Cuti Gantian Terakhir Diambil Pada"
                ></DateSelector>
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
