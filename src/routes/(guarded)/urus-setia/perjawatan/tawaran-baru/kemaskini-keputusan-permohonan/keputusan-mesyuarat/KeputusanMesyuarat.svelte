<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    import { mesyuarat } from '$lib/mocks/perjawatan/tawaran-baru/mesyuarat-list'; //
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { maklumatPeribadiForm } from '$lib/mocks/profil/maklumat-peribadi';
    import { ZodError, string, z } from 'zod';
    import { json } from '@sveltejs/kit';
    import toast, { Toaster } from 'svelte-french-toast';
    import { _meetingResultSchema, _submitMeetingResultResult } from '../+page';
    import { superForm } from 'sveltekit-superforms/client';
    export let data;
    let currMeetingBat: string = mesyuarat[0].mesyuarat;
    let staffAmount: number = mesyuarat[0].jumlahKakitangan;
    let selectedMeetingType: string = meetings[0].value;
    let meetingDate: Date;
    let staffs: any[] = maklumatPeribadiForm;
    let selectedResult: { staff: string; meetingResult: boolean }[];
    let options: RadioOption[] = [
        { value: true, label: 'LULUS' },
        { value: false, label: 'TIDAK LULUS' },
    ];
    let radioValue: boolean[] = [true, false];

    selectedResult = [
        {
            staff: staffs[0].namaPenuh,
            meetingResult: radioValue[0],
        },
    ];

    let advancementMeetingBatch: {
        meetingBatch: string;
        staffCount: number;
        meetingName: string;
        meetingDate: string;
        staffResults: staffMeetingResults[];
    };

    interface staffMeetingResults {
        staffId: string;
        meetingRemark: string;
        meetingResult: string;
    }

    export const { form, errors, enhance } = superForm(data.meetingResultForm, {
        SPA: true,
        validators: _meetingResultSchema,
        async onSubmit() {
            _submitMeetingResultResult($form);
        },
    });
</script>

<em class="text-sm text-system-primary"
    >Sekiranya kakitangan tidak lulus mesyuarat, proses akan berakhir untuk
    kakitangan tersebut.</em
>
<form id="meetingResultForm" method="POST" use:enhance>
    <div class="space-y-2.5">
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
            hasError={!!$errors.meetingType}
            id="meetingType"
            label="Nama dan Bilangan Mesyuarat"
            dropdownType="label-left-full"
            options={meetings}
            bind:value={selectedMeetingType}
        />
        {#if $errors.meetingType}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.meetingType}</span
            >
        {/if}
        <TextField
            hasError={!!$errors.meetingDate}
            name="meetingDate"
            label="Tarikh Mesyuarat"
            placeholder=""
            bind:value={meetingDate}
            type="date"
        />
        {#if $errors.meetingDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.meetingDate}</span
            >
        {/if}
    </div>

    <hr class="my-2.5" />

    {#each Object.entries(staffs) as [key, value], index}
        <div class="mb-2.5 h-fit space-y-3 rounded-[3px] border p-2.5">
            <b class="w-full text-base text-system-primary"
                >{index + 1}. {value.namaPenuh} ({value.noPekerja})</b
            >
            <input
                type="text"
                hidden
                name="staffId{value.noPekerja}"
                value={value.id}
            />
            <LongTextField
                hasError={!!value.meetingRemark}
                name="meetingRemark"
                label="Tindakan/Ulasan Mesyuarat"
            />
            {#if value.meetingRemark}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{value.meetingRemark[0]}</span
                >
            {/if}
            <RadioSingle
                name="meetingResult{value.noPekerja}"
                disabled={false}
                {options}
                legend="Keputusan Mesyuarat"
                userSelected={radioValue[index]}
            />
            {#if value.noPekerja}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{value.noPekerja}</span
                >
            {/if}
        </div>
    {/each}
</form>

<Toaster />
