<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';

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
    <ContentHeader
        title="Profil"
        description="Kemaskini maklumat-maklumat profil"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <div class="flex w-full flex-col gap-2">
        <p class="text-sm font-bold">Maklumat Klinik Panel</p>
        <TextField id="kodKlinik" label={'Kod Klinik'} value={'K2341'}
        ></TextField>
        <TextField id="namaKlinik" label={'Nama Klinik'} value={'Klinik Wee'}
        ></TextField>
        <LongTextField id="alamat" label={'Alamat'} value={'ICOM Square'}
        ></LongTextField>
        <TextField id="poskod" label={'Poskod'} value={'93250'}></TextField>
        <TextField id="bandar" label={'Bandar'} value={'Kuching'}></TextField>
        <TextField id="negeri" label={'Negeri'} value={'Sarawak'}></TextField>
        <TextField id="noTelefon" label={'No. Telefon'} value={'012-3442424'}></TextField>
    </div>
    <div class="flex w-full flex-col gap-2">
        <p class="text-sm font-bold">Maklumat Bank</p>
        <TextField id="namaBank" label={'Nama Bank'} value={'CIMB'}></TextField>

        <TextField id="noAkaun" label={'No. Akaun'} value={'76678858'}
        ></TextField>
    </div>
    <div class="flex w-full flex-col gap-2">
        <p class="text-sm font-bold">Maklumat Latihan</p>
        <DateSelector {handleDateChange} label={'Tarikh Mula Lantikan'} />
        <DateSelector {handleDateChange} label={'Tarikh Tamat'} />
    </div>
</section>
