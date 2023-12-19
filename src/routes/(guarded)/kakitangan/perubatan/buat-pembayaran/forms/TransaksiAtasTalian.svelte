<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';

    export let selectedFiles: any = [];
    export let disabled: boolean = true;

    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });

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

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
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
    <SectionHeader
        title="Jika cara pembayaran secara atas talian, sila isi maklumat berikut:"
    ></SectionHeader>
    <TextField
        {disabled}
        id="no-rujukan-transaksi"
        label={'No Rujukan Transaksi'}
        value={'ABC121313'}
    ></TextField>
    <TextField
        {disabled}
        id="bank-penerima"
        label={'Bank Penerima'}
        value={'653463636'}
    ></TextField>
    <DateSelector {handleDateChange} label={'Tarikh Transaksi'} />
    <DownloadAttachment label="Bukti Pembayaran" fileName="Receipt.png"
    ></DownloadAttachment>
</section>
