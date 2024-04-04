<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="{data.props.currentCategory.name}"
            ><TextIconButton
                label="Tambah Rekod"
                onClick={() => {
                    goto('./sejarah-apc/tambah-rekod-apc');
                }}
            >
                <SvgPlus />
            </TextIconButton></ContentHeader
        >
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit min-h-[300px] w-full">
            
        </div>
    </div>
</div>
