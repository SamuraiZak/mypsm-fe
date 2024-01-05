<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    import { mesyuarat } from '$lib/mocks/perjawatan/tawaran-baru/mesyuarat-list'; //
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { maklumatPeribadiForm } from '$lib/mocks/profil/maklumat-peribadi';
    import { ZodError, z } from 'zod';

    let currMeetingBat: string = mesyuarat[0].mesyuarat;
    let staffAmount: number = mesyuarat[0].jumlahKakitangan;
    let selectedMeetingType: string = meetings[0].value;
    let meetingDate: Date;
    let staffs: any[] = maklumatPeribadiForm;
    let selectedResult: { staff: string; meetingResult: string }[];
    let options: RadioOption[] = [
        { value: 'pass', label: 'LULUS' },
        { value: 'failed', label: 'TIDAK LULUS' },
    ];
    let radioValue: string[] = [options[0].value];
    // export let data: MaklumatPeribadi[] = [];

    selectedResult = [
        {
            staff: staffs[0].namaPenuh,
            meetingResult: radioValue[0],
        },
    ];

    // =========================================================================
    // z validation schema and submit function for the new employment form fields
    // =========================================================================
    let errorData: any;

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const dateSchema = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .optional();

    // New Employment - Secretary Result section
    const meetingResultSchema = z.object({
        meetingType: z.string().min(1, { message: 'Sila pilih pilihan anda.' }),
        meetingDate: dateSchema,
    });

    export const submitMeetingResultResult = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const meetingTypeSelector = document.getElementById(
            'meetingType',
        ) as HTMLSelectElement;

        const meetingResultData = {
            meetingType: String(meetingTypeSelector.value),
            meetingDate: String(formData.get('meetingDate')),
        };

        try {
            const result = meetingResultSchema.parse(meetingResultData);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
            }
        }
    };
</script>

<em class="text-sm text-system-primary"
    >Sekiranya kakitangan tidak lulus mesyuarat, proses akan berakhir untuk
    kakitangan tersebut.</em
>
<form
    id="meetingResultForm"
    on:submit|preventDefault={submitMeetingResultResult}
>
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
            hasError={errorData?.meetingType}
            name="meetingType"
            label="Nama dan Bilangan Mesyuarat"
            dropdownType="label-left-full"
            options={meetings}
            bind:index={selectedMeetingType}
        />
        {#if errorData?.meetingType}
            <span class="font-sans text-sm italic text-system-danger"
                >{errorData?.meetingType[0]}</span
            >
        {/if}
        <TextField
            hasError={errorData?.meetingDate}
            name="meetingDate"
            label="Tarikh Mesyuarat"
            placeholder=""
            bind:value={meetingDate}
            type="date"
        />
        {#if errorData?.meetingDate}
            <span class="font-sans text-sm italic text-system-danger"
                >{errorData?.meetingDate[0]}</span
            >
        {/if}
    </div>

    <hr class="my-2.5" />

    {#each Object.entries(staffs) as [key, value], index}
        <div class="mb-2.5 h-fit space-y-3 rounded-[3px] border p-2.5">
            <b class="w-full text-base text-system-primary"
                >{index + 1}. {value.namaPenuh} ({value.noPekerja})</b
            >
            <LongTextField label="Tindakan/Ulasan Mesyuarat" />
            <RadioSingle
                disabled={false}
                {options}
                legend="Keputusan Mesyuarat"
                bind:userSelected={radioValue[index]}
            />
        </div>
    {/each}
</form>
