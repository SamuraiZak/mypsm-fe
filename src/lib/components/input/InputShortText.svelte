<script lang="ts">
    export let id: string = 'default';
    export let label: string = 'Label';
    export let disabled: boolean = false;
    export let noLabel: boolean = false;
    export let flexRow: boolean = true;
</script>

<div
    class="flex min-h-[28px] {flexRow
        ? 'flex-row items-center justify-start'
        : 'flex-col items-start justify-center'} gap-1"
>
    <!-- label -->
    <div
        class="h-full min-w-fit flex-row items-center justify-start gap-1 {noLabel
            ? 'hidden'
            : 'flex'}"
    >
        <p class="text-sm font-normal text-txt-secondary">{label}</p>
        <p class="text-sm font-normal text-txt-secondary">:</p>
    </div>

    <!-- input -->
    <input
        {disabled}
        type="text"
        {id}
        class="h-[28px] min-h-[28px] max-h-[28px] rounded-[3px] border-bdr-primary text-sm hover:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:hover:border-bdr-primary"
    />
</div>
