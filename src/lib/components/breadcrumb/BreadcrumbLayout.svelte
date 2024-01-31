<script lang="ts">
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
    import { split } from 'postcss/lib/list';
    import { page } from '$app/stores';
    import {
        moduleName,
        subModuleName,
        moduleAction,
    } from '$lib/stores/moduleLayout';

    let currentURL = $page.url.pathname;

    export const getBreadcrumbData = () => {
        return [
            { label: $moduleName },
            { label: $subModuleName },
            { label: $moduleAction },
        ];
    };

    $: {
        $page.url.pathname;
        breadcrumbData = getBreadcrumbData();
    }
    // let currentURL = $page.url.toString();
    export let currentpath: string;
    $: activeUrl = currentpath;
    let breadcrumbData = getBreadcrumbData();
</script>

<Breadcrumb aria-label="breadcrumb" class="bg-white">
    {#each breadcrumbData as item, index}
        {#if item.label}
            <BreadcrumbItem>
                <svelte:fragment slot="icon">
                    {#if index === 0}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="mr-2 h-6 w-6 text-gray-500"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                            />
                        </svg>
                    {:else}
                        <span
                            style="font-size: 1rem;"
                            class="mx-1.5 text-gray-500">/</span
                        >
                    {/if}
                </svelte:fragment>
                {item.label}
            </BreadcrumbItem>
        {/if}
    {/each}
</Breadcrumb>
