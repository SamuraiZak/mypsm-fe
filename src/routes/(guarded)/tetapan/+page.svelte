<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgLockRotate from '$lib/assets/svg/SvgLockRotate.svelte';

    const navigateTo = async (url: string) => {
        goto(url);
    };
</script>

<div class="flex h-fit w-full flex-row items-center justify-start px-2 py-5">
    <span class="text-xl font-semibold leading-loose"> Tetapan Akaun </span>
</div>

<div class="flex h-full w-full flex-col justify-start space-y-4">
    <div class="h-fit w-full p-2">
        <span class="text-base">
            Sila pilih tetapan yand anda ingin kemaskini
        </span>
    </div>

    <div
        class="flex h-full w-full flex-col items-start justify-start space-y-4 overflow-y-auto"
    >
        <button
            on:click={() => {
                navigateTo('tetapan/kemaskini-kata-laluan');
            }}
            class="flex h-8 w-80 flex-row rounded-md bg-ios-systemColors-quaternarySystemFill-light font-normal text-ios-labelColors-label-light hover:bg-ios-systemColors-tertiarySystemFill-light hover:text-ios-labelColors-link-light"
        >
            <div>
                <span class="flex flex-row justify-start p-2 text-base">
                    <SvgLockRotate></SvgLockRotate>
                </span>
            </div>
            <span class="flex flex-row justify-start p-2 text-base">
                Kemaskini Kata Laluan
            </span>
        </button>
    </div>
</div>
