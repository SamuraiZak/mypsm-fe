<script lang="ts">
    import { goto } from '$app/navigation';

    export let title: string = 'Module Name';
    export let subtitle: string =
        'This line will display the messages for the module';
    export let redirectPath: string = '/perjawatan/pemangkuan';

    function handleClick() {
        goto(redirectPath);
    }
</script>

<button
    type="button"
    on:click={() => {
        handleClick();
    }}
    class="col-span-2 flex min-h-20 h-fit min-w-40 flex-col items-center justify-between rounded border bg-ios-backgroundColors-systemBackground-light p-4 hover:shadow md:col-span-1"
>
    <div class="flex h-full w-full flex-col items-start justify-center gap-1">
        <span class="text-base font-medium text-ios-labelColors-label-light"
            >{title}</span
        >
        <span class="text-sm font-medium text-ios-basic-inactiveGray"
            >{subtitle}</span
        >
    </div>
</button>
