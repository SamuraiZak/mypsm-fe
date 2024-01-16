<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { categories } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/categories';
    import CutiGantian from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiGantian.svelte';
    import CutiTanpaRekod from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiTanpaRekod.svelte';
    import CutiSeparuhGaji from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiSeparuhGaji.svelte';
    import CutiTanpaGaji from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiTanpaGaji.svelte';
    import CutiBersalinAwal from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiIsteriBersalin.svelte';
    import CutiHaji from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiHaji.svelte';
    import CutiKuarantin from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiKuarantin.svelte';
    import CutiMenjagaAnakTanpaGaji from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiMenjagaAnakTanpaGaji.svelte';
    import CutiKursusSambilan from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiKursusSambilan.svelte';
    import CutiPerakuanTidakHadirKePejabat from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiPerakuanTidakHadirKePejabat.svelte';
    import CutiSakitLanjutan from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiSakitLanjutan.svelte';
    import CutiTanpaGajiMengikutPasangan from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiTanpaGajiMengikutPasangan.svelte';
    import CutiPenyakitBarahDanKusta from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiPenyakitBarahDanKusta.svelte';
    import CutiPenyakitTibi from '../../../../urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti/forms/CutiPenyakitTibi.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from "./$types";

    export let data: PageData;
    export let disabled: boolean = true;

    let selectedCuti = '';

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
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];
</script>

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/urus-setia/cuti/kelulusan-cuti');
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
        <StepperContentHeader title="Maklumat Cuti"><TextIconButton primary label="Simpan" form="formValidation"/></StepperContentHeader>
        <StepperContentBody>
            <div class="flex max-h-full w-full flex-col gap-2.5 border-b border-bdr-primary pb-5">
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Cuti"
                    options={categories.filter((cat) => cat.name != 'Semua')}
                    bind:value={selectedCuti}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedCuti === 'Cuti Gantian'}
                    <CutiGantian {data}></CutiGantian>
                {:else if selectedCuti === 'Cuti Tanpa Rekod'}
                    <CutiTanpaRekod {data}></CutiTanpaRekod>
                {:else if selectedCuti === 'Cuti Separuh Gaji'}
                    <CutiSeparuhGaji {data}></CutiSeparuhGaji>
                {:else if selectedCuti === 'Cuti Tanpa Gaji'}
                    <CutiTanpaGaji {data}></CutiTanpaGaji>
                {:else if selectedCuti === 'Cuti Bersalin Awal'}
                    <CutiBersalinAwal {data}></CutiBersalinAwal>
                {:else if selectedCuti === 'Cuti Bersalin Pegawai'}
                    <CutiBersalinPegawai {data}></CutiBersalinPegawai>
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
        <StepperContentHeader title="Dokumen Sokongan"></StepperContentHeader>
        <StepperContentBody>
            <div class="justify-left flex w-full items-center">
                <p class="text-sm font-bold">Dokumen Sokongan*</p>
            </div>
            <div
                class="flex w-full flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
            >
                <p class="text-base text-txt-secondary">
                    Seret dan lepas fail anda ke dalam ruangan ini atau pilih
                    dari peranti anda
                </p>
                <span>
                    <FileInputField />
                </span>
            </div>
            <p class="justify-left flex w-full text-sm text-rose-500">
                Sila muat naik dokumen sokongan pada ruangan yang disediakan
            </p>
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
                            sebagaimana yang dinyatakan berikut adalah benar.</span
                        ></Checkbox
                    >
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Ulasan Kelulusan Urus Setia"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/urus-setia/cuti/kelulusan-cuti');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
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
</Stepper>

<Toaster/>
