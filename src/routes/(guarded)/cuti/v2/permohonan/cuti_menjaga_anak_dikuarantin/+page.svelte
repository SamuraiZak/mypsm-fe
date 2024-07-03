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
                PERMOHONAN KEMUDAHAN CUTI MENJAGA ANAK YANG DIKUARANTIN ATAU
                MEMERLUKAN PENGASINGAN
            </h1>
        </div>
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Bahagian 1: Butiran Diri Pegawai
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <CustomInput
                        bind:val={sample}
                        label="Nama Penuh"
                        vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="No. Kad Pengenalan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Jawatan"
                    ></CustomInput>
                    <CustomInput bind:val={sample} vertical={false} label="Gred"
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
                    Bahagian 2: Butiran Anak
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <CustomInput
                        bind:val={sample}
                        label="Nama Anak"
                        vertical={false}
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="No. Kad Pengenalan / MyKid / No. Sijil Kelahiran / Sijil Pendaftaran Pengangkatan"
                    ></CustomInput>
                    <div
                        class="flex h-fit w-full flex-row items-center justify-start gap-3"
                    >
                        <div
                            class="flex h-9 w-[320px] flex-col items-start justify-start"
                        >
                            <p
                                class="text-start align-middle text-md font-medium"
                            >
                                Umur Anak
                            </p>
                            <p
                                class="text-start align-middle text-base font-medium"
                            >
                                (pada tarikh kuarantin)
                            </p>
                        </div>

                        <div
                            class="flex w-full flex-row items-start justify-start gap-1"
                        >
                            <CustomInput
                                bind:val={sample}
                                vertical={false}
                                noLabel={true}
                            ></CustomInput>
                            <div
                                class="flex h-9 w-fit flex-col items-start justify-center"
                            >
                                <p
                                    class="text-start align-middle text-md font-medium"
                                >
                                    tahun
                                </p>
                            </div>

                            <CustomInput
                                bind:val={sample}
                                vertical={false}
                                noLabel={true}
                            ></CustomInput>
                            <div
                                class="flex h-9 w-fit flex-col items-start justify-center"
                            >
                                <p
                                    class="text-start align-middle text-md font-medium"
                                >
                                    bulan
                                </p>
                            </div>
                        </div>
                    </div>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Hubungan Dengan Pegawai"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Perakuan Kuarantin"
                        placeholder="Sila muat naik Perakuan Kuarantin yang dikeluarkan oleh pegawai Perubatan Kerajaan/swasta"
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
                    Bahagian 3: Pengesahan Pegawai
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-10"
                >
                    <p
                        class="w-full space-y-2 text-justify text-md font-normal"
                    >
                        Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan di Bahagian 1 dan 2 adalah benar.
                        Sehubungan itu, saya memohon Kemudahan Cuti Menjaga Anak
                        Yang Dikuarantin Atau Memerlukan Pengasingan selama <input
                            type="number"
                            class="h-9 w-[130px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        hari, pada/ mulai
                        <input
                            type="date"
                            class="h-9 w-[130px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        sehingga
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />.
                    </p>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh"
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
                    Bahagian 4: Pengesahan Dan Keputusan Ketua Jabatan
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <p
                        class="mb-10 w-full space-y-2 text-justify text-md font-normal"
                    >
                        Permohonan Kemudahan Cuti Menjaga Anak Yang Dikuarantin
                        Atau Memerlukan Pengasingan bagi pegawai adalah
                        <select
                            name="feedback"
                            id="feedback"
                            class="h-9 rounded border border-gray-300 py-0 text-center align-middle text-md focus:border-blue-500 focus:ring-0"
                        >
                            <option value="Diluluskan">Diluluskan</option>
                            <option value="Tidak Diluluskan"
                                >Tidak Diluluskan</option
                            >
                        </select>
                        pada/ mulai
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />
                        sehingga
                        <input
                            type="date"
                            class="h-9 w-[150px] rounded border border-gray-300 text-md focus:border-blue-500 focus:ring-0"
                        />.
                    </p>
                    <CustomInput bind:val={sample} vertical={false} label="Nama"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Jawatan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh"
                    ></CustomInput>
                </form>
            </div>
        </div>
        <!-- form group wrapper ends -->
    </div>
</section>
