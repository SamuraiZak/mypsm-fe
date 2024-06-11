<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

    export let data: PageData;

    export let disabled = false;
    export let id: string;
    export let label: string = 'Penyokong';
    export let options: DropdownDTO[] = data.supporterApproverLookup;
    export let val: string | number | boolean | null | undefined;
    export let errors: string[] | undefined = [] ?? undefined;

    let openList: boolean = false;
    let searchVal: string = '';
    function handleSearch(event: Event) {
        openList = true;
        const target = event.target as HTMLInputElement;
        searchVal = target?.value;
        
        if(searchVal == ''){
            openList = false;
        }
    }

    function handleClick(event: Event) {
        const target = event.target as HTMLInputElement;
        val = target?.value;
        openList = false;
        searchVal = '';
    }
</script>

<div class="flex w-full flex-col items-center justify-start gap-1 px-6 pt-10">
    <label
            for="{id}"
            class="block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
            >{label}</label
        >
    <div class="flex w-full flex-col">
        <button
            disabled={false}
            class="flex w-full items-center rounded border border-ios-labelColors-separator-light px-2 {disabled
                ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                : 'bg-ios-backgroundColors-systemBackground-light hover:rounded-md hover:border-ios-activeColors-activeBlue-light focus:border-ios-activeColors-activeBlue-light active:rounded-md'} rounded-md"
            on:click={() => (openList = !openList)}
        >
            <input
                on:input={handleSearch}
                disabled={false}
                {id}
                type="text"
                placeholder="Sila Pilih"
                bind:value={val}
                class="autofill:hide-default-inner-shadow block {disabled
                    ? 'bg-ios-systemColors-quaternarySystemFill-light text-ios-labelColors-secondaryLabel-light'
                    : 'bg-ios-backgroundColors-systemBackground-light'} h-8 w-full border-none px-1 text-sm [appearance:textfield] focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {#if openList}
                <SvgManifyingGlass size="20" />
            {:else}
                <SvgChevronDown size="16" />
            {/if}
        </button>

        <!-- dropdown options list -->
        {#if openList}
            <ul
                id="dropdownOptions"
                class="max-h-[35em] w-full overflow-y-auto rounded-md border border-ios-labelColors-separator-light text-sm"
            >
                {#each options.filter((option) => option.name
                        ?.toLowerCase()
                        .includes(searchVal?.toLowerCase())) as item, i}
                    <option
                        on:click={handleClick}
                        value={item.value}
                        class="bg-ios-basic-white py-1 px-3 hover:bg-ios-labelColors-separator-light"
                    >
                        {item.name}
                    </option>
                {/each}
            </ul>
        {/if}
    </div>

    <!-- input error message starts here -->
    <div class="flex h-3 w-full flex-row items-center justify-start">
        {#if errors}
            <p
                class="text-end text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- input error message ends here -->

    <CustomSelectField
        id="HHEH"
        options={data.supporterApproverLookup}
        label="Penyokong"
        val={searchVal}
    />
</div>
