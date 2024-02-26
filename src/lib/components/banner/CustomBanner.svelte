<script lang="ts">
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
</script>

<div class="flex h-fit min-h-5 w-full flex-row gap-2 rounded bg-blue-100 p-2">
    <div
        class="flex h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 flex-col items-center justify-start"
    >
        <span
            class="flex h-5 w-full flex-col items-center justify-center text-center align-middle text-ios-systemColors-systemBlue-light"
        >
            <SvgInfoSolid></SvgInfoSolid>
        </span>
    </div>
    <div
        class="flex h-5 max-h-5 min-h-5 w-full flex-col items-start justify-start"
    >
        <span
            class="flex h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-medium text-ios-systemColors-systemBlue-light"
        >
            Pengiraan purata adalah berdasarkan formula berikut:
        </span>
    </div>
</div>
