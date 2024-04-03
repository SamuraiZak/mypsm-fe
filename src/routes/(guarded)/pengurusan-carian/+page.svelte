<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgList from '$lib/assets/svg/SvgList.svelte';
    import SvgLock from '$lib/assets/svg/SvgLock.svelte';
    import CardButton from '$lib/components/button/CardButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
    import type { PageData } from './$types';

    export let data: PageData;

    function _edit(params: string) {
        const url = '/pengurusan-carian/kemaskini/' + params;

        goto(url);
    }
</script>

<section
    class="flex h-full max-h-full w-full flex-col gap-2 overflow-hidden p-10 pb-2"
>
    <!-- group #1 starts here -->
    <div class="flex h-full w-full flex-col gap-2.5">
        <!-- group header starts here -->
        <div class="flex w-full flex-col gap-1.5">
            <div class="flex w-full flex-col items-start justify-center">
                <span class="text-xl font-semibold leading-tight"
                    >Pengurusan Carian</span
                >
            </div>
            <div class="flex w-full flex-col items-start justify-center">
                <span
                    class="text-base font-normal leading-loose text-ios-basic-inactiveGray"
                    >Silih pilih jenis pencarian yang anda ingin kemaskini.</span
                >
            </div>
        </div>
        <!-- group header ends here -->

        <!-- group body starts here -->

        <div
            class="flex h-full w-full flex-col items-start justify-start gap-2"
        >
            <div
                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-2.5 overflow-y-auto pb-5 pr-2 md:w-1/2"
            >
                {#each data.props.typeList as item}
                    <CardButton
                        title={item.name.replaceAll('_', ' ')}
                        subtitle="Kemaskini sekarang"
                        onClick={() => {
                            _edit(item.name);
                        }}
                    >
                        <SvgList slot="icon" size="20"></SvgList>
                    </CardButton>
                {/each}
            </div>
        </div>

        <!-- group body ends here -->
    </div>
    <!-- group #1 ends here -->
</section>
