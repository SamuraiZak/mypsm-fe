<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';

    export let handleSearch = () => {};
</script>

<!-- filter area -->
<div
    class="flex h-fit min-h-14 w-full flex-row items-start justify-between overflow-hidden rounded-tl rounded-tr border-b bg-ios-basic-white p-2"
>
    <div
        class=" flex min-h-10 w-full flex-row flex-wrap items-end justify-start gap-2 py-1"
    >
        <slot />

        <!-- <div class="flex h-[44.5px] w-fit flex-col justify-end px-2">
            <TextIconButton label="Cari" icon="search" type="primary"
            ></TextIconButton>
        </div> -->
    </div>
    <div class="flex w-fit flex-col items-center justify-start gap-2 py-1">
        <div
            class="flex h-[44.5px] w-fit flex-col justify-end
         px-2"
        >
            <TextIconButton
                label="Cari"
                icon="search"
                type="primary"
                onClick={() => {
                    handleSearch();
                }}
            ></TextIconButton>
        </div>
    </div>
</div>
