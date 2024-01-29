<script lang="ts">
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperOnlineTransaction,
        _submitFormStepperOnlineTransaction,
    } from '../+page';

    export let data;

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

    const {
        form: onlineTransactionForm,
        errors: onlineTransactionErrors,
        enhance: onlineTransactionEnhance,
    } = superForm(data.stepperOnlineTransaction, {
        SPA: true,
        validators: _stepperOnlineTransaction,
        onSubmit() {
            _submitFormStepperOnlineTransaction($onlineTransactionForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section
    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
>
    <SectionHeader
        title="Jika cara pembayaran secara atas talian, sila isi maklumat berikut:"
        ><TextIconButton
            primary
            label="Simpan"
            form="FormStepperOnlineTransaction"
        >
            <SvgCheck></SvgCheck>
        </TextIconButton></SectionHeader
    >
    <form
        id="FormStepperOnlineTransaction"
        class="flex w-full flex-col gap-2"
        use:onlineTransactionEnhance
        method="POST"
    >
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
        <DateSelector
            hasError={!!$onlineTransactionErrors.transactionDate}
            name="transactionDate"
            handleDateChange
            label="Tarikh Transaksi"
            bind:selectedDate={$onlineTransactionForm.transactionDate}
        ></DateSelector>
        {#if $onlineTransactionErrors.transactionDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$onlineTransactionErrors.transactionDate}</span
            >
        {/if}
        <DownloadAttachment label="Bukti Pembayaran" fileName="Receipt.png"
        ></DownloadAttachment>
    </form>
</section>
<Toaster />
