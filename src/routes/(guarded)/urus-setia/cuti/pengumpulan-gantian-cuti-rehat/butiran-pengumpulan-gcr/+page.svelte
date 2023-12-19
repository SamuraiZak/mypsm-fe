<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
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
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge } from 'flowbite-svelte';

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
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];
</script>

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/urus-setia/cuti/pengumpulan-gantian-cuti-rehat');
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
                <DateSelector
                    {disabled}
                    {handleDateChange}
                    label={'Tarikh Mula Lantikan'}
                />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pengumpulan GCR"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Butiran Pengumpulan Gantian Cuti (GCR)
                </p>
                <TextField
                    {disabled}
                    id="tahunTerkini"
                    label={'Tahun Terkini'}
                    value={'2023'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jumlahKelayakan"
                    label={'Jumlah Kelayakan'}
                    value={'33'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bakiCutiSemasa"
                    label={'Baki Cuti Semasa'}
                    value={'14'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jumlahGcrTerkumpul"
                    label={'Jumlah GCR Terkumpul'}
                    value={'67'}
                ></TextField>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <TextField
                            {disabled}
                            id="jumlahUntukDikumpulanBagiGcr2023"
                            label={'Jumlah Untuk Dikumpulan bagi GCR 2023'}
                            value={'3'}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            {disabled}
                            id="jumlahCutiBawaKehadapan"
                            label={'Jumlah Cuti Bawa Kehadapan'}
                            value={'11'}
                        ></TextField>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Daripada Peranan-Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2"
            >
                <p class="text-sm font-bold">Pengarah Bahagian</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        disabled
                        label="Nama"
                        placeholder="-"
                        value="Mat Irdam bin Inu"
                    />
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value="Lulus untuk mohon"
                    />
                    <div class="flex w-full flex-row text-sm">
                        <label for="" class="w-[220px]">Keputusan</label><Badge
                            border
                            color="green">LULUS</Badge
                        >
                    </div>
                </div>
            </div>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2"
            >
                <p class="text-sm font-bold">Ketua Seksyen</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        disabled
                        label="Nama"
                        placeholder="-"
                        value="Wan Awie"
                    />
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value="Layak untuk mohon"
                    />
                    <div class="flex w-full flex-row text-sm">
                        <label for="" class="w-[220px]">Keputusan</label><Badge
                            border
                            color="green">SOKONG</Badge
                        >
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Ulasan Kelulusan Urus Setia"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/urus-setia/cuti/pengumpulan-gantian-cuti-rehat');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Ulasan Kelulusan daripada Urus Setia
                </p>
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                >
                    ● Keputusan akan dihantar ke email klinik dan Urus Setia berkaitan
                </p>
                <LongTextField
                    disabled
                    label="Tindakan/Ulasan"
                    placeholder="-"
                    value="Butiran Lengkap"
                />
                <RadioSingle {options} disabled />
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
