<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    function _handleClick(params: string) {
        const url = '/tetapan_sistem/' + params;

        goto(url);
    }
</script>

<div
    class="flex h-full max-h-full w-full max-w-full flex-col items-center justify-start overflow-y-auto bg-ios-basic-white"
>
    <!-- div header -->
    <div
        class="flex h-24 w-full flex-col items-center justify-center bg-ios-basic-white px-10"
    >
        <h1 class="w-full text-xl font-medium leading-tight">Tetapan Sistem</h1>
    </div>

    <div
        class="grid h-fit max-h-full w-full grid-cols-4 gap-2.5 overflow-y-auto px-10"
    >
        {#each data.props.typeList as item}
            <button
                on:click={() => {
                    _handleClick(item.name);
                }}
                class="flex h-fit flex-col items-center justify-start rounded border bg-ios-basic-white p-2.5 hover:shadow"
            >
                <!-- card header -->
                <div
                    class="flex h-fit w-full flex-row items-center justify-start gap-2.5"
                >
                    <div
                        class="flex h-7 min-h-7 w-7 min-w-7 flex-col items-center justify-center rounded bg-blue-400"
                    >
                        <span class="t text-ios-basic-white">
                            <SvgSetting size="18"></SvgSetting>
                        </span>
                    </div>
                    <div
                        class="flex h-fit w-full flex-row items-center justify-start py-1"
                    >
                        <span
                            class="w-full text-start text-base font-medium text-ios-basic-black"
                        >
                            {item.name.replaceAll('_', ' ')}
                        </span>
                    </div>
                </div>

                <!-- cardbody -->
            </button>
        {/each}
    </div>
</div>
