<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Button } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    export let treatmentData: ITreatment = {};
    let treatmentDataLength = Object.keys(treatmentData).length;

    export let disabled: boolean = false;
    export let key: string = 'key';

    // set the disable to true if data exist
    if (treatmentDataLength === 0) disabled = false;
    else disabled = true;

    let selectedTreatment: {
        [key: string]: string;
    } = {};

    // ##Treatment List------------------------------------------------
    let treatmentListFormGroup: ITreatment = treatmentData;
    let treatmentListNextGroupId = 1;

    function addTreatmentListFormGroup(patientId: string) {
        treatmentListFormGroup = {
            ...treatmentListFormGroup,
            [patientId + treatmentListNextGroupId.toString()]: {
                treatment: '',
                amount: '',
            },
        };
        treatmentListNextGroupId += 1;
    }

    function removeTreatmentListFormGroup(groupId: string) {
        treatmentListFormGroup = {
            ...treatmentListFormGroup,
        };
        delete treatmentListFormGroup[groupId];
    }
    afterNavigate(() => {
        if (Object.keys(treatmentData).length === 0) console.log('EMPTY!');
        else if ((Object.keys(treatmentData).length === 0) !== null)
            console.table('NOT EMPTY!');
    });
</script>

<SectionHeader title="Jenis Rawatan/Ubat"
    ><div class="mr-2">
        {#if !disabled}
            <TextIconButton
                primary
                onClick={() => {
                    addTreatmentListFormGroup(key);
                }}
                label="Tambah Rawatan"><SvgPlus /></TextIconButton
            >
        {/if}
    </div></SectionHeader
>

{#each Object.entries(treatmentListFormGroup) as [groupId, group], index}
    <SectionHeader color="system-primary" title="Rawatan #{index + 1}">
        {#if !disabled}
            <div class="w-12">
                <Button
                    outline={false}
                    on:click={() => {
                        removeTreatmentListFormGroup(groupId);
                    }}
                    ><span class="text-red-600"><SvgMinusCircle /></span
                    ></Button
                >
            </div>
        {/if}
    </SectionHeader>
    <div class="flex w-full flex-col items-center gap-2.5 text-base">
        <form
            action=""
            class="flex w-full flex-row items-center gap-2.5 border-b"
        >
            <div class="mb-2.5 flex w-full flex-row gap-2.5">
                <span class="w-2/3">
                    <TextField
                        {disabled}
                        id="treatment-name-{groupId}"
                        label="Rawatan"
                        labelType="no-label"
                        placeholder={'Nama rawatan..'}
                        bind:value={group.treatment}
                    ></TextField>
                </span>
                <span class="w-1/3">
                    <TextField
                        {disabled}
                        labelType="no-label"
                        type="number"
                        id="treament-amount-{groupId}"
                        label="Jumlah"
                        placeholder={'Sila tetapkan jumlah..'}
                        bind:value={group.amount}
                    ></TextField>
                </span>
            </div>
        </form>
    </div>
{/each}
