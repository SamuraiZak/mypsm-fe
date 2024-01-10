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
    import { categories } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/categories';
    import CutiGantian from './forms/CutiGantian.svelte';
    import CutiTanpaGaji from './forms/CutiTanpaGaji.svelte';
    import CutiSeparuhGaji from './forms/CutiSeparuhGaji.svelte';
    import CutiTanpaRekod from './forms/CutiTanpaRekod.svelte';
    import CutiBersalinAwal from './forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from './forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from './forms/CutiIsteriBersalin.svelte';
    import CutiHaji from './forms/CutiHaji.svelte';
    import CutiKuarantin from './forms/CutiKuarantin.svelte';
    import CutiPenyakitTibi from './forms/CutiPenyakitTibi.svelte';
    import CutiPenyakitBarahDanKusta from './forms/CutiPenyakitBarahDanKusta.svelte';
    import CutiTanpaGajiMengikutPasangan from './forms/CutiTanpaGajiMengikutPasangan.svelte';
    import CutiSakitLanjutan from './forms/CutiSakitLanjutan.svelte';
    import CutiPerakuanTidakHadirKePejabat from './forms/CutiPerakuanTidakHadirKePejabat.svelte';
    import CutiKursusSambilan from './forms/CutiKursusSambilan.svelte';
    import CutiMenjagaAnakTanpaGaji from './forms/CutiMenjagaAnakTanpaGaji.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { permohonanCutiMaklumatKakitangan } from './schema';

    export let disabled: boolean = false;
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

    // ================ Stepper Control ==================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    // ============== Form Validation ================
    let errorData: any;
    // ==============    Stepper 1    ================
    const stepper1Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper1FormData = {
            noPekerja: String(formData.get('noPekerja')),
            nama: String(formData.get('nama')),
            noKadPengenalan: String(formData.get('noKadPengenalan')),
            gred: String(formData.get('gred')),
            penempatan: String(formData.get('penempatan')),
            kumpulan: String(formData.get('kumpulan')),
        };
        try {
            const result = permohonanCutiMaklumatKakitangan.parse(stepper1FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper1FormData = { ...stepper1FormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper1FormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<ContentHeader
    title="Permohonan Cuti"
    description="Sila isi borang permohonan cuti di bawah dengan butiran yang tepat dan lengkap."
></ContentHeader>

<Stepper bind:activeIndex={stepperIndex}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
            ><TextIconButton
                label="Seterusnya"
                primary
                form="stepper1Validation"><SvgArrowRight /></TextIconButton
            ></StepperContentHeader
        >

        <!-- ========== STEPPER 1 ========== -->
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <form
                    id="stepper1Validation"
                    on:submit|preventDefault={stepper1Form}
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        hasError={errorData?.noPekerja}
                        {disabled}
                        name="noPekerja"
                        label={'No. Pekerja'}
                        value={'A23412'}
                    ></TextField>
                    {#if errorData?.noPekerja}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noPekerja[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={errorData?.nama}
                        {disabled}
                        name="nama"
                        label={'Nama'}
                        value={'Irfan Bin Abu'}
                    ></TextField>
                    {#if errorData?.nama}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.nama[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={errorData?.noKadPengenalan}
                        {disabled}
                        name="noKadPengenalan"
                        label={'No. K/P'}
                        value={'111111-11-1111'}
                    ></TextField>
                    {#if errorData?.noKadPengenalan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noKadPengenalan[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={errorData?.gred}
                        {disabled}
                        name="gred"
                        label={'Gred'}
                        value={'F41 - Pegawai Teknologi Maklumat'}
                    ></TextField>
                    {#if errorData?.gred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gred[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={errorData?.penempatan}
                        {disabled}
                        name="penempatan"
                        label={'Penempatan'}
                        value={'5345 - Bhgn. Teknologi Maklumat'}
                    ></TextField>
                    {#if errorData?.penempatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.penempatan[0]}</span
                        >
                    {/if}
                    <TextField
                        hasError={errorData?.kumpulan}
                        {disabled}
                        name="kumpulan"
                        label={'Kumpulan'}
                        value={'PP1 - Pengurusan dan Professional - A'}
                    ></TextField>
                    {#if errorData?.kumpulan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kumpulan[0]}</span
                        >
                    {/if}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!-- ========== STEPPER 2 ========== -->
    <StepperContent>
        <StepperContentHeader title="Maklumat Cuti"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex max-h-full w-full flex-col gap-2.5">
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Cuti"
                    options={categories.filter((cat) => cat.name != 'Semua')}
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

    <!-- ========== STEPPER 3 ========== -->
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

    <!-- ========== STEPPER 4 ========== -->
    <StepperContent>
        <StepperContentHeader title="Pengesahan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/cuti/permohonan-cuti');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
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
</Stepper>

<Toaster />
