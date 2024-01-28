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
    import { superForm } from 'sveltekit-superforms/client';
    import { ZodError, any, z } from 'zod';
    import type { PageData } from './$types';
    import { _serviceInfoSchema, _submitServiceInfoForm } from './+page';
    import type { CandidatePersonalData } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-personal-details-respone.model';
    export let data: PageData;
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    const personalDetails: CandidatePersonalData =
        data.personalDetailResponse.data;

    let isSuccessPersonalFormResponse: boolean =
        data.personalDetailResponse.status === 201;
    let isReadonlyPersonalFormStepper: boolean =
        data.personalDetailResponse?.data?.isReadonly;

    let isSuccessAcademicFormResponse: boolean =
        data.academicInfoResponse.status === 201;
    let isReadonlyAcademicFormStepper: boolean =
        data.academicInfoResponse?.data?.isReadonly;

    let isSuccessExperienceFormResponse: boolean =
        data.experienceInfoResponse.status === 201;
    let isReadonlyExperienceFormStepper: boolean =
        data.experienceInfoResponse?.data?.isReadonly;

    let isSuccessActivityFormResponse: boolean =
        data.activityInfoResponse.status === 201;
    let isReadonlyActivityFormStepper: boolean =
        data.activityInfoResponse?.data?.isReadonly;

    let isSuccessFamilyFormResponse: boolean =
        data.familyInfoResponse.status === 201;
    let isReadonlyFamilyFormStepper: boolean =
        data.familyInfoResponse?.data?.isReadonly;

    let isSuccessDependencyFormResponse: boolean =
        data.dependencyInfoResponse.status === 201;
    let isReadonlyDependencyFormStepper: boolean =
        data.dependencyInfoResponse?.data?.isReadonly;

    let isSuccessNextOfKinFormResponse: boolean =
        data.nextOfKinInfoResponse.status === 201;
    let isReadonlyNextOfKinFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.isReadonly;

    let isSuccessDocumentFormResponse: boolean =
        data.nextOfKinInfoResponse.status === 201;
    let isReadonlyDocumentFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.isReadonly;

    let isSuccessServiceFormResponse: boolean =
        data.nextOfKinInfoResponse.status === 201;
    let isReadonlyServiceFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.isReadonly;

    onMount(async () => {
        employeeLists = data.data.map((staff) => ({
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

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    // Stepper Classes

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let isExPoliceSoldier = data.currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        data.currentEmployeeSpouse.isLKIMStaff == 'Ya' ? 'true' : 'false';
    let isKWSP = data.currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

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

    const {
        form: serviceInfoForm,
        errors: serviceInfoErrors,
        enhance: serviceInfoEnhance,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        validators: _serviceInfoSchema,
        onSubmit() {
            _submitServiceInfoForm($serviceInfoForm);
        },
    });
</script>

<ContentHeader
    title="Maklumat Lantikan Baru {data.currentEmployee.name}"
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
        <StepperContentHeader title="Maklumat Peribadi" />
        <StepperContentBody>
            {#if isSuccessPersonalFormResponse}
                <div class="flex w-full flex-col gap-2.5">
                    <!-- Maklumat Peribadi -->
                    <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="name"
                        label={'Nama Penuh'}
                        type="text"
                        bind:value={personalDetails.name}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="alternativeName"
                        label={'Nama Lain'}
                        type="text"
                        bind:value={personalDetails.alternativeName}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="identityDocumentNumber"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={personalDetails.identityDocumentNumber}
                    ></TextField>

                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="titleId"
                        name="titleId"
                        label="Gelaran"
                        bind:value={personalDetails.titleId}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    <!-- <DrodownSelect
                disabled={isReadonlyPersonalFormStepper}
                dropdownType="label-left-full"
                id="identityDocumentColor"
                name="identityDocumentColor"
                label="Warna Kad Pengenalan"
                options={data.identityCardColorLookup}
                bind:value={personalDetails.identityDocumentColor}
            ></DropdownSelect> -->
                    <DateSelector
                        disabled={isReadonlyPersonalFormStepper}
                        name="birthDate"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={personalDetails.birthDate}
                    ></DateSelector>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="birthStateId"
                        name="birthStateId"
                        label="Tempat Lahir"
                        bind:value={personalDetails.birthStateId}
                        options={[
                            { value: '1', name: 'Sarawak' },
                            { value: '2', name: 'Sabah' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="birthCountryId"
                        name="birthCountryId"
                        label="Negara Dilahirkan"
                        bind:value={personalDetails.birthCountryId}
                        options={[
                            { value: '1', name: 'Sarawak' },
                            { value: '2', name: 'Sabah' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="nationalityId"
                        name="nationalityId"
                        label="Warganegara"
                        bind:value={personalDetails.nationalityId}
                        options={[
                            { value: '1', name: 'Warganegara' },
                            { value: '2', name: 'Bukan Warganegara' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="raceId"
                        name="raceId"
                        label="Bangsa"
                        bind:value={personalDetails.raceId}
                        options={[
                            { value: '1', name: 'Melayu' },
                            { value: '2', name: 'Cina' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="ethnicId"
                        name="ethnicId"
                        label="Etnik"
                        bind:value={personalDetails.ethnicId}
                        options={[
                            { value: '1', name: 'Melayu' },
                            { value: '2', name: 'Cina' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="religionId"
                        name="religionId"
                        label="Agama"
                        bind:value={personalDetails.religionId}
                        options={[
                            { value: '1', name: 'Islam' },
                            { value: '2', name: 'Kristen' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="genderId"
                        name="genderId"
                        label="Jantina"
                        bind:value={personalDetails.genderId}
                        options={[
                            { value: 'male', name: 'Lelaki' },
                            { value: 'female', name: 'Perempuan' },
                        ]}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="maritalId"
                        label="maritalId"
                        bind:value={personalDetails.maritalId}
                        options={[
                            { value: '1', name: 'Bujang' },
                            { value: '2', name: 'Berkahwin' },
                        ]}
                    ></DropdownSelect>
                    <TextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="email"
                        label={'Emel'}
                        type="text"
                        bind:value={personalDetails.email}
                    ></TextField>

                    <LongTextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="homeAddress"
                        label="Alamat Rumah"
                        bind:value={personalDetails.homeAddress}
                    />
                    <LongTextField
                        disabled={isReadonlyPersonalFormStepper}
                        name="mailAddress"
                        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                        bind:value={personalDetails.mailAddress}
                    />
                    <DropdownSelect
                        disabled={isReadonlyPersonalFormStepper}
                        dropdownType="label-left-full"
                        id="assetDeclarationStatusId"
                        name="assetDeclarationStatusId"
                        label="Status Pengikstiharan Harta"
                        bind:value={personalDetails.assetDeclarationStatusId}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    <DateSelector
                        disabled={isReadonlyPersonalFormStepper}
                        name="propertyDeclarationDate"
                        handleDateChange
                        label="Tarikh Pengikstiharan Harta"
                        bind:selectedDate={personalDetails.propertyDeclarationDate}
                    ></DateSelector>
                    <RadioSingle
                        name="isExPoliceOrSoldier"
                        disabled={isReadonlyPersonalFormStepper}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                        legend={'Bekas Polis / Tentera'}
                        bind:userSelected={personalDetails.isExPoliceOrSoldier}
                    ></RadioSingle>
                    <div class="flex w-full flex-col gap-2">
                        <p class={stepperFormTitleClass}>
                            Maklumat Pertalian Dengan Kakitangan LKIM
                        </p>

                        <RadioSingle
                            name="isInternalRelationship"
                            {options}
                            disabled={isReadonlyPersonalFormStepper}
                            legend={'Perhubungan Dengan Kakitangan LKIM'}
                            bind:userSelected={personalDetails.isInternalRelationship}
                        ></RadioSingle>
                        {#if personalDetails.isInternalRelationship}
                            <TextField
                                disabled={isReadonlyPersonalFormStepper}
                                name="employeeNumber"
                                label={'No. Pekerja LKIM'}
                                type="text"
                                bind:value={personalDetails.employeeNumber}
                            ></TextField>

                            <TextField
                                disabled={isReadonlyPersonalFormStepper}
                                name="employeeName"
                                label={'Nama Kakitangan LKIM'}
                                type="text"
                                bind:value={personalDetails.employeeName}
                            ></TextField>

                            <DropdownSelect
                                disabled={isReadonlyPersonalFormStepper}
                                dropdownType="label-left-full"
                                id="employeePosition"
                                label="Jawatan Kakitangan LKIM"
                                bind:value={personalDetails.employeePosition}
                                options={[
                                    { value: '1', name: 'Pegawai IT' },
                                    { value: '2', name: 'Akauntan' },
                                ]}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled={isReadonlyPersonalFormStepper}
                                dropdownType="label-left-full"
                                id="relationshipId"
                                label="Hubungan"
                                bind:value={personalDetails.relationshipId}
                                options={[
                                    { value: 'true', name: 'Suami' },
                                    { value: 'false', name: 'Isteri' },
                                ]}
                            ></DropdownSelect>
                        {/if}
                    </div>
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        ></StepperContentHeader>

        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#if isSuccessAcademicFormResponse}
                    {#each data.academicInfoResponse.data.academicList as academic, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <div
                                class="mb-5 mt-2.5 text-sm text-system-primary"
                            >
                                <p>Maklumat Akademik #{i + 1}</p>
                            </div>
                            <DropdownSelect
                                disabled
                                name="majorMinorId"
                                dropdownType="label-left-full"
                                label={'Jenis Jurusan'}
                                options={data.majorMinorLookup}
                                bind:value={academic.majorMinorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="countryId"
                                dropdownType="label-left-full"
                                label={'Negara'}
                                options={data.countryLookup}
                                bind:value={academic.countryId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="institutionId"
                                dropdownType="label-left-full"
                                label={'Institusi'}
                                options={data.institutionLookup}
                                bind:value={academic.institutionId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="educationLevelId"
                                dropdownType="label-left-full"
                                label={'Taraf Pembelajaran'}
                                options={data.educationLookup}
                                bind:value={academic.educationLevelId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="sponsorshipId"
                                dropdownType="label-left-full"
                                label={'Penajaan'}
                                options={data.sponsorshipLookup}
                                bind:value={academic.sponsorshipId}
                            ></DropdownSelect>

                            <TextField
                                disabled
                                name="name"
                                label={'Nama Kelulusan/Sijil'}
                                type="text"
                                bind:value={academic.name}
                            ></TextField>

                            <TextField
                                disabled
                                name="completionDate"
                                label={'Tahun Kelulusan'}
                                type="text"
                                bind:value={academic.completionDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="finalGrade"
                                label={'Gred Akhir'}
                                type="text"
                                bind:value={academic.finalGrade}
                            ></TextField>

                            <TextField
                                disabled
                                name="field"
                                label={'Catatan'}
                                type="text"
                                bind:value={academic.field}
                            ></TextField>
                        </div>
                    {/each}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#if isSuccessExperienceFormResponse}
                    {#each data.experienceInfoResponse.data.experienceList as record, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>
                        <TextField
                            disabled
                            name="company"
                            label={'Nama Majikan'}
                            type="text"
                            bind:value={record.company}
                        ></TextField>

                        <TextField
                            disabled
                            name="address"
                            label={'Alamat Majikan'}
                            type="text"
                            bind:value={record.address}
                        ></TextField>

                        <TextField
                            disabled
                            name="position"
                            label={'Jawatan'}
                            type="text"
                            bind:value={record.position}
                        ></TextField>

                        <TextField
                            disabled
                            name="positionCode"
                            label={'Kod Jawatan (jika ada)'}
                            type="text"
                            bind:value={record.positionCode}
                        ></TextField>

                        <TextField
                            disabled
                            name="startDate"
                            label={'Dari (tahun)'}
                            type="text"
                            bind:value={record.startDate}
                        ></TextField>

                        <TextField
                            disabled
                            name="endDate"
                            label={'Hingga (tahun)'}
                            type="text"
                            bind:value={record.endDate}
                        ></TextField>

                        <TextField
                            disabled
                            name="salary"
                            label={'Gaji'}
                            type="text"
                            bind:value={record.salary}
                        ></TextField>
                    {/each}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessActivityFormResponse}
                    <DynamicTable
                        tableItems={data.activityInfoResponse.data.activityList}
                    ></DynamicTable>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessFamilyFormResponse}
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Suami/Isteri dan Anak"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessDependencyFormResponse}
                    <DynamicTable
                        tableItems={data.dependencyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2 overflow-y-auto"></div>
            <div class="flex w-full flex-col gap-2 overflow-y-auto">
                {#if isSuccessNextOfKinFormResponse}
                    <DynamicTable
                        hasCheckbox
                        tableItems={data.nextOfKinInfoResponse.data
                            .nextOfKinList}
                    ></DynamicTable>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm">
                    Sila muat turun, isi dengan lengkap dokumen berikut,
                    kemudian muat naik dokumen pada ruangan yang disediakan.
                </p>

                <ul
                    class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                >
                    <li>Surat Setuju Terima Tawaran</li>
                    <li>Surat Sumpah Bukan Penagih Dadah</li>
                    <li>Akuan Berkanun</li>
                    <li>Surat Aku Janji</li>
                    <li>Borang Perubatan</li>
                    <li>
                        Perkuan Untuk Ditandatangani Oleh Penjawat Awam
                        Berkenaan Dengan Akta Rahsia Rasmi, 1972
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
    <!-- {#if !isReadonlyDocumentFormStepper} -->
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru"
            ><TextIconButton
                primary
                label="Simpan"
                form="newHireEmploymentServiceForm"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
            <form
                id="newHireEmploymentServiceForm"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <!-- <input hidden bind:value={$serviceInfoForm.candidateId} /> -->
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.gradeId}
                    dropdownType="label-left-full"
                    id="gradeId"
                    label="Gred Semasa"
                    bind:value={$serviceInfoForm.gradeId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.gradeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.gradeId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.positionId}
                    dropdownType="label-left-full"
                    id="positionId"
                    label="Jawatan"
                    bind:value={$serviceInfoForm.positionId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.positionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.positionId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.placementId}
                    dropdownType="label-left-full"
                    id="placementId"
                    label="Penempatan"
                    bind:value={$serviceInfoForm.placementId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.placementId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.placementId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.serviceTypeId}
                    dropdownType="label-left-full"
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceTypeId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceTypeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceTypeId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.serviceGroupId}
                    dropdownType="label-left-full"
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceGroupId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceGroupId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceGroupId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.unitId}
                    dropdownType="label-left-full"
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:value={$serviceInfoForm.unitId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.unitId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.unitId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.employmentStatusId}
                    dropdownType="label-left-full"
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:value={$serviceInfoForm.employmentStatusId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $serviceInfoErrors.employmentStatusId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.employmentStatusId}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.effectiveDate}
                    name="effectiveDate"
                    disabled={false}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    bind:selectedDate={$serviceInfoForm.effectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.effectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.effectiveDate}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.retirementBenefit}
                    dropdownType="label-left-full"
                    id="retirementBenefit"
                    label="Faedah Persaraan"
                    bind:value={$serviceInfoForm.retirementBenefit}
                    options={[{ value: 'kwsp', name: 'KWSP' }]}
                ></DropdownSelect>
                {#if $serviceInfoErrors.retirementBenefit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementBenefit}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.epfNumber}
                    name="epfNumber"
                    label={'No. KWSP'}
                    bind:value={$serviceInfoForm.epfNumber}
                ></TextField>
                {#if $serviceInfoErrors.epfNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.epfNumber}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.socsoNumber}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    bind:value={$serviceInfoForm.socsoNumber}
                ></TextField>
                {#if $serviceInfoErrors.socsoNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.socsoNumber}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.incomeNumber}
                    name="incomeNumber"
                    label={'No. Cukai'}
                    bind:value={$serviceInfoForm.incomeNumber}
                ></TextField>
                {#if $serviceInfoErrors.incomeNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.incomeNumber}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.bankName}
                    name="bankName"
                    label={'Bank'}
                    bind:value={$serviceInfoForm.bankName}
                ></TextField>
                {#if $serviceInfoErrors.bankName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankName}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.bankAccount}
                    name="bankAccount"
                    label={'No. Akaun'}
                    bind:value={$serviceInfoForm.bankAccount}
                ></TextField>
                {#if $serviceInfoErrors.bankAccount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankAccount}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.eligibleLeaveCount}
                    name="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    bind:value={$serviceInfoForm.eligibleLeaveCount}
                ></TextField>
                {#if $serviceInfoErrors.eligibleLeaveCount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.eligibleLeaveCount}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.civilServiceStartDate}
                    name="civilServiceStartDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    bind:selectedDate={$serviceInfoForm.civilServiceStartDate}
                ></DateSelector>
                {#if $serviceInfoErrors.civilServiceStartDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.civilServiceStartDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.firstServiceDate}
                    name="firstServiceDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstServiceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.serviceDate}
                    name="serviceDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    bind:selectedDate={$serviceInfoForm.serviceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.serviceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.firstConfirmServiceDate}
                    name="firstConfirmServiceDate"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstConfirmServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstConfirmServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstConfirmServiceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.confirmDate}
                    name="confirmDate"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    bind:selectedDate={$serviceInfoForm.confirmDate}
                ></DateSelector>
                {#if $serviceInfoErrors.confirmDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.confirmDate}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.firstEffectiveDate}
                    name="firstEffectiveDate"
                    disabled={false}
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    bind:selectedDate={$serviceInfoForm.firstEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstEffectiveDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.newRecruitEffectiveDate}
                    name="newRecruitEffectiveDate"
                    disabled={false}
                    label={'Tarikh Lantikan Baru'}
                    bind:selectedDate={$serviceInfoForm.newRecruitEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.newRecruitEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.newRecruitEffectiveDate}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.pensionNumber}
                    name="pensionNumber"
                    label={'Nombor Pencen'}
                    bind:value={$serviceInfoForm.pensionNumber}
                ></TextField>
                {#if $serviceInfoErrors.pensionNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.pensionNumber}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.revisionMonth}
                    dropdownType="label-left-full"
                    id="revisionMonth"
                    label="Bulan KGT"
                    bind:value={$serviceInfoForm.revisionMonth}
                    options={[{ value: 'Januari', name: 'Januari' }]}
                ></DropdownSelect>

                {#if $serviceInfoErrors.revisionMonth}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.revisionMonth}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.kgt}
                    name="kgt"
                    type="number"
                    label={'KGT'}
                    bind:value={$serviceInfoForm.kgt}
                ></TextField>
                {#if $serviceInfoErrors.kgt}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.kgt}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.retirementDate}
                    name="retirementDate"
                    disabled={false}
                    label={'Tarikh Bersara'}
                    bind:selectedDate={$serviceInfoForm.retirementDate}
                ></DateSelector>
                {#if $serviceInfoErrors.retirementDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementDate}</span
                    >
                {/if}

                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <!-- <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.salaryDateOfEffect}
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            bind:value={'12/12/2021'}
                        ></TextField>
                        {#if $serviceInfoErrors.salaryDateOfEffect}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.salaryDateOfEffect}</span
                            >
                        {/if} -->
                        <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.maximumSalary}
                            name="maximumSalary"
                            label={'Tangga Gaji'}
                            bind:value={$serviceInfoForm.maximumSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.maximumSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.maximumSalary}</span
                            >
                        {/if}

                        <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.baseSalary}
                            name="baseSalary"
                            label={'Gaji Pokok'}
                            bind:value={$serviceInfoForm.baseSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.baseSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.baseSalary}</span
                            >
                        {/if}
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.itka}
                            name="itka"
                            label={'ITKA'}
                            bind:value={$serviceInfoForm.itka}
                        ></TextField>
                        {#if $serviceInfoErrors.itka}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itka}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.itp}
                            name="itp"
                            label={'ITP'}
                            bind:value={$serviceInfoForm.itp}
                        ></TextField>
                        {#if $serviceInfoErrors.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itp}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.epw}
                            name="epw"
                            label={'EPW'}
                            bind:value={$serviceInfoForm.epw}
                        ></TextField>
                        {#if $serviceInfoErrors.epw}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.epw}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.cola}
                            name="cola"
                            label={'COLA'}
                            bind:value={$serviceInfoForm.cola}
                        ></TextField>
                        {#if $serviceInfoErrors.cola}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.cola}</span
                            >
                        {/if}
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        > -->
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <!-- {/if} -->
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
                    bind:value={data.currentEmployeeGrade.code}
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
                    bind:value={data.currentEmployeePosition.name}
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
                    bind:value={data.currentEmployeeService.placement}
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
                    bind:value={data.currentEmployeeServiceType.name}
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
                        data.currentEmployeeService.currentServiceDate,
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
                        data.currentEmployee.employeeNumber,
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
                        data.currentEmployeeService.firstServiceDate,
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
                        data.currentEmployeeService.currentServiceDate,
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
                        data.currentEmployeeService.currentServiceDate,
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
                        data.currentEmployeeService.firstServiceDate,
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
                        data.currentEmployeeService.currentServiceDate,
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
                    {#each data.currentEmployeePositionHistory as item, i}
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
                        data.currentEmployeeService.firstServiceDate,
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
                        data.currentEmployeePensions.retiredDate,
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
                    value={data.currentEmployee.employeeNumber}
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
