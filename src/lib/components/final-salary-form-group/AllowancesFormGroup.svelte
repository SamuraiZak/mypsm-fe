<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { Button } from 'flowbite-svelte';
    import FormButton from '../buttons/FormButton.svelte';
    import TextIconButton from '../buttons/TextIconButton.svelte';
    import TextField from '../input/TextField.svelte';

    interface AllowanceFormGroup {
        title: string;
        totalServiceYear: number;
        currentAmount: number;
        retirementMonthTotalDay: number;
        total: number;
    }

    export let retiredDate: string;
    export let titleDisabled: boolean = false;
    export let fieldOneDisabled: boolean = false;
    export let fieldTwoDisabled: boolean = false;
    export let fieldThreeDisabled: boolean = true;
    export let fieldFourDisabled: boolean = true;
    export let group: AllowanceFormGroup;
    export let onDelete: () => void;

    // function to get the number of days in the retuirement month by parsing the retiredDate
    const getMonthDaysCount = (date: string | Date): number => {
        const tmp = new Date(date);
        tmp.setMonth(tmp.getMonth() + 1);
        tmp.setDate(0);
        return tmp.getDate();
    };

    $: {
        group.retirementMonthTotalDay = getMonthDaysCount(retiredDate);

        // total up the allowance then fixed it to 2 decimal places
        // using toFixed() which returns a string,
        // so the Number() numerized it
        group.total = Number(
            (
                (group.totalServiceYear * group.currentAmount) /
                group.retirementMonthTotalDay
            ).toFixed(2),
        );
    }
</script>

<form action="" class="flex w-full flex-row items-end gap-x-2.5">
    <div class="flex w-[700px] flex-row">
        <TextField
            labelType="no-label"
            disabled={titleDisabled}
            placeholder="Nama Elaun"
            label="."
            bind:value={group.title}
        />
    </div>
    <div class="flex w-full flex-row items-end gap-x-2.5">
        <TextField
            disabled={fieldOneDisabled}
            type="number"
            labelType="no-label"
            label="Tempoh Tahun Perkhidmatan"
            bind:value={group.totalServiceYear}
        />
        <TextField
            disabled={fieldTwoDisabled}
            type="number"
            labelType="no-label"
            label="Amaun Semasa (RM)"
            bind:value={group.currentAmount}
        />
        <TextField
            disabled={fieldThreeDisabled}
            type="number"
            labelType="no-label"
            label="Jumlah Hari Pada Bulan Pencen"
            bind:value={group.retirementMonthTotalDay}
        />
        <TextField
            disabled={fieldFourDisabled}
            type="number"
            labelType="no-label"
            label="Jumlah (RM)"
            bind:value={group.total}
        />
    </div>
    <div class="w-12">
        <Button outline={false} on:click={onDelete}
            ><span class="text-red-600"><SvgMinusCircle /></span></Button
        >
    </div>
</form>
