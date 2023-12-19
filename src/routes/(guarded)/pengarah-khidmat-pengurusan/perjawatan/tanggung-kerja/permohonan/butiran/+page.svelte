<script lang="ts">
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
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge, Checkbox } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    let tableCellClass = 'border h-[32px] min-h-[32px] py-1 px-2.5';

    const options: RadioOption[] = [
        {
            value: 'ada',
            label: 'Ada',
        },
        {
            value: 'tidak ada',
            label: 'Tidak Ada',
        },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: 'support',
            label: 'SOKONG',
        },
        {
            value: 'do not support',
            label: 'TIDAK SOKONG',
        },
    ];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tanggung Kerja"
        description="Sila lengkapkan butiran yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/pengarah-khidmat-pengurusan/perjawatan/tanggung-kerja');
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
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
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
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
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
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja bagi Jawatan yang SAMA Sebelum Ini (Jika Ada)"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <TextField
                            labelType="label-fit"
                            label="Dari"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            labelType="label-fit"
                            label="Hingga"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                    </div>
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja yang Diperakukan"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <TextField
                            labelType="label-fit"
                            label="Dari"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            labelType="label-fit"
                            label="Hingga"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Fail-fail yang dimuat naik:"
                    ></SectionHeader>
                    <ul
                        class="w-full list-disc pl-4 text-sm text-txt-secondary"
                    >
                        <li>
                            Carta Organisasi (Kedudukan Pegawai dan Jawatan yang
                            Ditanggung Kerja);
                        </li>
                        <li>Salinan Surat Arahan Penangguhan Kerja;</li>
                        <li>Maklumat Cuti yang Terkini;</li>
                        <li>
                            Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai
                            Menanggung Kerja
                        </li>
                    </ul>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="Carta Organisasi" />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan Surat Arahan Penangguhan Kerja"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Cuti Terkini"
                            />
                        </li>
                        <li><DownloadAttachment fileName="Senarai Tugas" /></li>
                    </ul>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pelangkauan dari Segi Kekananan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader title="Pelangkauan dari Segi Kekananan"
                    ></SectionHeader>
                    <RadioSingle {options} disabled={true}></RadioSingle>
                    <LongTextField
                        label="Jika Ada, sila nyatakan sebab-sebab pelangkauan"
                        disabled={true}
                        placeholder="-"
                        value="Sebab-sebab..."
                    ></LongTextField>
                    <div class="w-full py-10">
                        <Checkbox checked disabled
                            ><span class="font-semibold"
                                >Saya dengan ini mengesahkan bahawa maklumat
                                sebagaimana yang dinyatakan berikut adalah
                                benar.</span
                            ></Checkbox
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Sokongan dari Pengarah Bahagian/Negeri"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama"
                        disabled={true}
                        placeholder="-"
                        value="Mohd Sahwan Bin Murni"
                    ></TextField>
                    <LongTextField
                        label="Ulasan/Tindakan"
                        disabled={true}
                        placeholder="-"
                        value="Layak disokong"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="" class="w-[220px]">Keputusan</label><Badge
                            border
                            color="green">DISOKONG</Badge
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Senarai Semak"></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <table
                        class="h-full max-h-full w-full overflow-y-hidden text-sm"
                    >
                        <thead>
                            <tr>
                                <th class={tableCellClass}>Bil.</th>
                                <th class={tableCellClass}>Perkara</th>
                                <th class={tableCellClass}
                                    >Status (Ada/Tidak Ada)</th
                                >
                                <th class={tableCellClass}
                                    >Semakan Urus Setia</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        1
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    >Surat Permohonan dari Bahagian</td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        2
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>
                                        Borang Perakuan Penanggungan Kerja
                                    </div>
                                    <i class="text-txt-tertiary"
                                        >*Nota: Sila nyatakan nama penyandang
                                        bagi jawatan yang ditanggung, tarikh
                                        kekosongan</i
                                    ></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        3
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>
                                        Carta Organisasi yang DISAHKAN dan JELAS
                                        MENANDAKAN Kedudukan:
                                    </div>
                                    <ul
                                        class="list-disc pl-4 italic text-txt-tertiary"
                                    >
                                        <li>Pegawai yang menanggung; dan</li>
                                        <li>Jawatan yang ditanggung</li>
                                    </ul></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        4
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>Deskripsi Tugas (JD)</div>
                                    <ul
                                        class="list-disc pl-4 italic text-txt-tertiary"
                                    >
                                        <li>Pegawai yang menanggung; dan</li>
                                        <li>Jawatan yang ditanggung</li>
                                    </ul></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        5
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>Surat Arahan Penangguhan Kerja</div>
                                    <i class="text-txt-tertiary"
                                        >*Nota: Tarikh Surat Arahan hendaklah
                                        sebelum atau pada tarikh Penangguhan
                                        Kerja</i
                                    ></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        6
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>
                                        Kenyataan Cuti untuk 28 Hari (Perakuan
                                        Pertama)/14 Hari Pertama (Pelanjutan)
                                        Pegawai yang Menanggung Kerja:
                                    </div>
                                    <i class="text-txt-tertiary"
                                        >*Nota: Hendaklah dijana melalui
                                        Aplikasi MyPSM</i
                                    ></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        7
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>
                                        Salinan Dokumen Sokongan Berkaitan:
                                    </div>
                                    <ul
                                        class="list-disc pl-4 italic text-txt-tertiary"
                                    >
                                        <li>Sijil Cuti Sakit</li>
                                        <li>Surat Pertukaran Pegawai</li>
                                        <li>Surat Pemangkuan Pegawai</li>
                                        <li>Surat Kelulusan:</li>
                                        <ul
                                            class="list-disc pl-4 italic text-txt-tertiary"
                                        >
                                            <li>Cuti Haji</li>
                                            <li>Cuti Bersalin</li>
                                            <li>Cuti Barah</li>
                                            <li>Cuti Belajar</li>
                                            <li>Cuti Tanpa Gaji</li>
                                        </ul>
                                        <li>
                                            Borang Perancangan Cuti bagi Pegawai
                                            yang Mengambil Cuti Rehat Sebelum
                                            Bersara
                                        </li>
                                    </ul></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                            <tr>
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        8
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div>
                                        Justifikasi (Sekiranya Ada) bagi
                                        Permohonan Longgar Syarat
                                    </div>
                                    <ul
                                        class="list-disc pl-4 italic text-txt-tertiary"
                                    >
                                        <li>Pelangkauan Melebihi 2 Gred</li>
                                        <li>
                                            Lokasi Berlainan dan Melebihi
                                            Lingkungan 25km
                                        </li>
                                        <li>
                                            Kelayakan, Kemahiran atay Syarat
                                            Khas (Berlainan Skim)
                                        </li>
                                    </ul></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                                <td class={tableCellClass}
                                    ><div
                                        class="flex items-center justify-center"
                                    >
                                        <Checkbox checked disabled />
                                    </div></td
                                >
                            </tr>
                        </tbody>
                    </table>
                    <TextField
                        label="Disediakan Oleh:"
                        disabled
                        placeholder="-"
                        value="Mohd Irfan bin Abu"
                    />
                    <TextField
                        label="Disemak Oleh"
                        disabled
                        placeholder="-"
                        value="Mohd Abu bin Bakar"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
                ><TextIconButton
                    primary
                    label="Hantar"
                    onClick={() => {
                        goto(
                            '/pengarah-khidmat-pengurusan/perjawatan/tanggung-kerja',
                        );
                    }}
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Ulasan Keputusan daripada Pengarah Perkhidmatan Pengurusan"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <LongTextField
                        label="Tindakan/Ulasan"
                        value=""
                        placeholder="-"
                    ></LongTextField>
                    <RadioSingle options={supportOptions} />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
