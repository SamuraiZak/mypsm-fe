<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatRawatan } from '$lib/mocks/klinik-panel/maklumat-rawatan';

    export let disabled: boolean = true;
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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Rawatan" description="Maklumat-maklumat rawatan"
        ><TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/klinik-panel/maklumat-kakitangan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <div class="flex w-full flex-col gap-2">
        <p class="text-sm font-bold">Maklumat Kakitangan</p>
        <TextField {disabled} id="nama" label={'Nama'} value={'Ali Bin Abu'}
        ></TextField>
        <TextField
            {disabled}
            id="noPekerja"
            label={'No Pekerja'}
            value={'K3123'}
        ></TextField>
        <TextField
            {disabled}
            id="noKadPengenalan"
            label={'No. K/P'}
            value={'111111-11-1111'}
        ></TextField>
        <TextField {disabled} id="gred" label={'Gred'} value={'41'}></TextField>
        <TextField
            {disabled}
            id="penempatan"
            label={'Penempatan'}
            value={'52345 - Bhgn. Teknologi Maklumat'}
        ></TextField>
        <TextField
            {disabled}
            id="kumpulan"
            label={'Kumpulan'}
            value={'PP! - Pengurusan dan Professional - A'}
        ></TextField>
    </div>
    <SectionHeader title="Maklumat Tanggungan"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable tableItems={maklumatRawatan}></DynamicTable>
    </div>
</section>
