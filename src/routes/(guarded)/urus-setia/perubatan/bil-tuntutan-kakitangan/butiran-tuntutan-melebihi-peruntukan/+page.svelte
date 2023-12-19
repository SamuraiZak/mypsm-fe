<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';

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

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tuntutan Perubatan"
        description="Butiran-butiran permohonan tuntutan perubatan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perubatan/bil-tuntutan-kakitangan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
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
                    id="jawatan"
                    label={'Jawatan'}
                    value={'Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pembayaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="jumlah-tunggakan"
                        label={'Jumlah Tunggakan (RM)'}
                        value={'100.00'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kaedah-pembayaran"
                        label={'Kaedah Pembayaran'}
                        value={'Transaksi Atas Talian'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="no-rujukan-transaksi"
                        label={'No Rujukan Transaksi'}
                        value={'2'}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Transaksi'}
                    />
                    <DownloadAttachment
                        label="Bukti Pembayaran"
                        fileName="Receipt.png"
                    ></DownloadAttachment>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Urus Setia"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Sila Tetapkan Keputusan (Urus Setia)
                </p>
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                >
                    ● Keputusan akan dihantar ke email klinik dan Urus Setia negeri berkaitan
                </p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <LongTextField
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value=""
                    />
                    <RadioSingle {options} />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
