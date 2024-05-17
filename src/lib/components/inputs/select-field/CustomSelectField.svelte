<script lang="ts">
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { UserRoleConvert } from '$lib/dto/core/user-role/user-role.dto';

    export let label: string = 'Label';
    export let isRequired: boolean = true;
    export let id: string;
    export let val: string | number | boolean | null | undefined;
    export let errors: string[] | undefined = [] ?? undefined;
    export let disabled: boolean = false;
    export let placeholder: string = '-';

    export let options: DropdownDTO[] = [];
    export let onValueChange = () => {};
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->
    <label
        for="role"
        class="block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
        >{label}
        <span class="text-base text-system-danger" hidden={!isRequired}>*</span>
    </label>
    <!-- input label ends here -->

    <!-- input field starts here -->
    <select
        {disabled}
        {placeholder}
        name={id}
        bind:value={val}
        on:change={onValueChange}
        class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light {disabled
            ? 'bg-ios-systemColors-quaternarySystemFill-light'
            : 'bg-ios-backgroundColors-systemBackground-light'} py-0 text-sm focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
    >
        {#each options as item}
            <option value={item.value}>
                {item.name}
            </option>
        {/each}
    </select>
    <!-- input field ends here -->

    <!-- input error message starts here -->
    <div class="flex h-3 w-full flex-row items-center justify-end">
        {#if errors}
            <p
                class="text-end text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- input error message ends here -->
</div>
