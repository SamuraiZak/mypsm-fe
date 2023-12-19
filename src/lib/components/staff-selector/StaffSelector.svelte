<script lang="ts">
    import SvgChevronDown from '$lib/assets/svg/SvgChevronDown.svelte';
    import SvgChevronUp from '$lib/assets/svg/SvgChevronUp.svelte';
    import { Button, Dropdown, Input, Label, Radio } from 'flowbite-svelte';
    import TextField from '../input/TextField.svelte';

    let staffSelect = 1; // Default staff selection option
    export let selectorName: string = '';
    export let identityNoInputValue: string = '123456-12-1234';
    export let staffNoInputValue: string = '123456';
    export let staffNameInputValue: string = 'Kasmah Binti Habibah';
    let dropdownOpened: boolean = false;
    let idType = 'Kad Pengenalan'; // Default identity type
    let defaultClass: string =
        'text-sm text-system-neutral font-medium flex items-center h-full gap-2 whitespace-nowrap ';

    // Function to format identity card number with hyphens
    function identityNoFormat(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedValue = '';

        formattedValue = value.slice(0, 6);

        if (value.length >= 6) {
            formattedValue += '-' + value.slice(6, 8);
        }
        if (value.length >= 8) {
            formattedValue += '-' + value.slice(8, 12);
        }

        identityNoInputValue = formattedValue;
    }

    // Function to handle backspace key event
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Backspace') {
            const value = identityNoInputValue.replace(/-/g, ''); // Remove all dashes

            identityNoInputValue = value;
        }
    }
</script>

<Label {defaultClass}>
    <Radio
        name="staff-selector-{selectorName}"
        bind:group={staffSelect}
        value={1}>Semua Kakitangan</Radio
    >
    <Radio
        name="staff-selector-{selectorName}"
        bind:group={staffSelect}
        value={2}>Pilih Kakitangan</Radio
    >

    {#if staffSelect === 2}
        <!-- Dropdown for selecting staff identification type -->
        <Button
            outline={true}
            on:click={() => {
                dropdownOpened = !dropdownOpened;
            }}
            class="w-30 h-8 gap-x-1 rounded-[3px] border-none py-0 text-txt-primary hover:text-txt-primary focus:ring-0"
        >
            {idType}
            <!-- SVG icon for dropdown arrow -->
            {#if dropdownOpened === true}
                <SvgChevronDown></SvgChevronDown>
            {:else}
                <SvgChevronUp></SvgChevronUp>
            {/if}
        </Button>
        <Dropdown
            class="w-44 space-y-3 border border-bdr-primary p-3 text-sm"
            bind:open={dropdownOpened}
        >
            <li>
                <Radio name="idType" bind:group={idType} value="Kad Pengenalan"
                    >Kad Pengenalan</Radio
                >
            </li>
            <li>
                <Radio name="idType" bind:group={idType} value="No. Pekerja"
                    >No. Pekerja</Radio
                >
            </li>
            <li>
                <Radio name="idType" bind:group={idType} value="Nama Pekerja"
                    >Nama Pekerja</Radio
                >
            </li>
        </Dropdown>
        <!-- Input field based on selected identification type -->
        {#if idType === 'Kad Pengenalan'}
            <TextField
                labelType="no-label"
                labelBlack={true}
                name="identity-no"
                bind:value={identityNoInputValue}
                onInput={identityNoFormat}
                onKeyDown={handleKeyDown}
            ></TextField>
        {:else if idType === 'No. Pekerja'}
            <TextField
                labelType="no-label"
                labelBlack={true}
                name="staff-no"
                bind:value={staffNoInputValue}
            ></TextField>
        {:else if idType === 'Nama Pekerja'}
            <TextField
                labelType="no-label"
                labelBlack={true}
                name="staff-name"
                bind:value={staffNameInputValue}
            ></TextField>
        {/if}
    {/if}
</Label>
