<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';

    export let title: string = '';
</script>

<div class="w-full">
    <ContentHeader title={title} description=""
        ><slot /></ContentHeader
    >
</div>
