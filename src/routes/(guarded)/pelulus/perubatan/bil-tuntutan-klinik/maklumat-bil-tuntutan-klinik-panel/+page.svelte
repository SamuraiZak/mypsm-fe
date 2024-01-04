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
    import { Badge } from 'flowbite-svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { senaraiTuntutan } from '$lib/mocks/urus-setia/perubatan/senarai-tuntutan';

    export let disabled: boolean = true;

    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Bil Tuntutan Klinik Panel"
        description="Maklumat permohonan bil tuntutan klinik panel"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/pelulus/perubatan/bil-tuntutan-klinik/');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Klinik"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="nama-klinik"
                    label={'Nama Klinik'}
                    value={'Klinik Wee'}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel-klinik"
                    label={'Emel Klinik'}
                    value={'klinik.wee@gmail.com'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamat"
                    label={'Alamat'}
                    value={'ICOM Square'}
                ></LongTextField>
                <TextField
                    {disabled}
                    id="poskod"
                    label={'Poskod'}
                    value={'93250'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bandar"
                    label={'Bandar'}
                    value={'Kuching'}
                ></TextField>
                <TextField
                    {disabled}
                    id="negeri"
                    label={'Negeri'}
                    value={'Perlis'}
                ></TextField>
                <TextField
                    {disabled}
                    id="no-tel"
                    label={'No. Telefon'}
                    value={'012-4234324'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="bulan"
                        label={'Bulan'}
                        value={'Mei 2023'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jumlah-tuntutan"
                        label={'Jumlah Tuntutan (RM)'}
                        value={'2,534'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bilangan-tuntutan"
                        label={'Bilangan Tuntutan'}
                        value={'3'}
                    ></TextField>
                </div>

                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Semua Tuntutan Klinik Wee</p>
                    <p class="text-sm">Masukkan maklumat klinik panel</p>
                </div>
                <div class="flex w-full flex-col gap-2.5">
                    <div
                        class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                    >
                        <div class="flex">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <div class="font-bold">Tuntutan 1</div>
                            </div>
                        </div>
                        <div class="flex w-full flex-row gap-x-2.5">
                            <div class="w-1/3 space-y-2.5">
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="namaKakitangan"
                                    label="Nama Kakitangan"
                                    value="Mohd Safwan Adam"
                                ></TextField>
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="noKP"
                                    label="No. Kad Pengenalan"
                                    value="111111-11-1111"
                                ></TextField>
                            </div>
                            <div class="w-2/3 space-y-2.5 space-y-2.5">
                                <DynamicTable tableItems={senaraiTuntutan}
                                ></DynamicTable>
                            </div>
                        </div>
                    </div>
                    <div
                        class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                    >
                        <div class="flex">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <div class="font-bold">Tuntutan 2</div>
                            </div>
                        </div>
                        <div class="flex w-full flex-row gap-x-2.5">
                            <div class="w-1/3 space-y-2.5">
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="namaKakitangan"
                                    label="Nama Kakitangan"
                                    value="Mohd Safwan Adam"
                                ></TextField>
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="noKP"
                                    label="No. Kad Pengenalan"
                                    value="111111-11-1111"
                                ></TextField>
                            </div>
                            <div class="w-2/3 space-y-2.5 space-y-2.5">
                                <DynamicTable tableItems={senaraiTuntutan}
                                ></DynamicTable>
                            </div>
                        </div>
                    </div>
                    <div
                        class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                    >
                        <div class="flex">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <div class="font-bold">Tuntutan 3</div>
                            </div>
                        </div>
                        <div class="flex w-full flex-row gap-x-2.5">
                            <div class="w-1/3 space-y-2.5">
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="namaKakitangan"
                                    label="Nama Kakitangan"
                                    value="Mohd Safwan Adam"
                                ></TextField>
                                <TextField
                                    labelType="top"
                                    type="text"
                                    id="noKP"
                                    label="No. Kad Pengenalan"
                                    value="111111-11-1111"
                                ></TextField>
                            </div>
                            <div class="w-2/3 space-y-2.5 space-y-2.5">
                                <DynamicTable tableItems={senaraiTuntutan}
                                ></DynamicTable>
                            </div>
                        </div>
                    </div>
                </div>>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Tuntutan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ikhwan'}
                    ></TextField>
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value="Lulus penyemakan"
                    />
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">LULUS</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Keputusan daripada Pelulus</p>
                <LongTextField
                    id="tindakan-ulasan"
                    label={'Tindakan/Ulasan'}
                    value={'Butiran Lengkap'}
                ></LongTextField>
                <RadioSingle {options} />
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Keputusan daripada Penyokong</p>
                <TextField {disabled} id="nama" label={'Nama'} value={'Ahmad'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="tindakan-ulasan"
                    label={'Tindakan/Ulasan'}
                    value={'Permohonan disokong'}
                ></LongTextField>
            </div>
            <div class="flex w-full flex-row text-sm">
                <label for="staffing-sec-result" class="w-[220px]"
                    >Keputusan</label
                ><Badge border color="green">SOKONG</Badge>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
