<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { kaedahPembayaran } from '$lib/mocks/kakitangan/perubatan/kaedah-pembayaran';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TransaksiAtasTalian from '../buat-pembayaran/forms/TransaksiAtasTalian.svelte';
    import PenolakanGaji from '../buat-pembayaran/forms/PenolakanGaji.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    export let disabled: boolean = true;

    let selectedKaedahPembayaran = '';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pembayaran"
        description="Senarai tuntutan lebih peruntukan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <SectionHeader title="Maklumat Pembayaran"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/kakitangan/perubatan/');
            }}
        /></SectionHeader
    >
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
    >
        <SectionHeader title="Permohonan Penangguhan/Pindaan Penempatan "
        ></SectionHeader>
        <DropdownSelect
            dropdownType="label-left-full"
            label="Kaedah Pembayaran"
            options={kaedahPembayaran.filter(
                (kaedah) => kaedah.name != 'Semua',
            )}
            bind:value={selectedKaedahPembayaran}
            onSelect={() => {}}
        ></DropdownSelect>

        {#if selectedKaedahPembayaran === 'Transaksi Atas Talian'}
            <TransaksiAtasTalian bind:data={data.stepperOnlineTransaction}
            ></TransaksiAtasTalian>
        {:else if selectedKaedahPembayaran === 'Penolakan Gaji'}
            <PenolakanGaji></PenolakanGaji>
        {/if}
        <TextField
            {disabled}
            id="jumlahPembayaran"
            label={'Jumlah Pembayaran (RM)'}
            value={'RM 45'}
        ></TextField>
    </div>
</section>
