<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgExchangeArrow from '$lib/assets/svg/SvgExchangeArrow.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    //===================== Stepper controls =====================
    let stepperIndex = 1;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Peraku',
        },
        {
            value: 'false',
            label: 'Tidak Peraku',
        },
    ];

    let textFieldValue: string = 'Butiran Lengkap...';

    //reset what have been typed by user in the long text field for Tindakan/Ulasan
    function resetText() {
        textFieldValue = 'Butiran lengkap...';
    }

    //zod validation
    let errorData: any;
    const exampleFormSchema = z.object({
        //LongTextField
        remarks: z
            .string({ required_error: 'Tindakan/Ulasan tidak boleh kosong.' })
            .min(20, {
                message: 'Tindakan/Ulasan hendaklah melebihi 20 karakter.',
            })
            .max(124, {
                message: 'Tindakan/Ulasan tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        //Radio Button
        certify: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            certify: String(formData.get('certify')),
            remarks: String(formData.get('remarks')),
        };
        try {
            const result = exampleFormSchema.parse(exampleFormData);
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

    let radioChosen: string = '';
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Pemangkuan Gred 1-54"
        description="Sila semak maklumat-maklumat permohonan pemangkuan berikut"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/pemangkuan');
            }}
        >
            <SvgBlock />
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
        dataId={'PMGK-1234'}
        dataStatus={'Status: Sedang Diproses'}
    >
        <!-- Senarai Kakitangan Yang Terpilih -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
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
                        <div class="flex w-full flex-wrap gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        withRowSelection
                        onSelect={() => {
                            console.log('pop selected here');
                        }}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'program',
                            'skim',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <TextIconButton label="Set Semula" onClick={() => resetText()}
                    ><SvgExchangeArrow /></TextIconButton
                >
                <TextIconButton primary label="Hantar" form="formValidation"
                    ><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Keputusan daripada Pengarah Bahagian atau Negeri"
                ></SectionHeader>
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <div
                        class="flex h-full max-h-full flex-col items-start justify-center"
                    >
                        <span class="text-sm italic text-system-primary"
                            >&#x2022; Keputusan akan dihantar ke email klinik
                            dan Urus Setia berkaitan</span
                        >
                    </div>
                </div>
                <form
                    id="formValidation"
                    on:submit|preventDefault={submitForm}
                    class="flex w-full flex-col gap-2"
                >
                    <LongTextField
                        hasError={errorData?.remarks}
                        labelBlack={false}
                        name="remarks"
                        label={'Tindakan/Ulasan'}
                        bind:value={textFieldValue}
                    />
                    {#if errorData?.remarks}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.remarks[0]}</span
                        >
                    {/if}
                        <RadioSingle
                        disabled={false}
                        {options}
                        name="certify"
                        bind:userSelected={radioChosen}
                    ></RadioSingle>
                        {#if errorData?.certify}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.certify[0]}</span
                        >
                    {/if}
                </form>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b"
                ></div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>

<Toaster />
