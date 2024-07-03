<script lang="ts">
    import { goto } from '$app/navigation';
    import lkim_logo from '$lib/assets/images/logo.png';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomInput from '$lib/components/inputs/text-field/CustomInput.svelte';

    let sample: string = '';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Cuti">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/v2/permohonan');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto py-10"
>
    <div
        class="flex w-[793px] flex-col items-center justify-start gap-1 border p-8"
    >
        <div class="flex w-full flex-col items-center justify-center gap-4">
            <div class="flex h-20 justify-center">
                <img
                    src={lkim_logo}
                    alt="Logo"
                    class="logo object-scale-down"
                />
            </div>
        </div>
        <div class="flex w-full flex-col items-center justify-start py-2">
            <h1 class="w-full text-center text-lg font-bold text-gray-700">
                Borang Permohonan Cuti Sambilan (CKS) <br /> Untuk Mengikuti
                Kursus PJJ (Intensif) <br /> (Surat Pekeliling Pekhidmatan Bilangan
                7 Tahun 2009)
            </h1>
        </div>
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Bahagian 1: Butiran Permohonan
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <CustomInput bind:val={sample} label="Nama" vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Jawatan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Kelayakan Akademik"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Kelayakan Ikhtisas"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Gaji Sekarang"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh Mula Dilantik"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="No. Tarikh Surat Kebenaran Untuk Mengikuti Kursus PPJ"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh Cuti Dipohon"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Bilangan Hari"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tujuan Kursus Intensif"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Cuti Kursus Sambilan untuk mengikuti kursus (Intensif) yang telah diambil dalam tahun ini"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh Permohonan"
                    ></CustomInput>
                </form>
            </div>
        </div>
        <!-- form group wrapper ends -->
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Bahagian 2: Sokongan Pengarah Bahagian/Negeri
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <div class="flex w-full flex-col items-center justify-center">
                    <p
                        class=" w-full text-wrap text-center text-base italic text-gray-400"
                    >
                        Ruangan ini akan diisi oleh pihak yang berkenaan.
                    </p>
                </div>
            </div>
        </div>
        <!-- form group wrapper ends -->
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Bahagian 3: Kelulusan Ketua Seksyen
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <div class="flex w-full flex-col items-center justify-center">
                    <p
                        class=" w-full text-wrap text-center text-base italic text-gray-400"
                    >
                        Ruangan ini akan diisi oleh pihak yang berkenaan.
                    </p>
                </div>
            </div>
        </div>
        <!-- form group wrapper ends -->
    </div>
</section>
