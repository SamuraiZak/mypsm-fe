<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
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

    let checkedItems: Object[] = [];
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
            propertyDeclaration: '-',
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
            propertyDeclaration: '-',
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
            propertyDeclaration: '-',
            educationLoanDeclaration: '-',
            promotionMeetingResult: '-',
            acceptingLetter: '-',
            reportingForm: '-',
            handOverNote: '-',
            actingStaffResult: '-',
        },
    ];

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
    let radioChosen: string = '';

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }
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

                <div class="w-full items-center border-b">
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
                        <TextField
                            name="meetingName"
                            label="Nama Mesyuarat"
                            value="Mesyuarat Tersebut"
                        />
                        <TextField
                            name="meetingDate"
                            label="Tarikh Mesyuarat"
                            value="01/08/2023"
                        />
                        <TextField
                            name="actingPosition"
                            label="Jawatan Pemangkuan"
                            value="Setiausaha Pejabat"
                        />
                        <TextField
                            name="actingGred"
                            label="Gred Pemangkuan"
                            value="N32"
                        />
                        <TextField
                            name="placement"
                            label="Penempatan"
                            value="Ketua Pengarah/Timbalan Ketua Pengarah (Pembangunan)/Timbalan Ketua Pengarah(Pengurusan)"
                        />
                        <TextField
                            name="reportingDate"
                            label="Tarikh Kuatkuasa Lapor Diri"
                            value="01/10/2023"
                        />
                        <TextField
                            name="referenceLetterNo"
                            label="No. Rujukan Surat"
                            value="-"
                        />
                        <TextField
                            name="letterDate"
                            label="Tarikh Surat"
                            value="-"
                        />
                        <TextField
                            name="letterTitle"
                            label="Tajuk Surat"
                            value="-"
                        />
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
                            onClick={() => (editMode = false)}
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
                    <RadioSingle
                        disabled={false}
                        {options}
                        name="promotionMeetingResult"
                        legend={'Keputusan'}
                        bind:userSelected={radioChosen}
                    ></RadioSingle>
                </StepperContentBody>
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
                            onClick={() => (editMode = false)}
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
                                >Sekiranya tidak lulus, jawatan dan gred akan dikembalikan ke butiran asal.</span
                            >
                        </div>
                    </div>

                    <TextField
                        name="actingPosition"
                        label="Jawatan Pemangkuan"
                        value="Setiausaha Pejabat"
                    />
                    <TextField
                        name="actingGred"
                        label="Gred Pemangkuan"
                        value="-"
                    />
                    <TextField
                        name="newPlacement"
                        label="New Placement"
                        value="Bahagian Pengurusan"
                    />
                    <TextField
                        name="reportingDate"
                        label="Tarikh Lapor Diri"
                        value="19/10/2023"
                    />

                    <SectionHeader title="Pengesah Keputusan"></SectionHeader>
                    <DropdownSelect
                        id="supporterName"
                        label="Nama Penyokong"
                        dropdownType="label-left-full"
                        options={[
                            { value: 'true', name: 'Ya' },
                            { value: 'false', name: 'Tidak' },
                        ]}
                    />
                    <DropdownSelect
                        id="approverName"
                        label="Nama Pelulus"
                        dropdownType="label-left-full"
                        options={[
                            { value: 'true', name: 'Ya' },
                            { value: 'false', name: 'Tidak' },
                        ]}
                    />
                </StepperContentBody>
            {/if}
        </StepperContent>


        <!-- =========================================================== -->
        <!-- Sixth Stepper -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Penyokong & Pelulus">
                <TextIconButton primary label="Selesai" onClick={() => ( console.log('here'))}>
                    <SvgCircleF2/>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <div class="flex flex-col gap-2.5 w-full border-b pb-3">
                    <TextField
                    name="supporterName"
                    label="Nama Penyokong"
                    value="Ismail Bin Ramdan"
                    ></TextField>
                    <TextField
                    name="approverName"
                    label="Nama Pelulus"
                    value="Ramdan bin Ismail"
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
