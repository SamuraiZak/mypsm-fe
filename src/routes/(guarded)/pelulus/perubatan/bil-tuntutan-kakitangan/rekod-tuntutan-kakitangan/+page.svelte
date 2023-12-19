<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { senaraiTuntutan } from '$lib/mocks/urus-setia/perubatan/senarai-tuntutan';

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
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidak lulus',
            label: 'Tidak Lulus',
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
                goto('/pelulus/perubatan/bil-tuntutan-kakitangan');
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
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
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
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Rawatan'}
                    />
                    <TextField
                        {disabled}
                        id="klinik-panel"
                        label={'Klinik Panel'}
                        value={'Klinik Petrajaya'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bil-hari-cuti-sakit"
                        label={'Bil Hari Cuti Sakit'}
                        value={'2'}
                    ></TextField>
                </div>
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
                        value="Sah untuk dipohon"
                    />
                </div>
                <div class="flex w-full flex-row text-sm">
                    <label for="staffing-sec-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge border color="green">LULUS</Badge>
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
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Keputusan daripada Penyokong</p>
                <TextField {disabled} id="nama" label={'Nama'} value={'Ikhwan'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="tindakan-ulasan"
                    label={'Tindakan/Ulasan'}
                    value={'Permohonan disokong'}
                ></LongTextField>
                <div class="flex w-full flex-row text-sm">
                    <label for="staffing-sec-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge border color="green">SOKONG</Badge>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
