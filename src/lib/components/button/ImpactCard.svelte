<script lang="ts">
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';

    export let title: string = 'Title';
    export let handleClick = () => {};
</script>

<button
    on:click={() => {
        handleClick();
    }}
    class="flex h-fit flex-col items-center justify-start rounded border bg-ios-basic-white p-2.5 hover:shadow"
>
    <!-- card header -->
    <div class="flex h-fit w-full flex-col items-start justify-start gap-2.5">
        <div
            class="flex h-7 min-h-7 w-7 min-w-7 flex-col items-center justify-center rounded bg-blue-400"
        >
            <span class="t text-ios-basic-white">
                <SvgSetting size="18"></SvgSetting>
            </span>
        </div>
        <div class="flex h-fit w-full flex-row items-center justify-start py-1">
            <span
                class="w-full text-start text-base font-medium text-ios-basic-black"
            >
                {title}
            </span>
        </div>
    </div>

    <!-- cardbody -->
</button>
