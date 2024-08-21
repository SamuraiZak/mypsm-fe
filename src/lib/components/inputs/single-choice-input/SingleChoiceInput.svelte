<script lang="ts">
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { createEventDispatcher } from 'svelte';

    export let choices: DropdownDTO[] = [];
    export let label: string = 'Label';
    export let isRequired: boolean = true;
    export let id: string;
    export let disabled: boolean = false;
    export let val: string | null = '';
    export let errors: string[] | undefined  = [] ?? undefined;

    const dispatch = createEventDispatcher();

    function handleChange(selectedValue: string) {
        val = selectedValue;
        dispatch('change', { val });
    }
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-between">
        <label
            for="password"
            class="block w-full text-start text-base font-medium leading-tight text-slate-700"
            >{label}
            <span class="text-base text-system-danger" hidden={!isRequired}
                >*</span
            >
        </label>
    </div>
    <!-- input label ends here -->

    <!-- input field starts here -->
    <div class="flex w-full flex-col gap-1">
        {#each choices as choice (choice.value)}
            <div class="flex h-8 flex-row items-center justify-start">
                <input
                    id={choice.value}
                    name={id}
                    type="checkbox"
                    class="h-6 w-6 border-gray-300 text-blue-600 focus:ring-0 {disabled
                        ? 'bg-gray-100 text-gray-300'
                        : 'text-blue-600'}"
                    value={choice.value}
                    {disabled}
                    checked={val === choice.value}
                    on:change={() => handleChange(choice.value)}
                />
                <label
                    for={choice.value}
                    class="ml-2 block text-base {disabled
                        ? 'text-slate-500'
                        : 'text-slate-700'}"
                >
                    {choice.name}
                </label>
            </div>
        {/each}
    </div>

    <!-- input field ends here -->

    <!-- input error message starts here -->
    <div class="flex h-fit min-h-5 w-full flex-row items-center justify-start">
        {#if errors}
            <p
                class="text-start text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- input error message ends here -->
</div>
