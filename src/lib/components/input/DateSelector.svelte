<script lang="ts">
    export let selectedDate: any = '2022-02-02';
    export let handleDateChange: any = () => {};
    let fontBlack = 'text-txt-primary';
    let fontGray = 'text-txt-tertiary';
    export let label = 'Label';
    export let name = '';
    export let labelBlack = true;
    export let disabled = false;
    export let labelType = 'default';
    export let isError = false;
</script>

<div class="flex w-full flex-row items-center justify-between">
    <label
        for=""
        class="{labelType === 'default'
            ? 'w-[220px] min-w-[220px]'
            : labelType === 'label-fit'
            ? 'w-fit min-w-fit pr-2'
            : labelType === 'label-200'
            ? 'w-[200px] min-w-[200px]'
            : ''} text-sm {labelBlack ? fontBlack : fontGray} font-medium"
        >{label}</label
    ><input
        {disabled}
        class="
        {isError
            ? 'border-system-danger focus:border-system-danger'
            : 'hover:border-system-primary focus:border-system-primary'}
        border-1 active:border-1 h-8 w-full rounded-[3px] border-bdr-primary text-sm placeholder:text-txt-tertiary {disabled
            ? 'hover:border-bdr-primary'
            : 'hover:border-system-primary'} focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
        type="date"
        id="date-selector"
        {name}
        on:change={handleDateChange}
        bind:value={selectedDate}
    />
</div>
