<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { Button } from 'flowbite-svelte';
    import TextField from '../input/TextField.svelte';

    interface IntSpecialDeductionFormGroup {
        title: string;
        totalDeduction: number;
    }

    export let titleDisabled: boolean = false;
    export let fieldOneDisabled: boolean = false;
    export let group: IntSpecialDeductionFormGroup;
    export let onDelete: () => void;
</script>

<form action="" class="flex w-full flex-row items-end gap-x-2.5">
    <div class="flex w-[700px] flex-row">
        <TextField
            labelType="no-label"
            disabled={titleDisabled}
            placeholder="Nama Tolakan Khas"
            label="."
            bind:value={group.title}
        />
    </div>
    <TextField
        disabled={fieldOneDisabled}
        type="number"
        labelType="top"
        label="Jumlah (RM)"
        bind:value={group.totalDeduction}
    />
    <div class="w-12">
        <Button outline={false} on:click={onDelete}
            ><span class="text-red-600"><SvgMinusCircle /></span></Button
        >
    </div>
</form>
