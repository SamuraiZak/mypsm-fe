<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { Button } from 'flowbite-svelte';
    import TextField from '../input/TextField.svelte';
    import DateSelector from '../input/DateSelector.svelte';
    import { afterUpdate } from 'svelte';

    // export let titleDisabled: boolean = false;
    export let group: any;
    let totalDayDisplay: string = group.totalDays + ' ' + 'Hari';
    export let isEditMode: boolean = false;
    export let onDelete = () => {};

    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }

    function getNumberOfDays(start: string, end: string) {
        console.log(start, end);
        const date1 = new Date(start);
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    afterUpdate(() => {
        group.totalDays = getNumberOfDays(group.startDate, group.endDate);
        totalDayDisplay = group.totalDays.toString() + ' ' + 'Hari';
    });
</script>

<form action="" class="flex w-full flex-row items-end gap-x-2.5 space-y-2">
    <DateSelector
        disabled={!isEditMode}
        labelType="label-fit"
        handleDateChange={() => {}}
        label={'Tarikh Mula'}
        bind:selectedDate={group.startDate}
    ></DateSelector>
    <DateSelector
        disabled={!isEditMode}
        labelType="label-fit"
        handleDateChange={() => {}}
        label={'Hingga'}
        bind:selectedDate={group.endDate}
    ></DateSelector>
    <div class="w-fit">
        <TextField labelType="no-label" disabled bind:value={totalDayDisplay} />
    </div>
    {#if isEditMode}
        <div class="w-12">
            <Button outline={false} on:click={onDelete}
                ><span class="text-red-600"><SvgMinusCircle /></span></Button
            >
        </div>
    {/if}
</form>
