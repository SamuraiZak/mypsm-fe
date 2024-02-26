<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { _updateTable } from './+page';
    import type { PageData } from './$types';
    export let data: PageData;
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { goto } from '$app/navigation';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    let currentRoleCode: string | null;
    let employeeRoleCode: string = UserRoleConstant.kakitangan.code;
    let secretaryRoleCode: string = UserRoleConstant.urusSetiaPerjawatan.code;
    let supporterRoleCode: string = UserRoleConstant.penyokong.code;
    let approverRoleCode: string = UserRoleConstant.pelulus.code;
    let stateDirectorRoleCode: string = UserRoleConstant.pengarahNegeri.code;
    let depDirectorRoleCode: string = UserRoleConstant.pengarahBahagian.code;

    currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let detailOpen: boolean = false;
    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        selectedData: [],
    };

    let fifthStepperTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList2 ?? [],
        selectedData: [],
    };

    let actingResultTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList3 ?? [],
        selectedData: [],
    };

    let selectedStaffTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.response?.dataList ?? [];
            table.meta = value.response?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
    $: selectedStaffTable.data = table.selectedData ?? [];

    let dropdownOptions: DropdownDTO[] = [
        {
            name: 'Kim Jong Kook',
            value: 'Kim Jong Kook',
        },
        {
            name: 'Yoo Jae Suk',
            value: 'Yoo Jae Suk',
        },
    ];

    let meetingName: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ];

    let meetingResultOption: DropdownDTO[] = [
        { value: 'Berjaya', name: 'Berjaya' },
        { value: 'Tidak Berjaya', name: 'Tidak Berjaya' },
    ];

    let dropdownVal: string;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId="PMGK-1234"
        dataStatus="Sedang Diproses"
    >
        <!-- For Gred Utama (New) Only -->
        {#if currentRoleCode === secretaryRoleCode && data.actingType === 'gred_utama'}
            <StepperContent>
                <StepperContentHeader title="Pemilihan Calon">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody paddingClass="py-2.5">
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 border-b px-2.5 pb-5"
                    >
                        <ContentHeader
                            title="Senarai Kakitangan untuk Pemilihan"
                            borderClass="border-none"
                        />
                        <CustomTable
                            enableAdd
                            onUpdate={_search}
                            bind:tableData={table}
                        />
                    </div>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2.5 pb-10"
                    >
                        <ContentHeader
                            title="Senarai Calon yang Dipilih"
                            borderClass="border-none"
                        />
                        <CustomTable bind:tableData={selectedStaffTable} />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Perakuan Pemangkuan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex h-full w-full flex-col gap-2.5 px-2">
                        <ContentHeader
                            title="Tindakan: Tetapkan untuk semua kakitangan yang berkaitan."
                            borderClass="border-none"
                        >
                            <TextIconButton
                                type="primary"
                                label="Peraku"
                                icon="check"
                                onClick={() => {}}
                            />
                            <TextIconButton
                                type="danger"
                                label="Tidak Peraku"
                                icon="cancel"
                                onClick={() => {}}
                            />
                        </ContentHeader>
                        <CustomTable bind:tableData={selectedStaffTable} />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Borang Berkaitan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <!-- Download Attachment Here -->
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            type="neutral"
                            label="Kembali"
                            icon="previous"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            type="primary"
                            label="Seterusnya"
                            icon="next"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <div
                            class="flex w-full flex-col justify-start border-b px-2.5"
                        >
                            <CustomTextField
                                label="Name Mesyuarat"
                                id="meetingName"
                                type="text"
                                val="Mesyuarat 1/2"
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                type="text"
                                val="21/02/2024"
                            />
                            <CustomTextField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                type="text"
                                val="Setiausaha Pejabat"
                            />
                            <CustomTextField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                type="text"
                                val="N32"
                            />
                            <CustomTextField
                                label="Penempatan"
                                id="placement"
                                type="text"
                                val="Ketua Pengarah/Timbalan Ketua Pengarah (Pembangunan)/Timbalan Ketua Pengara (Pengurusan)"
                            />
                            <CustomTextField
                                label="Tarikh Kuatkuasa Lapor Diri"
                                id="reportingDate"
                                type="text"
                                val="25/02/2024"
                            />
                            <CustomTextField
                                label="No. Rujukan Surat"
                                id="referenceNameLetter"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Tarikh Surat"
                                id="letterDate"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Tajuk Surat"
                                id="letterTitle"
                                type="text"
                                val="-"
                            />
                        </div>
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 px-2.5 pb-10"
                        >
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                                borderClass="border-none"
                            />
                            <CustomTable
                                enableDetail
                                detailActions={() => {
                                    detailOpen = true;
                                }}
                                bind:tableData={table}
                            />
                        </div>
                    {:else}
                        <div
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="001023"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Ismail bin Ramdan"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="890701-13-5667"
                            />
                            <CustomTextField
                                label="Program"
                                id="program"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Skim"
                                id="skim"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Gred"
                                id="grade"
                                type="text"
                                val="F41"
                            />
                            <CustomTextField
                                label="Nama Jawatan"
                                id="positionName"
                                type="text"
                                val="F41 - Pegawai Teknologi Maklumat"
                            />
                            <CustomTextField
                                label="Penempatan Sekarang"
                                id="currentPlacement"
                                type="text"
                                val="00105 - Bhgn. Teknologi Maklumat"
                            />
                            <CustomTextField
                                label="Kumpulan"
                                id="group"
                                type="text"
                                val="PP1 - Pengurusan dan Professional - A"
                            />
                            <CustomTextField
                                label="Akuan Pinjaman Pendidikan / Institusi"
                                id="loanDeclaration"
                                type="text"
                                val="-"
                            />
                            <ContentHeader
                                title="Keputusan Mesyuarat Kenaikan Pangkat"
                                borderClass="border-none"
                            />
                            <!-- RADIO HERE -->
                            <span>Radio here</span>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Maklumat Pemangkuan Kakitangan"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            type="neutral"
                            label="Kembali"
                            icon="previous"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            type="primary"
                            label="Seterusnya"
                            icon="next"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !detailOpen}
                        <CustomTable
                            enableDetail
                            detailActions={() => (detailOpen = true)}
                            bind:tableData={fifthStepperTable}
                        />
                    {:else}
                        <div
                            class="flex w-full flex-col justify-start px-2.5 pb-10"
                        >
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="001023"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Rosli bin Ramdan"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="890701-13-2215"
                            />
                            <ContentHeader
                                title="Butiran Pemangkuan"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                            <CustomTextField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                type="text"
                                val="Setiausaha Pejabat"
                            />
                            <CustomTextField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Penempatan Baru"
                                id="newPlacement"
                                type="text"
                                val="Bahagian Pengurusan"
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="text"
                                val="21/02/2024"
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Penyokong"
                                id="supporterName"
                                bind:val={dropdownVal}
                                options={meetingResultOption}
                            />
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="approverName"
                                bind:val={dropdownVal}
                                options={meetingResultOption}
                            />
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Penyokong & Pelulus">
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        onClick={() => {}}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <CustomTextField
                        label="Nama Penyokong"
                        id="supporterName"
                        type="text"
                        val="Kim Ji Won"
                    />
                    <CustomTextField
                        label="Nama Pelulus"
                        id="approverName"
                        type="text"
                        val="Park Ji-Sung"
                    />
                </StepperContentBody>
            </StepperContent>
            <!-- End Of For Gred Utama (New) Only -->

            <!-- All involved role except for kakitangan -->
        {:else if currentRoleCode !== employeeRoleCode}
            <!-- Views will vary based on roles -->
            <StepperContent>
                <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        type="primary"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <CustomTable bind:tableData={selectedStaffTable} />
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
                >
                    <TextIconButton
                        label="Kembali"
                        icon="previous"
                        type="neutral"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        type="primary"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <!-- Director Only -->
                        {#if currentRoleCode === stateDirectorRoleCode || currentRoleCode === depDirectorRoleCode}
                            <ContentHeader
                                title="Keputusan daripada Pengarah Bahagian atau Negeri"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="directorRemark"
                                type="text"
                                val="Butiran lengkap.."
                            />
                            <input
                                type="radio"
                                id="directorResult"
                                value="Peraku"
                            />
                        {:else}
                            <!-- Urus Setia and Penyokong POV-->
                            <ContentHeader
                                title="Maklumat Peraku Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Urus Setia Integriti"
                                id="integritySecretaryName"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />
                            <CustomSelectField
                                label="Nama Pengarah Bahagian / Negeri"
                                id="directorName"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />

                            <ContentHeader
                                title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua calon yang berkaitan."
                                borderClass="border-none"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Lulus"
                                    icon="check"
                                    onClick={() => {}}
                                />
                                <TextIconButton
                                    type="danger"
                                    label="Tidak Lulus"
                                    icon="cancel"
                                    onClick={() => {}}
                                />
                            </ContentHeader>
                            <CustomTable bind:tableData={table} />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                    <TextIconButton
                        label="Kembali"
                        icon="previous"
                        type="neutral"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        type="primary"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <ContentHeader
                            title="Butiran Tawaran dan Temuduga"
                            borderClass="border-none"
                        />
                        <CustomSelectField
                            label="Nama Mesyuarat"
                            id="meetingName"
                            bind:val={dropdownVal}
                            options={meetingName}
                        />
                        <CustomTextField
                            label="Tarikh Mesyuarat"
                            id="meetingDate"
                            type="text"
                            val="21/02/2024"
                        />
                        <CustomTextField
                            label="Gred"
                            id="grade"
                            type="text"
                            val="N32"
                        />
                        <CustomTextField
                            label="Jawatan"
                            id="position"
                            type="text"
                            val="Setiausaha Pejabat"
                        />
                        <CustomTextField
                            label="Tarikh Temuduga"
                            id="interviewDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <CustomTextField
                            label="Masa Temuduga"
                            id="meetingTime"
                            type="text"
                            val="10.00pagi - 11.00pagi"
                        />
                        <CustomTextField
                            label="Negeri"
                            id="state"
                            type="text"
                            val="Kuching"
                        />
                        <CustomTextField
                            label="Pusat Temuduga"
                            id="interviewCenter"
                            type="text"
                            val="LKIM SARAWAK - KUCHING"
                        />

                        <ContentHeader
                            title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <CustomTable bind:tableData={table} />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if data.actingType === '1_54'}
                            <ContentHeader
                                title="Maklumat Markah Keseluruhan"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Markah Keseluruhan"
                                id="totalMark"
                                type="text"
                                val="79%"
                            />
                            <ContentHeader
                                title="Tindakan: Tetapkan untuk semua kakitangan berkaitan"
                                borderClass="border-none"
                            />
                            <CustomTable enableDetail bind:tableData={table} />
                        {:else if !detailOpen}
                            <ContentHeader
                                title="Senarai Calon Yang Terpilih"
                                borderClass="border-none"
                            />
                            <CustomTable
                                enableDetail
                                detailActions={() => (detailOpen = true)}
                                bind:tableData={table}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="6764"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Gareth Bale"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="991122-13-4749"
                            />
                            <ContentHeader
                                title="Keputusan Temuduga"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Tarikh Temuduga"
                                id="interviewDate"
                                type="text"
                                val="date selector here"
                            />
                            <CustomTextField
                                label="Pusat Temuduga"
                                id="interviewCenter"
                                type="text"
                                val="-"
                            />
                            <CustomTextField
                                label="Nama Panel"
                                id="panelName"
                                type="text"
                                val="-"
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if !detailOpen}
                            <CustomTextField
                                label="Nama Mesyuarat"
                                id="meetingName"
                                type="text"
                                val="Mesyuarat 1/2"
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                type="text"
                                val="21/02/2024"
                            />
                            <CustomTextField
                                label="Keputusan Mesyuarat"
                                id="meetingResult"
                                type="text"
                                val="Berjaya"
                            />
                            <CustomTextField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                type="text"
                                val="Setiausaha Pejabat"
                            />
                            <CustomTextField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                type="text"
                                val="N32"
                            />
                            <ContentHeader
                                title="Senarai Calon Yang Terpilih"
                                borderClass="border-none"
                            />
                            <CustomTable
                                enableDetail
                                detailActions={() => (detailOpen = true)}
                                bind:tableData={table}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="4701"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Cristiano Ronaldo"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="901222-13-6445"
                            />
                            <ContentHeader
                                title="Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Keputusan"
                                id="meetingResult"
                                bind:val={dropdownVal}
                                options={meetingResultOption}
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if !detailOpen}
                            <ContentHeader
                                title="Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama Mesyuarat"
                                id="meetingName"
                                type="text"
                                val="Mesyuarat 1/2"
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                id="meetingDate"
                                type="text"
                                val="21/02/2024"
                            />
                            <CustomTable
                                bind:tableData={table}
                                enableDetail
                                detailActions={() => (detailOpen = true)}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="4701"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Gareth Bale"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="950626-13-6445"
                            />
                            <ContentHeader
                                title="Keputusan Mesyuarat"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Penempatan Baru"
                                id="newPlacement"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />
                            <CustomSelectField
                                label="Pengarah Baru"
                                id="newDirector"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="text"
                                val="21/02/2024"
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if !detailOpen}
                            <ContentHeader
                                title="Senarai Calon Yang Terpilih"
                                borderClass="border-none"
                            />
                            <CustomTable
                                enableDetail
                                detailActions={() => {
                                    detailOpen = true;
                                }}
                                tableData={table}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklum Balas Kakitangan"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Kakitangan Memerlukan Penangguhan/Pindaan Penempatan?"
                                id="amendmentRequest"
                                type="text"
                                val="Ya"
                            />
                            <CustomTextField
                                label="Dokumen-Dokumen Berkaitan"
                                id="submittedDocuments"
                                type="text"
                                val="surat_penangguhan_irfan"
                            />
                            <div class="flex flex-row gap-2 pb-2.5">
                                <span
                                    class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                                    >Sekiranya kakitangan memilih untuk tidak
                                    membuat Permohonan Penangguhan/Pindaan
                                    Penempatan sila terus ke langkah berikut:</span
                                >
                                <span
                                    class="text-sm italic text-ios-activeColors-activeBlue-light"
                                >
                                    Kemaskini Keputusan Pemangkuan
                                </span>
                            </div>
                            <span
                                class="pb-2.5 text-sm italic text-ios-labelColors-secondaryLabel-light"
                                >Sekiranya kakitangan memilih untuk membuat
                                Permohonan Penangguhan/Pindaan Penempatan sila
                                isi butiran penangguhan berikut mengikut surat
                                penangguhan yang disediakan oleh kakitangan.</span
                            >
                            <ContentHeader
                                title="Butiran Penangguhan/Pindaan Penempatan"
                                borderClass="border-none"
                            />
                            {#if data.actingType === '1_54'}
                                <CustomTextField
                                    label="Tarikh Asal Lapor Diri"
                                    id="originalReportingDate"
                                    type="text"
                                    val="21/02/2024"
                                />
                                <CustomTextField
                                    label="Penempatan Asal"
                                    id="originalPlacement"
                                    type="text"
                                    val="Bahagian Pengurusan"
                                />
                                <CustomTextField
                                    label="Tarikh Lapor Diri Baru Dipohon"
                                    id="requestedReportingDate"
                                    type="text"
                                    val="22/02/2024"
                                />
                                <CustomTextField
                                    label="Pindaan Penempatan Dipohon"
                                    id="requestedPlacementAmendment"
                                    type="text"
                                    val="Bahagian Teknologi"
                                />
                                <CustomSelectField
                                    label="Keputusan"
                                    id="amendmentResult"
                                    bind:val={dropdownVal}
                                    options={meetingResultOption}
                                />
                                <CustomTextField
                                    label="Kelulusan Tarikh Lapor Diri Baru"
                                    id="approvedNewReportingDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomSelectField
                                    label="Kelulusan Pindaan Penempatan Dipohon"
                                    id="approvedRequestedPlacementAmendment"
                                    bind:val={dropdownVal}
                                    options={dropdownOptions}
                                />
                            {:else}
                                <CustomTextField
                                    label="Tarikh Asal Penempatan"
                                    id="originalPlacementDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomTextField
                                    label="Tarikh Pertukaran Yang Dipohon"
                                    id="requestedAmendmentDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomTextField
                                    label="Alasan Penangguhan"
                                    id="amendmentReason"
                                    type="text"
                                    val="Sila nyatakan alasan permohonan"
                                />
                                <CustomSelectField
                                    label="Nama Pelulus"
                                    id="approverName"
                                    options={dropdownOptions}
                                    val={dropdownVal}
                                />
                            {/if}
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        label="Kembali"
                        icon="previous"
                        type="neutral"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        label="Seterusnya"
                        icon="next"
                        type="primary"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <ContentHeader
                            title="Senarai Calon Terpilih"
                            borderClass="border-none"
                        />
                        <CustomTable bind:tableData={actingResultTable} />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Seterusnya"
                            icon="next"
                            type="primary"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            label="Batal"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if !detailOpen}
                            <ContentHeader
                                title="Senarai Calon Terpilih"
                                borderClass="border-none"
                            />
                            <CustomTable
                                enableDetail
                                detailActions={() => (detailOpen = true)}
                                tableData={actingResultTable}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="4701"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Gareth Bale"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="920625-13-6447"
                            />
                            <ContentHeader
                                title="Butiran Pemangkuan"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Sekiranya tidak lulus, jawatan dan gred akan
                                dikembalikan ke butiran asal.</span
                            >
                            <CustomSelectField
                                label="Keputusan Pemangkuan"
                                id="actingResult"
                                bind:val={dropdownVal}
                                options={meetingResultOption}
                            />
                            <CustomTextField
                                label="Jawatan Pemangkuan"
                                id="actingPosition"
                                type="text"
                                val="Setiausaha Pejabat"
                            />
                            <CustomTextField
                                label="Gred Pemangkuan"
                                id="actingGrade"
                                type="text"
                                val="N32"
                            />
                            <CustomTextField
                                label="Penempatan Baru"
                                id="newPlacement"
                                type="text"
                                val="Bahagian Pengurusan"
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="text"
                                val="22/02/2024"
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomSelectField
                                label="Nama Penyokong"
                                id="supporterName"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />
                            <CustomSelectField
                                label="Nama Pelulus"
                                id="approverName"
                                bind:val={dropdownVal}
                                options={dropdownOptions}
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pemangkuan"
                >
                    {#if !detailOpen}
                        <TextIconButton
                            label="Kembali"
                            icon="previous"
                            type="neutral"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            label="Selesai"
                            icon="check"
                            type="primary"
                            onClick={() => goto('./pemangkuan/urus-setia')}
                        />
                    {:else}
                        <TextIconButton
                            label="Tutup"
                            icon="cancel"
                            type="neutral"
                            onClick={() => (detailOpen = false)}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        {#if !detailOpen}
                            <ContentHeader
                                title="Senarai Calon Yang Terpilih"
                                borderClass="border-none"
                            />
                            <CustomTable
                                bind:tableData={table}
                                enableDetail
                                detailActions={() => (detailOpen = true)}
                            />
                        {:else}
                            <ContentHeader
                                title="Maklumat Calon"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="No. Pekerja"
                                id="employeeNumber"
                                type="text"
                                val="4701"
                            />
                            <CustomTextField
                                label="Nama"
                                id="employeeName"
                                type="text"
                                val="Gareth Bale"
                            />
                            <CustomTextField
                                label="No. Kad Pengenalan"
                                id="identificationNumber"
                                type="text"
                                val="920625-13-6447"
                            />
                            <ContentHeader
                                title="Butiran Pemangkuan"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama Jawatan Baru"
                                id="newPosition"
                                type="text"
                                val="Jurutera"
                            />
                            <CustomTextField
                                label="Gred Baru"
                                id="newGrade"
                                type="text"
                                val="E24"
                            />
                            <CustomTextField
                                label="Penempatan Baru"
                                id="newPlacement"
                                type="text"
                                val="LKIM SARAWAK - KUCHING"
                            />
                            <CustomTextField
                                label="Pengarah Baru"
                                id="newDirector"
                                type="text"
                                val="Pep Guardiola"
                            />
                            <CustomTextField
                                label="Tarikh Lapor Diri"
                                id="reportingDate"
                                type="text"
                                val="23/02/2024"
                            />
                            <ContentHeader
                                title="Pengesah Keputusan"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama Penyokong"
                                id="supporterName"
                                type="text"
                                val="Taylor Swift"
                            />
                            <CustomTextField
                                label="Keputusan"
                                id="supporterResult"
                                type="text"
                                val="Sokong"
                            />
                            <CustomTextField
                                label="Nama Pelulus"
                                id="approverName"
                                type="text"
                                val="Luis Suarez"
                            />
                            <CustomTextField
                                label="Keputusan"
                                id="approverResult"
                                type="text"
                                val="Lulus"
                            />
                        {/if}
                    </form>
                </StepperContentBody>
            </StepperContent>

            <!-- Stepper for supporter only -->
            {#if currentRoleCode === supporterRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Penyokongan Pemangkuan">
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <ContentHeader
                                title="Keputusan daripada Penyokong"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="supporterRemark"
                                type="text"
                                val="Butiran lengkap.."
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- For kakitangan -->
        {:else if currentRoleCode === employeeRoleCode}
            <StepperContent>
                <StepperContentHeader title="Panggilan Temuduga">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-10">
                        <ContentHeader
                            title="Butiran Temuduga"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Surat Panggilan Temuduga"
                            id="interviewCallingLetter"
                            type="text"
                            val="surat_panggilan_temuduga_irfan.pdf"
                        />
                        <CustomTextField
                            label="Borang Perakuan Pendidikan"
                            id="institutionDeclarationForm"
                            type="text"
                            val="borang_perakuan_pendidikan.pdf"
                        />
                        <CustomTextField
                            label="Dokumen Tambahan"
                            id="extraDocument"
                            type="text"
                            val="dokumen_tambahan.pdf"
                        />
                        <div class="flex flex-col pb-2.5">
                            <span
                                class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                                >Tahniah! Anda berjaya dipanggil untuk temuduga.</span
                            >
                            <span
                                class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >
                                Sila hadirkan diri ke temuduga mengikut butiran
                                temuduga seperti yang tertera di atas.
                            </span>
                            <span
                                class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                                >Sila bawa dokumen yang berkaitan ke temuduga
                                tersebut.</span
                            >
                        </div>
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-10">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            id="grade"
                            type="text"
                            val="N32"
                        />
                        <CustomTextField
                            label="Jawatan"
                            id="position"
                            type="text"
                            val="Setiausaha Pejabat"
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            id="effectiveDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            id="newPlacement"
                            type="text"
                            val="LKIM SARAWAK - KUCHING"
                        />

                        <ContentHeader
                            title="Dokumen-dokumen yang perlu dimuat turun dan diisi"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Surat Tawaran Pemangkuan"
                            id="actingOfferLetter"
                            type="text"
                            val="surat_tawaran_pemangkuan.pdf"
                        />
                        <CustomTextField
                            label="Surat Setuju Terima"
                            id="acceptanceLetter"
                            type="text"
                            val="surat_setuju_terima.pdf"
                        />
                        <CustomTextField
                            label="Surat Lapor Diri"
                            id="reportingForm"
                            type="text"
                            val="borang_lapor_diri.pdf"
                        />
                        <CustomTextField
                            label="Nota Serah Tugas"
                            id="assignTaskNote"
                            type="text"
                            val="nota_serah_tugas.pdf"
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-10">
                        <ContentHeader
                            title="Permohonan Penangguhan/Pindaan Penempatan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Adakah anda memerlukan penangguhan/pindaan penempatan?"
                            id="amendmentRequest"
                            type="text"
                            val="Ya"
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri yang Dipohon"
                            id="requestedReportingDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <CustomTextField
                            label="Pindaan Penempatan Dipohon"
                            id="requestedPlacementAmendment"
                            type="text"
                            val="dropdown here"
                        />
                        <ContentHeader
                            title="Dokumen-Dokumen yang Berkaitan"
                            borderClass="border-none"
                        />
                        <!-- upload file here -->
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-10">
                        <ContentHeader
                            title="Butiran Permohonan Penangguhan/Pindaan Penempatan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Adakah Anak Memerlukan Penangguhan?"
                            id="amendmentRequest"
                            type="text"
                            val="Ya"
                        />
                        <CustomTextField
                            label="Alasan Penangguhan"
                            id="postponeReason"
                            type="text"
                            val="Urusan pindah rumah dan hantar anak ke klinik"
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri Yang Dipohon"
                            id="requestedReportingDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <CustomTextField
                            label="Pindaan Penempatan Dipohon"
                            id="requestedPlacementAmendment"
                            type="text"
                            val="Bahagian Teknologi"
                        />
                        <ContentHeader
                            title="Keputusan Mesyuarat"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Keputusan"
                            id="postponeResult"
                            type="text"
                            val="Lulus"
                        />
                        <CustomTextField
                            label="Kelulusan Pindaan Penempatan Dipohon"
                            id="approvedRequestedPlacementAmendment"
                            type="text"
                            val="Bahagian Teknologi"
                        />
                        <CustomTextField
                            label="Kelulusan Tarikh Lapor Diri Baru"
                            id="approvedNewReportingDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <CustomTextField
                            label="Surat Penangguhan Rayuan"
                            id="postponeAppealLetter"
                            type="text"
                            val="surat_kelulusan_penangguhan_rayuan.pdf"
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Akhir Pemangkuan">
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        onClick={() => {}}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col gap-2.5 pb-20">
                        <ContentHeader
                            title="Butiran Pemangkuan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Gred"
                            id="grade"
                            type="text"
                            val="N32"
                        />
                        <CustomTextField
                            label="Jawatan"
                            id="position"
                            type="text"
                            val="Setiausaha Pejabat"
                        />
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            id="effectiveDate"
                            type="text"
                            val="22/02/2024"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            id="newPlacem,ent"
                            type="text"
                            val="LKIM SARAWAK - KUCHING"
                        />
                        <CustomTextField
                            label="Pengarah Baru"
                            id="newDirector"
                            type="text"
                            val="Lionel Messi"
                        />
                        <CustomTextField
                            label="Tarikh Lapor Diri"
                            id="reportingDate"
                            type="text"
                            val="23/02/2024"
                        />
                        <ContentHeader
                            title="Pengesahan Keputusan"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Nama Penyokong"
                            id="supporterName"
                            type="text"
                            val="Cristiano Ronaldo"
                        />
                        <CustomTextField
                            label="Keputusan"
                            id="supporterResult"
                            type="text"
                            val="Disokong"
                        />
                        <CustomTextField
                            label="Nama Pelulus"
                            id="approverName"
                            type="text"
                            val="Gareth Bale"
                        />
                        <CustomTextField
                            label="Keputusan"
                            id="approverResult"
                            type="text"
                            val="Diluluskan"
                        />
                        <span
                            class="text-sm italic text-ios-labelColors-secondaryLabel-light"
                            >Tahniah! Anda boleh menyemak perubahan pada gaji
                            dan buku rekod perkhidmatan anda. Sila hubungi Urus
                            Setia berkenaan jika ada sebarang pertanyaan
                            mengenai perubahan tersebut.</span
                        >
                    </form>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
