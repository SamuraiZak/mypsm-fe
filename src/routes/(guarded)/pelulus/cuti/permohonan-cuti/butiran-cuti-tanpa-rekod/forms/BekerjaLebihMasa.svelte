<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextField from '$lib/components/input/TextField.svelte';

    export let selectedFiles: any = [];

    let target: any;
    let texthidden = false;

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
    <SectionHeader title="Bekerja Lebih Masa"></SectionHeader>
    <LongTextField
        label="Tugas-Tugas Rasmi Yang Dijalankan"
        placeholder="Sila taip jawapan anda dalam ruangan ini"
    ></LongTextField>
    <DateSelector handleDateChange label="Tarikh"></DateSelector>
    <TextField label="Tempat Bekerja" value=""></TextField>
    <div class="flex w-full flex-row items-center justify-start">
        <label class="text-sm w-[220px] min-w-[220px]" for="appt">Waktu Mula</label>
        <input class="text-sm border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary" type="time" id="appt" name="appt" />
    </div>
    <div class="flex w-full flex-row items-center justify-start">
        <label class="text-sm w-[220px] min-w-[220px]" for="appt">Waktu Tamat</label>
        <input class="text-sm border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary" type="time" id="appt" name="appt" />
    </div>
    <TextField label="Jumlah Jam" value=""></TextField>
</section>
