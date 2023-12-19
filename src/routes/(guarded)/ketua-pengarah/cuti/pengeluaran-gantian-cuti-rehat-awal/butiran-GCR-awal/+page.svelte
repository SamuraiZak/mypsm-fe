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
    import FileInputField from '$lib/components/input/FileInputField.svelte';

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

    const supportOptions: RadioOption[] = [
        {
            value: 'support',
            label: 'Sokong',
        },
        {
            value: 'do not support',
            label: 'Tidak Sokong',
        },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengeluaran Gantian Cuti Rehat (GCR)"
        description="Butiran Permohonan pengumpulan Gantian CUti Rehat (GCR) 0411"
    >
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto(
                    '/ketua-pengarah/cuti/pengeluaran-gantian-cuti-rehat-awal',
                );
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
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
            <StepperContentHeader title="Butiran GCR Sedia Ada"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Butiran GCR Sedia Ada</p>
                    <TextField
                        {disabled}
                        id="jumlahGcrTerkumpul"
                        label={'Jumlah GCR Terkumpul'}
                        value={'120'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jumlahLayakUntukPengeluaran"
                        label={'Jumlah Layak Untuk Pengeluaran'}
                        value={'90'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bakiSelepasPengeluaran"
                        label={'Baki Selepas Pengeluaran'}
                        value={'30'}
                    ></TextField>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm">Syarat-Syarat Pengeluaran Awal GCR</p>
                    <ul class="list-inside list-disc text-sm">
                        <li>
                            Tempoh perkhidmatan pegawai tidak kurang daripada 15
                            tahun
                        </li>
                        <li>
                            Pegawai telah mencapai umur 45 tahun semasa
                            permohonan dibuat
                        </li>
                        <li>Jumlah terkumpul GCR 90 hari</li>
                        <li>
                            Bebas daripada prosiding jenayah atau tindakan
                            tatatertib
                        </li>
                        <li>Mendapat perakuan daripada Ketua Jabatan</li>
                        <li>
                            Pemberian awal award wang tunai GCR sebanyak 90 hari
                            hanya boleh dibuat sekali sahaja sepanjang
                            perkhidmatan pegawai
                        </li>
                    </ul>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="justify-left flex w-full items-center">
                    <p class="text-sm font-bold">Dokumen Sokongan*</p>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <div
                        class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                    >
                        <p class="text-base text-txt-secondary">
                            Seret dan lepas fail anda ke dalam ruangan ini atau
                            pilih fail dari peranti anda
                        </p>
                        <span>
                            <FileInputField />
                        </span>
                    </div>
                    <p class="justify-left flex w-full text-sm text-rose-500">
                        Sila muat naik dokumen sokongan pada ruangan yang
                        disediakan
                    </p>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Penyokongan Bahagian atau Negeri"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <p class="text-sm font-bold">Pengarah Bahagian</p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                    >
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
                            value="Lulus untuk mohon"
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">LULUS</Badge>
                        </div>
                    </div>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <p class="text-sm font-bold">Ketua Seksyen</p>
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2"
                    >
                        <TextField
                            disabled
                            label="Nama"
                            placeholder="-"
                            value="Wan Awie"
                        />
                        <LongTextField
                            disabled
                            label="Tindakan/Ulasan"
                            placeholder="-"
                            value="Layak untuk mohon"
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">SOKONG</Badge>
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Ulasan Kelulusan Urus Setia"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="*Keputusan akan dihantar ke email klinik dan Urus Setia berkaitan"
                ></SectionHeader>
                <LongTextField
                    disabled
                    label="Tindakan/Ulasan"
                    placeholder="-"
                    value="Butiran Lengkap"
                />
                <RadioSingle {options} disabled />
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Penyokongan Ketua Pengarah"
                ><TextIconButton
                    label="Hantar"
                    primary
                    onClick={() => {
                        goto(
                            '/ketua-pengarah/cuti/pengeluaran-gantian-cuti-rehat-awal',
                        );
                    }}
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <LongTextField
                    disabled
                    label="Tindakan/Ulasan"
                    placeholder="-"
                    value="Butiran Lengkap"
                />
                <RadioSingle options={supportOptions} disabled />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
