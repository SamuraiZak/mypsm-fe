<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgPdf2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';

    let editMode: boolean = false;

    let candidateList: Object[] = [
        {
            staffID: '28339',
            staffName: 'Ali bin Ahmad',
            identificationNumber: '920302-11-6632',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
        {
            staffID: '58449',
            staffName: 'Mahmood Saiful',
            identificationNumber: '851129-10-4139',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
        {
            staffID: '30290',
            staffName: 'Mohd Irfan Fikri',
            identificationNumber: '910110-08-2002',
            program: '-',
            skim: '-',
            gred: '-',
            positionName: '-',
            currentPlacement: '-',
            disciplinaryReview: '-',
            propertyDeclaration: '-',
            certificateOfIntegrity: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
    ];

    let radioChosen: string = '';
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Lulus',
        },
        {
            value: 'false',
            label: 'Tidak Lulus',
        },
    ];

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //Form Validation
    let errorData: any;

    // Stepper 4 Form Validation
    const stepper4Schema = z.object({
        meetingName: z
            .string({ required_error: 'Nama mesyuarat tidak boleh kosong.' })
            .min(4, {
                message: 'Nama mesyuarat hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Nama mesyuarat tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        meetingDate: z
            .string({ required_error: 'Tarikh mesyuarat tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .max(10, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .trim(),
        actingPosition: z
            .string({
                required_error: 'Jawatan pemangkuan tidak boleh kosong.',
            })
            .min(4, {
                message:
                    'Jawatan pemangkuan hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message:
                    'Jawatan pemangkuan tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        actingGred: z
            .string({ required_error: 'Gred pemangkuan tidak boleh kosong.' })
            .min(3, {
                message:
                    'Gred pemangkuan hendaklah dalam format yang betul. Contoh: N32.',
            })
            .max(4, {
                message:
                    'Gred pemangkuan hendaklah dalam format yang betul. Contoh: N32.',
            })
            .trim(),
        placement: z
            .string({ required_error: 'Penempatan tidak boleh kosong.' })
            .min(4, {
                message: 'Nama penempatan hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Nama penempatan tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        reportingDate: z
            .string({ required_error: 'Tarikh tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .max(10, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .trim(),
        referenceLetterNo: z
            .string({ required_error: 'No rujukan surat tidak boleh kosong.' })
            .min(4, {
                message:
                    'No rujukan surat hendaklah lebih daripada 4 karakter.',
            })
            .max(40, {
                message: 'No rujukan surat tidak boleh melebihi 40 karakter.',
            })
            .trim(),
        letterDate: z
            .string({ required_error: 'Tarikh surat tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .max(10, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .trim(),
        letterTitle: z
            .string({ required_error: 'Tajuk surat tidak boleh kosong.' })
            .min(4, {
                message: 'Tajuk surat hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Tajuk surat tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    const stepper4Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper4Data = {
            meetingName: String(formData.get('meetingName')),
            meetingDate: String(formData.get('meetingDate')),
            actingPosition: String(formData.get('actingPosition')),
            actingGred: String(formData.get('actingGred')),
            placement: String(formData.get('placement')),
            reportingDate: String(formData.get('reportingDate')),
            referenceLetterNo: String(formData.get('referenceLetterNo')),
            letterDate: String(formData.get('letterDate')),
            letterTitle: String(formData.get('letterTitle')),
        };

        try {
            const result = stepper4Schema.parse(stepper4Data);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper4FormData = { ...stepper4Data, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper4FormData),
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

    //stepper 4 details form validation
    const stepper4DetailSchema = z.object({
        // checkbox schema
        promotionMeetingResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });
    const stepper4DetailsForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper4DetailFormData = {
            promotionMeetingResult: String(
                formData.get('promotionMeetingResult'),
            ),
        };

        try {
            const result = stepper4DetailSchema.parse(stepper4DetailFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper4DetailFormData = {
                    ...stepper4DetailFormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper4DetailFormData),
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

    // Stepper 5 Form Validation
    const stepper5Schema = z.object({
        actingPosition: z
            .string({
                required_error: 'Jawatan pemangkuan tidak boleh kosong.',
            })
            .min(4, {
                message: 'Jawatan pemangkuan hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message:
                    'Jawatan pemangkuan tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        actingGred: z
            .string({ required_error: 'Gred pemangkuan tidak boleh kosong.' })
            .min(3, {
                message:
                    'Gred pemangkuan hendaklah dalam format yang betul. Contoh: N32.',
            })
            .max(4, {
                message:
                    'Gred pemangkuan hendaklah dalam format yang betul. Contoh: N32.',
            })
            .trim(),
        newPlacement: z
            .string({ required_error: 'Penempatan baru tidak boleh kosong.' })
            .min(4, {
                message: 'Penempatan baru hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message: 'Penempatan baru tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        reportingDate: z
            .string({ required_error: 'Tarikh tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .max(10, {
                message:
                    'Tarikh hendaklah mengikut format hh/bb/tttt. Contoh: 5/10/2023.',
            })
            .trim(),
        supporterName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        approverName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
    });
    const stepper5Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const supporterName = document.getElementById(
            'supporterName',
        ) as HTMLSelectElement;
        const approverName = document.getElementById(
            'approverName',
        ) as HTMLSelectElement;

        const stepper5FormData = {
            actingPosition: String(formData.get('actingPosition')),
            actingGred: String(formData.get('actingGred')),
            newPlacement: String(formData.get('newPlacement')),
            reportingDate: String(formData.get('reportingDate')),
            supporterName: String(supporterName.value),
            approverName: String(approverName.value),
        };

        try {
            const result = stepper5Schema.parse(stepper5FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper5FormData = { ...stepper5FormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper5FormData),
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

    // Stepper 6 Form Validation
    const stepper6Schema = z.object({
        supporterName: z
            .string({
                required_error: 'Nama penyokong tidak boleh kosong.',
            })
            .min(4, {
                message: 'Nama penyokong hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message: 'Nama penyokong tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        approverName: z
            .string({
                required_error: 'Nama pelulus tidak boleh kosong.',
            })
            .min(4, {
                message: 'Nama pelulus hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message: 'Nama pelulus tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });
    const stepper6Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper6FormData = {
            supporterName: String(formData.get('supporterName')),
            approverName: String(formData.get('approverName')),
        };

        try {
            const result = stepper6Schema.parse(stepper6FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper6FormData = { ...stepper6FormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper6FormData),
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

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred Utama"
        description="Hal-hal berkaitan Pemangkuan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'ID Pemangkuan #77699'}
        dataStatus={'Sedang Diproses'}
    >
        <!-- =========================================================== -->
        <!-- First Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Pemilihan Calon">
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Kakitangan Yang Dipilih"
                    ><TextIconButton
                        primary
                        label="Cetak"
                        onClick={() => {
                            alert('printing..');
                        }}
                    >
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader title="Senarai Semua Kakitangan"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b pb-3"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        withRowSelection
                        selectAdd
                        editable
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'program',
                            'skim',
                            'gred',
                            'positionName',
                            'currentPlacement',
                            'propertyDeclaration',
                            'educationLoanDeclaration',
                        ]}
                    ></DynamicTable>
                </div>

                <SectionHeader title="Senarai Calon">
                    <TextIconButton primary label="Cetak">
                        <SvgPrinter />
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b pb-3"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        withRowSelection
                        editable
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'program',
                            'skim',
                            'gred',
                            'positionName',
                            'currentPlacement',
                            'propertyDeclaration',
                            'educationLoanDeclaration',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Second Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemangkuan"
                ><TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight />
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>

                <div class="w-full items-center border-b py-3">
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton label="Tidak Peraku">
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton primary label="Perakukan">
                            <SvgDoubleTick />
                        </TextIconButton>
                    </SectionHeader>
                </div>

                <SectionHeader title="Senarai Kakitangan Yang Dipilih">
                    <TextIconButton primary label="">
                        <SvgPdf2 />
                    </TextIconButton>
                    <TextIconButton primary label="">
                        <SvgExcel />
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DynamicTable
                        tableItems={candidateList}
                        hasCheckbox
                        columnKeys={[
                            'staffID',
                            'staffName',
                            'identificationNumber',
                            'disciplinaryReview',
                            'propertyDeclaration',
                            'certificateOfIntegrity',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Third Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Muat Turun Borang Berkaitan">
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}
                >
                    <SvgArrowRight />
                </TextIconButton>
            </StepperContentHeader>
            <div
                class="flex w-full flex-col items-center justify-start gap-2 border-b p-3"
            >
                <DownloadAttachment fileName={'Borang Penilaian'}
                ></DownloadAttachment>
                <DownloadAttachment fileName={'Borang Kesihatan'}
                ></DownloadAttachment>
                <DownloadAttachment fileName={'Profil Kakitangan (CV)'}
                ></DownloadAttachment>
            </div>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Fourth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => goNext()}
                    >
                        <SvgArrowRight />
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon"></SectionHeader>

                    <div class="flex w-full flex-col gap-2 border-b pb-3">
                        <SectionHeader title="Keputusan Mesyuarat"
                        ></SectionHeader>
                        <form
                            id="stepper4Validation"
                            on:submit|preventDefault={stepper4Form}
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={errorData?.meetingName}
                                name="meetingName"
                                label="Nama Mesyuarat"
                                value="Mesyuarat Tersebut"
                            />
                            {#if errorData?.meetingName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.meetingName[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.meetingDate}
                                name="meetingDate"
                                label="Tarikh Mesyuarat"
                                value="01/08/2023"
                            />
                            {#if errorData?.meetingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.meetingDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.actingPosition}
                                name="actingPosition"
                                label="Jawatan Pemangkuan"
                                value="Setiausaha Pejabat"
                            />
                            {#if errorData?.actingPosition}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.actingPosition[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.actingGred}
                                name="actingGred"
                                label="Gred Pemangkuan"
                                value="N32"
                            />
                            {#if errorData?.actingGred}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.actingGred[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.placement}
                                name="placement"
                                label="Penempatan"
                                value="Ketua Pengarah/Timbalan Ketua Pengarah (Pembangunan)/Timbalan Ketua Pengarah(Pengurusan)"
                            />
                            {#if errorData?.placement}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.placement[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.reportingDate}
                                name="reportingDate"
                                label="Tarikh Kuatkuasa Lapor Diri"
                                value="01/10/2023"
                            />
                            {#if errorData?.reportingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.reportingDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.referenceLetterNo}
                                name="referenceLetterNo"
                                label="No. Rujukan Surat"
                                value="-"
                            />
                            {#if errorData?.referenceLetterNo}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.referenceLetterNo[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.letterDate}
                                name="letterDate"
                                label="Tarikh Surat"
                                value="-"
                            />
                            {#if errorData?.letterDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.letterDate[0]}</span
                                >
                            {/if}

                            <TextField
                                hasError={errorData?.letterTitle}
                                name="letterTitle"
                                label="Tajuk Surat"
                                value="-"
                            />
                            {#if errorData?.letterTitle}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.letterTitle[0]}</span
                                >
                            {/if}
                        </form>
                    </div>

                    <div class="w-full border-b pb-3">
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight />
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            tableItems={candidateList}
                            hasCheckbox
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'staffID',
                                'staffName',
                                'identificationNumber',
                                'promotionMeetingResult',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                ></StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Kemaskini Keputusan">
                        <TextIconButton
                            label="Batal"
                            onClick={() => (editMode = false)}
                        >
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton
                            primary
                            label="Simpan"
                            form="stepper4Detail"
                        >
                            <SvgCheck />
                        </TextIconButton>
                    </SectionHeader>

                    <SectionHeader title="Maklumat Calon" />
                    <TextField
                        disabled
                        name="staffID"
                        label="No. Pekerja"
                        value="001023"
                    />
                    <TextField
                        disabled
                        name="staffName"
                        label="Name"
                        value="Ismail bin Ramdan"
                    />
                    <TextField
                        disabled
                        name="identificationNo"
                        label="No. K/p"
                        value="890701-13-5667"
                    />
                    <TextField
                        disabled
                        name="program"
                        label="Program"
                        value="-"
                    />
                    <TextField disabled name="skim" label="Skim" value="-" />
                    <TextField disabled name="gred" label="Gred" value="F41" />
                    <TextField
                        disabled
                        name="positionName"
                        label="Nama Jawatan"
                        value="F41 - Pegawai Teknologi Maklumat"
                    />
                    <TextField
                        disabled
                        name="currentPlacement"
                        label="Penempatan Sekarang"
                        value="00105 - Bhgn. Teknologi Maklumat"
                    />
                    <TextField
                        disabled
                        name="group"
                        label="Kumpulan"
                        value="PP1 - Pengurusan dan Professional - A"
                    />
                    <TextField
                        disabled
                        name="educationLoanDeclaration"
                        label="Akuan Pinjaman Pendidikan/Institusi"
                        value="-"
                    />

                    <SectionHeader
                        title="Keputusan Mesyuarat Kenaikan Pangkat"
                    />

                    <form
                        id="stepper4Detail"
                        on:submit|preventDefault={stepper4DetailsForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <RadioSingle
                            disabled={false}
                            {options}
                            name="promotionMeetingResult"
                            legend={'Keputusan'}
                            bind:userSelected={radioChosen}
                        ></RadioSingle>
                        {#if errorData?.promotionMeetingResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.promotionMeetingResult[0]}</span
                            >
                        {/if}
                    </form></StepperContentBody
                >
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Fifth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Maklumat Pemangkuan Kakitangan"
                >
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => goNext()}
                    >
                        <SvgArrowRight />
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon">
                        <TextIconButton primary label="">
                            <SvgPdf2 />
                        </TextIconButton>
                        <TextIconButton primary label="">
                            <SvgExcel />
                        </TextIconButton>
                    </SectionHeader>

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            tableItems={candidateList}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'staffID',
                                'staffName',
                                'identificationNumber',
                                'acceptingLetter',
                                'reportingForm',
                                'handOverNote',
                                'actingStaffResult',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Keputusan Pemangkuan Kakitangan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Keputusan">
                        <TextIconButton
                            label="Batal"
                            onClick={() => (editMode = false)}
                        >
                            <SvgBlock />
                        </TextIconButton>
                        <TextIconButton
                            primary
                            label="Simpan"
                            form="stepper5Validation"
                        >
                            <SvgCheck />
                        </TextIconButton>
                    </SectionHeader>

                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        name="staffID"
                        label="No. Pekerja"
                        value="001023"
                    />
                    <TextField
                        disabled
                        name="name"
                        label="Name"
                        value="Ismail bin Ramdan"
                    />
                    <TextField
                        disabled
                        name="identificationNumber"
                        label="No. K/P"
                        value="890701-13-5667"
                    />

                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <div
                        class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                    >
                        <div
                            class="flex h-full max-h-full flex-col items-start justify-center"
                        >
                            <span class="text-sm italic text-system-primary"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                        </div>
                    </div>

                    <form
                        id="stepper5Validation"
                        on:submit|preventDefault={stepper5Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.actingPosition}
                            name="actingPosition"
                            label="Jawatan Pemangkuan"
                            value="Setiausaha Pejabat"
                        />
                        {#if errorData?.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingPosition[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.actingGred}
                            name="actingGred"
                            label="Gred Pemangkuan"
                            value="-"
                        />
                        {#if errorData?.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingGred[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.newPlacement}
                            name="newPlacement"
                            label="Penempatan Baru"
                            value="Bahagian Pengurusan"
                        />
                        {#if errorData?.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.newPlacement[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.reportingDate}
                            name="reportingDate"
                            label="Tarikh Lapor Diri"
                            value="19/10/2023"
                        />
                        {#if errorData?.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.reportingDate[0]}</span
                            >
                        {/if}

                        <SectionHeader title="Pengesah Keputusan"
                        ></SectionHeader>
                        <DropdownSelect
                            hasError={errorData?.supporterName}
                            id="supporterName"
                            label="Nama Penyokong"
                            dropdownType="label-left-full"
                            options={[
                                { value: 'true', name: 'Ya' },
                                { value: 'false', name: 'Tidak' },
                            ]}
                        />
                        {#if errorData?.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporterName[0]}</span
                            >
                        {/if}
                        <DropdownSelect
                            hasError={errorData?.approverName}
                            id="approverName"
                            label="Nama Pelulus"
                            dropdownType="label-left-full"
                            options={[
                                { value: 'true', name: 'Ya' },
                                { value: 'false', name: 'Tidak' },
                            ]}
                        />
                        {#if errorData?.approverName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approverName[0]}</span
                            >
                        {/if}
                    </form></StepperContentBody
                >
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Sixth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Penyokong & Pelulus">
                <TextIconButton
                    primary
                    label="Selesai"
                    form="stepper6Validation"
                >
                    <SvgCircleF2 />
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5 border-b pb-3">
                    <form
                        id="stepper6Validation"
                        on:submit|preventDefault={stepper6Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.supporterName}
                            name="supporterName"
                            label="Nama Penyokong"
                            value="Ismail Bin Ramdan"
                        ></TextField>
                        {#if errorData?.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporterName[0]}</span
                            >
                        {/if}
                        <TextField
                            hasError={errorData?.approverName}
                            name="approverName"
                            label="Nama Pelulus"
                            value="Ramdan bin Ismail"
                        ></TextField>
                        {#if errorData?.approverName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approverName[0]}</span
                            >
                        {/if}
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
