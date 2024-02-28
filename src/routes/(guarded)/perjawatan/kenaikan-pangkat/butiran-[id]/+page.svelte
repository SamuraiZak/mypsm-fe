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
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

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

    let openDetail: boolean = false;
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

    let statusPerakuan: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList2 ?? [],
    };

    let employeePlacementTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList3 ?? [],
    };

    let salaryMovementRecordTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList4 ?? [],
    };

    let employeePromotionTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList5 ?? [],
    };

    let directorStepperTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList6 ?? [],
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
    <ContentHeader
        title="Kenaikan Pangkat {data.promotionType.replace(/_/g, '-')}"
    >
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
    <Stepper bind:activeIndex={stepperIndex} dataId="ID Kumpulan #77699">
        {#if currentRoleCode !== depDirectorRoleCode && currentRoleCode !== stateDirectorRoleCode && currentRoleCode !== employeeRoleCode}
            {#if currentRoleCode === secretaryRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Pemilihan Kakitangan">
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
                                title="Senarai Kakitangan"
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
                                title="Senarai Kakitangan yang Dipilih"
                                borderClass="border-none"
                            />
                            <CustomTable bind:tableData={selectedStaffTable} />
                        </div>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Senarai Kakitangan Yang Dipilih"
                    >
                        <TextIconButton
                            type="netural"
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
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 px-2.5 pb-5"
                        >
                            <ContentHeader
                                title="Senarai Kakitangan"
                                borderClass="border-none"
                            />
                            <CustomTable bind:tableData={selectedStaffTable} />
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <StepperContent>
                <StepperContentHeader title="Semak Status Perakuan">
                    {#if currentRoleCode === secretaryRoleCode}
                        <TextIconButton
                            type="netural"
                            label="Kembali"
                            icon="previous"
                            onClick={() => goPrevious()}
                        />
                    {/if}
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2.5"
                    >
                        {#if currentRoleCode === secretaryRoleCode}
                            <ContentHeader
                                title="Senarai Kakitangan"
                                borderClass="border-none"
                            />
                            <CustomTable bind:tableData={statusPerakuan} />
                        {:else if currentRoleCode === supporterRoleCode || currentRoleCode === approverRoleCode}
                            <ContentHeader
                                title="Urus Setia Integriti"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="secretaryName"
                                type="text"
                                val="Justin Bieber"
                            />
                            <CustomTextField
                                label="Ulasan/Tindakan"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="secretaryRemark"
                                type="text"
                                val="Disetuju untuk perakuan"
                            />
                            <CustomTextField
                                label="Keputusan"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="secretaryResult"
                                type="text"
                                val="DIPERAKU (green background)"
                            />
                            <ContentHeader
                                title="Pengarah Bahagian/Negeri"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="directorName"
                                type="text"
                                val="Justin Bieber"
                            />
                            <CustomTextField
                                label="Ulasan/Tindakan"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="directorRemark"
                                type="text"
                                val="Disetuju untuk perakuan"
                            />
                            <CustomTextField
                                label="Keputusan"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="directorResult"
                                type="text"
                                val="DIPERAKU (green background)"
                            />
                        {/if}
                    </div>
                </StepperContentBody>
            </StepperContent>

            {#if data.promotionType === 'gred_utama' && currentRoleCode === secretaryRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Muat Turun Borang Berkaitan">
                        <TextIconButton
                            type="netural"
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
                        <span
                            >download attachment here (borang penilaian, borang
                            kesihatan, profil kakitangan (cv))</span
                        >
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    {#if !openDetail || currentRoleCode === supporterRoleCode}
                        <TextIconButton
                            type="netural"
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
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail && currentRoleCode === secretaryRoleCode}
                        <ContentHeader
                            title="Senarai Kakitangan Yang Dipilih"
                            borderClass="border-none"
                        />
                        <CustomTable
                            bind:tableData={statusPerakuan}
                            enableDetail
                            detailActions={() => (openDetail = true)}
                        />
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Sekiranya kakitangan tidak lulus mesyuarat,
                                proses akan berakhir untuk kakitangan tersebut.
                            </span>
                            <CustomSelectField
                                label="Nama dan Bilangan Mesyuarat"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="meetingName"
                                options={meetingName}
                                bind:val={dropdownVal}
                            />
                            <CustomTextField
                                label="Tarikh Mesyuarat"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="meetingDate"
                                type="text"
                                val="date selector here"
                            />
                            <CustomTextField
                                label="Tindakan/Ulasan Mesyuarat"
                                disabled={currentRoleCode !== secretaryRoleCode
                                    ? true
                                    : false}
                                id="meetingRemark"
                                type="text"
                                val="this is long text field"
                            />
                            <span>Keputusan mesyuarat radio here</span>
                            {#if data.promotionType === '1_54'}
                                <CustomTextField
                                    label="Tarikh Pengesahan Kenaikan Pangkat (Jika Lulus)"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="promotionDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <ContentHeader
                                    title="Penamatan Pemangkuan (Jika Mesyuarat Tidak Lulus)"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tarikh Tamat Pemangkuan"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="actingEndDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomTextField
                                    label="Tarikh Kembali Ke Gred Asal"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="toOriginalGradeDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomSelectField
                                    label="Penempatan Baru"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="newPlacement"
                                    options={dropdownOptions}
                                    bind:val={dropdownVal}
                                />
                            {/if}
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Mesyuarat Penempatan Kakitangan"
                >
                    {#if !openDetail || currentRoleCode === supporterRoleCode}
                        <TextIconButton
                            type="netural"
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
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail && currentRoleCode === secretaryRoleCode}
                        <ContentHeader
                            title="Senarai Calon Kakitangan Yang Dibawa Ke Mesyuarat Penempatan Kakitangan"
                            borderClass="border-none"
                        />
                        <CustomTable
                            bind:tableData={employeePlacementTable}
                            enableDetail
                            detailActions={() => (openDetail = true)}
                        />
                    {:else}
                        <CustomTab>
                            <CustomTabContent
                                title="Butiran Kenaikan Pangkat Kakitangan"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-1 text-sm italic text-ios-labelColors-secondaryLabel-light"
                                >
                                    <span>
                                        Borang-borang berkaitan yang akan
                                        dijana:
                                    </span>
                                    <span>
                                        1. Surat Tawaran Kenaikan Pangkat
                                    </span>
                                    <span> 2. Borang Lapor Diri </span>
                                    <span> 3. Jadual Pelarasan Gaji </span>
                                </div>
                                <ContentHeader
                                    title="Butiran Kenaikan Pangkat"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="No. Pekerja"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="employeeNumber"
                                    type="text"
                                    val="28339"
                                />
                                <CustomTextField
                                    label="Nama Pekerja"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="employeeName"
                                    type="text"
                                    val="Vinicius Junior"
                                />
                                <CustomTextField
                                    label="Tarikh Kenaikan Pangkat"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="promotionDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomSelectField
                                    label="Tarikh Pergerakan Gaji Asal"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="originalSalaryMovementDate"
                                    options={meetingResultOption}
                                    bind:val={dropdownVal}
                                />
                                <CustomSelectField
                                    label="Tarikh Pergerakan Gaji Baru"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="newSalaryMovementDate"
                                    options={dropdownOptions}
                                    bind:val={dropdownVal}
                                />
                                <CustomTextField
                                    label="Gaji Minimum - Gaji Maksimum E19"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="minMaxSalary"
                                    type="text"
                                    val="RM 1,335.00 - RM 4,0005.00"
                                />
                                <CustomTextField
                                    label="Kenaikan Gaji Tahunan E19"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="annualSalaryIncrement"
                                    type="text"
                                    val="RM 100.00"
                                />
                                <CustomTextField
                                    label="Gaji Minimum - Gaji Maksimum E22"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="minMaxSalaryNewGrade"
                                    type="text"
                                    val="RM 2,254.00 -RM 4,694.00"
                                />
                                <CustomTextField
                                    label="Kenaikan Gaji Tahunan E22"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="newGradeAnnualSalaryIncrement"
                                    type="text"
                                    val="RM 115.00"
                                />
                                <CustomTextField
                                    label="Penempatan Sekarang"
                                    disabled={true}
                                    id="currentPlacement"
                                    type="text"
                                    val="Pejabat Ketua Pengarah"
                                />
                                <CustomSelectField
                                    label="Penempatan Baru"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="newPlacement"
                                    options={dropdownOptions}
                                    bind:val={dropdownVal}
                                />
                            </CustomTabContent>
                            <CustomTabContent
                                title="Jadual Pelarasan Gaji Kakitangan"
                            >
                                <ContentHeader
                                    title="Kemaskini Rekod Kenaikan Gaji"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tarikh Kuatkuasa"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="effectiveDate"
                                    type="text"
                                    val="date selector here"
                                />
                                <CustomTextField
                                    label="Gaji Sekarang (RM)"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="currentSalary"
                                    type="text"
                                    val="2,269.00"
                                />
                                <CustomTextField
                                    label="Gaji Baru (RM)"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="newSalary"
                                    type="text"
                                    val="2,369.00"
                                />
                                <CustomTextField
                                    label="Catatan"
                                    disabled={currentRoleCode !==
                                    secretaryRoleCode
                                        ? true
                                        : false}
                                    id="salaryIncrementNote"
                                    type="text"
                                    val="TPG Gred Jawatan Baru Diberi Pergerakan Gaji Biasa Mengikut Keputusan PPSM Selaras Dengan Perlaksanaan Penambahbaikan Gaji Baru SSM. (Pergerakan Gaji Tahunan RM 115.00 Bagi Gred E22)"
                                />

                                <ContentHeader
                                    title="Senarai Rekod Kenaikan Gaji"
                                    borderClass="border-none"
                                />
                                <CustomTable
                                    bind:tableData={salaryMovementRecordTable}
                                />
                            </CustomTabContent>
                        </CustomTab>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Maklumat Kenaikan Pangkat Kakitangan"
                >
                    {#if !openDetail || currentRoleCode === supporterRoleCode}
                        <TextIconButton
                            type="netural"
                            label="Kembali"
                            icon="previous"
                            onClick={() => goPrevious()}
                        />
                        <TextIconButton
                            type="primary"
                            label={currentRoleCode !== secretaryRoleCode
                                ? 'Seterusnya'
                                : 'Simpan'}
                            icon={currentRoleCode !== secretaryRoleCode
                                ? 'next'
                                : 'check'}
                            onClick={() => {
                                currentRoleCode !== secretaryRoleCode
                                    ? goNext()
                                    : {};
                            }}
                        />
                    {:else}
                        <TextIconButton
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail && currentRoleCode === secretaryRoleCode}
                        <ContentHeader
                            title="Senarai Calon Kakitangan Yang Lulus Untuk Kenaikan Pangkat"
                            borderClass="border-none"
                        />
                        <CustomTable
                            bind:tableData={employeePromotionTable}
                            enableDetail
                            detailActions={() => (openDetail = true)}
                        />
                    {:else}
                        <CustomTextField
                            label="Tarikh Pengesahan"
                            disabled={currentRoleCode !== secretaryRoleCode
                                ? true
                                : false}
                            id="validationDate"
                            type="text"
                            val="date selector here"
                        />
                        <CustomTextField
                            label="Ulasan"
                            disabled={currentRoleCode !== secretaryRoleCode
                                ? true
                                : false}
                            id="promotionRemark"
                            type="text"
                            val="Borang Lengkap dan Kakitangan Setuju"
                        />
                        <span>Radio Button Here (Sah & X Sah)</span>
                        <CustomTextField
                            label="Nama Pelulus"
                            id="approverName"
                            disabled={true}
                            type="text"
                            val="Zinadine Zidane"
                        />
                        <CustomTextField
                            label="Nama Penyokong"
                            id="supporterName"
                            disabled={true}
                            type="text"
                            val="Anthony Joshua"
                        />
                    {/if}
                </StepperContentBody>
            </StepperContent>

            {#if currentRoleCode === supporterRoleCode || currentRoleCode === approverRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Penyokongan Kenaikan Pangkat">
                        <TextIconButton
                            type="netural"
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
                        <ContentHeader
                            title="Keputusan daripada Penyokong"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <span
                                class="pb-2 text-sm italic text-ios-activeColors-activeBlue-light"
                            >
                                Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.
                            </span>
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                disabled={currentRoleCode === approverRoleCode
                                    ? true
                                    : false}
                                id="supporterRemark"
                                type="text"
                                placeholder="Butiran lengkap..."
                                val="long text field"
                            />
                            <span
                                >Radio button here (Sokong @ Tidak Sokong)</span
                            >
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}

            {#if currentRoleCode === approverRoleCode}
                <StepperContent>
                    <StepperContentHeader title="Kelulusan Kenaikan Pangkat">
                        <TextIconButton
                            type="netural"
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
                        <ContentHeader
                            title="Keputusan daripada Penyokong"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
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
                                placeholder="Butiran lengkap..."
                                val="long text field"
                            />
                            <span>Radio button here (Lulus @ Tidak Lulus)</span>
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {:else if currentRoleCode === depDirectorRoleCode || currentRoleCode === stateDirectorRoleCode}
            <StepperContent>
                <StepperContentHeader
                    title="Kemaskini Perakuan Kenaikan Pangkat"
                >
                    {#if !openDetail}
                        <TextIconButton
                            type="primary"
                            label="Seterusnya"
                            icon="next"
                            onClick={() => goNext()}
                        />
                    {:else}
                        <TextIconButton
                            type="netural"
                            label="Batal"
                            icon="cancel"
                            onClick={() => (openDetail = false)}
                        />
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            icon="check"
                            onClick={() => {}}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !openDetail}
                        <CustomTable
                            tableData={directorStepperTable}
                            enableDetail
                            detailActions={() => (openDetail = true)}
                        />
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5"
                        >
                            <ContentHeader
                                title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                                borderClass="border-none"
                            />
                            <span
                                class="pb-2.5 text-sm italic text-ios-activeColors-activeBlue-light"
                                >Keputusan akan dihantar ke emel klinik dan Urus
                                Setia berkaitan.</span
                            >
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="directorRemark"
                                type="text"
                                val="Sertakan Ulasan"
                            />
                            <span>Radio Button Here (Peraku/Tidak Peraku)</span>
                            <ContentHeader
                                title="Ulasan Keputusan daripada Urus Setia Integriti"
                                borderClass="border-none"
                            />
                            <CustomTextField
                                label="Nama"
                                id="secretaryName"
                                disabled={true}
                                type="text"
                                val="Arsene Wenger"
                            />
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="secretaryRemark"
                                disabled={true}
                                type="text"
                                val="Layak diperaku"
                            />
                            <CustomTextField
                                label="Keputusan"
                                id="secretaryResult"
                                disabled={true}
                                type="text"
                                val="DIPERAKU (green background?) @ DALAM PROSES (grey background?)"
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {:else if currentRoleCode === employeeRoleCode}
            <StepperContent>
                <StepperContentHeader title="Butiran Kenaikan Pangkat">
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 pb-10"
                    >
                        <CustomTextField
                            label="No. Pekerja"
                            disabled
                            id="employeeNumber"
                            type="text"
                            val="28339"
                        />
                        <CustomTextField
                            label="Nama Pekerja"
                            disabled
                            id="employeeName"
                            type="text"
                            val="David Beckham"
                        />
                        <CustomTextField
                            label="Tarikh Kenaikan Pangkat"
                            disabled
                            id="promotionDate"
                            type="text"
                            val="27/02/2024"
                        />
                        <CustomTextField
                            label="Tarikh Pergerakan Gaji Asal"
                            disabled
                            id="originalSalaryMovementDate"
                            type="text"
                            val="JULAI"
                        />
                        <CustomTextField
                            label="Tarikh Pergerakan Gaji Baru"
                            disabled
                            id="newSalaryMovementDate"
                            type="text"
                            val="APRIL"
                        />
                        <CustomTextField
                            label="Gaji Minimum - Gaji Maksimum E19 (RM)"
                            disabled
                            id="oldMinMaxSalary"
                            type="text"
                            val="RM 1,335.00 - RM 4,005.00"
                        />
                        <CustomTextField
                            label="Kenaikan Gaji Tahunan (RM)"
                            disabled
                            id="oldAnnualSalaryIncrement"
                            type="text"
                            val="RM 100.00"
                        />
                        <CustomTextField
                            label="Gaji Minimum - Gaji Maksimum E22 (RM)"
                            disabled
                            id="newMinMaxSalary"
                            type="text"
                            val="RM 1,335.00 - RM 4,005.00"
                        />
                        <CustomTextField
                            label="Kenaikan Gaji Tahunan (RM)"
                            disabled
                            id="newAnnualSalaryIncrement"
                            type="text"
                            val="RM 100.00"
                        />
                        <CustomTextField
                            label="Penempatan Sekarang"
                            disabled
                            id="currentPlacement"
                            type="text"
                            val="Pejabat Ketua Pengarah"
                        />
                        <CustomTextField
                            label="Penempatan Baru"
                            disabled
                            id="newPlacement"
                            type="text"
                            val="Setiausaha Pejabat Gred N32"
                        />
                    </div>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Jadual Pergerakan Gaji">
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
                    <CustomTable
                        tableData={salaryMovementRecordTable}
                        title="Senarai Rekod Kenaikan Gaji"
                    />
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
