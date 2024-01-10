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
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { categories } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/categories';
    import CutiGantian from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiGantian.svelte';
    import CutiTanpaRekod from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaRekod.svelte';
    import CutiSeparuhGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiSeparuhGaji.svelte';
    import CutiTanpaGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaGaji.svelte';
    import CutiBersalinAwal from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiIsteriBersalin.svelte';
    import CutiHaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiHaji.svelte';
    import CutiKuarantin from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiKuarantin.svelte';
    import CutiMenjagaAnakTanpaGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiMenjagaAnakTanpaGaji.svelte';
    import CutiKursusSambilan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiKursusSambilan.svelte';
    import CutiPerakuanTidakHadirKePejabat from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPerakuanTidakHadirKePejabat.svelte';
    import CutiSakitLanjutan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiSakitLanjutan.svelte';
    import CutiTanpaGajiMengikutPasangan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaGajiMengikutPasangan.svelte';
    import CutiPenyakitBarahDanKusta from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPenyakitBarahDanKusta.svelte';
    import CutiPenyakitTibi from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPenyakitTibi.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    let selectedCuti = '';

    const options: RadioOption[] = [
        {
            value: 'luls',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Cuti Gantian"
        description="Sila semak maklumat-maklumat permohonan cuti tanpa rekod berikut untuk sokongan"
    >
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/penyokong/cuti/permohonan-cuti');
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
            <StepperContentHeader title="Maklumat Cuti"></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <DropdownSelect
                        dropdownType="label-left-full"
                        label="Jenis Cuti"
                        options={categories.filter(
                            (cat) => cat.name != 'Semua',
                        )}
                        bind:value={selectedCuti}
                        onSelect={() => {}}
                    ></DropdownSelect>

                    {#if selectedCuti === 'Cuti Gantian'}
                        <CutiGantian></CutiGantian>
                    {:else if selectedCuti === 'Cuti Tanpa Rekod'}
                        <CutiTanpaRekod></CutiTanpaRekod>
                    {:else if selectedCuti === 'Cuti Separuh Gaji'}
                        <CutiSeparuhGaji></CutiSeparuhGaji>
                    {:else if selectedCuti === 'Cuti Tanpa Gaji'}
                        <CutiTanpaGaji></CutiTanpaGaji>
                    {:else if selectedCuti === 'Cuti Bersalin Awal'}
                        <CutiBersalinAwal></CutiBersalinAwal>
                    {:else if selectedCuti === 'Cuti Bersalin Pegawai'}
                        <CutiBersalinPegawai></CutiBersalinPegawai>
                    {:else if selectedCuti === 'Cuti Isteri Bersalin'}
                        <CutiIsteriBersalin></CutiIsteriBersalin>
                    {:else if selectedCuti === 'Cuti Haji'}
                        <CutiHaji></CutiHaji>
                    {:else if selectedCuti === 'Cuti Kuarantin'}
                        <CutiKuarantin></CutiKuarantin>
                    {:else if selectedCuti === 'Cuti Menjaga Anak Tanpa Gaji'}
                        <CutiMenjagaAnakTanpaGaji></CutiMenjagaAnakTanpaGaji>
                    {:else if selectedCuti === 'Cuti Kursus Sambilan'}
                        <CutiKursusSambilan></CutiKursusSambilan>
                    {:else if selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat'}
                        <CutiPerakuanTidakHadirKePejabat
                        ></CutiPerakuanTidakHadirKePejabat>
                    {:else if selectedCuti === 'Cuti Sakit Lanjutan'}
                        <CutiSakitLanjutan></CutiSakitLanjutan>
                    {:else if selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'}
                        <CutiTanpaGajiMengikutPasangan
                        ></CutiTanpaGajiMengikutPasangan>
                    {:else if selectedCuti === 'Cuti Penyakit Barah Dan Kusta'}
                        <CutiPenyakitBarahDanKusta></CutiPenyakitBarahDanKusta>
                    {:else if selectedCuti === 'Cuti Penyakit Tibi'}
                        <CutiPenyakitTibi></CutiPenyakitTibi>
                    {/if}
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5">
                    <div class="justify-left flex w-full items-center">
                        <p class="text-sm font-bold">Dokumen Sokongan*</p>
                    </div>
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
            <StepperContentHeader title="Pengesahan"></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <div class="w-full py-5">
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
            <StepperContentHeader title="Penyokongan Permohonan"
                ><TextIconButton
                    primary
                    label="Hantar"
                    onClick={() => {
                        goto('/penyokong/cuti/permohonan-cuti');
                    }}
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Keputusan daripada Penyokong"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        value="butiran lengkap"
                        placeholder="-"
                    ></LongTextField>
                    <RadioSingle options={supportOptions} disabled />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster/>
