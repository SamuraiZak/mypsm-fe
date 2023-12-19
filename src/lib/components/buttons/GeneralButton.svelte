<script lang="ts">
    import { Button } from 'flowbite-svelte';
    export let onClick = () => {};
    export let pathD = '';
    export let label = '';
    export let buttonType = 'primary';
</script>

{#if buttonType === 'primary'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-system-primary bg-system-primary px-2.5 hover:bg-blue-600 focus:outline-none focus:ring-0"
        on:click={onClick}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d={pathD} />
        </svg>
        <div class="text-xs">{label}</div></Button
    >
{:else if buttonType === 'green'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-system-success bg-system-success px-2.5 hover:bg-green-600 focus:outline-none focus:ring-0"
        on:click={onClick}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d={pathD} />
        </svg>
        <div class="text-xs">{label}</div></Button
    >
{:else if buttonType === 'red'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-system-danger bg-system-danger px-2.5 hover:bg-red-600 focus:outline-none focus:ring-0"
        on:click={onClick}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d={pathD} />
        </svg>
        <div class="text-xs">{label}</div></Button
    >
{:else if buttonType === 'ghost'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-black px-2.5 text-txt-primary hover:border-system-primary hover:text-system-primary focus:outline-none focus:ring-0"
        on:click={onClick}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d={pathD} />
        </svg>
        <div class="text-xs">{label}</div></Button
    >
{:else if buttonType == 'labelOnly'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-system-primary bg-system-primary px-2.5 hover:bg-blue-600 focus:outline-none focus:ring-0"
        on:click={onClick}
    >
        <div class="text-xs">{label}</div></Button
    >
{:else if buttonType == 'labelOnlyAlt'}
    <Button
        class="flex h-[28px] flex-row rounded-[3px] border border-solid border-black px-2.5 text-txt-primary hover:border-system-primary hover:text-system-primary focus:outline-none focus:ring-0"
        on:click={onClick}
    >
        <div class="text-xs">{label}</div></Button
    >
{/if}
