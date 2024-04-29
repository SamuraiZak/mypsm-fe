<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';
    import { Badge } from 'flowbite-svelte';
    export let url: string = '';
    export let icon: string = '';
    export let title: string = 'Title';
    export let subtitle: string = 'Subtitle';
    export let fail: number = 0;
    export let pending: number = 0;
    export let success: number = 0;

    function handleClick() {
        goto(url);
    }
</script>

<button
    class="flex min-h-40 flex-col gap-3 rounded-md border bg-ios-basic-white p-3 hover:shadow-md"
    on:click={() => {
        handleClick();
    }}
>
    <!-- card header -->
    <div class="flex h-10 w-full flex-row items-center justify-start">
        <div
            class="flex h-10 w-10 flex-col items-center justify-center rounded bg-blue-500"
        >
            <span class="text text-ios-basic-white">
                {#if icon == 'setting'}
                    <SvgSetting size="20"></SvgSetting>
                {:else}
                    <slot name="icon" />
                {/if}
            </span>
        </div>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-between">
        <!-- main content -->
        <div class="flex h-fit w-full flex-col items-center justify-start">
            <!-- title -->
            <div
                class="flex h-fit min-h-7 w-full flex-col items-center justify-center"
            >
                <p
                    class="w-full text-wrap text-start text-md font-medium text-ios-labelColors-label-light"
                >
                    {title}
                </p>
            </div>
            <!-- caption -->
            <div
                class="flex h-fit min-h-7 w-full flex-col items-center justify-center"
            >
                <p
                    class="w-full text-wrap text-start text-base font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    {subtitle}
                </p>
            </div>
        </div>
        <!-- footer -->
        <div
            class="flex h-fit min-h-7 w-full flex-row items-center justify-end gap-2"
        >
            {#if fail > 0}
                <Badge color="red">{fail}</Badge>
            {/if}
            {#if pending > 0}
                <Badge color="yellow">{pending}</Badge>
            {/if}
            {#if success > 0}
                <Badge color="indigo">{success}</Badge>
            {/if}
        </div>
    </div>
</button>
