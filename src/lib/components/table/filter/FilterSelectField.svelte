<script lang="ts">
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

    export let inputValue: string = '';
    export let label: string = 'Label';
    export let inputId: string = 'input';
    export let disabled: boolean = false;
    export let options: DropdownDTO[] = [];
</script>

<div class="h-fit w-52 min-w-52 max-w-52 gap-px px-2">
    <label
        for={inputId}
        class="block text-base font-medium text-ios-labelColors-label-light"
    >
        {label}
    </label>
    <select
        {disabled}
        id={inputId}
        bind:value={inputValue}
        class="autofill:hide-default-inner-shadow block h-7 w-full rounded border border-ios-labelColors-separator-light {disabled
            ? 'bg-ios-systemColors-quaternarySystemFill-light'
            : 'bg-ios-backgroundColors-systemBackground-light'} focus:ring-ios-activeColors-activeBlue-light'} py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1"
    >
        {#each options as item}
            <option value={item.value}>
                {item.name}
            </option>
        {/each}
    </select>
</div>
