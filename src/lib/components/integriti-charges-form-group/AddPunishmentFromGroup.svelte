<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import EmolumentDepriveDay from '$lib/components/integriti-charges-form-group/EmolumentDepriveDay.svelte';
    import { greds } from '$lib/mocks/gred/gred';
    import { Button } from 'flowbite-svelte';

    export let disabled: boolean = false;
    export let key: string = 'key';

    let selectedPunishment: {
        [key: string]: string;
    } = {};

    const generatePunishmentPeriodOptions = () => {
        const options = [];
        for (let i = 12; i <= 36; i++) {
            options.push({
                value: i,
                name: String(i),
            });
        }
        return options;
    };

    // ##Punishments------------------------------------------------
    let punishmentFormGroup: IntPunishment = {};

    let punishmentNextGroupId = 1;

    function addPunishmentFormGroup(chargeId: string) {
        punishmentFormGroup = {
            ...punishmentFormGroup,
            [chargeId + punishmentNextGroupId.toString()]: undefined,
        };
        punishmentNextGroupId += 1;
    }

    function removePunishmentFormGroup(groupId: string) {
        punishmentFormGroup = { ...punishmentFormGroup };
        delete punishmentFormGroup[groupId];
    }

    // ##Deprivation Days------------------------------------------------
    let emolumentDeprivationDaysFormGroup: IntEmolumentDeprivationDays = {};
    let emolumentDeprivationDaysNextGroupId = 1;

    function addEmolumentDeprivationDayFormGroup() {
        emolumentDeprivationDaysFormGroup = {
            ...emolumentDeprivationDaysFormGroup,
            [emolumentDeprivationDaysNextGroupId.toString()]: {
                startDate: '',
                endDate: '',
                totalDays: '0',
            },
        };
        emolumentDeprivationDaysNextGroupId += 1;
    }

    function removeEmolumentDeprivationDayFormGroup(groupId: string) {
        emolumentDeprivationDaysFormGroup = {
            ...emolumentDeprivationDaysFormGroup,
        };
        delete emolumentDeprivationDaysFormGroup[groupId];
    }
</script>

<SectionHeader title="Penentuan Hukuman"
    ><div class="mr-2">
        <TextIconButton
            primary
            onClick={() => {
                addPunishmentFormGroup(key);
            }}
            label="Tambah Hukuman"><SvgPlus /></TextIconButton
        >
    </div></SectionHeader
>

{#each Object.entries(punishmentFormGroup) as [groupId, group], index}
    <SectionHeader color="system-primary" title="Hukuman #{index + 1}"
        >{#if selectedPunishment !== null}
            <div class="w-12">
                <Button
                    outline={false}
                    on:click={() => {
                        removePunishmentFormGroup(groupId);
                    }}
                    ><span class="text-red-600"><SvgMinusCircle /></span
                    ></Button
                >
            </div>
        {/if}
    </SectionHeader>
    <div class="flex w-full flex-col items-center gap-2.5 text-base">
        <DropdownSelect
            {disabled}
            labelBlack={true}
            dropdownType="label-left-full"
            name="punishment-type-dropdown-{key + groupId}"
            id="punishment-type-dropdown-{key + groupId}"
            label="Jenis Hukuman"
            bind:value={selectedPunishment[groupId]}
            options={[
                {
                    value: 'punishmentWarning',
                    name: 'Amaran',
                },
                {
                    value: 'punishmentPenalty',
                    name: 'Denda',
                },
                {
                    value: 'punishmentEmolumentDeprivation',
                    name: 'Lucut Hak Emolumen',
                },
                {
                    value: 'punishmentSalaryMovementDelay',
                    name: 'Tangguh Pergerakan Gaji',
                },
                {
                    value: 'punishmentDeductSalary',
                    name: 'Turun Gaji',
                },
                {
                    value: 'punishmentDemote',
                    name: 'Turun Pangkat',
                },
                {
                    value: 'punishmentFire',
                    name: 'Buang Kerja',
                },
            ]}
        ></DropdownSelect>
        <form action="" class="flex w-full flex-row items-end gap-2.5 border-b">
            <div class="mb-2.5 flex w-full flex-col gap-2.5">
                <span hidden>
                    <TextField
                        {disabled}
                        id="punishment-name-{groupId}"
                        label="Nama Hukuman"
                        value={''}
                    ></TextField>
                </span>

                {#if selectedPunishment[groupId] === 'punishmentWarning'}
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of-effect-warning-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentPenalty'}
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of effect-penalty-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                    <TextField
                        {disabled}
                        type="number"
                        id="emolument-deprived-days-name-{key + groupId}"
                        label="Hari Emolumen"
                        placeholder="1 - 7 Hari"
                        value={''}
                    ></TextField>
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentEmolumentDeprivation'}
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of effect-penalty-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                    <TextField
                        {disabled}
                        type="number"
                        id="emolument-deprived-days-name-{key + groupId}"
                        label="Hari Emolumen"
                        placeholder="Tiada Had Hari"
                        value={''}
                    ></TextField>
                    <div class="border-l-4 border-r-4 px-2.5">
                        <SectionHeader subTitle="Tarikh Dilucutkan Hak Emolumen"
                            ><div class="mr-2">
                                <TextIconButton
                                    primary
                                    onClick={() => {
                                        addEmolumentDeprivationDayFormGroup();
                                    }}
                                    label=""><SvgPlus /></TextIconButton
                                >
                            </div></SectionHeader
                        >
                        {#each Object.entries(emolumentDeprivationDaysFormGroup) as [depriveDateId, group], index}
                            <div
                                class="flex w-full flex-row items-center gap-x-2.5 text-base"
                            >
                                <span class="w-[220px] text-sm italic"
                                    >Tarikh #{index + 1}.</span
                                >
                                <EmolumentDepriveDay
                                    isEditMode={true}
                                    bind:group={emolumentDeprivationDaysFormGroup[
                                        depriveDateId
                                    ]}
                                    onDelete={() =>
                                        removeEmolumentDeprivationDayFormGroup(
                                            depriveDateId,
                                        )}
                                />
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentSalaryMovementDelay'}
                    <DropdownSelect
                        {disabled}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="month-count-salary-movement-suspension-dropdown-{key +
                            groupId}"
                        id="month-count-salary-movement-suspension-dropdown-{key +
                            groupId}"
                        label="Tempoh Bulan Tangguh Pergerakan Gaji"
                        value={''}
                        options={[
                            {
                                value: 1,
                                name: 'Tiga (3) Bulan',
                            },
                            {
                                value: 2,
                                name: 'Enam (6) Bulan',
                            },
                            {
                                value: 3,
                                name: 'Sembilan (9) Bulan',
                            },
                            {
                                value: 4,
                                name: 'Dua Belas (12) Bulan',
                            },
                        ]}
                    />
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of-effect-salary-movement-delay-{key +
                            groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="new-kgt-date-{key + groupId}"
                        label="Tarikh pergerakan KGT baru"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentDeductSalary'}
                    <DropdownSelect
                        {disabled}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="number-of-salary-movement-dropdown-{key +
                            groupId}"
                        id="number-of-salary-movement-dropdown-{key + groupId}"
                        label="Bilangan Pergerakan Gaji"
                        value={''}
                        options={[
                            {
                                value: 1,
                                name: '1',
                            },
                            {
                                value: 2,
                                name: '2',
                            },
                            {
                                value: 3,
                                name: '3',
                            },
                        ]}
                    />
                    <DropdownSelect
                        {disabled}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="punishment-period-dropdown-{key + groupId}"
                        id="punishment-period-dropdown-{key + groupId}"
                        label="Tempoh Hukuman (Bulan)"
                        value={''}
                        options={generatePunishmentPeriodOptions()}
                    />
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of-effect-deduct-salary-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="new-kgt-date-deduct-salary-{key + groupId}"
                        label="Tarikh pergerakan KGT baru"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentDemote'}
                    <DropdownSelect
                        {disabled}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="current-gred-dropdown-{key + groupId}"
                        id="current-gred-dropdown-{key + groupId}"
                        label="Gred Semasa"
                        value={'N29'}
                        options={greds}
                    />
                    <DropdownSelect
                        {disabled}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="demote-to-gred-dropdown-{key + groupId}"
                        id="demote-to-gred-dropdown-{key + groupId}"
                        label="Gred Baru"
                        value={''}
                        options={greds}
                    />
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of-effect-demote-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                {/if}
                {#if selectedPunishment[groupId] === 'punishmentFire'}
                    <DateSelector
                        {disabled}
                        labelBlack={true}
                        name="date-of-effect-fire-{key + groupId}"
                        label="Tarikh Berkuatkuasa"
                        selectedDate={''}
                        handleDateChange={() => {}}
                    />
                {/if}
            </div>
        </form>
    </div>
{/each}
