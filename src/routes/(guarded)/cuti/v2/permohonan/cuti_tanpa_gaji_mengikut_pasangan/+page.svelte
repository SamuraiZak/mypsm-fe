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
                BORANG PERMOHONAN CUTI TANPA GAJI <br /> BAGI PEGAWAI YANG MENGIKUT
                PASANGAN BERTUGAS ATAU BERKURSUS DI DALAM ATAU DI LUAR NEGARA
            </h1>
        </div>
        <!-- form group wrapper starts -->
        <div class="flex w-full flex-col items-center justify-start">
            <!-- form group header starts -->
            <div
                class="flex h-9 min-h-9 w-full flex-col items-center justify-center bg-gray-200 px-2"
            >
                <h1 class="w-full text-start text-md font-medium text-gray-700">
                    Maklumat Pemohon
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
                        label="Nama"
                        vertical={false}
                        required
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="No. Kad Pengenalan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="Jawatan dan Gred Jawatan Hakiki"
                        subLabel="(mengikut skim perkhidmatan)"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh Lantikan Jawatan Sekarang"
                        required
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tarikh Pengesahan Dalam Perkhidmatan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Alamat Tempat Bertugas Sekarang"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Gaji Akhir Yang Diterima"
                    >
                        <p
                            class="w-fit text-center text-md font-normal"
                            slot="prefix"
                        >
                            RM
                        </p>
                    </CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Elaun Memangku"
                        subLabel="(jika berkenaan)"
                    >
                        <p
                            class="w-fit text-center text-md font-normal"
                            slot="prefix"
                        >
                            RM
                        </p>
                    </CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Alamat Tempat Tinggal Sekarang"
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
                    Maklumat Permohonan
                </h1>
            </div>
            <!-- form group header ends -->

            <!-- form group body starts -->
            <div class="flex w-full flex-col items-center justify-start p-5">
                <form
                    action=""
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <div
                        class="flex w-full flex-col items-center justify-center"
                    >
                        <p class="w-full text-start text-md font-medium">
                            Tarikh Cuti Permohonan
                        </p>
                    </div>
                    <CustomInput
                        bind:val={sample}
                        label="Dari"
                        vertical={false}
                        required
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="Hingga"
                    ></CustomInput>
                    <div
                        class="flex w-full flex-col items-center justify-center"
                    >
                        <p class="w-full text-start text-md font-medium">
                            Tempoh CTG
                        </p>
                    </div>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="Dari"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Hingga"
                        required
                    ></CustomInput>
                    <div
                        class="flex w-full flex-col items-center justify-center"
                    >
                        <p class="w-full text-start text-md font-medium">
                            Tarikh Permohonan CTG Terakhir
                        </p>
                    </div>
                    <CustomInput bind:val={sample} vertical={false} label="Dari"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Hingga"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tujuan Permohonan / Pelanjutan Sekarang"
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
                    Maklumat Pasangan (Suami / Isteri)
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
                        label="Nama"
                        vertical={false}
                        required
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="No. Kad Pengenalan"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        required
                        label="Jawatan / Gred Jawatan"
                        subLabel="(sila nyatakan mengikut skim perkhidmatan sekiranya pegawai awam)"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tempat Bertugas Sekarang"
                        required
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Tempat Berkursus / Pengajian atau Tempat Bertugas Yang Baru"
                    ></CustomInput>
                    <CustomInput
                        bind:val={sample}
                        vertical={false}
                        label="Alamat Semasa Bercuti"
                        subLabel="(sekiranya belum ada, maklumkan kepada Ketua Jabatan setelah diperoleh)"
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
                    Pengesahan Permohonan
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
                    Semakan Urus Setia
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
                    Kelulusan Pihak Berkuasa Melulus
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
