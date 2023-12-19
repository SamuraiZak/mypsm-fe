<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { hubungan } from '$lib/mocks/klinik-panel/hubungan';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';

    export let disabled: boolean = true;

    let selectedDate = new Date();
    let selectedHubungan = hubungan[0].value;

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
                goto('/klinik-panel/maklumat-bil-rawatan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col justify-start gap-2.5 overflow-y-auto p-2.5"
>
    <div class="grid grid-cols-2 gap-10">
        <div class="space-y-2.5">
            <p class="text-sm font-bold">Maklumat Kakitangan</p>
            <TextField id="nama" label={'Nama'} value={'Ali Bin Abu'}
            ></TextField>
            <TextField id="noPekerja" label={'No Pekerja'} value={'K3123'}
            ></TextField>
            <TextField
                id="noKadPengenalan"
                label={'No. K/P'}
                value={'111111-11-1111'}
            ></TextField>
            <TextField {disabled} id="gred" label={'Gred'} value={'41'}
            ></TextField>
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
            <p class="text-sm font-bold">Maklumat Pesakit</p>
            <TextField
                id="namaPesakit"
                label={'Nama Pesakit'}
                value={'Ali Bin Abu'}
            ></TextField>
            <DropdownSelect
                id="hubunganDropdown"
                label="Hubungan"
                dropdownType="label-left-full"
                bind:index={selectedHubungan}
                options={hubungan}
            ></DropdownSelect>
            <TextField
                id="noKadPengenalan"
                label={'No. K/P'}
                value={'111111-11-1111'}
            ></TextField>
            <TextField
                id="pejabatLkim"
                label={'Pejabat LKIM'}
                value={'Bahagian Teknologi Maklumat'}
            ></TextField>
            <DateSelector {handleDateChange} label={'Tarikh'} />
        </div>
        <div class="space-y-2.5">
            <p class="text-sm font-bold">Maklumat Rawatan/Ubat</p>
            <TextField id="jumlah" label={'Jumlah (RM)'} value={'5,323'}
            ></TextField>
        </div>
    </div>
</section>
