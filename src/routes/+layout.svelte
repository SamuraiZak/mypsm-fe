<script lang="ts">
    import LoadingOverlay from '$lib/components/loading-overlay/LoadingOverlay.svelte';
    import '../app.css';
    import { navigating } from '$app/stores';
    import { afterUpdate } from 'svelte';
    import { loadingState } from '$lib/stores/globalState';

    let showLoadingOverlay: boolean = false;

    afterUpdate(() => {
        // Set a timeout to show the LoadingOverlay if still navigating after 200ms
        const timeoutId = setTimeout(() => {
            if ($navigating) {
                showLoadingOverlay = true;
            }
        }, 200);

        if ($navigating === null) showLoadingOverlay = false;

        // Clear the timeout when loaded
        return () => clearTimeout(timeoutId);
    });

    $: loading = loadingState;
</script>

{#if $navigating && showLoadingOverlay}
    <LoadingOverlay />
{/if}

{#if $loading}
    <LoadingOverlay></LoadingOverlay>
{/if}

<slot />
