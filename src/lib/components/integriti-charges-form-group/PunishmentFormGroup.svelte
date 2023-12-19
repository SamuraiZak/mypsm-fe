<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import EmolumentDepriveDay from '$lib/components/integriti-charges-form-group/EmolumentDepriveDay.svelte';
    import { greds } from '$lib/mocks/gred/gred';
    export let result: proceedingResult;
    export let key: string;
    export let disabled: boolean = true;

    function getPunishmentType(punishment: punishmentType | undefined) {
        // Add your logic to get the correct punishment type based on the key
        // For example:
        if ('punishmentNameWarning' in punishment!) {
            return 'punishmentWarning';
        } else if ('punishmentNamePenalty' in punishment!) {
            return 'punishmentPenalty';
        } else if ('punishmentNameEmolumentDeprivation' in punishment!) {
            return 'punishmentEmolumentDeprivation';
        } else if ('punishmentNameSalaryMovementDelay' in punishment!) {
            return 'punishmentSalaryMovementDelay';
        } else if ('punishmentNameDeductSalary' in punishment!) {
            return 'punishmentDeductSalary';
        } else if ('punishmentNameDemote' in punishment!) {
            return 'punishmentDemote';
        } else if ('punishmentNameFirey' in punishment!) {
            return 'punishmentFire';
        }
        // Add more conditions for other types
    }
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
</script>

{#each Object.entries(result.punishments) as [punishmentId, punishment], index}
    <SectionHeader color="system-primary" title="Hukuman #{index + 1}"
    ></SectionHeader>
    <div class="flex w-full flex-col items-center gap-2.5 text-base">
        <DropdownSelect
            {disabled}
            labelBlack={true}
            dropdownType="label-left-full"
            name="punishment-type-dropdown-{key + punishmentId}"
            id="punishment-type-dropdown-{key + punishmentId}"
            label="Jenis Hukuman"
            value={getPunishmentType(punishment)}
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
                {#if punishment}
                    {#if 'punishmentNameWarning' in punishment}
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of-effect-warning-{key + punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectWarning}
                            handleDateChange={() => {}}
                        />
                    {/if}
                    {#if 'punishmentNamePenalty' in punishment}
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of effect-penalty-{key + punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectPenalty}
                        />
                        <TextField
                            {disabled}
                            type="number"
                            id="emolument-deprived-days-name-{key +
                                punishmentId}"
                            label="Hari Emolumen"
                            placeholder="1 - 7 Hari"
                            bind:value={punishment.emolumentDaysPenalty}
                        ></TextField>
                    {/if}
                    {#if 'punishmentNameEmolumentDeprivation' in punishment}
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of-effect-penalty-{key + punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectEmolumentDeprivation}
                            handleDateChange={() => {}}
                        />
                        <TextField
                            {disabled}
                            type="number"
                            id="emolument-deprived-days-name-{key +
                                punishmentId}"
                            label="Hari Emolumen"
                            placeholder="Tiada Had Hari"
                            value={punishment.emolumentDaysEmolumentDeprivation}
                        ></TextField>
                        <div class="border-l-4 border-r-4 px-2.5">
                            <SectionHeader
                                subTitle="Tarikh Dilucutkan Hak Emolumen"
                            ></SectionHeader>
                            {#each Object.entries(punishment.depriveDatesEmolumentDeprivation) as [depriveDateId, group], index}
                                <div
                                    class="flex w-full flex-row items-center gap-x-2.5 text-base"
                                >
                                    <span class="w-[220px] text-sm italic"
                                        >Tarikh #{index + 1}.</span
                                    >
                                    <EmolumentDepriveDay bind:group />
                                </div>
                            {/each}
                        </div>
                    {/if}
                    {#if 'punishmentNameSalaryMovementDelay' in punishment}
                        <DropdownSelect
                            {disabled}
                            labelBlack={true}
                            dropdownType="label-left-full"
                            name="month-count-salary-movement-suspension-dropdown-{key +
                                punishmentId}"
                            id="month-count-salary-movement-suspension-dropdown-{key +
                                punishmentId}"
                            label="Tempoh Bulan Tangguh Pergerakan Gaji"
                            value={punishment.monthsOfDelaysSalaryMovementDelay}
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
                                punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectSalaryMovementDelay}
                            handleDateChange={() => {}}
                        />
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="new-kgt-date-{key + punishmentId}"
                            label="Tarikh pergerakan KGT baru"
                            selectedDate={punishment.newKgtDateSalaryMovementDelay}
                            handleDateChange={() => {}}
                        />
                    {/if}
                    {#if 'punishmentNameDeductSalary' in punishment}
                        <DropdownSelect
                            {disabled}
                            labelBlack={true}
                            dropdownType="label-left-full"
                            name="number-of-salary-movement-dropdown-{key +
                                punishmentId}"
                            id="number-of-salary-movement-dropdown-{key +
                                punishmentId}"
                            label="Bilangan Pergerakan Gaji"
                            value={punishment.salaryMovementCountsDeductSalary}
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
                            name="punishment-period-dropdown-{key +
                                punishmentId}"
                            id="punishment-period-dropdown-{key + punishmentId}"
                            label="Tempoh Hukuman (Bulan)"
                            value={punishment.punishmentPeriodDeductSalary}
                            options={generatePunishmentPeriodOptions()}
                        />
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of-effect-deduct-salary-{key +
                                punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectDeductSalary}
                            handleDateChange={() => {}}
                        />
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="new-kgt-date-deduct-salary-{key +
                                punishmentId}"
                            label="Tarikh pergerakan KGT baru"
                            selectedDate={punishment.newKgtDateDeductSalary}
                            handleDateChange={() => {}}
                        />
                    {/if}
                    {#if 'punishmentNameDemote' in punishment}
                        <DropdownSelect
                            {disabled}
                            labelBlack={true}
                            dropdownType="label-left-full"
                            name="current-gred-dropdown-{key + punishmentId}"
                            id="current-gred-dropdown-{key + punishmentId}"
                            label="Gred Semasa"
                            value={punishment.currentGredDemote}
                            options={greds}
                        />
                        <DropdownSelect
                            {disabled}
                            labelBlack={true}
                            dropdownType="label-left-full"
                            name="demote-to-gred-dropdown-{key + punishmentId}"
                            id="demote-to-gred-dropdown-{key + punishmentId}"
                            label="Gred Baru"
                            value={punishment.demoteToDemote}
                            options={greds}
                        />
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of-effect-demote-{key + punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectDemote}
                            handleDateChange={() => {}}
                        />
                    {/if}
                    {#if 'punishmentNameFire' in punishment}
                        <DateSelector
                            {disabled}
                            labelBlack={true}
                            name="date-of-effect-fire-{key + punishmentId}"
                            label="Tarikh Berkuatkuasa"
                            selectedDate={punishment.dateOfEffectFire}
                            handleDateChange={() => {}}
                        />
                    {/if}
                {/if}
            </div>
        </form>
    </div>
{/each}
