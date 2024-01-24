<script lang="ts">
    import LoadingOverlay from '$lib/components/loading-overlay/LoadingOverlay.svelte';
    import '../app.css';
    import { navigating } from '$app/stores';
    import { afterUpdate } from 'svelte';

    let showLoadingOverlay: boolean = false;

    afterUpdate(() => {
        // Set a timeout to show the LoadingOverlay if still navigating after 300ms
        const timeoutId = setTimeout(() => {
            if ($navigating) {
                showLoadingOverlay = true;
            }
        }, 300);

        // Clear the timeout when loaded
        return () => clearTimeout(timeoutId);
    });
</script>

{#if $navigating && showLoadingOverlay}
    <LoadingOverlay />
{/if}

<slot />
