<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';

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

    const options: RadioOption[] = [
        {
            value: 'false',
            label: 'Akan Pencen',
        },
    ];
</script>

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/urus-setia/cuti/pengeluaran-gantian-cuti-rehat-awal');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <RadioSingle {disabled} legend="Jenis Kakitangan" {options}
                ></RadioSingle>
                <TextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    value={'Irfan Bin Abu'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
                <TextField
                    {disabled}
                    id="gred"
                    label={'Gred'}
                    value={'F41 - Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="kumpulan"
                    label={'Kumpulan'}
                    value={'PP1 - Pengurusan dan Professional - A'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran GCR Sedia Ada"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto(
                        '/urus-setia/cuti/pengeluaran-gantian-cuti-rehat-awal',
                    );
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Butiran Gantian Cuti Rehat (GCR) Sedia Ada
                </p>
                <TextField
                    {disabled}
                    id="jumlahGcrTerkumpul"
                    label={'Jumlah GCR Terkumpul'}
                    value={'120'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jumlahLayakUntukPengeluaran"
                    label={'Jumlah Layak Untuk Pengeluaran'}
                    value={'90'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bakiSelepasPengeluaran"
                    label={'Baki Selepas Pengeluaran'}
                    value={'30'}
                ></TextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm">Syarat-Syarat Pengeluaran Awal GCR</p>
                <ul class="list-inside list-disc text-sm">
                    <li>
                        Tempoh perkhidmatan pegawai tidak kurang daripada 15
                        tahun
                    </li>
                    <li>
                        Pegawai telah mencapai umur 45 tahun semasa permohonan
                        dibuat
                    </li>
                    <li>Jumlah terkumpul GCR 90 hari</li>
                    <li>
                        Bebas daripada prosiding jenayah atau tindakan
                        tatatertib
                    </li>
                    <li>Mendapat perakuan daripada Ketua Jabatan</li>
                    <li>
                        Pemberian awal award wang tunai GCR sebanyak 90 hari
                        hanya boleh dibuat sekali sahaja sepanjang perkhidmatan
                        pegawai
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
