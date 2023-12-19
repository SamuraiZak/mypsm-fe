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
    import { gred } from '$lib/mocks/kakitangan/cuti/gcr/gred';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { penempatan } from '$lib/mocks/kakitangan/cuti/gcr/penempatan';
    import { kumpulan } from '$lib/mocks/kakitangan/cuti/gcr/kumpulan';

    export let disabled: boolean = true;

    let selectedGred = gred[0].value;
    let selectedPenempatan = penempatan[0].value;
    let selectedKumpulan = kumpulan[0].value;
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

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/cuti/gantian-cuti-rehat');
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
                <DropdownSelect
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left-full"
                    bind:index={selectedGred}
                    options={gred}
                ></DropdownSelect>
                <DropdownSelect
                    id="penempatan-dropdown"
                    label="Penempatan"
                    dropdownType="label-left-full"
                    bind:index={selectedPenempatan}
                    options={penempatan}
                ></DropdownSelect>
                <DropdownSelect
                    id="kumpulan-dropdown"
                    label="Kumpulan"
                    dropdownType="label-left-full"
                    bind:index={selectedKumpulan}
                    options={kumpulan}
                ></DropdownSelect>
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
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/cuti/gantian-cuti-rehat');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
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
                            id="jumlahpengumpulanGcr2023"
                            label={'Jumlah Pengumpulan GCR 2023'}
                            value={'3  ● tidak melebihi 15 hari'}
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
</Stepper>
