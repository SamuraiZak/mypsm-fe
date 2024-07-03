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
                PERAKUAN TIDAK HADIR KE PEJABAT ATAS
            </h1>
            <h1 class="w-full text-center text-lg font-bold text-gray-700">
                SEBAB-SEBAB KECEMASAN MENGIKUT PEKELILING
            </h1>
            <h1 class="w-full text-center text-lg font-bold text-gray-700">
                PERKHIDMATAN BIL. 1 TAHUN 1986
            </h1>
        </div>
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Bahagian 1: Butiran Pemohon
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
                        label="No. Kad Pengenalan"
                        vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        label="No. Pekerja"
                        vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        label="Jawatan"
                        vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        label="Gred"
                        vertical={false}
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
                    Bahagian 2: Perakuan
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-5"
                >
                    <p
                        class="w-full space-y-2 text-justify text-md font-normal"
                    >
                        Adalah saya memaklumkan bahawa saya telah tidak dapat
                        hadir ke pejabat / untuk menjalankan tugas dari jam <input
                            type="time"
                            class="h-9 w-[130px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        hingga ke jam
                        <input
                            type="time"
                            class="h-9 w-[130px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        pada tarikh
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        / dari tarikh
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        hingga ke tarikh
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        disebabkan oleh perkara yang berikut:
                    </p>
                    <textarea
                        name=""
                        id=""
                        class="min-h-20 w-full rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                    ></textarea>
                    <p class="w-full space-y-2 text-start text-md font-normal">
                        telah berlaku di tempat tinggal/kawasan sa berada/di
                        antara tempat kediaman saya dengan tempat perkerjaan
                        hingga menyebabkan saya tidak dapat hadir bekerja
                        seperti biasa.
                    </p>

                    <CustomInput
                        bind:val={sample}
                        label="Tarikh Permohonan"
                        vertical={false}
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
                    Bahagian 2: Keputusan Ketua Seksyen
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
