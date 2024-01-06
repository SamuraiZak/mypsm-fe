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
        meetingRemark: longTextSchema,
    });

    export const submitMeetingResultResult = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const meetingTypeSelector = document.getElementById(
            'meetingType',
        ) as HTMLSelectElement;

        formData.append('meetingType', String(meetingTypeSelector.value));

        for (let index = 0; index < staffs.length; index++) {
            formData.append(
                'staffId' + staffs[index].noPekerja,
                String(formData.get('staffId' + staffs[index].noPekerja)),
            );
            formData.append(
                'meetingResult' + staffs[index].noPekerja,
                String(formData.get('meetingResult' + staffs[index].noPekerja)),
            );
            formData.append(
                'meetingRemark' + staffs[index].noPekerja,
                String(formData.get('meetingRemark' + staffs[index].noPekerja)),
            );
        }

        const meetingResultData = {
            meetingType: String(formData.get('meetingType')),
            meetingDate: String(formData.get('meetingDate')),
            meetingRemark: String(formData.getAll('meetingRemark')),
        };

        try {
            errorData = [];
            const result = meetingResultSchema.parse(meetingResultData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
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
            id="meetingType"
            label="Nama dan Bilangan Mesyuarat"
            dropdownType="label-left-full"
            options={meetings}
            bind:index={selectedMeetingType}
        />
        {#if errorData?.meetingType}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
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
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
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
            <input
                type="text"
                hidden
                name="staffId{value.noPekerja}"
                value={value.id}
            />
            <LongTextField
                hasError={errorData?.meetingRemark}
                name="meetingRemark"
                label="Tindakan/Ulasan Mesyuarat"
            />
            {#if errorData?.meetingRemark}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.meetingRemark[0]}</span
                >
            {/if}
            <RadioSingle
                name="meetingResult{value.noPekerja}"
                disabled={false}
                {options}
                legend="Keputusan Mesyuarat"
                userSelected={radioValue[index]}
            />
            {#if errorData?.meetingResult}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.meetingResult[0]}</span
                >
            {/if}
        </div>
    {/each}
</form>

<Toaster />
