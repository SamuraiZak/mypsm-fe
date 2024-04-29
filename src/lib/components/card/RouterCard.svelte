<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgAccount from '$lib/assets/svg/SvgAccount.svelte';
    import SvgAllowance from '$lib/assets/svg/SvgAllowance.svelte';
    import SvgCalendar from '$lib/assets/svg/SvgCalendar.svelte';
    import SvgContract from '$lib/assets/svg/SvgContract.svelte';
    import SvgJustice from '$lib/assets/svg/SvgJustice.svelte';
    import SvgLoan from '$lib/assets/svg/SvgLoan.svelte';
    import SvgPerformance from '$lib/assets/svg/SvgPerformance.svelte';
    import SvgProfile from '$lib/assets/svg/SvgProfile.svelte';
    import SvgSalary from '$lib/assets/svg/SvgSalary.svelte';
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';
    import SvgTie from '$lib/assets/svg/SvgTie.svelte';
    import SvgStethescope from '$lib/assets/svg/SvgStethescope.svelte';
    import { Badge } from 'flowbite-svelte';
    import SvgAcademic from '$lib/assets/svg/SvgAcademic.svelte';
    import SvgRecord from '$lib/assets/svg/SvgRecord.svelte';
    import SvgPreference from '$lib/assets/svg/SvgPreference.svelte';
    export let url: string = '';
    export let icon: string = '';
    export let title: string = 'Title';
    export let subtitle: string = 'Subtitle';
    export let fail: number = 0;
    export let pending: number = 0;
    export let success: number = 0;

    function handleClick() {
        goto(url);
    }
</script>

<button
    class="flex min-h-40 flex-col gap-3 rounded-md border bg-ios-basic-white p-3 hover:shadow-md"
    on:click={() => {
        handleClick();
    }}
>
    <!-- card header -->
    <div class="flex h-10 w-full flex-row items-center justify-start">
        <div
            class="flex h-10 w-10 flex-col items-center justify-center rounded bg-blue-500"
        >
            <span class="text text-ios-basic-white">
                {#if icon == 'setting'}
                    <SvgSetting size="20"></SvgSetting>
                {:else if icon == 'user'}
                    <SvgProfile size="21"></SvgProfile>
                {:else if icon == 'tie'}
                    <SvgTie size="21"></SvgTie>
                {:else if icon == 'contract'}
                    <SvgContract size="21"></SvgContract>
                {:else if icon == 'calendar'}
                    <SvgCalendar size="21"></SvgCalendar>
                {:else if icon == 'justice'}
                    <SvgJustice size="21"></SvgJustice>
                {:else if icon == 'performance'}
                    <SvgPerformance size="21"></SvgPerformance>
                {:else if icon == 'allowance'}
                    <SvgAllowance size="21"></SvgAllowance>
                {:else if icon == 'loan'}
                    <SvgLoan size="21"></SvgLoan>
                {:else if icon == 'salary'}
                    <SvgSalary size="21"></SvgSalary>
                {:else if icon == 'medical'}
                    <SvgStethescope size="21"></SvgStethescope>
                {:else if icon == 'academic'}
                    <SvgAcademic size="22"></SvgAcademic>
                {:else if icon == 'record'}
                    <SvgRecord size="22"></SvgRecord>
                {:else if icon == 'preference'}
                    <SvgPreference size="22"></SvgPreference>
                {:else}
                    <slot name="icon" />
                {/if}
            </span>
        </div>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-between">
        <!-- main content -->
        <div class="flex h-fit w-full flex-col items-center justify-start">
            <!-- title -->
            <div
                class="flex h-fit min-h-7 w-full flex-col items-center justify-center"
            >
                <p
                    class="w-full text-wrap text-start text-md font-medium text-ios-labelColors-label-light"
                >
                    {title}
                </p>
            </div>
            <!-- caption -->
            <div
                class="flex h-fit min-h-7 w-full flex-col items-center justify-center"
            >
                <p
                    class="w-full text-wrap text-start text-base font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    {subtitle}
                </p>
            </div>
        </div>
        <!-- footer -->
        <div
            class="flex h-fit min-h-7 w-full flex-row items-center justify-end gap-2"
        >
            {#if fail > 0}
                <Badge color="red">{fail}</Badge>
            {/if}
            {#if pending > 0}
                <Badge color="yellow">{pending}</Badge>
            {/if}
            {#if success > 0}
                <Badge color="indigo">{success}</Badge>
            {/if}
        </div>
    </div>
</button>
