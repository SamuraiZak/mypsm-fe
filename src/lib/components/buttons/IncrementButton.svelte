<script lang="ts">
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';

    export let type: string = 'plus';
    export let onClick = () => {};
</script>

<button on:click={onClick} class="flex flex-col items-center justify-center">
    {#if type == 'plus'}
        <span class="leading-loose text-system-primary">
            <SvgAddCircle></SvgAddCircle>
        </span>
    {:else if type == 'minus'}
        <span class="leading-loose text-system-danger">
            <SvgMinusCircle></SvgMinusCircle>
        </span>
    {/if}
</button>
