<script lang="ts">
    import { page } from '$app/stores';

    function navigateBack() {
        window.history.back();
    }
</script>

<div class="flex h-screen items-center justify-center">
    <div class="bg-white">
        <div class="flex flex-col items-center">
            <h1 class="font-bold text-system-primary">
                {$page.status}
            </h1>

            <h6
                class="text-2xl md:text-3xl mb-2 text-center font-bold text-gray-800"
            >
                <span class="text-red-500">Oops!</span> Page {$page.error
                    ?.message}
            </h6>

            <p class="mb-8 text-center text-gray-500 md:text-lg">
                Terdapat masalah semasa cuba mengakses halaman yang telah anda
                klik.
            </p>

            <button
                on:click={navigateBack}
                class="rounded-[3px] bg-system-primary px-6 py-2 text-sm font-semibold text-white"
                >Balik ke halaman sebelum ini</button
            >
        </div>
    </div>
</div>
