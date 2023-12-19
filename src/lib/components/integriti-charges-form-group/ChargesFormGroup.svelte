<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { Button } from 'flowbite-svelte';
    import TextField from '../input/TextField.svelte';

    export let group: any;
    export let isEditMode: boolean = false;
    export let onDelete = () => {};
</script>

<form action="" class="flex w-full flex-row items-end gap-x-2.5">
    <TextField
        labelType="no-label"
        disabled={!isEditMode}
        placeholder="Nama Tuduhan"
        bind:value={group.title}
    />
    {#if isEditMode}
        <div class="w-12">
            <Button outline={false} on:click={onDelete}
                ><span class="text-red-600"><SvgMinusCircle /></span></Button
            >
        </div>
    {/if}
</form>
