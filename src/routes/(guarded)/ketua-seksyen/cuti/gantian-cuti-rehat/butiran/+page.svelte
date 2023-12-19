<script lang="ts">
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
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    const options: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengumpulan Gantian Cuti Rehat (GCR)"
        description="Butiran Permohonan pengumpulan Gantian CUti Rehat (GCR) 0411"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/ketua-seksyen/cuti/gantian-cuti-rehat');
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
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama"
                            disabled={true}
                            placeholder="-"
                            value="Abu Bin Ali"
                        />
                        <TextField
                            label="No. K/P"
                            disabled={true}
                            placeholder="-"
                            value="870121-21-4531"
                        />
                        <TextField
                            label="No. Pekerja"
                            disabled={true}
                            placeholder="-"
                            value="123456"
                        />
                        <TextField
                            label="Gred"
                            disabled={true}
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                        />
                        <TextField
                            label="Penempatan"
                            disabled={true}
                            placeholder="-"
                            value="123 - Bhgn. Teknologi Maklumat"
                        />
                        <TextField
                            label="Kumpulan"
                            disabled={true}
                            placeholder="-"
                            value="PP1 - Pengurusan dan Professional - A"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Butiran Pengumpulan GCR"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        label="Tahun Terkini"
                        disabled={true}
                        placeholder="-"
                        value="2023"
                    />
                    <TextField
                        label="Jumlah Cuti Rehat Tahunan"
                        disabled={true}
                        placeholder="-"
                        value="33"
                    />
                    <TextField
                        label="Baki Cuti Rehat Tahunan"
                        disabled={true}
                        placeholder="-"
                        value="12"
                    />
                    <TextField
                        label="Jumlah GCR Terkumpul"
                        disabled={true}
                        placeholder="-"
                        value="42"
                    />
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                disabled={true}
                                id="jumlahUntukDikumpulanBagiGcr2023"
                                label={'Jumlah Untuk Dikumpulan bagi GCR 2023'}
                                value={'3'}
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                disabled={true}
                                id="jumlahCutiBawaKehadapan"
                                label={'Jumlah Cuti Bawa Kehadapan'}
                                value={'11'}
                            ></TextField>
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Daripada Peranan-Peranan Lain"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <p class="text-sm font-bold">Urus Setia</p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
                        <TextField
                            disabled
                            label="Nama"
                            placeholder="-"
                            value="Mat Irdam bin Inu"
                        />
                        <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        ● Menunggu keputusan daripada PENGARAH BAHAGIAN..
                    </p>
                    </div>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <p class="text-sm font-bold">Pengarah Bahagian</p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        <TextField
                            disabled
                            label="Nama"
                            placeholder="-"
                            value="Wan Awie"
                        />
                        <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        ● Menunggu keputusan daripada KETUA SEKSYEN..
                    </p>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Ulasan Sokongan Ketua Seksyen"
                ><TextIconButton
                    label="Hantar"
                    primary
                    onClick={() => {
                        goto('/ketua-seksyen/cuti/gantian-cuti-rehat');
                    }}
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Ulasan Sokongan daripada Ketua Seksyen"
                ></SectionHeader>
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
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
