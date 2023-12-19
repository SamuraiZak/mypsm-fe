<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { pthkp } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/pthkp';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';

    export let selectedFiles: any = [];
    export let disabled: boolean = true;

    let target: any;
    let texthidden = false;
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

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Sakit Lanjutan"></SectionHeader>
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
        <TextField disabled label="Bilangan Hari" value="7"></TextField>
        <LongTextField disabled label="Nyatakan Sebab" value="" placeholder="Sila taip jawapan anda dalam ruangan ini"></LongTextField>
    </div>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <SectionHeader
            title="Cuti Sakit Lanjutan yang telah diambil sepanjang perkhidmatan"
        ></SectionHeader>
        <DynamicTable tableItems={pthkp}></DynamicTable>
    </div>
</section>
