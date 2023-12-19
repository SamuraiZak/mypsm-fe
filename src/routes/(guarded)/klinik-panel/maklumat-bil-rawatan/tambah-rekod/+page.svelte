<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { hubungan } from '$lib/mocks/klinik-panel/hubungan';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';

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
                    <TextField id="nama" label={'Nama'} value={'Ali Bin Abu'}
                    ></TextField>
                    <TextField
                        id="noPekerja"
                        label={'No Pekerja'}
                        value={'K3123'}
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
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex max-h-full w-full flex-col gap-2.5">
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
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Rawatan/Ubat"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <TextField id="jumlah" label={'Jumlah (RM)'} value={'5,323'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
