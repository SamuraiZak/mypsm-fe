<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    import { maklumatKontrakForm } from '$lib/mocks/profil/maklumat-kontrak';
    let kontrakFields: any[] = maklumatKontrakForm;
    export let disabled: boolean = false;

    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupServiceTypes } from '$lib/mocks/database/mockLookupServiceTypes';
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
    import { mockEmployeeNextOfKins } from '$lib/mocks/database/mockEmployeeNextOfKins';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import Form from '$lib/components/form/Form.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';

    export let employeeNumber: string = '00001';
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let isEditing: boolean = false;
    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;
    let currentEmployeeServiceType = mockLookupServiceTypes.find(
        (serviceType) => {
            return (
                serviceType.id ===
                mockCurrentService.find((service) => {
                    return service.employeeId === currentEmployee.id;
                })!.serviceTypeId
            );
        },
    )!;
    let currentEmployeeExperience = mockEmployeeExperience.filter(
        (experience) => {
            return experience.employeeId === currentEmployee.id;
        },
    )!;
    let currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeGrade = mockLookupGrades.find((grade) => {
        return grade.id === currentEmployeeService.gradeId;
    })!;
    let currentEmployeePosition = mockLookupPositions.find((position) => {
        return position.id === currentEmployeeService.positionId;
    })!;
    let currentEmployeeStatus = mockLookupEmploymentStatus.find((status) => {
        return status.id === currentEmployeeService.employmentStatusId;
    })!;
    let currentEmployeePositionHistory = mockEmploymentPositionHistories.filter(
        (positionHistory) => {
            return (
                positionHistory.currentServiceId ===
                currentEmployeeService.serviceTypeId
            );
        },
    )!;

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
    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    //==========================================================
    //================== kontrak scheme ========================
    //==========================================================

    const dateKontrak = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const dateKontrakMax = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .max(new Date(), {
            message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
        });

    const stepperkontrak = z.object({
        ID: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah lebih daripada 1 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        emel: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tempohKontrak: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kadarUpah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(0, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        penempatan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        gelaranTugas: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(1, {
                message: 'Medan ini hendaklah diisi.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        tarikhMulaKontrak: dateKontrakMax,
        tarikhTamatKontrak: dateKontrak,
        tarikhLaporDiri: dateKontrakMax,
    });

    //------------------------------------------------------>
    //---------------------Kontrak------------------------->
    //------------------------------------------------------>

    const submitFormstepperkontrak = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const exampleFormData = {
            ID: String(formData.get('ID')),
            emel: String(formData.get('emel')),
            tempohKontrak: String(formData.get('tempohKontrak')),
            kadarUpah: String(formData.get('kadarUpah')),
            penempatan: String(formData.get('penempatan')),
            gelaranTugas: String(formData.get('gelaranTugas')),
            tarikhMulaKontrak: String(formData.get('tarikhMulaKontrak')),
            tarikhTamatKontrak: String(formData.get('tarikhTamatKontrak')),
            tarikhLaporDiri: String(formData.get('tarikhLaporDiri')),
            
        };

        try {
            const result = stepperkontrak.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
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

<!-- <form class="h-fit w-full p-5">
    <div class="h-full w-full space-y-12">
        <div class="h-full w-full border-b border-gray-900/10 pb-12">
            <h2 class="w-full text-base font-semibold leading-7 text-gray-900">
                Maklumat Kontrak Terkini
            </h2>

            {#each kontrakFields as staff}
                <div class="m-2.5">
                    <TextField
                        type="text"
                        {disabled}
                        onChange={() => {
                            console.log('Changed!');
                        }}
                        label={staff.value}
                        value={staff.data}
                    ></TextField>
                </div>
            {/each}
        </div>
    </div>
</form> -->

<section class="w-full flex-col px-2 py-2">
    <SectionHeader title="Maklumat Kontrak Terkini">
        {#if !disabled}
            <TextIconButton primary label="Simpan" form="Formstepperkontrak" />
        {/if}
    </SectionHeader>
    <div class="flex w-full flex-col gap-2.5">
        <form
            id="Formstepperkontrak"
            on:submit|preventDefault={submitFormstepperkontrak}
            class="flex w-full flex-col gap-2 pt-3"
        >
            <TextField
                {disabled}
                hasError={errorData?.ID}
                name="ID"
                label={'ID'}
                type="text"
                value={'-'}
            ></TextField>
            {#if errorData?.ID}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.ID[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={errorData?.emel}
                name="emel"
                label={'Emel'}
                type="text"
                value="-"
            ></TextField>
            {#if errorData?.emel}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.emel[0]}</span
                >
            {/if}

            <!-- <TextField
                {disabled}
                hasError={errorData?.tarikhMulaKontrak}
                name="tarikhMulaKontrak"
                label={'Tarikh Mula Kontrak'}
                type="text"
                value={'-'}
            ></TextField>
            {#if errorData?.tarikhMulaKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhMulaKontrak[0]}</span
                >
            {/if} -->

            <DateSelector
                {disabled}
                hasError={errorData?.tarikhMulaKontrak}
                name="tarikhMulaKontrak"
                handleDateChange
                label="Tarikh Mula Kontrak"
                value=""
            ></DateSelector>
            {#if errorData?.tarikhMulaKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhMulaKontrak[0]}</span
                >
            {/if}

            <!-- <TextField
                {disabled}
                hasError={errorData?.tarikhTamatKontrak}
                name="tarikhTamatKontrak"
                label={'Tarikh Tamat Kontrak'}
                type="text"
                value={''}
            ></TextField>
            {#if errorData?.tarikhTamatKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhTamatKontrak[0]}</span
                >
            {/if} -->
            <DateSelector
                {disabled}
                hasError={errorData?.tarikhTamatKontrak}
                name="tarikhTamatKontrak"
                handleDateChange
                label="Tarikh Tamat Kontrak"
                value=""
            ></DateSelector>
            {#if errorData?.tarikhTamatKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhTamatKontrak[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={errorData?.tempohKontrak}
                name="tempohKontrak"
                label={'Tempoh Kontrak'}
                type="text"
                value={'-'}
            ></TextField>
            {#if errorData?.tempohKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tempohKontrak[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={errorData?.kadarUpah}
                name="kadarUpah"
                label={'Kadar Upah (RM)'}
                type="text"
                value={'-'}
            ></TextField>
            {#if errorData?.kadarUpah}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.kadarUpah[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={errorData?.penempatan}
                name="penempatan"
                label={'Penempatan'}
                type="text"
                value="-"
            ></TextField>
            {#if errorData?.penempatan}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.penempatan[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={errorData?.gelaranTugas}
                name="gelaranTugas"
                label={'Gelaran Tugas'}
                type="text"
                value="-"
            ></TextField>
            {#if errorData?.gelaranTugas}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.gelaranTugas[0]}</span
                >
            {/if}

            <!-- <TextField
                {disabled}
                hasError={errorData?.tarikhLaporDiri}
                name="tarikhLaporDiri"
                label={'Tarikh Lapor Diri'}
                type="text"
                value="-"
            ></TextField>
            {#if errorData?.tarikhLaporDiri}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhLaporDiri[0]}</span
                >
            {/if} -->
            <DateSelector
                {disabled}
                hasError={errorData?.tarikhLaporDiri}
                name="tarikhLaporDiri"
                handleDateChange
                label="Tarikh Lapor Diri"
                value=""
            ></DateSelector>
            {#if errorData?.tarikhLaporDiri}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.tarikhLaporDiri[0]}</span
                >
            {/if}
        </form>
    </div>
</section>
<Toaster />
