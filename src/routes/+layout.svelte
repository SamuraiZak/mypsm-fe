<script lang="ts">
    import { showLoadingOverlay } from '$lib/stores/globalState';
    import LoadingOverlay from '$lib/components/loading-overlay/LoadingOverlay.svelte';
    import '../app.css';

	let activeUrl: string;
</script>

{#if $showLoadingOverlay}
    <LoadingOverlay></LoadingOverlay>
{/if}

<slot />
