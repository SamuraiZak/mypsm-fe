<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { kategoriCuti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/kategori-cuti';

    export let selectedFiles: any = [];

    let target: any;
    let texthidden = false;
    let selectedKategoriCuti = kategoriCuti[0].value;

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
    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
>
    <SectionHeader title="Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti"
    ></SectionHeader>
    <DropdownSelect 
        id="kategori-cuti-dropdown"
        label="Kategori Cuti"
        dropdownType="label-left-full"
        bind:index={selectedKategoriCuti}
        options={kategoriCuti}
    ></DropdownSelect>
    <LongTextField
        label="Tugas-Tugas Rasmi Yang Dijalankan"
        placeholder="Sila taip jawapan anda dalam ruangan ini"
    ></LongTextField>
    <DateSelector handleDateChange label="Tarikh"></DateSelector>
    <TextField label="Tempat Bekerja" value=""></TextField>
    <div class="flex w-full flex-row items-center justify-start">
        <label class="w-[220px] min-w-[220px] text-sm" for="appt"
            >Waktu Mula</label
        >
        <input
            class="border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm text-sm placeholder:text-txt-tertiary"
            type="time"
            id="appt"
            name="appt"
        />
    </div>
    <div class="flex w-full flex-row items-center justify-start">
        <label class="w-[220px] min-w-[220px] text-sm" for="appt"
            >Waktu Tamat</label
        >
        <input
            class="border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm text-sm placeholder:text-txt-tertiary"
            type="time"
            id="appt"
            name="appt"
        />
    </div>
    <TextField label="Jumlah Jam" value=""></TextField>
</section>
