<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Sejarah Pertukaran">
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/employment/transfer');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-hidden bg-white"
>
    <!-- table component starts here -->
    <div
        class="flex h-full min-h-full w-full flex-col items-start justify-start overflow-hidden"
    >
        <!-- table filter area -->
        <div
            class="flex h-14 min-h-14 w-full flex-row items-center justify-between border-b"
        ></div>

        <!-- table area -->
        <div
            class="flex h-full w-full flex-col items-start justify-start overflow-auto"
        ></div>

        <!-- table footer area -->
        <div
            class="flex h-14 min-h-14 w-full flex-row items-center justify-between border-t"
        ></div>
    </div>
</section>
