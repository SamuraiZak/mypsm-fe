<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { Badge } from 'flowbite-svelte';

    const supportOptions: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];

    const uploadedFiles = [
        {
            id: 1,
            value: 'Surat Belian.pdf',
        },
        {
            id: 2,
            value: 'Surat Gaji.pdf',
        },
    ];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Pinjaman 001023"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Kembali"
            onClick={() => {
                goto('/ketua-seksyen/pinjaman');
            }}
        >
            <SvgArrowLeft />
        </TextIconButton>
        <TextIconButton
            primary
            label="Simpan"
            onClick={() => {
                alert('save function');
            }}
        >
            <SvgCheck />
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <div
        class="flex max-h-full w-full flex-row items-start justify-start gap-2.5"
    >
        <div
            class="flex max-h-full w-[50%] flex-col items-start justify-start gap-2.5"
        >
            <CustomTabContent>
                <SectionHeader title="Maklumat Peminjam"></SectionHeader>
                <TextField
                    disabled
                    labelBlack={false}
                    id="nama-penuh"
                    label="Name Penuh (Mengikut Kad Pengenalan)"
                    value="Mohd Irfan Bin Abu"
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="no-kp"
                    label="No. K/P"
                    value="890701-13-5667"
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tarikh-lahir"
                    label="Tarikh Lahir"
                    value="01/07/1989"
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="warganegara"
                    label="Warganegara"
                    value="Malaysia"
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="gred"
                    label="Gred"
                    value=""
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="jawatan"
                    label="Jawatan"
                    value="Pegawai IT"
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="penempatan"
                    label="Penempatan"
                    value="00105 - BHG. Teknologi Maklumat"
                ></TextField>
            <div
                class="flex max-h-full w-full flex-col items-start border-t"
            />
                <SectionHeader title="Maklumat Jenis Pinjaman"></SectionHeader>
                <SectionHeader
                    color={'system-primary'}
                    title="Pinjaman Komputer"
                />
                <TextField
                    disabled
                    labelBlack={false}
                    id="jumlah-dipohon"
                    label="Jumlah Yang Dipohon (RM)"
                    value="6,999.00 "
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tempoh-pembayaran"
                    label="Tempoh Pembayaran"
                    value="12 Bulan"
                ></TextField>
                <div
                class="flex max-h-full w-full flex-col items-start border-t"
            />
                <SectionHeader
                    title="Dokumen-Dokumen Sokongan yang Berkaitan"
                />
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <div
                        class="flex h-full max-h-full flex-col items-start justify-center"
                    >
                        <span class="text-sm text-system-primary"
                            >Fail-fail yang dimuat naik:
                        </span>
                    </div>
                </div>
                {#each uploadedFiles as item}
                    <DownloadAttachment fileName={item.value} />
                {/each}
                <div
                class="flex max-h-full w-full flex-col items-start border-t"
            />
                <SectionHeader title="Maklumat Kelayakan" />
                <TextField
                    labelType="auto-calculate-percentage"
                    disabled
                    hasTooltip
                    labelBlack={false}
                    percentageVal={'0%'}
                    id="gaji-pokok"
                    label="Gaji Pokok & Elaun (RM) "
                    value="4,672.56"
                ></TextField>
                <TextField
                    labelType="auto-calculate-percentage"
                    disabled
                    hasTooltip
                    labelBlack={false}
                    percentageVal={'0%'}
                    id="potongan"
                    label="Potongan (RM)"
                    value="2,000.00"
                ></TextField>
                <TextField
                    labelType="auto-calculate-percentage"
                    disabled
                    hasTooltip
                    percentageVal={'0%'}
                    labelBlack={false}
                    id="baki"
                    label="Baki (RM)"
                    value="2,672.56"
                ></TextField>
            </CustomTabContent>
        </div>
        <div
            class="flex max-h-full w-[50%] flex-col items-start justify-start gap-2.5"
        >
            <CustomTabContent>
                <SectionHeader title="Ulasan Sokongan daripada Ketua Seksyen" />
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <span class="text-sm italic text-system-primary"
                        >&#x2022; Keputusan akan dihantar ke email klinik dan
                        Urus Setia berkaitan</span
                    >
                </div>
                <LongTextField
                    rows={2}
                    labelBlack={false}
                    id="tindakan"
                    label="Tindakan/Ulasan"
                    value="Butiran lengkap.."
                ></LongTextField>
                <RadioSingle options={supportOptions} />
                <div
                class="flex max-h-full w-full flex-col items-start border-t"
            />
                <SectionHeader
                    title="Keputusan Daripada Peranan-Peranan Lain"
                />
                <SectionHeader color={'system-primary'} title="Pelulus" />
                <TextField
                    labelBlack={false}
                    disabled
                    id="nama"
                    label="Nama"
                    value="Ramdan Bin Mat"
                />
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <span class="text-sm italic text-system-primary"
                        >&#x2022; Menunggu keputusan daripada KETUA SEKSYEN</span
                    >
                </div>
                <SectionHeader
                    color={'system-primary'}
                    title="Urus Setia Pentadbiran"
                />
                <TextField
                    labelBlack={false}
                    disabled
                    id="nama"
                    label="Nama"
                    value="Mat Irdam Bin Murni"
                />
                <LongTextField
                    rows={2}
                    disabled
                    labelBlack={false}
                    id="ulasan"
                    label="Tindakan/Ulasan"
                    value="Sah untuk mohon."
                />
                <div class="flex w-full flex-row text-sm">
                    <span class="w-[220px] text-txt-tertiary"
                        >Keputusan</span
                    ><Badge border color="green">SAH</Badge>
                </div>
            </CustomTabContent>
        </div>
    </div>
</section>
