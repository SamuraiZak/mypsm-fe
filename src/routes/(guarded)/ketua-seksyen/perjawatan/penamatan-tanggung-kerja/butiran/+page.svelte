<script lang="ts">
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { mockCalonPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiCalonPemangkuan';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

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

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Penamatan Tanggung Kerja"
        description="Sila lengkapkan butiran yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/ketua-seksyen/perjawatan/penamatan-tanggung-kerja');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper>
        <!-- Langkah 1 -->
        <StepperContent>
            <StepperContentHeader title="Butiran Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama Gred"
                            disabled={true}
                            placeholder="-"
                            value="N32"
                        />
                        <TextField
                            label="Kementerian/Jabatan"
                            disabled={true}
                            placeholder="-"
                            value="Jabatan 1"
                        />
                        <TextField
                            label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                            disabled={true}
                            placeholder="-"
                            value="123456"
                        />
                        <TextField
                            label="Tarikh Mula"
                            disabled={true}
                            placeholder="-"
                            value="12/02/2023"
                        />
                        <TextField
                            label="Tarikh Tamat"
                            disabled={true}
                            placeholder="-"
                            value="12/03/2023"
                        />
                        <TextField
                            label="Tempat Kekosongan"
                            disabled={true}
                            placeholder="-"
                            value="Tempat 1"
                        />
                        <LongTextField
                            label="Sebab-sebab Kekosongan"
                            disabled={true}
                            placeholder="-"
                            value="Sebab-sebab..."
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama Pegawai"
                            disabled={true}
                            placeholder="-"
                            value="Mohd. Irfan Bin Abu"
                        />
                        <TextField
                            label="No. K/P"
                            disabled={true}
                            placeholder="-"
                            value="890701-13-5667"
                        />
                        <TextField
                            label="Tarikh Lantikan Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Tarikh Sah Dalam Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Jawatan/Gred"
                            disabled={true}
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                        />
                        <TextField
                            label="Tarikh Mula Bertugas di Jawatan Sekarang"
                            disabled={true}
                            placeholder="-"
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            label="Tempat Bertugas Semasa"
                            disabled={true}
                            placeholder="-"
                            value="Tempat 2"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Semakan Maklumat Tanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <LongTextField
                        disabled
                        label="Borang-borang yang akan dijana dan diemelkan kepada kakitangan berkaitan:"
                        placeholder="-"
                        value="1. Surat Penamatan Tanggung Kerja"
                    />
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
                        value="Memenuhi kriteria..."
                    />
                    <div class="flex w-full flex-row text-sm">
                        <label for="" class="w-[220px]">Keputusan</label><Badge
                            border
                            color="green">SAH</Badge
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pengiraan Elaun Tanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Penyata Pelarasan Elaun Tanggung Kerja"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama / No. K/P / No. Pekerja"
                        placeholder="-"
                        value="Abu Bin Bakar / 001122-33-4444 / 0282379L"
                        disabled={true}
                    />
                    <TextField
                        label="Jawatan Hakiki Sekarang"
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                        disabled={true}
                    />
                    <TextField
                        label="Jawatan yang Ditanggung Kerja"
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                        disabled={true}
                    />
                    <TextField
                        label="Gred dan Gaji Minima Jawatan yang Ditanggung Kerja"
                        placeholder="-"
                        value="E-44 - RM 3556.00"
                        disabled={true}
                    />
                    <div class="flex w-full items-center">
                        <div class="w-[220px] text-sm text-txt-secondary">
                            25% Daripada Gaji Minima
                        </div>
                        <div class="text-sm font-semibold text-system-primary">
                            (RM 3556.00 * 25% = RM 889.00 sebulan)
                        </div>
                    </div>
                    <div class="flex w-full gap-2">
                        <TextField
                            label="Tarikh Kuatkuasa Penanggung Kerja"
                            placeholder="-"
                            value="19/06/2023"
                        />
                        <TextField
                            labelType="label-fit"
                            label="Hingga"
                            placeholder="-"
                            value="7/12/2023"
                        />
                    </div>
                    <TextField
                        label="Penempatan"
                        placeholder="-"
                        value="Penempatan"
                        disabled={true}
                    />
                </div>
                <SectionHeader title="Perkiraan Elaun Tanggung Kerja"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div class="flex w-full">
                        <div class="w-[220px] min-w-[220px] text-sm">
                            Bulan Jun (11 Hari)
                        </div>
                        <div
                            class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                        >
                            <span>(</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 889.00"
                            /><span>x</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="11"
                            /><span>hari ) /</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="30"
                            /><span>=</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 325.97"
                            />
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-[220px] min-w-[220px] text-sm">
                            Bulan Pertengahan (Penuh)
                        </div>
                        <div
                            class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                        >
                            <span>(</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 889.00"
                            /><span>x</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="5"
                            /><span>Bulan ) =</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 3556.00"
                            />
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-[220px] min-w-[220px] text-sm">
                            Bulan Disember (7 Hari)
                        </div>
                        <div
                            class="flex w-full items-center gap-2 rounded-[3px] border px-2 py-1 text-sm"
                        >
                            <span>(</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 889.00"
                            /><span>x</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="7"
                            /><span>hari ) /</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="31"
                            /><span>=</span><ShortTextField
                                disabled={true}
                                labelType="no-label"
                                placeholder="-"
                                value="RM 207.43"
                            />
                        </div>
                    </div>
                    <TextField
                        label="Jumlah bayaran tunggakan ETK"
                        placeholder="-"
                        value="RM 4089.40"
                        disabled={true}
                    />
                    <div class="text-sm italic text-txt-secondary">
                        Nota: Pegawai ini tidak bercuti bagi tempoh 14/28 hari
                        berturut-turut. (Sila Rujuk Format 3)
                    </div>
                    <div class="flex w-full">
                        <div class="w-[220px] min-w-[220px] text-sm">
                            Sila Buat Bayaran Tunggakan ETK Melalui Gaji Bulan
                        </div>
                        <div class="flex w-full gap-2">
                            <TextField
                                labelType="label-fit"
                                label="Bulan"
                                placeholder="-"
                                value=""
                            />
                            <TextField
                                labelType="label-fit"
                                label="Tahun"
                                placeholder="-"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Penyokong dan Pelulus (Timbalan dan Ketua Seksyen)"
            ><TextIconButton
            label="Hantar"
            primary
            onClick={() => {
                goto('/ketua-seksyen/perjawatan/penamatan-tanggung-kerja');
            }}
        >
            <SvgPaperAirplane></SvgPaperAirplane>
        </TextIconButton></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Ketua Seksyen (Pelulus)"
                ></SectionHeader>
                <LongTextField
                    label="Tindakan/Ulasan"
                    placeholder="-"
                    value=""
                />
                <RadioSingle {options} />
                <SectionHeader
                    color="system-primary"
                    title="Timbalan Ketua Seksyen (Penyokong)"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        disabled
                        label="Nama"
                        placeholder="-"
                        value="Ismail Bin Ramdan"
                    />
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value="Layak Disokong"
                    />
                    <div class="flex w-full flex-row text-sm">
                        <label for="" class="w-[220px]">Keputusan</label><Badge
                            border
                            color="green">SOKONG</Badge
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
