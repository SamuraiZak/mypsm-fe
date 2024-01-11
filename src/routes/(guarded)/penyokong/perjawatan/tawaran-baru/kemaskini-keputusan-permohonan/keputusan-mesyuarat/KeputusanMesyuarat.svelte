<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    import { mesyuarat } from '$lib/mocks/perjawatan/tawaran-baru/mesyuarat-list'; //
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { maklumatPeribadiForm } from '$lib/mocks/profil/maklumat-peribadi';
    import DateSelector from '$lib/components/input/DateSelector.svelte';

    let currMeetingBat: string = mesyuarat[0].mesyuarat;
    let staffAmount: number = mesyuarat[0].jumlahKakitangan;
    let selectedMeetingType: string = meetings[2].value;
    let meetingDate: Date;
    let staffs: any[] = maklumatPeribadiForm;
    let selectedResult: { staff: string; meetingResult: string }[];
    let errorData: any;
    let options: RadioOption[] = [
        { value: 'pass', label: 'LULUS' },
        { value: 'failed', label: 'TIDAK LULUS' },
    ];
    let radioValue: string[] = [options[0].value];
    let meetingTypeOption: any;
    let salaryMovementMonthTypeOption: string = '1';

    // export let data: MaklumatPeribadi[] = [];

    selectedResult = [
        {
            staff: staffs[0].namaPenuh,
            meetingResult: radioValue[0],
        },
    ];

    // function handleSumbit() {
    //     selectedResult.forEach((entry, index) => {
    //         // entry.staff = staffs[index].namaPenuh;
    //         // entry.meetingResult = radioValue[index];
    //         // console.table(selectedResult);
    //         console.log(entry);
    //     });
    // }
</script>

<em class="text-sm text-system-primary"
    >Sekiranya kakitangan tidak lulus mesyuarat, proses akan berakhir untuk
    kakitangan tersebut.</em
>
<form>
    <div class="space-y-2.5">
        <DropdownSelect
            disabled
            hasError={errorData?.meetingTypeOption}
            dropdownType="label-left-full"
            id="meetingTypeOption"
            label="Nama dan Bilangan Mesyuarat"
            bind:value={meetingTypeOption}
            options={[
                { value: '1', name: 'Semua' },
                { value: '2', name: '1/12' },
                { value: '3', name: '1/102' },
                { value: '4', name: '2/101' },
            ]}
        ></DropdownSelect>
        {#if errorData?.meetingTypeOption}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.meetingTypeOption[0]}</span
            >
        {/if}
        <DateSelector
            disabled
            hasError={errorData?.meetingDate}
            name="meetingDate"
            handleDateChange
            label="Tarikh Mesyuarat"
            bind:selectedDate={meetingDate}
        ></DateSelector>
        {#if errorData?.meetingDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.meetingDate[0]}</span
            >
        {/if}
        <DropdownSelect
            disabled
            hasError={errorData?.salaryMovementMonthTypeOption}
            dropdownType="label-left-full"
            id="salaryMovementMonthTypeOption"
            label="Bulan Pergerakan Gaji"
            bind:value={salaryMovementMonthTypeOption}
            options={[
                { value: '1', name: 'Januari' },
                { value: '2', name: 'April' },
                { value: '3', name: 'Julai' },
                { value: '4', name: 'Oktober' },
            ]}
        ></DropdownSelect>
        {#if errorData?.salaryMovementMonthTypeOption}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{errorData?.salaryMovementMonthTypeOption[0]}</span
            >
        {/if}
        <TextField
            label="Kumpulan Mesyuarat"
            disabled={true}
            value={currMeetingBat}
            type="text"
        />
        <TextField
            label="Jumlah Kakitangan Terlibat"
            disabled={true}
            value={staffAmount}
            type="text"
        />
        <DropdownSelect
            disabled={true}
            id="meeting-type"
            label="Nama dan Bilangan Mesyuarat"
            dropdownType="label-left-full"
            options={meetings}
            bind:index={selectedMeetingType}
        />
        <TextField
            disabled={true}
            label="Tarikh Mesyuarat"
            placeholder=""
            bind:value={meetingDate}
            type="date"
        />
    </div>

    <hr class="my-2.5" />

    {#each Object.entries(staffs) as [key, value], index}
        <div class="mb-2.5 h-fit space-y-3 rounded-[3px] border p-2.5">
            <b class="w-full text-base text-system-primary"
                >{index + 1}. {value.namaPenuh} ({value.noPekerja})</b
            >
            <LongTextField
                disabled={true}
                label="Tindakan/Ulasan Mesyuarat"
                value="Layak"
            />
            <RadioSingle
                disabled={true}
                {options}
                legend="Keputusan Mesyuarat"
                bind:userSelected={radioValue[index]}
            />
        </div>
    {/each}
</form>
