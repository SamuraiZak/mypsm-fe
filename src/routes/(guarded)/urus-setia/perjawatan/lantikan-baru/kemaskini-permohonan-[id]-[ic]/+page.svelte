<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { maklumatKegiatanTable } from '$lib/mocks/profil/maklumat-kegiatan-keahlian';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import { error } from '@sveltejs/kit';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { Badge, Tooltip } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import { ZodError, any, z } from 'zod';
    export let data;
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        employeeLists = data.record.data.map((staff) => ({
            value: staff,
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });

    export let disabled: boolean = true;

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let passerResult: string = 'passed';

    let isCertified: string = 'true';
    const certifyOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'SAH',
        },
        {
            value: 'false',
            label: 'TIDAK SAH',
        },
    ];

    function getEmployeeLeave(currentEmployeeNumber: string) {
        if (currentEmployeeNumber === '00001') {
            return '30';
        }
        if (currentEmployeeNumber === '00002') {
            return '27';
        }
        if (currentEmployeeNumber === '00003') {
            return '25';
        }
    }
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function getDurationYear(startDate: string, endDate: string) {
        let start = new Date(dateConvertor(startDate));
        let end = new Date(dateConvertor(endDate));
        let duration = end.getTime() - start.getTime();
        let year = duration / (1000 * 3600 * 24 * 365);
        return Math.ceil(year);
    }
    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    // Stepper Classes

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let isExPoliceSoldier = data.record.currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        data.record.currentEmployeeSpouse.isLKIMStaff == 'Ya'
            ? 'true'
            : 'false';
    let isKWSP =
        data.record.currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    // Radio Functions

    const faedahPersaraanOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'KWSP',
        },
        {
            value: 'false',
            label: 'Pencen',
        },
    ];
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Ya',
        },
        {
            value: 'false',
            label: 'Tidak',
        },
    ];
    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
    }
    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }

    // =========================================================================
    // function to assign the content  of the tooltip
    // =========================================================================
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';

    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'epw':
                    tooltipContent = epwTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }

    // =========================================================================
    // z validation schema and submit function for the new employment form fields
    // =========================================================================
    let errorData: any;

    const textFieldSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const dateScheme = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .optional();

    // New Employment - Service section
    const newEmploymentServiceSchema = z.object({
        currentGrade: z.enum(['FT26', 'E32', 'E38'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        position: z.enum(
            ['Pegawai Sistem Maklumat', 'Pegawai Ekonomi', 'Pegawai Komputer'],
            {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            },
        ),
        placement: z.enum(['Kuala Lumpur', 'Kuching', 'Puchong'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        serviceLevel: textFieldSchema,
        currentEmploymentDateOfEffect: dateScheme,
        pensionBenefits: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tandakan kotak semak.'
                        : defaultError,
            }),
        }),
        kwspNumber: textFieldSchema,
        socsoNumber: textFieldSchema,
        taxNumber: textFieldSchema,
        bank: textFieldSchema,
        accountNumber: textFieldSchema,
        program: z.optional(z.string()),
        leaveEntitlement: z.number({
            required_error: 'Medan ini perlu diisi',
            invalid_type_error: 'Sila tetapkan jumlah',
        }),
        govEmploymentHiredDate: dateScheme,
        lkimEmploymentHiredDate: dateScheme,
        currentEmploymentHiredDate: dateScheme,
        confirmedFirstLkimPositionData: dateScheme,
        confirmedCurrentLkimPositionData: dateScheme,
        approvedPreviousServiceMergingDate: z.optional(z.coerce.date()),
        currentActing: z.optional(z.coerce.date()),
        currentInterim: z.optional(z.coerce.date()),
        pensionScheme: z.optional(z.string()),
        finalIncreament: z.optional(z.coerce.date()),
        finalPromotion: z.optional(z.coerce.date()),
        kgtMonth: z.string().optional(),
        retirementDate: dateScheme,
        salaryDateOfEffect: dateScheme,
        salaryBenchmark: textFieldSchema,
        salary: textFieldSchema,
        itka: textFieldSchema,
        itp: textFieldSchema,
        epw: textFieldSchema,
        cola: textFieldSchema,
    });

    const submitNewEmploymentServiceForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const gredSelector = document.getElementById(
            'currentGrade',
        ) as HTMLSelectElement;
        const positionSelector = document.getElementById(
            'position',
        ) as HTMLSelectElement;
        const placementSelector = document.getElementById(
            'placement',
        ) as HTMLSelectElement;

        console.log('formData Value: ', formData);

        const newEmploymentServiceData = {
            currentGrade: String(gredSelector.value),
            position: String(positionSelector.value),
            placement: String(placementSelector.value),
            serviceLevel: String(formData.get('serviceLevel')),
            currentEmploymentDateOfEffect: String(
                formData.get('currentEmploymentDateOfEffect'),
            ),
            pensionBenefits: String(formData.get('pensionBenefits')),
            kwspNumber: String(formData.get('kwspNumber')),
            socsoNumber: String(formData.get('socsoNumber')),
            taxNumber: String(formData.get('taxNumber')),
            bank: String(formData.get('bank')),
            accountNumber: String(formData.get('accountNumber')),
            program: String(formData.get('program')),
            leaveEntitlement: Number(formData.get('leaveEntitlement')),
            govEmploymentHiredDate: String(
                formData.get('govEmploymentHiredDate'),
            ),
            lkimEmploymentHiredDate: String(
                formData.get('lkimEmploymentHiredDate'),
            ),
            currentEmploymentHiredDate: String(
                formData.get('currentEmploymentHiredDate'),
            ),
            confirmedFirstLkimPositionData: String(
                formData.get('confirmedFirstLkimPositionData'),
            ),
            confirmedCurrentLkimPositionData: String(
                formData.get('confirmedCurrentLkimPositionData'),
            ),
            approvedPreviousServiceMergingDate: String(
                formData.get('approvedPreviousServiceMergingDate'),
            ),
            currentActing: String(formData.get('currentActing')),
            currentInterim: String(formData.get('currentInterim')),
            pensionScheme: String(formData.get('pensionScheme')),
            finalIncreament: String(formData.get('finalIncreament')),
            finalPromotion: String(formData.get('finalPromotion')),
            kgtMonth: String(formData.get('kgtMonth')),
            retirementDate: String(formData.get('retirementDate')),
            salaryDateOfEffect: String(formData.get('salaryDateOfEffect')),
            salaryBenchmark: String(formData.get('salaryBenchmark')),
            salary: String(formData.get('salary')),
            itka: String(formData.get('itka')),
            itp: String(formData.get('itp')),
            epw: String(formData.get('epw')),
            cola: String(formData.get('cola')),
        };

        try {
            const result = newEmploymentServiceSchema.parse(
                newEmploymentServiceData,
            );
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

    // New Employment - Secretary Result section
    const newEmploymentSecretarySchema = z.object({
        employmentSecretaryRemark: longTextSchema,
        employmentSecretaryResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    const submitNewEmploymentSecretaryResult = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const newEmploymentSecretaryResultData = {
            employmentSecretaryRemark: String(
                formData.get('employmentSecretaryRemark'),
            ),
            employmentSecretaryResult: String(
                formData.get('employmentSecretaryResult'),
            ),
        };

        try {
            const result = newEmploymentSecretarySchema.parse(
                newEmploymentSecretaryResultData,
            );
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

    // New Employment - Assign Approver & Supporter section
    const newEmploymentAssignApproverSupporterSchema = z.object({
        staffSupporter: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
        staffApprover: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
    });

    const submitNewEmploymentAssignApproverSupporter = async () => {
        const staffSupporterSelector = document.getElementById(
            'staffSupporter',
        ) as HTMLSelectElement;
        const staffApproverSelector = document.getElementById(
            'staffApprover',
        ) as HTMLSelectElement;

        const newEmploymentSecretaryResultData = {
            staffSupporter: String(staffSupporterSelector.value),
            staffApprover: String(staffApproverSelector.value),
        };

        try {
            const result = newEmploymentAssignApproverSupporterSchema.parse(
                newEmploymentSecretaryResultData,
            );
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                setTimeout(() => goto('../lantikan-baru'), 1500);
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

<ContentHeader
    title="Maklumat Lantikan Baru {data.record.currentEmployee.name}"
    description=""
    ><FormButton
        type="close"
        onClick={() => {
            goto('../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <!-- <TextField
                    {disabled}
                    name="noPerkeja"
                    label={'No. Pekerja'}
                    value={currentEmployee.employeeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="statusPekerjaan"
                    label={'Status Pekerjaan'}
                    value={currentEmployeeStatus.name}
                ></TextField> -->
                <TextField
                    {disabled}
                    name="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployee.identityDocumentNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaPenuh"
                    label={'Nama Penuh'}
                    value={data.record.currentEmployee.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaLain"
                    label={'Nama Lain'}
                    value={data.record.currentEmployee.alternativeName}
                ></TextField>
                <TextField
                    {disabled}
                    name="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployee.isMalaysian,
                    )}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Lahir'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployee.birthDate,
                    ).toString()}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="tempatLahir"
                    label={'Tempat Lahir'}
                    value={data.record.currentEmployeeBirthState.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="warganegara"
                    label={'Warganegara'}
                    value={data.record.currentEmployee.isMalaysian
                        ? 'Malaysia'
                        : 'Bukan'}
                ></TextField>
                <TextField
                    {disabled}
                    name="bangsa"
                    label={'Bangsa'}
                    value={data.record.currentEmployeeRace.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="agama"
                    label={'Agama'}
                    value={data.record.currentEmployeeReligion.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="jantina"
                    label={'Jantina'}
                    value={data.record.currentEmployee.gender}
                ></TextField>
                <TextField
                    {disabled}
                    name="status"
                    label={'Status'}
                    value={data.record.currentEmployee.marital}
                ></TextField>
                <TextField
                    {disabled}
                    name="emel"
                    label={'Emel'}
                    value={data.record.currentEmployee.email}
                ></TextField>
                <LongTextField
                    {disabled}
                    name="alamatRumah"
                    label={'Alamat Rumah'}
                    value={data.record.currentEmployee.homeAddress}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    name="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                    value={data.record.currentEmployee.mailAddress}
                ></LongTextField>
                <TextField
                    {disabled}
                    name="perumahan"
                    label={'Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    name="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    name="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    value={'-'}
                ></TextField>
                <RadioSingle
                    {disabled}
                    {options}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={isExPoliceSoldier}
                ></RadioSingle>
            </div>

            <div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>
                    Maklumat Pertalian Dengan Kakitangan LKIM
                </p>

                <!-- kakitanganLKIM? -->
                <RadioSingle
                    {options}
                    {disabled}
                    legend={'Perhubungan Dengan Kakitangan LKIM'}
                    bind:userSelected={isInRelationshipWithLKIMStaff}
                ></RadioSingle>
                {#if isInRelationshipWithLKIMStaff === 'true'}
                    <TextField
                        {disabled}
                        name="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        value={data.record.currentEmployeeSpouseEmployeeInfo
                            ?.employeeNumber}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.name}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                        value={data.record.currentEmployeeSpouse.position}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="hubungan"
                        label={'Hubungan'}
                        value={data.record.currentEmployeeSpouse.relationship}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each data.record.currentEmployeeEducations as edu, i}
                    <p class={stepperFormTitleClass}>
                        {edu.type}
                    </p>
                    <TextField
                        {disabled}
                        name="sekolah"
                        label={'Sekolah'}
                        value={edu.instituteName}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="tahunHabis"
                        label={'Tahun'}
                        value={edu.completionYear}
                    ></TextField>
                    <TextField
                        {disabled}
                        name="gredSekolah"
                        label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                        value={edu.finalGrade}
                    ></TextField>
                    {#if edu.type == 'Ijazah'}
                        <TextField
                            {disabled}
                            name="bidang"
                            label={'Bidang'}
                            value={edu.course}
                        ></TextField>
                        <AccordianField
                            disabled={!disabled}
                            label="Catatan"
                            header="Catatan"
                        >
                            {#each edu.remark as val, i}
                                <label
                                    for=""
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                        ? 'text-txt-tertiary'
                                        : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                    >{i + 1}. {val}</label
                                >
                            {/each}
                        </AccordianField>
                    {/if}
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#each data.record.currentEmployeeExperience as item, i}
                    <p class={stepperFormTitleClass}>
                        Maklumat Pengalaman #{i + 1}
                    </p>
                    {#if item.company !== '-'}
                        <TextField
                            {disabled}
                            name="namaMajikan"
                            label={'Nama Majikan'}
                            value={item.company}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                (state) => state.id === item.stateId,
                            )?.name}, {item.country}"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="jawatan"
                            label={'Jawatan'}
                            value={item.position}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value={item.grade}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value={getDurationYear(
                                item.startDate,
                                item.endDate,
                            ).toString()}
                        ></TextField>
                        <TextField
                            {disabled}
                            name="gaji"
                            label={'Gaji'}
                            value={CurrencyHelper.formatCurrency(parseInt(item.salary))}
                        ></TextField>
                    {:else}
                        <TextField
                            {disabled}
                            name="namaMajikan"
                            label={'Nama Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="alamatMajikan"
                            label={'Alamat Majikan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="jawatan"
                            label={'Jawatan'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="kodJawatan"
                            label={'Kod Jawatan (Jika ada)'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="tempohPerkhidmatan"
                            label={'Tempoh Perkhidmatan (Tahun)'}
                            value="-"
                        ></TextField>
                        <TextField
                            {disabled}
                            name="gaji"
                            label={'Gaji'}
                            value="-"
                        ></TextField>{/if}
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tanggungan Selain Isteri dan Anak"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <TextField
                    {disabled}
                    name="namaWaris"
                    label={'Nama Waris'}
                    value={data.record.currentEmployeeNextOfKins.name}
                ></TextField>
                <TextField
                    {disabled}
                    name="noKP"
                    label={'No. Kad Pengenalan'}
                    value={data.record.currentEmployeeNextOfKins
                        .identityDocumentNumber}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label="Tarikh Lahir"
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeNextOfKins.birthDate,
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="hubungan"
                    label={'Hubungan Dengan Waris'}
                    value={data.record.currentEmployeeNextOfKins.relationship}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    {disabled}
                    label={'Tarikh Kahwin (Jika berkenaan)'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeNextOfKins.marriageDate !==
                            undefined
                            ? data.record.currentEmployeeNextOfKins.marriageDate
                            : '',
                    )}
                ></DateSelector>
                <TextField
                    {disabled}
                    name="warnaKP"
                    label={'Warna Kad Pengenalan'}
                    value={isBlueOrRedIC(
                        data.record.currentEmployeeNextOfKins.isMalaysian,
                    )}
                ></TextField>
                <TextField
                    {disabled}
                    name="telefonRumah"
                    label={'Telefon (R)'}
                    value={data.record.currentEmployeeNextOfKins.homeNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="telefonPeribadi"
                    label={'Telefon (P)'}
                    value={data.record.currentEmployeeNextOfKins.mobileNumber}
                ></TextField>
                <TextField
                    {disabled}
                    name="pekerjaan"
                    label={'Pekerjaan'}
                    value={data.record.currentEmployeeNextOfKins.position}
                ></TextField>
                <TextField
                    {disabled}
                    name="namaMajikan"
                    label={'Nama Majikan'}
                    value={data.record.currentEmployeeNextOfKins.company}
                ></TextField>
                <LongTextField
                    {disabled}
                    name="alamatMajikan"
                    label={'Alamat Majikan'}
                    value={data.record.currentEmployeeNextOfKins.companyAddress}
                ></LongTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
                {#each data.record.currentEmployeeUploadedDocuments as item, i}
                    <div
                        class="flex w-full flex-row items-center justify-between"
                    >
                        <label
                            for=""
                            class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                            >{i + 1}.</label
                        >
                        <DownloadAttachment fileName={item.documentPath}
                        ></DownloadAttachment>
                    </div>
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru"
            ><TextIconButton
                primary
                label="Simpan"
                form="newEmploymentServiceForm"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
            <form
                id="newEmploymentServiceForm"
                on:submit={submitNewEmploymentServiceForm}
                class="flex w-full flex-col gap-2.5"
            >
                <DropdownSelect
                    hasError={errorData?.currentGrade}
                    dropdownType="label-left-full"
                    id="currentGrade"
                    label="Gred Semasa"
                    bind:value={data.record.currentEmployeeGrade.code}
                    options={[
                        { value: 'FT26', name: 'FT26' },
                        { value: 'E32', name: 'E32' },
                        { value: 'E38', name: 'E38' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.currentGrade}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.currentGrade[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={errorData?.position}
                    dropdownType="label-left-full"
                    id="position"
                    label="Jawatan"
                    bind:value={data.record.currentEmployeePosition.name}
                    options={[
                        {
                            value: 'Pegawai Sistem Maklumat',
                            name: 'Pegawai Sistem Maklumat',
                        },
                        { value: 'Pegawai Ekonomi', name: 'Pegawai Ekonomi' },
                        { value: 'Pegawai Komputer', name: 'Pegawai Komputer' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.position}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.position[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={errorData?.placement}
                    dropdownType="label-left-full"
                    id="placement"
                    label="Penempatan"
                    bind:value={data.record.currentEmployeeService.placement}
                    options={[
                        { value: 'Kuala Lumpur', name: 'Kuala Lumpur' },
                        { value: 'Kuching', name: 'Kuching' },
                        { value: 'Puchong', name: 'Puchong' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.placement}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.placement[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={errorData?.serviceLevel}
                    dropdownType="label-left-full"
                    id="serviceLevel"
                    label="Taraf Perkhidmatan"
                    bind:value={data.record.currentEmployeeServiceType.name}
                    options={[
                        {
                            value: 'TETAP',
                            name: 'TETAP',
                        },
                    ]}
                ></DropdownSelect>
                {#if errorData?.serviceLevel}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.serviceLevel[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.currentEmploymentDateOfEffect}
                    name="currentEmploymentDateOfEffect"
                    disabled={false}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.currentEmploymentDateOfEffect}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.currentEmploymentDateOfEffect[0]}</span
                    >
                {/if}
                <RadioSingle
                    disabled={false}
                    name="pensionBenefits"
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                    bind:userSelected={isKWSP}
                ></RadioSingle>
                {#if errorData?.pensionBenefits}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.pensionBenefits[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.kwspNumber}
                    name="kwspNumber"
                    label={'No. KWSP'}
                    value={'1234-5678-9012'}
                ></TextField>
                {#if errorData?.kwspNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.kwspNumber[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.socsoNumber}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    value={'1234-5678-9012'}
                ></TextField>
                {#if errorData?.socsoNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.socsoNumber[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.taxNumber}
                    name="taxNumber"
                    label={'No. Cukai (LHDN)'}
                    value={'1234-5678-9012'}
                ></TextField>
                {#if errorData?.taxNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.taxNumber[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.bank}
                    name="bank"
                    label={'Bank'}
                    value={'Maybank Berhad'}
                ></TextField>
                {#if errorData?.bank}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.bank[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.accountNumber}
                    name="accountNumber"
                    label={'No. Akaun'}
                    value={'1234-5678-9012'}
                ></TextField>
                {#if errorData?.accountNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.accountNumber[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.program}
                    name="program"
                    label={'Program'}
                    value={'-'}
                ></TextField>
                {#if errorData?.program}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.program[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.leaveEntitlement}
                    name="leaveEntitlement"
                    label={'Kelayakan Cuti'}
                    value={getEmployeeLeave(
                        data.record.currentEmployee.employeeNumber,
                    )}
                ></TextField>
                {#if errorData?.leaveEntitlement}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.leaveEntitlement[0]}</span
                    >
                {/if}

                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.govEmploymentHiredDate}
                    name="govEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.govEmploymentHiredDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.govEmploymentHiredDate[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.lkimEmploymentHiredDate}
                    name="lkimEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.lkimEmploymentHiredDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.lkimEmploymentHiredDate[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.currentEmploymentHiredDate}
                    name="currentEmploymentHiredDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.currentEmploymentHiredDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.currentEmploymentHiredDate[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.confirmedFirstLkimPositionData}
                    name="confirmedFirstLkimPositionData"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.confirmedFirstLkimPositionData}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.confirmedFirstLkimPositionData[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.confirmedCurrentLkimPositionData}
                    name="confirmedCurrentLkimPositionData"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.currentServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.confirmedCurrentLkimPositionData}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.confirmedCurrentLkimPositionData[0]}</span
                    >
                {/if}

                <AccordianField
                    disabled={!disabled}
                    label="Sejarah Lantikan Jawatan LKIM"
                    header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                >
                    {#each data.record.currentEmployeePositionHistory as item, i}
                        <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{i + 1}. {mockLookupGrades.find(
                                (grade) => grade.id === item.gradeId,
                            )?.code}, {mockLookupPositions.find(
                                (position) => position.gradeId === item.gradeId,
                            )?.name}, {item.startDate}, {item.startDate}
                        </label>
                    {/each}
                </AccordianField>
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.approvedPreviousServiceMergingDate}
                    name="approvedPreviousServiceMergingDate"
                    disabled={false}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeeService.firstServiceDate,
                    )}
                ></DateSelector>
                {#if errorData?.approvedPreviousServiceMergingDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData
                            ?.approvedPreviousServiceMergingDate[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.currentActing}
                    name="currentActing"
                    disabled={false}
                    label={'Pemangkuan Sekarang'}
                    selectedDate={''}
                ></DateSelector>
                {#if errorData?.currentActing}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.currentActing[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.currentInterim}
                    name="currentInterim"
                    disabled={false}
                    label={'Tanggung Kerja Sekarang'}
                    selectedDate={''}
                ></DateSelector>
                {#if errorData?.currentInterim}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.currentInterim[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.pensionScheme}
                    name="pensionScheme"
                    label={'Skim Pencen'}
                    value={'-'}
                ></TextField>
                {#if errorData?.pensionScheme}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.pensionScheme[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.finalIncreament}
                    name="finalIncreament"
                    disabled={false}
                    label={'Kenaikan Gaji Akhir'}
                    selectedDate={''}
                ></DateSelector>
                {#if errorData?.finalIncreament}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.finalIncreament[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.finalPromotion}
                    name="finalPromotion"
                    disabled={false}
                    label={'Kenaikan Pangkat Akhir'}
                    selectedDate={''}
                ></DateSelector>
                {#if errorData?.finalPromotion}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.finalPromotion[0]}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={errorData?.kgtMonth}
                    name="kgtMonth"
                    label={'Bulan KGT'}
                    value={'-'}
                ></TextField>
                {#if errorData?.kgtMonth}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.kgtMonth[0]}</span
                    >
                {/if}
                <DateSelector
                    {handleDateChange}
                    hasError={errorData?.retirementDate}
                    name="retirementDate"
                    disabled={false}
                    label={'Tarikh Bersara'}
                    selectedDate={dateFormatter(
                        data.record.currentEmployeePensions.retiredDate,
                    )}
                ></DateSelector>
                {#if errorData?.retirementDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.retirementDate[0]}</span
                    >
                {/if}
                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <TextField
                            disabled={false}
                            hasError={errorData?.salaryDateOfEffect}
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            value={'12/12/2021'}
                        ></TextField>
                        {#if errorData?.salaryDateOfEffect}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.salaryDateOfEffect}</span
                            >
                        {/if}
                        <TextField
                            disabled={false}
                            hasError={errorData?.salaryBenchmark}
                            name="salaryBenchmark"
                            label={'Tangga Gaji'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                        {#if errorData?.salaryBenchmark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.salaryBenchmark}</span
                            >
                        {/if}
                        <TextField
                            disabled={false}
                            hasError={errorData?.salary}
                            name="salary"
                            label={'Gaji Pokok'}
                            value={CurrencyHelper.formatCurrency(1234.56)}
                        ></TextField>
                        {#if errorData?.salary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.salary}</span
                            >
                        {/if}
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={false}
                            hasError={errorData?.itka}
                            name="itka"
                            label={'ITKA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        {#if errorData?.itka}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.itka}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={false}
                            hasError={errorData?.itp}
                            name="itp"
                            label={'ITP'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        {#if errorData?.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.itp}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={false}
                            hasError={errorData?.epw}
                            name="epw"
                            label={'EPW'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        {#if errorData?.epw}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.epw}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={false}
                            hasError={errorData?.cola}
                            name="cola"
                            label={'COLA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        {#if errorData?.cola}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.cola}</span
                            >
                        {/if}
                        <!-- Tooltip body -->
                        <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        >
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Keputusan Lantikan Baru (Urus Setia Perjawatan)"
            ><TextIconButton
                primary
                label="Simpan"
                form="newEmploymentSecretaryResultForm"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="newEmploymentSecretaryResultForm"
                on:submit|preventDefault={submitNewEmploymentSecretaryResult}
                class="flex w-full flex-col gap-2.5"
            >
                <div class="mb-5">
                    <b class="text-sm text-system-primary"
                        >Keputusan Urus Setia Perjawatan</b
                    >
                </div>
                <LongTextField
                    hasError={errorData?.employmentSecretaryRemark}
                    name="employmentSecretaryRemark"
                    label="Tindakan/Ulasan"
                    value=""
                ></LongTextField>
                {#if errorData?.employmentSecretaryRemark}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.employmentSecretaryRemark[0]}</span
                    >
                {/if}

                <RadioSingle
                    name="employmentSecretaryResult"
                    disabled={false}
                    options={certifyOptions}
                    legend={'Keputusan'}
                    bind:userSelected={isCertified}
                ></RadioSingle>
                {#if errorData?.employmentSecretaryResult}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.employmentSecretaryResult[0]}</span
                    >
                {/if}
            </form>
            <hr />
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)"
            ><TextIconButton
                primary
                label="Simpan"
                form="newEmploymentAssignApproverSupporterForm"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="newEmploymentAssignApproverSupporterForm"
                on:submit|preventDefault={submitNewEmploymentAssignApproverSupporter}
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    hasError={errorData?.staffSupporter}
                    id="staffSupporter"
                    label="Nama Penyokong"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:value={selectedSupporter}
                />
                {#if errorData?.staffSupporter}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.staffSupporter[0]}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={errorData?.staffApprover}
                    id="staffApprover"
                    label="Nama Pelulus"
                    dropdownType="label-left-full"
                    options={employeeLists}
                    bind:value={selectedApprover}
                />
                {#if errorData?.staffApprover}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.staffApprover[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan daripada Peranan - Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Penyokong</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="supporter-name"
                        label="Nama"
                        value="Mohd Rahim Ismail"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="supporter-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="supporter-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'supported'
                                ? 'green'
                                : 'red'}>{results[3].name}</Badge
                        >
                    </div>
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Pelulus</b>
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="approver-name"
                        label="Nama"
                        value="Mohd Safwan Adam"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="approver-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="approver-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'passed' ? 'green' : 'red'}
                            >{results[0].name}</Badge
                        >
                    </div>
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Urus Setia Perjawatan</b
                        >
                    </div>
                    <TextField
                        disabled
                        type="text"
                        name="service-secretary-name"
                        label="Nama"
                        value="Ikhwan bin Salem"
                    ></TextField>
                    <LongTextField
                        disabled
                        name="service-secretary-remark"
                        label="Tindakan/Ulasan"
                        value="Layak"
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="service-secretary-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge
                            border
                            color={passerResult == 'passed' ? 'green' : 'red'}
                            >{results[0].name}</Badge
                        >
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat ID MyPSM"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    name="staff-number"
                    label={'No. Pekerja (Dijana secara automatik)'}
                    value={data.record.currentEmployee.employeeNumber}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
