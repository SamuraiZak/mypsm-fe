<script lang="ts">
    import { goto } from '$app/navigation';
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import lkimLogo from '$lib/assets/logo.png';
    import SvgPeople from '$lib/assets/svg/SvgPeople.svelte';
</script>

<div
    class="w-full rounded-lg bg-ios-backgroundColors-systemBackground-light shadow sm:max-w-md md:mt-0 xl:p-0"
>
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
        <div class="flex w-full items-center justify-center">
            <img class="h-10" src={mypsmLogo} alt="logo" />
        </div>
        <div class="inline-flex w-full items-center justify-center">
            <hr
                class="h-px w-full border-0 bg-ios-labelColors-separator-light"
            />
            <span
                class="text-md absolute left-1/2 -translate-x-1/2 bg-bgr-primary px-3 font-semibold text-ios-labelColors-label-light"
                >Selamat Datang</span
            >
        </div>
        <p
            class="text-center text-base text-ios-labelColors-secondaryLabel-light"
        >
            Pilihan log masuk
        </p>
        <div class="flex w-full flex-col gap-2">
            <button
                on:click={() => goto('/login/kakitangan')}
                type="button"
                class="bg h-20 rounded-md bg-ios-systemColors-quaternarySystemFill-light text-base hover:bg-ios-systemColors-quaternarySystemFill-dark"
            >
                Kakitangan LKIM
            </button>
            <button
                on:click={() => goto('/login/calon')}
                type="button"
                class="bg h-20 rounded-md bg-ios-systemColors-quaternarySystemFill-light text-base hover:bg-ios-systemColors-quaternarySystemFill-dark"
            >
                Calon Kakitangan LKIM
            </button>
            <button
                on:click={() => goto('/login/klinik-panel')}
                type="button"
                class="bg h-20 rounded-md bg-ios-systemColors-quaternarySystemFill-light text-base hover:bg-ios-systemColors-quaternarySystemFill-dark"
            >
                Klinik Panel
            </button>
        </div>
    </div>
</div>
