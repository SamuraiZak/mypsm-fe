<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { Badge } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';

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
    <ContentHeader
        title="Rekod Ali"
        description="Maklumat-maklumat rawatan dan tuntutan untuk Ali"
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
    class="flex w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <div class="flex items-center justify-center gap-x-2.5">
        <p class="mt-2 h-full w-full bg-bgr-primary text-sm text-system-accent">
            • Status:
        </p>
        <Badge class="text-sm" rounded color="green">Selesai</Badge>
    </div>
</section>
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField {disabled} id="nama" label={'Nama'} value={'Ali'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noPekerja"
                        label={'No Pekerja'}
                        value={'K12313'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noKP"
                        label={'No. K/P'}
                        value={'111111-11-1111'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="penempatan"
                        label={'Penempatan'}
                        value={'012 - Bhgn. Teknologi Maklumat'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kumpulan"
                        label={'Kumpulan'}
                        value={'PP1 - Pengurusan dan Professional - A'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex max-h-full w-full flex-col gap-2.5">
                    <TextField {disabled} id="nama" label={'Nama'} value={'Ali'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noKP"
                        label={'No. K/P'}
                        value={'111111-11-1111'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="pejabatLkim"
                        label={'Pejabat LKIM'}
                        value={'Bahagian Pemasaran dan Perlesenan'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="tarikh"
                        label={'Tarikh'}
                        value={'01/01/2023'}
                    ></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Rawatan/Ubat"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <TextField
                        {disabled}
                        id="jumlah"
                        label={'Jumlah (RM)'}
                        value={'423.00'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
